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
    // Scroll reset
    if (pages[name]) pages[name].scrollTop = 0;
  }

  // ── Begin reading (from form) ──────────────────────
  document.getElementById('btnBeginReading').addEventListener('click', () => {
    const data = window.FormModule.getData();
    if (!data.name || !data.theme || !data.question) return;

    window.FormModule.close();

    setTimeout(() => {
      if (window.triggerLightning) window.triggerLightning();
      showPage('reading');
      window.ReadingModule.init(data);
    }, 300);
  });

  // ── Go to analysis ────────────────────────────────
  document.getElementById('btnGoAnalysis').addEventListener('click', () => {
    const cards   = window.ReadingModule.getSelectedCards();
    const session = window.ReadingModule.getSession();
    showPage('analysis');
    setTimeout(() => {
      window.AnalysisModule.render(cards, session);
    }, 200);
  });

  // ── New reading ───────────────────────────────────
  document.getElementById('btnNewReading').addEventListener('click', () => {
    showPage('landing');
    setTimeout(() => {
      window.FormModule.open();
    }, 400);
  });

  // ── Initial state ─────────────────────────────────
  showPage('landing');
})();
