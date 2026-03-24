const fs = require('fs');
const data = fs.readFileSync('E:/TAROT/js/data.js', 'utf8');
const match = data.match(/window\.TAROT_DB\s*=\s*(\[.*\]);/s);
if (match) { const db = JSON.parse(match[1]); console.log('Number of cards in data.js:', db.length); } else { console.log('Could not parse TAROT_DB'); }
const json = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json', 'utf8'));
console.log('Number of cards in cards.json:', json.length);
