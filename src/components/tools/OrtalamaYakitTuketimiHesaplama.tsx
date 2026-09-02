'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function OrtalamaYakitTuketimiHesaplama() {
  const [distanceStr, setDistanceStr] = useState<string>('550');
  const [litersStr, setLitersStr] = useState<string>('33');
  const [fuelPriceStr, setFuelPriceStr] = useState<string>('44.50');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    consumptionPer100Km: number;
    costPerKm: number;
    totalCost: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const dist = parseTurkishNumber(distanceStr);
    const lit = parseTurkishNumber(litersStr);
    const price = parseTurkishNumber(fuelPriceStr) || 0;

    if (isNaN(dist) || dist <= 0 || isNaN(lit) || lit <= 0) {
      setError('Lütfen kat edilen mesafeyi ve yakıt miktarını geçerli pozitif sayılar olarak girin.');
      return;
    }

    const consumptionPer100 = (lit / dist) * 100;
    const totalCost = lit * price;
    const costPerKm = totalCost / dist;

    setResult({
      consumptionPer100Km: Math.round(consumptionPer100 * 100) / 100,
      costPerKm: Math.round(costPerKm * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="distance" className="block text-sm font-medium text-foreground mb-1">
                Kat Edilen Mesafe (km)
              </label>
              <input
                id="distance"
                type="text"
                value={distanceStr}
                onChange={(e) => setDistanceStr(sanitizeNumericInput(e.target.value))}
                placeholder="Örn: 550"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="liters" className="block text-sm font-medium text-foreground mb-1">
                Harcanan Yakıt (Litre)
              </label>
              <input
                id="liters"
                type="text"
                value={litersStr}
                onChange={(e) => setLitersStr(sanitizeNumericInput(e.target.value))}
                placeholder="Örn: 33"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-foreground mb-1">
                Litre Fiyatı (TL - İsteğe Bağlı)
              </label>
              <input
                id="price"
                type="text"
                value={fuelPriceStr}
                onChange={(e) => setFuelPriceStr(sanitizeNumericInput(e.target.value))}
                placeholder="Örn: 44.50"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Tüketimi Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ortalama Sarfiyat</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">100 Km Başına Yakıt</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.consumptionPer100Km)} L</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Kilometre Başına Maliyet</span>
                <span className="text-xl font-semibold text-foreground">{formatNumber(result.costPerKm)} ₺/km</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Yakıt Tutarı</span>
                <span className="text-xl font-semibold text-foreground">{formatNumber(result.totalCost)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Depo Doldurma (Full-to-Full) Yöntemi:</p>
        <p>Aracınızın gerçek tüketimini bulmak için depoyu tam doldurun ve kilometreyi sıfırlayın. Bir süre sonra depoyu yeniden tam doldurduğunuzda pompada çıkan litre miktarını ve yaptığınız kilometreyi buraya girin.</p>
      </div>
    </div>
  );
}
