'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KrediYillikMaliyetOraniHesaplama() {
  const [loanStr, setLoanStr] = useState('100000');
  const [months, setMonths] = useState(24);
  const [rateStr, setRateStr] = useState('3.50');
  const [expensesStr, setExpensesStr] = useState('2500'); // Tahsis + Sigorta + Ekspertiz

  const [result, setResult] = useState<{
    monthlyPayment: number;
    effectiveMonthlyRate: number;
    annualCostRate: number;
    nominalAnnualRate: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const loan = parseTurkishNumber(loanStr);
    const monthlyRate = parseTurkishNumber(rateStr);
    const expenses = parseTurkishNumber(expensesStr) || 0;

    if (isNaN(loan) || isNaN(monthlyRate) || loan <= 0 || monthlyRate <= 0) return;

    // Normal aylık taksit
    const r = (monthlyRate * 1.20) / 100;
    const payment = loan * (r * Math.pow(1 + r, months)) / (Math.pow(1 + r, months) - 1);

    // Efektif iç verim oranı (IRR): Net ele geçen para = loan - expenses
    const netReceived = loan - expenses;
    let irr = r;
    for (let iter = 0; iter < 100; iter++) {
      let npv = -netReceived;
      let dnpv = 0;
      for (let t = 1; t <= months; t++) {
        npv += payment / Math.pow(1 + irr, t);
        dnpv -= (t * payment) / Math.pow(1 + irr, t + 1);
      }
      const diff = npv / dnpv;
      irr -= diff;
      if (Math.abs(diff) < 1e-7) break;
    }

    // Bileşik yıllık maliyet oranı = (1 + irr)^12 - 1
    const annualCost = (Math.pow(1 + irr, 12) - 1) * 100;
    const nominalAnnual = monthlyRate * 12;

    setResult({
      monthlyPayment: Math.round(payment * 100) / 100,
      effectiveMonthlyRate: Math.round(irr * 10000) / 100,
      annualCostRate: Math.round(annualCost * 100) / 100,
      nominalAnnualRate: Math.round(nominalAnnual * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="loan" className="block text-sm font-medium text-foreground mb-1">Kredi Tutarı (TL)</label>
              <input
                id="loan"
                type="text"
                value={loanStr}
                onChange={(e) => setLoanStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="months" className="block text-sm font-medium text-foreground mb-1">Vade (Ay)</label>
              <input
                id="months"
                type="number"
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-foreground mb-1">Aylık Faiz Oranı (%)</label>
              <input
                id="rate"
                type="text"
                value={rateStr}
                onChange={(e) => setRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="exp" className="block text-sm font-medium text-foreground mb-1">Tahsis & Sigorta Masrafları (TL)</label>
              <input
                id="exp"
                type="text"
                value={expensesStr}
                onChange={(e) => setExpensesStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Yıllık Maliyet Oranını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Efektif Yıllık Maliyet Oranı (YMO)</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Yıllık Maliyet Oranı (YMO)</span>
                <span className="text-2xl font-bold text-primary">%{result.annualCostRate}</span>
                <span className="text-xs text-muted-foreground block mt-1">Efektif Bileşik Yıllık Maliyet</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Aylık Taksit Tutarı</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.monthlyPayment)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Nominal Yıllık Faiz</span>
                <span className="text-xl font-bold text-foreground">%{result.nominalAnnualRate}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
