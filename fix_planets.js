const fs = require('fs');
const db = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json', 'utf8'));

const fixMap = {
  "Page of Wands": { p: "Sao Hỏa", z: "Bạch Dương, Sư Tử, Nhân Mã" },
  "Knight of Wands": { p: "Sao Mộc", z: "Nhân Mã" },
  "Queen of Wands": { p: "Sao Hỏa", z: "Bạch Dương" },
  "King of Wands": { p: "Mặt Trời", z: "Sư Tử" },

  "Page of Cups": { p: "Mặt Trăng", z: "Cự Giải, Bọ Cạp, Song Ngư" },
  "Knight of Cups": { p: "Sao Hải Vương", z: "Song Ngư" },
  "Queen of Cups": { p: "Mặt Trăng", z: "Cự Giải" },
  "King of Cups": { p: "Sao Diêm Vương", z: "Bọ Cạp" },

  "Page of Swords": { p: "Sao Thủy", z: "Song Tử, Thiên Bình, Bảo Bình" },
  "Knight of Swords": { p: "Sao Thủy", z: "Song Tử" },
  "Queen of Swords": { p: "Sao Kim", z: "Thiên Bình" },
  "King of Swords": { p: "Sao Thiên Vương", z: "Bảo Bình" },

  "Page of Pentacles": { p: "Sao Kim", z: "Kim Ngưu, Xử Nữ, Ma Kết" },
  "Knight of Pentacles": { p: "Sao Thủy", z: "Xử Nữ" },
  "Queen of Pentacles": { p: "Sao Thổ", z: "Ma Kết" },
  "King of Pentacles": { p: "Sao Kim", z: "Kim Ngưu" }
};

db.forEach(c => {
  if (fixMap[c.name]) {
     c.planet = fixMap[c.name].p;
     c.zodiac = fixMap[c.name].z;
  }
});

fs.writeFileSync('E:/TAROT/data/cards.json', JSON.stringify(db, null, 2));
const jsStr = '// js/data.js - Fixed Court Cards Planets\n(function () {\n  window.TAROT_DB = ' + JSON.stringify(db, null, 2) + ';\n})();';
fs.writeFileSync('E:/TAROT/js/data.js', jsStr);
console.log('Fixed Planets and Zodiacs');
