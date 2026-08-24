'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function MevduatGetirisiNetStopaj() {
  const [principalStr, setPrincipalStr] = useState<string>('100.000');
  const [annualRateStr, setAnnualRateStr] = useState<string>('50'); // Yıllık brüt faiz %
  const [maturityDaysStr, setMaturityDaysStr] = useState<string>('32'); // Vade (Gün)
  const [stopageRate, setStopageRate] = useState<number>(7.5); // 6 aya kadar %7.5 / %10

  const [result, setResult] = useState<{
    principal: number;
    annualRate: number;
    maturityDays: number;
    grossInterest: number;
    stopageTax: number;
    netInterest: number;
    totalPayout: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const principal = parseTurkishNumber(principalStr);
    const annualRate = parseTurkishNumber(annualRateStr);
    const days = parseTurkishNumber(maturityDaysStr);

    if (isNaN(principal) || principal <= 0) {
      setError('Lütfen geçerli bir anapara tutarı giriniz.');
      return;
    }
    if (isNaN(annualRate) || annualRate <= 0) {
      setError('Lütfen geçerli bir yıllık faiz oranı giriniz.');
      return;
    }
    if (isNaN(days) || days <= 0 || days > 1460) {
      setError('Vade gün sayısı 1 ile 1460 gün arasında olmalıdır.');
      return;
    }

    // Brüt Faiz Formülü: (Anapara × Faiz Oranı × Gün) / 36500
    const grossInterest = (principal * annualRate * days) / 36500;
    const stopageTax = (grossInterest * stopageRate) / 100;
    const netInterest = grossInterest - stopageTax;
    const totalPayout = principal + netInterest;

    setResult({
      principal,
      annualRate,
      maturityDays: days,
      grossInterest,
      stopageTax,
      netInterest,
      totalPayout,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="principal" className="block text-sm font-medium mb-1 text-foreground">
                Mevduat Anapara Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="principal"
                  placeholder="Örn: 100.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={principalStr}
                  onChange={(e) => setPrincipalStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="annualRate" className="block text-sm font-medium mb-1 text-foreground">
                  Yıllık Brüt Faiz (%) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="annualRate"
                    placeholder="Örn: 50"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={annualRateStr}
                    onChange={(e) => setAnnualRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">%</div>
                </div>
              </div>

              <div>
                <label htmlFor="days" className="block text-sm font-medium mb-1 text-foreground">
                  Vade Süresi (Gün) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="days"
                    placeholder="Örn: 32"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={maturityDaysStr}
                    onChange={(e) => setMaturityDaysStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">Gün</div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-foreground">
                Stopaj Vergi Oranı
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setStopageRate(7.5)}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    stopageRate === 7.5
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  %7.5 (6 aya kadar)
                </button>
                <button
                  type="button"
                  onClick={() => setStopageRate(10)}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    stopageRate === 10
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  %10 (1 yıla kadar)
                </button>
                <button
                  type="button"
                  onClick={() => setStopageRate(15)}
                  className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    stopageRate === 15
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  %15
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
              Net Mevduat Getirisini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Vade Sonu Net Getiri
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Elinize Geçecek Net Faiz</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-emerald-600 dark:text-emerald-400 tracking-tight">
                    +{formatCurrency(result.netInterest)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Vade Sonu Toplam Para: {formatCurrency(result.totalPayout)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Brüt Faiz Tutarı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.grossInterest)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Stopaj Vergisi (%{stopageRate}):</span>
                    <span className="font-semibold text-destructive">-{formatCurrency(result.stopageTax)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Vade:</span>
                    <span className="font-semibold text-foreground">{result.maturityDays} Gün</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/faiz-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Genel faiz ve getiri hesaplama araçlarına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Anapara, faiz oranı ve vadeyi girerek net stopaj kesintili kazancı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Mevduat Faizi ve Stopaj Kesintisi Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Bankalar tarafından ilan edilen faiz oranları brüttür. Mevduat getirisinden Gelir Vergisi Kanunu Geçici 67. Madde uyarınca stopaj vergisi kaynağında kesilir ve hesabınıza net faiz tutarı yatırılır.
        </p>
      </div>
    </div>
  );
}
