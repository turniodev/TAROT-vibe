const fs = require('fs');
const db = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json', 'utf8'));

const fixMap = {
  "Page of Wands": { p: "Không có", z: "Không có" },
  "Knight of Wands": { p: "Không có", z: "Nhân Mã" },
  "Queen of Wands": { p: "Không có", z: "Bạch Dương" },
  "King of Wands": { p: "Không có", z: "Sư Tử" },

  "Page of Cups": { p: "Không có", z: "Không có" },
  "Knight of Cups": { p: "Không có", z: "Song Ngư" },
  "Queen of Cups": { p: "Không có", z: "Cự Giải" },
  "King of Cups": { p: "Không có", z: "Bọ Cạp" },

  "Page of Swords": { p: "Không có", z: "Không có" },
  "Knight of Swords": { p: "Không có", z: "Song Tử" },
  "Queen of Swords": { p: "Không có", z: "Thiên Bình" },
  "King of Swords": { p: "Không có", z: "Bảo Bình" },

  "Page of Pentacles": { p: "Không có", z: "Không có" },
  "Knight of Pentacles": { p: "Không có", z: "Xử Nữ" },
  "Queen of Pentacles": { p: "Không có", z: "Ma Kết" },
  "King of Pentacles": { p: "Không có", z: "Kim Ngưu" }
};

db.forEach(c => {
  if (fixMap[c.name]) {
     c.planet = fixMap[c.name].p;
     c.zodiac = fixMap[c.name].z;
  }
});

fs.writeFileSync('E:/TAROT/data/cards.json', JSON.stringify(db, null, 2));
const jsStr = '// js/data.js - Fixed Zodiacs\n(function () {\n  window.TAROT_DB = ' + JSON.stringify(db, null, 2) + ';\n})();';
fs.writeFileSync('E:/TAROT/js/data.js', jsStr);
console.log('Fixed Zodiacs');
