<?php
/**
 * get_history.php
 * GET /tarot_api/get_history.php?name=XX&dob=YYYY-MM-DD&limit=20&offset=0
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/helpers.php';

cors_headers();

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

$limit  = max(1, min(50, (int)($_GET['limit']  ?? 20)));
$offset = max(0, (int)($_GET['offset'] ?? 0));

$pdo = get_pdo();

// Find user
$user = $pdo->prepare('SELECT id, name, dob FROM users WHERE email = ? LIMIT 1');
$user->execute([$email]);
$userData = $user->fetch(PDO::FETCH_ASSOC);

if (!$userData) json_ok(['readings' => [], 'total' => 0]);

$user_id = $userData['id'];
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
$cs = $pdo->prepare('SELECT card_id as id, card_name as name, card_name_vi as name_vi, is_reversed as r FROM reading_cards WHERE reading_id = ? ORDER BY slot_idx');
foreach ($readings as &$r) {
    // Append user data for the frontend mapping logic
    $r['n']   = $userData['name'];
    $r['dob'] = $userData['dob'];
    
    // Map schema for history.js
    $r['th'] = $r['theme'];
    $r['q']  = $r['question'];
    $r['sp'] = (int)$r['spread_count'];
    $r['dt'] = str_replace(' ', 'T', $r['created_at']);
    $r['ai'] = $r['gemini_analysis'];
    
    $cs->execute([$r['id']]);
    $r['c'] = $cs->fetchAll(PDO::FETCH_ASSOC);
    
    // Cleanup unnecessary raw keys
    unset($r['theme'], $r['question'], $r['spread_count'], $r['created_at'], $r['gemini_analysis']);
}
unset($r);

json_ok(['readings' => $readings, 'total' => $total]);
