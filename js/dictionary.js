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

  // Full label map – mirrors form.js SUB_THEMES
  const ASPECT_LABELS = {
    // Love
    love:          { label: 'Tình Yêu Tổng Quát',       group: 'Tình Yêu' },
    ex:            { label: 'Người Yêu Cũ',              group: 'Tình Yêu' },
    current_love:  { label: 'Người Yêu Hiện Tại',        group: 'Tình Yêu' },
    ambiguous:     { label: 'Mối Quan Hệ Mập Mờ',        group: 'Tình Yêu' },
    crush:         { label: 'Crush / Thầm Thích',         group: 'Tình Yêu' },
    future_love:   { label: 'Người Yêu Tương Lai',        group: 'Tình Yêu' },
    someone:       { label: 'Người Ấy Nghĩ Gì Về Bạn',   group: 'Tình Yêu' },
    marriage:      { label: 'Hôn Nhân',                   group: 'Tình Yêu' },
    conflict:      { label: 'Giải Quyết Xung Đột',        group: 'Tình Yêu' },
    breakup:       { label: 'Chia Tay & Hàn Gắn',         group: 'Tình Yêu' },
    long_distance: { label: 'Yêu Xa',                     group: 'Tình Yêu' },
    jealousy:      { label: 'Người Thứ Ba / Ghen Tuông',  group: 'Tình Yêu' },
    self_love:     { label: 'Yêu Bản Thân',               group: 'Tình Yêu' },
    // Career
    career:        { label: 'Sự Nghiệp / Công Việc',      group: 'Sự Nghiệp' },
    job_search:    { label: 'Xin Việc Làm',                group: 'Sự Nghiệp' },
    promotion:     { label: 'Thăng Tiến',                  group: 'Sự Nghiệp' },
    business:      { label: 'Kinh Doanh / Khởi Nghiệp',   group: 'Sự Nghiệp' },
    colleague:     { label: 'Quan Hệ Đồng Nghiệp',         group: 'Sự Nghiệp' },
    career_change: { label: 'Chuyển Nghề',                 group: 'Sự Nghiệp' },
    freelance:     { label: 'Freelance / Tự Do',           group: 'Sự Nghiệp' },
    interview:     { label: 'Phỏng Vấn',                   group: 'Sự Nghiệp' },
    // Finance
    finance:       { label: 'Tài Chính Tổng Quát',         group: 'Tài Chính' },
    investment:    { label: 'Đầu Tư / Chứng Khoán',        group: 'Tài Chính' },
    debt:          { label: 'Nợ Nần / Vay Mượn',           group: 'Tài Chính' },
    savings:       { label: 'Tiết Kiệm & Tích Lũy',        group: 'Tài Chính' },
    luck_money:    { label: 'Lộc Tài / May Mắn',           group: 'Tài Chính' },
    // Health
    health:        { label: 'Sức Khỏe Thể Chất',           group: 'Sức Khỏe' },
    mental:        { label: 'Sức Khỏe Tâm Thần',           group: 'Sức Khỏe' },
    energy:        { label: 'Năng Lượng & Chakra',          group: 'Sức Khỏe' },
    family:        { label: 'Gia Đình',                     group: 'Sức Khỏe' },
    diet:          { label: 'Điều Độ / Chăm Sóc Bản Thân', group: 'Sức Khỏe' },
    // Self
    study:         { label: 'Học Tập',                      group: 'Bản Thân' },
    study_abroad:  { label: 'Du Học',                       group: 'Bản Thân' },
    self:          { label: 'Định Hướng Bản Thân',          group: 'Bản Thân' },
    purpose:       { label: 'Sứ Mệnh / Mục Đích Sống',     group: 'Bản Thân' },
    shadow_self:   { label: 'Bóng Tối Nội Tâm',            group: 'Bản Thân' },
    decision:      { label: 'Ra Quyết Định',                 group: 'Bản Thân' },
    travel:        { label: 'Du Lịch / Di Chuyển',          group: 'Bản Thân' },
    spiritual:     { label: 'Tâm Linh',                     group: 'Bản Thân' },
  };

  function showCardDetail(card) {
    const cdContent = document.getElementById('cdContent');
    const cdModal = document.getElementById('cardDetailModal');
    if (!cdContent || !cdModal) return;

    // Astrological info
    const astroData = [];
    if (card.planet) astroData.push(`<span>Hành tinh:</span> ${card.planet}`);
    if (card.zodiac) astroData.push(`<span>Cung:</span> ${card.zodiac}`);
    if (card.element) astroData.push(`<span>Nguyên tố:</span> ${card.element}`);
    const astroHtml = astroData.length > 0 ? `<div class="cd-astro">${astroData.join(' | ')}</div>` : '';

    const keywordsStr = card.keywords ? card.keywords.join(', ') : '';
    const keywordsRevStr = card.keywordsRev ? card.keywordsRev.join(', ') : '';

    // ── Render ALL aspects dynamically — accordion style ──
    let aspectsHtml = '';
    if (card.aspects && Object.keys(card.aspects).length > 0) {
      const grouped = {};
      Object.keys(card.aspects).forEach(k => {
        const meta = ASPECT_LABELS[k];
        if (!meta) return; // Skip "Khác" and other unmapped properties like "general"
        if (!grouped[meta.group]) grouped[meta.group] = [];
        grouped[meta.group].push({ key: k, label: meta.label, data: card.aspects[k] });
      });

      aspectsHtml = '<div class="cd-aspects-accordion" style="margin-top:28px;">';
      for (const [groupName, items] of Object.entries(grouped)) {
        const validItems = items.filter(item => {
          const u = item.data.upright || item.data.up || '';
          const r = item.data.reversed || item.data.rev || '';
          return u || r;
        });
        if (!validItems.length) continue;

        aspectsHtml += `
          <div class="cda-group">
            <button class="cda-group-btn" type="button">
              <span class="cda-group-label">${groupName}</span>
              <span class="cda-group-arrow">▸</span>
            </button>
            <div class="cda-group-body" style="display:none;">
              ${validItems.map(item => {
                const u = item.data.upright || item.data.up || '';
                const r = item.data.reversed || item.data.rev || '';
                return `
                  <div class="cda-item">
                    <button class="cda-item-btn" type="button">
                      <span class="cda-item-label">${item.label}</span>
                      <span class="cda-item-arrow">▸</span>
                    </button>
                    <div class="cda-item-body" style="display:none;">
                      ${u ? `<p class="cd-desc"><strong>Xuôi:</strong> ${u}</p>` : ''}
                      ${r ? `<p class="cd-desc cda-rev"><strong>Ngược:</strong> ${r}</p>` : ''}
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        `;
      }
      aspectsHtml += '</div>';
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
          
          ${aspectsHtml}
          
        </div>
      </div>
    `;

    cdModal.classList.add('visible');

    // ── Accordion toggle logic ──────────────────────────
    cdContent.querySelectorAll('.cda-group-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const group = btn.closest('.cda-group');
        const body  = group.querySelector('.cda-group-body');
        const arrow = btn.querySelector('.cda-group-arrow');
        const open  = body.style.display !== 'none';
        // Collapse all groups first
        cdContent.querySelectorAll('.cda-group-body').forEach(b => { b.style.display = 'none'; });
        cdContent.querySelectorAll('.cda-group-arrow').forEach(a => { a.textContent = '▸'; a.style.transform = ''; });
        if (!open) {
          body.style.display = 'block';
          arrow.textContent  = '▾';
        }
      });
    });

    cdContent.querySelectorAll('.cda-item-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const item  = btn.closest('.cda-item');
        const body  = item.querySelector('.cda-item-body');
        const arrow = btn.querySelector('.cda-item-arrow');
        const open  = body.style.display !== 'none';
        // Collapse siblings
        const parent = item.closest('.cda-group-body');
        parent.querySelectorAll('.cda-item-body').forEach(b => { b.style.display = 'none'; });
        parent.querySelectorAll('.cda-item-arrow').forEach(a => { a.textContent = '▸'; });
        if (!open) {
          body.style.display = 'block';
          arrow.textContent  = '▾';
        }
      });
    });
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
