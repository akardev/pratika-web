'use client';

import { useState } from 'react';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function AmortismanHesaplama() {
  const [assetCostStr, setAssetCostStr] = useState<string>('200.000'); // Varlık Alış Maliyeti TL
  const [usefulLifeStr, setUsefulLifeStr] = useState<string>('5'); // Faydalı Ömür (Yıl)
  const [method, setMethod] = useState<'normal' | 'declining'>('normal');

  const [result, setResult] = useState<{
    assetCost: number;
    usefulLife: number;
    annualDepreciationRate: number;
    schedule: { year: number; depreciationAmount: number; accumulatedDepreciation: number; netBookValue: number }[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const cost = parseTurkishNumber(assetCostStr);
    const life = parseTurkishNumber(usefulLifeStr);

    if (isNaN(cost) || cost <= 0) {
      setError('Lütfen geçerli bir varlık maliyeti giriniz.');
      return;
    }
    if (isNaN(life) || life < 1 || life > 50) {
      setError('Faydalı ömür 1 ile 50 yıl arasında olmalıdır.');
      return;
    }

    const normalRate = (1 / life) * 100;
    const decliningRate = Math.min(50, normalRate * 2); // VUK gereği en çok %50 olabilir
    const schedule: { year: number; depreciationAmount: number; accumulatedDepreciation: number; netBookValue: number }[] = [];

    let currentBookValue = cost;
    let accumulated = 0;

    for (let y = 1; y <= life; y++) {
      let depAmount = 0;
      if (method === 'normal') {
        depAmount = cost / life;
      } else {
        // Azalan bakiyeler: Son yıl kalan defter değerinin tamamı amorti edilir
        if (y === life) {
          depAmount = currentBookValue;
        } else {
          depAmount = currentBookValue * (decliningRate / 100);
        }
      }

      depAmount = Math.min(depAmount, currentBookValue);
      accumulated += depAmount;
      currentBookValue -= depAmount;

      schedule.push({
        year: y,
        depreciationAmount: depAmount,
        accumulatedDepreciation: accumulated,
        netBookValue: Math.max(0, currentBookValue),
      });
    }

    setResult({
      assetCost: cost,
      usefulLife: life,
      annualDepreciationRate: method === 'normal' ? normalRate : decliningRate,
      schedule,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="cost" className="block text-sm font-medium mb-1 text-foreground">
                İktisadi Kıymet / Varlık Alış Bedeli (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="cost"
                  placeholder="Örn: 200.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={assetCostStr}
                  onChange={(e) => setAssetCostStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div>
              <label htmlFor="usefulLife" className="block text-sm font-medium mb-1 text-foreground">
                Faydalı Ömür (Yıl) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  id="usefulLife"
                  placeholder="Örn: 5"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={usefulLifeStr}
                  onChange={(e) => setUsefulLifeStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">Yıl</div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-foreground">
                Amortisman Yöntemi
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setMethod('normal')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    method === 'normal'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Normal (Eşit Tutarlı)
                </button>
                <button
                  type="button"
                  onClick={() => setMethod('declining')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    method === 'declining'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Azalan Bakiyeler (Hızlandırılmış)
                </button>
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
              Amortisman Tablosunu Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Amortisman Özeti
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">1. Yıl Amortisman Gideri</span>
                  <span className="font-extrabold text-3xl text-primary tracking-tight">
                    {formatCurrency(result.schedule[0].depreciationAmount)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Yıllık Oran: %{formatNumber(result.annualDepreciationRate, 1)} ({method === 'normal' ? 'Normal' : 'Azalan'})
                  </span>
                </div>

                <div className="max-h-48 overflow-y-auto border-t border-border/60 pt-2 space-y-1.5 text-xs">
                  {result.schedule.map((row) => (
                    <div key={row.year} className="flex justify-between items-center py-1 border-b border-border/40 last:border-0">
                      <span className="font-medium text-foreground">{row.year}. Yıl Gideri:</span>
                      <div className="text-right">
                        <span className="font-semibold text-foreground">{formatCurrency(row.depreciationAmount)}</span>
                        <span className="text-[10px] text-muted-foreground ml-2">(Kalan: {formatCurrency(row.netBookValue)})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Varlık maliyeti ve faydalı ömrünü girerek yıllık amortisman tablosunu oluşturun.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Amortisman Yöntemleri Nelerdir?</h2>
        <p className="mb-4 text-muted-foreground">
          Vergi Usul Kanunu&apos;na (VUK) göre duran varlıklar için normal (eşit paylı) amortisman veya normal oranın 2 katı olan (azami %50) azalan bakiyeler yöntemi uygulanabilir.
        </p>
      </div>
    </div>
  );
}
