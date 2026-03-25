const fs = require('fs');
const https = require('https');

const API_KEY = "AIzaSyCLj6IKyn0SOZjUU5ekqlrwx6jiKDvNccg";
const dataJsPath = "E:/TAROT/js/data.js";
const testJsPath = "E:/TAROT/js/data_test.js";

// Trích xuất mảng từ file js
function parseDB(content) {
    const match = content.match(/window\.TAROT_DB\s*=\s*(\[[\s\S]*\]);?/);
    if (match) {
        // Xử lý json bị lỗi do dấu phẩy dư ở cuối array hoặc object (JSON.parse không chịu dấu phẩy thừa)
        let jsonStr = match[1].replace(/,(?=\s*[}\]])/g, "");
        return JSON.parse(jsonStr);
    }
    return [];
}

async function generateAspects(cardName, cardNameVi, referenceAspects) {
    const prompt = `Bạn là một chuyên gia Tarot xuất sắc. Dựa vào cấu trúc object 'aspects' cực kỳ chi tiết của lá The Fool dưới đây, hãy viết phần 'aspects' với cấu trúc y hệt cho lá bài "${cardName}" (${cardNameVi}).
    
    Yêu cầu:
    - BẮT BUỘC giữ nguyên tất cả các key (love, ex, current_love, ambiguous, crush, future_love, someone, marriage, conflict, breakup, long_distance, jealousy, self_love, career, job_search, promotion, business, colleague, career_change, freelance, interview, finance, investment, debt, savings, luck_money, health, mental, energy, family, diet, study, study_abroad, self, purpose, shadow_self, decision, travel, spiritual, general).
    - Mỗi key phải là một object chứa 2 key con: 'upright' (xuôi) và 'reversed' (ngược).
    - Lời văn cần trau chuốt, thơ mộng, sắc bén và bám sát ý nghĩa gốc chuẩn của lá ${cardName}.
    - TRẢ VỀ CHỈ JSON HỢP LỆ, KHÔNG DÙNG MARKDOWN CODE BLOCK (không có \`\`\`json), KHÔNG CÓ TEXT NÀO KHÁC BÊN NGOÀI.

    Mẫu cấu trúc của The Fool (hãy học theo văn phong này):
    ${JSON.stringify(referenceAspects)}
    `;

    const data = JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: "application/json" }
    });

    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'generativelanguage.googleapis.com',
            path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        }, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    if (json.error) return reject(new Error(json.error.message));
                    const text = json.candidates[0].content.parts[0].text;
                    resolve(JSON.parse(text));
                } catch (e) {
                    reject(e);
                }
            });
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function main() {
    try {
        const testContent = fs.readFileSync(testJsPath, 'utf8');
        const testDB = parseDB(testContent);
        const refAspects = testDB[0].aspects;

        let dataContent = fs.readFileSync(dataJsPath, 'utf8');
        const db = parseDB(dataContent);

        console.log("Bắt đầu tiến trình tự động viết dữ liệu Tarot...");
        for (let i = 1; i < db.length; i++) {
            const card = db[i];
            const aspectKeys = Object.keys(card.aspects || {});
            
            // Nếu số lượng key ít hơn cấu trúc chuẩn (~40 keys) thì tiến hành tạo mới
            if (aspectKeys.length < 35) {
                console.log(`[${i}/${db.length-1}] Đang tạo dữ liệu cho lá: ${card.name} (${card.nameVi})...`);
                try {
                    const newAspects = await generateAspects(card.name, card.nameVi, refAspects);
                    card.aspects = newAspects;
                    
                    // Lưu trực tiếp vào file sau mỗi lá hoàn thành
                    const newFileContent = "window.TAROT_DB = " + JSON.stringify(db, null, 2) + ";\n";
                    fs.writeFileSync(dataJsPath, newFileContent, 'utf8');
                    console.log(` -> Đã lưu thành công lá ${card.name}.`);
                    
                    // Delay để tránh bị rate limit của API
                    await new Promise(r => setTimeout(r, 4500));
                } catch (err) {
                    console.error(` -> LỖI ở lá ${card.name}:`, err.message);
                    // Dừng lại nếu lỗi API nặng
                    if (err.message.includes('API key not valid') || err.message.includes('quota')) break;
                }
            } else {
                console.log(`[${i}/${db.length-1}] Bỏ qua lá ${card.name} (đã đầy đủ dữ liệu)`);
            }
        }
        console.log("Tiến trình hoàn tất hoặc tạm dừng do lỗi!");
    } catch (error) {
        console.error("Lỗi hệ thống:", error);
    }
}

main();