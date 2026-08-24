'use client';

import { useState } from 'react';

export default function HtmlMetinAyiklayici() {
  const [inputHtml, setInputHtml] = useState<string>(
    '<div className="article">\n  <h1>Pratika Yenilikleri</h1>\n  <p>Modern araçlarımızla <strong>hızlı</strong> ve <em>kolay</em> hesaplama yapın.</p>\n  <a href="https://pratika.com.tr">Daha Fazla Bilgi</a>\n</div>'
  );
  const [outputText, setOutputText] = useState<string>('');
  const [preserveLineBreaks, setPreserveLineBreaks] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const handleStrip = () => {
    let str = inputHtml;

    if (preserveLineBreaks) {
      str = str.replace(/<(br|p|div|h[1-6]|li|tr)[^>]*>/gi, '\n');
    }

    // Tüm HTML taglerini sil
    str = str.replace(/<[^>]+>/g, '');

    // HTML entities decode
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    let decoded = txt.value;

    if (preserveLineBreaks) {
      decoded = decoded
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l.length > 0)
        .join('\n');
    } else {
      decoded = decoded.replace(/\s+/g, ' ').trim();
    }

    setOutputText(decoded);
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
            <label htmlFor="htmlInput" className="block text-sm font-medium mb-1.5 text-foreground">
              HTML veya Zengin Metin Kodu
            </label>
            <textarea
              id="htmlInput"
              rows={6}
              placeholder="HTML kodunu buraya yapıştırın..."
              className="w-full rounded-lg border border-border bg-background p-3 text-foreground font-mono text-xs focus:outline-none focus:ring-2 focus:ring-primary"
              value={inputHtml}
              onChange={(e) => setInputHtml(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="preserveLines"
              checked={preserveLineBreaks}
              onChange={(e) => setPreserveLineBreaks(e.target.checked)}
              className="w-4 h-4 rounded border-border text-primary"
            />
            <label htmlFor="preserveLines" className="text-xs text-foreground font-medium cursor-pointer">
              Paragraf ve Satır Başlarını Koru (Yeni Satıra Dönüştür)
            </label>
          </div>

          <button
            type="button"
            onClick={handleStrip}
            className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            HTML Etiketlerini Temizle (Strip HTML)
          </button>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="output" className="block text-sm font-medium text-foreground">
                Sade Metin Çıktısı (Plain Text)
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
              rows={5}
              readOnly
              className="w-full rounded-lg border border-border bg-muted/30 p-3 text-foreground text-sm focus:outline-none leading-relaxed"
              value={outputText}
            />
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">HTML Etiket Temizleme Aracı</h2>
        <p className="mb-4 text-muted-foreground">
          E-postalardan, web sitelerinden veya zengin metin editörlerinden kopyalanan içeriklerdeki tüm &lt;div&gt;, &lt;p&gt;, &lt;span&gt;, stil ve bağlantı etiketlerini temizleyerek okunabilir saf metne dönüştürür.
        </p>
      </div>
    </div>
  );
}
