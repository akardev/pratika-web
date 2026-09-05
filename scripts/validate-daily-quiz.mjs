import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const filePath = path.join(projectRoot, 'src/data/dailyQuiz.ts');

const quizFile = fs.readFileSync(filePath, 'utf-8');

const qRegex = /\{\s*"id":\s*"([^"]+)",\s*"category":\s*"([^"]+)",\s*"categorySlug":\s*"([^"]+)",\s*"question":\s*"([^"]+)",\s*"options":\s*\[\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)",\s*"([^"]+)"\s*\],\s*"correctIndex":\s*(\d+),\s*"explanation":\s*"([^"]+)"/g;

let m;
const questions = [];
while ((m = qRegex.exec(quizFile)) !== null) {
  questions.push({
    id: m[1],
    category: m[2],
    categorySlug: m[3],
    question: m[4],
    options: [m[5], m[6], m[7], m[8]],
    correctIndex: parseInt(m[9], 10),
    explanation: m[10]
  });
}

const issues = [];
const seenQuestions = new Map();

questions.forEach((q) => {
  const qPrefix = `[${q.id}]:`;
  if (!q.question || !q.question.trim()) {
    issues.push(`${qPrefix} Boş soru metni.`);
  }
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    issues.push(`${qPrefix} 4 seçenek bulunmuyor (mevcut: ${q.options?.length}).`);
  } else {
    // Unique options
    const optSet = new Set(q.options.map(o => o.trim().toLowerCase()));
    if (optSet.size !== 4) {
      issues.push(`${qPrefix} Seçenekler arasında tekrar var: ${JSON.stringify(q.options)}`);
    }
    // CorrectIndex
    if (typeof q.correctIndex !== 'number' || q.correctIndex < 0 || q.correctIndex > 3) {
      issues.push(`${qPrefix} Geçersiz correctIndex: ${q.correctIndex}`);
    }
  }

  // Check duplicate question
  const cleanQ = q.question?.trim().toLowerCase();
  if (seenQuestions.has(cleanQ)) {
    issues.push(`${qPrefix} "${q.question}" sorusu daha önce ${seenQuestions.get(cleanQ)} ID'si ile eklenmiş.`);
  } else {
    seenQuestions.set(cleanQ, q.id);
  }
});

console.log('==================================================');
console.log('GÜNÜN SORUSU VERİ DOĞRULAMA RAPORU');
console.log('==================================================');
console.log(`Toplam taranan soru sayısı : ${questions.length}`);
console.log(`Tespit edilen hata sayısı  : ${issues.length}`);
console.log('==================================================');

if (issues.length > 0) {
  issues.forEach(i => console.error('Hata:', i));
  process.exit(1);
} else {
  console.log('Tüm quiz soruları ve seçenekleri %100 geçerlidir.');
}
