// js/form.js v4 — 5+1 main themes → sub-theme drill-down → auto-advance
(function () {
  const overlay     = document.getElementById('formOverlay');
  const panel       = overlay.querySelector('.form-panel');
  const progressBar = document.getElementById('formProgressBar');
  const stepDots    = document.querySelectorAll('.step-dot');
  const stepEls     = document.querySelectorAll('.form-step');
  const charCount   = document.getElementById('charCount');
  const inputQ      = document.getElementById('inputQuestion');

  let currentStep = 1;
  const TOTAL = 4;
  let _selectedTheme = 'general';

  /* ── Helpers ──────────────────────────────────────── */
  function getStep(n) { return document.getElementById(`step${n}`); }

  function updateProgress(n) {
    const pct = ((n - 1) / (TOTAL - 1)) * 100;
    progressBar.style.width = Math.max(8, pct) + '%';
    stepDots.forEach((d, i) => {
      const wasActive = d.classList.contains('active');
      d.classList.toggle('active', i + 1 === n);
      d.classList.toggle('done',   i + 1 < n);
      if (i + 1 === n && !wasActive) window.FX?.activateDot(d);
    });
  }

  function goToStep(next, direction = 'forward') {
    const outEl = getStep(currentStep);
    const inEl  = getStep(next);
    currentStep = next;
    updateProgress(next);
    if (window.FX?.slideStep) window.FX.slideStep(outEl, inEl, direction);
    else { outEl.classList.remove('active'); inEl.classList.add('active'); }
    // When arriving at step 3: auto-switch to preset Q tab
    if (next === 3) {
      setTimeout(() => switchQTab('preset'), 480);
    }
    setTimeout(() => {
      const firstInput = inEl.querySelector('input, textarea');
      if (firstInput && firstInput.type !== 'radio') firstInput.focus();
    }, 460);
  }

  /* ── Open / Close ─────────────────────────────────── */
  function openForm() {
    stepEls.forEach((s, i) => s.classList.toggle('active', i === 0));
    currentStep = 1;
    updateProgress(1);
    _selectedTheme = 'general';
    renderMainThemes('mainThemeGrid');
    
    // Auto-fill from latest session
    const prev = window.ReadingModule?.getSession ? window.ReadingModule.getSession() : null;
    if (prev?.name) document.getElementById('inputName').value = prev.name;
    if (prev?.dob)  document.getElementById('inputDob').value  = prev.dob;

    const subEl  = document.getElementById('subThemePanel');
    const gridEl = document.getElementById('mainThemeGrid');
    if (subEl)  { subEl.classList.add('hidden'); subEl.innerHTML = ''; }
    if (gridEl) gridEl.classList.remove('hidden');
    if (window.FX?.modalOpen) window.FX.modalOpen(overlay, panel);
    else overlay.classList.add('visible');
  }
  function closeForm() {
    if (window.FX?.modalClose) window.FX.modalClose(overlay, panel);
    else overlay.classList.remove('visible');
  }

  document.getElementById('btnOpenForm').addEventListener('click', (e) => {
    window.FX?.ripple(e.currentTarget, e, 'rgba(200,121,255,0.35)');
    setTimeout(openForm, 80);
  });
  document.getElementById('btnCloseForm').addEventListener('click', closeForm);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeForm(); });

  /* ── 5 Main themes + "Xem Thêm" ──────────────────── */
  const MAIN_THEMES = [
    { key:'love',    label:'Tình Yêu',   icon:'&#9829;', desc:'Quan hệ & cảm xúc' },
    { key:'career',  label:'Sự Nghiệp',  icon:'&#9651;', desc:'Công việc & định hướng' },
    { key:'finance', label:'Tài Chính',  icon:'&#11045;',desc:'Tiền bạc & đầu tư' },
    { key:'health',  label:'Sức Khỏe',   icon:'&#10022;',desc:'Thể chất & tinh thần' },
    { key:'self',    label:'Bản Thân',   icon:'&#10038;',desc:'Phát triển & định hướng' },
    { key:'more',    label:'Xem Thêm',   icon:'&#8943;', desc:'Tất cả chủ đề' },
  ];

  /* ── Sub-theme groups ─────────────────────────────── */
  const SUB_THEMES = {
    love: [
      { key:'ex',           label:'Người Yêu Cũ',          desc:'Mối quan hệ đã qua' },
      { key:'current_love', label:'Người Yêu Hiện Tại',    desc:'Tình cảm đang có' },
      { key:'ambiguous',    label:'Mối Quan Hệ Mập Mờ',    desc:'Chưa rõ ràng' },
      { key:'crush',        label:'Crush / Thầm Thích',    desc:'Người tôi thích' },
      { key:'future_love',  label:'Người Yêu Tương Lai',   desc:'Tình duyên sắp tới' },
      { key:'someone',      label:'Người Ấy',              desc:'Người đang nghĩ đến' },
      { key:'marriage',     label:'Hôn Nhân',              desc:'Vợ chồng & hôn nhân' },
      { key:'conflict',     label:'Giải Quyết Xung Đột',   desc:'Hóa giải mâu thuẫn' },
    ],
    career: [
      { key:'career',     label:'Sự Nghiệp / Công Việc', desc:'Công việc hiện tại' },
      { key:'job_search', label:'Xin Việc Làm',          desc:'Cơ hội việc mới' },
    ],
    finance: [
      { key:'finance', label:'Tài Chính', desc:'Tiền bạc & đầu tư' },
    ],
    health: [
      { key:'health', label:'Sức Khỏe', desc:'Thể chất & tinh thần' },
      { key:'family', label:'Gia Đình', desc:'Các mối quan hệ gia đình' },
    ],
    self: [
      { key:'study',        label:'Học Tập',             desc:'Kết quả & mục tiêu học' },
      { key:'study_abroad', label:'Du Học',              desc:'Cuộc sống học tập nước ngoài' },
      { key:'self',         label:'Định Hướng Bản Thân', desc:'Phát triển cá nhân' },
    ],
  };

  const ALL_SUBS = Object.values(SUB_THEMES).flat();

  /* ── Render main theme card grid ──────────────────── */
  function renderMainThemes(containerId) {
    const grid = document.getElementById(containerId || 'mainThemeGrid');
    if (!grid) return;
    grid.innerHTML = MAIN_THEMES.map(t => `
      <button class="theme-card" data-main="${t.key}" type="button">
        <span class="theme-icon-wrap"><span class="theme-icon">${t.icon}</span></span>
        <span class="theme-name">${t.label}</span>
        <span class="theme-desc">${t.desc}</span>
      </button>`).join('');
    grid.querySelectorAll('.theme-card').forEach(card => {
      card.addEventListener('click', (e) => {
        window.FX?.ripple(card, e, 'rgba(200,121,255,0.35)');
        setTimeout(() => showSubThemes(card.dataset.main, containerId || 'mainThemeGrid'), 60);
      });
    });
  }

  /* ── Show sub-themes after main card click ────────── */
  function showSubThemes(mainKey, containerId) {
    containerId = containerId || 'mainThemeGrid';
    const isQR  = containerId === 'qrMainThemeGrid';
    const gridEl = document.getElementById(containerId);
    const subEl  = document.getElementById(isQR ? 'qrSubThemePanel' : 'subThemePanel');
    const mainLabel = MAIN_THEMES.find(t => t.key === mainKey)?.label || 'Tất Cả';

    // 'more' = all sub-themes in a flat list grouped by parent
    let subs;
    if (mainKey === 'more') {
      subs = Object.entries(SUB_THEMES).flatMap(([k, arr]) =>
        arr.map(s => ({ ...s, _group: MAIN_THEMES.find(t => t.key === k)?.label || '' }))
      );
    } else {
      subs = (SUB_THEMES[mainKey] || []).map(s => ({ ...s, _group: '' }));
    }

    subEl.innerHTML = `
      <div class="sub-back">
        <button class="sub-back-btn" type="button">&#8592; ${mainLabel}</button>
      </div>
      <div class="sub-theme-list">
        ${subs.map(s => `
          <button class="sub-theme-item" data-value="${s.key}" type="button">
            <span class="sti-label">${s.label}</span>
            <span class="sti-desc">${s._group ? s._group + ' · ' : ''}${s.desc}</span>
            <span class="sti-arrow">&#8594;</span>
          </button>`).join('')}
      </div>`;

    subEl.querySelector('.sub-back-btn').addEventListener('click', () => {
      subEl.classList.add('hidden');
      gridEl.classList.remove('hidden');
    });

    subEl.querySelectorAll('.sub-theme-item').forEach(item => {
      item.addEventListener('click', (e) => {
        subEl.querySelectorAll('.sub-theme-item').forEach(i => i.classList.remove('chosen'));
        item.classList.add('chosen');
        _selectedTheme = item.dataset.value;
        window.FX?.ripple(item, e, 'rgba(200,121,255,0.4)');
        if (!isQR) {
          setTimeout(() => goToStep(3, 'forward'), 260);
        }
      });
    });

    gridEl.classList.add('hidden');
    subEl.classList.remove('hidden');
  }

  /* ── Skip theme (Bỏ Qua) ─────────────────────────── */
  document.getElementById('btnSkipTheme')?.addEventListener('click', () => {
    _selectedTheme = 'general';
    goToStep(3, 'forward');
  });

  /* ── Validation ───────────────────────────────────── */
  function validateStep(n) {
    if (n === 1) {
      const name = document.getElementById('inputName');
      const dob  = document.getElementById('inputDob');
      let valid = true;
      if (!name.value.trim()) {
        window.FX?.shake(name); window.FX?.glowPulse(name, 'rgba(255,80,80,0.6)');
        valid = false;
      }
      if (!dob.value) {
        window.FX?.shake(dob); window.FX?.glowPulse(dob, 'rgba(255,80,80,0.6)');
        valid = false;
      }
      return valid;
    }
    if (n === 3) {
      if (inputQ.value.trim().length < 5) {
        window.FX?.shake(inputQ); window.FX?.glowPulse(inputQ, 'rgba(255,80,80,0.6)');
        return false;
      }
    }
    return true;
  }

  /* ── Spread option ripple ─────────────────────────── */
  document.querySelectorAll('.spread-card-opt').forEach(opt => {
    opt.addEventListener('click', (e) => {
      const ui = opt.querySelector('.spread-card-ui');
      window.FX?.ripple(ui, e, 'rgba(200,121,255,0.3)');
      window.FX?.glowPulse(ui, 'rgba(155,48,255,0.5)');
    });
  });

  /* ── Next / Prev delegation ───────────────────────── */
  document.addEventListener('click', (e) => {
    const nextBtn = e.target.closest('.btn-next');
    const prevBtn = e.target.closest('.btn-prev');
    if (nextBtn && nextBtn.closest('#formOverlay')) {
      const next = parseInt(nextBtn.dataset.next);
      if (validateStep(currentStep)) {
        window.FX?.ripple(nextBtn, e, 'rgba(200,121,255,0.4)');
        setTimeout(() => goToStep(next, 'forward'), 60);
      }
    }
    if (prevBtn && prevBtn.closest('#formOverlay')) {
      const prev = parseInt(prevBtn.dataset.prev);
      window.FX?.ripple(prevBtn, e, 'rgba(155,48,255,0.3)');
      if (prev === 1) {
        document.getElementById('subThemePanel')?.classList.add('hidden');
        document.getElementById('mainThemeGrid')?.classList.remove('hidden');
      }
      setTimeout(() => goToStep(prev, 'backward'), 60);
    }
  });

  /* ── Enter key ────────────────────────────────────── */
  document.getElementById('inputName').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); if (validateStep(1)) goToStep(2, 'forward'); }
  });
  inputQ.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.shiftKey)) {
      e.preventDefault(); if (validateStep(3)) goToStep(4, 'forward');
    }
  });

  /* ── Char counter ─────────────────────────────────── */
  if (inputQ && charCount) {
    inputQ.addEventListener('input', () => {
      const len = Math.min(inputQ.value.length, 200);
      if (inputQ.value.length > 200) inputQ.value = inputQ.value.slice(0, 200);
      charCount.textContent = `${len} / 200`;
      charCount.style.color = len > 180 ? 'rgba(255,160,80,0.8)' : 'rgba(255,255,255,0.25)';
    });
  }

  /* ── Input focus sparkle ──────────────────────────── */
  document.querySelectorAll('.mystical-input').forEach(inp => {
    inp.addEventListener('focus', () => {
      const rect = inp.getBoundingClientRect();
      window.FX?.burst(rect.left + 20, rect.bottom, 6, 'rgba(155,48,255,0.6)');
    });
  });

  /* ── Preset questions ─────────────────────────────── */
  const PRESET_Q = {
    ex: [{ group:'Người Yêu Cũ', qs:[
      'Người yêu cũ từng dành cho tôi tình cảm như thế nào?',
      'Hiện tại người yêu cũ còn giữ tình cảm gì với tôi không?',
      'Người yêu cũ nghĩ gì về việc quay lại?',
      'Bản chất và ý nghĩa của mối quan hệ cũ là gì?',
      'Nếu quay lại, mối quan hệ sẽ tiến triển ra sao?',
      'Lời khuyên để tôi đối diện với người yêu cũ?',
    ]}],
    current_love: [{ group:'Người Yêu Hiện Tại', qs:[
      'Người yêu hiện tại dành cho tôi tình cảm thế nào?',
      'Người ấy kỳ vọng gì ở mối quan hệ này?',
      'Người ấy đang suy nghĩ thế nào về tình yêu của chúng tôi?',
      'Thử thách hoặc trở ngại trong mối quan hệ hiện tại là gì?',
      'Lời khuyên để mối quan hệ của chúng tôi bền vững hơn?',
    ]}],
    ambiguous: [{ group:'Mối Quan Hệ Mập Mờ', qs:[
      'Người này thật sự có cảm xúc gì với tôi?',
      'Họ mong đợi điều gì từ mối quan hệ này?',
      'Trong suy nghĩ của họ, tôi có vị trí thế nào?',
      'Nếu tiến xa hơn, kết quả có tốt đẹp không?',
      'Lời khuyên để tôi ứng xử trong mối quan hệ mập mờ này?',
    ]}],
    crush: [{ group:'Crush / Người Thầm Thích', qs:[
      'Crush của tôi là người có tính cách như thế nào?',
      'Người tôi thích có đang để ý đến tôi không?',
      'Giữa tôi và crush có khả năng phát triển tình cảm không?',
      'Lời khuyên để tôi tiến gần hơn đến crush?',
      'Ai đang thầm yêu tôi mà tôi chưa biết?',
      'Hiện tại có bao nhiêu người đang có tình cảm với tôi?',
    ]}],
    future_love: [{ group:'Người Yêu Tương Lai', qs:[
      'Tôi có thể gặp người mình thích trong khoảng thời gian nào?',
      'Người yêu tương lai của tôi có đặc điểm ra sao?',
      'Người yêu tương lai sẽ đối xử với tôi như thế nào?',
      'Tổng quan tình yêu giữa tôi và người yêu tương lai thế nào?',
      'Người chồng/vợ tương lai của tôi có thể làm nghề gì?',
    ]}],
    someone: [{ group:'Người Ấy', qs:[
      'Người ấy có sợ mất tôi không?',
      'Người ấy có nghĩ đến việc quay lại không?',
      'Người ấy có nhớ tôi không?',
      'Tôi và người ấy có thể đi đến kết thúc hạnh phúc không?',
      'Người ấy đang giấu tôi điều gì?',
    ]}],
    marriage: [{ group:'Hôn Nhân', qs:[
      'Nguyên nhân nào khiến cuộc hôn nhân của tôi gặp khó khăn?',
      'Điều gì đang ảnh hưởng mạnh đến mối quan hệ vợ chồng của tôi?',
      'Có thể cứu vãn hôn nhân của tôi bằng cách nào?',
      'Nửa kia của tôi mong muốn điều gì ở tôi?',
    ]}],
    conflict: [{ group:'Giải Quyết Xung Đột', qs:[
      'Tôi có nên là người chủ động hòa giải trước không?',
      'Nếu nhìn từ góc nhìn của người kia, tôi sẽ thấy điều gì?',
      'Tôi có nên tha thứ cho người gây xung đột với mình không?',
      'Kết quả sau cùng của xung đột gần đây sẽ ra sao?',
    ]}],
    career: [{ group:'Sự Nghiệp / Công Việc', qs:[
      'Tình hình công việc hiện tại của tôi có tốt không?',
      'Công việc trong 3 tháng tới của tôi sẽ như thế nào?',
      'Tôi có nên chuyển chỗ làm không?',
      'Môi trường làm việc mới có đặc điểm thế nào?',
      'Đồng nghiệp trong môi trường làm việc mới sẽ ra sao?',
    ]}],
    job_search: [{ group:'Xin Việc Làm', qs:[
      'Trong 3 tháng tới tôi có tìm được công việc phù hợp không?',
      'Những khó khăn tôi sẽ gặp khi đi xin việc là gì?',
      'Điểm mạnh của tôi trong lần ứng tuyển này?',
      'Điểm yếu của tôi trong lần ứng tuyển này?',
    ]}],
    finance: [{ group:'Tài Chính', qs:[
      'Cơ hội tài chính nào đang đến với tôi?',
      'Tình hình tài chính của tôi trong 3 tháng tới thế nào?',
      'Mục tiêu tài chính hiện tại có khả năng đạt được không?',
      'Trở ngại tài chính lớn nhất của tôi hiện tại là gì?',
      'Làm sao để chi tiêu hợp lý hơn?',
    ]}],
    health: [{ group:'Sức Khỏe', qs:[
      'Tình hình sức khỏe sắp tới của tôi thế nào?',
      'Điều gì đang là trở ngại đối với sức khỏe của tôi?',
      'Tôi nên thay đổi lối sống hiện tại ra sao?',
      'Tôi đang bỏ qua vấn đề gì liên quan đến sức khỏe?',
      'Tôi nên làm gì để tăng cường năng lượng và thể chất?',
    ]}],
    family: [{ group:'Gia Đình', qs:[
      'Thời gian tới gia đình tôi có gặp khó khăn gì không?',
      'Các mối quan hệ trong gia đình tôi sẽ diễn biến ra sao?',
      'Tôi nên làm gì để cải thiện mối quan hệ với gia đình?',
      'Lời khuyên chung cho gia đình tôi trong thời gian tới?',
    ]}],
    study: [{ group:'Học Tập', qs:[
      'Tổng quan việc học tập của tôi hiện tại ra sao?',
      'Kết quả học tập của tôi trong 3 tháng tới thế nào?',
      'Tôi có đạt kết quả tốt trong kỳ thi sắp tới không?',
      'Lời khuyên quan trọng về học tập thời gian tới?',
    ]}],
    study_abroad: [{ group:'Du Học', qs:[
      'Tôi có thực sự phù hợp để đi du học không?',
      'Cuộc sống của tôi khi đi du học sẽ như thế nào?',
      'Những khó khăn nào có thể xảy ra khi đi du học?',
      'Lời khuyên dành cho tôi khi chuẩn bị du học?',
    ]}],
    self: [{ group:'Định Hướng Bản Thân', qs:[
      'Tôi hiện tại là người như thế nào?',
      'Hình ảnh của tôi trong mắt người khác ra sao?',
      'Tôi cần chú ý gì để phát triển bản thân tốt hơn?',
      'Xu hướng của tôi trong tình yêu và các mối quan hệ là gì?',
    ]}],
    general: [{ group:'Thông Điệp Chung', qs:[
      'Thông điệp chung của vũ trụ cho tôi là gì?',
      'Tôi cần tập trung điều gì thời gian này?',
      'Năng lượng nào đang bao quanh tôi?',
      'Thử thách lớn nhất tôi sẽ đối mặt là gì?',
      'Điều tốt đẹp nào sắp đến với tôi?',
    ]}],
  };

  function refreshPresetQ() {
    const grid   = document.getElementById('presetQGrid');
    const groups = PRESET_Q[_selectedTheme] || PRESET_Q.general;
    grid.innerHTML = groups.map(g => `
      <div class="preset-q-group">
        <div class="preset-q-group-header">${g.group}</div>
        ${g.qs.map(q => `<button class="preset-q-btn" type="button">${q}</button>`).join('')}
      </div>`).join('');
    grid.querySelectorAll('.preset-q-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        inputQ.value = btn.textContent;
        if (charCount) charCount.textContent = `${inputQ.value.length} / 200`;
        // Auto-advance to step 4
        setTimeout(() => goToStep(4, 'forward'), 180);
      });
    });
  }

  function switchQTab(mode) {
    const customPanel = document.getElementById('customQPanel');
    const presetPanel = document.getElementById('presetQPanel');
    const tabC = document.getElementById('tabCustomQ');
    const tabP = document.getElementById('tabPresetQ');
    if (mode === 'preset') {
      customPanel.classList.add('hidden');
      presetPanel.classList.remove('hidden');
      tabC.classList.remove('active');
      tabP.classList.add('active');
      refreshPresetQ();
    } else {
      presetPanel.classList.add('hidden');
      customPanel.classList.remove('hidden');
      tabP.classList.remove('active');
      tabC.classList.add('active');
    }
  }

  document.getElementById('tabCustomQ').addEventListener('click', () => switchQTab('custom'));
  document.getElementById('tabPresetQ').addEventListener('click', () => switchQTab('preset'));

  /* ── Begin reading btn ────────────────────────────── */
  const btnBegin = document.getElementById('btnBeginReading');
  if (btnBegin) {
    btnBegin.addEventListener('click', (e) => {
      if (!validateStep(4)) return;
      window.FX?.ripple(btnBegin, e, 'rgba(200,121,255,0.5)');
      const rect = btnBegin.getBoundingClientRect();
      window.FX?.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 16, 'rgba(201,168,76,0.9)');
    });
  }

  /* ── Public API ───────────────────────────────────── */
  window.FormModule = {
    open: openForm,
    close: closeForm,
    MAIN_THEMES,
    SUB_THEMES,
    renderMainThemes,
    showSubThemes,
    getThemeLabel(key) {
      const sub = ALL_SUBS.find(s => s.key === key);
      if (sub) return sub.label;
      return MAIN_THEMES.find(t => t.key === key)?.label || 'Tổng Quát';
    },
    getData() {
      return {
        name:     document.getElementById('inputName').value.trim(),
        dob:      document.getElementById('inputDob').value,
        theme:    _selectedTheme,
        question: inputQ.value.trim(),
        spread:   parseInt(document.querySelector('input[name="spread"]:checked')?.value || '3')
      };
    },
    setTheme(key) { _selectedTheme = key; }
  };
})();
