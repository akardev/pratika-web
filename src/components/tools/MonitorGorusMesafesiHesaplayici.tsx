'use client';

import { useState } from 'react';

export default function MonitorGorusMesafesiHesaplayici() {
  const [screenSizeInches, setScreenSizeInches] = useState<number>(27);
  const [resolution, setResolution] = useState<'1080p' | '1440p' | '4k'>('1440p');

  const [result, setResult] = useState<{
    minDistanceCm: number;
    maxDistanceCm: number;
    recommendedDistanceCm: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // Çözünürlük ve boyut katsayıları (SMPTE & THX Görüş Açısı Standartları)
    // 1 inç = 2.54 cm
    let multiplier = 1.3;
    if (resolution === '1080p') multiplier = 1.5;
    else if (resolution === '1440p') multiplier = 1.25;
    else multiplier = 1.0;

    const baseCm = screenSizeInches * 2.54 * multiplier;
    const minCm = Math.round(baseCm * 0.85);
    const maxCm = Math.round(baseCm * 1.35);
    const recCm = Math.round(baseCm);

    setResult({
      minDistanceCm: minCm,
      maxDistanceCm: maxCm,
      recommendedDistanceCm: recCm,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ssi" className="block text-sm font-medium text-foreground mb-1">Ekran Boyutu (İnç)</label>
              <input
                id="ssi"
                type="number"
                value={screenSizeInches}
                onChange={(e) => setScreenSizeInches(Number(e.target.value))}
                min="13" max="85"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="res" className="block text-sm font-medium text-foreground mb-1">Çözünürlük</label>
              <select
                id="res"
                value={resolution}
                onChange={(e) => setResolution(e.target.value as '1080p' | '1440p' | '4k')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="1080p">Full HD (1920 × 1080)</option>
                <option value="1440p">2K / QHD (2560 × 1440)</option>
                <option value="4k">4K Ultra HD (3840 × 2160)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            İdeal Mesafeyi Bul
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ergonomik Oturma Mesafesi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Önerilen İdeal Mesafe</span>
                <span className="text-3xl font-bold text-primary">{result.recommendedDistanceCm} cm</span>
                <span className="text-xs text-muted-foreground block mt-1">(~{(result.recommendedDistanceCm / 100).toFixed(2)} Metre)</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Asgari Mesafe (Göz Yorgunluğu Sınırı)</span>
                <span className="text-2xl font-bold text-foreground">{result.minDistanceCm} cm</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Azami Mesafe (Detay Kaybı Sınırı)</span>
                <span className="text-2xl font-bold text-foreground">{result.maxDistanceCm} cm</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
