<?php
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/db_connect.php";
require_once __DIR__ . "/helpers.php";

cors_headers();

$id = isset($_GET["id"]) ? (int)$_GET["id"] : 0;
if (!$id) json_error("Reading ID required", 400);

$pdo = get_pdo();

// Check if share_id already exists
$stmt = $pdo->prepare("SELECT share_id FROM readings WHERE id = ?");
$stmt->execute([$id]);
$row = $stmt->fetch();

if (!$row) {
    json_error("Reading not found", 404);
}

$share_id = $row['share_id'];
if (!$share_id) {
    // Generate a new random share_id, e.g., 16 characters
    $share_id = bin2hex(random_bytes(8));
    $stmt = $pdo->prepare("UPDATE readings SET is_public = 1, share_id = ? WHERE id = ?");
    $stmt->execute([$share_id, $id]);
} else {
    // Just make it public
    $stmt = $pdo->prepare("UPDATE readings SET is_public = 1 WHERE id = ?");
    $stmt->execute([$id]);
}

json_ok(["success" => true, "share_id" => $share_id]);
