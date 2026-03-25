// js/reading.js — Full reading UX: deck → select → flip per card → meaning carousel
window.ReadingModule = (function () {

  /* ── DOM refs ─────────────────────────────────────── */
  const deckArea    = document.getElementById('deckArea');
  const selectedArea = document.getElementById('selectedArea');
  const instruction = document.getElementById('readingInstruction');
  const userInfo    = document.getElementById('readingUserInfo');
  const questionEl  = document.getElementById('readingQuestion');
  const btnFlipAll  = document.getElementById('btnFlipAll');
  const btnGoAnalysis = document.getElementById('btnGoAnalysis');

  const BACK = 'cards/back.png';

  let session       = null;
  let fullDeck      = [];
  let selectedCards = [];
  let flippedCount  = 0;
  let labels        = [];

  // Carousel state
  let revealQueue  = [];   // [{card, slotIdx}, ...]
  let revealCursor = 0;

  function formatDob(dob) {
    if (!dob) return '';
    const p = dob.split('-');
    return p.length === 3 ? `${p[2]}/${p[1]}/${p[0]}` : dob;
  }

  /* ══════════════════════════════════════════════════
     PUBLIC: init
  ══════════════════════════════════════════════════ */
  function init(sess) {
    session       = sess;
    selectedCards = [];
    flippedCount  = 0;
    revealQueue   = [];
    revealCursor  = 0;
    labels        = TarotHelper.getSpreadLabels(sess.spread);
    fullDeck      = TarotHelper.drawCards(78);

    const clockSVG = `<svg class="dob-clock-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
    userInfo.innerHTML  = `${sess.name}${sess.dob ? ' ' + clockSVG + ' ' + formatDob(sess.dob) : ''}  &middot;  ${TarotHelper.getThemeLabel(sess.theme)}`;
    questionEl.innerHTML = `<span class="reading-q-text">&ldquo;${sess.question}&rdquo;</span>`;
    instruction.textContent = `Tập trung vào câu hỏi và chọn ${sess.spread} lá bài`;

    deckArea.innerHTML    = '';
    selectedArea.innerHTML = '';
    selectedArea.dataset.spread = sess.spread; // for CSS 1-card targeting

    deckArea.style.display     = '';
    deckArea.style.opacity     = '1';
    deckArea.style.transform   = 'none';
    deckArea.style.pointerEvents = 'all';
    document.getElementById('pageReading')?.classList.remove('deck-hidden');

    btnFlipAll.classList.add('hidden');
    btnGoAnalysis.classList.add('hidden');

    renderDeck();
  }

  /* ══════════════════════════════════════════════════
     DECK RENDERING
  ══════════════════════════════════════════════════ */
  function renderDeck() {
    fullDeck.forEach((card, i) => {
      const el = buildBackCard(i);
      el.style.animationDelay = (i * 35) + 'ms';
      el.classList.add('deck-entry');
      el.addEventListener('click', (e) => onDeckClick(el, card, e));
      deckArea.appendChild(el);
    });
  }

  function buildBackCard(index) {
    const wrap  = document.createElement('div');
    wrap.className = 'tarot-card deck-card';
    wrap.dataset.deckIndex = index;
    const inner = document.createElement('div');
    inner.className = 'card-inner';
    const back  = document.createElement('div');
    back.className = 'card-back';
    const backImg = document.createElement('img');
    backImg.src = BACK; backImg.alt = '';
    backImg.style.cssText = 'width:100%;height:100%;object-fit:fill;border-radius:11px;display:block;';
    back.appendChild(backImg);
    inner.appendChild(back);
    wrap.appendChild(inner);
    return wrap;
  }

  /* ══════════════════════════════════════════════════
     DECK CLICK → SELECT CARD
  ══════════════════════════════════════════════════ */
  function onDeckClick(el, card, e) {
    if (selectedCards.length >= session.spread) return;
    if (el.classList.contains('picking')) return;
    el.classList.add('picking');
    window.FX?.ripple(el, e, 'rgba(201,168,76,0.5)');
    window.FX?.glowPulse(el, 'rgba(201,168,76,0.6)');
    el.style.transition = 'opacity 0.4s, transform 0.3s';
    el.style.opacity    = '0';
    el.style.transform  = 'scale(1.1) translateY(-6px)';
    selectedCards.push(card);
    const slotIdx = selectedCards.length - 1;
    setTimeout(() => {
      el.style.opacity      = '0.1';
      el.style.transform    = '';
      el.style.transition   = '';
      el.style.pointerEvents = 'none';
      el.style.filter       = 'grayscale(0.8)';
      addSelectedSlot(card, slotIdx);
      updateInstruction();
    }, 420);
  }

  function updateInstruction() {
    const remaining = session.spread - selectedCards.length;
    if (remaining > 0) {
      instruction.textContent = `Hãy chọn thêm ${remaining} lá bài nữa...`;
    } else {
      instruction.textContent = 'Hãy lật từng lá bài để khám phá thông điệp';
      deckArea.style.transition   = 'opacity 0.75s ease-out, transform 0.75s ease-out';
      deckArea.style.opacity      = '0';
      deckArea.style.transform    = 'translateY(15px) scale(0.92)';
      deckArea.style.pointerEvents = 'none';
      setTimeout(() => {
        deckArea.style.display = 'none';
        document.getElementById('pageReading')?.classList.add('deck-hidden');
        expandSpreadCards();
      }, 750);
      btnFlipAll.classList.remove('hidden');
    }
  }

  /* ── Dynamic card sizing ──────────────────────────── */
  const SMALL_W = 120, SMALL_H = 206;

  function getSpreadCardSize() {
    const n = session.spread;
    const gap = 22, padding = 48;
    const maxH   = Math.min(window.innerHeight * 0.58, 540);
    const usableW = Math.min(window.innerWidth - padding * 2, 1100);
    const wByW   = Math.floor((usableW - (n - 1) * gap) / n);
    const wByH   = Math.floor(maxH / 1.72);
    const w      = Math.min(wByW, wByH, 290);
    return { w, h: Math.round(w * 1.72) };
  }

  function expandSpreadCards() {
    const { w, h } = getSpreadCardSize();
    const cards = selectedArea.querySelectorAll('.spread-card');
    cards.forEach((c, i) => {
      setTimeout(() => {
        c.style.transition = 'width 1.4s cubic-bezier(0.22,1,0.36,1), height 1.4s cubic-bezier(0.22,1,0.36,1)';
        c.style.width  = w + 'px';
        c.style.height = h + 'px';
      }, i * 150);
    });
  }

  /* ══════════════════════════════════════════════════
     SELECTED SLOT RENDERING
  ══════════════════════════════════════════════════ */
  function addSelectedSlot(card, slotIdx) {
    const label   = labels[slotIdx] || `Lá ${slotIdx + 1}`;
    const wrap    = document.createElement('div');
    wrap.className = 'slot-wrap';
    wrap.style.animationDelay = (slotIdx * 80) + 'ms';
    const labelEl = document.createElement('div');
    labelEl.className = 'slot-label';
    labelEl.textContent = label;
    const cardEl  = buildSpreadCard(card, slotIdx);
    wrap.appendChild(labelEl);
    wrap.appendChild(cardEl);
    selectedArea.appendChild(wrap);
    if (window.triggerLightning && slotIdx === 0) window.triggerLightning();
  }

  /* ══════════════════════════════════════════════════
     SPREAD CARD (face-down, clickable to flip)
  ══════════════════════════════════════════════════ */
  function buildSpreadCard(card, slotIdx) {
    const wrap = document.createElement('div');
    wrap.className = 'tarot-card spread-card';
    wrap.style.setProperty('--slot-idx', slotIdx);
    wrap.style.width  = SMALL_W + 'px';
    wrap.style.height = SMALL_H + 'px';

    const inner = document.createElement('div');
    inner.className = 'card-inner';

    const back = document.createElement('div');
    back.className = 'card-back';
    const backImg = document.createElement('img');
    backImg.src = BACK; backImg.alt = '';
    backImg.style.cssText = 'width:100%;height:100%;object-fit:fill;border-radius:11px;display:block;';
    back.appendChild(backImg);

    const face = document.createElement('div');
    face.className = 'card-face' + (card.isReversed ? ' card-reversed' : '');
    const frontImg = document.createElement('img');
    frontImg.src = card.image; frontImg.alt = card.name; frontImg.loading = 'lazy';
    frontImg.style.cssText = 'width:100%;height:72%;object-fit:cover;display:block;';

    const caption = document.createElement('div');
    caption.className = 'card-caption';
    caption.innerHTML = `
      <span class="card-caption-name">${card.name}</span>
      <span class="card-caption-en">${card.nameVi}</span>
      <span class="card-orientation ${card.isReversed ? 'rev' : 'up'}">
        ${card.isReversed ? 'Ngược' : 'Xuôi'}
      </span>`;

    face.appendChild(frontImg);
    face.appendChild(caption);
    inner.appendChild(back);
    inner.appendChild(face);
    wrap.appendChild(inner);

    wrap.addEventListener('click', (e) => {
      if (!wrap.classList.contains('flipped')) {
        flipCard(wrap, card, slotIdx, e);
      } else {
        toggleMeaningPanel(wrap, card, slotIdx, e);
      }
    });

    return wrap;
  }

  /* ══════════════════════════════════════════════════
     FLIP SINGLE CARD
  /* ══ FLIP SINGLE CARD ════════════════════════════════ */
  function flipCard(cardEl, card, slotIdx, e) {
    cardEl.classList.add('flipped');
    window.FX?.ripple(cardEl, e, 'rgba(201,168,76,0.4)');
    if (window.triggerLightning) window.triggerLightning();
    flippedCount++;

    setTimeout(() => {
      revealQueue.push({ card, slotIdx });
      revealCursor = revealQueue.length - 1;

      const modalOpen = !!document.getElementById('meaningModal');
      if (!modalOpen) {
        // First flip: open with animation
        openMeaningCarousel(revealCursor, true);
      } else {
        // Subsequent flips while modal open: silently update dots only
        updateCarouselDotsOnly();
      }

      addTapHint(cardEl);
      checkAllFlipped();
    }, 700);
  }

  function addTapHint(cardEl) {
    const slotWrap = cardEl.closest('.slot-wrap');
    if (!slotWrap || slotWrap.querySelector('.tap-hint')) return;
    const hint = document.createElement('div');
    hint.className   = 'tap-hint';
    hint.textContent = 'Bấm để xem ý nghĩa';
    slotWrap.appendChild(hint);
  }

  function toggleMeaningPanel(cardEl, card, slotIdx, e) {
    const idx = revealQueue.findIndex(r => r.slotIdx === slotIdx);
    if (idx >= 0) {
      revealCursor = idx;
    } else {
      revealQueue.push({ card, slotIdx });
      revealCursor = revealQueue.length - 1;
    }
    openMeaningCarousel(revealCursor, true);
    window.FX?.ripple(cardEl, e, 'rgba(155,48,255,0.3)');
  }

  /* ══════════════════════════════════════════════════
   /* ══ MEANING MODAL — CAROUSEL ════════════════════════════ */

  function updateCarouselDotsOnly() {
    const dotsEl = document.getElementById('mmDotsBar');
    if (!dotsEl) return;
    const total = revealQueue.length;
    dotsEl.innerHTML = revealQueue.map((_, i) =>
      `<button class="mm-dot${i === revealCursor ? ' active' : ''}" data-i="${i}"></button>`).join('');
    dotsEl.querySelectorAll('.mm-dot').forEach(d => d.addEventListener('click', () => {
      const to = parseInt(d.dataset.i);
      if (to !== revealCursor) {
        const dir = to > revealCursor ? 1 : -1;
        revealCursor = to;
        slideCard(revealCursor, dir);
      }
    }));
  }

  function buildCardHTML({ card, slotIdx }) {
    const label      = labels[slotIdx] || `Lá ${slotIdx + 1}`;
    const theme      = session.theme;
    const isRev      = card.isReversed;
    const meaning    = isRev ? (card.generalReversed || card.reversed) : (card.generalUpright || card.upright);
    const keywords   = (isRev ? card.keywordsRev : card.keywords) || [];
    const aspect     = card.aspects?.[theme] || card.aspects?.love || null;
    const aspectText = aspect ? (isRev ? (aspect.reversed || aspect.rev) : (aspect.upright || aspect.up)) : null;
    const themeLabel = TarotHelper.getThemeLabel(theme);
    return `
      <div class="mm-layout">
        <div class="mm-header-row">
          <img src="${card.image}" alt="${card.name}"
               class="mm-card-img${isRev ? ' mm-card-img--rev' : ''}"/>
          <div class="mm-header-info">
            <div class="mm-slot-label">${label}</div>
            <div class="mm-title">${card.name}</div>
            <div class="mm-subtitle">
              ${card.nameVi} &nbsp;|&nbsp; ${card.number}
              &nbsp;|&nbsp;
              <span class="mm-orient ${isRev ? 'rev' : 'up'}">${isRev ? 'Ngược' : 'Xuôi'}</span>
            </div>
            ${card.planet || card.zodiac ? `
            <div class="mm-meta-row">
              ${card.planet     ? `<span class="mm-chip">Hành tinh: ${card.planet}</span>` : ''}
              ${card.zodiac     ? `<span class="mm-chip">Cung: ${card.zodiac}</span>` : ''}
              ${card.numerology ? `<span class="mm-chip">${card.numerology}</span>` : ''}
            </div>` : ''}
          </div>
        </div>
        <div class="mm-body">
          <div class="mm-section">Ý Nghĩa</div>
          <p class="mm-text">${meaning}</p>
          <div class="mm-section">Từ Khóa</div>
          <div class="mm-kw-row">${keywords.map(k => `<span class="mm-kw">${k}</span>`).join('')}</div>
          ${aspectText ? `<div class="mm-section">Trong ${themeLabel}</div><p class="mm-text mm-text--aspect">${aspectText}</p>` : ''}
          ${card.advice ? `<div class="mm-section">Lời Khuyên</div><p class="mm-text mm-text--advice">${card.advice}</p>` : ''}
        </div>
      </div>`;
  }

  function openMeaningCarousel(idx, animate) {
    let modal = document.getElementById('meaningModal');
    const isNew = !modal;
    if (isNew) {
      modal = document.createElement('div');
      modal.id = 'meaningModal';
      modal.className = 'meaning-modal-overlay';
      modal.addEventListener('click', e => { if (e.target === modal) closeMeaningModal(); });
      document.body.appendChild(modal);
    }
    renderMeaningModal(modal, idx, animate || isNew);
  }

  function renderMeaningModal(modal, idx, animate) {
    const total   = revealQueue.length;
    const showNav = total > 1;

    modal.innerHTML = `
      <div class="mm-carousel-wrap">
        ${showNav ? `<button class="mm-nav mm-nav--prev" id="mmPrev"${idx === 0 ? ' disabled' : ''}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>` : ''}
        <div class="meaning-modal-panel">
          <button class="meaning-modal-close" id="mmClose">&times;</button>
          <div class="mm-card-content" id="mmCardContent">
            ${buildCardHTML(revealQueue[idx])}
          </div>
        </div>
        ${showNav ? `<button class="mm-nav mm-nav--next" id="mmNext"${idx === total - 1 ? ' disabled' : ''}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></button>` : ''}
      </div>
      ${showNav ? `
      <div class="mm-dots" id="mmDotsBar">
        ${revealQueue.map((_, i) => `<button class="mm-dot${i === idx ? ' active' : ''}" data-i="${i}"></button>`).join('')}
      </div>` : ''}`;

    // Close
    modal.querySelector('#mmClose').addEventListener('click', closeMeaningModal);

    // Prev / Next
    modal.querySelector('#mmPrev')?.addEventListener('click', () => {
      if (revealCursor > 0) { revealCursor--; slideCard(revealCursor, -1); }
    });
    modal.querySelector('#mmNext')?.addEventListener('click', () => {
      if (revealCursor < revealQueue.length - 1) { revealCursor++; slideCard(revealCursor, 1); }
    });

    // Dots
    modal.querySelectorAll('.mm-dot').forEach(d => d.addEventListener('click', () => {
      const to = parseInt(d.dataset.i);
      if (to !== revealCursor) { const dir = to > revealCursor ? 1 : -1; revealCursor = to; slideCard(revealCursor, dir); }
    }));

    // Keyboard
    if (modal._key) document.removeEventListener('keydown', modal._key);
    modal._key = e => {
      if (!document.getElementById('meaningModal')) return;
      if (e.key === 'ArrowRight' && revealCursor < revealQueue.length - 1) { revealCursor++; slideCard(revealCursor, 1); }
      if (e.key === 'ArrowLeft'  && revealCursor > 0) { revealCursor--; slideCard(revealCursor, -1); }
      if (e.key === 'Escape') closeMeaningModal();
    };
    document.addEventListener('keydown', modal._key);

    if (animate) {
      modal.style.display = 'flex'; modal.style.flexDirection = 'column'; modal.style.opacity = '0';
      const p = modal.querySelector('.meaning-modal-panel');
      p.style.transform = 'scale(0.88) translateY(20px)'; p.style.opacity = '0';
      if (window.triggerLightning) window.triggerLightning();
      requestAnimationFrame(() => requestAnimationFrame(() => {
        modal.style.transition = 'opacity 0.35s'; modal.style.opacity = '1';
        p.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.45s';
        p.style.transform = 'scale(1) translateY(0)'; p.style.opacity = '1';
      }));
    } else {
      modal.style.display = 'flex'; modal.style.flexDirection = 'column'; modal.style.opacity = '1';
    }

    // Touch swipe support for mobile
    addSwipeGesture(modal);
  }

  function addSwipeGesture(modal) {
    const panel = modal.querySelector('.meaning-modal-panel');
    if (!panel) return;
    let startX = 0;
    const onTouchStart = e => { startX = e.touches[0].clientX; };
    const onTouchEnd   = e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 40) return;
      if (dx < 0 && revealCursor < revealQueue.length - 1) { revealCursor++; slideCard(revealCursor, 1); }
      if (dx > 0 && revealCursor > 0)                      { revealCursor--; slideCard(revealCursor, -1); }
    };
    panel.removeEventListener('touchstart', panel._ts);
    panel.removeEventListener('touchend',   panel._te);
    panel._ts = onTouchStart;
    panel._te = onTouchEnd;
    panel.addEventListener('touchstart', panel._ts, { passive: true });
    panel.addEventListener('touchend',   panel._te, { passive: true });
  }

  function slideCard(idx, dir) {
    const modal   = document.getElementById('meaningModal');
    if (!modal) return;
    const content = document.getElementById('mmCardContent');
    if (!content) return;

    // Slide out old
    content.style.transition = 'transform 0.22s ease-in, opacity 0.18s';
    content.style.transform  = `translateX(${dir < 0 ? '60px' : '-60px'})`;
    content.style.opacity    = '0';

    setTimeout(() => {
      content.innerHTML = buildCardHTML(revealQueue[idx]);
      content.style.transition = 'none';
      content.style.transform  = `translateX(${dir < 0 ? '-40px' : '40px'})`;
      content.style.opacity    = '0';
      requestAnimationFrame(() => requestAnimationFrame(() => {
        content.style.transition = 'transform 0.3s cubic-bezier(0.22,1,0.36,1), opacity 0.28s';
        content.style.transform  = 'translateX(0)';
        content.style.opacity    = '1';
      }));

      // Update nav + dots
      const total = revealQueue.length;
      const prev  = modal.querySelector('#mmPrev');
      const next  = modal.querySelector('#mmNext');
      if (prev) prev.disabled = idx === 0;
      if (next) next.disabled = idx === total - 1;
      modal.querySelectorAll('.mm-dot').forEach((d, i) => d.classList.toggle('active', i === idx));
    }, 220);
  }


  function closeMeaningModal() {
    const modal = document.getElementById('meaningModal');
    if (!modal) return;
    if (modal._key) document.removeEventListener('keydown', modal._key);
    modal.style.transition = 'opacity 0.3s'; modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 320);
  }

  /* ══════════════════════════════════════════════════
     FLIP ALL
  ══════════════════════════════════════════════════ */
  function flipAll() {
    const cards = selectedArea.querySelectorAll('.spread-card:not(.flipped)');
    cards.forEach((c, i) => { setTimeout(() => c.click(), i * 350); });
    btnFlipAll.classList.add('hidden');
  }

  function checkAllFlipped() {
    if (flippedCount >= session.spread) {
      instruction.textContent = 'Tất cả lá bài đã lên tiếng. Hãy đọc thông điệp của vũ trụ...';
      btnFlipAll.classList.add('hidden');
      setTimeout(() => btnGoAnalysis.classList.remove('hidden'), 300);
    }
  }

  /* ── Button events ─────────────────────────────── */
  btnFlipAll.addEventListener('click', flipAll);

  /* ── Public API ─────────────────────────────────── */
  return {
    init,
    getSelectedCards: () => selectedCards,
    getSession: () => session
  };
})();
