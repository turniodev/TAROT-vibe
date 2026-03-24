const fs = require('fs');
let db = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json', 'utf8'));

const enriched = {
  0: { // The Fool
    generalUpright: "Tựa như nụ hoa e ấp chực chờ bung nở, The Fool mang đến nguồn năng lượng tinh khôi của những khởi đầu mới và tiềm năng vô hạn. Đây là khoảnh khắc vũ trụ vẫy gọi bạn rũ bỏ những gánh nặng của quá khứ, ôm trọn niềm tin thuần khiết và dũng cảm dấn bước vào một hành trình vạn dặm chưa từng được khám phá.",
    generalReversed: "Khi đảo ngược, lá bài là lời cảnh tỉnh dịu dàng về sự liều lĩnh bốc đồng và những quyết định thiếu vắng sự suy xét. Đừng để sự ngây thơ biến thành tấm rèm che mắt bạn trước những rủi ro đang chực chờ; hãy dừng lại một nhịp để quan sát trước khi gieo mình xuống thung lũng.",
    aspects: {
      love: {
        upright: "Tình yêu gõ cửa mang theo làn gió xuân tươi mới và những rung động diệu kỳ. Lá bài khuyên bạn hãy gạt bỏ mọi rào cản phòng vệ, can đảm mở rộng trái tim để đón nhận một chương tình cảm đầy hứa hẹn, nơi hai tâm hồn cùng nhau tự do phiêu lưu.",
        reversed: "Một tiếng thở dài trong tình cảm khi mối quan hệ có dấu hiệu thiếu cam kết hoặc hời hợt. Có lẽ bạn đang để bản thân trôi dạt vô định hoặc mù quáng tô hồng một người không thực sự thuộc về mình."
      },
      career: {
        upright: "Một chân trời sự nghiệp mới đang rộng mở. Dù phía trước là vô vàn biến số, nhưng chính sự táo bạo và tinh thần 'dám nghĩ dám làm' sẽ là chiếc chìa khóa vàng giúp bạn kiến tạo nên những kỳ tích bất ngờ.",
        reversed: "Cẩn trọng với những bước đi bồng bột chốn công sở. Việc thiếu đi một bản kế hoạch chỉn chu hoặc đánh giá quá cao năng lực bản thân có thể dẫn bạn vào những vấp ngã không đáng có."
      },
      finance: {
        upright: "Cánh cửa tài lộc đang hé mở với những cơ hội đầu tư đầy tiềm năng. Tuy nhiên, vũ trụ khuyên bạn hãy bước đi với sự lạc quan nhưng không quên mang theo hành trang là sự hiểu biết cặn kẽ.",
        reversed: "Một lời cảnh báo đỏ về sự phung phí và những quyết định xuất tiền vô tội vạ. Tránh xa những mộng tưởng 'làm giàu sau một đêm' nếu bạn không muốn ví tiền của mình cạn kiệt vì sự bất cẩn."
      },
      health: {
        upright: "Cơ thể bạn đang căng tràn nhựa sống, hệt như mùa xuân đang về. Đây là thời điểm tuyệt vời để thiết lập một thói quen rèn luyện mới, giúp thanh lọc cả thể chất lẫn tinh thần.",
        reversed: "Sự chủ quan đang bào mòn sinh lực của bạn. Đừng phớt lờ những lời thì thầm cảnh báo từ cơ thể, và hãy cẩn trọng với những tai nạn vặt vãnh do sự bất cẩn gây ra."
      },
      spiritual: {
        upright: "Linh hồn bạn đang khao khát được cất cánh. Một sự thức tỉnh tâm linh mạnh mẽ, giục giã bạn dấn thân vào hành trình đi tìm bản ngã chân thật nhất mà không bị trói buộc bởi bất kỳ giáo điều nào.",
        reversed: "Cảm giác chông chênh, lạc lõng giữa dòng đời vạn biến. Bạn có thể đang bấu víu vào những niềm tin hời hợt mà quên mất việc đào sâu vào cội rễ tâm hồn mình."
      }
    },
    advice: "Hãy dũng cảm dang rộng đôi cánh để đón gió, nhưng đừng quên cúi nhìn mặt đất dưới chân. Sự tự do đích thực luôn đi kèm với ý thức trách nhiệm."
  },
  1: { // The Magician
    generalUpright: "The Magician là hiện thân rực rỡ của quyền năng sáng tạo và ý chí sắt đá. Mọi nguyên tố của vũ trụ đều đang hội tụ trong tầm tay bạn. Đây là thời khắc chín muồi để thôi mộng mơ và bắt đầu xắn tay áo lên, biến những ý tưởng vô hình thành những thành tựu hữu hình rực rỡ.",
    generalReversed: "Khi năng lượng bị đảo ngược, lá bài phản chiếu những mảng tối của sự thao túng, lừa lọc hoặc những tài năng đang bị để cho hoài phí. Bạn có thể đang thiếu đi sự tập trung cốt lõi, hoặc đang dệt nên những ảo ảnh để tự lừa dối chính bản thân mình.",
    aspects: {
      love: {
        upright: "Một lực hút nam châm vô hình đang kéo hai người lại gần nhau. Bạn hoặc người ấy đang nắm thế chủ động, dùng sự quyến rũ và tinh tế để kiến tạo nên một mối quan hệ lãng mạn đầy thăng hoa.",
        reversed: "Bóng đen của sự thao túng tâm lý (gaslighting) hoặc những lời hứa trăng hoa đang che phủ tình yêu. Cần cực kỳ tỉnh táo trước những ngôn từ đường mật nhưng thiếu vắng hành động chân thành."
      },
      career: {
        upright: "Thảm đỏ đang trải dài cho con đường công danh của bạn. Với kỹ năng sắc bén và sự nhạy bén thiên bẩm, mọi dự án bạn chạm tay vào đều có khả năng hóa thành vàng. Hãy mạnh dạn khởi xướng!",
        reversed: "Bạn đang như một vị pháp sư đánh mất chiếc đũa thần—chơi vơi, thiếu định hướng hoặc không thể phô diễn hết thực lực. Cẩn trọng với những đồng nghiệp có tâm cơ hoặc những bản hợp đồng mập mờ."
      },
      finance: {
        upright: "Dòng chảy tài lộc đang được khai thông. Sự thông tuệ và những chiến lược sắc sảo sẽ mang về cho bạn những khoản lợi nhuận đáng mơ ước. Cơ hội làm giàu đang nằm ngay trong tay bạn.",
        reversed: "Tránh xa những lời mời mọc đầu tư 'việc nhẹ lương cao' hoặc những ngón đòn tài chính rủi ro. Có những cái bẫy tinh vi đang được giăng ra để trục lợi từ sự tin người của bạn."
      },
      health: {
        upright: "Sức mạnh chữa lành nội tại đang được kích hoạt. Sự kết hợp hài hòa giữa ý chí tinh thần và việc rèn luyện thể chất sẽ mang lại cho bạn một cơ thể cường tráng và dẻo dai.",
        reversed: "Những triệu chứng mơ hồ đang làm phiền bạn. Đừng tự làm bác sĩ cho chính mình; hãy tìm kiếm sự chẩn đoán chuyên sâu từ những chuyên gia y tế uy tín để tránh chữa lợn lành thành lợn què."
      },
      spiritual: {
        upright: "Khả năng thấu thị và kết nối với Vũ trụ đạt đến đỉnh cao ('Trên sao, dưới vậy'). Bạn nhận ra rằng tâm thức của mình chính là kiến trúc sư xây dựng nên thực tại xung quanh.",
        reversed: "Năng lượng tâm linh đang bị lợi dụng cho những mưu đồ ích kỷ. Sự ngạo mạn có thể cắt đứt sợi dây liên kết thiêng liêng giữa bạn và ánh sáng của Đấng Tối Cao."
      }
    },
    advice: "Quyền năng sáng tạo nằm trong chính tư duy của bạn. Hãy tập trung ý chí như một tia laser và biến mọi khát vọng thành hiện thực."
  },
  2: { // The High Priestess
    generalUpright: "Tĩnh lặng như bóng đêm, sâu thẳm như đại dương, Nữ Tư Tế (The High Priestess) là người nắm giữ chiếc chìa khóa mở ra cánh cửa của tri thức huyền bí và trực giác thiêng liêng. Đã đến lúc bạn ngừng tìm kiếm câu trả lời từ thế giới xô bồ ngoài kia, lùi lại một bước và lắng nghe tiếng thì thầm cất lên từ chính cõi lòng mình.",
    generalReversed: "Một bức màn sương mù đang che khuất tầm nhìn. Bạn đang để những tiếng ồn ào của đám đông lấn át đi tiếng nói trực giác, hoặc đang cố tình ngoảnh mặt làm ngơ trước những bí mật đầy góc khuất vừa bị phơi bày.",
    aspects: {
      love: {
        upright: "Một tình yêu nhuốm màu bí ẩn, lãng mạn và có sự gắn kết sâu sắc về mặt linh hồn. Đôi khi, nó khuyên bạn nên giữ kín tình cảm của mình, dùng sự thấu cảm tinh tế để cảm nhận đối phương thay vì dùng lời nói.",
        reversed: "Những dòng chảy ngầm của sự dối trá, che đậy đang bào mòn niềm tin. Cảm xúc bị đè nén quá lâu có thể tạo ra những rạn nứt vô hình nhưng sâu hoắm trong mối quan hệ."
      },
      career: {
        upright: "Đây không phải là lúc để hành động bốc đồng hay phô trương thanh thế. Hãy lùi lại phía sau cánh gà, quan sát tinh tế và âm thầm trau dồi tri thức. Có những thông tin quan trọng vẫn còn đang được giấu kín.",
        reversed: "Bạn đang bị che mắt hoặc bị đẩy ra khỏi luồng thông tin cốt lõi của công ty. Đừng vội đặt bút ký kết bất kỳ điều khoản nào khi trực giác của bạn đang rung lên hồi chuông cảnh báo."
      },
      finance: {
        upright: "Giữ kín chiếc ví và những kế hoạch tài chính của bạn trong bóng tối. Hãy kiên nhẫn chờ đợi, thu thập thêm dữ liệu trước khi quyết định rót vốn vào bất kỳ lĩnh vực nào.",
        reversed: "Nguy cơ bị cuốn vào những giao dịch mờ ám hoặc trở thành nạn nhân của một vụ lừa đảo tài chính tinh vi. Sự thiếu minh bạch đang đe dọa trực tiếp đến túi tiền của bạn."
      },
      health: {
        upright: "Cơ thể bạn là một ngôi đền linh thiêng mang theo những thông điệp riêng. Hãy đặc biệt chú ý đến sức khỏe nội tiết tố, chu kỳ sinh học và chăm sóc đời sống tinh thần để giữ sự tĩnh tại.",
        reversed: "Việc phớt lờ những dấu hiệu cảnh báo nhỏ nhặt của cơ thể có thể dẫn đến những hệ lụy khó lường. Đã đến lúc bạn cần đối mặt và đi tìm căn nguyên thực sự của căn bệnh."
      },
      spiritual: {
        upright: "Mở ra nhãn quan thứ ba để kết nối với cõi siêu thức. Đây là thời kỳ hoàng kim cho việc tu tập, thiền định và giải mã những giấc mơ mang tính tiên tri.",
        reversed: "Linh hồn trở nên khô cằn vì mải miết chạy theo những giá trị vật chất bề nổi. Bạn đang đánh mất đi chiếc la bàn nội tâm của chính mình."
      }
    },
    advice: "Đừng vội vàng hành động khi bức màn bí mật chưa được vén lên. Sự tĩnh lặng và trực giác nhạy bén chính là tấm khiên vững chắc nhất của bạn lúc này."
  }
};

