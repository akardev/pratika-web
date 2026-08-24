'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KrediErkenKapamaHesaplama() {
  const [remainingPrincipalStr, setRemainingPrincipalStr] = useState<string>('80.000'); // Kalan Anapara Borcu
  const [monthlyInstallmentStr, setMonthlyInstallmentStr] = useState<string>('6.500'); // Aylık Taksit Tutarı
  const [remainingMonthsStr, setRemainingMonthsStr] = useState<string>('18'); // Kalan Taksit Sayısı (Ay)
  const [loanType, setLoanType] = useState<'ihtiyac' | 'konut'>('ihtiyac');

  const [result, setResult] = useState<{
    remainingPrincipal: number;
    remainingTotalPayments: number;
    earlyCloseFee: number;
    totalAmountToPayNow: number;
    totalInterestSaved: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const principal = parseTurkishNumber(remainingPrincipalStr);
    const installment = parseTurkishNumber(monthlyInstallmentStr);
    const months = parseTurkishNumber(remainingMonthsStr);

    if (isNaN(principal) || principal <= 0) {
      setError('Lütfen geçerli bir kalan anapara tutarı giriniz.');
      return;
    }
    if (isNaN(installment) || installment <= 0) {
      setError('Lütfen geçerli bir aylık taksit tutarı giriniz.');
      return;
    }
    if (isNaN(months) || months < 1 || months > 360) {
      setError('Lütfen geçerli bir kalan taksit sayısı giriniz.');
      return;
    }

    const remainingTotalPayments = installment * months;
    if (remainingTotalPayments <= principal) {
      setError('Kalan taksitler toplamı kalan anaparadan büyük olmalıdır.');
      return;
    }

    // Tüketici Kredisi Kanunu gereği konut kredilerinde kalan vadeye göre %1 veya %2 erken ödeme tazminatı olabilir. İhtiyaç kredilerinde ise ceza alınamaz.
    let earlyCloseFee = 0;
    if (loanType === 'konut') {
      const feeRate = months <= 36 ? 0.01 : 0.02;
      earlyCloseFee = principal * feeRate;
    }

    const totalAmountToPayNow = principal + earlyCloseFee;
    const totalInterestSaved = Math.max(0, remainingTotalPayments - totalAmountToPayNow);

    setResult({
      remainingPrincipal: principal,
      remainingTotalPayments,
      earlyCloseFee,
      totalAmountToPayNow,
      totalInterestSaved,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Kredi Türü
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setLoanType('ihtiyac')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    loanType === 'ihtiyac'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  İhtiyaç / Taşıt (Ceza Yok)
                </button>
                <button
                  type="button"
                  onClick={() => setLoanType('konut')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    loanType === 'konut'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Konut Kredisi (%1-%2 Ceza)
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="remainingPrincipal" className="block text-sm font-medium mb-1 text-foreground">
                Kalan Anapara Borcu (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="remainingPrincipal"
                  placeholder="Örn: 80.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={remainingPrincipalStr}
                  onChange={(e) => setRemainingPrincipalStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Mobil bankacılık kredi detayında &quot;Kalan Anapara&quot; olarak yazar.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="installment" className="block text-sm font-medium mb-1 text-foreground">
                  Aylık Taksit Tutarı (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="installment"
                    placeholder="Örn: 6.500"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={monthlyInstallmentStr}
                    onChange={(e) => setMonthlyInstallmentStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>

              <div>
                <label htmlFor="remainingMonths" className="block text-sm font-medium mb-1 text-foreground">
                  Kalan Taksit Sayısı <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="remainingMonths"
                    placeholder="Örn: 18"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={remainingMonthsStr}
                    onChange={(e) => setRemainingMonthsStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">Ay</div>
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
              Erken Kapatma Tasarrufunu Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Erken Kapama Analizi
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Faizden Tasarrufunuz</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-emerald-600 dark:text-emerald-400 tracking-tight">
                    +{formatCurrency(result.totalInterestSaved)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Bugün Ödenecek Tutar: {formatCurrency(result.totalAmountToPayNow)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Kalan Taksitlerin Toplamı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.remainingTotalPayments)}</span>
                  </div>
                  {result.earlyCloseFee > 0 && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-muted-foreground">Yasal Erken Ödeme Ücreti:</span>
                      <span className="font-semibold text-destructive">{formatCurrency(result.earlyCloseFee)}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kredi-taksit-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Kredi taksit hesaplama aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Kalan anapara ve taksit bilgilerini girerek faiz kazancınızı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kredi Erken Kapatıldığında Faiz İndirimi Nasıl Olur?</h2>
        <p className="mb-4 text-muted-foreground">
          Krediyi vadesinden önce kapattığınızda, kalan aylara ait henüz doğmamış faizler, KKDF ve BSMV kesintileri tamamen silinir; yalnızca mevcut kalan anapara borcu tahsil edilir.
        </p>
      </div>
    </div>
  );
}
