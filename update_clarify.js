const fs = require('fs');

const dataPath = 'e:\\\\TAROT\\\\js\\\\clarify_data.js';
let content = fs.readFileSync(dataPath, 'utf-8');

const newSubthemes = {
  toxic_relationship: [
    "Bạn có đang che giấu cảm xúc thật của mình trong chuyện tình cảm hiện tại không?",
    "Có phải bạn luôn cảm thấy kiệt sức sau mỗi lần trò chuyện với người ấy?",
    "Bạn có đang lấy những kỷ niệm đẹp trong quá khứ để khỏa lấp sự tệ bạc ở hiện tại?",
    "Người kia có đang thao túng tâm lý khiến bạn nghĩ rằng mọi lỗi lầm đều do bạn?",
    "Nếu phải miêu tả mối quan hệ này bằng một từ khóa, đó có phải là 'lồng giam' không?",
    "Bạn có từng nghĩ đến việc rời đi nhưng lại bị nỗi sợ cô đơn giữ chân?",
    "Sự níu kéo hiện tại là vì tình yêu sâu đậm hay chỉ vì tiếc nuối thời gian đã thanh xuân?",
    "Có phải sự hiện diện của họ đang dập tắt dần nguồn năng lượng tích cực trong bạn?",
    "Tận sâu trong linh hồn, bạn có biết rõ rằng chặng đường này đã đến lúc phải kết thúc?",
    "Bạn có đang dùng sự cam chịu như một lớp vỏ để trốn tránh việc phải đối diện với nỗi đau cắt đứt bóng ma tuyệt vọng thét gào trong thâm tâm?"
  ],
  soulmate: [
    "Bạn có linh cảm mãnh liệt rằng mình đã từng gặp người này ở một kiếp sống khác?",
    "Sự xuất hiện của họ có mang lại một sự bình yên kỳ lạ mà bạn chưa từng trải qua?",
    "Hai người có thể thấu hiểu suy nghĩ của nhau ngay cả khi không cần dùng lời nói?",
    "Bạn có cảm thấy bản thân được thúc đẩy để trở thành phiên bản tốt hơn khi ở cạnh họ?",
    "Sự rung động này đến từ sự đồng điệu linh hồn chứ không chỉ là sự hấp dẫn thể xác rực cháy?",
    "Có phải ngay từ lần chạm mặt đầu tiên, vũ trụ đã gửi những dấu hiệu đồng điệu lặp đi lặp lại?",
    "Dù có những khác biệt, bạn có luôn cảm nhận được một sợi dây vô hình níu giữ hai người lại với nhau?",
    "Ở bên cạnh họ, bạn có thấy những tổn thương cũ dường như được xoa dịu và tự phục hồi?",
    "Có phải linh hồn bạn luôn muốn phá vỡ rào cản để chạy về phía người ấy bất chấp mọi thứ?",
    "Định mệnh có đang thử thách sự kiên nhẫn của hai bạn bằng khoảng cách không gian hay nghịch cảnh để tôi luyện một tình yêu thiêng liêng rực lửa không?"
  ],
  reconciliation: [
    "Bạn có thực sự muốn quay lại vì yêu, hay chỉ vì thói quen chưa thể dứt bỏ?",
    "Những mâu thuẫn cốt lõi khiến hai người chia tay đã thực sự được giải quyết chưa?",
    "Người kia có cho thấy sự thay đổi chân thành thông qua hành động thực tế không?",
    "Nếu quay lại, bạn có sẵn sàng buông bỏ những tổn thương để không nhắc lại chuyện cũ?",
    "Bạn có linh cảm rằng vòng lặp đau khổ có thể sẽ tái diễn nếu cả hai không cùng nỗ lực?",
    "Cái tôi cá nhân có đang ngăn cản bạn nói ra lời xin lỗi hoặc lời tha thứ chân thành?",
    "Cả hai có đang dùng sự im lặng để thăm dò đối phương thay vì thẳng thắn đối thoại?",
    "Có phải sâu trong thâm tâm bạn biết rõ vũ trụ đang khuyên bạn nên bước tiếp thay vì lùi lại?",
    "Sự hàn gắn này sẽ mang lại bình yên, hay chỉ tiếp tục khơi lại vết sẹo chưa lành rỉ máu?",
    "Nếu phải lựa chọn giữa một khởi đầu mới và sự tái hợp xước xát, linh hồn bạn có nấc lên sự tủi thân muốn buông xuôi vĩnh viễn không?"
  ],
  secret_admirer: [
    "Bạn có từng bắt được ánh mắt của ai đó lén nhìn mình và vội quay đi?",
    "Gần đây bạn có nhận được những sự quan tâm nhỏ nhặt nhưng cực kỳ tinh tế không?",
    "Có phải bạn đã lờ mờ đoán ra danh tính của người thầm thương nhưng lại cố tình phủ nhận?",
    "Sự hiện diện của họ có mang lại cảm giác an toàn và dễ chịu một cách kỳ lạ?",
    "Bạn có mong chờ tin nhắn hoặc cuộc gọi từ một người cụ thể mà bạn chưa dám gọi là người yêu?",
    "Có phải linh tính mách bảo bạn rằng một lời tỏ tình đang được chuẩn bị ở phía trước?",
    "Dường như có những sự trùng hợp kỳ lạ luôn đưa đẩy hai người vô tình chạm mặt nhau?",
    "Họ có luôn ở đó để ủng hộ âm thầm những quyết định và dự định điên rồ nhất của bạn?",
    "Sự im lặng của họ có phải là do nỗi sợ bị từ chối và làm hỏng đi mối quan hệ hiện tại?",
    "Bạn có dám gạt bỏ lớp phòng bị để chủ động bật đèn xanh cho một cuộc tình âm thầm kéo dài suốt bao tháng qua không?"
  ],
  burnout: [
    "Khái niệm 'ngày nghỉ' có phải đã trở nên vô nghĩa khi tâm trí bạn vẫn kẹt trong công việc?",
    "Bạn có cảm thấy kiệt sức ngay cả khi vừa mới ngủ dậy sau một đêm dài?",
    "Niềm đam mê ban đầu với công việc có phải đã bị thay thế bởi sự chán chường và nghĩa vụ?",
    "Có phải bạn đang làm việc như một cái máy để trốn tránh những khoảng trống trong tâm hồn?",
    "Khối lượng công việc khổng lồ có đang đè bẹp sự sáng tạo và linh hoạt thường thấy của bạn?",
    "Bạn có hay nổi nóng vô cớ với những người xung quanh vì áp lực công việc quá tải?",
    "Sự thừa nhận của sếp hoặc đồng nghiệp có còn mang lại niềm vui hay chỉ là sự nhẹ nhõm tạm thời?",
    "Có phải cơ thể đang liên tục phát ra tín hiệu cảnh báo qua những cơn đau mỏi, nhức đầu dai dẳng?",
    "Nếu tiếp tục gồng gánh thế này, bạn có sợ một ngày nào đó mình sẽ sụp đổ hoàn toàn?",
    "Bạn có dám buông bỏ một chút trách nhiệm, mặc kệ những thứ dở dang để bảo vệ sinh mạng và nhịp đập tàn hơi của chính linh hồn mình chưa?"
  ],
  startup: [
    "Ý tưởng khởi nghiệp này xuất phát từ đam mê cháy bỏng hay chỉ là mong muốn thoát khỏi cảnh làm thuê?",
    "Bạn có đã lường trước được toàn bộ những rủi ro về mặt tài chính và thời gian chưa?",
    "Đội ngũ đồng sáng lập hiện tại có chung một hệ giá trị và tầm nhìn cốt lõi với bạn không?",
    "Bạn có sẵn sàng hy sinh những khoảng thời gian giải trí, gia đình trong 2 năm đầu tiên không?",
    "Sự kiên định của bạn có đủ mạnh để vượt qua những lời khuyên can tiêu cực từ người thân?",
    "Bạn có đang quá lạc quan về luồng tiền doanh thu và quên đi các chi phí ẩn khổng lồ?",
    "Có phải thị trường mục tiêu của bạn thực sự cần sản phẩm này, hay đó chỉ là những gì bạn tự huyễn hoặc?",
    "Nếu phải thay đổi toàn bộ mô hình kinh doanh ban đầu, bạn có đủ linh hoạt để thích nghi không?",
    "Sự thất bại có phải là một bóng ma đang ám ảnh và khiến bạn chùn bước trước các quyết định sinh tử?",
    "Áp lực dòng tiền đứt gãy có làm bạn rùng mình và đánh mất đi lý trí sắt đá ngày đầu khi đứng giữa vòng vây nợ nần không?"
  ],
  workplace_politics: [
    "Bạn có cảm giác mình đang bị cô lập hoặc dìm hàng trong một phe phái ở công sở?",
    "Nỗ lực và công sức của bạn có thường xuyên bị người khác lén lút tranh công hoặc làm lu mờ?",
    "Có phải những lời xì xầm to nhỏ đang làm ảnh hưởng đến tinh thần làm việc của bạn?",
    "Bạn có đang miễn cưỡng duy trì mối quan hệ hòa hoãn với những kẻ bạn biết rõ là hai mặt?",
    "Sự minh bạch và công bằng có phải là thứ xa xỉ trong môi trường làm việc hiện tại của bạn?",
    "Bạn có phải thận trọng trong từng lời ăn tiếng nói vì sợ bị bóp méo, gièm pha?",
    "Liệu việc lên tiếng bảo vệ lẽ phải có khiến bạn trở thành mục tiêu công kích tiếp theo không?",
    "Sếp của bạn có thiên vị một cá nhân cụ thể và làm ngơ trước những nỗ lực bứt phá của bạn?",
    "Môi trường này có đang biến bạn thành một phiên bản đa nghi, gai góc và mệt mỏi mà bạn từng ghét bỏ?",
    "Khi nhắm mắt lại, bạn có cảm nhận được sự uất nghẹn dâng trào muốn hất tung mọi thứ định kiến để thoát khỏi đầm lầy thị phi ghê tởm này không?"
  ],
  side_hustle: [
    "Nghề tay trái này có đang ngốn quá nhiều thời gian mà đáng lẽ bạn dành để nghỉ ngơi?",
    "Thu nhập từ công việc phụ có thực sự bù đắp được sự cạn kiệt năng lượng của bạn?",
    "Có phải bạn đang nuôi hy vọng biến nghề tay trái thành nguồn sống chính thức trong 1 năm tới?",
    "Bạn có đang gặp khó khăn trong việc che giấu công việc này với công ty chính thức không?",
    "Niềm đam mê với sở thích này có đang bị mài mòn vì áp lực phải kiếm ra tiền hay không?",
    "Bạn có cảm thấy bế tắc khi lợi nhuận không xứng tầm với tâm huyết đổ ra hằng đêm?",
    "Sự phân tâm này có đang làm ảnh hưởng đến hiệu suất và sự thăng tiến ở công việc chính?",
    "Đã lúc nào bạn nghĩ đến việc tìm thêm cộng sự nhưng lại sợ bị lấy cắp chất xám và ý tưởng?",
    "Liệu có một rào cản pháp lý hoặc thuế vụ nào mà bạn đang tạm lờ đi để duy trì luồng thu không?",
    "Bạn có kiệt quệ đến mức muốn khóc lên vì gánh nặng hai vai nhưng vẫn phải cắn răng tiếp tục vì nỗi sợ nghèo túng bám chặt tâm trí không?"
  ],
  real_estate: [
    "Sự thôi thúc mua bán căn nhà/khu đất này là do thị trường tác động hay từ quyết định lý trí bảo toàn vốn?",
    "Bạn có đang ôm đồm kỳ vọng sinh lời quá nhanh mà phớt lờ các vấn đề kẹt thanh khoản?",
    "Có ẩn khuất về phong thủy hoặc yếu tố tâm linh nào ở khu vực đó khiến bạn cấn cá trong lòng?",
    "Liệu hồ sơ pháp lý, giấy tờ sổ sách của mảnh đất này có đang bị che giấu điểm nghẽn nào không?",
    "Quyết định xuống tiền lúc này có khiến dòng tiền sinh hoạt cốt lõi của gia đình rơi vào ách tắc không?",
    "Bạn có linh cảm rằng người môi giới hoặc đối tác đang thúc ép bạn chốt giao dịch một cách có mục đích?",
    "Nơi chốn này có thực sự mang lại sinh khí và sự bình an cho bạn và những người thân yêu?",
    "Trong tương lai xa, quyết định bất động sản này có phải là một gánh nặng vay lãi khiến bạn kiệt sức?",
    "Có một cơ hội lấp lánh thứ hai tốt hơn ở đằng sau mà bạn sẽ bỏ lỡ nếu chốt cọc vội vã lúc này không?",
    "Việc sang nhượng tài sản này có đẩy bạn vào ngõ cụt chênh vênh, điêu đứng nếu biến cố kinh tế càn quét qua không?"
  ],
  financial_loss: [
    "Bạn có đang dùng sự tức giận để che đậy đi cảm giác hối hận tột cùng về quyết định đầu tư sai lầm?",
    "Khoản tiền mất đi này có làm lung lay cả niềm tin của bạn vào năng lực quản lý của bản thân?",
    "Có phải bạn đang che giấu người thân thiết mức độ trầm trọng của sự thâm hụt tài chính này không?",
    "Bạn có từng nghĩ đến việc vay mượn liều lĩnh để gỡ gạc lại những thứ đã bốc hơi trong chốc lát?",
    "Kẻ đã trực tiếp hoặc gián tiếp gây ra sự mất mát này có đang lẩn tránh trách nhiệm với bạn không?",
    "Sự tự trách bản thân thiêu đốt bạn mỗi đêm có đang bào mòn tinh thần khốc liệt hơn cả việc mất tiền?",
    "Liệu sự kiện này là một tín hiệu cảnh tỉnh cứng rắn từ vũ trụ ngắt đi lòng tham mù quáng của bạn?",
    "Bạn có lo sợ lỗ hổng tài chính này sẽ phá hủy các dự định tương lai và cuộc sống hiện hữu không?",
    "Để xoay sở qua giai đoạn bế tắc này, bạn có phải từ bỏ một nguyên tắc cốt lõi của lòng tự tôn không?",
    "Sự sụp đổ về tiền bạc này có như một cú đánh trí mạng giáng thẳng vào hệ trục an toàn, xé ruột xé gan để bạn phải tái sinh lại từ cát bụi?"
  ],
  sudden_wealth: [
    "Sự xuất hiện của luồng tiền lớn có đang làm xáo trộn nghiêm trọng nhịp sinh hoạt bình dị của bạn?",
    "Bạn có cảm nhận được sự ghen tỵ ngầm từ những người quen biết khi hay tin bạn vừa phát tài?",
    "Có phải bạn đang có xu hướng chi tiêu bốc đồng để khao khát khẳng định vị thế với kẻ khác?",
    "Luồng vận may này có khiến bạn nảy sinh một chút tự mãn và lơ là cảnh giác sự nghiệp cốt lõi không?",
    "Bạn có đang che giấu số tiền này vì sợ những lời nhờ vả, vay mượn không thể từ chối?",
    "Sự giàu có đột ngột có đang khoét sâu thêm những khoảng cách vô hình giữa bạn và những người bạn cũ?",
    "Bạn có bao giờ cân nhắc trích một phần phước lộc này để làm thiện nguyện, hoàn trả lại cân bằng?",
    "Liệu áp lực phải bảo toàn và sinh lời cho khối tài sản mới này có đang đánh cắp giấc ngủ của bạn?",
    "Bạn có tin rằng cơn mưa tiền này là sự đền bù xứng đáng cho những đắng cay tủi nhục thuở trước?",
    "Tiền bạc ào ạt đổ về có đang làm mờ đi tiếng nói linh hồn, khiến bạn chênh vênh lạc lõng trên đỉnh cao không một bóng người thấu hiểu?"
  ],
  healing: [
    "Hành trình đối diện với vết thương cũ có đang làm bạn đau đớn dữ dội hơn cả lúc nó mới hình thành?",
    "Bạn có đang tha thứ cho người khác chỉ bằng lý trí, trong khi trái tim vẫn còn đang gào thét uất ức?",
    "Đã có lúc bạn cố ý lờ đi những ký ức buồn vì sợ sự mong manh của mình sẽ bung vỡ một lần nữa?",
    "Bạn có sẵn sàng để thay đổi hoàn toàn vòng lặp độc hại mà mình luôn tự giới hạn bấy lâu nay?",
    "Nước mắt bạn tuôn rơi dạo gần đây có mang theo sự giải thoát của những chèn ép nghẹn ngào cũ không?",
    "Dường như có một khoảng trống vô định khi năng lượng oán hận dần rút đi khỏi cơ thể bạn?",
    "Việc chữa lành có đồng nghĩa với việc bạn phải cắt đứt hoàn toàn với những người thân thuộc tạo ra căn nguyên?",
    "Bạn có đôi chút hoài nghi liệu sự bình an hiện tại là thật hay chỉ là khoảng lặng trước cơn bão?",
    "Đứa trẻ bên trong bạn đã bắt đầu mỉm cười và đón nhận ánh sáng ấm áp thay vì rúc góc tối chưa?",
    "Bạn có đang chạm tay vào sự bình yên tột mang tính giải thoát, lột đi lớp da thô ráp cỗi mục để tái sinh dưới thân hình đẫm hương thuần khiết không?"
  ],
  stress: [
    "Hàng loạt những nhiệm vụ chưa hoàn thành luôn xoay vòng trong não và ngăn cản bạn chìm vào giấc ngủ?",
    "Bạn có đang ăn uống, mua sắm hoặc sử dụng các chất kích thích để cưỡng ép sự giải tỏa căng thẳng?",
    "Sự cáu bẳn và dễ nổi nóng có đang vô tình làm tổn thương những người quan tâm bạn vô điều kiện?",
    "Bạn có một khao khát mãnh liệt muốn bỏ vé máy bay biến mất đi đâu đó và tắt mọi thiết bị liên lạc?",
    "Cảm giác ngột ngạt lồng ngực và hơi thở ngắn có phải là chuông báo động đỏ cơ thể đang kêu cứu?",
    "Bạn có tự huyễn hoặc rằng chỉ cần vượt qua tuần này mọi thứ sẽ êm xuôi, nhưng vòng lặp cứ tiếp diễn?",
    "Áp lực duy trì hình tượng hoàn hảo có đang thít chặt sợi dây thòng lọng ở cổ bạn mỗi ngày?",
    "Sự cầu toàn thái quá của bạn là do kỳ vọng của tương lai hay áp lực so sánh từ xã hội?",
    "Có phải việc nói tiếng 'Không' là điều xa xỉ nhất mà bạn không dám thốt lên với những đòi hỏi?",
    "Chuỗi ngày áp lực này có đang biến tâm hồn bạn thành một thảm họa xám xịt nứt nẻ, gào thét khô khốc đợi cơn mưa bình yên tắm mát không?"
  ],
  trauma: [
    "Có những hình ảnh, mùi hương hoặc âm thanh bất chợt ném bạn quay lại tình huống kinh hoàng ngày cũ?",
    "Cơ chế tự vệ thụ động có đang khiến bạn đẩy ra xa tất cả những người thật tâm muốn trao yêu thương?",
    "Bạn có luôn giữ thái độ cảnh giác phòng hờ tột độ ngay cả trong những khoảnh khắc được cho là an toàn?",
    "Tổn thương quá khứ có đang biến tướng thành niềm tin sai lệch rằng bạn không xứng đáng được hạnh phúc?",
    "Có sự tê liệt cảm xúc nào khiến bạn không thể khóc, cũng chẳng thể cười trọn vẹn trước các sự kiện lớn không?",
    "Bạn có đang dùng sự bận rộn không ngừng nghỉ làm liều thuốc tê liệt để quên đi bóng ma cũ rích?",
    "Có phải tận trong tiềm thức, bạn vẫn đang chực chờ sự phản bội hoặc đổ vỡ một cách tất yếu?",
    "Liệu việc chối bỏ sự việc đã từng xảy ra có phải là khiên che chắn mỏng manh nhất của bạn hiện tại?",
    "Sự sợ hãi việc đánh mất quyền kiểm soát có bắt rễ sâu thẳm từ lúc bạn bị tước đoạt sự an toàn khi xưa?",
    "Khối uất nghẹn câm lặng này có đang đâm rễ vào lục phủ ngũ tạng, vắt kiệt sinh khí và làm bạn thoi thóp giữa những dòng lệ khô rát vô hình không?"
  ],
  exams: [
    "Nỗi sợ thất bại có đang làm lu mờ đi năng lực và khối lượng kiến thức bạn đã cần mẫn tích lũy?",
    "Có phải áp lực đạt điểm cao đến từ sự kỳ vọng của cha mẹ thay vì khát vọng của chính bạn?",
    "Bạn có đang cố gắng học nhồi nhét vào phút chót thay vì phân bổ chiến lược thông minh hơn?",
    "Sự cạnh tranh vô hình với những bạn học xung quanh có đang thiêu rụi sự tự tin của bạn?",
    "Có khi nào bạn cảm thấy trống rỗng và tự hỏi ý nghĩa thực sự của kỳ thi này đọng lại là phương gì?",
    "Việc thức khuya dậy sớm quá mức đã chuyển hóa thành sự trì trệ của bộ não khi vào phòng thi?",
    "Bạn có nghi ngờ bài kiểm tra thực sự phản ánh đúng kỹ năng hay chỉ là sự khôn lỏi trong việc đoán đề?",
    "Nếu lỡ sẩy chân điểm kém, cơn bão tuyệt vọng có làm bạn gục ngã hoàn toàn niềm tin vào con người mình không?",
    "Có phải sự tập trung đang bị đục khoét bởi những muộn phiền cá nhân không liên quan đến học tập?",
    "Trong sâu thẳm, tiếng vọng định mệnh có đang nhắc nhở bạn hãy bung xõa cánh bay thả lỏng, phó mặc sự phán xét để đạt cảnh giới trí nhớ thâm sâu không?"
  ],
  scholarship: [
    "Luồng áp lực tài chính đè nặng có biến học bổng thành chiếc phao cứu sinh duy nhất của cuộc đời bạn?",
    "Bạn có cảm thấy hồ sơ ứng tuyển của mình đang phô diễn một hình tượng khác lạ so với bản chất thực tại?",
    "Sự kỳ vọng trúng phọt có khiến nhịp đập tim bạn trở nên dồn dập mỗi khi kiểm tra hộp thư điện tử?",
    "Có một đối thủ mạnh mẽ nào đang gây chấn động khiến bạn tự hạ thấp sự cố gắng kiên cường của mình?",
    "Việc nhận được học bổng có phải là cách duy nhất để bạn minh chứng thực lực với những kẻ khinh thường?",
    "Bạn có đủ dũng khí đối mặt với sự từ chối và đứng lên chuẩn bị cho kế hoạch dự phòng B một cách thanh thản?",
    "Có điều gì đó trong bài luận cá nhân bạn giấu giếm không dám kể vì sự rụt rè yếu đuối?",
    "Hội đồng xét duyệt có thể nhìn thấu sự quyết liệt và ngọn lửa đam mê hừng hực vượt trội sau con chữ không?",
    "Cơ hội bước ra biển lớn này có làm bạn sợ hãi sự cô đơn khi phải giã biệt tất cả những vùng an toàn hiện hữu?",
    "Nếu phong vũ trắc trở, liệu linh hồn dũng cảm này có bám trụ kiên cường để tự tỏa sáng không cần huy chương hay học bổng cộp mác?"
  ],
  talent: [
    "Sự hoài nghi bản thân có đang đóng băng những ý tưởng sáng tạo điên rồ nhất của bạn?",
    "Bạn có từng giấu kín tài năng thực sự vì nỗi sợ bị phán xét là kẻ dị hợm, khác biệt với đám đông?",
    "Việc theo đuổi thiên khiếu bẩm sinh này có tỷ lệ nghịch với sự thăng tiến về tiền bạc an toàn không?",
    "Có một thần tượng nào đang biến thành cái bóng khổng lồ che lấp phong cách cá nhân duy nhất của bạn?",
    "Khát vọng tự do cống hiến mãnh liệt có đang giãy giụa dưới lớp vỏ bọc dân văn phòng ngoan ngoãn chớ?",
    "Bạn có nhận ra năng lượng vũ trụ luôn tuôn chảy mượt mà mỗi khi bạn thả hồn vào lĩnh vực nghệ thuật này?",
    "Đôi khi bạn tự hỏi liệu món quà thượng đế ban tặng là sự cứu rỗi tuyệt đẹp hay lời nguyền cô độc vô biên?",
    "Bạn có sẵn sàng phá vỡ mọi lề thói kỹ thuật rập khuôn để phi thăng lên cảnh giới sáng tạo xuất thần chưa?",
    "Một tác phẩm để đời đang được phôi thai trong tâm trí nhưng lại bị bóp nghẹt vì sự trì hoãn lười nhác?",
    "Nếu không ai công nhận điều đó, trái tim lấp lánh của bạn có đủ dũng khí tự hát ca vang vọng giữa hoang vu tận tủy kiếp phiêu bồng không?"
  ],
  spirit_guide: [
    "Gần đây bạn có liên tục nhìn thấy những chuỗi số lặp lại chứa đựng tín hiệu vũ trụ huyền bí không?",
    "Vị thần bảo hộ bóng tối có đang truyền thông điệp cảnh báo qua những cơn ác mộng rợn người?",
    "Sự tĩnh lặng tuyệt đối có đủ sức giúp bạn kết nối và nghe rõ ràng lời chỉ dẫn âm thầm bên tai hằng đêm?",
    "Trực giác nhạy bén dạo này có mách bảo bạn tránh xa một sự việc nào đó dù bề ngoài có vẻ hoàn hảo?",
    "Có một luồng khí lạnh an ủi hay sự ấm áp lướt qua để che chở bạn ở giây phút hoảng loạn cùng cực không?",
    "Lòng kiêu hãnh và chủ nghĩa lý trí có đang phong bế kênh liên lạc giữa bạn và sinh mệnh phi vật chất thiêng liêng?",
    "Thử thách bế tắc vừa trải qua liệu có phải bài kiểm tra sát tâm từ đấng bảo hộ nhằm thanh tẩy bạn?",
    "Bạn có dám phó thác toàn bộ niềm tin cho vị trí dẫn đường dù nhắm mắt sải chân xuống bờ vực sương mù?",
    "Sự kiện gặp gỡ 1 người xa lạ hôm trước có phải do ân uy của Thần Hộ Mệnh xui khiến nhằm tương trợ đoạn ngặt nghèo?",
    "Khi lớp áo phàm trần rũ bỏ, ánh sáng hào quang của vị đạo sư trong tâm thức có rọi chiếu tạc phá gông cùm trần tục khóc dại cõi khổ đau vớt rỗi linh hồn bạn không?"
  ]
};

// Remove the very last closing bracket "};"
content = content.trim();
if (content.endsWith('};')) {
  content = content.slice(0, -2);
}

// Append the new subthemes
let injection = "";
for (const [key, questions] of Object.entries(newSubthemes)) {
  injection += ',\n  ' + key + ': [\n';
  for (let i = 0; i < questions.length; i++) {
    // Escape quotes to be safe
    const q = questions[i].replace(/"/g, '\\"');
    injection += '    "' + q + '"' + (i < questions.length - 1 ? ',' : '') + '\n';
  }
  injection += '  ]';
}

content = content + injection + '\n};\n';

fs.writeFileSync(dataPath, content, 'utf-8');
console.log('clarify_data.js updated with Yes/No questions');
