'use client';

import { useState } from 'react';

export default function CssKutuGolgesiOlusturucu() {
  const [offsetX, setOffsetX] = useState<number>(0);
  const [offsetY, setOffsetY] = useState<number>(10);
  const [blurRadius, setBlurRadius] = useState<number>(25);
  const [spreadRadius, setSpreadRadius] = useState<number>(-5);
  const [shadowColor, setShadowColor] = useState<string>('#000000');
  const [opacity, setOpacity] = useState<number>(0.15);
  const [isInset, setIsInset] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Hex to RGBA
  const hexToRgba = (hex: string, op: number) => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
    const num = parseInt(clean, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${op})`;
  };

  const rgbaColor = hexToRgba(shadowColor, opacity);
  const boxShadowCss = `${isInset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${rgbaColor}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(`box-shadow: ${boxShadowCss};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-medium text-foreground mb-1">
                <span>Yatay Kayma (X Offset):</span>
                <span className="font-mono">{offsetX}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={offsetX}
                onChange={(e) => setOffsetX(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-foreground mb-1">
                <span>Dikey Kayma (Y Offset):</span>
                <span className="font-mono">{offsetY}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={offsetY}
                onChange={(e) => setOffsetY(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-foreground mb-1">
                <span>Bulanıklık (Blur Radius):</span>
                <span className="font-mono">{blurRadius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={blurRadius}
                onChange={(e) => setBlurRadius(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-foreground mb-1">
                <span>Yayılma (Spread Radius):</span>
                <span className="font-mono">{spreadRadius}px</span>
              </div>
              <input
                type="range"
                min="-30"
                max="50"
                value={spreadRadius}
                onChange={(e) => setSpreadRadius(Number(e.target.value))}
                className="w-full accent-primary cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-medium mb-1 text-foreground">Gölge Rengi</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={shadowColor}
                    onChange={(e) => setShadowColor(e.target.value)}
                    className="w-8 h-8 rounded border border-border cursor-pointer bg-transparent"
                  />
                  <span className="font-mono text-xs font-semibold">{shadowColor}</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-foreground mb-1">
                  <span>Opaklık:</span>
                  <span className="font-mono">%{Math.round(opacity * 100)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="insetCheck"
                checked={isInset}
                onChange={(e) => setIsInset(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary"
              />
              <label htmlFor="insetCheck" className="text-xs text-foreground font-medium cursor-pointer">
                İç Gölge (Inset Shadow)
              </label>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center">
            {/* Canlı Önizleme Kutusu */}
            <div className="w-full h-52 bg-muted/40 rounded-2xl flex items-center justify-center p-6 border border-border/50">
              <div
                style={{ boxShadow: boxShadowCss }}
                className="w-36 h-28 bg-card rounded-2xl border border-border/40 flex items-center justify-center text-xs font-bold text-foreground transition-all duration-100"
              >
                Canlı Önizleme
              </div>
            </div>

            {/* CSS Çıktısı */}
            <div className="w-full mt-4 p-3 bg-muted/30 rounded-xl border border-border flex items-center justify-between gap-2">
              <code className="text-xs font-mono text-primary font-bold break-all">
                box-shadow: {boxShadowCss};
              </code>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shrink-0"
              >
                {copied ? 'Kopyalandı! ✓' : 'CSS Kopyala'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">CSS Box-Shadow Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          CSS <code>box-shadow</code> özelliği HTML elementlerine derinlik, modern kart efekti ve gölge kazandırır. X ve Y ofsetleri gölgenin yönünü, blur bulanıklığı, spread ise gölgenin genişleme mesafesini belirler.
        </p>
      </div>
    </div>
  );
}
