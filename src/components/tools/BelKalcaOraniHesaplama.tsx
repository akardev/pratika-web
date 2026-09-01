'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function BelKalcaOraniHesaplama() {
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [waistStr, setWaistStr] = useState<string>('72'); // Bel cm
  const [hipStr, setHipStr] = useState<string>('96'); // Kalça cm

  const [result, setResult] = useState<{
    ratio: number;
    riskCategory: string;
    bodyShape: string;
    isHealthy: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const waist = parseTurkishNumber(waistStr);
    const hip = parseTurkishNumber(hipStr);

    if (isNaN(waist) || waist <= 30 || isNaN(hip) || hip <= 30) {
      setError('Lütfen geçerli bel ve kalça ölçüleri giriniz.');
      return;
    }

    const ratio = waist / hip;

    let riskCategory = 'Düşük Sağlık Riski (İdeal)';
    let bodyShape = 'Armut Tipi (Sağlıklı Yağ Dağılımı)';
    let isHealthy = true;

    if (gender === 'female') {
      if (ratio <= 0.80) {
        riskCategory = 'Düşük Sağlık Riski (İdeal)';
        bodyShape = 'Armut Tipi (Sağlıklı)';
        isHealthy = true;
      } else if (ratio <= 0.85) {
        riskCategory = 'Orta Sağlık Riski';
        bodyShape = 'Avokado Tipi';
        isHealthy = true;
      } else {
        riskCategory = 'Yüksek Sağlık Riski (Kardiyovasküler Risk)';
        bodyShape = 'Elma Tipi (Karın Bölgesi Yağlanması)';
        isHealthy = false;
      }
    } else {
      // Erkek
      if (ratio <= 0.90) {
        riskCategory = 'Düşük Sağlık Riski (İdeal)';
        bodyShape = 'İdeal / Armut Tipi';
        isHealthy = true;
      } else if (ratio <= 0.95) {
        riskCategory = 'Orta Sağlık Riski';
        bodyShape = 'Hafif Karın Yağlanması';
        isHealthy = true;
      } else {
        riskCategory = 'Yüksek Sağlık Riski (Kardiyovasküler Risk)';
        bodyShape = 'Elma Tipi (Merkezi Yağlanma)';
        isHealthy = false;
      }
    }

    setResult({
      ratio,
      riskCategory,
      bodyShape,
      isHealthy,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Cinsiyet
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    gender === 'female' ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-background border-border'
                  }`}
                >
                  Kadın
                </button>
                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    gender === 'male' ? 'bg-primary text-primary-foreground border-primary shadow-xs' : 'bg-background border-border'
                  }`}
                >
                  Erkek
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="waist" className="block text-xs font-medium mb-1 text-foreground">
                  Bel Çevresi (cm) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="waist"
                  placeholder="Örn: 72"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={waistStr}
                  onChange={(e) => setWaistStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label htmlFor="hip" className="block text-xs font-medium mb-1 text-foreground">
                  Kalça Çevresi (cm) <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="hip"
                  placeholder="Örn: 96"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  value={hipStr}
                  onChange={(e) => setHipStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
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
              Bel / Kalça Oranını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200 text-center">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Bel-Kalça Oranı (WHR)
                </h3>

                <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                  {formatNumber(result.ratio, 2)}
                </span>
                <span className={`text-xs font-semibold mt-2 inline-block px-3 py-1.5 rounded-md border ${
                  result.isHealthy 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                    : 'bg-destructive/10 text-destructive border-destructive/20'
                }`}>
                  {result.riskCategory}
                </span>

                <div className="border-t border-border/60 pt-3 mt-4 text-xs text-muted-foreground">
                  Vücut Tipi: <strong className="text-foreground font-semibold">{result.bodyShape}</strong>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/bmi-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Vücut kitle indeksi (VKİ) hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Bel ve kalça ölçülerinizi girerek kardiyovasküler sağlık riskinizi öğrenin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Bel-Kalça Oranı (WHR) Neden Önemlidir?</h2>
        <p className="mb-4 text-muted-foreground">
          Dünya Sağlık Örgütü&apos;ne göre bel-kalça oranı, vücut kitle indeksinden daha hassas bir kalp ve damar hastalığı göstergesidir. Kadınlarda 0.85, erkeklerde 0.90 üzeri oranlar karın içi (viseral) yağlanmayı işaret eder.
        </p>
      </div>
    </div>
  );
}
