const fs = require('fs');
const db = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json', 'utf8'));

const astroMap = {
  "Ace of Wands": { p: "Nguyên tố Lửa", z: "Bạch Dương, Sư Tử, Nhân Mã" },
  "Two of Wands": { p: "Sao Hỏa", z: "Bạch Dương" },
  "Three of Wands": { p: "Mặt Trời", z: "Bạch Dương" },
  "Four of Wands": { p: "Sao Kim", z: "Bạch Dương" },
  "Five of Wands": { p: "Sao Thổ", z: "Sư Tử" },
  "Six of Wands": { p: "Sao Mộc", z: "Sư Tử" },
  "Seven of Wands": { p: "Sao Hỏa", z: "Sư Tử" },
  "Eight of Wands": { p: "Sao Thủy", z: "Nhân Mã" },
  "Nine of Wands": { p: "Mặt Trăng", z: "Nhân Mã" },
  "Ten of Wands": { p: "Sao Thổ", z: "Nhân Mã" },
  "Page of Wands": { p: "Trái Đất", z: "Thuộc Lửa" },
  "Knight of Wands": { p: "Không Khí", z: "Thuộc Lửa" },
  "Queen of Wands": { p: "Nước", z: "Thuộc Lửa" },
  "King of Wands": { p: "Lửa", z: "Thuộc Lửa" },

  "Ace of Cups": { p: "Nguyên tố Nước", z: "Cự Giải, Bọ Cạp, Song Ngư" },
  "Two of Cups": { p: "Sao Kim", z: "Cự Giải" },
  "Three of Cups": { p: "Sao Thủy", z: "Cự Giải" },
  "Four of Cups": { p: "Mặt Trăng", z: "Cự Giải" },
  "Five of Cups": { p: "Sao Hỏa", z: "Bọ Cạp" },
  "Six of Cups": { p: "Mặt Trời", z: "Bọ Cạp" },
  "Seven of Cups": { p: "Sao Kim", z: "Bọ Cạp" },
  "Eight of Cups": { p: "Sao Thổ", z: "Song Ngư" },
  "Nine of Cups": { p: "Sao Mộc", z: "Song Ngư" },
  "Ten of Cups": { p: "Sao Hỏa", z: "Song Ngư" },
  "Page of Cups": { p: "Trái Đất", z: "Thuộc Nước" },
  "Knight of Cups": { p: "Không Khí", z: "Thuộc Nước" },
  "Queen of Cups": { p: "Nước", z: "Thuộc Nước" },
  "King of Cups": { p: "Lửa", z: "Thuộc Nước" },

  "Ace of Swords": { p: "Nguyên tố Khí", z: "Thiên Bình, Bảo Bình, Song Tử" },
  "Two of Swords": { p: "Mặt Trăng", z: "Thiên Bình" },
  "Three of Swords": { p: "Sao Thổ", z: "Thiên Bình" },
  "Four of Swords": { p: "Sao Mộc", z: "Thiên Bình" },
  "Five of Swords": { p: "Sao Kim", z: "Bảo Bình" },
  "Six of Swords": { p: "Sao Thủy", z: "Bảo Bình" },
  "Seven of Swords": { p: "Mặt Trăng", z: "Bảo Bình" },
  "Eight of Swords": { p: "Sao Mộc", z: "Song Tử" },
  "Nine of Swords": { p: "Sao Hỏa", z: "Song Tử" },
  "Ten of Swords": { p: "Mặt Trời", z: "Song Tử" },
  "Page of Swords": { p: "Trái Đất", z: "Thuộc Khí" },
  "Knight of Swords": { p: "Không Khí", z: "Thuộc Khí" },
  "Queen of Swords": { p: "Nước", z: "Thuộc Khí" },
  "King of Swords": { p: "Lửa", z: "Thuộc Khí" },

  "Ace of Pentacles": { p: "Nguyên tố Đất", z: "Ma Kết, Kim Ngưu, Xử Nữ" },
  "Two of Pentacles": { p: "Sao Mộc", z: "Ma Kết" },
  "Three of Pentacles": { p: "Sao Hỏa", z: "Ma Kết" },
  "Four of Pentacles": { p: "Mặt Trời", z: "Ma Kết" },
  "Five of Pentacles": { p: "Sao Thủy", z: "Kim Ngưu" },
  "Six of Pentacles": { p: "Mặt Trăng", z: "Kim Ngưu" },
  "Seven of Pentacles": { p: "Sao Thổ", z: "Kim Ngưu" },
  "Eight of Pentacles": { p: "Mặt Trời", z: "Xử Nữ" },
  "Nine of Pentacles": { p: "Sao Kim", z: "Xử Nữ" },
  "Ten of Pentacles": { p: "Sao Thủy", z: "Xử Nữ" },
  "Page of Pentacles": { p: "Trái Đất", z: "Thuộc Đất" },
  "Knight of Pentacles": { p: "Không Khí", z: "Thuộc Đất" },
  "Queen of Pentacles": { p: "Nước", z: "Thuộc Đất" },
  "King of Pentacles": { p: "Lửa", z: "Thuộc Đất" }
};

