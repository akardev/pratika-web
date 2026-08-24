'use client';

import { useState } from 'react';
import Link from 'next/link';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function HarfNotuHesaplama() {
  const [scoreStr, setScoreStr] = useState<string>('78');

  const [result, setResult] = useState<{
    score: number;
    letterGrade: string;
    coefficient: number;
    description: string;
    isPassed: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const score = parseTurkishNumber(scoreStr);
    if (isNaN(score) || score < 0 || score > 100) {
      setError('Lütfen 0 ile 100 arasında geçerli bir not giriniz.');
      return;
    }

    let letterGrade = 'FF';
    let coefficient = 0.0;
    let description = 'Başarısız (Kaldı)';
    let isPassed = false;

    if (score >= 90) { letterGrade = 'AA'; coefficient = 4.0; description = 'Mükemmel / Pekiyi'; isPassed = true; }
    else if (score >= 85) { letterGrade = 'BA'; coefficient = 3.5; description = 'Çok İyi'; isPassed = true; }
    else if (score >= 80) { letterGrade = 'BB'; coefficient = 3.0; description = 'İyi'; isPassed = true; }
    else if (score >= 70) { letterGrade = 'CB'; coefficient = 2.5; description = 'Orta Üstü'; isPassed = true; }
    else if (score >= 60) { letterGrade = 'CC'; coefficient = 2.0; description = 'Orta / Başarılı'; isPassed = true; }
    else if (score >= 55) { letterGrade = 'DC'; coefficient = 1.5; description = 'Koşullu Başarılı'; isPassed = true; }
    else if (score >= 50) { letterGrade = 'DD'; coefficient = 1.0; description = 'Koşullu Başarılı'; isPassed = true; }
    else if (score >= 40) { letterGrade = 'FD'; coefficient = 0.5; description = 'Başarısız'; isPassed = false; }
    else { letterGrade = 'FF'; coefficient = 0.0; description = 'Başarısız (Kaldı)'; isPassed = false; }

    setResult({
      score,
      letterGrade,
      coefficient,
      description,
      isPassed,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="score" className="block text-sm font-medium mb-1 text-foreground">
                100&apos;lük Sistem Notunuz <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="score"
                  placeholder="Örn: 78"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={scoreStr}
                  onChange={(e) => setScoreStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">/ 100</div>
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
              Harf Notunu Bul
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Harf Notu ve Katsayı
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Harf Notu Karşılığı</span>
                  <span className="font-extrabold text-5xl text-primary tracking-tight">
                    {result.letterGrade}
                  </span>
                  <span className={`text-xs font-semibold mt-2 px-2.5 py-1 rounded-md border ${
                    result.isPassed 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                      : 'bg-destructive/10 text-destructive border-destructive/20'
                  }`}>
                    {result.description} (Katsayı: {result.coefficient.toFixed(1)})
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/gpa-gano-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Dönemlik genel not ortalamanızı (GANO) hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">100 üzerinden notunuzu girerek harf notunu ve katsayısını öğrenin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Standart Üniversite Harf Notu Sistemi</h2>
        <p className="mb-4 text-muted-foreground">
          Üniversitelerde uygulanan mutlak not sisteminde 90-100 AA (4.0), 85-89 BA (3.5), 80-84 BB (3.0), 70-79 CB (2.5), 60-69 CC (2.0), 55-59 DC (1.5), 50-54 DD (1.0) ve 0-49 FF (0.0) olarak kabul edilir.
        </p>
      </div>
    </div>
  );
}
