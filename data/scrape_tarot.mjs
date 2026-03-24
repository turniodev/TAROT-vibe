#!/usr/bin/env node
/**
 * scrape_tarot.mjs v2 — Improved parser handling both Major & Minor layouts
 * Run: node scrape_tarot.mjs
 * Output: e:/TAROT/data/cards_scraped.json
 */
import https from 'https';
import fs   from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_PATH  = path.join(__dirname, 'cards_scraped.json');

const URLS = [
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-fool-tarot/',     id:0,  name:'The Fool',           nameVi:'Kẻ Ngốc',          num:'0',    img:'cards/0-The-Fool.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-magician/',        id:1,  name:'The Magician',       nameVi:'Pháp Sư',           num:'I',    img:'cards/1-The-Magician.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-high-priestess/',  id:2,  name:'The High Priestess', nameVi:'Nữ Tư Tế',          num:'II',   img:'cards/2-The-High-Priestess.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-empress/',         id:3,  name:'The Empress',        nameVi:'Nữ Hoàng',          num:'III',  img:'cards/3-The-Empress.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-emperor/',         id:4,  name:'The Emperor',        nameVi:'Hoàng Đế',          num:'IV',   img:'cards/4-The-Emperor.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-hierophant/',      id:5,  name:'The Hierophant',     nameVi:'Giáo Hoàng',        num:'V',    img:'cards/5-The-Hierophant.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-lovers/',          id:6,  name:'The Lovers',         nameVi:'Người Tình',        num:'VI',   img:'cards/6-The-Lovers.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-chariot/',         id:7,  name:'The Chariot',        nameVi:'Cỗ Xe',             num:'VII',  img:'cards/7-The-Chariot.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-strength/',            id:8,  name:'Strength',           nameVi:'Sức Mạnh',          num:'VIII', img:'cards/8-Strength.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-hermit/',          id:9,  name:'The Hermit',         nameVi:'Ẩn Sĩ',             num:'IX',   img:'cards/9-The-Hermit.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-wheel-of-fortune/',    id:10, name:'Wheel of Fortune',   nameVi:'Bánh Xe Số Phận',   num:'X',    img:'cards/10-Wheel-of-Fortune.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-justice/',             id:11, name:'Justice',            nameVi:'Công Lý',           num:'XI',   img:'cards/11-Justice.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-hanged-man/',      id:12, name:'The Hanged Man',     nameVi:'Người Bị Treo',     num:'XII',  img:'cards/12-The-Hanged-Man.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-death/',               id:13, name:'Death',              nameVi:'Cái Chết',          num:'XIII', img:'cards/13-Death.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-temperance/',          id:14, name:'Temperance',         nameVi:'Điều Độ',           num:'XIV',  img:'cards/14-Temperance.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-devil/',           id:15, name:'The Devil',          nameVi:'Ác Quỷ',            num:'XV',   img:'cards/15-The-Devil.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-tower/',           id:16, name:'The Tower',          nameVi:'Ngọn Tháp',         num:'XVI',  img:'cards/16-The-Tower.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-star/',            id:17, name:'The Star',           nameVi:'Ngôi Sao',          num:'XVII', img:'cards/17-The-Star.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-moon/',            id:18, name:'The Moon',           nameVi:'Mặt Trăng',         num:'XVIII',img:'cards/18-The-Moon.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-sun/',             id:19, name:'The Sun',            nameVi:'Mặt Trời',          num:'XIX',  img:'cards/19-The-Sun.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-judgement/',           id:20, name:'Judgement',          nameVi:'Phán Xét',          num:'XX',   img:'cards/20-Judgement.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-the-world/',           id:21, name:'The World',          nameVi:'Thế Giới',          num:'XXI',  img:'cards/21-The-World.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-ace-of-wands/',        id:22, name:'Ace of Wands',       nameVi:'Át Gậy',            num:'A',    img:'cards/22-Ace-of-Wands.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-two-of-wands/',        id:23, name:'Two of Wands',       nameVi:'Hai Gậy',           num:'2',    img:'cards/23-Two-of-Wands.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-three-of-wands/',      id:24, name:'Three of Wands',     nameVi:'Ba Gậy',            num:'3',    img:'cards/24-Three-of-Wands.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-four-of-wands/',       id:25, name:'Four of Wands',      nameVi:'Bốn Gậy',           num:'4',    img:'cards/25-Four-of-Wands.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-five-of-wands/',       id:26, name:'Five of Wands',      nameVi:'Năm Gậy',           num:'5',    img:'cards/26-Five-of-Wands.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-six-of-wands/',        id:27, name:'Six of Wands',       nameVi:'Sáu Gậy',           num:'6',    img:'cards/27-Six-of-Wands.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-seven-of-wands/',      id:28, name:'Seven of Wands',     nameVi:'Bảy Gậy',           num:'7',    img:'cards/28-Seven-of-Wands.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-eight-of-wands/',      id:29, name:'Eight of Wands',     nameVi:'Tám Gậy',           num:'8',    img:'cards/29-Eight-of-Wands.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-nine-of-wands/',       id:30, name:'Nine of Wands',      nameVi:'Chín Gậy',          num:'9',    img:'cards/30-Nine-of-Wands.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-ten-of-wands/',        id:31, name:'Ten of Wands',       nameVi:'Mười Gậy',          num:'10',   img:'cards/31-Ten-of-Wands.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-page-of-wands/',       id:32, name:'Page of Wands',      nameVi:'Tiểu Quân Gậy',     num:'P',    img:'cards/32-Page-of-Wands.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-knight-of-wands/',     id:33, name:'Knight of Wands',    nameVi:'Kỵ Sĩ Gậy',         num:'Kn',   img:'cards/33-Knight-of-Wands.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-queen-of-wands/',      id:34, name:'Queen of Wands',     nameVi:'Nữ Hoàng Gậy',      num:'Q',    img:'cards/34-Queen-of-Wands.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-king-of-wands/',       id:35, name:'King of Wands',      nameVi:'Đức Vua Gậy',       num:'K',    img:'cards/35-King-of-Wands.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-ace-of-cups/',         id:36, name:'Ace of Cups',        nameVi:'Át Chén',           num:'A',    img:'cards/36-Ace-of-Cups.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-two-of-cups/',         id:37, name:'Two of Cups',        nameVi:'Hai Chén',          num:'2',    img:'cards/37-Two-of-Cups.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-three-of-cups/',       id:38, name:'Three of Cups',      nameVi:'Ba Chén',           num:'3',    img:'cards/38-Three-of-Cups.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-four-of-cups/',        id:39, name:'Four of Cups',       nameVi:'Bốn Chén',          num:'4',    img:'cards/39-Four-of-Cups.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-five-of-cups/',        id:40, name:'Five of Cups',       nameVi:'Năm Chén',          num:'5',    img:'cards/40-Five-of-Cups.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-six-of-cups/',         id:41, name:'Six of Cups',        nameVi:'Sáu Chén',          num:'6',    img:'cards/41-Six-of-Cups.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-seven-of-cups/',       id:42, name:'Seven of Cups',      nameVi:'Bảy Chén',          num:'7',    img:'cards/42-Seven-of-Cups.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-eight-of-cups/',       id:43, name:'Eight of Cups',      nameVi:'Tám Chén',          num:'8',    img:'cards/43-Eight-of-Cups.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-nine-of-cups/',        id:44, name:'Nine of Cups',       nameVi:'Chín Chén',         num:'9',    img:'cards/44-Nine-of-Cups.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-ten-of-cups/',         id:45, name:'Ten of Cups',        nameVi:'Mười Chén',         num:'10',   img:'cards/45-Ten-of-Cups.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-page-of-cups/',        id:46, name:'Page of Cups',       nameVi:'Tiểu Quân Chén',    num:'P',    img:'cards/46-Page-of-Cups.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-knight-of-cups/',      id:47, name:'Knight of Cups',     nameVi:'Kỵ Sĩ Chén',        num:'Kn',   img:'cards/47-Knight-of-Cups.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-queen-of-cups/',       id:48, name:'Queen of Cups',      nameVi:'Nữ Hoàng Chén',     num:'Q',    img:'cards/48-Queen-of-Cups.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-king-of-cups/',        id:49, name:'King of Cups',       nameVi:'Đức Vua Chén',      num:'K',    img:'cards/49-King-of-Cups.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-ace-of-swords/',       id:50, name:'Ace of Swords',      nameVi:'Át Kiếm',           num:'A',    img:'cards/50-Ace-of-Swords.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-two-of-swords/',       id:51, name:'Two of Swords',      nameVi:'Hai Kiếm',          num:'2',    img:'cards/51-Two-of-Swords.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-three-of-swords/',     id:52, name:'Three of Swords',    nameVi:'Ba Kiếm',           num:'3',    img:'cards/52-Three-of-Swords.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-four-of-swords/',      id:53, name:'Four of Swords',     nameVi:'Bốn Kiếm',          num:'4',    img:'cards/53-Four-of-Swords.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-five-of-swords/',      id:54, name:'Five of Swords',     nameVi:'Năm Kiếm',          num:'5',    img:'cards/54-Five-of-Swords.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-six-of-swords/',       id:55, name:'Six of Swords',      nameVi:'Sáu Kiếm',          num:'6',    img:'cards/55-Six-of-Swords.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-seven-of-swords/',     id:56, name:'Seven of Swords',    nameVi:'Bảy Kiếm',          num:'7',    img:'cards/56-Seven-of-Swords.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-eight-of-swords/',     id:57, name:'Eight of Swords',    nameVi:'Tám Kiếm',          num:'8',    img:'cards/57-Eight-of-Swords.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-nine-of-swords/',      id:58, name:'Nine of Swords',     nameVi:'Chín Kiếm',         num:'9',    img:'cards/58-Nine-of-Swords.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-ten-of-swords/',       id:59, name:'Ten of Swords',      nameVi:'Mười Kiếm',         num:'10',   img:'cards/59-Ten-of-Swords.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-page-of-swords/',      id:60, name:'Page of Swords',     nameVi:'Tiểu Quân Kiếm',    num:'P',    img:'cards/60-Page-of-Swords.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-knight-of-swords/',    id:61, name:'Knight of Swords',   nameVi:'Kỵ Sĩ Kiếm',        num:'Kn',   img:'cards/61-Knight-of-Swords.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-queen-of-swords/',     id:62, name:'Queen of Swords',    nameVi:'Nữ Hoàng Kiếm',     num:'Q',    img:'cards/62-Queen-of-Swords-1.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-king-of-swords/',      id:63, name:'King of Swords',     nameVi:'Đức Vua Kiếm',      num:'K',    img:'cards/63-King-of-Swords.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-ace-of-pentacles/',    id:64, name:'Ace of Pentacles',   nameVi:'Át Đồng',           num:'A',    img:'cards/64-Ace-of-Pentacles.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-two-of-pentacles/',    id:65, name:'Two of Pentacles',   nameVi:'Hai Đồng',          num:'2',    img:'cards/65-Two-of-Pentacles.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-three-of-pentacles/',  id:66, name:'Three of Pentacles', nameVi:'Ba Đồng',           num:'3',    img:'cards/66-Three-of-Pentacles.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-four-of-pentacles/',   id:67, name:'Four of Pentacles',  nameVi:'Bốn Đồng',          num:'4',    img:'cards/67-Four-of-Pentacles.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-five-of-pentacles/',   id:68, name:'Five of Pentacles',  nameVi:'Năm Đồng',          num:'5',    img:'cards/68-Five-of-Pentacles.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-six-of-pentacles/',    id:69, name:'Six of Pentacles',   nameVi:'Sáu Đồng',          num:'6',    img:'cards/69-Six-of-Pentacles.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-seven-of-pentacles/',  id:70, name:'Seven of Pentacles', nameVi:'Bảy Đồng',          num:'7',    img:'cards/70-Seven-of-Pentacles.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-eight-of-pentacles/',  id:71, name:'Eight of Pentacles', nameVi:'Tám Đồng',          num:'8',    img:'cards/71-Eight-of-Pentacles.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-nine-of-pentacles/',   id:72, name:'Nine of Pentacles',  nameVi:'Chín Đồng',         num:'9',    img:'cards/72-Nine-of-Pentacles.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-ten-of-pentacles/',    id:73, name:'Ten of Pentacles',   nameVi:'Mười Đồng',         num:'10',   img:'cards/73-Ten-of-Pentacles.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-page-of-pentacles/',   id:74, name:'Page of Pentacles',  nameVi:'Tiểu Quân Đồng',    num:'P',    img:'cards/74-Page-of-Pentacles.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-knight-of-pentacles/', id:75, name:'Knight of Pentacles',nameVi:'Kỵ Sĩ Đồng',        num:'Kn',   img:'cards/75-Knight-of-Pentacles.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-queen-of-pentacles/',  id:76, name:'Queen of Pentacles', nameVi:'Nữ Hoàng Đồng',     num:'Q',    img:'cards/76-Queen-of-Pentacles.jpg' },
  { url:'https://tarotreader.me/tarot/y-nghia-cua-la-king-of-pentacles/',   id:77, name:'King of Pentacles',  nameVi:'Đức Vua Đồng',      num:'K',    img:'cards/77-King-of-Pentacles.jpg' },
];

