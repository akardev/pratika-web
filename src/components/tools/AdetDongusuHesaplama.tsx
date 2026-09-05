'use client';

import { useState } from 'react';

export default function AdetDongusuHesaplama() {
  const [startDate, setStartDate] = useState('');
  const [cycleDays, setCycleDays] = useState(28);

  const [futurePeriods, setFuturePeriods] = useState<string[]>([]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate) return;

    const base = new Date(startDate);
    const periods: string[] = [];

    for (let i = 1; i <= 6; i++) {
      const next = new Date(base.getTime() + (i * cycleDays * 24 * 60 * 60 * 1000));
      periods.push(next.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' }));
    }

    setFuturePeriods(periods);
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="sd" className="block text-sm font-medium text-foreground mb-1">Son Adet Başlangıcı</label>
              <input
                id="sd"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="cd" className="block text-sm font-medium text-foreground mb-1">Ortalama Döngü (Gün)</label>
              <select
                id="cd"
                value={cycleDays}
                onChange={(e) => setCycleDays(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                {[24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35].map((d) => (
                  <option key={d} value={d}>{d} Gün</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Gelecek 6 Ayı Hesapla
          </button>
        </form>

        {futurePeriods.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Gelecek 6 Dönem Başlangıçları</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {futurePeriods.map((dateStr, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-muted/20 border border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">{idx + 1}. Gelecek Dönem:</span>
                  <span className="text-sm font-bold text-foreground">{dateStr}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
