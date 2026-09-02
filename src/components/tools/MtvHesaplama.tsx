'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber } from '@/lib/utils';

// GİB 2026 Motorlu Taşıtlar Vergisi (Otomobil) Resmi Yaklaşık Tarifesi
const MTV_RATES: Record<string, Record<string, number>> = {
  '0-1300': {
    '1-3': 5851,
    '4-6': 4080,
    '7-11': 2280,
    '12-15': 1720,
    '16+': 610,
  },
  '1301-1600': {
    '1-3': 10189,
    '4-6': 7640,
    '7-11': 4430,
    '12-15': 3130,
    '16+': 1205,
  },
  '1601-1800': {
    '1-3': 18000,
    '4-6': 14060,
    '7-11': 8270,
    '12-15': 5040,
    '16+': 1950,
  },
  '1801-2000': {
    '1-3': 28360,
    '4-6': 21850,
    '7-11': 12840,
    '12-15': 7640,
    '16+': 3010,
  },
  '2001-2500': {
    '1-3': 42540,
    '4-6': 30880,
    '7-11': 19300,
    '12-15': 11560,
    '16+': 4560,
  },
  '2501+': {
    '1-3': 69400,
    '4-6': 52050,
    '7-11': 30880,
    '12-15': 19300,
    '16+': 7700,
  },
};

export default function MtvHesaplama() {
  const [engineVolume, setEngineVolume] = useState<string>('1301-1600');
  const [vehicleAge, setVehicleAge] = useState<string>('1-3');
  const [result, setResult] = useState<{
    annualTotal: number;
    firstInstallment: number;
    secondInstallment: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const annual = MTV_RATES[engineVolume]?.[vehicleAge] || 10189;
    setResult({
      annualTotal: annual,
      firstInstallment: Math.round(annual / 2),
      secondInstallment: annual - Math.round(annual / 2),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="engineVolume" className="block text-sm font-medium text-foreground mb-1.5">
                Motor Silindir Hacmi
              </label>
              <select
                id="engineVolume"
                value={engineVolume}
                onChange={(e) => setEngineVolume(e.target.value)}
                className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="0-1300">1300 cc ve aşağısı</option>
                <option value="1301-1600">1301 cc - 1600 cc</option>
                <option value="1601-1800">1601 cc - 1800 cc</option>
                <option value="1801-2000">1801 cc - 2000 cc</option>
                <option value="2001-2500">2001 cc - 2500 cc</option>
                <option value="2501+">2501 cc ve yukarısı</option>
              </select>
            </div>

            <div>
              <label htmlFor="vehicleAge" className="block text-sm font-medium text-foreground mb-1.5">
                Araç Yaşı
              </label>
              <select
                id="vehicleAge"
                value={vehicleAge}
                onChange={(e) => setVehicleAge(e.target.value)}
                className="w-full h-11 rounded-lg border border-border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="1-3">1 - 3 yaş</option>
                <option value="4-6">4 - 6 yaş</option>
                <option value="7-11">7 - 11 yaş</option>
                <option value="12-15">12 - 15 yaş</option>
                <option value="16+">16 yaş ve üzeri</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            MTV Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Hesaplama Sonucu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Yıllık Toplam MTV</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.annualTotal)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">1. Taksit (Ocak)</span>
                <span className="text-xl font-semibold text-foreground">{formatNumber(result.firstInstallment)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">2. Taksit (Temmuz)</span>
                <span className="text-xl font-semibold text-foreground">{formatNumber(result.secondInstallment)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Bilgilendirme Notu:</p>
        <p>Motorlu Taşıtlar Vergisi (MTV) her yıl Ocak ve Temmuz aylarında iki eşit taksitte ödenir. Bu hesaplama binek otomobiller için Gelir İdaresi Başkanlığı (GİB) 2026 tarifesi baz alınarak hazırlanmıştır.</p>
        <div className="pt-2 flex flex-wrap gap-2">
          <Link href="/arac/yakit-maliyeti-hesaplama" className="text-primary hover:underline">Yakıt Maliyeti Hesaplama →</Link>
          <Link href="/arac/yakit-tasarruf-hesaplama" className="text-primary hover:underline">Yakıt Tasarrufu ve Araç Kıyaslama →</Link>
        </div>
      </div>
    </div>
  );
}
