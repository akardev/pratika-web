'use client';

import { useState } from 'react';

export default function RastgeleListeCekilisAraci() {
  const [namesText, setNamesText] = useState<string>('Ahmet\nMehmet\nAyşe\nFatma\nCan\nZeynep\nBurak\nElif');
  const [winnerCount, setWinnerCount] = useState<number>(1);
  const [subCount, setSubCount] = useState<number>(1);

  const [result, setResult] = useState<{
    winners: string[];
    subs: string[];
  } | null>(null);

  const handleDraw = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = namesText
      .split('\n')
      .map(l => l.trim())
      .filter(Boolean);

    if (lines.length === 0) return;

    // Kriptografik güvenli Fisher-Yates karıştırma
    const shuffled = [...lines];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const array = new Uint32Array(1);
      crypto.getRandomValues(array);
      const j = array[0] % (i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    const winners = shuffled.slice(0, Math.min(winnerCount, shuffled.length));
    const subs = shuffled.slice(winnerCount, Math.min(winnerCount + subCount, shuffled.length));

    setResult({ winners, subs });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleDraw} className="space-y-4">
          <div>
            <label htmlFor="names" className="block text-sm font-medium text-foreground mb-1">
              Katılımcı Listesi (Her satıra bir isim veya numara)
            </label>
            <textarea
              id="names"
              rows={6}
              value={namesText}
              onChange={(e) => setNamesText(e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="winc" className="block text-sm font-medium text-foreground mb-1">Asil Kazanan Sayısı</label>
              <input
                id="winc"
                type="number"
                value={winnerCount}
                onChange={(e) => setWinnerCount(Number(e.target.value))}
                min="1" max="100"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="subc" className="block text-sm font-medium text-foreground mb-1">Yedek Kazanan Sayısı</label>
              <input
                id="subc"
                type="number"
                value={subCount}
                onChange={(e) => setSubCount(Number(e.target.value))}
                min="0" max="100"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Çekilişi Başlat (Kura Çek)
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kura Sonucu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 block mb-2">🏆 Asil Kazananlar</span>
                <ol className="list-decimal list-inside space-y-1 text-sm font-bold text-foreground">
                  {result.winners.map((w, i) => (
                    <li key={i}>{w}</li>
                  ))}
                </ol>
              </div>

              {result.subs.length > 0 && (
                <div className="p-4 rounded-lg bg-muted/30 border border-border">
                  <span className="text-xs font-semibold text-muted-foreground block mb-2">Yedek Talihliler</span>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-foreground">
                    {result.subs.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
