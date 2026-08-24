'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function BirimFiyatKarsilastirma() {
  const [unitType, setUnitType] = useState<'gram' | 'kg' | 'ml' | 'litre' | 'adet'>('gram');

  // Ürün A (Örn: 400g - 65 TL)
  const [priceAStr, setPriceAStr] = useState<string>('65');
  const [amountAStr, setAmountAStr] = useState<string>('400');

  // Ürün B (Örn: 900g - 130 TL)
  const [priceBStr, setPriceBStr] = useState<string>('130');
  const [amountBStr, setAmountBStr] = useState<string>('900');

  const [result, setResult] = useState<{
    unitPriceA: number;
    unitPriceB: number;
    cheaperOption: 'A' | 'B' | 'equal';
    savingsPercentage: number;
    standardUnitLabel: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const priceA = parseTurkishNumber(priceAStr);
    const amountA = parseTurkishNumber(amountAStr);
    const priceB = parseTurkishNumber(priceBStr);
    const amountB = parseTurkishNumber(amountBStr);

    if (isNaN(priceA) || priceA <= 0 || isNaN(amountA) || amountA <= 0) {
      setError('Lütfen 1. Ürün için geçerli fiyat ve miktar giriniz.');
      return;
    }
    if (isNaN(priceB) || priceB <= 0 || isNaN(amountB) || amountB <= 0) {
      setError('Lütfen 2. Ürün için geçerli fiyat ve miktar giriniz.');
      return;
    }

    // Birim başına fiyat (1 birim)
    const unitPriceA = priceA / amountA;
    const unitPriceB = priceB / amountB;

    let cheaperOption: 'A' | 'B' | 'equal' = 'equal';
    let savingsPercentage = 0;

    if (Math.abs(unitPriceA - unitPriceB) < 0.0001) {
      cheaperOption = 'equal';
    } else if (unitPriceA < unitPriceB) {
      cheaperOption = 'A';
      savingsPercentage = ((unitPriceB - unitPriceA) / unitPriceB) * 100;
    } else {
      cheaperOption = 'B';
      savingsPercentage = ((unitPriceA - unitPriceB) / unitPriceA) * 100;
    }

    let standardUnitLabel = '1 Birim';
    if (unitType === 'gram') standardUnitLabel = '100 Gram';
    else if (unitType === 'kg') standardUnitLabel = '1 Kilogram';
    else if (unitType === 'ml') standardUnitLabel = '100 ml';
    else if (unitType === 'litre') standardUnitLabel = '1 Litre';
    else if (unitType === 'adet') standardUnitLabel = '1 Adet';

    // Standart gösterim katsayısı (örn: gram için 100g fiyatı)
    const multiplier = (unitType === 'gram' || unitType === 'ml') ? 100 : 1;

    setResult({
      unitPriceA: unitPriceA * multiplier,
      unitPriceB: unitPriceB * multiplier,
      cheaperOption,
      savingsPercentage,
      standardUnitLabel,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Ölçü Birimi
              </label>
              <div className="flex gap-2 flex-wrap">
                {(['gram', 'kg', 'ml', 'litre', 'adet'] as const).map((u) => (
                  <button
                    key={u}
                    type="button"
                    onClick={() => setUnitType(u)}
                    className={`py-1.5 px-3 text-xs font-semibold rounded-lg border capitalize transition-all ${
                      unitType === u
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-background text-foreground border-border'
                    }`}
                  >
                    {u}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg border border-border/60 space-y-2">
              <span className="text-xs font-bold text-foreground">1. Ürün (Paket A)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Fiyat (TL)"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={priceAStr}
                    onChange={(e) => setPriceAStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder={`Miktar (${unitType})`}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={amountAStr}
                    onChange={(e) => setAmountAStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                </div>
              </div>
            </div>

            <div className="p-3 bg-muted/30 rounded-lg border border-border/60 space-y-2">
              <span className="text-xs font-bold text-foreground">2. Ürün (Paket B)</span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Fiyat (TL)"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={priceBStr}
                    onChange={(e) => setPriceBStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder={`Miktar (${unitType})`}
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={amountBStr}
                    onChange={(e) => setAmountBStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
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
              Birim Fiyatları Karşılaştır
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Karşılaştırma Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Daha Ekonomik Seçenek</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-emerald-600 dark:text-emerald-400 tracking-tight">
                    {result.cheaperOption === 'equal' ? 'İki Ürün Eşit Fiyatta' : `${result.cheaperOption === 'A' ? '1. Ürün (Paket A)' : '2. Ürün (Paket B)'}`}
                  </span>
                  {result.cheaperOption !== 'equal' && (
                    <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                      %{formatNumber(result.savingsPercentage, 1)} Daha Avantajlı
                    </span>
                  )}
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">1. Ürün ({result.standardUnitLabel} Fiyatı):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.unitPriceA)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">2. Ürün ({result.standardUnitLabel} Fiyatı):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.unitPriceB)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/indirim-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    İndirim ve iskonto hesaplama aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">İki farklı paketin fiyat ve gramajlarını girerek hangisinin ucuz olduğunu bulun.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Marketlerde Birim Fiyat Karşılaştırması Neden Önemlidir?</h2>
        <p className="mb-4 text-muted-foreground">
          Büyük boy veya aile boyu paketler her zaman daha ucuz olmayabilir. Ürünlerin 100g, 1kg veya 1 litre başına düşen birim fiyatlarını hesaplamak en doğru tasarrufu yapmanızı sağlar.
        </p>
      </div>
    </div>
  );
}
