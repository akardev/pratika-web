'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KrediKartiNakitAvansHesaplama() {
  const [amountStr, setAmountStr] = useState('10000');
  const [months, setMonths] = useState(6);
  const [rateStr, setRateStr] = useState('5.00'); // Aylık nakit avans faiz oranı %

  const [result, setResult] = useState<{
    monthlyInstallment: number;
    totalPayment: number;
    totalInterest: number;
    totalTax: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseTurkishNumber(amountStr);
    const monthlyRate = parseTurkishNumber(rateStr);

    if (isNaN(amount) || amount <= 0 || isNaN(monthlyRate) || monthlyRate <= 0) return;

    // Vergi dahil aylık oran (Faiz * 1.20 -> %15 KKDF + %5 BSMV)
    const effectiveMonthlyRate = (monthlyRate * 1.20) / 100;
    const numerator = effectiveMonthlyRate * Math.pow(1 + effectiveMonthlyRate, months);
    const denominator = Math.pow(1 + effectiveMonthlyRate, months) - 1;
    const monthlyInstallment = amount * (numerator / denominator);
    const totalPayment = monthlyInstallment * months;
    const totalCost = totalPayment - amount;
    const totalInterest = totalCost / 1.20;
    const totalTax = totalCost - totalInterest;

    setResult({
      monthlyInstallment: Math.round(monthlyInstallment * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalTax: Math.round(totalTax * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-foreground mb-1">Çekilecek Nakit Tutar (TL)</label>
              <input
                id="amount"
                type="text"
                value={amountStr}
                onChange={(e) => setAmountStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="months" className="block text-sm font-medium text-foreground mb-1">Taksit Sayısı</label>
              <select
                id="months"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                {[2, 3, 4, 5, 6, 9, 12].map((m) => (
                  <option key={m} value={m}>{m} Ay</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-foreground mb-1">Aylık Nakit Avans Faizi (%)</label>
              <input
                id="rate"
                type="text"
                value={rateStr}
                onChange={(e) => setRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Taksit Planını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Taksitli Nakit Avans Özeti</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Aylık Taksit Tutarı</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.monthlyInstallment)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Geri Ödeme</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.totalPayment)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Net Faiz + Vergiler</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.totalInterest + result.totalTax)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
