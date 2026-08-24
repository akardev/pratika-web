'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function AylikBirikimTasarrufHesaplama() {
  const [targetGoalStr, setTargetGoalStr] = useState<string>('300.000'); // Hedeflenen Birikim (TL)
  const [monthsStr, setMonthsStr] = useState<string>('24'); // Hedef Süre (Ay)
  const [initialSavingsStr, setInitialSavingsStr] = useState<string>('20.000'); // Mevcut Birikim (TL)
  const [annualReturnRateStr, setAnnualReturnRateStr] = useState<string>('35'); // Yıllık Beklenen Fon/Mevduat Getirisi %

  const [result, setResult] = useState<{
    targetGoal: number;
    months: number;
    initialSavings: number;
    requiredMonthlyWithoutReturn: number;
    requiredMonthlyWithReturn: number;
    totalInterestSaved: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const targetGoal = parseTurkishNumber(targetGoalStr);
    const months = parseTurkishNumber(monthsStr);
    const initial = parseTurkishNumber(initialSavingsStr) || 0;
    const annualRate = parseTurkishNumber(annualReturnRateStr) || 0;

    if (isNaN(targetGoal) || targetGoal <= 0) {
      setError('Lütfen 0\'dan büyük geçerli bir hedef birikim tutarı giriniz.');
      return;
    }
    if (isNaN(months) || months <= 0 || months > 360) {
      setError('Lütfen 1 ile 360 arasında bir hedef ay süresi giriniz.');
      return;
    }
    if (initial >= targetGoal) {
      setError('Mevcut birikiminiz zaten hedef tutara eşit veya büyüktür.');
      return;
    }

    const netTargetNeeded = targetGoal - initial;
    const requiredMonthlyWithoutReturn = netTargetNeeded / months;

    // Getirili (Bileşik) Gerekli Aylık Tasarruf Formülü: PMT = (FV - PV*(1+r)^n) / [ ((1+r)^n - 1) / r ]
    const monthlyRate = annualRate > 0 ? annualRate / 100 / 12 : 0;
    let requiredMonthlyWithReturn = requiredMonthlyWithoutReturn;

    if (monthlyRate > 0) {
      const fvFactor = Math.pow(1 + monthlyRate, months);
      const futureValueOfInitial = initial * fvFactor;
      const remainingFV = Math.max(0, targetGoal - futureValueOfInitial);
      const annuityFactor = (fvFactor - 1) / monthlyRate;
      requiredMonthlyWithReturn = remainingFV / annuityFactor;
    }

    const totalPaidWithReturn = initial + (requiredMonthlyWithReturn * months);
    const totalInterestSaved = Math.max(0, targetGoal - totalPaidWithReturn);

    setResult({
      targetGoal,
      months,
      initialSavings: initial,
      requiredMonthlyWithoutReturn,
      requiredMonthlyWithReturn,
      totalInterestSaved,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="targetGoal" className="block text-sm font-medium mb-1 text-foreground">
                Hedeflenen Toplam Birikim Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="targetGoal"
                  placeholder="Örn: 300.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={targetGoalStr}
                  onChange={(e) => setTargetGoalStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="months" className="block text-sm font-medium mb-1 text-foreground">
                  Hedefe Ulaşma Süresi (Ay) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="months"
                    placeholder="Örn: 24"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={monthsStr}
                    onChange={(e) => setMonthsStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">Ay</div>
                </div>
              </div>

              <div>
                <label htmlFor="initial" className="block text-sm font-medium mb-1 text-foreground">
                  Mevcut Başlangıç Parası (TL)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="initial"
                    placeholder="Örn: 20.000"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={initialSavingsStr}
                    onChange={(e) => setInitialSavingsStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="annualReturn" className="block text-sm font-medium mb-1 text-foreground">
                Yıllık Tahmini Getiri / Faiz Oranı (%)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="annualReturn"
                  placeholder="Örn: 35"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={annualReturnRateStr}
                  onChange={(e) => setAnnualReturnRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
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
              Gereken Aylık Tasarrufu Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Aylık Tasarruf Hedefiniz
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Her Ay Kenara Koymanız Gereken</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.requiredMonthlyWithReturn)} / ay
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    Getiri Sayesinde {formatCurrency(result.totalInterestSaved)} Daha Az Ödeme
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hedef Birikim:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.targetGoal)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hedef Vade:</span>
                    <span className="font-semibold text-foreground">{result.months} Ay ({(result.months / 12).toFixed(1)} Yıl)</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Getirisiz (Yastık Altı) Gereken:</span>
                    <span className="font-semibold text-muted-foreground">{formatCurrency(result.requiredMonthlyWithoutReturn)} / ay</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/bilesik-faiz-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Bileşik faiz getiri tablosunu inceleyin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Hedef tutar ve süreyi girerek gereken aylık birikimi hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Birikim Hedefi Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Bir araba, ev peşinatı veya acil durum fonu oluştururken parayı sadece kenara koymak yerine faiz veya yatırım fonunda değerlendirmek hedefe çok daha düşük aylık tasarruf tutarları ile ulaşmanızı sağlar.
        </p>
      </div>
    </div>
  );
}
