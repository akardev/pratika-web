'use client';

import { useState } from 'react';

export default function YumurtlamaGunuHesaplama() {
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [cycleLength, setCycleLength] = useState(28);

  const [result, setResult] = useState<{
    ovulationDate: string;
    fertileStart: string;
    fertileEnd: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lastPeriodDate) return;

    const start = new Date(lastPeriodDate);
    // Ovülasyon: Sonraki adetten 14 gün önce = SAT + (döngü - 14) gün
    const ovulationDayOffset = cycleLength - 14;
    const ovulation = new Date(start.getTime() + (ovulationDayOffset * 24 * 60 * 60 * 1000));

    // Doğurganlık penceresi: Ovülasyondan 5 gün önce başlar, 1 gün sonra biter
    const fertileStart = new Date(ovulation.getTime() - (5 * 24 * 60 * 60 * 1000));
    const fertileEnd = new Date(ovulation.getTime() + (1 * 24 * 60 * 60 * 1000));

    const fmt = (d: Date) => d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

    setResult({
      ovulationDate: fmt(ovulation),
      fertileStart: fmt(fertileStart),
      fertileEnd: fmt(fertileEnd),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="lp" className="block text-sm font-medium text-foreground mb-1">
                Son Adet Başlangıç Tarihi
              </label>
              <input
                id="lp"
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="cl" className="block text-sm font-medium text-foreground mb-1">
                Adet Döngü Süresi (Gün)
              </label>
              <select
                id="cl"
                value={cycleLength}
                onChange={(e) => setCycleLength(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                {[21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35].map((d) => (
                  <option key={d} value={d}>{d} Gün</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Doğurganlık Günlerini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Ovülasyon ve Doğurgan Günler</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/20">
                <span className="text-xs text-muted-foreground block mb-1">Tahmini Yumurtlama (Ovülasyon) Günü</span>
                <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">{result.ovulationDate}</span>
              </div>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-xs text-muted-foreground block mb-1">En Yüksek Doğurganlık Penceresi</span>
                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                  {result.fertileStart} - {result.fertileEnd}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
