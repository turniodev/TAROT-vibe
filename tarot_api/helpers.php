<?php
// helpers.php — Shared response helpers

function cors_headers(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    // Allow ka-en.com.vn and localhost dev
    $allowed = [ALLOWED_ORIGIN, 'http://localhost', 'http://127.0.0.1'];
    if (in_array($origin, $allowed, true)) {
        header('Access-Control-Allow-Origin: ' . $origin);
    } else {
        header('Access-Control-Allow-Origin: ' . ALLOWED_ORIGIN);
    }
    header('Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Content-Type: application/json; charset=utf-8');
    if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
}

function json_ok(array $data): never {
    echo json_encode(array_merge(['status' => 'ok'], $data), JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    exit;
}

function json_error(string $msg, int $code = 400): never {
    http_response_code($code);
    echo json_encode(['status' => 'error', 'message' => $msg], JSON_UNESCAPED_UNICODE);
    exit;
}
