const fs = require('fs');
const fullCards = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json'));
const jsContent = '(function () { window.TAROT_DB = ' + JSON.stringify(fullCards, null, 2) + '; })();';
fs.writeFileSync('E:/TAROT/js/data.js', jsContent);
console.log('SUCCESS');
