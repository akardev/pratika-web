'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function TasarrufHedefiHesaplama() {
  const [targetGoalStr, setTargetGoalStr] = useState<string>('250.000');
  const [currentSavingsStr, setCurrentSavingsStr] = useState<string>('30.000');
  const [monthlySavingsStr, setMonthlySavingsStr] = useState<string>('10.000');
  const [annualRateStr, setAnnualRateStr] = useState<string>('30'); // % Getiri

  const [result, setResult] = useState<{
    targetGoal: number;
    currentSavings: number;
    monthlySavings: number;
    monthsNeeded: number;
    yearsNeeded: number;
    totalContributed: number;
    totalInterestEarned: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const targetGoal = parseTurkishNumber(targetGoalStr);
    const current = parseTurkishNumber(currentSavingsStr) || 0;
    const monthly = parseTurkishNumber(monthlySavingsStr);
    const annualRate = parseTurkishNumber(annualRateStr) || 0;

    if (isNaN(targetGoal) || targetGoal <= 0) {
      setError('Lütfen 0\'dan büyük bir hedef tutar giriniz.');
      return;
    }
    if (isNaN(monthly) || monthly <= 0) {
      setError('Lütfen aylık tasarruf miktarını giriniz.');
      return;
    }
    if (current >= targetGoal) {
      setError('Mevcut birikiminiz zaten hedefinize ulaşmıştır.');
      return;
    }

    const monthlyRate = annualRate > 0 ? annualRate / 100 / 12 : 0;
    let balance = current;
    let months = 0;
    const maxMonths = 1200; // 100 yıl sınırı

    while (balance < targetGoal && months < maxMonths) {
      months++;
      balance = balance * (1 + monthlyRate) + monthly;
    }

    const totalContributed = current + (monthly * months);
    const totalInterestEarned = Math.max(0, balance - totalContributed);
    const yearsNeeded = months / 12;

    setResult({
      targetGoal,
      currentSavings: current,
      monthlySavings: monthly,
      monthsNeeded: months,
      yearsNeeded,
      totalContributed,
      totalInterestEarned,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="targetGoal" className="block text-sm font-medium mb-1 text-foreground">
                Ulaşmak İstediğiniz Hedef Tutar (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="targetGoal"
                  placeholder="Örn: 250.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={targetGoalStr}
                  onChange={(e) => setTargetGoalStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="currentSavings" className="block text-sm font-medium mb-1 text-foreground">
                  Mevcut Birikim (TL)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="currentSavings"
                    placeholder="Örn: 30.000"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={currentSavingsStr}
                    onChange={(e) => setCurrentSavingsStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>

              <div>
                <label htmlFor="monthlySavings" className="block text-sm font-medium mb-1 text-foreground">
                  Aylık Tasarruf (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="monthlySavings"
                    placeholder="Örn: 10.000"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={monthlySavingsStr}
                    onChange={(e) => setMonthlySavingsStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="annualRate" className="block text-sm font-medium mb-1 text-foreground">
                Yıllık Tahmini Getiri Oranı (%)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="annualRate"
                  placeholder="Örn: 30"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={annualRateStr}
                  onChange={(e) => setAnnualRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">%</div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Hedefe Ulaşma Süresini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hedefe Ulaşma Süresi
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Gereken Süre</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {result.monthsNeeded} Ay
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Yaklaşık {result.yearsNeeded >= 1 ? `${formatNumber(result.yearsNeeded, 1)} Yıl` : `${result.monthsNeeded} Ay`}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Cebinizden Çıkacak Toplam:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.totalContributed)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yatırım / Faiz Kazancı:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">+{formatCurrency(result.totalInterestEarned)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/aylik-birikim-tasarruf-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Hedef süreye göre gereken aylık bütçeyi hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Hedef ve aylık tasarruf tutarınızı girerek hedefe kaç ayda ulaşacağınızı görün.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Tasarruf Hedefine Ulaşma Süresi Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Birikimlerinizin faiz veya yatırım fonu gibi getiri araçlarında değerlenmesi, hedef süreyi önemli ölçüde kısaltır. Bileşik getiri sayesinde zaman ilerledikçe birikiminizin büyüme hızı artar.
        </p>
      </div>
    </div>
  );
}
