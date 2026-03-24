const fs = require('fs');
let db = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json', 'utf8'));

const enriched = {
  3: { // The Empress
    generalUpright: "The Empress là hiện thân rạng rỡ của Đất Mẹ, ngọn nguồn của sự sống, sắc đẹp và tình yêu thương vô điều kiện. Lá bài mang đến luồng sinh khí của mùa xuân, báo hiệu một thời kỳ gặt hái thành quả viên mãn, nơi mọi hạt giống bạn gieo trồng đều đang đơm hoa kết trái rực rỡ.",
    generalReversed: "Khi đảo ngược, dòng chảy của sự nuôi dưỡng bị tắc nghẽn. Bạn có thể đang hao mòn sinh lực vì ôm đồm quá nhiều trách nhiệm của người khác mà bỏ bê việc chăm sóc chính mình, hoặc đang kìm hãm sự phát triển bởi thói quen ỷ lại, phụ thuộc.",
    aspects: {
      love: { upright: "Một khu vườn tình yêu ngập tràn mật ngọt và sự thấu cảm sâu sắc. Tình cảm đơm hoa kết trái, mang đến sự gắn kết nồng nàn và trọn vẹn. Rất thuận lợi cho những hứa hẹn thiêng liêng hoặc đón chào một sinh linh bé nhỏ.", reversed: "Sự phụ thuộc cảm xúc ngột ngạt hoặc những ghen tuông độc hại đang rút cạn nhựa sống của mối quan hệ. Đừng để tình yêu biến thành chiếc lồng giam lỏng." },
      career: { upright: "Sự nghiệp của bạn đang bước vào mùa màng bội thu. Những hạt giống ý tưởng đã đến lúc bung nở thành những dự án thành công. Một môi trường làm việc hài hòa, nơi sự sáng tạo được chắp cánh.", reversed: "Cảm hứng sáng tạo khô cằn, môi trường làm việc vắt kiệt sức lao động khiến bạn cảm thấy cạn kiệt ý tưởng và mất đi niềm vui cống hiến." },
      finance: { upright: "Một dòng chảy tài chính dồi dào và thịnh vượng đang hướng về bạn. Những khoản đầu tư bắt đầu sinh lời. Hãy cho phép bản thân tận hưởng những trái ngọt xứng đáng với công sức đã bỏ ra.", reversed: "Cảnh báo về sự phung phí quá đà để lấp đầy những khoảng trống tâm hồn, hoặc nỗi lo âu thái quá về tiền bạc khiến bạn mất đi sự bình yên nội tại." },
      health: { upright: "Cơ thể căng tràn sức sống và vẻ đẹp rạng rỡ. Sự kết nối sâu sắc với thiên nhiên, đi dạo dưới bóng cây sẽ là liều thuốc chữa lành tuyệt vời nhất cho bạn lúc này.", reversed: "Sự cạn kiệt thể chất do lơ là chăm sóc bản thân. Hãy học cách yêu thương cơ thể mình, nuôi dưỡng nó bằng những thực phẩm và thói quen lành mạnh trước khi quá muộn." },
      spiritual: { upright: "Tâm hồn bạn hòa nhịp đập cùng vũ trụ bao la. Cảm nhận sự bình yên sâu thẳm từ vạn vật xung quanh và dung dưỡng cội nguồn yêu thương bên trong bạn.", reversed: "Lạc mất mối liên kết thiêng liêng với Đất Mẹ, để cho những vật chất phù phiếm che mờ đôi mắt linh hồn. Đã đến lúc quay về chăm sóc khu vườn nội tâm." }
    },
    advice: "Hãy mở rộng vòng tay ôm lấy sự phong phú của vũ trụ, nhưng đừng quên tưới tắm cho khu vườn tâm hồn của chính mình. Tình yêu thương vĩ đại nhất bắt đầu từ việc yêu thương bản thân."
  },
  4: { // The Emperor
    generalUpright: "Ngự trị trên ngai vàng vững chãi, The Emperor là biểu tượng tối cao của quyền uy, trật tự và kỷ luật thép. Đã đến lúc bạn cất đi sự mềm yếu, dùng lý trí sắc bén và tầm nhìn chiến lược để thiết lập những quy tắc vững vàng, bảo vệ vương quốc của riêng mình.",
    generalReversed: "Sự sụp đổ của một đế chế thu nhỏ. Bạn đang trở nên cứng nhắc, độc tài, dùng uy quyền để áp bức người khác; hoặc ngược lại, đánh mất hoàn toàn khả năng kiểm soát, để cuộc đời trôi dạt trong sự vô kỷ luật.",
    aspects: {
      love: { upright: "Một mối quan hệ được xây dựng trên nền tảng của sự vững chãi, thực tế và tính cam kết cao. Có thể thiếu vắng những lời hoa mỹ, nhưng lại đong đầy sự chở che và bảo vệ chân thành.", reversed: "Mối quan hệ đang ngột ngạt bởi thói gia trưởng, thích kiểm soát và áp đặt của một phía. Hoặc đối phương là người thiếu trách nhiệm, lảng tránh sự cam kết." },
      career: { upright: "Bạn đang nắm giữ thế thượng phong. Bằng sự kỷ luật và khả năng lãnh đạo thiên bẩm, bạn có thể thiết lập nên những cấu trúc công việc mang lại thành công vang dội.", reversed: "Sự đối đầu gay gắt với cấp trên hoặc một môi trường làm việc bị cai trị bởi những quy định độc hại, cứng nhắc (micromanagement). Sự thiếu tổ chức đang phá hỏng dự án." },
      finance: { upright: "Quản lý dòng tiền với một kỷ luật thép. Sự vững vàng trong tư duy giúp bạn tạo ra những khối tài sản an toàn, tích lũy bền vững qua năm tháng.", reversed: "Mất kiểm soát ngân sách hoặc để người khác thao túng quyền quyết định tài chính của mình. Sự cứng nhắc trong đầu tư có thể khiến bạn đánh mất cơ hội." },
      health: { upright: "Một nền tảng thể lực vững chắc. Duy trì chế độ luyện tập nghiêm ngặt và lối sống có kỷ luật sẽ giúp bạn duy trì phong độ đỉnh cao.", reversed: "Cơ thể rệu rã do ôm đồm quá nhiều gánh nặng hoặc stress căng thẳng. Cần nới lỏng những quy tắc tự ép buộc để cơ thể được thở." },
      spiritual: { upright: "Rèn luyện sự tĩnh tại của tâm trí thông qua kỷ luật. Làm chủ được phần con để nâng cao phần người.", reversed: "Bị xiềng xích bởi những giáo điều bảo thủ. Tâm hồn xơ cứng, khước từ việc mở lòng đón nhận những triết lý mới mẻ của vũ trụ." }
    },
    advice: "Đừng để cảm xúc lấn át lý trí. Hãy thiết lập ranh giới rõ ràng, giữ vững kỷ luật và trở thành người cai trị thông thái nhất cho vương quốc cuộc đời bạn."
  },
  5: { // The Hierophant
    generalUpright: "Chiếc chìa khóa của những trí tuệ ngàn năm đang được The Hierophant trao cho bạn. Lá bài đại diện cho những giá trị truyền thống, hệ thống niềm tin tôn giáo và sự dẫn dắt của những bậc thầy. Đây là lúc tìm kiếm chân lý thông qua những con đường đã được thời gian kiểm chứng.",
    generalReversed: "Một khao khát mãnh liệt muốn đập tan những xiềng xích của lề thói cũ. Bạn không còn muốn đi theo đám đông hay tuân phục những quy tắc lỗi thời. Đây là sự nổi loạn để đi tìm hệ giá trị đích thực của riêng mình.",
    aspects: {
      love: { upright: "Tình yêu đang đơm hoa trên mảnh đất của những giá trị chung, sự thấu hiểu về đạo lý và văn hóa. Một lời cam kết sâu sắc, mang tính truyền thống như hôn nhân đang đến rất gần.", reversed: "Sự ngột ngạt vì những rào cản định kiến gia đình, tôn giáo. Bạn hoặc người ấy muốn phá vỡ khuôn mẫu, khao khát một tình yêu tự do không bị ai phán xét." },
      career: { upright: "Hòa mình vào văn hóa doanh nghiệp, làm việc theo hệ thống và tôn trọng cấp trên sẽ mang lại cho bạn vị thế vững chắc. Cơ hội tuyệt vời để học hỏi từ một người Thầy (Mentor) xuất chúng.", reversed: "Cảm giác bị kìm kẹp trong một bộ máy hành chính rườm rà, cứng nhắc. Bạn muốn phá vỡ các quy tắc vận hành cũ kỹ để đưa ra những ý tưởng mang tính cách mạng." },
      finance: { upright: "Hãy lựa chọn con đường an toàn. Tiền bạc nên được gửi gắm vào những tổ chức uy tín, những kênh đầu tư truyền thống đã được chứng minh qua các chu kỳ kinh tế.", reversed: "Cám dỗ từ những phương thức làm giàu phi truyền thống, phá cách. Cần cực kỳ tỉnh táo để không bị cuốn vào những rủi ro nằm ngoài tầm kiểm soát." },
      health: { upright: "Niềm tin vào y học hiện đại và những phác đồ điều trị bài bản. Hãy tuân thủ nghiêm ngặt lời khuyên của các chuyên gia y tế.", reversed: "Bạn đang có xu hướng tìm đến những phương pháp chữa trị thay thế (alternative medicine) hoặc các liệu pháp từ chối thuốc Tây y. Hãy cân nhắc kỹ lưỡng." },
      spiritual: { upright: "Tìm thấy sự an lạc thông qua các nghi lễ, giáo lý truyền thống hoặc hòa mình vào một cộng đồng tâm linh có tổ chức.", reversed: "Hành trình tâm linh độc lập. Bạn tự tay dỡ bỏ những bức tượng thần cũ kỹ để tự xây đắp nên một hệ thống đức tin mang đậm dấu ấn cá nhân." }
    },
    advice: "Đôi khi con đường mòn lại là con đường an toàn nhất. Hãy lắng nghe lời khuyên từ những bậc tiền bối, nhưng đừng đánh mất đi tiếng nói của lương tri."
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
const jsStr = '// js/data.js - Enriched Vibe Batch 2\n(function () {\n  window.TAROT_DB = ' + JSON.stringify(db, null, 2) + ';\n})();';
fs.writeFileSync('E:/TAROT/js/data.js', jsStr);
console.log('Enriched cards 3, 4, 5');
