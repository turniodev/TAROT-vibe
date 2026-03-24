const fs = require('fs');

const p1 = JSON.parse(fs.readFileSync('E:/TAROT/js/major_0_5.json'));
const p2 = JSON.parse(fs.readFileSync('E:/TAROT/js/major_6_10.json'));
const p3 = JSON.parse(fs.readFileSync('E:/TAROT/js/major_11_15.json'));
const p4 = JSON.parse(fs.readFileSync('E:/TAROT/js/major_16_21.json'));

const majorArcana = [...p1, ...p2, ...p3, ...p4];

let fullCards = JSON.parse(fs.readFileSync('E:/TAROT/data/cards.json'));

for (let i = 0; i < majorArcana.length; i++) {
  const newCard = majorArcana[i];
  const oldCardIndex = fullCards.findIndex(c => c.id === newCard.id);
  
  if (oldCardIndex !== -1) {
    fullCards[oldCardIndex].nameVi = newCard.nameVi || "";
    fullCards[oldCardIndex].planet = newCard.planet || "";
    fullCards[oldCardIndex].zodiac = newCard.zodiac || "";
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
    
    fullCards[oldCardIndex].advice = newCard.advice || "";
    fullCards[oldCardIndex].numerology = newCard.numerology || "";
  }
}

fs.writeFileSync('E:/TAROT/data/cards.json', JSON.stringify(fullCards, null, 2));

const dbString = JSON.stringify(fullCards, null, 2);
const jsContent = // js/data.js - Fixed Major Arcana (Phase 1)
(function () {
  window.TAROT_DB =  + dbString + ;
})();;

fs.writeFileSync('E:/TAROT/js/data.js', jsContent);
console.log("SUCCESS: DB generated!");
