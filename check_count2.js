const fs = require('fs');
try {
  const json = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json', 'utf8'));
  console.log('Number of cards in cards.json:', json.length);
} catch (e) { console.error('Error parsing cards.json', e.message); }
try {
  const js = fs.readFileSync('E:/TAROT/js/data.js', 'utf8');
  const items = js.match(/\{[\s\S]*?\nid:\s*\d+/g);
  console.log('Approximate items in data.js:', items ? items.length : 0);
} catch (e) {}
