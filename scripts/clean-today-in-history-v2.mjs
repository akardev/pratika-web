#!/usr/bin/env node
/**
 * Pratika - Tarihte Bugün veri temizleyici
 *
 * Kullanım:
 *   node clean-today-in-history-v2.mjs "src\data\todayInHistory.generated.ts"
 *
 * Çıktı:
 *   src\data\todayInHistory.generated.cleaned.ts
 *
 * Orijinal dosyaya dokunmaz.
 */

import fs from 'node:fs/promises';

const inputFile = process.argv[2];

if (!inputFile) {
  console.error('Kullanım: node clean-today-in-history-v2.mjs <todayInHistory.generated.ts>');
  process.exit(1);
}

const outputFile = inputFile.replace(/\.ts$/i, '.cleaned.ts');

function unescapeTs(s) {
  return s
    .replace(/\\'/g, "'")
    .replace(/\\\\/g, "\\");
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

const source = await fs.readFile(inputFile, 'utf8');

const dbStart = source.indexOf('export const HISTORY_DATABASE: HistoryEvent[] = [');
const dbEnd = source.indexOf('\n];', dbStart);

if (dbStart < 0 || dbEnd < 0) {
  throw new Error('HISTORY_DATABASE bloğu bulunamadı.');
}

const before = source.slice(0, dbStart);
const database = source.slice(dbStart, dbEnd + 3);
const after = source.slice(dbEnd + 3);

let fixedBirthDeath = 0;
let fixedWhitespace = 0;

const objectRe = /  \{[\s\S]*?\n  \},/g;

const cleanedDatabase = database.replace(objectRe, (block) => {
  let out = block;

  const title = getField(out, 'title');
  const description = getField(out, 'description');

  if (title && description) {
    // Parser'ın başlığı "(ö." veya "(d." noktasında kestiği kayıtlar.
    const truncated = /\((?:ö|d)\.\s*$/i.test(title);

    if (truncated && description.startsWith(title)) {
      out = setField(out, 'title', description);
      fixedBirthDeath++;
    }
  }

  // Alanlarda yanlışlıkla oluşan çift boşlukları sadeleştir.
  for (const field of ['title', 'description', 'sourceLabel']) {
    const value = getField(out, field);
    if (value) {
      const normalized = value.replace(/\s+/g, ' ').trim();
      if (normalized !== value) {
        out = setField(out, field, normalized);
        fixedWhitespace++;
      }
    }
  }

  return out;
});

const finalText = before + cleanedDatabase + after;

await fs.writeFile(outputFile, finalText, 'utf8');

console.log('');
console.log('==============================================');
console.log('TARİHTE BUGÜN VERİ TEMİZLEME TAMAMLANDI');
console.log('==============================================');
console.log(`Düzeltilen doğum/ölüm başlığı : ${fixedBirthDeath}`);
console.log(`Düzeltilen boşluk/format      : ${fixedWhitespace}`);
console.log(`Çıktı                         : ${outputFile}`);
console.log('');
console.log('Orijinal todayInHistory.generated.ts korunmuştur.');
