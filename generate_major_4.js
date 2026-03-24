const fs = require('fs');

const cards = [
  {
    id: 16,
    name: "The Tower",
    nameVi: "Tòa Tháp",
    number: "XVI",
    arcana: "major",
    image: "cards/16-The-Tower.jpg",
    planet: "Sao Hỏa",
    zodiac: "Không có",
    element: "Lửa",
    keywords: ["Sự phá hủy", "Bất ngờ", "Thảm họa", "Biến đổi đột ngột", "Sụp đổ", "Thức tỉnh", "Gây sốc"],
    keywordsRev: ["Tránh được thảm họa", "Trì hoãn sự thật", "Kháng cự sự sụp đổ", "Sợ thay đổi", "Phục hồi"],
    upright: "The Tower là một cú sốc mạnh mẽ, sự phá hủy hoàn toàn một cấu trúc, niềm tin hay tình huống mà bạn nghĩ là vững chắc. Mặc dù rất đau đớn, nhưng đó là sự phá hủy cần thiết để dọn dẹp nền móng tồi tàn, giúp bạn xây dựng lại thứ tốt đẹp và thật sự vững chắc hơn.",
    reversed: "Bạn đang cố gắng né tránh sự thay đổi tất yếu, trì hoãn một 'cú sốc' đau đớn (chia tay, phá sản...). Hãy nhớ việc trì hoãn chỉ làm thảm họa đến muộn và tồi tệ hơn.",
    aspects: {
      love: {
        up: "Một cú sốc trong tình cảm, có thể là sự lừa dối bị phơi bày, chia tay đột ngột hoặc mâu thuẫn nảy lửa làm thay đổi hoàn toàn cục diện mối quan hệ.",
        rev: "Níu kéo một tình yêu đã mục nát, sợ phải ở một mình nên không dám chấm dứt, dù bạn biết rõ mối quan hệ này đang đầu độc cả hai."
      },
      career: {
        up: "Mất việc đột ngột, công ty phá sản, dự án sụp đổ hoặc một sự thật động trời nơi làm việc bị tiết lộ. Sự nghiệp có biến động tiêu cực ngoài dự kiến.",
        rev: "Cố bám víu lấy một công việc tệ hại hoặc từ chối chấp nhận rằng con đường sự nghiệp hiện tại đã đi vào ngõ cụt."
      },
      finance: {
        up: "Khủng hoảng tài chính trầm trọng, mất tiền, nợ nần bất ngờ hoặc sự thật về tài sản bị che giấu bấy lâu bị phơi bày. Cần cẩn thận đầu tư.",
        rev: "Tránh được rủi ro tài chính trong gang tấc nhưng bạn vẫn chưa rút ra bài học. Không chịu thay đổi kế hoạch tiền bạc lỏng lẻo."
      },
      health: {
        up: "Sức khỏe đột ngột có vấn đề lớn (tai nạn, bệnh cấp tính) do bỏ qua các cảnh báo trước đó. Cơ thể bạn đang bắt buộc bạn phải dừng lại.",
        rev: "Bỏ qua các triệu chứng bệnh, sợ hãi không dám đi khám. Đừng để bệnh tật tích tụ đến mức sụp đổ hoàn toàn."
      },
      spiritual: {
        up: "Sự thức tỉnh tâm linh đau đớn. Những niềm tin cũ, giáo điều giả dối mà bạn từng theo đuổi bị phá vỡ hoàn toàn.",
        rev: "Bám víu vào các ảo tưởng tôn giáo hoặc triết học sai lầm vì sợ hãi sự thật phũ phàng."
      }
    },
    advice: "Đừng cố giữ lại tòa tháp đang bốc cháy. Hãy nhảy ra, chấp nhận sự mất mát và bắt đầu dọn dẹp đống đổ nát để xây dựng lại.",
    numerology: "16 - Sự tái sinh từ đống tro tàn, ánh sáng chớp nhoáng (sự thức tỉnh)."
  },
  {
    id: 17,
    name: "The Star",
    nameVi: "Ngôi Sao",
    number: "XVII",
    arcana: "major",
    image: "cards/17-The-Star.jpg",
    planet: "Sao Thiên Vương",
    zodiac: "Bảo Bình",
    element: "Khí",
    keywords: ["Hy vọng", "Chữa lành", "Niềm tin", "Cảm hứng", "Sự tĩnh lặng", "Lạc quan", "Phục hồi"],
    keywordsRev: ["Tuyệt vọng", "Mất niềm tin", "Mất kết nối", "Thất vọng", "Bi quan", "Cạn kiệt"],
    upright: "The Star xuất hiện sau giông bão (The Tower) mang đến ánh sáng của hy vọng, sự chữa lành và niềm tin vào tương lai. Nó nhắc nhở rằng vũ trụ luôn hỗ trợ bạn. Mọi thứ đang dần trở lại bình yên, tinh thần bạn được thanh lọc và nạp lại cảm hứng tươi mới.",
    reversed: "Sự bi quan, đánh mất niềm tin vào bản thân và cuộc sống. Bạn đang tập trung quá nhiều vào những mặt tiêu cực, không nhìn thấy ánh sáng phía cuối con đường hầm.",
    aspects: {
      love: {
        up: "Mối quan hệ yên bình, chân thành và thấu hiểu. Rất tốt cho những ai đang hàn gắn vết thương cũ, hoặc báo hiệu một tình yêu mới trong sáng sắp đến.",
        rev: "Bạn đang đóng cửa trái tim vì sợ tổn thương lại. Hoặc tình yêu hiện tại thiếu niềm tin, chứa đầy sự bi quan và nghi ngờ lẫn nhau."
      },
      career: {
        up: "Môi trường làm việc lý tưởng, tràn đầy cảm hứng sáng tạo. Bạn cảm thấy được đánh giá cao, công việc phát triển thuận lợi và đầy hứa hẹn.",
        rev: "Mất cảm hứng với công việc, cảm thấy như thể mọi nỗ lực đều vô ích. Sự bi quan làm bạn không dám nắm bắt cơ hội mới."
      },
      finance: {
        up: "Niềm tin vào sự ổn định tài chính. Mọi khoản đầu tư sẽ bắt đầu sinh lời nhờ sự kiên nhẫn. Bạn không còn lo lắng về tiền bạc.",
        rev: "Cảm thấy thiếu thốn dù thực tế không đến mức tồi tệ. Hãy cẩn thận thái độ tiêu cực về tiền bạc (scarcity mindset) sẽ cản trở tài lộc."
      },
      health: {
        up: "Quá trình hồi phục sức khỏe tuyệt vời. Thể chất và tinh thần hòa quyện làm một. Các phương pháp trị liệu đang đi đúng hướng.",
        rev: "Sự suy kiệt về sức khỏe thường bắt nguồn từ tâm lý tuyệt vọng hoặc lo âu quá độ. Cần nuôi dưỡng tinh thần lạc quan trước tiên."
      },
      spiritual: {
        up: "Kết nối sâu sắc với vũ trụ. Sự trần trụi của người phụ nữ trong lá bài thể hiện tâm hồn bạn đã gột rửa mọi dối trá, thuần khiết và chân thực.",
        rev: "Mất niềm tin vào Đấng Tối Cao hoặc Vũ Trụ. Cảm giác bị bỏ rơi và lạc lõng trong tâm linh."
      }
    },
    advice: "Hãy trút bỏ lớp vỏ bọc bên ngoài. Lạc quan lên, tiếp tục hy vọng và đón nhận nguồn cảm hứng chữa lành mà vũ trụ gửi đến.",
    numerology: "17 - Sự chữa lành, tái tạo, trực giác và ánh sáng."
  },
  {
    id: 18,
    name: "The Moon",
    nameVi: "Mặt Trăng",
    number: "XVIII",
    arcana: "major",
    image: "cards/18-The-Moon.jpg",
    planet: "Mặt Trăng",
    zodiac: "Song Ngư",
    element: "Nước",
    keywords: ["Bóng tối", "Sự ảo tưởng", "Sợ hãi", "Tiềm thức", "Lo âu", "Trực giác", "Sự thật bị che giấu"],
    keywordsRev: ["Giải tỏa ảo tưởng", "Tìm ra sự thật", "Hết sợ hãi", "Sự dối trá bị phơi bày", "Hiểu lầm được làm rõ"],
    upright: "Lá The Moon đại diện cho cõi vô thức, những giấc mơ, ảo ảnh và nỗi sợ hãi ẩn sâu (con sói và chú chó tru dưới trăng). Mọi thứ lúc này mờ ảo, không rõ ràng và dễ bị đánh lừa. Đừng vội ra quyết định, hãy đi theo ánh sáng của trực giác thay vì nỗi sợ tâm lý.",
    reversed: "Sương mù đang tan dần. Những bí mật đen tối, sự dối trá hay ảo tưởng đang dần bị phơi bày ra ánh sáng. Bạn bắt đầu vượt qua được sự nhầm lẫn và lo âu.",
    aspects: {
      love: {
        up: "Sự hiểu lầm, ghen tuông vô cớ do sự lo âu, tự ti của bản thân. Hoặc báo hiệu một mối quan hệ thiếu rõ ràng, mập mờ, có sự dối trá che đậy.",
        rev: "Sự lừa dối trong tình cảm bị phát hiện. Hai người bắt đầu nói chuyện thẳng thắn, giải quyết những hiểu lầm để nhìn rõ sự thật về nhau."
      },
      career: {
        up: "Môi trường làm việc đầy rẫy tin đồn thất thiệt, thiếu minh bạch. Có người đâm sau lưng, hoặc bạn đang làm những công việc liên quan đến bí mật, nghệ thuật.",
        rev: "Sự minh bạch trở lại. Các quyết định kinh doanh mờ ám được làm rõ. Bạn không còn bị ảo tưởng về một công việc hoàn hảo."
      },
      finance: {
        up: "Đây không phải lúc ký hợp đồng hay đầu tư lớn vì bạn chưa nắm đủ thông tin (cẩn thận bị lừa đảo). Cảnh giác với những phi vụ làm ăn 'bánh vẽ'.",
        rev: "Bạn nhận ra sai lầm tài chính trước khi quá muộn. Vạch trần được sự gian lận hoặc thoát khỏi một vụ lừa đảo tinh vi."
      },
      health: {
        up: "Sức khỏe tâm lý bị ảnh hưởng bởi rối loạn lo âu, trầm cảm, mất ngủ hoặc những cơn ác mộng dai dẳng (liên quan đến bóng tối tiềm thức).",
        rev: "Tình trạng tâm lý chuyển biến tốt. Bạn tìm ra được căn nguyên của nỗi sợ hãi và bắt đầu đối mặt chữa trị nó."
      },
      spiritual: {
        up: "Đi sâu vào tiềm thức, cẩn thận kẻo bị lạc trong những bóng ma quá khứ (con tôm hùm bò lên từ đầm lầy).",
        rev: "Vượt qua đêm tối của linh hồn (Dark night of the soul). Đón nhận sự thật dù đau đớn để trưởng thành."
      }
    },
    advice: "Dưới ánh trăng mờ ảo, đừng để nỗi sợ hãi đánh lừa bạn. Hãy bình tĩnh, lắng nghe trực giác và chờ đợi cho đến khi sự thật lộ sáng.",
    numerology: "18 - Giấc mơ, ảo ảnh, bóng tối."
  },
  {
    id: 19,
    name: "The Sun",
    nameVi: "Mặt Trời",
    number: "XIX",
    arcana: "major",
    image: "cards/19-The-Sun.jpg",
    planet: "Mặt Trời",
    zodiac: "Sư Tử",
    element: "Lửa",
    keywords: ["Thành công", "Hạnh phúc", "Sự thật", "Sức sống", "Niềm vui", "Sáng tỏ", "Lạc quan"],
    keywordsRev: ["Tích cực giả tạo", "Chậm trễ", "U sầu", "Trẻ con quá mức", "Tự cao", "Niềm vui bị lu mờ"],
    upright: "Lá The Sun là một trong những lá bài rực rỡ và tích cực nhất trong bộ Tarot. Nó báo hiệu sự thành công viên mãn, sức sống dồi dào, niềm vui đích thực (đứa trẻ vui đùa) và ánh sáng chân lý xua tan mọi mờ ám của lá The Moon trước đó.",
    reversed: "Sự tiêu cực tạm thời. Mặc dù kết quả cuối cùng vẫn tốt đẹp, nhưng bạn có thể cảm thấy khó khăn trong việc đón nhận niềm vui, hoặc sự thành công đến muộn hơn dự kiến. Tránh kiêu ngạo quá mức.",
    aspects: {
      love: {
        up: "Một tình yêu tràn ngập tiếng cười, sự chân thành và hạnh phúc rạng ngời. Rất thuận lợi cho những ai mong muốn tiến tới hôn nhân hoặc có con cái.",
        rev: "Có chút buồn bã hoặc cãi vã nhỏ, nhưng sẽ nhanh chóng làm hòa. Hoặc bạn đang quá ích kỷ, trẻ con trong việc yêu cầu đối phương chiều chuộng."
      },
      career: {
        up: "Sự nghiệp thăng hoa tột đỉnh. Bạn được tỏa sáng, công nhận năng lực, đạt được mọi mục tiêu dự án. Một môi trường làm việc cực kỳ tích cực.",
        rev: "Thành công trong công việc bị trì hoãn một chút. Hoặc cái tôi (Ego) của bạn quá lớn, dẫn đến tự mãn và bỏ qua những lời góp ý của đồng nghiệp."
      },
      finance: {
        up: "Sự sung túc tài chính. Tiền bạc dồi dào, thu nhập tăng trưởng mạnh. Đầu tư đâu trúng đó, lộc lá đủ đầy.",
        rev: "Tài lộc có tới nhưng không nhiều như mong đợi. Hoặc bạn đang chi tiêu quá trớn cho những thú vui nhất thời."
      },
      health: {
        up: "Cơ thể khỏe mạnh, sinh lực tràn trề. Cực kỳ thuận lợi nếu đang điều trị bệnh hoặc mong muốn mang thai.",
        rev: "Sức khỏe không gặp vấn đề nghiêm trọng, chỉ là bạn hơi uể oải, mệt mỏi hoặc thiếu vitamin D (thiếu nắng). Cần giữ tinh thần tích cực."
      },
      spiritual: {
        up: "Sự thấu hiểu tâm linh rực rỡ nhất. Đứa trẻ cưỡi ngựa trắng biểu thị cho một tâm hồn tự do, thuần khiết và hạnh phúc trọn vẹn.",
        rev: "Để bản ngã (Ego) che mờ ánh sáng tâm linh đích thực. Tự lừa mình dối người bằng những niềm vui hời hợt bề ngoài."
      }
    },
    advice: "Hãy tận hưởng niềm vui và lan tỏa sự rực rỡ của mình cho mọi người. Bạn xứng đáng với những gì tốt đẹp nhất lúc này.",
    numerology: "19 - Ánh sáng, năng lượng Dương, sự hoàn mỹ."
  },
  {
    id: 20,
    name: "Judgement",
    nameVi: "Phán Xét",
    number: "XX",
    arcana: "major",
    image: "cards/20-Judgement.jpg",
    planet: "Sao Diêm Vương",
    zodiac: "Không có",
    element: "Lửa",
    keywords: ["Sự tái sinh", "Tha thứ", "Tiếng gọi nội tâm", "Đánh giá lại", "Giác ngộ", "Phán xét", "Thức tỉnh"],
    keywordsRev: ["Phủ nhận lỗi lầm", "Nghi ngờ bản thân", "Phán xét gay gắt", "Từ chối tiếng gọi", "Trì trệ", "Hối hận"],
    upright: "Lá Judgement là tiếng kèn thức tỉnh, kêu gọi bạn trỗi dậy từ những sai lầm cũ (người chết sống lại từ nấm mồ). Đã đến lúc đánh giá lại cuộc đời mình một cách công bằng, tha thứ cho bản thân/người khác, và bắt đầu một chương mới với mức độ giác ngộ cao hơn.",
    reversed: "Sự sợ hãi việc phải đối mặt với sai lầm quá khứ. Bạn đang phán xét bản thân quá khắc nghiệt, hoặc ngược lại, hoàn toàn phớt lờ 'tiếng gọi' của lương tâm để tiếp tục sống trong sự lẩn tránh.",
    aspects: {
      love: {
        up: "Một sự đánh giá nghiêm túc về mối quan hệ. Có thể là hai người cùng nhìn nhận lại lỗi lầm cũ, tha thứ và 'tái sinh' tình cảm mạnh mẽ hơn. Hoặc đưa ra quyết định chia tay sáng suốt.",
        rev: "Chì chiết nhau vì những chuyện đã qua. Không chịu tha thứ, hoặc bạn đang phán xét người yêu của mình một cách bất công."
      },
      career: {
        up: "Đánh giá hiệu suất làm việc. Bạn nhận ra được đâu là mục đích thực sự của công việc hiện tại. Có sự thay đổi công việc thuận theo 'tiếng gọi' sâu xa từ bên trong.",
        rev: "Từ chối thay đổi nghề nghiệp dù bạn biết rõ mình đang đi sai đường. Sợ hãi sự phán xét từ đồng nghiệp hoặc xã hội."
      },
      finance: {
        up: "Kiểm tra lại toàn bộ tình trạng tài chính. Đã đến lúc phải đưa ra một quyết định tiền bạc dứt khoát, sáng suốt để cứu vãn hoặc gia tăng tài sản.",
        rev: "Không dám nhìn thẳng vào thực trạng nợ nần tài chính. Gặp khó khăn do những quyết định sai lầm từ trước nhưng từ chối sửa sai."
      },
      health: {
        up: "Vượt qua được cơn bạo bệnh, cơ thể và tinh thần được 'tái sinh'. Đòi hỏi một sự thay đổi tận gốc thói quen sinh hoạt cũ.",
        rev: "Bỏ qua tiếng nói cảnh báo của cơ thể. Bạn đang quá cố chấp với các thói quen gây hại và từ chối chữa trị tích cực."
      },
      spiritual: {
        up: "Được giải thoát khỏi nghiệp chướng (Karma) cũ. Thức tỉnh linh hồn ở mức độ cao nhất, đáp lại tiếng gọi của Đấng Tối Cao.",
        rev: "Dằn vặt vì mặc cảm tội lỗi. Mất kết nối với Đấng Tạo Hóa, trốn tránh trách nhiệm linh hồn."
      }
    },
    advice: "Hãy thành thật đối diện với chính mình. Lắng nghe tiếng gọi nội tâm, tha thứ cho quá khứ và dũng cảm đón nhận sự tái sinh.",
    numerology: "20 - Sự thức tỉnh, chuyển tiếp không gian tâm linh, đánh giá."
  },
  {
    id: 21,
    name: "The World",
    nameVi: "Thế Giới",
    number: "XXI",
    arcana: "major",
    image: "cards/21-The-World.jpg",
    planet: "Sao Thổ",
    zodiac: "Không có",
    element: "Đất",
    keywords: ["Hoàn thành", "Viên mãn", "Thành tựu", "Chu kỳ kết thúc", "Du lịch", "Sự thống nhất", "Trọn vẹn"],
    keywordsRev: ["Chưa hoàn thành", "Bỏ dở giữa chừng", "Trì hoãn", "Thiếu kết luận", "Mắc kẹt", "Thiếu sự trọn vẹn"],
    upright: "Lá bài kết thúc của bộ Ẩn Chính, The World, biểu trưng cho sự trọn vẹn, viên mãn và hoàn tất một chu kỳ lớn của cuộc đời (Hành trình của chàng ngốc The Fool đã thành công). Mọi thứ đều thống nhất hài hòa. Đây là lúc ăn mừng những thành quả đã đạt được.",
    reversed: "Mặc dù bạn đã ở rất gần vạch đích, nhưng vì một lý do nào đó, mọi thứ vẫn chưa thể hoàn thiện (như dự án kéo dài không xong, mối quan hệ thiếu đi cái kết có hậu). Sự thiếu trọn vẹn gây bức bối.",
    aspects: {
      love: {
        up: "Tình yêu đi đến cái đích viên mãn (kết hôn, xây dựng gia đình hạnh phúc trọn vẹn). Cảm giác hai người thuộc về nhau một cách hoàn hảo (soulmates).",
        rev: "Tình cảm chưa đi đến đâu, thiếu một cam kết rõ ràng. Hoặc bạn đang mắc kẹt trong việc tìm kiếm một 'người hoàn hảo' không có thật."
      },
      career: {
        up: "Dự án hoàn thành xuất sắc. Đạt được vị trí sự nghiệp cao nhất. Đôi khi nó báo hiệu một công việc liên quan đến du lịch quốc tế hoặc vươn tầm thế giới.",
        rev: "Công việc bị đình trệ ở phút chót. Bạn đã dồn nhiều công sức nhưng chưa nhận được sự công nhận xứng đáng hoặc dự án bị bỏ dở giữa chừng."
      },
      finance: {
        up: "Sự độc lập tài chính hoàn toàn. Những nỗ lực đầu tư đã đem lại lợi nhuận như mong muốn. Vượt qua mọi gánh nặng tiền bạc.",
        rev: "Tài chính chưa thể ổn định vì thiếu sót một vài khâu quan trọng. Bạn có thể bị hụt mất một khoản tiền lớn đáng lẽ đã cầm chắc trong tay."
      },
      health: {
        up: "Sức khỏe cực kỳ tốt ở cả thể chất, tinh thần và cảm xúc. Việc điều trị bệnh đã đạt kết quả viên mãn, khỏi hoàn toàn.",
        rev: "Cảm thấy khó chịu, chưa hoàn toàn bình phục dù bệnh đã thuyên giảm. Cần giải quyết nốt những nguyên nhân gốc rễ cuối cùng."
      },
      spiritual: {
        up: "Hòa nhập hoàn toàn với dòng chảy vũ trụ (Oneness). Thấu hiểu sâu sắc luật vận hành của cõi nhân sinh.",
        rev: "Cảm thấy thiếu một mảnh ghép nhỏ trong tâm hồn để có thể giác ngộ. Sự cản trở từ cái tôi cuối cùng chưa thể buông bỏ."
      }
    },
    advice: "Hãy tự hào về hành trình bạn đã vượt qua. Tận hưởng thành quả, và chuẩn bị sẵn sàng bước sang một chương mới của cuộc đời.",
    numerology: "21 - Sự viên mãn, hoàn hảo, vòng tròn sự sống kết nối."
  }
];

fs.writeFileSync('E:/TAROT/js/major_16_21.json', JSON.stringify(cards, null, 2));
