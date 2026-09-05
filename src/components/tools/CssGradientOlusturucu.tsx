'use client';

import { useState } from 'react';

export default function CssGradientOlusturucu() {
  const [color1, setColor1] = useState<string>('#3b82f6');
  const [color2, setColor2] = useState<string>('#9333ea');
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState<number>(135);
  const [copied, setCopied] = useState<boolean>(false);

  const cssCode = gradientType === 'linear'
    ? `background: linear-gradient(${angle}deg, ${color1}, ${color2});`
    : `background: radial-gradient(circle, ${color1}, ${color2});`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-1.5">
                Gradyan Türü
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGradientType('linear')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    gradientType === 'linear'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Lineer (Çizgisel)
                </button>
                <button
                  type="button"
                  onClick={() => setGradientType('radial')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    gradientType === 'radial'
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Radyal (Dairesel)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  1. Renk ({color1})
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    className="w-10 h-10 rounded border border-border cursor-pointer"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs font-mono"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground mb-1">
                  2. Renk ({color2})
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    className="w-10 h-10 rounded border border-border cursor-pointer"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                  />
                  <input
                    type="text"
                    className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-xs font-mono"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {gradientType === 'linear' && (
              <div>
                <div className="flex justify-between items-center text-xs font-medium mb-1">
                  <span>Açı / Yön</span>
                  <span className="font-mono text-primary font-bold">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  className="w-full cursor-pointer accent-primary"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-foreground mb-1">
                Oluşturulan CSS Kodu
              </label>
              <div className="relative">
                <pre className="p-3 bg-muted/60 rounded-lg border border-border text-xs font-mono overflow-x-auto text-foreground">
                  {cssCode}
                </pre>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="absolute right-2 top-2 px-2.5 py-1 text-xs font-semibold rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {copied ? 'Kopyalandı!' : 'Kopyala'}
                </button>
              </div>
            </div>
          </div>

          <div>
            <span className="block text-xs font-medium text-muted-foreground mb-2 text-center">
              Canlı Gradyan Önizleme
            </span>
            <div
              className="w-full h-56 rounded-xl border border-border shadow-inner flex items-center justify-center text-white font-bold text-lg drop-shadow-md transition-all"
              style={{
                background: gradientType === 'linear'
                  ? `linear-gradient(${angle}deg, ${color1}, ${color2})`
                  : `radial-gradient(circle, ${color1}, ${color2})`
              }}
            >
              Pratiksel Gradient
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">CSS Gradient Nasıl Kullanılır?</h2>
        <p className="mb-4 text-muted-foreground">
          CSS gradyanlar web sayfalarında modern arka plan geçişleri oluşturmak için kullanılır. Kod kutusundaki CSS stilini projenize kopyalayabilirsiniz.
        </p>
      </div>
    </div>
  );
}
