#!/usr/bin/env node
/**
 * Pratika - Tarihte Bugün Veri Doğrulama (Validation) Scripti
 *
 * Kullanım:
 *   node validate-today-in-history.mjs [dosya_yolu]
 *   Varsayılan: src/data/todayInHistory.ts
 */

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const targetFile = process.argv[2] ? resolve(process.argv[2]) : resolve('src/data/todayInHistory.ts');

if (!existsSync(targetFile)) {
  console.error(`Hata: Belirtilen dosya bulunamadı: ${targetFile}`);
  process.exit(1);
}

console.log('═════════════════════════════════════════════════════════════════');
console.log('TARİHTE BUGÜN - VERİ DOĞRULAMA (VALIDATION) RAPORU');
console.log(`Dosya: ${targetFile}`);
console.log('═════════════════════════════════════════════════════════════════');

const content = readFileSync(targetFile, 'utf8');

let dbStart = content.indexOf('export const HISTORY_DATABASE: HistoryEvent[] = [');
if (dbStart === -1) {
  dbStart = content.indexOf('const rawHistoryDatabase: any[] = [');
}
const dbEnd = content.indexOf('\n];', dbStart);

if (dbStart === -1 || dbEnd === -1) {
  console.error('Hata: HISTORY_DATABASE dizisi bulunamadı.');
  process.exit(1);
}

const dbText = content.slice(dbStart, dbEnd + 3);

