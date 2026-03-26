// js/history.js — Compact reading history with localStorage + Remote Sync
(function () {
  const KEY = 'tbhb_hist';   // tarot-bi-history
  const MAX = 20;            // max entries kept

  const THEME_LABEL = {
    // Love
    love: 'Tình Yêu', ex: 'Người Yêu Cũ', current_love: 'Người Yêu Hiện Tại',
    ambiguous: 'Mối Quan Hệ Mập Mờ', crush: 'Crush / Thầm Thích',
    future_love: 'Tình Duyên Tương Lai', someone: 'Người Ấy',
    marriage: 'Hôn Nhân', conflict: 'Giải Quyết Xung Đột',
    breakup: 'Chia Tay & Hàn Gắn', long_distance: 'Yêu Xa',
    jealousy: 'Người Thứ Ba / Ghen Tuông', self_love: 'Yêu Bản Thân',
    finding_love: 'Tìm Kiếm Tình Yêu', compatibility: 'Độ Tương Hợp',
    toxic_relationship: 'Q/hệ Độc Hại', soulmate: 'Tri Kỷ / Soulmate', reconciliation: 'Gương Vỡ Lại Lành', secret_admirer: 'Người Thầm Thương',
    friendship: 'Tình Bạn / Tri Kỷ', pregnancy: 'Con Cái / Thai Kỳ', gossip: 'Thị Phi / Đàm Tiếu',
    // Career
    career: 'Sự Nghiệp', job_search: 'Xin Việc Làm', promotion: 'Thăng Tiến',
    business: 'Kinh Doanh / Khởi Nghiệp', colleague: 'Quan Hệ Đồng Nghiệp',
    career_change: 'Chuyển Nghề', freelance: 'Freelance / Tự Do', interview: 'Phỏng Vấn',
    legal: 'Pháp Lý / Giấy Tờ', moving: 'Chuyển Chỗ',
    burnout: 'Kiệt Sức', startup: 'Khởi Nghiệp', workplace_politics: 'Thị Phi Công Sở', side_hustle: 'Nghề Tay Trái',
    // Finance
    finance: 'Tài Chính', investment: 'Đầu Tư / Chứng Khoán',
    debt: 'Nợ Nần / Vay Mượn', savings: 'Tiết Kiệm & Tích Lũy', luck_money: 'Lộc Tài / May Mắn',
    real_estate: 'Bất Động Sản', financial_loss: 'Thua Lỗ', sudden_wealth: 'Vận May Bất Ngờ',
    // Health
    health: 'Sức Khỏe', mental: 'Sức Khỏe Tâm Thần', energy: 'Năng Lượng & Chakra',
    family: 'Gia Đình', diet: 'Điều Độ / Chăm Sóc Bản Thân', pet: 'Thú Cưng',
    healing: 'Chữa Lành Tâm Hồn', stress: 'Căng Thẳng', trauma: 'Tổn Thương Quá Khứ',
    // Self
    study: 'Học Tập', study_abroad: 'Du Học', self: 'Bản Thân',
    purpose: 'Sứ Mệnh / Mục Đích Sống', shadow_self: 'Bóng Tối Nội Tâm',
    decision: 'Ra Quyết Định', travel: 'Du Lịch / Di Chuyển', spiritual: 'Tâm Linh',
    dream: 'Giải Mã Giấc Mơ', past_life: 'Tiền Kiếp', karma: 'Nghiệp Quả (Karma)', lost_item: 'Tìm Đồ Thất Lạc',
    exams: 'Thi Cử', scholarship: 'Học Bổng', talent: 'Năng Khiếu', spirit_guide: 'Thần Hộ Mệnh',
    // General
    general: 'Tổng Quát', more: 'Tổng Quát'
  };

  /* ── Storage helpers ───────────────────────────── */
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { return []; }
  }
  function persist(arr) {
    localStorage.setItem(KEY, JSON.stringify(arr.slice(0, MAX)));
  }

  function save(session, cards) {
    if (!session || !cards?.length) return;
    const entry = {
      id: Date.now(),
      n: session.name,
      dob: session.dob,
      gd: session.gender,
      th: session.theme,
      q: (session.question || '').slice(0, 90),
      sp: session.spread,
      dt: new Date().toISOString().slice(0, 16),
      c: cards.map(c => ({ id: c.id, r: c.isReversed ? 1 : 0 }))
    };
    const hist = load();
    hist.unshift(entry);
    persist(hist);
    return entry.id;
  }

  function updateAnalysis(id, aiMarkdown) {
    if (window._histCache) {
      const e = window._histCache.find(x => x.id === id);
      if (e) {
        e.ai = aiMarkdown;
      }
    }
    
    // Fallback sync for local storage if viewing a local id
    const hist = load();
    const lc = hist.find(x => x.id === id);
    if (lc) {
      lc.ai = aiMarkdown;
      persist(hist);
    }
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
  async function renderPanel() {
    const list = document.getElementById('historyList');
    if (!list) return;

    let hist = load(); // Start with local storage

    if (window.AuthModule?.isLoggedIn()) {
      try {
        const res = await fetch(`https://ka-en.com.vn/tarot_api/get_history.php?limit=20&t=${Date.now()}`, {
          headers: { 'Authorization': `Bearer ${window.AuthModule.getToken()}` }
        });
        if (res.ok) {
          const data = await res.json();
          const remote = data.readings || [];

          // Merge remote and local, deduplicate by dt+name
          const seen = new Set();
          const merged = [];
          for (const r of [...remote, ...hist]) {
            const key = r.dt.slice(0, 16) + '|' + r.n;
            if (!seen.has(key)) {
              seen.add(key);
              merged.push(r);
            }
          }
          hist = merged.sort((a, b) => b.dt.localeCompare(a.dt)).slice(0, MAX);
        }
      } catch (err) { }
    }

    window._histCache = hist;

    if (!hist.length) {
      list.innerHTML = `
        <div class="hist-empty">
          <div class="hist-empty-icon">✦</div>
          <p>Chưa có lịch sử trải bài</p>
          <p class="hist-empty-sub">Các buổi đọc bài sẽ được lưu tự động trên thiết bị hoặc mây.</p>
        </div>`;
      return;
    }

    list.innerHTML = hist.map((e, idx) => {
      const date = e.dt.replace('T', ' ');
      const theme = (window.TarotHelper?.getThemeLabel(e.th)) || THEME_LABEL[e.th] || e.th;
      const qText = e.q || '(không có câu hỏi)';
      const cards = reconstruct(e.c || []);
      const thumbs = cards.slice(0, 5).map(c =>
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
          <div class="hist-name">${e.n}${e.dob ? ` (Sinh: ${e.dob})` : ''}${e.gd ? ` - ${e.gd}` : ''}</div>
          <div class="hist-question">${qText}</div>
          <div class="hist-thumbs">${thumbs}</div>
          <div class="hist-actions">
            <button class="hist-btn-replay" data-idx="${idx}">Xem Lại</button>
            <button class="hist-btn-del"    data-idx="${idx}">Thanh tẩy</button>
          </div>
        </div>`;
    }).join('');

    // Replay
    list.querySelectorAll('.hist-btn-replay').forEach(btn => {
      btn.addEventListener('click', () => {
        const e = window._histCache[parseInt(btn.dataset.idx)];
        if (!e) return;
        const cards = reconstruct(e.c || []);
        const session = { name: e.n, dob: e.dob, gender: e.gd, theme: e.th, question: e.q, spread: e.sp, isHistoryReplay: true, readingId: e.id, dt: e.dt || null };
        close();
        document.querySelectorAll('.page').forEach(p => p.classList.remove('page--active'));
        document.getElementById('pageAnalysis').classList.add('page--active');
        setTimeout(() => {
          if (window.AnalysisModule) window.AnalysisModule.render(cards, session, e.ai);
        }, 200);
      });
    });

    // Delete
    list.querySelectorAll('.hist-btn-del').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.idx);
        const arr = window._histCache || [];
        const e = arr[idx];
        if (!e) return;
        showDeleteConfirm(e, async () => {
          const localArr = load();
          const localIdx = localArr.findIndex(x => x.dt.slice(0, 16) === e.dt.slice(0, 16) && x.n === e.n);
          if (localIdx >= 0) {
            localArr.splice(localIdx, 1);
            persist(localArr);
          }
          if (e.id < 1000000000000 && window.AuthModule?.isLoggedIn()) {
            try {
              await fetch(`https://ka-en.com.vn/tarot_api/delete_reading.php?id=${e.id}`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${window.AuthModule.getToken()}` }
              });
            } catch (err) { }
          }
          renderPanel();
        });
      });
    });
  }

  function showDeleteConfirm(entry, onConfirm) {
    document.getElementById('histDeleteConfirm')?.remove();

    const theme = window.TarotHelper?.getThemeLabel(entry.th) || THEME_LABEL[entry.th] || entry.th;
    const date = entry.dt.replace('T', ' ');
    const qText = entry.q || '(không có câu hỏi)';

    const modal = document.createElement('div');
    modal.id = 'histDeleteConfirm';
    modal.className = 'hist-confirm-overlay';
    modal.innerHTML = `
      <div class="hist-confirm-box">
        <div class="hist-confirm-icon">🗑</div>
        <div class="hist-confirm-title">Xác Nhận Thanh Tẩy</div>
        <div class="hist-confirm-meta">${theme} · ${entry.sp} lá · ${date}</div>
        <div class="hist-confirm-q">"${qText}"</div>
        <div class="hist-confirm-actions">
          <button id="histConfirmCancel" class="hist-confirm-btn hist-confirm-btn--cancel">Huỷ</button>
          <button id="histConfirmDelete" class="hist-confirm-btn hist-confirm-btn--delete">Thanh tẩy</button>
        </div>
      </div>`;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));

    const dismiss = () => { modal.classList.remove('visible'); setTimeout(() => modal.remove(), 300); };
    modal.querySelector('#histConfirmCancel').addEventListener('click', dismiss);
    modal.querySelector('#histConfirmDelete').addEventListener('click', () => { dismiss(); onConfirm(); });
    modal.addEventListener('click', e => { if (e.target === modal) dismiss(); });
  }

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

  const btnOpen = document.getElementById('btnHistory');
  const btnClose = document.getElementById('btnHistoryClose');
  const overlay = document.getElementById('historyOverlay');

  if (btnOpen) btnOpen.addEventListener('click', open);
  if (btnClose) btnClose.addEventListener('click', close);
  if (overlay) overlay.addEventListener('click', close);

  const btnHistoryAnalysis = document.getElementById('btnHistoryAnalysis');
  if (btnHistoryAnalysis) btnHistoryAnalysis.addEventListener('click', open);

  const btnBackHome = document.getElementById('btnBackHome');
  if (btnBackHome) {
    btnBackHome.addEventListener('click', () => {
      close();
      document.querySelectorAll('.page').forEach(p => p.classList.remove('page--active'));
      const landing = document.getElementById('pageLanding') || document.querySelector('.page');
      if (landing) landing.classList.add('page--active');
    });
  }

  window.HistoryModule = { save, open, close, renderPanel, updateAnalysis };
})();
