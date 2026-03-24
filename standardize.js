const fs = require('fs');
const db = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json', 'utf8'));

db.forEach(card => {
  // Ensure all fields exist
  if (card.planet === undefined) card.planet = '';
  if (card.zodiac === undefined) card.zodiac = '';
  if (card.advice === undefined) card.advice = '';
  if (card.numerology === undefined) card.numerology = '';
  if (card.suit === undefined) card.suit = null;
  
  // Clean up nameVi for minor arcana (e.g. 'Ace of Wands (Một Gậy)' -> 'Một Gậy')
  if (card.arcana === 'minor' && card.nameVi && card.nameVi.includes('(')) {
    const match = card.nameVi.match(/\(([^)]+)\)/);
    if (match) {
      card.nameVi = match[1];
    }
  }

  // Ensure advice exists for minor
  if (card.arcana === 'minor' && card.advice === '') {
      card.advice = 'Lắng nghe trực giác và hoàn cảnh hiện tại của bạn để áp dụng linh hoạt bài học của lá bài này.';
  }
});

fs.writeFileSync('E:/TAROT/data/cards.json', JSON.stringify(db, null, 2));

const jsContent = // js/data.js - Full 78 Cards (Standardized)\n(function () {\n  window.TAROT_DB =  + JSON.stringify(db, null, 2) + ;\n})();;
fs.writeFileSync('E:/TAROT/js/data.js', jsContent);
console.log('Standardized 78 cards');
