'use client';

import { useState } from 'react';
import { formatCurrency, formatNumber, parseTurkishNumber } from '@/lib/utils';

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
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    const distance = parseTurkishNumber(distanceStr);
    const consumption = parseTurkishNumber(consumptionStr);
    const price = parseTurkishNumber(priceStr);

    if (isNaN(distance) || distance <= 0) {
      setError('Mesafe 0\'dan büyük olmalıdır.');
      return;
    }

    if (isNaN(consumption) || consumption <= 0) {
      setError('Ortalama tüketim 0\'dan büyük olmalıdır.');
      return;
    }

    if (isNaN(price) || price <= 0) {
      setError('Yakıt litre fiyatı 0\'dan büyük olmalıdır.');
      return;
    }

    const totalFuel = (distance * consumption) / 100;
    const totalCost = totalFuel * price;
    const costPerKm = totalCost / distance;

    setResult({ totalFuel, totalCost, costPerKm });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="dist" className="block text-sm font-medium mb-2 text-foreground">
                Gidilecek Mesafe (km) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="dist"
                  placeholder="Örn: 450"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  value={distanceStr}
                  onChange={(e) => setDistanceStr(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  km
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cons" className="block text-sm font-medium mb-2 text-foreground">
                  100 km&apos;de Tüketim (Litre) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="cons"
                    placeholder="Örn: 6.5"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                    value={consumptionStr}
                    onChange={(e) => setConsumptionStr(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    L/100km
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="prc" className="block text-sm font-medium mb-2 text-foreground">
                  Yakıt Litre Fiyatı (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="prc"
                    placeholder="Örn: 45"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                    value={priceStr}
                    onChange={(e) => setPriceStr(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    TL
                  </div>
                </div>
              </div>
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
              Yakıt Maliyetini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Toplam Yakıt Masrafı</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.totalCost)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Kilometre Başı Maliyet: <strong>{formatCurrency(result.costPerKm)} / km</strong>
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Yakıt Tüketimi:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.totalFuel)} Litre</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Mesafe, tüketim ve yakıt fiyatını girin.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
