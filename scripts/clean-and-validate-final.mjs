#!/usr/bin/env node
/**
 * Pratiksel - Tarihte Bugün KAPSAMLI TEMİZLEME & VALIDATION (Final Master)
 *
 * Kullanım:
 *   node clean-and-validate-final.mjs "src\data\todayInHistory.ts"
 *
 * Çıktı:
 *   src\data\todayInHistory.final.cleaned.ts
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Kullanım: node clean-and-validate-final.mjs <todayInHistory.ts>');
  process.exit(1);
}

const inputPath = path.resolve(inputFile);
const dir = path.dirname(inputPath);
const outputFile = path.join(dir, 'todayInHistory.final.cleaned.ts');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const backupFile = path.join(dir, `todayInHistory.backup.${timestamp}.ts`);

function unescapeTs(s) {
  return s.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
}

function escapeTs(s) {
  return String(s ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, ' ').replace(/\s+/g, ' ').trim();
}

function getField(block, field) {
  const re = new RegExp('\\b' + field + ":\\s*'((?:\\\\'|[^'])*)'");
  const m = block.match(re);
  return m ? unescapeTs(m[1]) : null;
}

function normalizeText(s) {
  if (!s) return s;
  return String(s)
    .replace(/\u00a0/g, ' ')
    .replace(/\u200b/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,;:!?%)\]])/g, '$1')
    .replace(/([([\"])\s+/g, '$1')
    .replace(/(\p{L}+)\s+'([a-zA-ZğüşıöçĞÜŞİÖÇ]+)/gu, "$1'$2")
    .replace(/(\p{L}+)\s+'\s*([a-zA-ZğüşıöçĞÜŞİÖÇ]+)/gu, "$1'$2")
    .replace(/"\s+([^"]+?)\s+"/g, '"$1"')
    .replace(/"([a-zA-ZğüşıöçĞÜŞİÖÇ]{3,})/g, ' "$1')
    .replace(/([a-zA-ZğüşıöçĞÜŞİÖÇ]{3,})"/g, '$1" ')
    .replace(/\s+/g, ' ')
    .trim();
}

function lower(s) { return normalizeText(s || '').toLocaleLowerCase('tr-TR'); }

const VALID_CATEGORIES = new Set(['event','turkey','world','science','culture','sports','birth','death']);

const TURKEY_STRONG = [
  /\btürkiye\b/i,/\btürk(?:iye|ler|çe|lüğü|'ün|'e|'de|'nin| devlet| millî| liras)/i,/\bosmanlı\b/i,
  /\bselçuklu(?:lar| devleti| sultanlığı)?\b/i,/\banadolu\b/i,/\btbmm\b/i,/\batatürk\b/i,
  /\bmustafa kemal\b/i,/\bkurtuluş savaşı\b/i,/\bçanakkale\b/i,/\bmalazgirt\b/i,
  /\bistanbul(?:'un fethi| fethi|\b)/i,/\bankara\b/i,/\bizmir\b/i,/\bizmit\b/i,
  /\bbursa\b/i,/\bedirne\b/i,/\bkonya\b/i,/\btrabzon\b/i,/\bantalya\b/i,
  /\bgalatasaray\b/i,/\bfenerbahçe\b/i,/\bbeşiktaş\b/i,/\btrabzonspor\b/i,
  /\b(?:türkiye|osmanlı) (?:cumhuriyeti|sultanlığı|devleti|imparatorluğu)\b/i,
  /\bosmanlı.*\b(?:padişah|sultan|sadrazam|vezir)\b/i,/\b(?:padişah|sultan|sadrazam|vezir).*\bosmanlı\b/i,
  /\binönü muharebesi\b/i,/\bsakarya meydan\b/i,/\bdumlupınar\b/i,/\bbüyük taarruz\b/i,
];

const FOREIGN_STRONG = [
  /\bfransa\b/i,/\bfransız\b/i,/\bingiltere\b/i,/\bingiliz\b/i,
  /\bamerika birleşik devletleri\b/i,/\babd\b/i,/\balmanya\b/i,/\balman\b/i,
  /\bitalya\b/i,/\bitalyan\b/i,/\bispanya\b/i,/\bispanyol\b/i,/\brusya\b/i,
  /\bçin\b/i,/\bçinli\b/i,/\bjaponya\b/i,/\bjapon\b/i,/\bhindistan\b/i,
  /\bavusturya\b/i,/\bbelçika\b/i,/\bpolonya\b/i,/\byunanistan\b/i,/\biran\b/i,
  /\bmısır\b/i,/\broma imparatorluğu\b/i,/\bportekiz\b/i,/\bhollanda\b/i,
  /\bkanada\b/i,/\bmeksika\b/i,/\bbrezilya\b/i,/\barjantin\b/i,/\bsovyetler\b/i,
  /\byugoslavya\b/i,/\bmalezya\b/i,/\bslovakya\b/i,/\blitvanya\b/i,
];

const SPORTS_PATTERNS = [
  /\bolimpiyat/i,/\bşampiyona/i,/\bşampiyon\b/i,/\bfutbol\b/i,/\bbasketbol\b/i,
  /\btenis\b/i,/\bvoleybol\b/i,/\bformula 1\b/i,/\bgrand prix\b/i,/\batletizm\b/i,
  /\byüzme\b/i,/\bboks\b/i,/\bhalter\b/i,/\bmaraton\b/i,/\bsporcu\b/i,/\bmadalya\b/i,
  /\bworld cup\b/i,/\bdünya kupası\b/i,/\bşampiyonlar ligi\b/i,/\bparalimpik\b/i,
  /\bwimbledon\b/i,/\btour de france\b/i,/\bsuper bowl\b/i,/\bnba\b/i,/\bfifa\b/i,
  /\bgol attı\b/i,/\btransfer oldu\b/i,/\bmilli takım\b/i,/\bmillî takım\b/i,
];

const SCIENCE_PATTERNS = [
  /\bkeşfed/i,/\bkeşif\b/i,/\bicat\b/i,/\bilk (?:uçuş|roket|uydu|bilgisayar|telefon|televizyon)/i,
  /\buzay\b/i,/\bnasa\b/i,/\bastronom/i,/\bfizik/i,/\bkimya/i,/\bmatematik/i,
  /\bbiyoloji/i,/\btıp\b/i,/\bgenom\b/i,/\bdna\b/i,/\buydu\b/i,/\broket\b/i,
  /\bgezegen\b/i,/\basteroit\b/i,/\bteleskop\b/i,/\bilk bilgisayar\b/i,
  /\binternet\b/i,/\bteknoloji\b/i,/\bröntgen\b/i,/\başı\b/i,/\bvaksin/i,
  /\bnobel (?:fizik|kimya|tıp|fizyoloji)/i,
];

const CULTURE_PATTERNS = [
  /\byazar\b/i,/\bşair\b/i,/\broman\b/i,/\bkitap\b/i,/\bedebiyat\b/i,/\bşiir\b/i,
  /\bsanat\b/i,/\bressam\b/i,/\bheykel\b/i,/\bmüzik\b/i,/\bbesteci\b/i,
  /\bopera\b/i,/\btiyatro\b/i,/\bsinema\b/i,/\bfilm\b/i,/\bşarkı\b/i,
  /\bmüze\b/i,/\bfestival\b/i,/\bkonser\b/i,/\bnobel edebiyat\b/i,/\bmüzisyen\b/i,
];

function countMatches(text, patterns) { let s=0; for(const p of patterns) if(p.test(text)) s++; return s; }

function reclassify(category, title, description) {
  if (category === 'birth' || category === 'death') return category;
  const text = lower(`${title}. ${description}`);
  const turkeyScore = countMatches(text, TURKEY_STRONG);
  const foreignScore = countMatches(text, FOREIGN_STRONG);
  const sportsScore = countMatches(text, SPORTS_PATTERNS);
  const scienceScore = countMatches(text, SCIENCE_PATTERNS);
  const cultureScore = countMatches(text, CULTURE_PATTERNS);

  const explicitTurkey = /\btürkiye\b|\bosmanlı\b|\btbmm\b|\batatürk\b|\bmustafa kemal\b|\bistanbul\b|\bankara\b|\bçanakkale\b|\bmalazgirt\b|\binönü muharebesi\b/i.test(text);

  // Spor önceliği (örn. Olimpiyatlar, madalya, şampiyona)
  if (sportsScore >= 2 && sportsScore > turkeyScore) return 'sports';

  // Bilim ve teknoloji
  if (scienceScore >= 2 && scienceScore > turkeyScore && foreignScore === 0) return 'science';

  // Kültür ve sanat
  if (cultureScore >= 2 && cultureScore > turkeyScore && foreignScore === 0) return 'culture';

  // Türkiye olayları: SADECE doğrudan ilişkili olanlar
  if (turkeyScore > 0 && (explicitTurkey || foreignScore === 0)) {
    return 'turkey';
  }

  // Yabancı ülkelerde geçen olaylar (Fransa'da cumhuriyet, ABD başkanı vs.) kesinlikle world
  if (foreignScore > 0 && turkeyScore === 0) {
    if (sportsScore >= 2) return 'sports';
    if (scienceScore >= 2) return 'science';
    if (cultureScore >= 2) return 'culture';
    return 'world';
  }

  if (sportsScore >= 2) return 'sports';
  if (scienceScore >= 2) return 'science';
  if (cultureScore >= 2) return 'culture';

  // Yetersiz Türkiye kriteri olan ama türkiye olarak kalmış kayıtları world'e çek
  if (category === 'turkey') return 'world';

  return VALID_CATEGORIES.has(category) ? category : 'world';
}

function fixTruncatedTitle(category, title, description) {
  if (!title) return description ? description.slice(0, 300).trim() : '';

  // 1. Missing closing paren on birth/death
  // örn: "Pete Seeger ... (d. 1919" -> "Pete Seeger ... (d. 1919)"
  if (/\((?:ö|d)\.\s*(?:\d{1,4}|MÖ\s*\d{1,4}|\?)\s*$/i.test(title)) {
    title = title.trim() + ')';
  }
  if (/\((?:ö|d)\.\s*(?:\d{1,4}|MÖ\s*\d{1,4}|\?)\s*$/i.test(description)) {
    description = description.trim() + ')';
  }

  // 2. Truncated title detection for all categories
  // örn: "Fransa 'da, I.", "Euro ... 16.", "Wanli ... 13.", "Louis Bonaparte, I."
  const isTruncated = (
    /\b(?:[IVXLCDM]+|\d+)\.\s*$/i.test(title) ||
    /[,–—]\s*$/.test(title) ||
    /\((?:ö|d)\.\s*$/i.test(title) ||
    (title.length < 6 && !/^[A-Z0-9]+$/i.test(title))
  );

  if (isTruncated && description && description.length > title.length) {
    title = description.slice(0, 300).trim();
  }

  // Sondaki gereksiz virgül veya tireleri temizle
  title = title.replace(/[,–—]\s*$/, '').trim();

  return title;
}

function cleanResidualHtml(s) {
  if (!s) return s;
  return s.replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
}

console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('PRATİKA TARİHTE BUGÜN - KAPSAMLI TEMİZLEME & VALIDATION');
console.log('═══════════════════════════════════════════════════════════');

const source = await fs.readFile(inputPath, 'utf8');
console.log('Dosya okundu: ' + (source.length / 1024 / 1024).toFixed(1) + ' MB');

let dbStart = source.indexOf('export const HISTORY_DATABASE: HistoryEvent[] = [');
if (dbStart === -1) {
  dbStart = source.indexOf('const rawHistoryDatabase: any[] = [');
}
if (dbStart === -1) {
  throw new Error('HISTORY_DATABASE bloğu bulunamadı.');
}

let dbEnd = source.indexOf('\nexport const HISTORY_DATABASE: HistoryEvent[] = rawHistoryDatabase as HistoryEvent[];', dbStart);
if (dbEnd !== -1) {
  const nextNl = source.indexOf('\n', dbEnd + 1);
  dbEnd = nextNl !== -1 ? nextNl : dbEnd + 70;
} else {
  dbEnd = source.indexOf('\n];', dbStart);
  if (dbEnd !== -1) dbEnd += 3;
}

if (dbEnd === -1) throw new Error('HISTORY_DATABASE bitişi bulunamadı.');

const before = source.slice(0, dbStart);
const database = source.slice(dbStart, dbEnd);
const after = source.slice(dbEnd);

console.log('DB bloğu: ' + (database.length / 1024 / 1024).toFixed(1) + ' MB');

const objectRe = /  \{[\s\S]*?\n  \},/g;
const records = [];
let stats = { total:0, titleFixed:0, whitespaceFixed:0, categoryFixed:0, htmlFixed:0, emptyRemoved:0, truncatedTitleFixed:0, invalidCategory:0 };

database.replace(objectRe, (block) => {
  stats.total++;
  const id = getField(block, 'id');
  const dayStr = (block.match(/\bday:\s*(\d+)/) || [])[1];
  const monthStr = (block.match(/\bmonth:\s*(\d+)/) || [])[1];
  const yearStr = (block.match(/\byear:\s*(-?\d+)/) || [])[1];
  const day = Number(dayStr); const month = Number(monthStr); const year = Number(yearStr);
  let title = getField(block, 'title') || '';
  let description = getField(block, 'description') || '';
  let category = getField(block, 'category') || 'world';
  const importance = getField(block, 'importance') || undefined;
  const sourceLabel = getField(block, 'sourceLabel') || 'Türkçe Vikipedi – Tarihte Bugün';
  const sourceUrl = getField(block, 'sourceUrl') || '';

  if (!id || !day || !month || yearStr === undefined || yearStr === null) { stats.emptyRemoved++; return block; }
  if (!VALID_CATEGORIES.has(category)) { stats.invalidCategory++; category = 'world'; }

  const origTitle = title; const origDesc = description;
  title = cleanResidualHtml(title); description = cleanResidualHtml(description);
  if (title !== origTitle || description !== origDesc) stats.htmlFixed++;

  const preTitleNorm = title; const preDescNorm = description;
  title = normalizeText(title); description = normalizeText(description);
  const normSrcLabel = normalizeText(sourceLabel);
  if (title !== preTitleNorm || description !== preDescNorm) stats.whitespaceFixed++;

  const fixedTitle = fixTruncatedTitle(category, title, description);
  if (fixedTitle !== title) { stats.truncatedTitleFixed++; stats.titleFixed++; title = fixedTitle; }

  // Description da sondaki eksik parantez veya trailing virgülden arındırılır
  if (/\((?:ö|d)\.\s*(?:\d{1,4}|MÖ\s*\d{1,4}|\?)\s*$/i.test(description)) {
    description = description.trim() + ')';
  }
  description = description.replace(/[,–—]\s*$/, '').trim();

  const newCategory = reclassify(category, title, description);
  if (newCategory !== category) { stats.categoryFixed++; category = newCategory; }

  if (!title.trim()) { stats.emptyRemoved++; return block; }
  records.push({ id, day, month, year, title, description: description || title, category, importance: importance || undefined, sourceLabel: normSrcLabel, sourceUrl });
  return block;
});

console.log('Parse edilen kayıt   : ' + stats.total);
console.log('Geçersiz/boş kayıt   : ' + stats.emptyRemoved);
console.log('HTML düzeltme        : ' + stats.htmlFixed);
console.log('Whitespace/yazım fix : ' + stats.whitespaceFixed);
console.log('Kırpık/bozuk başlık  : ' + stats.truncatedTitleFixed);
console.log('Kategori düzeltme    : ' + stats.categoryFixed);
console.log('Geçersiz kategori    : ' + stats.invalidCategory);

function makeKey(r) {
  return `${r.month}-${r.day}-${r.year}-${lower(r.title).replace(/[.,:;!?()\[\]{}'"""']/g,'').replace(/\s+/g,' ').trim().slice(0,120)}`;
}

const deduped = new Map(); let dupCount = 0;
for (const r of records) {
  const key = makeKey(r); const old = deduped.get(key);
  if (!old) { deduped.set(key, r); }
  else {
    dupCount++;
    const oldWiki = /vikipedi|wikipedia/i.test(old.sourceLabel);
    const newWiki = /vikipedi|wikipedia/i.test(r.sourceLabel);
    if (newWiki && !oldWiki) deduped.set(key, r);
    else if (!oldWiki && !newWiki && r.description.length > old.description.length) deduped.set(key, r);
  }
}

const finalRecords = [...deduped.values()].sort((a,b) => a.month-b.month || a.day-b.day || a.year-b.year || a.title.localeCompare(b.title,'tr'));
console.log('Duplicate kayıt      : ' + dupCount);
console.log('Final kayıt sayısı   : ' + finalRecords.length);

const dateKeys = new Set(finalRecords.map(r => `${r.month}-${r.day}`));
const missingDates = [];
for (let month = 1; month <= 12; month++) {
  const maxDay = new Date(2028, month, 0).getDate();
  for (let day = 1; day <= maxDay; day++) if (!dateKeys.has(`${month}-${day}`)) missingDates.push({month,day});
}

const MONTHS_TR = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
const catCounts = {};
for (const r of finalRecords) catCounts[r.category] = (catCounts[r.category] || 0) + 1;

const stillTruncated = finalRecords.filter(r => /\((?:ö|d)\.\s*$/i.test(r.title) || /\b(?:[IVXLCDM]+|\d+)\.\s*$/.test(r.title) || /[,–—]\s*$/.test(r.title) || r.title.length < 4);
const emptyDesc = finalRecords.filter(r => !r.description || r.description.trim().length < 3);
const invalidYear = finalRecords.filter(r => r.year === 0 || isNaN(r.year) || Math.abs(r.year) > 3000);
const missingUrl = finalRecords.filter(r => !r.sourceUrl);

console.log('');
console.log('═══════════════════════════════════════════════════════════');
console.log('VALIDATION RAPORU');
console.log('═══════════════════════════════════════════════════════════');
console.log('Toplam kayıt              : ' + finalRecords.length);
console.log('Dolu tarih                : ' + dateKeys.size + '/366');
console.log('Eksik tarih               : ' + missingDates.length);
if (missingDates.length > 0) {
  for (const d of missingDates.slice(0,10)) console.log('  Eksik: ' + d.day + ' ' + MONTHS_TR[d.month-1]);
}
console.log('Hâlâ şüpheli başlık       : ' + stillTruncated.length);
if (stillTruncated.length > 0) { for (const r of stillTruncated.slice(0,5)) console.log('  ['+r.month+'/'+r.day+'/'+r.year+'] "'+r.title+'"'); }
console.log('Boş description           : ' + emptyDesc.length);
console.log('Geçersiz yıl              : ' + invalidYear.length);
console.log('Eksik sourceUrl           : ' + missingUrl.length);
console.log('');
console.log('KATEGORİ DAĞILIMI:');
for (const cat of ['birth','death','turkey','world','science','culture','sports','event']) {
  console.log('  ' + cat.padEnd(8) + ': ' + String(catCounts[cat]||0).padStart(6));
}
console.log('');

function renderDatabase(records) {
  const MONTHS_UPPER = ['OCAK','ŞUBAT','MART','NİSAN','MAYIS','HAZİRAN','TEMMUZ','AĞUSTOS','EYLÜL','EKİM','KASIM','ARALIK'];
  const out = [
    '// eslint-disable-next-line @typescript-eslint/no-explicit-any',
    'const rawHistoryDatabase: any[] = ['
  ];
  let lastKey = '';
  for (const r of records) {
    const key = `${r.month}-${r.day}`;
    if (key !== lastKey) {
      if (lastKey) out.push('');
      out.push('  // =========================================================================');
      out.push('  // ' + String(r.day).padStart(2,'0') + ' ' + MONTHS_UPPER[r.month-1]);
      out.push('  // =========================================================================');
      lastKey = key;
    }
    out.push('  {');
    out.push("    id: '" + escapeTs(r.id) + "',");
    out.push('    day: ' + r.day + ',');
    out.push('    month: ' + r.month + ',');
    out.push('    year: ' + r.year + ',');
    out.push("    title: '" + escapeTs(r.title) + "',");
    out.push("    description: '" + escapeTs(r.description) + "',");
    out.push("    category: '" + r.category + "',");
    if (r.importance) out.push("    importance: '" + escapeTs(r.importance) + "',");
    out.push("    sourceLabel: '" + escapeTs(r.sourceLabel) + "',");
    out.push("    sourceUrl: '" + escapeTs(r.sourceUrl) + "',");
    out.push('  },');
  }
  out.push('];');
  out.push('');
  out.push('export const HISTORY_DATABASE: HistoryEvent[] = rawHistoryDatabase as HistoryEvent[];');
  return out.join('\n');
}

await fs.copyFile(inputPath, backupFile);
console.log('Yedek alındı: ' + backupFile);
const renderedDb = renderDatabase(finalRecords);
const finalSource = before + renderedDb + '\n' + after.trimStart();
await fs.writeFile(outputFile, finalSource, 'utf8');
console.log('Çıktı yazıldı: ' + outputFile);
console.log('Çıktı boyutu : ' + (finalSource.length / 1024 / 1024).toFixed(1) + ' MB');
console.log('');
console.log('TAMAMLANDI.');
