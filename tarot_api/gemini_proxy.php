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
verify_google_token();

$body = json_decode(file_get_contents('php://input'), true);
if (!$body || empty($body['cards'])) {
    json_error('Invalid payload', 400);
}

// ── 1. Build Gemini prompt ─────────────────────────────────────
$prompt = build_prompt($body);

// ── 2. Call Gemini ─────────────────────────────────────────────
$analysis = call_gemini($prompt);

// ── 3. Persist to DB ───────────────────────────────────────────
$reading_id = save_reading($body, $analysis);

// ── 4. Respond ─────────────────────────────────────────────────
json_ok(['analysis' => $analysis, 'reading_id' => $reading_id]);

/* ── Google token verification ────────────────────────────────── */

function verify_google_token(): void {
    $auth  = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    $token = str_starts_with($auth, 'Bearer ') ? trim(substr($auth, 7)) : '';

    if (!$token) {
        json_error('Authentication required', 401);
    }

    // Verify via Google's tokeninfo endpoint
    $url  = 'https://oauth2.googleapis.com/tokeninfo?id_token=' . urlencode($token);
    $res  = @file_get_contents($url);
    $info = $res ? json_decode($res, true) : null;

    if (!$info || isset($info['error']) || empty($info['email'])) {
        json_error('Invalid or expired Google token', 401);
    }
    // Optionally check audience matches your CLIENT_ID
    // if ($info['aud'] !== GOOGLE_CLIENT_ID) json_error('Token audience mismatch', 401);
}

/* ── Helpers ──────────────────────────────────────────────────── */

function build_prompt(array $d): string {
    $name       = $d['name']        ?? 'Người dùng';
    $dob        = $d['dob']         ?? '';
    $theme      = $d['theme_label'] ?? $d['theme'] ?? 'Tổng quát';
    $question   = $d['question']    ?? '';
    $spread     = (int)($d['spread'] ?? count($d['cards']));
    $cards      = $d['cards'];

    $dob_str = $dob ? "Ngày sinh: **{$dob}**" : '';

    // Build card details
    $card_lines = '';
    foreach ($cards as $i => $c) {
        $orient  = $c['is_reversed'] ? 'Ngược' : 'Xuôi';
        $kws     = implode(', ', $c['keywords'] ?? []);
        $card_lines .= <<<CARD

### Vị trí {$i}: {$c['position_label']}
- **Lá bài:** {$c['name']} ({$c['name_vi']}) — {$c['number']}
- **Chiều:** {$orient}
- **Ý nghĩa:** {$c['meaning']}
- **Từ khóa:** {$kws}

CARD;
    }

    return <<<PROMPT
Bạn là một chuyên gia giải Tarot người Việt, có kiến thức sâu về Tarot học, tâm lý học và chiêm tinh học. Hãy đưa ra một bài luận giải chi tiết, sâu sắc và đầy đủ bằng tiếng Việt.

## Thông tin người trải bài
- **Họ tên:** {$name}
- {$dob_str}
- **Chủ đề:** {$theme}
- **Câu hỏi:** {$question}
- **Kiểu trải bài:** {$spread} lá

## Các lá bài đã rút
{$card_lines}

## Yêu cầu luận giải

Hãy viết một bài luận giải hoàn chỉnh bằng tiếng Việt, bao gồm:

1. **Tổng quan năng lượng** — Cảm nhận chung về bộ bài; mối liên kết giữa các lá
2. **Phân tích từng lá** — Ý nghĩa sâu của từng lá trong vị trí đó, liên quan đến câu hỏi "{$question}"
3. **Thông điệp tổng hợp** — Câu trả lời cuối cùng cho câu hỏi của {$name}
4. **Lời khuyên hành động** — 3–5 hành động cụ thể, thực tế
5. **Cảnh báo & lưu ý** — Những điều cần thận trọng

**Phong cách:** Chuyên nghiệp nhưng ấm áp, cụ thể và thiết thực. Dùng Markdown cho tiêu đề và nhấn mạnh.
PROMPT;
}

function call_gemini(string $prompt): string {
    $payload = json_encode([
        'contents' => [[
            'parts' => [['text' => $prompt]]
        ]],
        'generationConfig' => [
            'temperature'     => 0.85,
            'maxOutputTokens' => 2048,
            'topP'            => 0.95,
        ]
    ], JSON_UNESCAPED_UNICODE);

    $ch = curl_init(GEMINI_ENDPOINT);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_TIMEOUT        => 60,
    ]);

    $resp = curl_exec($ch);
    $err  = curl_error($ch);
    curl_close($ch);

    if ($err) json_error('Gemini connection error: ' . $err, 502);

    $data = json_decode($resp, true);
    $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;
    if (!$text) json_error('Gemini returned empty response: ' . $resp, 502);

    return $text;
}

function save_reading(array $d, string $analysis): int {
    $pdo = get_pdo();

    // Upsert user
    $name = trim($d['name'] ?? '');
    $dob  = $d['dob'] ?: null;
    $pdo->prepare('INSERT INTO users (name, dob) VALUES (?, ?) ON DUPLICATE KEY UPDATE last_seen = NOW()')
        ->execute([$name, $dob]);
    $user_id = $pdo->query('SELECT id FROM users WHERE name = ' . $pdo->quote($name) .
        ' AND dob ' . ($dob ? '= ' . $pdo->quote($dob) : 'IS NULL') . ' LIMIT 1')
        ->fetchColumn();

    // Insert reading
    $stmt = $pdo->prepare('INSERT INTO readings (user_id, theme, question, spread_count, gemini_analysis) VALUES (?,?,?,?,?)');
    $stmt->execute([$user_id, $d['theme'] ?? 'general', $d['question'] ?? '', count($d['cards']), $analysis]);
    $reading_id = (int)$pdo->lastInsertId();

    // Insert cards
    $cs = $pdo->prepare('INSERT INTO reading_cards (reading_id, slot_idx, position_label, card_id, card_name, card_name_vi, is_reversed, meaning) VALUES (?,?,?,?,?,?,?,?)');
    foreach ($d['cards'] as $c) {
        $cs->execute([
            $reading_id,
            (int)$c['slot_idx'],
            $c['position_label'] ?? '',
            $c['id']             ?? '',
            $c['name']           ?? '',
            $c['name_vi']        ?? '',
            $c['is_reversed'] ? 1 : 0,
            $c['meaning']        ?? '',
        ]);
    }

    return $reading_id;
}
