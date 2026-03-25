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

  /* ── Theme display labels ────────────────────────── */
  const THEME_LABELS = {
    love: 'Tình Yêu', ex: 'Người Yêu Cũ', current_love: 'Người Yêu Hiện Tại',
    ambiguous: 'Mối Quan Hệ Mập Mờ', crush: 'Crush / Thầm Thích', future_love: 'Tình Duyên Tương Lai',
    someone: 'Người Ấy', marriage: 'Hôn Nhân', conflict: 'Giải Quyết Xung Đột', breakup: 'Chia Tay & Hàn Gắn',
    long_distance: 'Yêu Xa', jealousy: 'Người Thứ Ba / Ghen Tuông', self_love: 'Yêu Bản Thân',
    friendship: 'Tình Bạn / Tri Kỷ', pregnancy: 'Con Cái / Thai Kỳ', gossip: 'Thị Phi / Đàm Tiếu',
    career: 'Sự Nghiệp', job_search: 'Xin Việc Làm', promotion: 'Thăng Tiến', business: 'Kinh Doanh / Khởi Nghiệp',
    colleague: 'Quan Hệ Đồng Nghiệp', career_change: 'Chuyển Nghề', freelance: 'Freelance / Tự Do',
    interview: 'Phỏng Vấn', legal: 'Pháp Lý / Giấy Tờ', moving: 'Chuyển Chỗ / Xuất Ngoại',
    finance: 'Tài Chính', investment: 'Đầu Tư', debt: 'Nợ Nần', savings: 'Tiết Kiệm', luck_money: 'Lộc Tài',
    health: 'Sức Khỏe', mental: 'Tâm Thần', energy: 'Năng Lượng', family: 'Gia Đình', diet: 'Chăm Sóc Bản Thân', pet: 'Thú Cưng',
    study: 'Học Tập', study_abroad: 'Du Học', self: 'Bản Thân', purpose: 'Mục Đích Sống', shadow_self: 'Bóng Tối Nội Tâm',
    decision: 'Ra Quyết Định', travel: 'Du Lịch / Di Chuyển', spiritual: 'Tâm Linh', dream: 'Giải Mã Giấc Mơ',
    past_life: 'Tiền Kiếp', karma: 'Nghiệp Quả (Karma)', lost_item: 'Tìm Đồ Thất Lạc',
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
