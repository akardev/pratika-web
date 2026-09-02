'use client';

import { useState } from 'react';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function LogaritmaHesaplama() {
  const [valStr, setValStr] = useState<string>('100');
  const [baseStr, setBaseStr] = useState<string>('10');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    logCustom: number;
    logNatural: number; // ln
    log10: number;
    log2: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const x = parseTurkishNumber(valStr);
    const b = parseTurkishNumber(baseStr);

    if (isNaN(x) || x <= 0) {
      setError('Logaritması alınacak sayı sıfırdan büyük (pozitif) olmalıdır.');
      return;
    }

    if (isNaN(b) || b <= 0 || b === 1) {
      setError("Logaritma tabanı pozitif ve 1&apos;den farklı olmalıdır.");
      return;
    }

    const logCustom = Math.log(x) / Math.log(b);
    const logNatural = Math.log(x);
    const log10 = Math.log10(x);
    const log2 = Math.log2(x);

    setResult({
      logCustom: Math.round(logCustom * 10000) / 10000,
      logNatural: Math.round(logNatural * 10000) / 10000,
      log10: Math.round(log10 * 10000) / 10000,
      log2: Math.round(log2 * 10000) / 10000,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="vx" className="block text-sm font-medium text-foreground mb-1">Sayı (x)</label>
              <input
                id="vx"
                type="text"
                value={valStr}
                onChange={(e) => setValStr(sanitizeNumericInput(e.target.value))}
                placeholder="Örn: 100"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="vb" className="block text-sm font-medium text-foreground mb-1">Taban (b)</label>
              <input
                id="vb"
                type="text"
                value={baseStr}
                onChange={(e) => setBaseStr(sanitizeNumericInput(e.target.value))}
                placeholder="Örn: 10"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Logaritmayı Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Logaritma Sonuçları</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">log_{baseStr}({valStr})</span>
                <span className="text-2xl font-bold text-primary">{result.logCustom}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Doğal Log (ln)</span>
                <span className="text-xl font-bold text-foreground">{result.logNatural}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">10 Tabanında (log10)</span>
                <span className="text-xl font-bold text-foreground">{result.log10}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">2 Tabanında (log2)</span>
                <span className="text-xl font-bold text-foreground">{result.log2}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
