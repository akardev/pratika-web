'use client';

import { useState } from 'react';

export default function KelimeSikligiAnalizi() {
  const [text, setText] = useState<string>('Pratiksel ile hayatınızı kolaylaştıran yüzlerce ücretsiz araç elinizin altında. Pratiksel, hızlı, güvenilir ve tamamen modern bir hesaplama ve dönüşüm platformudur.');
  const [ignoreCase, setIgnoreCase] = useState<boolean>(true);
  const [minWordLength, setMinWordLength] = useState<number>(2);

  const [analysis, setAnalysis] = useState<{
    totalWords: number;
    uniqueWords: number;
    totalCharsWithSpaces: number;
    totalCharsNoSpaces: number;
    topWords: { word: string; count: number; percentage: number }[];
  } | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      setAnalysis(null);
      return;
    }

    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s+/g, '').length;

    // Kelimeleri ayır ve temizle
    const rawWords = text
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'„“”‘’«»[\]<>\\|\n\r\t]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.trim().length > 0);

    const filteredWords = rawWords.filter((w) => w.length >= minWordLength);
    const totalWords = filteredWords.length;

    const counts: Record<string, number> = {};
    for (const w of filteredWords) {
      const key = ignoreCase ? w.toLocaleLowerCase('tr-TR') : w;
      counts[key] = (counts[key] || 0) + 1;
    }

    const sortedWords = Object.entries(counts)
      .map(([word, count]) => ({
        word,
        count,
        percentage: totalWords > 0 ? (count / totalWords) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count);

    setAnalysis({
      totalWords,
      uniqueWords: Object.keys(counts).length,
      totalCharsWithSpaces: charsWithSpaces,
      totalCharsNoSpaces: charsNoSpaces,
      topWords: sortedWords.slice(0, 15),
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div>
            <label htmlFor="inputText" className="block text-sm font-medium mb-2 text-foreground">
              Analiz Edilecek Metin
            </label>
            <textarea
              id="inputText"
              rows={6}
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-sans"
              placeholder="Metninizi buraya yapıştırın veya yazın..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <label className="flex items-center gap-2 text-xs font-medium text-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={ignoreCase}
                onChange={(e) => setIgnoreCase(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              Büyük / Küçük Harf Farkını Yoksay (Örn: &quot;Pratiksel&quot; = &quot;pratiksel&quot;)
            </label>

            <div className="flex items-center gap-2 text-xs font-medium text-foreground">
              <span>Asgari Harf Uzunluğu:</span>
              <select
                className="rounded-md border border-border bg-background px-2 py-1 text-xs"
                value={minWordLength}
                onChange={(e) => setMinWordLength(Number(e.target.value))}
              >
                <option value={1}>1+ Harf (Tümü)</option>
                <option value={2}>2+ Harf</option>
                <option value={3}>3+ Harf</option>
                <option value={4}>4+ Harf</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground text-sm font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all"
          >
            Kelime Sıklığı ve Metin İstatistiklerini Analiz Et
          </button>
        </form>

        {analysis && (
          <div className="mt-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-center">
                <span className="text-xs text-muted-foreground block mb-0.5">Toplam Kelime</span>
                <span className="text-xl font-bold text-foreground">{analysis.totalWords}</span>
              </div>
              <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-center">
                <span className="text-xs text-muted-foreground block mb-0.5">Benzersiz Kelime</span>
                <span className="text-xl font-bold text-primary">{analysis.uniqueWords}</span>
              </div>
              <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-center">
                <span className="text-xs text-muted-foreground block mb-0.5">Karakter (Boşluklu)</span>
                <span className="text-xl font-bold text-foreground">{analysis.totalCharsWithSpaces}</span>
              </div>
              <div className="p-3.5 bg-muted/40 rounded-xl border border-border/60 text-center">
                <span className="text-xs text-muted-foreground block mb-0.5">Karakter (Boşluksuz)</span>
                <span className="text-xl font-bold text-foreground">{analysis.totalCharsNoSpaces}</span>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                En Çok Tekrar Eden Kelimeler (İlk 15)
              </h3>
              <div className="overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-xs text-left">
                  <thead className="bg-muted/60 text-foreground border-b border-border">
                    <tr>
                      <th className="p-2.5 font-semibold">Sıra</th>
                      <th className="p-2.5 font-semibold">Kelime</th>
                      <th className="p-2.5 font-semibold text-center">Tekrar Adedi</th>
                      <th className="p-2.5 font-semibold text-right">Yoğunluk (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {analysis.topWords.map((item, idx) => (
                      <tr key={item.word} className="hover:bg-muted/20">
                        <td className="p-2.5 text-muted-foreground">{idx + 1}</td>
                        <td className="p-2.5 font-medium text-foreground">&quot;{item.word}&quot;</td>
                        <td className="p-2.5 text-center font-mono font-bold text-primary">{item.count}</td>
                        <td className="p-2.5 text-right font-mono text-muted-foreground">%{item.percentage.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kelime Sıklığı ve Metin Analizi Ne İşe Yarar?</h2>
        <p className="mb-4 text-muted-foreground">
          Kelime sıklığı analizi; metin yazarlığı, SEO anahtar kelime optimizasyonu, akademik makale incelemeleri ve edebi metin tahlillerinde en sık yinelenen kavramları tespit etmek için kullanılır.
        </p>
      </div>
    </div>
  );
}
