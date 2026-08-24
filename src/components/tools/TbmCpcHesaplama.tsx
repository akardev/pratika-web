'use client';

import { useState } from 'react';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function TbmCpcHesaplama() {
  const [totalSpendStr, setTotalSpendStr] = useState<string>('5.000'); // Harcama TL
  const [impressionsStr, setImpressionsStr] = useState<string>('100.000'); // Gösterim
  const [clicksStr, setClicksStr] = useState<string>('2.500'); // Tıklama
  const [conversionsStr, setConversionsStr] = useState<string>('125'); // Dönüşüm / Satış

  const [result, setResult] = useState<{
    cpc: number; // TBM
    ctr: number; // TO %
    cpm: number; // BGBM
    cpa: number; // CPA (Edinme Başı Maliyet)
    conversionRate: number; // Dönüşüm Oranı %
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const spend = parseTurkishNumber(totalSpendStr);
    const impressions = parseTurkishNumber(impressionsStr);
    const clicks = parseTurkishNumber(clicksStr);
    const conversions = parseTurkishNumber(conversionsStr) || 0;

    if (isNaN(spend) || spend <= 0) {
      setError('Lütfen geçerli bir reklam harcaması giriniz.');
      return;
    }

    if (isNaN(clicks) || clicks <= 0) {
      setError('Lütfen geçerli bir tıklama sayısı giriniz.');
      return;
    }

    if (isNaN(impressions) || impressions <= 0) {
      setError('Lütfen geçerli bir gösterim sayısı giriniz.');
      return;
    }

    const cpc = spend / clicks;
    const ctr = (clicks / impressions) * 100;
    const cpm = (spend / impressions) * 1000;
    const cpa = conversions > 0 ? spend / conversions : 0;
    const conversionRate = conversions > 0 ? (conversions / clicks) * 100 : 0;

    setResult({
      cpc,
      ctr,
      cpm,
      cpa,
      conversionRate,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <form onSubmit={handleCalculate} noValidate className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="spend" className="block text-xs font-medium text-foreground mb-1.5">
                Toplam Reklam Bütçesi / Harcama (TL)
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="spend"
                placeholder="Örn: 5.000"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                value={totalSpendStr}
                onChange={(e) => setTotalSpendStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
              />
            </div>

            <div>
              <label htmlFor="impressions" className="block text-xs font-medium text-foreground mb-1.5">
                Gösterim Sayısı (Impressions)
              </label>
              <input
                type="text"
                inputMode="numeric"
                id="impressions"
                placeholder="Örn: 100.000"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                value={impressionsStr}
                onChange={(e) => setImpressionsStr(sanitizeNumericInput(e.target.value))}
              />
            </div>

            <div>
              <label htmlFor="clicks" className="block text-xs font-medium text-foreground mb-1.5">
                Tıklama Sayısı (Clicks)
              </label>
              <input
                type="text"
                inputMode="numeric"
                id="clicks"
                placeholder="Örn: 2.500"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                value={clicksStr}
                onChange={(e) => setClicksStr(sanitizeNumericInput(e.target.value))}
              />
            </div>

            <div>
              <label htmlFor="conversions" className="block text-xs font-medium text-foreground mb-1.5">
                Dönüşüm / Satış Sayısı (Opsiyonel)
              </label>
              <input
                type="text"
                inputMode="numeric"
                id="conversions"
                placeholder="Örn: 125"
                className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                value={conversionsStr}
                onChange={(e) => setConversionsStr(sanitizeNumericInput(e.target.value))}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-primary-foreground text-sm font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all"
          >
            TBM, TO ve Reklam Metriklerini Hesapla
          </button>
        </form>

        {error && (
          <div className="mt-4 p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
            {error}
          </div>
        )}

        {result && (
          <div className="mt-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 bg-muted/20 rounded-xl border border-border text-center">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1">
                Ortalama Tıklama Başı Maliyet (TBM / CPC)
              </span>
              <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight">
                {formatCurrency(result.cpc)}
              </span>
              <span className="text-xs text-muted-foreground block mt-2">
                Tıklama Başına Düşen Reklam Maliyeti
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-background rounded-lg border border-border text-center">
                <span className="text-xs text-muted-foreground block">Tıklama Oranı (TO/CTR)</span>
                <span className="text-base font-bold text-foreground">%{formatNumber(result.ctr, 2)}</span>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border text-center">
                <span className="text-xs text-muted-foreground block">Bin Gösterim (BGBM/CPM)</span>
                <span className="text-base font-bold text-foreground">{formatCurrency(result.cpm)}</span>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border text-center">
                <span className="text-xs text-muted-foreground block">Edinme Maliyeti (CPA)</span>
                <span className="text-base font-bold text-foreground">
                  {result.cpa > 0 ? formatCurrency(result.cpa) : '-'}
                </span>
              </div>
              <div className="p-3 bg-background rounded-lg border border-border text-center">
                <span className="text-xs text-muted-foreground block">Dönüşüm Oranı (CR)</span>
                <span className="text-base font-bold text-foreground">
                  {result.conversionRate > 0 ? `%${formatNumber(result.conversionRate, 2)}` : '-'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">TBM ve CTR Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          Tıklama Başına Maliyet (TBM / CPC), Google Ads ve Meta Ads reklamlarında bir kullanıcının reklamınıza tıklaması karşılığında ödediğiniz tutardır. Tıklama Oranı (CTR) ise reklamınızın ne kadar ilgi çekici olduğunu gösterir.
        </p>
      </div>
    </div>
  );
}
