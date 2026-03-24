const fs = require('fs');
const db = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json', 'utf8'));
const jsStr = '// js/data.js - Full 78 Cards (Standardized & Astrologically Accurate)\n(function () {\n  window.TAROT_DB = ' + JSON.stringify(db, null, 2) + ';\n})();';
fs.writeFileSync('E:/TAROT/js/data.js', jsStr);
console.log('Fixed js sync');
