<?php
/**
 * gemini_service.php
 * Chuyên chứa toàn bộ logic gọi Gemini API, Retry, và Build Prompt
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/helpers.php';

function build_analysis_prompt(array $d): string
{
    if (!empty($d['is_daily_draw']) && !empty($d['cards'][0])) {
        $c = $d['cards'][0];
        $orient = !empty($c['is_reversed']) ? 'Ngược' : 'Xuôi';
        return "Bạn là một đại tư tế Tarot đầy thông tuệ. Hôm nay người dùng đã bốc lá bài \"{$c['name']}\" ({$c['name_vi']}, chiều {$orient}).\nYÊU CẦU BẮT BUỘC: Viết một đoạn văn thật NGẮN GỌN (từ 3 đến 4 câu) mang đậm chất thơ và tâm linh để truyền thông điệp hoặc lời khuyên tổng quan cho ngày mới dựa trên lá bài này. KHÔNG dùng tiêu đề, KHÔNG trình bày gạch đầu dòng, KHÔNG chào hỏi. Viết thành một đoạn văn duy nhất truyền cảm hứng sâu sắc.";
    }

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
    $clarifications = $d['clarifications'] ?? [];

    $dob_str = $dob ? "Ngày sinh: **{$dob}**" : '';
    $gender_str = $gender ? "- **Giới tính:** {$gender}" : '';

    $clarify_str = '';
    if (!empty($clarifications)) {
        $clarify_str = "## Câu hỏi làm rõ & Câu trả lời của người dùng\n";
        foreach ($clarifications as $idx => $c) {
            $clarify_str .= "- **Q:** {$c['q']}\n";
            $clarify_str .= "- **A:** " . ($c['a'] === 'yes' ? 'Có / Đúng' : 'Không / Sai') . "\n\n";
        }
        $clarify_str .= "==> Hãy SỬ DỤNG MẠNH MẼ thông tin này để luận giải chính xác và thấm thía hơn!\n\n";
    }

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
{$gender_str}
- **Chủ đề:** {$theme}
- **Câu hỏi:** {$question}

YÊU CẦU ĐẶC BIỆT: Hãy xưng hô và đưa ra lời khuyên phù hợp dựa trên giới tính ({$gender}) và ngày sinh của người xem ({$name}). Phải liên kết yếu tố chiêm tinh, nguyên tố của các lá bài với ngày sinh của {$name} (để tính Bản mệnh/Cung/Con số năng lượng) nhằm đưa ra các nhận định cực kỳ sâu sắc và cá nhân hóa. Sử dụng cả phần "Phân tích chuyên sâu" của các lá bài để đào sâu vào hoàn cảnh của {$name}.

## Các lá bài đã rút
{$card_lines}

{$clarify_str}## Yêu cầu định dạng (Cực kỳ ngắn gọn)

Hãy viết luận giải XÚC TÍCH (tối đa 5-6 đoạn ngắn). Bắt buộc phải sử dụng tiêu đề H3 (###) và vạch kẻ (---) như cú pháp mẫu sau:

### Lời Hồi Đáp Từ Vũ Trụ
[Trả lời trực tiếp câu hỏi "{$question}" dựa trên kết hợp của các lá bài]

---

### Sự Mặc Khải
[Ý nghĩa sâu sắc của các lá bài đối với hoàn cảnh hiện tại]

---

### Hành Động Định Mệnh
- (Hành động 1)
- (Hành động 2)
- (Hành động 3)

**Phong cách:** Thẳng thắn, ngắn gọn, thiết thực, tập trung hoàn toàn vào câu hỏi. Sử dụng Markdown để trình bày mạch lạc. KHÔNG viết quá dài.
PROMPT;
}

function build_clarify_prompt(array $d): string
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

function call_gemini_analysis(string $prompt): string
{
    $payload = json_encode([
        'contents' => [ [ 'parts' => [['text' => $prompt]] ] ],
        'safetySettings' => [
            ['category' => 'HARM_CATEGORY_HARASSMENT', 'threshold' => 'BLOCK_NONE'],
            ['category' => 'HARM_CATEGORY_HATE_SPEECH', 'threshold' => 'BLOCK_NONE'],
            ['category' => 'HARM_CATEGORY_SEXUALLY_EXPLICIT', 'threshold' => 'BLOCK_NONE'],
            ['category' => 'HARM_CATEGORY_DANGEROUS_CONTENT', 'threshold' => 'BLOCK_NONE']
        ],
        'generationConfig' => [
            'temperature' => 1.2,
            'maxOutputTokens' => 30048,
            'topP' => 0.95,
        ]
    ], JSON_UNESCAPED_UNICODE);

    return _execute_gemini_curl($payload, 3);
}

function call_gemini_clarify(string $prompt): string
{
    $payload = json_encode([
        'contents' => [ [ 'parts' => [['text' => $prompt]] ] ],
        'generationConfig' => [
            'temperature' => 1.5,
            'maxOutputTokens' => 12048,
            'topP' => 0.95,
        ]
    ], JSON_UNESCAPED_UNICODE);

    return _execute_gemini_curl($payload, 1);
}

function _execute_gemini_curl(string $payload, int $max_retries = 3): string 
{
    $retry_delay = 2; // Initial sleep in seconds
    $attempt = 0;

    while ($attempt < $max_retries) {
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
        $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);

        if ($err) $http_code = 0;

        if ($http_code === 200) {
            $data = json_decode($resp, true);
            $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;
            if ($text) return $text;

            json_error('Vũ trụ tạm thời không thể tiếp nhận tín hiệu chứa năng lượng này.', 502);
        }

        if (in_array($http_code, [429, 500, 502, 503, 504]) || $http_code === 0) {
            $attempt++;
            if ($attempt >= $max_retries) break;
            sleep($retry_delay);
            $retry_delay *= 2; 
            continue;
        } else {
            json_error('Lỗi kết nối vũ trụ: HTTP ' . $http_code, $http_code);
        }
    }

    // All retries exhausted
    json_error('Vũ trụ đang bận xử lý quá nhiều tín hiệu cùng lúc, xin bạn vui lòng chờ vài giây rồi thử lại.', 503);
}
