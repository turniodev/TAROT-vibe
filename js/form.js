// js/form.js v4 — 5+1 main themes → sub-theme drill-down → auto-advance
(function () {
  const overlay = document.getElementById('formOverlay');
  const panel = overlay.querySelector('.form-panel');
  const progressBar = document.getElementById('formProgressBar');
  const stepDots = document.querySelectorAll('.step-dot');
  const stepEls = document.querySelectorAll('.form-step');
  const charCount = document.getElementById('charCount');
  const inputQ = document.getElementById('inputQuestion');

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
      d.classList.toggle('done', i + 1 < n);
      if (i + 1 === n && !wasActive) window.FX?.activateDot(d);
    });
  }

  function goToStep(next, direction = 'forward') {
    const outEl = getStep(currentStep);
    const inEl = getStep(next);
    currentStep = next;
    updateProgress(next);
    if (window.FX?.slideStep) window.FX.slideStep(outEl, inEl, direction);
    else { outEl.classList.remove('active'); inEl.classList.add('active'); }
    if (next === 3) {
      setTimeout(() => switchQTab('preset'), 480);
    }
    setTimeout(() => {
      const firstInput = inEl.querySelector('input, textarea');
      if (firstInput && firstInput.type !== 'radio') firstInput.focus();
    }, 460);
  }

  /* ── Open / Close ─────────────────────────────────── */
  const USER_KEY = 'tbhb_user';

  function openForm() {
    stepEls.forEach((s, i) => s.classList.toggle('active', i === 0));
    currentStep = 1;
    updateProgress(1);
    _selectedTheme = 'general';
    renderMainThemes('mainThemeGrid');

    // Auto-fill: try current session first, then localStorage
    const prev = window.ReadingModule?.getSession ? window.ReadingModule.getSession() : null;
    let savedName = prev?.name || '';
    let savedDob = prev?.dob || '';
    let savedGen = prev?.gender || '';
    if (!savedName || !savedDob || !savedGen) {
      try {
        const stored = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        if (!savedName) savedName = stored.name || '';
        if (!savedDob) savedDob = stored.dob || '';
        if (!savedGen) savedGen = stored.gender || '';
      } catch { }
    }
    if (savedName) document.getElementById('inputName').value = savedName;
    if (savedDob) window.DobPicker?.setValue(savedDob);
    if (savedGen) {
      document.getElementById('inputGender').value = savedGen;
      const textEl = document.getElementById('genderDisplayText');
      if (textEl) textEl.textContent = savedGen;
      const wrapEl = document.getElementById('genderPickerWrap');
      if (wrapEl) wrapEl.classList.add('has-value');

      const opts = document.querySelectorAll('.gender-opt');
      opts.forEach(o => {
        o.classList.toggle('selected', o.dataset.val === savedGen);
      });
    } else {
      document.getElementById('inputGender').value = '';
      const textEl = document.getElementById('genderDisplayText');
      if (textEl) textEl.textContent = 'Chọn';
      const wrapEl = document.getElementById('genderPickerWrap');
      if (wrapEl) wrapEl.classList.remove('has-value');
      const opts = document.querySelectorAll('.gender-opt');
      opts.forEach(o => o.classList.remove('selected'));
    }

    const subEl = document.getElementById('subThemePanel');
    const gridEl = document.getElementById('mainThemeGrid');
    if (subEl) { subEl.classList.add('hidden'); subEl.innerHTML = ''; }
    if (gridEl) gridEl.classList.remove('hidden');
    if (window.FX?.modalOpen) window.FX.modalOpen(overlay, panel);
    else overlay.classList.add('visible');
  }
  function closeForm(skipRestore = false) {
    if (window.FX?.modalClose) window.FX.modalClose(overlay, panel);
    else overlay.classList.remove('visible');

    // Phục hồi lại trang chủ nếu user đóng form (cancel)
    if (skipRestore !== true) {
      const landingCenter = document.querySelector('.landing-center');
      if (landingCenter) {
        landingCenter.style.transform = '';
        landingCenter.style.opacity = '1';
        landingCenter.style.transition = 'transform 0.6s var(--ease-out), opacity 0.6s';
        landingCenter.style.pointerEvents = 'all';
      }
    }
  }

  document.getElementById('btnOpenForm').addEventListener('click', (e) => {
    window.FX?.ripple(e.currentTarget, e, 'rgba(200,121,255,0.35)');
    if (window.Particles && window.Particles.triggerWarp) {
      window.Particles.triggerWarp(1500);

      const landingCenter = document.querySelector('.landing-center');
      if (landingCenter) {
        landingCenter.style.transition = 'transform 1.0s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.8s';
        landingCenter.style.transform = 'scale(1.4) translateY(-30px)';
        landingCenter.style.opacity = '0';
        landingCenter.style.pointerEvents = 'none';
      }

      // Đợi 1.1s (để sao bay đã mắt) rồi mới mở Popup Form
      setTimeout(() => {
        openForm();
      }, 1100);
    } else {
      setTimeout(openForm, 80);
    }
  });
  document.getElementById('btnCloseForm').addEventListener('click', closeForm);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeForm(); });

  /* ── 5 Main themes + "Xem Thêm" ──────────────────── */
  const MAIN_THEMES = [
    { key: 'love', label: 'Tình Yêu', icon: '&#9829;', desc: 'Quan hệ & cảm xúc' },
    { key: 'career', label: 'Sự Nghiệp', icon: '&#9651;', desc: 'Công việc & định hướng' },
    { key: 'finance', label: 'Tài Chính', icon: '&#11045;', desc: 'Tiền bạc & đầu tư' },
    { key: 'health', label: 'Sức Khỏe', icon: '&#10022;', desc: 'Thể chất & tinh thần' },
    { key: 'self', label: 'Bản Thân', icon: '&#10038;', desc: 'Phát triển & định hướng' },
    { key: 'more', label: 'Xem Thêm', icon: '&#8943;', desc: 'Tất cả chủ đề' },
  ];

  /* ── Sub-theme groups (expanded) ─────────────────── */
  const SUB_THEMES = {
    love: [
      { key: 'ex', label: 'Người Yêu Cũ', desc: 'Mối quan hệ đã qua' },
      { key: 'current_love', label: 'Người Yêu Hiện Tại', desc: 'Tình cảm đang có' },
      { key: 'ambiguous', label: 'Mối Quan Hệ Mập Mờ', desc: 'Chưa rõ ràng' },
      { key: 'crush', label: 'Crush / Thầm Thích', desc: 'Người tôi thích' },
      { key: 'future_love', label: 'Người Yêu Tương Lai', desc: 'Tình duyên sắp tới' },
      { key: 'someone', label: 'Người Ấy', desc: 'Người đang nghĩ đến' },
      { key: 'marriage', label: 'Hôn Nhân', desc: 'Vợ chồng & hôn nhân' },
      { key: 'conflict', label: 'Giải Quyết Xung Đột', desc: 'Hóa giải mâu thuẫn' },
      { key: 'breakup', label: 'Chia Tay & Hàn Gắn', desc: 'Sau chia tay & hàn gắn' },
      { key: 'long_distance', label: 'Yêu Xa', desc: 'Mối tình dị địa' },
      { key: 'jealousy', label: 'Người Thứ Ba / Ghen', desc: 'Nghi ngờ & phản bội' },
      { key: 'self_love', label: 'Yêu Bản Thân', desc: 'Nhìn lại chính mình' },
      { key: 'friendship', label: 'Tình Bạn / Tri Kỷ', desc: 'Sự thấu hiểu & khăng khít' },
      { key: 'pregnancy', label: 'Con Cái / Thai Kỳ', desc: 'Kế hoạch gia đình' },
      { key: 'gossip', label: 'Thị Phi / Đàm Tiếu', desc: 'Lời ra tiếng vào' },
    ],
    career: [
      { key: 'career', label: 'Sự Nghiệp / Công Việc', desc: 'Công việc hiện tại' },
      { key: 'job_search', label: 'Xin Việc Làm', desc: 'Cơ hội việc mới' },
      { key: 'promotion', label: 'Thăng Tiến', desc: 'Lên chức & tăng lương' },
      { key: 'business', label: 'Kinh Doanh / Khởi Nghiệp', desc: 'Thuận lợi khởi nghiệp' },
      { key: 'colleague', label: 'Mối Quan Hệ Đồng Nghiệp', desc: 'Đồng nghiệp & cấp trên' },
      { key: 'career_change', label: 'Chuyển Nghề', desc: 'Thay đổi hướng đi' },
      { key: 'freelance', label: 'Freelance / Tự Do', desc: 'Công việc tự do' },
      { key: 'interview', label: 'Phỏng Vấn', desc: 'Kết quả phỏng vấn' },
      { key: 'legal', label: 'Pháp Lý / Giấy Tờ', desc: 'Hợp đồng & rắc rối' },
      { key: 'moving', label: 'Chuyển Chỗ / Xuất Ngoại', desc: 'Định cư & nhà cửa' },
    ],
    finance: [
      { key: 'finance', label: 'Tài Chính Tổng Quán', desc: 'Tiền bạc & đầu tư' },
      { key: 'investment', label: 'Đầu Tư / Chứng Khoán', desc: 'Cổ phiếu & tài sản' },
      { key: 'debt', label: 'Nợ Nần / Vay Mượn', desc: 'Giải quyết nợ' },
      { key: 'savings', label: 'Tiết Kiệm & Tích Lũy', desc: 'Xây dựng tảng lưỡng' },
      { key: 'luck_money', label: 'Lộc Tài / May Mắn', desc: 'Vận đỏ & tiền bạc' },
    ],
    health: [
      { key: 'health', label: 'Sức Khỏe Thể Chất', desc: 'Cơ thể & bệnh tật' },
      { key: 'mental', label: 'Sức Khỏe Tâm Thần', desc: 'Cảm xúc & tâm lý' },
      { key: 'energy', label: 'Năng Lượng & Chakra', desc: 'Cân bằng năng lượng' },
      { key: 'family', label: 'Gia Đình', desc: 'Các mối quan hệ gia đình' },
      { key: 'diet', label: 'Điều Độ / Chăm Sóc', desc: 'Ăn uống & lối sống' },
      { key: 'pet', label: 'Thú Cưng', desc: 'Vật nuôi kết nối' },
    ],
    self: [
      { key: 'study', label: 'Học Tập', desc: 'Kết quả & mục tiêu học' },
      { key: 'study_abroad', label: 'Du Học', desc: 'Cuộc sống học tập nước ngoài' },
      { key: 'self', label: 'Định Hướng Bản Thân', desc: 'Phát triển cá nhân' },
      { key: 'purpose', label: 'Sứ Mệnh / Mục Đích', desc: 'Tìm ý nghĩa cuộc đời' },
      { key: 'shadow_self', label: 'Bóng Đầm Nội Tâm', desc: 'Chiều sử tối của bản thân' },
      { key: 'decision', label: 'Ra Quyết Định', desc: 'Lựa chọn quan trọng' },
      { key: 'travel', label: 'Du Lịch / Di Chuyển', desc: 'Kế hoạch di chuyển' },
      { key: 'spiritual', label: 'Tâm Linh', desc: 'Giác ngộ & tâm linh' },
      { key: 'dream', label: 'Giải Mã Giấc Mơ', desc: 'Thông điệp cõi vô thức' },
      { key: 'past_life', label: 'Tiền Kiếp', desc: 'Nợ nần kiếp trước' },
      { key: 'karma', label: 'Nghiệp Quả (Karma)', desc: 'Nhân quả tuần hoàn' },
      { key: 'lost_item', label: 'Tìm Đồ Thất Lạc', desc: 'Manh mối & phương hướng' },
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
    const isQR = containerId === 'qrMainThemeGrid';
    const gridEl = document.getElementById(containerId);
    const subEl = document.getElementById(isQR ? 'qrSubThemePanel' : 'subThemePanel');
    const mainLabel = MAIN_THEMES.find(t => t.key === mainKey)?.label || 'Tất Cả';

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
        <button class="sub-back-btn" type="button">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          ${mainLabel}
        </button>
      </div>
      <div class="sub-theme-list">
        ${subs.map(s => `
          <button class="sub-theme-item" data-value="${s.key}" type="button">
            <span class="sti-label">${s.label}</span>
            <span class="sti-desc">${s._group ? s._group + ' · ' : ''}${s.desc}</span>
            <span class="sti-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
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

  /* ── Gender Dropdown Logic ────────────────────────── */
  const genderWrap = document.getElementById('genderPickerWrap');
  const genderDisplay = document.getElementById('genderDisplay');
  const genderDropdown = document.getElementById('genderDropdown');
  const inputGender = document.getElementById('inputGender');
  const genderDisplayText = document.getElementById('genderDisplayText');

  if (genderDisplay && genderDropdown) {
    genderDisplay.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = genderDropdown.classList.contains('open');
      document.querySelectorAll('.gender-dropdown').forEach(p => p.classList.remove('open'));
      // Close dob panel if it exists
      if (window.DobPicker?.close) window.DobPicker.close();

      if (!isOpen) {
        genderDropdown.classList.add('open');
        genderDisplay.classList.add('active');
      } else {
        genderDisplay.classList.remove('active');
      }
    });

    genderDropdown.querySelectorAll('.gender-opt').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = opt.dataset.val;
        inputGender.value = val;
        genderDisplayText.innerHTML = opt.innerHTML;
        genderWrap.classList.add('has-value');
        genderDropdown.classList.remove('open');
        genderDisplay.classList.remove('active');

        genderDropdown.querySelectorAll('.gender-opt').forEach(o => o.classList.remove('selected'));
        opt.classList.add('selected');
      });
    });

    document.addEventListener('click', (e) => {
      if (genderWrap && !genderWrap.contains(e.target)) {
        genderDropdown.classList.remove('open');
        genderDisplay.classList.remove('active');
      }
    });
  }

  /* ── Validation ───────────────────────────────────── */
  function validateStep(n) {
    if (n === 1) {
      const name = document.getElementById('inputName');
      const dob = document.getElementById('inputDob');
      const gen = document.getElementById('inputGender').value;
      let valid = true;
      if (!name.value.trim()) {
        window.FX?.shake(name); window.FX?.glowPulse(name, 'rgba(255,80,80,0.6)');
        valid = false;
      }
      if (!dob.value) {
        const dobDisplay = document.getElementById('dobDisplay');
        if (dobDisplay) {
          window.FX?.shake(dobDisplay);
          dobDisplay.style.borderColor = 'rgba(255,80,80,0.6)';
          dobDisplay.style.boxShadow = '0 0 0 3px rgba(255,80,80,0.15)';
          setTimeout(() => {
            dobDisplay.style.borderColor = '';
            dobDisplay.style.boxShadow = '';
          }, 1200);
        }
        valid = false;
      }
      if (!gen) {
        const genDisplay = document.getElementById('genderDisplay');
        if (genDisplay) {
          window.FX?.shake(genDisplay);
          genDisplay.style.borderColor = 'rgba(255,80,80,0.6)';
          genDisplay.style.boxShadow = '0 0 0 3px rgba(255,80,80,0.15)';
          setTimeout(() => {
            genDisplay.style.borderColor = '';
            genDisplay.style.boxShadow = '';
          }, 1200);
        }
        valid = false;
      }
      return valid;
    }
    if (n === 3) {
      if (inputQ.value.trim().length > 0 && inputQ.value.trim().length < 5) {
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

  /* ── Preset questions (expanded) ─────────────────── */
  const PRESET_Q = {
    ex: [{
      group: 'Người Yêu Cũ', qs: [
        'Người yêu cũ từng dành cho tôi tình cảm như thế nào?',
        'Hiện tại người yêu cũ còn giữ tình cảm gì với tôi không?',
        'Người yêu cũ nghĩ gì về việc quay lại?',
        'Bản chất và ý nghĩa của mối quan hệ cũ là gì?',
        'Nếu quay lại, mối quan hệ sẽ tiến triển ra sao?',
        'Lời khuyên để tôi đối diện với người yêu cũ?',
      ]
    }],
    current_love: [{
      group: 'Người Yêu Hiện Tại', qs: [
        'Người yêu hiện tại dành cho tôi tình cảm thế nào?',
        'Người ấy kỳ vọng gì ở mối quan hệ này?',
        'Người ấy đang suy nghĩ thế nào về tình yêu của chúng tôi?',
        'Thử thách hoặc trở ngại trong mối quan hệ hiện tại là gì?',
        'Lời khuyên để mối quan hệ của chúng tôi bền vững hơn?',
        'Tương lai của mối quan hệ này sẽ đi về đâu?',
      ]
    }],
    ambiguous: [{
      group: 'Mối Quan Hệ Mập Mờ', qs: [
        'Người này thật sự có cảm xúc gì với tôi?',
        'Họ mong đợi điều gì từ mối quan hệ này?',
        'Trong suy nghĩ của họ, tôi có vị trí thế nào?',
        'Nếu tiến xa hơn, kết quả có tốt đẹp không?',
        'Lời khuyên để tôi ứng xử trong mối quan hệ mập mờ này?',
        'Tôi có nên chủ động làm rõ mối quan hệ không?',
      ]
    }],
    crush: [{
      group: 'Crush / Người Thầm Thích', qs: [
        'Crush của tôi là người có tính cách như thế nào?',
        'Người tôi thích có đang để ý đến tôi không?',
        'Giữa tôi và crush có khả năng phát triển tình cảm không?',
        'Lời khuyên để tôi tiến gần hơn đến crush?',
        'Ai đang thầm yêu tôi mà tôi chưa biết?',
        'Tôi có nên tỏ tình hay tiếp tục chờ đợi?',
      ]
    }],
    future_love: [{
      group: 'Người Yêu Tương Lai', qs: [
        'Tôi có thể gặp người mình thích trong khoảng thời gian nào?',
        'Người yêu tương lai của tôi có đặc điểm ra sao?',
        'Người yêu tương lai sẽ đối xử với tôi như thế nào?',
        'Tổng quan tình yêu giữa tôi và người yêu tương lai thế nào?',
        'Người chồng/vợ tương lai của tôi có thể làm nghề gì?',
        'Tôi cần chuẩn bị gì để sãn sàng đón nhận tình yêu mới?',
      ]
    }],
    someone: [{
      group: 'Người Ấy', qs: [
        'Người ấy có sợ mất tôi không?',
        'Người ấy có nghĩ đến việc quay lại không?',
        'Người ấy có nhớ tôi không?',
        'Tôi và người ấy có thể đi đến kết thúc hạnh phúc không?',
        'Người ấy đang giấu tôi điều gì?',
        'Người ấy thật sự cảm thấy gì về tôi lúc này?',
      ]
    }],
    marriage: [{
      group: 'Hôn Nhân', qs: [
        'Nguyên nhân nào khiến cuộc hôn nhân của tôi gặp khó khăn?',
        'Điều gì đang ảnh hưởng mạnh đến mối quan hệ vợ chồng của tôi?',
        'Có thể cứu vãn hôn nhân của tôi bằng cách nào?',
        'Nửa kia của tôi mong muốn điều gì ở tôi?',
        'Hôn nhân của tôi sẽ đi đến đâu nếu tiếp tục như hiện tại?',
        'Tôi có nên tiếp tục hay buông tay mối hôn nhân này?',
      ]
    }],
    conflict: [{
      group: 'Giải Quyết Xung Đột', qs: [
        'Tôi có nên là người chủ động hòa giải trước không?',
        'Nếu nhìn từ góc nhìn của người kia, tôi sẽ thấy điều gì?',
        'Tôi có nên tha thứ cho người gây xung đột với mình không?',
        'Kết quả sau cùng của xung đột gần đây sẽ ra sao?',
        'Điều gì thực sự gây ra mâu thuẫn này?',
      ]
    }],
    breakup: [{
      group: 'Chia Tay & Hàn Gắn', qs: [
        'Tôi có nên cố gắng hàn gắn sau khi chia tay không?',
        'Lý do ẩn khuất nào khiến chúng tôi chia tay?',
        'Người kia có hối hận và muốn quay lại không?',
        'Nếu tôi tha thứ, mối quan hệ sẽ đi về đâu?',
        'Tôi cần chữa lành điều gì trong bản thân sau cuộc chia tay này?',
        'Tôi nên đối mặt với người kia hay giữ khoảng cách?',
      ]
    }],
    long_distance: [{
      group: 'Yêu Xa', qs: [
        'Mối tình xa cách của tôi có bền vững không?',
        'Người yêu xa có thực sự chung thủy với tôi không?',
        'Chúng tôi có cơ hội thu rút khoảng cách địa lý không?',
        'Thách thức lớn nhất trong mối tình xa này là gì?',
        'Tôi có nên tiếp tục chờ đợi hay nên buông tay?',
      ]
    }],
    jealousy: [{
      group: 'Người Thứ Ba / Ghen Tuông', qs: [
        'Người yêu có đang che giấu mối quan hệ nào với tôi không?',
        'Liệu có người thứ ba nào đang cố tình xâm phạm mối quan hệ của tôi?',
        'Người ấy có yêu tôi thật lòng không?',
        'Cảm giác ghen tuông của tôi có căn cứ không?',
        'Tôi nên xử lý tình huống này như thế nào?',
      ]
    }],
    self_love: [{
      group: 'Yêu Bản Thân', qs: [
        'Tôi đang đối xử với bản thân như thế nào?',
        'Vết thương nội tâm nào tôi cần chữa lành đầu tiên?',
        'Điều gì đang cản tôi yêu chính mình?',
        'Tôi có đang đặt ra giới hạn rõ ràng trong các mối quan hệ không?',
        'Tôi cần buông bỏ điều gì để sống tại thời điểm hiện tại?',
      ]
    }],
    career: [{
      group: 'Sự Nghiệp / Công Việc', qs: [
        'Tình hình công việc hiện tại của tôi có tốt không?',
        'Công việc trong 3 tháng tới của tôi sẽ như thế nào?',
        'Tôi có nên chuyển chỗ làm không?',
        'Môi trường làm việc mới có đặc điểm thế nào?',
        'Đồng nghiệp trong môi trường làm việc mới sẽ ra sao?',
        'Năng lực nào của tôi đang chưa được khai thác đúng chỗ?',
      ]
    }],
    job_search: [{
      group: 'Xin Việc Làm', qs: [
        'Trong 3 tháng tới tôi có tìm được công việc phù hợp không?',
        'Những khó khăn tôi sẽ gặp khi đi xin việc là gì?',
        'Điểm mạnh của tôi trong lần ứng tuyển này?',
        'Điểm yếu của tôi trong lần ứng tuyển này?',
        'Lĩnh vực nào phù hợp nhất với tôi để ứng tuyển?',
      ]
    }],
    promotion: [{
      group: 'Thăng Tiến & Tăng Lương', qs: [
        'Tôi có cơ hội thăng chức trong thời gian tới không?',
        'Điều gì đang giữ tôi lại khỏi vị trí cao hơn?',
        'Tôi nên làm gì để nổi bật hơn trong mắt quản lý?',
        'Cấp trên hiện tại nhìn tôi như thế nào?',
        'Lộ trình sự nghiệp tốt nhất cho tôi lúc này là gì?',
      ]
    }],
    business: [{
      group: 'Kinh Doanh / Khởi Nghiệp', qs: [
        'Dự án kinh doanh của tôi có tiềm năng không?',
        'Thách thức lớn nhất trong kế hoạch khởi nghiệp của tôi là gì?',
        'Tôi nên tập trung vào lĩnh vực nào để kiến tiền hiệu quả?',
        'Đối tác kinh doanh hiện tại có phù hợp với tôi không?',
        'Năng lượng nào tôi cần mang vào việc kinh doanh?',
        'Thời điểm nào là tốt để ra mắt sản phẩm / dịch vụ?',
      ]
    }],
    colleague: [{
      group: 'Mối Quan Hệ Đồng Nghiệp', qs: [
        'Đồng nghiệp đang đối xử với tôi ra sao?',
        'Có ai đồng nghiệp đang muốn hại tôi không?',
        'Tôi có nên tin tưởng đồng nghiệp/sếp hiện tại không?',
        'Cách đồng nghiệp đánh giá tôi là gì?',
        'Tôi nên ứng xử như thế nào với môi trường làm việc phức tạp này?',
      ]
    }],
    career_change: [{
      group: 'Chuyển Nghề', qs: [
        'Tôi có nên từ bỏ công việc hiện tại không?',
        'Hướng đi nào phù hợp với năng lực và đam mê của tôi?',
        'Việc chuyển sang ngành mới có mang lại hạnh phúc không?',
        'Rủi ro lớn nhất nếu tôi đổi hướng nghề nghiệp là gì?',
        'Lời khuyên cho tôi khi chuẩn bị bước ra khỏi vùng an toàn?',
      ]
    }],
    freelance: [{
      group: 'Freelance / Làm Việc Tự Do', qs: [
        'Làm freelance có phù hợp với tôi thời điểm này không?',
        'Tôi có thể kiếm sống ổn định bằng công việc tự do không?',
        'Lĩnh vực nào có thể mang lại thu nhập tốt cho tôi khi làm tự do?',
        'Điểm yếu nào của tôi cần cải thiện khi làm việc độc lập?',
      ]
    }],
    interview: [{
      group: 'Phỏng Vấn Việc Làm', qs: [
        'Buổi phỏng vấn sắp tới của tôi có thành công không?',
        'Diện mạo và cách trình bày nào giúp tôi gây ấn tượng?',
        'Điểm yếu nào có thể làm tôi mất điểm trong mắt nhà tuyển dụng?',
        'Môi trường làm việc mới này có phù hợp với tôi không?',
        'Lời khuyên trước buổi phỏng vấn quan trọng này?',
      ]
    }],
    finance: [{
      group: 'Tài Chính', qs: [
        'Cơ hội tài chính nào đang đến với tôi?',
        'Tình hình tài chính của tôi trong 3 tháng tới thế nào?',
        'Mục tiêu tài chính hiện tại có khả năng đạt được không?',
        'Trở ngại tài chính lớn nhất của tôi hiện tại là gì?',
        'Làm sao để chi tiêu hợp lý hơn?',
      ]
    }],
    investment: [{
      group: 'Đầu Tư & Chứng Khoán', qs: [
        'Kênh đầu tư nào phù hợp với tôi nhất hiện tại?',
        'Dự án/cổ phiếu tôi đang cân nhắc có nên đầu tư không?',
        'Rủi ro nào tôi cần cảnh giác khi đầu tư?',
        'Thời điểm nào là tốt để tôi bước vào thị trường?',
        'Điểm mạnh của tôi với tư cách nhà đầu tư là gì?',
      ]
    }],
    debt: [{
      group: 'Nợ Nần & Tài Chính', qs: [
        'Tôi có thể thoát khỏi tình trạng nợ nần trong thời gian này không?',
        'Năng lượng nào đang cản tôi thoát khỏi nợ?',
        'Tôi nên ưu tiên trả khoản nợ nào trước?',
        'Bài học tài chính tôi cần học từ tình huống này là gì?',
      ]
    }],
    savings: [{
      group: 'Tiết Kiệm & Tích Lũy', qs: [
        'Tôi có đạt được mục tiêu tiết kiệm trong năm nay không?',
        'Tôi nên thay đổi thói quen chi tiêu như thế nào?',
        'Nguồn thu nhập mới nào có thể xuất hiện với tôi?',
        'Tôi đang lãng phí năng lượng và tiền bạc vào đâu?',
      ]
    }],
    luck_money: [{
      group: 'Lộc Tài & Vận May', qs: [
        'Tài lộc của tôi trong tháng này thế nào?',
        'May mắn nào sắp đến với tôi?',
        'Tôi có nên đánh số, xổ số vào thời gian này không?',
        'Điều gì đang cản trở luồng tiền chảy vào cuộc đời tôi?',
        'Hướng nào giúp tôi tài lộc tốt nhất?',
      ]
    }],
    health: [{
      group: 'Sức Khỏe', qs: [
        'Tình hình sức khỏe sắp tới của tôi thế nào?',
        'Điều gì đang là trở ngại đối với sức khỏe của tôi?',
        'Tôi nên thay đổi lối sống hiện tại ra sao?',
        'Tôi đang bỏ qua vấn đề gì liên quan đến sức khỏe?',
        'Tôi nên làm gì để tăng cường năng lượng và thể chất?',
      ]
    }],
    mental: [{
      group: 'Sức Khỏe Tâm Thần', qs: [
        'Cảm xúc nào đang ảnh hưởng tiêu cực đến cuộc sống của tôi?',
        'Tôi có đang ở trong trạng thái kiệt sức (burnout) không?',
        'Vết thương tâm lý nào tôi chưa đối mặt?',
        'Tôi cần làm gì để bảo vệ sức khỏe tâm thần?',
        'Lo âu hay sợ hãi nào đang khiến tôi không tiến về phía trước?',
        'Nguồn hạnh phúc đích thực của tôi là gì?',
      ]
    }],
    energy: [{
      group: 'Năng Lượng & Chakra', qs: [
        'Chakra nào của tôi đang mất cân bằng?',
        'Năng lượng nào tôi cần tẩy rửa và giải phóng?',
        'Tôi có đang chịu ảnh hưởng của năng lượng tiêu cực từ người khác không?',
        'Phương pháp thực hành nào giúp tôi cân bằng cơ thể và tâm trí?',
        'Tôi nên hướng năng lượng của mình vào đâu thời điểm này?',
      ]
    }],
    family: [{
      group: 'Gia Đình', qs: [
        'Thời gian tới gia đình tôi có gặp khó khăn gì không?',
        'Các mối quan hệ trong gia đình tôi sẽ diễn biến ra sao?',
        'Tôi nên làm gì để cải thiện mối quan hệ với gia đình?',
        'Lời khuyên chung cho gia đình tôi trong thời gian tới?',
        'Thành viên gia đình nào đang cần tôi quan tâm nhiều hơn?',
      ]
    }],
    diet: [{
      group: 'Ăn Uống & Chăm Sóc Bản Thân', qs: [
        'Lối sống của tôi hiện tại có ảnh hưởng xấu đến sức khỏe không?',
        'Tôi nên thay đổi thói quen nào để cải thiện sức khỏe?',
        'Điều nào cổ vũ tôi để duy trì thói quen lành mạnh hơn?',
        'Tôi đang bỏ qua yếu tố nào nhưng quan trọng với sức khỏe?',
      ]
    }],
    study: [{
      group: 'Học Tập', qs: [
        'Tổng quan việc học tập của tôi hiện tại ra sao?',
        'Kết quả học tập của tôi trong 3 tháng tới thế nào?',
        'Tôi có đạt kết quả tốt trong kỳ thi sắp tới không?',
        'Lời khuyên quan trọng về học tập thời gian tới?',
        'Tôi cần thay đổi phương pháp học như thế nào?',
        'Ngành học / chuyên môn nào phù hợp nhất với tôi?',
      ]
    }],
    study_abroad: [{
      group: 'Du Học', qs: [
        'Tôi có thực sự phù hợp để đi du học không?',
        'Cuộc sống của tôi khi đi du học sẽ như thế nào?',
        'Những khó khăn nào có thể xảy ra khi đi du học?',
        'Lời khuyên dành cho tôi khi chuẩn bị du học?',
        'Đất nước nào phù hợp nhất với tôi để du học?',
      ]
    }],
    self: [{
      group: 'Định Hướng Bản Thân', qs: [
        'Tôi hiện tại là người như thế nào?',
        'Hình ảnh của tôi trong mắt người khác ra sao?',
        'Tôi cần chú ý gì để phát triển bản thân tốt hơn?',
        'Xu hướng của tôi trong tình yêu và các mối quan hệ là gì?',
        'Tôi đang tự giới hạn bản thân ở điểm nào?',
      ]
    }],
    purpose: [{
      group: 'Sứ Mệnh & Ý Nghĩa Cuộc Đời', qs: [
        'Sứ mệnh của tôi trong cuộc đời này là gì?',
        'Tôi sinh ra để làm điều gì?',
        'Tôi đang lãng phí tiềm năng của mình ở đâu?',
        'Giá trị cốt lõi nào tôi cần sống đúng hơn?',
        'Hành động nào đưa tôi lại gần hơn với đích đến thực sự?',
      ]
    }],
    shadow_self: [{
      group: 'Bóng Đầm Nội Tâm', qs: [
        'Điều gì trong bản thân tôi mà tôi đang cố tình tránh đối diện?',
        'Bóng tối nào đang như nước địa dưới chân tôi?',
        'Tôi đang tự phá hoại bản thân theo những cách nào?',
        'Khó khăn hiện tại đang dạy tôi điều gì về chính mình?',
        'Tôi cần hòa giải điều gì bên trong để bước tiếp?',
      ]
    }],
    decision: [{
      group: 'Ra Quyết Định', qs: [
        'Tôi nên chọn hướng nào trong quyết định lần này?',
        'Đâu là điều tôi thực sự muốn khi phải lựa chọn?',
        'Nếu cứ trì hoãn, điều gì sẽ xảy ra?',
        'Lời khuyên tương lai cho tôi liên quan đến quyết định này?',
        'Tôi đang sợ điều gì khiến khó ra quyết định?',
      ]
    }],
    travel: [{
      group: 'Du Lịch & Di Chuyển', qs: [
        'Chuyến đi này có thuận lợi và mang lại điều tốt không?',
        'Tôi có nên dời đến nơi ở mới không?',
        'Điều gì tôi cần chuẩn bị cho chuyến đi?',
        'Nơi nào mang lại cơ hội tốt cho tôi?',
      ]
    }],
    spiritual: [{
      group: 'Tâm Linh & Giác Ngộ', qs: [
        'Tôi đang ở giai đoạn nào trong hành trình tâm linh của mình?',
        'Năng lượng bảo hộ nào đang ở bên cạnh tôi?',
        'Tôi có tiền duyên với con đường tâm linh nào không?',
        'Điều gì vũ trụ muốn nhắn gử cho tôi lúc này?',
        'Quyết định nào khởi đầu hành trình tâm linh của tôi?',
        'Tôi có năng khiếu tâm linh hay thấu cảm nào chưa khám phá?',
      ]
    }],
    general: [{
      group: 'Thông Điệp Chung', qs: [
        'Thông điệp chung của vũ trụ cho tôi là gì?',
        'Tôi cần tập trung điều gì thời gian này?',
        'Năng lượng nào đang bao quanh tôi?',
        'Thử thách lớn nhất tôi sẽ đối mặt là gì?',
        'Điều tốt đẹp nào sắp đến với tôi?',
      ]
    }],
  };

  function refreshPresetQ() {
    const grid = document.getElementById('presetQGrid');
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
      customPanel?.classList.add('hidden');
      presetPanel?.classList.remove('hidden');
      tabC?.classList.remove('active');
      tabP?.classList.add('active');
      refreshPresetQ();
    } else {
      presetPanel?.classList.add('hidden');
      customPanel?.classList.remove('hidden');
      tabP?.classList.remove('active');
      tabC?.classList.add('active');
    }
  }

  document.getElementById('tabCustomQ')?.addEventListener('click', () => switchQTab('custom'));
  document.getElementById('tabPresetQ')?.addEventListener('click', () => switchQTab('preset'));

  /* ── Privacy Modal ────────────────────────────────────── */
  const btnOpenPrivacy = document.getElementById('btnOpenPrivacy');
  const btnPrivacyClose = document.getElementById('btnPrivacyClose');
  const privacyModal = document.getElementById('privacyModal');

  if (btnOpenPrivacy && privacyModal) {
    btnOpenPrivacy.addEventListener('click', () => {
      privacyModal.classList.add('visible');
    });
    btnPrivacyClose?.addEventListener('click', () => {
      privacyModal.classList.remove('visible');
    });
    privacyModal.addEventListener('click', (e) => {
      if (e.target === privacyModal) privacyModal.classList.remove('visible');
    });
  }

  /* ── Spread Selection Logic ────────────────────────── */
  const spreadRadios = document.querySelectorAll('input[name="spread"]');
  const spreadDescBox = document.getElementById('spreadDescriptionBox');
  if (spreadRadios.length && spreadDescBox) {
    spreadRadios.forEach(r => {
      r.addEventListener('change', () => {
        if (r.checked) {
          spreadDescBox.style.opacity = 0;
          spreadDescBox.style.transform = 'translateY(4px)';
          setTimeout(() => {
            spreadDescBox.innerHTML = r.getAttribute('data-desc') || '';
            spreadDescBox.style.opacity = 1;
            spreadDescBox.style.transform = 'translateY(0)';
          }, 250);
        }
      });
    });
  }

  /* ── Public API ─────────────────────────────────────── */
  window.FormModule = {
    open: openForm,
    close: closeForm,
    getThemeLabel(key) {
      return MAIN_THEMES.find(t => t.key === key)?.label
        || Object.values(SUB_THEMES).flat().find(s => s.key === key)?.label
        || key;
    },
    getData() {
      const data = {
        name: document.getElementById('inputName').value.trim(),
        dob: document.getElementById('inputDob').value,
        gender: document.getElementById('inputGender').value,
        theme: _selectedTheme,
        question: inputQ.value.trim(),
        spread: parseInt(document.querySelector('input[name="spread"]:checked')?.value || '3')
      };
      try { localStorage.setItem(USER_KEY, JSON.stringify({ name: data.name, dob: data.dob, gender: data.gender })); } catch { }
      return data;
    },
    setTheme(key) { _selectedTheme = key; }
  };
})();