function unescapeTs(str) {
  return str.replace(/\\'/g, "'").replace(/\\\\/g, '\\');
}

function getField(block, field) {
  const re = new RegExp('\\b' + field + ":\\s*'((?:\\\\'|[^'])*)'");
  const m = block.match(re);
  return m ? unescapeTs(m[1]) : '';
}

function getNumericField(block, field) {
  const re = new RegExp('\\b' + field + ':\\s*(-?\\d+)');
  const m = block.match(re);
  return m ? Number(m[1]) : null;
}

const VALID_CATEGORIES = new Set([
  'event',
  'turkey',
  'world',
  'science',
  'culture',
  'sports',
  'birth',
  'death'
]);

const MONTHS_DAYS = [
  31, // Ocak
  29, // Şubat (artık yıl 2024/2028 için 29 gün)
  31, // Mart
  30, // Nisan
  31, // Mayıs
  30, // Haziran
  31, // Temmuz
  31, // Ağustos
  30, // Eylül
  31, // Ekim
  30, // Kasım
  31  // Aralık
];

const blockRegex = /  \{[\s\S]*?\n  \},/g;
let match;

let totalRecords = 0;
let emptyTitles = 0;
let emptyDescriptions = 0;
let brokenBirthDeathTitles = 0;
let suspiciousTruncatedTitles = 0;
let invalidCategories = 0;
let invalidYears = 0;
let missingSourceUrls = 0;

const categoryDistribution = {
  birth: 0,
  death: 0,
  turkey: 0,
  world: 0,
  science: 0,
  culture: 0,
  sports: 0,
  event: 0
};

const otherCategories = {};
const coveredDates = new Set();
const seenKeys = new Map();
let duplicateCount = 0;

const brokenBirthDeathExamples = [];
const suspiciousTitleExamples = [];

while ((match = blockRegex.exec(dbText)) !== null) {
  totalRecords++;
  const block = match[0];

  const day = getNumericField(block, 'day');
  const month = getNumericField(block, 'month');
  const year = getNumericField(block, 'year');
  const title = getField(block, 'title');
  const description = getField(block, 'description');
  const category = getField(block, 'category');
  const sourceUrl = getField(block, 'sourceUrl');

  // Boş title / description
  if (!title || !title.trim()) {
    emptyTitles++;
  }
  if (!description || !description.trim()) {
    emptyDescriptions++;
  }

  // Bozuk (ö. / (d. kayıtları
  if (/\((?:ö|d)\.\s*$/i.test(title) || /\((?:ö|d)\.\s*[^)]*$/i.test(title)) {
    brokenBirthDeathTitles++;
    if (brokenBirthDeathExamples.length < 5) {
      brokenBirthDeathExamples.push({ title, month, day, year });
    }
  }

  // Şüpheli / kesilmiş title kontrolü (ör: "I.", ",", "-", ile biten veya aşırı kısa)
  if (
    /\bI+V?\.\s*$/.test(title) ||
    /[,–—]\s*$/.test(title) ||
    (title.length < 4 && !/^[A-Z0-9]+$/i.test(title))
  ) {
    suspiciousTruncatedTitles++;
    if (suspiciousTitleExamples.length < 5) {
      suspiciousTitleExamples.push({ title, month, day, year });
    }
  }

  // Kategori kontrolü
  if (VALID_CATEGORIES.has(category)) {
    categoryDistribution[category] = (categoryDistribution[category] || 0) + 1;
  } else {
    invalidCategories++;
    otherCategories[category] = (otherCategories[category] || 0) + 1;
  }

  // Yıl kontrolü
  if (year === null || isNaN(year) || year === 0 || Math.abs(year) > 3000) {
    invalidYears++;
  }

  // Kaynak URL kontrolü
  if (!sourceUrl || !sourceUrl.trim()) {
    missingSourceUrls++;
  }

  // Tarih kapsama (366 gün)
  if (month && day && month >= 1 && month <= 12 && day >= 1 && day <= 31) {
    coveredDates.add(`${month}-${day}`);
  }

  // Duplicate kontrolü
  const dedupKey = `${month}-${day}-${year}-${title.toLowerCase().replace(/[^a-z0-9ğüşıöç]/gi, '').slice(0, 80)}`;
  if (seenKeys.has(dedupKey)) {
    duplicateCount++;
  } else {
    seenKeys.set(dedupKey, true);
  }
}

// 366 gün kontrolü
let totalExpectedDays = 0;
const missingDays = [];
for (let m = 1; m <= 12; m++) {
  const maxDay = MONTHS_DAYS[m - 1];
  totalExpectedDays += maxDay;
  for (let d = 1; d <= maxDay; d++) {
    const key = `${m}-${d}`;
    if (!coveredDates.has(key)) {
      missingDays.push(key);
    }
  }
}

console.log(`\n1. TOPLAM VE GÜN KONTROLÜ:`);
console.log(`   - Toplam Kayıt           : ${totalRecords.toLocaleString('tr-TR')}`);
console.log(`   - Dolu Tarih Sayısı      : ${coveredDates.size} / ${totalExpectedDays} gün`);
console.log(`   - 366/366 Tam mı?        : ${coveredDates.size === 366 ? 'EVET (Eksiksiz)' : 'HAYIR (' + missingDays.length + ' gün eksik)'}`);
if (missingDays.length > 0) {
  console.log(`   - Eksik Günler           : ${missingDays.slice(0, 10).join(', ')}`);
}

console.log(`\n2. TEMİZLİK VE METİN SAĞLIĞI:`);
console.log(`   - Duplicate Sayısı       : ${duplicateCount}`);
console.log(`   - Boş Title              : ${emptyTitles}`);
console.log(`   - Boş Description        : ${emptyDescriptions}`);
console.log(`   - Bozuk "(ö." / "(d."    : ${brokenBirthDeathTitles}`);
if (brokenBirthDeathExamples.length > 0) {
  brokenBirthDeathExamples.forEach(e => console.log(`     * [${e.month}/${e.day}/${e.year}] ${e.title}`));
}
console.log(`   - Şüpheli/Kesilmiş Title : ${suspiciousTruncatedTitles}`);
if (suspiciousTitleExamples.length > 0) {
  suspiciousTitleExamples.forEach(e => console.log(`     * [${e.month}/${e.day}/${e.year}] ${e.title}`));
}

console.log(`\n3. KATEGORİ DAĞILIMI:`);
Object.entries(categoryDistribution).forEach(([cat, count]) => {
  console.log(`   - ${cat.padEnd(10)}: ${count.toLocaleString('tr-TR').padStart(7)}`);
});
console.log(`   - Geçersiz Kategori      : ${invalidCategories}`);
if (invalidCategories > 0) {
  console.log(`     Bilinmeyen: ${JSON.stringify(otherCategories)}`);
}

console.log(`\n4. DİĞER KONTROLLER:`);
console.log(`   - Geçersiz Yıl (year)    : ${invalidYears}`);
console.log(`   - Eksik sourceUrl        : ${missingSourceUrls}`);

console.log('\n═════════════════════════════════════════════════════════════════');
const isSuccess = (
  coveredDates.size === 366 &&
  emptyTitles === 0 &&
  emptyDescriptions === 0 &&
  brokenBirthDeathTitles === 0 &&
  invalidCategories === 0 &&
  invalidYears === 0
);
console.log(`SONUÇ: ${isSuccess ? 'BAŞARILI - Veri seti tutarlı ve production-ready.' : 'UYARI - Bazı kontrollerde pürüzler var.'}`);
console.log('═════════════════════════════════════════════════════════════════\n');
