'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function PesinTaksitKarsilastirma() {
  const [cashPriceStr, setCashPriceStr] = useState<string>('45.000'); // Peşin Fiyat
  const [installmentPriceStr, setInstallmentPriceStr] = useState<string>('50.000'); // Toplam Taksitli Fiyat
  const [installmentCountStr, setInstallmentCountStr] = useState<string>('6'); // Taksit Sayısı (Ay)
  const [monthlyDepositReturnStr, setMonthlyDepositReturnStr] = useState<string>('3.5'); // Aylık Net Mevduat Getirisi %

  const [result, setResult] = useState<{
    cashPrice: number;
    installmentPrice: number;
    installmentCount: number;
    monthlyInstallment: number;
    nominalDifference: number;
    effectiveCashEquivalent: number; // Taksitleri öderken kalan paranın faizde değerlendirilmesiyle oluşan net maliyet
    advantageOption: 'cash' | 'installment';
    advantageAmount: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const cashPrice = parseTurkishNumber(cashPriceStr);
    const installmentPrice = parseTurkishNumber(installmentPriceStr);
    const count = parseTurkishNumber(installmentCountStr);
    const monthlyRate = (parseTurkishNumber(monthlyDepositReturnStr) || 0) / 100;

    if (isNaN(cashPrice) || cashPrice <= 0) {
      setError('Lütfen geçerli bir peşin fiyat giriniz.');
      return;
    }
    if (isNaN(installmentPrice) || installmentPrice <= 0) {
      setError('Lütfen geçerli bir taksitli fiyat giriniz.');
      return;
    }
    if (isNaN(count) || count < 2 || count > 48) {
      setError('Taksit sayısı 2 ile 48 arasında olmalıdır.');
      return;
    }

    const monthlyInstallment = installmentPrice / count;
    const nominalDifference = installmentPrice - cashPrice;

    // Taksitli seçenekte, cebinizdeki peşin paranın mevduatta kalıp her ay 1 taksit ödendiği simülasyonu
    let remainingCapital = cashPrice;
    for (let i = 1; i <= count; i++) {
      remainingCapital = (remainingCapital * (1 + monthlyRate)) - monthlyInstallment;
    }

    // Eğer son ayın sonunda elde kalan bakiye > 0 ise taksitli almak daha kârlıdır!
    const isInstallmentAdvantageous = remainingCapital > 0;
    const advantageAmount = Math.abs(remainingCapital);

    setResult({
      cashPrice,
      installmentPrice,
      installmentCount: count,
      monthlyInstallment,
      nominalDifference,
      effectiveCashEquivalent: cashPrice - remainingCapital,
      advantageOption: isInstallmentAdvantageous ? 'installment' : 'cash',
      advantageAmount,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="cashPrice" className="block text-sm font-medium mb-1 text-foreground">
                  Peşin / İndirimli Fiyat (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="cashPrice"
                    placeholder="Örn: 45.000"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={cashPriceStr}
                    onChange={(e) => setCashPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>

              <div>
                <label htmlFor="installmentPrice" className="block text-sm font-medium mb-1 text-foreground">
                  Toplam Taksitli Fiyat (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="installmentPrice"
                    placeholder="Örn: 50.000"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={installmentPriceStr}
                    onChange={(e) => setInstallmentPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="installmentCount" className="block text-sm font-medium mb-1 text-foreground">
                  Taksit Sayısı (Ay) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="installmentCount"
                    placeholder="Örn: 6"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={installmentCountStr}
                    onChange={(e) => setInstallmentCountStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">Ay</div>
                </div>
              </div>

              <div>
                <label htmlFor="monthlyDeposit" className="block text-sm font-medium mb-1 text-foreground">
                  Aylık Mevduat Getiriniz (%)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="monthlyDeposit"
                    placeholder="Örn: 3.5"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={monthlyDepositReturnStr}
                    onChange={(e) => setMonthlyDepositReturnStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
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
              Fırsat Analizi ve Karşılaştır
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Karar Tavsiyesi
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">En Avantajlı Seçenek</span>
                  <span className={`font-extrabold text-2xl sm:text-3xl tracking-tight ${
                    result.advantageOption === 'installment' ? 'text-emerald-600 dark:text-emerald-400' : 'text-primary'
                  }`}>
                    {result.advantageOption === 'installment' ? 'Taksitle Almak Daha Kârlı' : 'Peşin Ödemek Daha Kârlı'}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Net Kazanç Avantajı: ~{formatCurrency(result.advantageAmount)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Aylık Taksit Tutarı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.monthlyInstallment)} / ay</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Görünür Fiyat Farkı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.nominalDifference)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/vade-farki-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Vade farkı oranını hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Peşin ve taksitli fiyatları girerek hangisinin finansal olarak daha kârlı olduğunu bulun.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Peşin mi Taksitli mi? Paranın Zaman Değeri</h2>
        <p className="mb-4 text-muted-foreground">
          Yüksek mevduat faizi ve enflasyon olan dönemlerde, taksitli fiyat peşin fiyattan daha yüksek görünse bile, elinizdeki nakdi faizde tutarak taksitleri aydan aya ödemek çoğu zaman daha kârlı olabilir. Bu hesaplayıcı bu fırsat maliyetini simüle eder.
        </p>
      </div>
    </div>
  );
}
