'use client';

import { useState } from 'react';
import { formatNumber } from '@/lib/utils';

export default function AracNoterDevirUcretiHesaplama() {
  const [vehicleType, setVehicleType] = useState<'car' | 'moto'>('car');
  const [changePlate, setChangePlate] = useState(false);

  // 2026 Noterler Birliği maktu tarifesi
  const baseNotaryFee = vehicleType === 'car' ? 1489.36 : 1489.36;
  const plateFee = changePlate ? 640.00 : 0;
  const total = baseNotaryFee + plateFee;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="vt" className="block text-sm font-medium text-foreground mb-1">Araç Türü</label>
            <select
              id="vt"
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value as 'car' | 'moto')}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value="car">Otomobil / Kamyonet / Minibüs</option>
              <option value="moto">Motosiklet</option>
            </select>
          </div>
          <div className="flex items-center pt-6">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={changePlate}
                onChange={(e) => setChangePlate(e.target.checked)}
                className="rounded border-border"
              />
              Plaka Değişikliği Yapılacak (+ Plaka Basım Masrafı)
            </label>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Noter Masraf Kalemleri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-xs text-muted-foreground block mb-1">Noterde Ödenecek Toplam Tutar</span>
              <span className="text-2xl font-bold text-primary">{formatNumber(total)} ₺</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Noter Satış & Tescil Harcı</span>
              <span className="text-xl font-bold text-foreground">{formatNumber(baseNotaryFee)} ₺</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Plaka Değişim & Basım Masrafı</span>
              <span className="text-xl font-bold text-foreground">{formatNumber(plateFee)} ₺</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
