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

  // ── Initial state ──────────────────────────────────
  showPage('landing');
})();
