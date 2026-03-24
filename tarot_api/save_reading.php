<?php
/**
 * save_reading.php
 * POST /tarot_api/save_reading.php
 * Lưu lịch sử trải bài (không gọi Gemini)
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/helpers.php';

cors_headers();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') json_error('Method not allowed', 405);

$body = json_decode(file_get_contents('php://input'), true);
if (!$body || empty($body['cards'])) json_error('Invalid payload', 400);

$pdo  = get_pdo();
$name = trim($body['name'] ?? '');
$dob  = $body['dob'] ?: null;

// Upsert user
$pdo->prepare('INSERT INTO users (name, dob) VALUES (?, ?) ON DUPLICATE KEY UPDATE last_seen = NOW()')
    ->execute([$name, $dob]);
$user_id = $pdo->query('SELECT id FROM users WHERE name = ' . $pdo->quote($name) .
    ' AND dob ' . ($dob ? '= ' . $pdo->quote($dob) : 'IS NULL') . ' LIMIT 1')->fetchColumn();

// Insert reading
$stmt = $pdo->prepare('INSERT INTO readings (user_id, theme, question, spread_count) VALUES (?,?,?,?)');
$stmt->execute([$user_id, $body['theme'] ?? 'general', $body['question'] ?? '', count($body['cards'])]);
$reading_id = (int)$pdo->lastInsertId();

// Insert cards
$cs = $pdo->prepare('INSERT INTO reading_cards (reading_id, slot_idx, position_label, card_id, card_name, card_name_vi, is_reversed, meaning) VALUES (?,?,?,?,?,?,?,?)');
foreach ($body['cards'] as $c) {
    $cs->execute([$reading_id, (int)$c['slot_idx'], $c['position_label'] ?? '', $c['id'] ?? '', $c['name'] ?? '', $c['name_vi'] ?? '', $c['is_reversed'] ? 1 : 0, $c['meaning'] ?? '']);
}

json_ok(['reading_id' => $reading_id]);
