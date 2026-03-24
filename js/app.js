// js/app.js — Main application coordinator / page router
(function () {
  const pages = {
    landing:  document.getElementById('pageLanding'),
    reading:  document.getElementById('pageReading'),
    analysis: document.getElementById('pageAnalysis')
  };

  function showPage(name) {
    Object.entries(pages).forEach(([key, el]) => {
      el.classList.toggle('page--active', key === name);
    });
    if (pages[name]) pages[name].scrollTop = 0;
  }

  // ── Begin reading (from main form) ─────────────────
  document.getElementById('btnBeginReading').addEventListener('click', async () => {
    const data = window.FormModule.getData();
    if (!data.name || !data.theme || !data.question) return;

    // Daily limit check
    const limitResult = window.DailyLimit?.check(data.theme, data.spread);
    if (limitResult === 'blocked') {
      window.FormModule.close();
      window.DailyLimit.showBlocked(data.theme);
      return;
    }
    if (limitResult === 'warn') {
      const proceed = await window.DailyLimit.showWarning(data.theme);
      if (!proceed) return;
    }

    window.FormModule.close();
    setTimeout(() => {
      if (window.triggerLightning) window.triggerLightning();
      showPage('reading');
      window.ReadingModule.init(data);
    }, 300);
  });

  // ── Go to analysis ─────────────────────────────────
  document.getElementById('btnGoAnalysis').addEventListener('click', () => {
    const cards   = window.ReadingModule.getSelectedCards();
    const session = window.ReadingModule.getSession();
    // Record AFTER reading is complete
    window.DailyLimit?.record(session.theme, session.spread);
    window.HistoryModule?.save(session, cards);
    showPage('analysis');
    setTimeout(() => window.AnalysisModule.render(cards, session), 200);
  });

  // ── New reading → open full form ──────────
  document.getElementById('btnNewReading').addEventListener('click', () => {
    showPage('landing');
    setTimeout(() => {
      window.FormModule?.open();
    }, 150);
  });

  // ── Initial state / Share Link ─────────────────────
  const urlParams = new URLSearchParams(window.location.search);
  const shareId = urlParams.get('share');

  if (shareId) {
    showPage('analysis');
    loadSharedReading(shareId);
  } else {
    showPage('landing');
  }

  async function loadSharedReading(id) {
    const contentEl = document.getElementById('analysisContent');
    contentEl.innerHTML = `
      <div class="ai-loading">
        <div class="ai-pulse"></div>
        <span>Đang tải thông điệp…</span>
      </div>`;
    
    try {
      const res = await fetch(`https://ka-en.com.vn/tarot_api/get_reading.php?id=${id}`);
      if (!res.ok) throw new Error("Không tìm thấy kết quả hoặc kết nối lỗi.");
      const data = await res.json();
      
      const session = {
        name: data.name,
        dob: data.dob,
        theme: data.theme,
        question: data.question,
        spread: data.spread_count
      };
      
      // Map API cards to app format
      const cards = data.cards.map(c => {
        const fullCard = window.TAROT_DB ? window.TAROT_DB.find(db => db.id === c.id) : null;
        return {
          id: c.id,
          name: c.name,
          nameVi: c.name_vi,
          number: fullCard ? fullCard.number : '',
          image: fullCard ? fullCard.image : `images/cards/${c.id}.jpg`,
          isReversed: c.is_reversed === 1 || c.is_reversed === true,
          upright: fullCard ? fullCard.upright : c.meaning,
          reversed: fullCard ? fullCard.reversed : c.meaning,
          keywords: fullCard ? fullCard.keywords : [],
          keywordsRev: fullCard ? fullCard.keywordsRev : [],
          planet: fullCard?.planet,
          zodiac: fullCard?.zodiac,
          numerology: fullCard?.numerology,
          aspects: fullCard?.aspects,
          advice: fullCard?.advice
        };
      });

      window.AnalysisModule.render(cards, session, data.gemini_analysis);

    } catch (err) {
      alert(err.message);
      showPage('landing');
    }
  }
})();
