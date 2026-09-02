'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function PerdeKumasHesaplama() {
  const [corniceWidthStr, setCorniceWidthStr] = useState<string>('300'); // cm
  const [heightStr, setHeightStr] = useState<string>('260'); // cm
  const [pleatRatio, setPleatRatio] = useState<number>(2.5); // 1:2.5 normal pile
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    metersNeeded: number;
    fabricWidthMeters: number;
    heightMeters: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const wCm = parseTurkishNumber(corniceWidthStr);
    const hCm = parseTurkishNumber(heightStr);

    if (isNaN(wCm) || isNaN(hCm) || wCm <= 0 || hCm <= 0) {
      setError('Lütfen korniş enini ve tavan boyunu santimetre (cm) cinsinden girin.');
      return;
    }

    const wM = wCm / 100;
    const hM = hCm / 100;
    // Kenar kıvırma payı: +20 cm (0.2 m)
    const neededWidth = (wM * pleatRatio) + 0.2;

    setResult({
      metersNeeded: Math.round(neededWidth * 100) / 100,
      fabricWidthMeters: Math.round(neededWidth * 100) / 100,
      heightMeters: hM,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="cw" className="block text-sm font-medium text-foreground mb-1">Korniş Genişliği (cm)</label>
              <input
                id="cw"
                type="text"
                value={corniceWidthStr}
                onChange={(e) => setCorniceWidthStr(sanitizeNumericInput(e.target.value))}
                placeholder="Örn: 300"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="ch" className="block text-sm font-medium text-foreground mb-1">Tavan Yüksekliği (cm)</label>
              <input
                id="ch"
                type="text"
                value={heightStr}
                onChange={(e) => setHeightStr(sanitizeNumericInput(e.target.value))}
                placeholder="Örn: 260"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="pr" className="block text-sm font-medium text-foreground mb-1">Pile Sıklığı</label>
              <select
                id="pr"
                value={pleatRatio}
                onChange={(e) => setPleatRatio(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value={2.0}>1&apos;e 2 (Seyrek Pile)</option>
                <option value={2.5}>1&apos;e 2.5 (Normal Standart Pile)</option>
                <option value={3.0}>1&apos;e 3 (Sık Lüks Pile)</option>
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Kumaş Metresini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Kumaş Sipariş Ölçüsü</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Alınması Gereken Tül/Kumaş Eni</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.metersNeeded)} Metre</span>
                <span className="text-xs text-muted-foreground block mt-1">(Kenar payları dahil)</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Bitmiş Perde Boyu</span>
                <span className="text-xl font-semibold text-foreground">{formatNumber(result.heightMeters)} Metre</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Pile Katsayıları Rehberi:</p>
        <p>1&apos;e 2 pile için korniş genişliğinin 2 katı, standart salon tülleri için 1&apos;e 2.5 katı, tok ve dökümlü görünüm için 1&apos;e 3 katı kumaş kesilir.</p>
      </div>
    </div>
  );
}
