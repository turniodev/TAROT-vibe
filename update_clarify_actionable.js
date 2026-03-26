const fs = require('fs');
const https = require('https');

const DATA_PATH = 'e:\\TAROT\\js\\clarify_data.js';
const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAdsyNguqHmReQ8cX_upLYRAkVDN-wCA58';

const LABELS = {
  love: 'Tình Yêu Tổng Quát',
  career: 'Sự Nghiệp Tổng Quát',
  finance: 'Tài Chính Tổng Quát',
  health: 'Sức Khỏe Tổng Quát',
  self: 'Bản Thân Tổng Quát',
  single: 'Độc Thân',
  ex: 'Người Yêu Cũ',
  current_love: 'Người Yêu Hiện Tại',
  ambiguous: 'Mối Quan Hệ Mập Mờ',
  crush: 'Crush / Thầm Thích',
  future_love: 'Người Yêu Tương Lai',
  someone: 'Người Ấy Nghĩ Gì Mề Mình',
  marriage: 'Hôn Nhân',
  conflict: 'Giải Quyết Xung Đột Tình Cảm',
  breakup: 'Chia Tay & Hàn Gắn',
  long_distance: 'Yêu Xa',
  jealousy: 'Người Thứ Ba / Ghen Tuông',
  self_love: 'Yêu Bản Thân',
  friendship: 'Tình Bạn / Tri Kỷ',
  pregnancy: 'Con Cái / Thai Kỳ',
  gossip: 'Thị Phi / Đàm Tiếu',
  toxic_relationship: 'Mối Quan Hệ Độc Hại',
  soulmate: 'Tri Kỷ / Soulmate',
  reconciliation: 'Gương Vỡ Lại Lành',
  secret_admirer: 'Người Thầm Thương',
  job_search: 'Xin Việc Làm',
  promotion: 'Thăng Tiến Không Gian Cơ Cấu',
  business: 'Kinh Doanh / Khởi Nghiệp Chung',
  colleague: 'Mối Quan Hệ Đồng Nghiệp',
  career_change: 'Chuyển Nghề',
  freelance: 'Freelance / Tự Do',
  interview: 'Phỏng Vấn',
  legal: 'Pháp Lý / Giấy Tờ',
  moving: 'Chuyển Chỗ / Xuất Ngoại',
  burnout: 'Kiệt Sức / Áp Lực Công Việc',
  startup: 'Khởi Nghiệp Đặc Thù',
  workplace_politics: 'Thị Phi Công Sở',
  side_hustle: 'Nghề Tay Trái',
  investment: 'Đầu Tư / Chứng Khoán',
  debt: 'Nợ Nần / Vay Mượn',
  savings: 'Tiết Kiệm & Tích Lũy',
  luck_money: 'Lộc Tài / May Mắn',
  real_estate: 'Bất Động Sản',
  financial_loss: 'Thua Lỗ / Khó Khăn Tài Chính',
  sudden_wealth: 'Vận May Tiền Bạc Bất Ngờ',
  mental: 'Sức Khỏe Tâm Thần',
  energy: 'Năng Lượng & Chakra',
  family: 'Vấn Đề Gia Đình',
  diet: 'Điều Độ / Chăm Sóc Bản Thân',
  pet: 'Thú Cưng',
  healing: 'Chữa Lành Tâm Hồn',
  stress: 'Căng Thẳng / Âu Lo',
  trauma: 'Tổn Thương Quá Khứ',
  study: 'Học Tập',
  study_abroad: 'Du Học',
  purpose: 'Sứ Mệnh / Mục Đích Sống',
  shadow_self: 'Bóng Tối Nội Tâm',
  decision: 'Ra Quyết Định',
  travel: 'Du Lịch / Di Chuyển',
  spiritual: 'Tâm Linh',
  dream: 'Giải Mã Giấc Mơ',
  past_life: 'Tiền Kiếp',
  karma: 'Nghiệp Quả (Karma)',
  lost_item: 'Tìm Đồ Thất Lạc',
  exams: 'Thi Cử / Kiểm Tra',
  scholarship: 'Học Bổng',
  talent: 'Năng Khiếu / Đam Mê',
  spirit_guide: 'Thông Điệp Từ Thần Hộ Mệnh'
};

