'use client';

import { useState } from 'react';

export default function SvgOptimizeEdici() {
  const [svgInput, setSvgInput] = useState(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <!-- Generator: Adobe Illustrator -->
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>`);
  const [optimized, setOptimized] = useState('');

  const handleOptimize = () => {
    if (!svgInput) return;
    let out = svgInput;
    // Yorumları kaldır
    out = out.replace(/<!--[\s\S]*?-->/g, '');
    // XML deklarasyonlarını kaldır
    out = out.replace(/<\?xml[\s\S]*?\?>/gi, '');
    out = out.replace(/<!DOCTYPE[\s\S]*?>/gi, '');
    // Fazla boşlukları temizle
    out = out.replace(/\s+/g, ' ');
    out = out.replace(/>\s+</g, '><').trim();
    setOptimized(out);
  };

  const savedPercent = svgInput.length > 0 && optimized.length > 0
    ? Math.round(((svgInput.length - optimized.length) / svgInput.length) * 100)
    : 0;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <label htmlFor="svg" className="block text-sm font-medium text-foreground mb-1">SVG Kodunu Yapıştırın</label>
          <textarea
            id="svg"
            rows={7}
            value={svgInput}
            onChange={(e) => setSvgInput(e.target.value)}
            className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono"
          />
        </div>

        <button
          type="button"
          onClick={handleOptimize}
          className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          SVG&apos;yi Optimize Et
        </button>

        {optimized && (
          <div className="mt-8 pt-6 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Optimize SVG:</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">%{savedPercent} Boyut Azaldı</span>
            </div>
            <textarea
              readOnly
              rows={4}
              value={optimized}
              className="w-full p-3 rounded-lg bg-muted/40 border border-border font-mono text-xs select-all text-foreground"
            />
          </div>
        )}
      </div>
    </div>
  );
}
