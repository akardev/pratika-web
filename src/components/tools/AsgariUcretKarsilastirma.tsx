'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function AsgariUcretKarsilastirma() {
  const [salaryType, setSalaryType] = useState<'net' | 'gross'>('net');
  const [userSalaryStr, setUserSalaryStr] = useState<string>('34.000');
  const [minWageGrossStr] = useState<string>('26.005,50'); // 2025/2026 referans asgari ücret
  const [minWageNetStr] = useState<string>('22.104,67');

  const [result, setResult] = useState<{
    userSalary: number;
    minWage: number;
    ratio: number;
    difference: number;
    percentageDifference: number;
    salaryType: 'net' | 'gross';
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const userSal = parseTurkishNumber(userSalaryStr);
    if (isNaN(userSal) || userSal <= 0) {
      setError('Lütfen geçerli bir maaş tutarı giriniz.');
      return;
    }

    const minWage = salaryType === 'net' ? parseTurkishNumber(minWageNetStr) : parseTurkishNumber(minWageGrossStr);
    const ratio = userSal / minWage;
    const difference = userSal - minWage;
    const percentageDifference = ((userSal - minWage) / minWage) * 100;

    setResult({
      userSalary: userSal,
      minWage,
      ratio,
      difference,
      percentageDifference,
      salaryType,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Maaş Türü
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSalaryType('net')}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    salaryType === 'net'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Net Maaş
                </button>
                <button
                  type="button"
                  onClick={() => setSalaryType('gross')}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    salaryType === 'gross'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Brüt Maaş
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="userSalary" className="block text-sm font-medium mb-2 text-foreground">
                Mevcut {salaryType === 'net' ? 'Net' : 'Brüt'} Maaşınız (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="userSalary"
                  placeholder="Örn: 34.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={userSalaryStr}
                  onChange={(e) => setUserSalaryStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
            </div>

            <div className="p-3 bg-muted/40 rounded-lg border border-border/60 text-xs text-muted-foreground">
              Karşılaştırma Esası: <span className="font-semibold text-foreground">{salaryType === 'net' ? `${minWageNetStr} TL (Net Asgari Ücret)` : `${minWageGrossStr} TL (Brüt Asgari Ücret)`}</span>
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
              Asgari Ücretle Karşılaştır
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Karşılaştırma Analizi
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Asgari Ücretin Katı</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatNumber(result.ratio, 2)} Katı
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    {result.percentageDifference >= 0 ? `Asgari ücretten +%${formatNumber(result.percentageDifference, 1)} fazla` : `Asgari ücretten %${formatNumber(Math.abs(result.percentageDifference), 1)} az`}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Maaşınız:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.userSalary)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Referans Asgari Ücret:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.minWage)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Fark Tutarı:</span>
                    <span className="font-semibold text-foreground">{result.difference >= 0 ? `+${formatCurrency(result.difference)}` : formatCurrency(result.difference)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/netten-brute-maas-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Maaşınızın brüt ve işveren maliyetini hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Maaşınızı girerek asgari ücrete göre oranını ve katını hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Maaş Asgari Ücrete Göre Nasıl Değerlendirilir?</h2>
        <p className="mb-4 text-muted-foreground">
          Enflasyonist dönemlerde reel alım gücünü koruyabilmek için maaşın asgari ücrete olan oranı önemli bir göstergedir. 
          Bu araç ile aldığınız net veya brüt maaşın güncel asgari ücretin kaç katına denk geldiğini anında görebilirsiniz.
        </p>
      </div>
    </div>
  );
}
