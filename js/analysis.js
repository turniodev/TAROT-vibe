// js/analysis.js — Analysis page rendering (fixed layout + Vietnamese + font)
window.AnalysisModule = (function () {
  const container = document.getElementById('analysisContent');

  const THEME_LABELS = {
    love:'Tình Yêu', career:'Sự Nghiệp', finance:'Tài Chính',
    health:'Sức Khỏe', spiritual:'Tâm Linh', general:'Tổng Quát'
  };

  function render(cards, session) {
    container.innerHTML = '';
    const theme  = session.theme;
    const labels = TarotHelper.getSpreadLabels(cards.length);
    const themeLabel = THEME_LABELS[theme] || theme;

    /* ── Title ─────────────────────────────────────── */
    const titleBlock = document.createElement('div');
    titleBlock.className = 'analysis-title-block';
    titleBlock.innerHTML = `
      <h1 class="analysis-main-title">Thông Điệp Từ Vũ Trụ</h1>
      <div class="analysis-divider"></div>
      <p class="analysis-meta-line">${session.name}${session.dob ? ` (Sinh: ${session.dob})` : ''} &mdash; ${themeLabel}</p>
      <p class="analysis-question-line">"${session.question}"</p>
    `;
    container.appendChild(titleBlock);

    /* ── Each card block: image LEFT, content RIGHT ── */
    cards.forEach((card, i) => {
      const isRev   = card.isReversed;
      const meaning = isRev ? card.reversed : card.upright;
      const kws     = (isRev ? card.keywordsRev : card.keywords) || [];
      const aspect  = card.aspects?.[theme] || card.aspects?.love || null;
      let aspectText = aspect ? (isRev ? aspect.rev : aspect.up) : null;

      // Avoid rendering identical text if meaning and aspectText are very similar
      if (aspectText && meaning) {
        const mTrim = meaning.trim();
        const aTrim = aspectText.trim();
        // Compare first 40 chars to catch "Trong mối quan hệ: " prefixed exact copies
        if (mTrim === aTrim || mTrim.includes(aTrim.substring(0, 40)) || aTrim.includes(mTrim.substring(0, 40))) {
          aspectText = null;
        }
      }

      const block = document.createElement('div');
      block.className = 'analysis-block';
      block.style.animationDelay = (i * 150) + 'ms';

      block.innerHTML = `
        <div class="ab-layout">
          <!-- LEFT: card image -->
          <div class="ab-img-col">
            <img
              src="${card.image}"
              alt="${card.name}"
              class="ab-card-img${isRev ? ' ab-card-img--rev' : ''}"
            />
            <div class="ab-slot-label">${labels[i]}</div>
          </div>

          <!-- RIGHT: content -->
          <div class="ab-content-col">
            <div class="ab-card-title">${labels[i]} — ${card.name}</div>
            <div class="ab-card-subtitle">
              ${card.nameVi} &nbsp;|&nbsp; ${card.number}
              &nbsp;|&nbsp;
              <span class="ab-orientation ${isRev ? 'rev' : 'up'}">${isRev ? 'Ngược' : 'Xuôi'}</span>
            </div>

            <div class="ab-meta-row">
              ${card.planet  ? `<span class="ab-meta-chip">Hành tinh: ${card.planet}</span>` : ''}
              ${card.zodiac  ? `<span class="ab-meta-chip">Cung: ${card.zodiac}</span>` : ''}
              ${card.numerology ? `<span class="ab-meta-chip">${card.numerology}</span>` : ''}
            </div>

            <div class="ab-section-label">Ý Nghĩa</div>
            <p class="ab-text">${meaning || ''}</p>

            <div class="ab-section-label">Từ Khóa</div>
            <div class="ab-kw-row">
              ${kws.map(k => `<span class="ab-kw">${k}</span>`).join('')}
            </div>

            ${aspectText ? `
              <div class="ab-section-label">Trong Lĩnh Vực ${themeLabel}</div>
              <p class="ab-text ab-text--aspect">${aspectText}</p>
            ` : ''}

            ${card.advice ? `
              <div class="ab-section-label">Lời Khuyên</div>
              <p class="ab-text ab-text--advice">${card.advice}</p>
            ` : ''}
          </div>
        </div>
      `;
      container.appendChild(block);
    });

    /* ── Overall summary ────────────────────────────── */
    const overall = document.createElement('div');
    overall.className = 'overall-box';
    overall.innerHTML = `
      <div class="overall-title">Tổng Hợp Thông Điệp</div>
      <p class="overall-text">${buildSummary(cards, session, themeLabel)}</p>
    `;
    container.appendChild(overall);
  }

  function buildSummary(cards, session, themeLabel) {
    const names    = cards.map(c => c.nameVi).join(', ');
    const upCount  = cards.filter(c => !c.isReversed).length;
    const revCount = cards.length - upCount;
    const tone     = upCount >= cards.length * 0.6
      ? 'Năng lượng chủ yếu mang tín hiệu tích cực và thuận lợi.'
      : 'Các lá bài gửi đến thông điệp cảnh báo và cần thận trọng.';

    return `Với sự kết hợp của <em>${names}</em>, vũ trụ đang nói rằng: ${tone} `
      + `${session.name} ơi, hãy lắng nghe tiếng nói bên trong, giữ bình tâm và tin vào hành trình phía trước. `
      + `${upCount} lá bài xuôi và ${revCount} lá bài ngược phản ánh sự cân bằng giữa `
      + `những thuận lợi và thách thức trong ${themeLabel.toLowerCase()} của bạn. `
      + `Hãy tin vào quá trình — mọi thứ đều có lý do để xảy ra đúng lúc nhất.`;
  }

  return { render };
})();
