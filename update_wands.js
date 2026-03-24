const fs = require('fs');
const path = require('path');

const fileCards = 'E:/TAROT/data/cards.json';
const fileDataJs = 'E:/TAROT/js/data.js';

let cards = JSON.parse(fs.readFileSync(fileCards, 'utf-8'));

const updates = {
  22: {
    generalUpright: "Tựa như tia chớp thiêng liêng xé toạc màn đêm vô minh, Ace of Wands giáng xuống một nguồn sinh khí rực rỡ và nguyên thủy nhất. Đây là hạt giống của ngọn lửa thiêng, một sự thức tỉnh sâu sắc về đam mê và khát vọng sáng tạo, giục giã linh hồn dấn thân vào một cuộc hành trình mới đầy can đảm.",
    generalReversed: "Khi đảo ngược, ngọn lửa thiêng bỗng trở nên leo lét trước những cơn gió hoài nghi và sự trì hoãn. Bạn có thể cảm thấy một khoảng trống nghẹn ngào trong lồng ngực, nơi sự tắc nghẽn sáng tạo và những ý tưởng chớm nở bị kìm hãm bởi sợ hãi và thiếu định hướng.",
    'aspects.love.upright': "Một tia lửa ái tình bất chợt bùng lên, thắp sáng những khao khát và rung động cuồng nhiệt nhất. Mối quan hệ được thổi một luồng sinh khí mới, đầy đam mê, mạo hiểm và sự quyến rũ chết người.",
    'aspects.love.reversed': "Sức nóng của tình yêu đang dần nguội lạnh, để lại tàn tro của những kỳ vọng dở dang. Một cảm giác chán chường, thiếu đi ngọn lửa khao khát hoặc những rào cản cảm xúc đang ngăn trở sự gắn kết sâu sắc.",
    'aspects.career.upright': "Một chân trời mới huy hoàng đang vẫy gọi. Dự án hoặc cơ hội công việc này không chỉ là một nấc thang sự nghiệp, mà còn là tiếng gọi của sứ mệnh, nơi sự sáng tạo và nhiệt huyết được tự do vỗ cánh bay cao.",
    'aspects.career.reversed': "Bạn đang giậm chân tại chỗ trong vũng lầy của sự nhàm chán và thiếu động lực. Những ý tưởng lớn bị dập tắt từ trong trứng nước, khiến công việc trở thành một gánh nặng thay vì nguồn cảm hứng.",
    'aspects.finance.upright': "Cánh cửa tài lộc đang hé mở cùng với những quyết định táo bạo. Hãy tin vào trực giác và sự chủ động của mình để kiến tạo nên những bước đột phá về mặt tài chính.",
    'aspects.finance.reversed': "Cẩn trọng trước những mộng tưởng bốc đồng hay những quyết định đầu tư thiếu cơ sở. Ngọn lửa dục vọng có thể thiêu rụi túi tiền của bạn nếu không được kiểm soát bởi lý trí.",
    'aspects.health.upright': "Năng lượng sống tuôn chảy mạnh mẽ trong từng huyết quản, mang đến sự phục hồi kỳ diệu và một sinh lực tràn trề để đối mặt với mọi thử thách.",
    'aspects.health.reversed': "Sự kiệt quệ về cả thể xác lẫn tinh thần. Dấu hiệu của việc ngọn lửa bên trong đã bị bào mòn quá mức do làm việc quá sức hoặc những lo âu đè nén.",
    'aspects.spiritual.upright': "Một khoảnh khắc khai sáng bất chợt, khi linh hồn nhận ra được ngọn lửa chân lý. Bạn được thôi thúc bước vào một cuộc hành trình nội tâm đầy đam mê để tìm kiếm bản ngã thực sự.",
    'aspects.spiritual.reversed': "Cảm giác chông chênh, lạc lõng khi mất đi kết nối với đấng thiêng liêng hoặc mục đích sống. Tâm hồn đang khao khát một mồi lửa để thức tỉnh, nhưng lại bị bóng tối của sự vô định che khuất.",
    advice: "Hãy dũng cảm đón nhận tia lửa thiêng đang trao tặng. Đừng chần chừ, hãy dùng ngọn lửa ấy để thắp sáng con đường phía trước trước khi nó vụt tắt."
  },
  23: {
    generalUpright: "Từ trên đỉnh cao của sự an toàn, Two of Wands phác họa bức chân dung của một tâm hồn đang hướng ánh nhìn đầy khao khát vượt ra khỏi những ranh giới quen thuộc. Đó là khoảnh khắc của sự quyết đoán, khi những dự định lớn lao được ươm mầm và khao khát chinh phục thế giới thôi thúc bạn bước ra khỏi vùng an toàn.",
    generalReversed: "Bạn đang co cụm trong pháo đài của sự quen thuộc, e sợ những điều chưa biết. Bị trói buộc bởi sự do dự, bạn đứng nhìn những cơ hội vút bay vì thiếu đi dũng khí bước ra khỏi ngưỡng cửa an toàn.",
    'aspects.love.upright': "Tình yêu không chỉ là bến đỗ, mà là một hành trình dài cần có những hoạch định tương lai cùng nhau. Sự xuất hiện của lá bài báo hiệu những cam kết sâu sắc hơn hoặc một chuyến đi gắn kết đôi lứa.",
    'aspects.love.reversed': "Một sự bế tắc chực chờ khi hai trái tim không còn chung một hướng nhìn. Có sự e dè trong việc cam kết, hoặc những kế hoạch tương lai đang bị đình trệ bởi sự không chắc chắn.",
    'aspects.career.upright': "Bạn đang nắm trong tay tấm bản đồ vĩ đại của sự nghiệp. Hãy mạnh dạn lập chiến lược dài hạn, mở rộng mạng lưới hoặc tìm kiếm những cơ hội phát triển ở những vùng đất mới.",
    'aspects.career.reversed': "Những kế hoạch công việc bị đình trệ do thiếu đi tầm nhìn xa trông rộng. Việc bám víu vào những lối mòn cũ kỹ đang cản bước bạn vươn tới những thành tựu lớn hơn.",
    'aspects.finance.upright': "Những chiến lược tài chính dài hạn đang phát huy sức mạnh. Đây là thời điểm tuyệt vời để thiết lập những nền tảng kinh tế vững chắc hoặc mở rộng đầu tư.",
    'aspects.finance.reversed': "Rủi ro tài chính bắt nguồn từ sự do dự hoặc không chịu lập kế hoạch. Việc thiếu đi một tầm nhìn rõ ràng có thể dẫn đến những tổn thất bất ngờ.",
    'aspects.health.upright': "Một sự cân bằng lý tưởng khi bạn bắt đầu chú trọng đến việc thiết lập những thói quen sống lành mạnh dài hạn. Sức khỏe đang bước vào giai đoạn ổn định.",
    'aspects.health.reversed': "Những cảnh báo ngầm khi bạn phớt lờ việc chăm sóc bản thân. Sự trì hoãn trong việc cải thiện sức khỏe có thể để lại những hệ lụy lâu dài.",
    'aspects.spiritual.upright': "Tâm hồn đang khao khát được mở rộng, vượt qua những giáo lý chật hẹp. Sự tìm tòi và khao khát một tầm nhìn tâm linh vĩ mô hơn đang thôi thúc bạn.",
    'aspects.spiritual.reversed': "Lạc lối giữa những định kiến cũ kỹ, sợ hãi trước việc phá vỡ những ranh giới tâm linh an toàn. Hãy cẩn trọng với việc giam cầm linh hồn mình.",
    advice: "Thế giới ngoài kia rộng lớn hơn rất nhiều so với những gì bạn đang thấy. Hãy mạnh dạn cầm lấy tấm bản đồ, bước ra khỏi pháo đài của mình và tự tin dấn bước."
  },
  24: {
    generalUpright: "Three of Wands là bản hùng ca của sự chờ đợi được đền đáp, khi những cánh buồm mang theo hy vọng và tầm nhìn xa của bạn đang xuôi gió trở về. Nó đại diện cho sự mở rộng vô tận của tâm thức, sự tự tin vững vàng khi những nỗ lực đã vươn rễ sâu vào thực tại và bắt đầu đơm hoa kết trái.",
    generalReversed: "Một cảm giác khắc khoải và hoang mang khi những kỳ vọng bị trì hoãn. Giống như người thủy thủ mòn mỏi ngóng nhìn chân trời nhưng chẳng thấy con tàu nào trở lại, bạn đang đối mặt với sự chậm trễ và những trở ngại ngoài tầm kiểm soát.",
    'aspects.love.upright': "Mối quan hệ đang tiến vào một giai đoạn trưởng thành và vững chắc hơn. Tình yêu hiện tại mang đến sự bao dung, mở rộng và một nền tảng vững vàng để cả hai cùng hướng về tương lai.",
    'aspects.love.reversed': "Sự xa cách về khoảng cách địa lý hoặc tâm lý đang tạo ra một hố sâu ngăn cách. Sự thiếu đồng điệu trong việc định hướng tương lai có thể khiến tình yêu bị đình trệ.",
    'aspects.career.upright': "Những hạt giống sự nghiệp bạn gieo trồng đã đến ngày gặt hái. Công việc kinh doanh mở rộng, những cơ hội vươn ra biển lớn và những thành tựu mang tính bước ngoặt đang chờ đón.",
    'aspects.career.reversed': "Sự thất vọng trào dâng khi những kế hoạch công việc gặp trở ngại hoặc bị đình trệ. Thiếu đi sự chuẩn bị kỹ lưỡng khiến bạn không kịp trở tay trước những biến cố.",
    'aspects.finance.upright': "Dòng chảy tài chính đang được khơi thông, mang theo những lợi nhuận từ các khoản đầu tư dài hạn. Sự phong phú và ổn định đang dần hiện hữu rõ nét.",
    'aspects.finance.reversed': "Những thất thoát tài chính do sự chậm trễ hoặc những kỳ vọng hão huyền. Đừng vội đếm cua trong lỗ khi con thuyền lợi nhuận còn chưa cập bến.",
    'aspects.health.upright': "Sự phục hồi đang diễn ra mạnh mẽ và vững chắc. Một thể trạng tuyệt vời cho phép bạn tận hưởng cuộc sống và tham gia vào những hoạt động khám phá.",
    'aspects.health.reversed': "Cảm giác mệt mỏi dai dẳng do quá trình phục hồi bị đình trệ. Cơ thể đang cần thêm thời gian và sự kiên nhẫn hơn là những nỗ lực thúc ép.",
    'aspects.spiritual.upright': "Tầm nhìn tâm linh của bạn đã đạt đến độ chín muồi. Bạn nhìn nhận vạn vật bằng một đôi mắt thấu cảm và trí tuệ, nhận thức rõ ràng vị trí của mình trong vũ trụ bao la.",
    'aspects.spiritual.reversed': "Cảm giác thu mình và thất vọng trên con đường tìm kiếm chân lý. Những trở ngại trong việc thấu hiểu bản thân khiến bạn rơi vào trạng thái hoài nghi và hụt hẫng.",
    advice: "Hãy kiên nhẫn và giữ vững niềm tin vào những gì bạn đã khởi xướng. Thành quả vĩ đại cần thời gian để cập bến, hãy ngẩng cao đầu và phóng tầm mắt ra xa hơn."
  },
  25: {
    generalUpright: "Four of Wands là một khu vườn địa đàng chốn nhân gian, nơi những vũ điệu của niềm hân hoan và sự ăn mừng hòa quyện. Bốn cây gậy cắm sâu vào lòng đất tạo nên một nền tảng vững chắc, đánh dấu một cột mốc viên mãn, mang theo sự tự hào, hòa hợp và một bến đỗ bình yên cho tâm hồn sau bao giông bão.",
    generalReversed: "Sự bình yên bỗng dưng rạn nứt bởi những bất hòa ngầm hoặc những xáo trộn trong mái ấm. Cảm giác thiếu an toàn hoặc một sự kiện ăn mừng bị hoãn lại, khiến niềm vui không được trọn vẹn và cội rễ của sự ổn định bị lung lay.",
    'aspects.love.upright': "Một bản tình ca ngọt ngào và viên mãn. Sự gắn kết đạt đến độ thăng hoa, có thể dẫn đến một đám cưới, một cam kết trọn đời hoặc cảm giác thuộc về nhau sâu sắc như đã tìm thấy 'nhà' nơi đối phương.",
    'aspects.love.reversed': "Sự căng thẳng len lỏi vào tổ ấm tình yêu. Cảm giác thiếu cam kết, những xung đột nhỏ nhặt gia đình hoặc những rào cản ngăn cản hai người tiến tới một nấc thang ổn định hơn.",
    'aspects.career.upright': "Không khí tại nơi làm việc ngập tràn sự hài hòa và tinh thần đồng đội. Một thành tựu đáng tự hào đã đạt được, tạo nền móng vững chắc cho những chặng đường phía trước.",
    'aspects.career.reversed': "Những mâu thuẫn nội bộ hoặc cảm giác không thuộc về tập thể đang làm giảm đi năng suất. Thiếu đi sự công nhận xứng đáng khiến bạn cảm thấy nỗ lực của mình bị bỏ ngỏ.",
    'aspects.finance.upright': "Sự sung túc tài chính và ổn định dài hạn. Bạn có thể sử dụng sự an toàn này để tự thưởng cho bản thân hoặc xây dựng tổ ấm vững chắc.",
    'aspects.finance.reversed': "Những chi phí phát sinh liên quan đến nhà cửa gia đình hoặc sự bất an về nền tảng tài chính. Tài lộc đang có dấu hiệu bất ổn, đòi hỏi sự kiểm soát chặt chẽ.",
    'aspects.health.upright': "Cơ thể và tinh thần đang ở trong trạng thái cân bằng hoàn hảo. Niềm vui và sự tĩnh tại mang đến một sức khỏe dồi dào, rạng rỡ.",
    'aspects.health.reversed': "Sự mệt mỏi tinh thần do những bất ổn gia đình hoặc thiếu đi một môi trường sống yên bình. Cần tái thiết lập không gian sống để bảo vệ năng lượng cá nhân.",
    'aspects.spiritual.upright': "Cảm giác tìm thấy 'ngôi nhà linh hồn' đích thực. Sự bình yên nội tâm đạt đến đỉnh cao, giúp bạn kết nối sâu sắc với cộng đồng và những giá trị nhân văn cao đẹp.",
    'aspects.spiritual.reversed': "Cảm giác lưu lạc và thiếu đi một nền tảng tâm linh vững chắc. Bạn đang khao khát một chốn nương tựa cho linh hồn nhưng lại chưa thể tìm thấy sự bình yên thực sự.",
    advice: "Hãy cho phép bản thân được nghỉ ngơi và tận hưởng những khoảnh khắc ăn mừng. Sự ổn định và niềm vui hiện tại chính là món quà xứng đáng cho những nỗ lực đã qua."
  },
  26: {
    generalUpright: "Trái ngược với sự yên bình, Five of Wands ném linh hồn vào giữa một vòng xoáy của sự hỗn mang, cạnh tranh và xung đột. Năm cây gậy vung lên không phải để sát thương, mà là sự đụng độ gay gắt của những cái tôi, những ý tưởng trái chiều và những tham vọng sục sôi đang tranh giành sự thống trị.",
    generalReversed: "Sự kiệt sức sau những cuộc tranh giành vô nghĩa. Bạn đang cố gắng trốn tránh xung đột, tìm kiếm một sự thỏa hiệp khiên cưỡng, hoặc sự hỗn loạn nội tâm đang gặm nhấm tâm hồn bạn do những mâu thuẫn bị dồn nén.",
    'aspects.love.upright': "Mối quan hệ đang rực lửa bởi những trận cãi vã, ghen tuông hoặc cái tôi quá lớn. Sự xung khắc trong quan điểm đang đẩy cả hai vào những cuộc chiến không có hồi kết.",
    'aspects.love.reversed': "Cố gắng né tránh mâu thuẫn chỉ khiến khoảng cách ngày càng xa. Một trong hai người đang chịu đựng sự ấm ức, kìm nén cảm xúc để duy trì một nền hòa bình giả tạo.",
    'aspects.career.upright': "Môi trường công sở đầy tính cạnh tranh khốc liệt, đấu đá nội bộ hoặc sự đối đầu gay gắt giữa các phòng ban. Bạn phải chiến đấu hết mình để bảo vệ quan điểm và vị thế.",
    'aspects.career.reversed': "Bạn cảm thấy mệt mỏi và muốn rút lui khỏi vòng xoáy cạnh tranh độc hại. Sự nhượng bộ vì muốn yên thân có thể khiến bạn đánh mất cơ hội thăng tiến.",
    'aspects.finance.upright': "Sự giằng co trong các quyết định tài chính. Bạn đang phải chật vật xoay xở giữa nhiều nguồn chi phí hoặc đối mặt với sự cạnh tranh khốc liệt trong kinh doanh.",
    'aspects.finance.reversed': "Những tranh chấp tiền bạc đang dần được xoa dịu hoặc bạn chọn cách buông bỏ lợi ích nhỏ để đổi lấy sự bình yên tâm trí.",
    'aspects.health.upright': "Cơ thể căng cứng vì stress, adrenaline luôn ở mức cao do phải đối phó với áp lực liên tục. Sự suy giảm miễn dịch do tình trạng căng thẳng kéo dài.",
    'aspects.health.reversed': "Những tổn thương thể chất hoặc tinh thần bị dồn nén do né tránh các vấn đề sức khỏe gốc rễ. Hãy đối mặt để giải quyết triệt để cơn đau.",
    'aspects.spiritual.upright': "Sự đấu tranh nội tâm gay gắt giữa những hệ tư tưởng hoặc những khát vọng trái ngược. Một cuộc khủng hoảng đức tin khi những niềm tin cũ và mới đang giao tranh.",
    'aspects.spiritual.reversed': "Khao khát mãnh liệt một sự tĩnh lặng nội tâm. Đã đến lúc buông bỏ những tranh cãi vô bổ bên ngoài để tìm về sự tĩnh lặng ở cốt lõi linh hồn.",
    advice: "Đừng sợ hãi sự va chạm, vì đôi khi qua sự cọ xát của những cái tôi, những tia lửa sáng tạo rực rỡ nhất mới được sinh ra. Hãy giữ cho mình một tâm trí tỉnh táo giữa vòng xoáy hỗn loạn."
  },
  27: {
    generalUpright: "Trên lưng chiến mã trắng, Six of Wands là bức chân dung rực rỡ của khúc khải hoàn ca. Vòng nguyệt quế vinh quang đội trên đầu là minh chứng cho sự thừa nhận, lòng tự hào kiêu hãnh và sức mạnh của một ý chí đã kiên cường vượt qua thử thách để bước lên đỉnh cao danh vọng.",
    generalReversed: "Phía sau ánh hào quang là một cái bóng của sự phù phiếm và nỗi sợ hãi thất bại. Lá bài lật ngược phơi bày cảm giác tự ti, sự khao khát công nhận vô vọng hoặc sự kiêu ngạo quá đà đang che mắt, kéo bạn trượt dài khỏi đỉnh vinh quang.",
    'aspects.love.upright': "Bạn hoặc đối phương tỏa sáng lấp lánh trong mắt nhau, mang lại một tình yêu đầy kiêu hãnh và tự hào. Sự ủng hộ nhiệt thành từ người bạn đời giúp mối quan hệ thăng hoa.",
    'aspects.love.reversed': "Sự ghen tị ngấm ngầm hoặc cái tôi quá lớn đang hủy hoại tình cảm. Một người cảm thấy bị lu mờ, thiếu sự trân trọng hoặc tình yêu chỉ là một lớp vỏ bọc hào nhoáng bề ngoài.",
    'aspects.career.upright': "Một chiến thắng vang dội trên con đường sự nghiệp. Những nỗ lực của bạn đã được đền đáp xứng đáng bằng sự thăng tiến, sự tôn trọng từ đồng nghiệp và những tiếng vỗ tay tán thưởng.",
    'aspects.career.reversed': "Một sự thất vọng sâu sắc khi nỗ lực không được ghi nhận. Những kẻ khác có thể đã cướp mất công sức của bạn, hoặc sự kiêu ngạo, tự mãn đang khiến bạn đánh mất lòng tin từ cộng sự.",
    'aspects.finance.upright': "Sự dồi dào tài chính là phần thưởng cho những chiến lược xuất sắc. Bạn đang tận hưởng thành quả lao động, mang lại cảm giác sung túc và tự hào.",
    'aspects.finance.reversed': "Những khó khăn tài chính xuất hiện do việc đầu tư sai lầm hoặc lối sống phô trương quá mức nhằm gây ấn tượng với người khác.",
    'aspects.health.upright': "Một sinh lực dồi dào, tự tin lan tỏa từ sâu bên trong. Sức khỏe tuyệt vời hỗ trợ cho những hoạt động năng nổ và rạng rỡ của bạn.",
    'aspects.health.reversed': "Sự tự tin sụp đổ có thể dẫn đến những vấn đề về tâm lý như trầm cảm nhẹ hoặc sự mệt mỏi do cố gắng duy trì một vỏ bọc hoàn hảo trước mặt mọi người.",
    'aspects.spiritual.upright': "Sự chiến thắng của linh hồn trước những góc khuất tăm tối. Bạn tự hào về con đường nhận thức mà mình đã đi qua, lan tỏa ánh sáng tích cực đến với cộng đồng.",
    'aspects.spiritual.reversed': "Bị mắc kẹt trong cái bẫy của 'cái tôi tâm linh'. Cảm giác kiêu ngạo hoặc ám ảnh về sự hoàn hảo đang cản trở bạn chạm đến những chân lý sâu sắc hơn.",
    advice: "Hãy ngẩng cao đầu đón nhận vinh quang, nhưng hãy giữ đôi chân chạm đất. Lòng biết ơn chân thành sẽ giữ cho ánh hào quang của bạn mãi sáng ngời mà không thiêu rụi chính bạn."
  },
  28: {
    generalUpright: "Seven of Wands phác họa sự đơn độc kiêu hãnh của một chiến binh đứng trên đỉnh dốc, đang gồng mình chống trả những lưỡi gươm chĩa về phía mình. Lá bài là ngọn lửa của lòng can đảm ngoan cường, sự kháng cự kiên định để bảo vệ những giá trị, niềm tin và vị thế mà mình đã dày công tạo dựng.",
    generalReversed: "Một cảm giác kiệt quệ và chới với khi áp lực dội xuống như thác lũ. Bạn đang bị dồn vào chân tường, đánh mất đi sự tự tin và hoài nghi về khả năng phòng vệ của chính mình, sẵn sàng nhượng bộ hoặc buông xuôi.",
    'aspects.love.upright': "Bạn đang phải chiến đấu để bảo vệ tình yêu của mình trước những gièm pha, định kiến hoặc những sự can thiệp từ bên ngoài. Một sự kiên định bảo vệ người mình yêu.",
    'aspects.love.reversed': "Sự mệt mỏi trong việc duy trì mối quan hệ. Những trận chiến liên miên khiến bạn kiệt sức, hoặc sự phòng thủ thái quá đang đẩy đối phương ra xa.",
    'aspects.career.upright': "Đứng trên đỉnh cao, bạn trở thành mục tiêu của sự cạnh tranh và đố kỵ. Hãy kiên cường giữ vững lập trường và bảo vệ những ý tưởng, những thành tựu của mình tại nơi làm việc.",
    'aspects.career.reversed': "Cảm thấy quá tải trước áp lực công việc và sự cạnh tranh. Có nguy cơ đánh mất vị thế do sự nao núng, thỏa hiệp hoặc không đủ can đảm để bảo vệ quan điểm.",
    'aspects.finance.upright': "Bạn cần một sự kiểm soát tài chính nghiêm ngặt để bảo vệ tài sản của mình trước những biến động rủi ro hoặc những quyết định đầu tư mang tính chất đối đầu.",
    'aspects.finance.reversed': "Những rò rỉ tài chính do việc phòng thủ lỏng lẻo. Sự do dự trong các quyết định chi tiêu có thể khiến bạn rơi vào thế bị động.",
    'aspects.health.upright': "Sức đề kháng của cơ thể đang được kích hoạt tối đa để chống lại bệnh tật hoặc stress. Một tinh thần thép giúp bạn vượt qua những mệt mỏi thể chất.",
    'aspects.health.reversed': "Hệ miễn dịch suy yếu do tình trạng căng thẳng kéo dài. Sự kiệt sức về thể xác lẫn tâm trí đang đánh gục hàng rào bảo vệ tự nhiên của bạn.",
    'aspects.spiritual.upright': "Giữ vững niềm tin tâm linh cốt lõi trước mọi sóng gió. Sự kiên định trong các giá trị đạo đức cá nhân dù cho cả thế giới có quay lưng.",
    'aspects.spiritual.reversed': "Một sự khủng hoảng niềm tin sâu sắc. Bạn dễ dàng bị dao động bởi ý kiến của người khác và đang đánh mất đi kim chỉ nam của linh hồn mình.",
    advice: "Đừng lùi bước trước những đám đông hung hãn. Sức mạnh thực sự nằm ở sự kiên định bảo vệ những gì bạn cho là đúng đắn, dẫu phải đứng một mình."
  },
  29: {
    generalUpright: "Tựa như một cơn mưa sao băng rực rỡ lướt qua bầu trời, Eight of Wands là hiện thân của tốc độ, sự hối hả và động năng bùng nổ. Tám thanh gậy lao vút không bị cản trở mang theo thông điệp về những chuyển biến chớp nhoáng, những rào cản được dỡ bỏ và dòng chảy thông tin đang tuôn trào một cách mạnh mẽ.",
    generalReversed: "Trái ngược với sự trôi chảy, sự đảo ngược của lá bài tạo ra một vụ va chạm trên không. Mọi thứ bị đình trệ, tắc nghẽn, hoặc tồi tệ hơn là sự vội vã, hấp tấp dẫn đến những quyết định mù quáng và sai lầm thảm hại.",
    'aspects.love.upright': "Tình yêu ập đến nhanh như một cơn lốc, mang theo sự say đắm mãnh liệt và những lời tỏ tình bất ngờ. Mọi hiểu lầm được hóa giải nhanh chóng, đẩy mối quan hệ tiến về phía trước với tốc độ chóng mặt.",
    'aspects.love.reversed': "Sự giao tiếp bị cắt đứt, những tin nhắn phản hồi chậm trễ hoặc sự vội vã đưa ra quyết định chia tay. Một cảm giác chững lại, đầy hiểu lầm và ngột ngạt trong tình cảm.",
    'aspects.career.upright': "Công việc diễn ra với nhịp độ dồn dập, những dự án được thông qua nhanh chóng, hoặc một chuyến đi công tác đột xuất mang lại những thành tựu rực rỡ. Đây là lúc nắm bắt cơ hội ngay lập tức.",
    'aspects.career.reversed': "Những rào cản quan liêu, sự chậm trễ trong các dự án quan trọng. Cảm giác hụt hẫng khi mọi kế hoạch đều bị hoãn lại, hoặc sự hấp tấp đang hủy hoại những thành tựu công việc.",
    'aspects.finance.upright': "Dòng tiền lưu thông mạnh mẽ và nhanh chóng. Cơ hội chốt lời hoặc những khoản thu nhập bất ngờ đang lao tới, mang lại một luồng sinh khí mới cho ngân sách của bạn.",
    'aspects.finance.reversed': "Những trì hoãn trong việc thanh toán hoặc sự chi tiêu bốc đồng đang làm cạn kiệt nguồn tài chính nhanh hơn bạn tưởng. Cẩn trọng với những quyết định vội vàng.",
    'aspects.health.upright': "Sự phục hồi sức khỏe diễn ra với tốc độ đáng kinh ngạc. Một nguồn năng lượng tràn trề và năng động đang được bơm vào cơ thể.",
    'aspects.health.reversed': "Cảm giác mệt mỏi, uể oải và sự suy giảm sinh lực do lối sống quá gấp gáp. Việc không cho cơ thể thời gian nghỉ ngơi đang dẫn đến sự kiệt quệ.",
    'aspects.spiritual.upright': "Một bước nhảy vọt trong nhận thức tâm linh. Những khoảnh khắc thấu hiểu sâu sắc đến chớp nhoáng, mang lại sự kết nối mạnh mẽ với năng lượng vũ trụ.",
    'aspects.spiritual.reversed': "Sự mất kết nối nội tâm do tâm trí quá ồn ào và hỗn loạn. Bạn đang chạy đua với thời gian mà quên mất việc nuôi dưỡng linh hồn mình trong sự tĩnh lặng.",
    advice: "Khi dòng chảy năng lượng đang tuôn trào thuận lợi, đừng chần chừ. Hãy nương theo chiều gió, hành động dứt khoát và để mọi thứ diễn ra một cách tự nhiên."
  },
  30: {
    generalUpright: "Vết sẹo trên trán, ánh mắt rực lửa cảnh giác, Nine of Wands là chân dung của sự kiên cường tột độ được rèn dũa từ những đau thương. Đứng tựa vào cây gậy cuối cùng, lá bài đại diện cho sức mạnh bền bỉ vĩ đại của con người: dù đã tổn thương, dù đã kiệt sức, nhưng vẫn dứt khoát không chịu gục ngã trước ngưỡng cửa cuối cùng.",
    generalReversed: "Bức tường phòng ngự kiên cố bỗng sụp đổ, nhường chỗ cho sự mệt mỏi cùng cực và nỗi ám ảnh hoang tưởng. Những vết thương cũ há miệng, kéo bạn chìm sâu vào sự bế tắc, buông xuôi và cảm giác tuyệt vọng khi rào cản cuối cùng bị phá vỡ.",
    'aspects.love.upright': "Mối quan hệ đang trải qua một giai đoạn thử thách gay gắt, nhưng sự cam kết bền bỉ và lòng trung thành giúp cả hai đứng vững. Những tổn thương quá khứ khiến bạn e dè, nhưng không ngăn được trái tim khao khát bảo vệ tình yêu.",
    'aspects.love.reversed': "Sự đa nghi, ghen tuông hoang tưởng hoặc sự kiệt sức do những tổn thương không ngừng lặp lại đang giết chết mối quan hệ. Bức tường phòng thủ quá cao đang bóp nghẹt mọi cảm xúc.",
    'aspects.career.upright': "Bạn đang ở chặng cuối cùng của một dự án đầy cam go. Dù mệt mỏi, sự kiên nhẫn và sức chịu đựng dẻo dai sẽ giúp bạn vượt qua những rào cản cuối cùng để chạm tới vinh quang.",
    'aspects.career.reversed': "Sự kiệt quệ nghề nghiệp (burnout) tột độ. Bạn cảm thấy bị bòn rút hết năng lượng, thiếu động lực và có nguy cơ từ bỏ mọi thứ ngay trước ranh giới thành công.",
    'aspects.finance.upright': "Một giai đoạn khó khăn tài chính nhưng bạn đang phòng thủ rất vững vàng. Sự cẩn trọng và quản lý rủi ro tốt giúp bạn bảo vệ được tài sản trước những cơn bão kinh tế.",
    'aspects.finance.reversed': "Sự sụp đổ của những lá chắn tài chính. Những khoản nợ hoặc chi phí bất ngờ giáng xuống khiến bạn không kịp trở tay, tạo ra cảm giác hoang mang tột độ.",
    'aspects.health.upright': "Một ý chí sinh tồn mãnh liệt đang chống lại bệnh tật hoặc chấn thương. Dù cơ thể đang rã rời, sức mạnh tinh thần bất khuất vẫn là liều thuốc chữa lành lớn nhất.",
    'aspects.health.reversed': "Sự suy sụp hệ miễn dịch do căng thẳng kéo dài và tổn thương mãn tính. Cơ thể không còn đủ sức chống cự, đòi hỏi sự can thiệp và nghỉ ngơi khẩn cấp.",
    'aspects.spiritual.upright': "Sự thử thách cuối cùng của linh hồn trước khi bước sang một ngưỡng nhận thức mới. Giữ vững đức tin của mình dù cho bóng tối của sự nghi ngờ có bủa vây.",
    'aspects.spiritual.reversed': "Sự tuyệt vọng và mất phương hướng tâm linh. Cảm giác bị vũ trụ bỏ rơi hoặc bị trói buộc bởi những bóng ma tâm lý quá khứ, khiến linh hồn rỉ máu.",
    advice: "Đừng bỏ cuộc ngay lúc này. Bạn đã đi một chặng đường rất dài và chịu đựng vô vàn thử thách; hãy tập hợp chút sức lực cuối cùng, vinh quang chỉ cách bạn một hơi thở nữa thôi."
  },
  31: {
    generalUpright: "Dưới sức nặng nghẹt thở của mười cây gậy, Ten of Wands là bức tranh nghiệt ngã về cái giá của sự tham vọng. Dù thành tựu là to lớn, nhưng sự cõng vác quá sức đã biến thành công thành một gánh nặng đè nát đôi vai, nơi sự kiệt quệ che khuất mọi tầm nhìn về phía trước.",
    generalReversed: "Một sự buông bỏ đầy đau đớn hoặc một sự giải thoát cần thiết. Bạn không còn sức để vác thêm bất kỳ gánh nặng nào nữa, bắt buộc phải học cách chia sẻ trách nhiệm hoặc chấp nhận sụp đổ dưới trọng lượng của chính những tham vọng sai lầm.",
    'aspects.love.upright': "Bạn đang gánh vác toàn bộ trách nhiệm hoặc những nỗi đau trong mối quan hệ. Tình yêu hiện tại mang lại cảm giác ngột ngạt, nặng nề như một nghĩa vụ hơn là niềm hạnh phúc sẻ chia.",
    'aspects.love.reversed': "Sự bùng nổ của những dồn nén cảm xúc. Hoặc bạn quyết định buông bỏ những gánh nặng không đáng có để giải thoát bản thân, hoặc mối quan hệ tan vỡ vì áp lực quá lớn.",
    'aspects.career.upright': "Quá tải, kiệt sức vì công việc. Việc ôm đồm quá nhiều dự án, không biết cách ủy quyền đang khiến bạn trở thành nô lệ cho chính những tham vọng và vị trí của mình.",
    'aspects.career.reversed': "Thời khắc giới hạn đã đến, bạn buộc phải buông tay. Bắt đầu từ bỏ những dự án không hiệu quả, tìm kiếm sự giúp đỡ hoặc chấp nhận thất bại để cứu vãn sức khỏe tinh thần.",
    'aspects.finance.upright': "Áp lực tài chính đè nặng lên vai, những khoản nợ, trách nhiệm chi trả đang vắt kiệt nguồn lực của bạn. Bạn đang cố gắng gồng gánh nhưng sự căng thẳng là rất lớn.",
    'aspects.finance.reversed': "Sự sụp đổ tài chính do gánh nặng nợ nần vượt quá khả năng chi trả. Tuy nhiên, nó cũng có thể là khoảnh khắc bạn quyết định tái cấu trúc lại mọi thứ để tìm lối thoát.",
    'aspects.health.upright': "Những vấn đề sức khỏe nghiêm trọng như đau lưng, căng cơ và kiệt quệ thần kinh do làm việc quá sức và gánh vác quá nhiều áp lực.",
    'aspects.health.reversed': "Một sự gục ngã thể chất mang tính cảnh báo mạnh mẽ. Cơ thể đình công, ép buộc bạn phải dừng lại và tìm kiếm sự điều trị ngay lập tức.",
    'aspects.spiritual.upright': "Tâm hồn đang rên rỉ dưới sức nặng của những giáo điều, định kiến hoặc cảm giác tội lỗi. Một hành trình tâm linh mang lại đau khổ hơn là sự khai sáng.",
    'aspects.spiritual.reversed': "Sự rũ bỏ tuyệt vời những gánh nặng nghiệp quả hoặc những ảo tưởng tinh thần tốn sức. Bạn đang dần thanh lọc linh hồn để tìm về sự nhẹ nhõm nguyên thủy.",
    advice: "Hãy học cách buông bỏ những thứ không thuộc trách nhiệm của bạn. Thành công thực sự không phải là cõng cả thế giới trên lưng, mà là biết đi bộ nhẹ nhàng trên mặt đất."
  },
  32: {
    generalUpright: "Mang dáng vẻ hồn nhiên và ánh mắt lấp lánh khao khát, Page of Wands hiện thân như một sứ giả mang ngọn lửa nhỏ của niềm cảm hứng. Là tinh linh của sự tự do, tò mò và lòng nhiệt thành, lá bài báo hiệu sự xuất hiện của những ý tưởng mới mẻ, những tin tức thú vị và một tinh thần trẻ trung sẵn sàng khám phá thế giới.",
    generalReversed: "Năng lượng trẻ trung bị bóp méo thành sự xốc nổi, cả thèm chóng chán. Đứa trẻ bốc đồng bên trong bạn đang thiếu kiên nhẫn, những ý tưởng tuy rực rỡ nhưng nhanh chóng lụi tàn vì thiếu đi sự cam kết và tính kỷ luật.",
    'aspects.love.upright': "Sự quyến rũ chết người từ một người mới đến, mang theo những lời tán tỉnh thú vị và một tình yêu đầy tính phiêu lưu. Sự tươi mới, nhiệt tình thắp sáng lại ngọn lửa tình cảm.",
    'aspects.love.reversed': "Một trái tim không đáng tin cậy, đa tình nhưng thiếu sâu sắc. Sự bồng bột trong tình cảm có thể dẫn đến những lời hứa suông hoặc sự tẻ nhạt nhanh chóng ập đến sau những đam mê ban đầu.",
    'aspects.career.upright': "Sự khởi đầu của một dự án đầy sáng tạo, hoặc một tin tức tốt lành về công việc. Năng lượng tràn trề thôi thúc bạn thử nghiệm những ý tưởng táo bạo.",
    'aspects.career.reversed': "Sự trì hoãn, thiếu tập trung và không kiên trì. Những dự định bị bỏ dở giữa chừng do sự bốc đồng, hoặc những tin tức công việc gây thất vọng.",
    'aspects.finance.upright': "Cơ hội tài chính mang tính sáng tạo hoặc những khoản đầu tư nhỏ mạo hiểm đang vẫy gọi. Sự nhạy bén giúp bạn chớp lấy thời cơ.",
    'aspects.finance.reversed': "Chi tiêu bốc đồng cho những sở thích nhất thời. Sự thiếu kinh nghiệm trong quản lý tài chính dẫn đến những hao hụt không đáng có.",
    'aspects.health.upright': "Năng lượng dồi dào, sinh lực trẻ trung bùng nổ. Sự nhiệt huyết khích lệ bạn tham gia vào các hoạt động thể chất mới.",
    'aspects.health.reversed': "Sự cạn kiệt năng lượng do lối sống vô tổ chức hoặc sự nôn nóng thái quá. Chú ý các bệnh nhẹ do bất cẩn.",
    'aspects.spiritual.upright': "Linh hồn đang háo hức khám phá những triết lý mới bằng một thái độ cởi mở và không phán xét. Sự tươi mới trong nhận thức tâm linh.",
    'aspects.spiritual.reversed': "Sự hời hợt trên con đường tâm linh, nhảy từ niềm tin này sang niềm tin khác mà không thực sự đào sâu vào chân lý nào.",
    advice: "Hãy trân trọng và nuôi dưỡng ngọn lửa cảm hứng vừa chớm nở trong bạn. Đừng e ngại sự tò mò, vì đó chính là la bàn dẫn đến những chân trời kỳ diệu."
  },
  33: {
    generalUpright: "Lao nhanh như một ngọn lửa cuồng nộ trên lưng chiến mã đỏ, Knight of Wands là hiện thân của hành động táo bạo, sự dũng cảm liều lĩnh và tham vọng chinh phục mãnh liệt. Lá bài là tiếng thét xung trận, bỏ lại phía sau mọi đắn đo suy nghĩ để phóng thẳng về phía trước theo tiếng gọi của đam mê.",
    generalReversed: "Ngọn lửa cuồng nộ trở thành sự phá hoại vô ý thức. Sự liều lĩnh, bốc đồng và tính tình nóng nảy, kiêu ngạo đang hủy hoại các mối quan hệ và những thành quả. Năng lượng trở nên hỗn loạn, hung hăng và thiếu kiểm soát.",
    'aspects.love.upright': "Một tình yêu rực rỡ, say đắm và cuồng nhiệt xuất hiện bất ngờ. Một người tình đầy quyến rũ, đam mê nhưng có tính cách phóng khoáng, khó trói buộc.",
    'aspects.love.reversed': "Sự ghen tuông điên cuồng, tính khí thất thường và thiếu chung thủy. Mối quan hệ rạn nứt do sự vô tâm, độc đoán và những tranh cãi nảy lửa không thể hòa giải.",
    'aspects.career.upright': "Hành động quyết đoán mang lại những thành tựu đột phá. Bạn hoặc ai đó mang nguồn năng lượng lãnh đạo bùng nổ, sẵn sàng mạo hiểm để thúc đẩy công việc tiến lên.",
    'aspects.career.reversed': "Sự hiếu thắng, tự phụ và hành động thiếu suy nghĩ dẫn đến thất bại cay đắng trong công việc. Môi trường làm việc đầy rẫy mâu thuẫn do cái tôi quá lớn.",
    'aspects.finance.upright': "Sự liều lĩnh mang lại những lợi nhuận bất ngờ, chớp nhoáng. Khả năng quyết đoán giúp bạn chớp lấy các cơ hội đầu tư sinh lời cao nhưng đầy rủi ro.",
    'aspects.finance.reversed': "Mất mát tài chính trầm trọng do những quyết định đầu tư bốc đồng, cờ bạc hoặc chi tiêu vung tay quá trán trong cơn bốc đồng.",
    'aspects.health.upright': "Sức lực sung mãn, năng lượng bùng nổ hỗ trợ tuyệt vời cho các hoạt động thể thao cường độ cao. Một cơ thể tràn trề sinh khí.",
    'aspects.health.reversed': "Nguy cơ tai nạn cao do sự bất cẩn và liều lĩnh. Sự mệt mỏi cùng cực do vắt kiệt sức lực vào những cơn bốc đồng.",
    'aspects.spiritual.upright': "Một niềm đam mê tâm linh mãnh liệt, một cuộc hành trình khám phá đức tin đầy dũng cảm và sẵn sàng phá bỏ mọi rào cản tôn giáo cũ kỹ.",
    'aspects.spiritual.reversed': "Sự cuồng tín cực đoan hoặc sự áp đặt niềm tin tâm lý lên người khác một cách bạo lực. Lạc lối giữa ngọn lửa của cái tôi ngụy trang dưới vỏ bọc tinh thần.",
    advice: "Đam mê là cỗ xe ngựa tuyệt vời, nhưng lý trí phải là dây cương. Hãy mạnh mẽ tiến bước nhưng đừng để ngọn lửa của sự kiêu hãnh thiêu rụi con đường bạn đi."
  },
  34: {
    generalUpright: "Uy nghi trên ngai vàng với chú mèo đen quyền lực, Queen of Wands là hiện thân rực rỡ của sự quyến rũ, sự tự tin tỏa sáng và trí tuệ cảm xúc nồng nàn. Nàng cai trị vương quốc của mình bằng sự duyên dáng, độc lập, sức sáng tạo bất tận và một ngọn lửa ấm áp thu hút mọi ánh nhìn về phía mình.",
    generalReversed: "Ngọn lửa ấm áp biến thành sự đố kỵ độc hại và sự kiêu ngạo ích kỷ. Bóng tối của nàng phơi bày tính khí bốc đồng, sự thù dai, mong muốn thao túng và khao khát quyền lực đến tàn nhẫn để thỏa mãn cái tôi không đáy.",
    'aspects.love.upright': "Một tình yêu đầy sự tự do, rạng rỡ và thấu hiểu. Người phụ nữ trong mối quan hệ toát lên sự hấp dẫn chết người, nồng nhiệt và biết cách giữ ngọn lửa tình yêu luôn rực sáng.",
    'aspects.love.reversed': "Sự thao túng cảm xúc, ghen tuông vô lối và tính thống trị đang đầu độc tình yêu. Sự cay nghiệt trong lời nói và tính ích kỷ khiến đối phương cảm thấy ngột ngạt.",
    'aspects.career.upright': "Thành công nhờ khả năng lãnh đạo bẩm sinh, sự duyên dáng trong giao tiếp và sự tự tin rạng ngời. Một nhà quản lý tài ba, truyền cảm hứng và luôn tỏa sáng ở bất kỳ đâu.",
    'aspects.career.reversed': "Sử dụng mưu mô, sự đe dọa để thăng tiến. Môi trường công sở bị bao trùm bởi sự đố kỵ, bè phái và một cấp trên độc đoán, hách dịch.",
    'aspects.finance.upright': "Sự độc lập tài chính, khả năng thu hút tiền bạc nhờ vào sức hấp dẫn và các mối quan hệ xã hội tuyệt vời. Quản lý tài chính tự tin và khôn ngoan.",
    'aspects.finance.reversed': "Chi tiêu xa xỉ để mua sự chú ý và sự công nhận giả tạo. Sự tham lam hoặc việc quản lý tài chính mang tính cá nhân ích kỷ dẫn đến hao hụt.",
    'aspects.health.upright': "Một vẻ đẹp rạng ngời từ trong ra ngoài. Năng lượng tích cực và sự yêu thương bản thân mang lại một sức khỏe thể chất và tinh thần tuyệt hảo.",
    'aspects.health.reversed': "Sự tàn phá sức khỏe do những cơn nóng giận, stress tích tụ hoặc sự kiệt quệ do cố gắng duy trì một hình ảnh hoàn hảo bề ngoài.",
    'aspects.spiritual.upright': "Một sự kết nối tâm linh sâu sắc với bóng tối và ánh sáng bên trong mình (biểu tượng chú mèo đen). Khả năng trực giác nhạy bén, tỏa sáng với tình yêu thương tự nhiên.",
    'aspects.spiritual.reversed': "Sử dụng sức mạnh tâm linh hoặc trực giác để thao túng người khác. Một linh hồn kiêu ngạo, từ chối việc nhìn nhận những khuyết điểm thực sự của bản thân.",
    advice: "Hãy để sự tự tin và lòng nhiệt thành của bạn lan tỏa ánh sáng đến những người xung quanh. Vẻ đẹp thực sự không nằm ở quyền lực áp đặt, mà ở trái tim ấm áp tràn đầy sức sống."
  },
  35: {
    generalUpright: "King of Wands ngự trị như một mặt trời chói lọi, hiện thân của quyền lực tuyệt đối, tầm nhìn vĩ mô và sự thống trị bằng khí chất. Ông là một nhà lãnh đạo kiệt xuất, biến những ý tưởng sáng tạo thành những đế chế hùng mạnh bằng lòng quyết tâm không lay chuyển và khả năng truyền cảm hứng mãnh liệt.",
    generalReversed: "Bóng tối của quyền lực bộc lộ một kẻ độc tài tàn nhẫn, hống hách và tàn bạo. Sự tự cao tự đại, tính khí nóng nảy vô lý và sự cố chấp, áp đặt tước đoạt tiếng nói của những người xung quanh, gieo rắc nỗi sợ hãi thay vì sự tôn trọng.",
    'aspects.love.upright': "Một người bảo vệ mạnh mẽ, hào phóng và nồng nhiệt trong tình yêu. Mối quan hệ dựa trên sự tôn trọng sâu sắc và một nền tảng vững chắc của sự trưởng thành và đam mê bền bỉ.",
    'aspects.love.reversed': "Tính gia trưởng, độc đoán và mong muốn kiểm soát đối phương một cách tuyệt đối. Tình yêu biến thành một nhà tù của sự sợ hãi, nơi mọi hành động đều bị phán xét tàn nhẫn.",
    'aspects.career.upright': "Đỉnh cao của sự nghiệp lãnh đạo. Tầm nhìn chiến lược xuất sắc, sự quyết đoán bẩm sinh giúp bạn hoặc một cấp trên dẫn dắt doanh nghiệp đến những tầm cao quyền lực mới.",
    'aspects.career.reversed': "Sự sụp đổ của một nhà lãnh đạo do tính kiêu ngạo và sự lạm quyền. Môi trường làm việc đầy áp bức, thiếu đi sự bao dung, dẫn đến sự bất mãn tột độ từ cấp dưới.",
    'aspects.finance.upright': "Quyền lực tài chính vững chắc. Sự thông tuệ và khả năng bao quát giúp xây dựng nên những khối tài sản khổng lồ dựa trên những khoản đầu tư chiến lược.",
    'aspects.finance.reversed': "Sự lãng phí tàn bạo vì những ảo vọng quyền lực. Việc đưa ra những quyết định tài chính độc đoán, khinh thường rủi ro mang đến những thất bại kinh tế thảm hại.",
    'aspects.health.upright': "Một cơ thể cường tráng, sinh lực mạnh mẽ của một nhà vô địch. Sức khỏe được duy trì bằng kỷ luật nghiêm ngặt và ý chí thép.",
    'aspects.health.reversed': "Sự tàn phá cơ thể do stress cấp độ cao của việc duy trì quyền lực. Các bệnh về tim mạch, huyết áp do những cơn tức giận bộc phát không kiểm soát.",
    'aspects.spiritual.upright': "Một vị đạo sư đích thực với ngọn lửa trí tuệ rực rỡ, khả năng soi sáng con đường cho hàng vạn người. Sự thống nhất hoàn hảo giữa hành động và đức tin.",
    'aspects.spiritual.reversed': "Sự ngạo mạn tâm linh, tự xưng mình là đấng cứu thế. Một linh hồn bị tha hóa bởi quyền lực, đánh mất đi sự khiêm nhường cốt lõi của việc tu tập.",
    advice: "Hãy sử dụng quyền lực và sức ảnh hưởng của mình để nâng đỡ người khác. Khí chất vĩ đại nhất của một nhà lãnh đạo là sự vĩ đại của lòng khoan dung."
  }
};

