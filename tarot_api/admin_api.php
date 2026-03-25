<?php
/**
 * admin_api.php — Admin-only data API (password protected)
 * GET /tarot_api/admin_api.php?action=readings&page=1
 * GET /tarot_api/admin_api.php?action=stats
 * GET /tarot_api/admin_api.php?action=users
 * GET /tarot_api/admin_api.php?action=reading&id=123
 *
 * Requires: Authorization: Bearer ADMIN_SECRET header
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db_connect.php';
require_once __DIR__ . '/helpers.php';

cors_headers();

// ── Admin secret key (change this!) ─────────────────────
define('ADMIN_SECRET', 'tarot_admin_2025_secret');

// ── Authenticate ─────────────────────────────────────────
$auth  = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$token = str_starts_with($auth, 'Bearer ') ? trim(substr($auth, 7)) : '';
if ($token !== ADMIN_SECRET) {
    json_error('Unauthorized', 401);
}

$pdo    = get_pdo();
$action = $_GET['action'] ?? 'readings';
$page   = max(1, (int)($_GET['page'] ?? 1));
$limit  = 20;
$offset = ($page - 1) * $limit;
$search = trim($_GET['q'] ?? '');

// ── Action: Stats ────────────────────────────────────────
if ($action === 'stats') {
    $today   = date('Y-m-d');
    $weekAgo = date('Y-m-d', strtotime('-7 days'));

    $stats   = $pdo->query("
        SELECT
            (SELECT COUNT(*) FROM users) AS total_users,
            (SELECT COUNT(*) FROM readings) AS total_readings,
            (SELECT COUNT(*) FROM readings WHERE DATE(created_at) = '$today') AS today_readings,
            (SELECT COUNT(*) FROM readings WHERE DATE(created_at) >= '$weekAgo') AS week_readings,
            (SELECT theme FROM readings GROUP BY theme ORDER BY COUNT(*) DESC LIMIT 1) AS top_theme
    ")->fetch(PDO::FETCH_ASSOC);

    $themeBreakdown = $pdo->query("
        SELECT theme, COUNT(*) AS cnt FROM readings GROUP BY theme ORDER BY cnt DESC LIMIT 10
    ")->fetchAll(PDO::FETCH_ASSOC);

    $dailyTrend = $pdo->query("
        SELECT DATE(created_at) AS day, COUNT(*) AS cnt
        FROM readings WHERE created_at >= '$weekAgo'
        GROUP BY day ORDER BY day ASC
    ")->fetchAll(PDO::FETCH_ASSOC);

    json_ok([
        'stats'         => $stats,
        'theme_breakdown' => $themeBreakdown,
        'daily_trend'   => $dailyTrend,
    ]);
}

// ── Action: Users ────────────────────────────────────────
if ($action === 'users') {
    $where = $search ? "WHERE u.email LIKE :q OR u.name LIKE :q" : '';
    $stmt = $pdo->prepare("
        SELECT u.id, u.email, u.name, u.dob, u.plan_type, u.plan_expiry_date, u.last_seen,
               COUNT(r.id) AS reading_count,
               MAX(r.created_at) AS last_reading
        FROM users u
        LEFT JOIN readings r ON r.user_id = u.id
        $where
        GROUP BY u.id
        ORDER BY last_reading DESC
        LIMIT $limit OFFSET $offset
    ");
    if ($search) $stmt->bindValue(':q', '%' . $search . '%');
    $stmt->execute();
    $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $total = (int)$pdo->query("SELECT COUNT(*) FROM users")->fetchColumn();
    json_ok(['users' => $users, 'total' => $total, 'page' => $page]);
}

// ── Action: Single reading detail ────────────────────────
if ($action === 'reading') {
    $id   = (int)($_GET['id'] ?? 0);
    $stmt = $pdo->prepare("
        SELECT r.*, u.name, u.email, u.dob
        FROM readings r JOIN users u ON u.id = r.user_id
        WHERE r.id = ?
    ");
    $stmt->execute([$id]);
    $reading = $stmt->fetch(PDO::FETCH_ASSOC);
    if (!$reading) json_error('Not found', 404);

    $cards = $pdo->prepare("SELECT * FROM reading_cards WHERE reading_id = ? ORDER BY slot_idx");
    $cards->execute([$id]);
    $reading['cards'] = $cards->fetchAll(PDO::FETCH_ASSOC);

    json_ok(['reading' => $reading]);
}

// ── Action: Readings list ────────────────────────────────
$searchCond = '';
$params     = [];
if ($search) {
    $searchCond = 'WHERE u.name LIKE :q OR u.email LIKE :q OR r.question LIKE :q OR r.theme LIKE :q';
    $params[':q'] = '%' . $search . '%';
}

$stmt = $pdo->prepare("
    SELECT r.id, r.theme, r.question, r.spread_count, r.created_at,
           u.name, u.email, u.dob,
           LEFT(r.gemini_analysis, 300) AS analysis_preview,
           (SELECT COUNT(*) FROM reading_cards rc WHERE rc.reading_id = r.id) AS card_count
    FROM readings r JOIN users u ON u.id = r.user_id
    $searchCond
    ORDER BY r.created_at DESC
    LIMIT $limit OFFSET $offset
");
foreach ($params as $k => $v) $stmt->bindValue($k, $v);
$stmt->execute();
$readings = $stmt->fetchAll(PDO::FETCH_ASSOC);

$cntStmt = $pdo->prepare("
    SELECT COUNT(*) FROM readings r JOIN users u ON u.id = r.user_id $searchCond
");
foreach ($params as $k => $v) $cntStmt->bindValue($k, $v);
$cntStmt->execute();
$total = (int)$cntStmt->fetchColumn();

// Cards for each reading preview
$cardStmt = $pdo->prepare("
    SELECT card_name, card_name_vi, is_reversed, slot_idx, position_label
    FROM reading_cards WHERE reading_id = ? ORDER BY slot_idx
");
foreach ($readings as &$r) {
    $cardStmt->execute([$r['id']]);
    $r['cards'] = $cardStmt->fetchAll(PDO::FETCH_ASSOC);
}
unset($r);

json_ok(['readings' => $readings, 'total' => $total, 'page' => $page, 'pages' => ceil($total / $limit)]);
