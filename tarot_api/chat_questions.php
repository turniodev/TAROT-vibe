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
// $max_draws = $is_anonymous ? 10 : 10;

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
$prompt = build_prompt($body);

// ── 2. Call Gemini ─────────────────────────────────────────────
$response_text = call_gemini($prompt);

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



/* ── Helpers ──────────────────────────────────────────────────── */

function build_prompt(array $d): string
{
    $name = $d['name'] ?? 'Người dùng';
    $dob = $d['dob'] ?? '';
    $gender = $d['gender'] ?? '';
    $theme = $d['theme_label'] ?? $d['theme'] ?? 'Tổng quát';
    $question = trim($d['question'] ?? '');
    if (!$question) {
        $question = ($theme === 'Tổng quát' || $theme === 'Thông Điệp Chung')
            ? 'Xin thông điệp chung từ vũ trụ.'
            : "Xin thông điệp chung về chủ đề {$theme}.";
    }
    $spread = (int) ($d['spread'] ?? count($d['cards']));
    $cards = $d['cards'];

    $dob_str = $dob ? "Ngày sinh: **{$dob}**" : '';
    $gender_str = $gender ? "- **Giới tính:** {$gender}" : '';

    // Build card details
    $card_lines = '';
    foreach ($cards as $i => $c) {
        $orient = $c['is_reversed'] ? 'Ngược' : 'Xuôi';
        $kws = implode(', ', $c['keywords'] ?? []);

        $aspect_str = !empty($c['aspect_meaning']) ? "- **Phân tích chuyên sâu ({$theme}):** {$c['aspect_meaning']}\n" : "";

        $astro_str = [];
        if (!empty($c['planet']))
            $astro_str[] = "Hành tinh: " . $c['planet'];
        if (!empty($c['zodiac']))
            $astro_str[] = "Cung: " . $c['zodiac'];
        if (!empty($c['element']))
            $astro_str[] = "Nguyên tố: " . $c['element'];
        if (!empty($c['numerology']))
            $astro_str[] = "Thần số: " . $c['numerology'];
        $astro_line = !empty($astro_str) ? "- **Chiêm tinh & Năng lượng:** " . implode(' | ', $astro_str) . "\n" : "";

        $card_lines .= <<<CARD

### Vị trí {$i}: {$c['position_label']}
- **Lá bài:** {$c['name']} ({$c['name_vi']}) — {$c['number']}
- **Chiều:** {$orient}
{$astro_line}{$aspect_str}- **Ý nghĩa gốc:** {$c['meaning']}
- **Từ khóa:** {$kws}

CARD;
    }

    return <<<PROMPT
Bạn là một chuyên gia Tarot. Để luận giải chính xác và cá nhân hóa nhất, bạn cần hỏi thêm người xem 3 câu hỏi Đúng/Sai (Yes/No) NGẮN GỌN để làm rõ hoàn cảnh của họ.
TUYỆT ĐỐI KHÔNG chào hỏi. KHÔNG giải thích. Bắt buộc phải trả về DUY NHẤT một mảng JSON chứa 3 câu hỏi bằng tiếng Việt, dạng mảng chuỗi (["Câu 1?", "Câu 2?", "Câu 3?"]).

## Thông tin người trải bài
- **Họ tên:** {$name}
- {$dob_str}
{$gender_str}
- **Chủ đề:** {$theme}
- **Câu hỏi của họ:** {$question}

YÊU CẦU: Dựa vào sự kết hợp của dàn bài sau đây, hãy suy đoán 3 ẩn khúc lớn nhất trong lòng {$name} và đặt 3 câu hỏi ĐÚNG/SAI sắc bén để xác nhận.

## Các lá bài đã rút
{$card_lines}

ĐẦU RA BẮT BUỘC LÀ ĐỊNH DẠNG JSON MẢNG GỒM 3 CHUỖI. VÍ DỤ:
[
  "Gần đây bạn có đưa ra quyết định từ bỏ một mối quan hệ lâu năm phải không?",
  "Có phải bạn đang gặp rào cản tài chính làm chậm trễ kế hoạch hiện tại?",
  "Bạn có đang nghi ngờ sự trung thực của một người thân thiết không?"
]
Vì câu trả lời chỉ là Yes/No, câu hỏi phải bắt đầu bằng "Có phải", "Bạn có đang", v.v.
Chỉ trả về JSON.
PROMPT;
}

function call_gemini(string $prompt): string
{
    $payload = json_encode([
        'contents' => [
            [
                'parts' => [['text' => $prompt]]
            ]
        ],
        'generationConfig' => [
            'temperature' => 1.5,
            'maxOutputTokens' => 12048,
            'topP' => 0.95,
        ]
    ], JSON_UNESCAPED_UNICODE);

    $ch = curl_init(GEMINI_ENDPOINT);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_TIMEOUT => 60,
    ]);

    $resp = curl_exec($ch);
    $err = curl_error($ch);
    curl_close($ch);

    if ($err)
        json_error('Gemini connection error: ' . $err, 502);

    $data = json_decode($resp, true);
    $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;
    if (!$text)
        json_error('Gemini returned empty response: ' . $resp, 502);

    return $text;
}

