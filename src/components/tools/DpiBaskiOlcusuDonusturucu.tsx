'use client';

import { useState } from 'react';


export default function DpiBaskiOlcusuDonusturucu() {
  const [widthPx, setWidthPx] = useState<number>(3000);
  const [heightPx, setHeightPx] = useState<number>(2000);
  const [dpi, setDpi] = useState<number>(300); // 300 DPI standart kaliteli baskı

  // 1 inç = 2.54 cm
  const widthInch = widthPx / dpi;
  const heightInch = heightPx / dpi;
  const widthCm = widthInch * 2.54;
  const heightCm = heightInch * 2.54;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="wpx" className="block text-sm font-medium text-foreground mb-1">Genişlik (Piksel)</label>
            <input
              id="wpx"
              type="number"
              value={widthPx}
              onChange={(e) => setWidthPx(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label htmlFor="hpx" className="block text-sm font-medium text-foreground mb-1">Yükseklik (Piksel)</label>
            <input
              id="hpx"
              type="number"
              value={heightPx}
              onChange={(e) => setHeightPx(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label htmlFor="dpis" className="block text-sm font-medium text-foreground mb-1">Baskı Çözünürlüğü (DPI)</label>
            <select
              id="dpis"
              value={dpi}
              onChange={(e) => setDpi(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value={300}>300 DPI (Yüksek Kalite Matbaa / Fotoğraf)</option>
              <option value={150}>150 DPI (Poster / Afiş / Dijital Baskı)</option>
              <option value={72}>72 DPI (Ekran / Billboard / Dış Cephe)</option>
            </select>
          </div>
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Çıktı Baskı Ebatları</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <span className="text-xs text-muted-foreground block mb-1">Metrik Boyut (Santimetre)</span>
              <span className="text-2xl font-bold text-primary">
                {widthCm.toFixed(1)} cm × {heightCm.toFixed(1)} cm
              </span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">İnç Ebat (İnches)</span>
              <span className="text-2xl font-bold text-foreground">
                {widthInch.toFixed(1)}&quot; × {heightInch.toFixed(1)}&quot;
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
