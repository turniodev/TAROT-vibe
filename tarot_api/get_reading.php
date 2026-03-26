<?php
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/db_connect.php";
require_once __DIR__ . "/helpers.php";

cors_headers();

// Support both ?share_id=xxx and ?id=xxx
$share_id = isset($_GET["share_id"]) ? $_GET["share_id"] : (isset($_GET["id"]) ? $_GET["id"] : '');
if (!$share_id) json_error("Share ID required", 400);

$pdo = get_pdo();

// Get reading info using share_id
$stmt = $pdo->prepare("
  SELECT r.id, r.theme, r.question, r.spread_count, r.gemini_analysis, r.created_at,
         u.name, u.dob
  FROM readings r
  JOIN users u ON r.user_id = u.id
  WHERE r.share_id = ? AND r.is_public = 1
");
$stmt->execute([$share_id]);
$reading = $stmt->fetch();

if (!$reading) json_error("Reading not found or private", 404);

// Obscure Data of Birth for privacy on public links (e.g. 1990-01-15 -> 1990-**-**)
if (!empty($reading['dob'])) {
    $parts = explode('-', $reading['dob']);
    if (count($parts) >= 1) {
        $reading['dob'] = $parts[0] . '-**-**';
    }
}

// Get cards using internal id
$internal_id = $reading['id'];

$c_stmt = $pdo->prepare("
  SELECT slot_idx, position_label, card_id as id, card_name as name, card_name_vi as name_vi,
         is_reversed, meaning
  FROM reading_cards
  WHERE reading_id = ?
  ORDER BY slot_idx
");
$c_stmt->execute([$internal_id]);
$cards = $c_stmt->fetchAll();

$reading["cards"] = $cards;
json_ok($reading);
