<?php
/**
 * delete_reading.php
 * DELETE /tarot_api/delete_reading.php   body: {"reading_id": 123}
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/helpers.php';

cors_headers();
if ($_SERVER['REQUEST_METHOD'] !== 'DELETE' && $_SERVER['REQUEST_METHOD'] !== 'POST') json_error('Method not allowed', 405);

$email = verify_google_token();

$body = json_decode(file_get_contents('php://input'), true);
$id   = (int)($_GET['id'] ?? $body['reading_id'] ?? 0);
if ($id <= 0) json_error('reading_id required', 400);

$pdo = get_pdo();

// Ensure user deleting it owns it
$pdo->prepare('DELETE r FROM readings r JOIN users u ON r.user_id = u.id WHERE r.id = ? AND u.email = ?')
    ->execute([$id, $email]);

json_ok(['deleted' => $id]);
