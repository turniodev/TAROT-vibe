const fs = require('fs');

const dataPath = 'e:\\TAROT\\js\\form.js';
let content = fs.readFileSync(dataPath, 'utf-8');

// 1. Inject into SUB_THEMES.love
const loveInjection = `
      { key: 'toxic_relationship', label: 'Q/hệ Độc Hại', desc: 'Đau buồn & bế tắc' },
      { key: 'soulmate', label: 'Tri Kỷ / Soulmate', desc: 'Kết nối linh hồn' },
      { key: 'reconciliation', label: 'Gương Vỡ Lại Lành', desc: 'Quay lại tái hợp' },
      { key: 'secret_admirer', label: 'Người Thầm Thương', desc: 'Ai đang để ý bạn' },`;
content = content.replace(
  "{ key: 'gossip', label: 'Thị Phi / Đàm Tiếu', desc: 'Lời ra tiếng vào' },",
  "{ key: 'gossip', label: 'Thị Phi / Đàm Tiếu', desc: 'Lời ra tiếng vào' }," + loveInjection
);

// 2. Inject into SUB_THEMES.career
const careerInjection = `
      { key: 'burnout', label: 'Kiệt Sức / Áp Lực', desc: 'Quá tải công việc' },
      { key: 'startup', label: 'Khởi Nghiệp', desc: 'Mở cơ sở kinh doanh' },
      { key: 'workplace_politics', label: 'Thị Phi Công Sở', desc: 'Đấu đá & chèn ép' },
      { key: 'side_hustle', label: 'Nghề Tay Trái', desc: 'Thu nhập phụ' },`;
content = content.replace(
  "{ key: 'moving', label: 'Chuyển Chỗ / Xuất Ngoại', desc: 'Định cư & nhà cửa' },",
  "{ key: 'moving', label: 'Chuyển Chỗ / Xuất Ngoại', desc: 'Định cư & nhà cửa' }," + careerInjection
);

// 3. Inject into SUB_THEMES.finance
const financeInjection = `
      { key: 'real_estate', label: 'Bất Động Sản', desc: 'Mua bán nhà đất' },
      { key: 'financial_loss', label: 'Thua Lỗ / Khó Khăn', desc: 'Khủng hoảng tiền bạc' },
      { key: 'sudden_wealth', label: 'Vận May Bất Ngờ', desc: 'Trúng số & Lộc rơi' },`;
content = content.replace(
  "{ key: 'luck_money', label: 'Lộc Tài / May Mắn', desc: 'Vận đỏ & tiền bạc' },",
  "{ key: 'luck_money', label: 'Lộc Tài / May Mắn', desc: 'Vận đỏ & tiền bạc' }," + financeInjection
);

// 4. Inject into SUB_THEMES.health
const healthInjection = `
      { key: 'healing', label: 'Chữa Lành Tâm Hồn', desc: 'Phục hồi vết thương' },
      { key: 'stress', label: 'Căng Thẳng / Âu Lo', desc: 'Quản lý cảm xúc' },
      { key: 'trauma', label: 'Tổn Thương Quá Khứ', desc: 'Bóng ma tâm lý' },`;
content = content.replace(
  "{ key: 'pet', label: 'Thú Cưng', desc: 'Vật nuôi kết nối' },",
  "{ key: 'pet', label: 'Thú Cưng', desc: 'Vật nuôi kết nối' }," + healthInjection
);

// 5. Inject into SUB_THEMES.self
const selfInjection = `
      { key: 'exams', label: 'Thi Cử / Kiểm Tra', desc: 'Kết quả bài thi' },
      { key: 'scholarship', label: 'Học Bổng', desc: 'Cơ hội vươn xa' },
      { key: 'talent', label: 'Năng Khiếu / Đam Mê', desc: 'Khám phá biệt tài' },
      { key: 'spirit_guide', label: 'Thần Hộ Mệnh', desc: 'Thông điệp dẫn lối' },`;
content = content.replace(
  "{ key: 'lost_item', label: 'Tìm Đồ Thất Lạc', desc: 'Manh mối & phương hướng' },",
  "{ key: 'lost_item', label: 'Tìm Đồ Thất Lạc', desc: 'Manh mối & phương hướng' }," + selfInjection
);

// 6. Inject into PRESET_Q objects (append before the final "}];")
const targetString = "}];";

