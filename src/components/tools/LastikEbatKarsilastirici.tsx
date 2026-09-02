'use client';

import { useState } from 'react';


export default function LastikEbatKarsilastirici() {
  const [oldWidth, setOldWidth] = useState<number>(205);
  const [oldAspect, setOldAspect] = useState<number>(55);
  const [oldRim, setOldRim] = useState<number>(16);

  const [newWidth, setNewWidth] = useState<number>(225);
  const [newAspect, setNewAspect] = useState<number>(45);
  const [newRim, setNewRim] = useState<number>(17);

  const [result, setResult] = useState<{
    oldDiameter: number;
    newDiameter: number;
    differenceMm: number;
    differencePercent: number;
    speedAt100: number;
    isSafe: boolean;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    // Çap (mm) = (Jant * 25.4) + 2 * (Genişlik * Yanak / 100)
    const oldD = (oldRim * 25.4) + (2 * (oldWidth * oldAspect / 100));
    const newD = (newRim * 25.4) + (2 * (newWidth * newAspect / 100));

    const diffMm = newD - oldD;
    const diffPercent = (diffMm / oldD) * 100;
    const speedAt100 = 100 * (newD / oldD);
    const isSafe = Math.abs(diffPercent) <= 3.0;

    setResult({
      oldDiameter: Math.round(oldD),
      newDiameter: Math.round(newD),
      differenceMm: Math.round(diffMm * 10) / 10,
      differencePercent: Math.round(diffPercent * 100) / 100,
      speedAt100: Math.round(speedAt100 * 10) / 10,
      isSafe,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Orijinal (Eski) Lastik Ebatları</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Taban (mm)</label>
                <input
                  type="number"
                  value={oldWidth}
                  onChange={(e) => setOldWidth(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm"
                  min="125" max="355" step="5"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Yanak (%)</label>
                <input
                  type="number"
                  value={oldAspect}
                  onChange={(e) => setOldAspect(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm"
                  min="25" max="90" step="5"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Jant (inç)</label>
                <input
                  type="number"
                  value={oldRim}
                  onChange={(e) => setOldRim(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm"
                  min="12" max="24"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Yeni Lastik Ebatları</h3>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Taban (mm)</label>
                <input
                  type="number"
                  value={newWidth}
                  onChange={(e) => setNewWidth(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm"
                  min="125" max="355" step="5"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Yanak (%)</label>
                <input
                  type="number"
                  value={newAspect}
                  onChange={(e) => setNewAspect(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm"
                  min="25" max="90" step="5"
                />
              </div>
              <div>
                <label className="block text-xs text-muted-foreground mb-1">Jant (inç)</label>
                <input
                  type="number"
                  value={newRim}
                  onChange={(e) => setNewRim(Number(e.target.value))}
                  className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm"
                  min="12" max="24"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Karşılaştır ve Sapmayı Bul
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Karşılaştırma Analizi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Çap Değişimi</span>
                <span className="text-xl font-bold text-foreground">
                  {result.differenceMm > 0 ? `+${result.differenceMm}` : result.differenceMm} mm
                </span>
                <span className="text-xs text-muted-foreground block mt-1">({result.differencePercent > 0 ? `+${result.differencePercent}` : result.differencePercent}%)</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Kadran 100 km/h İken Gerçek Hız</span>
                <span className="text-xl font-bold text-primary">{result.speedAt100} km/h</span>
              </div>
              <div className={`p-4 rounded-lg border ${result.isSafe ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400' : 'bg-destructive/10 border-destructive/30 text-destructive'}`}>
                <span className="text-xs block mb-1 font-semibold">Tolerans Durumu</span>
                <span className="text-base font-bold">
                  {result.isSafe ? '✓ Güvenli (%3 tolerans içinde)' : '⚠ Riskli (%3 sınırını aşıyor)'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Lastik Değişimi Güvenlik Sınırı:</p>
        <p>Uluslararası ETRTO standartlarına göre yeni lastik çapı ile orijinal lastik çapı arasındaki farkın azami <strong>+/-%3</strong> aralığında kalması önerilir. Bu sınır aşıldığında ABS, ESP ve hız göstergesi hatalı çalışabilir.</p>
      </div>
    </div>
  );
}
