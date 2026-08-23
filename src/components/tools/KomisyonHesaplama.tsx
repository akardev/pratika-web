'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

interface CommissionResult {
  amount: number;
  rate: number;
  fixedFee: number;
  totalCommission: number;
  netPayout: number;
  effectiveRate: number;
}

export default function KomisyonHesaplama() {
  const [amountStr, setAmountStr] = useState<string>('');
  const [rateStr, setRateStr] = useState<string>('15');
  const [fixedFeeStr, setFixedFeeStr] = useState<string>('0');

  const [result, setResult] = useState<CommissionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!amountStr.trim()) {
      setError('İşlem tutarı 0\'dan büyük olmalıdır.');
      return;
    }

    const amount = parseTurkishNumber(amountStr);
    if (isNaN(amount) || amount <= 0) {
      setError('İşlem tutarı 0\'dan büyük olmalıdır.');
      return;
    }

    if (!rateStr.trim()) {
      setError('Komisyon oranı boş olamaz.');
      return;
    }

    const rate = parseTurkishNumber(rateStr);
    if (isNaN(rate) || rate < 0 || rate > 100) {
      setError('Komisyon oranı %0 ile %100 arasında olmalıdır.');
      return;
    }

    let fixedFee = 0;
    if (fixedFeeStr.trim()) {
      fixedFee = parseTurkishNumber(fixedFeeStr);
      if (isNaN(fixedFee) || fixedFee < 0) {
        setError('Sabit işlem ücreti negatif olamaz.');
        return;
      }
    }

    const variableCommission = (amount * rate) / 100;
    const totalCommission = variableCommission + fixedFee;
    const netPayout = amount - totalCommission;
    const effectiveRate = (totalCommission / amount) * 100;

    setResult({
      amount,
      rate,
      fixedFee,
      totalCommission,
      netPayout,
      effectiveRate,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-2 text-foreground">
                İşlem / Satış Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="amount"
                  placeholder="Örn: 1.000"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                  value={amountStr}
                  onChange={(e) => setAmountStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="rate" className="block text-sm font-medium mb-2 text-foreground">
                  Komisyon Oranı (%) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="rate"
                    placeholder="Örn: 15"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                    value={rateStr}
                    onChange={(e) => setRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    %
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="fixedFee" className="block text-sm font-medium mb-2 text-foreground">
                  Sabit İşlem Kesintisi (TL)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="fixedFee"
                    placeholder="Örn: 5,00"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                    value={fixedFeeStr}
                    onChange={(e) => setFixedFeeStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    TL
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
              Komisyonu Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Satıcıya Kalan Net Tutar</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.netPayout)}
                  </span>
                  <span className="text-xs font-semibold text-destructive mt-1 bg-destructive/10 px-2.5 py-1 rounded-md border border-destructive/20">
                    Kesilen Komisyon: {formatCurrency(result.totalCommission)} (%{formatNumber(result.effectiveRate)})
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">İşlem Tutarı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.amount)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Oransal Komisyon:</span>
                    <span className="font-semibold text-foreground">{formatCurrency((result.amount * result.rate) / 100)}</span>
                  </div>

                  {result.fixedFee > 0 && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-muted-foreground">Sabit İşlem Ücreti:</span>
                      <span className="font-semibold text-foreground">{formatCurrency(result.fixedFee)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Net Ele Geçen:</span>
                    <span className="font-bold text-foreground text-sm sm:text-base">{formatCurrency(result.netPayout)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kar-marji-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Komisyon sonrası kâr marjınızı hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">İşlem tutarı ve komisyon oranını girin.</p>
                <p className="text-xs text-muted-foreground mt-1">Kesilen komisyon ve ele geçen net kazanç burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Komisyon Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Pazaryerleri, emlakçılar, acenteler ve ödeme aracı kuruluşları işlem tutarı üzerinden belirli bir yüzde veya sabit tutar oranında komisyon kesintisi uygular.
        </p>

        <div className="p-5 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground mb-8 space-y-1.5">
          <p className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">
            Komisyon Formülleri:
          </p>
          <p className="font-semibold">Komisyon Tutarı = (İşlem Tutarı &times; Komisyon Oranı / 100) + Sabit Ücret</p>
          <p className="font-semibold">Net Tutar = İşlem Tutarı - Komisyon Tutarı</p>
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Komisyon KDV dahil fiyattan mı kesilir?</h4>
            <p className="text-muted-foreground mt-2">
              E-ticaret pazaryerleri genellikle nihai tüketicinin ödediği toplam KDV dahil satış tutarı üzerinden komisyon oranını hesaplar.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Net tahsilat nasıl bulunur?</h4>
            <p className="text-muted-foreground mt-2">
              Satış tutarından platform komisyonu ve işlem masrafları düşüldükten sonra satıcının banka hesabına aktarılan tutardır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
