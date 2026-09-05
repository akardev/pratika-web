#!/usr/bin/env node
/**
 * Pratiksel - Tarihte Bugün veri üreticisi
 *
 * Ne yapar?
 * 1) Türkçe Wikipedia'nın 365/366 tarih sayfasını tarar.
 * 2) Olaylar / Doğumlar / Ölümler bölümlerini alır.
 * 3) Mevcut HISTORY_DATABASE kayıtlarını korur.
 * 4) Aynı kayıtları yıl + gün + başlık benzerliğiyle temizler.
 * 5) Mevcut history.ts dosyasını güncellenmiş HISTORY_DATABASE ile yeniden üretir.
 *
 * Çalıştırma:
 *   node build-history-database.mjs ./history.ts ./history.ts
 *
 * Node 18+ gerekir (native fetch).
 */

import fs from 'node:fs/promises';

const MONTHS = [
  'Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'
];
const MONTH_SLUGS = [
  'Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'
];

const inputFile = process.argv[2];
const outputFile = process.argv[3] || inputFile;
if (!inputFile) {
  console.error('Kullanım: node build-history-database.mjs <mevcut-history.ts> [çıktı-history.ts]');
  process.exit(1);
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

function htmlDecode(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x27;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)));
}

function cleanHtml(html) {
  return htmlDecode(
    html
      .replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
  );
}

