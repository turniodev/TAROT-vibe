const fs = require('fs');
const db = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json', 'utf8'));

let count = 0;
db.forEach(c => {
  for (let key in c) {
    if (c[key] === "Không có" || c[key] === "") {
      console.log(Card  (): field '' is '');
      count++;
    }
  }
});
console.log('Total:', count);
