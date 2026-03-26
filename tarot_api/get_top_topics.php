<?php
/**
 * get_top_topics.php
 * POST/GET /tarot_api/get_top_topics.php
 * Trả về danh sách 10 chủ đề được hỏi nhiều nhất, tối ưu cực trâu cho High Concurrency (Chống Thundering Herd)
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/helpers.php';

cors_headers();

$cache_file = __DIR__ . '/top_topics_cache.json';
$lock_file  = __DIR__ . '/top_topics_cache.lock';
$cache_ttl = 3600; // 1 hour

// 1. Nếu cache còn hạn -> Trả về ngay lập tức
if (file_exists($cache_file) && (time() - filemtime($cache_file) < $cache_ttl)) {
    header('Content-Type: application/json');
    readfile($cache_file); // Đọc file trực tiếp ra buffer, nhanh hơn file_get_contents + echo
    exit;
}

// 2. Cache ĐÃ HẾT HẠN hoặc CHƯA TỒN TẠI.
// Mở file lock để chuẩn bị tranh quyền update
$fp = fopen($lock_file, 'c+');

// Thử khóa file KHÔNG CHỜ ĐỢI (LOCK_EX | LOCK_NB)
// Lệnh này chống Thundering Herd: Nếu 1000 user ập vào cùng lúc, 
// chỉ có 1 request lấy được khóa, 999 request còn lại sẽ bay xuống nhánh else.
if (flock($fp, LOCK_EX | LOCK_NB)) {
    try {
        // Đã dành quyền độc quyền. Query DB:
        $pdo = get_pdo();
        $stmt = $pdo->query("SELECT theme, COUNT(id) as count FROM readings GROUP BY theme ORDER BY count DESC LIMIT 10");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        $response = [
            'status' => 'success',
            'data' => $results,
            'cached_at' => date('c')
        ];

        $json_output = json_encode($response, JSON_UNESCAPED_UNICODE);
        
        // Ghi vào file cache an toàn
        file_put_contents($cache_file, $json_output, LOCK_EX);

        header('Content-Type: application/json');
        echo $json_output;

    } catch (Exception $e) {
        json_error('Failed to retrieve top topics: ' . $e->getMessage(), 500);
    } finally {
        // Nhả khóa
        flock($fp, LOCK_UN);
        fclose($fp);
    }
} else {
    // Có một process khác ĐANG query database rồi.
    // Đừng bắt user này phải chờ hay query tiếp. Hãy trả ngay cho họ bản Cache Cũ (Stale Cache)
    fclose($fp);
    if (file_exists($cache_file)) {
        header('Content-Type: application/json');
        readfile($cache_file);
        exit;
    } else {
        // Xui dã man: Cache chưa từng được tạo lần nào mà vướng lock.
        // Đành bắt user nhận mảng rỗng tạm (thường chỉ 1s đầu tiên của vòng đời app)
        json_ok(['data' => [], 'cached_at' => null, 'note' => 'warming_up']);
    }
}
