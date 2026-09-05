'use client';

import { useState } from 'react';

export default function KahveDemlemeOraniHesaplama() {
  const [method, setMethod] = useState<'v60' | 'french' | 'aeropress' | 'moka' | 'espresso'>('v60');
  const [coffeeGrams, setCoffeeGrams] = useState(15);

  const getRatio = () => {
    switch (method) {
      case 'french': return { ratio: 15, name: 'French Press', grind: 'Kalın Öğütüm', time: '4:00 dk' };
      case 'aeropress': return { ratio: 12, name: 'Aeropress', grind: 'Orta-İnce', time: '1:30 dk' };
      case 'moka': return { ratio: 10, name: 'Moka Pot', grind: 'İnce Öğütüm', time: '3:00 dk' };
      case 'espresso': return { ratio: 2, name: 'Espresso (1:2)', grind: 'Çok İnce', time: '25-30 sn' };
      default: return { ratio: 16, name: 'V60 / Pour Over', grind: 'Orta Öğütüm', time: '2:30 - 3:00 dk' };
    }
  };

  const info = getRatio();
  const waterMl = coffeeGrams * info.ratio;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="mth" className="block text-sm font-medium text-foreground mb-1">Demleme Yöntemi</label>
            <select
              id="mth"
              value={method}
              onChange={(e) => setMethod(e.target.value as 'v60' | 'chemex' | 'french' | 'aeropress' | 'filter')}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value="v60">V60 / Filtre Kahve (1:16 Oran)</option>
              <option value="french">French Press (1:15 Oran)</option>
              <option value="aeropress">Aeropress (1:12 Oran)</option>
              <option value="moka">Moka Pot (1:10 Oran)</option>
              <option value="espresso">Espresso (1:2 Oran)</option>
            </select>
          </div>
          <div>
            <label htmlFor="cg" className="block text-sm font-medium text-foreground mb-1">Kahve Miktarı (Gram)</label>
            <input
              id="cg"
              type="number"
              min="5"
              max="100"
              value={coffeeGrams}
              onChange={(e) => setCoffeeGrams(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Barista Demleme Reçetesi</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-xs text-muted-foreground block mb-1">Gereken Sıcak Su (92-94°C)</span>
              <span className="text-2xl font-bold text-primary">{waterMl} ml</span>
              <span className="text-xs text-muted-foreground block mt-1">Oran: 1:{info.ratio}</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Tavsiye Öğütüm Derecesi</span>
              <span className="text-xl font-bold text-foreground">{info.grind}</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">İdeal Demleme Süresi</span>
              <span className="text-xl font-bold text-foreground">{info.time}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
