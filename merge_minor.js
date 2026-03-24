const fs = require('fs');

const wands = JSON.parse(fs.readFileSync('E:/TAROT/js/wands.json'));
const cups = JSON.parse(fs.readFileSync('E:/TAROT/js/cups.json'));
const swords = JSON.parse(fs.readFileSync('E:/TAROT/js/swords.json'));
const pentacles = JSON.parse(fs.readFileSync('E:/TAROT/js/pentacles.json'));

const minorArcana = [...wands, ...cups, ...swords, ...pentacles];

let fullCards = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json'));

for (let i = 0; i < minorArcana.length; i++) {
  const newCard = minorArcana[i];
  const oldCardIndex = fullCards.findIndex(c => c.id === newCard.id);
  
  if (oldCardIndex !== -1) {
    fullCards[oldCardIndex].nameVi = newCard.nameVi || "";
    fullCards[oldCardIndex].element = newCard.element || "";
    fullCards[oldCardIndex].keywords = newCard.keywords || [];
    fullCards[oldCardIndex].keywordsReversed = newCard.keywordsRev || [];
    fullCards[oldCardIndex].generalUpright = newCard.upright || "";
    fullCards[oldCardIndex].generalReversed = newCard.reversed || "";
    
    if(!fullCards[oldCardIndex].aspects) fullCards[oldCardIndex].aspects = { love: {}, career: {}, finance: {}, health: {} };
    if(!fullCards[oldCardIndex].aspects.love) fullCards[oldCardIndex].aspects.love = {};
    if(!fullCards[oldCardIndex].aspects.career) fullCards[oldCardIndex].aspects.career = {};
    if(!fullCards[oldCardIndex].aspects.finance) fullCards[oldCardIndex].aspects.finance = {};
    if(!fullCards[oldCardIndex].aspects.health) fullCards[oldCardIndex].aspects.health = {};
    
    fullCards[oldCardIndex].aspects.love.upright = newCard.aspects.love.up;
    fullCards[oldCardIndex].aspects.love.reversed = newCard.aspects.love.rev;
    fullCards[oldCardIndex].aspects.career.upright = newCard.aspects.career.up;
    fullCards[oldCardIndex].aspects.career.reversed = newCard.aspects.career.rev;
    fullCards[oldCardIndex].aspects.finance.upright = newCard.aspects.finance.up;
    fullCards[oldCardIndex].aspects.finance.reversed = newCard.aspects.finance.rev;
    fullCards[oldCardIndex].aspects.health.upright = newCard.aspects.health.up;
    fullCards[oldCardIndex].aspects.health.reversed = newCard.aspects.health.rev;
    
    fullCards[oldCardIndex].aspects.spiritual = {
      upright: newCard.aspects.spiritual ? newCard.aspects.spiritual.up : "",
      reversed: newCard.aspects.spiritual ? newCard.aspects.spiritual.rev : ""
    };
  }
}

fs.writeFileSync('E:/TAROT/data/cards.json', JSON.stringify(fullCards, null, 2));

const jsContent = // js/data.js - Full 78 Cards (Fixed & Accurate RWS Vietnamese Database)
(function () {
  window.TAROT_DB =  + JSON.stringify(fullCards, null, 2) + ;
})();;

fs.writeFileSync('E:/TAROT/js/data.js', jsContent);
console.log("SUCCESS: 78 CARDS DATABASE GENERATED!");