for (let id in enriched) {
  const cIndex = db.findIndex(c => c.id == id);
  if (cIndex !== -1) {
    db[cIndex].generalUpright = enriched[id].generalUpright;
    db[cIndex].generalReversed = enriched[id].generalReversed;
    db[cIndex].aspects.love.upright = enriched[id].aspects.love.upright;
    db[cIndex].aspects.love.reversed = enriched[id].aspects.love.reversed;
    db[cIndex].aspects.career.upright = enriched[id].aspects.career.upright;
    db[cIndex].aspects.career.reversed = enriched[id].aspects.career.reversed;
    db[cIndex].aspects.finance.upright = enriched[id].aspects.finance.upright;
    db[cIndex].aspects.finance.reversed = enriched[id].aspects.finance.reversed;
    db[cIndex].aspects.health.upright = enriched[id].aspects.health.upright;
    db[cIndex].aspects.health.reversed = enriched[id].aspects.health.reversed;
    db[cIndex].aspects.spiritual.upright = enriched[id].aspects.spiritual.upright;
    db[cIndex].aspects.spiritual.reversed = enriched[id].aspects.spiritual.reversed;
    db[cIndex].advice = enriched[id].advice;
  }
}

fs.writeFileSync('E:/TAROT/data/cards.json', JSON.stringify(db, null, 2));
const jsStr = '// js/data.js - Enriched Vibe Demo\n(function () {\n  window.TAROT_DB = ' + JSON.stringify(db, null, 2) + ';\n})();';
fs.writeFileSync('E:/TAROT/js/data.js', jsStr);
console.log('Enriched first 3 cards');
