const fs = require('fs');
const https = require('https');

const API_KEY = process.env.GEMINI_API_KEY;
const dataJsPath = "E:/TAROT/js/data.js";
const testJsPath = "E:/TAROT/js/data_test.js";

function parseDB(content) {
    const match = content.match(/window\.TAROT_DB\s*=\s*(\[[\s\S]*\]);?/);
    if (match) {
        let jsonStr = match[1].replace(/,(?=\s*[}\]])/g, "");
        return JSON.parse(jsonStr);
    }
    return [];
}

async function generateAspects(cardName, cardNameVi, referenceAspects) {
    const prompt = `Bạn là chuyên gia Tarot. Viết phần 'aspects' cho lá "${cardName}" (${cardNameVi}) giống hệt cấu trúc của lá The Fool. BẮT BUỘC giữ nguyên tất cả keys. Trả về CHỈ JSON HỢP LỆ, KHÔNG DÙNG MARKDOWN.\nMẫu:\n${JSON.stringify(referenceAspects)}`;
    const data = JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { response_mime_type: "application/json", temperature: 0.7 }
    });

    return new Promise((resolve, reject) => {
        const req = https.request({
            hostname: 'generativelanguage.googleapis.com',
            path: `/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }
        }, (res) => {
            const chunks = [];
            res.on('data', chunk => chunks.push(chunk));
            res.on('end', () => {
                try {
                    const body = Buffer.concat(chunks).toString('utf8');
                    const json = JSON.parse(body);
                    if (json.error) return reject(new Error(json.error.message));
                    resolve(JSON.parse(json.candidates[0].content.parts[0].text));
                } catch (e) { reject(e); }
            });
        });
        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

async function main() {
    if (!API_KEY) return console.error("Thiếu GEMINI_API_KEY");
    try {
        const refAspects = parseDB(fs.readFileSync(testJsPath, 'utf8'))[0].aspects;
        let db = parseDB(fs.readFileSync(dataJsPath, 'utf8'));

        console.log("Bắt đầu chạy ĐA LUỒNG (Nhanh gấp 3 lần)...");
        const CONCURRENCY = 3; // Xử lý song song 3 lá cùng lúc
        
        for (let i = 1; i < db.length; i += CONCURRENCY) {
            const batch = db.slice(i, i + CONCURRENCY);
            const promises = batch.map(async (card) => {
                const aspectKeys = Object.keys(card.aspects || {});
                const hasError = JSON.stringify(card.aspects || {}).includes('');
                if (aspectKeys.length < 35 || hasError) {
                    console.log(`Đang xử lý: ${card.name}...`);
                    try {
                        card.aspects = await generateAspects(card.name, card.nameVi, refAspects);
                        console.log(` -> Xong lá: ${card.name}`);
                    } catch (err) {
                        console.error(` -> Lỗi lá ${card.name}: ${err.message}`);
                    }
                }
            });
            await Promise.all(promises);
            // Ghi file sau mỗi đợt 3 lá
            fs.writeFileSync(dataJsPath, "window.TAROT_DB = " + JSON.stringify(db, null, 2) + ";\n", 'utf8');
        }
        console.log("Hoàn thành toàn bộ tiến trình Tarot!");
    } catch (error) { console.error("Lỗi:", error); }
}
main();