'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber } from '@/lib/utils';

interface MaturityDiffResult {
  cashPrice: number;
  creditPrice: number;
  differenceAmount: number;
  differenceRate: number;
  installments?: number;
  monthlyPayment?: number;
}

export default function VadeFarkiHesaplama() {
  const [cashPriceStr, setCashPriceStr] = useState<string>('');
  const [creditPriceStr, setCreditPriceStr] = useState<string>('');
  const [installmentsStr, setInstallmentsStr] = useState<string>('6');

  const [result, setResult] = useState<MaturityDiffResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!cashPriceStr.trim()) {
      setError('Peşin fiyat 0\'dan büyük olmalıdır.');
      return;
    }

    const cash = parseTurkishNumber(cashPriceStr);
    if (isNaN(cash) || cash <= 0) {
      setError('Peşin fiyat 0\'dan büyük olmalıdır.');
      return;
    }

    if (!creditPriceStr.trim()) {
      setError('Vadeli toplam fiyat 0\'dan büyük olmalıdır.');
      return;
    }

    const credit = parseTurkishNumber(creditPriceStr);
    if (isNaN(credit) || credit < cash) {
      setError('Vadeli fiyat peşin fiyattan küçük olamaz.');
      return;
    }

    let installments: number | undefined;
    let monthlyPayment: number | undefined;

    if (installmentsStr.trim()) {
      const inst = parseTurkishNumber(installmentsStr);
      if (!isNaN(inst) && Number.isInteger(inst) && inst > 0) {
        installments = inst;
        monthlyPayment = credit / inst;
      }
    }

    const differenceAmount = credit - cash;
    const differenceRate = (differenceAmount / cash) * 100;

    setResult({
      cashPrice: cash,
      creditPrice: credit,
      differenceAmount,
      differenceRate,
      installments,
      monthlyPayment,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="cashPrice" className="block text-sm font-medium mb-2 text-foreground">
                Peşin Satış Fiyatı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="cashPrice"
                  placeholder="Örn: 10.000"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                  value={cashPriceStr}
                  onChange={(e) => setCashPriceStr(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="creditPrice" className="block text-sm font-medium mb-2 text-foreground">
                  Vadeli / Taksitli Fiyat (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="creditPrice"
                    placeholder="Örn: 11.500"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                    value={creditPriceStr}
                    onChange={(e) => setCreditPriceStr(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    TL
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="installments" className="block text-sm font-medium mb-2 text-foreground">
                  Taksit Sayısı (Ay)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="installments"
                    placeholder="6"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                    value={installmentsStr}
                    onChange={(e) => setInstallmentsStr(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    Ay
                  </div>
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
              Vade Farkını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Vade Farkı Tutarı</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.differenceAmount)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Vade Farkı Oranı: <strong>%{formatNumber(result.differenceRate)}</strong>
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Peşin Fiyat:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.cashPrice)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Vadeli Toplam Fiyat:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.creditPrice)}</span>
                  </div>

                  {result.monthlyPayment !== undefined && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-muted-foreground">Aylık Taksit ({result.installments} Taksit):</span>
                      <span className="font-semibold text-foreground">{formatCurrency(result.monthlyPayment)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Toplam Fazladan Ödenen:</span>
                    <span className="font-bold text-foreground text-sm sm:text-base">{formatCurrency(result.differenceAmount)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kredi-taksit-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Banka kredi taksiti hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Peşin ve vadeli fiyatları girip hesaplayın.</p>
                <p className="text-xs text-muted-foreground mt-1">Toplam vade farkı tutarı ve oranı burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Vade Farkı Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Vade farkı, bir ürün veya hizmetin taksitli ya da vadeli alımında peşin fiyatın üzerine eklenen finansman maliyetidir.
        </p>

        <div className="p-5 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground mb-8 space-y-1.5">
          <p className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">
            Vade Farkı Formülleri:
          </p>
          <p className="font-semibold">Vade Farkı Tutarı = Vadeli Fiyat - Peşin Fiyat</p>
          <p className="font-semibold">Vade Farkı Oranı (%) = (Fark Tutarı / Peşin Fiyat) &times; 100</p>
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Vade farkı nedir?</h4>
            <p className="text-muted-foreground mt-2">
              Ödemenin ileri bir tarihe veya taksitlere yayılması karşılığında satıcının ya da bankanın peşin fiyata uyguladığı ek artıştır.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Vade farkı ile faiz aynı mıdır?</h4>
            <p className="text-muted-foreground mt-2">
              Vade farkı ticari mal ve hizmet satışlarında peşin-vadeli fiyat farkını tanımlarken; faiz doğrudan para borçlanmasının getiri/maliyet oranıdır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
