<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db_connect.php';
try {
    $pdo = get_pdo();
    
    try {
        $pdo->exec("ALTER TABLE readings ADD COLUMN is_public TINYINT(1) DEFAULT 0");
        echo "Column is_public added.\n<br>";
    } catch (Exception $e) { /* might already exist */ }
    
    try {
        $pdo->exec("ALTER TABLE readings ADD COLUMN share_id VARCHAR(64) UNIQUE DEFAULT NULL");
        echo "Column share_id added.\n<br>";
    } catch (Exception $e) { /* might already exist */ }
    
    echo "Done setup.\n";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
