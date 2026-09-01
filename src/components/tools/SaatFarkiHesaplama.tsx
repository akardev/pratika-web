'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SaatFarkiHesaplama() {
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:30');

  const [result, setResult] = useState<{
    hours: number;
    minutes: number;
    totalMinutes: number;
    totalSeconds: number;
    decimalHours: number;
    crossesMidnight: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!startTime || !endTime) {
      setError('Lütfen başlangıç ve bitiş saatlerini seçiniz.');
      return;
    }

    const [startH, startM] = startTime.split(':').map(Number);
    const [endH, endM] = endTime.split(':').map(Number);

    const startTotal = startH * 60 + startM;
    let endTotal = endH * 60 + endM;

    let crossesMidnight = false;
    if (endTotal < startTotal) {
      // Gece yarısı ertesi güne geçiş
      endTotal += 24 * 60;
      crossesMidnight = true;
    }

    const diffMinutes = endTotal - startTotal;
    const hours = Math.floor(diffMinutes / 60);
    const minutes = diffMinutes % 60;
    const decimalHours = diffMinutes / 60;

    setResult({
      hours,
      minutes,
      totalMinutes: diffMinutes,
      totalSeconds: diffMinutes * 60,
      decimalHours,
      crossesMidnight,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium mb-1 text-foreground">
                  Başlangıç Saati <span className="text-destructive">*</span>
                </label>
                <input
                  type="time"
                  id="startTime"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="endTime" className="block text-sm font-medium mb-1 text-foreground">
                  Bitiş Saati <span className="text-destructive">*</span>
                </label>
                <input
                  type="time"
                  id="endTime"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-foreground text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
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
              Saat Farkını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Geçen Süre
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Toplam Süre Farkı</span>
                  <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight font-mono">
                    {result.hours} sa {result.minutes} dk
                  </span>
                  {result.crossesMidnight && (
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 mt-2 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                      Gece yarısı ertesi güne sarkma algılandı (+1 Gün)
                    </span>
                  )}
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Ondalık Saat Cinsinden:</span>
                    <span className="font-semibold text-foreground font-mono">{result.decimalHours.toFixed(2)} Saat</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Dakika:</span>
                    <span className="font-semibold text-foreground font-mono">{result.totalMinutes} Dakika</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Saniye:</span>
                    <span className="font-semibold text-foreground font-mono">{result.totalSeconds} Saniye</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/tarih-farki-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Tarih farkı ve gün hesaplama aracına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Başlangıç ve bitiş saatlerini seçerek aradaki süreyi hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Saat Farkı ve Süre Hesaplama</h2>
        <p className="mb-4 text-muted-foreground">
          Mesai saatleri, vardiya takipleri veya çalışma sürelerini belirlemek için başlangıç ve bitiş saatleri arasındaki net farkı saat ve dakika olarak kolayca hesaplayabilirsiniz.
        </p>
      </div>
    </div>
  );
}
