#!/usr/bin/env node
/**
 * fix_data.mjs — Post-process cards_scraped.json to clean up parser artifacts
 * Then regenerate js/data.js
 * Run: node fix_data.mjs
 */
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC  = path.join(__dirname, 'cards_scraped.json');
const DEST = path.join(__dirname, '..', 'js', 'data.js');

const raw = JSON.parse(fs.readFileSync(SRC, 'utf8'));

/* ────────────────────────────────────────────────────────
   CLEANING UTILITIES
──────────────────────────────────────────────────────── */

/** Trim trailing noise: numbered refs like "10.", "7.", section names */
function trimNoise(s) {
  if (!s) return '';
  return s
    .replace(/\s+\d+\.\s*$/, '')
    .replace(/\s+[A-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ][a-zàáâãèéêìíòóôõùúăđĩũơ\s]+:\s*$/, '')
    .replace(/Khi lá bài\s*(xuôi|ngược)\s*:/gi, '')
    .replace(/\s+/g, ' ').trim();
}

/** Extract first N clean sentences */
function firstSentences(s, n = 2) {
  if (!s) return '';
  const cleaned = s.replace(/\s+/g,' ').trim();
  const parts = cleaned.match(/[^.!?]+[.!?]*/g) || [cleaned];
  return parts.slice(0, n).join(' ').trim().slice(0, 300);
}

/** Clean planet / zodiac — keep only the actual name, max 35 chars */
function cleanAstro(s) {
  if (!s) return null;
  // Strip after em-dash, dash, opening paren, "–", comma
  let clean = s.replace(/\s*[–\-\(,].*/, '').trim();
  // Must start with a known pattern
  if (!/^(Sao|Mặt|Cung|Bảo|Kim|Thiên|Song|Nhân|Bạch|Cự|Ma|Thiên\s|Xử|Thần)/i.test(clean)) return null;
  return clean.length > 40 ? null : clean;
}

/** Filter keywords — no headings, no numbers, no colons, max 35 chars */
function cleanKeywords(arr) {
  if (!arr || !arr.length) return [];
  return arr
    .map(k => k.replace(/^[-–•\d]+[\.\)]\s*/, '').replace(/:/g,'').trim())
    .filter(k => k.length >= 3 && k.length <= 45 && !/^\d/.test(k) && !k.includes('chi tiết') && !k.includes('lĩnh vực'));
}

/** Extract only the upright part when text mixes xuôi/ngược */
function extractUpright(text) {
  if (!text) return '';
  // If has explicit "xuôi:"
  const upM = text.match(/(?:^|[\s\n])(?:Khi lá bài )?xuôi\s*[:–]\s*(.{15,}?)(?=(?:Khi lá bài )?ngược|$)/i);
  if (upM) return firstSentences(upM[1]);
  // Otherwise take first 2 sentences, but stop at "ngược"
  const beforeRev = text.split(/(?:Khi lá bài )?ngược\s*[:\s]/i)[0];
  return firstSentences(beforeRev);
}

/** Extract only the reversed part */
function extractReversed(text) {
  if (!text) return '';
  const revM = text.match(/(?:Khi lá bài )?ngược\s*[:–]\s*(.{15,}?)(?=(?:Khi lá bài )?xuôi|$)/i);
  if (revM) return firstSentences(revM[1]);
  return '';
}

/** Clean an aspect {up, rev} */
function cleanAspect(aspect, fallback = '') {
  const up  = trimNoise(extractUpright(aspect?.up  || '')) || firstSentences(aspect?.up  || '');
  const rev = trimNoise(extractReversed(aspect?.rev || ''))
    || trimNoise(extractReversed(aspect?.up || ''))  // rev might be in up field
    || firstSentences(aspect?.rev || '');
  return { up: up || fallback, rev };
}

