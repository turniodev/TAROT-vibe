<?php
/**
 * get_top_topics.php
 * POST/GET /tarot_api/get_top_topics.php
 * Trả về danh sách 10 chủ đề được hỏi nhiều nhất, có cache file để tối ưu performance.
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/helpers.php';

cors_headers();

$cache_file = __DIR__ . '/top_topics_cache.json';
$cache_ttl = 3600; // 1 hour

// Check if cache exists and is fresh
if (file_exists($cache_file) && (time() - filemtime($cache_file) < $cache_ttl)) {
    $data = file_get_contents($cache_file);
    header('Content-Type: application/json');
    echo $data;
    exit;
}

try {
    $pdo = get_pdo();
    // Query to get top 10 topics by count
    $stmt = $pdo->query("SELECT theme, COUNT(id) as count FROM readings GROUP BY theme ORDER BY count DESC LIMIT 10");
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $response = [
        'status' => 'success',
        'data' => $results,
        'cached_at' => date('c')
    ];

    $json_output = json_encode($response, JSON_UNESCAPED_UNICODE);
    
    // Write to cache
    file_put_contents($cache_file, $json_output);

    header('Content-Type: application/json');
    echo $json_output;
} catch (Exception $e) {
    json_error('Failed to retrieve top topics: ' . $e->getMessage(), 500);
}
