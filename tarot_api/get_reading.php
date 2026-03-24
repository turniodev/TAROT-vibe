<?php
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/db_connect.php";
require_once __DIR__ . "/helpers.php";

cors_headers();

$id = isset($_GET["id"]) ? (int)$_GET["id"] : 0;
if (!$id) json_error("Reading ID required", 400);

$pdo = get_pdo();

// Get reading info
$stmt = $pdo->prepare("
  SELECT r.id, r.theme, r.question, r.spread_count, r.gemini_analysis, r.created_at,
         u.name, u.dob
  FROM readings r
  JOIN users u ON r.user_id = u.id
  WHERE r.id = ?
");
$stmt->execute([$id]);
$reading = $stmt->fetch();

if (!$reading) json_error("Reading not found", 404);

// Get cards
$c_stmt = $pdo->prepare("
  SELECT slot_idx, position_label, card_id as id, card_name as name, card_name_vi as name_vi,
         is_reversed, meaning
  FROM reading_cards
  WHERE reading_id = ?
  ORDER BY slot_idx
");
$c_stmt->execute([$id]);
$cards = $c_stmt->fetchAll();

$reading["cards"] = $cards;
json_ok($reading);
