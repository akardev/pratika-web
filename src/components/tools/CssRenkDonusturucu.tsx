'use client';

import { useState } from 'react';

export default function CssRenkDonusturucu() {
  const [hexColor, setHexColor] = useState<string>('#3b82f6');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Hex to RGB
  const hexToRgb = (hex: string) => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const rgb = hexToRgb(hexColor);

  // RGB to HSL
  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

  // RGB to CMYK
  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - (r / 255);
    let m = 1 - (g / 255);
    let y = 1 - (b / 255);
    const k = Math.min(c, m, y);
    if (k === 1) {
      return { c: 0, m: 0, y: 0, k: 100 };
    }
    c = (c - k) / (1 - k);
    m = (m - k) / (1 - k);
    y = (y - k) / (1 - k);
    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    };
  };

  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <label htmlFor="colorPicker" className="block text-sm font-medium mb-2 text-foreground">
                Renk Seçin veya HEX Kodu Girin
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  id="colorPicker"
                  className="w-14 h-14 rounded-xl border border-border cursor-pointer bg-transparent"
                  value={hexColor}
                  onChange={(e) => setHexColor(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="#3b82f6"
                  className="flex-1 rounded-lg border border-border bg-background px-4 py-3 text-foreground font-mono text-base font-bold focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                  value={hexColor}
                  onChange={(e) => setHexColor(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              {['#ef4444', '#f97316', '#f59e0b', '#10b981', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#0f172a'].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setHexColor(c)}
                  style={{ backgroundColor: c }}
                  className="w-7 h-7 rounded-lg border border-border shadow-xs hover:scale-110 transition-transform"
                />
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <div className="p-6 bg-muted/20 rounded-xl border border-border shadow-sm space-y-3">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center">
                Renk Kodları ve Formatları
              </h3>

              {[
                { label: 'HEX', code: hexColor.toUpperCase(), key: 'hex' },
                { label: 'RGB', code: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, key: 'rgb' },
                { label: 'HSL', code: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, key: 'hsl' },
                { label: 'CMYK', code: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`, key: 'cmyk' },
              ].map((item) => (
                <div key={item.key} className="flex justify-between items-center p-2.5 bg-background rounded-lg border border-border/60">
                  <div>
                    <span className="text-[11px] text-muted-foreground block">{item.label}</span>
                    <span className="font-bold text-foreground font-mono text-sm">{item.code}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy(item.code, item.key)}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-muted hover:bg-muted/80 text-foreground border border-border/60 transition-colors"
                  >
                    {copiedKey === item.key ? 'Kopyalandı! ✓' : 'Kopyala'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">CSS Renk Formatları (HEX, RGB, HSL)</h2>
        <p className="mb-4 text-muted-foreground">
          Web geliştirmede kullanılan HEX renk kodları 16&apos;lık tabandadır. RGB kırmızı-yeşil-mavi ışık değerlerini, HSL ise renk tonu (Hue), doygunluk (Saturation) ve parlaklık (Lightness) değerlerini temsil eder.
        </p>
      </div>
    </div>
  );
}