async function callGemini(key, label) {
  return new Promise((resolve, reject) => {
    let promptStr = 'Bạn là một chuyên gia tâm lý học hành vi và bậc thầy Tarot.\\n';
    promptStr += 'Nhiệm vụ: Viết chính xác 20 câu hỏi Tự Tỉnh Thức (Có/Không) cho người xem Tarot.\\n';
    promptStr += `Chủ đề: [${label}] (Mã key: ${key}).\\n`;
    promptStr += 'YÊU CẦU CỰC KỲ QUAN TRỌNG: Các câu hỏi KHÔNG ĐƯỢC chỉ hỏi về "Cảm giác" chung chung (VD: "Bạn có buồn không", "Bạn có sợ hãi không").\\n';
    promptStr += 'MÀ PHẢI hỏi về CÁC HÀNH VI, HÀNH ĐỘNG, SỰ VIỆC CỤ THỂ ĐÃ DIỄN RA TRONG THỰC TẾ giúp vạch trần tâm lý thao túng hoặc tránh né của họ.\\n';
    promptStr += 'Ví dụ TỐT: "Gần đây bạn có hay thức giấc lúc 1-3h sáng và cuộn xem mạng xã hội vô thức để trốn tránh việc suy nghĩ về công việc?", "Bạn có đang liên tục bào chữa cho 1 hành động độc hại của người ấy lặp đi lặp lại 3 lần trong tháng này?", "Có phải bạn luôn chọn cách im lặng và bỏ đi mỗi khi có xung đột thay vì ngồi lại nói chuyện không?".\\n';
    promptStr += 'Ví dụ XẤU (Cần TRÁNH): "Bạn có đang buồn phiền vì quá khứ?", "Linh hồn bạn có gào thét không?". (Những câu này quá chung chung và hơi sến súa).\\n';
    promptStr += 'Giọng văn: Sắc bén, chọc trúng tim đen, thực tế, vạch trần hành vi.\\n';
    promptStr += '- Trả về DUY NHẤT một mảng JSON (Array) chứa đúng 20 chuỗi string (Tuyệt đối không có markdown ```json, không có text chào hỏi, chỉ Array).\\n';
    promptStr += '[\n  "Câu 1",\n  "Câu 2",\n  ...\n]';

    const payload = JSON.stringify({
      contents: [{ parts: [{ text: promptStr }] }],
      generationConfig: {
        temperature: 0.8,
        responseMimeType: "application/json"
      }
    });

    const options = {
      hostname: 'generativelanguage.googleapis.com',
      path: '/v1beta/models/gemini-2.5-flash:generateContent?key=' + API_KEY,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.error) {
            return reject(new Error(json.error.message));
          }
          let text = json.candidates[0].content.parts[0].text;
          text = text.replace(/^```(json)?/m, '').replace(/```$/m, '').trim();
          const result = JSON.parse(text);
          if (!Array.isArray(result) || result.length < 5) {
            throw new Error('Kết quả trả về không phải mảng JSON hợp lệ chứa các câu hỏi');
          }
          resolve(result);
        } catch (e) {
          reject(new Error("Lỗi Decode: " + e.message));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(payload);
    req.end();
  });
}

async function start() {
  console.log('Đọc file clarify_data.js...');
  let rawContent = fs.readFileSync(DATA_PATH, 'utf-8');
  let jsonStr = rawContent.replace('window.ClarifyData = ', '').trim();
  if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1);
  
  let db;
  try {
    db = new Function('return ' + jsonStr)();
  } catch (e) {
    console.error("Lỗi parse data: ", e);
    return;
  }

  const keysToUpdate = Object.keys(db); // Update all keys to the new actionable format

  console.log("Tổng số mảng cần sinh lại 20 câu hỏi mới theo format hành vi: " + keysToUpdate.length);

  const BATCH_SIZE = 5;
  for (let i = 0; i < keysToUpdate.length; i += BATCH_SIZE) {
    const batch = keysToUpdate.slice(i, i + BATCH_SIZE);
    console.log("\\n--- Mảng " + (Math.floor(i / BATCH_SIZE) + 1) + " ---");

    const promises = batch.map(async (key) => {
      const label = LABELS[key] || key;
      console.log("-> Đang xin gợi ý cho hệ: " + key + " (" + label + ")");
      for (let retries = 0; retries < 3; retries++) {
        try {
          const questions = await callGemini(key, label);
          db[key] = questions;
          console.log("[OK] Đã hoàn thành hệ: " + key + " (" + questions.length + " câu)");
          break;
        } catch (err) {
          console.error("[LỖI " + (retries + 1) + "] API hệ " + key + ": " + err.message);
          if (retries === 2) console.error("--> Bỏ qua hệ " + key);
          await new Promise(r => setTimeout(r, 2000));
        }
      }
    });

    await Promise.all(promises);
    fs.writeFileSync(DATA_PATH, 'window.ClarifyData = ' + JSON.stringify(db, null, 2) + ';\n', 'utf-8');
    console.log("Đã cập nhật file clarify_data.js an toàn. Đợi 2s...");
    await new Promise(r => setTimeout(r, 2000));
  }
  
  console.log("\\nHOÀN THÀNH TẠO LẠI DỮ LIỆU CLARIFY THEO FORMAT HÀNH VI THỰC TẾ!");
}

start();
