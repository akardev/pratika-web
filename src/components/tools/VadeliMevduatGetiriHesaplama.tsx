'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function VadeliMevduatGetiriHesaplama() {
  const [principalStr, setPrincipalStr] = useState<string>('250000');
  const [annualRateStr, setAnnualRateStr] = useState<string>('47.5'); // %47.5 yıllık faiz
  const [daysCount, setDaysCount] = useState<number>(32); // 32 gün standart kırık vade
  const [withholdingTaxRate, setWithholdingTaxRate] = useState<number>(10); // %10 stopaj
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    grossInterest: number;
    taxDeduction: number;
    netInterest: number;
    totalEndBalance: number;
    dailyNetRate: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const principal = parseTurkishNumber(principalStr);
    const rate = parseTurkishNumber(annualRateStr);

    if (isNaN(principal) || principal <= 0 || isNaN(rate) || rate <= 0) {
      setError('Lütfen anapara ve yıllık faiz oranını geçerli pozitif sayılar olarak girin.');
      return;
    }

    // Basit Faiz = (Anapara * Oran * Gün) / (365 * 100) = (Anapara * Oran * Gün) / 36500
    const grossInterest = (principal * rate * daysCount) / 36500;
    const taxDeduction = grossInterest * (withholdingTaxRate / 100);
    const netInterest = grossInterest - taxDeduction;
    const totalEndBalance = principal + netInterest;

    setResult({
      grossInterest: Math.round(grossInterest * 100) / 100,
      taxDeduction: Math.round(taxDeduction * 100) / 100,
      netInterest: Math.round(netInterest * 100) / 100,
      totalEndBalance: Math.round(totalEndBalance * 100) / 100,
      dailyNetRate: Math.round((netInterest / daysCount) * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label htmlFor="p" className="block text-sm font-medium text-foreground mb-1">Anapara (TL)</label>
              <input
                id="p"
                type="text"
                value={principalStr}
                onChange={(e) => setPrincipalStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="r" className="block text-sm font-medium text-foreground mb-1">Yıllık Faiz Oranı (%)</label>
              <input
                id="r"
                type="text"
                value={annualRateStr}
                onChange={(e) => setAnnualRateStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="d" className="block text-sm font-medium text-foreground mb-1">Vade Süresi</label>
              <select
                id="d"
                value={daysCount}
                onChange={(e) => setDaysCount(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value={32}>32 Gün (Standart Ay)</option>
                <option value={46}>46 Gün</option>
                <option value={92}>92 Gün (3 Ay)</option>
                <option value={181}>181 Gün (6 Ay)</option>
                <option value={365}>365 Gün (1 Yıl)</option>
              </select>
            </div>
            <div>
              <label htmlFor="tax" className="block text-sm font-medium text-foreground mb-1">Stopaj Oranı</label>
              <select
                id="tax"
                value={withholdingTaxRate}
                onChange={(e) => setWithholdingTaxRate(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value={10}>%10 (6 aya kadar vadeli standart)</option>
                <option value={7.5}>%7.5 (1 yıla kadar vadeli)</option>
                <option value={5}>%5 (1 yıldan uzun vadeli)</option>
              </select>
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Net Getiriyi Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Vade Sonu Getirisi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400">
                <span className="text-xs block mb-1">Ele Geçecek Net Faiz</span>
                <span className="text-2xl font-bold">{formatNumber(result.netInterest)} ₺</span>
                <span className="text-xs block mt-1">(Günlük ortalama: {formatNumber(result.dailyNetRate)} ₺)</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Kesilen Stopaj Vergisi</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.taxDeduction)} ₺</span>
                <span className="text-xs text-muted-foreground block mt-1">Brüt faiz: {formatNumber(result.grossInterest)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Vade Sonu Toplam Bakiye</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.totalEndBalance)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Stopaj Kesintisi ve Vergilendirme:</p>
        <p>Banka vadeli mevduat hesaplarında elde edilen faiz geliri stopaj kesintisine tabidir. Stopaj doğrudan banka tarafından kaynağında kesilip vergi dairesine aktarılır, yatırımcının eline net tutar geçer.</p>
      </div>
    </div>
  );
}
