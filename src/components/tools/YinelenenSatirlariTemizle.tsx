'use client';

import { useState } from 'react';

export default function YinelenenSatirlariTemizle() {
  const [inputLines, setInputLines] = useState('elma\narmut\nmuz\nelma\nportakal\narmut\nçilek');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [sortAlphabetical, setSortAlphabetical] = useState(true);
  const [cleaned, setCleaned] = useState('');
  const [stats, setStats] = useState<{ original: number; unique: number; removed: number } | null>(null);

  const handleClean = () => {
    if (!inputLines) return;
    const lines = inputLines.split('\n').map(l => l.trim()).filter(Boolean);
    const seen = new Set<string>();
    const uniqueList: string[] = [];

    for (const line of lines) {
      const key = caseSensitive ? line : line.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        uniqueList.push(line);
      }
    }

    if (sortAlphabetical) {
      uniqueList.sort((a, b) => a.localeCompare(b, 'tr'));
    }

    setCleaned(uniqueList.join('\n'));
    setStats({
      original: lines.length,
      unique: uniqueList.length,
      removed: lines.length - uniqueList.length,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <label htmlFor="lines" className="block text-sm font-medium text-foreground mb-1">Metin Satırlarını Yapıştırın</label>
          <textarea
            id="lines"
            rows={7}
            value={inputLines}
            onChange={(e) => setInputLines(e.target.value)}
            className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono"
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={caseSensitive}
              onChange={(e) => setCaseSensitive(e.target.checked)}
              className="rounded border-border"
            />
            Büyük-Küçük Harfe Duyarlı
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={sortAlphabetical}
              onChange={(e) => setSortAlphabetical(e.target.checked)}
              className="rounded border-border"
            />
            Sonuçları Alfabetik Sırala (A-Z)
          </label>
        </div>

        <button
          type="button"
          onClick={handleClean}
          className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          Tekrarlayan Satırları Temizle
        </button>

        {stats && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-xs text-muted-foreground block mb-1">Benzersiz Kalan Satır</span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{stats.unique} Satır</span>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <span className="text-xs text-muted-foreground block mb-1">Silinen Mükerrer Satır</span>
                <span className="text-xl font-bold text-destructive">{stats.removed} Satır</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Orijinal Toplam Satır</span>
                <span className="text-xl font-bold text-foreground">{stats.original} Satır</span>
              </div>
            </div>

            <textarea
              readOnly
              rows={7}
              value={cleaned}
              className="w-full p-3 rounded-lg bg-muted/40 border border-border font-mono text-sm select-all text-foreground"
            />
          </div>
        )}
      </div>
    </div>
  );
}