function slugifyTitle(s) {
  return s.toLowerCase()
    .replace(/[’'"“”.,:;!?()\[\]{}]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseYearPrefix(text) {
  const t = text.trim();
  // Turkish Wikipedia commonly uses: "MÖ 31 –", "31 –", "1945 –".
  let m = t.match(/^MÖ\s*(\d{1,4})\s*[–—-]\s*(.*)$/i);
  if (m) return { year: -Number(m[1]), body: m[2].trim() };
  m = t.match(/^(\d{1,4})\s*(?:MÖ|M\.Ö\.)\s*[–—-]\s*(.*)$/i);
  if (m) return { year: -Number(m[1]), body: m[2].trim() };
  m = t.match(/^(\d{1,4})\s*[–—-]\s*(.*)$/);
  if (m) return { year: Number(m[1]), body: m[2].trim() };
  // Some pages use "1945: ...".
  m = t.match(/^(\d{1,4})\s*:\s*(.*)$/);
  if (m) return { year: Number(m[1]), body: m[2].trim() };
  return null;
}

function categoryFor(section, body) {
  const s = section.toLowerCase();
  if (s.includes('doğum')) return 'birth';
  if (s.includes('ölüm') || s.includes('vefat')) return 'death';

  const b = body.toLocaleLowerCase('tr-TR');
  if (/türkiye|osmanlı|osmanlı devleti|ankara|istanbul|izmir|atatürk|mustafa kemal|tbmm|türkiye büyük millet meclisi|selçuklu|selçuklular|cumhuriyet|kurtuluş savaşı|çanakkale|malazgirt|sultan|padişah/.test(b)) return 'turkey';
  if (/nasa|uzay|astronomi|astronot|uydu|roket|bilgisayar|internet|yazılım|teknoloji|elektrik|telefon|telgraf|radyo|televizyon|buluş|icat|keşfed|bilim|fizik|kimya|biyoloji|tıp|doktor|aşı|ilaç/.test(b)) return 'science';
  if (/olimpiyat|futbol|basketbol|tenis|kriket|beyzbol|şampiyona|formula|yarış|tour de france|kupa|spor/.test(b)) return 'sports';
  if (/film|sinema|müzik|şarkı|albüm|yazar|şair|roman|kitap|edebiyat|ressam|sanat|opera|tiyatro|besteci|müzisyen|heykel/.test(b)) return 'culture';
  return 'world';
}

function titleFromBody(body) {
  // İlk cümleyi başlık yap; çok kısa/garipse tüm gövdeyi kullan.
  const first = body.split(/(?<=[.!?])\s+/)[0]?.trim();
  if (first && first.length >= 12 && first.length <= 180) return first;
  return body.slice(0, 180).trim();
}

function parseSectionItems(html, sectionName) {
  const heading = new RegExp(`<h2[^>]*>[\\s\\S]*?<span[^>]*>\\s*${sectionName}\\s*<\\/span>[\\s\\S]*?<\\/h2>`, 'i');
  const match = html.match(heading);
  if (!match) return [];
  const start = match.index + match[0].length;
  const rest = html.slice(start);
  const nextHeading = rest.search(/<h2\b/i);
  const sectionHtml = nextHeading >= 0 ? rest.slice(0, nextHeading) : rest;
  const items = [];
  const liRe = /<li\b[^>]*>([\s\S]*?)<\/li>/gi;
  let m;
  while ((m = liRe.exec(sectionHtml))) {
    const text = cleanHtml(m[1]);
    if (text.length < 8) continue;
    items.push(text);
  }
  return items;
}

async function fetchDatePage(day, month) {
  const page = `${day}_${MONTH_SLUGS[month - 1]}`;
  const api = `https://tr.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(page)}&prop=text&format=json&formatversion=2&origin=*`;
  const res = await fetch(api, {
    headers: {
      'User-Agent': 'Pratiksel-TarihteBugun/1.0 (personal project; contact via project repository)'
    }
  });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const data = await res.json();
  if (!data.parse?.text) return null;
  return { page, html: data.parse.text };
}

function extractCurrentRecords(source) {
  const start = source.indexOf('export const HISTORY_DATABASE: HistoryEvent[] = [');
  const end = source.indexOf('\n];', start);
  if (start < 0 || end < 0) throw new Error('HISTORY_DATABASE bulunamadı.');
  const block = source.slice(start, end + 3);
  const records = [];
  const objectRe = /\{\s*id:\s*'([^']+)'[\s\S]*?sourceUrl:\s*'([^']*)',\s*\}/g;
  let m;
  while ((m = objectRe.exec(block))) {
    const obj = m[0];
    const get = (key) => {
      const r = obj.match(new RegExp(`${key}:\\s*'((?:\\\\'|[^'])*)'`));
      return r ? r[1].replace(/\\'/g, "'") : null;
    };
    const year = obj.match(/year:\s*(-?\d+)/)?.[1];
    const day = obj.match(/day:\s*(\d+)/)?.[1];
    const month = obj.match(/month:\s*(\d+)/)?.[1];
    const category = get('category');
    if (!year || !day || !month || !category) continue;
    records.push({
      id: get('id'), day: Number(day), month: Number(month), year: Number(year),
      title: get('title') || '', description: get('description') || '', category,
      importance: get('importance') || undefined,
      sourceLabel: get('sourceLabel') || 'Wikipedia – On This Day',
      sourceUrl: get('sourceUrl') || ''
    });
  }
  return records;
}

function escapeTs(s) {
  return String(s ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\r?\n/g, ' ');
}

function dedupe(records) {
  const map = new Map();
  for (const r of records) {
    const key = `${r.month}-${r.day}-${r.year}-${slugifyTitle(r.title).slice(0, 120)}`;
    const old = map.get(key);
    if (!old || (old.sourceLabel !== 'Wikipedia – On This Day' && r.sourceLabel === 'Wikipedia – On This Day')) map.set(key, r);
  }
  return [...map.values()].sort((a,b) => a.month-b.month || a.day-b.day || a.year-b.year || a.title.localeCompare(b.title, 'tr'));
}

function renderDatabase(records) {
  const out = [];
  out.push('export const HISTORY_DATABASE: HistoryEvent[] = [');
  let lastKey = '';
  for (const r of records) {
    const key = `${r.month}-${r.day}`;
    if (key !== lastKey) {
      if (lastKey) out.push('');
      out.push(`  // =========================================================================`);
      out.push(`  // ${String(r.day).padStart(2,'0')} ${MONTHS[r.month-1].toLocaleUpperCase('tr-TR')}`);
      out.push(`  // =========================================================================`);
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
    if (r.importance) out.push(`    importance: '${r.importance}',`);
    out.push(`    sourceLabel: '${escapeTs(r.sourceLabel)}',`);
    out.push(`    sourceUrl: '${escapeTs(r.sourceUrl)}',`);
    out.push('  },');
  }
  out.push('];');
  return out.join('\n');
}

function replaceDatabase(source, databaseText) {
  const start = source.indexOf('export const HISTORY_DATABASE: HistoryEvent[] = [');
  const end = source.indexOf('\n];', start);
  if (start < 0 || end < 0) throw new Error('HISTORY_DATABASE bloğu bulunamadı.');
  return source.slice(0, start) + databaseText + source.slice(end + 3);
}

const source = await fs.readFile(inputFile, 'utf8');
const current = extractCurrentRecords(source);
console.log(`Mevcut kayıt: ${current.length}`);

const fetched = [];
const failures = [];
for (let month = 1; month <= 12; month++) {
  const maxDay = new Date(2028, month, 0).getDate(); // leap year => includes Feb 29
  for (let day = 1; day <= maxDay; day++) {
    try {
      const page = await fetchDatePage(day, month);
      if (!page) {
        failures.push(`${day} ${MONTHS[month-1]} (sayfa yok)`);
        continue;
      }
      const sections = [
        ['Olaylar', 'event'],
        ['Doğumlar', 'birth'],
        ['Ölümler', 'death'],
      ];
      for (const [section, forcedCategory] of sections) {
        const items = parseSectionItems(page.html, section);
        for (const item of items) {
          const parsed = parseYearPrefix(item);
          if (!parsed) continue;
          const body = parsed.body;
          if (body.length < 8) continue;
          const category = forcedCategory === 'event' ? categoryFor(section, body) : forcedCategory;
          const title = titleFromBody(body);
          fetched.push({
            id: `${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}-${parsed.year}-${slugifyTitle(title).slice(0,50).replace(/[^a-z0-9çğıöşü-]+/gi,'-')}`,
            day, month, year: parsed.year, title, description: body,
            category, importance: undefined,
            sourceLabel: 'Türkçe Vikipedi – Tarihte Bugün',
            sourceUrl: `https://tr.wikipedia.org/wiki/${encodeURIComponent(page.page).replace(/%2F/g,'/')}`
          });
        }
      }
      console.log(`✓ ${String(day).padStart(2,'0')} ${MONTHS[month-1]} — ${fetched.length} yeni kayıt`);
      await sleep(220);
    } catch (err) {
      failures.push(`${day} ${MONTHS[month-1]} — ${err.message}`);
      console.error(`✗ ${day} ${MONTHS[month-1]}: ${err.message}`);
      await sleep(800);
    }
  }
}

const merged = dedupe([...current, ...fetched]);
const databaseText = renderDatabase(merged);
const output = replaceDatabase(source, databaseText);
await fs.writeFile(outputFile, output, 'utf8');

const days = new Set(merged.map(r => `${r.month}-${r.day}`));
const years = new Set(merged.map(r => r.year));
console.log('\n==============================');
console.log(`Tamamlandı: ${outputFile}`);
console.log(`Toplam kayıt: ${merged.length}`);
console.log(`Dolu tarih: ${days.size}/366`);
console.log(`Farklı yıl: ${years.size}`);
console.log(`Başarısız tarih: ${failures.length}`);
if (failures.length) {
  console.log('\nBaşarısızlar:');
  console.log(failures.join('\n'));
}
