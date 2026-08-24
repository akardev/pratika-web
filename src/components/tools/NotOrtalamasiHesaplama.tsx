'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function NotOrtalamasiHesaplama() {
  const [exam1Str, setExam1Str] = useState<string>('75');
  const [exam2Str, setExam2Str] = useState<string>('85');
  const [performanceStr, setPerformanceStr] = useState<string>('90');
  const [projectStr, setProjectStr] = useState<string>('');

  const [result, setResult] = useState<{
    average: number;
    letterGrade: string;
    statusText: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const scores: number[] = [];
    [exam1Str, exam2Str, performanceStr, projectStr].forEach((str) => {
      if (str.trim()) {
        const val = parseTurkishNumber(str);
        if (!isNaN(val) && val >= 0 && val <= 100) {
          scores.push(val);
        }
      }
    });

    if (scores.length === 0) {
      setError('Lütfen en az bir geçerli not (0-100) giriniz.');
      return;
    }

    const sum = scores.reduce((acc, curr) => acc + curr, 0);
    const average = sum / scores.length;

    let letterGrade = 'FF';
    let statusText = 'Başarısız';

    if (average >= 90) { letterGrade = 'AA (5)'; statusText = 'Pekiyi'; }
    else if (average >= 85) { letterGrade = 'BA (5)'; statusText = 'Pekiyi'; }
    else if (average >= 70) { letterGrade = 'BB (4)'; statusText = 'İyi'; }
    else if (average >= 60) { letterGrade = 'CB (3)'; statusText = 'Orta'; }
    else if (average >= 50) { letterGrade = 'CC (2)'; statusText = 'Geçer'; }
    else { letterGrade = 'FF (1)'; statusText = 'Geçmez'; }

    setResult({
      average,
      letterGrade,
      statusText,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="e1" className="block text-sm font-medium mb-1 text-foreground">
                  1. Yazılı / Sınav Notu <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="e1"
                  placeholder="Örn: 75"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={exam1Str}
                  onChange={(e) => setExam1Str(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label htmlFor="e2" className="block text-sm font-medium mb-1 text-foreground">
                  2. Yazılı / Sınav Notu
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="e2"
                  placeholder="Örn: 85"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={exam2Str}
                  onChange={(e) => setExam2Str(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="perf" className="block text-sm font-medium mb-1 text-foreground">
                  Performans / Sözlü Notu
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="perf"
                  placeholder="Örn: 90"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={performanceStr}
                  onChange={(e) => setPerformanceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>

              <div>
                <label htmlFor="proj" className="block text-sm font-medium mb-1 text-foreground">
                  Proje / 2. Sözlü (Opsiyonel)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="proj"
                  placeholder="Örn: 95"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={projectStr}
                  onChange={(e) => setProjectStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
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
              Not Ortalamasını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Ders Puanı Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Ders Not Ortalaması</span>
                  <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight">
                    {formatNumber(result.average, 2)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Derece: {result.statusText} ({result.letterGrade})
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/takdir-tesekkur-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Takdir ve Teşekkür belgesi hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Sınav ve sözlü notlarınızı girerek ders ortalamanızı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">MEB 100&apos;lük Not Baremi Karşılıkları</h2>
        <p className="mb-4 text-muted-foreground">
          Milli Eğitim Bakanlığı sisteminde 85.00 - 100 arası Pekiyi (5), 70.00 - 84.99 arası İyi (4), 60.00 - 69.99 arası Orta (3), 50.00 - 59.99 arası Geçer (2) ve 0 - 49.99 arası Geçmez (1) olarak değerlendirilir.
        </p>
      </div>
    </div>
  );
}
