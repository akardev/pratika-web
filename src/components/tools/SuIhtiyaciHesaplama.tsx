'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function SuIhtiyaciHesaplama() {
  const [weightStr, setWeightStr] = useState<string>('70');
  const [activity, setActivity] = useState<string>('moderate');

  const [result, setResult] = useState<{ liters: number; glasses: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!weightStr.trim()) {
      setError('Lütfen kilonuzu girin.');
      return;
    }

    const weight = parseTurkishNumber(weightStr);
    if (isNaN(weight) || weight < 20 || weight > 300) {
      setError('Lütfen geçerli bir kilo girin (20 - 300 kg).');
      return;
    }

    let mlPerKg = 35;
    if (activity === 'low') mlPerKg = 30;
    else if (activity === 'high') mlPerKg = 40;

    const totalMl = weight * mlPerKg;
    const liters = totalMl / 1000;
    const glasses = Math.round(totalMl / 200);

    setResult({ liters, glasses });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="w" className="block text-sm font-medium mb-2 text-foreground">
                Vücut Ağırlığı (kg) <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="w"
                placeholder="Örn: 70"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                value={weightStr}
                onChange={(e) => setWeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
              />
            </div>

            <div>
              <label htmlFor="act" className="block text-sm font-medium mb-2 text-foreground">
                Günlük Aktivite Düzeyi
              </label>
              <select
                id="act"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
              >
                <option value="low">Düşük / Masa Başı (Günde 30 ml/kg)</option>
                <option value="moderate">Orta Düzey / Günlük Hareket (Günde 35 ml/kg)</option>
                <option value="high">Yüksek / Yoğun Spor ve Egzersiz (Günde 40 ml/kg)</option>
              </select>
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
              Günlük Su İhtiyacını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Günlük Önerilen Su Miktarı</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatNumber(result.liters)} Litre
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Yaklaşık <strong>{result.glasses} Su Bardağı</strong> (200 ml)
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Kilonuzu girip günlük su ihtiyacınızı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
