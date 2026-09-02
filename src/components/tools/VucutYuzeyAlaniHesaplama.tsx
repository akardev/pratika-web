'use client';

import { useState } from 'react';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function VucutYuzeyAlaniHesaplama() {
  const [heightStr, setHeightStr] = useState<string>('175');
  const [weightStr, setWeightStr] = useState<string>('70');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    bsaMosteller: number;
    bsaDuBois: number;
    bsaHaycock: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const h = parseTurkishNumber(heightStr);
    const w = parseTurkishNumber(weightStr);

    if (isNaN(h) || isNaN(w) || h <= 40 || w <= 5) {
      setError('Lütfen boy ve kilo değerlerini geçerli sayılar olarak girin.');
      return;
    }

    // Mosteller Formülü: BSA (m²) = sqrt((Boy(cm) * Kilo(kg)) / 3600)
    const mosteller = Math.sqrt((h * w) / 3600);

    // DuBois & DuBois: 0.007184 * Boy^0.725 * Kilo^0.425
    const dubois = 0.007184 * Math.pow(h, 0.725) * Math.pow(w, 0.425);

    // Haycock: 0.024265 * Boy^0.3964 * Kilo^0.5378
    const haycock = 0.024265 * Math.pow(h, 0.3964) * Math.pow(w, 0.5378);

    setResult({
      bsaMosteller: Math.round(mosteller * 100) / 100,
      bsaDuBois: Math.round(dubois * 100) / 100,
      bsaHaycock: Math.round(haycock * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="h" className="block text-sm font-medium text-foreground mb-1">Boy Uzunluğu (cm)</label>
              <input
                id="h"
                type="text"
                value={heightStr}
                onChange={(e) => setHeightStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="w" className="block text-sm font-medium text-foreground mb-1">Vücut Ağırlığı (kg)</label>
              <input
                id="w"
                type="text"
                value={weightStr}
                onChange={(e) => setWeightStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Vücut Yüzey Alanını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Medikal BSA Değerleri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Mosteller Metodu (Klinik Standart)</span>
                <span className="text-3xl font-bold text-primary">{result.bsaMosteller} m²</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">DuBois Formülü</span>
                <span className="text-2xl font-bold text-foreground">{result.bsaDuBois} m²</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Haycock Formülü</span>
                <span className="text-2xl font-bold text-foreground">{result.bsaHaycock} m²</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">BSA (Body Surface Area) Kullanım Alanları:</p>
        <p>Vücut Yüzey Alanı, onkolojide kemoterapi ilaç dozajlarının, hemodiyaliz klirensinin ve kardiyak indeks hesaplamalarının belirlenmesinde vücut ağırlığından daha hassas bir parametre olarak kullanılır.</p>
      </div>
    </div>
  );
}
