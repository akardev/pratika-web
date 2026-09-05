'use client';

import { useState } from 'react';

export default function HtmlCssMinifier() {
  const [codeType, setCodeType] = useState<'html' | 'css'>('html');
  const [inputCode, setInputCode] = useState('');
  const [minified, setMinified] = useState('');

  const handleMinify = () => {
    if (!inputCode) return;
    let out = inputCode;
    if (codeType === 'html') {
      // Yorum satırlarını ve boşlukları temizle
      out = out.replace(/<!--[\s\S]*?-->/g, '');
      out = out.replace(/\s+/g, ' ');
      out = out.replace(/>\s+</g, '><').trim();
    } else {
      // CSS yorumları ve boşlukları temizle
      out = out.replace(/\/\*[\s\S]*?\*\//g, '');
      out = out.replace(/\s+/g, ' ');
      out = out.replace(/\s*([:;{}])\s*/g, '$1');
      out = out.replace(/;}/g, '}').trim();
    }
    setMinified(out);
  };

  const savedBytes = inputCode.length - minified.length;
  const savedPercent = inputCode.length > 0 ? Math.round((savedBytes / inputCode.length) * 100) : 0;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => { setCodeType('html'); setMinified(''); }}
            className={`flex-1 h-11 rounded-lg font-medium text-sm transition-colors ${codeType === 'html' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          >
            HTML Minifier
          </button>
          <button
            type="button"
            onClick={() => { setCodeType('css'); setMinified(''); }}
            className={`flex-1 h-11 rounded-lg font-medium text-sm transition-colors ${codeType === 'css' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
          >
            CSS Minifier
          </button>
        </div>

        <div>
          <label htmlFor="code" className="block text-sm font-medium text-foreground mb-1">
            Sıkıştırılacak {codeType.toUpperCase()} Kodu
          </label>
          <textarea
            id="code"
            rows={8}
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Kodunuzu buraya yapıştırın..."
            className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono"
          />
        </div>

        <button
          type="button"
          onClick={handleMinify}
          className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
        >
          Kodu Sıkıştır (Minify)
        </button>

        {minified && (
          <div className="mt-8 pt-6 border-t border-border space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Sıkıştırılmış Kod:</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">%{savedPercent} Küçültüldü ({savedBytes} karakter tasarruf)</span>
            </div>
            <textarea
              readOnly
              rows={5}
              value={minified}
              className="w-full p-3 rounded-lg bg-muted/40 border border-border font-mono text-xs select-all text-foreground"
            />
          </div>
        )}
      </div>
    </div>
  );
}
