// js/dictionary.js
(function () {
  let initialized = false;

  function initDictionary() {
    if (initialized) return;
    const majorGrid = document.getElementById('dictMajor');
    const minorGrid = document.getElementById('dictMinor');
    if (!majorGrid || !minorGrid || !window.TAROT_DB) return;

    window.TAROT_DB.forEach(card => {
      const cardEl = document.createElement('div');
      cardEl.className = 'dict-card';
      cardEl.innerHTML = `
        <div class="dict-card-img-wrap">
          <img src="${card.image}" alt="${card.name}" loading="lazy" />
        </div>
        <div class="dict-card-title">${card.nameVi || card.name}</div>
        <div class="dict-card-subtitle">${card.number}</div>
      `;
      cardEl.addEventListener('click', () => showCardDetail(card));

      if (card.arcana === 'major') {
        majorGrid.appendChild(cardEl);
      } else {
        minorGrid.appendChild(cardEl);
      }
    });
    initialized = true;
  }

  function showCardDetail(card) {
    const cdContent = document.getElementById('cdContent');
    const cdModal = document.getElementById('cardDetailModal');
    if (!cdContent || !cdModal) return;

    // Render astrological aspects if they exist
    const astroData = [];
    if (card.planet) astroData.push(`<span>Hành tinh:</span> ${card.planet}`);
    if (card.zodiac) astroData.push(`<span>Cung:</span> ${card.zodiac}`);
    if (card.element) astroData.push(`<span>Nguyên tố:</span> ${card.element}`);
    const astroHtml = astroData.length > 0 ? `<div class="cd-astro">${astroData.join(' | ')}</div>` : '';

    const keywordsStr = card.keywords ? card.keywords.join(', ') : '';
    const keywordsRevStr = card.keywordsRev ? card.keywordsRev.join(', ') : '';

    const aspectLabels = { love: 'Tình Yêu', career: 'Sự Nghiệp', finance: 'Tài Chính', health: 'Sức Khỏe', spiritual: 'Tâm Linh' };
    let aspectA = '';
    if (card.aspects) {
      for (let k in aspectLabels) {
        if (card.aspects[k]) {
          const u = card.aspects[k].upright || card.aspects[k].up;
          const r = card.aspects[k].reversed || card.aspects[k].rev;
          if (u || r) {
            aspectA += `
              <div class="ai-divider">✦</div>
              <div class="cd-section cd-section--aspect">
                <h3 class="cd-sec-title" style="color:var(--c-glow); font-size:1.15rem; text-align:center; letter-spacing:0.1em; margin-bottom:16px;">CHỦ ĐỀ: ${aspectLabels[k].toUpperCase()}</h3>
                ${u ? `<p class="cd-desc"><strong>Ý Nghĩa Xuôi:</strong> ${u}</p>` : ''}
                ${r ? `<p class="cd-desc" style="margin-top:12px;"><strong>Ý Nghĩa Ngược:</strong> ${r}</p>` : ''}
              </div>
            `;
          }
        }
      }
    }

    cdContent.innerHTML = `
      <div class="cd-layout">
        <div class="cd-img-col">
          <img src="${card.image}" alt="${card.name}" class="cd-img" />
          <div style="text-align: center; margin-top: 18px;">
            <h2 class="cd-name">${card.name} <br/><span class="cd-name-vi" style="font-size:1.1rem;">(${card.nameVi})</span></h2>
            <div class="cd-number-arcana" style="margin-bottom: 12px; font-size: 0.95rem;">${card.number} &mdash; ${card.arcana === 'major' ? 'Bộ Ẩn Chính' : 'Bộ Ẩn Phụ'}</div>
            ${astroHtml}
          </div>
        </div>
        <div class="cd-info-col">
          <div class="cd-section">
            <h3 class="cd-sec-title">Ý Nghĩa Xuôi (Upright)</h3>
            <p class="cd-desc">${card.generalUpright || card.upright}</p>
            ${keywordsStr ? `<div class="cd-kws"><strong>Từ khóa:</strong> ${keywordsStr}</div>` : ''}
          </div>
          
          <div class="cd-section" style="margin-top: 24px;">
            <h3 class="cd-sec-title">Ý Nghĩa Ngược (Reversed)</h3>
            <p class="cd-desc">${card.generalReversed || card.reversed}</p>
            ${keywordsRevStr ? `<div class="cd-kws"><strong>Từ khóa:</strong> ${keywordsRevStr}</div>` : ''}
          </div>
          
          ${aspectA}
          
        </div>
      </div>
    `;

    cdModal.classList.add('visible');
  }

  window.addEventListener('DOMContentLoaded', () => {
    const btnOpen = document.getElementById('btnDictionary');
    const btnClose = document.getElementById('btnDictClose');
    const modal = document.getElementById('dictionaryModal');
    
    const btnCdClose = document.getElementById('btnCdClose');
    const cdModal = document.getElementById('cardDetailModal');

    if (btnOpen) {
      btnOpen.addEventListener('click', () => {
        initDictionary();
        modal.classList.add('visible');
      });
    }

    if (btnClose) {
      btnClose.addEventListener('click', () => modal.classList.remove('visible'));
    }

    if (btnCdClose) {
      btnCdClose.addEventListener('click', () => cdModal.classList.remove('visible'));
    }

    // Close on backdrop click
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('visible');
      });
    }
    if (cdModal) {
      cdModal.addEventListener('click', (e) => {
        if (e.target === cdModal) cdModal.classList.remove('visible');
      });
    }
  });

})();
