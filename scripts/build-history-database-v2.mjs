#!/usr/bin/env node
/**
 * Pratiksel - Tarihte Bugün veri üreticisi (429 korumalı / kaldığı yerden devam eder)
 * Node 18+.
 *
 * Kullanım:
 *   node build-history-database-v2.mjs "src\\data\\todayInHistory.ts" "src\\data\\todayInHistory.generated.ts"
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const MONTHS = ['Ocak','Şubat','Mart','Nisan','Mayıs','Haziran','Temmuz','Ağustos','Eylül','Ekim','Kasım','Aralık'];
const MONTH_SLUGS = MONTHS;

const inputFile = process.argv[2];
const outputFile = process.argv[3] || inputFile;
if (!inputFile) {
  console.error('Kullanım: node build-history-database-v2.mjs <mevcut-history.ts> [çıktı-history.ts]');
  process.exit(1);
}

const cacheFile = path.resolve(`${outputFile}.cache.json`);
const sleep = ms => new Promise(r => setTimeout(r, ms));

function htmlDecode(s) {
  return s.replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'")
    .replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#x27;/gi,"'")
    .replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n)));
}
function cleanHtml(html) {
  return htmlDecode(html.replace(/<sup[^>]*>[\s\S]*?<\/sup>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'')
    .replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim());
}
function slugifyTitle(s) {
  return s.toLocaleLowerCase('tr-TR').replace(/[’'"“”.,:;!?()\[\]{}]/g,'').replace(/\s+/g,' ').trim();
}
function parseYearPrefix(text) {
  const t = text.trim();
  let m = t.match(/^MÖ\s*(\d{1,4})\s*[–—-]\s*(.*)$/i);
  if (m) return {year:-Number(m[1]),body:m[2].trim()};
  m = t.match(/^(\d{1,4})\s*(?:MÖ|M\.Ö\.)\s*[–—-]\s*(.*)$/i);
  if (m) return {year:-Number(m[1]),body:m[2].trim()};
  m = t.match(/^(\d{1,4})\s*[–—-]\s*(.*)$/);
  if (m) return {year:Number(m[1]),body:m[2].trim()};
  m = t.match(/^(\d{1,4})\s*:\s*(.*)$/);
  if (m) return {year:Number(m[1]),body:m[2].trim()};
  return null;
}
function categoryFor(body) {
  const b = body.toLocaleLowerCase('tr-TR');
  if (/türkiye|osmanlı|ankara|istanbul|izmir|atatürk|mustafa kemal|tbmm|türkiye büyük millet meclisi|selçuklu|cumhuriyet|kurtuluş savaşı|çanakkale|malazgirt|padişah/.test(b)) return 'turkey';
  if (/nasa|uzay|astronomi|astronot|uydu|roket|bilgisayar|internet|yazılım|teknoloji|elektrik|telefon|telgraf|radyo|televizyon|buluş|icat|keşfed|bilim|fizik|kimya|biyoloji|tıp|doktor|aşı|ilaç/.test(b)) return 'science';
  if (/olimpiyat|futbol|basketbol|tenis|kriket|beyzbol|şampiyona|formula|yarış|tour de france|kupa|spor/.test(b)) return 'sports';
  if (/film|sinema|müzik|şarkı|albüm|yazar|şair|roman|kitap|edebiyat|ressam|sanat|opera|tiyatro|besteci|müzisyen|heykel/.test(b)) return 'culture';
  return 'world';
}
function titleFromBody(body) {
  const first = body.split(/(?<=[.!?])\s+/)[0]?.trim();
  return first && first.length >= 12 && first.length <= 180 ? first : body.slice(0,180).trim();
}
function parseSectionItems(html, sectionName) {
  const heading = new RegExp(`<h2[^>]*>[\\s\\S]*?<span[^>]*>\\s*${sectionName}\\s*<\\/span>[\\s\\S]*?<\\/h2>`, 'i');
  const match = html.match(heading);
  if (!match) return [];
  const start = match.index + match[0].length;
  const rest = html.slice(start);
  const nextHeading = rest.search(/<h2\b/i);
  const sectionHtml = nextHeading >= 0 ? rest.slice(0,nextHeading) : rest;
  const items=[]; const liRe=/<li\b[^>]*>([\s\S]*?)<\/li>/gi; let m;
  while ((m=liRe.exec(sectionHtml))) { const text=cleanHtml(m[1]); if(text.length>=8) items.push(text); }
  return items;
}

async function fetchDatePage(day, month) {
  const page = `${day}_${MONTH_SLUGS[month-1]}`;
  const api = `https://tr.wikipedia.org/w/api.php?action=parse&page=${encodeURIComponent(page)}&prop=text&format=json&formatversion=2&origin=*`;
  const maxAttempts = 7;
  for (let attempt=1; attempt<=maxAttempts; attempt++) {
    try {
      const res = await fetch(api, {headers:{
        'User-Agent':'Pratiksel-TarihteBugun/1.1 (personal project; respectful API client)',
        'Accept':'application/json'
      }});
      if (res.ok) {
        const data = await res.json();
        if (data.error) throw new Error(`${data.error.code}: ${data.error.info}`);
        return {page, html:data.parse?.text ?? null};
      }
      if (res.status === 429) {
        const retryAfter = Number(res.headers.get('retry-after'));
        const wait = Number.isFinite(retryAfter) && retryAfter > 0
          ? Math.min(retryAfter*1000, 120000)
          : Math.min(15000 * (2 ** (attempt-1)), 120000);
        console.warn(`  429 geldi; ${Math.round(wait/1000)} sn bekleniyor (deneme ${attempt}/${maxAttempts})...`);
        await sleep(wait);
        continue;
      }
      if (res.status >= 500) {
        const wait = Math.min(5000 * attempt, 30000);
        console.warn(`  Wikipedia ${res.status}; ${Math.round(wait/1000)} sn bekleniyor...`);
        await sleep(wait);
        continue;
      }
      throw new Error(`${res.status} ${res.statusText}`);
    } catch (err) {
      if (attempt === maxAttempts) throw err;
      const wait = Math.min(5000 * attempt, 30000);
      console.warn(`  Ağ/API hatası: ${err.message}; ${Math.round(wait/1000)} sn sonra tekrar...`);
      await sleep(wait);
    }
  }
  throw new Error('Maksimum deneme sayısına ulaşıldı.');
}

function extractCurrentRecords(source) {
  const start=source.indexOf('export const HISTORY_DATABASE: HistoryEvent[] = [');
  const end=source.indexOf('\n];',start);
  if(start<0||end<0) throw new Error('HISTORY_DATABASE bulunamadı.');
  const block=source.slice(start,end+3); const records=[];
  const objectRe=/\{\s*id:\s*'([^']+)'[\s\S]*?sourceUrl:\s*'([^']*)',\s*\}/g; let m;
  while((m=objectRe.exec(block))){
    const obj=m[0]; const get=key=>{const r=obj.match(new RegExp(`${key}:\\s*'((?:\\\\'|[^'])*)'`));return r?r[1].replace(/\\'/g,"'"):null;};
    const year=obj.match(/year:\s*(-?\d+)/)?.[1], day=obj.match(/day:\s*(\d+)/)?.[1], month=obj.match(/month:\s*(\d+)/)?.[1], category=get('category');
    if(!year||!day||!month||!category) continue;
    records.push({id:get('id'),day:Number(day),month:Number(month),year:Number(year),title:get('title')||'',description:get('description')||'',category,importance:get('importance')||undefined,sourceLabel:get('sourceLabel')||'Wikipedia – On This Day',sourceUrl:get('sourceUrl')||''});
  }
  return records;
}
function escapeTs(s){return String(s??'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\r?\n/g,' ');}
function dedupe(records){
  const map=new Map();
  for(const r of records){
    const key=`${r.month}-${r.day}-${r.year}-${slugifyTitle(r.title).slice(0,120)}`;
    const old=map.get(key);
    if(!old || (old.sourceLabel!=='Wikipedia – On This Day' && r.sourceLabel==='Wikipedia – On This Day')) map.set(key,r);
  }
  return [...map.values()].sort((a,b)=>a.month-b.month||a.day-b.day||a.year-b.year||a.title.localeCompare(b.title,'tr'));
}
function renderDatabase(records){
  const out=['export const HISTORY_DATABASE: HistoryEvent[] = [']; let lastKey='';
  for(const r of records){const key=`${r.month}-${r.day}`; if(key!==lastKey){if(lastKey)out.push('');out.push(`  // =========================================================================`);out.push(`  // ${String(r.day).padStart(2,'0')} ${MONTHS[r.month-1].toLocaleUpperCase('tr-TR')}`);out.push(`  // =========================================================================`);lastKey=key;}
    out.push('  {',`    id: '${escapeTs(r.id)}',`,`    day: ${r.day},`,`    month: ${r.month},`,`    year: ${r.year},`,`    title: '${escapeTs(r.title)}',`,`    description: '${escapeTs(r.description)}',`,`    category: '${r.category}',`); if(r.importance)out.push(`    importance: '${r.importance}',`); out.push(`    sourceLabel: '${escapeTs(r.sourceLabel)}',`,`    sourceUrl: '${escapeTs(r.sourceUrl)}',`,'  },');
  } out.push('];'); return out.join('\n');
}
function replaceDatabase(source,databaseText){const start=source.indexOf('export const HISTORY_DATABASE: HistoryEvent[] = [');const end=source.indexOf('\n];',start);if(start<0||end<0)throw new Error('HISTORY_DATABASE bloğu bulunamadı.');return source.slice(0,start)+databaseText+source.slice(end+3);}

async function loadCache(){try{return JSON.parse(await fs.readFile(cacheFile,'utf8'));}catch{return {};}}
async function saveCache(cache){await fs.writeFile(cacheFile,JSON.stringify(cache),'utf8');}

const source=await fs.readFile(inputFile,'utf8');
const current=extractCurrentRecords(source);
console.log(`Mevcut kayıt: ${current.length}`);
console.log(`Cache: ${cacheFile}`);
console.log('Wikipedia API kontrollü hızda taranacak. Daha önce tamamlanan günler atlanacak.\n');

const cache=await loadCache();
const fetched=[]; const failures=[]; let processed=0;
for(let month=1;month<=12;month++){
  const maxDay=new Date(2028,month,0).getDate();
  for(let day=1;day<=maxDay;day++){
    const key=`${month}-${day}`;
    if(cache[key]?.ok){
      fetched.push(...cache[key].records);
      processed++;
      continue;
    }
    try{
      const page=await fetchDatePage(day,month);
      const records=[];
      if(page?.html){
        for(const [section,forcedCategory] of [['Olaylar','event'],['Doğumlar','birth'],['Ölümler','death']]){
          for(const item of parseSectionItems(page.html,section)){
            const parsed=parseYearPrefix(item); if(!parsed||parsed.body.length<8)continue;
            const body=parsed.body; const category=forcedCategory==='event'?categoryFor(body):forcedCategory; const title=titleFromBody(body);
            records.push({id:`${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}-${parsed.year}-${slugifyTitle(title).slice(0,50).replace(/[^a-z0-9çğıöşü-]+/gi,'-')}`,day,month,year:parsed.year,title,description:body,category,sourceLabel:'Türkçe Vikipedi – Tarihte Bugün',sourceUrl:`https://tr.wikipedia.org/wiki/${encodeURIComponent(page.page).replace(/%2F/g,'/')}`});
          }
        }
      }
      cache[key]={ok:true,records}; await saveCache(cache); fetched.push(...records); processed++;
      console.log(`✓ ${String(day).padStart(2,'0')} ${MONTHS[month-1]} — ${records.length} kayıt | ${processed}/366 gün`);
      // İstekler arasında 2 saniye. 429 olursa retry/backoff ayrıca devreye girer.
      await sleep(2000);
    }catch(err){
      failures.push(`${day} ${MONTHS[month-1]} — ${err.message}`); console.error(`✗ ${day} ${MONTHS[month-1]}: ${err.message}`); await sleep(5000);
    }
  }
}

const merged=dedupe([...current,...fetched]);
await fs.writeFile(outputFile,replaceDatabase(source,renderDatabase(merged)),'utf8');
const days=new Set(merged.map(r=>`${r.month}-${r.day}`)); const years=new Set(merged.map(r=>r.year));
console.log('\n==============================');
console.log(`Tamamlandı: ${outputFile}`); console.log(`Toplam kayıt: ${merged.length}`); console.log(`Dolu tarih: ${days.size}/366`); console.log(`Farklı yıl: ${years.size}`); console.log(`Başarısız tarih: ${failures.length}`);
if(failures.length){console.log('\nBaşarısızlar:');console.log(failures.join('\n'));}
console.log(`\nCache dosyası korunuyor: ${cacheFile}`);
