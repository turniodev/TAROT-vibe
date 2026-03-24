<?php
// Test liên kết cơ sở dữ liệu
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db_connect.php';

header('Content-Type: application/json; charset=utf-8');

try {
    $pdo = get_pdo();
    
    // Thử truy vấn 1 bảng để kiểm tra
    $stmt = $pdo->query('SHOW TABLES');
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Đã kết nối cơ sở dữ liệu "' . DB_NAME . '" thành công!',
        'tables_found' => $tables
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Lỗi kết nối cơ sở dữ liệu',
        'error_details' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
}
