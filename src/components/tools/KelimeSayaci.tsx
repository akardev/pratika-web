'use client';

import { useState, useMemo } from 'react';

export default function KelimeSayaci() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const raw = text;
    const trimmed = raw.trim();

    const charCountWithSpaces = raw.length;
    const charCountWithoutSpaces = raw.replace(/\s+/g, '').length;
    
    const words = trimmed.length > 0 ? trimmed.split(/\s+/).filter(Boolean) : [];
    const wordCount = words.length;

    const sentences = trimmed.length > 0 ? trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0) : [];
    const sentenceCount = sentences.length;

    const paragraphs = trimmed.length > 0 ? trimmed.split(/\n+/).filter((p) => p.trim().length > 0) : [];
    const paragraphCount = paragraphs.length;

    // Ortalama okuma hızı: dakikada 200-220 kelime
    const readingTimeMinutes = Math.ceil(wordCount / 200);
    // Konuşma süresi: dakikada ~130 kelime
    const speakingTimeMinutes = Math.ceil(wordCount / 130);

    return {
      charCountWithSpaces,
      charCountWithoutSpaces,
      wordCount,
      sentenceCount,
      paragraphCount,
      readingTimeMinutes: wordCount > 0 ? readingTimeMinutes : 0,
      speakingTimeMinutes: wordCount > 0 ? speakingTimeMinutes : 0,
    };
  }, [text]);

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setText('');
  };

  return (
    <div className="w-full space-y-8">
      {/* Ana Araç Kartı */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <label htmlFor="text-input" className="text-sm font-semibold text-foreground">
            Metninizi Girin veya Yapıştırın
          </label>
          <div className="flex items-center gap-2">
            {text && (
              <>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
                >
                  {copied ? 'Kopyalandı!' : 'Metni Kopyala'}
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                >
                  Temizle
                </button>
              </>
            )}
          </div>
        </div>

        <textarea
          id="text-input"
          rows={7}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="İstatistiklerini hesaplamak istediğiniz metni buraya yazın veya yapıştırın..."
          className="w-full rounded-xl border border-border bg-background p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base leading-relaxed resize-y"
        />

        {/* İstatistik Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6">
          <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-center">
            <span className="text-xs text-muted-foreground block mb-1">Kelime Sayısı</span>
            <span className="text-2xl font-bold text-foreground">{stats.wordCount}</span>
          </div>

          <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-center">
            <span className="text-xs text-muted-foreground block mb-1">Karakter (Boşluklu)</span>
            <span className="text-2xl font-bold text-foreground">{stats.charCountWithSpaces}</span>
          </div>

          <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-center">
            <span className="text-xs text-muted-foreground block mb-1">Karakter (Boşluksuz)</span>
            <span className="text-2xl font-bold text-foreground">{stats.charCountWithoutSpaces}</span>
          </div>

          <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-center">
            <span className="text-xs text-muted-foreground block mb-1">Cümle Sayısı</span>
            <span className="text-2xl font-bold text-foreground">{stats.sentenceCount}</span>
          </div>

          <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-center">
            <span className="text-xs text-muted-foreground block mb-1">Paragraf Sayısı</span>
            <span className="text-2xl font-bold text-foreground">{stats.paragraphCount}</span>
          </div>

          <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-center">
            <span className="text-xs text-muted-foreground block mb-1">Tahmini Okuma Süresi</span>
            <span className="text-2xl font-bold text-primary">
              {stats.readingTimeMinutes} <span className="text-xs font-normal text-muted-foreground">dk</span>
            </span>
          </div>

          <div className="p-4 rounded-xl bg-muted/20 border border-border/60 text-center col-span-2 sm:col-span-2">
            <span className="text-xs text-muted-foreground block mb-1">Tahmini Konuşma / Sunum Süresi</span>
            <span className="text-2xl font-bold text-primary">
              {stats.speakingTimeMinutes} <span className="text-xs font-normal text-muted-foreground">dakika</span>
            </span>
          </div>
        </div>
      </div>

      {/* Nasıl Çalışır & SSS */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">Nasıl Kullanılır?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Metin kutusuna doğrudan yazabilir veya harici bir belgeden metin kopyalayabilirsiniz.
            Tüm kelime, harf, cümle ve okuma süresi istatistikleri siz yazdıkça anında ve tamamen tarayıcınızda hesaplanır.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Girdiğim metinler sunucuya kaydedilir mi?</h3>
              <p className="text-muted-foreground">
                Hayır. Pratika Kelime Sayacı %100 tarayıcınızda çalışır. Metniniz hiçbir sunucuya iletilmez ve saklanmaz.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Okuma ve konuşma süresi nasıl hesaplanır?</h3>
              <p className="text-muted-foreground">
                Yetişkin bir insanın ortalama sessiz okuma hızı dakikada 200 kelime, sunum veya sesli konuşma hızı ise dakikada yaklaşık 130 kelimedir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
