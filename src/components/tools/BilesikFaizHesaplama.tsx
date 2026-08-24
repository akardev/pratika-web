'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function BilesikFaizHesaplama() {
  const [initialPrincipalStr, setInitialPrincipalStr] = useState<string>('50.000');
  const [monthlyAdditionStr, setMonthlyAdditionStr] = useState<string>('5.000');
  const [annualRateStr, setAnnualRateStr] = useState<string>('45'); // Yıllık Faiz Oranı %
  const [yearsStr, setYearsStr] = useState<string>('3'); // Yıl
  const [compoundingFrequency, setCompoundingFrequency] = useState<'monthly' | 'annually'>('monthly');

  const [result, setResult] = useState<{
    initialPrincipal: number;
    totalAdditions: number;
    totalPrincipal: number;
    totalInterest: number;
    finalBalance: number;
    effectiveReturnRate: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const initial = parseTurkishNumber(initialPrincipalStr) || 0;
    const monthlyAdd = parseTurkishNumber(monthlyAdditionStr) || 0;
    const annualRate = parseTurkishNumber(annualRateStr);
    const years = parseTurkishNumber(yearsStr);

    if (initial <= 0 && monthlyAdd <= 0) {
      setError('Lütfen bir başlangıç tutarı veya aylık ekleme tutarı giriniz.');
      return;
    }
    if (isNaN(annualRate) || annualRate <= 0) {
      setError('Lütfen 0\'dan büyük geçerli bir faiz oranı giriniz.');
      return;
    }
    if (isNaN(years) || years <= 0 || years > 50) {
      setError('Lütfen 1 ile 50 arasında bir vade yılı giriniz.');
      return;
    }

    const totalMonths = Math.round(years * 12);
    const monthlyRate = annualRate / 100 / 12;
    let balance = initial;
    let totalAdditions = 0;

    for (let m = 1; m <= totalMonths; m++) {
      if (compoundingFrequency === 'monthly') {
        balance = balance * (1 + monthlyRate) + monthlyAdd;
      } else {
        // Yıllık bileşik (aylık eklemeler düz toplanıp yıl sonunda faizlenir)
        balance += monthlyAdd;
        if (m % 12 === 0) {
          balance = balance * (1 + (annualRate / 100));
        }
      }
      totalAdditions += monthlyAdd;
    }

    const totalPrincipal = initial + totalAdditions;
    const totalInterest = Math.max(0, balance - totalPrincipal);
    const effectiveReturnRate = ((balance - totalPrincipal) / totalPrincipal) * 100;

    setResult({
      initialPrincipal: initial,
      totalAdditions,
      totalPrincipal,
      totalInterest,
      finalBalance: balance,
      effectiveReturnRate,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="principal" className="block text-sm font-medium mb-1 text-foreground">
                  Başlangıç Parası (TL)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="principal"
                    placeholder="Örn: 50.000"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={initialPrincipalStr}
                    onChange={(e) => setInitialPrincipalStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>

              <div>
                <label htmlFor="monthlyAdd" className="block text-sm font-medium mb-1 text-foreground">
                  Aylık Düzenli Ekleme (TL)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="monthlyAdd"
                    placeholder="Örn: 5.000"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={monthlyAdditionStr}
                    onChange={(e) => setMonthlyAdditionStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="annualRate" className="block text-sm font-medium mb-1 text-foreground">
                  Yıllık Faiz Oranı (%) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="annualRate"
                    placeholder="Örn: 45"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={annualRateStr}
                    onChange={(e) => setAnnualRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">%</div>
                </div>
              </div>

              <div>
                <label htmlFor="years" className="block text-sm font-medium mb-1 text-foreground">
                  Vade Süresi (Yıl) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="years"
                    placeholder="Örn: 3"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={yearsStr}
                    onChange={(e) => setYearsStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">Yıl</div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-foreground">
                Faiz İşleme / Bileşik Dönemi
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCompoundingFrequency('monthly')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    compoundingFrequency === 'monthly'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Aylık Bileşik (Mevduat/Fon)
                </button>
                <button
                  type="button"
                  onClick={() => setCompoundingFrequency('annually')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    compoundingFrequency === 'annually'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Yıllık Bileşik
                </button>
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
              Bileşik Faiz Getirisini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Vade Sonu Toplam Birikim
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Nihai Toplam Bakiye</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.finalBalance)}
                  </span>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                    +{formatCurrency(result.totalInterest)} Net Faiz Kazancı (%{formatNumber(result.effectiveReturnRate, 1)})
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Başlangıç Parası:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.initialPrincipal)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Düzenli Eklemeler Toplamı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.totalAdditions)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Yatırılan Anapara:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.totalPrincipal)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/faiz-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Basit ve vadeli mevduat faizi hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Anapara, faiz ve süreyi girerek bileşik faiz getirinizi hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Bileşik Faiz Nedir ve Nasıl Çalışır?</h2>
        <p className="mb-4 text-muted-foreground">
          Bileşik faiz, faiz getirisinin de anaparaya eklenerek bir sonraki dönemde faiz kazandırması prensibidir. Albert Einstein&apos;ın &quot;Dünyanın 8. harikası&quot; olarak tanımladığı bu mekanizma, uzun vadeli tasarrufların geometrik olarak büyümesini sağlar.
        </p>
      </div>
    </div>
  );
}
