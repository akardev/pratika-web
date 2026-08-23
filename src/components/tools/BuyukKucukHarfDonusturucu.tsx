'use client';

import { useState } from 'react';

export default function BuyukKucukHarfDonusturucu() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const toUpperCaseTR = () => {
    setText((prev) => prev.toLocaleUpperCase('tr-TR'));
  };

  const toLowerCaseTR = () => {
    setText((prev) => prev.toLocaleLowerCase('tr-TR'));
  };

  const toTitleCaseTR = () => {
    setText((prev) => {
      return prev
        .toLocaleLowerCase('tr-TR')
        .split(/(\s+)/)
        .map((word) => {
          if (!word || /^\s+$/.test(word)) return word;
          return word.charAt(0).toLocaleUpperCase('tr-TR') + word.slice(1);
        })
        .join('');
    });
  };

  const toSentenceCaseTR = () => {
    setText((prev) => {
      const lower = prev.toLocaleLowerCase('tr-TR');
      return lower.replace(/(^\s*|[.!?]\s*)([a-zçğıöşü])/gi, (match) => match.toLocaleUpperCase('tr-TR'));
    });
  };

  const toAlternatingCase = () => {
    setText((prev) => {
      let uppercase = false;
      return prev
        .split('')
        .map((char) => {
          if (/[a-zA-ZçÇğĞıİöÖşŞüÜ]/.test(char)) {
            uppercase = !uppercase;
            return uppercase ? char.toLocaleUpperCase('tr-TR') : char.toLocaleLowerCase('tr-TR');
          }
          return char;
        })
        .join('');
    });
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <label htmlFor="case-input" className="text-sm font-semibold text-foreground">
            Dönüştürülecek Metin
          </label>
          <div className="flex items-center gap-2">
            {text && (
              <>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
                >
                  {copied ? 'Kopyalandı!' : 'Sonucu Kopyala'}
                </button>
                <button
                  type="button"
                  onClick={() => setText('')}
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                >
                  Temizle
                </button>
              </>
            )}
          </div>
        </div>

        <textarea
          id="case-input"
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Dönüştürmek istediğiniz metni buraya yapıştırın..."
          className="w-full rounded-xl border border-border bg-background p-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base leading-relaxed resize-y"
        />

        {/* Dönüştürme Butonları */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-3 mt-6">
          <button
            type="button"
            onClick={toUpperCaseTR}
            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-xs"
          >
            BÜYÜK HARF
          </button>
          <button
            type="button"
            onClick={toLowerCaseTR}
            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-xs"
          >
            küçük harf
          </button>
          <button
            type="button"
            onClick={toTitleCaseTR}
            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-xs"
          >
            Başlık Düzeni
          </button>
          <button
            type="button"
            onClick={toSentenceCaseTR}
            className="px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-xs"
          >
            Cümle düzeni
          </button>
          <button
            type="button"
            onClick={toAlternatingCase}
            className="px-4 py-2.5 rounded-xl bg-card border border-border/80 text-foreground font-semibold text-xs sm:text-sm hover:bg-muted/40 transition-all"
          >
            dEğİşKeN hArF
          </button>
        </div>
      </div>

      {/* Bilgilendirme ve SSS */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">Türkçe Karakter Uyumlu Dönüşüm</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Standart harf dönüştürücüler genellikle Türkçe&apos;deki <strong>&apos;i&apos; → &apos;İ&apos;</strong> ve <strong>&apos;I&apos; → &apos;ı&apos;</strong> kurallarını bozarak hatalı sonuçlar üretir. Pratika Harf Dönüştürücü, Türkçe dil bilgisi standartlarına tam uyumlu olarak harfleri dönüştürür.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Başlık düzeni ile cümle düzeni arasındaki fark nedir?</h3>
              <p className="text-muted-foreground">
                Başlık düzeni metindeki her kelimenin ilk harfini büyütür. Cümle düzeni ise yalnızca nokta, ünlem ve soru işaretinden sonra başlayan yeni cümlenin ilk harfini büyütür.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Dönüştürme işleminde metin sınırı var mı?</h3>
              <p className="text-muted-foreground">
                Hayır. İşlem doğrudan cihazınızın tarayıcısında gerçekleştiği için uzun makale veya belgeleri dilediğinizce dönüştürebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
