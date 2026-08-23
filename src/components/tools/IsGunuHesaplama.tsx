'use client';

import { useState } from 'react';
import { formatNumber } from '@/lib/utils';
import DatePicker from '@/components/ui/DatePicker';

export default function IsGunuHesaplama() {
  const [startDateStr, setStartDateStr] = useState<string>('2026-09-01');
  const [endDateStr, setEndDateStr] = useState<string>('2026-09-30');
  const [includeSaturday, setIncludeSaturday] = useState<boolean>(false);

  const [result, setResult] = useState<{ workDays: number; offDays: number; totalDays: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!startDateStr || !endDateStr) {
      setError('Lütfen başlangıç ve bitiş tarihlerini seçin veya yazın.');
      return;
    }

    const d1 = new Date(startDateStr + 'T00:00:00');
    const d2 = new Date(endDateStr + 'T00:00:00');

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      setError('Geçerli tarihler seçin.');
      return;
    }

    const start = d1 < d2 ? d1 : d2;
    const end = d1 < d2 ? d2 : d1;

    let workDays = 0;
    let offDays = 0;
    let totalDays = 0;

    const cur = new Date(start);
    while (cur <= end) {
      totalDays++;
      const day = cur.getDay(); // 0: Pazar, 6: Cumartesi
      if (day === 0 || (day === 6 && !includeSaturday)) {
        offDays++;
      } else {
        workDays++;
      }
      cur.setDate(cur.getDate() + 1);
    }

    setResult({ workDays, offDays, totalDays });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <DatePicker
              id="start"
              label="Başlangıç Tarihi"
              required
              value={startDateStr}
              onChange={setStartDateStr}
              placeholder="01.09.2026"
            />

            <DatePicker
              id="end"
              label="Bitiş Tarihi"
              required
              value={endDateStr}
              onChange={setEndDateStr}
              placeholder="30.09.2026"
            />

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="satCheck"
                checked={includeSaturday}
                onChange={(e) => setIncludeSaturday(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
              />
              <label htmlFor="satCheck" className="text-xs sm:text-sm font-medium text-foreground cursor-pointer select-none">
                Cumartesi günlerini de iş günü say (6 günlük çalışma haftası)
              </label>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              İş Günü Sayısını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Net Çalışma / İş Günü</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight font-mono">
                    {formatNumber(result.workDays)} İş Günü
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80 font-mono">
                    Toplam {result.totalDays} Takvim Günü
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hafta Tatili / Dinlenme Günleri:</span>
                    <span className="font-semibold text-foreground font-mono">{result.offDays} Gün</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Tarihleri seçip net iş gününü hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
