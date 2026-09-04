#!/usr/bin/env node
/**
 * Pratika - Tarihte Bugün MASTER CLEANER
 *
 * Tek seferde:
 * 1) Doğum/vefat başlıklarını description'daki tam kişi tanımıyla düzeltir.
 * 2) Türkiye Tarihi sınıflandırmasını yüksek güvenli kurallarla düzeltir.
 * 3) Açıkça yabancı ülke/dünya olaylarını Türkiye kategorisinden çıkarır.
 * 4) Spor/Bilim/Kültür için belirgin anahtar kelimeleri uygular.
 * 5) Duplicate kayıtları kaldırır.
 * 6) Boş/bozuk kayıtları ayıklar.
 * 7) 366 tarih kontrolü yapar.
 *
 * Orijinal dosyaya DOKUNMAZ.
 *
 * Kullanım:
 *   node clean-today-in-history-master.mjs "src\data\todayInHistory.generated.cleaned.ts"
 *
 * Çıktı:
 *   src\data\todayInHistory.final.ts
 */

import fs from 'node:fs/promises';

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Kullanım: node clean-today-in-history-master.mjs <input.ts>');
  process.exit(1);
}

const outputFile = inputFile.replace(/\.ts$/i, '.final.ts');

const VALID_CATEGORIES = new Set([
  'event', 'turkey', 'world', 'science', 'culture', 'sports', 'birth', 'death'
]);

