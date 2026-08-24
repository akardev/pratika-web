'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function TevkifatKdvHesaplama() {
  const [amountStr, setAmountStr] = useState<string>('50.000');
  const [calculationMode, setCalculationMode] = useState<'haric' | 'dahil'>('haric');
  const [vatRate, setVatRate] = useState<number>(20); // KDV %20 veya %10
  const [tevkifatRatio, setTevkifatRatio] = useState<string>('5/10'); // 2/10, 3/10, 4/10, 5/10, 7/10, 9/10

  const [result, setResult] = useState<{
    baseAmount: number;
    totalVat: number;
    withheldVat: number; // Tevkif edilen KDV (Alıcı tarafından 2 nolu beyannameyle ödenecek)
    sellerVat: number; // Satıcıya ödenecek KDV
    totalInvoiceAmount: number; // Toplam Fatura Tutarı
    payableByBuyer: number; // Alıcının satıcıya fiilen ödeyeceği tutar
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const inputVal = parseTurkishNumber(amountStr);
    if (isNaN(inputVal) || inputVal <= 0) {
      setError('Lütfen geçerli bir tutar giriniz.');
      return;
    }

    const [numStr, denStr] = tevkifatRatio.split('/');
    const ratioFraction = parseInt(numStr, 10) / parseInt(denStr, 10);

    let baseAmount = inputVal;
    let totalVat = (inputVal * vatRate) / 100;

    if (calculationMode === 'dahil') {
      baseAmount = inputVal / (1 + vatRate / 100);
      totalVat = inputVal - baseAmount;
    }

    const withheldVat = totalVat * ratioFraction;
    const sellerVat = totalVat - withheldVat;
    const totalInvoiceAmount = baseAmount + totalVat;
    const payableByBuyer = baseAmount + sellerVat;

    setResult({
      baseAmount,
      totalVat,
      withheldVat,
      sellerVat,
      totalInvoiceAmount,
      payableByBuyer,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Girdi Tutar Türü
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setCalculationMode('haric')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    calculationMode === 'haric'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  KDV Hariç Tutar
                </button>
                <button
                  type="button"
                  onClick={() => setCalculationMode('dahil')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    calculationMode === 'dahil'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  KDV Dahil Tutar
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-1 text-foreground">
                Tutar (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="amount"
                  placeholder="Örn: 50.000"
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
                  KDV Oranı
                </label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  value={vatRate}
                  onChange={(e) => setVatRate(Number(e.target.value))}
                >
                  <option value={20}>%20 KDV</option>
                  <option value={10}>%10 KDV</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">
                  Tevkifat Oranı
                </label>
                <select
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                  value={tevkifatRatio}
                  onChange={(e) => setTevkifatRatio(e.target.value)}
                >
                  <option value="2/10">2/10 (Temizlik, Çevre vb.)</option>
                  <option value="3/10">3/10 (Bakım Onarım vb.)</option>
                  <option value="4/10">4/10</option>
                  <option value="5/10">5/10 (Servis, Danışmanlık vb.)</option>
                  <option value="7/10">7/10 (Güvenlik, Yemek vb.)</option>
                  <option value="9/10">9/10 (İşgücü Temini vb.)</option>
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
              Tevkifatlı Faturayı Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Fatura ve Tevkifat Dökümü
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Alıcının Ödeyeceği Tutar</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.payableByBuyer)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Toplam Fatura: {formatCurrency(result.totalInvoiceAmount)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">KDV Matrahı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.baseAmount)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hesaplanan Toplam KDV:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.totalVat)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Tevkif Edilen KDV ({tevkifatRatio}):</span>
                    <span className="font-semibold text-destructive">-{formatCurrency(result.withheldVat)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Satıcıya Ödenen KDV:</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">+{formatCurrency(result.sellerVat)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kdv-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Standart KDV hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Tutar ve tevkifat oranını seçerek fatura dağılımını hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">KDV Tevkifatı Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          KDV tevkifatı, faturada yer alan KDV tutarının belirli bir kısmının alıcı tarafından satıcıya ödenmeyip doğrudan vergi dairesine (2 Nolu KDV Beyannamesi ile) yatırılması uygulamasıdır.
        </p>
      </div>
    </div>
  );
}
