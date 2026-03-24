// js/analysis.js — Analysis page: card details + Gemini AI synthesis
window.AnalysisModule = (function () {
  const container = document.getElementById('analysisContent');
  const API_BASE = 'https://ka-en.com.vn/tarot_api';

  /* ── Main render ────────────────────────────────────── */
  function render(cards, session, preloadedAnalysis = null) {
    container.innerHTML = '';
    const theme = session.theme;
    const labels = TarotHelper.getSpreadLabels(cards.length);
    const themeLabel = TarotHelper.getThemeLabel(theme);

    function formatDob(dob) {
      if (!dob) return '';
      const p = dob.split('-');
      return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : dob;
    }

    /* Title */
    const clockSVG = `<svg class="dob-clock-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
    const titleBlock = document.createElement('div');
    titleBlock.className = 'analysis-title-block';
    titleBlock.innerHTML = `
      <h1 class="analysis-main-title">Thông Điệp Từ Vũ Trụ</h1>
      <div class="analysis-divider"></div>
      <p class="analysis-meta-line">${session.name}${session.dob ? ' ' + clockSVG + ' ' + formatDob(session.dob) : ''} &mdash; ${themeLabel}</p>
      <p class="analysis-question-hero">&ldquo;${session.question}&rdquo;</p>
    `;
    container.appendChild(titleBlock);

    /* ── AI Analysis block FIRST ── */
    const aiBlock = document.createElement('div');
    aiBlock.className = 'overall-box ai-analysis-box';
    aiBlock.innerHTML = `
      <div class="overall-title">
        <span class="ai-label">✦ Luận Giải Tổng Hợp</span>
      </div>
      <div class="ai-loading" id="aiLoading">
        <div class="ai-pulse"></div>
        <span>Đang kết nối với vũ trụ…</span>
      </div>
      <div class="ai-content" id="aiContent" style="display:none"></div>
    `;
    container.appendChild(aiBlock);

    /* Card blocks */
    cards.forEach((card, i) => {
      const isRev = card.isReversed;
      const meaning = isRev ? card.reversed : card.upright;
      const kws = (isRev ? card.keywordsRev : card.keywords) || [];
      const aspect = card.aspects?.[theme] || card.aspects?.love || null;
      let aspectText = aspect ? (isRev ? aspect.rev : aspect.up) : null;

      if (aspectText && meaning) {
        const mT = meaning.trim(), aT = aspectText.trim();
        if (mT === aT || mT.includes(aT.substring(0, 40)) || aT.includes(mT.substring(0, 40))) aspectText = null;
      }

      const block = document.createElement('div');
      block.className = 'analysis-block';
      block.style.animationDelay = (i * 150) + 'ms';
      block.innerHTML = `
        <div class="ab-layout">
          <div class="ab-header-row">
            <img src="${card.image}" alt="${card.name}" class="ab-card-img${isRev ? ' ab-card-img--rev' : ''}"/>
            <div class="ab-header-info">
              <div class="ab-card-title">${card.name}</div>
              <div class="ab-card-subtitle">
                ${card.nameVi} &nbsp;|&nbsp; ${card.number}
                &nbsp;|&nbsp;
                <span class="ab-orientation ${isRev ? 'rev' : 'up'}">${isRev ? 'Ngược' : 'Xuôi'}</span>
              </div>
              <div class="ab-meta-row">
                ${card.planet ? `<span class="ab-meta-chip">Hành tinh: ${card.planet}</span>` : ''}
                ${card.zodiac ? `<span class="ab-meta-chip">Cung: ${card.zodiac}</span>` : ''}
                ${card.numerology ? `<span class="ab-meta-chip">${card.numerology}</span>` : ''}
              </div>
            </div>
          </div>
          <div class="ab-body">
            <div class="ab-section-label">Ý Nghĩa</div>
            <p class="ab-text">${meaning || ''}</p>
            <div class="ab-section-label">Từ Khóa</div>
            <div class="ab-kw-row">${kws.map(k => `<span class="ab-kw">${k}</span>`).join('')}</div>
            ${aspectText ? `<div class="ab-section-label">Trong ${themeLabel}</div><p class="ab-text ab-text--aspect">${aspectText}</p>` : ''}
            ${card.advice ? `<div class="ab-section-label">Lời Khuyên</div><p class="ab-text ab-text--advice">${card.advice}</p>` : ''}
          </div>
        </div>`;
      container.appendChild(block);
    });

    /* History save always for own readings */
    if (!preloadedAnalysis) HistoryModule?.save(session, cards);

    if (preloadedAnalysis) {
      document.getElementById('aiLoading').style.display = 'none';
      const contentEl = document.getElementById('aiContent');
      contentEl.style.display = '';
      contentEl.innerHTML = markdownToHtml(preloadedAnalysis);
      document.getElementById('btnShareReading').dataset.id = new URLSearchParams(window.location.search).get('share');
    } else if (window.AuthModule?.isLoggedIn()) {
      fetchGeminiAnalysis(cards, session, labels, themeLabel);
    } else {
      const loadEl = document.getElementById('aiLoading');
      if (loadEl) loadEl.innerHTML = `
        <div class="ai-login-gate">
          <p>Đăng nhập để nhận luận giải và lưu trữ cá nhân hóa</p>
          <button class="ai-login-btn" id="btnAiLogin">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Đăng nhập với Google
          </button>
        </div>`;
      document.getElementById('btnAiLogin')?.addEventListener('click', () => {
        window.AuthModule.requireLogin(user => {
          fetchGeminiAnalysis(cards, session, labels, themeLabel);
        });
      });
    }
  }

  /* ── Call PHP proxy ──────────────────────────────────── */
  async function fetchGeminiAnalysis(cards, session, labels, themeLabel) {
    const loadEl = document.getElementById('aiLoading');
    const contentEl = document.getElementById('aiContent');

    const payload = {
      name: session.name,
      dob: session.dob || '',
      theme: session.theme,
      theme_label: themeLabel,
      question: session.question,
      spread: cards.length,
      cards: cards.map((c, i) => ({
        slot_idx: i,
        position_label: labels[i] || `Lá ${i + 1}`,
        id: c.id,
        name: c.name,
        name_vi: c.nameVi,
        number: c.number || '',
        is_reversed: c.isReversed,
        meaning: c.isReversed ? c.reversed : c.upright,
        keywords: (c.isReversed ? c.keywordsRev : c.keywords) || [],
      }))
    };

    try {
      const res = await fetch(`${API_BASE}/gemini_proxy.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.AuthModule?.getToken() || ''}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const md = data.analysis || '';
      
      // Store ID for sharing
      if (data.reading_id) {
        document.getElementById('btnShareReading').dataset.id = data.reading_id;
      }

      loadEl.style.display = 'none';
      contentEl.style.display = '';
      contentEl.innerHTML = markdownToHtml(md);

    } catch (err) {
      loadEl.innerHTML = `<p class="ai-error">⚠ Không thể kết nối AI: ${err.message}</p>`;
    }
  }

  /* ── Lightweight Markdown → HTML ─────────────────────── */
  function markdownToHtml(md) {
    return md
      // Headers
      .replace(/^### (.+)$/gm, '<h3 class="ai-h3">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="ai-h2">$1</h2>')
      .replace(/^# (.+)$/gm, '<h2 class="ai-h2">$1</h2>')
      // Bold
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      // Bullet lists
      .replace(/^[-•] (.+)$/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>\n?)+/gs, m => `<ul class="ai-list">${m}</ul>`)
      // Numbered lists
      .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
      // Line breaks
      .replace(/\n\n+/g, '</p><p class="ai-p">')
      // Wrap in paragraph
      .replace(/^(?!<[hul])(.+)$/gm, (m) => m.trim() ? m : '')
      .replace(/^([^<].+)$/gm, '<p class="ai-p">$1</p>');
  }

  // Bind Share button
  document.getElementById('btnShareReading')?.addEventListener('click', function() {
    const id = this.dataset.id;
    if (!id) {
      if (!window.AuthModule?.isLoggedIn()) {
        alert("Vui lòng đăng nhập ở phần luận giải phía trên để nhận thông điệp đầy đủ và chia sẻ nhé!");
      } else {
        alert("Đang chờ vũ trụ hồi đáp, bạn vui lòng chờ chốc lát nhé!");
      }
      return;
    }
    const shareUrl = window.location.origin + window.location.pathname + '?share=' + id;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        const origText = this.innerHTML;
        this.innerHTML = 'Đã copy link! <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="animate-check" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="margin-left:8px;"><polyline points="20 6 9 17 4 12"></polyline></svg>';
        setTimeout(() => this.innerHTML = origText, 2500);
      });
    }
  });

  return { render };
})();
