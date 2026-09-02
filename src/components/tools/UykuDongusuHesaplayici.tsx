'use client';

import { useState } from 'react';

export default function UykuDongusuHesaplayici() {
  const [calcMode, setCalcMode] = useState<'wake-time' | 'sleep-time'>('sleep-time');
  const [targetHour, setTargetHour] = useState<string>('07:00');

  const [resultCycles, setResultCycles] = useState<string[]>([]);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const [h, m] = targetHour.split(':').map(Number);
    const targetMin = h * 60 + m;
    const fallAsleepMin = 14; // Ortalama 14 dakikada uykuya dalınır

    const times: string[] = [];

    if (calcMode === 'sleep-time') {
      // Sabah şu saatte kalkmak istiyorsam ne zaman yatmalıyım?
      // Döngüler: 3 döngü (4.5s), 4 döngü (6s), 5 döngü (7.5s - İdeal), 6 döngü (9s)
      [6, 5, 4, 3].forEach(cycles => {
        const sleepDuration = (cycles * 90) + fallAsleepMin;
        let sleepMin = (targetMin - sleepDuration) % 1440;
        if (sleepMin < 0) sleepMin += 1440;
        const sh = Math.floor(sleepMin / 60);
        const sm = sleepMin % 60;
        const timeStr = `${String(sh).padStart(2, '0')}:${String(sm).padStart(2, '0')} (${cycles} Döngü - ${cycles * 1.5} saat)`;
        times.push(timeStr);
      });
    } else {
      // Şimdi yatarsam ne zaman uyanmalıyım?
      const now = new Date();
      const currentMin = now.getHours() * 60 + now.getMinutes() + fallAsleepMin;
      [3, 4, 5, 6].forEach(cycles => {
        const wakeMin = (currentMin + (cycles * 90)) % 1440;
        const wh = Math.floor(wakeMin / 60);
        const wm = wakeMin % 60;
        const timeStr = `${String(wh).padStart(2, '0')}:${String(wm).padStart(2, '0')} (${cycles} Döngü - ${cycles * 1.5} saat)`;
        times.push(timeStr);
      });
    }

    setResultCycles(times);
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="cm" className="block text-sm font-medium text-foreground mb-1">Hesaplama Amacı</label>
              <select
                id="cm"
                value={calcMode}
                onChange={(e) => setCalcMode(e.target.value as 'wake-time' | 'sleep-time')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="sleep-time">Sabah uyanış saatime göre ne zaman yatmalıyım?</option>
                <option value="wake-time">Şimdi yatarsam en dinç ne zaman uyanırım?</option>
              </select>
            </div>

            {calcMode === 'sleep-time' && (
              <div>
                <label htmlFor="th" className="block text-sm font-medium text-foreground mb-1">Kalkmak İstediğiniz Saat</label>
                <input
                  id="th"
                  type="time"
                  value={targetHour}
                  onChange={(e) => setTargetHour(e.target.value)}
                  className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            İdeal Saatleri Bul
          </button>
        </form>

        {resultCycles.length > 0 && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {calcMode === 'sleep-time' ? 'Tavsiye Edilen Yatış Saatleri' : 'Tavsiye Edilen Uyanış Saatleri'}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {resultCycles.map((c, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-lg border ${i === 1 ? 'border-primary/50 bg-primary/5 ring-1 ring-primary/30' : 'border-border bg-muted/20'}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-foreground">{c.split(' ')[0]}</span>
                    {i === 1 && <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/20 text-primary">En İdeal (7.5 Saat)</span>}
                  </div>
                  <span className="text-xs text-muted-foreground mt-1 block">{c.substring(c.indexOf('('))}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-xs text-muted-foreground space-y-1">
        <p className="font-semibold text-foreground">90 Dakikalık REM Uyku Döngüsü:</p>
        <p>İnsan beyni uykuda ortalama 90 dakikalık döngülerden (hafif uyku, derin uyku ve REM) geçer. Bir döngünün tam ortasında çalan alarmla uyanmak güne yorgun başlamanıza neden olur. Döngü sonlarında uyanmak ise son derece zinde hissettirir.</p>
      </div>
    </div>
  );
}
