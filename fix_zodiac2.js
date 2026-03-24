const fs = require('fs');
const db = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json', 'utf8'));

const fixes = {
  "Wheel of Fortune": "Nhân Mã, Song Ngư",
  "The Hanged Man": "Song Ngư",
  "The Tower": "Bạch Dương, Bọ Cạp",
  "Judgement": "Bọ Cạp",
  "The World": "Ma Kết, Bảo Bình"
};

db.forEach(c => {
  if (fixes[c.name] && c.zodiac === "Không có") {
    c.zodiac = fixes[c.name];
  }
});

fs.writeFileSync('E:/TAROT/data/cards.json', JSON.stringify(db, null, 2));

const jsContent = `// js/data.js - Fixed all 'Không có' Zodiacs\n(function () {\n  window.TAROT_DB = ` + JSON.stringify(db, null, 2) + `;\n})();`;
fs.writeFileSync('E:/TAROT/js/data.js', jsContent);
console.log("Fixed 5 remaining Zodiacs.");
