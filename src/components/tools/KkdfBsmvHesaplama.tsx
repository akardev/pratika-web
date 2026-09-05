'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KkdfBsmvHesaplama() {
  const [interestStr, setInterestStr] = useState('5000');
  const [loanType, setLoanType] = useState<'consumer' | 'commercial' | 'housing'>('consumer');

  const [result, setResult] = useState<{
    kkdfRate: number;
    bsmvRate: number;
    kkdfAmount: number;
    bsmvAmount: number;
    totalTax: number;
    grossInterest: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const netInterest = parseTurkishNumber(interestStr);
    if (isNaN(netInterest) || netInterest <= 0) return;

    let kkdfRate = 0.15;
    let bsmvRate = 0.05;

    if (loanType === 'commercial') {
      kkdfRate = 0.00; // Ticari kredilerde KKDF genelde %0
      bsmvRate = 0.05;
    } else if (loanType === 'housing') {
      kkdfRate = 0.00; // Konut kredisinde KKDF ve BSMV muafiyeti vardır
      bsmvRate = 0.00;
    }

    const kkdfAmount = netInterest * kkdfRate;
    const bsmvAmount = netInterest * bsmvRate;
    const totalTax = kkdfAmount + bsmvAmount;

    setResult({
      kkdfRate: kkdfRate * 100,
      bsmvRate: bsmvRate * 100,
      kkdfAmount: Math.round(kkdfAmount * 100) / 100,
      bsmvAmount: Math.round(bsmvAmount * 100) / 100,
      totalTax: Math.round(totalTax * 100) / 100,
      grossInterest: Math.round((netInterest + totalTax) * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-foreground mb-1">Kredi / Finansman Türü</label>
              <select
                id="type"
                value={loanType}
                onChange={(e) => setLoanType(e.target.value as 'consumer' | 'commercial' | 'housing')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="consumer">Tüketici / İhtiyaç Kredisi (%15 KKDF, %5 BSMV)</option>
                <option value="commercial">Ticari Kredi (%0 KKDF, %5 BSMV)</option>
                <option value="housing">Konut Kredisi (Yasal Muafiyet - %0 KKDF, %0 BSMV)</option>
              </select>
            </div>
            <div>
              <label htmlFor="interest" className="block text-sm font-medium text-foreground mb-1">Faiz Tutarı (TL)</label>
              <input
                id="interest"
                type="text"
                value={interestStr}
                onChange={(e) => setInterestStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Fon ve Vergileri Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">KKDF ve BSMV Kesinti Detayı</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">KKDF Kesintisi (%{result.kkdfRate})</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.kkdfAmount)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">BSMV Kesintisi (%{result.bsmvRate})</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.bsmvAmount)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Vergili Faiz</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.grossInterest)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