const numMap = {
  "1": "Số 1 - Hạt giống, tiềm năng, khởi đầu, ý chí.",
  "2": "Số 2 - Cân bằng, sự kết hợp, đối lập, lựa chọn.",
  "3": "Số 3 - Phát triển, sáng tạo, làm việc nhóm, mở rộng.",
  "4": "Số 4 - Ổn định, cấu trúc, nền tảng, sự an toàn.",
  "5": "Số 5 - Thay đổi, xung đột, mất mát, thử thách.",
  "6": "Số 6 - Hài hòa, phục hồi, hợp tác, cho và nhận.",
  "7": "Số 7 - Đánh giá, kiên nhẫn, chiến thuật, suy ngẫm.",
  "8": "Số 8 - Hành động, tốc độ, chuyên cần, sức mạnh.",
  "9": "Số 9 - Gần hoàn thiện, đỉnh cao cá nhân, độc lập.",
  "10": "Số 10 - Kết thúc chu kỳ, viên mãn hoặc sụp đổ.",
  "11": "Cấp Tiểu Đồng (Page) - Trẻ trung, học hỏi, tin tức, tò mò.",
  "12": "Cấp Kỵ Sĩ (Knight) - Năng lượng, di chuyển, theo đuổi mục tiêu.",
  "13": "Cấp Nữ Hoàng (Queen) - Trưởng thành, nuôi dưỡng, làm chủ nội tâm.",
  "14": "Cấp Vua (King) - Lãnh đạo, quyền lực, kiểm soát bên ngoài."
};

