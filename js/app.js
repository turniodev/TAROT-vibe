// js/app.js — Main application coordinator / page router
(function () {
  const pages = {
    landing: document.getElementById('pageLanding'),
    reading: document.getElementById('pageReading'),
    analysis: document.getElementById('pageAnalysis')
  };

  function showPage(name) {
    Object.entries(pages).forEach(([key, el]) => {
      el.classList.toggle('page--active', key === name);
    });
    if (pages[name]) pages[name].scrollTop = 0;
  }

  // ── Begin reading (from main form) ─────────────────
  document.getElementById('btnBeginReading').addEventListener('click', async () => {
    const data = window.FormModule.getData();
    if (!data.name || !data.theme || !data.question) return;

    // Daily limit check
    const limitResult = window.DailyLimit?.check(data.theme, data.spread);
    if (limitResult === 'blocked') {
      window.FormModule.close();
      window.DailyLimit.showBlocked(data.theme);
      return;
    }
    if (limitResult === 'warn') {
      const proceed = await window.DailyLimit.showWarning(data.theme);
      if (!proceed) return;
    }

    window.FormModule.close(true);

    function executeWarpAndRead() {
      const particles = window.Particles;
      const hasWarp = particles && particles.triggerWarp;

      if (hasWarp) {
        particles.triggerWarp(3000); // Trigger visual warp and make it last longer

        const landingCenter = document.querySelector('.landing-center');
        if (landingCenter) {
          landingCenter.style.transition = 'transform 1.0s cubic-bezier(0.5, 0, 0.5, 1), opacity 0.8s';
          landingCenter.style.transform = 'scale(1.4) translateY(-30px)';
          landingCenter.style.opacity = '0';
          landingCenter.style.pointerEvents = 'none';
        }
      }

      setTimeout(() => {
        if (window.triggerLightning) window.triggerLightning();
        showPage('reading');
        window.ReadingModule.init(data);

        if (hasWarp) {
          setTimeout(() => {
            const landingCenter = document.querySelector('.landing-center');
            if (landingCenter) {
              landingCenter.style.transform = '';
              landingCenter.style.opacity = '1';
              landingCenter.style.transition = '';
              landingCenter.style.pointerEvents = 'all';
            }
          }, 1000);
        }
      }, hasWarp ? 2800 : 300);
    }

    const focusScreen = document.getElementById('focusScreen');
    const focusText = document.getElementById('focusText');

    if (focusScreen && focusText) {
      focusText.innerHTML = `Hãy nghiêm túc tập trung suy nghĩ và tự trả lời...<br><br><span style="color:var(--c-gold); font-size:1.4rem; font-style:italic">"${data.question}"</span><br><br><span style="font-size:0.85rem; opacity:0.5; font-family:'EB Garamond',serif">Chấp tâm trong khoảnh khắc, vũ trụ đang lắng nghe...</span>`;
      focusScreen.classList.add('active');
      setTimeout(() => {
        focusScreen.classList.remove('active');
        setTimeout(executeWarpAndRead, 1100);
      }, 10000);
    } else {
      executeWarpAndRead();
    }
  });

  // ── Go to analysis ─────────────────────────────────
  document.getElementById('btnGoAnalysis').addEventListener('click', () => {
    const cards = window.ReadingModule.getSelectedCards();
    const session = window.ReadingModule.getSession();
    // Record AFTER reading is complete
    window.DailyLimit?.record(session.theme, session.spread);
    session.localId = window.HistoryModule?.save(session, cards);
    showPage('analysis');
    setTimeout(() => window.AnalysisModule.render(cards, session), 200);
  });


  // ── Initial state / Share Link ─────────────────────
  const urlParams = new URLSearchParams(window.location.search);
  const shareId = urlParams.get('share');

  if (shareId) {
    showPage('analysis');
    loadSharedReading(shareId);
  } else {
    showPage('landing');
  }

  async function loadSharedReading(id) {
    const contentEl = document.getElementById('analysisContent');
    contentEl.innerHTML = `
      <div class="ai-loading">
        <div class="ai-pulse"></div>
        <span>Đang tải thông điệp…</span>
      </div>`;

    try {
      const res = await fetch(`https://ka-en.com.vn/tarot_api/get_reading.php?id=${id}`);
      if (!res.ok) throw new Error("Không tìm thấy kết quả hoặc kết nối lỗi.");
      const data = await res.json();

      const session = {
        name: data.name,
        dob: data.dob,
        theme: data.theme,
        question: data.question,
        spread: data.spread_count,
        isSharedReplay: true,
        readingId: id
      };

      // Map API cards to app format
      const cards = data.cards.map(c => {
        const fullCard = window.TAROT_DB ? window.TAROT_DB.find(db => db.id === c.id || db.name === c.name) : null;
        return {
          id: c.id,
          name: c.name,
          nameVi: c.name_vi,
          number: fullCard ? fullCard.number : '',
          image: fullCard ? fullCard.image : `cards/${c.id || c.name.toLowerCase().replace(/\s+/g, '')}.jpg`,
          isReversed: c.is_reversed === 1 || c.is_reversed === true,
          upright: fullCard ? (fullCard.generalUpright || fullCard.upright) : c.meaning,
          reversed: fullCard ? (fullCard.generalReversed || fullCard.reversed) : c.meaning,
          keywords: fullCard ? fullCard.keywords : [],
          keywordsRev: fullCard ? fullCard.keywordsRev : [],
          planet: fullCard?.planet,
          zodiac: fullCard?.zodiac,
          element: fullCard?.element,
          numerology: fullCard?.numerology,
          aspects: fullCard?.aspects,
          advice: fullCard?.advice
        };
      });

      window.AnalysisModule.render(cards, session, data.gemini_analysis);

    } catch (err) {
      console.error("Lỗi tải share:", err);
      document.getElementById('analysisContent').innerHTML = '';
      showPage('landing');
      window.showMysticalAlert(
        "Thông điệp bị ẩn",
        "Vũ trụ không tìm thấy tín hiệu hoặc thông điệp này đã được ẩn đi. Xin hãy trở lại nơi bắt đầu.",
        "Quay Về",
        null,
        3000
      );
    }
  }

  // ── Top Topics Chart ─────────────────────────────────
  const THEME_LABEL = {
    love: 'Tình Yêu', ex: 'Người Yêu Cũ', current_love: 'Người Yêu Hiện Tại',
    ambiguous: 'Mối Quan Hệ Mập Mờ', crush: 'Crush / Thầm Thích',
    future_love: 'Tình Duyên Tương Lai', someone: 'Người Ấy',
    marriage: 'Hôn Nhân', conflict: 'Giải Quyết Xung Đột',
    breakup: 'Chia Tay & Hàn Gắn', long_distance: 'Yêu Xa',
    jealousy: 'Người Thứ Ba / Ghen Tuông', self_love: 'Yêu Bản Thân',
    finding_love: 'Tìm Kiếm Tình Yêu', compatibility: 'Độ Tương Hợp',
    toxic_relationship: 'Q/hệ Độc Hại', soulmate: 'Tri Kỷ / Soulmate', reconciliation: 'Gương Vỡ Lại Lành', secret_admirer: 'Người Thầm Thương',
    friendship: 'Tình Bạn / Tri Kỷ', pregnancy: 'Con Cái / Thai Kỳ', gossip: 'Thị Phi / Đàm Tiếu', family: 'Gia Đình',
    career: 'Sự Nghiệp', job_search: 'Xin Việc Làm', promotion: 'Thăng Tiến',
    business: 'Kinh Doanh / Khởi Nghiệp', colleague: 'Quan Hệ Đồng Nghiệp',
    career_change: 'Chuyển Nghề', freelance: 'Freelance / Tự Do', interview: 'Phỏng Vấn',
    legal: 'Pháp Lý / Giấy Tờ', moving: 'Chuyển Chỗ',
    burnout: 'Kiệt Sức', startup: 'Khởi Nghiệp', workplace_politics: 'Thị Phi Công Sở', side_hustle: 'Nghề Tay Trái',
    finance: 'Tài Chính', investment: 'Đầu Tư / Chứng Khoán',
    debt: 'Nợ Nần / Vay Mượn', savings: 'Tiết Kiệm & Tích Lũy', luck_money: 'Lộc Tài / May Mắn',
    real_estate: 'Bất Động Sản', financial_loss: 'Thua Lỗ', sudden_wealth: 'Vận May Bất Ngờ',
    health: 'Sức Khỏe', mental: 'Sức Khỏe Tâm Thần', energy: 'Năng Lượng & Chakra',
    diet: 'Điều Độ / Chăm Sóc Bản Thân', pet: 'Thú Cưng',
    healing: 'Chữa Lành Tâm Hồn', stress: 'Căng Thẳng', trauma: 'Tổn Thương Quá Khứ',
    study: 'Học Tập', study_abroad: 'Du Học', self: 'Bản Thân',
    purpose: 'Sứ Mệnh / Mục Đích Sống', shadow_self: 'Bóng Tối Nội Tâm',
    decision: 'Ra Quyết Định', travel: 'Du Lịch / Di Chuyển', spiritual: 'Tâm Linh',
    dream: 'Giải Mã Giấc Mơ', past_life: 'Tiền Kiếp', karma: 'Nghiệp Quả (Karma)', lost_item: 'Tìm Đồ Thất Lạc',
    exams: 'Thi Cử', scholarship: 'Học Bổng', talent: 'Năng Khiếu', spirit_guide: 'Thần Hộ Mệnh',
    general: 'Tổng Quát', more: 'Tổng Quát'
  };

  const btnTopTopics = document.getElementById('btnTopTopics');
  const topTopicsModal = document.getElementById('topTopicsModal');
  const topicsChartCanvas = document.getElementById('topicsChart');
  const topTopicsLoading = document.getElementById('topTopicsLoading');
  let topTopicsChartInstance = null;

  if (btnTopTopics && topTopicsModal && topicsChartCanvas) {
    btnTopTopics.addEventListener('click', async () => {
      topTopicsModal.classList.add('visible');
      topTopicsLoading.style.display = 'block';
      topicsChartCanvas.style.display = 'none';

      try {
        const res = await fetch('https://ka-en.com.vn/tarot_api/get_top_topics.php');
        const json = await res.json();

        if (json.status === 'success') {
          topTopicsLoading.style.display = 'none';
          topicsChartCanvas.style.display = 'block';

          let getLabel = (t) => t;
          if (window.TarotHelper && window.TarotHelper.getThemeLabel) {
            getLabel = window.TarotHelper.getThemeLabel;
          } else {
            getLabel = (t) => THEME_LABEL[t] || t;
          }

          const labels = json.data.map(d => getLabel(d.theme));
          const counts = json.data.map(d => parseInt(d.count, 10));
          const totalCount = counts.reduce((sum, val) => sum + val, 0);
          const percentages = counts.map(count => ((count / totalCount) * 100).toFixed(1));

          if (topTopicsChartInstance) {
            topTopicsChartInstance.destroy();
          }

          Chart.defaults.color = 'rgba(232, 180, 255, 0.7)';
          Chart.defaults.font.family = "'EB Garamond', serif";

          const ctx = topicsChartCanvas.getContext('2d');

          // Trì hoãn một chút để CSS transition (fade-in) của modal chạy xong 
          // thì mới tạo chart, giúp hiệu ứng chạy từ 0 lên hiển thị trọn vẹn
          setTimeout(() => {
            topTopicsChartInstance = new Chart(ctx, {
              type: 'bar',
              data: {
                labels: labels,
                datasets: [{
                  label: 'Tỷ lệ %',
                  data: percentages,
                  backgroundColor: 'rgba(201, 168, 76, 0.6)',
                  borderColor: 'rgba(201, 168, 76, 1)',
                  borderWidth: 1,
                  borderRadius: 4
                }]
              },
              options: {
                indexAxis: 'y',
                animation: {
                  duration: 2000,
                  delay: 200,   // Thêm nhẹ delay để chắc chắn modal đã bung hết cỡ
                  easing: 'easeOutCubic',
                  x: {
                    from: 0
                  }
                },
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    backgroundColor: 'rgba(20, 10, 30, 0.9)',
                    titleColor: '#e8b4ff',
                    bodyColor: '#c9a84c',
                    borderColor: '#c9a84c',
                    borderWidth: 1,
                    padding: 10,
                    displayColors: false,
                    callbacks: {
                      label: (ctx) => `${ctx.raw}%`
                    }
                  }
                },
                scales: {
                  x: {
                    beginAtZero: true,
                    ticks: {
                      precision: 0,
                      callback: function (value) { return value + "%"; }
                    },
                    grid: { color: 'rgba(155, 48, 255, 0.1)' }
                  },
                  y: {
                    ticks: { font: { family: "'Philosopher', serif", size: 14 } },
                    grid: { display: false }
                  }
                }
              }
            });
          }, 350);
        }
      } catch (err) {
        console.error('Error fetching top topics:', err);
        topTopicsLoading.innerHTML = '<span style="color:var(--c-gold)">Không thể tải dữ liệu thống kê.</span>';
      }
    });
  }
})();
