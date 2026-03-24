const fs = require('fs');

const cards = [
  {
    id: 6,
    name: "The Lovers",
    nameVi: "Tình Nhân",
    number: "VI",
    arcana: "major",
    image: "cards/6-The-Lovers.jpg",
    planet: "Sao Thủy",
    zodiac: "Song Tử",
    element: "Khí",
    keywords: ["Tình yêu", "Sự hòa hợp", "Mối quan hệ", "Lựa chọn", "Sự gắn kết tâm hồn", "Đối tác"],
    keywordsRev: ["Bất hòa", "Lựa chọn sai lầm", "Mất cân bằng", "Sợ cam kết", "Thiếu sự kết nối"],
    upright: "Lá The Lovers biểu trưng cho một mối tình lãng mạn, sự gắn kết bền chặt về tâm hồn. Ở mức độ sâu hơn, nó còn đại diện cho việc đưa ra một lựa chọn quan trọng mang tính đạo đức hoặc ngã rẽ cuộc đời, nơi bạn phải chọn con đường phù hợp với hệ giá trị cốt lõi của mình.",
    reversed: "Sự mất cân bằng, mâu thuẫn nội tâm, hoặc xung đột trong một mối quan hệ. Có thể bạn đang né tránh trách nhiệm về lựa chọn của mình hoặc có sự lừa dối từ cả hai phía.",
    aspects: {
      love: {
        up: "Một tình yêu lãng mạn, sâu sắc, đồng điệu về cả thể xác lẫn tâm hồn. Sự thu hút mãnh liệt giữa hai người. Một mối tình khắc cốt ghi tâm.",
        rev: "Cảnh báo mâu thuẫn, lạnh nhạt. Có thể có sự xen vào của người thứ ba, hoặc bạn đang phải đưa ra quyết định khó khăn trong tình cảm."
      },
      career: {
        up: "Quan hệ đối tác tốt đẹp trong công việc, đồng nghiệp hỗ trợ đắc lực. Có một ngã rẽ sự nghiệp buộc bạn phải chọn lựa hướng đi quan trọng.",
        rev: "Xung đột với sếp hoặc đối tác kinh doanh. Bạn có thể bị phân tâm bởi các vấn đề cá nhân khi làm việc."
      },
      finance: {
        up: "Bạn đang đứng trước hai quyết định tài chính quan trọng và cần phải cân nhắc kỹ. Tài lộc đến từ việc kết hợp kinh doanh với người hợp ý.",
        rev: "Chi tiêu thiếu kiểm soát vì những lý do cá nhân. Đưa ra các quyết định đầu tư sai lầm do không suy nghĩ kỹ lưỡng."
      },
      health: {
        up: "Sự hòa hợp giữa cơ thể và tâm trí. Rất tốt nếu bạn có một người bạn đồng hành trong việc ăn kiêng hoặc luyện tập.",
        rev: "Sức khỏe kém do mâu thuẫn nội tâm, căng thẳng thần kinh hoặc không thể cân bằng công việc và nghỉ ngơi."
      },
      spiritual: {
        up: "Bạn học cách thấu hiểu và yêu thương bản thân trọn vẹn. Chấp nhận cả mặt tốt lẫn mặt xấu của mình (shadow work).",
        rev: "Sự giằng xé giữa các niềm tin tôn giáo hoặc tâm linh. Tránh xa ánh sáng bên trong vì cảm thấy không xứng đáng."
      }
    },
    advice: "Dù trong tình cảm hay công việc, hãy đưa ra sự lựa chọn xuất phát từ sự trung thực và trái tim của bạn. Sự hòa hợp chỉ đến khi các giá trị cá nhân được tôn trọng.",
    numerology: "6 - Tình yêu, cân bằng, sắc đẹp, trách nhiệm."
  },
  {
    id: 7,
    name: "The Chariot",
    nameVi: "Cỗ Xe",
    number: "VII",
    arcana: "major",
    image: "cards/7-The-Chariot.jpg",
    planet: "Mặt Trăng",
    zodiac: "Cự Giải",
    element: "Nước",
    keywords: ["Kiểm soát", "Ý chí", "Thành công", "Hành động", "Sự tiến lên", "Quyết tâm", "Vượt qua thử thách"],
    keywordsRev: ["Thiếu kiểm soát", "Khó khăn", "Bị động", "Mất phương hướng", "Cản trở", "Mắc kẹt"],
    upright: "Lá bài The Chariot nói về ý chí sắt đá, sự tập trung và sự kiểm soát năng lượng tích cực/tiêu cực để hướng tới thành công. Bất kể thử thách nào, nếu duy trì sự quyết tâm và tiến về phía trước, bạn sẽ giành chiến thắng.",
    reversed: "Mất kiểm soát cuộc sống, bị động trước hoàn cảnh, hoặc bạn đang thúc ép bản thân mù quáng đi theo một hướng không phù hợp. Có thể bị chậm trễ trong các dự định.",
    aspects: {
      love: {
        up: "Thời điểm cả hai phải nỗ lực vượt qua khó khăn để duy trì tình cảm. Đòi hỏi bạn phải có kiểm soát cảm xúc để giải quyết mâu thuẫn.",
        rev: "Cố gắng gượng ép tình yêu hoặc mất kiên nhẫn với đối tác. Hãy ngưng cố gắng kiểm soát đối phương."
      },
      career: {
        up: "Sự thăng tiến nhanh chóng nhờ vào năng lực và kỷ luật làm việc. Thích hợp cho những công việc yêu cầu tính di chuyển nhiều hoặc cạnh tranh cao.",
        rev: "Bị mất phương hướng nghề nghiệp hoặc công việc giậm chân tại chỗ. Có thể bạn đang cảm thấy bất lực, để sự nghiệp bị người khác chi phối."
      },
      finance: {
        up: "Kiểm soát tốt ngân sách. Sẵn sàng cho những khoản đầu tư mang tính bứt phá, tài chính đang trên đà phát triển mạnh.",
        rev: "Chi tiêu thiếu định hướng. Hãy tránh các khoản đầu tư mạo hiểm khi bạn chưa nắm rõ quy luật."
      },
      health: {
        up: "Năng lượng phục hồi mạnh mẽ. Cần duy trì nhịp độ rèn luyện thể thao tốt.",
        rev: "Cảm thấy kiệt sức do làm việc quá độ. Bạn đang bỏ qua giới hạn của cơ thể và cần phải chậm lại."
      },
      spiritual: {
        up: "Một chuyến đi (cả về vật lý lẫn tâm trí) giúp bạn giác ngộ tâm linh. Sức mạnh nội tâm dồi dào.",
        rev: "Trì hoãn việc phát triển tâm hồn vì bận rộn. Bạn đang theo đuổi các mục tiêu tâm linh một cách gượng ép."
      }
    },
    advice: "Đừng để các thế lực bên ngoài hay cảm xúc cá nhân điều khiển bạn. Hãy cầm chắc dây cương, tập trung vào mục tiêu và tiến tới.",
    numerology: "7 - Sự phát triển, thử thách, bí ẩn và trí tuệ."
  },
  {
    id: 8,
    name: "Strength",
    nameVi: "Sức Mạnh",
    number: "VIII",
    arcana: "major",
    image: "cards/8-Strength.jpg",
    planet: "Mặt Trời",
    zodiac: "Sư Tử",
    element: "Lửa",
    keywords: ["Sức mạnh nội tâm", "Can đảm", "Kiên nhẫn", "Lòng từ bi", "Sức chịu đựng", "Ảnh hưởng", "Nhu thắng cương"],
    keywordsRev: ["Yếu đuối", "Nghi ngờ bản thân", "Sợ hãi", "Tự ti", "Mất tự chủ", "Cảm xúc tiêu cực"],
    upright: "Lá Strength không nói về sức mạnh thể chất, mà là sức mạnh tinh thần, lòng can đảm và sự kiên nhẫn. Sự dịu dàng và từ bi sẽ giúp bạn 'thuần hóa' mọi hoàn cảnh khó khăn hay cơn nóng giận (bản năng thú tính) mà không cần dùng đến bạo lực.",
    reversed: "Sự yếu đuối nội tâm, lòng tự ti, nỗi sợ hãi chiếm ưu thế, hoặc ngược lại là mất kiềm chế cơn nóng giận. Bạn cảm thấy dễ tổn thương hoặc đang dựa dẫm quá nhiều vào người khác.",
    aspects: {
      love: {
        up: "Tình yêu mãnh liệt nhưng được kiểm soát tốt bởi lòng từ bi và sự thấu hiểu. Giúp nhau vượt qua giai đoạn khó khăn bằng tình thương bao dung.",
        rev: "Căng thẳng, xung đột và tức giận. Bạn hoặc đối phương đang mất tự chủ và gây tổn thương bằng lời nói."
      },
      career: {
        up: "Chinh phục đồng nghiệp hoặc cấp trên bằng sự điềm tĩnh, ngoại giao mềm mỏng. Bạn có đủ bản lĩnh để vượt qua mọi áp lực công việc.",
        rev: "Mất tự tin vào năng lực của bản thân hoặc để sự sợ hãi làm bạn vuột mất cơ hội thăng tiến. Khả năng chịu áp lực kém."
      },
      finance: {
        up: "Sự kiên nhẫn trong đầu tư tài chính. Bạn có khả năng kiểm soát cơn thèm khát mua sắm bốc đồng.",
        rev: "Mua sắm vô tội vạ để giải tỏa cảm xúc. Hoặc bạn đang quá nhát gan, không dám đầu tư sinh lời."
      },
      health: {
        up: "Sức khỏe dồi dào và bền bỉ. Năng lượng chữa lành cao, đặc biệt tốt nếu vừa ốm dậy.",
        rev: "Cơ thể suy nhược do áp lực tinh thần lâu ngày. Cẩn thận với các chứng bệnh liên quan đến stress."
      },
      spiritual: {
        up: "Thấu hiểu và hòa giải được với những 'con thú' (phần tối) bên trong mình. Sự trưởng thành vượt bậc về mặt tâm hồn.",
        rev: "Bị ám ảnh bởi những nỗi sợ vô cớ. Để cái tôi (Ego) và bản năng chiến thắng lý trí."
      }
    },
    advice: "Dùng tình yêu thương, lòng bao dung và sự kiên nhẫn để đối mặt với khó khăn. Vũ lực không bao giờ là giải pháp cho lá bài này.",
    numerology: "8 - Sức mạnh, quyền lực, vòng tuần hoàn của nghiệp (Karma)."
  },
  {
    id: 9,
    name: "The Hermit",
    nameVi: "Ẩn Sĩ",
    number: "IX",
    arcana: "major",
    image: "cards/9-The-Hermit.jpg",
    planet: "Sao Thủy",
    zodiac: "Xử Nữ",
    element: "Đất",
    keywords: ["Tĩnh lặng", "Nhìn lại bản thân", "Nội tâm", "Cô đơn", "Sự thông thái", "Hướng dẫn", "Tìm kiếm chân lý"],
    keywordsRev: ["Bị cô lập", "Rút lui quá mức", "Phớt lờ lời khuyên", "Lạc lõng", "Giam mình"],
    upright: "Lá The Hermit báo hiệu một thời kỳ rèn luyện nội tâm, tìm kiếm chân lý thay vì chạy theo những ồn ào bên ngoài. Đã đến lúc tạm rời xa đám đông, tự ngẫm lại chặng đường đã qua để tìm ra ánh sáng soi đường cho giai đoạn sắp tới.",
    reversed: "Sự cô lập kéo dài, từ chối xã giao đến mức cực đoan, hoặc ngược lại là đang từ chối việc ở một mình để suy ngẫm vì sợ hãi sự trống rỗng bên trong.",
    aspects: {
      love: {
        up: "Nếu đang độc thân, bạn ưu tiên tự do và khám phá bản thân hơn. Nếu có đôi, có thể hai người cần không gian riêng để suy nghĩ về mối quan hệ.",
        rev: "Cảm thấy cô đơn ngay cả khi đang ở trong một mối quan hệ. Có sự rạn nứt vì cả hai rút lui vào thế giới riêng."
      },
      career: {
        up: "Bạn đang đặt câu hỏi về định hướng nghề nghiệp của mình (liệu nó có phù hợp với mục tiêu sâu xa không). Cần thời gian tạm nghỉ để lên kế hoạch mới.",
        rev: "Tự cô lập mình khỏi đồng nghiệp, không hợp tác làm việc nhóm. Môi trường làm việc khiến bạn lạc lõng."
      },
      finance: {
        up: "Lá bài không quan tâm đến vật chất. Khuyên bạn nên đánh giá lại các khoản chi tiêu xem điều gì mới thực sự mang lại hạnh phúc cho bạn.",
        rev: "Bạn có thể đang phớt lờ các lời khuyên đúng đắn về tài chính hoặc từ chối đối mặt với nợ nần."
      },
      health: {
        up: "Thời gian tuyệt vời để nghỉ ngơi, phục hồi sức khỏe và thanh lọc cơ thể. Thiền định sẽ đem lại lợi ích lớn.",
        rev: "Các vấn đề tâm lý như trầm cảm, thu mình quá mức. Cần phải ra ngoài và tìm kiếm sự kết nối xã hội để tốt cho sức khỏe tinh thần."
      },
      spiritual: {
        up: "Bạn là một người dẫn đường thực sự (cầm chiếc đèn lồng). Tìm thấy ánh sáng chân lý, sống chánh niệm.",
        rev: "Mắc kẹt trong bóng tối. Không tìm ra lối đi cho tâm trí, từ chối giúp đỡ của người khác."
      }
    },
    advice: "Im lặng là vàng. Đừng vội vàng ra quyết định; câu trả lời bạn đang tìm kiếm nằm ngay bên trong bạn.",
    numerology: "9 - Sự hoàn thiện nội tâm, kết thúc chu kỳ, trí tuệ sâu sắc."
  },
  {
    id: 10,
    name: "Wheel of Fortune",
    nameVi: "Bánh Xe Số Phận",
    number: "X",
    arcana: "major",
    image: "cards/10-Wheel-of-Fortune.jpg",
    planet: "Sao Mộc",
    zodiac: "Không có",
    element: "Lửa",
    keywords: ["Định mệnh", "May mắn", "Thay đổi lớn", "Luân hồi", "Cơ hội", "Bất ngờ", "Bước ngoặt"],
    keywordsRev: ["Xui xẻo", "Mất kiểm soát", "Từ chối thay đổi", "Sự trì trệ", "Hoàn cảnh bất lợi"],
    upright: "Lá Wheel of Fortune nhắc nhở rằng cuộc sống luôn thay đổi và luân chuyển không ngừng (lên rồi xuống). Một chu kỳ mới mang tính bước ngoặt, định mệnh sắp diễn ra. Thường là sự thay đổi tích cực, một cơ hội hoặc may mắn bất ngờ.",
    reversed: "Sự đen đủi, một chuỗi sự kiện nằm ngoài tầm kiểm soát khiến bạn đi xuống. Tuy nhiên, nó cũng nhắc nhở bạn rằng điều tồi tệ này rồi cũng sẽ qua, vì bánh xe vẫn đang quay.",
    aspects: {
      love: {
        up: "Một thay đổi lớn trong chuyện tình cảm (gặp gỡ định mệnh, hoặc bước sang một giai đoạn mới của tình yêu). Cuộc sống tình cảm của bạn sẽ có những bất ngờ thú vị.",
        rev: "Rơi vào giai đoạn xui xẻo trong tình cảm, gặp trắc trở, hoặc mối quan hệ đang tụt dốc. Đừng cố chấp, hãy thuận theo tự nhiên."
      },
      career: {
        up: "Một cơ hội thăng tiến hoặc thay đổi công việc mang tính định mệnh. May mắn đang mỉm cười với bạn trên con đường sự nghiệp.",
        rev: "Biến động công việc không như ý (mất việc, thay đổi môi trường khó khăn). Bạn phải chờ đợi và cố gắng cho đến khi tình hình khá lên."
      },
      finance: {
        up: "Thời vận đến. Cơ hội làm giàu bất ngờ, trúng số hoặc các khoản đầu tư sinh lời vượt ngoài mong đợi.",
        rev: "Suy thoái tài chính, mất tiền do các yếu tố khách quan không lường trước được. Hãy thắt chặt chi tiêu trong giai đoạn này."
      },
      health: {
        up: "Sự thay đổi tích cực trong sức khỏe. Nếu đang ốm, đây là dấu hiệu phục hồi nhờ một phương pháp hoặc bác sĩ giỏi.",
        rev: "Một vài vấn đề sức khỏe bất ngờ hoặc tai nạn ngoài ý muốn. Cần đặc biệt lưu ý an toàn."
      },
      spiritual: {
        up: "Nhận thức sâu sắc về nghiệp quả (Karma). Hiểu rằng mọi chuyện xảy ra trong đời đều có lý do của nó.",
        rev: "Cảm thấy ông trời bất công, bất mãn với số phận và không chịu chấp nhận bài học mà vũ trụ gửi đến."
      }
    },
    advice: "Hãy chấp nhận sự thay đổi của hoàn cảnh với thái độ lạc quan. Hãy làm việc tốt (gieo nhân tốt) để chuẩn bị cho vòng quay vận mệnh tiếp theo.",
    numerology: "10 - Kết thúc và bắt đầu, bước ngoặt, sự hoàn hảo."
  }
];

fs.writeFileSync('E:/TAROT/js/major_6_10.json', JSON.stringify(cards, null, 2));
