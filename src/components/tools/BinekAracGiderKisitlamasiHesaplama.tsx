'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function BinekAracGiderKisitlamasiHesaplama() {
  const [fuelExpenseStr, setFuelExpenseStr] = useState('30000'); // Aylık akaryakıt & bakım masrafı
  const [rentExpenseStr, setRentExpenseStr] = useState('45000'); // Aylık araç kira bedeli

  const [result, setResult] = useState<{
    fuelDeductible: number;
    fuelKkeg: number;
    rentDeductible: number;
    rentKkeg: number;
    totalDeductible: number;
    totalKkeg: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const fuel = parseTurkishNumber(fuelExpenseStr) || 0;
    const rent = parseTurkishNumber(rentExpenseStr) || 0;

    // Akaryakıt/Bakım kuralı: %70 gider kabul edilir, %30 KKEG
    const fuelDeductible = fuel * 0.70;
    const fuelKkeg = fuel * 0.30;

    // 2026 Binek Araç Aylık Kiralama Gider Tavanı yaklaşık 37.000 TL
    const rentCeiling = 37000;
    const rentDeductible = Math.min(rent, rentCeiling);
    const rentKkeg = Math.max(0, rent - rentCeiling);

    setResult({
      fuelDeductible: Math.round(fuelDeductible),
      fuelKkeg: Math.round(fuelKkeg),
      rentDeductible: Math.round(rentDeductible),
      rentKkeg: Math.round(rentKkeg),
      totalDeductible: Math.round(fuelDeductible + rentDeductible),
      totalKkeg: Math.round(fuelKkeg + rentKkeg),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fuel" className="block text-sm font-medium text-foreground mb-1">
                Aylık Akaryakıt / Bakım / Otopark Gideri (TL)
              </label>
              <input
                id="fuel"
                type="text"
                value={fuelExpenseStr}
                onChange={(e) => setFuelExpenseStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
              <span className="text-xs text-muted-foreground mt-1 block">Yasal olarak azami %70 gider yazılabilir.</span>
            </div>
            <div>
              <label htmlFor="rent" className="block text-sm font-medium text-foreground mb-1">
                Aylık Binek Araç Kiralama Bedeli (TL)
              </label>
              <input
                id="rent"
                type="text"
                value={rentExpenseStr}
                onChange={(e) => setRentExpenseStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
              <span className="text-xs text-muted-foreground mt-1 block">2026 kiralama tavanı: ~37.000 TL/ay</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Gider ve KKEG Ayrımını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Vergi Matrahından İndirilecekler</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-xs text-muted-foreground block mb-1">Gider Yazılabilecek Tutar</span>
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {formatNumber(result.totalDeductible)} ₺
                </span>
              </div>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <span className="text-xs text-muted-foreground block mb-1">KKEG (Gider Kabul Edilmeyen)</span>
                <span className="text-xl font-bold text-destructive">{formatNumber(result.totalKkeg)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Kira Tavanını Aşan Kısım</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.rentKkeg)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
