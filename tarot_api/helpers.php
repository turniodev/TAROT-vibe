<?php
// helpers.php — Shared response helpers

function cors_headers(): void {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '*';
    if (!$origin) $origin = '*';
    
    // Mở full CORS
    header('Access-Control-Allow-Origin: ' . $origin);
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

function verify_google_token(): string {
    $auth = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    $token = str_starts_with($auth, 'Bearer ') ? trim(substr($auth, 7)) : '';

    if (!$token) {
        json_error('Authentication required', 401);
    }

    // Verify via Google's tokeninfo endpoint
    $url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' . urlencode($token);
    $res = @file_get_contents($url);
    $info = $res ? json_decode($res, true) : null;

    if (!$info || isset($info['error']) || empty($info['email'])) {
        json_error('Invalid or expired Google token', 401);
    }
    return $info['email'];
}