/* ── HTTP fetch with redirect follow ─────────────────── */
function fetchPage(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    if (redirects > 5) return reject(new Error('Too many redirects'));
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TarotScraper/2.0)' } }, res => {
      if ([301,302,303,307,308].includes(res.statusCode)) {
        return resolve(fetchPage(res.headers.location, redirects + 1));
      }
      let data = '';
      res.setEncoding('utf8');
      res.on('data', c => data += c);
      res.on('end', () => resolve(data));
    });
    req.on('error', reject);
    req.setTimeout(20000, () => { req.destroy(); reject(new Error('Timeout')); });
  });
}

/* ── Strip HTML to plain text ─────────────────────────── */
function toText(html) {
  // Remove script/style blocks
  let t = html
    .replace(/<script[\s\S]*?<\/script>/gi, '\n')
    .replace(/<style[\s\S]*?<\/style>/gi, '\n');
  // Block elements → newline
  t = t.replace(/<\/?(p|div|section|article|h[1-6]|li|ul|ol|br|tr|td|th)[^>]*>/gi, '\n');
  // Strip remaining tags
  t = t.replace(/<[^>]+>/g, '');
  // Decode entities
  t = t.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&nbsp;/g,' ')
        .replace(/&#8211;/g,'–').replace(/&#8212;/g,'—').replace(/&#[0-9]+;/g,' ')
        .replace(/&[a-z]+;/g,' ');
  // Normalize whitespace
  t = t.split('\n').map(l => l.replace(/\s+/g,' ').trim()).filter(Boolean).join('\n');
  return t;
}

