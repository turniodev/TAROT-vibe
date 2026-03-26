<?php
require_once __DIR__ . '/db_connect.php';
$pdo = get_pdo();

// Check if status column exists
$stmt = $pdo->query("SHOW COLUMNS FROM users");
$columns = $stmt->fetchAll(PDO::FETCH_ASSOC);
$hasStatus = false;
foreach ($columns as $c) {
    if ($c['Field'] === 'status') {
        $hasStatus = true;
        break;
    }
}

if (!$hasStatus) {
    echo "Adding status column to users table...\n";
    $pdo->exec("ALTER TABLE users ADD COLUMN status VARCHAR(20) DEFAULT 'active'");
    echo "Column added successfully.\n";
} else {
    echo "Column status already exists.\n";
}
