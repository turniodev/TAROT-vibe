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

// Allow script to run longer to accommodate 60s curl timeout + retries
set_time_limit(180);

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
// $max_draws = $is_anonymous ? 10 : 10;
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
$prompt = build_analysis_prompt($body);

// ── 2. Call Gemini ─────────────────────────────────────────────
$analysis = call_gemini_analysis($prompt);

// ── 3. Persist to DB ───────────────────────────────────────────
$reading_id = save_reading($body, $analysis, $user_email);

// ── 4. Respond ─────────────────────────────────────────────────
json_ok(['analysis' => $analysis, 'reading_id' => $reading_id]);



/* ── Helpers ──────────────────────────────────────────────────── */

function save_reading(array $d, string $analysis, string $email): int
{
    $pdo = get_pdo();

    // Upsert user by Email
    $name = trim($d['name'] ?? '');
    $dob = $d['dob'] ?: null;

    $pdo->prepare('INSERT INTO users (email, name, dob) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), dob = IFNULL(VALUES(dob), dob), last_seen = NOW()')
        ->execute([$email, $name, $dob]);

    $user_id = $pdo->query('SELECT id FROM users WHERE email = ' . $pdo->quote($email) . ' LIMIT 1')
        ->fetchColumn();

    // MERGE ANONYMOUS HISTORY
    if (!str_ends_with($email, '@tarot.local')) {
        $anon_name = strtolower(trim(preg_replace('/\s+/', '_', $name)));
        $anon_dob = preg_replace('/[^0-9\-]/', '', $dob ?? '0000-00-00');
        $old_email = 'anon_' . $anon_name . '_' . $anon_dob . '@tarot.local';
        
        $old_user_id = $pdo->query('SELECT id FROM users WHERE email = ' . $pdo->quote($old_email) . ' LIMIT 1')->fetchColumn();
        if ($old_user_id && $old_user_id != $user_id) {
            // Chuyển toàn bộ lịch sử sang tài khoản mới
            $pdo->prepare('UPDATE readings SET user_id = ? WHERE user_id = ?')->execute([$user_id, $old_user_id]);
            // Xóa tài khoản ảo rác để dọn dẹp DB
            $pdo->prepare('DELETE FROM users WHERE id = ?')->execute([$old_user_id]);
        }
    }

    // If reading_id is provided, check if it belongs to this user. If yes, just update the analysis and return.
    if (!empty($d['reading_id'])) {
        $reading_id = (int) $d['reading_id'];
        // LocalStorage timestamp IDs are huge numbers, DB IDs are small.
        if ($reading_id < 1000000000000) {
            $check = $pdo->prepare('SELECT id FROM readings WHERE id = ? AND user_id = ?');
            $check->execute([$reading_id, $user_id]);
            if ($check->fetchColumn()) {
                $stmt = $pdo->prepare('UPDATE readings SET gemini_analysis = ? WHERE id = ?');
                $stmt->execute([$analysis, $reading_id]);
                return $reading_id;
            }
        }
    }

    // Insert reading
    $created_at = !empty($d['created_at']) ? str_replace('T', ' ', substr($d['created_at'], 0, 16)) . ':00' : date('Y-m-d H:i:s');
    $stmt = $pdo->prepare('INSERT INTO readings (user_id, theme, question, spread_count, gemini_analysis, created_at) VALUES (?,?,?,?,?,?)');
    $stmt->execute([$user_id, $d['theme'] ?? 'general', $d['question'] ?? '', count($d['cards']), $analysis, $created_at]);
    $reading_id = (int) $pdo->lastInsertId();

    // Insert cards
    $cs = $pdo->prepare('INSERT INTO reading_cards (reading_id, slot_idx, position_label, card_id, card_name, card_name_vi, is_reversed, meaning) VALUES (?,?,?,?,?,?,?,?)');
    foreach ($d['cards'] as $c) {
        $cs->execute([
            $reading_id,
            (int) $c['slot_idx'],
            $c['position_label'] ?? '',
            $c['id'] ?? '',
            $c['name'] ?? '',
            $c['name_vi'] ?? '',
            $c['is_reversed'] ? 1 : 0,
            $c['meaning'] ?? '',
        ]);
    }

    return $reading_id;
}
