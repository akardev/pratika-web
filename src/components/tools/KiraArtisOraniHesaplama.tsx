'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KiraArtisOraniHesaplama() {
  const [currentRentStr, setCurrentRentStr] = useState<string>('20.000'); // Mevcut Kira Bedeli TL
  const [tufeRateStr, setTufeRateStr] = useState<string>('58.45'); // 12 Aylık Ortalamalara Göre TÜFE Oranı %

  const [result, setResult] = useState<{
    currentRent: number;
    tufeRate: number;
    increaseAmount: number;
    newRent: number;
    annualExtraRent: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const currentRent = parseTurkishNumber(currentRentStr);
    const tufeRate = parseTurkishNumber(tufeRateStr);

    if (isNaN(currentRent) || currentRent <= 0) {
      setError('Lütfen mevcut kira tutarını giriniz.');
      return;
    }
    if (isNaN(tufeRate) || tufeRate < 0) {
      setError('Lütfen geçerli bir TÜFE kira artış oranı giriniz.');
      return;
    }

    const increaseAmount = (currentRent * tufeRate) / 100;
    const newRent = currentRent + increaseAmount;
    const annualExtraRent = increaseAmount * 12;

    setResult({
      currentRent,
      tufeRate,
      increaseAmount,
      newRent,
      annualExtraRent,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="currentRent" className="block text-sm font-medium mb-1 text-foreground">
                Mevcut Aylık Kira Bedeli (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="currentRent"
                  placeholder="Örn: 20.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={currentRentStr}
                  onChange={(e) => setCurrentRentStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div>
              <label htmlFor="tufeRate" className="block text-sm font-medium mb-1 text-foreground">
                TÜFE (12 Aylık Ortalama) Artış Oranı (%) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="tufeRate"
                  placeholder="Örn: 58.45"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={tufeRateStr}
                  onChange={(e) => setTufeRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">%</div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                TÜİK tarafından her ayın 3&apos;ünde açıklanan resmi 12 aylık TÜFE ortalamasıdır.
              </p>
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
              Yasal Kira Artışını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Yeni Dönem Kira Tutarı
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Yeni Yasal Kira Bedeli</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.newRent)} / ay
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Aylık Artış: +{formatCurrency(result.increaseAmount)} (%{formatNumber(result.tufeRate, 2)})
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Eski Kira:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.currentRent)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">12 Aylık Yıllık Ek Kira Yükü:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.annualExtraRent)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kira-gelir-vergisi-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Ev sahipleri için kira gelir vergisi hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Mevcut kira ve TÜFE oranını girerek yeni yasal tavan kira bedelini hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kira Artış Oranı Tavanı Yasal Olarak Nasıl Belirlenir?</h2>
        <p className="mb-4 text-muted-foreground">
          Türk Borçlar Kanunu’nun 344. maddesi uyarınca, yenilenen kira dönemlerinde uygulanabilecek azami yasal kira artış oranı, bir önceki kira yılının <strong>TÜFE 12 aylık ortalamalarını</strong> geçemez.
        </p>
      </div>
    </div>
  );
}