/* ── Find a section by keyword, return its body text ──── */
function findSection(lines, ...headingKeywords) {
  // Search case-insensitive across all keywords
  for (const kw of headingKeywords) {
    const idx = lines.findIndex(l =>
      l.toLowerCase().includes(kw.toLowerCase()) && l.length < 120
    );
    if (idx === -1) continue;
    // Collect text until next heading-like line
    const body = [];
    for (let i = idx + 1; i < Math.min(idx + 40, lines.length); i++) {
      const line = lines[i];
      // Stop if we hit a new heading section
      if (i > idx + 2 && line.length < 90 && /^(ý nghĩa|công việc|tình yêu|sức khỏe|tài chính|tâm linh|kết luận|lời khuyên|câu hỏi|diễn|phân tích|giới thiệu|hành tinh|cung|từ khóa)/i.test(line)) break;
      body.push(line);
    }
    const text = body.join(' ').trim();
    if (text.length > 20) return text;
  }
  return '';
}

/* ── Extract upright / reversed from a section ─────────── */
function upRev(sectionText) {
  // Try explicit "xuôi:" / "ngược:" markers
  const upM  = sectionText.match(/xuôi\s*[:–\-]\s*(.{10,300}?)(?=ngược|$)/i);
  const revM = sectionText.match(/ngược\s*[:–\-]\s*(.{10,300}?)(?=xuôi|$)/i);
  if (upM || revM) {
    return {
      up:  firstSentences(upM  ? upM[1]  : '', 2),
      rev: firstSentences(revM ? revM[1] : '', 2)
    };
  }
  // No explicit split — whole text is the upright, infer reversed from context
  const up = firstSentences(sectionText, 3);
  // Try to find reversed hint in same text
  const revHint = sectionText.match(/(?:nếu ngược|khi ngược|lá ngược)[,\s]+(.{10,200})/i);
  return {
    up,
    rev: revHint ? firstSentences(revHint[1], 2) : ''
  };
}

