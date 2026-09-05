'use client';

import { useState } from 'react';

export default function GebelikHaftasiHesaplama() {
  const [lmpDate, setLmpDate] = useState('');

  const [result, setResult] = useState<{
    weeks: number;
    days: number;
    dueDate: string;
    trimester: string;
    remainingDays: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lmpDate) return;

    const start = new Date(lmpDate);
    const today = new Date();
    const diffMs = today.getTime() - start.getTime();

    if (diffMs < 0) return;

    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;

    // Naegele Kuralı: SAT + 280 gün (40 hafta)
    const due = new Date(start.getTime() + (280 * 24 * 60 * 60 * 1000));
    const remainingDays = Math.max(0, 280 - totalDays);

    let trimester = '1. Trimester (İlk 13 Hafta)';
    if (weeks >= 14 && weeks <= 27) trimester = '2. Trimester (14 - 27. Hafta)';
    else if (weeks >= 28) trimester = '3. Trimester (28 - 40. Hafta)';

    setResult({
      weeks,
      days,
      dueDate: due.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      trimester,
      remainingDays,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="max-w-md">
            <label htmlFor="lmp" className="block text-sm font-medium text-foreground mb-1">
              Son Adet Tarihinizin İlk Günü (SAT)
            </label>
            <input
              id="lmp"
              type="date"
              value={lmpDate}
              onChange={(e) => setLmpDate(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Gebelik Haftasını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Gebelik Takip Özeti</h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/20">
                <span className="text-xs text-muted-foreground block mb-1">Güncel Gebelik Süresi</span>
                <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  {result.weeks} Hafta {result.days} Gün
                </span>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Tahmini Doğum Tarihi</span>
                <span className="text-xl font-bold text-primary">{result.dueDate}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Mevcut Dönem</span>
                <span className="text-sm font-semibold text-foreground">{result.trimester}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Kalan Tahmini Gün</span>
                <span className="text-xl font-bold text-foreground">{result.remainingDays} Gün</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
