'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function DogalgazTuketimMaliyetiHesaplama() {
  const [m3Str, setM3Str] = useState<string>('180'); // Tüketilen m³
  const [unitPriceStr, setUnitPriceStr] = useState<string>('8.50'); // m³ Birim Fiyatı TL (Vergiler dahil ortalama ~7.5-9.5 TL)

  const [result, setResult] = useState<{
    m3: number;
    kwhEquivalent: number; // 1 m³ ≈ 10.64 kWh enerji
    totalCost: number;
    vatAmount: number; // KDV %20
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const m3 = parseTurkishNumber(m3Str);
    const unitPrice = parseTurkishNumber(unitPriceStr);

    if (isNaN(m3) || m3 <= 0) {
      setError('Lütfen geçerli bir doğalgaz m³ tüketimi giriniz.');
      return;
    }
    if (isNaN(unitPrice) || unitPrice <= 0) {
      setError('Lütfen geçerli bir birim fiyat giriniz.');
      return;
    }

    const totalCost = m3 * unitPrice;
    const kwhEquivalent = m3 * 10.64;
    const vatAmount = totalCost * (20 / 120);

    setResult({
      m3,
      kwhEquivalent,
      totalCost,
      vatAmount,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="m3Input" className="block text-sm font-medium mb-1 text-foreground">
                Tüketilen Doğalgaz Miktarı (m³) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="m3Input"
                  placeholder="Örn: 180"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-16 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={m3Str}
                  onChange={(e) => setM3Str(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">m³</div>
              </div>
            </div>

            <div>
              <label htmlFor="unitPrice" className="block text-sm font-medium mb-1 text-foreground">
                m³ Birim Fiyatı (TL)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="unitPrice"
                  placeholder="8.50"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-12 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={unitPriceStr}
                  onChange={(e) => setUnitPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">TL/m³</div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">Şehir ve dağıtım şirketine göre ortalama 7.50 - 9.50 TL aralığındadır.</p>
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
              Doğalgaz Faturasını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200 text-center">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Tahmini Doğalgaz Faturası
                </h3>

                <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                  {formatCurrency(result.totalCost)}
                </span>
                <span className="text-xs font-semibold text-foreground mt-2 inline-block bg-background px-3 py-1.5 rounded-md border border-border/80">
                  {result.m3} m³ Tüketim Karşılığı
                </span>

                <div className="border-t border-border/60 pt-3 mt-4 space-y-1.5 text-xs sm:text-sm text-left">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Eşdeğer Enerji Değeri:</span>
                    <span className="font-semibold text-foreground font-mono">{formatNumber(result.kwhEquivalent, 1)} kWh</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">KDV Payı (%20):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.vatAmount)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/elektrik-faturasi-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Elektrik faturası hesaplama aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Doğalgaz tüketim miktarınızı (m³) girerek fatura tutarınızı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Doğalgaz Faturası Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Doğalgaz sayaçlarından okunan metreküp (m³) hacmi, standart üst ısıl değer (yaklaşık 10.64 kWh/m³) ve düzeltme katsayısıyla çarpılarak enerji miktarına dönüştürülür ve birim fiyat üzerinden faturalandırılır.
        </p>
      </div>
    </div>
  );
}
