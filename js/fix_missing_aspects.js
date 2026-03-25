const fs = require('fs');
const https = require('https');

const API_KEY = process.env.GEMINI_API_KEY;
const dataJsPath = "E:/TAROT/js/data.js";

const allExpectedAspects = [
  'love', 'ex', 'current_love', 'ambiguous', 'crush', 'future_love', 'someone', 'marriage', 'conflict', 'breakup', 'long_distance', 'jealousy', 'self_love', 'career', 'job_search', 'promotion', 'business', 'colleague', 'career_change', 'freelance', 'interview', 'finance', 'investment', 'debt', 'savings', 'luck_money', 'health', 'mental', 'energy', 'family', 'diet', 'study', 'study_abroad', 'self', 'purpose', 'shadow_self', 'decision', 'travel', 'spiritual', 'general',
  'friendship', 'pregnancy', 'gossip', 'legal', 'moving', 'pet', 'dream', 'past_life', 'karma', 'lost_item'
];

function parseDB(content) {
    const match = content.match(/window\.TAROT_DB\s*=\s*(\[[\s\S]*\]);?/);
    if (match) {
        let jsonStr = match[1].replace(/,(?=\s*[}\]])/g, "");
        return JSON.parse(jsonStr);
    }
    return [];
}

async function generateAll50Aspects(cardName, cardNameVi) {
    const prompt = `Bạn là chuyên gia Tarot. Hãy viết trọn vẹn 50 khía cạnh (aspects) cho lá bài "${cardName}" (${cardNameVi}). 
    
BẮT BUỘC trả về ĐÚNG 50 keys sau đây (không thừa không thiếu):
${allExpectedAspects.join(', ')}

Yêu cầu:
- Mỗi key phải là một object chứa 2 key con: 'upright' (xuôi) và 'reversed' (ngược).
- Lời văn trau chuốt, thơ mộng, sắc bén và bám sát ý nghĩa gốc của lá ${cardName}.
- TRẢ VỀ CHỈ JSON HỢP LỆ, KHÔNG DÙNG MARKDOWN (không có \`\`\`json).`;

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
    if (!API_KEY) return console.error("Lỗi: Thiếu GEMINI_API_KEY");
    try {
        let db = parseDB(fs.readFileSync(dataJsPath, 'utf8'));

        // Lọc ra các lá bị thiếu bất kỳ trường nào trong 50 trường
        let cardsToProcess = db.filter(card => {
            if (!card.aspects) return true;
            return !allExpectedAspects.every(k => card.aspects[k] && card.aspects[k].upright && card.aspects[k].reversed);
        });

        console.log(`Phát hiện ${cardsToProcess.length} lá bài cần vá dữ liệu (chạy 5 luồng đồng thời)...`);

        const CONCURRENCY = 5;
        for (let i = 0; i < cardsToProcess.length; i += CONCURRENCY) {
            const batch = cardsToProcess.slice(i, i + CONCURRENCY);
            console.log(`Đang xử lý đồng loạt các lá: ${batch.map(c => c.name).join(', ')}`);
            
            const promises = batch.map(async (card) => {
                try {
                    const newAspects = await generateAll50Aspects(card.name, card.nameVi);
                    // Merge dữ liệu mới vào, đè lên những phần cũ bị thiếu/lỗi
                    card.aspects = { ...card.aspects, ...newAspects };
                    console.log(` -> XONG: ${card.name}`);
                } catch (err) {
                    console.error(` -> LỖI ${card.name}: ${err.message}`);
                }
            });
            
            await Promise.all(promises);
            
            // Ghi đè vào file gốc sau khi xong 5 lá
            for (const card of batch) {
                const index = db.findIndex(c => c.id === card.id);
                if (index !== -1) db[index] = card;
            }
            fs.writeFileSync(dataJsPath, "window.TAROT_DB = " + JSON.stringify(db, null, 2) + ";\\n", 'utf8');
        }
        console.log("Hoàn thành vá 100% dữ liệu!");
    } catch (error) { console.error("Lỗi:", error); }
}
main();