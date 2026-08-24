'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sanitizeNumericInput } from '@/lib/utils';

export default function ArtikYilKontrolu() {
  const [yearStr, setYearStr] = useState<string>('2024');

  const [result, setResult] = useState<{
    year: number;
    isLeap: boolean;
    reason: string;
    februaryDays: number;
    nearbyLeapYears: number[];
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const checkLeap = (y: number) => {
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const year = parseInt(yearStr, 10);
    if (isNaN(year) || year < 1 || year > 9999) {
      setError('Lütfen 1 ile 9999 arasında geçerli bir yıl giriniz.');
      return;
    }

    const isLeap = checkLeap(year);
    let reason = '';

    if (isLeap) {
      if (year % 400 === 0) {
        reason = `${year} yılı 400&apos;e tam bölündüğü için artık yıldır.`;
      } else {
        reason = `${year} yılı 4'e tam bölünür ve 100'ün katı değildir, bu yüzden artık yıldır.`;
      }
    } else {
      if (year % 100 === 0 && year % 400 !== 0) {
        reason = `${year} yılı 100'e bölünür ancak 400'e bölünemediği için artık yıl değildir.`;
      } else {
        reason = `${year} yılı 4'e tam bölünemediği için artık yıl değildir.`;
      }
    }

    const nearbyLeapYears: number[] = [];
    for (let y = year - 12; y <= year + 12; y++) {
      if (checkLeap(y)) {
        nearbyLeapYears.push(y);
      }
    }

    setResult({
      year,
      isLeap,
      reason,
      februaryDays: isLeap ? 29 : 28,
      nearbyLeapYears,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="yearInput" className="block text-sm font-medium mb-1 text-foreground">
                Kontrol Edilecek Yıl <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                inputMode="numeric"
                id="yearInput"
                placeholder="Örn: 2024"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                value={yearStr}
                onChange={(e) => setYearStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
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
              Artık Yıl Durumunu Sorgula
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Artık Yıl Durumu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">{result.year} Yılı</span>
                  <span className={`font-extrabold text-3xl sm:text-4xl tracking-tight ${
                    result.isLeap ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'
                  }`}>
                    {result.isLeap ? 'ARTIK YILDIR (366 Gün)' : 'ARTIK YIL DEĞİLDİR (365 Gün)'}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-2 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Şubat Ayı: {result.februaryDays} Gün Çeker
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <p className="text-muted-foreground text-center">{result.reason}</p>
                  <div className="pt-2 text-center">
                    <span className="text-[11px] text-muted-foreground block mb-1">Yakındaki Artık Yıllar:</span>
                    <div className="flex gap-1.5 justify-center flex-wrap">
                      {result.nearbyLeapYears.map((y) => (
                        <span
                          key={y}
                          className={`px-2 py-0.5 rounded text-xs font-mono ${
                            y === result.year
                              ? 'bg-primary text-primary-foreground font-bold'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          {y}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/yilin-kacinci-gunu-haftasi"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Yılın kaçıncı günü olduğunu öğrenin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Bir yıl girerek artık yıl olup olmadığını ve Şubat ayının gün sayısını kontrol edin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Artık Yıl Kuralı Nasıl Çalışır?</h2>
        <p className="mb-4 text-muted-foreground">
          Genel kural olarak 4&apos;e kalansız bölünen yıllar artık yıldır. Ancak 100&apos;e kalansız bölünen yılların artık yıl sayılması için aynı zamanda <strong>400&apos;e de kalansız bölünmesi</strong> şarttır (Örn: 2000 artık yıldır, 1900 veya 2100 artık yıl değildir).
        </p>
      </div>
    </div>
  );
}
