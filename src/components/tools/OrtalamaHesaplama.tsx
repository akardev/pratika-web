'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber } from '@/lib/utils';

interface AverageResult {
  mean: number;
  median: number;
  mode: string;
  sum: number;
  count: number;
  min: number;
  max: number;
}

export default function OrtalamaHesaplama() {
  const [inputStr, setInputStr] = useState<string>('70, 85, 90, 65, 80');
  const [result, setResult] = useState<AverageResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!inputStr.trim()) {
      setError('Lütfen hesaplanacak sayıları girin.');
      return;
    }

    // Virgül, noktalı virgül, boşluk veya satır başıyla ayır
    const tokens = inputStr.split(/[\s,;]+/).filter((t) => t.trim() !== '');
    const numbers: number[] = [];

    for (const t of tokens) {
      const num = parseTurkishNumber(t);
      if (isNaN(num)) {
        setError(`"${t}" geçerli bir sayı değil.`);
        return;
      }
      numbers.push(num);
    }

    if (numbers.length === 0) {
      setError('Lütfen en az bir geçerli sayı girin.');
      return;
    }

    const count = numbers.length;
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / count;

    // Medyan
    const sorted = [...numbers].sort((a, b) => a - b);
    const mid = Math.floor(count / 2);
    const median = count % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    // Mod (Tepe Değer)
    const freq: Record<number, number> = {};
    let maxFreq = 0;
    for (const n of numbers) {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > maxFreq) maxFreq = freq[n];
    }
    const modes = Object.keys(freq).filter((k) => freq[Number(k)] === maxFreq);
    const mode = maxFreq > 1 ? modes.map((m) => formatNumber(Number(m))).join(', ') : 'Mod Yok (Tüm sayılar tekil)';

    setResult({
      mean,
      median,
      mode,
      sum,
      count,
      min: sorted[0],
      max: sorted[count - 1],
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="numbers" className="block text-sm font-medium mb-2 text-foreground">
                Sayılar (Virgül veya boşlukla ayırın) <span className="text-destructive">*</span>
              </label>
              <textarea
                id="numbers"
                rows={4}
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono resize-none"
                placeholder="Örn: 70, 85, 90, 65, 80"
                value={inputStr}
                onChange={(e) => setInputStr(e.target.value.replace(/[^0-9, .\n\r\t-]/g, ''))}
              />
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
              Ortalamayı Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  İstatistik Sonuçları
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Aritmetik Ortalama</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatNumber(result.mean)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Toplam {result.count} Sayı Analiz Edildi
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Medyan (Ortanca Değer):</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.median)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Mod (En Çok Tekrar Eden):</span>
                    <span className="font-semibold text-foreground">{result.mode}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Sayıların Toplamı:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.sum)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">En Küçük / En Büyük:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.min)} / {formatNumber(result.max)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Sayıları girip &ldquo;Ortalamayı Hesapla&rdquo; butonuna basın.</p>
                <p className="text-xs text-muted-foreground mt-1">Aritmetik ortalama, medyan ve mod burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Ortalama, Medyan ve Mod Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Bir veri kümesinin merkez eğilimini ölçmek için aritmetik ortalama, ortanca (medyan) ve tepe değer (mod) kullanılır.
        </p>

        <div className="p-5 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground mb-8 space-y-1.5">
          <p className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">
            Formüller:
          </p>
          <p className="font-semibold">Aritmetik Ortalama = Sayıların Toplamı / Eleman Sayısı</p>
          <p className="font-semibold">Medyan = Küçükten büyüğe sıralandığında tam ortadaki sayı</p>
        </div>
      </div>
    </div>
  );
}
