// js/history.js — Compact reading history with localStorage + Remote Sync
(function () {
  const KEY = 'tbhb_hist';   // tarot-bi-history
  const MAX = 100;            // max entries kept
  
  let currentPage = 1;
  const itemsPerPage = 8;
  let filterStartDate = '';
  let filterEndDate = '';

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
    friendship: 'Tình Bạn / Tri Kỷ', pregnancy: 'Con Cái / Thai Kỳ', gossip: 'Thị Phi / Đàm Tiếu', family: 'Gia Đình',
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
    diet: 'Điều Độ / Chăm Sóc Bản Thân', pet: 'Thú Cưng',
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

    // Apply Date Filters
    let displayHist = hist;
    if (filterStartDate || filterEndDate) {
      displayHist = hist.filter(e => {
        const itemDate = new Date(e.dt);
        if (filterStartDate && itemDate < new Date(filterStartDate + 'T00:00:00')) return false;
        if (filterEndDate && itemDate > new Date(filterEndDate + 'T23:59:59')) return false;
        return true;
      });
    }

    // Pagination calculation
    const totalItems = displayHist.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pagedHist = displayHist.slice(startIndex, startIndex + itemsPerPage);

    if (!displayHist.length) {
      list.innerHTML = `
        <div class="hist-empty">
          <div class="hist-empty-icon">✦</div>
          <p>Không tìm thấy lịch sử trải bài</p>
          <p class="hist-empty-sub">Hãy thay đổi bộ lọc hoặc bắt đầu trải bài mới.</p>
        </div>`;
      return;
    }

    let html = pagedHist.map((e) => {
      const date = e.dt.replace('T', ' ');
      const theme = (window.TarotHelper?.getThemeLabel(e.th)) || THEME_LABEL[e.th] || e.th;
      const qText = e.q || '(không có câu hỏi)';
      const cards = reconstruct(e.c || []);
      const thumbs = cards.slice(0, 5).map(c =>
        `<img class="hist-thumb${c.isReversed ? ' hist-thumb--rev' : ''}"
              src="${c.image}" alt="${c.name}" title="${c.name}${c.isReversed ? ' (Ngược)' : ''}" />`
      ).join('');

      return `
        <div class="hist-entry" data-id="${e.id}">
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
            <button class="hist-btn-replay" data-id="${e.id}">Xem Lại</button>
            <button class="hist-btn-del"    data-id="${e.id}">Thanh tẩy</button>
          </div>
        </div>`;
    }).join('');

    // Append pagination HTML
    if (totalPages > 1) {
      html += `
        <div class="hist-pagination">
          <button class="hist-page-btn" id="histPagePrev" ${currentPage === 1 ? 'disabled' : ''}>&laquo; Trước</button>
          <span style="color: rgba(232, 180, 255, 0.8); font-family: 'Philosopher', serif; margin: 0 15px; font-size: 1.05rem;">
             ${currentPage} / ${totalPages}
          </span>
          <button class="hist-page-btn" id="histPageNext" ${currentPage === totalPages ? 'disabled' : ''}>Sau &raquo;</button>
        </div>`;
    }
    
    list.innerHTML = html;

    // Replay
    list.querySelectorAll('.hist-btn-replay').forEach(btn => {
      btn.addEventListener('click', () => {
        const e = window._histCache.find(x => x.id == btn.dataset.id);
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
        const e = window._histCache.find(x => x.id == btn.dataset.id);
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

    // Pagination Event Listeners
    const btnPrev = list.querySelector('#histPagePrev');
    const btnNext = list.querySelector('#histPageNext');
    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        if (currentPage > 1) { currentPage--; renderPanel(); }
      });
    }
    if (btnNext) {
      btnNext.addEventListener('click', () => {
        currentPage++; renderPanel();
      });
    }
  }

  function showDeleteConfirm(entry, onConfirm) {
    document.getElementById('histDeleteConfirm')?.remove();

    const theme = window.TarotHelper?.getThemeLabel(entry.th) || THEME_LABEL[entry.th] || entry.th;
    const date = entry.dt.replace('T', ' ');
    const qText = entry.q || '(không có câu hỏi)';
    
    const cards = reconstruct(entry.c || []);
    const thumbs = cards.map(c =>
      `<img class="hist-thumb${c.isReversed ? ' hist-thumb--rev' : ''} confirm-thumb"
            src="${c.image}" alt="${c.name}" style="width: 50px; border-radius: 4px; box-shadow: 0 4px 12px rgba(0,0,0,0.5); object-fit: cover; aspect-ratio: 1/1.6;" />`
    ).join('');

    const modal = document.createElement('div');
    modal.id = 'histDeleteConfirm';
    modal.className = 'hist-confirm-overlay';
    modal.innerHTML = `
      <style>
        .hist-confirm-thumbs {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 16px;
          margin-top: -10px;
        }
        @keyframes purifyGlow {
          0% { filter: brightness(1); transform: scale(1); opacity: 1; }
          40% { filter: brightness(1.5) drop-shadow(0 0 15px rgba(232, 180, 255, 0.8)); transform: scale(1.05); opacity: 1; }
          100% { filter: brightness(3) drop-shadow(0 0 30px rgba(201, 168, 76, 1)); transform: scale(1.1) translateY(-20px); opacity: 0; }
        }
        .purify-active .confirm-thumb {
          animation: purifyGlow 1.2s forwards ease-in-out;
        }
        .purify-active .confirm-thumb:nth-child(1) { animation-delay: 0s; }
        .purify-active .confirm-thumb:nth-child(2) { animation-delay: 0.15s; }
        .purify-active .confirm-thumb:nth-child(3) { animation-delay: 0.3s; }
        .purify-active .confirm-thumb:nth-child(4) { animation-delay: 0.45s; }
        .purify-active .confirm-thumb:nth-child(5) { animation-delay: 0.6s; }
      </style>
      <div class="hist-confirm-box">
        <div class="hist-confirm-thumbs" id="confirmThumbs">${thumbs}</div>
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
    
    // Purify Effect Before Delete
    modal.querySelector('#histConfirmDelete').addEventListener('click', (e) => {
      const btn = e.target;
      btn.disabled = true;
      btn.style.opacity = '0.5';
      btn.innerText = 'Đang thanh tẩy...';
      
      const thumbContainer = modal.querySelector('#confirmThumbs');
      if (thumbContainer) {
        thumbContainer.classList.add('purify-active');
      }
      
      // Wait for animation to finish before destroying and calling onConfirm
      setTimeout(() => {
        dismiss();
        onConfirm();
      }, 1500); 
    });
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

  const btnHistoryClearAll = document.getElementById('btnHistoryClearAll');
  if (btnHistoryClearAll) {
    btnHistoryClearAll.addEventListener('click', () => {
      const arr = window._histCache || [];
      if (!arr.length) return;
      showClearAllConfirm(async () => {
        // Clear local storage
        persist([]);
        window._histCache = [];
        
        // Clear remote
        if (window.AuthModule?.isLoggedIn()) {
          try {
            await fetch('https://ka-en.com.vn/tarot_api/delete_all_readings.php', {
              method: 'POST',
              headers: { 'Authorization': `Bearer \${window.AuthModule.getToken()}` }
            });
          } catch (err) {}
        }
        renderPanel();
      });
    });
  }

  function showClearAllConfirm(onConfirm) {
    document.getElementById('histDeleteConfirm')?.remove();

    const modal = document.createElement('div');
    modal.id = 'histDeleteConfirm';
    modal.className = 'hist-confirm-overlay';
    modal.innerHTML = `
      <div class="hist-confirm-box" style="text-align: center;">
        <div class="hist-confirm-icon" style="color: #ff6b6b; font-size: 2.5rem; margin-bottom: 10px;">⚠️</div>
        <div class="hist-confirm-title" style="color: #ff6b6b;">Thanh Tẩy Toàn Bộ</div>
        <div class="hist-confirm-q" style="margin: 15px 0;">Hành động này sẽ xoá vĩnh viễn tất cả các bản ghi trải bài của bạn trên cả thiết bị và đám mây. Bạn có chắc chắn muốn tiếp tục?</div>
        <div class="hist-confirm-actions">
          <button id="histConfirmCancel" class="hist-confirm-btn hist-confirm-btn--cancel">Huỷ</button>
          <button id="histConfirmDelete" class="hist-confirm-btn hist-confirm-btn--delete" style="background: rgba(255, 107, 107, 0.2); color: #ff6b6b; border: 1px solid rgba(255, 107, 107, 0.5);">Xóa Tất Cả</button>
        </div>
      </div>`;

    document.body.appendChild(modal);
    requestAnimationFrame(() => modal.classList.add('visible'));

    const dismiss = () => { modal.classList.remove('visible'); setTimeout(() => modal.remove(), 300); };
    modal.querySelector('#histConfirmCancel').addEventListener('click', dismiss);
    modal.querySelector('#histConfirmDelete').addEventListener('click', (e) => {
      const btn = e.target;
      btn.innerText = 'Đang xóa...';
      btn.disabled = true;
      btn.style.opacity = '0.5';
      
      const box = modal.querySelector('.hist-confirm-box');
      if (box) {
        box.style.transition = 'filter 1.2s, opacity 1.2s, transform 1.2s';
        box.style.filter = 'brightness(3) sepia(1) hue-rotate(-50deg)';
        box.style.transform = 'scale(1.1)';
        box.style.opacity = '0';
      }
      setTimeout(() => { dismiss(); onConfirm(); }, 1200);
    });
    modal.addEventListener('click', e => { if (e.target === modal) dismiss(); });
  }

  const btnHistDateFilter = document.getElementById('btnHistDateFilter');
  const histDateModal = document.getElementById('histDateModal');
  const btnHistDateApply = document.getElementById('btnHistDateApply');
  const btnHistDateClear = document.getElementById('btnHistDateClear');
  const inputDateStart = document.getElementById('histDateStart');
  const inputDateEnd = document.getElementById('histDateEnd');

  if (btnHistDateFilter && histDateModal) {
    btnHistDateFilter.addEventListener('click', (e) => {
      e.stopPropagation();
      inputDateStart.value = filterStartDate || '';
      inputDateEnd.value = filterEndDate || '';
      histDateModal.classList.toggle('visible');
    });

    btnHistDateApply.addEventListener('click', () => {
      filterStartDate = inputDateStart.value;
      filterEndDate = inputDateEnd.value;
      currentPage = 1;
      
      if (filterStartDate || filterEndDate) {
        btnHistDateFilter.classList.add('active');
      } else {
        btnHistDateFilter.classList.remove('active');
      }
      
      histDateModal.classList.remove('visible');
      renderPanel();
    });

    btnHistDateClear.addEventListener('click', () => {
      filterStartDate = '';
      filterEndDate = '';
      currentPage = 1;
      inputDateStart.value = '';
      inputDateEnd.value = '';
      btnHistDateFilter.classList.remove('active');
      histDateModal.classList.remove('visible');
      renderPanel();
    });
    
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
      if (histDateModal.classList.contains('visible') && !histDateModal.contains(e.target) && e.target !== btnHistDateFilter) {
        histDateModal.classList.remove('visible');
      }
    });
  }

  function checkDuplicateQuestion(question) {
    if (!question) return false;
    const hist = load();
    const q1 = question.trim().toLowerCase();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    return hist.some(e => {
      if (!e.q) return false;
      const q2 = e.q.trim().toLowerCase();
      const itemDate = new Date(e.dt);
      return q1 === q2 && itemDate >= threeMonthsAgo;
    });
  }

  window.HistoryModule = { save, open, close, renderPanel, updateAnalysis, checkDuplicateQuestion };
})();
