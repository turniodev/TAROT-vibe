// js/data.js — Full 78-card Tarot DB from tarotreader.me
// Fixed by fix_data.mjs. Do NOT edit manually.
(function () {
  window.TAROT_DB = [
  {
    id:0, name:"The Fool", nameVi:"Kẻ Ngốc", number:"0",
    arcana:"major", image:"cards/0-The-Fool.jpg",
    planet:"Sao Thiên Vương", zodiac:"Bảo Bình",
    keywords:["Khởi đầu mới","Tiềm năng vô hạn","Sự ngây thơ","Lòng tin và tự do","Dũng cảm đối mặt với điều chưa biết","Thiếu kinh nghiệm hoặc liều lĩnh","Đột phá khỏi giới hạn cũ"], keywordsRev:[],
    upright:"Dấu hiệu của cơ hội tài chính mới, nhưng hãy đảm bảo bạn có kế hoạch cụ thể.",
    reversed:"Cảnh báo về việc coi nhẹ sức khỏe hoặc thực hiện những hành động thiếu thận trọng.",
    aspects:{
      love:{up:"The Fool báo hiệu một mối quan hệ mới hoặc sự khởi đầu mới trong chuyện tình cảm. Đây là lúc bạn cần mở lòng và tin tưởng vào tình yêu.",rev:"Thể hiện sự thiếu ổn định hoặc liều lĩnh trong mối quan hệ, có thể bạn đang quá ngây thơ hoặc mù quáng."},
      career:{up:"The Fool khuyến khích bạn thử nghiệm những cơ hội mới trong sự nghiệp, dù có vẻ rủi ro. Đây là thời điểm dám nghĩ dám làm.",rev:"Cẩn thận với những quyết định hấp tấp.  Bạn có thể thiếu sự chuẩn bị kỹ lưỡng cho công việc mới."},
      finance:{up:"Dấu hiệu của cơ hội tài chính mới, nhưng hãy đảm bảo bạn có kế hoạch cụ thể. Khi lá bài",rev:"Lời nhắc nhở tránh chi tiêu thiếu kiểm soát hoặc đầu tư liều lĩnh.  6."},
      health:{up:"Một khởi đầu mới trong chế độ chăm sóc sức khỏe có thể giúp bạn cải thiện đáng kể. Khi lá bài",rev:"Cảnh báo về việc coi nhẹ sức khỏe hoặc thực hiện những hành động thiếu thận trọng."},
      spiritual:{up:"Khi lá bài ngược: Cảnh báo về việc coi nhẹ sức khỏe hoặc thực hiện những hành động thiếu thận trọng.",rev:"Sức khỏe Khi lá bài xuôi: Một khởi đầu mới trong chế độ chăm sóc sức khỏe có thể giúp bạn cải thiện đáng kể."}
    },
    advice:"The Fool không chỉ là lá bài của sự khởi đầu mà còn là lời nhắc nhở bạn hãy sống tự do và tin tưởng vào chính mình. Dù bạn đang đứng trước ngã rẽ trong cuộc sống, The Fool khuyến khích bạn can đảm, tận hưởng hành trình, và khám phá những tiềm năng vô hạn trong bản thân.", numerology:"0"
  },
  {
    id:1, name:"The Magician", nameVi:"Pháp Sư", number:"I",
    arcana:"major", image:"cards/1-The-Magician.jpg",
    planet:"Sao Thủy", zodiac:"Song Tử & Xử Nữ",
    keywords:["Sáng tạo","Hành động","Sức mạnh ý chí","Sự tập trung","Tiềm năng","Khởi đầu mới","Kết nối tâm linh và thế giới thực","Biến ước mơ thành hiện thực"], keywordsRev:[],
    upright:"Khi lá bài ngược: Bạn có thể đang đánh giá sai các cơ hội hoặc bị lừa dối trong vấn đề tiền bạc.  10.",
    reversed:"Bạn có thể đang đánh giá sai các cơ hội hoặc bị lừa dối trong vấn đề tiền bạc.",
    aspects:{
      love:{up:"Lá bài cho thấy bạn hoặc đối phương đang chủ động trong mối quan hệ. Đây là thời điểm lý tưởng để xây dựng nền tảng tình yêu bền vững.",rev:"Cảnh báo sự lừa dối, thiếu trung thực hoặc một trong hai người đang thao túng mối quan hệ.  7."},
      career:{up:"Đây là lúc bạn nên tập trung vào khả năng sáng tạo và kỹ năng giao tiếp của mình. Lá bài báo hiệu sự thành công nếu bạn chủ động biến ý tưởng thành hành động.",rev:"Bạn có thể gặp phải tình huống thiếu định hướng hoặc không tận dụng hết tiềm năng của mình.  8."},
      finance:{up:"Đây là dấu hiệu tích cực về việc cải thiện tài chính thông qua sự sáng tạo hoặc đầu tư thông minh. Khi lá bài",rev:"Bạn có thể đang đánh giá sai các cơ hội hoặc bị lừa dối trong vấn đề tiền bạc.  10."},
      health:{up:"Thể hiện sức khỏe đang trong trạng thái cân bằng và tích cực. Hãy lắng nghe cơ thể và duy trì thói quen lành mạnh.",rev:"Cảnh báo về việc bạn có thể đang lơ là sức khỏe, đặc biệt là vấn đề liên quan đến stress hoặc tâm lý.  9."},
      spiritual:{up:"Lá bài cho thấy bạn hoặc đối phương đang chủ động trong mối quan hệ. Đây là thời điểm lý tưởng để xây dựng nền tảng tình yêu bền vững.",rev:"Cảnh báo sự lừa dối, thiếu trung thực hoặc một trong hai người đang thao túng mối quan hệ.  7."}
    },
    advice:"", numerology:"I"
  },
  {
    id:2, name:"The High Priestess", nameVi:"Nữ Tư Tế", number:"II",
    arcana:"major", image:"cards/2-The-High-Priestess.jpg",
    planet:"Mặt Trăng", zodiac:"Cự Giải",
    keywords:["Bí ẩn","Trực giác","Tri thức tiềm ẩn","Sự im lặng","Năng lượng nữ tính","Tâm linh","Khám phá nội tâm","Sự chờ đợi"], keywordsRev:[],
    upright:"Lá bài cho thấy tình yêu tiềm ẩn hoặc cảm xúc sâu sắc chưa được bộc lộ. Đây cũng là lời khuyên rằng bạn nên tin vào trực giác của mình để hiểu đối phương.",
    reversed:"8.  Ý Nghĩa Lá Bài The High Priestess trong Sức Khỏe Khi lá bài xuôi: Tượng trưng cho sự cần thiết phải lắng nghe cơ thể và cảm xúc bên trong.",
    aspects:{
      love:{up:"Lá bài cho thấy tình yêu tiềm ẩn hoặc cảm xúc sâu sắc chưa được bộc lộ. Đây cũng là lời khuyên rằng bạn nên tin vào trực giác của mình để hiểu đối phương.",rev:"Tượng trưng cho sự không rõ ràng, hiểu lầm hoặc che giấu cảm xúc trong mối quan hệ.  Hãy cẩn thận với những điều không được nói ra."},
      career:{up:"Lá bài khuyến khích bạn tin tưởng vào trực giác để đưa ra quyết định. Đây là thời điểm tập trung vào việc học hỏi và khám phá sâu hơn lĩnh vực chuyên môn của bạn.",rev:"Cảnh báo về sự thiếu thông tin hoặc bạn có thể đang bỏ qua các dấu hiệu quan trọng trong công việc.  8."},
      finance:{up:"Lá bài khuyên bạn nên chờ đợi và thu thập thêm thông tin trước khi đưa ra các quyết định tài chính lớn. Hãy tin vào trực giác khi đánh giá các cơ hội.",rev:""},
      health:{up:"Tượng trưng cho sự cần thiết phải lắng nghe cơ thể và cảm xúc bên trong. Đây là dấu hiệu khuyến khích bạn chăm sóc sức khỏe tinh thần nhiều hơn.",rev:"Cảnh báo rằng bạn có thể đang bỏ qua những dấu hiệu bất thường của cơ thể hoặc cần tìm hiểu sâu hơn về nguyên nhân của vấn đề sức khỏe.  9."},
      spiritual:{up:"Lá bài cho thấy tình yêu tiềm ẩn hoặc cảm xúc sâu sắc chưa được bộc lộ. Đây cũng là lời khuyên rằng bạn nên tin vào trực giác của mình để hiểu đối phương.",rev:"Tượng trưng cho sự không rõ ràng, hiểu lầm hoặc che giấu cảm xúc trong mối quan hệ.  Hãy cẩn thận với những điều không được nói ra."}
    },
    advice:"", numerology:"II"
  },
  {
    id:3, name:"The Empress", nameVi:"Nữ Hoàng", number:"III",
    arcana:"major", image:"cards/3-The-Empress.jpg",
    planet:"Sao Kim", zodiac:"Kim Ngưu & Thiên Bình",
    keywords:["Phong phú","Sáng tạo","Nuôi dưỡng"], keywordsRev:[],
    upright:"Lá bài báo hiệu tình yêu đang ở trạng thái tràn đầy năng lượng tích cực. Nó tượng trưng cho sự lãng mạn, sự hòa hợp và khả năng xây dựng một mối quan hệ bền vững.",
    reversed:"10.  Câu Hỏi Thường Gặp Khi Trải Bài Tarot và Lá The Empress Xuất Hiện 10.",
    aspects:{
      love:{up:"Lá bài báo hiệu tình yêu đang ở trạng thái tràn đầy năng lượng tích cực. Nó tượng trưng cho sự lãng mạn, sự hòa hợp và khả năng xây dựng một mối quan hệ bền vững.",rev:"Lá bài cảnh báo sự thiếu cân bằng hoặc quá phụ thuộc trong mối quan hệ.  Đôi khi, nó ám chỉ sự thiếu yêu thương bản thân."},
      career:{up:"Đây là dấu hiệu cho thấy sự sáng tạo và nỗ lực của bạn sẽ mang lại thành quả lớn. Lá bài khuyến khích bạn tập trung vào các dự án đòi hỏi sự đổi mới và khả năng lãnh đạo.",rev:"Cảnh báo bạn có thể đang gặp khó khăn trong việc cân bằng giữa công việc và đời sống cá nhân hoặc thiếu ý tưởng mới mẻ.  8."},
      finance:{up:"Lá bài mang đến tín hiệu tích cực về tài chính. Nó cho thấy sự dồi dào và thành công về mặt vật chất, khuyến khích bạn đầu tư vào những gì mang lại giá trị lâu dài.",rev:"Bạn có thể đang tiêu xài hoang phí hoặc không quản lý tài chính một cách hiệu quả.  10."},
      health:{up:"Lá bài đại diện cho sức khỏe tốt, sự sinh sôi và khả năng chữa lành. Đặc biệt, nó thường gắn liền với khả năng sinh sản và mang thai.",rev:"Lá bài cảnh báo bạn có thể đang bỏ qua việc chăm sóc bản thân, hoặc cần chú ý hơn đến sức khỏe tinh thần và cảm xúc.  9."},
      spiritual:{up:"Lá bài báo hiệu tình yêu đang ở trạng thái tràn đầy năng lượng tích cực.",rev:"10."}
    },
    advice:"", numerology:"III"
  },
  {
    id:4, name:"The Emperor", nameVi:"Hoàng Đế", number:"IV",
    arcana:"major", image:"cards/4-The-Emperor.jpg",
    planet:"Sao Hỏa", zodiac:"Bạch Dương",
    keywords:["Quyền lực","Kỷ luật","Ổn định","Trách nhiệm","Kiểm soát","Cấu trúc","Bảo vệ","Lãnh đạo"], keywordsRev:[],
    upright:"Trong tình yêu, lá bài này thể hiện một mối quan hệ ổn định, đáng tin cậy và được xây dựng trên nền tảng vững chắc. Nếu bạn độc thân, The Emperor khuyến khích bạn nên tìm kiếm một đối tác có trách nhiệm và đáng tin cậy.",
    reversed:"Lá bài cảnh báo về sự kiểm soát quá mức hoặc thiếu cân bằng quyền lực trong mối quan hệ.  Một người có thể đang chiếm ưu thế hoặc không tôn trọng quyền tự do của đối phương.",
    aspects:{
      love:{up:"Trong tình yêu, lá bài này thể hiện một mối quan hệ ổn định, đáng tin cậy và được xây dựng trên nền tảng vững chắc. Nếu bạn độc thân, The Emperor khuyến khích bạn nên tìm kiếm một đối tác có trách nhiệm và đáng tin cậy.",rev:"Lá bài cảnh báo về sự kiểm soát quá mức hoặc thiếu cân bằng quyền lực trong mối quan hệ.  Một người có thể đang chiếm ưu thế hoặc không tôn trọng quyền tự do của đối phương."},
      career:{up:"Lá bài cho thấy bạn cần phải làm việc với kỷ luật và trách nhiệm để đạt được thành công. Nó cũng có thể chỉ ra sự giúp đỡ từ một người lãnh đạo mạnh mẽ hoặc một cấp trên có kinh nghiệm.",rev:"Cảnh báo bạn về sự thiếu trật tự hoặc không kiểm soát được tình huống trong công việc.  Có thể bạn đang gặp khó khăn với một người sếp độc đoán."},
      finance:{up:"Lá bài báo hiệu sự ổn định tài chính nhờ vào việc lập kế hoạch và quản lý tài chính hiệu quả. Đây là thời điểm lý tưởng để đầu tư dài hạn.",rev:"Cảnh báo bạn về sự thiếu kiểm soát trong chi tiêu hoặc tài chính đang chịu ảnh hưởng từ một người có quyền lực.  10."},
      health:{up:"Biểu thị sự cần thiết phải có kỷ luật và trật tự trong việc chăm sóc sức khỏe. Lập kế hoạch tập luyện hoặc thay đổi chế độ ăn uống sẽ mang lại kết quả tốt.",rev:"Cảnh báo rằng bạn có thể đang bỏ qua các dấu hiệu cảnh báo từ cơ thể hoặc thiếu sự kỷ luật trong việc duy trì sức khỏe.  9."},
      spiritual:{up:"Trong tình yêu, lá bài này thể hiện một mối quan hệ ổn định, đáng tin cậy và được xây dựng trên nền tảng vững chắc.",rev:"Lá bài cảnh báo về sự kiểm soát quá mức hoặc thiếu cân bằng quyền lực trong mối quan hệ."}
    },
    advice:"", numerology:"IV"
  },
  {
    id:5, name:"The Hierophant", nameVi:"Giáo Hoàng", number:"V",
    arcana:"major", image:"cards/5-The-Hierophant.jpg",
    planet:"Sao Kim", zodiac:"Kim Ngưu",
    keywords:["Truyền thống","Tri thức tâm linh","Hệ thống niềm tin","Quy tắc đạo đức","Sự hướng dẫn","Tổ chức","Cam kết","Học hỏi"], keywordsRev:[],
    upright:"Trong tình yêu, The Hierophant biểu thị một mối quan hệ truyền thống, ổn định và được xây dựng trên các giá trị chung. Nó cũng có thể ám chỉ đến hôn nhân hoặc sự cam kết lâu dài.",
    reversed:"Lá bài ngược có thể cảnh báo về sự thiếu đồng thuận trong giá trị hoặc niềm tin giữa hai người.  Điều này có thể dẫn đến mâu thuẫn hoặc cảm giác bị ép buộc.",
    aspects:{
      love:{up:"Trong tình yêu, The Hierophant biểu thị một mối quan hệ truyền thống, ổn định và được xây dựng trên các giá trị chung. Nó cũng có thể ám chỉ đến hôn nhân hoặc sự cam kết lâu dài.",rev:"Lá bài ngược có thể cảnh báo về sự thiếu đồng thuận trong giá trị hoặc niềm tin giữa hai người.  Điều này có thể dẫn đến mâu thuẫn hoặc cảm giác bị ép buộc."},
      career:{up:"Lá bài này thể hiện sự cần thiết phải tuân theo các quy tắc và cấu trúc hiện có. Nó cũng khuyến khích bạn học hỏi từ những người cố vấn hoặc đồng nghiệp có kinh nghiệm để tiến xa hơn trong sự nghiệp.",rev:"Cảnh báo bạn có thể đang cảm thấy bị gò bó bởi các hệ thống hoặc quy tắc cứng nhắc.  Bạn cần tìm cách cân bằng giữa sự đổi mới và truyền thống."},
      finance:{up:"Lá bài báo hiệu rằng việc tuân theo các quy tắc tài chính truyền thống, như tiết kiệm và đầu tư an toàn, sẽ mang lại sự ổn định. Nó cũng có thể ám chỉ việc tham khảo ý kiến của các cố vấn tài chính.",rev:""},
      health:{up:"Lá bài nhắc nhở bạn nên tuân thủ các lời khuyên y tế hoặc các phương pháp chữa bệnh truyền thống. Đây là thời điểm bạn nên đặt niềm tin vào chuyên gia.",rev:"Cảnh báo về việc lơ là sức khỏe hoặc theo đuổi các phương pháp không phù hợp.  Hãy cẩn trọng và tìm kiếm thông tin đáng tin cậy."},
      spiritual:{up:"Trong tình yêu, The Hierophant biểu thị một mối quan hệ truyền thống, ổn định và được xây dựng trên các giá trị chung. Nó cũng có thể ám chỉ đến hôn nhân hoặc sự cam kết lâu dài.",rev:"Lá bài ngược có thể cảnh báo về sự thiếu đồng thuận trong giá trị hoặc niềm tin giữa hai người.  Điều này có thể dẫn đến mâu thuẫn hoặc cảm giác bị ép buộc."}
    },
    advice:"", numerology:"V"
  },
  {
    id:6, name:"The Lovers", nameVi:"Người Tình", number:"VI",
    arcana:"major", image:"cards/6-The-Lovers.jpg",
    planet:"Sao Thủy", zodiac:"Song Tử",
    keywords:["The Lovers"], keywordsRev:[],
    upright:"Lá bài đại diện cho tình yêu đôi lứa, sự hòa hợp và sự thấu hiểu trong mối quan hệ. Nếu bạn đang độc thân, lá bài này báo hiệu khả năng gặp gỡ một người đặc biệt.",
    reversed:"Lá bài cảnh báo về sự mất cân bằng hoặc hiểu lầm trong mối quan hệ.  Nó cũng có thể ám chỉ sự do dự hoặc khó khăn trong việc đưa ra quyết định liên quan đến tình yêu.",
    aspects:{
      love:{up:"Lá bài đại diện cho tình yêu đôi lứa, sự hòa hợp và sự thấu hiểu trong mối quan hệ. Nếu bạn đang độc thân, lá bài này báo hiệu khả năng gặp gỡ một người đặc biệt.",rev:"Lá bài cảnh báo về sự mất cân bằng hoặc hiểu lầm trong mối quan hệ.  Nó cũng có thể ám chỉ sự do dự hoặc khó khăn trong việc đưa ra quyết định liên quan đến tình yêu."},
      career:{up:"Lá bài biểu thị sự hợp tác và kết nối tốt đẹp trong công việc. Đây là thời điểm bạn có thể ký kết hợp đồng hoặc bắt đầu một mối quan hệ hợp tác đầy triển vọng.",rev:"Cảnh báo về sự thiếu đồng thuận hoặc xung đột trong môi trường làm việc.  Hãy cẩn thận khi đưa ra các quyết định, đặc biệt nếu chúng có thể ảnh hưởng lâu dài."},
      finance:{up:"Lá bài báo hiệu sự hợp tác tài chính hoặc một quyết định quan trọng liên quan đến tiền bạc. Hãy lắng nghe lời khuyên từ người bạn tin tưởng để đưa ra quyết định sáng suốt.",rev:"Cảnh báo bạn cần cẩn trọng với các giao dịch tài chính, đặc biệt nếu chúng liên quan đến người khác.  Có thể có sự hiểu lầm hoặc xung đột về tiền bạc."},
      health:{up:"Lá bài thể hiện sự cân bằng giữa tâm trí và cơ thể. Đây là thời điểm tốt để tập trung vào việc duy trì lối sống lành mạnh và chăm sóc bản thân cả về thể chất lẫn tinh thần.",rev:"Cảnh báo rằng bạn có thể đang bỏ qua các dấu hiệu từ cơ thể hoặc cảm thấy căng thẳng do sự mất cân bằng trong cuộc sống.  Hãy chú ý đến sức khỏe tâm lý."},
      spiritual:{up:"Lá bài đại diện cho tình yêu đôi lứa, sự hòa hợp và sự thấu hiểu trong mối quan hệ.",rev:"Lá bài cảnh báo về sự mất cân bằng hoặc hiểu lầm trong mối quan hệ."}
    },
    advice:"", numerology:"VI"
  },
  {
    id:7, name:"The Chariot", nameVi:"Cỗ Xe", number:"VII",
    arcana:"major", image:"cards/7-The-Chariot.jpg",
    planet:"Mặt Trăng", zodiac:"Cự Giải",
    keywords:["Quyết tâm","Kiểm soát","Chiến thắng","Cân bằng","Tập trung","Chinh phục","Ý chí mạnh mẽ","Tham vọng"], keywordsRev:[],
    upright:"Lá bài này báo hiệu rằng mối quan hệ của bạn cần sự kiểm soát và tập trung để đạt được sự cân bằng. Nó cũng có thể ám chỉ việc vượt qua thử thách trong mối quan hệ và tiến tới một giai đoạn ổn định hơn.",
    reversed:"Cảnh báo về sự mất kiểm soát hoặc không cân bằng trong tình yêu.  Một trong hai người có thể đang áp đảo hoặc kiểm soát quá mức đối phương.",
    aspects:{
      love:{up:"Lá bài này báo hiệu rằng mối quan hệ của bạn cần sự kiểm soát và tập trung để đạt được sự cân bằng. Nó cũng có thể ám chỉ việc vượt qua thử thách trong mối quan hệ và tiến tới một giai đoạn ổn định hơn.",rev:"Cảnh báo về sự mất kiểm soát hoặc không cân bằng trong tình yêu.  Một trong hai người có thể đang áp đảo hoặc kiểm soát quá mức đối phương."},
      career:{up:"The Chariot thể hiện rằng bạn đang trên đường tới thành công nhờ vào sự kiên trì và quyết tâm. Đây là thời điểm để tập trung vào mục tiêu của bạn và tận dụng mọi nguồn lực để đạt được kết quả.",rev:"Báo hiệu bạn có thể đang mất phương hướng hoặc không kiểm soát được tình huống trong công việc.  Cần phải tái định hình mục tiêu và kiểm soát tốt hơn các yếu tố xung quanh."},
      finance:{up:"Lá bài báo hiệu sự thành công về tài chính thông qua sự quyết tâm và kiểm soát tốt. Đây là thời điểm thích hợp để đưa ra các quyết định tài chính lớn, miễn là bạn có kế hoạch rõ ràng.",rev:"Cảnh báo về sự thiếu kiểm soát tài chính hoặc các khoản đầu tư không hiệu quả.  Hãy thận trọng và xem xét lại kế hoạch của mình."},
      health:{up:"Lá bài báo hiệu sức khỏe của bạn đang trong trạng thái tốt, hoặc bạn đang trên đà phục hồi nhờ vào nỗ lực chăm sóc bản thân. Nó cũng khuyến khích bạn tiếp tục tập luyện và duy trì lối sống lành mạnh.",rev:"Cảnh báo rằng bạn có thể đang thiếu kỷ luật trong việc chăm sóc sức khỏe.  Hãy cẩn thận với căng thẳng hoặc những thói quen không lành mạnh."},
      spiritual:{up:"Lá bài này báo hiệu rằng mối quan hệ của bạn cần sự kiểm soát và tập trung để đạt được sự cân bằng.",rev:"Cảnh báo về sự mất kiểm soát hoặc không cân bằng trong tình yêu."}
    },
    advice:"", numerology:"VII"
  },
  {
    id:8, name:"Strength", nameVi:"Sức Mạnh", number:"VIII",
    arcana:"major", image:"cards/8-Strength.jpg",
    planet:"Mặt Trời", zodiac:"Sư Tử",
    keywords:["Sức mạnh nội tại","Kiên nhẫn","Lòng can đảm","Sự kiểm soát bản thân","Dịu dàng","Lòng trắc ẩn","Quyết tâm","Tự tin"], keywordsRev:[],
    upright:"Strength đại diện cho sự cân bằng và khả năng chế ngự cảm xúc trong mối quan hệ. Nó báo hiệu rằng sự dịu dàng và lòng trắc ẩn sẽ giúp mối quan hệ phát triển.",
    reversed:"10.  Câu Hỏi Thường Gặp Khi Trải Bài Tarot và Lá Strength Xuất Hiện 10.",
    aspects:{
      love:{up:"Strength đại diện cho sự cân bằng và khả năng chế ngự cảm xúc trong mối quan hệ. Nó báo hiệu rằng sự dịu dàng và lòng trắc ẩn sẽ giúp mối quan hệ phát triển.",rev:"Lá bài cảnh báo về sự mất cân bằng cảm xúc hoặc cảm giác thiếu tự tin trong mối quan hệ.  Có thể bạn hoặc đối phương đang cố gắng kiểm soát quá mức hoặc không kiên nhẫn với nhau."},
      career:{up:"Lá bài báo hiệu bạn cần kiên nhẫn và sử dụng sức mạnh nội tại để đối mặt với thử thách. Nó cũng nhấn mạnh tầm quan trọng của việc duy trì sự tự tin và kiểm soát tình huống để đạt được thành công.",rev:"Cảnh báo bạn có thể đang thiếu kiên nhẫn hoặc cảm thấy bị áp lực quá mức trong công việc.  Đây là lúc cần điều chỉnh thái độ và chiến lược."},
      finance:{up:"Lá bài cho thấy rằng bạn cần có lòng kiên nhẫn và sự tự kiểm soát trong việc quản lý tài chính. Nó báo hiệu khả năng vượt qua khó khăn và đạt được sự ổn định tài chính.",rev:""},
      health:{up:"Lá bài báo hiệu bạn đang có sức khỏe tốt hoặc sẵn sàng vượt qua các thử thách về thể chất và tinh thần. Nó cũng khuyến khích bạn duy trì lối sống lành mạnh và tinh thần lạc quan.",rev:"Cảnh báo về việc bạn có thể đang lạm dụng sức khỏe hoặc không chăm sóc bản thân đầy đủ.  Hãy chú ý hơn đến cơ thể và tinh thần của mình."},
      spiritual:{up:"Strength đại diện cho sự cân bằng và khả năng chế ngự cảm xúc trong mối quan hệ.",rev:"10."}
    },
    advice:"", numerology:"VIII"
  },
  {
    id:9, name:"The Hermit", nameVi:"Ẩn Sĩ", number:"IX",
    arcana:"major", image:"cards/9-The-Hermit.jpg",
    planet:"Sao Thủy", zodiac:"Xử Nữ",
    keywords:["Tìm kiếm sự thật","Cô đơn","Tĩnh lặng","Tự soi xét","Sáng suốt","Trí tuệ nội tại","Tự khám phá","Độc lập"], keywordsRev:[],
    upright:"The Hermit trong sức khỏe có thể ám chỉ việc bạn cần phải dành thời gian một mình để chăm sóc bản thân, có thể là nghỉ ngơi hoặc tìm kiếm sự chữa lành về mặt tinh thần. Lá bài này nhắc nhở bạn chú ý đến các tín hiệu cơ thể và tâm trí.",
    reversed:"Lá bài ngược có thể chỉ ra sự cô đơn kéo dài hoặc tình trạng tránh né cảm xúc.  Bạn có thể đang bỏ qua những tín hiệu từ trái tim mình, hoặc cảm giác lạc lõng trong một mối quan hệ.",
    aspects:{
      love:{up:"The Hermit trong sức khỏe có thể ám chỉ việc bạn cần phải dành thời gian một mình để chăm sóc bản thân, có thể là nghỉ ngơi hoặc tìm kiếm sự chữa lành về mặt tinh thần. Lá bài này nhắc nhở bạn chú ý đến các tín hiệu cơ thể và tâm trí.",rev:"Lá bài ngược có thể chỉ ra sự cô đơn kéo dài hoặc tình trạng tránh né cảm xúc.  Bạn có thể đang bỏ qua những tín hiệu từ trái tim mình, hoặc cảm giác lạc lõng trong một mối quan hệ."},
      career:{up:"The Hermit trong sức khỏe có thể ám chỉ việc bạn cần phải dành thời gian một mình để chăm sóc bản thân, có thể là nghỉ ngơi hoặc tìm kiếm sự chữa lành về mặt tinh thần. Lá bài này nhắc nhở bạn chú ý đến các tín hiệu cơ thể và tâm trí.",rev:"Cảnh báo về việc bạn có thể đang tránh né những vấn đề cần giải quyết trong công việc hoặc không đủ quyết đoán.  Có thể bạn đang cảm thấy mất phương hướng và cần tìm lại sự tự tin."},
      finance:{up:"Trong tài chính, The Hermit ám chỉ việc bạn có thể cần thời gian để làm việc độc lập, suy nghĩ kỹ lưỡng và có chiến lược rõ ràng. Đây là lúc để bạn xem xét lại các quyết định tài chính và tìm kiếm sự sáng suốt trước khi hành động.",rev:""},
      health:{up:"The Hermit trong sức khỏe có thể ám chỉ việc bạn cần phải dành thời gian một mình để chăm sóc bản thân, có thể là nghỉ ngơi hoặc tìm kiếm sự chữa lành về mặt tinh thần. Lá bài này nhắc nhở bạn chú ý đến các tín hiệu cơ thể và tâm trí.",rev:"Nếu lá bài ngược xuất hiện, có thể bạn đang cảm thấy cô đơn hoặc mất kết nối với chính mình.  Cần chú ý đến sức khỏe tinh thần và không nên quá tách biệt khỏi những người xung quanh."},
      spiritual:{up:"The Hermit trong sức khỏe có thể ám chỉ việc bạn cần phải dành thời gian một mình để chăm sóc bản thân, có thể là nghỉ ngơi hoặc tìm kiếm sự chữa lành về mặt tinh thần.",rev:"Lá bài ngược có thể chỉ ra sự cô đơn kéo dài hoặc tình trạng tránh né cảm xúc."}
    },
    advice:"", numerology:"IX"
  },
  {
    id:10, name:"Wheel of Fortune", nameVi:"Bánh Xe Số Phận", number:"X",
    arcana:"major", image:"cards/10-Wheel-of-Fortune.jpg",
    planet:"Sao Mộc", zodiac:"Nhân Mã",
    keywords:["Thay đổi","Chu kỳ","Vận mệnh","Cơ hội","Vòng xoay cuộc sống","May mắn","Định mệnh","Biến động"], keywordsRev:[],
    upright:"Lá bài báo hiệu một giai đoạn thay đổi trong mối quan hệ. Đây có thể là cơ hội để mối quan hệ tiến lên mức độ mới, hoặc mang lại sự thay đổi tích cực trong tình yêu.",
    reversed:"Lá bài ngược cảnh báo về sự không ổn định hoặc những thay đổi bất ngờ trong mối quan hệ.  Hãy cẩn thận với các quyết định vội vàng hoặc phụ thuộc quá nhiều vào sự may mắn.",
    aspects:{
      love:{up:"Lá bài báo hiệu một giai đoạn thay đổi trong mối quan hệ. Đây có thể là cơ hội để mối quan hệ tiến lên mức độ mới, hoặc mang lại sự thay đổi tích cực trong tình yêu.",rev:"Lá bài ngược cảnh báo về sự không ổn định hoặc những thay đổi bất ngờ trong mối quan hệ.  Hãy cẩn thận với các quyết định vội vàng hoặc phụ thuộc quá nhiều vào sự may mắn."},
      career:{up:"Lá bài báo hiệu cơ hội lớn trong công việc, có thể là một sự thăng tiến, thay đổi công việc hoặc một dự án quan trọng. Đây là thời điểm để bạn tận dụng vận may và nỗ lực hết mình.",rev:"Cảnh báo về sự không chắc chắn hoặc những thay đổi bất ngờ có thể gây khó khăn.  Hãy cẩn thận với các quyết định và luôn chuẩn bị sẵn kế hoạch dự phòng."},
      finance:{up:"Lá bài báo hiệu một giai đoạn thịnh vượng hoặc cơ hội tài chính lớn. Đây là thời điểm tốt để đầu tư hoặc thử nghiệm các cơ hội mới.",rev:""},
      health:{up:"Wheel of Fortune báo hiệu một giai đoạn tích cực về sức khỏe. Nếu bạn đang gặp vấn đề, lá bài cho thấy sức khỏe của bạn sẽ cải thiện trong thời gian tới.",rev:"Cảnh báo về sự bất ổn trong sức khỏe, có thể là những vấn đề bất ngờ.  Hãy chú ý đến các dấu hiệu cơ thể và đừng lơ là việc chăm sóc bản thân."},
      spiritual:{up:"Lá bài báo hiệu một giai đoạn thay đổi trong mối quan hệ.",rev:"Lá bài ngược cảnh báo về sự không ổn định hoặc những thay đổi bất ngờ trong mối quan hệ."}
    },
    advice:"", numerology:"X"
  },
  {
    id:11, name:"Justice", nameVi:"Công Lý", number:"XI",
    arcana:"major", image:"cards/11-Justice.jpg",
    planet:"Sao Kim", zodiac:"Thiên Bình",
    keywords:["Công lý","Cân bằng","Sự thật","Trách nhiệm","Đạo đức","Quyết định","Nhân quả"], keywordsRev:[],
    upright:"Xuất hiện trong mối quan hệ: Lá bài nhắc nhở rằng tình yêu cần được xây dựng dựa trên sự trung thực và công bằng. Đối tác cần biết lắng nghe và thấu hiểu lẫn nhau.",
    reversed:"năng lượng Justice bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Xuất hiện trong mối quan hệ: Lá bài nhắc nhở rằng tình yêu cần được xây dựng dựa trên sự trung thực và công bằng. Đối tác cần biết lắng nghe và thấu hiểu lẫn nhau.",rev:""},
      career:{up:"Lá bài này khuyên bạn cần có sự trung thực và công bằng trong các quyết định tại nơi làm việc. Nếu bạn đang đối diện với một cuộc đánh giá hay phán xét, lá bài báo hiệu rằng kết quả sẽ đến từ những gì bạn xứng đáng.",rev:""},
      finance:{up:"Lá bài Justice đại diện cho sự minh bạch và cẩn trọng trong các vấn đề tài chính. Hãy đảm bảo rằng bạn đang xử lý tiền bạc một cách hợp pháp và có trách nhiệm.",rev:""},
      health:{up:"Lá bài Justice nhắc nhở bạn rằng sức khỏe của bạn là kết quả từ những gì bạn ăn uống, cách bạn tập luyện và chăm sóc bản thân. Hãy duy trì lối sống cân bằng để cải thiện tình trạng sức khỏe.",rev:""},
      spiritual:{up:"Xuất hiện trong mối quan hệ: Lá bài nhắc nhở rằng tình yêu cần được xây dựng dựa trên sự trung thực và công bằng.",rev:"Khi ngược: năng lượng Justice bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Justice là biểu tượng mạnh mẽ về công lý, sự thật và trách nhiệm. Nó nhắc nhở chúng ta rằng mọi hành động đều có hậu quả và rằng sự trung thực sẽ luôn được đền đáp.", numerology:"XI"
  },
  {
    id:12, name:"The Hanged Man", nameVi:"Người Bị Treo", number:"XII",
    arcana:"major", image:"cards/12-The-Hanged-Man.jpg",
    planet:"Sao Hải Vương", zodiac:"Song Ngư",
    keywords:["Hy sinh","Chấp nhận","Buông bỏ","Thay đổi quan điểm","Tạm dừng","Nhìn nhận lại","Giác ngộ","Trì hoãn có mục đích"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này thường xuất hiện khi một mối quan hệ đang trong giai đoạn bế tắc. Nó khuyên bạn nên tạm dừng và đánh giá lại mối quan hệ từ một góc nhìn mới.",
    reversed:"Dây treo: Thể hiện sự kết nối với hoàn cảnh hiện tại, không phải sự cưỡng ép mà là sự tự nguyện.  Ánh hào quang xung quanh đầu: Biểu tượng của sự giác ngộ, hiểu biết và nhận thức cao hơn.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này thường xuất hiện khi một mối quan hệ đang trong giai đoạn bế tắc. Nó khuyên bạn nên tạm dừng và đánh giá lại mối quan hệ từ một góc nhìn mới.",rev:""},
      career:{up:"Lá bài này thường biểu thị một giai đoạn trì hoãn hoặc đình trệ trong sự nghiệp. Tuy nhiên, đây là thời điểm để nhìn nhận lại mục tiêu và cân nhắc những thay đổi cần thiết.",rev:""},
      finance:{up:"Trong lĩnh vực tài chính, lá bài này khuyên bạn nên tạm ngừng các quyết định lớn liên quan đến tiền bạc. Hãy nhìn nhận lại cách bạn đang quản lý tài chính và tránh những rủi ro không cần thiết.",rev:""},
      health:{up:"The Hanged Man kêu gọi bạn cần phải dành thời gian nghỉ ngơi và phục hồi. Nếu bạn đang đối mặt với vấn đề sức khỏe, lá bài nhắc nhở bạn nên thay đổi lối sống hoặc thói quen để cải thiện tình trạng hiện tại.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này thường xuất hiện khi một mối quan hệ đang trong giai đoạn bế tắc.",rev:"Dây treo: Thể hiện sự kết nối với hoàn cảnh hiện tại, không phải sự cưỡng ép mà là sự tự nguyện."}
    },
    advice:"Lá bài The Hanged Man là biểu tượng của sự hy sinh, buông bỏ và thay đổi quan điểm để đạt được sự giác ngộ. Nó nhắc nhở chúng ta rằng không phải mọi trì hoãn đều là thất bại, mà đôi khi, đó là bước chuẩn bị cần thiết để tiến lên.", numerology:"XII"
  },
  {
    id:13, name:"Death", nameVi:"Cái Chết", number:"XIII",
    arcana:"major", image:"cards/13-Death.jpg",
    planet:"Sao Hỏa", zodiac:"Thiên Yết",
    keywords:["Kết thúc","Chuyển đổi","Tái sinh","Buông bỏ","Sự thay đổi","Cơ hội mới","Biến đổi sâu sắc"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này có thể biểu thị sự kết thúc của một mối quan hệ không còn phù hợp hoặc một giai đoạn cũ trong mối quan hệ cần được thay thế bằng sự hiểu biết mới. Dành cho người độc thân: Lá bài Death khuyến khích bạn buông bỏ quá khứ, chẳng hạn như những tổn thươn",
    reversed:"năng lượng Death bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này có thể biểu thị sự kết thúc của một mối quan hệ không còn phù hợp hoặc một giai đoạn cũ trong mối quan hệ cần được thay thế bằng sự hiểu biết mới. Dành cho người độc thân: Lá bài Death khuyến khích bạn buông bỏ quá khứ, chẳng hạn như những tổn thươn",rev:""},
      career:{up:"Lá bài Death có thể báo hiệu sự kết thúc một công việc hoặc dự án. Tuy nhiên, đây không phải là điều tiêu cực, vì nó mở ra cơ hội mới để phát triển sự nghiệp.",rev:""},
      finance:{up:"Lá bài Death cảnh báo rằng một giai đoạn khó khăn tài chính có thể kết thúc, hoặc",rev:""},
      health:{up:"Lá bài Death nhấn mạnh tầm quan trọng của việc buông bỏ lối sống không lành mạnh. Đây là lúc để thực hiện những thay đổi tích cực như từ bỏ thói quen xấu hoặc bắt đầu một chế độ chăm sóc sức khỏe mới.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này có thể biểu thị sự kết thúc của một mối quan hệ không còn phù hợp hoặc một giai đoạn cũ trong mối quan hệ cần được thay thế bằng sự hiểu biết mới.",rev:"Khi ngược: năng lượng Death bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Death không chỉ biểu thị sự kết thúc mà còn là biểu tượng của sự tái sinh và thay đổi tích cực. Dù hình ảnh lá bài có vẻ đáng sợ, thông điệp mà nó mang lại là đầy hy vọng: buông bỏ cái cũ để đón nhận cái mới.", numerology:"XIII"
  },
  {
    id:14, name:"Temperance", nameVi:"Điều Độ", number:"XIV",
    arcana:"major", image:"cards/14-Temperance.jpg",
    planet:"Sao Mộc", zodiac:"Nhân Mã",
    keywords:["Cân bằng","Hòa hợp","Điều độ","Kiên nhẫn","Phối hợp","Chữa lành","Tinh thần dung hòa","Lý trí và cảm xúc"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này mang thông điệp về sự hòa hợp và cân bằng trong mối quan hệ. Hai người cần học cách dung hòa sự khác biệt và kiên nhẫn để xây dựng mối quan hệ bền vững.",
    reversed:"năng lượng Temperance bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này mang thông điệp về sự hòa hợp và cân bằng trong mối quan hệ. Hai người cần học cách dung hòa sự khác biệt và kiên nhẫn để xây dựng mối quan hệ bền vững.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này nhấn mạnh tầm quan trọng của việc duy trì sự cân bằng giữa công việc và cuộc sống cá nhân. Nó cũng khuyên bạn nên phối hợp nhịp nhàng giữa các nguồn lực để đạt được mục tiêu.",rev:""},
      finance:{up:"Temperance gợi ý rằng bạn cần phải điều chỉnh cách chi tiêu và quản lý tài chính của mình. Hãy tránh những khoản chi tiêu thái quá hoặc quá tiết kiệm mà không nghĩ đến chất lượng cuộc sống.",rev:""},
      health:{up:"Lá bài Temperance khuyến khích bạn điều chỉnh thói quen sinh hoạt và cân bằng giữa tâm lý và thể chất. Đây là lời nhắc nhở để tập trung vào việc duy trì sức khỏe lâu dài thay vì tìm kiếm những giải pháp tạm thời.",rev:""},
      spiritual:{up:"6. Ý nghĩa của lá bài Temperance trong các khía cạnh cuộc sống",rev:""}
    },
    advice:"Lá bài Temperance là biểu tượng của sự cân bằng, điều độ và hòa hợp. Khi xuất hiện trong trải bài, nó mang đến thông điệp tích cực về cách duy trì sự ổn định và phát triển thông qua sự kiên nhẫn và phối hợp.", numerology:"XIV"
  },
  {
    id:15, name:"The Devil", nameVi:"Ác Quỷ", number:"XV",
    arcana:"major", image:"cards/15-The-Devil.jpg",
    planet:"Sao Thổ", zodiac:"Ma Kết",
    keywords:["Ràng buộc","Cám dỗ","Phụ thuộc","Ám ảnh","Sự kiểm soát","Thói quen xấu","Vật chất","Sợ hãi"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài The Devil có thể chỉ ra một mối quan hệ dựa trên sự kiểm soát, phụ thuộc hoặc cám dỗ tiêu cực. Nó cảnh báo về sự mất cân bằng quyền lực, sự ghen tuông hoặc ám ảnh không lành mạnh.",
    reversed:"năng lượng The Devil bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài The Devil có thể chỉ ra một mối quan hệ dựa trên sự kiểm soát, phụ thuộc hoặc cám dỗ tiêu cực. Nó cảnh báo về sự mất cân bằng quyền lực, sự ghen tuông hoặc ám ảnh không lành mạnh.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài có thể ám chỉ bạn đang bị mắc kẹt trong một công việc không mang lại hạnh phúc hoặc đang quá ám ảnh với tham vọng mà bỏ qua những giá trị khác trong cuộc sống. Gợi ý hành động: Đừng để công việc hoặc tiền bạc kiểm soát bạn.",rev:""},
      finance:{up:"Lá bài này có thể chỉ ra sự ám ảnh với vật chất hoặc nợ nần. Bạn có thể đang bị ràng buộc bởi những khoản chi tiêu vượt tầm kiểm soát hoặc bị ám ảnh với việc kiếm tiền mà quên đi các giá trị khác.",rev:""},
      health:{up:"Lá bài The Devil cảnh báo về sự phụ thuộc vào các thói quen xấu như ăn uống không lành mạnh, lạm dụng chất kích thích hoặc suy nghĩ tiêu cực. Nó khuyến khích bạn đối mặt và thay đổi lối sống để cải thiện sức khỏe.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài The Devil có thể chỉ ra một mối quan hệ dựa trên sự kiểm soát, phụ thuộc hoặc cám dỗ tiêu cực.",rev:"Khi ngược: năng lượng The Devil bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài The Devil trong Tarot không chỉ là một biểu tượng của bóng tối và tiêu cực mà còn là lời nhắc nhở bạn cần đối mặt và giải phóng bản thân khỏi những ràng buộc không cần thiết. Lá bài này khuyến khích bạn nhận thức rõ hơn về các thói quen, mối quan hệ và tư duy đang kìm hãm", numerology:"XV"
  },
  {
    id:16, name:"The Tower", nameVi:"Ngọn Tháp", number:"XVI",
    arcana:"major", image:"cards/16-The-Tower.jpg",
    planet:"Sao Hỏa", zodiac:"—",
    keywords:["Thay đổi đột ngột","Sụp đổ","Biến cố","Giải phóng","Khủng hoảng","Đánh thức","Sự thật lộ diện","Khởi đầu mới"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài có thể ám chỉ một sự kiện lớn hoặc thay đổi bất ngờ trong mối quan hệ, chẳng hạn như xung đột lớn, chia tay, hoặc sự thật được lộ diện. Dù đau đớn, nhưng điều này cần thiết để xây dựng một nền tảng lành mạnh hơn.",
    reversed:"năng lượng The Tower bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài có thể ám chỉ một sự kiện lớn hoặc thay đổi bất ngờ trong mối quan hệ, chẳng hạn như xung đột lớn, chia tay, hoặc sự thật được lộ diện. Dù đau đớn, nhưng điều này cần thiết để xây dựng một nền tảng lành mạnh hơn.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này có thể báo hiệu sự sụp đổ của một dự án hoặc mất việc. Tuy nhiên, nó cũng cho thấy cơ hội để bạn bắt đầu một con đường mới phù hợp hơn.",rev:""},
      finance:{up:"Tài chính: Lá bài này cảnh báo về những khủng hoảng tài chính hoặc sự mất mát đột ngột, chẳng hạn như một khoản nợ lớn hoặc đầu tư thất bại. Tuy nhiên, nó cũng thúc đẩy bạn tìm cách quản lý tài chính hiệu quả hơn.",rev:""},
      health:{up:"The Tower có thể chỉ ra một cú sốc hoặc vấn đề sức khỏe bất ngờ. Tuy nhiên, điều này có thể là cơ hội để bạn nhận ra sự cần thiết của việc thay đổi lối sống hoặc chăm sóc bản thân tốt hơn.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài có thể ám chỉ một sự kiện lớn hoặc thay đổi bất ngờ trong mối quan hệ, chẳng hạn như xung đột lớn, chia tay, hoặc sự thật được lộ diện.",rev:"Khi ngược: năng lượng The Tower bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài The Tower là biểu tượng của sự sụp đổ nhưng đồng thời cũng là sự giải phóng và tái sinh. Dù mang lại cảm giác đau đớn và hỗn loạn, lá bài này khuyến khích bạn đối mặt với sự thay đổi, buông bỏ những điều không còn phù hợp và xây dựng lại từ đầu.", numerology:"XVI"
  },
  {
    id:17, name:"The Star", nameVi:"Ngôi Sao", number:"XVII",
    arcana:"major", image:"cards/17-The-Star.jpg",
    planet:"Sao Thiên Vương", zodiac:"Bảo Bình",
    keywords:["Hy vọng","Chữa lành","Cảm hứng","Sáng tạo","Tái sinh","Sự hướng dẫn tâm linh","Tin tưởng","Bình yên"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài The Star tượng trưng cho sự hy vọng và chữa lành trong tình yêu. Nó khuyến khích bạn hãy tin tưởng vào mối quan hệ của mình, dù có thể hiện tại đang gặp khó khăn.",
    reversed:"năng lượng The Star bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài The Star tượng trưng cho sự hy vọng và chữa lành trong tình yêu. Nó khuyến khích bạn hãy tin tưởng vào mối quan hệ của mình, dù có thể hiện tại đang gặp khó khăn.",rev:""},
      career:{up:"Trong sự nghiệp: The Star mang lại cảm giác sáng tạo và sự đổi mới. Đây là thời điểm lý tưởng để bạn tập trung vào các ý tưởng mới hoặc tìm kiếm cảm hứng trong công việc.",rev:""},
      finance:{up:"Tài chính: Lá bài này cho thấy một giai đoạn tài chính ổn định hoặc đang dần cải thiện. Nó cũng khuyến khích bạn đặt niềm tin vào các kế hoạch dài hạn.",rev:""},
      health:{up:"Lá bài The Star là một tín hiệu tích cực, báo hiệu sự hồi phục và chữa lành. Nó cho thấy rằng bạn đang trên con đường cải thiện sức khỏe cả về thể chất lẫn tinh thần.",rev:""},
      spiritual:{up:"Tin tưởng Bình yên 5. Phân tích chi tiết các chi tiết trong lá bài The Star Người phụ nữ đổ nước: Hình ảnh này tượng trưng cho sự hào phóng và lưu chuyển năng lượng.",rev:""}
    },
    advice:"Từ khóa trong công việc: Cảm hứng, đổi mới, sáng tạo.", numerology:"XVII"
  },
  {
    id:18, name:"The Moon", nameVi:"Mặt Trăng", number:"XVIII",
    arcana:"major", image:"cards/18-The-Moon.jpg",
    planet:"Mặt Trăng", zodiac:"Song Ngư",
    keywords:["Mơ hồ","Trực giác","Ảo tưởng","Tiềm thức","Sợ hãi","Bí mật","Hành trình tâm linh","Tìm kiếm sự thật"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài The Moon có thể ám chỉ sự mơ hồ hoặc hiểu lầm trong mối quan hệ. Nó cũng cảnh báo về những bí mật hoặc cảm xúc bị che giấu.",
    reversed:"năng lượng The Moon bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài The Moon có thể ám chỉ sự mơ hồ hoặc hiểu lầm trong mối quan hệ. Nó cũng cảnh báo về những bí mật hoặc cảm xúc bị che giấu.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài The Moon biểu thị một giai đoạn không chắc chắn trong công việc. Có thể bạn đang đối mặt với những thông tin sai lệch hoặc cảm giác không rõ ràng về hướng đi của mình.",rev:""},
      finance:{up:"Tài chính: Lá bài The Moon cảnh báo về sự không rõ ràng hoặc rủi ro trong các vấn đề tài chính. Có thể bạn đang bị cuốn vào những khoản đầu tư không minh bạch hoặc có hiểu lầm về tình hình tài chính của mình.",rev:""},
      health:{up:"Lá bài The Moon có thể chỉ ra những vấn đề sức khỏe tâm lý hoặc cảm xúc chưa được giải quyết. Đây là lời nhắc nhở bạn nên dành thời gian để khám phá và chữa lành những nỗi sợ hoặc căng thẳng bên trong.",rev:""},
      spiritual:{up:"Tìm kiếm sự thật 5. Phân tích chi tiết các chi tiết trong lá bài The Moon Mặt trăng: Biểu tượng của sự huyền bí, trực giác, và những điều ẩn giấu trong bóng tối.",rev:""}
    },
    advice:"Từ khóa trong tài chính: Rủi ro, không rõ ràng, thận trọng.", numerology:"XVIII"
  },
  {
    id:19, name:"The Sun", nameVi:"Mặt Trời", number:"XIX",
    arcana:"major", image:"cards/19-The-Sun.jpg",
    planet:"Mặt Trời", zodiac:"Sư Tử",
    keywords:["Thành công","Niềm vui","Sự rõ ràng","Tinh thần tích cực","Hạnh phúc","Năng lượng","Sự thật","Khám phá bản thân"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài The Sun báo hiệu một giai đoạn hạnh phúc và viên mãn trong tình yêu. Nếu bạn đang ở trong một mối quan hệ, lá bài này cho thấy sự kết nối mạnh mẽ và niềm vui chung.",
    reversed:"năng lượng The Sun bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài The Sun báo hiệu một giai đoạn hạnh phúc và viên mãn trong tình yêu. Nếu bạn đang ở trong một mối quan hệ, lá bài này cho thấy sự kết nối mạnh mẽ và niềm vui chung.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài The Sun là một tín hiệu tích cực, cho thấy bạn đang đạt được thành công hoặc sắp nhận được sự công nhận. Đây là lúc bạn thể hiện tài năng và tận hưởng thành quả lao động của mình.",rev:""},
      finance:{up:"Tài chính: Lá bài The Sun báo hiệu một giai đoạn tài chính thịnh vượng và ổn định. Nếu bạn đang đầu tư hoặc bắt đầu dự án mới, lá bài này cho thấy cơ hội thành công lớn.",rev:""},
      health:{up:"Lá bài The Sun mang thông điệp về sức khỏe dồi dào và tinh thần phấn chấn. Nó cũng cho thấy sự hồi phục nhanh chóng nếu bạn đang đối mặt với các vấn đề sức khỏe.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài The Sun báo hiệu một giai đoạn hạnh phúc và viên mãn trong tình yêu.",rev:"Khi ngược: năng lượng The Sun bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Thịnh vượng, cơ hội lớn, sự ổn định.", numerology:"XIX"
  },
  {
    id:20, name:"Judgement", nameVi:"Phán Xét", number:"XX",
    arcana:"major", image:"cards/20-Judgement.jpg",
    planet:"Sao Hỏa", zodiac:"Thiên Yết",
    keywords:["Tái sinh","Thức tỉnh","Phán xét","Quyết định lớn","Thay đổi","Buông bỏ quá khứ","Sự thật","Kết thúc và khởi đầu mới"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này khuyến khích bạn nhìn nhận lại mối quan hệ hiện tại. Đây có thể là thời điểm để đưa ra quyết định quan trọng, chẳng hạn như cam kết sâu hơn hoặc kết thúc mối quan hệ không còn phù hợp.",
    reversed:"năng lượng Judgement bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này khuyến khích bạn nhìn nhận lại mối quan hệ hiện tại. Đây có thể là thời điểm để đưa ra quyết định quan trọng, chẳng hạn như cam kết sâu hơn hoặc kết thúc mối quan hệ không còn phù hợp.",rev:""},
      career:{up:"Trong sự nghiệp: The Judgement báo hiệu một giai đoạn chuyển đổi hoặc đánh giá trong công việc. Đây là thời điểm để bạn xem xét lại định hướng sự nghiệp và đưa ra quyết định táo bạo nhưng cần thiết.",rev:""},
      finance:{up:"Tài chính: The Judgement cho thấy rằng bạn cần đánh giá lại các quyết định tài chính trước đây. Có thể bạn sắp nhận được một cơ hội lớn, hoặc bạn cần cân nhắc kỹ lưỡng trước khi đưa ra quyết định quan trọng.",rev:""},
      health:{up:"Lá bài này báo hiệu một sự hồi phục hoặc sự tỉnh thức về sức khỏe. Nó khuyến khích bạn chăm sóc cơ thể và tinh thần một cách nghiêm túc hơn.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này khuyến khích bạn nhìn nhận lại mối quan hệ hiện tại.",rev:"Khi ngược: năng lượng Judgement bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài The Judgement là biểu tượng của sự tái sinh, thức tỉnh và những quyết định mang tính thay đổi lớn. Dù trong tình yêu, công việc, sức khỏe hay tài chính, lá bài này kêu gọi bạn đánh giá lại quá khứ, học từ những kinh nghiệm đã qua và chuẩn bị cho một khởi đầu mới.", numerology:"XX"
  },
  {
    id:21, name:"The World", nameVi:"Thế Giới", number:"XXI",
    arcana:"major", image:"cards/21-The-World.jpg",
    planet:"Sao Thổ", zodiac:"Ma Kết",
    keywords:["Hoàn thành","Thành tựu","Sự toàn vẹn","Kết thúc chu kỳ","Kết nối toàn cầu","Thành công lớn","Khởi đầu mới","Hài hòa"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này cho thấy sự viên mãn và hài hòa trong tình yêu. Nếu bạn đang ở trong một mối quan hệ, nó báo hiệu sự phát triển, cam kết lâu dài hoặc thậm chí kết hôn.",
    reversed:"năng lượng The World bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này cho thấy sự viên mãn và hài hòa trong tình yêu. Nếu bạn đang ở trong một mối quan hệ, nó báo hiệu sự phát triển, cam kết lâu dài hoặc thậm chí kết hôn.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài The World báo hiệu rằng bạn đang hoặc sắp đạt được một thành tựu lớn trong công việc, chẳng hạn như hoàn thành dự án, thăng chức hoặc đạt được mục tiêu quan trọng. Gợi ý hành động: Hãy tự hào về những gì bạn đã đạt được và chuẩn bị sẵn sàng cho những thử",rev:""},
      finance:{up:"Tài chính: Lá bài The World cho thấy tài chính của bạn đang hoặc sẽ đạt đến sự ổn định và thịnh vượng. Đây là thời điểm tốt để đầu tư hoặc mở rộng quy mô kinh doanh.",rev:""},
      health:{up:"Lá bài The World báo hiệu một giai đoạn sức khỏe ổn định và cân bằng. Nếu bạn đang điều trị bệnh, lá bài này mang đến thông điệp về sự hồi phục toàn diện.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này cho thấy sự viên mãn và hài hòa trong tình yêu.",rev:"Khi ngược: năng lượng The World bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Thành công tài chính, đầu tư hiệu quả, ổn định.", numerology:"XXI"
  },
  {
    id:22, name:"Ace of Wands", nameVi:"Át Gậy", number:"A",
    arcana:"minor", image:"cards/22-Ace-of-Wands.jpg",
    planet:"", zodiac:"",
    keywords:["Khởi đầu mới","Cảm hứng","Sáng tạo","Năng lượng","Đam mê","Động lực","Hành động","Tiềm năng"], keywordsRev:[],
    upright:"Trong mối quan hệ: Ace of Wands mang đến năng lượng đam mê và sự khởi đầu mới trong tình yêu. Nó biểu thị sự hứng khởi, cảm giác mới mẻ và sức hút mạnh mẽ giữa hai người.",
    reversed:"năng lượng Ace of Wands bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Ace of Wands mang đến năng lượng đam mê và sự khởi đầu mới trong tình yêu. Nó biểu thị sự hứng khởi, cảm giác mới mẻ và sức hút mạnh mẽ giữa hai người.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này đại diện cho cơ hội nghề nghiệp mới, dự án sáng tạo hoặc sự bùng nổ ý tưởng. Đây là thời điểm lý tưởng để khởi đầu một dự án hoặc kế hoạch mà bạn đã ấp ủ.",rev:""},
      finance:{up:"Tài chính: Ace of Wands báo hiệu cơ hội tài chính mới hoặc nguồn cảm hứng để cải thiện tình hình tài chính. Đây cũng là lúc thích hợp để đầu tư vào ý tưởng hoặc dự án tiềm năng.",rev:""},
      health:{up:"Lá bài Ace of Wands biểu thị sự tái sinh năng lượng và sức sống. Nếu bạn đang gặp vấn đề về sức khỏe, lá bài này mang đến thông điệp về sự hồi phục và một giai đoạn tích cực hơn.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Ace of Wands mang đến năng lượng đam mê và sự khởi đầu mới trong tình yêu.",rev:"Khi ngược: năng lượng Ace of Wands bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Cơ hội, đầu tư, tăng trưởng.", numerology:"A"
  },
  {
    id:23, name:"Two of Wands", nameVi:"Hai Gậy", number:"2",
    arcana:"minor", image:"cards/23-Two-of-Wands.jpg",
    planet:"", zodiac:"",
    keywords:["Kế hoạch","Tầm nhìn","Đánh giá","Tham vọng","Quyết định","Suy nghĩ chiến lược","Cơ hội","Chuẩn bị"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài Two of Wands có thể đại diện cho việc đánh giá lại mối quan hệ hiện tại và suy nghĩ về tương lai. Bạn và đối tác có thể đang cân nhắc về những bước đi lớn như cam kết sâu hơn hoặc khám phá các khả năng mới trong mối quan hệ.",
    reversed:"năng lượng Two of Wands bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài Two of Wands có thể đại diện cho việc đánh giá lại mối quan hệ hiện tại và suy nghĩ về tương lai. Bạn và đối tác có thể đang cân nhắc về những bước đi lớn như cam kết sâu hơn hoặc khám phá các khả năng mới trong mối quan hệ.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này biểu thị giai đoạn lên kế hoạch cho các dự án lớn hoặc mở rộng lĩnh vực nghề nghiệp. Nó khuyến khích bạn suy nghĩ xa hơn và không ngại khám phá những cơ hội mới, đặc biệt trong các lĩnh vực quốc tế hoặc mở rộng quy mô công việc.",rev:""},
      finance:{up:"Tài chính: Lá bài này biểu thị rằng bạn đang ở một vị trí tốt để cân nhắc các lựa chọn tài chính hoặc đầu tư. Hãy đánh giá kỹ lưỡng và lập kế hoạch cẩn thận để đảm bảo lợi nhuận lâu dài.",rev:""},
      health:{up:"Two of Wands cho thấy rằng bạn đang trong giai đoạn cân nhắc hoặc đánh giá lại sức khỏe của mình. Bạn có thể đang lên kế hoạch cho một lối sống lành mạnh hơn hoặc tìm kiếm các phương pháp cải thiện sức khỏe dài hạn.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài Two of Wands có thể đại diện cho việc đánh giá lại mối quan hệ hiện tại và suy nghĩ về tương lai.",rev:"Khi ngược: năng lượng Two of Wands bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Đầu tư, lập kế hoạch, đánh giá cơ hội.", numerology:"2"
  },
  {
    id:24, name:"Three of Wands", nameVi:"Ba Gậy", number:"3",
    arcana:"minor", image:"cards/24-Three-of-Wands.jpg",
    planet:"", zodiac:"",
    keywords:["Mở rộng","Khám phá","Tầm nhìn xa","Kế hoạch dài hạn","Kỳ vọng","Phát triển","Hợp tác","Kết quả sắp đến"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này cho thấy mối quan hệ đang bước vào giai đoạn ổn định hơn và có tiềm năng mở rộng, chẳng hạn như kế hoạch chung cho tương lai hoặc cam kết sâu sắc hơn. Dành cho người độc thân: Lá bài khuyến khích bạn mở lòng và khám phá những mối quan hệ mới.",
    reversed:"năng lượng Three of Wands bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này cho thấy mối quan hệ đang bước vào giai đoạn ổn định hơn và có tiềm năng mở rộng, chẳng hạn như kế hoạch chung cho tương lai hoặc cam kết sâu sắc hơn. Dành cho người độc thân: Lá bài khuyến khích bạn mở lòng và khám phá những mối quan hệ mới.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này đại diện cho việc mở rộng dự án, hợp tác hoặc khám phá cơ hội mới. Nó cho thấy bạn đã hoàn thành giai đoạn khởi đầu và hiện đang chờ đợi kết quả từ những nỗ lực ban đầu.",rev:""},
      finance:{up:"Tài chính: Lá bài này báo hiệu sự gia tăng tài chính hoặc lợi nhuận từ những nỗ lực trước đây. Nếu bạn đang đầu tư, lá bài khuyến khích bạn suy nghĩ lớn và tìm kiếm cơ hội mở rộng.",rev:""},
      health:{up:"Lá bài này biểu thị sự tiến bộ tích cực trong sức khỏe. Nếu bạn đang hồi phục từ bệnh tật hoặc cải thiện lối sống, lá bài khẳng định rằng bạn đang đi đúng hướng và sắp đạt được sự cân bằng.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này cho thấy mối quan hệ đang bước vào giai đoạn ổn định hơn và có tiềm năng mở rộng, chẳng hạn như kế hoạch chung cho tương lai hoặc cam kết sâu sắc hơn.",rev:"Khi ngược: năng lượng Three of Wands bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Tăng trưởng, đầu tư, lợi nhuận.", numerology:"3"
  },
  {
    id:25, name:"Four of Wands", nameVi:"Bốn Gậy", number:"4",
    arcana:"minor", image:"cards/25-Four-of-Wands.jpg",
    planet:"", zodiac:"",
    keywords:["Ăn mừng","Thành tựu","Ổn định","Hòa hợp","Niềm vui","Kết nối gia đình","Thành công","Cam kết"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này biểu thị một giai đoạn hạnh phúc và ổn định trong tình yêu. Nó có thể ám chỉ hôn nhân, lễ kỷ niệm hoặc sự gắn bó sâu sắc giữa hai người.",
    reversed:"năng lượng Four of Wands bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này biểu thị một giai đoạn hạnh phúc và ổn định trong tình yêu. Nó có thể ám chỉ hôn nhân, lễ kỷ niệm hoặc sự gắn bó sâu sắc giữa hai người.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này báo hiệu một giai đoạn thành công trong công việc hoặc dự án. Đây có thể là thời điểm để bạn tận hưởng thành quả hoặc bắt đầu một kế hoạch mới với sự tự tin.",rev:""},
      finance:{up:"Tài chính: Lá bài này biểu thị một giai đoạn ổn định và thịnh vượng trong tài chính. Bạn có thể đang ở vị trí tốt để đầu tư hoặc sử dụng tiền bạc để tận hưởng cuộc sống.",rev:""},
      health:{up:"Lá bài này biểu thị sự cân bằng và phục hồi trong sức khỏe. Nó cho thấy bạn đang ở trong một trạng thái tích cực hoặc sắp đạt được sự ổn định trong sức khỏe cả về thể chất lẫn tinh thần.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này biểu thị một giai đoạn hạnh phúc và ổn định trong tình yêu.",rev:"Khi ngược: năng lượng Four of Wands bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Four of Wands là biểu tượng của sự ổn định, niềm vui và thành công. Dù bạn đang ở giai đoạn nào trong cuộc sống, lá bài này nhắc nhở bạn tận hưởng những thành tựu đã đạt được và lên kế hoạch cho tương lai.", numerology:"4"
  },
  {
    id:26, name:"Five of Wands", nameVi:"Năm Gậy", number:"5",
    arcana:"minor", image:"cards/26-Five-of-Wands.jpg",
    planet:"", zodiac:"",
    keywords:["Cạnh tranh","Mâu thuẫn","Thử thách","Sáng tạo","Căng thẳng","Giao tiếp khó khăn","Hợp tác (tiềm năng)","Vượt qua trở ngại"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này có thể chỉ ra những bất đồng, tranh cãi hoặc xung đột giữa hai người. Điều này có thể xuất phát từ những khác biệt trong quan điểm, mong muốn, hoặc cách giao tiếp.",
    reversed:"năng lượng Five of Wands bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này có thể chỉ ra những bất đồng, tranh cãi hoặc xung đột giữa hai người. Điều này có thể xuất phát từ những khác biệt trong quan điểm, mong muốn, hoặc cách giao tiếp.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài cho thấy môi trường làm việc đầy cạnh tranh hoặc xung đột. Bạn có thể đối mặt với sự căng thẳng hoặc tranh chấp với đồng nghiệp.",rev:""},
      finance:{up:"Tài chính: Lá bài biểu thị sự cạnh tranh hoặc khó khăn trong việc quản lý tài chính. Bạn có thể phải đối mặt với những lựa chọn tài chính khó khăn hoặc xung đột về tiền bạc.",rev:""},
      health:{up:"Lá bài này có thể biểu thị sự mất cân bằng hoặc căng thẳng về thể chất lẫn tinh thần. Nó nhắc nhở bạn cần tập trung vào việc giải quyết căng thẳng và tìm kiếm sự cân bằng trong cuộc sống.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này có thể chỉ ra những bất đồng, tranh cãi hoặc xung đột giữa hai người.",rev:"Khi ngược: năng lượng Five of Wands bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Thách thức, cạnh tranh, cần lập kế hoạch.", numerology:"5"
  },
  {
    id:27, name:"Six of Wands", nameVi:"Sáu Gậy", number:"6",
    arcana:"minor", image:"cards/27-Six-of-Wands.jpg",
    planet:"", zodiac:"",
    keywords:["Chiến thắng","Công nhận","Thành công","Tự tin","Danh tiếng","Lãnh đạo","Tự hào","Khen ngợi"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này báo hiệu một giai đoạn thành công và hạnh phúc trong tình yêu. Nếu bạn đang ở trong một mối quan hệ, nó cho thấy rằng cả hai đang tiến tới sự ổn định và sự công nhận từ bạn bè hoặc gia đình.",
    reversed:"năng lượng Six of Wands bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này báo hiệu một giai đoạn thành công và hạnh phúc trong tình yêu. Nếu bạn đang ở trong một mối quan hệ, nó cho thấy rằng cả hai đang tiến tới sự ổn định và sự công nhận từ bạn bè hoặc gia đình.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này đại diện cho thành công và sự công nhận trong công việc. Bạn có thể nhận được sự khen ngợi từ cấp trên hoặc đạt được một cột mốc quan trọng trong sự nghiệp.",rev:""},
      finance:{up:"Tài chính: Lá bài này báo hiệu một giai đoạn tài chính thành công, có thể đến từ việc bạn được công nhận hoặc hưởng lợi từ các khoản đầu tư. Đây là thời điểm để tận dụng sự may mắn nhưng cũng cần duy trì tính cẩn trọng.",rev:""},
      health:{up:"Lá bài này biểu thị sự cải thiện và hồi phục sức khỏe. Nếu bạn đang trải qua một giai đoạn khó khăn về thể chất hoặc tinh thần, lá bài này báo hiệu rằng bạn sẽ vượt qua và cảm thấy mạnh mẽ hơn.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này báo hiệu một giai đoạn thành công và hạnh phúc trong tình yêu.",rev:"Khi ngược: năng lượng Six of Wands bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Thành công tài chính, phần thưởng, ổn định.", numerology:"6"
  },
  {
    id:28, name:"Seven of Wands", nameVi:"Bảy Gậy", number:"7",
    arcana:"minor", image:"cards/28-Seven-of-Wands.jpg",
    planet:"", zodiac:"",
    keywords:["Phòng thủ","Bảo vệ","Thách thức","Quyết tâm","Lòng can đảm","Nỗ lực","Giữ vững vị trí","Đối đầu với áp lực"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này có thể biểu thị sự phòng thủ hoặc bảo vệ trong mối quan hệ. Bạn hoặc đối tác có thể cảm thấy áp lực từ các yếu tố bên ngoài, nhưng với sự quyết tâm, cả hai có thể vượt qua thử thách.",
    reversed:"năng lượng Seven of Wands bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này có thể biểu thị sự phòng thủ hoặc bảo vệ trong mối quan hệ. Bạn hoặc đối tác có thể cảm thấy áp lực từ các yếu tố bên ngoài, nhưng với sự quyết tâm, cả hai có thể vượt qua thử thách.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này cho thấy bạn đang phải đối mặt với sự cạnh tranh hoặc áp lực từ đồng nghiệp hoặc dự án. Tuy nhiên, nó cũng báo hiệu rằng bạn có đủ năng lực để vượt qua những thách thức và giữ vững vị trí.",rev:""},
      finance:{up:"Tài chính: Lá bài biểu thị rằng bạn cần bảo vệ tài sản hoặc kế hoạch tài chính của mình trước những áp lực hoặc rủi ro. Bạn có thể phải đấu tranh để giữ vững sự ổn định.",rev:""},
      health:{up:"Lá bài này cho thấy bạn có thể đang đấu tranh để duy trì hoặc cải thiện sức khỏe của mình. Nó khuyến khích bạn không bỏ cuộc, dù có những khó khăn trong hành trình chăm sóc bản thân.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này có thể biểu thị sự phòng thủ hoặc bảo vệ trong mối quan hệ.",rev:"Khi ngược: năng lượng Seven of Wands bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Bảo vệ, giữ vững, quản lý tài chính.", numerology:"7"
  },
  {
    id:29, name:"Eight of Wands", nameVi:"Tám Gậy", number:"8",
    arcana:"minor", image:"cards/29-Eight-of-Wands.jpg",
    planet:"", zodiac:"",
    keywords:["Tốc độ","Phát triển","Chuyển động","Tiến bộ","Thay đổi tích cực","Kết nối","Cơ hội","Hành động nhanh chóng"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này cho thấy mối quan hệ đang tiến triển nhanh chóng hoặc có một bước ngoặt quan trọng sắp diễn ra. Có thể là việc đưa ra quyết định lớn như kết hôn, di chuyển cùng nhau, hoặc giải quyết mâu thuẫn nhanh chóng.",
    reversed:"năng lượng Eight of Wands bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này cho thấy mối quan hệ đang tiến triển nhanh chóng hoặc có một bước ngoặt quan trọng sắp diễn ra. Có thể là việc đưa ra quyết định lớn như kết hôn, di chuyển cùng nhau, hoặc giải quyết mâu thuẫn nhanh chóng.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài báo hiệu một giai đoạn bùng nổ với nhiều cơ hội và tiến bộ nhanh chóng. Bạn có thể hoàn thành dự án lớn, nhận được lời mời hợp tác, hoặc thăng tiến trong sự nghiệp.",rev:""},
      finance:{up:"Tài chính: Lá bài biểu thị dòng tiền hoặc cơ hội tài chính đang đến một cách nhanh chóng. Đây có thể là thời điểm tốt để đầu tư hoặc nhận lại lợi nhuận từ những nỗ lực trước đây.",rev:""},
      health:{up:"Lá bài này cho thấy sự hồi phục nhanh chóng hoặc cải thiện đáng kể về sức khỏe. Nó cũng có thể là lời nhắc nhở bạn cần hành động ngay để chăm sóc bản thân hoặc bắt đầu một lối sống lành mạnh hơn.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này cho thấy mối quan hệ đang tiến triển nhanh chóng hoặc có một bước ngoặt quan trọng sắp diễn ra.",rev:"Khi ngược: năng lượng Eight of Wands bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Tăng trưởng, dòng tiền, cơ hội tài chính.", numerology:"8"
  },
  {
    id:30, name:"Nine of Wands", nameVi:"Chín Gậy", number:"9",
    arcana:"minor", image:"cards/30-Nine-of-Wands.jpg",
    planet:"", zodiac:"",
    keywords:["Kiên trì","Phòng thủ","Sức mạnh nội tâm","Chống chọi","Sự cảnh giác","Vượt qua thử thách","Bảo vệ","Niềm tin vào bản thân"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này cho thấy bạn hoặc đối tác đang phòng thủ hoặc bảo vệ cảm xúc của mình. Có thể cả hai đang đối mặt với những thử thách trong mối quan hệ, nhưng nếu kiên nhẫn và cố gắng, bạn sẽ vượt qua.",
    reversed:"năng lượng Nine of Wands bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này cho thấy bạn hoặc đối tác đang phòng thủ hoặc bảo vệ cảm xúc của mình. Có thể cả hai đang đối mặt với những thử thách trong mối quan hệ, nhưng nếu kiên nhẫn và cố gắng, bạn sẽ vượt qua.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này cho thấy bạn đang ở giai đoạn căng thẳng hoặc chịu áp lực lớn trong công việc. Tuy nhiên, nó cũng nhấn mạnh rằng bạn đang rất gần với thành công và cần tiếp tục kiên trì.",rev:""},
      finance:{up:"Tài chính: Lá bài này báo hiệu rằng bạn có thể đang phải bảo vệ tài chính của mình trước những rủi ro. Dù có cảm giác khó khăn, nhưng nếu cẩn thận và quyết tâm, bạn sẽ vượt qua giai đoạn này.",rev:""},
      health:{up:"Lá bài này có thể biểu thị sự kiệt sức hoặc căng thẳng. Nó nhắc nhở bạn cần nghỉ ngơi và chăm sóc bản thân để lấy lại sức mạnh.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này cho thấy bạn hoặc đối tác đang phòng thủ hoặc bảo vệ cảm xúc của mình.",rev:"Khi ngược: năng lượng Nine of Wands bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Bảo vệ, thận trọng, vượt qua khó khăn.", numerology:"9"
  },
  {
    id:31, name:"Ten of Wands", nameVi:"Mười Gậy", number:"10",
    arcana:"minor", image:"cards/31-Ten-of-Wands.jpg",
    planet:"", zodiac:"",
    keywords:["Trách nhiệm","Gánh nặng","Áp lực","Sự quá tải","Hoàn thành mục tiêu","Quản lý công việc","Chịu đựng","Kiên trì"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này cho thấy mối quan hệ có thể đang gặp phải áp lực hoặc trách nhiệm lớn. Cả hai có thể cảm thấy gánh nặng trong việc duy trì mối quan hệ, nhưng nếu cùng nhau chia sẻ, mọi chuyện sẽ được giải quyết.",
    reversed:"năng lượng Ten of Wands bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này cho thấy mối quan hệ có thể đang gặp phải áp lực hoặc trách nhiệm lớn. Cả hai có thể cảm thấy gánh nặng trong việc duy trì mối quan hệ, nhưng nếu cùng nhau chia sẻ, mọi chuyện sẽ được giải quyết.",rev:""},
      career:{up:"Chịu đựng Kiên trì 5. Phân tích chi tiết các chi tiết trong lá bài Ten of Wands Người đàn ông cõng mười cây gậy: Biểu tượng cho gánh nặng trách nhiệm hoặc những công việc phải hoàn thành.",rev:""},
      finance:{up:"Tài chính: Lá bài biểu thị cảm giác áp lực tài chính hoặc trách nhiệm lớn liên quan đến tiền bạc. Bạn có thể đang chịu trách nhiệm với các khoản nợ hoặc phải chi tiêu nhiều.",rev:""},
      health:{up:"Lá bài này có thể chỉ ra sự căng thẳng hoặc kiệt sức, đặc biệt nếu bạn đang cố gắng gánh vác quá nhiều trách nhiệm. Nó nhắc nhở bạn chăm sóc bản thân, nghỉ ngơi và tránh làm việc quá sức.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này cho thấy mối quan hệ có thể đang gặp phải áp lực hoặc trách nhiệm lớn.",rev:"Khi ngược: năng lượng Ten of Wands bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Áp lực tài chính, trách nhiệm, quản lý cẩn thận.", numerology:"10"
  },
  {
    id:32, name:"Page of Wands", nameVi:"Tiểu Quân Gậy", number:"P",
    arcana:"minor", image:"cards/32-Page-of-Wands.jpg",
    planet:"", zodiac:"",
    keywords:["Sáng tạo","Khám phá","Nhiệt huyết","Cảm hứng","Tò mò","Khởi đầu mới","Tự do","Lạc quan"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này báo hiệu một giai đoạn đầy đam mê và nhiệt huyết trong tình yêu. Nó biểu thị những khởi đầu mới, sự khám phá cảm xúc hoặc sự tái sinh năng lượng trong mối quan hệ.",
    reversed:"năng lượng Page of Wands bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này báo hiệu một giai đoạn đầy đam mê và nhiệt huyết trong tình yêu. Nó biểu thị những khởi đầu mới, sự khám phá cảm xúc hoặc sự tái sinh năng lượng trong mối quan hệ.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này biểu thị cơ hội nghề nghiệp mới, những dự án sáng tạo hoặc khởi đầu một hành trình mới. Nó khuyến khích bạn hành động với sự tự tin và lạc quan.",rev:""},
      finance:{up:"Tài chính: Lá bài này cho thấy cơ hội mới trong tài chính, chẳng hạn như một khoản đầu tư tiềm năng hoặc nguồn thu nhập mới. Nó khuyến khích bạn tìm hiểu và thử nghiệm các cách quản lý tài chính sáng tạo.",rev:""},
      health:{up:"Lá bài Page of Wands báo hiệu năng lượng tích cực và sự khởi đầu của một lối sống lành mạnh hơn. Nếu bạn đang trong quá trình hồi phục, lá bài này cho thấy bạn sẽ nhanh chóng lấy lại sức khỏe và năng lượng.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này báo hiệu một giai đoạn đầy đam mê và nhiệt huyết trong tình yêu.",rev:"Khi ngược: năng lượng Page of Wands bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Cơ hội tài chính, khám phá, đầu tư mới.", numerology:"P"
  },
  {
    id:33, name:"Knight of Wands", nameVi:"Kỵ Sĩ Gậy", number:"Kn",
    arcana:"minor", image:"cards/33-Knight-of-Wands.jpg",
    planet:"", zodiac:"",
    keywords:["Nhiệt huyết","Hành động","Phiêu lưu","Táo bạo","Đam mê","Tự tin","Chuyển động nhanh","Khám phá"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này biểu thị một mối quan hệ đầy đam mê và năng lượng. Nó có thể cho thấy sự phát triển nhanh chóng trong tình yêu hoặc một giai đoạn nồng nhiệt.",
    reversed:"năng lượng Knight of Wands bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này biểu thị một mối quan hệ đầy đam mê và năng lượng. Nó có thể cho thấy sự phát triển nhanh chóng trong tình yêu hoặc một giai đoạn nồng nhiệt.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này biểu thị cơ hội nghề nghiệp hoặc dự án mới đầy tiềm năng. Bạn có thể đang ở giai đoạn phát triển mạnh mẽ và đầy cảm hứng.",rev:""},
      finance:{up:"Tài chính: Lá bài cho thấy một giai đoạn tài chính năng động, với các cơ hội tăng thu nhập hoặc đầu tư mới. Tuy nhiên, hãy cân nhắc kỹ trước khi đưa ra quyết định để tránh rủi ro không cần thiết.",rev:""},
      health:{up:"Lá bài này báo hiệu sức khỏe dồi dào và năng lượng tích cực. Nếu bạn đang trong quá trình hồi phục, lá bài cho thấy rằng bạn sẽ nhanh chóng lấy lại thể lực.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này biểu thị một mối quan hệ đầy đam mê và năng lượng.",rev:"Khi ngược: năng lượng Knight of Wands bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Cơ hội, đầu tư, quản lý rủi ro.", numerology:"Kn"
  },
  {
    id:34, name:"Queen of Wands", nameVi:"Nữ Hoàng Gậy", number:"Q",
    arcana:"minor", image:"cards/34-Queen-of-Wands.jpg",
    planet:"", zodiac:"",
    keywords:["Tự tin","Lãnh đạo","Quyến rũ","Sáng tạo","Độc lập","Đam mê","Ấm áp","Hòa đồng"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này báo hiệu một mối quan hệ đầy đam mê và năng lượng tích cực. Nó cũng cho thấy bạn hoặc đối tác có thể là người mạnh mẽ, độc lập và truyền cảm hứng cho nhau.",
    reversed:"năng lượng Queen of Wands bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này báo hiệu một mối quan hệ đầy đam mê và năng lượng tích cực. Nó cũng cho thấy bạn hoặc đối tác có thể là người mạnh mẽ, độc lập và truyền cảm hứng cho nhau.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này biểu thị khả năng lãnh đạo và sự sáng tạo trong công việc. Nó cũng cho thấy bạn có đủ năng lượng và kỹ năng để đạt được mục tiêu nghề nghiệp.",rev:""},
      finance:{up:"Tài chính: Lá bài này biểu thị khả năng quản lý tài chính tốt và cơ hội để mở rộng thu nhập. Hãy sử dụng sự sáng tạo và kỹ năng lãnh đạo của mình để phát triển tài chính cá nhân.",rev:""},
      health:{up:"Lá bài này báo hiệu một sức khỏe tốt và năng lượng dồi dào. Nếu bạn đang trong quá trình hồi phục, lá bài này cho thấy bạn đang đi đúng hướng và sẽ sớm lấy lại sự cân bằng.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này báo hiệu một mối quan hệ đầy đam mê và năng lượng tích cực.",rev:"Khi ngược: năng lượng Queen of Wands bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Tăng trưởng, quản lý tài chính, cơ hội.", numerology:"Q"
  },
  {
    id:35, name:"King of Wands", nameVi:"Đức Vua Gậy", number:"K",
    arcana:"minor", image:"cards/35-King-of-Wands.jpg",
    planet:"", zodiac:"",
    keywords:["Lãnh đạo","Quyền lực","Tầm nhìn","Tự tin","Quyết đoán","Đam mê","Trách nhiệm","Sáng tạo"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này biểu thị một mối quan hệ mạnh mẽ và đầy đam mê. Người đại diện cho lá bài này thường là một đối tác tự tin, truyền cảm hứng và luôn sẵn sàng bảo vệ mối quan hệ.",
    reversed:"năng lượng King of Wands bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này biểu thị một mối quan hệ mạnh mẽ và đầy đam mê. Người đại diện cho lá bài này thường là một đối tác tự tin, truyền cảm hứng và luôn sẵn sàng bảo vệ mối quan hệ.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này đại diện cho một nhà lãnh đạo hoặc người dẫn đầu có tầm nhìn. Bạn có thể đang ở một vị trí quyền lực hoặc được trao trách nhiệm lớn trong công việc.",rev:""},
      finance:{up:"Tài chính: Lá bài này biểu thị sự thành công trong tài chính nhờ vào sự quyết đoán và tầm nhìn dài hạn. Đây là thời điểm tốt để đầu tư hoặc phát triển các dự án kinh doanh.",rev:""},
      health:{up:"Lá bài này báo hiệu sức khỏe tốt và khả năng vượt qua bất kỳ khó khăn nào. Nếu bạn đang hồi phục, lá bài cho thấy sự tiến triển tích cực nhờ ý chí mạnh mẽ và tinh thần lạc quan.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này biểu thị một mối quan hệ mạnh mẽ và đầy đam mê.",rev:"Khi ngược: năng lượng King of Wands bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Tăng trưởng, quản lý tốt, đầu tư hiệu quả.", numerology:"K"
  },
  {
    id:36, name:"Ace of Cups", nameVi:"Át Chén", number:"A",
    arcana:"minor", image:"cards/36-Ace-of-Cups.jpg",
    planet:"", zodiac:"",
    keywords:["Cảm xúc"], keywordsRev:[],
    upright:"Khởi đầu mới Sự thấu hiểu Sáng tạo Niềm vui Hòa hợp Kết nối tâm hồn 5. Phân tích chi tiết các chi tiết trong lá bài Ace of Cups Chiếc cốc tràn đầy nước: Biểu tượng của cảm xúc dồi dào, sự sáng tạo và tình yêu.",
    reversed:"năng lượng Ace of Cups bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Khởi đầu mới Sự thấu hiểu Sáng tạo Niềm vui Hòa hợp Kết nối tâm hồn 5. Phân tích chi tiết các chi tiết trong lá bài Ace of Cups Chiếc cốc tràn đầy nước: Biểu tượng của cảm xúc dồi dào, sự sáng tạo và tình yêu.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này biểu thị cơ hội để sáng tạo hoặc khám phá những lĩnh vực bạn đam mê. Nó cũng nhấn mạnh sự hài lòng và cảm giác viên mãn trong công việc.",rev:""},
      finance:{up:"Tài chính: Lá bài này biểu thị sự hài lòng và niềm vui từ những cơ hội tài chính mới hoặc những khoản đầu tư mang lại cảm giác an tâm. Nó cũng khuyến khích bạn sử dụng tiền bạc để hỗ trợ cảm xúc và các giá trị tinh thần.",rev:""},
      health:{up:"Lá bài này báo hiệu sức khỏe tinh thần và cảm xúc tích cực. Nó khuyến khích bạn chú ý đến cảm xúc và dành thời gian để chữa lành tâm hồn.",rev:""},
      spiritual:{up:"Khởi đầu mới Sự thấu hiểu Sáng tạo Niềm vui Hòa hợp Kết nối tâm hồn 5.",rev:"Khi ngược: năng lượng Ace of Cups bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Hài lòng, cơ hội mới, cân bằng tài chính.", numerology:"A"
  },
  {
    id:37, name:"Two of Cups", nameVi:"Hai Chén", number:"2",
    arcana:"minor", image:"cards/37-Two-of-Cups.jpg",
    planet:"", zodiac:"",
    keywords:["Kết nối","Hòa hợp","Hợp tác","Cam kết","Đồng cảm","Cân bằng","Mối quan hệ"], keywordsRev:[],
    upright:"5. Phân tích chi tiết các chi tiết trong lá bài Two of Cups Hai nhân vật trao đổi cốc: Biểu tượng của sự kết nối và trao đổi cảm xúc.",
    reversed:"năng lượng Two of Cups bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"5. Phân tích chi tiết các chi tiết trong lá bài Two of Cups Hai nhân vật trao đổi cốc: Biểu tượng của sự kết nối và trao đổi cảm xúc.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này biểu thị sự hợp tác hoặc mối quan hệ đối tác mang lại kết quả tích cực. Nó có thể là dấu hiệu của một dự án thành công nhờ vào sự hỗ trợ và phối hợp tốt giữa các thành viên.",rev:""},
      finance:{up:"Tài chính: Lá bài này cho thấy tài chính của bạn đang ở trạng thái ổn định, hoặc bạn có thể nhận được sự hỗ trợ tài chính từ người khác. Đây cũng là dấu hiệu của sự hợp tác tài chính thành công.",rev:""},
      health:{up:"Lá bài này báo hiệu sự cân bằng về mặt cảm xúc, điều rất quan trọng cho sức khỏe thể chất và tinh thần. Nếu bạn đang trong quá trình hồi phục, lá bài này cho thấy sự hỗ trợ từ người khác sẽ giúp bạn nhanh chóng khỏe lại.",rev:""},
      spiritual:{up:"5.",rev:"Khi ngược: năng lượng Two of Cups bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Ổn định, hợp tác tài chính, hỗ trợ.", numerology:"2"
  },
  {
    id:38, name:"Three of Cups", nameVi:"Ba Chén", number:"3",
    arcana:"minor", image:"cards/38-Three-of-Cups.jpg",
    planet:"", zodiac:"",
    keywords:["Lễ hội","Niềm vui","Kết nối","Tình bạn","Sự hỗ trợ","Hòa hợp","Chia sẻ cảm xúc","Thành tựu chung"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này báo hiệu sự hạnh phúc và hòa hợp trong tình yêu. Nó có thể chỉ ra một thời điểm đặc biệt để kỷ niệm hoặc chia sẻ những khoảnh khắc ý nghĩa cùng đối tác.",
    reversed:"năng lượng Three of Cups bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này báo hiệu sự hạnh phúc và hòa hợp trong tình yêu. Nó có thể chỉ ra một thời điểm đặc biệt để kỷ niệm hoặc chia sẻ những khoảnh khắc ý nghĩa cùng đối tác.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này biểu thị sự hợp tác thành công và cảm giác hài lòng từ việc làm việc nhóm. Đây có thể là dấu hiệu của việc hoàn thành một dự án hoặc đạt được mục tiêu chung.",rev:""},
      finance:{up:"Tài chính: Lá bài này báo hiệu một giai đoạn ổn định hoặc thành công về mặt tài chính. Bạn có thể nhận được sự hỗ trợ tài chính từ bạn bè hoặc đối tác, hoặc cảm giác mãn nguyện từ việc chia sẻ thành quả tài chính.",rev:""},
      health:{up:"Lá bài này mang thông điệp tích cực về sức khỏe, cho thấy sự cải thiện và cảm giác vui vẻ. Nó cũng khuyến khích bạn tìm kiếm sự hỗ trợ từ bạn bè hoặc người thân để duy trì tinh thần lạc quan.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này báo hiệu sự hạnh phúc và hòa hợp trong tình yêu.",rev:"Khi ngược: năng lượng Three of Cups bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Thành tựu, chia sẻ, hỗ trợ tài chính.", numerology:"3"
  },
  {
    id:39, name:"Four of Cups", nameVi:"Bốn Chén", number:"4",
    arcana:"minor", image:"cards/39-Four-of-Cups.jpg",
    planet:"", zodiac:"",
    keywords:["Chán nản","Tự ngẫm","Thiếu động lực","Bỏ lỡ cơ hội","Tập trung vào bên trong","Cân nhắc","Cần thay đổi quan điểm","Tái kết nối"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này có thể chỉ ra sự chán nản hoặc cảm giác không hài lòng trong mối quan hệ. Một hoặc cả hai người có thể đang cảm thấy không được thấu hiểu hoặc không hài lòng với tình trạng hiện tại.",
    reversed:"năng lượng Four of Cups bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này có thể chỉ ra sự chán nản hoặc cảm giác không hài lòng trong mối quan hệ. Một hoặc cả hai người có thể đang cảm thấy không được thấu hiểu hoặc không hài lòng với tình trạng hiện tại.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này cho thấy sự không hài lòng hoặc cảm giác trì trệ trong công việc. Bạn có thể cảm thấy không có động lực hoặc không hài lòng với những gì mình đang làm.",rev:""},
      finance:{up:"Tài chính: Lá bài này có thể biểu thị sự bất mãn với tình trạng tài chính hiện tại hoặc cảm giác không đủ dù đã có những điều tốt đẹp. Nó cũng nhắc nhở bạn cần chú ý đến các cơ hội tài chính mà bạn có thể đã bỏ qua.",rev:""},
      health:{up:"Lá bài này có thể báo hiệu sự mệt mỏi về cảm xúc hoặc tinh thần, dẫn đến sự trì trệ trong sức khỏe. Nó cũng nhắc nhở bạn cần tìm cách cân bằng cảm xúc để cải thiện tình trạng hiện tại.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này có thể chỉ ra sự chán nản hoặc cảm giác không hài lòng trong mối quan hệ.",rev:"Khi ngược: năng lượng Four of Cups bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Không hài lòng, cơ hội bị bỏ qua, cần thay đổi tư duy.", numerology:"4"
  },
  {
    id:40, name:"Five of Cups", nameVi:"Năm Chén", number:"5",
    arcana:"minor", image:"cards/40-Five-of-Cups.jpg",
    planet:"", zodiac:"",
    keywords:["Mất mát","Tiếc nuối","Đau buồn","Tập trung vào quá khứ","Hy vọng còn lại","Chuyển hóa cảm xúc","Học cách buông bỏ"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này có thể biểu thị sự thất vọng, mất mát hoặc cảm giác tiếc nuối trong mối quan hệ. Một cuộc chia tay hoặc sự rạn nứt có thể xảy ra, nhưng lá bài cũng nhắc nhở rằng hy vọng vẫn còn nếu bạn sẵn sàng hàn gắn.",
    reversed:"năng lượng Five of Cups bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này có thể biểu thị sự thất vọng, mất mát hoặc cảm giác tiếc nuối trong mối quan hệ. Một cuộc chia tay hoặc sự rạn nứt có thể xảy ra, nhưng lá bài cũng nhắc nhở rằng hy vọng vẫn còn nếu bạn sẵn sàng hàn gắn.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này có thể biểu thị một sự thất vọng hoặc mất mát trong công việc, chẳng hạn như một dự án không thành công hoặc một cơ hội bị bỏ lỡ. Tuy nhiên, nó cũng nhắc nhở rằng bạn vẫn có thể học hỏi từ thất bại và tiếp tục tiến lên.",rev:""},
      finance:{up:"Tài chính: Lá bài này có thể biểu thị sự mất mát tài chính hoặc cảm giác tiếc nuối về một quyết định tài chính sai lầm. Tuy nhiên, nó cũng gợi ý rằng không phải tất cả đều đã mất, và bạn có thể tìm thấy cơ hội để hồi phục.",rev:""},
      health:{up:"Lá bài này có thể phản ánh sự mệt mỏi về cảm xúc hoặc tinh thần, dẫn đến ảnh hưởng xấu đến sức khỏe thể chất. Nó nhắc nhở bạn cần chú ý hơn đến sự cân bằng cảm xúc để cải thiện sức khỏe tổng thể.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này có thể biểu thị sự thất vọng, mất mát hoặc cảm giác tiếc nuối trong mối quan hệ.",rev:"Khi ngược: năng lượng Five of Cups bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Mất mát, cơ hội hồi phục, bài học kinh nghiệm.", numerology:"5"
  },
  {
    id:41, name:"Six of Cups", nameVi:"Sáu Chén", number:"6",
    arcana:"minor", image:"cards/41-Six-of-Cups.jpg",
    planet:"", zodiac:"",
    keywords:["Ký ức","Hoài niệm","Lòng tốt","Chia sẻ","Sự ngây thơ","Quá khứ","Cân bằng cảm xúc","Kết nối gia đình"], keywordsRev:[],
    upright:"Người lính trong bối cảnh xa xăm: Tượng trưng cho sự bảo vệ và ý thức trách nhiệm, nhắc nhở bạn rằng việc kết nối với quá khứ không nên làm bạn mất đi sự tập trung vào hiện tại.",
    reversed:"năng lượng Six of Cups bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Người lính trong bối cảnh xa xăm: Tượng trưng cho sự bảo vệ và ý thức trách nhiệm, nhắc nhở bạn rằng việc kết nối với quá khứ không nên làm bạn mất đi sự tập trung vào hiện tại.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này có thể đại diện cho việc quay lại với công việc cũ hoặc nhận được sự hỗ trợ từ những người quen thuộc. Nó cũng báo hiệu rằng bạn có thể học hỏi từ những trải nghiệm trước đây để phát triển sự nghiệp.",rev:""},
      finance:{up:"Tài chính: Lá bài này có thể chỉ ra rằng bạn sẽ nhận được sự hỗ trợ tài chính từ gia đình, bạn bè hoặc các mối quan hệ cũ. Nó cũng khuyến khích bạn nên học hỏi từ các quyết định tài chính trong quá khứ để cải thiện tình hình hiện tại.",rev:""},
      health:{up:"Lá bài này báo hiệu sự cải thiện sức khỏe thông qua việc cân bằng cảm xúc. Nó cũng nhắc nhở bạn hãy dành thời gian chăm sóc bản thân và kết nối với những người thân yêu để tạo ra sự hỗ trợ tinh thần tích cực.",rev:""},
      spiritual:{up:"Người lính trong bối cảnh xa xăm: Tượng trưng cho sự bảo vệ và ý thức trách nhiệm, nhắc nhở bạn rằng việc kết nối với quá khứ không nên làm bạn mất đi sự tập trung vào hiện tại.",rev:"Khi ngược: năng lượng Six of Cups bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Hỗ trợ, kết nối cũ, học hỏi từ quá khứ.", numerology:"6"
  },
  {
    id:42, name:"Seven of Cups", nameVi:"Bảy Chén", number:"7",
    arcana:"minor", image:"cards/42-Seven-of-Cups.jpg",
    planet:"", zodiac:"",
    keywords:["Sự lựa chọn","Ảo mộng","Kỳ vọng","Trí tưởng tượng","Phân tâm","Quyết định","Cẩn trọng","Đánh giá thực tế"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này có thể biểu thị sự mơ hồ hoặc thiếu cam kết trong mối quan hệ. Một hoặc cả hai người có thể đang bị cuốn vào kỳ vọng không thực tế hoặc phân tâm bởi các yếu tố bên ngoài.",
    reversed:"năng lượng Seven of Cups bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này có thể biểu thị sự mơ hồ hoặc thiếu cam kết trong mối quan hệ. Một hoặc cả hai người có thể đang bị cuốn vào kỳ vọng không thực tế hoặc phân tâm bởi các yếu tố bên ngoài.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này biểu thị nhiều cơ hội đang mở ra, nhưng không phải tất cả đều phù hợp. Nó cũng cho thấy bạn có thể đang bị phân tâm bởi những ý tưởng không thực tế hoặc thiếu kế hoạch rõ ràng.",rev:""},
      finance:{up:"Tài chính: Lá bài này có thể biểu thị sự cám dỗ đầu tư hoặc tiêu tiền vào những thứ không thực tế. Nó nhắc nhở bạn hãy thận trọng và đánh giá các cơ hội tài chính một cách kỹ lưỡng.",rev:""},
      health:{up:"Lá bài này nhắc nhở bạn đừng để bị lạc hướng bởi những thông tin không rõ ràng hoặc không đáng tin cậy về sức khỏe. Hãy tìm kiếm lời khuyên từ các chuyên gia và tập trung vào những phương pháp thực tế.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này có thể biểu thị sự mơ hồ hoặc thiếu cam kết trong mối quan hệ.",rev:"Khi ngược: năng lượng Seven of Cups bị chặn hoặc biến đổi."}
    },
    advice:"6.", numerology:"7"
  },
  {
    id:43, name:"Eight of Cups", nameVi:"Tám Chén", number:"8",
    arcana:"minor", image:"cards/43-Eight-of-Cups.jpg",
    planet:"", zodiac:"",
    keywords:["Rời bỏ","Buông tay","Tìm kiếm ý nghĩa","Hành trình mới","Không hài lòng","Chấp nhận thay đổi","Trực giác","Sự phát triển cá nhân"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này có thể biểu thị sự rời bỏ một mối quan hệ không còn đáp ứng được cảm xúc hoặc nhu cầu của bạn. Nó nhấn mạnh tầm quan trọng của việc buông tay để tìm kiếm sự hài lòng thực sự.",
    reversed:"năng lượng Eight of Cups bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này có thể biểu thị sự rời bỏ một mối quan hệ không còn đáp ứng được cảm xúc hoặc nhu cầu của bạn. Nó nhấn mạnh tầm quan trọng của việc buông tay để tìm kiếm sự hài lòng thực sự.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này báo hiệu sự rời bỏ một công việc hoặc dự án không còn phù hợp với giá trị hoặc mục tiêu của bạn. Nó có thể đại diện cho một quyết định khó khăn nhưng cần thiết để tiến về phía trước.",rev:""},
      finance:{up:"Tài chính: Lá bài này biểu thị sự rời bỏ các khoản đầu tư hoặc thói quen tài chính không mang lại lợi ích. Nó cũng nhắc nhở bạn đánh giá lại mục tiêu tài chính và tập trung vào những kế hoạch phù hợp hơn.",rev:""},
      health:{up:"Lá bài này khuyến khích bạn buông bỏ những thói quen hoặc lối sống không lành mạnh để tập trung vào việc cải thiện sức khỏe. Nó nhấn mạnh tầm quan trọng của việc lắng nghe cơ thể và tinh thần để đạt được sự cân bằng.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này có thể biểu thị sự rời bỏ một mối quan hệ không còn đáp ứng được cảm xúc hoặc nhu cầu của bạn.",rev:"Khi ngược: năng lượng Eight of Cups bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Rời bỏ khoản đầu tư không hiệu quả, thay đổi chiến lược, tìm kiếm sự ổn định.", numerology:"8"
  },
  {
    id:44, name:"Nine of Cups", nameVi:"Chín Chén", number:"9",
    arcana:"minor", image:"cards/44-Nine-of-Cups.jpg",
    planet:"", zodiac:"",
    keywords:["Ước nguyện được thực hiện","Hài lòng","Thành công cá nhân","Niềm vui","Tự hào","Sự trọn vẹn","Phước lành","Tận hưởng cuộc sống"], keywordsRev:[],
    upright:"Trong mối quan hệ: Lá bài này là dấu hiệu của sự hài lòng và hạnh phúc trong mối quan hệ. Nó báo hiệu rằng cả hai người đang ở một giai đoạn thấu hiểu và tận hưởng tình yêu một cách trọn vẹn.",
    reversed:"năng lượng Nine of Cups bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Lá bài này là dấu hiệu của sự hài lòng và hạnh phúc trong mối quan hệ. Nó báo hiệu rằng cả hai người đang ở một giai đoạn thấu hiểu và tận hưởng tình yêu một cách trọn vẹn.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này báo hiệu thành công trong công việc, cảm giác tự hào với những thành tựu đã đạt được. Bạn đang ở một vị trí mà mọi nỗ lực đều được công nhận và mang lại kết quả tốt.",rev:""},
      finance:{up:"Tài chính: Lá bài này biểu thị sự ổn định và thịnh vượng về tài chính. Bạn có thể đang tận hưởng thành quả từ những khoản đầu tư hoặc công việc trước đây.",rev:""},
      health:{up:"Lá bài này là dấu hiệu tích cực về sức khỏe, cho thấy sự cải thiện và cảm giác hài lòng với thể chất lẫn tinh thần. Nếu bạn đang hồi phục, lá bài này báo hiệu rằng bạn đang trên đường đạt được sức khỏe tốt hơn.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Lá bài này là dấu hiệu của sự hài lòng và hạnh phúc trong mối quan hệ.",rev:"Khi ngược: năng lượng Nine of Cups bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Nine of Cups là biểu tượng của sự hài lòng, thành công và niềm vui. Khi xuất hiện trong trải bài Tarot, lá bài này báo hiệu rằng bạn đang ở giai đoạn thỏa mãn với những gì mình đã đạt được, đồng thời khuyến khích bạn tận hưởng những khoảnh khắc đáng giá.", numerology:"9"
  },
  {
    id:45, name:"Ten of Cups", nameVi:"Mười Chén", number:"10",
    arcana:"minor", image:"cards/45-Ten-of-Cups.jpg",
    planet:"", zodiac:"",
    keywords:["Hạnh phúc","Gia đình"], keywordsRev:[],
    upright:"Sự hài hòa Thành công lâu dài Kết nối sâu sắc Niềm vui bền vững Sự hoàn thiện 5. Phân tích chi tiết các chi tiết trong lá bài Ten of Cups Cầu vồng với mười chiếc cốc: Biểu tượng của sự hoàn thiện và phước lành từ vũ trụ.",
    reversed:"năng lượng Ten of Cups bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Sự hài hòa Thành công lâu dài Kết nối sâu sắc Niềm vui bền vững Sự hoàn thiện 5. Phân tích chi tiết các chi tiết trong lá bài Ten of Cups Cầu vồng với mười chiếc cốc: Biểu tượng của sự hoàn thiện và phước lành từ vũ trụ.",rev:""},
      career:{up:"Ý nghĩa tích cực: Lá bài cho thấy bạn đang ở một vị trí công việc ổn định và hài lòng. Nó có thể báo hiệu một môi trường làm việc hòa hợp hoặc thành công trong việc hoàn thành các dự án mang tính tập thể.",rev:""},
      finance:{up:"Ý nghĩa tích cực: Lá bài mang đến tín hiệu tích cực về tài chính. Nó thể hiện sự ổn định và khả năng đảm bảo an toàn tài chính cho bản thân và gia đình.",rev:""},
      health:{up:"Ý nghĩa tích cực: Ten of Cups báo hiệu một trạng thái sức khỏe tốt và tinh thần tích cực. Lá bài này khuyến khích bạn giữ gìn thói quen lành mạnh để duy trì hạnh phúc lâu dài.",rev:""},
      spiritual:{up:"Sự hài hòa Thành công lâu dài Kết nối sâu sắc Niềm vui bền vững Sự hoàn thiện 5.",rev:"Khi ngược: năng lượng Ten of Cups bị chặn hoặc biến đổi."}
    },
    advice:"", numerology:"10"
  },
  {
    id:46, name:"Page of Cups", nameVi:"Tiểu Quân Chén", number:"P",
    arcana:"minor", image:"cards/46-Page-of-Cups.jpg",
    planet:"", zodiac:"",
    keywords:["Trực giác","Cảm hứng mới","Thông điệp cảm xúc"], keywordsRev:[],
    upright:"Sự ngây thơ Sáng tạo Kết nối tâm hồn Tiềm năng 5. Phân tích chi tiết các chi tiết trong lá bài Page of Cups Người trẻ tuổi cầm cốc: Biểu tượng cho sự khởi đầu, lòng ngây thơ và sự cởi mở trước những điều mới mẻ.",
    reversed:"năng lượng Page of Cups bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Sự ngây thơ Sáng tạo Kết nối tâm hồn Tiềm năng 5. Phân tích chi tiết các chi tiết trong lá bài Page of Cups Người trẻ tuổi cầm cốc: Biểu tượng cho sự khởi đầu, lòng ngây thơ và sự cởi mở trước những điều mới mẻ.",rev:""},
      career:{up:"Trong sự nghiệp: Lá bài này báo hiệu sự xuất hiện của một cơ hội sáng tạo hoặc dự án mới. Nó cũng nhắc nhở bạn hãy khám phá và áp dụng những ý tưởng sáng tạo vào công việc.",rev:""},
      finance:{up:"Tài chính: Lá bài này báo hiệu cơ hội tài chính mới hoặc một khoản thu nhập bất ngờ. Tuy nhiên, nó cũng nhắc nhở bạn cần quản lý tài chính một cách sáng suốt và không để cảm xúc chi phối.",rev:""},
      health:{up:"Lá bài này khuyến khích bạn lắng nghe cơ thể và cảm xúc để cải thiện sức khỏe. Nó cũng nhấn mạnh sự cần thiết của việc chăm sóc sức khỏe tinh thần và cảm xúc.",rev:""},
      spiritual:{up:"Sự ngây thơ Sáng tạo Kết nối tâm hồn Tiềm năng 5.",rev:"Khi ngược: năng lượng Page of Cups bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Cơ hội tài chính, bất ngờ, quản lý cảm xúc.", numerology:"P"
  },
  {
    id:47, name:"Knight of Cups", nameVi:"Kỵ Sĩ Chén", number:"Kn",
    arcana:"minor", image:"cards/47-Knight-of-Cups.jpg",
    planet:"", zodiac:"",
    keywords:["Knight of Cups"], keywordsRev:[],
    upright:"Cảm hứng Lý tưởng Cảm xúc sâu sắc Theo đuổi ước mơ Trực giác Khám phá cảm xúc Tâm hồn lãng mạn 5. Phân tích chi tiết các chi tiết trong lá bài Knight of Cups Hiệp sĩ cưỡi ngựa: Hình ảnh này đại diện cho sự hành động quyết đoán, nhưng không phải dựa trên lý trí mà là cảm xúc và t",
    reversed:"năng lượng Knight of Cups bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Cảm hứng Lý tưởng Cảm xúc sâu sắc Theo đuổi ước mơ Trực giác Khám phá cảm xúc Tâm hồn lãng mạn 5. Phân tích chi tiết các chi tiết trong lá bài Knight of Cups Hiệp sĩ cưỡi ngựa: Hình ảnh này đại diện cho sự hành động quyết đoán, nhưng không phải dựa trên lý trí mà là cảm xúc và t",rev:""},
      career:{up:"Trong sự nghiệp: Knight of Cups có thể báo hiệu một công việc sáng tạo hoặc một cơ hội nghề nghiệp liên quan đến nghệ thuật, văn học hoặc lĩnh vực đòi hỏi cảm xúc và đam mê. Lá bài này cũng có thể chỉ ra rằng bạn sẽ được thúc đẩy hành động theo những giá trị và mục tiêu cảm xúc",rev:""},
      finance:{up:"Tài chính: Lá bài này có thể chỉ ra một cơ hội tài chính đến từ sự sáng tạo, nghệ thuật hoặc các dự án cảm hứng. Tuy nhiên, nó cũng cảnh báo rằng bạn không nên đưa ra quyết định tài chính dựa chỉ trên cảm xúc hoặc lý tưởng mà thiếu sự phân tích thực tế.",rev:""},
      health:{up:"Lá bài này có thể báo hiệu rằng sức khỏe tinh thần và cảm xúc của bạn đang ở trong trạng thái lạc quan. Tuy nhiên, nó cũng nhắc nhở bạn phải duy trì sự cân bằng giữa cảm xúc và thể chất, để không bị cuốn đi bởi những cảm xúc thái quá.",rev:""},
      spiritual:{up:"Cảm hứng Lý tưởng Cảm xúc sâu sắc Theo đuổi ước mơ Trực giác Khám phá cảm xúc Tâm hồn lãng mạn 5.",rev:"Khi ngược: năng lượng Knight of Cups bị chặn hoặc biến đổi."}
    },
    advice:"Từ khóa trong tài chính: Cảm hứng, cơ hội sáng tạo, cân nhắc thực tế.", numerology:"Kn"
  },
  {
    id:48, name:"Queen of Cups", nameVi:"Nữ Hoàng Chén", number:"Q",
    arcana:"minor", image:"cards/48-Queen-of-Cups.jpg",
    planet:"", zodiac:"",
    keywords:["Cảm thông","Nuôi dưỡng","Cân bằng cảm xúc","Sự nhạy cảm"], keywordsRev:[],
    upright:"Tâm hồn nhân hậu Trực giác mạnh mẽ Thấu hiểu bản thân và người khác 5. Phân tích chi tiết các chi tiết trong lá bài Queen of Cups Nữ Hoàng cầm cốc: Cốc trong tay tượng trưng cho sự nuôi dưỡng và cảm xúc.",
    reversed:"năng lượng Queen of Cups bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Tâm hồn nhân hậu Trực giác mạnh mẽ Thấu hiểu bản thân và người khác 5. Phân tích chi tiết các chi tiết trong lá bài Queen of Cups Nữ Hoàng cầm cốc: Cốc trong tay tượng trưng cho sự nuôi dưỡng và cảm xúc.",rev:""},
      career:{up:"Trong sự nghiệp: Queen of Cups có thể báo hiệu một công việc liên quan đến việc chăm sóc, hỗ trợ người khác hoặc các lĩnh vực đòi hỏi sự sáng tạo và cảm xúc, như tâm lý học, chăm sóc sức khỏe, nghệ thuật. Nó cũng có thể chỉ ra rằng bạn đang rất thành công trong việc duy trì một",rev:""},
      finance:{up:"Tài chính: Queen of Cups không trực tiếp liên quan đến tài chính, nhưng có thể chỉ ra rằng bạn cần lắng nghe trực giác khi đưa ra các quyết định tài chính. Đừng chỉ dựa vào lý trí, mà hãy kết hợp với cảm xúc và sự thấu hiểu bản thân để đưa ra những quyết định sáng suốt.",rev:""},
      health:{up:"Queen of Cups khuyên bạn hãy chú ý đến sức khỏe tinh thần và cảm xúc của mình. Khi bạn chăm sóc được cảm xúc của mình, sức khỏe thể chất cũng sẽ được cải thiện.",rev:""},
      spiritual:{up:"Tâm hồn nhân hậu Trực giác mạnh mẽ Thấu hiểu bản thân và người khác 5.",rev:"Khi ngược: năng lượng Queen of Cups bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Queen of Cups là biểu tượng của sự nuôi dưỡng, cảm thông và trực giác mạnh mẽ. Khi xuất hiện trong trải bài Tarot, nó mang đến thông điệp về sự thấu hiểu cảm xúc, cả của bản thân và người khác.", numerology:"Q"
  },
  {
    id:49, name:"King of Cups", nameVi:"Đức Vua Chén", number:"K",
    arcana:"minor", image:"cards/49-King-of-Cups.jpg",
    planet:"", zodiac:"",
    keywords:["Kiểm soát cảm xúc","Trưởng thành cảm xúc"], keywordsRev:[],
    upright:"Khả năng lắng nghe Sự điềm tĩnh Trực giác mạnh mẽ Sự sáng suốt Mối quan hệ hài hòa 5.  Phân tích chi tiết các chi tiết trong lá bài King of Cups Vị vua ngồi trên ngai vàng: Hình ảnh vị vua ngồi trên ngai vàng biểu trưng cho sự kiểm soát và sự lãnh đạo trong lĩnh vực cảm xúc.",
    reversed:"năng lượng King of Cups bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Khả năng lắng nghe Sự điềm tĩnh Trực giác mạnh mẽ Sự sáng suốt Mối quan hệ hài hòa 5. Phân tích chi tiết các chi tiết trong lá bài King of Cups Vị vua ngồi trên ngai vàng: Hình ảnh vị vua ngồi trên ngai vàng biểu trưng cho sự kiểm soát và sự lãnh đạo trong lĩnh vực cảm xúc.",rev:""},
      career:{up:"Trong sự nghiệp: King of Cups báo hiệu một công việc ổn định, nơi bạn có thể áp dụng khả năng quản lý cảm xúc và sự sáng suốt của mình để đạt được thành công. Nó cũng cho thấy rằng bạn có khả năng tạo dựng mối quan hệ hài hòa với đồng nghiệp và cấp trên.",rev:""},
      finance:{up:"Tài chính: King of Cups trong tài chính có thể cho thấy sự ổn định tài chính. Bạn có thể đang kiểm soát tốt các khoản thu chi và đưa ra những quyết định tài chính hợp lý.",rev:""},
      health:{up:"King of Cups có thể báo hiệu sự ổn định về mặt cảm xúc và sức khỏe tinh thần. Lá bài này cho thấy rằng khi bạn duy trì được sự cân bằng cảm xúc và kiểm soát được căng thẳng, sức khỏe thể chất của bạn cũng sẽ ổn định.",rev:""},
      spiritual:{up:"Khả năng lắng nghe Sự điềm tĩnh Trực giác mạnh mẽ Sự sáng suốt Mối quan hệ hài hòa 5.",rev:"Khi ngược: năng lượng King of Cups bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài King of Cups là biểu tượng của sự trưởng thành cảm xúc, sự điềm tĩnh và khả năng kiểm soát cảm xúc trong mọi tình huống. Khi xuất hiện trong trải bài Tarot, lá bài này khuyến khích bạn duy trì sự ổn định và sáng suốt, đồng thời thể hiện sự thấu hiểu và chăm sóc đối với bả", numerology:"K"
  },
  {
    id:50, name:"Ace of Swords", nameVi:"Át Kiếm", number:"A",
    arcana:"minor", image:"cards/50-Ace-of-Swords.jpg",
    planet:"", zodiac:"",
    keywords:["Sự rõ ràng","Quyết đoán","Trí tuệ sắc bén","Quyền lực của lý trí","Khởi đầu mới","Cắt đứt sự mơ hồ","Sự thật","Chiến thắng qua sự tư duy và lý luận"], keywordsRev:[],
    upright:"Trong mối quan hệ: Ace of Swords có thể báo hiệu rằng một sự thật quan trọng sẽ được tiết lộ trong mối quan hệ. Đây là thời điểm để bạn hoặc đối tác của bạn đối diện với sự thật và có những quyết định quan trọng về tương lai.",
    reversed:"năng lượng Ace of Swords bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Ace of Swords có thể báo hiệu rằng một sự thật quan trọng sẽ được tiết lộ trong mối quan hệ. Đây là thời điểm để bạn hoặc đối tác của bạn đối diện với sự thật và có những quyết định quan trọng về tương lai.",rev:""},
      career:{up:"Trong sự nghiệp: Ace of Swords báo hiệu một ý tưởng sáng tạo hoặc một cơ hội mới trong công việc. Lá bài này thúc đẩy bạn phải hành động nhanh chóng và quyết đoán, đồng thời sử dụng trí tuệ sắc bén để giải quyết các vấn đề.",rev:""},
      finance:{up:"Tài chính: Ace of Swords có thể báo hiệu một cơ hội tài chính mới hoặc sự thật về tình hình tài chính của bạn. Lá bài này khuyến khích bạn phải hành động với sự quyết đoán và sáng suốt trong việc quản lý tài chính.",rev:""},
      health:{up:"Lá bài này có thể biểu thị một sự khai sáng trong vấn đề sức khỏe, như một phương pháp chữa trị mới, hoặc một sự thật mà bạn cần phải đối mặt để cải thiện sức khỏe. Nó khuyến khích bạn phải mạnh mẽ trong việc đối mặt với vấn đề sức khỏe một cách lý trí và rõ ràng.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Ace of Swords có thể báo hiệu rằng một sự thật quan trọng sẽ được tiết lộ trong mối quan hệ.",rev:"Khi ngược: năng lượng Ace of Swords bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Ace of Swords là biểu tượng của sự khai sáng, sự rõ ràng và khả năng đưa ra quyết định sáng suốt. Khi xuất hiện trong trải bài Tarot, Ace of Swords khuyến khích bạn hãy hành động với trí tuệ và lý trí, đối diện với sự thật và cắt bỏ những sự mơ hồ hoặc lừa dối trong cuộc", numerology:"A"
  },
  {
    id:51, name:"Two of Swords", nameVi:"Hai Kiếm", number:"2",
    arcana:"minor", image:"cards/51-Two-of-Swords.jpg",
    planet:"", zodiac:"",
    keywords:["Sự phân vân","Quyết định khó khăn","Lựa chọn","Cân nhắc kỹ lưỡng","Bế tắc","Cần sự rõ ràng","Bảo vệ cảm xúc","Tình huống chưa giải quyết"], keywordsRev:[],
    upright:"Trong mối quan hệ: Two of Swords trong tình yêu có thể biểu thị một sự phân vân giữa hai lựa chọn hoặc một tình huống mà bạn không muốn đối diện. Có thể bạn đang không chắc chắn về tình cảm của mình, hoặc bạn và đối tác đang gặp khó khăn trong việc giao tiếp hoặc giải quyết một",
    reversed:"năng lượng Two of Swords bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Two of Swords trong tình yêu có thể biểu thị một sự phân vân giữa hai lựa chọn hoặc một tình huống mà bạn không muốn đối diện. Có thể bạn đang không chắc chắn về tình cảm của mình, hoặc bạn và đối tác đang gặp khó khăn trong việc giao tiếp hoặc giải quyết một",rev:""},
      career:{up:"Trong sự nghiệp: Two of Swords trong công việc có thể cho thấy bạn đang đứng trước một quyết định quan trọng hoặc một lựa chọn khó khăn. Bạn có thể cảm thấy bế tắc hoặc không biết phải làm gì tiếp theo.",rev:""},
      finance:{up:"Tài chính: Lá bài này có thể cho thấy rằng bạn đang đối diện với một quyết định tài chính quan trọng, có thể là một sự lựa chọn giữa hai phương án hoặc một tình huống tài chính khó khăn mà bạn chưa biết cách giải quyết. Lời khuyên: Two of Swords khuyến khích bạn tìm kiếm sự rõ r",rev:""},
      health:{up:"Two of Swords trong sức khỏe có thể chỉ ra rằng bạn đang đối diện với một tình huống sức khỏe mà bạn không muốn đối mặt hoặc một sự phân vân về lựa chọn điều trị. Lá bài này khuyên bạn hãy tìm sự rõ ràng từ các bác sĩ hoặc chuyên gia sức khỏe và không để cảm xúc hoặc sự lo sợ ng",rev:""},
      spiritual:{up:"Trong mối quan hệ: Two of Swords trong tình yêu có thể biểu thị một sự phân vân giữa hai lựa chọn hoặc một tình huống mà bạn không muốn đối diện.",rev:"Khi ngược: năng lượng Two of Swords bị chặn hoặc biến đổi."}
    },
    advice:"6.", numerology:"2"
  },
  {
    id:52, name:"Three of Swords", nameVi:"Ba Kiếm", number:"3",
    arcana:"minor", image:"cards/52-Three-of-Swords.jpg",
    planet:"", zodiac:"",
    keywords:["Đau đớn","Mất mát","Nỗi buồn","Sự chia ly","Đối diện với sự thật","Chữa lành cảm xúc","Lý trí vượt qua cảm xúc","Quá trình hồi phục"], keywordsRev:[],
    upright:"Trong mối quan hệ: Three of Swords có thể biểu thị một sự chia ly, nỗi buồn hoặc sự phản bội trong mối quan hệ. Nó có thể chỉ ra rằng bạn đang trải qua một nỗi đau lớn trong tình yêu, có thể là sự chia tay, mất mát hoặc xung đột trong mối quan hệ hiện tại.",
    reversed:"năng lượng Three of Swords bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Three of Swords có thể biểu thị một sự chia ly, nỗi buồn hoặc sự phản bội trong mối quan hệ. Nó có thể chỉ ra rằng bạn đang trải qua một nỗi đau lớn trong tình yêu, có thể là sự chia tay, mất mát hoặc xung đột trong mối quan hệ hiện tại.",rev:""},
      career:{up:"Trong sự nghiệp: Three of Swords có thể biểu thị một sự thất bại, một quyết định khó khăn hoặc sự chia tay với một công việc, đồng nghiệp hoặc đối tác. Lá bài này có thể chỉ ra rằng bạn đang đối diện với một sự thật khó khăn về công việc hoặc đang trải qua một thất bại lớn.",rev:""},
      finance:{up:"Tài chính: Lá bài này có thể chỉ ra một sự mất mát tài chính, như một khoản đầu tư thất bại, một quyết định tài chính sai lầm hoặc sự chia tay với một nguồn tài chính quan trọng. Lời khuyên: Hãy đối diện với sự thật về tình hình tài chính của bạn và tìm cách học hỏi từ những sai",rev:""},
      health:{up:"Three of Swords trong sức khỏe có thể chỉ ra rằng bạn đang đối diện với những căng thẳng hoặc sự đau đớn về thể chất hoặc tinh thần. Có thể là bạn đang phải đối mặt với một vấn đề sức khỏe khó khăn hoặc căng thẳng ảnh hưởng đến sức khỏe tinh thần của bạn.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Three of Swords có thể biểu thị một sự chia ly, nỗi buồn hoặc sự phản bội trong mối quan hệ.",rev:"Khi ngược: năng lượng Three of Swords bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Three of Swords là một lá bài đầy cảm xúc, báo hiệu sự đau đớn, chia ly hoặc thất bại. Tuy nhiên, nó cũng mang đến cơ hội chữa lành, trưởng thành và học hỏi từ những trải nghiệm đau thương.", numerology:"3"
  },
  {
    id:53, name:"Four of Swords", nameVi:"Bốn Kiếm", number:"4",
    arcana:"minor", image:"cards/53-Four-of-Swords.jpg",
    planet:"", zodiac:"",
    keywords:["Nghỉ ngơi","Hồi phục","Sự tĩnh lặng","Bình yên nội tâm","Phục hồi sức khỏe tinh thần","Thời gian tái tạo năng lượng","Cân bằng cảm xúc","Quá trình chữa lành"], keywordsRev:[],
    upright:"Trong mối quan hệ: Four of Swords có thể chỉ ra rằng bạn và đối tác cần thời gian riêng biệt để nghỉ ngơi và làm mới cảm xúc. Có thể bạn đang cảm thấy mệt mỏi trong mối quan hệ và cần thời gian để tái tạo năng lượng, hoặc hai bạn cần sự bình yên để đánh giá lại mối quan hệ.",
    reversed:"năng lượng Four of Swords bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Four of Swords có thể chỉ ra rằng bạn và đối tác cần thời gian riêng biệt để nghỉ ngơi và làm mới cảm xúc. Có thể bạn đang cảm thấy mệt mỏi trong mối quan hệ và cần thời gian để tái tạo năng lượng, hoặc hai bạn cần sự bình yên để đánh giá lại mối quan hệ.",rev:""},
      career:{up:"Trong sự nghiệp: Four of Swords trong công việc cho thấy bạn đang cần nghỉ ngơi hoặc tạm dừng để đánh giá lại công việc hiện tại. Đây là thời gian để bạn làm mới bản thân và tránh bị căng thẳng, đồng thời đánh giá những bước tiếp theo trong sự nghiệp của mình.",rev:""},
      finance:{up:"Tài chính: Four of Swords có thể cho thấy bạn cần thời gian để đánh giá lại tình hình tài chính của mình. Có thể bạn đã quá tập trung vào công việc và tài chính, và bây giờ là lúc để tạm dừng và suy nghĩ về những bước tiếp theo.",rev:""},
      health:{up:"Thời gian tái tạo năng lượng Cân bằng cảm xúc Quá trình chữa lành 5. Phân tích chi tiết các chi tiết trong lá bài Four of Swords Người nằm trên giường với ba thanh kiếm treo trên đầu: Hình ảnh này tượng trưng cho việc bạn đang trong quá trình hồi phục và cần phải nghỉ ngơi.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Four of Swords có thể chỉ ra rằng bạn và đối tác cần thời gian riêng biệt để nghỉ ngơi và làm mới cảm xúc.",rev:"Khi ngược: năng lượng Four of Swords bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Four of Swords là một lá bài của sự nghỉ ngơi, hồi phục và tìm kiếm sự bình an trong tâm hồn. Khi xuất hiện trong trải bài Tarot, nó nhắc nhở bạn rằng đôi khi, nghỉ ngơi và thời gian yên tĩnh là cần thiết để bạn có thể nhìn nhận lại mọi thứ, phục hồi năng lượng và chuẩn b", numerology:"4"
  },
  {
    id:54, name:"Five of Swords", nameVi:"Năm Kiếm", number:"5",
    arcana:"minor", image:"cards/54-Five-of-Swords.jpg",
    planet:"", zodiac:"",
    keywords:["Xung đột","Thất bại tạm thời","Chiến thắng không trọn vẹn","Mất mát","Giao tiếp không công bằng","Sự phản bội","Chiến lược thiếu đạo đức","Động cơ xấu"], keywordsRev:[],
    upright:"Trong mối quan hệ: Five of Swords trong tình yêu có thể chỉ ra một mối quan hệ bị xung đột, sự bất hòa hoặc một cuộc tranh cãi lớn giữa hai bên. Nó cũng có thể là dấu hiệu của sự phản bội hoặc hành động thiếu trung thực trong mối quan hệ.",
    reversed:"năng lượng Five of Swords bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Five of Swords trong tình yêu có thể chỉ ra một mối quan hệ bị xung đột, sự bất hòa hoặc một cuộc tranh cãi lớn giữa hai bên. Nó cũng có thể là dấu hiệu của sự phản bội hoặc hành động thiếu trung thực trong mối quan hệ.",rev:""},
      career:{up:"Trong sự nghiệp: Five of Swords có thể báo hiệu một cuộc xung đột tại nơi làm việc, có thể là giữa bạn và đồng nghiệp hoặc giữa bạn và cấp trên. Nó cũng có thể ám chỉ rằng bạn hoặc người khác đã chiến thắng trong một tình huống mà không quan tâm đến đạo đức hay sự công bằng.",rev:""},
      finance:{up:"Tài chính: Five of Swords trong tài chính có thể báo hiệu một quyết định tài chính sai lầm, một khoản đầu tư không thành công hoặc một giao dịch mà bạn hoặc người khác đã thắng lợi một cách không công bằng. Nó cũng có thể ám chỉ rằng bạn có thể cảm thấy không thoải mái về cách t",rev:""},
      health:{up:"Lá bài này có thể biểu thị tình trạng căng thẳng hoặc lo âu kéo dài. Nếu bạn cảm thấy áp lực và xung đột trong cuộc sống đang ảnh hưởng đến sức khỏe của mình, Five of Swords là dấu hiệu để bạn tìm cách giải tỏa căng thẳng và cải thiện sức khỏe tinh thần và thể chất.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Five of Swords trong tình yêu có thể chỉ ra một mối quan hệ bị xung đột, sự bất hòa hoặc một cuộc tranh cãi lớn giữa hai bên.",rev:"Khi ngược: năng lượng Five of Swords bị chặn hoặc biến đổi."}
    },
    advice:"", numerology:"5"
  },
  {
    id:55, name:"Six of Swords", nameVi:"Sáu Kiếm", number:"6",
    arcana:"minor", image:"cards/55-Six-of-Swords.jpg",
    planet:"", zodiac:"",
    keywords:["Sự chuyển tiếp","Di chuyển","Rời bỏ sự đau khổ","Hành trình hướng tới bình yên","Chuyển mình","Tìm kiếm sự giải thoát","Thay đổi","Cải thiện tình huống"], keywordsRev:[],
    upright:"Trong mối quan hệ: Six of Swords có thể chỉ ra rằng bạn đang trải qua một giai đoạn chuyển tiếp trong mối quan hệ. Có thể là bạn đang rời bỏ một mối quan hệ đầy đau khổ hoặc tìm kiếm một nơi an toàn hơn cho cảm xúc của mình.",
    reversed:"năng lượng Six of Swords bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Six of Swords có thể chỉ ra rằng bạn đang trải qua một giai đoạn chuyển tiếp trong mối quan hệ. Có thể là bạn đang rời bỏ một mối quan hệ đầy đau khổ hoặc tìm kiếm một nơi an toàn hơn cho cảm xúc của mình.",rev:""},
      career:{up:"Trong sự nghiệp: Six of Swords trong công việc có thể biểu thị sự thay đổi về môi trường làm việc hoặc chuyển đến một công ty mới, hoặc sự cần thiết phải thay đổi cách làm việc để giải quyết những vấn đề trước mắt. Lá bài này cũng có thể ám chỉ việc bạn đã vượt qua một giai đoạn",rev:""},
      finance:{up:"Tài chính: Six of Swords trong tài chính có thể chỉ ra rằng bạn đang tìm cách thoát khỏi những khó khăn tài chính hiện tại. Bạn có thể đang tìm kiếm một giải pháp hoặc phương án mới để cải thiện tình hình tài chính của mình.",rev:""},
      health:{up:"Trong sức khỏe, Six of Swords có thể cho thấy rằng bạn đang trên con đường phục hồi sau một thời gian dài chiến đấu với bệnh tật, căng thẳng hoặc lo âu. Đây là một thời gian chuyển giao từ sự đau đớn đến sự hồi phục, khi bạn bắt đầu cảm nhận sự cải thiện về sức khỏe cả về thể ch",rev:""},
      spiritual:{up:"Trong mối quan hệ: Six of Swords có thể chỉ ra rằng bạn đang trải qua một giai đoạn chuyển tiếp trong mối quan hệ.",rev:"Khi ngược: năng lượng Six of Swords bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Six of Swords là biểu tượng của sự chuyển tiếp, sự thay đổi và sự hồi phục. Khi xuất hiện trong trải bài Tarot, nó nhắc nhở bạn rằng dù có khó khăn, thay đổi là một phần không thể thiếu trong quá trình trưởng thành và phát triển.", numerology:"6"
  },
  {
    id:56, name:"Seven of Swords", nameVi:"Bảy Kiếm", number:"7",
    arcana:"minor", image:"cards/56-Seven-of-Swords.jpg",
    planet:"", zodiac:"",
    keywords:["Lừa dối","Chiến thuật","Cẩn thận và bí mật","Đánh lừa hoặc bị đánh lừa","Chiến thắng không công bằng","Giữ bí mật","Đánh giá sự trung thực","Tinh tế và chiến lược"], keywordsRev:[],
    upright:"Trong mối quan hệ: Seven of Swords trong tình yêu có thể báo hiệu sự lừa dối, phản bội hoặc một mối quan hệ không trung thực. Có thể bạn hoặc đối tác của bạn đang giấu giếm cảm xúc, hoặc có những hành động không thành thật trong mối quan hệ.",
    reversed:"năng lượng Seven of Swords bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Seven of Swords trong tình yêu có thể báo hiệu sự lừa dối, phản bội hoặc một mối quan hệ không trung thực. Có thể bạn hoặc đối tác của bạn đang giấu giếm cảm xúc, hoặc có những hành động không thành thật trong mối quan hệ.",rev:""},
      career:{up:"Trong sự nghiệp: Seven of Swords có thể chỉ ra rằng có sự cạnh tranh không công bằng trong công việc hoặc có ai đó đang hành động một cách không minh bạch để đạt được lợi ích cá nhân. Nó cũng có thể ám chỉ rằng bạn cần phải thận trọng và giữ bí mật trong một số dự án hoặc chiến",rev:""},
      finance:{up:"Tài chính: Seven of Swords trong tài chính có thể chỉ ra rằng bạn có thể đang đối mặt với một tình huống tài chính không minh bạch hoặc có những chiến lược tài chính không công bằng. Nó cũng có thể chỉ ra rằng bạn đang che giấu thông tin về tình hình tài chính của mình hoặc có n",rev:""},
      health:{up:"Seven of Swords trong sức khỏe có thể cho thấy rằng bạn có thể đang giấu giếm một vấn đề sức khỏe hoặc không muốn đối mặt với sự thật về tình trạng của mình. Đây có thể là dấu hiệu rằng bạn cần phải thận trọng và đối diện với thực tế về sức khỏe của bản thân để có thể điều trị k",rev:""},
      spiritual:{up:"Trong mối quan hệ: Seven of Swords trong tình yêu có thể báo hiệu sự lừa dối, phản bội hoặc một mối quan hệ không trung thực.",rev:"Khi ngược: năng lượng Seven of Swords bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Seven of Swords là biểu tượng của sự lừa dối, chiến lược và sự cần thiết phải cẩn thận trong các hành động của mình. Khi lá bài này xuất hiện, nó nhắc nhở bạn phải thận trọng trong các mối quan hệ, công việc và tài chính.", numerology:"7"
  },
  {
    id:57, name:"Eight of Swords", nameVi:"Tám Kiếm", number:"8",
    arcana:"minor", image:"cards/57-Eight-of-Swords.jpg",
    planet:"", zodiac:"",
    keywords:["Bế tắc","Ràng buộc","Cảm giác bất lực","Tình huống không thể thay đổi","Những giới hạn tự đặt ra","Sự lừa dối tự bản thân","Tinh thần bị kiềm chế","Cần thay đổi tư duy để giải thoát"], keywordsRev:[],
    upright:"Trong mối quan hệ: Eight of Swords trong tình yêu có thể chỉ ra rằng bạn đang cảm thấy mắc kẹt trong mối quan hệ hiện tại hoặc cảm giác không thể thoát ra khỏi một tình huống không hạnh phúc. Đây có thể là dấu hiệu của sự lo lắng, sợ hãi hoặc thiếu tự do trong tình cảm.",
    reversed:"năng lượng Eight of Swords bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Eight of Swords trong tình yêu có thể chỉ ra rằng bạn đang cảm thấy mắc kẹt trong mối quan hệ hiện tại hoặc cảm giác không thể thoát ra khỏi một tình huống không hạnh phúc. Đây có thể là dấu hiệu của sự lo lắng, sợ hãi hoặc thiếu tự do trong tình cảm.",rev:""},
      career:{up:"Trong sự nghiệp: Eight of Swords trong công việc có thể chỉ ra rằng bạn đang cảm thấy mắc kẹt trong một tình huống công việc, không thể thay đổi hoặc tiến bộ. Bạn có thể cảm thấy thiếu sự hỗ trợ hoặc cảm giác không thể di chuyển trong sự nghiệp của mình.",rev:""},
      finance:{up:"Tài chính: Eight of Swords trong tài chính có thể báo hiệu rằng bạn đang cảm thấy mắc kẹt trong một tình huống tài chính khó khăn. Bạn có thể đang bị chi phối bởi những lo lắng về tiền bạc và không biết cách nào để thoát ra khỏi tình trạng này.",rev:""},
      health:{up:"Trong sức khỏe, Eight of Swords có thể chỉ ra rằng bạn đang bị cản trở bởi suy nghĩ tiêu cực hoặc lo lắng thái quá về tình trạng sức khỏe của mình. Có thể bạn đang cảm thấy lo sợ hoặc không chắc chắn về việc điều trị hoặc phục hồi.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Eight of Swords trong tình yêu có thể chỉ ra rằng bạn đang cảm thấy mắc kẹt trong mối quan hệ hiện tại hoặc cảm giác không thể thoát ra khỏi một tình huống không hạnh phúc.",rev:"Khi ngược: năng lượng Eight of Swords bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Eight of Swords là biểu tượng của sự bế tắc và cảm giác bị giam cầm, nhưng nó thông tin liên hệ CALL +84 899 513 121 TAROT READER [email protected] HO CHI MINH CITY, VIETNAM Liên Kết Nhanh Bói Bài Tarot Các Lá Bài Tarot Shop Về Chúng Tôi Chính Sách Quyền Riêng Tư © 2026 ta", numerology:"8"
  },
  {
    id:58, name:"Nine of Swords", nameVi:"Chín Kiếm", number:"9",
    arcana:"minor", image:"cards/58-Nine-of-Swords.jpg",
    planet:"", zodiac:"",
    keywords:["Lo âu","Sự căng thẳng","Sợ hãi","Cảm giác bị đè nén","Những đêm không ngủ","Suy nghĩ tiêu cực","Cảm giác tội lỗi","Cảm giác bế tắc"], keywordsRev:[],
    upright:"Trong mối quan hệ: Nine of Swords trong tình yêu có thể chỉ ra rằng bạn đang đối mặt với một sự lo lắng hoặc sợ hãi lớn trong mối quan hệ. Có thể là sự không chắc chắn về cảm xúc, lo ngại về sự phản bội hoặc thiếu sự tin tưởng trong mối quan hệ.",
    reversed:"năng lượng Nine of Swords bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Nine of Swords trong tình yêu có thể chỉ ra rằng bạn đang đối mặt với một sự lo lắng hoặc sợ hãi lớn trong mối quan hệ. Có thể là sự không chắc chắn về cảm xúc, lo ngại về sự phản bội hoặc thiếu sự tin tưởng trong mối quan hệ.",rev:""},
      career:{up:"Trong sự nghiệp: Nine of Swords trong công việc có thể chỉ ra rằng bạn đang bị căng thẳng hoặc lo lắng về sự nghiệp của mình. Có thể bạn đang đối mặt với sự thiếu tự tin hoặc quá tải bởi những vấn đề công việc, hoặc bạn cảm thấy bất lực trong việc giải quyết các thử thách.",rev:""},
      finance:{up:"Tài chính: Nine of Swords trong tài chính có thể cho thấy bạn đang bị ám ảnh bởi các lo lắng tài chính, có thể là nợ nần hoặc sự không chắc chắn về tình hình tài chính. Nó có thể là dấu hiệu cho thấy bạn đang lo sợ về tương lai tài chính hoặc cảm thấy quá tải bởi các vấn đề tiền",rev:""},
      health:{up:"Trong sức khỏe, Nine of Swords là biểu tượng của sự lo lắng và căng thẳng tâm lý có thể ảnh hưởng đến sức khỏe thể chất. Cảm giác lo âu kéo dài có thể dẫn đến mất ngủ, đau đầu, hoặc các vấn đề về tiêu hóa.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Nine of Swords trong tình yêu có thể chỉ ra rằng bạn đang đối mặt với một sự lo lắng hoặc sợ hãi lớn trong mối quan hệ.",rev:"Khi ngược: năng lượng Nine of Swords bị chặn hoặc biến đổi."}
    },
    advice:"", numerology:"9"
  },
  {
    id:59, name:"Ten of Swords", nameVi:"Mười Kiếm", number:"10",
    arcana:"minor", image:"cards/59-Ten-of-Swords.jpg",
    planet:"", zodiac:"",
    keywords:["Kết thúc","Thất bại","Đau đớn","Phản bội","Sự giải thoát","Quá trình kết thúc một giai đoạn","Cảm giác bị phản bội","Khởi đầu mới sau khó khăn"], keywordsRev:[],
    upright:"Trong mối quan hệ: Ten of Swords có thể chỉ ra rằng mối quan hệ của bạn đang kết thúc hoặc có thể bạn đang trải qua sự phản bội hoặc đau đớn từ đối tác. Điều này có thể là một sự chia tay hoặc một mối quan hệ đã không còn giữ được sự trung thực và niềm tin.",
    reversed:"năng lượng Ten of Swords bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Ten of Swords có thể chỉ ra rằng mối quan hệ của bạn đang kết thúc hoặc có thể bạn đang trải qua sự phản bội hoặc đau đớn từ đối tác. Điều này có thể là một sự chia tay hoặc một mối quan hệ đã không còn giữ được sự trung thực và niềm tin.",rev:""},
      career:{up:"Trong sự nghiệp: Ten of Swords có thể chỉ ra rằng bạn đang đối mặt với một sự thất bại hoặc kết thúc trong sự nghiệp. Có thể là bạn vừa mất công việc, hoặc một dự án mà bạn đã đầu tư rất nhiều công sức không thành công.",rev:""},
      finance:{up:"Tài chính: Ten of Swords trong tài chính có thể chỉ ra rằng bạn đang đối mặt với một sự thất bại tài chính lớn, có thể là mất mát tài sản, thất bại trong đầu tư, hoặc một sự thay đổi bất ngờ trong tình hình tài chính của bạn. Mặc dù đây có thể là một giai đoạn khó khăn, nhưng lá",rev:""},
      health:{up:"Ten of Swords trong sức khỏe có thể chỉ ra rằng bạn đang trải qua một giai đoạn căng thẳng hoặc cảm thấy kiệt sức về thể chất hoặc tinh thần. Có thể bạn đang bị quá tải hoặc bị áp lực đến mức cảm thấy không còn năng lượng.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Ten of Swords có thể chỉ ra rằng mối quan hệ của bạn đang kết thúc hoặc có thể bạn đang trải qua sự phản bội hoặc đau đớn từ đối tác.",rev:"Khi ngược: năng lượng Ten of Swords bị chặn hoặc biến đổi."}
    },
    advice:"", numerology:"10"
  },
  {
    id:60, name:"Page of Swords", nameVi:"Tiểu Quân Kiếm", number:"P",
    arcana:"minor", image:"cards/60-Page-of-Swords.jpg",
    planet:"", zodiac:"",
    keywords:["Kết thúc","Thất bại","Đau đớn","Phản bội","Sự giải thoát","Quá trình kết thúc một giai đoạn","Cảm giác bị phản bội","Khởi đầu mới sau khó khăn"], keywordsRev:[],
    upright:"Trong mối quan hệ: Ten of Swords có thể chỉ ra rằng mối quan hệ của bạn đang kết thúc hoặc có thể bạn đang trải qua sự phản bội hoặc đau đớn từ đối tác. Điều này có thể là một sự chia tay hoặc một mối quan hệ đã không còn giữ được sự trung thực và niềm tin.",
    reversed:"năng lượng Page of Swords bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong mối quan hệ: Ten of Swords có thể chỉ ra rằng mối quan hệ của bạn đang kết thúc hoặc có thể bạn đang trải qua sự phản bội hoặc đau đớn từ đối tác. Điều này có thể là một sự chia tay hoặc một mối quan hệ đã không còn giữ được sự trung thực và niềm tin.",rev:""},
      career:{up:"Trong sự nghiệp: Ten of Swords có thể chỉ ra rằng bạn đang đối mặt với một sự thất bại hoặc kết thúc trong sự nghiệp. Có thể là bạn vừa mất công việc, hoặc một dự án mà bạn đã đầu tư rất nhiều công sức không thành công.",rev:""},
      finance:{up:"Tài chính: Ten of Swords trong tài chính có thể chỉ ra rằng bạn đang đối mặt với một sự thất bại tài chính lớn, có thể là mất mát tài sản, thất bại trong đầu tư, hoặc một sự thay đổi bất ngờ trong tình hình tài chính của bạn. Mặc dù đây có thể là một giai đoạn khó khăn, nhưng lá",rev:""},
      health:{up:"Ten of Swords trong sức khỏe có thể chỉ ra rằng bạn đang trải qua một giai đoạn căng thẳng hoặc cảm thấy kiệt sức về thể chất hoặc tinh thần. Có thể bạn đang bị quá tải hoặc bị áp lực đến mức cảm thấy không còn năng lượng.",rev:""},
      spiritual:{up:"Trong mối quan hệ: Ten of Swords có thể chỉ ra rằng mối quan hệ của bạn đang kết thúc hoặc có thể bạn đang trải qua sự phản bội hoặc đau đớn từ đối tác.",rev:"Khi ngược: năng lượng Page of Swords bị chặn hoặc biến đổi."}
    },
    advice:"", numerology:"P"
  },
  {
    id:61, name:"Knight of Swords", nameVi:"Kỵ Sĩ Kiếm", number:"Kn",
    arcana:"minor", image:"cards/61-Knight-of-Swords.jpg",
    planet:"", zodiac:"",
    keywords:["Quyết đoán","Nhanh chóng","Mạnh mẽ","Tham vọng","Lý trí","Tự tin","Dũng cảm","Tốc độ"], keywordsRev:[],
    upright:"Giới thiệu chung về lá bài Knight of Swords Lá bài Knight of Swords là một trong những lá bài mạnh mẽ và đầy năng lượng trong bộ bài Tarot. Đại diện cho sự nhanh nhẹn, quyết đoán và sẵn sàng hành động ngay lập tức, Knight of Swords là lá bài khuyến khích bạn hành động một cách t",
    reversed:"năng lượng Knight of Swords bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Giới thiệu chung về lá bài Knight of Swords Lá bài Knight of Swords là một trong những lá bài mạnh mẽ và đầy năng lượng trong bộ bài Tarot. Đại diện cho sự nhanh nhẹn, quyết đoán và sẵn sàng hành động ngay lập tức, Knight of Swords là lá bài khuyến khích bạn hành động một cách t",rev:""},
      career:{up:"Giới thiệu chung về lá bài Knight of Swords Lá bài Knight of Swords là một trong những lá bài mạnh mẽ và đầy năng lượng trong bộ bài Tarot. Đại diện cho sự nhanh nhẹn, quyết đoán và sẵn sàng hành động ngay lập tức, Knight of Swords là lá bài khuyến khích bạn hành động một cách t",rev:""},
      finance:{up:"Giới thiệu chung về lá bài Knight of Swords Lá bài Knight of Swords là một trong những lá bài mạnh mẽ và đầy năng lượng trong bộ bài Tarot. Đại diện cho sự nhanh nhẹn, quyết đoán và sẵn sàng hành động ngay lập tức, Knight of Swords là lá bài khuyến khích bạn hành động một cách t",rev:""},
      health:{up:"Giới thiệu chung về lá bài Knight of Swords Lá bài Knight of Swords là một trong những lá bài mạnh mẽ và đầy năng lượng trong bộ bài Tarot. Đại diện cho sự nhanh nhẹn, quyết đoán và sẵn sàng hành động ngay lập tức, Knight of Swords là lá bài khuyến khích bạn hành động một cách t",rev:""},
      spiritual:{up:"Giới thiệu chung về lá bài Knight of Swords Lá bài Knight of Swords là một trong những lá bài mạnh mẽ và đầy năng lượng trong bộ bài Tarot.",rev:"Khi ngược: năng lượng Knight of Swords bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Knight of Swords là một lá bài mạnh mẽ và đầy năng lượng, thể hiện sự quyết đoán, nhanh nhẹn và dũng cảm. Tuy nhiên, nó cũng mang đến những lời nhắc nhở về việc không hành động quá vội vàng mà thiếu suy nghĩ kỹ lưỡng.", numerology:"Kn"
  },
  {
    id:62, name:"Queen of Swords", nameVi:"Nữ Hoàng Kiếm", number:"Q",
    arcana:"minor", image:"cards/62-Queen-of-Swords-1.jpg",
    planet:"", zodiac:"",
    keywords:["Thông minh","Quyết đoán","Phán đoán","Lý trí","Trí tuệ","Cẩn trọng","Công bằng","Chính trực"], keywordsRev:[],
    upright:"Khi Queen of Swords xuất hiện trong một trải bài về tình yêu, nó có thể chỉ ra rằng bạn đang ở trong một giai đoạn cần phải suy nghĩ cẩn thận về mối quan hệ của mình. Queen of Swords không để cảm xúc chi phối và thường quyết định dựa trên lý trí.",
    reversed:"năng lượng Queen of Swords bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Khi Queen of Swords xuất hiện trong một trải bài về tình yêu, nó có thể chỉ ra rằng bạn đang ở trong một giai đoạn cần phải suy nghĩ cẩn thận về mối quan hệ của mình. Queen of Swords không để cảm xúc chi phối và thường quyết định dựa trên lý trí.",rev:""},
      career:{up:"Trong công việc, Queen of Swords thể hiện sự lãnh đạo và khả năng đưa ra quyết định đúng đắn. Nếu bạn đang đối mặt với một tình huống khó khăn tại nơi làm việc, lá bài này khuyến khích bạn hãy giữ vững lập trường, phân tích vấn đề một cách chi tiết và đưa ra giải pháp hợp lý.",rev:""},
      finance:{up:"Khi xuất hiện trong một trải bài về tài chính, Queen of Swords khuyến khích bạn duy trì sự rõ ràng và cẩn trọng trong việc quản lý tiền bạc. Lá bài này cho thấy bạn có thể đưa ra các quyết định tài chính sáng suốt, không để cảm xúc lấn át.",rev:""},
      health:{up:"Queen of Swords trong sức khỏe nhắc nhở bạn cần phải cân bằng giữa lý trí và cảm xúc trong việc chăm sóc cơ thể. Lá bài này khuyến khích bạn đưa ra các quyết định hợp lý và khoa học trong việc chăm sóc sức khỏe.",rev:""},
      spiritual:{up:"Khi Queen of Swords xuất hiện trong một trải bài về tình yêu, nó có thể chỉ ra rằng bạn đang ở trong một giai đoạn cần phải suy nghĩ cẩn thận về mối quan hệ của mình.",rev:"Khi ngược: năng lượng Queen of Swords bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Queen of Swords trong Tarot là biểu tượng của sự thông minh, lý trí và khả năng lãnh đạo. Cô ấy khuyến khích bạn duy trì sự tỉnh táo và phán đoán sáng suốt trong mọi quyết định, bất kể đó là trong tình yêu, công việc, sức khỏe hay tài chính.", numerology:"Q"
  },
  {
    id:63, name:"King of Swords", nameVi:"Đức Vua Kiếm", number:"K",
    arcana:"minor", image:"cards/63-King-of-Swords.jpg",
    planet:"", zodiac:"",
    keywords:["Quyết đoán","Lý trí","Công bằng","Sắc bén","Khả năng lãnh đạo","Trí tuệ"], keywordsRev:[],
    upright:"Khi King of Swords xuất hiện trong trải bài tình yêu, lá bài này có thể báo hiệu rằng bạn hoặc đối tác của bạn cần phải nhìn nhận mối quan hệ một cách lý trí và công bằng. King of Swords không phải là biểu tượng của những cảm xúc mạnh mẽ hay lãng mạn, mà là sự thấu hiểu, khả năn",
    reversed:"năng lượng King of Swords bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Khi King of Swords xuất hiện trong trải bài tình yêu, lá bài này có thể báo hiệu rằng bạn hoặc đối tác của bạn cần phải nhìn nhận mối quan hệ một cách lý trí và công bằng. King of Swords không phải là biểu tượng của những cảm xúc mạnh mẽ hay lãng mạn, mà là sự thấu hiểu, khả năn",rev:""},
      career:{up:"Trong công việc, King of Swords là biểu tượng của một nhà lãnh đạo tài giỏi và quyết đoán. Lá bài này báo hiệu rằng bạn cần phải sử dụng khả năng tư duy logic và phân tích trong công việc để giải quyết các vấn đề hoặc thách thức.",rev:""},
      finance:{up:"Trong tài chính, King of Swords mang đến sự khôn ngoan và quyết đoán trong các quyết định tiền bạc. Lá bài này báo hiệu rằng bạn cần phải hành động một cách sáng suốt và có tính toán trong các khoản đầu tư hoặc giao dịch tài chính.",rev:""},
      health:{up:"Khi King of Swords xuất hiện trong một trải bài về sức khỏe, lá bài này có thể báo hiệu rằng bạn cần phải áp dụng lý trí và sự phân tích khi đối diện với vấn đề sức khỏe. Đừng để cảm xúc hoặc sự hoảng loạn chi phối quyết định về chăm sóc sức khỏe của bạn.",rev:""},
      spiritual:{up:"Khi King of Swords xuất hiện trong trải bài tình yêu, lá bài này có thể báo hiệu rằng bạn hoặc đối tác của bạn cần phải nhìn nhận mối quan hệ một cách lý trí và công bằng.",rev:"Khi ngược: năng lượng King of Swords bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài King of Swords là một biểu tượng mạnh mẽ của trí tuệ, quyết đoán và khả năng lãnh đạo. Khi lá bài này xuất hiện, nó nhắc nhở bạn rằng trong bất kỳ tình huống nào, sự công bằng và lý trí sẽ luôn dẫn đến quyết định đúng đắn.", numerology:"K"
  },
  {
    id:64, name:"Ace of Pentacles", nameVi:"Át Đồng", number:"A",
    arcana:"minor", image:"cards/64-Ace-of-Pentacles.jpg",
    planet:"", zodiac:"",
    keywords:["Khởi đầu mới","Tài chính","Cơ hội","Thành công bền vững","Tài lộc","Đầu tư","Ổn định","Vật chất"], keywordsRev:[],
    upright:"Khi Ace of Pentacles xuất hiện trong trải bài về tình yêu, lá bài này có thể chỉ ra rằng một cơ hội mới sẽ đến với bạn trong mối quan hệ. Đây có thể là sự bắt đầu của một mối quan hệ mới đầy triển vọng, hoặc một cơ hội để xây dựng mối quan hệ hiện tại trở nên vững chắc hơn, ổn đ",
    reversed:"năng lượng Ace of Pentacles bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Khi Ace of Pentacles xuất hiện trong trải bài về tình yêu, lá bài này có thể chỉ ra rằng một cơ hội mới sẽ đến với bạn trong mối quan hệ. Đây có thể là sự bắt đầu của một mối quan hệ mới đầy triển vọng, hoặc một cơ hội để xây dựng mối quan hệ hiện tại trở nên vững chắc hơn, ổn đ",rev:""},
      career:{up:"Trong công việc, Ace of Pentacles là một lá bài tuyệt vời, báo hiệu một cơ hội nghề nghiệp mới, một dự án tiềm năng hoặc sự thăng tiến trong công việc. Đây là cơ hội để bạn phát triển sự nghiệp hoặc tài năng của mình một cách ổn định và lâu dài.",rev:""},
      finance:{up:"Cơ hội Thành công bền vững Tài lộc Đầu tư Ổn định Vật chất Sự thịnh vượng Sự ổn định tài chính",rev:""},
      health:{up:"Khi Ace of Pentacles xuất hiện trong trải bài về sức khỏe, lá bài này có thể báo hiệu rằng bạn đang bắt đầu một hành trình mới trong việc chăm sóc bản thân, có thể là việc thay đổi chế độ ăn uống, tập thể dục hoặc chăm sóc sức khỏe tổng thể. Đây là một khởi đầu tích cực, mang đế",rev:""},
      spiritual:{up:"Khi Ace of Pentacles xuất hiện trong trải bài về tình yêu, lá bài này có thể chỉ ra rằng một cơ hội mới sẽ đến với bạn trong mối quan hệ.",rev:"Khi ngược: năng lượng Ace of Pentacles bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Ace of Pentacles là một biểu tượng mạnh mẽ của những cơ hội mới, sự ổn định và thịnh vượng trong tài chính, sự nghiệp và sức khỏe. Khi lá bài này xuất hiện, nó khuyến khích bạn đầu tư thời gian và công sức vào các cơ hội mới để đạt được thành công lâu dài và bền vững.", numerology:"A"
  },
  {
    id:65, name:"Two of Pentacles", nameVi:"Hai Đồng", number:"2",
    arcana:"minor", image:"cards/65-Two-of-Pentacles.jpg",
    planet:"", zodiac:"",
    keywords:["Cân bằng","Linh hoạt","Quản lý","Tài chính","Điều chỉnh","Tính toán","Sự thay đổi","Khả năng thích ứng"], keywordsRev:[],
    upright:"Trong tình yêu, Two of Pentacles có thể cho thấy bạn đang phải đối mặt với sự thay đổi trong mối quan hệ, hoặc cần phải cân nhắc giữa hai lựa chọn khác nhau. Nếu bạn đang trong một mối quan hệ, lá bài này có thể cảnh báo về sự cần thiết phải duy trì sự cân bằng giữa thời gian dà",
    reversed:"năng lượng Two of Pentacles bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong tình yêu, Two of Pentacles có thể cho thấy bạn đang phải đối mặt với sự thay đổi trong mối quan hệ, hoặc cần phải cân nhắc giữa hai lựa chọn khác nhau. Nếu bạn đang trong một mối quan hệ, lá bài này có thể cảnh báo về sự cần thiết phải duy trì sự cân bằng giữa thời gian dà",rev:""},
      career:{up:"Khi xuất hiện trong một trải bài về công việc, Two of Pentacles chỉ ra rằng bạn đang phải quản lý nhiều nhiệm vụ hoặc dự án cùng lúc, và yêu cầu sự linh hoạt và khả năng thích ứng để đảm bảo mọi việc diễn ra suôn sẻ. Lá bài này khuyến khích bạn làm việc một cách có tổ chức và gi",rev:""},
      finance:{up:"Giới thiệu chung về lá bài Two of Pentacles Lá bài Two of Pentacles trong bộ bài Tarot là một biểu tượng mạnh mẽ của sự cân bằng, điều chỉnh và khả năng xử lý nhiều vấn đề cùng lúc. Đây là lá bài đại diện cho sự linh hoạt trong cuộc sống, yêu cầu bạn phải cân nhắc và điều chỉnh",rev:""},
      health:{up:"Trong một trải bài về sức khỏe, Two of Pentacles có thể là lời nhắc nhở về việc cần phải cân bằng giữa công việc và nghỉ ngơi. Nếu bạn đang cảm thấy căng thẳng vì công việc hoặc các trách nhiệm, lá bài này khuyến khích bạn tổ chức lại thời gian để dành cho việc chăm sóc bản thân",rev:""},
      spiritual:{up:"Trong tình yêu, Two of Pentacles có thể cho thấy bạn đang phải đối mặt với sự thay đổi trong mối quan hệ, hoặc cần phải cân nhắc giữa hai lựa chọn khác nhau.",rev:"Khi ngược: năng lượng Two of Pentacles bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Two of Pentacles là một biểu tượng mạnh mẽ của sự linh hoạt, khả năng điều chỉnh và duy trì sự cân bằng trong cuộc sống. Dù là trong tình yêu, công việc, sức khỏe hay tài chính, lá bài này khuyến khích bạn tìm cách tổ chức và quản lý các yếu tố khác nhau để đạt được sự ổn", numerology:"2"
  },
  {
    id:66, name:"Three of Pentacles", nameVi:"Ba Đồng", number:"3",
    arcana:"minor", image:"cards/66-Three-of-Pentacles.jpg",
    planet:"", zodiac:"",
    keywords:["Hợp tác","Làm việc nhóm","Thành công","Phát triển nghề nghiệp","Kỹ năng","Cống hiến","Trách nhiệm","Học hỏi"], keywordsRev:[],
    upright:"Trong tình yêu, Three of Pentacles có thể cho thấy rằng một mối quan hệ đang phát triển mạnh mẽ nhờ vào sự hợp tác và nỗ lực của cả hai bên. Nếu bạn đang trong một mối quan hệ, lá bài này nhắc nhở bạn rằng việc làm việc cùng nhau, chia sẻ trách nhiệm và hỗ trợ lẫn nhau là chìa k",
    reversed:"năng lượng Three of Pentacles bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong tình yêu, Three of Pentacles có thể cho thấy rằng một mối quan hệ đang phát triển mạnh mẽ nhờ vào sự hợp tác và nỗ lực của cả hai bên. Nếu bạn đang trong một mối quan hệ, lá bài này nhắc nhở bạn rằng việc làm việc cùng nhau, chia sẻ trách nhiệm và hỗ trợ lẫn nhau là chìa k",rev:""},
      career:{up:"Trong công việc, Three of Pentacles báo hiệu rằng bạn đang ở trong một giai đoạn phát triển nghề nghiệp mạnh mẽ, nhờ vào sự hợp tác với đồng nghiệp hoặc các đối tác. Bạn có thể đang làm việc trong một nhóm nơi mọi người cùng nhau chia sẻ kỹ năng và kiến thức để hoàn thành một dự",rev:""},
      finance:{up:"Three of Pentacles trong tài chính là một dấu hiệu tích cực, cho thấy rằng bạn đang trên con đường xây dựng một nền tảng tài chính ổn định thông qua sự hợp tác và đầu tư trí tuệ vào các dự án hoặc kế hoạch tài chính. Điều này có thể là việc tham gia vào một dự án nhóm, đầu tư và",rev:""},
      health:{up:"Khi Three of Pentacles xuất hiện trong một trải bài về sức khỏe, lá bài này có thể biểu thị rằng bạn đang hợp tác với người khác, chẳng hạn như bác sĩ, huấn luyện viên thể dục, hoặc các chuyên gia dinh dưỡng, để cải thiện sức khỏe. Việc chăm sóc sức khỏe không phải lúc nào cũng",rev:""},
      spiritual:{up:"Trong tình yêu, Three of Pentacles có thể cho thấy rằng một mối quan hệ đang phát triển mạnh mẽ nhờ vào sự hợp tác và nỗ lực của cả hai bên.",rev:"Khi ngược: năng lượng Three of Pentacles bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Three of Pentacles trong Tarot là một biểu tượng mạnh mẽ của sự hợp tác, cống hiến và phát triển nghề nghiệp. Nó nhắc nhở bạn rằng thành công không đến từ nỗ lực đơn lẻ mà cần có sự chia sẻ và hợp tác giữa các cá nhân.", numerology:"3"
  },
  {
    id:67, name:"Four of Pentacles", nameVi:"Bốn Đồng", number:"4",
    arcana:"minor", image:"cards/67-Four-of-Pentacles.jpg",
    planet:"", zodiac:"",
    keywords:["Ổn định","Kiểm soát","Tài chính","An toàn","Bảo vệ","Tích lũy","Kiên định","Thận trọng"], keywordsRev:[],
    upright:"Trong tình yêu, Four of Pentacles có thể chỉ ra rằng bạn đang cảm thấy không thoải mái với việc chia sẻ cảm xúc hoặc quan tâm của mình. Bạn có thể đang cố gắng giữ chặt những gì bạn có, sợ rằng nếu mở lòng, bạn sẽ mất đi sự an toàn hoặc kiểm soát.",
    reversed:"năng lượng Four of Pentacles bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong tình yêu, Four of Pentacles có thể chỉ ra rằng bạn đang cảm thấy không thoải mái với việc chia sẻ cảm xúc hoặc quan tâm của mình. Bạn có thể đang cố gắng giữ chặt những gì bạn có, sợ rằng nếu mở lòng, bạn sẽ mất đi sự an toàn hoặc kiểm soát.",rev:""},
      career:{up:"Trong công việc, Four of Pentacles có thể chỉ ra rằng bạn đang có xu hướng giữ chặt những gì mình có, có thể là vị trí công việc hiện tại, thu nhập hoặc các tài nguyên nghề nghiệp. Bạn có thể cảm thấy sợ hãi khi nghĩ đến việc thay đổi hoặc rủi ro trong công việc.",rev:""},
      finance:{up:"Giới thiệu chung về lá bài Four of Pentacles Lá bài Four of Pentacles trong bộ bài Tarot là một lá bài mạnh mẽ về sự ổn định tài chính, kiểm soát và cảm giác an toàn. Lá bài này thường xuất hiện khi bạn đang cảm thấy có sự cần thiết phải bảo vệ những gì mình đã đạt được, đặc biệ",rev:""},
      health:{up:"Trong sức khỏe, Four of Pentacles có thể chỉ ra rằng bạn đang có xu hướng tập trung quá nhiều vào việc duy trì sự ổn định và an toàn, đến mức có thể bỏ qua nhu cầu chăm sóc sức khỏe hoặc bỏ qua các yếu tố cần thay đổi. Điều này có thể là sự thận trọng trong việc thay đổi chế độ",rev:""},
      spiritual:{up:"Trong tình yêu, Four of Pentacles có thể chỉ ra rằng bạn đang cảm thấy không thoải mái với việc chia sẻ cảm xúc hoặc quan tâm của mình.",rev:"Khi ngược: năng lượng Four of Pentacles bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Four of Pentacles trong Tarot là biểu tượng của sự ổn định, kiểm soát và bảo vệ tài chính, tài sản. Nó khuyến khích bạn duy trì sự an toàn và ổn định trong cuộc sống, nhưng cũng cảnh báo rằng quá mức lo sợ mất mát có thể khiến bạn trở nên bảo thủ và thiếu linh hoạt.", numerology:"4"
  },
  {
    id:68, name:"Five of Pentacles", nameVi:"Năm Đồng", number:"5",
    arcana:"minor", image:"cards/68-Five-of-Pentacles.jpg",
    planet:"", zodiac:"",
    keywords:["Thiếu thốn","Khó khăn","Cô đơn","Thử thách","Tài chính","Mất mát","Hy vọng","Cảm giác bị bỏ rơi"], keywordsRev:[],
    upright:"Trong tình yêu, Five of Pentacles có thể biểu thị một giai đoạn khó khăn trong mối quan hệ, nơi bạn cảm thấy bị cô lập hoặc thiếu sự quan tâm từ người yêu. Nếu bạn đang trong một mối quan hệ, lá bài này có thể cho thấy rằng bạn hoặc đối tác đang cảm thấy bị bỏ rơi hoặc không đượ",
    reversed:"năng lượng Five of Pentacles bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong tình yêu, Five of Pentacles có thể biểu thị một giai đoạn khó khăn trong mối quan hệ, nơi bạn cảm thấy bị cô lập hoặc thiếu sự quan tâm từ người yêu. Nếu bạn đang trong một mối quan hệ, lá bài này có thể cho thấy rằng bạn hoặc đối tác đang cảm thấy bị bỏ rơi hoặc không đượ",rev:""},
      career:{up:"Trong công việc, Five of Pentacles biểu thị sự khó khăn tài chính hoặc cảm giác bị bỏ lại phía sau. Bạn có thể cảm thấy mình đang gặp phải những thử thách trong sự nghiệp hoặc công việc, đặc biệt là nếu bạn đang đối mặt với sự thất bại, thiếu cơ hội hoặc không được đánh giá đúng",rev:""},
      finance:{up:"Mất mát Hy vọng Cảm giác bị bỏ rơi Khả năng phục hồi Tìm kiếm sự hỗ trợ",rev:""},
      health:{up:"Trong sức khỏe, Five of Pentacles có thể biểu thị tình trạng sức khỏe yếu kém, sự lo lắng hoặc thiếu thốn về mặt tinh thần. Lá bài này có thể là dấu hiệu cho thấy bạn đang cảm thấy mệt mỏi hoặc căng thẳng, có thể là kết quả của việc không chú ý đến cơ thể hoặc thiếu sự chăm sóc",rev:""},
      spiritual:{up:"Trong tình yêu, Five of Pentacles có thể biểu thị một giai đoạn khó khăn trong mối quan hệ, nơi bạn cảm thấy bị cô lập hoặc thiếu sự quan tâm từ người yêu.",rev:"Khi ngược: năng lượng Five of Pentacles bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Five of Pentacles trong Tarot là biểu tượng của sự thử thách, khó khăn và thiếu thốn, nhưng cũng mang trong mình thông điệp hy vọng và sự phục hồi. Nó nhắc nhở bạn rằng dù tình huống hiện tại có khó khăn, nhưng luôn có cơ hội để tìm kiếm sự hỗ trợ và thay đổi tình hình.", numerology:"5"
  },
  {
    id:69, name:"Six of Pentacles", nameVi:"Sáu Đồng", number:"6",
    arcana:"minor", image:"cards/69-Six-of-Pentacles.jpg",
    planet:"", zodiac:"",
    keywords:["Cân bằng","Chia sẻ","Tài chính","Giúp đỡ","Công bằng","Thịnh vượng","Nhận lại","Quá trình cho và nhận"], keywordsRev:[],
    upright:"Trong tình yêu, Six of Pentacles mang thông điệp về sự trao đổi công bằng giữa hai người trong mối quan hệ. Lá bài này chỉ ra rằng trong tình yêu, cả hai cần phải chia sẻ và đóng góp vào mối quan hệ một cách bình đẳng.",
    reversed:"năng lượng Six of Pentacles bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong tình yêu, Six of Pentacles mang thông điệp về sự trao đổi công bằng giữa hai người trong mối quan hệ. Lá bài này chỉ ra rằng trong tình yêu, cả hai cần phải chia sẻ và đóng góp vào mối quan hệ một cách bình đẳng.",rev:""},
      career:{up:"Trong công việc, Six of Pentacles báo hiệu một giai đoạn nơi bạn sẽ nhận được sự công nhận, hoặc có thể là một cơ hội để giúp đỡ người khác. Lá bài này có thể chỉ ra rằng bạn sẽ phải chia sẻ nguồn lực, kỹ năng hoặc kinh nghiệm của mình với người khác, hoặc bạn sẽ nhận được sự hỗ",rev:""},
      finance:{up:"Giúp đỡ Công bằng Thịnh vượng Nhận lại Quá trình cho và nhận Từ thiện Hỗ trợ",rev:""},
      health:{up:"Khi xuất hiện trong một trải bài về sức khỏe, Six of Pentacles có thể biểu thị rằng bạn đang trong giai đoạn cần sự giúp đỡ từ người khác để cải thiện sức khỏe. Bạn có thể cần tìm sự hỗ trợ từ các chuyên gia y tế hoặc từ những người thân yêu để vượt qua vấn đề sức khỏe hiện tại.",rev:""},
      spiritual:{up:"Trong tình yêu, Six of Pentacles mang thông điệp về sự trao đổi công bằng giữa hai người trong mối quan hệ.",rev:"Khi ngược: năng lượng Six of Pentacles bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Six of Pentacles trong Tarot là biểu tượng của sự công bằng, chia sẻ và thịnh vượng. Nó nhắc nhở bạn về tầm quan trọng của sự trao đổi trong các mối quan hệ và cuộc sống, rằng cho đi và nhận lại là những phần không thể thiếu trong sự phát triển và thành công của bạn.", numerology:"6"
  },
  {
    id:70, name:"Seven of Pentacles", nameVi:"Bảy Đồng", number:"7",
    arcana:"minor", image:"cards/70-Seven-of-Pentacles.jpg",
    planet:"", zodiac:"",
    keywords:["Kiên nhẫn","Đầu tư lâu dài","Đánh giá tiến độ","Thu hoạch","Tài chính","Kết quả lâu dài","Chăm sóc","Phát triển"], keywordsRev:[],
    upright:"Trong tình yêu, Seven of Pentacles có thể chỉ ra rằng mối quan hệ của bạn đang trong một giai đoạn phát triển chậm nhưng ổn định. Điều này có thể là sự chăm sóc, nuôi dưỡng tình cảm trong thời gian dài, và bạn cần kiên nhẫn để thấy được kết quả.",
    reversed:"năng lượng Seven of Pentacles bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong tình yêu, Seven of Pentacles có thể chỉ ra rằng mối quan hệ của bạn đang trong một giai đoạn phát triển chậm nhưng ổn định. Điều này có thể là sự chăm sóc, nuôi dưỡng tình cảm trong thời gian dài, và bạn cần kiên nhẫn để thấy được kết quả.",rev:""},
      career:{up:"Trong công việc, Seven of Pentacles cho thấy rằng bạn đang trong giai đoạn cần phải đánh giá lại tiến độ và hiệu quả công việc của mình. Bạn có thể đã đầu tư rất nhiều thời gian và công sức vào một dự án hoặc công việc cụ thể, nhưng kết quả vẫn chưa như mong đợi.",rev:""},
      finance:{up:"Kết quả lâu dài Chăm sóc Phát triển Điều chỉnh kế hoạch Sự thịnh vượng",rev:""},
      health:{up:"Seven of Pentacles trong sức khỏe chỉ ra rằng bạn đang trong quá trình phục hồi hoặc chăm sóc sức khỏe dài hạn. Bạn có thể đang áp dụng một chế độ ăn uống lành mạnh, tập luyện thể thao, hoặc chăm sóc bản thân theo một cách nào đó, nhưng kết quả chưa thấy ngay lập tức.",rev:""},
      spiritual:{up:"Trong tình yêu, Seven of Pentacles có thể chỉ ra rằng mối quan hệ của bạn đang trong một giai đoạn phát triển chậm nhưng ổn định.",rev:"Khi ngược: năng lượng Seven of Pentacles bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Seven of Pentacles trong Tarot là biểu tượng của sự kiên nhẫn, đầu tư dài hạn và thu hoạch thành quả. Nó nhắc nhở bạn rằng thành công, dù là trong tình yêu, công việc, sức khỏe hay tài chính, không đến ngay lập tức mà phải qua thời gian và công sức bền bỉ.", numerology:"7"
  },
  {
    id:71, name:"Eight of Pentacles", nameVi:"Tám Đồng", number:"8",
    arcana:"minor", image:"cards/71-Eight-of-Pentacles.jpg",
    planet:"", zodiac:"",
    keywords:["Kỹ năng","Chăm chỉ","Phát triển","Kiên nhẫn","Học hỏi","Cải thiện bản thân"], keywordsRev:[],
    upright:"Trong tình yêu, Eight of Pentacles có thể chỉ ra rằng bạn hoặc đối tác của bạn đang tập trung vào việc xây dựng và củng cố mối quan hệ. Lá bài này có thể biểu thị rằng bạn cần phải đầu tư công sức vào mối quan hệ, học hỏi và phát triển sự hiểu biết lẫn nhau.",
    reversed:"năng lượng Eight of Pentacles bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong tình yêu, Eight of Pentacles có thể chỉ ra rằng bạn hoặc đối tác của bạn đang tập trung vào việc xây dựng và củng cố mối quan hệ. Lá bài này có thể biểu thị rằng bạn cần phải đầu tư công sức vào mối quan hệ, học hỏi và phát triển sự hiểu biết lẫn nhau.",rev:""},
      career:{up:"Chuyên môn Đầu tư lâu dài Hoàn thiện",rev:""},
      finance:{up:"Trong tài chính, Eight of Pentacles báo hiệu rằng bạn đang đầu tư công sức vào việc cải thiện tình hình tài chính của mình. Có thể bạn đang làm việc chăm chỉ, học hỏi về quản lý tài chính hoặc đầu tư vào các cơ hội tài chính lâu dài.",rev:""},
      health:{up:"Trong sức khỏe, Eight of Pentacles khuyến khích bạn tiếp tục kiên trì với thói quen lành mạnh và chăm sóc sức khỏe lâu dài. Bạn có thể đang theo một chế độ ăn uống hợp lý hoặc tập luyện thể thao để cải thiện sức khỏe.",rev:""},
      spiritual:{up:"Trong tình yêu, Eight of Pentacles có thể chỉ ra rằng bạn hoặc đối tác của bạn đang tập trung vào việc xây dựng và củng cố mối quan hệ.",rev:"Khi ngược: năng lượng Eight of Pentacles bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Eight of Pentacles trong Tarot là biểu tượng của sự kiên nhẫn, sự đầu tư vào việc học hỏi và phát triển kỹ năng. Dù là trong công việc, tình yêu, sức khỏe hay tài chính, lá bài này khuyến khích bạn tiếp tục chăm chỉ, đầu tư vào bản thân và làm việc với sự kiên trì.", numerology:"8"
  },
  {
    id:72, name:"Nine of Pentacles", nameVi:"Chín Đồng", number:"9",
    arcana:"minor", image:"cards/72-Nine-of-Pentacles.jpg",
    planet:"", zodiac:"",
    keywords:["Độc lập","Thịnh vượng","Tự mãn","Thành công cá nhân","Tài chính","Tự do","Vật chất","Đánh giá cao thành quả"], keywordsRev:[],
    upright:"Trong tình yêu, Nine of Pentacles có thể biểu thị rằng bạn hoặc đối tác của bạn đang trong một giai đoạn độc lập và tự chủ. Nếu bạn đang trong một mối quan hệ, lá bài này chỉ ra rằng bạn đã xây dựng được sự ổn định và tự do trong mối quan hệ của mình.",
    reversed:"năng lượng Nine of Pentacles bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong tình yêu, Nine of Pentacles có thể biểu thị rằng bạn hoặc đối tác của bạn đang trong một giai đoạn độc lập và tự chủ. Nếu bạn đang trong một mối quan hệ, lá bài này chỉ ra rằng bạn đã xây dựng được sự ổn định và tự do trong mối quan hệ của mình.",rev:""},
      career:{up:"Trong công việc, Nine of Pentacles báo hiệu sự thành công cá nhân và sự ổn định tài chính. Bạn có thể đã đạt được mục tiêu nghề nghiệp của mình và đang tận hưởng thành quả từ những nỗ lực trước đây.",rev:""},
      finance:{up:"Tự do Vật chất Đánh giá cao thành quả Sự hoàn hảo Lối sống tự do",rev:""},
      health:{up:"Trong sức khỏe, Nine of Pentacles cho thấy rằng bạn đang trong một giai đoạn khỏe mạnh và cảm thấy thoải mái với bản thân. Bạn có thể đã đạt được sự ổn định về mặt sức khỏe nhờ vào một chế độ ăn uống hợp lý, thói quen luyện tập đều đặn hoặc chăm sóc bản thân đúng cách.",rev:""},
      spiritual:{up:"Trong tình yêu, Nine of Pentacles có thể biểu thị rằng bạn hoặc đối tác của bạn đang trong một giai đoạn độc lập và tự chủ.",rev:"Khi ngược: năng lượng Nine of Pentacles bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Nine of Pentacles trong Tarot là biểu tượng của sự thịnh vượng, độc lập và thành công cá nhân. Nó nhắc nhở bạn rằng bạn xứng đáng với những thành quả đã đạt được nhờ vào sự chăm chỉ và kiên trì.", numerology:"9"
  },
  {
    id:73, name:"Ten of Pentacles", nameVi:"Mười Đồng", number:"10",
    arcana:"minor", image:"cards/73-Ten-of-Pentacles.jpg",
    planet:"", zodiac:"",
    keywords:["Thịnh vượng","Tài sản","Gia đình","Truyền thống","An cư lạc nghiệp","Kiên trì","Ổn định tài chính","Di sản"], keywordsRev:[],
    upright:"Trong tình yêu, Ten of Pentacles mang thông điệp về sự ổn định và lâu dài trong mối quan hệ. Đây là lá bài của những cặp đôi xây dựng một nền tảng vững chắc, duy trì mối quan hệ qua nhiều năm và có thể hướng tới tương lai bền vững.",
    reversed:"năng lượng Ten of Pentacles bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong tình yêu, Ten of Pentacles mang thông điệp về sự ổn định và lâu dài trong mối quan hệ. Đây là lá bài của những cặp đôi xây dựng một nền tảng vững chắc, duy trì mối quan hệ qua nhiều năm và có thể hướng tới tương lai bền vững.",rev:""},
      career:{up:"Trong công việc, Ten of Pentacles là biểu tượng của sự thành công lâu dài và sự ổn định tài chính. Nếu bạn đang xây dựng sự nghiệp, lá bài này cho thấy bạn đã đạt được sự ổn định trong công việc và tài chính.",rev:""},
      finance:{up:"Di sản Sự bảo vệ Thành công lâu dài",rev:""},
      health:{up:"Ten of Pentacles trong sức khỏe thể hiện sự ổn định và chăm sóc lâu dài cho cơ thể và tinh thần. Bạn có thể đang ở trong một giai đoạn tốt về sức khỏe nhờ vào việc duy trì thói quen lành mạnh và chăm sóc bản thân.",rev:""},
      spiritual:{up:"Trong tình yêu, Ten of Pentacles mang thông điệp về sự ổn định và lâu dài trong mối quan hệ.",rev:"Khi ngược: năng lượng Ten of Pentacles bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Ten of Pentacles trong Tarot là biểu tượng của sự thịnh vượng, ổn định tài chính và gia đình. Nó nhấn mạnh rằng thành công lâu dài đến từ sự chăm chỉ, kiên trì và sự đầu tư bền vững.", numerology:"10"
  },
  {
    id:74, name:"Page of Pentacles", nameVi:"Tiểu Quân Đồng", number:"P",
    arcana:"minor", image:"cards/74-Page-of-Pentacles.jpg",
    planet:"", zodiac:"",
    keywords:["Khởi đầu mới","Học hỏi","Tài chính","Cơ hội","Sự ổn định","Tập trung","Nỗ lực","Đầu tư lâu dài"], keywordsRev:[],
    upright:"Trong tình yêu, Page of Pentacles có thể biểu thị sự khởi đầu mới, nơi bạn hoặc đối tác của bạn đang tìm cách xây dựng một mối quan hệ bền vững và vững chắc. Đây có thể là một mối quan hệ mới bắt đầu, và bạn cần thời gian để tìm hiểu lẫn nhau và xây dựng nền tảng cho tương lai.",
    reversed:"năng lượng Page of Pentacles bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong tình yêu, Page of Pentacles có thể biểu thị sự khởi đầu mới, nơi bạn hoặc đối tác của bạn đang tìm cách xây dựng một mối quan hệ bền vững và vững chắc. Đây có thể là một mối quan hệ mới bắt đầu, và bạn cần thời gian để tìm hiểu lẫn nhau và xây dựng nền tảng cho tương lai.",rev:""},
      career:{up:"Trong công việc, Page of Pentacles chỉ ra rằng bạn đang bắt đầu một dự án mới hoặc bước vào một lĩnh vực nghề nghiệp mới. Đây là thời điểm để bạn học hỏi, phát triển kỹ năng và xây dựng một nền tảng vững chắc.",rev:""},
      finance:{up:"Giới thiệu chung về lá bài Page of Pentacles Lá bài Page of Pentacles trong bộ bài Tarot là biểu tượng của sự khởi đầu mới, sự học hỏi và cơ hội tài chính. Đây là một lá bài đại diện cho một người trẻ tuổi, tràn đầy năng lượng, và đang trong giai đoạn tiếp nhận và nghiên cứu để",rev:""},
      health:{up:"Page of Pentacles trong sức khỏe có thể biểu thị một giai đoạn mới trong việc chăm sóc bản thân, nơi bạn bắt đầu một chế độ ăn uống lành mạnh hơn, tập thể dục đều đặn, hoặc thực hiện các thay đổi tích cực khác để cải thiện sức khỏe. Lá bài này khuyến khích bạn tiếp tục học hỏi v",rev:""},
      spiritual:{up:"Trong tình yêu, Page of Pentacles có thể biểu thị sự khởi đầu mới, nơi bạn hoặc đối tác của bạn đang tìm cách xây dựng một mối quan hệ bền vững và vững chắc.",rev:"Khi ngược: năng lượng Page of Pentacles bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Page of Pentacles trong Tarot là biểu tượng của sự học hỏi, đầu tư và sự khởi đầu mới. Nó nhắc nhở bạn rằng sự thành công trong công việc, tài chính và tình yêu không đến ngay lập tức, mà cần sự kiên nhẫn, nỗ lực và đầu tư thời gian để phát triển.", numerology:"P"
  },
  {
    id:75, name:"Knight of Pentacles", nameVi:"Kỵ Sĩ Đồng", number:"Kn",
    arcana:"minor", image:"cards/75-Knight-of-Pentacles.jpg",
    planet:"", zodiac:"",
    keywords:["Kiên nhẫn","Nỗ lực bền bỉ","Thành công bền vững","Trách nhiệm"], keywordsRev:[],
    upright:"Trong tình yêu, Knight of Pentacles có thể chỉ ra rằng bạn hoặc đối tác của bạn đang trong một giai đoạn cần sự kiên nhẫn và chăm sóc để xây dựng một mối quan hệ vững chắc. Đây là lá bài của sự ổn định và cam kết lâu dài.",
    reversed:"năng lượng Knight of Pentacles bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong tình yêu, Knight of Pentacles có thể chỉ ra rằng bạn hoặc đối tác của bạn đang trong một giai đoạn cần sự kiên nhẫn và chăm sóc để xây dựng một mối quan hệ vững chắc. Đây là lá bài của sự ổn định và cam kết lâu dài.",rev:""},
      career:{up:"Sự ổn định Chi tiết Kỷ luật Đầu tư lâu dài Tập trung vào mục tiêu",rev:""},
      finance:{up:"Trong tài chính, Knight of Pentacles là một lá bài rất tích cực, báo hiệu sự ổn định tài chính và những cơ hội đầu tư lâu dài. Lá bài này chỉ ra rằng bạn đang có sự kiên nhẫn và tính toán kỹ lưỡng trong việc quản lý tài chính.",rev:""},
      health:{up:"Knight of Pentacles trong sức khỏe chỉ ra rằng bạn cần duy trì một lối sống lành mạnh và kiên trì với các thói quen tốt để duy trì sức khỏe lâu dài. Lá bài này khuyến khích bạn thực hiện các thay đổi chậm nhưng ổn định để cải thiện sức khỏe, chẳng hạn như tập thể dục đều đặn hoặ",rev:""},
      spiritual:{up:"Trong tình yêu, Knight of Pentacles có thể chỉ ra rằng bạn hoặc đối tác của bạn đang trong một giai đoạn cần sự kiên nhẫn và chăm sóc để xây dựng một mối quan hệ vững chắc.",rev:"Khi ngược: năng lượng Knight of Pentacles bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Knight of Pentacles trong Tarot là biểu tượng của sự kiên nhẫn, trách nhiệm và nỗ lực không ngừng để đạt được thành công bền vững. Dù là trong công việc, tình yêu, sức khỏe hay tài chính, lá bài này khuyến khích bạn duy trì sự kiên trì và tiếp tục đầu tư vào mục tiêu của", numerology:"Kn"
  },
  {
    id:76, name:"Queen of Pentacles", nameVi:"Nữ Hoàng Đồng", number:"Q",
    arcana:"minor", image:"cards/76-Queen-of-Pentacles.jpg",
    planet:"", zodiac:"",
    keywords:["Quan tâm","Thịnh vượng","Tài chính","Cân bằng","Gia đình","Tận tụy","Chăm sóc","Sự ổn định"], keywordsRev:[],
    upright:"Trong tình yêu, Queen of Pentacles thể hiện sự quan tâm, chăm sóc và tình yêu vững chắc. Cô ấy là biểu tượng của một mối quan hệ ổn định, nơi cả hai người đều quan tâm đến nhau và xây dựng một cuộc sống chung đầy đủ, hạnh phúc.",
    reversed:"năng lượng Queen of Pentacles bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong tình yêu, Queen of Pentacles thể hiện sự quan tâm, chăm sóc và tình yêu vững chắc. Cô ấy là biểu tượng của một mối quan hệ ổn định, nơi cả hai người đều quan tâm đến nhau và xây dựng một cuộc sống chung đầy đủ, hạnh phúc.",rev:""},
      career:{up:"Trong công việc, Queen of Pentacles báo hiệu sự thành công và ổn định. Đây là thời điểm bạn đang tận hưởng những thành quả từ sự chăm chỉ và kiên nhẫn trong công việc.",rev:""},
      finance:{up:"Cân bằng Gia đình Tận tụy Chăm sóc Sự ổn định Thực tế Đầu tư lâu dài",rev:""},
      health:{up:"Trong sức khỏe, Queen of Pentacles là một dấu hiệu tích cực cho thấy bạn đang duy trì một chế độ chăm sóc sức khỏe hợp lý. Bạn có thể đang chú trọng đến việc duy trì sự ổn định về mặt thể chất, ăn uống lành mạnh, tập thể dục đều đặn, và chăm sóc bản thân một cách chu đáo.",rev:""},
      spiritual:{up:"Trong tình yêu, Queen of Pentacles thể hiện sự quan tâm, chăm sóc và tình yêu vững chắc.",rev:"Khi ngược: năng lượng Queen of Pentacles bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài Queen of Pentacles trong Tarot là biểu tượng của sự thịnh vượng, chăm sóc và sự ổn định trong tài chính, công việc và cuộc sống. Nó nhắc nhở bạn về sự quan tâm, sự chăm sóc bản thân và khả năng duy trì sự ổn định lâu dài trong mọi khía cạnh của cuộc sống.", numerology:"Q"
  },
  {
    id:77, name:"King of Pentacles", nameVi:"Đức Vua Đồng", number:"K",
    arcana:"minor", image:"cards/77-King-of-Pentacles.jpg",
    planet:"", zodiac:"",
    keywords:["Thành công tài chính","Quyền lực","Kiên nhẫn","Quản lý tài sản","Tầm nhìn dài hạn","Bảo vệ sự thịnh vượng","Trí tuệ","Ổn định"], keywordsRev:[],
    upright:"Trong tình yêu, King of Pentacles thể hiện sự ổn định và cam kết lâu dài. Đây là người bạn đời lý tưởng, có khả năng tạo dựng một gia đình ổn định và giàu có, không chỉ về mặt vật chất mà còn về mặt cảm xúc.",
    reversed:"năng lượng King of Pentacles bị chặn hoặc biến đổi.",
    aspects:{
      love:{up:"Trong tình yêu, King of Pentacles thể hiện sự ổn định và cam kết lâu dài. Đây là người bạn đời lý tưởng, có khả năng tạo dựng một gia đình ổn định và giàu có, không chỉ về mặt vật chất mà còn về mặt cảm xúc.",rev:""},
      career:{up:"Trong công việc, King of Pentacles là một dấu hiệu tích cực cho thấy bạn đang ở trong một giai đoạn ổn định và có khả năng duy trì sự thành công trong công việc lâu dài. Lá bài này thể hiện sự thành công trong việc quản lý công việc, tài chính và các mối quan hệ trong môi trường",rev:""},
      finance:{up:"Giới thiệu chung về lá bài King of Pentacles Lá bài King of Pentacles trong bộ bài Tarot là biểu tượng của sự thành công, quyền lực tài chính và khả năng quản lý vật chất một cách khôn ngoan. Là một trong những lá bài mạnh mẽ nhất trong bộ Pentacles, King of Pentacles thể hiện m",rev:""},
      health:{up:"Trong sức khỏe, King of Pentacles chỉ ra rằng bạn đang duy trì một chế độ chăm sóc bản thân tốt và ổn định. Lá bài này khuyến khích bạn tiếp tục đầu tư vào sức khỏe của mình và duy trì những thói quen lành mạnh để đảm bảo sức khỏe lâu dài.",rev:""},
      spiritual:{up:"Trong tình yêu, King of Pentacles thể hiện sự ổn định và cam kết lâu dài.",rev:"Khi ngược: năng lượng King of Pentacles bị chặn hoặc biến đổi."}
    },
    advice:"Lá bài King of Pentacles trong Tarot là biểu tượng của sự thành công tài chính, quyền lực và khả năng quản lý tài sản khôn ngoan. Nó khuyến khích bạn duy trì sự ổn định trong công việc, tài chính và cuộc sống gia đình, đồng thời tạo dựng một nền tảng vững chắc cho tương lai.", numerology:"K"
  }
  ];

  window.TarotHelper = {
    drawCards(count) {
      const pool = window.TAROT_DB.map(c => ({ ...c, isReversed: Math.random() < 0.3 }));
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      return pool.slice(0, count);
    },
    getThemeLabel(v) {
      return { love:'Tình Yêu', career:'Sự Nghiệp', finance:'Tài Chính',
               health:'Sức Khỏe', spiritual:'Tâm Linh', general:'Tổng Quát' }[v] || v;
    },
    getSpreadLabels(n) {
      if (n === 1) return ['Hiện Tại'];
      if (n === 3) return ['Quá Khứ', 'Hiện Tại', 'Tương Lai'];
      if (n === 5) return ['Tình Huống', 'Thách Thức', 'Lời Khuyên', 'Ảnh Hưởng', 'Kết Quả'];
      return Array.from({length:n}, (_,i) => `Lá ${i+1}`);
    }
  };
})();