/* ────────────────────────────────────────────────────────
   KNOWN PLANET / ZODIAC lookup (for when parser fails)
──────────────────────────────────────────────────────── */
const ASTRO = {
  0:  { planet:'Sao Thiên Vương', zodiac:'Bảo Bình' },
  1:  { planet:'Sao Thủy',        zodiac:'Song Tử & Xử Nữ' },
  2:  { planet:'Mặt Trăng',       zodiac:'Cự Giải' },
  3:  { planet:'Sao Kim',         zodiac:'Kim Ngưu & Thiên Bình' },
  4:  { planet:'Sao Hỏa',         zodiac:'Bạch Dương' },
  5:  { planet:'Sao Kim',         zodiac:'Kim Ngưu' },
  6:  { planet:'Sao Thủy',        zodiac:'Song Tử' },
  7:  { planet:'Mặt Trăng',       zodiac:'Cự Giải' },
  8:  { planet:'Mặt Trời',        zodiac:'Sư Tử' },
  9:  { planet:'Sao Thủy',        zodiac:'Xử Nữ' },
  10: { planet:'Sao Mộc',         zodiac:'Nhân Mã' },
  11: { planet:'Sao Kim',         zodiac:'Thiên Bình' },
  12: { planet:'Sao Hải Vương',   zodiac:'Song Ngư' },
  13: { planet:'Sao Hỏa',         zodiac:'Thiên Yết' },
  14: { planet:'Sao Mộc',         zodiac:'Nhân Mã' },
  15: { planet:'Sao Thổ',         zodiac:'Ma Kết' },
  16: { planet:'Sao Hỏa',         zodiac:'—' },
  17: { planet:'Sao Thiên Vương', zodiac:'Bảo Bình' },
  18: { planet:'Mặt Trăng',       zodiac:'Song Ngư' },
  19: { planet:'Mặt Trời',        zodiac:'Sư Tử' },
  20: { planet:'Sao Hỏa',         zodiac:'Thiên Yết' },
  21: { planet:'Sao Thổ',         zodiac:'Ma Kết' },
};
// Minor arcana planets from scrape are fine (less critical display)

/* ────────────────────────────────────────────────────────
   PROCESS EACH CARD
──────────────────────────────────────────────────────── */
const cards = raw.map(c => {
  const known = ASTRO[c.id] || {};
  const planet = known.planet || cleanAstro(c.planet);
  const zodiac = known.zodiac || cleanAstro(c.zodiac);
  const keywords = cleanKeywords(c.keywords);

  // Clean upright: for Minor Arcana, upright = general section text (no explicit xuôi label)
  // For Major, upright section usually has explicit xuôi/ngược
  let upright  = trimNoise(extractUpright(c.upright)) || firstSentences(c.upright);
  let reversed = trimNoise(extractReversed(c.reversed)) 
    || trimNoise(extractReversed(c.upright))
    || firstSentences(c.reversed);

  // If upright is still noisy (contains "lĩnh vực", section headers), use intro fallback
  if (!upright || upright.length < 20 || /lĩnh vực|xuôi:|ngược:/i.test(upright)) {
    upright = firstSentences(c.upright);
  }

  const love     = cleanAspect(c.aspects?.love);
  const career   = cleanAspect(c.aspects?.career);
  const finance  = cleanAspect(c.aspects?.finance);
  const health   = cleanAspect(c.aspects?.health);
  // Spiritual: many Minor Arcana don't have this section — build from intro
  const spiritualRaw = c.aspects?.spiritual;
  const spiritual = (spiritualRaw?.up && spiritualRaw.up.length > 10)
    ? cleanAspect(spiritualRaw)
    : { up: firstSentences(c.upright, 1), rev: firstSentences(c.reversed, 1) };

  const advice = trimNoise(firstSentences(c.advice || '', 2));

  return {
    id: c.id, name: c.name, nameVi: c.nameVi, number: c.number,
    arcana: c.arcana, image: c.image,
    planet, zodiac, keywords,
    keywordsRev: [],
    upright:  upright  || `Năng lượng của ${c.name} đang hiện diện trong cuộc sống bạn.`,
    reversed: reversed || `Khi ngược: năng lượng ${c.name} bị chặn hoặc biến đổi.`,
    aspects: { love, career, finance, health, spiritual },
    advice: advice || '',
    numerology: c.number,
  };
});

