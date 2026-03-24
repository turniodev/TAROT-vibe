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

    userInfo.textContent  = `${sess.name}  ·  ${TarotHelper.getThemeLabel(sess.theme)}`;
    questionEl.textContent = `"${sess.question}"`;
    instruction.textContent = `Tập trung vào câu hỏi và chọn ${sess.spread} lá bài`;

    deckArea.innerHTML     = '';
    selectedArea.innerHTML = '';
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
    window.FX?.ripple(el, e, 'rgba(200,121,255,0.4)');

    // Fly-out animation
    el.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1), opacity 0.4s';
    el.style.transform  = 'scale(1.15) translateY(-30px)';
    el.style.opacity    = '0';

    selectedCards.push(card);
    const slotIdx = selectedCards.length - 1;

    setTimeout(() => {
      el.style.display = 'none';
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
      deckArea.style.transition = 'opacity 0.5s, transform 0.5s';
      deckArea.style.opacity = '0';
      deckArea.style.transform = 'scale(0.95)';
      deckArea.style.pointerEvents = 'none';
      setTimeout(() => { deckArea.style.display = 'none'; }, 520);
      btnFlipAll.classList.remove('hidden');
    }
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
      <span class="card-caption-name">${card.nameVi}</span>
      <span class="card-caption-en">${card.name}</span>
      <span class="card-orientation ${card.isReversed ? 'rev' : 'up'}">
        ${card.isReversed ? 'Ngược' : 'Xuôi'}
      </span>`;

    face.appendChild(frontImg);
    face.appendChild(caption);
    inner.appendChild(back);
    inner.appendChild(face);
    wrap.appendChild(inner);

    // Click to flip
    wrap.addEventListener('click', (e) => {
      if (wrap.classList.contains('flipped')) return;
      flipCard(wrap, card, slotIdx, e);
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

    // Show meaning panel after flip animation
    setTimeout(() => {
      showMeaningPanel(cardEl, card, slotIdx);
      checkAllFlipped();
    }, 650);
  }

  /* ══════════════════════════════════════════════════
     MEANING PANEL (inline below each card)
  ══════════════════════════════════════════════════ */
  function showMeaningPanel(cardEl, card, slotIdx) {
    const slotWrap = cardEl.closest('.slot-wrap');
    if (!slotWrap || slotWrap.querySelector('.meaning-panel')) return;

    const theme    = session.theme;
    const isRev    = card.isReversed;
    const meaning  = isRev ? card.reversed : card.upright;
    const keywords = isRev ? card.keywordsRev : card.keywords;
    const aspect   = card.aspects?.[theme] || card.aspects?.love;

    const panel = document.createElement('div');
    panel.className = 'meaning-panel';
    const aspectText = aspect ? (isRev ? aspect.rev : aspect.up) : null;
    panel.innerHTML = `
      <div class="mp-name">${card.nameVi} — ${isRev ? 'Ngược' : 'Xuôi'}</div>
      <div class="mp-orientation ${isRev ? 'rev' : 'up'}">${isRev ? 'Ngược' : 'Xuôi'}</div>
      <div class="mp-section">Ý Nghĩa</div>
      <div class="mp-text">${meaning}</div>
      <div class="mp-section">Từ Khóa</div>
      <div class="mp-keywords">
        ${(keywords || []).map(k => `<span class="mp-kw">${k}</span>`).join('')}
      </div>
      ${aspectText ? `
        <div class="mp-section">Trong Lĩnh Vực ${TarotHelper.getThemeLabel(theme)}</div>
        <div class="mp-aspect-text">${aspectText}</div>
      ` : ''}
      ${card.advice ? `<div class="mp-section">Lời Khuyên</div><div class="mp-advice">${card.advice}</div>` : ''}
    `;

    slotWrap.appendChild(panel);

    // Animate in
    requestAnimationFrame(() => {
      panel.style.opacity = '0';
      panel.style.transform = 'translateY(-10px)';
      requestAnimationFrame(() => {
        panel.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)';
        panel.style.opacity = '1';
        panel.style.transform = 'translateY(0)';
      });
    });
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
