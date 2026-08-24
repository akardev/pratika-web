'use client';

import { useState } from 'react';
import Link from 'next/link';
import DatePicker from '@/components/ui/DatePicker';

const MONTH_NAMES = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

export default function DenemeSuresiHesaplama() {
  const [startDateStr, setStartDateStr] = useState<string>('2026-03-01');
  const [durationMonths, setDurationMonths] = useState<number>(2); // 2 ay veya 4 ay

  const [result, setResult] = useState<{
    startDateFormatted: string;
    endDateFormatted: string;
    totalDays: number;
    daysRemaining: number;
    isExpired: boolean;
    durationMonths: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!startDateStr) {
      setError('Lütfen işe başlama tarihini seçiniz.');
      return;
    }

    const parts = startDateStr.split('-');
    if (parts.length !== 3) {
      setError('Geçerli bir başlangıç tarihi giriniz.');
      return;
    }

    const startYear = parseInt(parts[0], 10);
    const startMonth = parseInt(parts[1], 10);
    const startDay = parseInt(parts[2], 10);

    const startDate = new Date(startYear, startMonth - 1, startDay);
    
    // Deneme süresi bitiş tarihi (2 ay veya 4 ay sonra)
    const endDate = new Date(startYear, startMonth - 1 + durationMonths, startDay);
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = Math.round((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const isExpired = daysRemaining < 0;

    const startDateFormatted = `${startDay} ${MONTH_NAMES[startMonth - 1]} ${startYear}`;
    const endDateFormatted = `${endDate.getDate()} ${MONTH_NAMES[endDate.getMonth()]} ${endDate.getFullYear()}`;

    setResult({
      startDateFormatted,
      endDateFormatted,
      totalDays,
      daysRemaining: Math.max(0, daysRemaining),
      isExpired,
      durationMonths,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-5">
            <DatePicker
              id="startDate"
              label="İşe Başlama Tarihi"
              required
              value={startDateStr}
              onChange={setStartDateStr}
              placeholder="01.03.2026"
              helperText="İş sözleşmesinin fiilen başladığı tarih"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Sözleşme Deneme Süresi Türü
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDurationMonths(2)}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    durationMonths === 2
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Yasal Standart (2 Ay)
                </button>
                <button
                  type="button"
                  onClick={() => setDurationMonths(4)}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    durationMonths === 4
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Toplu İş Sözleşmesi (4 Ay)
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground">
                4857 sayılı İş Kanunu md. 15 gereği deneme süresi en çok 2 ay, toplu sözleşmeyle 4 ay olabilir.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Deneme Süresini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Deneme Süresi Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Son Deneme Günü</span>
                  <span className="font-extrabold text-2xl sm:text-3xl text-primary tracking-tight">
                    {result.endDateFormatted}
                  </span>
                  <span className={`text-xs font-semibold mt-2 px-2.5 py-1 rounded-md border ${
                    result.isExpired 
                      ? 'bg-destructive/10 text-destructive border-destructive/20' 
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                  }`}>
                    {result.isExpired ? 'Deneme Süresi Sona Erdi' : `Kalan: ${result.daysRemaining} Gün`}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">İşe Başlangıç:</span>
                    <span className="font-semibold text-foreground">{result.startDateFormatted}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Deneme Süresi:</span>
                    <span className="font-semibold text-foreground">{result.durationMonths} Ay ({result.totalDays} Gün)</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/ihbar-suresi-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Yasal ihbar sürenizi ve bildirim şartlarını öğrenin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">İşe başlangıç tarihini seçerek deneme süresi bitiş gününü hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">İş Kanunu Deneme Süresi Esasları Nelerdir?</h2>
        <p className="mb-4 text-muted-foreground">
          4857 sayılı İş Kanunu’nun 15. maddesine göre iş sözleşmelerine deneme kaydı konulduğunda, 
          bunun süresi en çok <strong>2 ay</strong> olabilir. Ancak bu süre toplu iş sözleşmeleriyle <strong>4 aya</strong> kadar uzatılabilir.
        </p>
        <p className="text-muted-foreground">
          Deneme süresi içinde taraflar iş sözleşmesini bildirim süresine gerek olmaksızın ve tazminatsız feshedebilir. 
          Çalışanın çalıştığı günler için ücret ve diğer hakları saklıdır.
        </p>
      </div>
    </div>
  );
}
