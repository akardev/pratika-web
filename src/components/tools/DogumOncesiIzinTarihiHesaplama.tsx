'use client';

import { useState } from 'react';

export default function DogumOncesiIzinTarihiHesaplama() {
  const [expectedDueDate, setExpectedDueDate] = useState('');
  const [workUntil37, setWorkUntil37] = useState(false);

  const [result, setResult] = useState<{
    leaveStartDate: string;
    postNatalWeeks: number;
    postNatalEndDate: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!expectedDueDate) return;

    const due = new Date(expectedDueDate);
    // 32. hafta izni doğumdan 8 hafta (56 gün) öncedir
    // Eğer 37. haftaya kadar çalışacaksa doğumdan 3 hafta (21 gün) önce izne ayrılır
    const daysBefore = workUntil37 ? 21 : 56;
    const leaveStart = new Date(due.getTime() - (daysBefore * 24 * 60 * 60 * 1000));

    // Doğum sonrası normalde 8 hafta, 37'ye kadar çalıştıysa aktarılan 5 hafta ile 13 hafta
    const postWeeks = workUntil37 ? 13 : 8;
    const postNatalEnd = new Date(due.getTime() + (postWeeks * 7 * 24 * 60 * 60 * 1000));

    const fmt = (d: Date) => d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', weekday: 'long' });

    setResult({
      leaveStartDate: fmt(leaveStart),
      postNatalWeeks: postWeeks,
      postNatalEndDate: fmt(postNatalEnd),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ed" className="block text-sm font-medium text-foreground mb-1">
                Beklenen Doğum Tarihi (40. Hafta)
              </label>
              <input
                id="ed"
                type="date"
                value={expectedDueDate}
                onChange={(e) => setExpectedDueDate(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={workUntil37}
                  onChange={(e) => setWorkUntil37(e.target.checked)}
                  className="rounded border-border"
                />
                Doktor Raporuyla 37. Haftaya Kadar Çalışacağım
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Yasal İzin Takvimini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Analık İzni Takvimi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-pink-500/10 border border-pink-500/20">
                <span className="text-xs text-muted-foreground block mb-1">Doğum Öncesi İzne Ayrılma Tarihiniz</span>
                <span className="text-lg font-bold text-pink-600 dark:text-pink-400">{result.leaveStartDate}</span>
                <span className="text-xs text-muted-foreground block mt-1">({workUntil37 ? '37. Hafta' : '32. Hafta'} Başlangıcı)</span>
              </div>
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Doğum Sonrası İzin Bitiş Tarihiniz</span>
                <span className="text-lg font-bold text-primary">{result.postNatalEndDate}</span>
                <span className="text-xs text-muted-foreground block mt-1">Toplam {result.postNatalWeeks} Hafta Doğum Sonrası İzin</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
