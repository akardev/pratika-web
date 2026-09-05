'use client';

import { useState } from 'react';

export default function CssBorderRadiusOlusturucu() {
  const [tl, setTl] = useState(30);
  const [br, setBr] = useState(70);
  const [vtl, setVtl] = useState(30);
  const [vtr, setVtr] = useState(30);

  const borderRadiusCss = `${tl}% ${100 - tl}% ${br}% ${100 - br}% / ${vtl}% ${vtr}% ${100 - vtr}% ${100 - vtl}%`;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-6">
          <div
            className="w-64 h-64 bg-gradient-to-tr from-primary to-primary/60 shadow-xl transition-all duration-300 flex items-center justify-center text-primary-foreground font-bold"
            style={{ borderRadius: borderRadiusCss }}
          >
            Önizleme
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Sol-Üst / Sağ-Üst: {tl}%</label>
            <input type="range" min="0" max="100" value={tl} onChange={(e) => setTl(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Sağ-Alt / Sol-Alt: {br}%</label>
            <input type="range" min="0" max="100" value={br} onChange={(e) => setBr(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Dikey Sol-Üst: {vtl}%</label>
            <input type="range" min="0" max="100" value={vtl} onChange={(e) => setVtl(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Dikey Sağ-Üst: {vtr}%</label>
            <input type="range" min="0" max="100" value={vtr} onChange={(e) => setVtr(Number(e.target.value))} className="w-full accent-primary" />
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-2">
          <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">CSS Kodu:</span>
          <div className="p-4 rounded-lg bg-muted/40 border border-border font-mono text-sm break-all select-all text-primary font-bold">
            border-radius: {borderRadiusCss};
          </div>
        </div>
      </div>
    </div>
  );
}
