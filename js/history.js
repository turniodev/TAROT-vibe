// js/history.js — Compact reading history with localStorage
(function () {
  const KEY     = 'tbhb_hist';   // tarot-bi-history
  const MAX     = 20;            // max entries kept

  const THEME_LABEL = {
    love: 'Tình Yêu', career: 'Sự Nghiệp', finance: 'Tài Chính',
    health: 'Sức Khỏe', spiritual: 'Tâm Linh', general: 'Tổng Quát'
  };

  /* ── Storage helpers ───────────────────────────── */
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
  }
  function persist(arr) {
    localStorage.setItem(KEY, JSON.stringify(arr.slice(0, MAX)));
  }

  /* ── Save a reading (compact) ──────────────────── */
  // cards: array of card objects from ReadingModule.getSelectedCards()
  function save(session, cards) {
    if (!session || !cards?.length) return;
    const entry = {
      id:  Date.now(),
      n:   session.name,
      dob: session.dob,
      th:  session.theme,
      q:   (session.question || '').slice(0, 90),
      sp:  session.spread,
      dt:  new Date().toISOString().slice(0, 16), // "YYYY-MM-DDTHH:MM"
      c:   cards.map(c => ({ id: c.id, r: c.isReversed ? 1 : 0 }))
    };
    const hist = load();
    hist.unshift(entry);
    persist(hist);
  }

  /* ── Reconstruct card objects from compact data ── */
  function reconstruct(compact) {
    if (!window.TAROT_DB) return [];
    return compact.map(obj => {
      const card = window.TAROT_DB.find(c => c.id === obj.id);
      if (!card) return null;
      return { ...card, isReversed: obj.r === 1 };
    }).filter(Boolean);
  }

  /* ── Render history panel ──────────────────────── */
  function renderPanel() {
    const list = document.getElementById('historyList');
    if (!list) return;
    const hist = load();
    if (!hist.length) {
      list.innerHTML = `
        <div class="hist-empty">
          <div class="hist-empty-icon">✦</div>
          <p>Chưa có lịch sử trải bài</p>
          <p class="hist-empty-sub">Các buổi đọc bài sẽ được lưu tự động</p>
        </div>`;
      return;
    }

    list.innerHTML = hist.map((e, idx) => {
      const date    = e.dt.replace('T', ' ');
      const theme   = (window.TarotHelper?.getThemeLabel(e.th)) || e.th;
      const qText   = e.q || '(không có câu hỏi)';
      const cards   = reconstruct(e.c || []);
      const thumbs  = cards.slice(0, 5).map(c =>
        `<img class="hist-thumb${c.isReversed ? ' hist-thumb--rev' : ''}"
              src="${c.image}" alt="${c.name}" title="${c.name}${c.isReversed ? ' (Ngược)' : ''}" />`
      ).join('');

      return `
        <div class="hist-entry" data-idx="${idx}">
          <div class="hist-header">
            <div class="hist-meta">
              <span class="hist-theme">${theme}</span>
              <span class="hist-spread">${e.sp} lá</span>
            </div>
            <span class="hist-date">${date}</span>
          </div>
          <div class="hist-name">${e.n}${e.dob ? ` (Sinh: ${e.dob})` : ''}</div>
          <div class="hist-question">${qText}</div>
          <div class="hist-thumbs">${thumbs}</div>
          <div class="hist-actions">
            <button class="hist-btn-replay" data-idx="${idx}">Xem Lại</button>
            <button class="hist-btn-del"    data-idx="${idx}">Xoá</button>
          </div>
        </div>`;
    }).join('');

    // Replay
    list.querySelectorAll('.hist-btn-replay').forEach(btn => {
      btn.addEventListener('click', () => {
        const e = load()[parseInt(btn.dataset.idx)];
        if (!e) return;
        const cards   = reconstruct(e.c || []);
        const session = { name: e.n, dob: e.dob, theme: e.th, question: e.q, spread: e.sp };
        close();
        // Show analysis with reconstructed data
        document.querySelectorAll('.page').forEach(p => p.classList.remove('page--active'));
        document.getElementById('pageAnalysis').classList.add('page--active');
        setTimeout(() => {
          if (window.AnalysisModule) window.AnalysisModule.render(cards, session);
        }, 200);
      });
    });

    // Delete — show confirm modal first
    list.querySelectorAll('.hist-btn-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        const arr = load();
        const e   = arr[idx];
        if (!e) return;
        showDeleteConfirm(e, () => {
          arr.splice(idx, 1);
          persist(arr);
          renderPanel();
        });
      });
    });
  }

  /* ── Delete confirmation modal ──────────────────── */
  function showDeleteConfirm(entry, onConfirm) {
    document.getElementById('histDeleteConfirm')?.remove();

    const theme  = window.TarotHelper?.getThemeLabel(entry.th) || entry.th;
    const date   = entry.dt.replace('T', ' ');
    const qText  = entry.q || '(không có câu hỏi)';

    const modal = document.createElement('div');
    modal.id = 'histDeleteConfirm';
    modal.className = 'hist-confirm-overlay';
    modal.innerHTML = `
      <div class="hist-confirm-box">
        <div class="hist-confirm-icon">🗑</div>
        <div class="hist-confirm-title">Xác Nhận Xoá</div>
        <div class="hist-confirm-meta">${theme} · ${entry.sp} lá · ${date}</div>
        <div class="hist-confirm-q">"${qText}"</div>
        <div class="hist-confirm-actions">
          <button id="histConfirmCancel" class="hist-confirm-btn hist-confirm-btn--cancel">Huỷ</button>
          <button id="histConfirmDelete" class="hist-confirm-btn hist-confirm-btn--delete">Xoá</button>
        </div>
      </div>`;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));

    const dismiss = () => { modal.classList.remove('visible'); setTimeout(() => modal.remove(), 300); };
    modal.querySelector('#histConfirmCancel').addEventListener('click', dismiss);
    modal.querySelector('#histConfirmDelete').addEventListener('click', () => { dismiss(); onConfirm(); });
    modal.addEventListener('click', e => { if (e.target === modal) dismiss(); });
  }

  /* ── Open / Close panel ────────────────────────── */
  function open() {
    document.getElementById('historyPanel').classList.add('open');
    const ov = document.getElementById('historyOverlay');
    ov.style.opacity = '1';
    ov.style.pointerEvents = 'all';
    renderPanel();
    if (window.triggerLightning) window.triggerLightning();
  }
  function close() {
    document.getElementById('historyPanel').classList.remove('open');
    const ov = document.getElementById('historyOverlay');
    ov.style.opacity = '0';
    ov.style.pointerEvents = 'none';
  }

  /* ── Wire controls ─────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {});

  const btnOpen  = document.getElementById('btnHistory');
  const btnClose = document.getElementById('btnHistoryClose');
  const overlay  = document.getElementById('historyOverlay');

  if (btnOpen)  btnOpen.addEventListener('click',  open);
  if (btnClose) btnClose.addEventListener('click', close);
  if (overlay)  overlay.addEventListener('click',  close);

  const btnHistoryAnalysis = document.getElementById('btnHistoryAnalysis');
  if (btnHistoryAnalysis) btnHistoryAnalysis.addEventListener('click', open);

  /* ── Expose API ─────────────────────────────────── */
  window.HistoryModule = { save, open, close, renderPanel };
})();
