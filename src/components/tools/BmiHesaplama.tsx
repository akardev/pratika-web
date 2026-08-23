'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber } from '@/lib/utils';

export default function BmiHesaplama() {
  const [heightStr, setHeightStr] = useState<string>('175');
  const [weightStr, setWeightStr] = useState<string>('70');

  const [result, setResult] = useState<{
    bmi: number;
    category: string;
    categoryColor: string;
    idealMin: number;
    idealMax: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!heightStr.trim() || !weightStr.trim()) {
      setError('Lütfen boy ve kilo alanlarını doldurun.');
      return;
    }

    const height = parseTurkishNumber(heightStr);
    const weight = parseTurkishNumber(weightStr);

    if (isNaN(height) || height < 50 || height > 260) {
      setError('Lütfen geçerli bir boy girin (50 - 260 cm).');
      return;
    }

    if (isNaN(weight) || weight < 20 || weight > 400) {
      setError('Lütfen geçerli bir kilo girin (20 - 400 kg).');
      return;
    }

    const hMeters = height / 100;
    const bmi = weight / (hMeters * hMeters);

    let category = 'Normal Kilolu';
    let categoryColor = 'text-green-600 bg-green-500/10 border-green-500/20';

    if (bmi < 18.5) {
      category = 'Zayıf';
      categoryColor = 'text-amber-600 bg-amber-500/10 border-amber-500/20';
    } else if (bmi < 25) {
      category = 'Normal Kilolu';
      categoryColor = 'text-green-600 bg-green-500/10 border-green-500/20';
    } else if (bmi < 30) {
      category = 'Fazla Kilolu';
      categoryColor = 'text-amber-600 bg-amber-500/10 border-amber-500/20';
    } else if (bmi < 35) {
      category = '1. Derece Obez';
      categoryColor = 'text-red-600 bg-red-500/10 border-red-500/20';
    } else {
      category = '2. Derece / İleri Düzey Obez';
      categoryColor = 'text-red-700 bg-red-600/10 border-red-600/20';
    }

    const idealMin = 18.5 * (hMeters * hMeters);
    const idealMax = 24.9 * (hMeters * hMeters);

    setResult({
      bmi,
      category,
      categoryColor,
      idealMin,
      idealMax,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="height" className="block text-sm font-medium mb-2 text-foreground">
                Boy (cm) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="height"
                  placeholder="Örn: 175"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  value={heightStr}
                  onChange={(e) => setHeightStr(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  cm
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="weight" className="block text-sm font-medium mb-2 text-foreground">
                Kilo (kg) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="weight"
                  placeholder="Örn: 70"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  value={weightStr}
                  onChange={(e) => setWeightStr(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  kg
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
              Vücut Kitle İndeksini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Vücut Kitle İndeksi (BMI)</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatNumber(result.bmi)}
                  </span>
                  <span className={`text-xs font-semibold mt-1 px-2.5 py-1 rounded-md border ${result.categoryColor}`}>
                    {result.category}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Boyunuza Göre İdeal Kilo Aralığı:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.idealMin)} - {formatNumber(result.idealMax)} kg</span>
                  </div>
                </div>

                <p className="mt-4 pt-3 border-t border-border/60 text-xs text-muted-foreground text-center">
                  * Bu hesaplama yalnızca bilgilendirme amaçlıdır; tıbbi teşhis ve tedavi tavsiyesi yerine geçmez.
                </p>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Boy ve kilonuzu girip vücut kitle indeksinizi hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
