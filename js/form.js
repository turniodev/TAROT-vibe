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
    // Reset câu hỏi mỗi lần mở form mới
    if (inputQ) { inputQ.value = ''; if (charCount) charCount.textContent = '0 / 200'; }
    const oldHint = document.getElementById('_step3Hint');
    if (oldHint) oldHint.remove();

    // Reset step 2 title
    const stTitle = document.querySelector('#step2 .step-title');
    const stDesc = document.querySelector('#step2 .step-desc');
    if (stTitle) stTitle.textContent = 'Chọn Lĩnh Vực';
    if (stDesc) stDesc.style.display = 'block';
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
    // Kích hoạt Fullscreen (F11) để tạo cảm giác nhập vai
    const docEl = document.documentElement;
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
      if (docEl.requestFullscreen) docEl.requestFullscreen().catch(() => { });
      else if (docEl.webkitRequestFullscreen) docEl.webkitRequestFullscreen().catch(() => { });
      else if (docEl.msRequestFullscreen) docEl.msRequestFullscreen().catch(() => { });
    }

    // Play background music when entering full screen / exploring
    if (!window.bgMusic) {
      window.bgMusic = new Audio('bg_music/mfcc-mystery-mystic-mystical-music-279834.mp3');
      window.bgMusic.loop = true;
      window.bgMusic.volume = 0.5;
    }
    window.bgMusic.play().catch(err => console.log("Audio autoplay blocked:", err));

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
      { key: 'secret_admirer', label: 'Người Thương Bạn', desc: 'Ai đang để ý bạn' },
      { key: 'future_love', label: 'Người Yêu Tương Lai', desc: 'Tình duyên sắp tới' },
      { key: 'someone', label: 'Người Ấy', desc: 'Người đang nghĩ đến' },
      { key: 'marriage', label: 'Hôn Nhân', desc: 'Vợ chồng & hôn nhân' },
      { key: 'conflict', label: 'Giải Quyết Xung Đột', desc: 'Hóa giải mâu thuẫn' },
      { key: 'breakup', label: 'Chia Tay & Hàn Gắn', desc: 'Sau chia tay & hàn gắn' },
      { key: 'reconciliation', label: 'Gương Vỡ Lại Lành', desc: 'Quay lại tái hợp' },
      { key: 'long_distance', label: 'Yêu Xa', desc: 'Mối tình dị địa' },
      { key: 'jealousy', label: 'Người Thứ Ba / Ghen', desc: 'Nghi ngờ & phản bội' },
      { key: 'self_love', label: 'Yêu Bản Thân', desc: 'Nhìn lại chính mình' },
      { key: 'friendship', label: 'Tình Bạn / Tri Kỷ', desc: 'Sự thấu hiểu & khăng khít' },
      { key: 'family', label: 'Gia Đình', desc: 'Các mối quan hệ gia đình' },
      { key: 'pregnancy', label: 'Con Cái / Thai Kỳ', desc: 'Kế hoạch gia đình' },
      { key: 'gossip', label: 'Thị Phi / Đàm Tiếu', desc: 'Lời ra tiếng vào' },
      { key: 'toxic_relationship', label: 'Q/hệ Độc Hại', desc: 'Đau buồn & bế tắc' },
      { key: 'soulmate', label: 'Tri Kỷ / Soulmate', desc: 'Kết nối linh hồn' },
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
      { key: 'burnout', label: 'Kiệt Sức / Áp Lực', desc: 'Quá tải công việc' },
      { key: 'startup', label: 'Khởi Nghiệp', desc: 'Mở cơ sở kinh doanh' },
      { key: 'workplace_politics', label: 'Thị Phi Công Sở', desc: 'Đấu đá & chèn ép' },
      { key: 'side_hustle', label: 'Nghề Tay Trái', desc: 'Thu nhập phụ' },
    ],
    finance: [
      { key: 'finance', label: 'Tài Chính Tổng Quán', desc: 'Tiền bạc & đầu tư' },
      { key: 'investment', label: 'Đầu Tư / Chứng Khoán', desc: 'Cổ phiếu & tài sản' },
      { key: 'debt', label: 'Nợ Nần / Vay Mượn', desc: 'Giải quyết nợ' },
      { key: 'savings', label: 'Tiết Kiệm & Tích Lũy', desc: 'Xây dựng tảng lưỡng' },
      { key: 'luck_money', label: 'Lộc Tài / May Mắn', desc: 'Vận đỏ & tiền bạc' },
      { key: 'real_estate', label: 'Bất Động Sản', desc: 'Mua bán nhà đất' },
      { key: 'financial_loss', label: 'Thua Lỗ / Khó Khăn', desc: 'Khủng hoảng tiền bạc' },
      { key: 'sudden_wealth', label: 'Vận May Bất Ngờ', desc: 'Trúng số & Lộc rơi' },
    ],
    health: [
      { key: 'health', label: 'Sức Khỏe Thể Chất', desc: 'Cơ thể & bệnh tật' },
      { key: 'mental', label: 'Sức Khỏe Tâm Thần', desc: 'Cảm xúc & tâm lý' },
      { key: 'energy', label: 'Năng Lượng & Chakra', desc: 'Cân bằng năng lượng' },
      { key: 'diet', label: 'Điều Độ / Chăm Sóc', desc: 'Ăn uống & lối sống' },
      { key: 'pet', label: 'Thú Cưng', desc: 'Vật nuôi kết nối' },
      { key: 'healing', label: 'Chữa Lành Tâm Hồn', desc: 'Phục hồi vết thương' },
      { key: 'stress', label: 'Căng Thẳng / Âu Lo', desc: 'Quản lý cảm xúc' },
      { key: 'trauma', label: 'Tổn Thương Quá Khứ', desc: 'Bóng ma tâm lý' },
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
      { key: 'exams', label: 'Thi Cử / Kiểm Tra', desc: 'Kết quả bài thi' },
      { key: 'scholarship', label: 'Học Bổng', desc: 'Cơ hội vươn xa' },
      { key: 'talent', label: 'Năng Khiếu / Đam Mê', desc: 'Khám phá biệt tài' },
      { key: 'spirit_guide', label: 'Thần Hộ Mệnh', desc: 'Thông điệp dẫn lối' },
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

    const step2Title = document.querySelector('#step2 .step-title');
    const step2Desc = document.querySelector('#step2 .step-desc');
    if (step2Title) step2Title.textContent = mainKey === 'more' ? 'Lĩnh Vực Khác' : `Lĩnh Vực ${mainLabel}`;
    if (step2Desc) step2Desc.style.display = 'none';

    subEl.innerHTML = `
      <div class="sub-theme-search" style="padding: 0 0 12px 0;">
        <div style="position: relative;">
          <input type="text" id="subThemeSearch" placeholder="Tìm kiếm nhanh chủ đề..." autocomplete="off" style="width: 100%; padding: 10px 16px 10px 38px; border-radius: 20px; border: 1px solid rgba(201,168,76,0.3); background: rgba(20,9,30,0.5); color: var(--c-gold); font-family: 'Philosopher', sans-serif; font-size: 0.95rem; outline: none; transition: all 0.3s; box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);" onfocus="this.style.borderColor='rgba(201,168,76,0.8)'; this.style.boxShadow='0 0 10px rgba(201,168,76,0.2), inset 0 2px 4px rgba(0,0,0,0.2)';" onblur="this.style.borderColor='rgba(201,168,76,0.3)'; this.style.boxShadow='inset 0 2px 4px rgba(0,0,0,0.2)';"/>
          <svg style="position: absolute; left: 12px; top: 11px; color: rgba(201,168,76,0.6);" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>
      <div class="sub-theme-list">
        ${subs.map(s => `
          <button class="sub-theme-item" data-value="${s.key}" data-search="${(s.label + ' ' + s.desc).toLowerCase()}" type="button">
            <span class="sti-label">${s.label}</span>
            <span class="sti-desc">${s._group ? s._group + ' · ' : ''}${s.desc}</span>
            <span class="sti-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg></span>
          </button>`).join('')}
      </div>`;

    const searchInput = subEl.querySelector('#subThemeSearch');
    if (searchInput) {
      const removeTones = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
      searchInput.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase().trim();
        const valNoTones = removeTones(val);
        const items = subEl.querySelectorAll('.sub-theme-item');
        let hasMatch = false;

        items.forEach(item => {
          const text = item.dataset.search || '';
          const match = text.includes(val) || removeTones(text).includes(valNoTones);
          if (match) {
            item.style.display = 'flex';
            hasMatch = true;
          } else {
            item.style.display = 'none';
          }
        });

        let emptyMsg = subEl.querySelector('.sub-theme-empty');
        if (!hasMatch) {
          if (!emptyMsg) {
            emptyMsg = document.createElement('div');
            emptyMsg.className = 'sub-theme-empty';
            emptyMsg.style.cssText = "text-align: center; color: rgba(232, 224, 255, 0.5); padding: 20px 0; font-family: 'Philosopher', serif; font-size: 0.95rem; font-style: italic;";
            emptyMsg.innerHTML = "Không tìm thấy chủ đề phù hợp ✧";
            subEl.querySelector('.sub-theme-list').appendChild(emptyMsg);
          } else {
            emptyMsg.style.display = 'block';
          }
        } else if (emptyMsg) {
          emptyMsg.style.display = 'none';
        }
      });
    }

    // Removed sub-back-btn event listener as per instruction

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
      const q = inputQ.value.trim();
      const isCustomTab = !document.getElementById('customQPanel')?.classList.contains('hidden');

      function showInputError(msg) {
        window.FX?.shake(inputQ);
        window.FX?.glowPulse(inputQ, 'rgba(255,80,80,0.6)');
        inputQ.placeholder = msg;
        setTimeout(() => { inputQ.placeholder = ' '; }, 3000);
      }

      function isSpam(s) {
        const clean = s.replace(/\s/g, '');
        if (!clean.length) return false;
        // 5+ consecutive identical chars: aaaaaa, #####, 111111
        if (/(.)\1{4,}/.test(clean)) return true;
        // Single char frequency > 50%
        const freq = {};
        for (const c of clean) freq[c] = (freq[c] || 0) + 1;
        const maxF = Math.max(...Object.values(freq));
        if (maxF / clean.length > 0.5) return true;
        // Very few unique chars (< 25% of length, min 4 unique needed for long strings)
        const unique = Object.keys(freq).length;
        if (clean.length >= 10 && unique / clean.length < 0.25) return true;
        // Only digits or only symbols (no letters at all)
        if (/^[\d\W_]+$/.test(clean)) return true;
        return false;
      }

      if (!q) {
        if (isCustomTab) {
          showInputError('Bạn cần nhập câu hỏi để tiếp tục...');
        } else {
          const grid = document.getElementById('presetQGrid');
          if (grid) window.FX?.shake(grid);
          let hint = document.getElementById('_step3Hint');
          if (!hint) {
            hint = document.createElement('div');
            hint.id = '_step3Hint';
            hint.style.cssText = 'color:rgba(255,110,110,0.9);font-family:"EB Garamond",serif;font-size:0.9rem;text-align:center;margin-top:8px;transition:opacity 0.4s;';
            grid.parentElement?.appendChild(hint);
          }
          hint.textContent = '✦ Vui lòng chọn một câu hỏi để tiếp tục';
          hint.style.opacity = '1';
          setTimeout(() => { hint.style.opacity = '0'; }, 2500);
        }
        return false;
      }
      if (isCustomTab) {
        if (q.length < 30) {
          showInputError(`Câu hỏi cần ít nhất 30 ký tự (hiện ${q.length}/30)...`);
          return false;
        }
        if (isSpam(q)) {
          showInputError('Câu hỏi không hợp lệ – vui lòng đặt câu hỏi thực sự...');
          return false;
        }
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

      const subPanel = document.getElementById('subThemePanel');
      const gridPanel = document.getElementById('mainThemeGrid');

      // Intercept back button if currently viewing sub-themes inside step 2
      if (currentStep === 2 && subPanel && !subPanel.classList.contains('hidden')) {
        subPanel.classList.add('hidden');
        if (gridPanel) gridPanel.classList.remove('hidden');
        
        const stTitle = document.querySelector('#step2 .step-title');
        const stDesc = document.querySelector('#step2 .step-desc');
        if (stTitle) stTitle.textContent = 'Chọn Lĩnh Vực';
        if (stDesc) stDesc.style.display = 'block';
        return; // Do not go back to step 1
      }

      if (prev === 1) {
        subPanel?.classList.add('hidden');
        gridPanel?.classList.remove('hidden');
        const stTitle = document.querySelector('#step2 .step-title');
        const stDesc = document.querySelector('#step2 .step-desc');
        if (stTitle) stTitle.textContent = 'Chọn Lĩnh Vực';
        if (stDesc) stDesc.style.display = 'block';
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
      if (len < 30) {
        charCount.style.color = 'rgba(255,100,100,0.8)';
      } else if (len > 180) {
        charCount.style.color = 'rgba(255,160,80,0.8)';
      } else {
        charCount.style.color = 'rgba(255,255,255,0.25)';
      }
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
    friendship: [{
      group: 'Tình Bạn & Tri Kỷ', qs: [
        'Mối quan hệ bạn bè của chúng tôi hiện tại ra sao?',
        'Người bạn này có thực sự chân thành với tôi không?',
        'Làm sao để chúng tôi gắn kết và hiểu nhau hơn?',
        'Có xích mích nào đang ngầm tồn tại giữa chúng tôi không?',
        'Tương lai của tình bạn này sẽ đi về đâu?',
      ]
    }],
    pregnancy: [{
      group: 'Con Cái & Thai Kỳ', qs: [
        'Kế hoạch sinh con của tôi sắp tới có thuận lợi không?',
        'Giai đoạn thai kỳ của tôi cần lưu ý điều gì về năng lượng?',
        'Mối liên kết tâm linh giữa tôi và đứa trẻ sắp chào đời?',
        'Làm sao để tôi chuẩn bị tốt nhất vai trò làm cha/mẹ?',
        'Thông điệp vũ trụ dành cho kế hoạch gia đình của tôi?',
      ]
    }],
    gossip: [{
      group: 'Thị Phi & Đàm Tiếu', qs: [
        'Ai là người đang gieo rắc tin đồn về tôi rắc rối này?',
        'Tại sao thị phi này lại xuất hiện trong cuộc đời tôi?',
        'Cách tốt nhất để tôi dập tắt ngọn lửa đàm tiếu này là gì?',
        'Thị phi này có ảnh hưởng thực tế đến công việc của tôi không?',
        'Bài học tôi nhận được sau biến cố danh tiếng này là gì?',
      ]
    }],
    legal: [{
      group: 'Pháp Lý & Giấy Tờ', qs: [
        'Vấn đề pháp lý hiện tại của tôi có kết quả khả quan không?',
        'Tôi cần chuẩn bị giấy tờ hoặc đối sách gì để xoay chuyển?',
        'Người hỗ trợ pháp lý hoặc luật sư của tôi có đáng tin cậy không?',
        'Vấn đề kiện tụng này kéo dài bao lâu nữa?',
        'Vũ trụ khuyên tôi nên nhượng bộ hay chiến đấu đến cùng?',
      ]
    }],
    moving: [{
      group: 'Chuyển Chỗ & Định Cư', qs: [
        'Việc chuyển nhà / xuất ngoại lúc này có mang lại tài lộc không?',
        'Năng lượng phong thủy tại nơi ở mới có phù hợp với tôi?',
        'Rào cản lớn nhất cản bước tôi định cư tại vùng đất mới là gì?',
        'Quá trình di dời có thuận lợi không hay gặp trắc trở?',
        'Cuộc sống của tôi sẽ thay đổi thế nào sau khi chuyển chỗ?',
      ]
    }],
    pet: [{
      group: 'Thú Cưng', qs: [
        'Boss (thú cưng) của tôi đang cảm thấy thế nào?',
        'Thú cưng có mang lại năng lượng chữa lành cho ngôi nhà không?',
        'Vấn đề sức khỏe hiện tại của bé cưng có đáng lo ngại không?',
        'Mối liên hệ tiền kiếp giữa tôi và thú cưng là gì?',
        'Làm sao để tôi chăm sóc và kết nối tốt hơn với chúng?',
      ]
    }],
    dream: [{
      group: 'Giải Mã Giấc Mơ', qs: [
        'Giấc mơ lặp đi lặp lại gần đây của tôi chứa thông điệp gì?',
        'Hình ảnh đáng sợ trong mơ cảnh báo tôi điều gì từ tiềm thức?',
        'Có điềm báo tương lai nào ẩn giấu trong giấc mộng đêm qua không?',
        'Vũ trụ muốn nhắc nhở tôi giải quyết vấn đề gì qua giấc mơ?',
        'Tôi nên hành động thế nào ở đời thực sau khi thấy điềm báo?',
      ]
    }],
    past_life: [{
      group: 'Tiền Kiếp', qs: [
        'Tôi mang theo món nợ tiền kiếp nào ảnh hưởng đến hiện tại?',
        'Mối liên hệ giữa tôi và người ấy trong tiền kiếp là gì?',
        'Năng khiếu bẩm sinh hiện tại của tôi đến tử tiền kiếp nào?',
        'Chấp niệm nào từ tiền kiếp vẫn còn đang cản bước tôi?',
        'Tôi cần làm gì để giải thoát những nỗi đau từ quá khứ nhọc nhằn?',
      ]
    }],
    karma: [{
      group: 'Nghiệp Quả (Karma)', qs: [
        'Khó khăn tôi đang chịu đựng có phải xuất phát từ nghiệp quả?',
        'Bài học nhân quả (karma) lớn nhất mà tôi cần tốt nghiệp là gì?',
        'Làm sao để tôi gieo những hạt giống thiện lành cho tương lai?',
        'Có chướng nghiệp nào với gia đình dòng họ đang trói buộc tôi?',
        'Tôi đã trả xong món nghiệp đối với người này hay chưa?',
      ]
    }],
    lost_item: [{
      group: 'Tìm Đồ Thất Lạc', qs: [
        'Món đồ quý giá tôi làm rơi hiện đang nằm ở phương hướng nào?',
        'Trạng thái hiện tại của món đồ (còn nguyên hay đã mất mát)?',
        'Tôi nên tìm đồ vật này ở nơi ánh sáng hay trong góc khuất?',
        'Sự thất lạc này có mang ý nghĩa cảnh báo tôi bất cẩn điều gì?',
        'Tỷ lệ tôi tìm lại được đồ vật này là bao nhiêu phần trăm?',
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
    toxic_relationship: [{
      group: 'Mối Quan Hệ Độc Hại', qs: [
        'Tại sao tôi cứ mãi lặp lại khuôn mẫu bế tắc này trong tình yêu?',
        'Có nên dứt khoát chấm dứt mối quan hệ mang lại nhiều nước mắt này?',
        'Cách nào để tự giải thoát bản thân khỏi sự kìm kẹp tình cảm?',
        'Người kia có đang thao túng tâm lý (gaslight) tôi không?',
        'Bài học lớn nhất sau sự tan vỡ này là gì?'
      ]
    }],
    soulmate: [{
      group: 'Tri Kỷ / Soulmate', qs: [
        'Dấu hiệu nhận biết soulmate của tôi sắp xuất hiện là gì?',
        'Liệu người tôi vừa gặp có phải là mảnh ghép định mệnh?',
        'Điểm chung nào gắn kết linh hồn hai người trong vạn dặm đời?',
        'Sự hội ngộ mang lại điều gì cho sự phát triển của cả hai?',
        'Làm cách nào để vun đắp trọn vẹn sự kết nối kỳ diệu này?'
      ]
    }],
    reconciliation: [{
      group: 'Gương Vỡ Lại Lành', qs: [
        'Nếu quay lại, cả hai đã đủ trưởng thành để không vấp ngã?',
        'Tôi cần thay đổi điểm nào nếu muốn gương vỡ lại lành?',
        'Đối phương đã sẵn sàng bỏ qua cái tôi chưa?',
        'Cơ hội tái hợp lần này có mang lại hạnh phúc thật sự?',
        'Vũ trụ khuyên tôi nên buông xuôi hay cố níu giữ?'
      ]
    }],
    secret_admirer: [{
      group: 'Người Thầm Thương', qs: [
        'Ai đang âm thầm quan tâm tôi từ xa?',
        'Cảm xúc thực sự của họ dành cho tôi sâu đậm đến đâu?',
        'Tôi có nên bật đèn xanh cho họ bước tới không?',
        'Lời tỏ tình có sắp sửa diễn ra trong thời gian tới?'
      ]
    }],
    burnout: [{
      group: 'Kiệt Sức & Áp Lực', qs: [
        'Tôi phải làm gì để khôi phục lại cảm hứng công việc?',
        'Khoảng thời gian kiệt sức này bao giờ mới chấm dứt?',
        'Tôi có đang ép bản thân chạy theo những tiêu chuẩn sai lầm?',
        'Bình yên thực sự đang chực chờ tôi ở phương hướng nào?'
      ]
    }],
    startup: [{
      group: 'Khởi Nghiệp', qs: [
        'Ý tưởng khởi nghiệp của tôi có được thị trường đón nhận?',
        'Người đồng sáng lập này có đáng để tôi giao phó sứ mệnh không?',
        'Nên gọi vốn lúc này hay tự thân khởi nghiệp gầy dựng?',
        'Thử thách khó lường nhất trong giai đoạn đầu startup là gì?'
      ]
    }],
    workplace_politics: [{
      group: 'Thị Phi Công Sở', qs: [
        'Kẻ nào đang ném đá giấu tay trong bộ phận của tôi?',
        'Sáng suốt nhất bây giờ là cắn răng chịu đựng hay vùng lên?',
        'Sếp có thực sự hiểu và ghi nhận nỗ lực của tôi giữa cơn thị phi?',
        'Bao giờ những lời đơm đặt này mới tan biến đi?'
      ]
    }],
    side_hustle: [{
      group: 'Nghề Tay Trái', qs: [
        'Ý tưởng kiếm thêm tiền này có mang lại lợi nhuận thực tế?',
        'Tôi nên phân bổ thời gian thế nào để không ảnh hưởng việc chính?',
        'Ai có thể là cộng sự tốt nhất cho tôi ở nghề tay trái?',
        'Nghề phụ này liệu có khả năng trở thành sự nghiệp trọn đời?'
      ]
    }],
    real_estate: [{
      group: 'Bất Động Sản', qs: [
        'Tháng này có phải là thời điểm vàng để chốt mảnh đất này?',
        'Ngôi nhà mới có mang lại luồng sinh khí tốt đẹp không?',
        'Người mua/bán có đang giấu giếm rủi ro về mặt pháp lý?',
        'Làm sao để giao dịch mua bán nhà đất diễn ra suôn sẻ?'
      ]
    }],
    financial_loss: [{
      group: 'Thua Lỗ Khó Khăn', qs: [
        'Sau mất mát này, tôi cần cảnh giác lỗ hổng tài chính nào?',
        'Thời gian tới, luồng tiền có quay trở lại bù đắp cho tôi?',
        'Kẻ tiểu nhân nào đã lợi dụng sự cả tin của tôi?',
        'Làm sao để duy trì tinh thần trước sự cố hao tài tốn của?'
      ]
    }],
    sudden_wealth: [{
      group: 'Vận May Bất Ngờ', qs: [
        'Phải chăng vận cực thái lai, tôi chuẩn bị đón nhận tài lộc lớn?',
        'Nên phân bổ món lộc lạ này sao cho bền vững lâu dài?',
        'Liệu có ai đố kỵ với sự giàu lên đột ngột của tôi?',
        'Bao giờ cơn mưa tiền tiếp theo mới đến gõ cửa nhà tôi?'
      ]
    }],
    healing: [{
      group: 'Chữa Lành Tâm Hồn', qs: [
        'Ai đã để lại vết xước lớn nhất trong lòng tôi?',
        'Hành trình chữa lành của tôi sẽ mất bao lâu nữa để trọn vẹn?',
        'Bước đầu tiên thiết thực để xoa dịu tiếng khóc trong tâm hồn?',
        'Tôi đang chối bỏ nỗi buồn bằng những lớp vỏ bọc nào?'
      ]
    }],
    stress: [{
      group: 'Căng Thẳng Âu Lo', qs: [
        'Tôi tự gánh vác quá nhiều hay do đời khắc nghiệt?',
        'Cách đơn giản nhất để não bộ được thư giãn hôm nay?',
        'Bao giờ những kỳ vọng đè bẹp vai mới chịu tan biến?',
        'Nên từ bỏ trách nhiệm nào để nhường chỗ cho sự bình an?'
      ]
    }],
    trauma: [{
      group: 'Tổn Thương Quá Khứ', qs: [
        'Ký ức kinh hoàng nào vẫn đang thao túng hành vi hiện tại?',
        'Nhờ đâu tôi mới có can đảm đối diện với bóng tối ấy?',
        'Bao giờ vết thương này mới đóng vảy thành sẹo để quên đi?',
        'Bài học thiêng liêng từ nỗi đau quá khứ là gì?'
      ]
    }],
    exams: [{
      group: 'Thi Cử Điểm Số', qs: [
        'Kết quả môn học này sẽ như tôi mong ước chứ?',
        'Phương pháp ôn tập hiện tại của tôi đã tối ưu?',
        'Bẫy trắc nghiệm nào tôi dễ vấp phải nhất?',
        'Thần hộ mệnh có sát cánh cùng tôi trong phòng thi?'
      ]
    }],
    scholarship: [{
      group: 'Học Bổng', qs: [
        'Hồ sơ của tôi đã đủ tỏa sáng để hội đồng xét duyệt chú ý?',
        'Kỹ năng nào tôi cần trau dồi gấp để đạt được học bổng này?',
        'Đối thủ cạnh tranh của tôi trong đợt apply này mạnh thế nào?',
        'Tôi nên chọn quốc gia nào để xin học bổng êm xuôi nhất?'
      ]
    }],
    talent: [{
      group: 'Năng Khiếu Đam Mê', qs: [
        'Thiên bẩm ẩn giấu của tôi mạnh nhất ở khía cạnh nào?',
        'Tôi đang lãng phí tài năng vì nỗi sợ thất bại nào?',
        'Sống hết mình với đam mê nghệ thuật liệu có thành công?',
        'Làm sao để biến sở thích cá nhân thành nguồn thu nhập lớn?'
      ]
    }],
    spirit_guide: [{
      group: 'Thần Hộ Mệnh Dẫn Lối', qs: [
        'Linh hồn dẫn dắt đang gửi thông điệp gì qua những con số lặp lại?',
        'Xin thần hộ mệnh ban cho tôi chỉ dẫn ở ngã rẽ cuộc đời?',
        'Có nguy hiểm tàng hình nào mà cõi vô hình đang cố chắn ngang?',
        'Tôi phải tĩnh tâm thế nào mới nghe rõ tiếng gọi từ vị thần hộ mệnh?'
      ]
    }],
  };

  // Add more deep, diverse questions to every subtheme
  const extraQS = {
    ex: ["Phần tổn thương nào trong tôi vẫn chưa thực sự buông bỏ hình bóng đó?", "Nếu vô tình tình cờ chạm mặt, vũ trụ muốn tôi phản ứng thế nào?", "Họ đang trải qua giai đoạn nhân quả nào sau khi rời xa tôi?"],
    current_love: ["Hai chúng tôi có đang hỗ trợ nhau phát triển hay kìm hãm lẫn nhau?", "Trong mắt đối phương, điểm quyến rũ nhất của tôi là gì?", "Nỗi sợ vô hình nào đang cản trở chúng tôi tiến thêm một bước tiến cam kết?"],
    ambiguous: ["Tại sao vũ trụ lại đưa mối quan hệ không tên này vào cuộc đời tôi?", "Tôi đang lừa dối bản thân điều gì khi cứ bám víu lấy người này?", "Làm cách nào để tôi lấy lại quyền tự chủ và giá trị của bản thân?"],
    crush: ["Nếu tôi bộc lộ tình cảm lúc này, tỷ lệ thành công là bao nhiêu?", "Họ có đang bị tổn thương bởi một mối tình cũ chưa lành không?", "Tôi đang yêu con người thật của họ hay chỉ là hình mẫu do tôi tưởng tượng?"],
    future_love: ["Tôi cần dọn dẹp năng lượng tiêu cực nào để dọn chỗ cho tình yêu chớm nở?", "Phẩm chất tốt đẹp nào ở tôi đang thu hút một người bạn đời chất lượng?", "Lần chạm trán với người yêu tương lai sẽ mang không khí bất ngờ ra sao?"],
    someone: ["Họ có cảm thấy ghen tỵ ngầm khi thấy tôi đi cùng người khác không?", "Tôi đang đóng vai trò gì trong quá trình trưởng thành của họ?", "Họ có đang cố tạo ra một vỏ bọc lạnh lùng để bảo vệ trái tim yếu đuối?"],
    marriage: ["Làm sao để khơi dậy lại ngọn lửa lãng mạn như thuở mới yêu?", "Bài học lớn nhất mà cuộc hôn nhân này đang dạy tôi là gì?", "Cả hai chúng tôi có đang đồng điệu chung một tầm nhìn về 10 năm tới?"],
    conflict: ["Phần mâu thuẫn này thực chất là để che đậy nỗi đau sâu kín nào?", "Tôi có đang để cái tôi của mình vượt lấp đi sự cảm thông cần thiết?", "Sự hòa giải lúc này có mang lại sự bình yên giả tạo hay giải quyết tận gốc?"],
    breakup: ["Sự chia ly này đã cứu tôi khỏi những thảm họa tiềm ẩn nào trong tương lai?", "Góc khuất nào của bản thân tôi vừa được bộc lộ sau nỗi đau đổ vỡ?", "Tôi nên bắt đầu quá trình chữa lành từ mảng nào trong tâm hồn?"],
    long_distance: ["Chướng ngại lớn nhất lúc này là không gian vật lý hay sự lệch pha về tinh thần?", "Chúng tôi có thể làm gì để tạo cảm giác gắn kết dù cách xa nghìn dặm?", "Sự chờ đợi mỏi mòn này liệu có mang lại trái ngọt xứng đáng không?"],
    jealousy: ["Sự ghen tuông này xuất phát từ linh cảm chính xác hay nỗi bất an từ quá khứ?", "Sự xuất hiện của 'người thứ ba' đang phơi bày lỗ hổng nào của mối quan hệ?", "Tôi lấy lại sự tự tin và rực rỡ của mình bằng cách nào sau chấn thương này?"],
    self_love: ["Tôi đang khắt khe chà đạp bản thân mình ở khía cạnh nào?", "Đứa trẻ bên trong tôi đang gào thét đòi hỏi sự an ủi ở vấn đề gì?", "Làm cách nào để tôi tha thứ cho những quyết định sai lầm trong quá khứ?"],
    friendship: ["Tôi có đang cho đi quá nhiều mà nhận lại sự thờ ơ từ người bạn này?", "Lời nói dối vô hại nào đang ăn mòn gốc rễ tin tưởng giữa hai chúng tôi?", "Sự đứt gãy tình bạn này mang lại ánh sáng giải thoát nào cho tôi?"],
    pregnancy: ["Linh hồn đứa trẻ đến với tôi mang theo nhân duyên tốt lành nào?", "Nỗi sợ hãi nào về việc làm cha mẹ đang làm tôi cạn kiệt năng lượng?", "Sự thay đổi về thể chất này đang muốn nhắc nhở tôi trân quý bản thân ra sao?"],
    gossip: ["Sự ganh ghét của họ bắt nguồn từ điểm sáng nào mà tôi đang sở hữu?", "Vũ trụ đang dạy tôi bài học gì về việc làm chủ cảm xúc trước miệng đời?", "Tôi nên phản đòn mạnh mẽ hay dùng sự im lặng kiêu hãnh để đáp trả?"],
    career: ["Lộ trình thăng tiến 5 năm tới của tôi đang sáng rực hay mù mịt?", "Năng khiếu tiềm ẩn nào của tôi chưa được khai mở trong công việc hiện hành?", "Tôi có đang làm việc chỉ vì tiền mà để linh hồn mình trống rỗng?"],
    job_search: ["Tại sao tôi liên tục bị từ chối dù hồ sơ của tôi rất ổn thỏa?", "Công ty tương lai sẽ mang lại cho tôi văn hóa làm việc độc hại hay lành mạnh?", "Tôi nên tiếp tục theo đuổi đam mê hay chọn một công việc an toàn để sinh tồn?"],
    promotion: ["Có kẻ ngáng đường nào đang tìm cách cướp công lao thăng tiến của tôi?", "Việc giữ chức vụ cao hơn có đánh đổi bằng sự gắn kết của gia đình tôi không?", "Tôi cần trau dồi kỹ năng lãnh đạo sắc bén nào để ngồi vững trên chiếc ghế đó?"],
    business: ["Chiến lược hiện tại của dự án này đang đi vào ngõ cụt hay lối mở?", "Đối tác hiện tại có cùng chung dòng chảy đạo đức kinh doanh với tôi không?", "Thời điểm này là lúc nên mở rộng mạnh mẽ hay thu mình phòng thủ bảo toàn vốn?"],
    colleague: ["Tại sao tôi luôn cảm thấy kiệt sức khi phải làm việc chung với tập thể này?", "Có một sự bất công ngầm nào đang diễn ra mà sếp cố tình làm ngơ không?", "Làm sao để tôi vạch ra ranh giới rạch ròi giữa tình cảm cá nhân và luân lý công việc?"],
    career_change: ["Sự rẽ ngang này có phải là tiếng gọi của thiên hướng hay chỉ là phút bốc đồng?", "Tôi có đủ sức chịu đựng khó khăn trong 2 năm đầu tiên xây lại từ con số không?", "Ngành nghề mới này có mang lại sự tự do tài chính mà tôi luôn ao ước không?"],
    freelance: ["Tài năng của tôi có đang bị thị trường đánh giá thấp đi giá trị thực?", "Sự chông chênh vô định ngày qua ngày đang làm tôi bào mòn tinh thần ra sao?", "Tôi có nên xây dựng một thương hiệu cá nhân ngạo nghễ hơn thay vì ẩn mình?"],
    interview: ["Ấn tượng đầu tiên tôi để lại cho nhà tuyển dụng sẽ mang màu sắc gì?", "Lỗ hổng chết người nào trong buổi phỏng vấn mà tôi cần bọc lót khéo léo?", "Liệu mức lương bổng họ đề nghị có phản ánh đúng năng lực tôi cống hiến không?"],
    legal: ["Có ẩn khuất nào trong hợp đồng mà bên kia đang cố tình giấu giếm tôi?", "Cán cân công lý đang nghiêng về bên nào trong vụ kiện tụng kéo dài này?", "Việc theo đuổi pháp lý có tiêu hao hố đen tiền bạc hơn mức tôi nhận lại không?"],
    moving: ["Việc rời đi khỏi quê hương mang lại sự tái sinh hay sự lạc lõng cô độc?", "Năng lượng địa linh phong thủy của ngôi nhà mới sẽ phù trợ dồi dào cho ai?", "Có điều gì dang dở tôi cần giải quyết triệt để trước khi xách vali rời đi?"],
    finance: ["Lỗ hổng thất thoát tài chính lớn nhất của tôi hiện nay nằm ở đâu?", "Có phải tôi đang mang tâm lý 'sợ thiếu thốn' khiến dòng chảy tiền bạc bị tắc nghẽn?", "Cơ may hoạnh tài bất ngờ nào đang chực chờ rơi xuống tay tôi?"],
    investment: ["Tài sản hoặc mã cổ phiếu tôi nhắm tới là chiếc phao cứu sinh hay cái bẫy mồi?", "Lòng tham của tôi có đang làm mờ đi các rủi ro pháp lý của dự án này?", "Tôi nên giữ nguyên hiện trạng hay chốt lời cắt lỗ ngay lập tức lúc này?"],
    debt: ["Khoản nợ này là kết quả của sự xui xẻo hay sự thiếu giáo dục tài chính trầm trọng?", "Làm sao để tôi phá vỡ vòng lặp vay mượn kham khổ đắp đổi qua ngày này?", "Người chủ nợ có ý định dùng khoản vay này để khống chế và thao túng tôi không?"],
    savings: ["Tôi đang tiết kiệm vì sự an toàn tương lai hay vì nỗi ám ảnh ki bo mù quáng?", "Khoản tiền tích lũy này cuối cùng sẽ được dùng vào mục tiêu rực rỡ nào?", "Có phải tôi đang bỏ lỡ những trải nghiệm tuổi trẻ chỉ vì khắt khe chắt bóp từng đồng?"],
    luck_money: ["Nguồn lộc này là lộc từ gia tiên âm phù hay từ sự nhạy bén cá nhân trói lấy?", "Tôi có nên chia sẻ bớt sự may mắn này cho người nghèo khó để tích phước sâu dày?", "Vận đỏ này sẽ kéo dài bao lâu trước khi biểu đồ may mắn đi vào nhịp chỉnh?"],
    health: ["Căn bệnh vặt vãnh lặp lại này đang cảnh báo sự suy sụp của cơ quan nào?", "Tôi có đang dựa dẫm quá nhiều vào thuốc men thay vì sức đề kháng tự nhiên?", "Cơ thể tôi đang biểu tình chống lại thực phẩm hay thói quen cụ thể nào?"],
    mental: ["Áp lực vô hình nào đang bào mòn hệ thần kinh của tôi từ bên trong?", "Có một tổn thương thuở ấu thơ nào vừa bị kích hoạt lại trong tuần qua không?", "Tôi cần làm gì để trục xuất những đám mây đen tiêu cực vây kín não bộ?"],
    energy: ["Ai trong vòng tròn giao tiếp đang hút cạn kiệt sinh khí trân quý của tôi?", "Luân xa (Chakra) nào của tôi đang bị tắc nghẽn nghẹt thở cần thông suốt?", "Tôi nên thực hành bộ môn gì để thu hút dương khí và xua đuổi ám khí?"],
    family: ["Nút thắt thế hệ nào đang ngăn cản sự thấu hiểu giữa tôi và người lớn trong nhà?", "Có một bí mật động trời nào của gia đình đang được che đậy khéo léo?", "Tôi có đang phải gánh vác trách nhiệm của người khác một cách phi lý không?"],
    diet: ["Sự thèm khát ăn uống mất kiểm soát dạo này là để lấp đầy khoảng trống tình cảm nào?", "Chế độ ăn hiện tại có cung cấp đủ linh khí để trí não tôi sắc bén không?", "Tôi đã sẵn sàng để dẹp bỏ những thói quen tự đầu độc bản thân trước khi quá muộn?"],
    pet: ["Người bạn nhỏ bé này đang muốn truyền đạt thông điệp chữa lành nào cho tôi?", "Có phải thú cưng đang gánh thay tôi một phần trọc khí xui xẻo trong nhà?", "Mối duyên kỳ ngộ nào đã đưa sinh linh này đến cứu rỗi tôi vượt qua lúc cô đơn?"],
    study: ["Sự xao nhãng hiện tại là do tôi lười biếng hay do não bộ đang quá tải thông tin?", "Phương pháp tiếp thu hiện tại có thực sự phù hợp với cấu trúc tư duy của tôi không?", "Kết quả kỳ học này sẽ mở ra cánh cửa nào vĩ đại định hình 5 năm tới?"],
    study_abroad: ["Môi trường văn hóa mới sẽ mang lại cú sốc tâm lý nào mà tôi cần chuẩn bị giáp tâm?", "Tôi có đủ mạnh mẽ vượt qua những đêm đông khóc nghẹn vì tủi thân nơi xứ người?", "Chuyến phiêu lưu này là bước đệm thăng hoa hay sẽ kết thúc bằng sự quay về mỏi mệt?"],
    self: ["Kẻ thù nguy hiểm nhất đánh gục mọi kế hoạch của tôi lại chính là bản thân tôi?", "Tôi đang khoác lên mình chiếc mặt nạ nào cứng nhắc khiến mọi người khó gần?", "Nếu không còn bị đánh giá bởi tiền bạc, tôi sẽ tự định nghĩa giá trị mình ra sao?"],
    purpose: ["Tôi sinh ra ở kiếp sống này với bản hợp đồng linh hồn thiêng liêng nào?", "Tài năng nào tôi đang lãng phí nhất chỉ vì sợ không kiếm ra tiền thực dụng?", "Thử thách đau thương hiện tại đóng vai trò gì trong bản đồ thức tỉnh sứ mệnh?"],
    shadow_self: ["Phần con ác quỷ ích kỷ bên trong tôi đang thèm khát điều gì nhất?", "Tại sao tôi luôn lặp lại một hành vi phá hoại hạnh phúc mỗi khi sắp chạm tới?", "Khi đối diện với bóng tối ghen tuông hẹp hòi của mình, vũ trụ khuyên tôi điều gì?"],
    decision: ["Nếu tôi chọn phương án rủi ro, kết quả tồi tệ nhất và rực rỡ nhất sẽ là gì?", "Lực cản khiến tôi do dự không dám vung gươm chém đứt rễ là sợ hãi hay tiếc nuối?", "Lựa chọn nào sẽ khiến tôi mỉm cười thanh thản khi nhìn lại ở tuổi 80?"],
    travel: ["Vùng đất sắp tới ẩn chứa một nhân duyên định mệnh nào đang chờ tôi giải mã?", "Chuyến đi này mang tính chất chạy trốn thực tại hay mở rộng chiều kích tâm hồn?", "Điều xui xẻo lặt vặt nào có thể xảy ra trên đường đi mà tôi cần bình tâm đón nhận?"],
    spiritual: ["Tín hiệu lặp lại 11:11 hay 333 gần đây mang hàm ý vũ trụ khẩn cấp gì?", "Có một vị thần linh bảo hộ nào đang đứng sát bên che chở cho tôi khỏi hoạn nạn?", "Làm cách nào để tôi khai mở con mắt thứ ba thấu thị mọi lời nói dối ngụy tạo?"],
    dream: ["Người lạ mặt tôi liên tục gặp trong mơ là một tiền kiếp hay một thông điệp từ linh hồn?", "Tôi đang chạy trốn con quái vật tiềm thức nào trong ngần ấy đêm giật mình tỉnh giấc?", "Giấc mộng thấy sự đổ vỡ là điềm báo đại hung hay chỉ là sự phá tảng cho cái mới ra hoa?"],
    past_life: ["Ám ảnh sợ hãi vô lý với độ cao, dòng nước hay bóng tối của tôi là cái chết từ kiếp nào?", "Người đang hành hạ tâm lý tôi kiếp này có phải là chủ nợ xương máu tôi nợ kiếp trước?", "Tôi đã từng mang thân phận hiển hách và quyền rũ nào trước khi đầu thai hiện thế?"],
    karma: ["Tôi có đang trả cái nghiệp xen vào gia đình người khác bằng sự bất hạnh tình duyên lúc này?", "Làm sao để dùng phước đức chắp vá lại cái nghiệp mạn phép sát sinh tôi từng vô tình gieo?", "Hoạn nạn liên hoàn này là sự trừng phạt tàn nhẫn hay là sự thanh lọc nghiệp quả sau cuối?"],
    lost_item: ["Có bàn tay của kẻ tiểu nhân nào lén lút sắp đặt sự biến mất của vật này không?", "Mất đi vật bảo chứng này, số phận của tôi rẽ sang nhánh may mắn hay bế tắc?", "Vật vô tri kì thực đang thế mạng cho thân xác tôi tránh một kiếp nạn đụng xe đẫm máu?"],
    general: ["Thông điệp cuối cùng nếu ngày mai không bao giờ đến vũ trụ sẽ nói gì với tôi?", "Điều kỳ diệu nào đang chờ chực phía sau khúc cua tuyệt vọng nhất của tuần này?"]
  };

  Object.keys(extraQS).forEach(k => {
    if (PRESET_Q[k] && PRESET_Q[k][0]) {
      PRESET_Q[k][0].qs.push(...extraQS[k]);
    }
  });

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

  document.getElementById('tabCustomQ')?.addEventListener('click', () => {
    switchQTab('custom');
    const hint = document.getElementById('_step3Hint');
    if (hint) hint.style.opacity = '0';
  });
  document.getElementById('tabPresetQ')?.addEventListener('click', () => {
    switchQTab('preset');
    const hint = document.getElementById('_step3Hint');
    if (hint) hint.style.opacity = '0';
  });

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
