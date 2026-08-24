'use client';

import { useState } from 'react';

type SortMode = 'az' | 'za' | 'length_asc' | 'length_desc' | 'numeric' | 'shuffle';

export default function MetinSiralayici() {
  const [inputText, setInputText] = useState<string>(
    'İstanbul\nAnkara\nİzmir\nBursa\nAntalya\nAdana\nTrabzon\nÇanakkale'
  );
  const [outputText, setOutputText] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handleSort = (mode: SortMode) => {
    const lines = inputText.split('\n').filter((l) => l.trim().length > 0);

    if (mode === 'az') {
      lines.sort((a, b) => a.localeCompare(b, 'tr'));
    } else if (mode === 'za') {
      lines.sort((a, b) => b.localeCompare(a, 'tr'));
    } else if (mode === 'length_asc') {
      lines.sort((a, b) => a.length - b.length);
    } else if (mode === 'length_desc') {
      lines.sort((a, b) => b.length - a.length);
    } else if (mode === 'numeric') {
      lines.sort((a, b) => parseFloat(a) - parseFloat(b));
    } else if (mode === 'shuffle') {
      for (let i = lines.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lines[i], lines[j]] = [lines[j], lines[i]];
      }
    }

    setOutputText(lines.join('\n'));
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
              Sıralanacak Metin / Liste (Her satıra bir eleman)
            </label>
            <textarea
              id="input"
              rows={5}
              placeholder="Satırları buraya yapıştırın..."
              className="w-full rounded-lg border border-border bg-background p-3 text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleSort('az')}
              className="py-2 px-3 bg-primary text-primary-foreground text-xs font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all"
            >
              🔤 A&apos;dan Z&apos;ye Sırala
            </button>
            <button
              type="button"
              onClick={() => handleSort('za')}
              className="py-2 px-3 bg-primary text-primary-foreground text-xs font-bold rounded-lg shadow-sm hover:bg-primary/90 transition-all"
            >
              🔤 Z&apos;den A&apos;ya Sırala
            </button>
            <button
              type="button"
              onClick={() => handleSort('numeric')}
              className="py-2 px-3 bg-muted hover:bg-muted/80 text-foreground text-xs font-bold rounded-lg border border-border transition-all"
            >
              🔢 Sayısal Sırala
            </button>
            <button
              type="button"
              onClick={() => handleSort('length_asc')}
              className="py-2 px-3 bg-muted hover:bg-muted/80 text-foreground text-xs font-bold rounded-lg border border-border transition-all"
            >
              📏 Kısa&apos;dan Uzun&apos;a
            </button>
            <button
              type="button"
              onClick={() => handleSort('length_desc')}
              className="py-2 px-3 bg-muted hover:bg-muted/80 text-foreground text-xs font-bold rounded-lg border border-border transition-all"
            >
              📏 Uzun&apos;dan Kısa&apos;ya
            </button>
            <button
              type="button"
              onClick={() => handleSort('shuffle')}
              className="py-2 px-3 bg-muted hover:bg-muted/80 text-foreground text-xs font-bold rounded-lg border border-border transition-all"
            >
              🔀 Rastgele Karıştır
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="output" className="block text-sm font-medium text-foreground">
                Sıralanmış Çıktı
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
              className="w-full rounded-lg border border-border bg-muted/30 p-3 text-foreground font-mono text-sm focus:outline-none"
              value={outputText}
            />
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Türkçe Harf Duyarlı Metin Sıralama</h2>
        <p className="mb-4 text-muted-foreground">
          Türkçe karakter sıralama kurallarına (Ç, Ğ, İ, Ö, Ş, Ü) tam uyumlu olarak metin listelerinizi alfabetik, sayısal veya uzunluk sırasına dizebilirsiniz.
        </p>
      </div>
    </div>
  );
}
