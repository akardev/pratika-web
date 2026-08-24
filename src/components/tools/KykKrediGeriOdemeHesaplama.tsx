'use client';

import { useState } from 'react';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KykKrediGeriOdemeHesaplama() {
  const [totalLoanReceivedStr, setTotalLoanReceivedStr] = useState<string>('96.000');
  const [installmentCount, setInstallmentCount] = useState<number>(24); // 24 ay veya 36 ay

  const [result, setResult] = useState<{
    principal: number;
    inflationAddition: number;
    totalRepayment: number;
    monthlyInstallment: number;
    lawNote: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const principal = parseTurkishNumber(totalLoanReceivedStr);
    if (isNaN(principal) || principal <= 0) {
      setError('Lütfen aldığınız toplam kredi tutarını giriniz.');
      return;
    }

    // 7420 sayılı Kanun ile KYK öğrenim kredilerinde endeks (Yİ-ÜFE) farkı kaldırılmıştır.
    // Öğrenciler yalnızca aldıkları ana para tutarını ödemektedir.
    const inflationAddition = 0;
    const totalRepayment = principal;
    const monthlyInstallment = totalRepayment / installmentCount;

    setResult({
      principal,
      inflationAddition,
      totalRepayment,
      monthlyInstallment,
      lawNote: '7420 Sayılı Kanun gereğince KYK öğrenim kredisi borçlarına Yİ-ÜFE veya gecikme faizi eklenmemekte, yalnızca alınan anapara tahsil edilmektedir.',
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <form onSubmit={handleCalculate} noValidate className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="totalLoan" className="block text-xs font-medium text-foreground mb-1.5">
                Alınan Toplam KYK Kredisi Tutarı (TL)
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="totalLoan"
                placeholder="Örn: 96.000"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                value={totalLoanReceivedStr}
                onChange={(e) => setTotalLoanReceivedStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
              />
            </div>

            <div>
              <label htmlFor="installments" className="block text-xs font-medium text-foreground mb-1.5">
                Geri Ödeme Taksit Sayısı
              </label>
              <select
                id="installments"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                value={installmentCount}
                onChange={(e) => setInstallmentCount(Number(e.target.value))}
              >
                <option value={12}>12 Ay (1 Yıl)</option>
                <option value={24}>24 Ay (2 Yıl - Standart)</option>
                <option value={36}>36 Ay (3 Yıl)</option>
                <option value={48}>48 Ay (4 Yıl)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground text-sm font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all"
          >
            KYK Kredi Geri Ödeme Planını Hesapla
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 bg-muted/20 rounded-xl border border-border text-center">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                Aylık Eşit Taksit Tutarı
              </span>
              <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight">
                {formatCurrency(result.monthlyInstallment)}
              </span>
              <span className="text-xs text-muted-foreground block mt-2">
                Toplam {installmentCount} ay boyunca ödenecek taksit
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 bg-background rounded-lg border border-border flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Alınan Anapara:</span>
                <span className="text-sm font-bold text-foreground">{formatCurrency(result.principal)}</span>
              </div>
              <div className="p-3.5 bg-background rounded-lg border border-border flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Endeks (Yİ-ÜFE) Farkı:</span>
                <span className="text-sm font-bold text-emerald-600">0,00 TL (Faizsiz)</span>
              </div>
            </div>

            <div className="p-3.5 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 rounded-lg text-xs text-emerald-800 dark:text-emerald-300">
              ⚖️ <strong>Yasal Mevzuat Notu:</strong> {result.lawNote}
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">KYK Öğrenim Kredisi Geri Ödemesi Nasıl Yapılır?</h2>
        <p className="mb-4 text-muted-foreground">
          Gençlik ve Spor Bakanlığı (GSB) KYK kredileri mezuniyetten 2 yıl sonra aylık eşit taksitlerle geri ödenmeye başlar. Ödemeler e-Devlet ve İnteraktif Vergi Dairesi üzerinden gerçekleştirilir.
        </p>
      </div>
    </div>
  );
}
