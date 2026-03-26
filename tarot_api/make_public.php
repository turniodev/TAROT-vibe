<?php
require_once __DIR__ . "/config.php";
require_once __DIR__ . "/db_connect.php";
require_once __DIR__ . "/helpers.php";

cors_headers();

$id = isset($_GET["id"]) ? (int)$_GET["id"] : 0;
if (!$id) json_error("Reading ID required", 400);

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
    json_error('Unauthorized. Please login to share.', 401);
}

$pdo = get_pdo();

// Check if share_id already exists AND verify the reading belongs to the logged-in user
$stmt = $pdo->prepare("
  SELECT r.share_id 
  FROM readings r 
  JOIN users u ON r.user_id = u.id 
  WHERE r.id = ? AND u.email = ?
");
$stmt->execute([$id, $email]);
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
