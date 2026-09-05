'use client';

import { useState } from 'react';

export default function GunesDogusBatisHesaplama() {
  const [city, setCity] = useState('İstanbul');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // Türkiye illerine göre astronomik gün doğuş-batış yaklaşık verileri
  const cityCoords: Record<string, { lat: number; lng: number; rise: string; set: string; length: string }> = {
    'İstanbul': { lat: 41.0, lng: 28.9, rise: '06:45', set: '19:35', length: '12 saat 50 dk' },
    'Ankara': { lat: 39.9, lng: 32.8, rise: '06:32', set: '19:22', length: '12 saat 50 dk' },
    'İzmir': { lat: 38.4, lng: 27.1, rise: '06:55', set: '19:42', length: '12 saat 47 dk' },
    'Antalya': { lat: 36.9, lng: 30.7, rise: '06:41', set: '19:26', length: '12 saat 45 dk' },
    'Trabzon': { lat: 41.0, lng: 39.7, rise: '06:05', set: '18:55', length: '12 saat 50 dk' },
    'Diyarbakır': { lat: 37.9, lng: 40.2, rise: '06:02', set: '18:50', length: '12 saat 48 dk' },
  };

  const info = cityCoords[city] || cityCoords['İstanbul'];

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="ct" className="block text-sm font-medium text-foreground mb-1">Şehir Seçin</label>
            <select
              id="ct"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              {Object.keys(cityCoords).map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="dt" className="block text-sm font-medium text-foreground mb-1">Tarih</label>
            <input
              id="dt"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{city} İçin Güneş Saatleri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
              <span className="text-xs text-muted-foreground block mb-1">Güneşin Doğuşu (Sunrise)</span>
              <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{info.rise}</span>
            </div>
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-xs text-muted-foreground block mb-1">Güneşin Batışı (Sunset)</span>
              <span className="text-2xl font-bold text-primary">{info.set}</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Toplam Gün Işığı Süresi</span>
              <span className="text-xl font-bold text-foreground">{info.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
