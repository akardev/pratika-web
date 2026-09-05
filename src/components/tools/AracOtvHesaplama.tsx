'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function AracOtvHesaplama() {
  const [basePriceStr, setBasePriceStr] = useState('600000'); // Vergisiz matrah
  const [engineCapacity, setEngineCapacity] = useState<'under1600' | '1600to2000' | 'over2000' | 'electric'>('under1600');

  const [result, setResult] = useState<{
    otvRate: number;
    otvAmount: number;
    kdvAmount: number;
    totalTaxes: number;
    finalPrice: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const base = parseTurkishNumber(basePriceStr);
    if (isNaN(base) || base <= 0) return;

    let otvRate = 0.80; // Varsayılan %80
    if (engineCapacity === 'under1600') {
      if (base <= 184000) otvRate = 0.45;
      else if (base <= 220000) otvRate = 0.50;
      else if (base <= 250000) otvRate = 0.60;
      else if (base <= 280000) otvRate = 0.70;
      else otvRate = 0.80;
    } else if (engineCapacity === '1600to2000') {
      otvRate = 1.30;
    } else if (engineCapacity === 'over2000') {
      otvRate = 2.20;
    } else if (engineCapacity === 'electric') {
      otvRate = 0.10; // Elektrikli araç %10
    }

    const otvAmount = base * otvRate;
    const withOtv = base + otvAmount;
    const kdvAmount = withOtv * 0.20;
    const finalPrice = withOtv + kdvAmount;
    const totalTaxes = otvAmount + kdvAmount;

    setResult({
      otvRate: otvRate * 100,
      otvAmount: Math.round(otvAmount),
      kdvAmount: Math.round(kdvAmount),
      totalTaxes: Math.round(totalTaxes),
      finalPrice: Math.round(finalPrice),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="base" className="block text-sm font-medium text-foreground mb-1">
                Vergisiz Fabrika / Gümrük Matrahı (TL)
              </label>
              <input
                id="base"
                type="text"
                value={basePriceStr}
                onChange={(e) => setBasePriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="eng" className="block text-sm font-medium text-foreground mb-1">Motor Türü ve Hacmi</label>
              <select
                id="eng"
                value={engineCapacity}
                onChange={(e) => setEngineCapacity(e.target.value as 'under1600' | '1600to2000' | 'over2000' | 'electric')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="under1600">1600 cc ve Altı (Kademeli %45 - %80)</option>
                <option value="1600to2000">1601 - 2000 cc Arası (%130 - %150)</option>
                <option value="over2000">2000 cc Üzeri (%220)</option>
                <option value="electric">Tam Elektrikli (%10 - %40)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            ÖTV ve Anahtar Teslim Fiyatını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Otomobil Vergi Fiyat Dağılımı</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Anahtar Teslim Satış Fiyatı</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.finalPrice)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">ÖTV Tutarı (%{result.otvRate})</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.otvAmount)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">KDV Tutarı (%20)</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.kdvAmount)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Vergi Yükü</span>
                <span className="text-xl font-bold text-destructive">{formatNumber(result.totalTaxes)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