/* ── Return first N sentences from text ─────────────────── */
function firstSentences(text, n) {
  if (!text) return '';
  const s = text.replace(/\s+/g, ' ').trim();
  const parts = s.match(/[^.!?]+[.!?]*/g) || [s];
  return parts.slice(0, n).join(' ').trim().slice(0, 280);
}

/* ── Parse keywords list ────────────────────────────────── */
function extractKeywords(lines) {
  const idx = lines.findIndex(l => /từ khóa/i.test(l) && l.length < 80);
  if (idx === -1) return [];
  const kws = [];
  for (let i = idx + 1; i < Math.min(idx + 20, lines.length); i++) {
    const l = lines[i].replace(/^[-–•*]\s*/, '').trim();
    if (l.length < 3 || l.length > 60) continue;
    if (/^(phân tích|hành tinh|cung|giới thiệu|ý nghĩa|công việc|tình yêu)/i.test(l)) break;
    kws.push(l);
  }
  return kws.slice(0, 8);
}

/* ── Main parse function ────────────────────────────────── */
function parsePage(html, meta) {
  const lines = toText(html).split('\n');

  // ── Keywords
  const keywords = extractKeywords(lines);

  // ── Planet / Zodiac
  const fullText = lines.join(' ');
  const planetM = fullText.match(/[Hh]ành tinh[^:：]*[:：]\s*([^,.\n]{3,60})/);
  const zodiacM = fullText.match(/[Cc]ung hoàng đạo[^:：]*[:：]\s*([^,.\n]{3,60})/);
  const planet  = planetM ? planetM[1].replace(/\(.*?\)/g,'').trim() : null;
  const zodiac  = zodiacM ? zodiacM[1].replace(/\(.*?\)/g,'').trim() : null;

  // ── Overall upright & reversed
  // Major Arcana layout: explicit "Ý nghĩa xuôi" / "Ý nghĩa ngược" sections
  const uprightSec  = findSection(lines, 'ý nghĩa xuôi', 'xuôi:');
  const reversedSec = findSection(lines, 'ý nghĩa ngược', 'ngược:');
  // Fallback: intro paragraph (2nd-3rd paragraph after title)
  const introParagraph = lines.slice(2, 12).filter(l => l.length > 60).join(' ');

  let upright  = uprightSec  ? firstSentences(uprightSec,  3) : firstSentences(introParagraph, 2);
  let reversed = reversedSec ? firstSentences(reversedSec, 3) : '';

  // ── Love
  const loveSec  = findSection(lines, 'tình yêu', 'tình cảm');
  const love     = upRev(loveSec);

  // ── Career
  const careerSec = findSection(lines, 'công việc', 'sự nghiệp', 'nghề nghiệp');
  const career    = upRev(careerSec);

  // ── Finance
  const financeSec = findSection(lines, 'tài chính', 'tài Chính');
  const finance    = upRev(financeSec);

  // ── Health
  const healthSec = findSection(lines, 'sức khỏe', 'sức Khỏe');
  const health    = upRev(healthSec);

  // ── Spiritual
  const spiritualSec = findSection(lines, 'tâm linh');
  const spiritual    = upRev(spiritualSec);

  // ── Advice / Conclusion
  const adviceSec = findSection(lines, 'lời khuyên', 'kết luận');
  const advice    = firstSentences(adviceSec, 2);

  // ── If upright still empty, use love.up as universal meaning
  if (!upright && love.up) upright = love.up;
  if (!reversed && love.rev) reversed = love.rev;

  return {
    id:       meta.id,
    name:     meta.name,
    nameVi:   meta.nameVi,
    number:   meta.num,
    arcana:   meta.id <= 21 ? 'major' : 'minor',
    image:    meta.img,
    planet,
    zodiac,
    keywords: keywords.length ? keywords : [meta.name],
    keywordsRev: [],
    upright:  upright  || `Ý nghĩa của ${meta.name}.`,
    reversed: reversed || `Khi ngược: năng lượng ${meta.name} bị chặn hoặc biến đổi.`,
    aspects: {
      love:      { up: love.up,     rev: love.rev },
      career:    { up: career.up,   rev: career.rev },
      finance:   { up: finance.up,  rev: finance.rev },
      health:    { up: health.up,   rev: health.rev },
      spiritual: { up: spiritual.up,rev: spiritual.rev },
    },
    advice:     advice || '',
    numerology: meta.num,
  };
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function main() {
  const results = [];
  const failed  = [];

  for (let i = 0; i < URLS.length; i++) {
    const meta = URLS[i];
    process.stdout.write(`[${String(i+1).padStart(2)}/${URLS.length}] ${meta.name.padEnd(24)}... `);
    try {
      const html = await fetchPage(meta.url);
      const card = parsePage(html, meta);
      results.push(card);
      // Quick quality check
      const filled = [card.upright, card.reversed, card.aspects.love.up, card.aspects.career.up].filter(s => s && s.length > 10).length;
      console.log(`✓  (${filled}/4 fields)`);
    } catch (err) {
      console.log('✗  ' + err.message);
      failed.push({ ...meta, error: err.message });
      results.push({ id: meta.id, name: meta.name, nameVi: meta.nameVi,
        number: meta.num, arcana: meta.id <= 21 ? 'major' : 'minor',
        image: meta.img, planet: null, zodiac: null, keywords: [meta.name],
        keywordsRev: [], upright: '', reversed: '',
        aspects: { love:{up:'',rev:''}, career:{up:'',rev:''}, finance:{up:'',rev:''},
                   health:{up:'',rev:''}, spiritual:{up:'',rev:''} },
        advice: '', numerology: meta.num, error: true });
    }
    if (i < URLS.length - 1) await sleep(500);
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(results, null, 2), 'utf8');
  console.log(`\n✅ Done! Saved ${results.length} cards → ${OUT_PATH}`);
  if (failed.length) {
    console.log(`⚠️  ${failed.length} failed: ${failed.map(f=>f.name).join(', ')}`);
  }
}

main().catch(console.error);
