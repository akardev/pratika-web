'use client';

import { useState, useMemo } from 'react';

// Renk dönüştürme fonksiyonları
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace(/^#/, '');
  if (!/^(?:[0-9a-fA-F]{3}){1,2}$/.test(cleanHex)) return null;

  let fullHex = cleanHex;
  if (cleanHex.length === 3) {
    fullHex = cleanHex.split('').map((c) => c + c).join('');
  }

  const num = parseInt(fullHex, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const clamped = Math.max(0, Math.min(255, Math.round(n)));
    return clamped.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function rgbToCmyk(r: number, g: number, b: number): { c: number; m: number; y: number; k: number } {
  r /= 255;
  g /= 255;
  b /= 255;
  const k = 1 - Math.max(r, g, b);
  if (k === 1) {
    return { c: 0, m: 0, y: 0, k: 100 };
  }
  const c = Math.round(((1 - r - k) / (1 - k)) * 100);
  const m = Math.round(((1 - g - k) / (1 - k)) * 100);
  const y = Math.round(((1 - b - k) / (1 - k)) * 100);
  return { c, m, y, k: Math.round(k * 100) };
}

export default function RenkDonusturucu() {
  const [hexInput, setHexInput] = useState('#2563EB');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const colorData = useMemo(() => {
    const rgb = hexToRgb(hexInput);
    if (!rgb) return null;

    const hex = rgbToHex(rgb.r, rgb.g, rgb.b);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

    return {
      hex,
      rgbStr: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      hslStr: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
      cmykStr: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`,
      cssRgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
    };
  }, [hexInput]);

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Sol Kolon: Renk Seçici ve Giriş */}
          <div className="md:col-span-5 space-y-4">
            <div>
              <label htmlFor="color-picker" className="block text-sm font-semibold text-foreground mb-2">
                Renk Seçin veya HEX Girin
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  id="color-picker"
                  value={colorData?.hex || '#2563EB'}
                  onChange={(e) => setHexInput(e.target.value)}
                  className="w-14 h-14 rounded-xl border border-border cursor-pointer bg-transparent p-1"
                />
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => setHexInput(e.target.value.replace(/[^0-9a-fA-F#]/g, '').slice(0, 7))}
                  placeholder="#2563EB"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-base text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Renk Önizleme Kutusu */}
            <div
              className="w-full h-24 rounded-xl border border-border/80 shadow-inner transition-colors flex items-center justify-center font-mono text-xs font-semibold text-white drop-shadow"
              style={{ backgroundColor: colorData ? colorData.hex : '#2563EB' }}
            >
              {colorData?.hex}
            </div>
          </div>

          {/* Sağ Kolon: Çıktı Formatları */}
          <div className="md:col-span-7 space-y-3">
            {colorData ? (
              <>
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/20 border border-border/80">
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground block">HEX Kodu</span>
                    <span className="font-mono text-sm font-bold text-foreground">{colorData.hex}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('hex', colorData.hex)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {copiedKey === 'hex' ? 'Kopyalandı!' : 'Kopyala'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/20 border border-border/80">
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground block">RGB (Red, Green, Blue)</span>
                    <span className="font-mono text-sm font-bold text-foreground">{colorData.rgbStr}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('rgb', colorData.rgbStr)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {copiedKey === 'rgb' ? 'Kopyalandı!' : 'Kopyala'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/20 border border-border/80">
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground block">HSL (Hue, Saturation, Lightness)</span>
                    <span className="font-mono text-sm font-bold text-foreground">{colorData.hslStr}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('hsl', colorData.hslStr)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {copiedKey === 'hsl' ? 'Kopyalandı!' : 'Kopyala'}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 rounded-xl bg-muted/20 border border-border/80">
                  <div>
                    <span className="text-[11px] font-semibold text-muted-foreground block">CMYK (Baskı Formatı)</span>
                    <span className="font-mono text-sm font-bold text-foreground">{colorData.cmykStr}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleCopy('cmyk', colorData.cmykStr)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {copiedKey === 'cmyk' ? 'Kopyalandı!' : 'Kopyala'}
                  </button>
                </div>
              </>
            ) : (
              <p className="text-sm text-destructive">Lütfen geçerli bir HEX renk kodu girin (Örn: #2563EB).</p>
            )}
          </div>
        </div>
      </div>

      {/* Bilgilendirme */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">Renk Modelleri Arasındaki Farklar</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <strong>HEX ve RGB</strong> dijital ekranlarda (web siteleri, mobil uygulamalar) ışık tabanlı renkleri ifade eder. <strong>HSL</strong> renk tonu ve doygunluğu insan algısına göre düzenlerken, <strong>CMYK</strong> matbaa ve fiziksel baskı süreçlerinde kullanılan mürekkep karışım modelidir.
        </p>
      </div>
    </div>
  );
}
