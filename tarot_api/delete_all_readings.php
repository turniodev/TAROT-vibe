<?php
/**
 * delete_all_readings.php
 * DELETE /tarot_api/delete_all_readings.php
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/helpers.php';

cors_headers();
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE' && $_SERVER['REQUEST_METHOD'] !== 'POST') json_error('Method not allowed', 405);

// Authenticate user via Google Token
$auth_header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$id_token = str_starts_with($auth_header, 'Bearer ') ? trim(substr($auth_header, 7)) : '';
$email = null;

if ($id_token) {
    $url = 'https://oauth2.googleapis.com/tokeninfo?id_token=' . urlencode($id_token);
    $res = @file_get_contents($url);
    $info = $res ? json_decode($res, true) : null;
    if ($info && !isset($info['error']) && !empty($info['email'])) {
        $email = strtolower(trim($info['email']));
    }
}

if (!$email) {
    json_error('Unauthorized', 401);
}

$pdo = get_pdo();

// Ensure user deleting it owns it
$stmt = $pdo->prepare('DELETE r FROM readings r JOIN users u ON r.user_id = u.id WHERE u.email = ?');
$stmt->execute([$email]);
$deleted = $stmt->rowCount();

json_ok(['deleted_count' => $deleted]);
