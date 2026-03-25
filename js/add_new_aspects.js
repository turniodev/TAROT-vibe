const fs = require('fs');
const https = require('https');

const API_KEY = process.env.GEMINI_API_KEY || "AIzaSyCTSJflC3WaGpi1ys8v45l-rU_G1eUpYmc";
const dataJsPath = "E:/TAROT/js/data.js";

const newAspectsTemplate = {
  "friendship": {
    "upright": "Một tình bạn mới chớm nở mang đầy khí chất ngây ngô và tiếng cười ròn rã. Bạn đang thu hút những tâm hồn tự do, không màng phán xét, đến bên đời để cùng nhau chia sớt những niềm vui giản đơn nhất.",
    "reversed": "Cẩn trọng một sự kết giao dễ dãi mà không tìm hiểu kỹ bề sâu. Sự ỷ lại, vô tư quá trớn của một người bạn đang dần biến thành gánh nặng oái oăm làm sứt mẻ tình thâm."
  },
  "pregnancy": {
    "upright": "Điềm báo của một khởi nguồn sinh mệnh đang tượng hình hoặc mong mỏi sinh con chuẩn bị bước sang trang mới tươi sáng. Sự ngây thơ của thiên thần nhỏ đang vẫy gọi tình mẫu tử/phụ tử tràn đầy hân hoan.",
    "reversed": "Hãy cẩn trọng những sơ suất sinh hoạt thường nhật làm ảnh hưởng đến kế hoạch gia đình. Nếu chưa sẵn sàng đón nhận trách nhiệm thiêng liêng này, The Fool lật ngược báo hiệu việc mang thai ngoài dự tính do sự khinh suất."
  },
  "gossip": {
    "upright": "Đấu kị thế gian vốn dĩ là trò chơi của chiếc lưỡi, hãy cứ hồn nhiên rũ bỏ như hạt bụi vương áo. Cách đối phó tuyệt vời nhất với thị phi lúc này là một nụ cười sảng khoái và quay lưng bước đi về miền sáng.",
    "reversed": "Một vài câu bông đùa thiếu kiểm soát hoặc thái độ ngây thơ của bạn đang bị thêu dệt thành mồi ngon cho bão thị phi. Hãy thôi ngay việc 'rút ruột nhả tơ' với những thính giả độc hại."
  },
  "legal": {
    "upright": "Trạng thái tự do đang đến rất gần! Dù hồ sơ có gian nan đến đâu, một tinh thần không sợ hãi và niềm tin chân chính vào sự minh bạch sẽ mở đường ân xá cho những rắc rối pháp lý hiện tại.",
    "reversed": "Trí tuệ nông cạn đang nộp mạng cho pháp luật. Đừng dại dột đặt bút kí kết bất cứ văn bản nào khi sự mù mờ vẫn còn giăng lối, sự ngây ngô ở tòa án có giá đắt hơn vàng."
  },
  "moving": {
    "upright": "Vũ trụ đã ấn nút đèn xanh cho một cuộc đại viễn chinh hoặc thay đổi chốn an cư đầy phấn khích. Gói gọn hành trang, để lại quá khứ sau lưng, vùng đất mới đang dang tay chờ bạn tự do gieo hạt.",
    "reversed": "Trì hoãn việc di chuyển vì sự thiếu sẵn sàng hoặc liều mạng dọn tới một nơi mà chẳng thèm khảo sát địa hình. Bồng bột trong việc an cư lạc nghiệp sẽ vấp phải những phiền hà khôn tả."
  },
  "pet": {
    "upright": "Một tinh linh lắm lông bước chân vào nhà bạn với độ tinh nghịch tràn bờ đê. Thú cưng lúc này đóng vai trò là một người dọn rác tâm hồn tuyệt dịu, đem đến nguồn vui trẻ con mà bạn hằng tìm kiếm.",
    "reversed": "Lá bài báo hiệu sự rắc rối sinh ra từ việc thiếu chuyên môn nuôi dưỡng. Thái độ bỏ bê, chăm thú cưng như một món đồ chơi dễ hụt hẫng khi chúng nghịch ngợm quá giới hạn hoặc đổ bệnh."
  },
  "dream": {
    "upright": "Cõi vô thức mách bảo bạn hãy quẳng đi lo âu mà nhảy múa cùng hư không. Giấc mơ báo mộng khuyên mốc thời gian này tuyệt vời để liều lĩnh đánh cược một lần vì tiếng gọi từ linh hồn sâu thẳm.",
    "reversed": "Ác mộng rơi tự do hoặc bị truy đuổi trong vô duyên cớ phản chiếu căn bệnh sợ hãi sự phiêu lưu. Một khía cạnh nào đó trong nhận thức đang khước từ trưởng thành và sợ hãi mất kiểm soát."
  },
  "past_life": {
    "upright": "Ở một dòng thời gian xa xưa, linh hồn bạn từng là một du ca lãng du, không vướng bận gia trang, nếm trọn vị tự do hoang dã. Chính gen di truyền tâm linh ấy đang thôi thúc bạn rong ruổi kiếp này.",
    "reversed": "Oan ức tiền kiếp đến từ một sự khinh suất trầm trọng hại người liên đới. Ở kiếp này, số phận liên tục đẩy bạn vào các bài học về tính kỉ luật và tinh thần chịu trách nhiệm cuối cùng."
  },
  "karma": {
    "upright": "Nhân quả tuần hoàn đang gột rửa mọi u uất cũ. Chỉ cần bạn phát nổ hạt mầm thiện lương với một ý đồ trong vắt không lợi ích, vũ trụ sẽ tặng lại một vườn ân sủng diệu kì lúc bạn không ngờ tới nhất.",
    "reversed": "Kẻ đùa cợt số phận rồi sẽ bị số phận trêu đùa lại. Đây là nhịp tính sổ của luật nhân quả với những hành động phủi tay lấp liếm lỗi lầm và trốn chạy khỏi hệ lụy mình từng gieo rắc."
  },
  "lost_item": {
    "upright": "Tạm dừng sự vò đầu bứt tai lại! Món đồ chưa hề biến mất bốc hơi, nó chỉ đang lạc trôi do chính phút hoang túng quên trước quên sau của bạn. Hãy thả lỏng tâm trí, tìm lại đúng lộ trình bất chợt lúc rỗng tuếch nhất.",
    "reversed": "Có cố lật mòn nền nhà cũng vô vọng, sự thờ ơ và tính bầy hầy đã khiến vật thất lạc bị cuốn đi ra khỏi biên giới thu hồi. Hãy coi đây là phí đóng phạt cho sự thiếu ngăn nắp trầm trọng."
  }
};

