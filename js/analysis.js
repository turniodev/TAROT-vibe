// js/analysis.js — Analysis page: card details + Gemini AI synthesis
window.AnalysisModule = (function () {
  const container = document.getElementById('analysisContent');
  const API_BASE = 'https://ka-en.com.vn/tarot_api';

  /* ── Main render ────────────────────────────────────── */
  function render(cards, session, preloadedAnalysis = null) {
    container.innerHTML = '';
    const shareBtn = document.getElementById('btnShareReading');
    if (shareBtn) delete shareBtn.dataset.id;

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
    aiBlock.id = 'aiBlockBox';
    aiBlock.className = 'overall-box ai-analysis-box';
    aiBlock.innerHTML = `
      <div class="overall-title">
        <span class="ai-label">✦ Luận Giải Tổng Hợp</span>
      </div>
      <div class="ai-loading" id="aiLoading">
        <div class="ai-pulse"></div>
        <span>Vui lòng đợi kết nối với vũ trụ…</span>
      </div>
      <div class="ai-content" id="aiContent" style="display:none"></div>
    `;
    container.appendChild(aiBlock);

    /* Card blocks */
    cards.forEach((card, i) => {
      const isRev = card.isReversed;
      const meaning = isRev ? (card.generalReversed || card.reversed) : (card.generalUpright || card.upright);
      const kws = (isRev ? card.keywordsRev : card.keywords) || [];
      const aspect = card.aspects?.[theme] || card.aspects?.general || null;
      let aspectText = aspect ? (isRev ? (aspect.reversed || aspect.rev) : (aspect.upright || aspect.up)) : null;

      if (aspectText && meaning) {
        const mT = meaning.trim(), aT = aspectText.trim();
        if (mT === aT || mT.includes(aT.substring(0, 40)) || aT.includes(mT.substring(0, 40))) aspectText = null;
      }

      const block = document.createElement('div');
      block.className = 'analysis-block';
      block.style.animationDelay = (i * 150) + 'ms';
      block.innerHTML = `
        <div class="ab-layout">
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
          <div class="ab-meaning">
            <div class="ab-section-label">Ý Nghĩa</div>
            <p class="ab-text">${meaning || ''}</p>
          </div>
          <div class="ab-body">
            <div class="ab-section-label">Từ Khóa</div>
            <div class="ab-kw-row">${kws.map(k => `<span class="ab-kw">${k}</span>`).join('')}</div>
            ${aspectText ? `<div class="ab-section-label">Trong ${themeLabel}</div><p class="ab-text ab-text--aspect">${aspectText}</p>` : ''}
            ${card.advice ? `<div class="ab-section-label">Lời Khuyên</div><p class="ab-text ab-text--advice">${card.advice}</p>` : ''}
          </div>
        </div>`;
      container.appendChild(block);
    });

    // The save to history action is handled by app.js at the time of clicking "Go Analysis".
    // This prevents duplicate history items when re-viewing from history tab.

    const basePayload = {
      reading_id: session.readingId || null,
      created_at: session.dt || null,
      name: session.name,
      dob: session.dob || '',
      gender: session.gender || '',
      theme: session.theme,
      theme_label: themeLabel,
      question: session.question,
      spread: cards.length,
      cards: cards.map((c, i) => {
        const aspect = c.aspects?.[session.theme] || c.aspects?.general || null;
        const aspect_meaning = aspect ? (c.isReversed ? (aspect.reversed || aspect.rev) : (aspect.upright || aspect.up)) : null;
        return {
          slot_idx: i,
          position_label: labels[i] || `Lá ${i + 1}`,
          id: c.id,
          name: c.name,
          name_vi: c.nameVi,
          number: c.number || '',
          is_reversed: c.isReversed,
          meaning: c.isReversed ? (c.generalReversed || c.reversed) : (c.generalUpright || c.upright),
          keywords: (c.isReversed ? c.keywordsRev : c.keywords) || [],
          planet: c.planet || null,
          zodiac: c.zodiac || null,
          element: c.element || null,
          numerology: c.numerology || null,
          aspect_meaning: aspect_meaning || null
        };
      })
    };

    if (preloadedAnalysis) {
      document.getElementById('aiLoading').style.display = 'none';
      const contentEl = document.getElementById('aiContent');
      contentEl.style.display = '';
      contentEl.innerHTML = markdownToHtml(preloadedAnalysis);
      const shareId = session.readingId || new URLSearchParams(window.location.search).get('share');
      if (shareId && shareId !== 'null') {
        document.getElementById('btnShareReading').dataset.id = shareId;
      }
    } else if (window.location.search.includes('share=')) {
      document.getElementById('aiLoading').innerHTML = `
        <div class="ai-login-gate" style="text-align: center;">
          <p style="margin-bottom: 16px; opacity: 0.8;">Chưa có dữ liệu luận giải tổng hợp cho trải bài này.</p>
          <button class="ai-login-btn" id="btnForceAi">
            <span>✦</span> Nhận Thông Điệp Vũ Trụ
          </button>
        </div>`;
      document.getElementById('btnForceAi')?.addEventListener('click', () => {
        const showLoading = () => {
          document.getElementById('aiLoading').innerHTML = `
            <div class="ai-pulse" style="margin: 0 auto 16px;"></div>
            <span>Đang kết nối với vũ trụ…</span>
          `;
        };
        if (!window.AuthModule?.isLoggedIn()) {
          window.AuthModule?.requireLogin(user => {
            showLoading();
            clarifyAndFetch(basePayload, cards, session, labels, themeLabel);
          });
        } else {
          showLoading();
          clarifyAndFetch(basePayload, cards, session, labels, themeLabel);
        }
      });
    } else {
      // Nếu là History Replay chưa có giải luận, hoặc xem bài bình thường -> bung modal hỏi clarify
      clarifyAndFetch(basePayload, cards, session, labels, themeLabel);
    }
  }

  /* ── Interactive Clarification step ─────────────────────── */
  async function clarifyAndFetch(payload, cards, session, labels, themeLabel) {
    const modal = document.getElementById('clarifyModal');
    const loading = document.getElementById('clarifyLoading');
    const qList = document.getElementById('clarifyQuestions');
    let btnSubmit = document.getElementById('btnSubmitClarify');

    // Đã bỏ check history bypass: nếu history CHƯA CÓ luận giải, vẫn bật popup cho user trả lời.

    const aiBox = document.getElementById('aiBlockBox');
    if (aiBox) aiBox.style.display = 'none';

    modal.classList.add('visible');
    loading.style.display = 'block';
    qList.style.display = 'none';

    // Clear old submit listener
    const newSubmit = btnSubmit.cloneNode(true);
    btnSubmit.parentNode.replaceChild(newSubmit, btnSubmit);
    btnSubmit = newSubmit;
    btnSubmit.disabled = true;

    try {
      const numQuestions = cards.length >= 5 ? 5 : 3;

      const descEl = document.getElementById('clarifyDesc');
      if (descEl) {
        descEl.textContent = `Vũ trụ cần bạn xác nhận ${numQuestions} điều để thông điệp được giải mã chính xác nhất cho hoàn cảnh của bạn lúc này.`;
      }

      // Fetch questions from mapped data and pick N at random
      let allQuestions = window.ClarifyData?.[session.theme];
      if (!allQuestions || allQuestions.length < numQuestions) {
        allQuestions = [
          "Bạn có đang vô tình bỏ qua những tín hiệu từ trực giác của chính mình không?",
          "Có phải một sự kiện trong quá khứ vẫn đang âm thầm cản trở bước tiến của bạn hiện tại?",
          "Sâu thẳm bên trong, bạn đã tự biết câu trả lời cho vấn đề này rồi phải không?",
          "Bạn có đang che giấu cảm xúc thật của mình với những người xung quanh không?",
          "Có phải bạn đang lo sợ một sự thay đổi lớn sẽ làm đảo lộn cuộc sống hiện tại?",
          "Bạn có cảm thấy mệt mỏi vì cứ phải cố gắng trong đơn độc không?",
          "Có phải bạn đang đặt kỳ vọng quá cao và tự tạo áp lực cho bản thân?",
          "Gần đây bạn có hay mơ thấy những điềm báo lạ không?"
        ];
      }

      // Shuffle and pick random questions
      const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
      let questions = shuffled.slice(0, numQuestions);
      let replacementQuestions = shuffled.slice(numQuestions);

      // Simulate a small delay for mystical effect
      await new Promise(r => setTimeout(r, 1500));

      loading.style.display = 'none';
      qList.style.display = 'block';

      const answers = new Array(numQuestions).fill(null);

      // Generate HTML dynamically
      let html = '';
      for (let i = 0; i < numQuestions; i++) {
        html += `
          <div class="cq-item" id="cq${i + 1}" style="display: ${i === 0 ? 'block' : 'none'}; opacity: ${i === 0 ? '1' : '0'}; transition: opacity 0.3s ease;">
            <p class="cq-text"><span style="opacity:0.6; font-size: 0.9em;">Câu ${i + 1}/${numQuestions}:</span><br/><span class="cq-qtext-inner" style="transition: opacity 0.3s ease;">${questions[i]}</span></p>
            <div class="cq-btns">
              <button class="cq-btn cq-yes" data-ans="yes">Có</button>
              <button class="cq-btn cq-no" data-ans="no">Không</button>
              <button class="cq-btn cq-skip" data-ans="skip">Bỏ qua</button>
            </div>
          </div>
        `;
      }
      qList.innerHTML = html;

      const checkCompleteAndNext = (index) => {
        setTimeout(() => {
          const current = document.getElementById(`cq${index + 1}`);
          const next = document.getElementById(`cq${index + 2}`);

          if (current) current.style.opacity = '0';

          setTimeout(() => {
            if (current) current.style.display = 'none';
            if (next) {
              next.style.display = 'block';
              // Small delay to allow reflow before fading in
              setTimeout(() => { next.style.opacity = '1'; }, 50);
            } else {
              // Final question answered
              modal.classList.remove('visible');
              payload.clarifications = answers;
              document.getElementById('aiLoading').innerHTML = `<div class="ai-pulse" style="margin: 0 auto 16px;"></div><span>Đang tập hợp năng lượng vui lòng kiên nhẫn và suy nghĩ về điều bạn mong chờ...</span>`;
              fetchGeminiAnalysis(payload, cards, session, labels, themeLabel);
            }
          }, 300);
        }, 400); // Wait 400ms after click (to show active state)
      };

      for (let i = 0; i < numQuestions; i++) {
        const item = document.getElementById(`cq${i + 1}`);
        item.querySelectorAll('.cq-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            // Prevent multi-click
            if (answers[i] !== null) return;
            
            if (btn.dataset.ans === 'skip') {
              if (replacementQuestions.length > 0) {
                const newQ = replacementQuestions.pop();
                questions[i] = newQ;
                
                const pText = item.querySelector('.cq-qtext-inner');
                pText.style.opacity = '0';
                setTimeout(() => {
                  pText.innerText = newQ;
                  pText.style.opacity = '1';
                }, 300);
              } else {
                alert("Vũ trụ không còn câu hỏi nào khác để thay thế nha!");
              }
              return; // Do not proceed to next question
            }

            item.querySelectorAll('.cq-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            answers[i] = { q: questions[i], a: btn.dataset.ans };
            checkCompleteAndNext(i);
          });
        });
      }

    } catch (e) {
      // Bỏ qua nếu lỗi
      modal.classList.remove('visible');
      fetchGeminiAnalysis(payload, cards, session, labels, themeLabel);
    }
  }

  /* ── Call PHP proxy ──────────────────────────────────── */
  async function fetchGeminiAnalysis(payload, cards, session, labels, themeLabel) {
    const aiBox = document.getElementById('aiBlockBox');
    if (aiBox) aiBox.style.display = 'block';

    const loadEl = document.getElementById('aiLoading');
    const contentEl = document.getElementById('aiContent');

    try {
      const res = await fetch(`${API_BASE}/gemini_proxy.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${window.AuthModule?.getToken() || ''}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 403) {
          const errData = await res.json().catch(() => ({}));
          if (errData.message === 'QUOTA_EXCEEDED') {
            loadEl.style.display = 'none';
            if (errData.is_anonymous) {
              // Anonymous: khuyến khích đăng nhập để được 3 lần/ngày
              showAnonQuotaModal();
            } else {
              // Đã login nhưng hết quota → hiện paywall nâng cấp gói
              if (window.DailyLimit) window.DailyLimit.showBlocked(payload.theme);
            }
            return;
          }
        }
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      const md = data.analysis || '';

      // Store ID for sharing
      if (data.reading_id) {
        document.getElementById('btnShareReading').dataset.id = data.reading_id;
      }


      // Save analysis to history to prevent re-fetching later
      const idToUpdate = session.readingId || session.localId;
      if (idToUpdate) {
        window.HistoryModule?.updateAnalysis(idToUpdate, md);
      }

      loadEl.style.display = 'none';
      contentEl.style.display = '';
      contentEl.innerHTML = markdownToHtml(md);

    } catch (err) {
      contentEl.style.display = 'none';
      loadEl.style.display = '';

      const isNetworkError = err.message.includes('400') || err.message.includes('502') || err.message.includes('500');
      const errorMsg = isNetworkError
        ? "Vũ trụ đang nhiễu loạn hoặc thông điệp quá mãnh liệt. Xin hãy thử lại."
        : `Lỗi kết nối vũ trụ: ${err.message}`;

      loadEl.innerHTML = `
        <div class="ai-error-box" style="text-align: center;">
          <p class="ai-error" style="margin-bottom:12px; color: var(--c-gold);">⚠ ${errorMsg}</p>
          <button class="btn-primary" id="btnRetryAI" style="padding:8px 24px; font-size: 0.9rem; margin: 0 auto; display: inline-flex;">Kết nối lại</button>
        </div>
      `;
      document.getElementById('btnRetryAI').addEventListener('click', () => {
        loadEl.innerHTML = `
          <div class="ai-pulse"></div>
          <span>Đang kết nối lại với vũ trụ…</span>
        `;
        fetchGeminiAnalysis(cards, session, labels, themeLabel);
      });
    }
  }

  /* ── Lightweight Markdown → HTML ─────────────────────── */
  function markdownToHtml(md) {
    return md
      // Divider
      .replace(/^[-*_]{3,}$/gm, '<div class="ai-divider"><span>✦</span></div>')
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
  document.getElementById('btnShareReading')?.addEventListener('click', function () {
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

  /* ── Anonymous quota exhausted → prompt to login ─── */
  function showAnonQuotaModal() {
    // Reuse the aiBlock area to show inline message
    const aiContent = document.getElementById('aiContent');
    const aiLoading = document.getElementById('aiLoading');
    if (aiLoading) aiLoading.style.display = 'none';
    if (aiContent) {
      aiContent.style.display = 'block';
      aiContent.innerHTML = `
        <div style="text-align:center; padding: 32px 20px;">
          <div style="font-size:2.5rem; margin-bottom:16px;">✦</div>
          <h3 style="font-family:'Cinzel',serif; color:var(--c-gold); font-size:1.1rem; margin-bottom:12px;">
            Bạn Đã Dùng Hết 10 Lượt Luận Giải Miễn Phí Hôm Nay
          </h3>
          <p style="color:var(--c-pale); font-size:0.9rem; line-height:1.7; margin-bottom:24px;">
            Hệ thống hiện tại giới hạn <strong style="color:var(--c-gold)">10 lần luận giải AI miễn phí</strong> mỗi ngày cho trải nghiệm thử nghiệm.<br/>
            Bạn có thể đăng nhập bằng Google hoặc nâng cấp gói để không giới hạn.
          </p>
          <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap;">
            <button onclick="document.getElementById('btnGoogleLogin')?.click()"
              style="padding:10px 24px; background:linear-gradient(135deg,rgba(107,0,204,0.8),rgba(155,48,255,0.6));
                     border:1px solid rgba(155,48,255,0.5); border-radius:10px; color:var(--c-gold);
                     font-family:'Cinzel',serif; font-size:0.85rem; cursor:pointer; letter-spacing:0.08em;">
              🔮 Đăng Nhập Google
            </button>
            <button onclick="window.DailyLimit?.showBlocked()"
              style="padding:10px 24px; background:rgba(201,168,76,0.1); border:1px solid rgba(201,168,76,0.3);
                     border-radius:10px; color:var(--c-gold); font-family:'Cinzel',serif;
                     font-size:0.85rem; cursor:pointer; letter-spacing:0.08em;">
              ⭐ Nâng Cấp Gói
            </button>
          </div>
          <p style="color:rgba(232,224,255,0.3); font-size:0.75rem; margin-top:20px;">
            Lượt miễn phí sẽ được reset vào 00:00 mỗi ngày
          </p>
        </div>
      `;
    }
  }

  return { render };
})();
