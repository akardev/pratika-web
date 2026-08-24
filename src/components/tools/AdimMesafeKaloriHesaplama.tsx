'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function AdimMesafeKaloriHesaplama() {
  const [stepsStr, setStepsStr] = useState<string>('10.000');
  const [weightStr, setWeightStr] = useState<string>('70');
  const [heightStr, setHeightStr] = useState<string>('175');
  const [pace, setPace] = useState<'slow' | 'normal' | 'brisk'>('normal'); // Yavaş, normal, tempolu

  const [result, setResult] = useState<{
    steps: number;
    distanceKm: number;
    burnedCalories: number;
    strideLengthCm: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const steps = parseTurkishNumber(stepsStr);
    const weight = parseTurkishNumber(weightStr);
    const height = parseTurkishNumber(heightStr);

    if (isNaN(steps) || steps <= 0) {
      setError('Lütfen geçerli bir adım sayısı giriniz.');
      return;
    }
    if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0) {
      setError('Lütfen boy ve kilo değerlerini giriniz.');
      return;
    }

    // Ortalama adım uzunluğu (cm) = Boy * 0.415
    const strideLengthCm = height * 0.415;
    const distanceKm = (steps * strideLengthCm) / 100000;

    // Yakılan kalori MET katsayısı: Yavaş=0.035, Normal=0.045, Tempolu=0.055 kcal/adım/kg (veya km başına ~0.75 * kg)
    let metFactor = 0.04;
    if (pace === 'slow') metFactor = 0.032;
    if (pace === 'brisk') metFactor = 0.05;

    const burnedCalories = distanceKm * weight * 0.75 * (metFactor / 0.04);

    setResult({
      steps,
      distanceKm,
      burnedCalories,
      strideLengthCm,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="steps" className="block text-sm font-medium mb-1 text-foreground">
                Adım Sayısı <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  id="steps"
                  placeholder="Örn: 10.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-16 text-foreground font-mono text-base focus:outline-none focus:ring-2 focus:ring-primary"
                  value={stepsStr}
                  onChange={(e) => setStepsStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">Adım</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="height" className="block text-xs font-medium mb-1 text-foreground">Boy (cm)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="height"
                  placeholder="175"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground font-mono text-sm"
                  value={heightStr}
                  onChange={(e) => setHeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label htmlFor="weight" className="block text-xs font-medium mb-1 text-foreground">Kilo (kg)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="weight"
                  placeholder="70"
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground font-mono text-sm"
                  value={weightStr}
                  onChange={(e) => setWeightStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-foreground">Yürüyüş Temposu</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPace('slow')}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    pace === 'slow' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                  }`}
                >
                  Yavaş Gezinti
                </button>
                <button
                  type="button"
                  onClick={() => setPace('normal')}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    pace === 'normal' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                  }`}
                >
                  Normal Tempo
                </button>
                <button
                  type="button"
                  onClick={() => setPace('brisk')}
                  className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                    pace === 'brisk' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                  }`}
                >
                  Hızlı / Tempolu
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
              Mesafe ve Kaloriyi Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200 text-center">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Yürüyüş Performansı
                </h3>

                <div className="grid grid-cols-2 gap-3 mb-4 text-center">
                  <div className="p-3 bg-background rounded-lg border border-border/60">
                    <span className="text-xs text-muted-foreground block mb-0.5">Katedilen Mesafe</span>
                    <span className="font-extrabold text-2xl text-primary font-mono">{formatNumber(result.distanceKm, 2)} km</span>
                  </div>
                  <div className="p-3 bg-background rounded-lg border border-border/60">
                    <span className="text-xs text-muted-foreground block mb-0.5">Yakılan Kalori</span>
                    <span className="font-extrabold text-2xl text-emerald-600 dark:text-emerald-400 font-mono">
                      {Math.round(result.burnedCalories)} kcal
                    </span>
                  </div>
                </div>

                <div className="border-t border-border/60 pt-3 text-xs text-muted-foreground">
                  Ortalama Adım Uzunluğunuz: <strong className="text-foreground font-semibold font-mono">{formatNumber(result.strideLengthCm, 1)} cm</strong>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/gunluk-kalori-ihtiyaci-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Günlük TDEE kalori ihtiyacınıza bakın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Adım sayınızı girerek yürüdüğünüz mesafeyi ve yaktığınız kaloriyi öğrenin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Adım Sayısı Mesafeye ve Kaloriye Nasıl Çevrilir?</h2>
        <p className="mb-4 text-muted-foreground">
          Bir insanın ortalama adım boyu boyunun yaklaşık %41.5&apos;idir. Yakılan kalori ise katedilen mesafe, vücut ağırlığı ve yürüme hızına göre hesaplanır. Günde 10.000 adım ortalama 7-8 km mesafeye ve 350-500 kaloriye denk gelir.
        </p>
      </div>
    </div>
  );
}