function parseDB(content) {
    const match = content.match(/window\.TAROT_DB\s*=\s*(\[[\s\S]*\]);?/);
    if (match) {
        let jsonStr = match[1].replace(/,(?=\s*[}\]])/g, "");
        return JSON.parse(jsonStr);
    }
    return [];
}

async function generateBatchNewAspects(cards) {
    const cardListStr = cards.map(c => `- ${c.name} (${c.nameVi})`).join("\n");
    const prompt = `Bạn là chuyên gia Tarot. Dựa vào 10 khía cạnh (aspects) mới của lá The Fool dưới đây, hãy viết 10 khía cạnh này (friendship, pregnancy, gossip, legal, moving, pet, dream, past_life, karma, lost_item) cho các lá bài sau:\n${cardListStr}\n\nYêu cầu:\n- BẮT BUỘC giữ nguyên 10 keys trên cho mỗi lá bài. Mỗi key chứa 'upright' và 'reversed'.\n- Lời văn trau chuốt, thơ mộng, sắc bén và bám sát ý nghĩa gốc của TỪNG lá bài.\n- Trả về MỘT OBJECT JSON DUY NHẤT có key là tên tiếng Anh của lá bài (ví dụ "The Magician"), value là object chứa 10 keys khía cạnh kia.\n- KHÔNG DÙNG MARKDOWN (không có \`\`\`json).\n\nMẫu cấu trúc 10 keys của The Fool:\n${JSON.stringify(newAspectsTemplate)}`;

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
    try {
        let content = fs.readFileSync(dataJsPath, 'utf8');
        let db = parseDB(content);

        const targetAspects = Object.keys(newAspectsTemplate);
        
        let cardsToProcess = db.filter(c => c.id !== 0 && (!c.aspects || !targetAspects.every(k => c.aspects[k])));

        console.log(`Còn ${cardsToProcess.length} lá cần cập nhật 10 trường mới...`);

        const BATCH_SIZE = 10;
        for (let i = 0; i < cardsToProcess.length; i += BATCH_SIZE) {
            const batch = cardsToProcess.slice(i, i + BATCH_SIZE);
            console.log(`Đang xử lý batch từ ${i+1} đến ${i + batch.length}...`);
            try {
                const results = await generateBatchNewAspects(batch);
                for (const card of batch) {
                    if (results[card.name]) {
                        card.aspects = { ...card.aspects, ...results[card.name] };
                        console.log(` -> Cập nhật thành công: ${card.name}`);
                    } else {
                        console.log(` -> Lỗi: API không trả về dữ liệu cho ${card.name}`);
                    }
                }
                
                for (const card of batch) {
                    const index = db.findIndex(c => c.id === card.id);
                    if (index !== -1) db[index] = card;
                }
                fs.writeFileSync(dataJsPath, "window.TAROT_DB = " + JSON.stringify(db, null, 2) + ";\n", 'utf8');
                
            } catch (err) {
                console.error(`Lỗi batch: ${err.message}`);
            }
        }
        console.log("Hoàn thành cập nhật các trường mới!");
    } catch (error) { console.error("Lỗi:", error); }
}
main();