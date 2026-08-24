'use client';

import { useState } from 'react';
import Link from 'next/link';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function YuvarlamaAraci() {
  const [inputValStr, setInputValStr] = useState<string>('148.673');

  const [result, setResult] = useState<{
    original: number;
    nearestInteger: number; // Math.round
    floorInteger: number; // Math.floor
    ceilInteger: number; // Math.ceil
    oneDecimal: number;
    twoDecimals: number;
    nearest5: number;
    nearest10: number;
    nearest100: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const val = parseTurkishNumber(inputValStr);
    if (isNaN(val)) {
      setError('Lütfen geçerli bir sayı giriniz.');
      return;
    }

    const nearestInteger = Math.round(val);
    const floorInteger = Math.floor(val);
    const ceilInteger = Math.ceil(val);
    const oneDecimal = Math.round(val * 10) / 10;
    const twoDecimals = Math.round(val * 100) / 100;
    const nearest5 = Math.round(val / 5) * 5;
    const nearest10 = Math.round(val / 10) * 10;
    const nearest100 = Math.round(val / 100) * 100;

    setResult({
      original: val,
      nearestInteger,
      floorInteger,
      ceilInteger,
      oneDecimal,
      twoDecimals,
      nearest5,
      nearest10,
      nearest100,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="numInput" className="block text-sm font-medium mb-1 text-foreground">
                Yuvarlanacak Sayı <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="numInput"
                placeholder="Örn: 148.673"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                value={inputValStr}
                onChange={(e) => setInputValStr(sanitizeNumericInput(e.target.value, { allowDecimal: true, allowNegative: true }))}
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
              Tüm Yöntemlerle Yuvarla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Yuvarlama Sonuçları
                </h3>

                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                  <div className="p-2.5 bg-background rounded-lg border border-border/60">
                    <span className="text-[11px] text-muted-foreground block">En Yakın Tam</span>
                    <span className="font-extrabold text-xl text-primary">{result.nearestInteger}</span>
                  </div>
                  <div className="p-2.5 bg-background rounded-lg border border-border/60">
                    <span className="text-[11px] text-muted-foreground block">Aşağı (Floor)</span>
                    <span className="font-extrabold text-xl text-foreground">{result.floorInteger}</span>
                  </div>
                  <div className="p-2.5 bg-background rounded-lg border border-border/60">
                    <span className="text-[11px] text-muted-foreground block">Yukarı (Ceil)</span>
                    <span className="font-extrabold text-xl text-foreground">{result.ceilInteger}</span>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">1 Basamak (Onda Bir):</span>
                    <span className="font-semibold text-foreground font-mono">{result.oneDecimal}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">2 Basamak (Yüzde Bir):</span>
                    <span className="font-semibold text-foreground font-mono">{result.twoDecimals}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">En Yakın 10 Katı:</span>
                    <span className="font-semibold text-foreground font-mono">{result.nearest10}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">En Yakın 100 Katı:</span>
                    <span className="font-semibold text-foreground font-mono">{result.nearest100}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/ortalama-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Ortalama hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Bir sayı girerek tüm matematiksel yuvarlama sonuçlarını tek seferde görün.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Matematiksel Yuvarlama Kuralları</h2>
        <p className="mb-4 text-muted-foreground">
          Standart yuvarlamada (Round) ondalık kısım 0.5 ve üzerinde ise yukarıdaki tam sayıya, 0.5&apos;ten küçükse aşağıdaki tam sayıya yuvarlanır. Floor her zaman taban tam sayıya, Ceil ise her zaman tavan tam sayıya yuvarlar.
        </p>
      </div>
    </div>
  );
}
