'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function GunlukFaizHesaplama() {
  const [principalStr, setPrincipalStr] = useState<string>('150.000');
  const [annualRateStr, setAnnualRateStr] = useState<string>('48'); // Yıllık brüt faiz %
  const [daysStr, setDaysStr] = useState<string>('1'); // Gün (Gecelik / 1 gün vb.)
  const [stopageRate] = useState<number>(7.5); // %7.5

  const [result, setResult] = useState<{
    principal: number;
    annualRate: number;
    days: number;
    dailyNetInterest: number;
    totalNetInterest: number;
    stopageAmount: number;
    finalBalance: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const principal = parseTurkishNumber(principalStr);
    const annualRate = parseTurkishNumber(annualRateStr);
    const days = parseTurkishNumber(daysStr);

    if (isNaN(principal) || principal <= 0) {
      setError('Lütfen geçerli bir anapara tutarı giriniz.');
      return;
    }
    if (isNaN(annualRate) || annualRate <= 0) {
      setError('Lütfen geçerli bir yıllık faiz oranı giriniz.');
      return;
    }
    if (isNaN(days) || days <= 0 || days > 365) {
      setError('Gün sayısı 1 ile 365 arasında olmalıdır.');
      return;
    }

    const grossForDays = (principal * annualRate * days) / 36500;
    const stopageAmount = (grossForDays * stopageRate) / 100;
    const totalNetInterest = grossForDays - stopageAmount;
    const dailyNetInterest = totalNetInterest / days;
    const finalBalance = principal + totalNetInterest;

    setResult({
      principal,
      annualRate,
      days,
      dailyNetInterest,
      totalNetInterest,
      stopageAmount,
      finalBalance,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="principal" className="block text-sm font-medium mb-1 text-foreground">
                Anapara Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="principal"
                  placeholder="Örn: 150.000"
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
                  Yıllık Faiz Oranı (%) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="annualRate"
                    placeholder="Örn: 48"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={annualRateStr}
                    onChange={(e) => setAnnualRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">%</div>
                </div>
              </div>

              <div>
                <label htmlFor="days" className="block text-sm font-medium mb-1 text-foreground">
                  Gün Sayısı <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="days"
                    placeholder="Örn: 1"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={daysStr}
                    onChange={(e) => setDaysStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">Gün</div>
                </div>
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
              Günlük Getiriyi Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Günlük Net Faiz Kazancı
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Gün Başına Net Nema</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-emerald-600 dark:text-emerald-400 tracking-tight">
                    +{formatCurrency(result.dailyNetInterest)} / gün
                  </span>
                  {result.days > 1 && (
                    <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                      {result.days} Günlük Toplam Net: +{formatCurrency(result.totalNetInterest)}
                    </span>
                  )}
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Bakiye:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.finalBalance)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Stopaj Kesintisi (%{stopageRate}):</span>
                    <span className="font-semibold text-destructive">-{formatCurrency(result.stopageAmount)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/mevduat-getirisi-net-stopaj"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Vadeli mevduat stopaj tablosuna gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Anapara ve faiz oranını girerek günlük net faiz getirinizi hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Günlük ve Gecelik Faiz Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Günlük faiz formülü: <strong>(Anapara × Yıllık Faiz Oranı × Gün Sayısı) / 36.500</strong>. Elde edilen brüt tutardan yasal stopaj vergisi kesilerek net günlük nema bulunur.
        </p>
      </div>
    </div>
  );
}
