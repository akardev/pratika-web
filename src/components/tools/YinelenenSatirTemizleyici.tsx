'use client';

import { useState } from 'react';

export default function YinelenenSatirTemizleyici() {
  const [inputText, setInputText] = useState<string>(
    'elma\narmut\nmuz\nelma\nçilek\nmuz\nportakal\narmut'
  );
  const [outputText, setOutputText] = useState<string>('');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);
  const [trimLines, setTrimLines] = useState<boolean>(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState<boolean>(true);
  const [stats, setStats] = useState<{ original: number; unique: number; removed: number } | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleDeduplicate = () => {
    let lines = inputText.split('\n');
    const originalCount = lines.length;

    if (trimLines) {
      lines = lines.map((l) => l.trim());
    }

    if (removeEmptyLines) {
      lines = lines.filter((l) => l.length > 0);
    }

    const seen = new Set<string>();
    const uniqueLines: string[] = [];

    lines.forEach((line) => {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueLines.push(line);
      }
    });

    const uniqueCount = uniqueLines.length;
    const removedCount = originalCount - uniqueCount;

    setOutputText(uniqueLines.join('\n'));
    setStats({
      original: originalCount,
      unique: uniqueCount,
      removed: removedCount,
    });
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="space-y-6">
          <div>
            <label htmlFor="input" className="block text-sm font-medium mb-1.5 text-foreground">
              Girdi Metni / Liste (Her satıra bir eleman)
            </label>
            <textarea
              id="input"
              rows={5}
              placeholder="Listeyi buraya yapıştırın..."
              className="w-full rounded-lg border border-border bg-background p-3 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-medium text-foreground">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={caseSensitive}
                onChange={(e) => setCaseSensitive(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary"
              />
              Büyük / Küçük Harfe Duyarlı
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={trimLines}
                onChange={(e) => setTrimLines(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary"
              />
              Boşlukları Kırp (Trim)
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={removeEmptyLines}
                onChange={(e) => setRemoveEmptyLines(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary"
              />
              Boş Satırları Temizle
            </label>
          </div>

          <button
            type="button"
            onClick={handleDeduplicate}
            className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Tekrarlayan Satırları Temizle
          </button>

          {stats && (
            <div className="p-3 bg-muted/30 rounded-lg border border-border/60 flex justify-around text-center text-xs">
              <div>
                <span className="text-muted-foreground block">Toplam Satır:</span>
                <span className="font-bold text-foreground">{stats.original}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Benzersiz Satır:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{stats.unique}</span>
              </div>
              <div>
                <span className="text-muted-foreground block">Silinen Tekrar:</span>
                <span className="font-bold text-destructive">-{stats.removed}</span>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="output" className="block text-sm font-medium text-foreground">
                Benzersiz Sonuç Listesi
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-muted hover:bg-muted/80 text-foreground border border-border transition-colors"
              >
                {copied ? 'Kopyalandı! ✓' : 'Kopyala'}
              </button>
            </div>
            <textarea
              id="output"
              rows={5}
              readOnly
              className="w-full rounded-lg border border-border bg-muted/30 p-3 text-foreground font-mono text-sm focus:outline-none"
              value={outputText}
            />
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Yinelenen Satırları Temizleme</h2>
        <p className="mb-4 text-muted-foreground">
          E-posta listeleri, anahtar kelimeler, ürün kodları veya telefon numaraları içeren veri listelerindeki çift kayıtları (duplicate) anında tekilleştirir.
        </p>
      </div>
    </div>
  );
}
