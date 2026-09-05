'use client';

import { useState } from 'react';

export default function CssGlassmorphismOlusturucu() {
  const [blur, setBlur] = useState(12);
  const [opacity, setOpacity] = useState(25);
  const [borderOpacity, setBorderOpacity] = useState(20);

  const cssCode = `background: rgba(255, 255, 255, ${(opacity / 100).toFixed(2)});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(255, 255, 255, ${(borderOpacity / 100).toFixed(2)});
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);`;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-6">
        {/* Colorful background showcase */}
        <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6 shadow-inner">
          <div className="absolute top-4 left-6 w-24 h-24 rounded-full bg-amber-400 blur-sm opacity-80" />
          <div className="absolute bottom-6 right-8 w-32 h-32 rounded-full bg-cyan-400 blur-sm opacity-80" />

          {/* Glass Card */}
          <div
            className="relative z-10 w-80 p-6 text-white text-center shadow-lg"
            style={{
              background: `rgba(255, 255, 255, ${opacity / 100})`,
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
              borderRadius: '16px',
            }}
          >
            <h4 className="text-lg font-bold">Buzlu Cam Kartı</h4>
            <p className="text-xs mt-2 opacity-90">Glassmorphism UI Önizleme</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Bulanıklık (Blur): {blur}px</label>
            <input type="range" min="0" max="40" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Arka Plan Şeffaflığı: %{opacity}</label>
            <input type="range" min="0" max="80" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-primary" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground block mb-1">Kenarlık Opaklığı: %{borderOpacity}</label>
            <input type="range" min="0" max="80" value={borderOpacity} onChange={(e) => setBorderOpacity(Number(e.target.value))} className="w-full accent-primary" />
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-2">
          <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">CSS Kodu:</span>
          <pre className="p-4 rounded-lg bg-muted/40 border border-border font-mono text-xs overflow-x-auto text-foreground select-all">
            {cssCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