cards = cards.map(c => {
  if (updates[c.id]) {
    const up = updates[c.id];
    c.generalUpright = up.generalUpright;
    c.generalReversed = up.generalReversed;
    c.aspects = c.aspects || {};
    c.aspects.love = c.aspects.love || {};
    c.aspects.love.upright = up['aspects.love.upright'];
    c.aspects.love.reversed = up['aspects.love.reversed'];
    c.aspects.career = c.aspects.career || {};
    c.aspects.career.upright = up['aspects.career.upright'];
    c.aspects.career.reversed = up['aspects.career.reversed'];
    c.aspects.finance = c.aspects.finance || {};
    c.aspects.finance.upright = up['aspects.finance.upright'];
    c.aspects.finance.reversed = up['aspects.finance.reversed'];
    c.aspects.health = c.aspects.health || {};
    c.aspects.health.upright = up['aspects.health.upright'];
    c.aspects.health.reversed = up['aspects.health.reversed'];
    c.aspects.spiritual = c.aspects.spiritual || {};
    c.aspects.spiritual.upright = up['aspects.spiritual.upright'];
    c.aspects.spiritual.reversed = up['aspects.spiritual.reversed'];
    c.advice = up.advice;
  }
  return c;
});

fs.writeFileSync(fileCards, JSON.stringify(cards, null, 2), 'utf-8');

const jsDataContent = `window.TAROT_DB = ${JSON.stringify(cards, null, 2)};\n`;
fs.writeFileSync(fileDataJs, jsDataContent, 'utf-8');

console.log("Updated Wands successfully!");
