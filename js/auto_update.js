const fs = require('fs');
const https = require('https');

// Đọc API Key từ biến môi trường (Environment Variable) để bảo mật, không hardcode vào file.
const API_KEY = process.env.GEMINI_API_KEY;
const dataJsPath = "E:/TAROT/js/data.js";
const testJsPath = "E:/TAROT/js/data_test.js";

function parseDB(content) {
    const match = content.match(/window\.TAROT_DB\s*=\s*(\[[\s\S]*\]);?/);
    if (match) {
        // Dọn dẹp lỗi dấu phẩy thừa ở cuối array/object
        let jsonStr = match[1].replace(/,(?=\s*[}\]])/g, "");
        return JSON.parse(jsonStr);
    }
    return [];
}

async function generateAspects(cardName, cardNameVi, referenceAspects) {
    const prompt = `Bạn là chuyên gia Tarot. Dựa vào cấu trúc 'aspects' cực kỳ chi tiết của lá The Fool, hãy viết phần 'aspects' cho lá "${cardName}" (${cardNameVi}). BẮT BUỘC giữ nguyên tất cả keys. Mỗi key chứa 'upright' và 'reversed'. Lời văn trau chuốt, thơ mộng, sắc bén và thực tế. TRẢ VỀ CHỈ JSON HỢP LỆ, KHÔNG DÙNG MARKDOWN (không có \`\`\`json). Mẫu cấu trúc:\n${JSON.stringify(referenceAspects)}`;
    
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
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
                try {
                    const body = Buffer.concat(chunks).toString('utf8');
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
    if (!API_KEY) {
        console.error("Lỗi: Không tìm thấy GEMINI_API_KEY trong Environment Variables.");
        return;
    }
    
    try {
        const testContent = fs.readFileSync(testJsPath, 'utf8');
        const testDB = parseDB(testContent);
        const refAspects = testDB[0].aspects;

        let dataContent = fs.readFileSync(dataJsPath, 'utf8');
        const db = parseDB(dataContent);

        console.log("Bắt đầu tiến trình chạy bù dữ liệu Tarot...");
        for (let i = 1; i < db.length; i++) {
            const card = db[i];
            const aspectKeys = Object.keys(card.aspects || {});
            const hasEncodingError = JSON.stringify(card.aspects || {}).includes('');
            
            // Lọc ra các lá bị thiếu dữ liệu hoặc bị lỗi font chữ do cắt ghép chuỗi
            if (aspectKeys.length < 35 || hasEncodingError) {
                console.log(`[${i}/${db.length-1}] Đang bù dữ liệu cho lá: ${card.name} (${card.nameVi})...`);
                try {
                    const newAspects = await generateAspects(card.name, card.nameVi, refAspects);
                    card.aspects = newAspects;
                    
                    fs.writeFileSync(dataJsPath, "window.TAROT_DB = " + JSON.stringify(db, null, 2) + ";\n", 'utf8');
                    console.log(` -> Đã lưu thành công lá ${card.name}.`);
                    
                    // Delay tránh rate limit
                    await new Promise(r => setTimeout(r, 4000));
                } catch (err) {
                    console.error(` -> LỖI ở lá ${card.name}:`, err.message);
                }
            } else {
                console.log(`[${i}/${db.length-1}] Bỏ qua lá ${card.name} (đã đầy đủ dữ liệu).`);
            }
        }
        console.log("Tiến trình chạy bù hoàn tất!");
    } catch (error) {
        console.error("Lỗi hệ thống:", error);
    }
}

main();