-- ================================================================
-- Tarot DB Schema
-- Run once on vsssinie_tarot database
-- ================================================================

SET NAMES utf8mb4;
SET foreign_key_checks = 0;

-- ── Users ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `users` (
  `id`         INT          UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name`       VARCHAR(255) NOT NULL,
  `email`      VARCHAR(255) NULL UNIQUE,
  `dob`        DATE         NULL,
  `created_at` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_seen`  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Readings ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `readings` (
  `id`               INT          UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id`          INT          UNSIGNED NULL,
  `theme`            VARCHAR(60)  NOT NULL DEFAULT 'general',
  `question`         TEXT         NULL,
  `spread_count`     TINYINT      UNSIGNED NOT NULL DEFAULT 3,
  `gemini_analysis`  LONGTEXT     NULL,
  `created_at`       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  KEY `idx_user_id`   (`user_id`),
  KEY `idx_created`   (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ── Reading Cards ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `reading_cards` (
  `id`             INT          UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `reading_id`     INT          UNSIGNED NOT NULL,
  `slot_idx`       TINYINT      UNSIGNED NOT NULL,
  `position_label` VARCHAR(120) NOT NULL DEFAULT '',
  `card_id`        VARCHAR(80)  NOT NULL,
  `card_name`      VARCHAR(120) NOT NULL,
  `card_name_vi`   VARCHAR(120) NOT NULL DEFAULT '',
  `is_reversed`    TINYINT(1)   NOT NULL DEFAULT 0,
  `meaning`        TEXT         NULL,
  FOREIGN KEY (`reading_id`) REFERENCES `readings`(`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  KEY `idx_reading_id` (`reading_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET foreign_key_checks = 1;
