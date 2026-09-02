'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function SuFaturasiHesaplama() {
  const [m3Str, setM3Str] = useState<string>('12');
  const [tier1PriceStr, setTier1PriceStr] = useState<string>('28.50'); // 1. Kademe m3 fiyatı (Örn: 0-15 m3)
  const [tier2PriceStr, setTier2PriceStr] = useState<string>('42.00'); // 2. Kademe m3 fiyatı
  const [ctvStr, setCtvStr] = useState<string>('18.00'); // Çevre Temizlik Vergisi
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    waterCost: number;
    wasteWaterCost: number;
    taxCost: number;
    totalBill: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const m3 = parseTurkishNumber(m3Str);
    const p1 = parseTurkishNumber(tier1PriceStr) || 28.5;
    const p2 = parseTurkishNumber(tier2PriceStr) || 42.0;
    const ctv = parseTurkishNumber(ctvStr) || 0;

    if (isNaN(m3) || m3 < 0) {
      setError('Lütfen tüketilen su miktarını m³ olarak girin.');
      return;
    }

    let waterCost = 0;
    if (m3 <= 15) {
      waterCost = m3 * p1;
    } else {
      waterCost = (15 * p1) + ((m3 - 15) * p2);
    }

    // Atık su bedeli genelde su tüketim bedelinin %50'sidir
    const wasteWaterCost = waterCost * 0.5;
    const subtotal = waterCost + wasteWaterCost;
    // %10 KDV + ÇTV
    const taxCost = (subtotal * 0.1) + ctv;
    const totalBill = subtotal + taxCost;

    setResult({
      waterCost: Math.round(waterCost * 100) / 100,
      wasteWaterCost: Math.round(wasteWaterCost * 100) / 100,
      taxCost: Math.round(taxCost * 100) / 100,
      totalBill: Math.round(totalBill * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label htmlFor="m3" className="block text-sm font-medium text-foreground mb-1">Aylık Tüketim (m³)</label>
              <input
                id="m3"
                type="text"
                value={m3Str}
                onChange={(e) => setM3Str(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="p1" className="block text-sm font-medium text-foreground mb-1">1. Kademe m³ Fiyatı (TL)</label>
              <input
                id="p1"
                type="text"
                value={tier1PriceStr}
                onChange={(e) => setTier1PriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="p2" className="block text-sm font-medium text-foreground mb-1">2. Kademe m³ Fiyatı (TL)</label>
              <input
                id="p2"
                type="text"
                value={tier2PriceStr}
                onChange={(e) => setTier2PriceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="ctv" className="block text-sm font-medium text-foreground mb-1">Sabit ÇTV / Bakım (TL)</label>
              <input
                id="ctv"
                type="text"
                value={ctvStr}
                onChange={(e) => setCtvStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Faturayı Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Fatura Dökümü</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Tahmini Fatura</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.totalBill)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Temiz Su Bedeli</span>
                <span className="text-xl font-semibold text-foreground">{formatNumber(result.waterCost)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Atık Su + Vergi & ÇTV</span>
                <span className="text-xl font-semibold text-foreground">{formatNumber(result.wasteWaterCost + result.taxCost)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Kademeli Su Tarifesi:</p>
        <p>Büyükşehir belediyelerinde (İSKİ, ASKİ, İZSU vb.) konut su tüketimleri tasarrufu teşvik amacıyla 15 m³&apos;e kadar 1. kademe, 15 m³ üzeri tüketimlerde ise zamlı 2. kademe tarifesinden fiyatlandırılır.</p>
      </div>
    </div>
  );
}
