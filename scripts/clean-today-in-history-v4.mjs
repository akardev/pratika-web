#!/usr/bin/env node
/**
 * Pratika - Tarihte Bugün veri temizleyici V4
 *
 * Kullanım:
 *   node clean-today-in-history-v4.mjs "src\data\todayInHistory.generated.ts"
 *
 * Çıktı:
 *   src\data\todayInHistory.generated.cleaned.ts
 */

import fs from 'node:fs/promises';

const inputFile = process.argv[2];

if (!inputFile) {
  console.error('Kullanım: node clean-today-in-history-v4.mjs <todayInHistory.generated.ts>');
  process.exit(1);
}

const outputFile = inputFile.replace(/\.ts$/i, '.cleaned.ts');

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

const source = await fs.readFile(inputFile, 'utf8');

const dbStart = source.indexOf('export const HISTORY_DATABASE: HistoryEvent[] = [');
const dbEnd = source.indexOf('\n];', dbStart);

if (dbStart < 0 || dbEnd < 0) {
  throw new Error('HISTORY_DATABASE bloğu bulunamadı.');
}

const before = source.slice(0, dbStart);
const database = source.slice(dbStart, dbEnd + 3);
const after = source.slice(dbEnd + 3);

let fixed = 0;
let whitespace = 0;

/*
 * Her kayıt:
 *   {
 *     id: ...
 *     ...
 *   },
 */
const objectRe = /  \{[\s\S]*?\n  \},/g;

const cleanedDatabase = database.replace(objectRe, (block) => {
  let out = block;

  const category = getField(out, 'category');
  const title = getField(out, 'title');
  const description = getField(out, 'description');

  /*
   * Doğum/ölüm kayıtlarında title bazen şu şekilde kesilmiş:
   *
   *   John Smith, İngiliz yazar (ö.
   *
   * Description ise tam:
   *
   *   John Smith, İngiliz yazar (ö. 1822)
   *
   * Bu durumda tam description'ı title yap.
   */
  if (
    (category === 'birth' || category === 'death') &&
    title &&
    description
  ) {
    const titleLooksTruncated =
      /\((?:ö|d)\.\s*$/i.test(title) ||
      /\((?:ö|d)\.\s*[^)]*$/i.test(title);

    const descriptionHasCompleteDate =
      /\((?:ö|d)\.\s*(?:\d{1,4}|\?)\s*\)/i.test(description);

    if (
      titleLooksTruncated &&
      description.startsWith(title.replace(/\s+$/, '')) &&
      descriptionHasCompleteDate
    ) {
      out = setField(out, 'title', description);
      fixed++;
    }
  }

  for (const field of ['title', 'description', 'sourceLabel']) {
    const value = getField(out, field);
    if (value) {
      const normalized = value.replace(/\s+/g, ' ').trim();
      if (normalized !== value) {
        out = setField(out, field, normalized);
        whitespace++;
      }
    }
  }

  return out;
});

await fs.writeFile(outputFile, before + cleanedDatabase + after, 'utf8');

console.log('');
console.log('==============================================');
console.log('TARİHTE BUGÜN VERİ TEMİZLEME V4 TAMAMLANDI');
console.log('==============================================');
console.log('Düzeltilen kişi başlığı          : ' + fixed);
console.log('Düzeltilen boşluk/format         : ' + whitespace);
console.log('Çıktı                            : ' + outputFile);
console.log('');
console.log('Orijinal generated.ts korunmuştur.');
