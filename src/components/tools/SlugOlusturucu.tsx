'use client';

import { useState, useMemo } from 'react';

export default function SlugOlusturucu() {
  const [input, setInput] = useState('');
  const [separator, setSeparator] = useState<'-' | '_'>('-');
  const [lowercase, setLowercase] = useState(true);
  const [copied, setCopied] = useState(false);

  const slug = useMemo(() => {
    if (!input.trim()) return '';

    let text = input.trim();

    // Türkçe karakter dönüşümleri
    const trMap: Record<string, string> = {
      'ç': 'c', 'Ç': 'c',
      'ğ': 'g', 'Ğ': 'g',
      'ı': 'i', 'I': 'i',
      'İ': 'i', 'i': 'i',
      'ö': 'o', 'Ö': 'o',
      'ş': 's', 'Ş': 's',
      'ü': 'u', 'Ü': 'u',
      'â': 'a', 'Â': 'a',
      'î': 'i', 'Î': 'i',
      'û': 'u', 'Û': 'u'
    };

    text = text.replace(/[çÇğĞıIİiöÖşŞüÜâÂîÎûÛ]/g, (match) => trMap[match] || match);

    if (lowercase) {
      text = text.toLowerCase();
    }

    // Özel ve alfanümerik olmayan karakterleri ayırıcıya dönüştür
    const sepPattern = separator === '-' ? /[^a-zA-Z0-9]+/g : /[^a-zA-Z0-9]+/g;
    text = text.replace(sepPattern, separator);

    // Baştaki ve sondaki ayırıcıları temizle
    const trimRegex = new RegExp(`^\\${separator}+|\\${separator}+$`, 'g');
    text = text.replace(trimRegex, '');

    return text;
  }, [input, separator, lowercase]);

  const handleCopy = () => {
    if (!slug) return;
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
        <div className="space-y-6">
          <div>
            <label htmlFor="slug-input" className="block text-sm font-semibold text-foreground mb-2">
              Başlık veya Metin
            </label>
            <input
              type="text"
              id="slug-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Örn: KDV Nasıl Hesaplanır?"
              className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
            />
          </div>

          {/* Ayarlar */}
          <div className="flex flex-wrap items-center gap-6 pt-2 border-t border-border/50 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-muted-foreground font-medium">Ayırıcı Karakter:</span>
              <button
                type="button"
                onClick={() => setSeparator('-')}
                className={`px-3 py-1 rounded-lg font-semibold text-xs transition-colors ${
                  separator === '-'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                Tire (-)
              </button>
              <button
                type="button"
                onClick={() => setSeparator('_')}
                className={`px-3 py-1 rounded-lg font-semibold text-xs transition-colors ${
                  separator === '_'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
              >
                Alt Çizgi (_)
              </button>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={lowercase}
                onChange={(e) => setLowercase(e.target.checked)}
                className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
              />
              <span className="text-foreground font-medium">Tümünü Küçük Harfe Çevir</span>
            </label>
          </div>

          {/* Sonuç Alanı */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Oluşturulan SEO URL Slug
              </span>
              {slug && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  {copied ? 'Kopyalandı!' : 'Kopyala'}
                </button>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 p-4 rounded-xl bg-muted/20 border border-border">
              <span className="font-mono text-sm sm:text-base text-foreground break-all select-all">
                {slug || 'Henüz bir metin girmediniz.'}
              </span>
              {slug && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="shrink-0 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground font-semibold text-xs hover:bg-primary/90 transition-colors shadow-xs"
                >
                  {copied ? 'Kopyalandı' : 'Kopyala'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* SEO ve Bilgi Rehberi */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">SEO Uyumlu URL (Slug) Neden Önemlidir?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Arama motorları (Google, Bing vb.) URL yapılarında Türkçe karakterler, boşluklar veya noktalama işaretleri yerine standart ASCII karakterleri ve tire (-) ile ayrılmış temiz dizgeleri tercih eder. Temiz bir URL hem tıklanma oranını (CTR) artırır hem de kullanıcıların linki güvenle paylaşmasını sağlar.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Slug ayrımında tire (-) mi yoksa alt çizgi (_) mi kullanılmalı?</h3>
              <p className="text-muted-foreground">
                Google SEO kılavuzlarına göre kelimeleri ayırmak için alt çizgi yerine <strong>tire (-)</strong> kullanılması tavsiye edilir.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Türkçe karakterler nasıl işlenir?</h3>
              <p className="text-muted-foreground">
                &apos;ç, ğ, ı, ö, ş, ü&apos; gibi harfler sırasıyla uluslararası standart olan &apos;c, g, i, o, s, u&apos; harflerine dönüştürülür ve geçersiz karakterler otomatik temizlenir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
