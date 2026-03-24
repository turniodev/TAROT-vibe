// js/reading.js — Full reading UX: deck → select → flip per card → meaning panel
window.ReadingModule = (function () {

  /* ── DOM refs ─────────────────────────────────────── */
  const deckArea     = document.getElementById('deckArea');
  const selectedArea = document.getElementById('selectedArea');
  const instruction  = document.getElementById('readingInstruction');
  const userInfo     = document.getElementById('readingUserInfo');
  const questionEl   = document.getElementById('readingQuestion');
  const btnFlipAll   = document.getElementById('btnFlipAll');
  const btnGoAnalysis= document.getElementById('btnGoAnalysis');

  const BACK = 'cards/back.png';

  let session       = null;
  let fullDeck      = [];   // shuffled 78-card pool
  let selectedCards = [];   // cards user picked
  let flippedCount  = 0;
  let labels        = [];

  /* ══════════════════════════════════════════════════
     PUBLIC: init
  ══════════════════════════════════════════════════ */
  function init(sess) {
    session      = sess;
    selectedCards = [];
    flippedCount  = 0;
    labels        = TarotHelper.getSpreadLabels(sess.spread);
    fullDeck      = TarotHelper.drawCards(78); // full 78-card deck

    userInfo.textContent  = `${sess.name}${sess.dob ? ` (Sinh: ${sess.dob})` : ''}  ·  ${TarotHelper.getThemeLabel(sess.theme)}`;
    questionEl.textContent = `"${sess.question}"`;
    instruction.textContent = `Tập trung vào câu hỏi và chọn ${sess.spread} lá bài`;

    deckArea.innerHTML     = '';
    selectedArea.innerHTML = '';

    // Reset deck visibility from previous readings
    deckArea.style.display       = '';
    deckArea.style.opacity       = '1';
    deckArea.style.transform     = 'none';
    deckArea.style.pointerEvents = 'all';

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
    const wrap = document.createElement('div');
    wrap.className = 'tarot-card deck-card';
    wrap.dataset.deckIndex = index;

    const inner = document.createElement('div');
    inner.className = 'card-inner';

    const back = document.createElement('div');
    back.className = 'card-back';
    const backImg = document.createElement('img');
    backImg.src = BACK;
    backImg.alt = '';
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

    // Fade in-place — keep gap in deck layout
    el.style.transition = 'opacity 0.4s, transform 0.3s';
    el.style.opacity    = '0';
    el.style.transform  = 'scale(1.1) translateY(-6px)';

    selectedCards.push(card);
    const slotIdx = selectedCards.length - 1;

    setTimeout(() => {
      el.style.opacity    = '0.15';
      el.style.transform  = '';
      el.style.transition = '';
      el.style.pointerEvents = 'none';
      el.style.filter = 'grayscale(0.5)';
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
      // Hide deck when all cards selected
      deckArea.style.transition = 'opacity 0.75s ease-out, transform 0.75s ease-out';
      deckArea.style.opacity = '0';
      deckArea.style.transform = 'translateY(15px) scale(0.92)';
      deckArea.style.pointerEvents = 'none';
      setTimeout(() => {
        deckArea.style.display = 'none';
        expandSpreadCards();  // grow cards to full size after deck hides
      }, 750);
      btnFlipAll.classList.remove('hidden');
    }
  }

  /* ── Dynamic card sizing ──────────────────────────── */
  const SMALL_W = 100, SMALL_H = 172;   // while deck is visible

  function getSpreadCardSize() {
    const n       = session.spread;
    const gap     = 22;
    const padding = 48;
    const maxH    = Math.min(window.innerHeight * 0.58, 540); // Slightly smaller height
    const usableW = Math.min(window.innerWidth - padding * 2, 1100);
    const wByW    = Math.floor((usableW - (n - 1) * gap) / n);
    const wByH    = Math.floor(maxH / 1.72);
    const w       = Math.min(wByW, wByH, 290);
    const h       = Math.round(w * 1.72);
    return { w, h };
  }

  function expandSpreadCards() {
    const { w, h } = getSpreadCardSize();
    const cards = selectedArea.querySelectorAll('.spread-card');
    cards.forEach((c, i) => {
      setTimeout(() => {
        c.style.transition = 'width 0.6s cubic-bezier(0.22,1,0.36,1), height 0.6s cubic-bezier(0.22,1,0.36,1)';
        c.style.width  = w + 'px';
        c.style.height = h + 'px';
      }, i * 65);
    });
  }

  /* ══════════════════════════════════════════════════
     SELECTED SLOT RENDERING
  ══════════════════════════════════════════════════ */
  function addSelectedSlot(card, slotIdx) {
    const label = labels[slotIdx] || `Lá ${slotIdx + 1}`;

    const wrap = document.createElement('div');
    wrap.className = 'slot-wrap';
    wrap.style.animationDelay = (slotIdx * 80) + 'ms';

    const labelEl = document.createElement('div');
    labelEl.className = 'slot-label';
    labelEl.textContent = label;

    const cardEl = buildSpreadCard(card, slotIdx);

    wrap.appendChild(labelEl);
    wrap.appendChild(cardEl);
    selectedArea.appendChild(wrap);

    // Entrance burst
    if (window.triggerLightning && slotIdx === 0) window.triggerLightning();
  }

  /* ══════════════════════════════════════════════════
     SPREAD CARD (face-down, clickable to flip)
  ══════════════════════════════════════════════════ */
  function buildSpreadCard(card, slotIdx) {
    const wrap = document.createElement('div');
    wrap.className = 'tarot-card spread-card';
    // Start small while deck is still visible; will expand after deck hides
    wrap.style.width  = SMALL_W + 'px';
    wrap.style.height = SMALL_H + 'px';

    const inner = document.createElement('div');
    inner.className = 'card-inner';

    /* Back face */
    const back = document.createElement('div');
    back.className = 'card-back';
    const backImg = document.createElement('img');
    backImg.src = BACK;
    backImg.alt = '';
    backImg.style.cssText = 'width:100%;height:100%;object-fit:fill;border-radius:11px;display:block;';
    back.appendChild(backImg);

    /* Front face */
    const face = document.createElement('div');
    face.className = 'card-face' + (card.isReversed ? ' card-reversed' : '');
    const frontImg = document.createElement('img');
    frontImg.src = card.image;
    frontImg.alt = card.name;
    frontImg.loading = 'lazy';
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

    // 1st click → flip; 2nd click → show/hide meaning
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
  ══════════════════════════════════════════════════ */
  function flipCard(cardEl, card, slotIdx, e) {
    cardEl.classList.add('flipped');
    window.FX?.ripple(cardEl, e, 'rgba(201,168,76,0.4)');
    if (window.triggerLightning) window.triggerLightning();
    flippedCount++;

    // After flip: show tap-to-read hint
    setTimeout(() => {
      addTapHint(cardEl);
      checkAllFlipped();
    }, 680);
  }

  function addTapHint(cardEl) {
    const slotWrap = cardEl.closest('.slot-wrap');
    if (!slotWrap || slotWrap.querySelector('.tap-hint')) return;
    const hint = document.createElement('div');
    hint.className = 'tap-hint';
    hint.textContent = 'Bấm để xem ý nghĩa';
    slotWrap.appendChild(hint); // below the card, not inside card-face
  }

  function toggleMeaningPanel(cardEl, card, slotIdx, e) {
    showMeaningModal(card, slotIdx);
    window.FX?.ripple(cardEl, e, 'rgba(155,48,255,0.3)');
  }

  /* ══════════════════════════════════════════════════
     MEANING MODAL
  ══════════════════════════════════════════════════ */
  function showMeaningModal(card, slotIdx) {
    const label    = labels[slotIdx] || `Lá ${slotIdx + 1}`;
    const theme    = session.theme;
    const isRev    = card.isReversed;
    const meaning  = isRev ? card.reversed : card.upright;
    const keywords = (isRev ? card.keywordsRev : card.keywords) || [];
    const aspect   = card.aspects?.[theme] || card.aspects?.love || null;
    const aspectText = aspect ? (isRev ? aspect.rev : aspect.up) : null;
    const themeLabel = TarotHelper.getThemeLabel(theme);

    // Build or reuse modal
    let modal = document.getElementById('meaningModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'meaningModal';
      modal.className = 'meaning-modal-overlay';
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeMeaningModal();
      });
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="meaning-modal-panel">
        <button class="meaning-modal-close" onclick="document.getElementById('meaningModal').remove()">&times;</button>

        <div class="mm-layout">
          <!-- Card image -->
          <div class="mm-img-col">
            <img
              src="${card.image}"
              alt="${card.name}"
              class="mm-card-img${isRev ? ' mm-card-img--rev' : ''}"
            />
            <div class="mm-slot-label">${label}</div>
          </div>

          <!-- Content -->
          <div class="mm-content">
            <div class="mm-title">${card.name}</div>
            <div class="mm-subtitle">
              ${card.nameVi} &nbsp;|&nbsp; ${card.number}
              &nbsp;|&nbsp;
              <span class="mm-orient ${isRev ? 'rev' : 'up'}">${isRev ? 'Ngược' : 'Xuôi'}</span>
            </div>

            ${card.planet || card.zodiac ? `
            <div class="mm-meta-row">
              ${card.planet ? `<span class="mm-chip">Hành tinh: ${card.planet}</span>` : ''}
              ${card.zodiac ? `<span class="mm-chip">Cung: ${card.zodiac}</span>` : ''}
              ${card.numerology ? `<span class="mm-chip">${card.numerology}</span>` : ''}
            </div>` : ''}

            <div class="mm-section">Ý Nghĩa</div>
            <p class="mm-text">${meaning}</p>

            <div class="mm-section">Từ Khóa</div>
            <div class="mm-kw-row">
              ${keywords.map(k => `<span class="mm-kw">${k}</span>`).join('')}
            </div>

            ${aspectText ? `
              <div class="mm-section">Trong Lĩnh Vực ${themeLabel}</div>
              <p class="mm-text mm-text--aspect">${aspectText}</p>
            ` : ''}

            ${card.advice ? `
              <div class="mm-section">Lời Khuyên</div>
              <p class="mm-text mm-text--advice">${card.advice}</p>
            ` : ''}
          </div>
        </div>
      </div>
    `;

    // Animate in
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    const panel = modal.querySelector('.meaning-modal-panel');
    panel.style.transform = 'scale(0.88) translateY(20px)';
    panel.style.opacity   = '0';
    if (window.triggerLightning) window.triggerLightning();
    requestAnimationFrame(() => requestAnimationFrame(() => {
      modal.style.transition = 'opacity 0.35s';
      modal.style.opacity    = '1';
      panel.style.transition = 'transform 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.45s';
      panel.style.transform  = 'scale(1) translateY(0)';
      panel.style.opacity    = '1';
    }));
  }

  function closeMeaningModal() {
    const modal = document.getElementById('meaningModal');
    if (!modal) return;
    modal.style.transition = 'opacity 0.3s';
    modal.style.opacity    = '0';
    setTimeout(() => modal.remove(), 320);
  }

  /* ══════════════════════════════════════════════════
     FLIP ALL
  ══════════════════════════════════════════════════ */
  function flipAll() {
    const cards = selectedArea.querySelectorAll('.spread-card:not(.flipped)');
    cards.forEach((c, i) => {
      setTimeout(() => {
        c.click();
      }, i * 350);
    });
    btnFlipAll.classList.add('hidden');
  }

  function checkAllFlipped() {
    if (flippedCount >= session.spread) {
      instruction.textContent = 'Tất cả lá bài đã lên tiếng. Hãy đọc thông điệp của vũ trụ...';
      btnFlipAll.classList.add('hidden');
      setTimeout(() => {
        btnGoAnalysis.classList.remove('hidden');
      }, 300);
    }
  }

  /* ── Button events ─────────────────────────────── */
  btnFlipAll.addEventListener('click', flipAll);

  /* ── Public API ─────────────────────────────────── */
  return {
    init,
    getSelectedCards: () => selectedCards,
    getSession:       () => session
  };
})();
