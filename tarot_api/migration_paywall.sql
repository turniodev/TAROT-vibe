-- ─────────────────────────────────────────────────────────
-- Cập nhật cấu trúc Database cho tính năng Paywall
-- Tên: migration_paywall.sql
-- ─────────────────────────────────────────────────────────

-- 1. Thêm 2 cột quản lý gói cước vào bảng users hiện tại
ALTER TABLE `users` 
ADD COLUMN `plan_type` ENUM('free', 'guide', 'master') NOT NULL DEFAULT 'free' COMMENT 'free=3, guide=5, master=VO_HAN',
ADD COLUMN `plan_expiry_date` DATETIME NULL DEFAULT NULL COMMENT 'Ngày hết hạn gói cước Pro';

-- 2. Hướng dẫn nhanh cho BE Dev:
-- Khi thanh toán thành công (Webhook trả về):
-- Nếu mua gói 29.000đ (Guide):
--   UPDATE users SET plan_type = 'guide', plan_expiry_date = DATE_ADD(NOW(), INTERVAL 30 DAY) WHERE email = '...';
-- Nếu mua gói 109.000đ (Master):
--   UPDATE users SET plan_type = 'master', plan_expiry_date = DATE_ADD(NOW(), INTERVAL 30 DAY) WHERE email = '...';
