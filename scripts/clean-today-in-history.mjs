#!/usr/bin/env node
/**
 * Pratiksel - Tarihte Bugün veri temizleyici
 *
 * Kullanım:
 *   node clean-today-in-history.mjs "src\data\todayInHistory.generated.ts"
 *
 * Varsayılan olarak:
 *   input  -> todayInHistory.generated.ts
 *   output -> todayInHistory.cleaned.ts
 *
 * Orijinal/generated dosyaya dokunmaz.
 */

import fs from 'node:fs/promises';

const inputFile = process.argv[2];
if (!inputFile) {
  console.error('Kullanım: node clean-today-in-history.mjs <todayInHistory.generated.ts>');
  process.exit(1);
}

const outputFile = inputFile.replace(/\.ts$/i, '.cleaned.ts');

function unescapeTs(s) {
  return s
    .replace(/\\\\/g, '\\')
    .replace(/\\'/g, "'");
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
  const re = new RegExp(`\\b${field}:\\s*'((?:\\\\'|[^'])*)'`);
  const m = block.match(re);
  return m ? unescapeTs(m[1]) : null;
}

function setField(block, field, value) {
  const re = new RegExp(`(\\b${field}:\\s*)'((?:\\\\'|[^'])*)'`);
  if (!re.test(block)) return block;
  return block.replace(re, `$1'${escapeTs(value)}'`);
}

const source = await fs.readFile(inputFile, 'utf8');

const dbStart = source.indexOf('export const HISTORY_DATABASE: HistoryEvent[] = [');
const dbEnd = source.indexOf('\\n];', dbStart);

if (dbStart < 0 || dbEnd < 0) {
  throw new Error('HISTORY_DATABASE bloğu bulunamadı.');
}

const before = source.slice(0, dbStart);
const database = source.slice(dbStart, dbEnd + 3);
const after = source.slice(dbEnd + 3);

let fixedBirthDeath = 0;

// Her event objesini ayrı ele al.
const objectRe = /  \\{[\\s\\S]*?\\n  \\},/g;

const cleanedDatabase = database.replace(objectRe, (block) => {
  let out = block;

  let title = getField(out, 'title');
  let description = getField(out, 'description');

  if (title && description) {
    // Wikipedia doğum/ölüm maddelerinde parser'ın başlığı
    // "(ö." / "(d." kısmında kesmesi durumunu düzelt.
    const truncated = /\\((?:ö|d)\\.\\s*$/i.test(title);

    if (truncated && description.startsWith(title)) {
      // Açıklamada bulunan tam kişi tanımını başlık olarak kullan.
      title = description;
      out = setField(out, 'title', title);
      fixedBirthDeath++;
    }

    // Bazı maddelerde açıklama başlıkla birebir olabilir.
    // Bu geçerli bir durumdur; gereksiz değişiklik yapma.
  }

  return out;
});

// Basit genel temizlik: veri alanlarında baş/son boşlukları düzelt.
// Kaynak kodunun yapısına dokunma.
const finalText = (before + cleanedDatabase + after)
  .replace(/[\\t ]+\\n/g, '\\n');

await fs.writeFile(outputFile, finalText, 'utf8');

console.log('');
console.log('Temizleme tamamlandı.');
console.log(`Düzeltilen doğum/ölüm başlığı: ${fixedBirthDeath}`);
console.log(`Çıktı: ${outputFile}`);
console.log('');
console.log('Örnek düzeltme:');
console.log('  "Lars Edvard Phragmén, İsveçli matematikçi (ö."');
console.log('  -> "Lars Edvard Phragmén, İsveçli matematikçi (ö. 1937)"');
console.log('');
console.log('Orijinal generated.ts dosyası korunur.');
