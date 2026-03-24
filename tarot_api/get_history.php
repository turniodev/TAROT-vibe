<?php
/**
 * get_history.php
 * GET /tarot_api/get_history.php?name=XX&dob=YYYY-MM-DD&limit=20&offset=0
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/helpers.php';

cors_headers();

$name   = trim($_GET['name']   ?? '');
$dob    = trim($_GET['dob']    ?? '') ?: null;
$limit  = max(1, min(50, (int)($_GET['limit']  ?? 20)));
$offset = max(0, (int)($_GET['offset'] ?? 0));

if (!$name) json_error('name required', 400);

$pdo = get_pdo();

// Find user
$user = $pdo->prepare('SELECT id FROM users WHERE name = ? AND dob ' . ($dob ? '= ?' : 'IS NULL') . ' LIMIT 1');
$user->execute($dob ? [$name, $dob] : [$name]);
$user_id = $user->fetchColumn();
if (!$user_id) json_ok(['readings' => [], 'total' => 0]);

// Count
$total = (int)$pdo->prepare('SELECT COUNT(*) FROM readings WHERE user_id = ?')
    ->execute([$user_id]) ? $pdo->query("SELECT FOUND_ROWS()")->fetchColumn() : 0;
$cnt_stmt = $pdo->prepare('SELECT COUNT(*) FROM readings WHERE user_id = ?');
$cnt_stmt->execute([$user_id]);
$total = (int)$cnt_stmt->fetchColumn();

// Readings
$rs = $pdo->prepare('SELECT id, theme, question, spread_count, gemini_analysis, created_at FROM readings WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?');
$rs->execute([$user_id, $limit, $offset]);
$readings = $rs->fetchAll();

// Cards per reading
$cs = $pdo->prepare('SELECT slot_idx, position_label, card_id, card_name, card_name_vi, is_reversed FROM reading_cards WHERE reading_id = ? ORDER BY slot_idx');
foreach ($readings as &$r) {
    $cs->execute([$r['id']]);
    $r['cards'] = $cs->fetchAll();
}
unset($r);

json_ok(['readings' => $readings, 'total' => $total]);
