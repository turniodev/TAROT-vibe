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

// ── Verify Google token ────────────────────────────────────────
$user_email = verify_google_token();

$body = json_decode(file_get_contents('php://input'), true);
if (!$body || empty($body['cards'])) {
    json_error('Invalid payload', 400);
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

$max_draws = 3; // Miễn phí 3 lần/ngày
if ($user_data && $user_data['plan_expiry_date'] && strtotime($user_data['plan_expiry_date']) > time()) {
    if ($user_data['plan_type'] === 'guide') $max_draws = 5;
    if ($user_data['plan_type'] === 'master') $max_draws = 999999;
}
$draws_today = $user_data ? (int)$user_data['draws_today'] : 0;

if ($draws_today >= $max_draws) {
    json_error('QUOTA_EXCEEDED', 403);
}

// ── 1. Build Gemini prompt ─────────────────────────────────────
$prompt = build_prompt($body);

// ── 2. Call Gemini ─────────────────────────────────────────────
$analysis = call_gemini($prompt);

// ── 3. Persist to DB ───────────────────────────────────────────
$reading_id = save_reading($body, $analysis, $user_email);

// ── 4. Respond ─────────────────────────────────────────────────
json_ok(['analysis' => $analysis, 'reading_id' => $reading_id]);



/* ── Helpers ──────────────────────────────────────────────────── */

function build_prompt(array $d): string
{
    $name = $d['name'] ?? 'Người dùng';
    $dob = $d['dob'] ?? '';
    $theme = $d['theme_label'] ?? $d['theme'] ?? 'Tổng quát';
    $question = $d['question'] ?? '';
    $spread = (int) ($d['spread'] ?? count($d['cards']));
    $cards = $d['cards'];

    $dob_str = $dob ? "Ngày sinh: **{$dob}**" : '';

    // Build card details
    $card_lines = '';
    foreach ($cards as $i => $c) {
        $orient = $c['is_reversed'] ? 'Ngược' : 'Xuôi';
        $kws = implode(', ', $c['keywords'] ?? []);
        
        $aspect_str = !empty($c['aspect_meaning']) ? "- **Phân tích chuyên sâu ({$theme}):** {$c['aspect_meaning']}\n" : "";
        
        $astro_str = [];
        if (!empty($c['planet'])) $astro_str[] = "Hành tinh: " . $c['planet'];
        if (!empty($c['zodiac'])) $astro_str[] = "Cung: " . $c['zodiac'];
        if (!empty($c['element'])) $astro_str[] = "Nguyên tố: " . $c['element'];
        if (!empty($c['numerology'])) $astro_str[] = "Thần số: " . $c['numerology'];
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
Bạn là một chuyên gia giải Tarot. Hãy đưa ra bài luận giải NGẮN GỌN, ĐÚNG TRỌNG TÂM.
TUYỆT ĐỐI KHÔNG chào hỏi (ví dụ: Chào bạn, Xin chào,...). KHÔNG nhắc lại vai trò hoặc prompt. Bắt đầu ngay lập tức với đề mục đầu tiên.

## Thông tin người trải bài
- **Họ tên:** {$name}
- {$dob_str}
- **Chủ đề:** {$theme}
- **Câu hỏi:** {$question}

YÊU CẦU ĐẶC BIỆT: Phải liên kết yếu tố chiêm tinh, nguyên tố của các lá bài với ngày sinh của {$name} (để tính Bản mệnh/Cung/Con số năng lượng) nhằm đưa ra các nhận định cực kỳ sâu sắc và cá nhân hóa. Sử dụng cả phần "Phân tích chuyên sâu" của các lá bài để đào sâu vào hoàn cảnh của {$name}.

## Các lá bài đã rút
{$card_lines}

## Yêu cầu định dạng (Cực kỳ ngắn gọn)

Hãy viết luận giải XÚC TÍCH (tối đa 3-4 đoạn ngắn). Bắt buộc phải sử dụng tiêu đề H3 (###) và vạch kẻ (---) như cú pháp mẫu sau:

### 1. Vào thẳng vấn đề
[Trả lời trực tiếp câu hỏi "{$question}" dựa trên kết hợp của các lá bài]

---

### 2. Thông điệp cốt lõi
[Ý nghĩa ngắn gọn của các lá bài đối với hoàn cảnh hiện tại]

---

### 3. Lời khuyên hành động
- (Hành động 1)
- (Hành động 2)

**Phong cách:** Thẳng thắn, ngắn gọn, thiết thực, tập trung hoàn toàn vào câu hỏi. Sử dụng Markdown để trình bày mạch lạc. KHÔNG viết quá dài.
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

function save_reading(array $d, string $analysis, string $email): int
{
    $pdo = get_pdo();

    // Upsert user by Email
    $name = trim($d['name'] ?? '');
    $dob  = $d['dob'] ?: null;
    
    $pdo->prepare('INSERT INTO users (email, name, dob) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), dob = IFNULL(VALUES(dob), dob), last_seen = NOW()')
        ->execute([$email, $name, $dob]);
        
    $user_id = $pdo->query('SELECT id FROM users WHERE email = ' . $pdo->quote($email) . ' LIMIT 1')
        ->fetchColumn();

    // If reading_id is provided, check if it belongs to this user. If yes, just update the analysis and return.
    if (!empty($d['reading_id'])) {
        $reading_id = (int)$d['reading_id'];
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
