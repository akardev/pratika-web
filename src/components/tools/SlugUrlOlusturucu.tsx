'use client';

import { useState } from 'react';

export default function SlugUrlOlusturucu() {
  const [inputText, setInputText] = useState<string>(
    'Pratika 2025 Yılı En İyi Hesaplama & Dönüştürme Araçları!'
  );
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [toLowerCase, setToLowerCase] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const generateSlug = (text: string) => {
    let str = text;

    const trMap: Record<string, string> = {
      'ç': 'c', 'Ç': 'c',
      'ğ': 'g', 'Ğ': 'g',
      'ı': 'i', 'I': 'i', 'İ': 'i',
      'ö': 'o', 'Ö': 'o',
      'ş': 's', 'Ş': 's',
      'ü': 'u', 'Ü': 'u',
    };

    str = str.replace(/[çÇğĞıIİöÖşŞüÜ]/g, (match) => trMap[match] || match);

    if (toLowerCase) {
      str = str.toLowerCase();
    }

    // Özel karakterleri temizle
    str = str
      .replace(/[^a-zA-Z0-9\s-_]/g, '')
      .trim()
      .replace(/\s+/g, separator)
      .replace(new RegExp(`\\${separator}+`, 'g'), separator);

    return str;
  };

  const outputSlug = generateSlug(inputText);

  const handleCopy = () => {
    if (outputSlug) {
      navigator.clipboard.writeText(outputSlug);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="space-y-6">
          <div>
            <label htmlFor="inputTitle" className="block text-sm font-medium mb-1.5 text-foreground">
              Başlık veya Metin
            </label>
            <input
              type="text"
              id="inputTitle"
              placeholder="Örn: Pratika Yeni Hesaplama Araçları..."
              className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-medium text-foreground">
            <div className="flex items-center gap-2">
              <span>Ayırıcı:</span>
              <button
                type="button"
                onClick={() => setSeparator('-')}
                className={`px-2.5 py-1 rounded border ${
                  separator === '-' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                }`}
              >
                Tire (-)
              </button>
              <button
                type="button"
                onClick={() => setSeparator('_')}
                className={`px-2.5 py-1 rounded border ${
                  separator === '_' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                }`}
              >
                Alt Çizgi (_)
              </button>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={toLowerCase}
                onChange={(e) => setToLowerCase(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary"
              />
              Küçük Harfe Çevir (lowercase)
            </label>
          </div>

          <div className="p-4 bg-muted/20 rounded-xl border border-border space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                SEO Uyumlu URL Slug
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-semibold px-2.5 py-1 rounded bg-muted hover:bg-muted/80 text-foreground border border-border transition-colors"
              >
                {copied ? 'Kopyalandı! ✓' : 'Kopyala'}
              </button>
            </div>
            <p className="font-mono text-base sm:text-lg text-primary break-all font-bold select-all">
              {outputSlug || 'slug-burada-goruntulenecek'}
            </p>
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Slug (URL Dostu Metin) Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          Slug, web sayfalarının linklerinde kullanılan, Türkçe karakterlerden, boşluklardan ve özel sembollerden arındırılmış temiz URL adresidir. Arama motoru optimizasyonu (SEO) için kritik öneme sahiptir.
        </p>
      </div>
    </div>
  );
}
