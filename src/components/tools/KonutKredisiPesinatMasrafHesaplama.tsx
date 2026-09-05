'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KonutKredisiPesinatMasrafHesaplama() {
  const [housePriceStr, setHousePriceStr] = useState('4500000');
  const [isFirstHome, setIsFirstHome] = useState(true);

  const [result, setResult] = useState<{
    maxLoanRate: number;
    maxLoan: number;
    minDownPayment: number;
    deedTax: number;
    bankFees: number;
    totalCashNeeded: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const price = parseTurkishNumber(housePriceStr);
    if (isNaN(price) || price <= 0) return;

    // BDDK kuralları (2. ev ise %22.5 max kredi, ilk ev ise fiyata göre %60-%80)
    let maxLoanRate = 0.70;
    if (!isFirstHome) {
      maxLoanRate = 0.225; // 2. ev alımlarında kredi sınırı %75 kısıtlaması
    } else {
      if (price <= 5000000) maxLoanRate = 0.80;
      else if (price <= 10000000) maxLoanRate = 0.70;
      else maxLoanRate = 0.50;
    }

    const maxLoan = price * maxLoanRate;
    const minDownPayment = price - maxLoan;
    const deedTax = price * 0.02; // Alıcı tapu harcı %2
    const bankFees = 15000; // Ekspertiz + ipotek tesis + dosya
    const totalCashNeeded = minDownPayment + deedTax + bankFees;

    setResult({
      maxLoanRate: maxLoanRate * 100,
      maxLoan: Math.round(maxLoan),
      minDownPayment: Math.round(minDownPayment),
      deedTax: Math.round(deedTax),
      bankFees,
      totalCashNeeded: Math.round(totalCashNeeded),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="hp" className="block text-sm font-medium text-foreground mb-1">Konut Satın Alma Değeri (TL)</label>
              <input
                id="hp"
                type="text"
                value={housePriceStr}
                onChange={(e) => setHousePriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="first" className="block text-sm font-medium text-foreground mb-1">Mülkiyet Durumu (BDDK Kuralı)</label>
              <select
                id="first"
                value={isFirstHome ? 'yes' : 'no'}
                onChange={(e) => setIsFirstHome(e.target.value === 'yes')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="yes">İlk Evim (Normal Kredi Oranı)</option>
                <option value="no">İkinci / Ek Konut (BDDK %75 Kısıtlı Kredi)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Peşinat ve Masraf Bütçesini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tapu Günü Gereken Nakit Bütçesi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Gereken Nakit</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.totalCashNeeded)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Asgari Nakit Peşinat</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.minDownPayment)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Çekilebilecek Azami Kredi</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.maxLoan)} ₺</span>
                <span className="text-xs text-muted-foreground block mt-1">Azami Oran: %{result.maxLoanRate}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Tapu Harcı + Masraflar</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.deedTax + result.bankFees)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
