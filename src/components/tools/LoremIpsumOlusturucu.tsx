'use client';

import { useState } from 'react';
import { sanitizeNumericInput } from '@/lib/utils';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
  'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'enim',
  'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'aliquip',
  'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'in', 'reprehenderit', 'voluptate',
  'velit', 'esse', 'cillum', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat',
  'non', 'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function generateSentenceWithSeed(baseSeed: number, minWords = 6, maxWords = 14): string {
  const rand = pseudoRandom(baseSeed);
  const len = Math.floor(rand * (maxWords - minWords + 1)) + minWords;
  const words: string[] = [];
  for (let i = 0; i < len; i++) {
    const wordIdx = Math.floor(pseudoRandom(baseSeed + i + 1) * LOREM_WORDS.length);
    words.push(LOREM_WORDS[wordIdx]);
  }
  const sentence = words.join(' ');
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}

function generateLoremText(type: 'paragraphs' | 'words' | 'sentences', count: number, startWithLorem: boolean, seed: number): string {
  const safeCount = Math.max(1, Math.min(count || 1, 50));

  if (type === 'words') {
    const words: string[] = [];
    if (startWithLorem && safeCount >= 2) {
      words.push('Lorem', 'ipsum');
      for (let i = 2; i < safeCount; i++) {
        const idx = Math.floor(pseudoRandom(seed * 100 + i) * LOREM_WORDS.length);
        words.push(LOREM_WORDS[idx]);
      }
    } else {
      for (let i = 0; i < safeCount; i++) {
        const idx = Math.floor(pseudoRandom(seed * 100 + i) * LOREM_WORDS.length);
        words.push(LOREM_WORDS[idx]);
      }
    }
    return words.join(' ');
  }

  if (type === 'sentences') {
    const sentences: string[] = [];
    for (let i = 0; i < safeCount; i++) {
      if (i === 0 && startWithLorem) {
        sentences.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
      } else {
        sentences.push(generateSentenceWithSeed(seed * 50 + i * 10));
      }
    }
    return sentences.join(' ');
  }

  // Paragraphs
  const paragraphs: string[] = [];
  for (let i = 0; i < safeCount; i++) {
    if (i === 0 && startWithLorem) {
      paragraphs.push(
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
      );
    } else {
      const sentences: string[] = [];
      for (let j = 0; j < 5; j++) {
        sentences.push(generateSentenceWithSeed(seed * 100 + i * 20 + j));
      }
      paragraphs.push(sentences.join(' '));
    }
  }
  return paragraphs.join('\n\n');
}

export default function LoremIpsumOlusturucu() {
  const [type, setType] = useState<'paragraphs' | 'words' | 'sentences'>('paragraphs');
  const [count, setCount] = useState<number>(3);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [seed, setSeed] = useState(1);
  const [resultText, setResultText] = useState(() => generateLoremText('paragraphs', 3, true, 1));
  const [copied, setCopied] = useState(false);

  const handleGenerate = (
    t = type,
    c = count,
    start = startWithLorem,
    s = seed
  ) => {
    setResultText(generateLoremText(t, c, start, s));
  };

  const handleTypeChange = (newType: 'paragraphs' | 'words' | 'sentences') => {
    setType(newType);
    handleGenerate(newType, count, startWithLorem, seed);
  };

  const handleCountChange = (newCount: number) => {
    setCount(newCount);
    handleGenerate(type, newCount, startWithLorem, seed);
  };

  const handleStartWithLoremChange = (checked: boolean) => {
    setStartWithLorem(checked);
    handleGenerate(type, count, checked, seed);
  };

  const handleRegenerate = () => {
    const nextSeed = seed + 1;
    setSeed(nextSeed);
    handleGenerate(type, count, startWithLorem, nextSeed);
  };

  const handleCopy = () => {
    if (!resultText) return;
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="lorem-type" className="block text-sm font-semibold text-foreground mb-2">
              Üretim Türü
            </label>
            <select
              id="lorem-type"
              value={type}
              onChange={(e) => handleTypeChange(e.target.value as 'paragraphs' | 'words' | 'sentences')}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
            >
              <option value="paragraphs">Paragraf</option>
              <option value="sentences">Cümle</option>
              <option value="words">Kelime</option>
            </select>
          </div>

          <div>
            <label htmlFor="lorem-count" className="block text-sm font-semibold text-foreground mb-2">
              Adet (1 - 50)
            </label>
            <input
              type="text"
              inputMode="numeric"
              id="lorem-count"
              value={count}
              onChange={(e) => {
                const cleaned = sanitizeNumericInput(e.target.value, { allowDecimal: false });
                const num = parseInt(cleaned) || 1;
                handleCountChange(Math.max(1, Math.min(num, 50)));
              }}
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
            />
          </div>

          <div className="flex flex-col justify-end">
            <button
              type="button"
              onClick={handleRegenerate}
              className="w-full h-11 px-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-xs"
            >
              ↻ Yeniden Üret
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <input
            type="checkbox"
            id="start-with"
            checked={startWithLorem}
            onChange={(e) => handleStartWithLoremChange(e.target.checked)}
            className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
          />
          <label htmlFor="start-with" className="text-sm font-medium text-foreground cursor-pointer">
            &quot;Lorem ipsum...&quot; ile başla
          </label>
        </div>

        {/* Sonuç Alanı */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Taslak Metin Sonucu
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="text-xs font-semibold text-primary hover:underline"
            >
              {copied ? 'Kopyalandı!' : 'Metni Kopyala'}
            </button>
          </div>

          <div className="relative">
            <textarea
              readOnly
              rows={8}
              value={resultText}
              className="w-full rounded-xl border border-border bg-muted/20 p-4 text-foreground text-sm sm:text-base leading-relaxed resize-y font-normal"
            />
          </div>
        </div>
      </div>

      {/* Bilgilendirme */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Lorem Ipsum Nedir?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Lorem Ipsum, matbaacılık ve dizgi sektöründe 1500&apos;lerden beri kullanılan standart sahte metindir. Tasarımın ve tipografinin okunabilirlik üzerindeki etkisini ölçmek için anlamlı bir metin yerine harf dağılımı dengeli olan taslak metin tercih edilir.
        </p>
      </div>
    </div>
  );
}
