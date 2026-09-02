'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function ElektrikFaturasiHesaplama() {
  const [kwhStr, setKwhStr] = useState<string>('280'); // Aylık toplam tüketim kWh
  
  const [result, setResult] = useState<{
    totalKwh: number;
    tier1Kwh: number; // 240 kWh&apos;e kadar
    tier2Kwh: number; // 240 kWh üzeri
    tier1Cost: number;
    tier2Cost: number;
    energyTotal: number;
    vatAmount: number; // KDV %10 (Mesken)
    finalBillAmount: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const totalKwh = parseTurkishNumber(kwhStr);
    if (isNaN(totalKwh) || totalKwh <= 0) {
      setError('Lütfen geçerli bir kWh tüketim miktarı giriniz.');
      return;
    }

    // EPDK Mesken Kademeli Tarife (Referans yaklaşık birim fiyatlar vergi dahil)
    // 1. Kademe (Aylık 240 kWh'e kadar): ~2.07 TL/kWh
    // 2. Kademe (240 kWh üzeri): ~3.11 TL/kWh
    const tier1Limit = 240;
    const tier1Kwh = Math.min(totalKwh, tier1Limit);
    const tier2Kwh = Math.max(0, totalKwh - tier1Limit);

    const tier1UnitPrice = 2.07;
    const tier2UnitPrice = 3.11;

    const tier1Cost = tier1Kwh * tier1UnitPrice;
    const tier2Cost = tier2Kwh * tier2UnitPrice;
    const finalBillAmount = tier1Cost + tier2Cost;
    const vatAmount = finalBillAmount * (10 / 110);
    const energyTotal = finalBillAmount - vatAmount;

    setResult({
      totalKwh,
      tier1Kwh,
      tier2Kwh,
      tier1Cost,
      tier2Cost,
      energyTotal,
      vatAmount,
      finalBillAmount,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="kwh" className="block text-sm font-medium mb-1 text-foreground">
                Aylık Elektrik Tüketimi (kWh) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="kwh"
                  placeholder="Örn: 280"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-16 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={kwhStr}
                  onChange={(e) => setKwhStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">kWh</div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Faturanızdaki &quot;Toplam Tüketim (kWh)&quot; değerini giriniz.
              </p>
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {['150', '220', '280', '350', '450'].map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKwhStr(k)}
                  className="px-2 py-1 text-xs font-medium rounded bg-muted hover:bg-muted/80 text-foreground border border-border/50"
                >
                  {k} kWh
                </button>
              ))}
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
              Fatura Tutarını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200 text-center">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Tahmini Elektrik Faturası
                </h3>

                <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                  {formatCurrency(result.finalBillAmount)}
                </span>
                <span className="text-xs font-semibold text-foreground mt-2 inline-block bg-background px-3 py-1.5 rounded-md border border-border/80">
                  KDV Dahil Toplam Ödenecek Tutar
                </span>

                <div className="border-t border-border/60 pt-3 mt-4 space-y-1.5 text-xs sm:text-sm text-left">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">1. Kademe ({result.tier1Kwh} kWh):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.tier1Cost)}</span>
                  </div>
                  {result.tier2Kwh > 0 && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-muted-foreground">2. Kademe Üst Tüketim ({result.tier2Kwh} kWh):</span>
                      <span className="font-semibold text-destructive">{formatCurrency(result.tier2Cost)}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">KDV Payı (%10):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.vatAmount)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/dogalgaz-tuketim-maliyeti-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Doğalgaz tüketim maliyetini hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Aylık kWh elektrik tüketiminizi girerek kademeli tarife faturanızı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kademeli Elektrik Tarifesi Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          EPDK mesken tarifesinde günlük 8 kWh (aylık 240 kWh) tüketim alt kademe olarak düşük fiyattan faturalandırılır. Bu sınırı aşan kWh tüketimleri ise yüksek kademe birim fiyatından hesaplanır.
        </p>
      </div>
    </div>
  );
}
