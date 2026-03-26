// js/daily.js — Daily Draw feature
(function () {
  const KEY = 'tarot_daily_draw';

  function getTodayString() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  function getSavedDraw() {
    try {
      const data = JSON.parse(localStorage.getItem(KEY));
      if (data && data.date === getTodayString()) return data;
    } catch (e) { }
    return null;
  }

  function saveDraw(card, message) {
    localStorage.setItem(KEY, JSON.stringify({
      date: getTodayString(),
      card: card,
      message: message
    }));
  }

  function init() {
    const widget = document.getElementById('dailyDrawWidget');
    const modal = document.getElementById('dailyDrawModal');
    const btnClose = document.getElementById('btnDailyClose');
    const cardWrap = document.getElementById('dailyCardWrap');
    const cardImg = document.getElementById('dailyCardImage');
    const resultBox = document.getElementById('dailyResult');
    const nameEl = document.getElementById('dailyCardName');
    const msgEl = document.getElementById('dailyCardMessage');
    const hintEl = document.getElementById('dailyHint');
    const thumbEl = document.getElementById('dailyWidgetThumb');
    const titleEl = document.getElementById('dailyTitle');

    if (!widget || !modal) return;

    if (titleEl) {
      const d = new Date();
      titleEl.innerText = `Thông Điệp Của Ngày ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
    }

    // Check if drawn today
    function syncWidgetState() {
      const saved = getSavedDraw();
      if (saved) {
        thumbEl.src = saved.card.image;
        if (saved.card.isReversed) {
          thumbEl.style.transform = 'rotate(180deg)';
        } else {
          thumbEl.style.transform = 'none';
        }
      } else {
        thumbEl.src = 'cards/back.png';
        thumbEl.style.transform = 'none';
      }
    }
    syncWidgetState();

    // Open Modal
    widget.addEventListener('click', () => {
      modal.classList.add('open');
      const saved = getSavedDraw();

      if (saved) {
        // Already drawn today
        cardWrap.classList.add('flipped');
        cardImg.src = saved.card.image;
        cardImg.style.transform = saved.card.isReversed ? 'rotate(180deg)' : 'none';
        
        nameEl.innerText = saved.card.name + (saved.card.isReversed ? ' (Ngược)' : '');
        msgEl.innerHTML = saved.message;
        resultBox.classList.add('visible');
        hintEl.style.display = 'none';
      } else {
        // Ready to draw
        cardWrap.classList.remove('flipped');
        resultBox.classList.remove('visible');
        cardImg.src = '';
        cardImg.style.transform = 'none';
        hintEl.style.display = 'block';
        hintEl.innerText = 'Chạm vào lá bài để đón nhận thông điệp vũ trụ';
      }
    });

    // Close Modal
    const closeAction = () => { modal.classList.remove('open'); };
    btnClose.addEventListener('click', closeAction);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAction();
    });

    // Draw Action
    cardWrap.addEventListener('click', async () => {
      if (getSavedDraw()) return; // Already drawn
      if (cardWrap.classList.contains('flipped')) return; // Currently fetching

      if (!window.TAROT_DB || window.TAROT_DB.length === 0) return;
      const rCard = window.TAROT_DB[Math.floor(Math.random() * window.TAROT_DB.length)];
      const isReversed = Math.random() < 0.3; // 30% reversed
      const drawnCard = { ...rCard, isReversed };

      // Flip and show spinner text
      cardImg.src = drawnCard.image;
      cardImg.style.transform = isReversed ? 'rotate(180deg)' : 'none';
      cardWrap.classList.add('flipped');
      
      hintEl.innerText = 'Vũ trụ đang kết nối tinh tú...';
      hintEl.classList.add('shimmer-text');
      
      // Simulate mystical calculation delay (e.g. 2 seconds)
      setTimeout(() => {
        let message = 'Năng lượng vũ trụ đang giao thoa, hãy tĩnh tâm và chiêm nghiệm lại lá bài này trong ngày hôm nay.';
        
        if (window.getDailyMessage) {
          message = window.getDailyMessage(drawnCard.id, isReversed);
        } else {
          // Fallback based on keywords from TAROT_DB
          message = isReversed ? 
            (drawnCard.keywordsRev[0] + ": " + drawnCard.reversed.split('.')[0] + ".") : 
            (drawnCard.keywords[0] + ": " + drawnCard.upright.split('.')[0] + ".");
        }

        saveDraw(drawnCard, message);
        syncWidgetState();
        
        nameEl.innerText = drawnCard.name;
        const statusEl = document.getElementById('dailyCardStatus');
        if (statusEl) {
          statusEl.innerHTML = `<span class="mm-orient ${isReversed ? 'rev' : 'up'}">${isReversed ? 'Ngược (Reversed)' : 'Xuôi (Upright)'}</span>`;
          statusEl.style.textAlign = 'center';
          statusEl.style.marginTop = '4px';
          statusEl.style.marginBottom = '12px';
        }

        msgEl.innerHTML = message;
        resultBox.classList.add('visible');
        hintEl.style.display = 'none';
        hintEl.classList.remove('shimmer-text');
        
        // Click to open dictionary
        cardImg.onclick = () => {
          if (window.showCardDetail) {
            const dModal = document.getElementById('dailyDrawModal');
            if (dModal) dModal.classList.remove('visible');
            window.showCardDetail(drawnCard);
          }
        };
        
        if (window.playDrawSound) window.playDrawSound();
      }, 2000);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
