import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const filePath = path.join(projectRoot, 'src/data/dailyQuiz.ts');

function parseQuizQuestions(fileContent) {
  const marker = 'export const QUIZ_QUESTIONS';
  const startIdx = fileContent.indexOf(marker);
  if (startIdx === -1) {
    throw new Error(`dailyQuiz.ts içinde '${marker}' tanımı bulunamadı.`);
  }

  const eqIdx = fileContent.indexOf('=', startIdx);
  if (eqIdx === -1) {
    throw new Error(`'${marker}' sonrasında '=' ataması bulunamadı.`);
  }

  const arrStart = fileContent.indexOf('[', eqIdx);
  if (arrStart === -1) {
    throw new Error(`'${marker}' sonrasında dizi başlangıcı '[' bulunamadı.`);
  }

  // Bracket balance parser that safely handles strings and escapes
  let depth = 0;
  let inString = false;
  let quoteChar = '';
  let escape = false;
  let arrEnd = -1;

  for (let i = arrStart; i < fileContent.length; i++) {
    const char = fileContent[i];

    if (escape) {
      escape = false;
      continue;
    }

    if (char === '\\') {
      escape = true;
      continue;
    }

    if (inString) {
      if (char === quoteChar) {
        inString = false;
      }
      continue;
    }

    if (char === '"' || char === "'") {
      inString = true;
      quoteChar = char;
      continue;
    }

    if (char === '[') {
      depth++;
    } else if (char === ']') {
      depth--;
      if (depth === 0) {
        arrEnd = i;
        break;
      }
    }
  }

  if (arrEnd === -1) {
    throw new Error(`'${marker}' dizisinin kapanış ']' parantezi bulunamadı.`);
  }

  const jsonSnippet = fileContent.slice(arrStart, arrEnd + 1);
  return JSON.parse(jsonSnippet);
}

const quizFileContent = fs.readFileSync(filePath, 'utf-8');
let questions = [];

try {
  questions = parseQuizQuestions(quizFileContent);
} catch (err) {
  console.error('Quiz verisi ayrıştırılırken hata oluştu:', err.message);
  process.exit(1);
}

const issues = [];
const seenIds = new Set();
const seenQuestions = new Map();

// Kural 1: Toplam soru sayısı 0 ise kesinlikle hata kabul et
if (!Array.isArray(questions) || questions.length === 0) {
  issues.push('Kritik Hata: Taranan soru sayısı 0 veya veri bir dizi değil!');
} else {
  questions.forEach((q, idx) => {
    const qPrefix = `[Soru ${idx + 1} - ${q?.id || 'ID_YOK'}]:`;

    // ID kontrolü
    if (!q.id || typeof q.id !== 'string' || !q.id.trim()) {
      issues.push(`${qPrefix} ID alanı boş veya tanımsız.`);
    } else if (seenIds.has(q.id)) {
      issues.push(`${qPrefix} Tekrarlanan ID (${q.id}).`);
    } else {
      seenIds.add(q.id);
    }

    // Kategori kontrolleri
    if (!q.category || typeof q.category !== 'string' || !q.category.trim()) {
      issues.push(`${qPrefix} Kategori başlığı (category) boş.`);
    }
    if (!q.categorySlug || typeof q.categorySlug !== 'string' || !q.categorySlug.trim()) {
      issues.push(`${qPrefix} Kategori slug'ı (categorySlug) boş.`);
    }

    // Soru metni kontrolü
    if (!q.question || typeof q.question !== 'string' || !q.question.trim()) {
      issues.push(`${qPrefix} Soru metni (question) boş.`);
    }

    // Açıklama kontrolü
    if (!q.explanation || typeof q.explanation !== 'string' || !q.explanation.trim()) {
      issues.push(`${qPrefix} Açıklama (explanation) boş.`);
    }

    // Seçenekler kontrolü: Tam 4 seçenek olmalı
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      issues.push(`${qPrefix} 4 seçenek bulunmuyor (mevcut: ${q.options?.length}).`);
    } else {
      // Her seçeneğin string ve dolu olması
      q.options.forEach((opt, oIdx) => {
        if (!opt || typeof opt !== 'string' || !opt.trim()) {
          issues.push(`${qPrefix} ${oIdx + 1}. seçenek boş.`);
        }
      });

      // Seçeneklerin birbirinden farklı olması (benzersizlik)
      const normalizedOpts = q.options.map((o) => (typeof o === 'string' ? o.trim().toLowerCase() : ''));
      const uniqueOpts = new Set(normalizedOpts);
      if (uniqueOpts.size !== 4) {
        issues.push(`${qPrefix} Seçenekler arasında tekrar eden maddeler var: ${JSON.stringify(q.options)}`);
      }
    }

    // Doğru cevap indeksi kontrolü: 0-3 aralığında tam sayı olmalı
    if (typeof q.correctIndex !== 'number' || !Number.isInteger(q.correctIndex) || q.correctIndex < 0 || q.correctIndex > 3) {
      issues.push(`${qPrefix} Geçersiz correctIndex (${q.correctIndex}). 0, 1, 2 veya 3 olmalı.`);
    }

    // Soru metni tekrarı kontrolü
    if (q.question && typeof q.question === 'string') {
      const cleanQ = q.question.trim().toLowerCase();
      if (seenQuestions.has(cleanQ)) {
        issues.push(`${qPrefix} Bu soru daha önce '${seenQuestions.get(cleanQ)}' ID'si ile eklenmiş.`);
      } else {
        seenQuestions.set(cleanQ, q.id);
      }
    }
  });
}

console.log('==================================================');
console.log('GÜNÜN SORUSU VERİ DOĞRULAMA RAPORU');
console.log('==================================================');
console.log(`Toplam taranan soru sayısı : ${questions?.length ?? 0}`);
console.log(`Tespit edilen hata sayısı  : ${issues.length}`);
console.log('==================================================');

if (issues.length > 0) {
  issues.forEach((issue) => console.error('Hata:', issue));
  process.exit(1);
} else {
  console.log('Tüm quiz soruları, seçenekleri ve veri yapıları %100 geçerlidir.');
}
