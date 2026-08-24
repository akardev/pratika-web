'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function PesinatsizTaksitTutariHesaplama() {
  const [totalAmountStr, setTotalAmountStr] = useState<string>('36.000');
  const [monthsStr, setMonthsStr] = useState<string>('6');
  const [markupRateStr, setMarkupRateStr] = useState<string>('0'); // %0 (Vade farksız) veya ek taksit farkı

  const [result, setResult] = useState<{
    totalAmount: number;
    months: number;
    markupRate: number;
    monthlyInstallment: number;
    finalTotalPayable: number;
    difference: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const amount = parseTurkishNumber(totalAmountStr);
    const months = parseTurkishNumber(monthsStr);
    const markupRate = parseTurkishNumber(markupRateStr) || 0;

    if (isNaN(amount) || amount <= 0) {
      setError('Lütfen geçerli bir alışveriş tutarı giriniz.');
      return;
    }
    if (isNaN(months) || months < 2 || months > 60) {
      setError('Taksit sayısı 2 ile 60 ay arasında olmalıdır.');
      return;
    }

    const finalTotalPayable = amount * (1 + markupRate / 100);
    const monthlyInstallment = finalTotalPayable / months;
    const difference = finalTotalPayable - amount;

    setResult({
      totalAmount: amount,
      months,
      markupRate,
      monthlyInstallment,
      finalTotalPayable,
      difference,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="totalAmount" className="block text-sm font-medium mb-1 text-foreground">
                Toplam Tutar (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="totalAmount"
                  placeholder="Örn: 36.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={totalAmountStr}
                  onChange={(e) => setTotalAmountStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="months" className="block text-sm font-medium mb-1 text-foreground">
                  Taksit Sayısı (Ay) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="months"
                    placeholder="Örn: 6"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={monthsStr}
                    onChange={(e) => setMonthsStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">Ay</div>
                </div>
              </div>

              <div>
                <label htmlFor="markup" className="block text-sm font-medium mb-1 text-foreground">
                  Vade Farkı Oranı (%)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="markup"
                    placeholder="Örn: 0"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={markupRateStr}
                    onChange={(e) => setMarkupRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
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
              Aylık Taksit Tutarını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Aylık Taksit Planı
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Her Ay Ödenecek Tutar</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.monthlyInstallment)} / ay
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    {result.months} Taksit Boyunca Eşit Ödeme
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Geri Ödeme:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.finalTotalPayable)}</span>
                  </div>
                  {result.difference > 0 && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-muted-foreground">Ek Vade Farkı Maliyeti:</span>
                      <span className="font-semibold text-destructive">+{formatCurrency(result.difference)}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/pesin-taksit-karsilastirma"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Peşin - taksit karşılaştırma analizine gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Toplam tutar ve taksit sayısını girerek aylık taksitleri hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Peşinatsız Taksit Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Peşinatsız taksitli alışverişlerde toplam tutar doğrudan seçilen taksit ayına bölünür. Vade farkı uygulanıyorsa önce tutara faiz/fark yüzdesi eklenir, ardından eşit aylık taksitler oluşturulur.
        </p>
      </div>
    </div>
  );
}
