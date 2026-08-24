'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function BorcKapatmaKredisiHesaplama() {
  const [currentTotalDebtStr, setCurrentTotalDebtStr] = useState<string>('150.000'); // Kapatılacak toplam borç
  const [currentMonthlyPaymentsStr, setCurrentMonthlyPaymentsStr] = useState<string>('18.000'); // Mevcut aylık toplam taksit ödemeleri
  const [newLoanMonthsStr, setNewLoanMonthsStr] = useState<string>('24'); // Yeni Kredi Vadesi (Ay)
  const [newLoanInterestRateStr, setNewLoanInterestRateStr] = useState<string>('3.75'); // Yeni Kredi Aylık Faiz Oranı %

  const [result, setResult] = useState<{
    totalDebt: number;
    currentMonthlyPayments: number;
    newMonthlyInstallment: number;
    newTotalRepayment: number;
    newMonths: number;
    monthlyRelief: number; // Aylık taksit rahatlaması
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const debt = parseTurkishNumber(currentTotalDebtStr);
    const currentMonthly = parseTurkishNumber(currentMonthlyPaymentsStr) || 0;
    const months = parseTurkishNumber(newLoanMonthsStr);
    const monthlyRate = (parseTurkishNumber(newLoanInterestRateStr) || 0) / 100;

    if (isNaN(debt) || debt <= 0) {
      setError('Lütfen toplam borç tutarını giriniz.');
      return;
    }
    if (isNaN(months) || months < 1 || months > 60) {
      setError('Yeni kredi vadesi 1 ile 60 ay arasında olmalıdır.');
      return;
    }
    if (monthlyRate <= 0) {
      setError('Lütfen geçerli bir aylık kredi faiz oranı giriniz.');
      return;
    }

    // Aylık taksit formülü: T = P * [ r*(1+r)^n / ((1+r)^n - 1) ]
    const factor = Math.pow(1 + monthlyRate, months);
    const newMonthlyInstallment = (debt * (monthlyRate * factor)) / (factor - 1);
    const newTotalRepayment = newMonthlyInstallment * months;
    const monthlyRelief = currentMonthly > 0 ? currentMonthly - newMonthlyInstallment : 0;

    setResult({
      totalDebt: debt,
      currentMonthlyPayments: currentMonthly,
      newMonthlyInstallment,
      newTotalRepayment,
      newMonths: months,
      monthlyRelief,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="debt" className="block text-sm font-medium mb-1 text-foreground">
                Kapatılacak Toplam Borç Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="debt"
                  placeholder="Örn: 150.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={currentTotalDebtStr}
                  onChange={(e) => setCurrentTotalDebtStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div>
              <label htmlFor="currentMonthly" className="block text-sm font-medium mb-1 text-foreground">
                Mevcut Aylık Toplam Ödediğiniz Taksit (TL)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="currentMonthly"
                  placeholder="Örn: 18.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={currentMonthlyPaymentsStr}
                  onChange={(e) => setCurrentMonthlyPaymentsStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="newMonths" className="block text-sm font-medium mb-1 text-foreground">
                  Yeni Kredi Vadesi (Ay) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="newMonths"
                    placeholder="Örn: 24"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={newLoanMonthsStr}
                    onChange={(e) => setNewLoanMonthsStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">Ay</div>
                </div>
              </div>

              <div>
                <label htmlFor="newRate" className="block text-sm font-medium mb-1 text-foreground">
                  Aylık Faiz Oranı (%) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="newRate"
                    placeholder="Örn: 3.75"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={newLoanInterestRateStr}
                    onChange={(e) => setNewLoanInterestRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">%</div>
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
              Borç Kapatma Taksitini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Tek Krediyle Birleştirme Planı
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Yeni Tek Aylık Taksit</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.newMonthlyInstallment)}
                  </span>
                  {result.monthlyRelief > 0 && (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                      Aylık Bütçede +{formatCurrency(result.monthlyRelief)} Rahatlama
                    </span>
                  )}
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Kapatılan Toplam Borç:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.totalDebt)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yeni Toplam Geri Ödeme:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.newTotalRepayment)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Vade:</span>
                    <span className="font-semibold text-foreground">{result.newMonths} Ay</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kredi-taksit-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Kredi taksit ve faiz hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Borç tutarı ve yeni kredi koşullarını girerek aylık taksit rahatlamanızı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Borç Kapatma (Borç Transferi) Kredisi Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          Farklı bankalardaki kredi kartı, ek hesap (KMH) ve ihtiyaç kredisi borçlarını tek bir çatı altında toplayarak daha uzun vadeye yayma ve aylık ödeme yükünü hafifletme yöntemidir.
        </p>
      </div>
    </div>
  );
}
