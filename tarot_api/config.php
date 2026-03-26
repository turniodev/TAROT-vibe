<?php
// ── Database ────────────────────────────────────────────
define('DB_HOST', '');
define('DB_NAME', '');
define('DB_USER', '');
define('DB_PASS', '');
define('DB_CHARSET', '');

// ── Gemini API ──────────────────────────────────────────
define('GEMINI_API_KEY', 'YOUR_GEMINI_API_KEY_HERE');
define('GEMINI_MODEL', 'gemini-2.5-flash');
define('GEMINI_ENDPOINT', 'https://generativelanguage.googleapis.com/v1beta/models/' . GEMINI_MODEL . ':generateContent?key=' . GEMINI_API_KEY);

// ── CORS ────────────────────────────────────────────────
define('ALLOWED_ORIGIN', 'https://');
