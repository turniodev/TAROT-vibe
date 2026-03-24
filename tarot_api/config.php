<?php
// ── Database ────────────────────────────────────────────
define('DB_HOST',    'localhost');
define('DB_NAME',    'vsssinie_tarot');
define('DB_USER',    'vsssinie_vsssinie');
define('DB_PASS',    'Turnio@3105');
define('DB_CHARSET', 'utf8mb4');

// ── Gemini API ──────────────────────────────────────────
define('GEMINI_API_KEY',  'YOUR_GEMINI_API_KEY_HERE');
define('GEMINI_MODEL',    'gemini-2.0-flash');
define('GEMINI_ENDPOINT', 'https://generativelanguage.googleapis.com/v1beta/models/' . GEMINI_MODEL . ':generateContent?key=' . GEMINI_API_KEY);

// ── CORS ────────────────────────────────────────────────
define('ALLOWED_ORIGIN', 'https://ka-en.com.vn');
