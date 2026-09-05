'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function VergiGecikmeZammiHesaplama() {
  const [taxDebtStr, setTaxDebtStr] = useState('50000');
  const [monthsStr, setMonthsStr] = useState('4');
  const [daysStr, setDaysStr] = useState('10');
  const [monthlyRateStr, setMonthlyRateStr] = useState('4.50'); // 6183 sayılı kanun aylık gecikme zammı %

  const [result, setResult] = useState<{
    penaltyAmount: number;
    totalPayable: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const debt = parseTurkishNumber(taxDebtStr);
    const months = parseInt(monthsStr, 10) || 0;
    const days = parseInt(daysStr, 10) || 0;
    const monthlyRate = parseTurkishNumber(monthlyRateStr) / 100;

    if (isNaN(debt) || debt <= 0) return;

    // Ay hesabı + gün hesabı (günlük oran = aylık oran / 30)
    const monthPenalty = debt * (monthlyRate * months);
    const dayPenalty = debt * ((monthlyRate / 30) * days);
    const totalPenalty = monthPenalty + dayPenalty;

    setResult({
      penaltyAmount: Math.round(totalPenalty * 100) / 100,
      totalPayable: Math.round((debt + totalPenalty) * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="debt" className="block text-sm font-medium text-foreground mb-1">Vadesi Geçen Asıl Vergi (TL)</label>
              <input
                id="debt"
                type="text"
                value={taxDebtStr}
                onChange={(e) => setTaxDebtStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="m" className="block text-sm font-medium text-foreground mb-1">Gecikilen Tam Ay</label>
              <input
                id="m"
                type="number"
                min="0"
                value={monthsStr}
                onChange={(e) => setMonthsStr(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="d" className="block text-sm font-medium text-foreground mb-1">Gecikilen Artık Gün</label>
              <input
                id="d"
                type="number"
                min="0"
                max="29"
                value={daysStr}
                onChange={(e) => setDaysStr(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-foreground mb-1">Aylık Gecikme Zammı (%)</label>
              <input
                id="rate"
                type="text"
                value={monthlyRateStr}
                onChange={(e) => setMonthlyRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Gecikme Zammını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Vergi Borcu Sonucu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Gecikme Zammı</span>
                <span className="text-2xl font-bold text-destructive">{formatNumber(result.penaltyAmount)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Vergi Dairesine Ödenecek Toplam</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.totalPayable)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
