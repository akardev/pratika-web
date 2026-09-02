'use client';

import { useState } from 'react';


function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

export default function EnBoyOraniHesaplayici() {
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [newWidth, setNewWidth] = useState<number>(1280);

  const divisor = gcd(width, height) || 1;
  const ratioW = width / divisor;
  const ratioH = height / divisor;

  // Yeni orantılı yükseklik
  const calculatedNewHeight = Math.round((newWidth * height) / width) || 0;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-3">Mevcut Ölçüler (Piksel)</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="w" className="block text-xs text-muted-foreground mb-1">Genişlik (px)</label>
              <input
                id="w"
                type="number"
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="h" className="block text-xs text-muted-foreground mb-1">Yükseklik (px)</label>
              <input
                id="h"
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <div>
            <span className="text-xs text-muted-foreground block">Tespit Edilen En-Boy Oranı</span>
            <span className="text-2xl font-bold text-primary">{ratioW} : {ratioH}</span>
          </div>
          <span className="text-xs text-muted-foreground">
            Ondalık Oran: {(width / height).toFixed(3)}
          </span>
        </div>

        <div className="border-t border-border pt-4">
          <h4 className="text-sm font-semibold text-foreground mb-3">Yeni Boyuta Orantılı Uyarlama</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nw" className="block text-xs text-muted-foreground mb-1">Yeni Genişlik (px)</label>
              <input
                id="nw"
                type="number"
                value={newWidth}
                onChange={(e) => setNewWidth(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-muted-foreground mb-1">Hesaplanan Orantılı Yükseklik</label>
              <div className="w-full h-11 px-3 rounded-lg border border-border bg-muted/30 flex items-center font-bold text-foreground text-sm">
                {calculatedNewHeight} px
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
