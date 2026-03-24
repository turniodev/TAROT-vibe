const fs = require('fs');
let db = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json', 'utf8'));
const enriched = {
  6: {
    generalUpright: "Dưới sự chúc phúc của thiên thần, The Lovers vẫy gọi một sự hòa quyện tuyệt đẹp giữa hai tâm hồn. Đây không chỉ là khúc tình ca lãng mạn mà còn là ngã rẽ định mệnh, nơi bạn phải đưa ra lựa chọn trọng đại bằng chính trái tim và hệ giá trị cốt lõi của mình.",
    generalReversed: "Sự mất kết nối và những âm điệu lạc nhịp đang phá vỡ bản hòa ca. Bạn có thể đang vật lộn với những mâu thuẫn nội tâm dai dẳng, hoặc đang trốn tránh trách nhiệm cho những sai lầm trong lựa chọn của chính mình.",
    aspects: {
      love: { upright: "Một tình yêu đích thực, nơi hai linh hồn đồng điệu đến từng nhịp thở. Sự thu hút mãnh liệt và khát khao hòa làm một, dệt nên mối tình khắc cốt ghi tâm.", reversed: "Những rạn nứt đang âm thầm xuất hiện. Lời nói dối, sự lạnh nhạt hoặc bóng dáng người thứ ba đang thử thách niềm tin. Khúc vĩ cầm tình yêu đang chệch nhịp." },
      career: { upright: "Một cái bắt tay hợp tác mang tính bước ngoặt. Những cộng sự chung chí hướng sẽ cùng bạn chắp cánh dự án bay cao. Đã đến lúc đưa ra quyết định hệ trọng cho sự nghiệp.", reversed: "Môi trường công sở ngập ngụa drama và đối đầu ngầm. Bạn đang phân tâm, để cảm xúc cá nhân làm hoen ố tính chuyên nghiệp." },
      finance: { upright: "Đứng trước ngã ba đường của các quyết định tài chính, trực giác và sự đồng lòng cùng đối tác sẽ là kim chỉ nam dẫn bạn đến bến bờ thịnh vượng.", reversed: "Những quyết định xuất tiền bồng bột mang tính cảm tính. Đừng để những lời đường mật rút cạn các khoản tiết kiệm của bạn." },
      health: { upright: "Sự cân bằng tuyệt mỹ giữa thể chất và tinh thần. Sức khỏe của bạn sẽ thăng hoa nếu có một người bạn đồng hành cùng chia sẻ giờ phút luyện tập.", reversed: "Cơ thể rệu rã vì những giằng xé trong tâm trí. Đừng để nỗi buồn phiền tình cảm biến thành liều thuốc độc ăn mòn sức khỏe." },
      spiritual: { upright: "Hành trình thấu cảm và yêu thương trọn vẹn bản thân. Nhìn thấu bóng tối (shadow) và ánh sáng bên trong mình để đạt đến sự hợp nhất thiêng liêng.", reversed: "Tự dối mình, trốn tránh ánh sáng nội tại vì cảm thấy bản thân không xứng đáng được yêu thương và chở che." }
    },
    advice: "Dù đứng trước bất kỳ ngã rẽ nào, hãy để trái tim thuần khiết và sự trung thực tuyệt đối dẫn lối cho bạn."
  },
  7: {
    generalUpright: "Cỗ Xe vinh quang (The Chariot) lao về phía trước mang theo sức mạnh của ý chí sắt đá và sự tập trung cao độ. Mọi rào cản sẽ bị nghiền nát dưới bánh xe nếu bạn biết cách làm chủ và cầm cương điều khiển những nguồn năng lượng đối lập bên trong mình.",
    generalReversed: "Bánh xe trượt khỏi đường ray. Bạn đang đánh mất quyền kiểm soát cuộc đời mình, để cho ngoại cảnh và những cảm xúc hỗn mang cuốn trôi, hoặc đang đâm đầu mù quáng vào một ngõ cụt.",
    aspects: {
      love: { upright: "Một giai đoạn đòi hỏi sự quyết tâm cao độ để lèo lái con thuyền tình yêu vượt qua sóng gió. Hai bạn cần đồng lòng hướng về một mục tiêu chung.", reversed: "Sự cố chấp và mong muốn kiểm soát đối phương đang bóp nghẹt mối quan hệ. Càng siết chặt dây cương, tình yêu càng dễ vụt mất." },
      career: { upright: "Băng băng tiến về vạch đích. Sự nghiệp thăng tiến thần tốc nhờ lòng dũng cảm và kỷ luật thép. Bạn sinh ra để chinh phục những đỉnh cao mới.", reversed: "Sự nghiệp giậm chân tại chỗ. Cảm giác bất lực khi bị chèn ép hoặc thiếu tham vọng vươn lên. Bạn đang để người khác cầm lái cuộc đời mình." },
      finance: { upright: "Làm chủ hoàn toàn dòng tiền. Đã đến lúc vung roi cho những khoản đầu tư chiến lược mang tính đột phá. Sự táo bạo sẽ mang về chiến lợi phẩm xứng đáng.", reversed: "Ngựa đứt cương, tiền bạc tuôn chảy mất kiểm soát. Việc vung tiền thiếu định hướng sẽ đẩy bạn vào tình thế tiến thoái lưỡng nan." },
      health: { upright: "Năng lượng dồi dào, khả năng phục hồi thần tốc như một chiến binh. Đây là lúc bứt phá các giới hạn thể chất của bản thân.", reversed: "Cơ thể biểu tình vì bị vắt kiệt sức lực. Hãy cẩn trọng tai nạn trên đường đi hoặc những chấn thương do vận động quá ngưỡng." },
      spiritual: { upright: "Chiến thắng vĩ đại nhất là chiến thắng chính mình. Làm chủ được phần con để linh hồn tự do rong ruổi trên thảo nguyên nhận thức.", reversed: "Bị kìm kẹp bởi những ham muốn trần tục. Thiếu đi ý chí để tiến bước trên con đường tu tập và hoàn thiện bản ngã." }
    },
    advice: "Hãy nắm chặt dây cương, tập trung ánh nhìn vào đích đến và đừng để bất kỳ ai can thiệp vào tay lái của bạn."
  },
  8: {
    generalUpright: "Strength không phô trương sức mạnh bằng gươm giáo, mà rực sáng bởi lòng can đảm, kiên nhẫn và đức từ bi sâu thẳm. Lấy nhu thắng cương, bạn hoàn toàn có thể thuần hóa mọi dã thú trong nghịch cảnh bằng sự bao dung và dịu dàng.",
    generalReversed: "Sự yếu mềm xâm chiếm tâm hồn. Nỗi sợ vô hình, sự tự ti và cảm xúc bùng nổ đang biến bạn thành nạn nhân của chính những bản năng nguyên thủy bên trong mình.",
    aspects: {
      love: { upright: "Tình thương cảm hóa mọi lỗi lầm. Mối quan hệ nồng nàn được kiểm soát bằng sự thấu hiểu, kiên nhẫn vỗ về nhau qua những năm tháng giông bão.", reversed: "Những cơn thịnh nộ bùng phát, sự yếu đuối và tự ti gặm nhấm niềm tin. Bạn hoặc người ấy đang để cho phần 'con' lấn át phần 'người'." },
      career: { upright: "Chinh phục lòng người bằng sự ân cần và điềm tĩnh. Khả năng chịu đựng áp lực phi thường giúp bạn đứng vững giữa chốn thương trường khốc liệt.", reversed: "Mất đi tự tin vào năng lực bản thân. Nỗi sợ thất bại khiến bạn co cụm lại, nhường sân khấu tỏa sáng cho người khác." },
      finance: { upright: "Sự kiềm chế tuyệt vời trước cám dỗ vật chất. Đầu tư cần sự nhẫn nại, và bạn có thừa điềm tĩnh để chờ đợi trái ngọt.", reversed: "Chi tiêu vô tội vạ để vuốt ve cảm xúc tiêu cực. Hoặc bạn quá nhát gan, để cơ hội làm giàu trượt qua kẽ tay." },
      health: { upright: "Một sức sống dẻo dai, bền bỉ. Khả năng tự chữa lành của cơ thể ở mức cao nhất. Sự tĩnh tại trong tâm hồn nuôi dưỡng thể chất tráng kiện.", reversed: "Sinh lực bị vắt kiệt bởi sự căng thẳng và ức chế thần kinh. Hãy học cách buông bỏ để cứu lấy cơ thể đang rệu rã." },
      spiritual: { upright: "Cuộc đối thoại nội tâm sâu sắc, nơi bạn đối diện và ôm ấp bóng tối (shadow) của chính mình. Sự trưởng thành tột bậc của linh hồn.", reversed: "Trốn chạy những nỗi sợ hãi từ tiền kiếp. Để cho cái tôi (Ego) và sự kiêu ngạo che lấp đi ánh sáng từ bi." }
    },
    advice: "Sức mạnh vĩ đại nhất luôn được gói ghém trong sự dịu dàng. Hãy dùng lòng bao dung để thuần phục thế giới."
  },
  9: {
    generalUpright: "Cầm ngọn đèn chân lý trên tay, Ẩn Sĩ (The Hermit) vẫy gọi bạn bước vào khoảng lặng tĩnh mịch. Đã đến lúc gác lại ồn ào xô bồ thế gian, lùi sâu vào hang động nội tâm tự vấn và tìm ra ánh sáng dẫn đường cho chặng hành trình sắp tới.",
    generalReversed: "Một sự cô lập cực đoan đến mức tuyệt vọng. Bạn đang xây những bức tường quá cao để nhốt mình lại, hoặc từ chối lắng nghe lời khuyên khôn ngoan từ bậc tiền bối vì sự cố chấp tột độ.",
    aspects: {
      love: { upright: "Tình yêu lùi lại nhường chỗ cho ưu tiên phát triển bản ngã. Bạn khao khát không gian riêng tư tĩnh lặng để chiêm nghiệm lại giá trị cốt lõi của tình cảm.", reversed: "Sự cô đơn buốt giá ngay cả khi đang có đôi có cặp. Cánh cửa trái tim đóng sập, từ chối mọi nỗ lực kết nối từ đối phương." },
      career: { upright: "Dừng lại một nhịp để định vị la bàn sự nghiệp. Tự hỏi bản thân xem con đường hiện tại có thực sự phản chiếu khát vọng sâu thẳm nhất của linh hồn không.", reversed: "Tự tách mình ra khỏi tập thể, khước từ hợp tác. Cảm giác lạc lõng, bơ vơ giữa chốn công sở đông người." },
      finance: { upright: "Sự thông thái trong quản lý chi tiêu. Bạn nhận ra vật chất phù phiếm không thể lấp đầy khoảng trống tâm hồn, lựa chọn lối sống tối giản, thanh tịnh.", reversed: "Mắc kẹt trong rắc rối tài chính vì bỏ ngoài tai lời can ngăn từ người có kinh nghiệm. Cố chấp đâm đầu vào ngõ cụt." },
      health: { upright: "Khoảng thời gian vàng để cơ thể được thanh lọc, chữa lành. Hãy tìm đến thiền định, yoga hoặc những chuyến đi ẩn tu để nạp lại sinh khí.", reversed: "Những đám mây mù trầm cảm, lo âu bao phủ. Cần bước ra khỏi vùng tối và tìm kiếm ánh sáng từ sự giúp đỡ cộng đồng." },
      spiritual: { upright: "Trở thành ngọn hải đăng cho chính mình và người lạc lối. Hành trình giác ngộ mở ra những chân trời nhận thức mới mẻ.", reversed: "Lạc lối trong bóng đêm vô minh. Khước từ sự cứu rỗi từ vũ trụ, để mặc linh hồn chìm nghỉm trong sự cô độc." }
    },
    advice: "Câu trả lời bạn mỏi mắt kiếm tìm không nằm ở thế giới ngoài kia, nó đang ngủ quên ngay trong sâu thẳm tâm hồn bạn."
  },
  10: {
    generalUpright: "Bánh xe định mệnh (Wheel of Fortune) không bao giờ ngừng quay. Lá bài là cái gật đầu của vũ trụ, báo hiệu bước ngoặt mang tính luân hồi, nơi những may mắn bất ngờ và cơ hội vàng son ập đến thay đổi hoàn toàn cục diện cuộc đời bạn.",
    generalReversed: "Bánh xe quay vào vòng lặp u ám. Cảm giác bất lực khi mọi thứ trượt khỏi tầm tay, xui xẻo liên tiếp giáng xuống. Nhưng hãy nhớ, dưới đáy bánh xe, điểm tiếp theo chỉ có thể là đi lên.",
    aspects: {
      love: { upright: "Bàn tay vô hình của số phận dệt nên mối duyên tiền định. Những sự kiện ngẫu nhiên sẽ gắn kết hai linh hồn lại với nhau trong vũ điệu tình yêu bất ngờ, say đắm.", reversed: "Cuộc tình rơi vào khoảng lặng trầm buồn, trắc trở ngoài ý muốn cản bước hai người. Đừng cố cưỡng cầu, hãy để dòng chảy tự nhiên đưa đường dẫn lối." },
      career: { upright: "Cờ đến tay, hãy phất! Một cơ hội thăng tiến bất ngờ, một lời mời hợp tác rực rỡ từ trên trời rơi xuống. Thần may mắn mỉm cười với sự nghiệp của bạn.", reversed: "Sự nghiệp chững lại bởi yếu tố khách quan không thể chống đỡ. Công ty tái cơ cấu, mất việc hoặc dự án đình trệ. Hãy kiên nhẫn chờ qua cơn bĩ cực." },
      finance: { upright: "Tài vận hanh thông, những dòng tiền bất ngờ đổ về túi. Thời điểm thiên thời địa lợi nhân hòa để bạn thu hoạch những mẻ lưới đầy ắp lợi nhuận.", reversed: "Ví tiền cạn kiệt vì sự cố 'trời ơi đất hỡi'. Hãy thắt lưng buộc bụng và cẩn trọng bảo vệ tài sản qua giai đoạn giông bão này." },
      health: { upright: "Phép màu chữa lành đang hiển hiện. Bệnh tật tiêu tan, cơ thể tìm lại nhịp đập sinh học vốn có nhờ sự can thiệp y tế hoặc thay đổi lối sống mang tính bước ngoặt.", reversed: "Sức khỏe chao đảo vì tai ương bất chợt. Lời nhắc nhở đanh thép về việc không được chủ quan trước những thay đổi nhỏ nhất của cơ thể." },
      spiritual: { upright: "Sự thấu ngộ sâu sắc về luật Nhân Quả (Karma). Bạn nhận ra mọi đau khổ hay vinh quang đều là sự sắp đặt hoàn hảo để mài giũa linh hồn.", reversed: "Oán trách số phận, cảm thấy vũ trụ quay lưng. Sự chối bỏ bài học luân hồi khiến linh hồn mãi lẩn quẩn trong vòng lặp khổ đau." }
    },
    advice: "Dù bánh xe đưa bạn lên đỉnh vinh quang hay dìm xuống vực thẳm, hãy giữ tâm bất biến giữa dòng đời vạn biến. Mọi thứ rồi sẽ qua đi."
  },
  11: {
    generalUpright: "Dưới cán cân công lý của Justice, sự thật luôn được hiển bày. Mọi hành động đều được đong đếm bởi luật Nhân Quả. Lá bài yêu cầu sự minh bạch, trung thực và lòng can đảm để đối diện với những phán quyết công bằng nhất của vũ trụ.",
    generalReversed: "Bóng tối của sự bất công, dối trá và lảng tránh trách nhiệm. Bạn có thể là nạn nhân của sự thiên vị cay nghiệt, hoặc chính bạn đang chối bỏ hậu quả từ sai lầm mà mình gieo rắc.",
    aspects: {
      love: { upright: "Mối quan hệ xây dựng trên sự sòng phẳng, tôn trọng và minh bạch. Hợp đồng hôn nhân hoặc cam kết pháp lý mang lại bảo chứng vững chắc cho tình yêu.", reversed: "Sự mất cân bằng nghiêm trọng. Lừa dối, ngoại tình hoặc phán xét cay nghiệt. Nếu ly hôn, đó sẽ là cuộc chiến pháp lý mệt mỏi." },
      career: { upright: "Cây ngay không sợ chết đứng. Nỗ lực chân chính được đền đáp bằng phần thưởng xứng đáng. Cần cực kỳ tỉnh táo, minh bạch trong giấy tờ, hợp đồng.", reversed: "Môi trường công sở độc hại, nơi sự thiên vị và trò đâm sau lưng lên ngôi. Hoặc hành vi gian lận của bạn sắp phơi bày ra ánh sáng." },
      finance: { upright: "Bức tranh tài chính rõ nét, cân bằng. Tài lộc đến từ mồ hôi công sức chân chính. Thời điểm thích hợp giải quyết các vấn đề liên quan đến thuế, phân chia tài sản.", reversed: "Cảnh báo đỏ về rắc rối pháp lý liên quan tiền bạc. Lừa đảo, tham nhũng hoặc những khoản nợ không sòng phẳng khiến bạn lao đao." },
      health: { upright: "Sự cân bằng tuyệt mỹ của cơ thể học. Thói quen sinh hoạt điều độ đơm hoa kết trái thành một thể trạng khỏe mạnh rạng ngời.", reversed: "Luật nhân quả hiển hiện trên cơ thể. Thói quen độc hại, buông thả từ quá khứ nay đòi lại món nợ sức khỏe." },
      spiritual: { upright: "Chấp nhận sự vận hành của luật Karma (Nghiệp). Hiểu rằng kết quả hôm nay là quả ngọt hay trái đắng của ngày hôm qua.", reversed: "Chối bỏ trách nhiệm tâm linh. Không thừa nhận sai lầm, mãi đóng vai nạn nhân đổ lỗi cho sự an bài của số phận." }
    },
    advice: "Sự thật là ánh sáng không thể bị che khuất. Hãy hành xử với trái tim ngay thẳng, và vũ trụ sẽ trao cho bạn sự công bằng."
  },
  12: {
    generalUpright: "Người Treo Ngược (The Hanged Man) là vũ điệu của tĩnh lặng và hy sinh tự nguyện. Lá bài yêu cầu buông bỏ sự kiểm soát cố chấp, đảo ngược góc nhìn đón nhận khai sáng. Sự đình trệ tạm thời ươm mầm cho nhận thức vĩ đại.",
    generalReversed: "Vùng vẫy vô vọng trong bế tắc. Bạn bám víu định kiến cũ kỹ, từ chối hy sinh hoặc đóng vai nạn nhân. Sự trì hoãn kéo dài hao mòn nhuệ khí mà không mang lại bất kỳ giác ngộ nào.",
    aspects: {
      love: { upright: "Tình yêu cần một nhịp dừng tĩnh tại. Lùi lại một bước, đặt mình vào vị trí đối phương để thấu cảm góc khuất tâm hồn họ. Sự chờ đợi mang tính nuôi dưỡng.", reversed: "Mắc kẹt trong cuộc tình mòn mỏi. Bạn hy sinh bản thân vô ích cho người không xứng đáng, hoặc cố chấp níu kéo ảo mộng đã tàn." },
      career: { upright: "Sự nghiệp tạm thời giậm chân tại chỗ. Đừng cố bơi ngược dòng nước xiết. Tận dụng thời gian này ấp ủ chiến lược dài hạn và thay đổi tư duy làm việc.", reversed: "Trì trệ, chán nản nhưng không dám dứt bỏ. Lãng phí thời gian thanh xuân vào công việc vô nghĩa chỉ vì sợ hãi sự thay đổi." },
      finance: { upright: "Thắt lưng buộc bụng. Bạn cần hy sinh niềm vui vật chất ngắn hạn để gom góp nguồn lực cho mục tiêu tài chính lớn lao hơn trong tương lai.", reversed: "Tê liệt trước quyết định tài chính. Sự chần chừ, tiếc rẻ khiến bạn bỏ lỡ cơ hội vàng tái cơ cấu dòng tiền của mình." },
      health: { upright: "Báo hiệu giai đoạn buông bỏ hoàn toàn công việc để tịnh dưỡng. Cơ thể kêu gào đòi nghỉ ngơi vô điều kiện để tự chữa lành.", reversed: "Ngoan cố từ chối liệu pháp chữa trị, phớt lờ cảnh báo cơ thể. Tinh thần u uất kéo theo sự suy sụp không thể đảo ngược của thể chất." },
      spiritual: { upright: "Hào quang của khai sáng rực rỡ quanh đầu. Sự buông bỏ bản ngã (Ego) hòa tan linh hồn vào dòng chảy thiêng liêng vũ trụ.", reversed: "Khước từ tiếng gọi Đấng Tối Cao. Mắc kẹt trong bóng tối vô minh vì không chịu vứt bỏ chấp niệm trần tục." }
    },
    advice: "Đôi khi, việc không làm gì cả lại là hành động mạnh mẽ nhất. Hãy buông tay để rơi tự do vào sự tĩnh lặng của sự giác ngộ."
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
const jsStr = '// js/data.js - Enriched Vibe Batch 3 (Cards 6 to 12)\n(function () {\n  window.TAROT_DB = ' + JSON.stringify(db, null, 2) + ';\n})();';
fs.writeFileSync('E:/TAROT/js/data.js', jsStr);
console.log('Enriched cards 6 to 12');
