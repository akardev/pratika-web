'use client';

import { useState } from 'react';

export default function GebelikDogumTarihiHesaplama() {
  const [lastPeriodDate, setLastPeriodDate] = useState<string>('2026-06-01');

  const [result, setResult] = useState<{
    dueDateStr: string;
    weeksPregnant: number;
    daysPregnant: number;
    trimester: string;
    remainingDays: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const sat = new Date(lastPeriodDate);
    if (isNaN(sat.getTime())) return;

    // Naegele Kuralı: SAT + 280 Gün (40 Hafta)
    const due = new Date(sat.getTime() + (280 * 24 * 60 * 60 * 1000));
    const now = new Date();

    const elapsedMs = now.getTime() - sat.getTime();
    const elapsedDays = Math.max(0, Math.floor(elapsedMs / (1000 * 60 * 60 * 24)));
    const weeks = Math.floor(elapsedDays / 7);
    const extraDays = elapsedDays % 7;

    const remainingDays = Math.max(0, Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));

    let trim = '1. Trimester (0 - 13. Hafta)';
    if (weeks >= 28) trim = '3. Trimester (28 - 40. Hafta - Doğum Öncesi)';
    else if (weeks >= 14) trim = '2. Trimester (14 - 27. Hafta)';

    setResult({
      dueDateStr: due.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      weeksPregnant: weeks,
      daysPregnant: extraDays,
      trimester: trim,
      remainingDays,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <label htmlFor="sat" className="block text-sm font-medium text-foreground mb-1">
              Son Adet Tarihinizin İlk Günü (SAT)
            </label>
            <input
              id="sat"
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              className="w-full sm:w-1/2 h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tahmini Gebelik Takvimi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Tahmini Doğum Günü</span>
                <span className="text-2xl font-bold text-primary">{result.dueDateStr}</span>
                <span className="text-xs text-muted-foreground block mt-1">(Doğuma kalan: ~{result.remainingDays} gün)</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Mevcut Gebelik Haftası</span>
                <span className="text-2xl font-bold text-foreground">
                  {result.weeksPregnant}. Hafta {result.daysPregnant > 0 ? `+ ${result.daysPregnant} Gün` : ''}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Dönem (Trimester)</span>
                <span className="text-base font-bold text-foreground">{result.trimester}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">Tıbbi Bilgilendirme Notu:</p>
        <p>Hesaplama uluslararası Naegele kuralına (280 gün / 40 hafta standart döngü) dayanır. Doğumların sadece %5&apos;i tam hesaplanan günde gerçekleşir; bebekler çoğunlukla 37-42. haftalar arasında dünyaya gelir. Kesin hafta takibi kadın doğum uzmanınızın ultrason ölçümüyle yapılır.</p>
      </div>
    </div>
  );
}