const presetQInjection = \`
    }],
    toxic_relationship: [{
      group: 'Mối Quan Hệ Độc Hại', qs: [
        'Tại sao tôi cứ mãi lặp lại những khuôn mẫu bế tắc này trong tình yêu?',
        'Có nên dứt khoát chấm dứt mối quan hệ mang lại nhiều nước mắt này?',
        'Cách nào để tự giải thoát bản thân khỏi sự kìm kẹp tình cảm?',
        'Người kia có đang thao túng tâm lý (gaslight) tôi không?',
        'Bài học lớn nhất sau sự tan vỡ này là gì?'
      ]
    }],
    soulmate: [{
      group: 'Tri Kỷ / Soulmate', qs: [
        'Dấu hiệu nhận biết soulmate của tôi sắp xuất hiện là gì?',
        'Liệu người tôi vừa gặp có phải là mảnh ghép định mệnh?',
        'Điểm chung nào gắn kết linh hồn hai người trong vạn dặm đời?',
        'Sự hội ngộ mang lại điều gì cho sự phát triển của cả hai?',
        'Làm cách nào để vun đắp trọn vẹn sự kết nối kỳ diệu này?'
      ]
    }],
    reconciliation: [{
      group: 'Gương Vỡ Lại Lành', qs: [
        'Nếu quay lại, cả hai đã đủ trưởng thành để không vấp ngã?',
        'Tôi cần thay đổi điểm nào nếu muốn gương vỡ lại lành?',
        'Đối phương đã sẵn sàng bỏ qua cái tôi chưa?',
        'Cơ hội tái hợp lần này có mang lại hạnh phúc thật sự?',
        'Vũ trụ khuyên tôi nên buông xuôi hay cố níu giữ?'
      ]
    }],
    secret_admirer: [{
      group: 'Người Thầm Thương', qs: [
        'Ai đang âm thầm quan tâm tôi từ xa?',
        'Cảm xúc thực sự của họ dành cho tôi sâu đậm đến đâu?',
        'Tôi có nên bật đèn xanh cho họ bước tới không?',
        'Lời tỏ tình có sắp sửa diễn ra trong thời gian tới?',
      ]
    }],
    burnout: [{
      group: 'Kiệt Sức & Áp Lực', qs: [
        'Tôi phải làm gì để khôi phục lại cảm hứng công việc?',
        'Khoảng thời gian kiệt sức này bao giờ mới chấm dứt?',
        'Tôi có đang ép bản thân chạy theo những tiêu chuẩn sai lầm?',
        'Bình yên thực sự đang chực chờ tôi ở phương hướng nào?'
      ]
    }],
    startup: [{
      group: 'Khởi Nghiệp', qs: [
        'Ý tưởng khởi nghiệp của tôi có được thị trường đón nhận?',
        'Người đồng sáng lập này có đáng để tôi giao phó sứ mệnh không?',
        'Nên gọi vốn lúc này hay tự thân khởi nghiệp gầy dựng?',
        'Thử thách khó lường nhất trong giai đoạn đầu startup là gì?'
      ]
    }],
    workplace_politics: [{
      group: 'Thị Phi Công Sở', qs: [
        'Kẻ nào đang ném đá giấu tay trong bộ phận của tôi?',
        'Sáng suốt nhất bây giờ là cắn răng chịu đựng hay vùng lên?',
        'Sếp có thực sự hiểu và ghi nhận nỗ lực của tôi giữa cơn thị phi?',
        'Bao giờ những lời đơm đặt này mới tan biến đi?'
      ]
    }],
    side_hustle: [{
      group: 'Nghề Tay Trái', qs: [
        'Ý tưởng kiếm thêm tiền này có mang lại lợi nhuận thực tế?',
        'Tôi nên phân bổ thời gian thế nào để không ảnh hưởng việc chính?',
        'Ai có thể là cộng sự tốt nhất cho tôi ở nghề tay trái?',
        'Nghề phụ này liệu có khả năng trở thành sự nghiệp trọn đời?'
      ]
    }],
    real_estate: [{
      group: 'Bất Động Sản', qs: [
        'Tháng này có phải là thời điểm vàng để chốt mảnh đất này?',
        'Ngôi nhà mới có mang lại luồng sinh khí tốt đẹp không?',
        'Người mua/bán có đang giấu giếm rủi ro về mặt pháp lý?',
        'Làm sao để giao dịch mua bán nhà đất diễn ra suôn sẻ?'
      ]
    }],
    financial_loss: [{
      group: 'Thua Lỗ Tạm Thời', qs: [
        'Sau mất mát này, tôi cần cảnh giác lỗ hổng tài chính nào?',
        'Thời gian tới, luồng tiền có quay trở lại bù đắp cho tôi?',
        'Kẻ tiểu nhân nào đã lợi dụng sự cả tin của tôi?',
        'Làm sao để duy trì tinh thần trước sự cố hao tài tốn của?'
      ]
    }],
    sudden_wealth: [{
      group: 'Vận May Bất Ngờ', qs: [
        'Phải chăng vận cực thới lai, tôi chuẩn bị đón nhận tài lộc lớn?',
        'Nên phân bổ món lộc lạ này sao cho bền vững lâu dài?',
        'Liệu có ai đố kỵ với sự giàu lên đột ngột của tôi?',
        'Bao giờ cơn mưa tiền tiếp theo mới đến gõ cửa nhà tôi?'
      ]
    }],
    healing: [{
      group: 'Chữa Lành Tâm Hồn', qs: [
        'Ai đã để lại vết xước lớn nhất trong lòng tôi?',
        'Hành trình chữa lành của tôi sẽ mất bao lâu nữa để trọn vẹn?',
        'Bước đầu tiên thiết thực để xoa dịu tiếng khóc trong tâm hồn?',
        'Tôi đang chối bỏ nỗi sầu muộn bằng những lớp vỏ bọc nào?'
      ]
    }],
    stress: [{
      group: 'Căng Thẳng Chồng Chất', qs: [
        'Tôi tự gánh vác quá nhiều hay do đời khắc nghiệt?',
        'Cách đơn giản nhất để não bộ được thư giãn hôm nay?',
        'Bao giờ những kỳ vọng đè bẹp vai mới chịu tan biến?',
        'Nên từ bỏ trách nhiệm nào để nhường chỗ cho sự bình an?'
      ]
    }],
    trauma: [{
      group: 'Tổn Thương Quá Khứ', qs: [
        'Ký ức kinh hoàng nào vẫn đang thao túng hành vi hiện tại?',
        'Nhờ đâu tôi mới có can đảm đối diện với bóng tối ấy?',
        'Bao giờ vết thương này mới đóng vảy thành sẹo để quên đi?',
        'Bài học thiêng liêng từ nỗi đau quá khứ là gì?'
      ]
    }],
    exams: [{
      group: 'Thi Cử Điểm Số', qs: [
        'Kết quả môn học này sẽ như tôi mong ước chứ?',
        'Phương pháp ôn tập hiện tại của tôi đã tối ưu?',
        'Bẫy trắc nghiệm nào tôi dễ vấp phải nhất?',
        'Thần hộ mệnh có sát cánh cùng tôi trong phòng thi?'
      ]
    }],
    scholarship: [{
      group: 'Tìm Kiếm Học Bổng', qs: [
        'Hồ sơ của tôi đã đủ tỏa sáng để hội đồng xét duyệt chú ý?',
        'Kỹ năng nào tôi cần trau dồi gấp để đạt được học bổng này?',
        'Đối thủ cạnh tranh của tôi trong đợt apply này mạnh thế nào?',
        'Tôi nên chọn quốc gia nào để xin học bổng êm xuôi nhất?'
      ]
    }],
    talent: [{
      group: 'Năng Khiếu Đam Mê', qs: [
        'Thiên bẩm ẩn giấu của tôi mạnh nhất ở khía cạnh nào?',
        'Tôi đang lãng phí tài năng vì nỗi sợ thất bại nào?',
        'Sống hết mình với đam mê nghệ thuật liệu có no bụng?',
        'Làm sao để biến sở thích cá nhân thành nguồn thu nhập lớn?'
      ]
    }],
    spirit_guide: [{
      group: 'Thần Hộ Mệnh Dẫn Lối', qs: [
        'Linh hồn dẫn dắt đang gửi thông điệp gì qua những con số lặp lại?',
        'Xin thần hộ mệnh ban cho tôi chỉ dẫn ở ngã rẽ cuộc đời?',
        'Có nguy hiểm tàng hình nào mà cõi vô hình đang cố chắn ngang?',
        'Tôi phải tĩnh tâm thế nào mới nghe rõ tiếng gọi từ vị thần hộ mệnh?'
      ]
    }\`

content = content.replace(
  "    lost_item: [{\\n      group: 'Tìm Đồ Thất Lạc', qs: [\\n        'Món đồ quý giá tôi làm rơi hiện đang nằm ở phương hướng nào?',\\n        'Trạng thái hiện tại của món đồ (còn nguyên hay đã mất mát)?',\\n        'Tôi nên tìm đồ vật này ở nơi ánh sáng hay trong góc khuất?',\\n        'Sự thất lạc này có mang ý nghĩa cảnh báo tôi bất cẩn điều gì?',\\n        'Tỷ lệ tôi tìm lại được đồ vật này là bao nhiêu phần trăm?',\\n      ]\\n    }]",
  "    lost_item: [{\\n      group: 'Tìm Đồ Thất Lạc', qs: [\\n        'Món đồ quý giá tôi làm rơi hiện đang nằm ở phương hướng nào?',\\n        'Trạng thái hiện tại của món đồ (còn nguyên hay đã mất mát)?',\\n        'Tôi nên tìm đồ vật này ở nơi ánh sáng hay trong góc khuất?',\\n        'Sự thất lạc này có mang ý nghĩa cảnh báo tôi bất cẩn điều gì?',\\n        'Tỷ lệ tôi tìm lại được đồ vật này là bao nhiêu phần trăm?',\\n      ]" + presetQInjection
);

fs.writeFileSync(dataPath, content, 'utf-8');
console.log("form.js updated successfully");
