'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function TaksitliPesinKarsilastirici() {
  const [totalPriceStr, setTotalPriceStr] = useState<string>('30000');
  const [cashDiscountStr, setCashDiscountStr] = useState<string>('10'); // %10 peşin indirim
  const [monthsCount, setMonthsCount] = useState<number>(6);
  const [monthlyYieldStr, setMonthlyYieldStr] = useState<string>('3.5'); // Aylık %3.5 mevduat/para piyasası getirisi
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    cashPrice: number;
    installmentTotal: number;
    monthlyInstallment: number;
    interestGainFromRemainingMoney: number;
    effectiveInstallmentCost: number;
    betterOption: 'cash' | 'installment';
    savingsDifference: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const total = parseTurkishNumber(totalPriceStr);
    const cashDiscRate = parseTurkishNumber(cashDiscountStr) || 0;
    const monthlyRate = parseTurkishNumber(monthlyYieldStr) || 0;

    if (isNaN(total) || total <= 0) {
      setError('Lütfen geçerli bir ürün fiyatı girin.');
      return;
    }

    const cashPrice = total * (1 - cashDiscRate / 100);
    const monthlyInstallment = total / monthsCount;

    // Taksitte cebimizde kalan paranın her ay getirisini simüle edelim:
    let remainingMoney = total;
    let totalInterestGain = 0;
    const r = monthlyRate / 100;

    for (let i = 0; i < monthsCount; i++) {
      // Ay başı getiri
      totalInterestGain += remainingMoney * r;
      // Ay sonu taksit ödemesi
      remainingMoney -= monthlyInstallment;
    }

    const effectiveInstallmentCost = total - totalInterestGain;
    const isCashBetter = cashPrice <= effectiveInstallmentCost;
    const savings = Math.abs(cashPrice - effectiveInstallmentCost);

    setResult({
      cashPrice: Math.round(cashPrice),
      installmentTotal: Math.round(total),
      monthlyInstallment: Math.round(monthlyInstallment),
      interestGainFromRemainingMoney: Math.round(totalInterestGain),
      effectiveInstallmentCost: Math.round(effectiveInstallmentCost),
      betterOption: isCashBetter ? 'cash' : 'installment',
      savingsDifference: Math.round(savings),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label htmlFor="tot" className="block text-sm font-medium text-foreground mb-1">Liste Fiyatı (TL)</label>
              <input
                id="tot"
                type="text"
                value={totalPriceStr}
                onChange={(e) => setTotalPriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="disc" className="block text-sm font-medium text-foreground mb-1">Peşin İndirimi (%)</label>
              <input
                id="disc"
                type="text"
                value={cashDiscountStr}
                onChange={(e) => setCashDiscountStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="mo" className="block text-sm font-medium text-foreground mb-1">Taksit Sayısı</label>
              <select
                id="mo"
                value={monthsCount}
                onChange={(e) => setMonthsCount(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value={3}>3 Taksit</option>
                <option value={6}>6 Taksit</option>
                <option value={9}>9 Taksit</option>
                <option value={12}>12 Taksit</option>
              </select>
            </div>
            <div>
              <label htmlFor="yield" className="block text-sm font-medium text-foreground mb-1">Aylık Fon/Faiz Getirisi (%)</label>
              <input
                id="yield"
                type="text"
                value={monthlyYieldStr}
                onChange={(e) => setMonthlyYieldStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Karlılığı Karşılaştır
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Karşılaştırma Analizi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">İndirimli Peşin Fiyat</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.cashPrice)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Taksit Net Efektif Maliyeti</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.effectiveInstallmentCost)} ₺</span>
                <span className="text-[11px] text-muted-foreground block mt-0.5">(Getiri kazancı düşüldükten sonra)</span>
              </div>
              <div className={`p-4 rounded-lg border ${result.betterOption === 'cash' ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400'}`}>
                <span className="text-xs block mb-1 font-semibold">Tavsiye Edilen Seçenek</span>
                <span className="text-base font-bold block">
                  {result.betterOption === 'cash' ? '✓ Peşin Ödemek Daha Karlı' : '✓ Taksitle Alıp Parayı Değerlendirmek Daha Karlı'}
                </span>
                <span className="text-xs mt-1 block">Fark: {formatNumber(result.savingsDifference)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Fırsat Maliyeti Mantığı:</p>
        <p>Peşin indirim cazip görünse de, taksit seçildiğinde elinizde kalan para mevduat veya para piyasası fonunda değerlenerek getiri sağlar. Bu hesaplayıcı, iki senaryoyu finansal olarak eşdeğer tabana oturtarak net karlı olanı tespit eder.</p>
      </div>
    </div>
  );
}
