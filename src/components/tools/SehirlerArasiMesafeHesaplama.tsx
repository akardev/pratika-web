'use client';

import { useState } from 'react';
import { formatNumber } from '@/lib/utils';

export default function SehirlerArasiMesafeHesaplama() {
  const [fromCity, setFromCity] = useState('İstanbul');
  const [toCity, setToCity] = useState('Ankara');
  const [fuelPer100, setFuelPer100] = useState(7);
  const [fuelLiterPrice, setFuelLiterPrice] = useState(45);

  // Bazı büyük iller arası standart resmi karayolu mesafeleri (KGM)
  const distances: Record<string, Record<string, number>> = {
    'İstanbul': { 'Ankara': 450, 'İzmir': 480, 'Bursa': 155, 'Antalya': 700, 'Adana': 930 },
    'Ankara': { 'İstanbul': 450, 'İzmir': 585, 'Bursa': 385, 'Antalya': 480, 'Adana': 490 },
    'İzmir': { 'İstanbul': 480, 'Ankara': 585, 'Bursa': 345, 'Antalya': 460, 'Adana': 900 },
    'Bursa': { 'İstanbul': 155, 'Ankara': 385, 'İzmir': 345, 'Antalya': 540, 'Adana': 830 },
    'Antalya': { 'İstanbul': 700, 'Ankara': 480, 'İzmir': 460, 'Bursa': 540, 'Adana': 550 },
    'Adana': { 'İstanbul': 930, 'Ankara': 490, 'İzmir': 900, 'Bursa': 830, 'Antalya': 550 },
  };

  const cities = ['İstanbul', 'Ankara', 'İzmir', 'Bursa', 'Antalya', 'Adana'];
  const km = distances[fromCity]?.[toCity] || (fromCity === toCity ? 0 : 500);
  const hours = km > 0 ? (km / 90).toFixed(1) : '0'; // 90 km/s ortalama hız
  const totalLiters = (km / 100) * fuelPer100;
  const fuelCost = totalLiters * fuelLiterPrice;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label htmlFor="fc" className="block text-sm font-medium text-foreground mb-1">Kalkış İli</label>
            <select
              id="fc"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="tc" className="block text-sm font-medium text-foreground mb-1">Varış İli</label>
            <select
              id="tc"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="fp" className="block text-sm font-medium text-foreground mb-1">100 km Yakıt Tüketimi (L)</label>
            <input
              id="fp"
              type="number"
              value={fuelPer100}
              onChange={(e) => setFuelPer100(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label htmlFor="lp" className="block text-sm font-medium text-foreground mb-1">Yakıt Litre Fiyatı (TL)</label>
            <input
              id="lp"
              type="number"
              value={fuelLiterPrice}
              onChange={(e) => setFuelLiterPrice(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Seyahat ve Masraf Özeti</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-xs text-muted-foreground block mb-1">Karayolu Mesafesi</span>
              <span className="text-2xl font-bold text-primary">{km} km</span>
              <span className="text-xs text-muted-foreground block mt-1">Tahmini Sürüş: ~{hours} Saat</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Tahmini Yakıt Maliyeti</span>
              <span className="text-xl font-bold text-foreground">{formatNumber(Math.round(fuelCost))} ₺</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Tüketilecek Yakıt</span>
              <span className="text-xl font-bold text-foreground">{Math.round(totalLiters * 10) / 10} Litre</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
