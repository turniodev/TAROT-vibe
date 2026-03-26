const fs = require('fs');
const https = require('https');

const DATA_PATH = 'e:\\\\TAROT\\\\js\\\\data.js';
const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyAdsyNguqHmReQ8cX_upLYRAkVDN-wCA58';

const NEW_ASPECTS = [
  'toxic_relationship', 'soulmate', 'reconciliation', 'secret_admirer',
  'burnout', 'startup', 'workplace_politics', 'side_hustle',
  'real_estate', 'financial_loss', 'sudden_wealth',
  'healing', 'stress', 'trauma',
  'exams', 'scholarship', 'talent', 'spirit_guide'
];

async function callGemini(card) {
  return new Promise((resolve, reject) => {
    let promptStr = 'Bạn là một chuyên gia Tarot xuất sắc.\\n';
    promptStr += 'Nhiệm vụ: Viết luận giải (Ý nghĩa Xuôi và Ngược) cho 18 khía cạnh mới của lá bài Tarot "' + card.name + '" (' + card.nameVi + ').\\n';
    promptStr += 'Yêu cầu:\\n';
    promptStr += '- Câu từ phải sắc sảo, mang màu sắc tâm linh (mystical), sâu sắc.\\n';
    promptStr += '- Bám SÁT ý nghĩa gốc của lá bài (đặc biệt chú ý ý nghĩa ngược phải hợp lý, không chỉ đơn thuần là phủ định).\\n';
    promptStr += '- Trả về DUY NHẤT một chuỗi JSON hợp lệ, có cấu trúc KEY-VALUE như sau (tuyệt đối không có markdown):\\n\\n{\\n';

    for (let i = 0; i < NEW_ASPECTS.length; i++) {
      promptStr += '  "' + NEW_ASPECTS[i] + '": { "upright": "...", "reversed": "..." }';
      if (i < NEW_ASPECTS.length - 1) promptStr += ',\\n';
      else promptStr += '\\n';
    }
    promptStr += '}\\n';

    const payload = JSON.stringify({
      contents: [{ parts: [{ text: promptStr }] }],
      generationConfig: {
        temperature: 0.7,
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
            console.error("API Error details:", json.error);
            return reject(new Error(json.error.message));
          }
          let text = json.candidates[0].content.parts[0].text;
          text = text.replace(/^```(json)?/m, '').replace(/```$/m, '').trim();
          const result = JSON.parse(text);
          resolve(result);
        } catch (e) {
          console.error("[LỖI] Parse JSON trả về cho lá " + card.id + ": " + e.message);
          reject(e);
        }
      });
    });

    req.on('error', (e) => reject(e));
    req.write(payload);
    req.end();
  });
}

async function start() {
  console.log('Đọc data.js...');
  let rawContent = fs.readFileSync(DATA_PATH, 'utf-8');

  let db;
  try {
    const startIdx = rawContent.indexOf('[');
    const endIdx = rawContent.lastIndexOf(']');
    const jsonStr = rawContent.substring(startIdx, endIdx + 1);
    db = JSON.parse(jsonStr);
  } catch (e) {
    console.error("Lỗi parse data.js (JSON.parse). Bỏ qua lỗi và thoát.", e.message);
    return;
  }

  const cardsToUpdate = db.filter(c => {
    if (!c.aspects) return true;
    for (const key of NEW_ASPECTS) {
      if (!c.aspects[key] || !c.aspects[key].upright) return true;
    }
    return false;
  });

  console.log("Tổng số lá bài cần update: " + cardsToUpdate.length);
  if (cardsToUpdate.length === 0) {
    console.log('Đã cập nhật đầy đủ 78 lá bài!');
    return;
  }

  const BATCH_SIZE = 5;
  for (let i = 0; i < cardsToUpdate.length; i += BATCH_SIZE) {
    const batch = cardsToUpdate.slice(i, i + BATCH_SIZE);
    console.log("\\n--- Đang xử lý Batch " + (Math.floor(i / BATCH_SIZE) + 1) + " (Bài: " + batch.map(c => c.id).join(', ') + ") ---");

    const promises = batch.map(async (card) => {
      console.log("-> Đang gọi API cho lá: " + card.id + " - " + card.name);
      for (let retries = 0; retries < 3; retries++) {
        try {
          const generatedAspects = await callGemini(card);
          let count = 0;

          const dbCard = db.find(c => c.id === card.id);
          if (dbCard) {
            if (!dbCard.aspects) dbCard.aspects = {};
            for (const key of NEW_ASPECTS) {
              if (generatedAspects[key] && generatedAspects[key].upright && generatedAspects[key].reversed) {
                dbCard.aspects[key] = generatedAspects[key];
                count++;
              }
            }
          }
          console.log("[OK] Đã cấu trúc xong lá " + card.id + " (" + count + "/" + NEW_ASPECTS.length + " khía cạnh)");
          break; // Success, break retry loop
        } catch (err) {
          console.error("[LỖI LẦN " + (retries + 1) + "] API lá " + card.id + ": " + err.message);
          if (retries === 2) console.error("--> Bỏ qua lá " + card.id);
          await new Promise(r => setTimeout(r, 2000));
        }
      }
    });

    await Promise.all(promises);

    const newContent = 'window.TAROT_DB = ' + JSON.stringify(db, null, 2) + ';\\n';
    fs.writeFileSync(DATA_PATH, newContent, 'utf-8');
    console.log("Lưu file data.js thành công. Chờ 3 giây...");
    await new Promise(r => setTimeout(r, 3000));
  }

  console.log("\\nHOÀN THÀNH TOÀN BỘ.");
}

start();
