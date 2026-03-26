const fs = require('fs');
const vm = require('vm');

const dataPath = 'e:\\TAROT\\js\\data.js';
let content = fs.readFileSync(dataPath, 'utf-8');

const context = { window: {} };
vm.createContext(context);
vm.runInContext(content, context);
const db = context.window.TAROT_DB;

const fool = db.find(c => c.id === 0);
if (fool) {
  if (!fool.aspects) fool.aspects = {};
  Object.assign(fool.aspects, {
    "toxic_relationship": {
      "upright": "Sự ngây thơ khiến bạn mù quáng trước những dấu hiệu cờ đỏ, hoặc đây là lúc bạn tìm thấy can đảm để nhảy thoát khỏi sự bế tắc bằng một khởi đầu mới.",
      "reversed": "Cảnh báo về sự lẩn quẩn trong một mối quan hệ độc hại chỉ vì sợ sự cô đơn hoặc thiếu chín chắn để chấm dứt."
    },
    "soulmate": {
      "upright": "Một cuộc gặp gỡ định mệnh mang đầy năng lượng hồn nhiên và tươi mới; một kết nối linh hồn khiến bạn thấy tự do được là chính mình.",
      "reversed": "Những kỳ vọng hão huyền về một tình yêu cổ tích có thể khiến bạn bỏ qua những thử thách thực tế của mối gắn kết soulmate."
    },
    "reconciliation": {
      "upright": "Một cơ hội quay lại hoàn toàn mới mẻ, xóa bỏ những định kiến cũ và bắt đầu lại từ vạch xuất phát như những người lữ hành tự do.",
      "reversed": "Quay lại một cách bốc đồng mà chưa giải quyết rễ rập vấn đề, nguy cơ lặp lại chướng ngại cũ là rất lớn."
    },
    "secret_admirer": {
      "upright": "Một người thầm thương mang năng lượng lạc quan, trẻ trung hoặc ai đó sắp tạo ra một sự bất ngờ đầy lãng mạn cho bạn.",
      "reversed": "Người thầm thương có thể có phần thiếu nghiêm túc hoặc bạn đang cố lờ đi những tín hiệu quá rõ ràng vì e dè."
    },
    "burnout": {
      "upright": "Lời kêu gọi khẩn thiết hãy tạm gác lại gánh nặng, cho phép bản thân nghỉ ngơi và có một chuyến đi ngắn để tìm lại tự do.",
      "reversed": "Sự gắng gượng một cách mù quáng sắp vượt quá giới hạn chịu đựng; bạn cần dừng lại trước khi rơi xuống vực thẳm của sự cạn kiệt năng lượng."
    },
    "startup": {
      "upright": "Năng lượng tuyệt vời cho sự khởi nghiệp! Hãy liều lĩnh theo đuổi đam mê với trái tim rộng mở và sẵn sàng học hỏi mọi thứ.",
      "reversed": "Sự nhiệt tình thái quá nhưng thiếu kế hoạch kinh doanh chi tiết; cẩn trọng trước những rủi ro 'bắt dao rơi' khi thiếu kinh nghiệm."
    },
    "workplace_politics": {
      "upright": "Hãy giữ thái độ vô tư, khách quan như Kẻ Ngốc, đừng để mình bị kéo vào mớ bòng bong của những toan tính công sở.",
      "reversed": "Sự ngây dại có thể khiến bạn trở thành tâm điểm của thị phi hoặc bị lợi dụng; hãy nâng cao sự phòng bị."
    },
    "side_hustle": {
      "upright": "Một ý tưởng nghề tay trái đầy sáng tạo và vui vẻ; cứ mạnh dạn thử nghiệm vì nó sẽ mang lại trải nghiệm thú vị độc đáo.",
      "reversed": "Cần thận trọng với những quyết định bồng bột, đầu tư không suy tính cho một sở thích chưa thể sinh lời rõ ràng."
    },
    "real_estate": {
      "upright": "Thời cơ thuận lợi cho một sự thay đổi chỗ ở đột phá hoặc giao dịch bất động sản mang tính chất mở ra cánh cửa hoàn toàn mới.",
      "reversed": "Sự thiếu cẩn trọng trong các điều khoản giấy tờ; không nên vội vàng chốt kèo nhà cửa, đất đai vào lúc này."
    },
    "financial_loss": {
      "upright": "Dù mất đi tài sản, The Fool nhắc bạn rằng bản thể cốt lõi vẫn còn nguyên vẹn; đây là bài học để bạn bắt đầu lại từ con số không với sự nhẹ bén hơn.",
      "reversed": "Những sai lầm ngớ ngẩn hoặc sự bốc đồng vô trách nhiệm đang là căn nguyên của sự thất thoát tiền bạc."
    },
    "sudden_wealth": {
      "upright": "May mắn bất ngờ gõ cửa đúng như cách vạn vật ưu ái năng lượng trẻ trung; một lộc tài nhỏ bé sẽ làm bạn vui vẻ cả ngày.",
      "reversed": "Của thiên trả địa; nếu có lộc bất ngờ hãy cẩn thận đừng tiêu xài hoang phí trong phút chốc."
    },
    "healing": {
      "upright": "Hành trình chữa lành chân thực bắt đầu khi bạn học cách yêu lại từ đầu, đối diện với cuộc đời bằng sự cởi mở và trong sáng nhất.",
      "reversed": "Từ chối nhìn nhận thực tại tổn thương hoặc né tránh trách nhiệm chữa lành bằng cách tìm kiếm những niềm vui nông cạn."
    },
    "stress": {
      "upright": "Sự căng thẳng sẽ được hóa giải khi bạn học cách buông lỏng kiểm soát, đi ra ngoài hít thở khí trời và tận hưởng hiện tại.",
      "reversed": "Sự ôm đồm quá mức gây áp lực nặng nề; cẩn thận với những quyết định bốc đồng để chạy trốn khỏi stress áp lực."
    },
    "trauma": {
      "upright": "Bóng ma quá khứ không còn trói buộc bạn; Inner child (đứa trẻ bên trong) vẫy gọi bạn thực sự sống lại với bản thể tự do thuần túy.",
      "reversed": "Những vết thương chưa lành có thể khiến bạn hành xử liều lĩnh hoặc chối bỏ sự hỗ trợ, hãy đối mặt thay vì trốn chạy."
    },
    "exams": {
      "upright": "Chuẩn bị với tinh thần tươi mới, niềm tin bất diệt vào bản thân sẽ giúp bạn bứt phá ngoạn mục.",
      "reversed": "Sự chủ quan, nước đến chân mới nhảy hoặc thiếu sự ôn tập kỹ càng có thể dẫn đến kết quả hụt hẫng."
    },
    "scholarship": {
      "upright": "Sự sáng tạo và tính nguyên bản táo bạo trong hồ sơ của bạn sẽ giúp bạn tỏa sáng và ghi điểm ấn tượng.",
      "reversed": "Thiếu sự chuẩn bị chu đáo hoặc hành động quá bốc đồng dễ làm lỡ mất cơ hội vàng."
    },
    "talent": {
      "upright": "Bạn có năng lực thiên bẩm về sự sáng tạo, đổi mới và nghệ thuật độc lập; hãy mạnh dạn khám phá những địa hạt chưa ai dấn tới.",
      "reversed": "Tài năng bị lãng phí do sự thiếu kiên nhẫn trui rèn hoặc quá hời hợt cả thèm chóng chán."
    },
    "spirit_guide": {
      "upright": "Spirit guide đang che chở khi bạn dấn bước vào chưa biết; hãy tin tưởng hoàn toàn vào trực giác vô điều kiện lúc này.",
      "reversed": "Việc từ chối nghe theo lời nhắc nhở của định mệnh có thể khiến bạn vấp ngã; hãy lắng nghe trực giác thay vì bản ngã."
    }
  });

  const newContent = 'window.TAROT_DB = ' + JSON.stringify(db, null, 2) + ';';
  fs.writeFileSync(dataPath, newContent, 'utf-8');
  console.log("Card 0 Aspects updated successfully in data.js");
}
