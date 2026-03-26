// js/helper.js — Shared Tarot utility helpers
window.TarotHelper = (function () {

  /* ── Spread position labels ─────────────────────── */
  const SPREAD_LABELS = {
    1: ['Thông Điệp Chính'],
    3: ['Quá Khứ', 'Hiện Tại', 'Tương Lai'],
    5: ['Tình Huống', 'Thách Thức', 'Quá Khứ', 'Tương Lai', 'Kết Quả'],
    7: ['Bạn', 'Tình Huống', 'Nguyên Nhân', 'Quá Khứ', 'Tương Lai', 'Lời Khuyên', 'Kết Quả'],
    10: [
      'Tình Huống Hiện Tại', 'Thách Thức', 'Nền Tảng', 'Quá Khứ Gần',
      'Khả Năng Tốt Nhất', 'Tương Lai Gần', 'Bản Thân Bạn',
      'Ảnh Hưởng Bên Ngoài', 'Hy Vọng & Nỗi Sợ', 'Kết Quả Cuối Cùng'
    ],
  };

  function getSpreadLabels(n) {
    const count = parseInt(n) || 3;
    if (SPREAD_LABELS[count]) return SPREAD_LABELS[count];
    // Generic fallback
    return Array.from({ length: count }, (_, i) => `Lá ${i + 1}`);
  }

  /* ── Draw & shuffle cards from TAROT_DB ─────────── */
  function drawCards(n) {
    const db = window.TAROT_DB || [];
    if (!db.length) return [];

    // Shuffle
    const pool = db.map(card => ({
      ...card,
      isReversed: Math.random() < 0.35, // 35% chance reversed
    }));
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    return pool.slice(0, Math.min(n, pool.length));
  }

  const THEME_LABELS = {
    love: 'Tình Yêu', ex: 'Người Yêu Cũ', current_love: 'Người Yêu Hiện Tại',
    ambiguous: 'Mối Quan Hệ Mập Mờ', crush: 'Crush / Thầm Thích', future_love: 'Tình Duyên Tương Lai',
    someone: 'Người Ấy', marriage: 'Hôn Nhân', conflict: 'Giải Quyết Xung Đột', breakup: 'Chia Tay & Hàn Gắn',
    long_distance: 'Yêu Xa', jealousy: 'Người Thứ Ba / Ghen Tuông', self_love: 'Yêu Bản Thân',
    finding_love: 'Tìm Kiếm Tình Yêu', compatibility: 'Độ Tương Hợp',
    toxic_relationship: 'Q/hệ Độc Hại', soulmate: 'Tri Kỷ / Soulmate', reconciliation: 'Gương Vỡ Lại Lành', secret_admirer: 'Người Thầm Thương',
    friendship: 'Tình Bạn / Tri Kỷ', pregnancy: 'Con Cái / Thai Kỳ', gossip: 'Thị Phi / Đàm Tiếu', family: 'Gia Đình',

    career: 'Sự Nghiệp', job_search: 'Xin Việc Làm', promotion: 'Thăng Tiến', business: 'Kinh Doanh / Khởi Nghiệp',
    colleague: 'Quan Hệ Đồng Nghiệp', career_change: 'Chuyển Nghề', freelance: 'Freelance / Tự Do',
    interview: 'Phỏng Vấn', legal: 'Pháp Lý / Giấy Tờ', moving: 'Chuyển Chỗ / Xuất Ngoại',
    burnout: 'Kiệt Sức', startup: 'Khởi Nghiệp', workplace_politics: 'Thị Phi Công Sở', side_hustle: 'Nghề Tay Trái',

    finance: 'Tài Chính', investment: 'Đầu Tư', debt: 'Nợ Nần', savings: 'Tiết Kiệm', luck_money: 'Lộc Tài',
    real_estate: 'Bất Động Sản', financial_loss: 'Thua Lỗ', sudden_wealth: 'Vận May Bất Ngờ',

    health: 'Sức Khỏe', mental: 'Tâm Thần', energy: 'Năng Lượng', diet: 'Chăm Sóc Bản Thân', pet: 'Thú Cưng',
    healing: 'Chữa Lành Tâm Hồn', stress: 'Căng Thẳng', trauma: 'Tổn Thương Quá Khứ',

    study: 'Học Tập', study_abroad: 'Du Học', self: 'Bản Thân', purpose: 'Mục Đích Sống', shadow_self: 'Bóng Tối Nội Tâm',
    decision: 'Ra Quyết Định', travel: 'Du Lịch / Di Chuyển', spiritual: 'Tâm Linh', dream: 'Giải Mã Giấc Mơ',
    past_life: 'Tiền Kiếp', karma: 'Nghiệp Quả (Karma)', lost_item: 'Tìm Đồ Thất Lạc',
    exams: 'Thi Cử', scholarship: 'Học Bổng', talent: 'Năng Khiếu', spirit_guide: 'Thần Hộ Mệnh',

    general: 'Tổng Quát', more: 'Tổng Quát'
  };

  function getThemeLabel(key) {
    if (!key) return 'Tổng Quát';
    if (THEME_LABELS[key]) return THEME_LABELS[key];
    // Smart fallback: convert snake_case → Title Case with spaces
    return key.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  /* ── Public API ──────────────────────────────────── */
  return { getSpreadLabels, drawCards, getThemeLabel };
})();

/* ── Mystical Alert Modal ───────────────────────── */
window.showMysticalAlert = function(title, msg, btnText = 'Đã Hiểu', onOk = null, autoCloseMs = 0) {
  let modal = document.getElementById('mysticalAlertModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'mysticalAlertModal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
    modal.style.backdropFilter = 'blur(6px)';
    modal.style.zIndex = '100000';
    modal.style.display = 'none'; 
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease';
    
    modal.innerHTML = `
      <div class="modal-box" style="max-width: 400px; text-align: center; position: relative; background: var(--bg-modal, #170d2b); padding: 0; border: 1px solid rgba(201, 168, 76, 0.4); border-radius: 12px; box-shadow: 0 0 30px rgba(155, 48, 255, 0.2);">
        <div class="modal-body" style="padding: 32px 24px;">
          <div class="ai-pulse" style="margin: 0 auto 20px; border-color: var(--c-gold);"></div>
          <h2 class="shimmer-text" style="color: var(--c-gold); font-size: 1.4rem; margin-bottom: 12px; font-family: 'Cinzel', serif;" id="mysticalAlertTitle"></h2>
          <p id="mysticalAlertMsg" style="color: var(--c-pale); font-size: 1rem; line-height: 1.6; margin-bottom: 24px;"></p>
          <div id="mysticalAlertCountdown" style="color: var(--c-gold); font-size: 2.5rem; font-family: 'Cinzel', serif; font-weight: bold; margin-bottom: 22px; text-shadow: 0 0 15px rgba(201, 168, 76, 0.8); display: none;"></div>
          <button id="btnMysticalAlertOk" style="background: linear-gradient(135deg, rgba(82, 33, 130, 0.8), rgba(50, 16, 85, 0.9)); border: 1px solid rgba(201, 168, 76, 0.5); color: var(--c-gold); padding: 10px 36px; border-radius: 8px; font-family: 'Cinzel', serif; font-size: 1rem; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease; box-shadow: 0 0 15px rgba(201, 168, 76, 0.15);" onmouseover="this.style.boxShadow='0 0 25px rgba(201, 168, 76, 0.4)'; this.style.transform='translateY(-2px)';" onmouseout="this.style.boxShadow='0 0 15px rgba(201, 168, 76, 0.15)'; this.style.transform='none';"></button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }
  
  document.getElementById('mysticalAlertTitle').innerHTML = title;
  document.getElementById('mysticalAlertMsg').innerHTML = msg;
  const countdownEl = document.getElementById('mysticalAlertCountdown');
  const btnOk = document.getElementById('btnMysticalAlertOk');
  btnOk.innerHTML = btnText;
  
  if (window.mysticalAlertInterval) {
    clearInterval(window.mysticalAlertInterval);
  }

  btnOk.onclick = () => {
    if (window.mysticalAlertInterval) clearInterval(window.mysticalAlertInterval);
    modal.style.opacity = '0';
    setTimeout(() => { 
      modal.style.display = 'none'; 
      if (typeof onOk === 'function') onOk();
    }, 300);
  };
  
  // Force reflow
  void modal.offsetWidth;
  modal.style.display = 'flex';
  setTimeout(() => { modal.style.opacity = '1'; }, 10);
  
  if (autoCloseMs > 0) {
    countdownEl.style.display = 'block';
    let secs = Math.ceil(autoCloseMs / 1000);
    countdownEl.innerText = secs;
    
    window.mysticalAlertInterval = setInterval(() => {
      secs--;
      if (secs > 0) {
        countdownEl.innerText = secs;
      } else {
        clearInterval(window.mysticalAlertInterval);
        if (modal.style.display !== 'none' && modal.style.opacity === '1') {
          btnOk.click();
        }
      }
    }, 1000);
  } else {
    countdownEl.style.display = 'none';
  }
};