/* ────────────────────────────────────────────────────────
   WRITE CARDS_FIXED.JSON (for inspection)
──────────────────────────────────────────────────────── */
fs.writeFileSync(path.join(__dirname, 'cards_fixed.json'), JSON.stringify(cards, null, 2), 'utf8');

/* ────────────────────────────────────────────────────────
   BUILD DATA.JS
──────────────────────────────────────────────────────── */
function q(s)   { return JSON.stringify(s || ''); }
function qarr(a){ return '[' + (a||[]).map(q).join(',') + ']'; }
function asp(a) { return `{up:${q(a.up)},rev:${q(a.rev)}}`; }

const body = cards.map(c => `  {
    id:${c.id}, name:${q(c.name)}, nameVi:${q(c.nameVi)}, number:${q(c.number)},
    arcana:${q(c.arcana)}, image:${q(c.image)},
    planet:${q(c.planet)}, zodiac:${q(c.zodiac)},
    keywords:${qarr(c.keywords)}, keywordsRev:${qarr(c.keywordsRev)},
    upright:${q(c.upright)},
    reversed:${q(c.reversed)},
    aspects:{
      love:${asp(c.aspects.love)},
      career:${asp(c.aspects.career)},
      finance:${asp(c.aspects.finance)},
      health:${asp(c.aspects.health)},
      spiritual:${asp(c.aspects.spiritual)}
    },
    advice:${q(c.advice)}, numerology:${q(c.numerology)}
  }`).join(',\n');

const output = `// js/data.js — Full 78-card Tarot DB from tarotreader.me
// Fixed by fix_data.mjs. Do NOT edit manually.
(function () {
  window.TAROT_DB = [
${body}
  ];

  window.TarotHelper = {
    drawCards(count) {
      const pool = window.TAROT_DB.map(c => ({ ...c, isReversed: Math.random() < 0.3 }));
      for (let i = pool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      return pool.slice(0, count);
    },
    getThemeLabel(v) {
      return { love:'Tình Yêu', career:'Sự Nghiệp', finance:'Tài Chính',
               health:'Sức Khỏe', spiritual:'Tâm Linh', general:'Tổng Quát' }[v] || v;
    },
    getSpreadLabels(n) {
      if (n === 1) return ['Hiện Tại'];
      if (n === 3) return ['Quá Khứ', 'Hiện Tại', 'Tương Lai'];
      if (n === 5) return ['Tình Huống', 'Thách Thức', 'Lời Khuyên', 'Ảnh Hưởng', 'Kết Quả'];
      return Array.from({length:n}, (_,i) => \`Lá \${i+1}\`);
    }
  };
})();
`;

fs.writeFileSync(DEST, output, 'utf8');

// ── Stats ──
const filled = {
  upright:  cards.filter(c => c.upright  && c.upright.length  > 15).length,
  reversed: cards.filter(c => c.reversed && c.reversed.length > 10).length,
  love:     cards.filter(c => c.aspects.love.up.length    > 10).length,
  career:   cards.filter(c => c.aspects.career.up.length  > 10).length,
  finance:  cards.filter(c => c.aspects.finance.up.length > 10).length,
  health:   cards.filter(c => c.aspects.health.up.length  > 10).length,
};
console.log('✅ data.js written →', DEST);
console.log('   Size:', (fs.statSync(DEST).size/1024).toFixed(1), 'KB');
console.log('   Fill rates:', filled);

// ── Sample check ──
const sample = [0, 22, 70];
sample.forEach(i => {
  const c = cards[i];
  console.log(`\n[${c.id}] ${c.name} | planet:${c.planet} | zodiac:${c.zodiac}`);
  console.log('  KW:', c.keywords.join(', '));
  console.log('  UP:', (c.upright||'').slice(0,120));
  console.log('  REV:', (c.reversed||'').slice(0,100));
  console.log('  LOVE.UP:', c.aspects.love.up.slice(0,100));
});
