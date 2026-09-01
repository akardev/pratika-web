'use client';

import { useState } from 'react';

export default function HtmlVarlıkKodlayici() {
  const [inputText, setInputText] = useState<string>('<div class="hero">Merhaba & Hoşgeldiniz! © 2025</div>');
  const [outputText, setOutputText] = useState<string>('&lt;div class="hero"&gt;Merhaba &amp; Hoşgeldiniz! &copy; 2025&lt;/div&gt;');
  const [copied, setCopied] = useState<boolean>(false);

  const encodeHtml = (str: string) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '"')
      .replace(/'/g, '&#39;')
      .replace(/©/g, '&copy;')
      .replace(/®/g, '&reg;')
      .replace(/€/g, '&euro;')
      .replace(/™/g, '&trade;');
  };

  const decodeHtml = (str: string) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  };

  const handleEncode = () => {
    setOutputText(encodeHtml(inputText));
  };

  const handleDecode = () => {
    setOutputText(decodeHtml(inputText));
  };

  const handleCopy = () => {
    if (outputText) {
      navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="space-y-6">
          <div>
            <label htmlFor="input" className="block text-sm font-medium mb-1.5 text-foreground">
              Girdi Metni / HTML
            </label>
            <textarea
              id="input"
              rows={4}
              placeholder="HTML kodunu veya metni buraya yapıştırın..."
              className="w-full rounded-lg border border-border bg-background p-3 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleEncode}
              className="flex-1 py-2.5 px-4 bg-primary text-primary-foreground text-sm font-bold rounded-xl shadow-sm hover:bg-primary/90 transition-all active:scale-[0.98]"
            >
              🔒 HTML Varlıklarına Kodla (Encode)
            </button>
            <button
              type="button"
              onClick={handleDecode}
              className="flex-1 py-2.5 px-4 bg-muted hover:bg-muted/80 text-foreground text-sm font-bold rounded-xl border border-border transition-all active:scale-[0.98]"
            >
              🔓 HTML Kodunu Çöz (Decode)
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="output" className="block text-sm font-medium text-foreground">
                Çıktı Sonucu
              </label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-muted hover:bg-muted/80 text-foreground border border-border transition-colors"
              >
                {copied ? 'Kopyalandı! ✓' : 'Kopyala'}
              </button>
            </div>
            <textarea
              id="output"
              rows={4}
              readOnly
              className="w-full rounded-lg border border-border bg-muted/30 p-3 text-foreground font-mono text-sm focus:outline-none"
              value={outputText}
            />
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">HTML Entity Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          HTML varlıkları (entities), HTML kodunda özel anlama sahip olan &lt;, &gt;, &amp; gibi karakterlerin veya telif, euro sembollerinin web sayfalarında kod olarak çalıştırılmadan güvenle metin olarak görüntülenmesini sağlar.
        </p>
      </div>
    </div>
  );
}