const advMap = {
  "Ace of Wands": "Hãy nắm bắt ngay cảm hứng đang dâng trào và bắt tay vào hành động.",
  "Two of Wands": "Đã đến lúc bước ra khỏi vùng an toàn. Lập kế hoạch và nhìn xa hơn.",
  "Three of Wands": "Hãy kiên nhẫn. Tầm nhìn của bạn đang đi đúng hướng, chỉ cần chờ đợi kết quả.",
  "Four of Wands": "Hãy dành thời gian ăn mừng những thành quả và tận hưởng sự bình yên bên người thân.",
  "Five of Wands": "Cạnh tranh là để phát triển. Hãy đấu tranh công bằng nhưng đừng để cái tôi lấn át.",
  "Six of Wands": "Hãy tự hào về thành tựu của mình, nhưng đừng để sự kiêu ngạo làm mờ mắt.",
  "Seven of Wands": "Hãy giữ vững lập trường của bạn. Đừng lùi bước trước áp lực của người khác.",
  "Eight of Wands": "Mọi thứ đang diễn ra rất nhanh, hãy linh hoạt và nắm bắt kịp thời các luồng thông tin.",
  "Nine of Wands": "Bạn đã vượt qua rất nhiều thử thách. Hãy ráng thêm chút nữa, đích đến đã rất gần.",
  "Ten of Wands": "Đừng ngại san sẻ gánh nặng. Biết từ chối những trách nhiệm không thuộc về mình.",
  "Page of Wands": "Luôn giữ tâm trí tò mò và cởi mở với những khám phá mới trong cuộc sống.",
  "Knight of Wands": "Hành động quyết liệt là tốt, nhưng hãy suy nghĩ về hậu quả trước khi lao đi.",
  "Queen of Wands": "Hãy tự tin tỏa sáng và truyền năng lượng tích cực, ấm áp đến những người xung quanh.",
  "King of Wands": "Dùng tầm nhìn và sự lãnh đạo để dẫn dắt người khác, nhưng tránh thói độc tài.",

  "Ace of Cups": "Hãy mở rộng trái tim để đón nhận tình yêu và để cảm xúc tuôn chảy tự nhiên.",
  "Two of Cups": "Trân trọng sự kết nối đồng điệu. Sự hợp tác dựa trên tình yêu và tôn trọng là chìa khóa.",
  "Three of Cups": "Cùng chia sẻ niềm vui với cộng đồng và bạn bè. Đừng tự cô lập mình.",
  "Four of Cups": "Đừng quá chìm đắm trong nỗi buồn mà phớt lờ những cơ hội tuyệt vời đang được trao cho bạn.",
  "Five of Cups": "Than khóc cho những gì đã mất là cần thiết, nhưng đừng quên nhìn lại những gì bạn vẫn còn.",
  "Six of Cups": "Quá khứ mang lại sự ấm áp, nhưng đừng biến nó thành nơi trốn tránh thực tại.",
  "Seven of Cups": "Hãy thực tế. Đừng bị mờ mắt bởi những ảo ảnh; đưa ra lựa chọn và tập trung vào nó.",
  "Eight of Cups": "Nếu nơi hiện tại không còn mang lại bình yên, hãy dũng cảm bước đi tìm kiếm chân lý mới.",
  "Nine of Cups": "Tận hưởng sự viên mãn hiện tại, nhưng hãy giữ lòng biết ơn và đừng trở nên tham lam.",
  "Ten of Cups": "Trân trọng hạnh phúc gia đình và những người yêu thương bạn vô điều kiện.",
  "Page of Cups": "Hãy lắng nghe tiếng nói của trực giác và đừng ngại thể hiện sự lãng mạn, ngây thơ.",
  "Knight of Cups": "Đi theo tiếng gọi của con tim, nhưng nhớ giữ đôi chân trên mặt đất thực tế.",
  "Queen of Cups": "Yêu thương người khác là tốt, nhưng đừng quên yêu thương và thiết lập ranh giới cho chính mình.",
  "King of Cups": "Sự điềm tĩnh và thấu cảm là vũ khí mạnh nhất của bạn. Đừng để cảm xúc điều khiển hành động.",

  "Ace of Swords": "Sự thật có thể sắc bén và đau đớn, nhưng nó sẽ giải phóng bạn khỏi sự mù mờ.",
  "Two of Swords": "Sự né tránh không giải quyết được vấn đề. Hãy đối mặt và đưa ra quyết định.",
  "Three of Swords": "Nỗi đau là một phần của sự trưởng thành. Hãy cho bản thân thời gian để khóc và chữa lành.",
  "Four of Swords": "Sức khỏe tinh thần đang báo động. Hãy ngắt kết nối, nghỉ ngơi và tịnh dưỡng hoàn toàn.",
  "Five of Swords": "Đôi khi thắng một cuộc cãi vã không quan trọng bằng việc gìn giữ một mối quan hệ.",
  "Six of Swords": "Hãy để lại những rắc rối phía sau. Hành trình chuyển đổi này sẽ đưa bạn đến nơi bình yên hơn.",
  "Seven of Swords": "Trung thực là thượng sách. Sự lừa dối sớm muộn gì cũng sẽ bị phơi bày.",
  "Eight of Swords": "Nhà tù duy nhất đang giam cầm bạn là tâm trí của chính bạn. Hãy tháo bịt mắt và tự giải thoát.",
  "Nine of Swords": "Phần lớn những nỗi sợ hãi chỉ là sản phẩm của sự tưởng tượng. Hãy thức dậy và đối mặt với thực tế.",
  "Ten of Swords": "Bạn đã chạm đáy, không thể tệ hơn được nữa. Hãy chấp nhận sự kết thúc này để bắt đầu tái sinh.",
  "Page of Swords": "Luôn tò mò và cảnh giác. Lời nói có sức mạnh, hãy sử dụng chúng một cách khôn ngoan.",
  "Knight of Swords": "Hành động nhanh chóng dựa trên logic là tốt, nhưng đừng vội vã chà đạp lên cảm xúc người khác.",
  "Queen of Swords": "Dùng lý trí sắc bén để đánh giá tình hình, nhưng đừng để trái tim trở nên lạnh giá.",
  "King of Swords": "Sự công bằng và nguyên tắc là cần thiết, nhưng cũng cần một chút bao dung và thấu hiểu.",

  "Ace of Pentacles": "Một cơ hội tài chính đang đến. Hãy nắm bắt và làm việc chăm chỉ để biến nó thành hiện thực.",
  "Two of Pentacles": "Sự linh hoạt và khéo léo sẽ giúp bạn cân bằng được những áp lực hiện tại.",
  "Three of Pentacles": "Làm việc nhóm và khiêm tốn học hỏi từ người khác sẽ mang lại thành công lớn.",
  "Four of Pentacles": "Tiết kiệm là tốt, nhưng bám víu vật chất quá mức sẽ khiến tâm hồn bạn trở nên nghèo nàn.",
  "Five of Pentacles": "Đừng ngại ngần yêu cầu sự giúp đỡ. Bạn không cô đơn trong lúc khó khăn này.",
  "Six of Pentacles": "Hãy hào phóng khi có thể, và biết ơn khi nhận được sự giúp đỡ. Dòng tiền cần được lưu thông.",
  "Seven of Pentacles": "Hãy kiên nhẫn. Quả ngọt cần thời gian để chín. Đừng bỏ cuộc khi sắp đến đích.",
  "Eight of Pentacles": "Tập trung vào từng chi tiết nhỏ và mài giũa kỹ năng của bạn. Sự cần mẫn sẽ được đền đáp.",
  "Nine of Pentacles": "Bạn xứng đáng với những gì bạn đã tạo ra. Hãy tự hào và tận hưởng sự độc lập của mình.",
  "Ten of Pentacles": "Gắn kết với các giá trị cốt lõi của gia đình. Xây dựng một nền tảng vững chắc cho thế hệ sau.",
  "Page of Pentacles": "Bắt đầu với những bước đi thực tế, học hỏi chăm chỉ và lập kế hoạch rõ ràng.",
  "Knight of Pentacles": "Sự kiên trì và đáng tin cậy sẽ đưa bạn đến đích, dù có chậm hơn người khác.",
  "Queen of Pentacles": "Chăm sóc bản thân và những người xung quanh bằng sự thực tế, ấm áp và chu đáo.",
  "King of Pentacles": "Tạo ra sự ổn định cho mọi người. Sử dụng tài sản vật chất để làm những việc có ý nghĩa."
};

db.forEach(card => {
  if (card.arcana === 'minor') {
    const astro = astroMap[card.name];
    if (astro) {
      card.planet = astro.p;
      card.zodiac = astro.z;
    }
    card.numerology = numMap[card.number] || "";
    
    const adv = advMap[card.name];
    if (adv) {
      card.advice = adv;
    }
  }
});

fs.writeFileSync('E:/TAROT/data/cards.json', JSON.stringify(db, null, 2));
const jsContent = // js/data.js - Full 78 Cards (Standardized & Astrologically Accurate)\n(function () {\n  window.TAROT_DB =  + JSON.stringify(db, null, 2) + ;\n})();;
fs.writeFileSync('E:/TAROT/js/data.js', jsContent);
console.log('Successfully added Astro/Num/Advice to Minor Arcana');
