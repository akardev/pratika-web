'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

interface InflationResult {
  initialAmount: number;
  rate: number;
  years: number;
  futureRequiredAmount: number;
  purchasingPowerValue: number;
  lossPercentage: number;
}

export default function EnflasyonHesaplama() {
  const [amountStr, setAmountStr] = useState<string>('100.000');
  const [rateStr, setRateStr] = useState<string>('40');
  const [yearsStr, setYearsStr] = useState<string>('3');

  const [result, setResult] = useState<InflationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!amountStr.trim()) {
      setError('Tutar 0\'dan büyük olmalıdır.');
      return;
    }

    const amount = parseTurkishNumber(amountStr);
    if (isNaN(amount) || amount <= 0) {
      setError('Tutar 0\'dan büyük olmalıdır.');
      return;
    }

    if (!rateStr.trim()) {
      setError('Enflasyon oranı boş olamaz.');
      return;
    }

    const rate = parseTurkishNumber(rateStr);
    if (isNaN(rate) || rate <= 0) {
      setError('Enflasyon oranı 0\'dan büyük olmalıdır.');
      return;
    }

    if (!yearsStr.trim()) {
      setError('Süre (yıl) 0\'dan büyük olmalıdır.');
      return;
    }

    const years = parseTurkishNumber(yearsStr);
    if (isNaN(years) || !Number.isInteger(years) || years <= 0) {
      setError('Süre pozitif bir tam yıl olmalıdır.');
      return;
    }

    const inflationFactor = Math.pow(1 + rate / 100, years);
    const futureRequiredAmount = amount * inflationFactor;
    const purchasingPowerValue = amount / inflationFactor;
    const lossPercentage = ((amount - purchasingPowerValue) / amount) * 100;

    setResult({
      initialAmount: amount,
      rate,
      years,
      futureRequiredAmount,
      purchasingPowerValue,
      lossPercentage,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium mb-2 text-foreground">
                Mevcut Para Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="amount"
                  placeholder="Örn: 100.000"
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
                  Yıllık Enflasyon (%) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="rate"
                    placeholder="Örn: 40"
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
                <label htmlFor="years" className="block text-sm font-medium mb-2 text-foreground">
                  Süre (Yıl) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="years"
                    placeholder="3"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                    value={yearsStr}
                    onChange={(e) => setYearsStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    Yıl
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
              Enflasyon Etkisini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{result.years} Yıl Sonraki Satın Alma Gücü</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.purchasingPowerValue)}
                  </span>
                  <span className="text-xs font-semibold text-destructive mt-1 bg-destructive/10 px-2.5 py-1 rounded-md border border-destructive/20">
                    Reel Değer Kaybı: -%{formatNumber(result.lossPercentage)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Mevcut Tutar:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.initialAmount)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yıllık Enflasyon / Süre:</span>
                    <span className="font-semibold text-foreground">%{formatNumber(result.rate)} / {result.years} Yıl</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Aynı Sepet İçin Gelecekte Gereken Para:</span>
                    <span className="font-bold text-foreground text-sm sm:text-base">{formatCurrency(result.futureRequiredAmount)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/faiz-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Paranızı faizde değerlendirme getirisini görün &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Tutar, enflasyon oranı ve süreyi girin.</p>
                <p className="text-xs text-muted-foreground mt-1">Paranızın zaman içindeki reel satın alma gücü burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Enflasyon ve Satın Alma Gücü Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Enflasyon, mal ve hizmetlerin genel fiyat düzeyinin zaman içinde sürekli artmasıdır. Enflasyon arttıkça aynı miktardaki parayla daha az ürün satın alınabilir.
        </p>

        <div className="p-5 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground mb-8 space-y-1.5">
          <p className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">
            Enflasyon Formülleri:
          </p>
          <p className="font-semibold">Gelecekteki Eşdeğer Tutar = Tutar &times; (1 + Enflasyon / 100)^Yıl</p>
          <p className="font-semibold">Satın Alma Gücü = Tutar / (1 + Enflasyon / 100)^Yıl</p>
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Kümülatif enflasyon nedir?</h4>
            <p className="text-muted-foreground mt-2">
              Birden fazla yıl boyunca gerçekleşen enflasyon oranlarının birbirini katlayarak oluşturduğu toplam fiyat artışıdır.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Paranın satın alma gücü neden düşer?</h4>
            <p className="text-muted-foreground mt-2">
              Ürün ve hizmet fiyatları yükseldiğinde sabit tutulan nominal para ile alınabilecek sepet miktarı küçülür.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
