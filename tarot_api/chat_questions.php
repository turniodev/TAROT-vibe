<?php
/**
 * gemini_proxy.php
 * POST /tarot_api/gemini_proxy.php
 *
 * Body JSON:
 * {
 *   "name": "Nguyễn Văn A",
 *   "dob": "1990-01-15",
 *   "theme": "love",
 *   "theme_label": "Tình Yêu",
 *   "question": "...",
 *   "spread": 3,
 *   "cards": [
 *     {
 *       "slot_idx": 0, "position_label": "Quá Khứ",
 *       "name": "The Tower", "name_vi": "Tòa Tháp",
 *       "number": "XVI", "is_reversed": false,
 *       "meaning": "...",
 *       "keywords": ["Sự phá hủy", "Thay đổi đột ngột"]
 *     }, ...
 *   ]
 * }
 *
 * Returns JSON: { "analysis": "<markdown>" , "reading_id": <int> }
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/helpers.php';
require_once __DIR__ . '/gemini_service.php';

cors_headers();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}

// ── Identify user (optional Google login) ──────────────────────
$body = json_decode(file_get_contents('php://input'), true);
if (!$body || empty($body['cards'])) {
    json_error('Invalid payload', 400);
}

// Try Google token first; if missing, fall back to anonymous identity
$user_email = null;
$auth_header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$id_token = str_starts_with($auth_header, 'Bearer ') ? trim(substr($auth_header, 7)) : '';

if ($id_token) {
    // Verify Google token
    $url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' . urlencode($id_token);
    $res = @file_get_contents($url);
    $info = $res ? json_decode($res, true) : null;
    if ($info && !isset($info['error']) && !empty($info['email'])) {
        $user_email = strtolower(trim($info['email']));
    }
}

// Anonymous fallback: use name + dob as synthetic identifier
if (!$user_email) {
    $anon_name = strtolower(trim(preg_replace('/\s+/', '_', $body['name'] ?? 'guest')));
    $anon_dob = preg_replace('/[^0-9\-]/', '', $body['dob'] ?? '0000-00-00');
    $user_email = 'anon_' . $anon_name . '_' . $anon_dob . '@tarot.local';
}

// ── 0.5. Verify User Quota Limits ──────────────────────────────
$pdo = get_pdo();
$today = date('Y-m-d');
$stmt = $pdo->prepare('
    SELECT u.plan_type, u.plan_expiry_date, 
           (SELECT COUNT(*) FROM readings r WHERE r.user_id = u.id AND DATE(r.created_at) = ?) as draws_today 
    FROM users u WHERE u.email = ? LIMIT 1
');
$stmt->execute([$today, $user_email]);
$user_data = $stmt->fetch();

// Anonymous (@tarot.local) => 1 luận giải/ngày
// Đăng nhập free => 3/ngày
// Gói trả phí => theo plan
$is_anonymous = str_ends_with($user_email, '@tarot.local');
$max_draws = 999999; // Tạm thời mở không giới hạn theo yêu cầu

if ($user_data && $user_data['plan_expiry_date'] && strtotime($user_data['plan_expiry_date']) > time()) {
    if ($user_data['plan_type'] === 'guide')
        $max_draws = 999999;
    if ($user_data['plan_type'] === 'master')
        $max_draws = 999999;
}
$draws_today = $user_data ? (int) $user_data['draws_today'] : 0;

if ($draws_today >= $max_draws) {
    // Trả về thêm thông tin để frontend hiện đúng modal
    http_response_code(403);
    echo json_encode([
        'status' => 'error',
        'message' => 'QUOTA_EXCEEDED',
        'is_anonymous' => $is_anonymous,
        'max_draws' => $max_draws,
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ── 1. Build Gemini prompt ─────────────────────────────────────
$prompt = build_clarify_prompt($body);

// ── 2. Call Gemini ─────────────────────────────────────────────
$response_text = call_gemini_clarify($prompt);

// Lọc lấy JSON từ response:
$json_str = '';
if (preg_match('/\[\s*".*"\s*\]/s', $response_text, $matches)) {
    $json_str = $matches[0];
} else {
    $json_str = $response_text;
}

$questions = json_decode($json_str, true);
if (!$questions || !is_array($questions)) {
    // Fallback if AI fails to return strict JSON strings
    $questions = [
        "Bạn có đang gặp áp lực lớn từ công việc hiện tại không?",
        "Gần đây bạn có trải qua sự kiện nào ảnh hưởng mạnh đến cảm xúc không?",
        "Bạn có đang che giấu một bí mật nào đó với người thân không?"
    ];
}

// ── 4. Respond ─────────────────────────────────────────────────
json_ok(['questions' => array_slice($questions, 0, 3)]);

