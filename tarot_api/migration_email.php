<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/db_connect.php';

try {
    $pdo = get_pdo();
    
    // Check if email column exists
    $stmt = $pdo->query("SHOW COLUMNS FROM `users` LIKE 'email'");
    if ($stmt->rowCount() == 0) {
        $pdo->exec("ALTER TABLE `users` ADD COLUMN `email` VARCHAR(255) NULL UNIQUE AFTER `id`");
        echo "Added email column.\\n";
    }

    // Try to drop uq_name_dob if it exists securely handling duplicate keys
    try {
        $pdo->exec("ALTER TABLE `users` DROP INDEX `uq_name_dob`");
        echo "Dropped uq_name_dob constraint.\\n";
    } catch(Exception $e) {}

    // Add index on email
    try {
        $pdo->exec("ALTER TABLE `users` ADD INDEX `idx_email` (`email`)");
        echo "Added index idx_email.\\n";
    } catch(Exception $e) {}

    echo "Migration completed successfully.";
} catch (Exception $e) {
    echo "Error: " . $e->getMessage();
}
