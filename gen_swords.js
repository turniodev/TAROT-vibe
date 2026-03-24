const fs = require('fs');

const swords = [
  {
    id: 50, name: "Ace of Swords", nameVi: "Ace of Swords (Một Kiếm)", number: "1", arcana: "minor", suit: "swords", image: "cards/50-Ace-of-Swords.jpg",
    element: "Khí",
    keywords: ["Sự thật", "Minh mẫn", "Ý tưởng mới", "Đột phá tinh thần", "Chiến thắng"],
    keywordsRev: ["Nhầm lẫn", "Quyết định sai lầm", "Mơ hồ", "Tàn nhẫn"],
    upright: "Một sự đột phá về mặt nhận thức, sự minh mẫn và khả năng nhìn thấu sự thật. Một ý tưởng xuất sắc giúp vượt qua mọi khó khăn.",
    reversed: "Sự mù mờ trong suy nghĩ, đưa ra quyết định sai lầm hoặc sử dụng lời nói sắc bén để gây tổn thương người khác một cách tàn nhẫn.",
    aspects: {
      love: { up: "Sự thẳng thắn và giao tiếp rõ ràng trong tình yêu. Nhìn thấu bản chất mối quan hệ.", rev: "Lời nói tổn thương nhau. Những hiểu lầm không đáng có." },
      career: { up: "Một dự án mới đầy trí tuệ. Chiến thắng trong các cuộc đàm phán, tranh luận.", rev: "Bế tắc ý tưởng, giao tiếp kém với đồng nghiệp." },
      finance: { up: "Suy nghĩ logic, quyết định tài chính sắc sảo.", rev: "Đầu tư bốc đồng dựa trên thông tin sai lệch." },
      health: { up: "Tinh thần cực kỳ minh mẫn, phẫu thuật thành công.", rev: "Đau đầu, căng thẳng thần kinh hoặc chẩn đoán sai bệnh." },
      spiritual: { up: "Ánh sáng chân lý xua tan màn sương mù.", rev: "Tự dối mình, không dám đối diện sự thật." }
    }
  },
  {
    id: 51, name: "Two of Swords", nameVi: "Two of Swords (Hai Kiếm)", number: "2", arcana: "minor", suit: "swords", image: "cards/51-Two-of-Swords.jpg",
    element: "Khí",
    keywords: ["Lưỡng lự", "Bế tắc", "Tránh né sự thật", "Từ chối quyết định", "Thỏa hiệp khó khăn"],
    keywordsRev: ["Lựa chọn cuối cùng", "Sự thật phơi bày", "Kết thúc bế tắc", "Xung đột"],
    upright: "Bạn đang đứng giữa ngã ba đường nhưng lại nhắm mắt làm ngơ vì không muốn đối mặt với sự lựa chọn. Sự lưỡng lự gây ra bế tắc.",
    reversed: "Cuối cùng bạn cũng gỡ bịt mắt, đối diện sự thật và đưa ra quyết định, dù có đau đớn hay khó khăn đến mấy.",
    aspects: {
      love: { up: "Mối quan hệ chững lại vì cả hai không chịu giải quyết mâu thuẫn cốt lõi.", rev: "Chấm dứt sự im lặng, bùng nổ cãi vã hoặc chia tay dứt khoát." },
      career: { up: "Bế tắc giữa hai công việc hoặc không dám quyết định hướng đi.", rev: "Bị buộc phải chọn một phe trong cuộc xung đột công ty." },
      finance: { up: "Từ chối kiểm tra sao kê ngân hàng vì sợ hãi thực tại.", rev: "Đối diện nợ nần và bắt đầu lên kế hoạch trả nợ." },
      health: { up: "Các bệnh liên quan đến hệ hô hấp hoặc thị lực do trốn tránh điều trị.", rev: "Sự thật về tình trạng sức khỏe được làm rõ qua xét nghiệm." },
      spiritual: { up: "Từ chối nhìn nhận mặt tối (shadow) của bản thân.", rev: "Tháo bỏ rào cản phòng vệ tâm lý." }
    }
  },
  {
    id: 52, name: "Three of Swords", nameVi: "Three of Swords (Ba Kiếm)", number: "3", arcana: "minor", suit: "swords", image: "cards/52-Three-of-Swords.jpg",
    element: "Khí",
    keywords: ["Đau lòng", "Nỗi buồn", "Sự thật phũ phàng", "Phản bội", "Chia tay"],
    keywordsRev: ["Phục hồi", "Tha thứ", "Nén nỗi đau", "Xoa dịu"],
    upright: "Lá bài của nỗi đau đớn tột cùng, sự phản bội, mất mát hoặc những lời nói sắc như dao đâm vào tim. Một sự thật phũ phàng gây tổn thương.",
    reversed: "Quá trình chữa lành bắt đầu. Bạn dần học cách tha thứ và vượt qua nỗi đau, hoặc ngược lại là đang đè nén tổn thương vào sâu bên trong.",
    aspects: {
      love: { up: "Chia tay, ly hôn, phát hiện ngoại tình, hoặc một cuộc cãi vã gây sát thương nặng nề.", rev: "Dần nguôi ngoai nỗi đau thất tình, hoặc tha thứ cho sự lừa dối." },
      career: { up: "Bị đồng nghiệp đâm sau lưng, dự án thất bại thảm hại, hoặc bị sa thải đột ngột.", rev: "Khắc phục sai lầm trong công việc, hòa giải với đối thủ." },
      finance: { up: "Mất mát tài chính lớn, phá sản hoặc bị lừa gạt trắng trợn.", rev: "Phục hồi một phần tài sản, dần làm quen với sự khó khăn." },
      health: { up: "Các vấn đề về tim mạch, hoặc trầm cảm nặng do cú sốc tinh thần.", rev: "Sức khỏe tâm lý dần ổn định sau chấn thương." },
      spiritual: { up: "Trải nghiệm nỗi đau (Dark Night of the Soul) để thanh lọc linh hồn.", rev: "Từ chối khóc hoặc xả stress, khiến nội tâm bị u uất." }
    }
  },
  {
    id: 53, name: "Four of Swords", nameVi: "Four of Swords (Bốn Kiếm)", number: "4", arcana: "minor", suit: "swords", image: "cards/53-Four-of-Swords.jpg",
    element: "Khí",
    keywords: ["Nghỉ ngơi", "Phục hồi", "Tĩnh dưỡng", "Suy ngẫm", "Thoát khỏi áp lực"],
    keywordsRev: ["Kiệt sức tột độ", "Từ chối nghỉ ngơi", "Thức tỉnh đột ngột"],
    upright: "Đã đến lúc rút lui, đình chiến và nghỉ ngơi hoàn toàn. Bạn cần thời gian tĩnh dưỡng để phục hồi sức khỏe tinh thần và thể chất sau những áp lực.",
    reversed: "Cảnh báo về tình trạng kiệt quệ hoàn toàn (burnout) do bạn cố chấp không chịu nghỉ ngơi. Hoặc sự trở lại với nhịp sống hối hả sau thời gian tịnh dưỡng.",
    aspects: {
      love: { up: "Tạm dừng liên lạc một thời gian để cả hai cùng suy nghĩ lại.", rev: "Bị kiệt sức vì mối quan hệ quá drama mà không có lúc nào nghỉ ngơi." },
      career: { up: "Nghỉ phép, đi du lịch chữa lành hoặc tạm lánh xa drama công sở.", rev: "Làm việc quá sức đến mức ngất xỉu hoặc không thể tập trung." },
      finance: { up: "Ngừng đầu tư, giữ tiền an toàn và đánh giá lại ngân sách.", rev: "Bắt đầu hành động trở lại với các dự án tài chính đang ngủ đông." },
      health: { up: "Rất cần ngủ sâu, thư giãn và nằm viện tĩnh dưỡng.", rev: "Hồi phục sức khỏe sau bạo bệnh, chuẩn bị quay lại cuộc sống." },
      spiritual: { up: "Thiền định, tĩnh tâm, đi retreat.", rev: "Từ chối những cảnh báo của cơ thể, ép bản thân tu tập quá mức." }
    }
  },
  {
    id: 54, name: "Five of Swords", nameVi: "Five of Swords (Năm Kiếm)", number: "5", arcana: "minor", suit: "swords", image: "cards/54-Five-of-Swords.jpg",
    element: "Khí",
    keywords: ["Xung đột", "Chiến thắng cay đắng", "Lợi dụng", "Bất đồng", "Sự thù địch"],
    keywordsRev: ["Hòa giải", "Tha thứ", "Hối hận vì chiến thắng", "Kéo dài thù hận"],
    upright: "Sự xung đột gay gắt. Bạn có thể chiến thắng cuộc cãi vã này nhưng lại đánh mất các mối quan hệ (chiến thắng Pyrrhic). Hoặc bạn đang bị một kẻ tàn nhẫn lợi dụng.",
    reversed: "Sự hối hận vì những lời lẽ đã nói ra. Bạn muốn hòa giải và kết thúc mâu thuẫn, hoặc ngược lại, cuộc chiến vẫn tiếp diễn không hồi kết.",
    aspects: {
      love: { up: "Cãi vã, dùng lời lẽ mạt sát nhau để giành phần thắng, gây rạn nứt sâu sắc.", rev: "Nhận ra sai lầm, xin lỗi và mong muốn làm hòa sau tranh cãi." },
      career: { up: "Môi trường công sở thù địch, chà đạp lên nhau để thăng tiến. Bạn có thể bị chơi xấu.", rev: "Xóa bỏ thù hằn với đồng nghiệp, từ bỏ môi trường làm việc độc hại." },
      finance: { up: "Thắng lợi tài chính nhờ các thủ đoạn tàn nhẫn. Trộm cắp, lừa đảo.", rev: "Trả lại tiền đã lấy cắp, hoặc thoát khỏi một cuộc đấu đá tài sản." },
      health: { up: "Căng thẳng cực độ, tức giận ảnh hưởng gan, huyết áp.", rev: "Hạ hỏa, học cách buông bỏ để cứu lấy sức khỏe." },
      spiritual: { up: "Sự kiêu ngạo, cho rằng mình luôn đúng và hạ nhục người khác.", rev: "Nhận ra bài học về cái tôi, học cách khiêm tốn." }
    }
  },
  {
    id: 55, name: "Six of Swords", nameVi: "Six of Swords (Sáu Kiếm)", number: "6", arcana: "minor", suit: "swords", image: "cards/55-Six-of-Swords.jpg",
    element: "Khí",
    keywords: ["Chuyển đổi", "Rời khỏi rắc rối", "Chữa lành", "Du lịch nước ngoài", "Vượt qua giông bão"],
    keywordsRev: ["Mắc kẹt", "Hành trang nặng nề", "Hủy chuyến đi", "Trốn tránh"],
    upright: "Một sự dịch chuyển khỏi vùng nước xoáy (rắc rối) để đến vùng nước lặng (bình yên). Quá trình chữa lành bắt đầu, có thể kèm theo một chuyến đi xa (vật lý hoặc tâm trí).",
    reversed: "Cảm thấy mắc kẹt trong quá khứ, mang theo gánh nặng cảm xúc. Không thể thoát khỏi rắc rối, hoặc một chuyến đi bị hủy bỏ.",
    aspects: {
      love: { up: "Cả hai cùng vượt qua khó khăn để đến bến bờ hạnh phúc, hoặc bạn quyết định rời bỏ một tình yêu cay đắng.", rev: "Không thể quên người cũ, mang theo tổn thương vào mối quan hệ mới." },
      career: { up: "Đổi việc sang một môi trường tốt hơn, hoặc đi công tác xa có kết quả tốt.", rev: "Công việc bế tắc, không thể nghỉ việc vì hoàn cảnh." },
      finance: { up: "Khủng hoảng tài chính dần qua đi, bắt đầu vào quỹ đạo ổn định.", rev: "Cố trốn nợ nhưng không thoát, hoặc từ chối đối mặt với nợ nần." },
      health: { up: "Phục hồi từ từ sau chuỗi ngày mệt mỏi, stress.", rev: "Quá trình chữa trị bị gián đoạn, bệnh cũ dai dẳng." },
      spiritual: { up: "Sự tĩnh lặng nội tâm sau cơn bão giông.", rev: "Sợ hãi tương lai, không dám buông tay quá khứ." }
    }
  },
  {
    id: 56, name: "Seven of Swords", nameVi: "Seven of Swords (Bảy Kiếm)", number: "7", arcana: "minor", suit: "swords", image: "cards/56-Seven-of-Swords.jpg",
    element: "Khí",
    keywords: ["Lén lút", "Lừa dối", "Ăn cắp", "Chiến thuật", "Hành động bí mật", "Trốn tránh trách nhiệm"],
    keywordsRev: ["Bị phát hiện", "Thú nhận", "Trả lại", "Làm lại từ đầu", "Lời nói dối bị lật tẩy"],
    upright: "Sự lừa gạt, lén lút hoặc trộm cắp. Bạn (hoặc ai đó) đang dùng mưu hèn kế bẩn để đạt mục đích, hoặc đang cố gắng trốn tránh trách nhiệm.",
    reversed: "Sự thật bị phơi bày, kẻ lừa dối bị bắt quả tang. Hoặc bạn hối hận và muốn thú nhận những sai lầm đã qua.",
    aspects: {
      love: { up: "Bắt cá hai tay, ngoại tình, giấu giếm bí mật hoặc lừa dối tình cảm.", rev: "Những bí mật ngoại tình bị lộ, hai người buộc phải đối chất." },
      career: { up: "Bị cướp công, ăn cắp ý tưởng. Đồng nghiệp hai mặt hoặc bạn đang làm trò mờ ám.", rev: "Sự gian lận trong công việc bị bại lộ, nguy cơ bị sa thải." },
      finance: { up: "Nguy cơ bị trộm cắp tài sản, lừa đảo tiền bạc. Phải cực kỳ cẩn thận các hợp đồng.", rev: "Tìm lại được tài sản bị mất, vạch mặt kẻ lừa đảo." },
      health: { up: "Bác sĩ chẩn đoán qua loa, giấu giếm tình trạng bệnh.", rev: "Nhận được sự thật về sức khỏe để điều trị đúng hướng." },
      spiritual: { up: "Sử dụng tâm linh vì lợi ích cá nhân, sống đạo đức giả.", rev: "Gột rửa tội lỗi, thú nhận và tìm kiếm sự thanh thản." }
    }
  },
  {
    id: 57, name: "Eight of Swords", nameVi: "Eight of Swords (Tám Kiếm)", number: "8", arcana: "minor", suit: "swords", image: "cards/57-Eight-of-Swords.jpg",
    element: "Khí",
    keywords: ["Bị trói buộc", "Tuyệt vọng", "Nạn nhân", "Ám ảnh tâm lý", "Mắc kẹt (trong tâm trí)"],
    keywordsRev: ["Tự giải thoát", "Sức mạnh mới", "Chấp nhận sự thật", "Vượt qua sợ hãi"],
    upright: "Bạn cảm thấy bị mắc kẹt, không lối thoát (như cô gái bị bịt mắt và trói). Tuy nhiên, những thanh kiếm không tạo thành hàng rào kín. Sự trói buộc chủ yếu đến từ nỗi sợ hãi tự áp đặt trong tâm trí bạn.",
    reversed: "Tháo gỡ tấm bịt mắt, nhận ra quyền năng của bản thân và tự giải thoát mình khỏi những ám ảnh và tình huống bế tắc.",
    aspects: {
      love: { up: "Cảm thấy bị giam cầm trong một mối quan hệ độc hại nhưng lại tự cho rằng mình không có quyền lựa chọn.", rev: "Dũng cảm bước ra khỏi mối tình đầy nước mắt, tìm lại tự do." },
      career: { up: "Cảm thấy bế tắc tột độ ở công sở, sợ mất việc nên cắn răng chịu đựng áp lực vô lý.", rev: "Tìm ra lối thoát nghề nghiệp, quyết định nghỉ việc hoặc thay đổi cục diện." },
      finance: { up: "Tự kìm hãm bản thân vì sợ rủi ro, không dám tiêu tiền hoặc quá lo lắng về nghèo đói.", rev: "Trả hết nợ nần, thay đổi tư duy tài chính để làm giàu." },
      health: { up: "Mắc chứng rối loạn lo âu, ám ảnh cưỡng chế (OCD), hoặc tự kỷ ám thị.", rev: "Thoát khỏi bệnh tâm lý, tâm trí trở nên thông suốt." },
      spiritual: { up: "Nạn nhân hóa bản thân, tự trách cứ và nhốt mình trong bóng tối.", rev: "Mở mắt nhìn thấy ánh sáng chân lý, làm chủ cuộc đời." }
    }
  },
  {
    id: 58, name: "Nine of Swords", nameVi: "Nine of Swords (Chín Kiếm)", number: "9", arcana: "minor", suit: "swords", image: "cards/58-Nine-of-Swords.jpg",
    element: "Khí",
    keywords: ["Lo âu", "Ác mộng", "Trầm cảm", "Sợ hãi", "Mất ngủ", "Suy nghĩ tiêu cực"],
    keywordsRev: ["Hồi phục", "Vượt qua nỗi sợ", "Ám ảnh cực độ", "Điểm đáy"],
    upright: "Đỉnh điểm của sự đau đớn tinh thần. Mất ngủ, ác mộng, trầm cảm và những lo âu thái quá (overthinking). Cơn ác mộng đang tàn phá sức khỏe tâm lý của bạn.",
    reversed: "Sự tỉnh giấc. Nỗi đau dần nguôi ngoai, bạn bắt đầu tìm kiếm sự giúp đỡ. Hoặc ngược lại, cơn trầm cảm đạt đến mức cực độ cần can thiệp y tế khẩn cấp.",
    aspects: {
      love: { up: "Đau buồn vật vã vì tình yêu, những dằn vặt và nghi ngờ đối phương khiến bạn mất ngủ.", rev: "Khóc xong rồi thôi. Sự thật được phơi bày giúp chấm dứt những hoang tưởng." },
      career: { up: "Stress công việc làm bạn thức trắng đêm, áp lực thành tích hoặc sợ hãi thất bại (imposter syndrome).", rev: "Giảm tải áp lực, nhận ra công việc không đáng để đánh đổi sức khỏe." },
      finance: { up: "Lo sợ tột độ về tiền bạc, vỡ nợ, ám ảnh về sự nghèo đói.", rev: "Khởi sắc tài chính nhẹ giúp xua tan đám mây lo âu." },
      health: { up: "Trầm cảm, suy nhược thần kinh, mất ngủ kinh niên, các vấn đề tâm thần.", rev: "Bắt đầu điều trị tâm lý, thiền định để tìm lại sự bình yên." },
      spiritual: { up: "Đêm đen linh hồn (Dark night of the soul). Cảm giác bị vũ trụ bỏ rơi.", rev: "Ánh bình minh ló dạng, nhận ra mọi nỗi sợ chỉ là ảo ảnh." }
    }
  },
  {
    id: 59, name: "Ten of Swords", nameVi: "Ten of Swords (Mười Kiếm)", number: "10", arcana: "minor", suit: "swords", image: "cards/59-Ten-of-Swords.jpg",
    element: "Khí",
    keywords: ["Đáy vực", "Phản bội", "Thất bại hoàn toàn", "Chấm dứt", "Bình minh mới"],
    keywordsRev: ["Phục hồi từ đống tro tàn", "Không chịu buông bỏ", "Kéo dài sự hấp hối"],
    upright: "Một cái kết vô cùng đau đớn, thất bại tột cùng hoặc bị đâm sau lưng (10 thanh kiếm ghim vào người). Nhưng tin tốt là: bạn đã chạm đáy, không thể tồi tệ hơn được nữa. Hãy nhìn ánh bình minh đang lên.",
    reversed: "Sự sống sót kỳ diệu, quá trình phục hồi bắt đầu. Hoặc bạn đang cố tình kéo dài nỗi đau, đóng vai nạn nhân và khước từ việc làm lại từ đầu.",
    aspects: {
      love: { up: "Mối quan hệ tan vỡ hoàn toàn, bị cắm sừng hoặc tổn thương không thể cứu vãn.", rev: "Sống sót qua cơn bão ly hôn, tự chữa lành vết thương để yêu lại từ đầu." },
      career: { up: "Phá sản, mất việc, uy tín bị hủy hoại hoàn toàn bởi kẻ thù nơi làm việc.", rev: "Tìm thấy cơ hội mới sau khi mất tất cả. Rút ra bài học đắt giá." },
      finance: { up: "Trắng tay, chạm đáy tài chính.", rev: "Trả hết nợ nần, bắt đầu gỡ gạc lại từ con số âm." },
      health: { up: "Bệnh tật nghiêm trọng, phẫu thuật, suy sụp thể chất hoàn toàn (nhưng có thể phục hồi).", rev: "Hồi sinh từ cửa tử. Sức khỏe dần có tiến triển tốt." },
      spiritual: { up: "Tử vì đạo (nghĩa đen/bóng). Cái tôi bị tiêu diệt hoàn toàn để tái sinh linh hồn.", rev: "Nhận ra bài học nghiệp quả khắc nghiệt nhất, từ chối việc oán hận." }
    }
  },
  {
    id: 60, name: "Page of Swords", nameVi: "Page of Swords (Tiểu Đồng Kiếm)", number: "11", arcana: "minor", suit: "swords", image: "cards/60-Page-of-Swords.jpg",
    element: "Khí",
    keywords: ["Tò mò", "Cảnh giác", "Giao tiếp", "Ý tưởng mới", "Tin tức", "Sắc sảo"],
    keywordsRev: ["Nói dối", "Châm chọc", "Nhiều chuyện", "Lời hứa suông", "Thiếu hành động"],
    upright: "Đại diện cho sự tò mò, ham học hỏi và tư duy sắc bén. Một tin tức, email hoặc một cuộc trò chuyện đầy tính lý trí sắp diễn ra. Cần luôn cảnh giác.",
    reversed: "Kẻ mách lẻo, nhiều chuyện, những lời hứa sáo rỗng hoặc ngôn từ châm biếm gây tổn thương. Thiếu chiều sâu trong suy nghĩ.",
    aspects: {
      love: { up: "Quan sát, 'stalk' đối phương trên mạng xã hội. Trò chuyện thẳng thắn, trí tuệ.", rev: "Soi mói khuyết điểm của nhau, buông lời cay độc, hứa lèo." },
      career: { up: "Một nhân viên mới thông minh nhưng chưa có kinh nghiệm. Phân tích dữ liệu tốt.", rev: "Tin đồn công sở. Lên kế hoạch viển vông nhưng lười hành động." },
      finance: { up: "Cập nhật tin tức thị trường, học hỏi về đầu tư.", rev: "Tin tức tài chính sai lệch. Cẩn thận các chiêu trò lừa gạt qua mạng." },
      health: { up: "Tư duy sáng suốt. Khám phá các phương pháp điều trị mới.", rev: "Lên mạng tự chẩn đoán bệnh rồi tự dọa mình (cyberchondria)." },
      spiritual: { up: "Tìm kiếm sự thật tâm linh thông qua sách vở, triết học.", rev: "Dùng trí năng để phán xét tâm linh, phủ nhận trực giác." }
    }
  },
  {
    id: 61, name: "Knight of Swords", nameVi: "Knight of Swords (Kỵ Sĩ Kiếm)", number: "12", arcana: "minor", suit: "swords", image: "cards/61-Knight-of-Swords.jpg",
    element: "Khí",
    keywords: ["Tham vọng", "Hành động chớp nhoáng", "Logic", "Quyết đoán", "Vội vã"],
    keywordsRev: ["Bốc đồng", "Thiếu kiên nhẫn", "Tàn nhẫn", "Bạo lực ngôn từ", "Tai nạn"],
    upright: "Một người lao đi với tốc độ vũ bão để đạt được mục tiêu, dựa trên lý trí sắt đá. Sự can đảm và quyết tâm cao độ. Không gì có thể cản bước.",
    reversed: "Sự nóng vội, bốc đồng dẫn đến sai lầm nghiêm trọng. Vô cảm, sẵn sàng chà đạp lên người khác. Nguy cơ tranh cãi nảy lửa hoặc tai nạn.",
    aspects: {
      love: { up: "Sự theo đuổi cuồng nhiệt, một mối tình diễn ra chớp nhoáng nhưng đầy lý trí.", rev: "Một người vô tình, lạnh lùng, áp đặt suy nghĩ lên đối phương. Bạo lực ngôn từ." },
      career: { up: "Ra quyết định nhanh chóng, chinh phục các dự án khó nhằn với sự tập trung cao độ.", rev: "Dục tốc bất đạt. Lãnh đạo tồi, mắc sai lầm lớn vì không nghe lời khuyên." },
      finance: { up: "Chớp lấy cơ hội đầu tư tức thời. Cắt lỗ/chốt lời dứt khoát.", rev: "Thua lỗ vì đầu tư mù quáng, muốn giàu nhanh." },
      health: { up: "Hành động quyết liệt để thay đổi sức khỏe.", rev: "Nguy cơ tai nạn giao thông, chấn thương do ẩu đả hoặc hoạt động quá mạnh." },
      spiritual: { up: "Theo đuổi chân lý một cách mạnh mẽ, phá bỏ các giáo điều.", rev: "Cực đoan tôn giáo, áp đặt lý tưởng một cách tàn bạo." }
    }
  },
  {
    id: 62, name: "Queen of Swords", nameVi: "Queen of Swords (Nữ Hoàng Kiếm)", number: "13", arcana: "minor", suit: "swords", image: "cards/62-Queen-of-Swords-1.jpg",
    element: "Khí",
    keywords: ["Độc lập", "Sắc sảo", "Thông minh", "Khách quan", "Rõ ràng", "Kinh nghiệm đau thương"],
    keywordsRev: ["Lạnh lùng", "Cay nghiệt", "Không tha thứ", "Bảo thủ", "Sầu muộn"],
    upright: "Một người vô cùng thông minh, sắc sảo và độc lập. Đã từng trải qua nhiều nỗi đau nhưng không gục ngã, dùng lý trí để phân định đúng sai. Trọng sự thật hơn cảm xúc.",
    reversed: "Sự cay nghiệt, lạnh lùng và tàn nhẫn. Dùng lời nói như dao lam để làm tổn thương người khác. Ôm hận thù không thể buông bỏ.",
    aspects: {
      love: { up: "Tình yêu trưởng thành, không bi lụy. Rất cần sự trung thực. Có thể biểu thị sự độc thân hoặc góa bụa.", rev: "Không có chỗ cho sự yếu đuối. Sẵn sàng cắt đứt mối quan hệ không thương tiếc. Hằn học." },
      career: { up: "Một chuyên gia xuất sắc, công bằng, giao tiếp chuyên nghiệp. Phù hợp các ngành luật, phân tích.", rev: "Người sếp cay độc, chuyên bới móc lỗi sai của nhân viên." },
      finance: { up: "Rõ ràng trong chuyện tiền bạc, không để tình cảm xen vào làm ăn.", rev: "Bủn xỉn, tính toán chi li tàn nhẫn." },
      health: { up: "Cần tư duy logic để điều trị, sức chịu đựng nỗi đau thể xác tốt.", rev: "Trầm cảm, xa lánh mọi người, vô sinh hoặc khó có con." },
      spiritual: { up: "Tìm kiếm sự thật một cách minh bạch, loại bỏ mê tín dị đoan.", rev: "Dùng trí năng chối bỏ hoàn toàn tâm linh, cay nghiệt với những người có đức tin." }
    }
  },
  {
    id: 63, name: "King of Swords", nameVi: "King of Swords (Vua Kiếm)", number: "14", arcana: "minor", suit: "swords", image: "cards/63-King-of-Swords.jpg",
    element: "Khí",
    keywords: ["Lý trí", "Quyền lực", "Sự thật", "Uy quyền", "Trí tuệ", "Công bằng"],
    keywordsRev: ["Độc tài", "Tàn nhẫn", "Lạm quyền", "Mưu mô", "Thiếu đồng cảm"],
    upright: "Đại diện cho quyền lực của trí tuệ, sự phân tích logic và sự công bằng tuyệt đối. Một chuyên gia, thẩm phán hoặc cố vấn có uy quyền. Hành động dựa trên nguyên tắc, không bị cảm xúc chi phối.",
    reversed: "Sử dụng trí thông minh để thao túng, lừa lọc hoặc áp bức người khác. Một kẻ độc tài vô cảm, tàn nhẫn và đầy mưu mô.",
    aspects: {
      love: { up: "Mối quan hệ xây dựng trên nền tảng trí tuệ, sự tôn trọng và luật lệ rõ ràng. Khá khô khan.", rev: "Sự áp đặt, kiểm soát tâm lý, thiếu vắng sự ấm áp và bao dung trong tình yêu." },
      career: { up: "Sự nghiệp thăng tiến nhờ tư duy chiến lược và sự chuyên nghiệp tuyệt đối.", rev: "Môi trường làm việc ngột ngạt dưới trướng một nhà lãnh đạo độc tài, lạm quyền." },
      finance: { up: "Kỷ luật tài chính sắt đá. Các quyết định đầu tư được tính toán chi ly, không rủi ro.", rev: "Gian lận kinh tế tinh vi, lợi dụng lỗ hổng pháp luật." },
      health: { up: "Thực hiện nghiêm ngặt các phác đồ y tế. Tư vấn bác sĩ chuyên khoa giỏi.", rev: "Áp lực tâm lý nặng nề dẫn đến các bệnh về thần kinh." },
      spiritual: { up: "Sống theo nguyên tắc đạo đức và pháp luật tối cao.", rev: "Mắc kẹt trong sự kiêu ngạo trí thức, cho mình là thần thánh." }
    }
  }
];

fs.writeFileSync('E:/TAROT/js/swords.json', JSON.stringify(swords, null, 2));
console.log("Swords Generated!");
