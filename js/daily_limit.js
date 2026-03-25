// js/daily_limit.js — Daily reading limits with localStorage
(function () {
  const KEY = 'tbhb_daily';

  /* ── Today's date string "YYYY-MM-DD" ─────────────── */
  function today() {
    return new Date().toLocaleDateString('sv-SE'); // "YYYY-MM-DD" always
  }

  const FREE_DAILY_LIMIT = 3;

  /* ── Load / initialise today's log ────────────────── */
  function loadLog() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || '{}');
      if (raw.date === today()) {
        return raw.log || { total: 0 };
      }
    } catch {}
    return { total: 0 };
  }

  function saveLog(log) {
    localStorage.setItem(KEY, JSON.stringify({ date: today(), log }));
  }

  /* ── Record a reading ──────────────────────────────── */
  function record(theme, spread) {
    const log = loadLog();
    log.total = (log.total || 0) + 1;
    
    const k = `${theme}-${spread}`;
    log[k]  = (log[k] || 0) + 1;
    saveLog(log);
  }

  /* ── Check limits ──────────────────────────────────── */
  function check(theme, spread) {
    const log = loadLog();
    
    // Check global daily limit
    if ((log.total || 0) >= FREE_DAILY_LIMIT) {
      return 'blocked';
    }
    
    // Check if repeating exact same theme+spread
    const k = `${theme}-${spread}`;
    if ((log[k] || 0) >= 1) {
      return 'warn';
    }
    
    return 'ok';
  }

  /* ── Time until midnight ───────────────────────────── */
  function timeUntilMidnight() {
    const now  = new Date();
    const end  = new Date(now); end.setHours(23,59,59,0);
    const diff = end - now;
    const h    = Math.floor(diff / 3_600_000);
    const m    = Math.floor((diff % 3_600_000) / 60_000);
    return h > 0 ? `${h} giờ ${m} phút` : `${m} phút`;
  }

  /* ── Show blocked modal ────────────────────────────── */
  function showBlocked(theme) {
    const el = document.getElementById('dlBlockedModal');
    const limitEl = el.querySelector('.dlb-limit');
    if (limitEl) limitEl.textContent = FREE_DAILY_LIMIT;
    el.classList.add('visible');
  }

  /* ── Show warning modal, return a Promise<bool> ────── */
  // Resolves true = user wants to continue anyway
  function showWarning(theme) {
    return new Promise(resolve => {
      const el = document.getElementById('dlWarnModal');
      el.classList.add('visible');

      const btnContinue = el.querySelector('#dlwBtnContinue');
      const btnClose    = el.querySelector('#dlwBtnClose');

      function cleanup(result) {
        el.classList.remove('visible');
        btnContinue.replaceWith(btnContinue.cloneNode(true));
        btnClose.replaceWith(btnClose.cloneNode(true));
        resolve(result);
      }

      el.querySelector('#dlwBtnContinue').addEventListener('click', () => cleanup(true),  { once: true });
      el.querySelector('#dlwBtnClose')   .addEventListener('click', () => cleanup(false), { once: true });
      el.addEventListener('click', e => { if (e.target === el) cleanup(false); }, { once: true });
    });
  }

  /* ── Close blocked modal ───────────────────────────── */
  function closeBlocked() {
    document.getElementById('dlBlockedModal').classList.remove('visible');
  }

  /* ── Wire blocked close button ─────────────────────── */
  document.getElementById('dlbBtnClose').addEventListener('click', closeBlocked);
  document.getElementById('dlBlockedModal').addEventListener('click', e => {
    if (e.target === document.getElementById('dlBlockedModal')) closeBlocked();
  });

  /* ── Expose API ─────────────────────────────────────── */
  window.DailyLimit = { check, record, showBlocked, showWarning, timeUntilMidnight };
})();
