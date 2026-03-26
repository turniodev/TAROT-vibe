const fs = require('fs');
const https = require('https');

const DATA_PATH = 'e:\\\\TAROT\\\\js\\\\data.js';
const OUTPUT_PATH = 'e:\\\\TAROT\\\\js\\\\daily_messages.js';
const TEMP_JSON = 'e:\\\\TAROT\\\\daily_messages_temp.json';

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAdsyNguqHmReQ8cX_upLYRAkVDN-wCA58';

async function callGemini(card) {
  return new Promise((resolve, reject) => {
    let promptStr = `Bạn là một chuyên gia Tarot xuất sắc.
Nhiệm vụ: Viết 10 thông điệp truyền cảm hứng (xuôi) và 10 thông điệp cảnh tỉnh (ngược) ngắn gọn, súc tích (1-3 câu mỗi thông điệp) dùng cho tính năng 'Lá Bài Trong Ngày' (Daily Draw tarot insight) của lá bài "${card.name}" (${card.nameVi}).
Yêu cầu:
- Nữ hoàng gươm, kỵ sĩ v.v thì dùng ngôn từ sắc sảo, mang màu sắc tâm linh (mystical) và phù hợp.
- Bám SÁT ý nghĩa gốc của lá bài. Ý nghĩa ngược phải mang tính cảnh báo, khuyên răn hợp lý, không chỉ đơn thuần là phủ định.
- Trả về DUY NHẤT một chuỗi JSON hợp lệ, có cấu trúc như sau (tuyệt đối không bọc markdown \`\`\`json):
{
  "upright": ["thông điệp 1", "thông điệp 2", "thông điệp 3", "thông điệp 4", "thông điệp 5", "thông điệp 6", "thông điệp 7", "thông điệp 8", "thông điệp 9", "thông điệp 10"],
  "reversed": ["thông điệp ngược 1", "thông điệp ngược 2", "thông điệp ngược 3", "thông điệp 4", "thông điệp 5", "thông điệp 6", "thông điệp 7", "thông điệp 8", "thông điệp 9", "thông điệp 10"]
}`;

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
          if (!json.candidates || json.candidates.length === 0) {
              return reject(new Error("No candidates returned"));
          }
          let text = json.candidates[0].content.parts[0].text;
          text = text.replace(/^```(json)?/m, '').replace(/```$/m, '').trim();
          const result = JSON.parse(text);
          if (!result.upright || result.upright.length < 10 || !result.reversed || result.reversed.length < 10) {
              return reject(new Error("Missing 10 up or rev items in JSON"));
          }
          resolve(result);
        } catch (e) {
          reject(new Error("Parse JSON failed: " + e.message + " - Raw: " + data.substring(0, 100)));
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(payload);
    req.end();
  });
}

async function start() {
  console.log('Đọc data.js để lấy danh sách thẻ...');
  let rawContent = fs.readFileSync(DATA_PATH, 'utf-8');
  let db;
  try {
    const startIdx = rawContent.indexOf('[');
    const endIdx = rawContent.lastIndexOf(']');
    const jsonStr = rawContent.substring(startIdx, endIdx + 1);
    db = JSON.parse(jsonStr);
  } catch (e) {
    console.error("Lỗi parse data.js. Dừng.", e.message);
    return;
  }

  // Load existing temp file to resume if crashed
  let messagesDb = {};
  if (fs.existsSync(TEMP_JSON)) {
    try {
      messagesDb = JSON.parse(fs.readFileSync(TEMP_JSON, 'utf-8'));
      console.log(`Đã load ${Object.keys(messagesDb).length} lá từ file tạm.`);
    } catch(e) {}
  }

  const cardsToUpdate = db.filter(c => !messagesDb[c.id]);

  console.log("Tổng số lá bài cần lấy messages: " + cardsToUpdate.length);
  if (cardsToUpdate.length === 0) {
    console.log('Đã có đủ data cho 78 lá. Đang ghi file...');
    exportToJS(messagesDb);
    return;
  }

  const BATCH_SIZE = 10; // Cấu hình 10 concurrent requests
  for (let i = 0; i < cardsToUpdate.length; i += BATCH_SIZE) {
    const batch = cardsToUpdate.slice(i, i + BATCH_SIZE);
    console.log(`\n--- Đang xử lý Batch ${Math.floor(i / BATCH_SIZE) + 1} (Bài: ${batch.map(c => c.id).join(', ')}) ---`);

    const promises = batch.map(async (card) => {
      console.log(`-> Đang gọi API cho lá: ${card.id} - ${card.nameVi}`);
      for (let retries = 0; retries < 3; retries++) {
        try {
          const generatedData = await callGemini(card);
          messagesDb[card.id] = generatedData;
          console.log(`[OK] Lá ${card.id} thành công.`);
          break; 
        } catch (err) {
          console.error(`[LỖI LẦN ${retries + 1}] API lá ${card.id}: ${err.message}`);
          if (retries === 2) {
              console.error(`--> Bỏ qua lá ${card.id}`);
          } else {
              await new Promise(r => setTimeout(r, 2000));
          }
        }
      }
    });

    await Promise.all(promises);

    // Save temp progress after each batch
    fs.writeFileSync(TEMP_JSON, JSON.stringify(messagesDb, null, 2), 'utf-8');
    
    // Slight pause to not hammer the API too hard between batches
    console.log("Nghỉ 2 giây trước batch tiếp theo...");
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log("\nHOÀN THÀNH TOÀN BỘ. Xuất ra JS...");
  exportToJS(messagesDb);
}

function exportToJS(messagesDb) {
  const content = `// js/daily_messages.js - 10 Upright and 10 Reversed AI-generated messages for 78 Tarot cards

window.DAILY_MESSAGES = ${JSON.stringify(messagesDb, null, 2)};

// Generic fallback handler
window.getDailyMessage = function(cardId, isReversed) {
  const data = window.DAILY_MESSAGES[cardId];
  if (data) {
    const list = isReversed ? data.reversed : data.upright;
    return list[Math.floor(Math.random() * list.length)];
  }
  return isReversed ? "Lá bài bị ngược." : "Lá bài xuôi.";
};
`;

  fs.writeFileSync(OUTPUT_PATH, content, 'utf-8');
  console.log("Đã xuất " + OUTPUT_PATH + " thành công!");
  
  if(fs.existsSync(TEMP_JSON)) fs.unlinkSync(TEMP_JSON);
}

start();
