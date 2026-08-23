'use client';

import React, { useState } from 'react';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function YakitMaliyetiHesaplama() {
  const [distanceStr, setDistanceStr] = useState<string>('450');
  const [consumptionStr, setConsumptionStr] = useState<string>('6.5');
  const [priceStr, setPriceStr] = useState<string>('45');

  const [result, setResult] = useState<{
    totalFuel: number;
    totalCost: number;
    costPerKm: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!distanceStr.trim() || !consumptionStr.trim() || !priceStr.trim()) {
      setError('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    const distance = parseTurkishNumber(distanceStr);
    const consumption = parseTurkishNumber(consumptionStr);
    const price = parseTurkishNumber(priceStr);

    if (isNaN(distance) || distance <= 0) {
      setError('Gidilecek mesafe 0\'dan büyük pozitif bir sayı olmalıdır.');
      return;
    }

    if (isNaN(consumption) || consumption <= 0) {
      setError('Yakıt tüketimi 0\'dan büyük pozitif bir sayı olmalıdır.');
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError('Yakıt litre fiyatı 0\'dan büyük pozitif bir sayı olmalıdır.');
      return;
    }

    const totalFuel = (distance * consumption) / 100;
    const totalCost = totalFuel * price;
    const costPerKm = totalCost / distance;

    setResult({ totalFuel, totalCost, costPerKm });
  };

  const handleReset = () => {
    setDistanceStr('');
    setConsumptionStr('');
    setPriceStr('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Kolonu */}
          <form onSubmit={handleCalculate} noValidate className="lg:col-span-7 space-y-4">
            {/* Gidilecek Mesafe */}
            <div>
              <label htmlFor="distance-input" className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">
                Gidilecek Mesafe (km) <span className="text-destructive font-bold">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="decimal"
                  id="distance-input"
                  placeholder="Örn: 450"
                  value={distanceStr}
                  onChange={(e) => setDistanceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  className="w-full h-11 sm:h-12 rounded-xl border border-border bg-background px-4 pr-14 text-sm sm:text-base font-mono font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <span className="absolute right-4 pointer-events-none select-none text-xs sm:text-sm font-semibold text-muted-foreground">
                  km
                </span>
              </div>
            </div>

            {/* Tüketim ve Fiyat Kolonları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="consumption-input" className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">
                  Yakıt Tüketimi (L/100 km) <span className="text-destructive font-bold">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="consumption-input"
                    placeholder="Örn: 6.5"
                    value={consumptionStr}
                    onChange={(e) => setConsumptionStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                    className="w-full h-11 sm:h-12 rounded-xl border border-border bg-background px-4 pr-24 text-sm sm:text-base font-mono font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <span className="absolute right-4 pointer-events-none select-none text-xs sm:text-sm font-semibold text-muted-foreground">
                    L/100 km
                  </span>
                </div>
              </div>

              <div>
                <label htmlFor="price-input" className="block text-xs sm:text-sm font-semibold text-foreground mb-1.5">
                  Yakıt Litre Fiyatı (TL) <span className="text-destructive font-bold">*</span>
                </label>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="price-input"
                    placeholder="Örn: 45.00"
                    value={priceStr}
                    onChange={(e) => setPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                    className="w-full h-11 sm:h-12 rounded-xl border border-border bg-background px-4 pr-12 text-sm sm:text-base font-mono font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                  <span className="absolute right-4 pointer-events-none select-none text-xs sm:text-sm font-semibold text-muted-foreground">
                    TL
                  </span>
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-destructive/10 text-destructive text-xs sm:text-sm font-medium border border-destructive/20 flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 h-11 sm:h-12 px-6 bg-primary text-primary-foreground font-bold text-sm sm:text-base rounded-xl shadow-xs hover:bg-primary/90 active:scale-[0.99] transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Yakıt Maliyetini Hesapla
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="h-11 sm:h-12 px-4 rounded-xl bg-muted text-muted-foreground hover:text-foreground text-xs sm:text-sm font-semibold transition-colors"
              >
                Temizle
              </button>
            </div>
          </form>

          {/* Sonuç Alanı */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            {result ? (
              <div className="p-6 sm:p-7 bg-muted/20 rounded-2xl border border-border/80 shadow-2xs space-y-5">
                <div className="flex items-center justify-between border-b border-border/60 pb-3">
                  <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Hesaplama Sonucu
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md">
                    ✓ Güncel
                  </span>
                </div>

                <div className="text-center space-y-1">
                  <span className="text-xs font-medium text-muted-foreground block">
                    Toplam Yakıt Masrafı
                  </span>
                  <span className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight block">
                    {formatCurrency(result.totalCost)}
                  </span>
                  <div className="pt-2">
                    <span className="inline-block text-xs font-bold text-foreground bg-background px-3 py-1.5 rounded-lg border border-border/80 shadow-2xs">
                      Kilometre Başına: {formatCurrency(result.costPerKm)} / km
                    </span>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Gidilecek Mesafe:</span>
                    <span className="font-semibold text-foreground">{formatNumber(parseTurkishNumber(distanceStr))} km</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-t border-border/40">
                    <span className="text-muted-foreground">Tüketilecek Toplam Yakıt:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.totalFuel)} Litre</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-t border-border/40">
                    <span className="text-muted-foreground">Ortalama Tüketim:</span>
                    <span className="font-semibold text-foreground">{formatNumber(parseTurkishNumber(consumptionStr))} L / 100 km</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 bg-muted/10 p-6 text-center text-muted-foreground space-y-1">
                <p className="text-sm font-semibold text-foreground">Mesafe, tüketim ve yakıt fiyatını girin.</p>
                <p className="text-xs text-muted-foreground">Sonuçlar ve kilometre başı maliyet dökümü burada gösterilecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
