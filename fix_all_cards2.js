const fs = require('fs');

try {
  const m1 = JSON.parse(fs.readFileSync('E:/TAROT/js/major_0_5.json'));
  const m2 = JSON.parse(fs.readFileSync('E:/TAROT/js/major_6_10.json'));
  const m3 = JSON.parse(fs.readFileSync('E:/TAROT/js/major_11_15.json'));
  const m4 = JSON.parse(fs.readFileSync('E:/TAROT/js/major_16_21.json'));
  
  const wands = JSON.parse(fs.readFileSync('E:/TAROT/js/wands.json'));
  const cups = JSON.parse(fs.readFileSync('E:/TAROT/js/cups.json'));
  const swords = JSON.parse(fs.readFileSync('E:/TAROT/js/swords.json'));
  const pentacles = JSON.parse(fs.readFileSync('E:/TAROT/js/pentacles.json'));

  const fullDeck = [...m1, ...m2, ...m3, ...m4, ...wands, ...cups, ...swords, ...pentacles];
  
  fs.writeFileSync('E:/TAROT/data/cards.json', JSON.stringify(fullDeck, null, 2));
  
  const jsContent = `// js/data.js - Full 78 Cards (Fixed & Accurate RWS Vietnamese Database)\n(function () {\n  window.TAROT_DB = ` + JSON.stringify(fullDeck, null, 2) + `;\n})();`;
  
  fs.writeFileSync('E:/TAROT/js/data.js', jsContent);
  console.log('SUCCESS: Merged ' + fullDeck.length + ' cards into data.js');
} catch (e) {
  console.error(e);
}
