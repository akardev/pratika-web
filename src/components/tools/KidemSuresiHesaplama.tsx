'use client';

import { useState } from 'react';
import Link from 'next/link';
import DatePicker from '@/components/ui/DatePicker';
import { formatNumber } from '@/lib/utils';

export default function KidemSuresiHesaplama() {
  const [startDateStr, setStartDateStr] = useState<string>('2021-02-15');
  const [endDateStr, setEndDateStr] = useState<string>('2026-02-15');

  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    totalWeeks: number;
    kidemFactor: number;
    isEligibleForSeverance: boolean; // En az 1 tam yıl
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!startDateStr || !endDateStr) {
      setError('Lütfen işe giriş ve çıkış tarihlerini giriniz.');
      return;
    }

    const startParts = startDateStr.split('-');
    const endParts = endDateStr.split('-');

    if (startParts.length !== 3 || endParts.length !== 3) {
      setError('Geçerli tarihler giriniz.');
      return;
    }

    const startDate = new Date(parseInt(startParts[0], 10), parseInt(startParts[1], 10) - 1, parseInt(startParts[2], 10));
    const endDate = new Date(parseInt(endParts[0], 10), parseInt(endParts[1], 10) - 1, parseInt(endParts[2], 10));

    if (endDate < startDate) {
      setError('İşten çıkış tarihi, işe giriş tarihinden önce olamaz.');
      return;
    }

    // Toplam gün farkı
    const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);

    // Yıl, ay, gün hesaplaması
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    let days = endDate.getDate() - startDate.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(endDate.getFullYear(), endDate.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const kidemFactor = years + (months / 12) + (days / 365);
    const isEligibleForSeverance = totalDays >= 365;

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      kidemFactor,
      isEligibleForSeverance,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <DatePicker
              id="startDate"
              label="İşe Giriş Tarihi"
              required
              value={startDateStr}
              onChange={setStartDateStr}
              placeholder="15.02.2021"
            />

            <DatePicker
              id="endDate"
              label="İşten Çıkış / Ayrılış Tarihi"
              required
              value={endDateStr}
              onChange={setEndDateStr}
              placeholder="15.02.2026"
            />

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Kıdem Süresini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hizmet & Kıdem Süresi
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Toplam Çalışma Süresi</span>
                  <span className="font-extrabold text-2xl sm:text-3xl text-primary tracking-tight">
                    {result.years} Yıl {result.months} Ay {result.days} Gün
                  </span>
                  <span className={`text-xs font-semibold mt-2 px-2.5 py-1 rounded-md border ${
                    result.isEligibleForSeverance 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                  }`}>
                    {result.isEligibleForSeverance ? 'Kıdem Tazminatı Hakkı Var (1+ Yıl)' : 'Kıdem Tazminatı İçin 1 Yıl Dolmadı'}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Kıdem Çarpanı:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.kidemFactor, 4)} Yıl</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Gün Sayısı:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.totalDays)} Gün</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Hafta:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.totalWeeks)} Hafta</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kidem-tazminati-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Kıdem tazminatı net tutarını hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">İşe giriş ve çıkış tarihlerini girerek kıdem sürenizi hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kıdem Süresi Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Kıdem süresi, işçinin aynı işverene bağlı olarak iş sözleşmesinin başladığı günden sona erdiği güne kadar geçen süredir. 
          1475 sayılı Kanun uyarınca kıdem tazminatına hak kazanabilmek için aynı işverende en az <strong>1 tam yıl (365 gün)</strong> çalışmış olmak şarttır.
        </p>
      </div>
    </div>
  );
}
