'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function UsHesaplama() {
  const [baseStr, setBaseStr] = useState<string>('2');
  const [expStr, setExpStr] = useState<string>('8');
  const [powerResult, setPowerResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPowerResult(null);

    if (!baseStr.trim() || !expStr.trim()) {
      setError('Taban ve üs alanlarını doldurun.');
      return;
    }

    const base = parseTurkishNumber(baseStr);
    const exp = parseTurkishNumber(expStr);

    if (isNaN(base) || isNaN(exp)) {
      setError('Geçerli sayılar girin.');
      return;
    }

    if (base === 0 && exp < 0) {
      setError('0 üzeri negatif üs tanımsızdır (0\'a bölünemez).');
      return;
    }

    const res = Math.pow(base, exp);
    if (!isFinite(res)) {
      setError('Hesaplama sonucu sayısal sınırları aşıyor (sonsuz).');
      return;
    }

    setPowerResult(res);
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="base" className="block text-sm font-medium mb-2 text-foreground">
                Taban Sayı (x) <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="base"
                placeholder="Örn: 2"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                value={baseStr}
                onChange={(e) => setBaseStr(sanitizeNumericInput(e.target.value, { allowDecimal: true, allowNegative: true }))}
              />
            </div>

            <div>
              <label htmlFor="exp" className="block text-sm font-medium mb-2 text-foreground">
                Üs / Kuvvet (y) <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="exp"
                placeholder="Örn: 8"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                value={expStr}
                onChange={(e) => setExpStr(sanitizeNumericInput(e.target.value, { allowDecimal: true, allowNegative: true }))}
              />
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Üslü Sayıyı Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {powerResult !== null ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{baseStr}<sup>{expStr}</sup> İşleminin Sonucu</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatNumber(powerResult)}
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Taban ve üs değerini girip hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
