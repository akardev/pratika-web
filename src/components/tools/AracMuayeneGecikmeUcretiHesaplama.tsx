'use client';

import { useState } from 'react';
import { formatNumber } from '@/lib/utils';

export default function AracMuayeneGecikmeUcretiHesaplama() {
  const [vehicleType, setVehicleType] = useState<'car' | 'bus' | 'moto'>('car');
  const [delayMonths, setDelayMonths] = useState(3);

  // 2026 TÜVTÜRK periyodik muayene ücret tarifesi
  const getBaseFee = () => {
    switch (vehicleType) {
      case 'bus': return 3500; // Otobüs / Kamyon
      case 'moto': return 1300; // Motosiklet / Traktör
      default: return 2620; // Otomobil / Kamyonet
    }
  };

  const baseFee = getBaseFee();
  // 2918 sayılı Kanun: Her ay için %5 gecikme cezası
  const penaltyRate = delayMonths * 0.05;
  const penaltyAmount = baseFee * penaltyRate;
  const total = baseFee + penaltyAmount;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="vt" className="block text-sm font-medium text-foreground mb-1">Araç Cinsi</label>
            <select
              id="vt"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value as 'car' | 'moto' | 'bus')}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value="car">Otomobil, Minibüs, Kamyonet</option>
              <option value="bus">Otobüs, Kamyon, Çekici</option>
              <option value="moto">Motosiklet, Traktör</option>
            </select>
          </div>
          <div>
            <label htmlFor="dm" className="block text-sm font-medium text-foreground mb-1">Gecikilen Süre (Ay)</label>
            <input
              id="dm"
              type="number"
              min="0"
              max="120"
              value={delayMonths}
              onChange={(e) => setDelayMonths(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
            <span className="text-xs text-muted-foreground mt-1 block">
              Gecikilen her ay için yasal %5 gecikme cezası eklenir.
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">TÜVTÜRK Ödeme Özeti</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-xs text-muted-foreground block mb-1">İstasyonda Ödenecek Toplam</span>
              <span className="text-2xl font-bold text-primary">{formatNumber(total)} ₺</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Normal Muayene Ücreti</span>
              <span className="text-xl font-bold text-foreground">{formatNumber(baseFee)} ₺</span>
            </div>
            <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
              <span className="text-xs text-muted-foreground block mb-1">Gecikme Cezası Tutarı (%{delayMonths * 5})</span>
              <span className="text-xl font-bold text-destructive">{formatNumber(penaltyAmount)} ₺</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
