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

$body = json_decode(file_get_contents('php://input'), true);
$id   = (int)($body['reading_id'] ?? 0);
if ($id <= 0) json_error('reading_id required', 400);

$pdo = get_pdo();
$pdo->prepare('DELETE FROM readings WHERE id = ?')->execute([$id]);

json_ok(['deleted' => $id]);
