'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function SerbestMeslekMakbuzuHesaplama() {
  const [calculationMode, setCalculationMode] = useState<'brutten' | 'netten'>('brutten');
  const [amountStr, setAmountStr] = useState<string>('20.000');
  const [vatRate, setVatRate] = useState<number>(20); // KDV %20
  const [stopageRate, setStopageRate] = useState<number>(20); // Stopaj %20
  const [tevkifatRate] = useState<number>(0); // Tevkifat yok (0), 5/10 (0.5), 7/10, 9/10

  const [result, setResult] = useState<{
    grossAmount: number;
    stopageAmount: number;
    vatAmount: number;
    vatTevkifatAmount: number;
    vatPaidToConsultant: number;
    netReceived: number; // Müşteriden fiilen tahsil edilecek tutar
    netIncome: number; // Stopaj sonrası serbest meslek net kazancı (KDV hariç)
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const inputVal = parseTurkishNumber(amountStr);
    if (isNaN(inputVal) || inputVal <= 0) {
      setError('Lütfen 0\'dan büyük geçerli bir tutar giriniz.');
      return;
    }

    let grossAmount = inputVal;
    if (calculationMode === 'netten') {
      // Netten brüte formülü (Net Kazanç = Brüt - (Brüt × Stopaj)) => Brüt = Net / (1 - StopajOranı)
      grossAmount = inputVal / (1 - (stopageRate / 100));
    }

    const stopageAmount = (grossAmount * stopageRate) / 100;
    const vatAmount = (grossAmount * vatRate) / 100;
    const vatTevkifatAmount = vatAmount * tevkifatRate;
    const vatPaidToConsultant = vatAmount - vatTevkifatAmount;

    const netIncome = grossAmount - stopageAmount;
    const netReceived = netIncome + vatPaidToConsultant;

    setResult({
      grossAmount,
      stopageAmount,
      vatAmount,
      vatTevkifatAmount,
      vatPaidToConsultant,
      netReceived,
      netIncome,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Hesaplama Yönü
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCalculationMode('brutten')}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    calculationMode === 'brutten'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Brüt Ücretten
                </button>
                <button
                  type="button"
                  onClick={() => setCalculationMode('netten')}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    calculationMode === 'netten'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Eline Geçecek Net Ücretten
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-1 text-foreground">
                {calculationMode === 'brutten' ? 'Brüt Hizmet Tutarı (TL)' : 'Hedeflenen Net Ücret (TL)'} <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="amount"
                  placeholder="Örn: 20.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={amountStr}
                  onChange={(e) => setAmountStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">
                  Stopaj Oranı (%)
                </label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  value={stopageRate}
                  onChange={(e) => setStopageRate(Number(e.target.value))}
                >
                  <option value={20}>%20 (Standart Stopaj)</option>
                  <option value={0}>%0 (Vergi Mükellefi Olmayan)</option>
                  <option value={10}>%10</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">
                  KDV Oranı (%)
                </label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  value={vatRate}
                  onChange={(e) => setVatRate(Number(e.target.value))}
                >
                  <option value={20}>%20 (Genel KDV)</option>
                  <option value={10}>%10</option>
                </select>
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
              SMM Makbuzunu Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Makbuz Hesap Dökümü
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Müşteriden Tahsil Edilecek Tutar</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.netReceived)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Net Geliriniz (KDV Hariç): {formatCurrency(result.netIncome)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Brüt Hizmet Tutarı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.grossAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Stopaj Kesintisi (%{stopageRate}):</span>
                    <span className="font-semibold text-destructive">-{formatCurrency(result.stopageAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hesaplanan KDV (%{vatRate}):</span>
                    <span className="font-semibold text-foreground">+{formatCurrency(result.vatAmount)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kdv-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    KDV dahil/hariç hesaplama aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Tutar ve stopaj/KDV oranlarını girerek serbest meslek makbuzu dökümünü hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Serbest Meslek Makbuzu (SMM) Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Serbest meslek erbabı (avukat, mali müşavir, doktor, yazılımcı, danışman vb.) kestiği makbuzda brüt tutar üzerinden %20 stopaj gelir vergisi kesintisi yapar ve hizmetine %20 KDV ekler. Müşterinin ödediği toplam net tahsilat tutarı: <strong>(Brüt - Stopaj) + KDV</strong> olarak hesaplanır.
        </p>
      </div>
    </div>
  );
}