function unescapeTs(s) {
  return s.replace(/\\'/g, "'").replace(/\\\\/g, "\\");
}

function escapeTs(s) {
  return String(s ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\r?\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function getField(block, field) {
  const re = new RegExp("\\b" + field + ":\\s*'((?:\\\\'|[^'])*)'");
  const m = block.match(re);
  return m ? unescapeTs(m[1]) : null;
}

function setField(block, field, value) {
  const re = new RegExp("(\\b" + field + ":\\s*)'((?:\\\\'|[^'])*)'");
  if (!re.test(block)) return block;
  return block.replace(re, (_, prefix) => prefix + "'" + escapeTs(value) + "'");
}

function normalizeText(s) {
  return String(s ?? '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+([,.;:!?%)])/g, '$1')
    .replace(/([(\[])\s+/g, '$1')
    .trim();
}

function lower(s) {
  return normalizeText(s).toLocaleLowerCase('tr-TR');
}

/*
 * Türkiye kategorisi için "cumhuriyet", "başkan", "savaş" gibi tek başına
 * çok geniş kelimeleri özellikle kullanmıyoruz. Bunlar Fransa/ABD/İtalya vb.
 * dünya olaylarını yanlışlıkla Türkiye'ye taşıyabiliyordu.
 */
const TURKEY_STRONG = [
  /\btürkiye\b/i,
  /\btürk(?:iye|ler|çe|lüğü| devlet)/i,
  /\bosmanlı\b/i,
  /\bosmanlı i̇mparatorluğu\b/i,
  /\banadolu selçuklu\b/i,
  /\bselçuklu(?:lar| devleti| sultanlığı)?\b/i,
  /\banadolu\b/i,
  /\b(?:türkiye|türk) büyük millet meclisi\b/i,
  /\btbmm\b/i,
  /\batatürk\b/i,
  /\bmustafa kemal\b/i,
  /\bkurtuluş savaşı\b/i,
  /\bçanakkale\b/i,
  /\bmalazgirt\b/i,
  /\bistanbul'un fethi\b/i,
  /\bistanbul'u?n? fethi\b/i,
  /\bistanbul\b/i,
  /\bankara\b/i,
  /\bizmir\b/i,
  /\bizmit\b/i,
  /\bbursa\b/i,
  /\bedirne\b/i,
  /\bkonya\b/i,
  /\btrabzon\b/i,
  /\bantalya\b/i,
  /\bgalatasaray\b/i,
  /\bfenerbahçe\b/i,
  /\bbeşiktaş\b/i,
  /\btrabzonspor\b/i,
  /\b(?:türkiye|osmanlı) (?:cumhuriyeti|sultanlığı|devleti|imparatorluğu)\b/i,
  /\b(?:padişah|sultan|sadrazam|vezir)\b.*\bosmanlı\b/i,
  /\bosmanlı\b.*\b(?:padişah|sultan|sadrazam|vezir)\b/i
];

const FOREIGN_STRONG = [
  /\bfransa\b/i, /\bfransız\b/i, /\bingiltere\b/i, /\bingiliz\b/i,
  /\bamerika birleşik devletleri\b/i, /\babd\b/i, /\bamerika\b/i,
  /\balmanya\b/i, /\balman\b/i, /\bitalya\b/i, /\bitalyan\b/i,
  /\bispanya\b/i, /\bispanyol\b/i, /\brusya\b/i, /\brus\b/i,
  /\bçin\b/i, /\bçinli\b/i, /\bjaponya\b/i, /\bjapon\b/i,
  /\bindia\b/i, /\bhindistan\b/i, /\bhint\b/i, /\bingiliz\b/i,
  /\bavusturya\b/i, /\bbelçika\b/i, /\bpolonya\b/i, /\byunanistan\b/i,
  /\byunan\b/i, /\biran\b/i, /\bmısır\b/i, /\broma imparatorluğu\b/i,
  /\broma\b/i, /\bportekiz\b/i, /\bhollanda\b/i, /\bkanada\b/i,
  /\bmeksika\b/i, /\bbrezilya\b/i, /\barjantin\b/i
];

const SPORTS = [
  /\bolimpiyat/i, /\bşampiyona/i, /\bşampiyon\b/i, /\bfutbol\b/i,
  /\bbasketbol\b/i, /\btenis\b/i, /\bvoleybol\b/i, /\bformula 1\b/i,
  /\bgrand prix\b/i, /\batletizm\b/i, /\byüzme\b/i, /\bboks\b/i,
  /\bhalter\b/i, /\bmaraton\b/i, /\bsporcu\b/i, /\bmadalya\b/i,
  /\bkulübü\b/i, /\blig\b/i, /\bworld cup\b/i, /\bdünya kupası\b/i,
  /\beuro\b/i, /\bşampiyonlar ligi\b/i, /\bparalimpik\b/i
];

const SCIENCE = [
  /\bkeşfed/i, /\bkeşif\b/i, /\bicat\b/i, /\bicat edildi\b/i,
  /\bilk (?:uçuş|roket|uydu|bilgisayar|telefon|televizyon)/i,
  /\buzay\b/i, /\bnasa\b/i, /\bastronom/i, /\bastronomi\b/i,
  /\bfizik/i, /\bkimya/i, /\bmatematik/i, /\bbiyoloji/i,
  /\btıp\b/i, /\bgenom\b/i, /\bdna\b/i, /\buydu\b/i, /\broket\b/i,
  /\buzay aracı\b/i, /\bgezegen\b/i, /\basteroit\b/i, /\bteleskop\b/i,
  /\bilk bilgisayar\b/i, /\binternet\b/i, /\bweb\b/i, /\bteknoloji\b/i,
  /\btelefon\b/i, /\bröntgen\b/i, /\başı\b/i, /\bvaksin/i
];

const CULTURE = [
  /\byazar\b/i, /\bşair\b/i, /\bşairi\b/i, /\broman\b/i, /\bkitap\b/i,
  /\bedebiyat\b/i, /\bşiir\b/i, /\bsanat\b/i, /\bressam\b/i,
  /\bheykel\b/i, /\bmüzik\b/i, /\bbesteci\b/i, /\bopera\b/i,
  /\btiyatro\b/i, /\bsinema\b/i, /\bfilm\b/i, /\bşarkı\b/i,
  /\bmüze\b/i, /\bfestival\b/i, /\bkonser\b/i, /\bbağdat\b/i
];

function countMatches(text, patterns) {
  let score = 0;
  for (const p of patterns) if (p.test(text)) score++;
  return score;
}

function classify(category, title, description) {
  const text = lower(`${title}. ${description}`);

  // Doğum ve vefat kategorileri kaynak bölümünden gelir; bunları bozma.
  if (category === 'birth' || category === 'death') return category;

  const turkeyScore = countMatches(text, TURKEY_STRONG);
  const foreignScore = countMatches(text, FOREIGN_STRONG);
  const sportsScore = countMatches(text, SPORTS);
  const scienceScore = countMatches(text, SCIENCE);
  const cultureScore = countMatches(text, CULTURE);

  /*
   * Açık yabancı ülke + Türkiye bağlantısı:
   * Fransa'da cumhuriyet ilanı gibi olaylarda dünya kategorisi baskın.
   * Türkiye'nin kendisi açıkça olayın merkezindeyse turkey yine kazanabilir.
   */
  const explicitTurkey = /\btürkiye\b|\bosmanlı\b|\btbmm\b|\batatürk\b|\bmustafa kemal\b|\bistanbul\b|\bankara\b|\bçanakkale\b|\bmalazgirt\b/i.test(text);

  if (turkeyScore > 0 && (explicitTurkey || foreignScore === 0)) {
    // Sporcu/kulüp/olimpiyat gibi içerikler Türkiye'de geçse bile spor ise spor.
    if (sportsScore >= 2 && sportsScore >= turkeyScore) return 'sports';
    if (scienceScore >= 2 && scienceScore > turkeyScore && foreignScore === 0) return 'science';
    if (cultureScore >= 2 && cultureScore > turkeyScore && foreignScore === 0) return 'culture';
    return 'turkey';
  }

  if (sportsScore >= 2) return 'sports';
  if (scienceScore >= 2) return 'science';
  if (cultureScore >= 2) return 'culture';

  // Açık yabancı olaylar Türkiye değildir.
  if (foreignScore > 0) return 'world';

  // Önceden turkey verilmiş ama güçlü Türkiye işareti olmayan kayıtlar world'e düşer.
  if (category === 'turkey') return 'world';

  return VALID_CATEGORIES.has(category) ? category : 'world';
}

const source = await fs.readFile(inputFile, 'utf8');

const dbStart = source.indexOf('export const HISTORY_DATABASE: HistoryEvent[] = [');
const dbEnd = source.indexOf('\n];', dbStart);

if (dbStart < 0 || dbEnd < 0) {
  throw new Error('HISTORY_DATABASE bloğu bulunamadı.');
}

const before = source.slice(0, dbStart);
const database = source.slice(dbStart, dbEnd + 3);
const after = source.slice(dbEnd + 3);

const objectRe = /  \{[\s\S]*?\n  \},/g;
const records = [];

let personFixed = 0;
let whitespaceFixed = 0;
let categoryFixed = 0;
let removedEmpty = 0;

database.replace(objectRe, (block) => {
  const id = getField(block, 'id');
  const day = Number((block.match(/\bday:\s*(\d+)/) || [])[1]);
  const month = Number((block.match(/\bmonth:\s*(\d+)/) || [])[1]);
  const year = Number((block.match(/\byear:\s*(-?\d+)/) || [])[1]);

  let title = getField(block, 'title') || '';
  let description = getField(block, 'description') || '';
  let category = getField(block, 'category') || 'world';
  const sourceLabel = getField(block, 'sourceLabel') || 'Türkçe Vikipedi – Tarihte Bugün';
  const sourceUrl = getField(block, 'sourceUrl') || '';

  title = normalizeText(title);
  description = normalizeText(description);

  if (!id || !day || !month || Number.isNaN(year) || !title) {
    removedEmpty++;
    return block;
  }

  /*
   * Doğum/vefat kayıtlarının title'ı parser tarafından ilk nokta/parantezde
   * kesilmiş olabilir. Description'da tam kişi tanımı + (d./ö. yıl) varsa
   * title'ı doğrudan description'a eşitlemek en güvenli çözümdür.
   */
  if (
    (category === 'birth' || category === 'death') &&
    description &&
    /\((?:ö|d)\.\s*(?:\d{1,4}|\?)\s*\)/i.test(description) &&
    description.length >= title.length
  ) {
    if (title !== description) {
      title = description;
      personFixed++;
    }
  }

  const newCategory = classify(category, title, description);
  if (newCategory !== category) categoryFixed++;

  let outBlock = block;
  outBlock = setField(outBlock, 'title', title);
  outBlock = setField(outBlock, 'description', description);
  outBlock = setField(outBlock, 'category', newCategory);

  if (title !== getField(block, 'title') || description !== getField(block, 'description')) {
    whitespaceFixed += 1;
  }

  records.push({
    id, day, month, year, title, description,
    category: newCategory,
    importance: getField(block, 'importance') || undefined,
    sourceLabel: normalizeText(sourceLabel),
    sourceUrl: normalizeText(sourceUrl)
  });

  return outBlock;
});

/*
 * Duplicate temizliği.
 * Aynı gün + yıl + normalize edilmiş başlık aynı kaydı ifade eder.
 * Wikipedia kaydı varsa onu tercih et.
 */
function keyFor(r) {
  return `${r.month}-${r.day}-${r.year}-${lower(r.title)
    .replace(/[.,:;!?()[\]{}'"“”’]/g, '')
    .replace(/\s+/g, ' ')
    .trim()}`;
}

const deduped = new Map();

for (const r of records) {
  const key = keyFor(r);
  const old = deduped.get(key);

  if (!old) {
    deduped.set(key, r);
  } else {
    const oldWiki = /vikipedi|wikipedia/i.test(old.sourceLabel);
    const newWiki = /vikipedi|wikipedia/i.test(r.sourceLabel);
    if (newWiki && !oldWiki) deduped.set(key, r);
  }
}

const finalRecords = [...deduped.values()].sort(
  (a, b) =>
    a.month - b.month ||
    a.day - b.day ||
    a.year - b.year ||
    a.title.localeCompare(b.title, 'tr')
);

function renderDatabase(records) {
  const out = ['export const HISTORY_DATABASE: HistoryEvent[] = ['];
  let lastKey = '';

  for (const r of records) {
    const key = `${r.month}-${r.day}`;

    if (key !== lastKey) {
      if (lastKey) out.push('');
      out.push('  // =========================================================================');
      out.push(`  // ${String(r.day).padStart(2, '0')} ${['OCAK','ŞUBAT','MART','NİSAN','MAYIS','HAZİRAN','TEMMUZ','AĞUSTOS','EYLÜL','EKİM','KASIM','ARALIK'][r.month - 1]}`);
      out.push('  // =========================================================================');
      lastKey = key;
    }

    out.push('  {');
    out.push(`    id: '${escapeTs(r.id)}',`);
    out.push(`    day: ${r.day},`);
    out.push(`    month: ${r.month},`);
    out.push(`    year: ${r.year},`);
    out.push(`    title: '${escapeTs(r.title)}',`);
    out.push(`    description: '${escapeTs(r.description)}',`);
    out.push(`    category: '${r.category}',`);
    if (r.importance) out.push(`    importance: '${escapeTs(r.importance)}',`);
    out.push(`    sourceLabel: '${escapeTs(r.sourceLabel)}',`);
    out.push(`    sourceUrl: '${escapeTs(r.sourceUrl)}',`);
    out.push('  },');
  }

  out.push('];');
  return out.join('\n');
}

const dateKeys = new Set(finalRecords.map(r => `${r.month}-${r.day}`));
let missingDates = 0;

for (let month = 1; month <= 12; month++) {
  const maxDay = new Date(2028, month, 0).getDate();
  for (let day = 1; day <= maxDay; day++) {
    if (!dateKeys.has(`${month}-${day}`)) missingDates++;
  }
}

const counts = {};
for (const r of finalRecords) counts[r.category] = (counts[r.category] || 0) + 1;

const finalSource = before + renderDatabase(finalRecords) + after;
await fs.writeFile(outputFile, finalSource, 'utf8');

console.log('');
console.log('====================================================');
console.log('PRATİKA TARİHTE BUGÜN MASTER TEMİZLEME TAMAMLANDI');
console.log('====================================================');
console.log(`Girdi kayıtları                  : ${records.length}`);
console.log(`Çıktı kayıtları                  : ${finalRecords.length}`);
console.log(`Silinen boş/bozuk kayıt          : ${removedEmpty}`);
console.log(`Düzeltilen kişi başlığı          : ${personFixed}`);
console.log(`Düzeltilen format                : ${whitespaceFixed}`);
console.log(`Düzeltilen kategori              : ${categoryFixed}`);
console.log(`Dolu tarih                       : ${dateKeys.size}/366`);
console.log(`Eksik tarih                      : ${missingDates}`);
console.log('');
console.log('KATEGORİLER:');
for (const c of ['turkey','world','science','culture','sports','birth','death','event']) {
  console.log(`  ${c.padEnd(8)}: ${counts[c] || 0}`);
}
console.log('');
console.log(`Çıktı: ${outputFile}`);
console.log('Orijinal input dosyası korunmuştur.');
console.log('====================================================');
