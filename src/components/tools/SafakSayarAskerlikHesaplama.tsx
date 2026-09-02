'use client';

import { useState } from 'react';

export default function SafakSayarAskerlikHesaplama() {
  const [sulusDate, setSulusDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [dutyType, setDutyType] = useState<number>(6); // 6 ay er / 12 ay yedek subay
  const [roadPermissionDays, setRoadPermissionDays] = useState<number>(2); // Yol izni
  const [usedExcuseDays, setUsedExcuseDays] = useState<number>(0); // Kullanılan mazeret/ceza izni

  const [result, setResult] = useState<{
    dischargeDateStr: string;
    remainingDays: number;
    completedDays: number;
    progressPercent: number;
    cityPlates: string;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const start = new Date(sulusDate);
    if (isNaN(start.getTime())) return;

    // Bitiş tarihi: Başlangıç tarihine ay ekleme
    const discharge = new Date(start);
    discharge.setMonth(discharge.getMonth() + dutyType);
    // Yol izni erken terhis sağlar: gün düşülür
    discharge.setDate(discharge.getDate() - roadPermissionDays + usedExcuseDays);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalDurationMs = discharge.getTime() - start.getTime();
    const remainingMs = discharge.getTime() - today.getTime();
    const remainingDays = Math.max(0, Math.ceil(remainingMs / (1000 * 60 * 60 * 24)));
    const totalDays = Math.max(1, Math.ceil(totalDurationMs / (1000 * 60 * 60 * 24)));
    const completedDays = Math.max(0, totalDays - remainingDays);
    const progress = Math.min(100, Math.max(0, Math.round((completedDays / totalDays) * 100)));

    let plates = '';
    if (remainingDays <= 81 && remainingDays > 0) {
      plates = `Şafak Plakası: ${remainingDays} (İl Plakalarına İndiniz!)`;
    }

    setResult({
      dischargeDateStr: discharge.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
      remainingDays,
      completedDays,
      progressPercent: progress,
      cityPlates: plates,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label htmlFor="sd" className="block text-sm font-medium text-foreground mb-1">Sülüs / Başlangıç Tarihi</label>
              <input
                id="sd"
                type="date"
                value={sulusDate}
                onChange={(e) => setSulusDate(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="dt" className="block text-sm font-medium text-foreground mb-1">Askerlik Türü</label>
              <select
                id="dt"
                value={dutyType}
                onChange={(e) => setDutyType(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value={6}>6 Ay (Er / Erbaş)</option>
                <option value={12}>12 Ay (Yedek Subay / Astsubay)</option>
              </select>
            </div>
            <div>
              <label htmlFor="rd" className="block text-sm font-medium text-foreground mb-1">Yol İzni (Gün)</label>
              <input
                id="rd"
                type="number"
                value={roadPermissionDays}
                onChange={(e) => setRoadPermissionDays(Number(e.target.value))}
                min="0" max="10"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="ed" className="block text-sm font-medium text-foreground mb-1">Ceza / Geç Terhis (Gün)</label>
              <input
                id="ed"
                type="number"
                value={usedExcuseDays}
                onChange={(e) => setUsedExcuseDays(Number(e.target.value))}
                min="0" max="60"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Şafağı Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Şafak Sayar Durumu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Kalan Şafak</span>
                <span className="text-3xl font-bold text-primary">{result.remainingDays} Gün</span>
                {result.cityPlates && (
                  <span className="text-xs font-semibold text-emerald-600 block mt-1">{result.cityPlates}</span>
                )}
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Tahmini Terhis Tarihi</span>
                <span className="text-xl font-bold text-foreground">{result.dischargeDateStr}</span>
                <span className="text-xs text-muted-foreground block mt-1">(Yol izni düşüldükten sonra)</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Tamamlanma Oranı</span>
                <span className="text-xl font-bold text-foreground">%{result.progressPercent}</span>
                <div className="w-full bg-border/60 h-2 rounded-full overflow-hidden mt-2">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${result.progressPercent}%` }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
