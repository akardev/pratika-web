'use client';

import { useState } from 'react';

export default function Base64Donusturucu() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // UTF-8 uyumlu Base64 Encode
  const encodeBase64 = (str: string) => {
    try {
      setError(null);
      const bytes = new TextEncoder().encode(str);
      const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('');
      return btoa(binString);
    } catch {
      setError('Kodlama sırasında bir hata oluştu.');
      return '';
    }
  };

  // UTF-8 uyumlu Base64 Decode
  const decodeBase64 = (b64: string) => {
    try {
      setError(null);
      const binString = atob(b64.trim());
      const bytes = Uint8Array.from(binString, (m) => m.charCodeAt(0));
      return new TextDecoder().decode(bytes);
    } catch {
      setError('Geçersiz Base64 formatı. Lütfen girdi dizgesini kontrol edin.');
      return '';
    }
  };

  const handleConvert = () => {
    if (!input) {
      setOutput('');
      setError(null);
      return;
    }

    if (mode === 'encode') {
      const res = encodeBase64(input);
      setOutput(res);
    } else {
      const res = decodeBase64(input);
      setOutput(res);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    const nextMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(nextMode);
    setInput(output);
    setOutput(input);
    setError(null);
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
        {/* Mod Seçici */}
        <div className="flex items-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => {
              setMode('encode');
              setError(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === 'encode'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'bg-muted/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            Metni Base64&apos;e Çevir (Encode)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('decode');
              setError(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              mode === 'decode'
                ? 'bg-primary text-primary-foreground shadow-xs'
                : 'bg-muted/60 text-muted-foreground hover:text-foreground'
            }`}
          >
            Base64&apos;ü Metne Çöz (Decode)
          </button>
        </div>

        {/* Girdi Alanı */}
        <div className="space-y-4">
          <div>
            <label htmlFor="b64-in" className="block text-sm font-semibold text-foreground mb-2">
              {mode === 'encode' ? 'Düz Metin (Metninizi girin):' : 'Base64 Dizgesi (Çözülecek kod):'}
            </label>
            <textarea
              id="b64-in"
              rows={5}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === 'encode'
                  ? 'Base64 formatına çevirmek istediğiniz metni yazın...'
                  : 'Çözmek istediğiniz Base64 dizgesini yapıştırın... (Örn: UHJhdGlrYQ==)'
              }
              className="w-full rounded-xl border border-border bg-background p-4 text-foreground text-sm font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleConvert}
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-xs"
            >
              {mode === 'encode' ? 'Base64 Kodla' : 'Metne Çöz'}
            </button>

            {output && (
              <button
                type="button"
                onClick={handleSwap}
                className="px-4 py-2.5 rounded-xl bg-card border border-border/80 text-foreground font-semibold text-sm hover:bg-muted/40 transition-all"
              >
                Girdi ve Çıktıyı Değiştir ⇄
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                setInput('');
                setOutput('');
                setError(null);
              }}
              className="px-4 py-2.5 rounded-xl bg-muted text-muted-foreground font-semibold text-sm hover:text-foreground transition-all"
            >
              Temizle
            </button>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-xl border border-destructive/20 font-medium">
              {error}
            </div>
          )}

          {/* Çıktı Alanı */}
          {output && (
            <div className="pt-4 border-t border-border/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Dönüşüm Sonucu
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  {copied ? 'Kopyalandı!' : 'Sonucu Kopyala'}
                </button>
              </div>
              <textarea
                readOnly
                rows={5}
                value={output}
                className="w-full rounded-xl border border-border bg-muted/20 p-4 text-foreground font-mono text-sm leading-relaxed"
              />
            </div>
          )}
        </div>
      </div>

      {/* Bilgilendirme */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">Base64 Nedir?</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Base64, ikili (binary) verileri veya metinleri yalnızca 64 adet yazdırılabilir ASCII karakteri kullanarak temsil eden bir kodlama algoritmasıdır. E-posta ekleri, veri URI&apos;leri ve API veri transferlerinde yaygın olarak kullanılır.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Base64 bir şifreleme (encryption) yöntemi midir?</h3>
              <p className="text-muted-foreground">
                Hayır. Base64 bir şifreleme değil, veri formatlama (encoding) algoritmasıdır. Herhangi bir anahtara gerek kalmadan herkes tarafından kolayca çözülebilir.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">Türkçe karakterler bozulur mu?</h3>
              <p className="text-muted-foreground">
                Pratika Base64 dönüştürücü UTF-8 standardını destekler; bu sayede Türkçe karakterler (ç, ğ, ı, ö, ş, ü) ve emojiler bozulmadan kodlanır ve çözülür.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
