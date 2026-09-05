'use client';

import { useState } from 'react';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function AkvaryumHacimHesaplama() {
  const [lengthStr, setLengthStr] = useState('100'); // Uzunluk cm
  const [widthStr, setWidthStr] = useState('40'); // Genişlik cm
  const [heightStr, setHeightStr] = useState('50'); // Yükseklik cm
  
  const [result, setResult] = useState<{
    grossLiters: number;
    netLiters: number;
    waterWeightKg: number;
    heaterWatt: number;
    maxSmallFish: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const l = parseTurkishNumber(lengthStr);
    const w = parseTurkishNumber(widthStr);
    const h = parseTurkishNumber(heightStr);

    if (isNaN(l) || isNaN(w) || isNaN(h) || l <= 0 || w <= 0 || h <= 0) return;

    // Brüt Hacim (Litre) = (En * Boy * Yükseklik) / 1000
    const grossLiters = (l * w * h) / 1000;
    // Kum ve dekor payı düşümü (~%15)
    const netLiters = grossLiters * 0.85;
    const waterWeightKg = netLiters;
    // Isıtıcı kuralı: 1 litre suya yaklaşık 1 Watt
    const heaterWatt = Math.ceil(netLiters / 50) * 50;
    // Küçük tatlı su balığı kuralı: 3-4 litreye 1 küçük balık (ör. tetra/lepistes)
    const maxSmallFish = Math.floor(netLiters / 3.5);

    setResult({
      grossLiters: Math.round(grossLiters),
      netLiters: Math.round(netLiters),
      waterWeightKg: Math.round(waterWeightKg),
      heaterWatt,
      maxSmallFish,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="len" className="block text-sm font-medium text-foreground mb-1">Uzunluk (cm)</label>
              <input
                id="len"
                type="text"
                value={lengthStr}
                onChange={(e) => setLengthStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="wid" className="block text-sm font-medium text-foreground mb-1">Genişlik (Derinlik - cm)</label>
              <input
                id="wid"
                type="text"
                value={widthStr}
                onChange={(e) => setWidthStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="hei" className="block text-sm font-medium text-foreground mb-1">Yükseklik (cm)</label>
              <input
                id="hei"
                type="text"
                value={heightStr}
                onChange={(e) => setHeightStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Akvaryum Hacmini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Akvaryum Parametreleri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <span className="text-xs text-muted-foreground block mb-1">Net Su Hacmi</span>
                <span className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">{result.netLiters} Litre</span>
                <span className="text-xs text-muted-foreground block mt-1">Brüt: {result.grossLiters} L</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Tahmini Su Ağırlığı</span>
                <span className="text-xl font-bold text-foreground">~{result.waterWeightKg} kg</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Tavsiye Isıtıcı Gücü</span>
                <span className="text-xl font-bold text-foreground">{result.heaterWatt} Watt</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Maksimum Küçük Balık</span>
                <span className="text-xl font-bold text-foreground">~{result.maxSmallFish} Adet</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
