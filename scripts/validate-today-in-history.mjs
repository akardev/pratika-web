import fs from 'fs';
import readline from 'readline';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const filePath = path.join(projectRoot, 'src/data/todayInHistory.ts');

const validCategories = new Set([
  'event', 'turkey', 'world', 'science', 'culture', 'sports', 'birth', 'death'
]);

async function validateTodayInHistory() {
  console.log('Validating Tarihte Bugün data:', filePath);
  const startTime = Date.now();

  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let totalEvents = 0;
  const daysFound = new Set();
  const invalidCategories = [];
  const emptyTitles = [];
  const emptyDescriptions = [];
  const invalidUrls = [];
  const duplicateIds = new Map();
  let currentEvent = null;
  let inDatabase = false;
  let lineNum = 0;

  for await (const line of rl) {
    lineNum++;
    if (line.includes('const rawHistoryDatabase')) {
      inDatabase = true;
      continue;
    }
    if (!inDatabase) continue;
    if (line.trim().startsWith('];')) {
      inDatabase = false;
      break;
    }

    if (line.trim() === '{') {
      currentEvent = {};
      continue;
    }

    if (line.trim() === '},' || line.trim() === '}') {
      if (currentEvent) {
        totalEvents++;
        const { id, day, month, title, description, category, sourceUrl } = currentEvent;
        
        if (day && month) {
          daysFound.add(`${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
        }

        if (id) {
          duplicateIds.set(id, (duplicateIds.get(id) || 0) + 1);
        }

        if (!title || !title.trim()) {
          emptyTitles.push({ id, lineNum });
        }

        if (!description || !description.trim()) {
          emptyDescriptions.push({ id, lineNum });
        }

        if (!category || !validCategories.has(category)) {
          invalidCategories.push({ id, category, lineNum });
        }

        if (sourceUrl && !sourceUrl.startsWith('http://') && !sourceUrl.startsWith('https://')) {
          invalidUrls.push({ id, sourceUrl, lineNum });
        }

        currentEvent = null;
      }
      continue;
    }

    if (!currentEvent) continue;

    const trimmed = line.trim();
    if (trimmed.startsWith('id:')) {
      currentEvent.id = trimmed.substring(3).trim().replace(/^['"]|['"],?$/g, '');
    } else if (trimmed.startsWith('day:')) {
      currentEvent.day = parseInt(trimmed.substring(4).trim(), 10);
    } else if (trimmed.startsWith('month:')) {
      currentEvent.month = parseInt(trimmed.substring(6).trim(), 10);
    } else if (trimmed.startsWith('year:')) {
      currentEvent.year = parseInt(trimmed.substring(5).trim(), 10);
    } else if (trimmed.startsWith('title:')) {
      currentEvent.title = trimmed.substring(6).trim().replace(/^['"]|['"],?$/g, '');
    } else if (trimmed.startsWith('description:')) {
      currentEvent.description = trimmed.substring(12).trim().replace(/^['"]|['"],?$/g, '');
    } else if (trimmed.startsWith('category:')) {
      currentEvent.category = trimmed.substring(9).trim().replace(/^['"]|['"],?$/g, '');
    } else if (trimmed.startsWith('sourceUrl:')) {
      currentEvent.sourceUrl = trimmed.substring(10).trim().replace(/^['"]|['"],?$/g, '');
    }
  }

  const duplicates = Array.from(duplicateIds.entries()).filter(([, count]) => count > 1);

  console.log('==================================================');
  console.log('TARİHTE BUGÜN VERİ DOĞRULAMA RAPORU');
  console.log('==================================================');
  console.log(`Toplam taranan olay sayısı : ${totalEvents}`);
  console.log(`Tespit edilen gün sayısı   : ${daysFound.size} / 366 (Tam 1 yıl + artık yıl)`);
  console.log(`Boş başlık sayısı         : ${emptyTitles.length}`);
  console.log(`Boş açıklama sayısı        : ${emptyDescriptions.length}`);
  console.log(`Geçersiz kategori sayısı   : ${invalidCategories.length}`);
  console.log(`Geçersiz kaynak URL sayısı : ${invalidUrls.length}`);
  console.log(`Tekrarlanan ID sayısı      : ${duplicates.length}`);
  console.log(`İşlem süresi               : ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
  console.log('==================================================');

  if (daysFound.size !== 366 || emptyTitles.length > 0 || emptyDescriptions.length > 0 || invalidCategories.length > 0 || duplicates.length > 0) {
    if (duplicates.length > 0) {
      console.error('HATA: Aşağıdaki ID\'ler birden fazla kez kullanılmış:', duplicates);
    }
    console.error('Doğrulama başarısız oldu!');
    process.exit(1);
  } else {
    console.log('Tarihte Bugün verisi %100 geçerli ve eksiksizdir.');
  }
}

validateTodayInHistory().catch((err) => {
  console.error(err);
  process.exit(1);
});
