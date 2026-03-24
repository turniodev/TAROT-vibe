const fs = require('fs');
let db = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json', 'utf8'));
const enriched = {
  13: {
    generalUpright: "Tiếng gọi của sự lột xác vĩ đại. Death không phải là cái chết vật lý, mà là lưỡi hái thanh trừng những thứ mục nát, cằn cỗi để dọn đường cho mầm sống mới nảy sinh. Một sự kết thúc không thể tránh khỏi để linh hồn được luân hồi và tái sinh rực rỡ.",
    generalReversed: "Kháng cự tuyệt vọng trước bánh xe thời gian. Bạn đang níu kéo những thói quen, mối quan hệ hay niềm tin đã chết yểu. Việc từ chối buông tay chỉ làm cho quá trình chuyển hóa thêm đau đớn và dai dẳng.",
    aspects: {
      love: { upright: "Dấu chấm hết cho một mối quan hệ đã hoàn thành sứ mệnh của nó, hoặc là sự lột xác hoàn toàn của tình yêu hiện tại (từ bỏ thói quen xấu để gắn kết bền chặt hơn).", reversed: "Sống vật vờ trong tình yêu nguội lạnh. Nỗi sợ cô đơn khiến bạn bám víu quá khứ, không thể mở lòng đón nhận hạnh phúc mới." },
      career: { upright: "Một cánh cửa sập lại để muôn vàn cánh cửa khác mở ra. Mất việc, đổi nghề hoặc từ bỏ những dự án không còn giá trị. Đừng sợ hãi, bình minh đang đợi bạn.", reversed: "Ngột ngạt trong công việc tồi tệ nhưng sợ hãi bấp bênh không dám từ chức. Sự nghiệp trở thành một vũng lầy tù đọng." },
      finance: { upright: "Cắt bỏ nguồn rò rỉ tài chính. Thanh lý khoản đầu tư tồi tệ. Đây là lúc tái cơ cấu toàn bộ bức tranh tiền bạc để tạo dựng lại từ đầu.", reversed: "Ôm mộng gỡ gạc những khoản lỗ không thể cứu vãn. Sự ngoan cố không chịu cắt lỗ kéo toàn bộ tài sản của bạn xuống đáy vực." },
      health: { upright: "Sự thay đổi mang tính cách mạng trong chăm sóc cơ thể. Dứt bỏ hoàn toàn chất gây nghiện, thói quen ăn uống độc hại để tái sinh cơ thể mới.", reversed: "Bệnh tật bám rễ sâu vì khước từ thay đổi. Việc nuông chiều thói quen cũ đang bào mòn sinh lực sống từng ngày." },
      spiritual: { upright: "Sự lột xác linh hồn (ego death). Giũ bỏ những chiếc mặt nạ nhân tạo để tái sinh thành phiên bản giác ngộ, thuần khiết và chân thực nhất.", reversed: "Chìm đắm trong tăm tối (Dark night of the soul) nhưng từ chối tìm ánh sáng. Tự giam mình trong nấm mồ tiếc nuối." }
    },
    advice: "Giống như con rắn lột xác, đau đớn là tất yếu. Hãy dũng cảm buông bỏ những gì đã úa tàn để đón nhận sự sống mới."
  },
  14: {
    generalUpright: "Temperance là thuật giả kim của tâm hồn, pha trộn những yếu tố đối lập tạo nên hỗn hợp cân bằng tuyệt mỹ. Lá bài khuyên giữ sự trung dung, điềm tĩnh và kiên nhẫn. Mọi vết thương sẽ được chữa lành khi dòng chảy cuộc sống điều hòa nhịp nhàng.",
    generalReversed: "Sự xáo trộn, cực đoan và mất kiềm chế. Bạn chạy theo những thái cực bốc đồng, ăn xài vô độ hoặc để cảm xúc hỗn loạn dẫn dắt. Lời cảnh báo đanh thép về sự dư thừa đang phá hủy cuộc sống.",
    aspects: {
      love: { upright: "Hòa hợp êm đềm như nước mùa thu. Hai trái tim biết nhường nhịn, lắng nghe và dung hòa khác biệt để dệt bản tình ca êm ái, bền bỉ với thời gian.", reversed: "Những trận cãi vã nảy lửa, sự ích kỷ và đòi hỏi cực đoan đang xé toạc mối quan hệ. Tình yêu thiếu vắng nhẫn nại và lòng bao dung." },
      career: { upright: "Một người dung hòa tuyệt vời nơi công sở. Cân bằng áp lực, gắn kết các thành viên và điều phối công việc với phong thái điềm tĩnh, chuyên nghiệp.", reversed: "Áp lực công việc đè bẹp tỉnh táo. Tham lam ôm đồm mọi thứ, làm việc vội vã, dẫn đến sai sót ngớ ngẩn và rạn nứt đồng nghiệp." },
      finance: { upright: "Dòng chảy tài chính êm ả. Thu chi chừng mực, tiết kiệm hợp lý và đầu tư an toàn. Sự bình yên trong tâm hồn không bị dao động bởi sóng vật chất.", reversed: "Vung tay quá trán, mua sắm điên cuồng hoặc liều lĩnh ném tiền vào canh bạc rủi ro. Mất cân bằng tài chính đe dọa sự an toàn của bạn." },
      health: { upright: "Sức khỏe phục hồi rực rỡ nhất. Sự điều độ trong ăn uống, ngủ nghỉ chính là thần dược chữa lành mọi tổn thương thể chất.", reversed: "Cảnh báo lối sống buông thả: thức khuya, lạm dụng chất kích thích, ăn uống vô độ. Sự cực đoan tàn phá hệ miễn dịch." },
      spiritual: { upright: "Đạt đến cảnh giới 'Trung Đạo' (Middle Way). Sự tĩnh tại tuyệt đối khi tiềm thức và ý thức hòa quyện làm một, tạo vầng hào quang nội tại rực rỡ.", reversed: "Năng lượng tâm linh rối loạn. Bị cuốn phăng bởi cảm xúc cực đoan, không thể tìm thấy tịnh tâm giữa giông bão cuộc đời." }
    },
    advice: "Đừng vội vã. Hãy là vị giả kim thuật của đời mình, từ từ pha trộn những mảnh ghép tìm ra điểm cân bằng hoàn hảo nhất."
  },
  15: {
    generalUpright: "The Devil giăng ra những chiếc bẫy ngọt ngào của dục vọng, sự cám dỗ và xiềng xích vật chất. Tuy nhiên, sợi xích ấy rất lỏng lẻo; bạn tự nhốt mình bằng những ảo ảnh sợ hãi trong tâm trí.",
    generalReversed: "Ánh bình minh phá tan xiềng xích. Cuối cùng đã thức tỉnh, dũng cảm đối diện phần tối (shadow) của mình, cắt đứt sự bám víu độc hại và giành lại sự tự do thiêng liêng cho linh hồn.",
    aspects: {
      love: { upright: "Mối tình bị thống trị bởi dục vọng, thao túng, ghen tuông độc hại hoặc phụ thuộc mù quáng. Tình yêu biến thành lồng vàng ngột ngạt.", reversed: "Giải thoát khỏi kẻ thao túng tình cảm hoặc bạo hành. Dũng cảm bước ra khỏi vũng lầy, lấy lại sự tự tôn và độc lập cho trái tim mình." },
      career: { upright: "Bán linh hồn cho công việc vì ma lực đồng tiền. Môi trường đầy thủ đoạn, lừa lọc hoặc bị bóc lột mà không phản kháng vì sợ mất ổn định.", reversed: "Rũ bỏ áp lực vô lý, từ chức khỏi nơi làm việc độc hại. Bạn thà chọn bình yên còn hơn làm nô lệ cho tham vọng phù phiếm." },
      finance: { upright: "Lòng tham không đáy và duy vật. Cảnh báo khoản vay nặng lãi, cờ bạc, tham nhũng hoặc bị mờ mắt bởi lợi ích tài chính bất chính.", reversed: "Thoát khỏi vũng lầy nợ nần. Nhận ra tiền bạc không phải là chúa tể, bắt đầu dọn dẹp đống tàn dư tài chính làm lại từ đầu." },
      health: { upright: "Hồi chuông cảnh báo đỏ về sa đọa: nghiện ngập (rượu, thuốc, game), lối sống hủy hoại tế bào hoặc vấn đề tâm thần (trầm cảm, ám ảnh cưỡng chế).", reversed: "Hành trình cai nghiện thành công. Phục hồi sức khỏe sau thời gian dài chìm trong lối sống độc hại. Cơ thể đang được thanh lọc." },
      spiritual: { upright: "Đánh mất la bàn đạo đức. Chìm đắm trong hận thù, tăm tối và để bản ngã (Ego) khống chế hoàn toàn ánh sáng trực giác.", reversed: "Vượt qua đêm tối linh hồn. Dũng cảm nhìn thẳng vào những góc khuất xấu xí nhất của bản thân để gột rửa và tái sinh." }
    },
    advice: "Xiềng xích không nằm ở đôi tay, mà nằm trong tâm trí. Hãy nhìn thẳng vào bóng tối, nhận ra quyền năng của mình và tự do bước đi."
  },
  16: {
    generalUpright: "Tia sét của vũ trụ giáng xuống, phá nát những nền móng mục rỗng. The Tower mang đến cú sốc đột ngột, thảm họa tàn khốc phá vỡ vỏ bọc an toàn. Nhưng qua đống tro tàn, không gian được làm sạch để xây dựng lại cuộc đời vững bền hơn.",
    generalReversed: "Sống trong sợ hãi, bấu víu vách tường đang nứt toác để trì hoãn sự sụp đổ tất yếu. Việc né tránh nỗi đau chỉ làm quả bom nổ chậm thêm phần sức công phá. Hãy để mọi thứ vỡ tan.",
    aspects: {
      love: { upright: "Sự thật động trời bị phanh phui, phản bội, hoặc cuộc chia ly đột ngột tựa sấm sét. Nền tảng mối quan hệ vỡ vụn, để lại tổn thương sâu sắc.", reversed: "Dù biết tình yêu đã chết, vẫn cố chấp vá víu thảm hại vì sợ đối diện cô đơn. Nỗi đau dai dẳng không lối thoát." },
      career: { upright: "Khủng hoảng công sở: sa thải bất ngờ, công ty phá sản, hoặc dự án đổ sụp phút chót. Mọi kế hoạch bị đảo lộn, buộc làm lại từ con số không.", reversed: "Môi trường làm việc như ngục tù nhưng từ chối thay đổi. Kháng cự trước biến động cần thiết khiến sự nghiệp chìm trong khủng hoảng ngầm." },
      finance: { upright: "Đòn giáng mạnh vào tài chính. Phá sản, thua lỗ đầu tư trầm trọng hoặc tai nạn tước đi phần lớn tài sản. Cần can đảm phi thường để đứng dậy.", reversed: "Trốn tránh nợ nần, phủ nhận thực trạng tồi tệ của túi tiền. Cố che đậy quả bom tài chính đang chờ chực phát nổ." },
      health: { upright: "Bệnh tật ập đến không báo trước, tai nạn, khủng hoảng sức khỏe nghiêm trọng buộc nhập viện và thay đổi triệt để lối sống.", reversed: "Phớt lờ triệu chứng cảnh báo, trốn tránh đi khám bệnh. Sự ngoan cố đẩy cơ thể đến sát bờ vực sụp đổ hoàn toàn." },
      spiritual: { upright: "Thức tỉnh tâm linh đau đớn tột cùng (Ego death). Mọi niềm tin, giáo điều sùng bái vỡ vụn, để lại linh hồn trần trụi nhưng được khai sáng.", reversed: "Bịt tai che mắt trước chân lý mới. Sợ thay đổi, cố bám víu tín ngưỡng sai lệch để tìm sự an ủi giả tạo." }
    },
    advice: "Đừng khóc than cho một nền móng đã thối nát. Hãy đón nhận cơn bão, quét sạch tàn dư và kiêu hãnh xây lại một lâu đài kiên cố hơn."
  },
  17: {
    generalUpright: "Sau cơn dông bão Tòa Tháp, ánh sao băng của The Star mang theo dòng suối mát lành của sự hy vọng, phục hồi và niềm tin bất diệt. Linh hồn bạn trần trụi, thuần khiết và đang được vũ trụ dịu dàng chữa lành mọi vết thương.",
    generalReversed: "Bầu trời đêm không sao. Sự tuyệt vọng, bi quan và bóng tối bủa vây tâm trí. Bạn đang cạn kiệt niềm tin vào bản thân và phớt lờ dòng suối chữa lành đang chảy róc rách ngay bên cạnh.",
    aspects: {
      love: { upright: "Tình yêu tái sinh từ vụn vỡ. Sự kết nối thanh khiết, chân thành và rực rỡ niềm tin. Lúc hai tâm hồn cùng nhau chữa lành và hướng về tương lai ngập tràn ánh sáng.", reversed: "Trái tim hóa đá sau tổn thương. Hoài nghi, bi quan và sợ hãi lặp lại nỗi đau cũ khiến bạn đóng sập cửa tình yêu, tự cô lập mình." },
      career: { upright: "Sự nghiệp thăng hoa trong nguồn cảm hứng dồi dào. Môi trường làm việc lý tưởng, nơi tài năng tỏa sáng rực rỡ và được công nhận xứng đáng. Định hướng mới đầy hứa hẹn.", reversed: "Đánh mất đam mê và động lực làm việc. Chán nản, bi quan bao trùm khiến nỗ lực trở nên sáo rỗng, vuột mất những cơ hội quý giá." },
      finance: { upright: "Niềm tin vào sự sung túc đang thu hút dòng chảy tài lộc về phía bạn. Các khoản đầu tư bắt đầu đơm hoa, mang lại bức tranh tài chính ổn định và vô cùng lạc quan.", reversed: "Tâm lý thiếu thốn (scarcity mindset) cản bước dòng tiền. Lo âu thái quá về nghèo đói dù thực tại không bi đát, khiến bạn mệt mỏi vô ích." },
      health: { upright: "Phép màu phục hồi. Sinh lực tuôn chảy, thể chất và tinh thần thanh lọc, chữa lành tận gốc rễ. Nguồn năng lượng an bình ôm trọn lấy cơ thể bạn.", reversed: "Bệnh tật kéo dài do u uất tinh thần. Việc thiếu niềm tin vào quá trình điều trị đang tự tay triệt tiêu khả năng tự chữa lành của cơ thể." },
      spiritual: { upright: "Giao hòa trọn vẹn vũ trụ bao la. Trút bỏ muộn phiền thế tục để linh hồn tự do tắm mình trong ánh sáng giác ngộ và bình yên vĩnh cửu.", reversed: "Cảm giác bị Đấng Tối Cao bỏ rơi. Lạc lối giữa cõi trần, không tìm thấy mục đích sống và ý nghĩa của linh hồn." }
    },
    advice: "Hãy trút bỏ mọi muộn phiền, mở rộng trái tim và đón nhận dòng suối chữa lành. Vũ trụ luôn yêu thương và bảo bọc bạn."
  },
  18: {
    generalUpright: "Dưới ánh sáng mờ ảo The Moon, tiềm thức, giấc mơ và nỗi sợ hãi nguyên thủy đang trỗi dậy. Mọi thứ mờ ảo, đầy rẫy ảo ảnh và dối trá. Đừng vội vã quyết định, hãy dùng trực giác soi đường qua vùng đầm lầy tăm tối.",
    generalReversed: "Làn sương mù dày đặc dần tan biến. Những bí mật đen tối, lừa lọc hay ám ảnh tâm lý đang phơi bày ra ánh sáng rực rỡ. Đã đến lúc thoát khỏi vũng lầy hoang tưởng đối diện hiện thực rõ ràng.",
    aspects: {
      love: { upright: "Tình yêu nhuốm màu mập mờ, thiếu minh bạch. Ghen tuông vô cớ, bất an và những bí mật bị che giấu dệt nên bức tranh tình cảm hoang mang, nghi kỵ.", reversed: "Mặt nạ rơi xuống, sự thật về sự phản bội hay lừa dối bị bóc trần. Dù đau đớn, nhưng sự minh bạch giúp giải thoát khỏi cuộc tình dối trá." },
      career: { upright: "Môi trường làm việc như màn kịch với lời đồn thất thiệt, đâm sau lưng và thông tin nhiễu loạn. Hãy cẩn trọng từng bước đi, đừng tin ai ngoài trực giác.", reversed: "Những khuất tất chốn công sở cuối cùng lộ diện. Nhìn thấu bản chất vấn đề, giải tỏa hiểu lầm và thoát khỏi bầu không khí độc hại." },
      finance: { upright: "Nguy cơ sa lưới lừa đảo, những bản hợp đồng mập mờ, 'bánh vẽ'. Tuyệt đối không rót vốn đầu tư khi mọi thông tin vẫn đang nằm trong bóng tối.", reversed: "Kịp thời phanh phui vụ lừa đảo tài chính hoặc nhận ra sai lầm trước khi vỡ lở. Bức tranh tiền bạc trở lại minh bạch, rõ ràng." },
      health: { upright: "Những bóng ma tâm lý giày vò. Chứng mất ngủ, rối loạn lo âu, trầm cảm hoặc những cơn ác mộng dai dẳng vắt kiệt sự tỉnh táo và sinh lực của bạn.", reversed: "Bình minh của tâm trí. Tìm ra gốc rễ những căn bệnh tâm lý, bắt đầu quá trình trị liệu và dần đẩy lùi nỗi sợ hãi hoang tưởng." },
      spiritual: { upright: "Bị lạc trong mê cung tiềm thức, đối diện góc khuất u ám nhất (shadow). Ranh giới giữa thực tại và ảo ảnh tâm linh trở nên mong manh.", reversed: "Xuyên qua đêm tối, linh hồn tìm thấy lối ra. Thấu suốt những ảo mộng, chạm đến sự giác ngộ chân thực." }
    },
    advice: "Khi mắt trần không thể nhìn xuyên qua màn sương, hãy nhắm mắt lại và để ánh sáng của trực giác dẫn lối."
  },
  19: {
    generalUpright: "The Sun tỏa ánh hào quang chói lọi, sưởi ấm mọi ngóc ngách cuộc sống. Lá bài là bản giao hưởng rực rỡ của viên mãn, niềm vui thuần khiết, sức sống mãnh liệt và thành công tột đỉnh. Bóng tối u ám đã bị xua tan hoàn toàn.",
    generalReversed: "Những đám mây bay ngang qua bầu trời nắng. Mọi thứ vẫn rất tốt đẹp, chỉ là niềm vui bị trì hoãn một chút, hoặc cái tôi quá lớn khiến bạn không thể tận hưởng trọn vẹn. Đừng để sự bi quan làm lu mờ ánh sáng.",
    aspects: {
      love: { upright: "Câu chuyện tình đẹp như cổ tích, ngập tràn tiếng cười, sự chân thành và hạnh phúc rạng ngời. Báo hiệu sự đơm hoa kết trái, lễ cưới viên mãn hay sự ra đời sinh linh bé nhỏ.", reversed: "Những hờn dỗi trẻ con, sự ích kỷ hoặc đòi hỏi đối phương chiều chuộng quá mức làm giảm phần nào sự lãng mạn. Tuy nhiên, giận hờn này sẽ qua rất nhanh." },
      career: { upright: "Sự nghiệp thăng hoa rực rỡ, đứng trên bục vinh quang được tán dương. Tỏa sáng như một mặt trời chốn công sở, mang lại năng lượng tích cực và thành công vang dội.", reversed: "Thành tựu bị trì hoãn phút chót, hoặc sự tự cao tự đại (Ego) khiến bạn phớt lờ ý kiến đồng nghiệp. Đừng ngủ quên trên chiến thắng đánh mất đi khiêm tốn." },
      finance: { upright: "Tài lộc dồi dào, ví tiền rủng rỉnh. Mọi khoản đầu tư đều sinh lời rực rỡ. Thời kỳ thịnh vượng, tự do tài chính và những phần thưởng vật chất vô cùng xứng đáng.", reversed: "Chi tiêu hơi hoang phí cho những cuộc vui ngắn hạn hoặc tự tin thái quá dẫn đến đánh giá sai lợi nhuận đầu tư. Tiền bạc vẫn ổn nhưng cần bớt phô trương." },
      health: { upright: "Cơ thể cường tráng, sinh lực thanh xuân dồi dào và tinh thần sảng khoái. Ánh nắng mặt trời đang truyền cho bạn khả năng phục hồi và sức sống vô tận.", reversed: "Sự mệt mỏi nhẹ hoặc uể oải do làm việc quá sức dưới nắng. Đôi khi chỉ là những bệnh vặt không đáng lo, hãy giữ tinh thần lạc quan để mau chóng bình phục." },
      spiritual: { upright: "Linh hồn hoàn toàn tự do, thuần khiết như đứa trẻ. Đạt đến cảnh giới hân hoan, giác ngộ và thấu hiểu trọn vẹn vẻ đẹp của sự tồn tại.", reversed: "Niềm vui tâm linh hời hợt bề ngoài, che đậy một cái tôi (Ego) còn nhiều trói buộc. Cần gọt rửa thêm để ánh sáng nội tại được trong trẻo nhất." }
    },
    advice: "Hãy bung nở rực rỡ như đóa hướng dương đón nắng. Bạn hoàn toàn xứng đáng với những đặc ân rực rỡ nhất mà vũ trụ ban tặng."
  },
  20: {
    generalUpright: "Tiếng kèn thiên sứ vang lên, đánh thức linh hồn từ nấm mồ. Judgement là sự tái sinh vĩ đại, tiếng gọi thiêng liêng nội tâm hối thúc rũ bỏ lỗi lầm quá khứ. Đã đến lúc đánh giá lại cuộc đời, tha thứ và bước sang chương sống giác ngộ.",
    generalReversed: "Sự cắn rứt lương tâm và tự phán xét tàn nhẫn. Khước từ tiếng gọi thức tỉnh, lảng tránh lỗi lầm cũ và giam mình trong sợ hãi, không dám bứt phá làm lại từ đầu.",
    aspects: {
      love: { upright: "Cuộc đối thoại chân thật từ sâu thẳm tâm hồn. Nhìn nhận lại rạn nứt, tha thứ cho nhau để 'tái sinh' tình yêu mãnh liệt hơn; hoặc dũng cảm buông tay trong thanh thản tuyệt đối.", reversed: "Chì chiết nhau vì những vết thương cũ không khép miệng. Sự phán xét khắc nghiệt, thiếu vắng lòng vị tha đang đẩy mối quan hệ vào ngõ cụt ngột ngạt." },
      career: { upright: "Đứng trước khoảnh khắc định mệnh của sự nghiệp. Tiếng gọi nội tâm thôi thúc từ bỏ lối mòn theo đuổi sứ mệnh thực sự đời mình. Sự chuyển giao nghề nghiệp mang tính bước ngoặt rực rỡ.", reversed: "Sợ hãi sự phán xét xã hội không dám thay đổi công việc. Bám víu lấy vị trí đã chết yểu chỉ vì sĩ diện hoặc sự hèn nhát không dám đối diện với thất bại." },
      finance: { upright: "Kiểm kê lại toàn bộ cán cân tài chính. Những quyết định tiền bạc lúc này đòi hỏi sự sáng suốt tột bậc, thanh lọc các khoản nợ và tái sinh nền tảng vật chất mới.", reversed: "Trốn tránh nợ nần, không dám đối mặt hậu quả những sai lầm tài chính trong quá khứ. Sự trì hoãn đẩy bạn lún sâu hơn vào vũng lầy khủng hoảng." },
      health: { upright: "Hồi sinh từ cửa tử. Phục hồi kỳ diệu sau cơn bạo bệnh, đòi hỏi thanh tẩy hoàn toàn cơ thể và vĩnh viễn rũ bỏ những thói quen sinh hoạt độc hại.", reversed: "Sức khỏe suy kiệt vì dằn vặt tâm lý, chối từ việc thay đổi lối sống để chữa trị. Căn bệnh dai dẳng vì bạn không chịu buông bỏ gốc rễ của nó." },
      spiritual: { upright: "Giải thoát khỏi xiềng xích nghiệp quả (Karma). Linh hồn bay lên một tầng không gian nhận thức cao hơn, đáp lại lời vẫy gọi Đấng Thiêng Liêng.", reversed: "Mắc kẹt trong bóng tối mặc cảm tội lỗi. Tự trừng phạt linh hồn mình, từ chối vòng tay ân xá của vũ trụ." }
    },
    advice: "Quá khứ không phải là ngục tù. Hãy vị tha, lắng nghe tiếng kèn thức tỉnh và dũng cảm cất bước tái sinh."
  },
  21: {
    generalUpright: "Vòng nguyệt quế của The World khép lại một đại chu kỳ rực rỡ. Lá bài là bản thánh ca của sự hoàn thành, viên mãn và trọn vẹn tột đỉnh. Cuộc hành trình cán vạch đích thành công, bạn đã hòa làm một với vũ trụ, sẵn sàng tận hưởng quả ngọt.",
    generalReversed: "Bạn đã đi được 99% chặng đường, nhưng sự trì hoãn, thiếu tập trung hay nỗi sợ hãi vạch đích khiến mọi thứ bị bỏ dở giữa chừng. Sự chưa trọn vẹn này để lại cảm giác bứt rứt, hụt hẫng không nguôi.",
    aspects: {
      love: { upright: "Tình yêu đi đến cái kết hoàn mỹ nhất. Một lễ cưới trong mơ, gia đình viên mãn, hay cảm giác tìm thấy 'soulmate' - một mảnh ghép hoàn hảo khiến linh hồn trở nên trọn vẹn.", reversed: "Mối quan hệ thiếu đi một lời cam kết cuối cùng. Cảm giác trống rải, dùng dằng, tiến thoái lưỡng nan khi mọi thứ dường như đủ đầy nhưng vẫn không thể chạm đến hạnh phúc." },
      career: { upright: "Hoàn tất xuất sắc một siêu dự án, chạm đỉnh vinh quang danh vọng. Cơ hội tuyệt vời vươn tầm quốc tế, đi công tác nước ngoài hay mở rộng tầm ảnh hưởng xuyên lục địa.", reversed: "Dự án bị đóng băng ngay trước vạch đích. Nỗ lực cật lực không mang lại sự công nhận xứng đáng. Sự nghiệp bị mắc kẹt, lơ lửng không có hồi kết." },
      finance: { upright: "Tự do tài chính tuyệt đối. Khối tài sản được củng cố vững chãi, đầu tư thu về trái ngọt viên mãn. Thoải mái tận hưởng cuộc sống vương giả không còn vướng bận.", reversed: "Dòng tiền tắc nghẽn ở phút 89. Một khoản lợi nhuận lớn bị hụt mất hoặc rắc rối thủ tục khiến bạn chưa thể chạm tay vào khối tài sản của mình." },
      health: { upright: "Cơ thể, trí óc và linh hồn đạt đến trạng thái cân bằng, khỏe mạnh rạng rỡ nhất. Các phương pháp điều trị mang lại kết quả mỹ mãn, bệnh tật lùi xa.", reversed: "Sức khỏe tuy thuyên giảm nhưng vẫn còn những triệu chứng dai dẳng khó chịu. Cần tìm ra và triệt tiêu tận gốc rễ nguyên nhân cuối cùng để bình phục." },
      spiritual: { upright: "Đạt đến cảnh giới Nhất Thể (Oneness). Linh hồn hòa quyện với vũ trụ, thấu ngộ mọi quy luật sinh tử và tận hưởng sự bình an vĩnh hằng.", reversed: "Vẫn còn một nút thắt nhỏ trong tâm tưởng ngăn cản bạn vươn tới sự giác ngộ cuối cùng. Chấp niệm chưa thể buông bỏ." }
    },
    advice: "Hãy ăn mừng chiến thắng vĩ đại này. Một vòng tròn đã khép lại, để chuẩn bị cho một vòng tròn mới, bao la hơn, bắt đầu."
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
const jsStr = '// js/data.js - Enriched Vibe Batch 4\n(function () {\n  window.TAROT_DB = ' + JSON.stringify(db, null, 2) + ';\n})();';
fs.writeFileSync('E:/TAROT/js/data.js', jsStr);
console.log('Enriched cards 13 to 21');
