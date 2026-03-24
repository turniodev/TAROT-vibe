const fs = require('fs');

const wands = [
  {
    id: 22, name: "Ace of Wands", nameVi: "Ace of Wands (Một Gậy)", number: "1", arcana: "minor", suit: "wands", image: "cards/22-Ace-of-Wands.jpg",
    element: "Lửa",
    keywords: ["Sáng tạo", "Nhiệt huyết", "Khởi đầu mới", "Cảm hứng"],
    keywordsRev: ["Trì hoãn", "Thiếu ý tưởng", "Mất động lực"],
    upright: "Một luồng năng lượng sáng tạo và nhiệt huyết mới. Cơ hội tuyệt vời để bắt đầu một dự án đam mê.",
    reversed: "Sự tắc nghẽn sáng tạo, thiếu định hướng hoặc trì hoãn các kế hoạch mới.",
    aspects: {
      love: { up: "Sự say mê và cuồng nhiệt mới chớm nở trong tình yêu.", rev: "Ngọn lửa tình yêu đang nguội lạnh, thiếu sự hứng thú." },
      career: { up: "Một dự án hoặc vị trí mới đầy cảm hứng.", rev: "Cảm thấy chán nản, không có động lực làm việc." },
      finance: { up: "Cơ hội kiếm tiền mới xuất hiện.", rev: "Quyết định tài chính tồi do bốc đồng." },
      health: { up: "Năng lượng dồi dào, phục hồi nhanh.", rev: "Cạn kiệt năng lượng, mệt mỏi." },
      spiritual: { up: "Thức tỉnh đam mê tâm linh.", rev: "Mất kết nối với mục đích sống." }
    }
  },
  {
    id: 23, name: "Two of Wands", nameVi: "Two of Wands (Hai Gậy)", number: "2", arcana: "minor", suit: "wands", image: "cards/23-Two-of-Wands.jpg",
    element: "Lửa",
    keywords: ["Lập kế hoạch", "Tầm nhìn", "Quyết định", "Khám phá"],
    keywordsRev: ["Sợ rủi ro", "Kế hoạch thất bại", "Mắc kẹt"],
    upright: "Bạn đang đứng trước những lựa chọn. Đã đến lúc lập kế hoạch dài hạn và bước ra khỏi vùng an toàn.",
    reversed: "Sợ hãi không dám hành động, kế hoạch bị trì hoãn hoặc chọn con đường an toàn nhưng nhàm chán.",
    aspects: {
      love: { up: "Cùng nhau lập kế hoạch tương lai (như du lịch, kết hôn).", rev: "Do dự trong việc cam kết tiến xa hơn." },
      career: { up: "Lên kế hoạch mở rộng kinh doanh hoặc đổi việc.", rev: "Sợ thay đổi, mắc kẹt trong công việc cũ." },
      finance: { up: "Lập kế hoạch tài chính dài hạn.", rev: "Quản lý tài chính kém, thiếu tầm nhìn." },
      health: { up: "Cần tìm hướng điều trị hoặc chế độ tập luyện mới.", rev: "Không tuân thủ kế hoạch sức khỏe." },
      spiritual: { up: "Khám phá những triết lý mới.", rev: "Sợ mở rộng thế giới quan." }
    }
  },
  {
    id: 24, name: "Three of Wands", nameVi: "Three of Wands (Ba Gậy)", number: "3", arcana: "minor", suit: "wands", image: "cards/24-Three-of-Wands.jpg",
    element: "Lửa",
    keywords: ["Mở rộng", "Tầm nhìn xa", "Lãnh đạo", "Chờ đợi kết quả"],
    keywordsRev: ["Chậm trễ", "Trở ngại bất ngờ", "Tầm nhìn hạn hẹp"],
    upright: "Những nỗ lực ban đầu của bạn đang bắt đầu đơm hoa kết trái. Bạn đang mở rộng tầm nhìn và chờ đón thành công.",
    reversed: "Sự chậm trễ, những rắc rối không lường trước được làm trì hoãn thành quả của bạn.",
    aspects: {
      love: { up: "Mối quan hệ phát triển tốt đẹp, hướng tới tương lai xa.", rev: "Khoảng cách địa lý hoặc trở ngại trong tình yêu." },
      career: { up: "Cơ hội làm việc ở nước ngoài hoặc mở rộng quy mô.", rev: "Dự án bị đình trệ, thiếu sự hợp tác." },
      finance: { up: "Thành quả tài chính đang đến gần.", rev: "Dòng tiền bị nghẽn, lợi nhuận chậm trễ." },
      health: { up: "Sức khỏe đang trên đà hồi phục tốt.", rev: "Quá trình phục hồi chậm hơn dự kiến." },
      spiritual: { up: "Tầm nhìn tâm linh được mở rộng.", rev: "Thất vọng vì chưa đạt được giác ngộ như mong muốn." }
    }
  },
  {
    id: 25, name: "Four of Wands", nameVi: "Four of Wands (Bốn Gậy)", number: "4", arcana: "minor", suit: "wands", image: "cards/25-Four-of-Wands.jpg",
    element: "Lửa",
    keywords: ["Ăn mừng", "Hòa hợp", "Gia đình", "Ổn định"],
    keywordsRev: ["Xung đột gia đình", "Trì hoãn lễ hội", "Thiếu hỗ trợ"],
    upright: "Thời gian để ăn mừng thành tựu, sự hòa hợp trong gia đình và các mối quan hệ. Một nền tảng vững chắc.",
    reversed: "Những bất đồng trong gia đình hoặc sự kiện ăn mừng bị hủy/trì hoãn.",
    aspects: {
      love: { up: "Lễ cưới, đính hôn hoặc giai đoạn hạnh phúc viên mãn.", rev: "Căng thẳng trong gia đình, hoãn cưới." },
      career: { up: "Ăn mừng thành công dự án, môi trường làm việc tốt.", rev: "Môi trường làm việc thiếu đoàn kết." },
      finance: { up: "Tài chính ổn định, có thể mua sắm cho gia đình.", rev: "Chi tiêu quá mức cho tiệc tùng, lễ hội." },
      health: { up: "Sức khỏe tốt, tinh thần vui vẻ.", rev: "Mệt mỏi do tiệc tùng quá đà." },
      spiritual: { up: "Hòa hợp tâm linh với cộng đồng.", rev: "Cảm thấy lạc lõng trong cộng đồng của mình." }
    }
  },
  {
    id: 26, name: "Five of Wands", nameVi: "Five of Wands (Năm Gậy)", number: "5", arcana: "minor", suit: "wands", image: "cards/26-Five-of-Wands.jpg",
    element: "Lửa",
    keywords: ["Cạnh tranh", "Xung đột", "Bất đồng ý kiến", "Căng thẳng"],
    keywordsRev: ["Tránh né xung đột", "Thỏa hiệp", "Giải quyết mâu thuẫn"],
    upright: "Sự cạnh tranh, xung đột ý kiến và những rắc rối nhỏ nhặt đang xảy ra. Đòi hỏi bạn phải đấu tranh cho ý kiến của mình.",
    reversed: "Bạn đang né tránh mâu thuẫn hoặc cuối cùng đã tìm ra giải pháp thỏa hiệp để chấm dứt xung đột.",
    aspects: {
      love: { up: "Những cuộc cãi vã nhỏ, cái tôi quá lớn trong tình yêu.", rev: "Làm hòa sau cãi vã, đồng thuận." },
      career: { up: "Cạnh tranh gay gắt tại nơi làm việc, mâu thuẫn nhóm.", rev: "Hợp tác trở lại, tránh né drama công sở." },
      finance: { up: "Đấu tranh tài chính, tranh chấp tiền bạc.", rev: "Giải quyết xong các tranh chấp tài chính." },
      health: { up: "Căng thẳng, stress do môi trường xung quanh.", rev: "Giảm bớt căng thẳng, tìm thấy sự bình yên." },
      spiritual: { up: "Xung đột nội tâm về niềm tin.", rev: "Chấp nhận sự khác biệt về niềm tin." }
    }
  },
  {
    id: 27, name: "Six of Wands", nameVi: "Six of Wands (Sáu Gậy)", number: "6", arcana: "minor", suit: "wands", image: "cards/27-Six-of-Wands.jpg",
    element: "Lửa",
    keywords: ["Chiến thắng", "Thành công", "Được công nhận", "Tự hào"],
    keywordsRev: ["Thất bại", "Sự tự cao", "Mất danh tiếng"],
    upright: "Chiến thắng và sự công nhận công khai. Bạn đã vượt qua khó khăn và giờ là lúc được tôn vinh.",
    reversed: "Sự kiêu ngạo dẫn đến thất bại, hoặc bạn không nhận được sự công nhận xứng đáng.",
    aspects: {
      love: { up: "Tự hào về người yêu, mối quan hệ được mọi người ủng hộ.", rev: "Cảm thấy không được đối phương trân trọng." },
      career: { up: "Thăng tiến, phần thưởng, được sếp và đồng nghiệp công nhận.", rev: "Dự án thất bại, bị cướp công." },
      finance: { up: "Phần thưởng tài chính xứng đáng với nỗ lực.", rev: "Mất tiền do tự mãn, chủ quan." },
      health: { up: "Vượt qua bệnh tật, sức khỏe phục hồi rực rỡ.", rev: "Bệnh cũ tái phát do chủ quan." },
      spiritual: { up: "Được dẫn dắt và truyền cảm hứng cho người khác.", rev: "Cái tôi tâm linh quá lớn." }
    }
  },
  {
    id: 28, name: "Seven of Wands", nameVi: "Seven of Wands (Bảy Gậy)", number: "7", arcana: "minor", suit: "wands", image: "cards/28-Seven-of-Wands.jpg",
    element: "Lửa",
    keywords: ["Phòng thủ", "Bảo vệ quan điểm", "Bền bỉ", "Thử thách"],
    keywordsRev: ["Bỏ cuộc", "Bị áp đảo", "Thiếu tự tin"],
    upright: "Bạn đang phải đối mặt với sự chống đối hoặc cạnh tranh, nhưng bạn có lợi thế. Hãy kiên định bảo vệ vị trí của mình.",
    reversed: "Cảm thấy bị áp đảo, kiệt sức và có xu hướng muốn bỏ cuộc trước áp lực.",
    aspects: {
      love: { up: "Bảo vệ mối quan hệ trước sự phản đối của người ngoài.", rev: "Đầu hàng trước rào cản tình yêu." },
      career: { up: "Giữ vững vị trí hiện tại trước các đối thủ cạnh tranh.", rev: "Bị chèn ép tại nơi làm việc, muốn bỏ việc." },
      finance: { up: "Bảo vệ tài sản, đấu tranh cho quyền lợi tài chính.", rev: "Mất mát tài chính do không bảo vệ được quyền lợi." },
      health: { up: "Hệ miễn dịch đang chiến đấu chống lại bệnh tật.", rev: "Sức đề kháng yếu, dễ gục ngã trước bệnh tật." },
      spiritual: { up: "Kiên định với niềm tin của bản thân.", rev: "Dao động và từ bỏ niềm tin." }
    }
  },
  {
    id: 29, name: "Eight of Wands", nameVi: "Eight of Wands (Tám Gậy)", number: "8", arcana: "minor", suit: "wands", image: "cards/29-Eight-of-Wands.jpg",
    element: "Lửa",
    keywords: ["Tốc độ", "Hành động nhanh", "Tin tức", "Chuyển động"],
    keywordsRev: ["Trì hoãn", "Mất phương hướng", "Hành động vội vã"],
    upright: "Mọi thứ đang diễn ra với tốc độ chóng mặt. Hành động nhanh chóng, tin tức sắp đến và những chuyến đi vội vã.",
    reversed: "Sự chậm trễ gây nản lòng, hoặc hành động quá vội vàng dẫn đến sai lầm.",
    aspects: {
      love: { up: "Tình cảm tiến triển cực nhanh, tin nhắn tỏ tình.", rev: "Hiểu lầm do giao tiếp kém, mối quan hệ chững lại." },
      career: { up: "Công việc dồn dập, dự án tiến triển nhanh chóng.", rev: "Sự chậm trễ trong việc phản hồi hoặc duyệt dự án." },
      finance: { up: "Tiền bạc luân chuyển nhanh, nhận được tiền sớm.", rev: "Giao dịch bị kẹt, tiền về chậm." },
      health: { up: "Hồi phục nhanh chóng, năng lượng tràn trề.", rev: "Bệnh tiến triển quá nhanh hoặc năng lượng không ổn định." },
      spiritual: { up: "Nhận thức tâm linh đến bất ngờ, giác ngộ chớp nhoáng.", rev: "Cảm thấy quá tải với các luồng thông tin tâm linh." }
    }
  },
  {
    id: 30, name: "Nine of Wands", nameVi: "Nine of Wands (Chín Gậy)", number: "9", arcana: "minor", suit: "wands", image: "cards/30-Nine-of-Wands.jpg",
    element: "Lửa",
    keywords: ["Kiên cường", "Kiệt sức nhưng không bỏ cuộc", "Phòng thủ", "Cảnh giác"],
    keywordsRev: ["Bỏ cuộc", "Hoang tưởng", "Kiệt sức hoàn toàn"],
    upright: "Bạn đã trải qua nhiều khó khăn và đang kiệt sức, nhưng hãy cố gắng lên vì bạn đã gần đến đích. Giữ vững sự cảnh giác.",
    reversed: "Bạn đã đến giới hạn chịu đựng và muốn bỏ cuộc, hoặc đang phòng thủ quá mức dẫn đến hoang tưởng.",
    aspects: {
      love: { up: "Đề phòng tổn thương cũ, nhưng vẫn đang cố gắng duy trì.", rev: "Quá mệt mỏi với mối quan hệ và muốn buông tay." },
      career: { up: "Áp lực công việc đè nặng nhưng bạn vẫn kiên trì vượt qua.", rev: "Kiệt sức (burnout), không thể tiếp tục công việc." },
      finance: { up: "Cẩn trọng bảo vệ tài sản sau những mất mát.", rev: "Từ bỏ việc quản lý tài chính vì quá bế tắc." },
      health: { up: "Bệnh tật kéo dài nhưng sức chịu đựng tốt.", rev: "Hệ miễn dịch suy sụp hoàn toàn do stress." },
      spiritual: { up: "Thử thách tâm linh cuối cùng trước khi giác ngộ.", rev: "Mất niềm tin do quá nhiều sóng gió." }
    }
  },
  {
    id: 31, name: "Ten of Wands", nameVi: "Ten of Wands (Mười Gậy)", number: "10", arcana: "minor", suit: "wands", image: "cards/31-Ten-of-Wands.jpg",
    element: "Lửa",
    keywords: ["Gánh nặng", "Trách nhiệm", "Căng thẳng", "Làm việc quá sức"],
    keywordsRev: ["Buông bỏ gánh nặng", "Sụp đổ", "Thoái thác trách nhiệm"],
    upright: "Bạn đang ôm đồm quá nhiều trách nhiệm và gánh nặng. Dù sắp đến đích nhưng bạn đang kiệt sức.",
    reversed: "Đã đến lúc buông bỏ những gánh nặng không cần thiết, hoặc bạn đang bị sụp đổ dưới áp lực.",
    aspects: {
      love: { up: "Cảm thấy mối quan hệ là một gánh nặng, thiếu sự san sẻ.", rev: "Buông bỏ một mối quan hệ mệt mỏi." },
      career: { up: "Làm việc quá sức, ôm đồm việc của người khác.", rev: "Biết cách ủy quyền (delegate) công việc cho người khác." },
      finance: { up: "Gánh nặng nợ nần, áp lực tài chính nặng nề.", rev: "Thoát khỏi nợ nần hoặc tuyên bố phá sản để giải thoát." },
      health: { up: "Đau lưng, vai gáy do stress và làm việc quá độ.", rev: "Bắt đầu nghỉ ngơi và trút bỏ áp lực." },
      spiritual: { up: "Cảm thấy nghĩa vụ tâm linh quá nặng nề.", rev: "Giải phóng bản thân khỏi các nghĩa vụ tự áp đặt." }
    }
  },
  {
    id: 32, name: "Page of Wands", nameVi: "Page of Wands (Tiểu Đồng Gậy)", number: "11", arcana: "minor", suit: "wands", image: "cards/32-Page-of-Wands.jpg",
    element: "Lửa",
    keywords: ["Khám phá", "Cảm hứng", "Ý tưởng mới", "Hành trình khởi đầu"],
    keywordsRev: ["Thiếu định hướng", "Chần chừ", "Ý tưởng viển vông"],
    upright: "Một nguồn cảm hứng mới mẻ, háo hức khám phá thế giới. Đại diện cho một tin tức tốt lành hoặc một ý tưởng sáng tạo đầy tiềm năng.",
    reversed: "Thiếu hành động, ý tưởng chỉ nằm trên giấy, hoặc cảm thấy thiếu động lực để bắt đầu.",
    aspects: {
      love: { up: "Một tin nhắn tán tỉnh, một mối tình trẻ trung, sôi nổi.", rev: "Tình cảm bồng bột, thiếu nghiêm túc hoặc mau chán." },
      career: { up: "Giai đoạn học hỏi đầy nhiệt huyết, một dự án mới thú vị.", rev: "Thiếu kinh nghiệm nhưng lại kiêu ngạo, thiếu kiên nhẫn." },
      finance: { up: "Cơ hội tài chính mới (cần được nuôi dưỡng).", rev: "Tiêu tiền bốc đồng, không có kế hoạch." },
      health: { up: "Tràn đầy sức trẻ và năng lượng.", rev: "Lười biếng, thiếu động lực tập luyện." },
      spiritual: { up: "Hào hứng khám phá những con đường tâm linh mới.", rev: "Theo đuổi tâm linh theo phong trào, hời hợt." }
    }
  },
  {
    id: 33, name: "Knight of Wands", nameVi: "Knight of Wands (Kỵ Sĩ Gậy)", number: "12", arcana: "minor", suit: "wands", image: "cards/33-Knight-of-Wands.jpg",
    element: "Lửa",
    keywords: ["Năng lượng", "Đam mê", "Hành động nhanh", "Phiêu lưu"],
    keywordsRev: ["Bốc đồng", "Tức giận", "Hành động thiếu suy nghĩ"],
    upright: "Sự nhiệt huyết, năng lượng dồi dào và sẵn sàng hành động. Một sự kiện diễn ra nhanh chóng, mang đậm tính phiêu lưu.",
    reversed: "Sự bốc đồng, nóng nảy, kiêu ngạo. Hành động mà không màng đến hậu quả.",
    aspects: {
      love: { up: "Cuồng nhiệt, say đắm nhưng có thể thiếu cam kết dài hạn.", rev: "Cả thèm chóng chán, dễ cáu gắt, ghen tuông vô cớ." },
      career: { up: "Hành động quyết liệt để đạt mục tiêu, phù hợp việc hay di chuyển.", rev: "Làm việc cẩu thả, thiếu kiên nhẫn với kết quả." },
      finance: { up: "Dám đầu tư mạo hiểm để kiếm lời nhanh.", rev: "Thua lỗ do đầu tư bốc đồng, cờ bạc." },
      health: { up: "Năng lượng dồi dào, thích thể thao mạo hiểm.", rev: "Nguy cơ chấn thương do ẩu đả hoặc tai nạn giao thông." },
      spiritual: { up: "Truyền cảm hứng mạnh mẽ cho người khác.", rev: "Áp đặt niềm tin của mình lên người khác một cách hung hăng." }
    }
  },
  {
    id: 34, name: "Queen of Wands", nameVi: "Queen of Wands (Nữ Hoàng Gậy)", number: "13", arcana: "minor", suit: "wands", image: "cards/34-Queen-of-Wands.jpg",
    element: "Lửa",
    keywords: ["Tự tin", "Sôi nổi", "Độc lập", "Sức hút", "Ấm áp"],
    keywordsRev: ["Đòi hỏi", "Ghen tuông", "Thích sai bảo", "Ích kỷ"],
    upright: "Đại diện cho sự tự tin, sức hút cá nhân và sự ấm áp. Một người độc lập, quyến rũ và biết truyền cảm hứng cho người khác.",
    reversed: "Sự ghen tuông, tính khí thất thường, thích kiểm soát và thao túng người khác để đạt mục đích.",
    aspects: {
      love: { up: "Mối quan hệ nồng cháy, tự tin và quyến rũ lẫn nhau.", rev: "Ghen tuông độc hại, ích kỷ và muốn làm trung tâm vũ trụ." },
      career: { up: "Lãnh đạo truyền cảm hứng, tự tin thể hiện năng lực.", rev: "Sếp nữ khó tính, môi trường làm việc có người bắt nạt." },
      finance: { up: "Khả năng quản lý tài chính tốt nhờ sự quyết đoán.", rev: "Chi tiêu xa xỉ quá mức để khoe khoang." },
      health: { up: "Sức sống mãnh liệt, khỏe mạnh và rạng rỡ.", rev: "Mệt mỏi do tính khí nóng nảy, dễ cáu giận." },
      spiritual: { up: "Năng lượng tích cực, tỏa sáng rực rỡ.", rev: "Sử dụng năng lượng để thu hút sự chú ý thay vì tĩnh tại." }
    }
  },
  {
    id: 35, name: "King of Wands", nameVi: "King of Wands (Vua Gậy)", number: "14", arcana: "minor", suit: "wands", image: "cards/35-King-of-Wands.jpg",
    element: "Lửa",
    keywords: ["Lãnh đạo bẩm sinh", "Tầm nhìn", "Doanh nhân", "Tôn trọng"],
    keywordsRev: ["Độc tài", "Mong đợi quá cao", "Hung hăng", "Tàn nhẫn"],
    upright: "Một nhà lãnh đạo có tầm nhìn xa trông rộng, đầy nhiệt huyết và có khả năng biến ý tưởng thành hiện thực.",
    reversed: "Sự độc tài, nóng nảy, đặt kỳ vọng quá cao gây áp lực cho người khác, hoặc một nhà lãnh đạo thất bại.",
    aspects: {
      love: { up: "Người bạn đời chín chắn, nồng nhiệt và có trách nhiệm che chở.", rev: "Gia trưởng, thích kiểm soát và nóng tính." },
      career: { up: "Thăng tiến lên vị trí lãnh đạo, kinh doanh khởi sắc.", rev: "Lạm dụng quyền lực, quản lý tồi, công ty thua lỗ." },
      finance: { up: "Đầu tư khôn ngoan, tạo ra tài sản lớn nhờ tầm nhìn.", rev: "Phá sản do quyết định độc đoán, sai lầm." },
      health: { up: "Sức mạnh thể chất tốt, bền bỉ.", rev: "Huyết áp cao, các bệnh liên quan đến căng thẳng, tức giận." },
      spiritual: { up: "Dẫn dắt người khác bằng đạo đức và tầm nhìn.", rev: "Giáo điều, ép buộc người khác theo ý mình." }
    }
  }
];

fs.writeFileSync('E:/TAROT/js/wands.json', JSON.stringify(wands, null, 2));
console.log("Wands Generated!");
