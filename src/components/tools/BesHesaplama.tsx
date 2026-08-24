'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function BesHesaplama() {
  const [monthlyContributionStr, setMonthlyContributionStr] = useState<string>('2.500'); // Aylık Katkı Payı
  const [yearsStr, setYearsStr] = useState<string>('10'); // Süre (Yıl)
  const [annualReturnRateStr, setAnnualReturnRateStr] = useState<string>('30'); // Yıllık Tahmini Fon Getiri Oranı %

  const [result, setResult] = useState<{
    monthlyContribution: number;
    years: number;
    annualReturnRate: number;
    totalUserContribution: number;
    totalStateContribution: number;
    estimatedFundEarnings: number;
    totalAccumulatedFund: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const monthly = parseTurkishNumber(monthlyContributionStr);
    const years = parseTurkishNumber(yearsStr);
    const returnRate = parseTurkishNumber(annualReturnRateStr);

    if (isNaN(monthly) || monthly <= 0) {
      setError('Aylık katkı payı 0\'dan büyük olmalıdır.');
      return;
    }
    if (isNaN(years) || years < 1 || years > 40) {
      setError('Süre 1 ile 40 yıl arasında olmalıdır.');
      return;
    }
    if (isNaN(returnRate) || returnRate < 0) {
      setError('Geçerli bir getiri oranı giriniz.');
      return;
    }

    const totalMonths = years * 12;
    const totalUserContribution = monthly * totalMonths;
    const totalStateContribution = totalUserContribution * 0.30; // %30 devlet katkısı
    const totalPrincipal = totalUserContribution + totalStateContribution;

    // Basit/Bileşik Projeksiyon Hesabı
    const monthlyRate = returnRate / 100 / 12;
    let accumulated = 0;
    const monthlyTotal = monthly * 1.30; // Katkı + %30 Devlet katkısı

    if (monthlyRate > 0) {
      for (let i = 0; i < totalMonths; i++) {
        accumulated = (accumulated + monthlyTotal) * (1 + monthlyRate);
      }
    } else {
      accumulated = totalPrincipal;
    }

    const estimatedFundEarnings = Math.max(0, accumulated - totalPrincipal);

    setResult({
      monthlyContribution: monthly,
      years,
      annualReturnRate: returnRate,
      totalUserContribution,
      totalStateContribution,
      estimatedFundEarnings,
      totalAccumulatedFund: accumulated,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="monthlyContribution" className="block text-sm font-medium mb-1 text-foreground">
                Aylık BES Katkı Payı Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="monthlyContribution"
                  placeholder="Örn: 2.500"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={monthlyContributionStr}
                  onChange={(e) => setMonthlyContributionStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="years" className="block text-sm font-medium mb-1 text-foreground">
                  Birikim Süresi (Yıl) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="years"
                    placeholder="Örn: 10"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={yearsStr}
                    onChange={(e) => setYearsStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">Yıl</div>
                </div>
              </div>

              <div>
                <label htmlFor="returnRate" className="block text-sm font-medium mb-1 text-foreground">
                  Yıllık Tahmini Getiri (%)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="returnRate"
                    placeholder="Örn: 30"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={annualReturnRateStr}
                    onChange={(e) => setAnnualReturnRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">%</div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-xs text-emerald-900 dark:text-emerald-300">
              💡 <strong>%30 Devlet Katkısı:</strong> Yatırılan her 1.000 TL için devlet hesaba ek 300 TL katkı ekler.
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              BES Birikimini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Tahmini BES Birikim Projeksiyonu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{result.years} Yıl Sonraki Tahmini Fon Büyüklüğü</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.totalAccumulatedFund)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    +{formatCurrency(result.totalStateContribution)} Devlet Katkısı Dahil
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Sizin Yatıracağınız Anapara:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.totalUserContribution)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">%30 Devlet Katkısı Anaparası:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">{formatCurrency(result.totalStateContribution)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Tahmini Fon Değer Kazancı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.estimatedFundEarnings)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/faiz-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Bileşik faiz ve mevduat getirilerini karşılaştırın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Aylık katkı payı ve süreyi girerek BES devlet katkılı birikim projeksiyonunu hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Bireysel Emeklilik Sistemi (BES) Nasıl Çalışır?</h2>
        <p className="mb-4 text-muted-foreground">
          BES, düzenli tasarrufların yatırım fonlarında değerlendirilmesini sağlayan özel bir birikim sistemidir. 
          Türkiye&apos;de devlet, katılımcıların yatırdığı katkı payının <strong>%30&apos;u kadar</strong> ek katkı sağlar. 
          Sistemde en az 10 yıl kalan ve 56 yaşını dolduran katılımcılar devlet katkısının tamamına ve emeklilik hakkına hak kazanır.
        </p>
      </div>
    </div>
  );
}
