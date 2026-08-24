'use client';

import { useState } from 'react';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function YakitTasarrufHesaplama() {
  const [annualKmStr, setAnnualKmStr] = useState<string>('15.000');
  const [fuelPriceStr, setFuelPriceStr] = useState<string>('45'); // TL/Litre
  
  // Araç 1 (Mevcut)
  const [car1ConsumptionStr, setCar1ConsumptionStr] = useState<string>('8.2'); // L/100km
  
  // Araç 2 (Yeni / Alternatif)
  const [car2ConsumptionStr, setCar2ConsumptionStr] = useState<string>('5.1'); // L/100km

  const [result, setResult] = useState<{
    car1AnnualLiters: number;
    car1AnnualCost: number;
    car2AnnualLiters: number;
    car2AnnualCost: number;
    annualSavingsCost: number;
    annualSavingsLiters: number;
    monthlySavings: number;
    savingsPercent: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const km = parseTurkishNumber(annualKmStr);
    const price = parseTurkishNumber(fuelPriceStr);
    const c1 = parseTurkishNumber(car1ConsumptionStr);
    const c2 = parseTurkishNumber(car2ConsumptionStr);

    if (isNaN(km) || km <= 0) {
      setError('Lütfen geçerli bir yıllık kilometre giriniz.');
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError('Lütfen geçerli bir yakıt litre fiyatı giriniz.');
      return;
    }

    if (isNaN(c1) || c1 <= 0 || isNaN(c2) || c2 <= 0) {
      setError('Lütfen araç yakıt tüketim değerlerini giriniz.');
      return;
    }

    const car1AnnualLiters = (km / 100) * c1;
    const car1AnnualCost = car1AnnualLiters * price;

    const car2AnnualLiters = (km / 100) * c2;
    const car2AnnualCost = car2AnnualLiters * price;

    const annualSavingsCost = car1AnnualCost - car2AnnualCost;
    const annualSavingsLiters = car1AnnualLiters - car2AnnualLiters;
    const monthlySavings = annualSavingsCost / 12;
    const savingsPercent = (annualSavingsCost / car1AnnualCost) * 100;

    setResult({
      car1AnnualLiters,
      car1AnnualCost,
      car2AnnualLiters,
      car2AnnualCost,
      annualSavingsCost,
      annualSavingsLiters,
      monthlySavings,
      savingsPercent,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <form onSubmit={handleCalculate} noValidate className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="km" className="block text-xs font-medium text-foreground mb-1.5">
                Yıllık Yapılan Kilometre (km)
              </label>
              <input
                type="text"
                inputMode="numeric"
                id="km"
                placeholder="Örn: 15.000"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                value={annualKmStr}
                onChange={(e) => setAnnualKmStr(sanitizeNumericInput(e.target.value))}
              />
            </div>

            <div>
              <label htmlFor="fuelPrice" className="block text-xs font-medium text-foreground mb-1.5">
                Yakıt Litre / Birim Fiyatı (TL)
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="fuelPrice"
                placeholder="Örn: 45"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                value={fuelPriceStr}
                onChange={(e) => setFuelPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
              />
            </div>

            <div>
              <label htmlFor="c1" className="block text-xs font-medium text-foreground mb-1.5">
                1. Araç (Mevcut) Tüketim (Litre / 100 km)
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="c1"
                placeholder="Örn: 8.2"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                value={car1ConsumptionStr}
                onChange={(e) => setCar1ConsumptionStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
              />
            </div>

            <div>
              <label htmlFor="c2" className="block text-xs font-medium text-foreground mb-1.5">
                2. Araç (Yeni/Alternatif) Tüketim (Litre / 100 km)
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="c2"
                placeholder="Örn: 5.1"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                value={car2ConsumptionStr}
                onChange={(e) => setCar2ConsumptionStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground text-sm font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all"
          >
            Yıllık ve Aylık Yakıt Tasarrufunu Karşılaştır
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 bg-muted/20 rounded-xl border border-border text-center">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                Yıllık Yakıt Tasarrufu
              </span>
              <span className="font-extrabold text-4xl sm:text-5xl text-emerald-600 tracking-tight">
                {formatCurrency(result.annualSavingsCost)}
              </span>
              <span className="text-xs text-muted-foreground block mt-2">
                Aylık ortalama ~{formatCurrency(result.monthlySavings)} tasarruf (%{formatNumber(result.savingsPercent, 1)} daha az yakıt masrafı)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-background rounded-lg border border-border">
                <span className="text-xs font-semibold text-foreground block mb-1">1. Araç (Mevcut) Yıllık Masraf</span>
                <div className="text-lg font-bold text-foreground">{formatCurrency(result.car1AnnualCost)}</div>
                <div className="text-xs text-muted-foreground">{formatNumber(result.car1AnnualLiters, 1)} Litre yakıt</div>
              </div>

              <div className="p-3.5 bg-background rounded-lg border border-border">
                <span className="text-xs font-semibold text-foreground block mb-1">2. Araç (Alternatif) Yıllık Masraf</span>
                <div className="text-lg font-bold text-emerald-600">{formatCurrency(result.car2AnnualCost)}</div>
                <div className="text-xs text-muted-foreground">{formatNumber(result.car2AnnualLiters, 1)} Litre yakıt</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Yakıt Tasarrufu Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Araç değiştirirken veya hibrit/elektrikli araca geçerken yapılacak tasarruf, yıllık katedilen kilometreye göre tüketilen litre farkının güncel yakıt fiyatıyla çarpılmasıyla bulunur.
        </p>
      </div>
    </div>
  );
}
