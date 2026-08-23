'use client';

import { useState } from 'react';

export default function UrlEncodeDecode() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    if (!input) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      setError(null);
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setError('Geçersiz URL formatı. Lütfen dizgeyi kontrol edin.');
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setInput(output);
    setOutput(input);
    setError(null);
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
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
            URL Encode (Kodla)
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
            URL Decode (Çöz)
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="url-input" className="block text-sm font-semibold text-foreground mb-2">
              {mode === 'encode' ? 'Normal URL veya Parametre Metni:' : 'Kodlanmış URL Dizgesi (Encoded):'}
            </label>
            <textarea
              id="url-input"
              rows={4}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === 'encode'
                  ? 'Örn: https://pratika.com.tr/araclar?kategori=finans ve para&q=kdv hesaplama'
                  : 'Örn: https%3A%2F%2Fpratika.com.tr%2Faraclar%3Fkategori%3Dfinans'
              }
              className="w-full rounded-xl border border-border bg-background p-4 text-foreground font-mono text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleConvert}
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all shadow-xs"
            >
              {mode === 'encode' ? 'URL Kodla (Encode)' : 'URL Çöz (Decode)'}
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

          {output && (
            <div className="pt-4 border-t border-border/60">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Sonuç
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  {copied ? 'Kopyalandı!' : 'Kopyala'}
                </button>
              </div>
              <textarea
                readOnly
                rows={4}
                value={output}
                className="w-full rounded-xl border border-border bg-muted/20 p-4 text-foreground font-mono text-sm leading-relaxed"
              />
            </div>
          )}
        </div>
      </div>

      {/* Bilgilendirme */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-4">
        <h2 className="text-lg font-bold text-foreground">URL Encoding (Yüzde Kodlaması) Nedir?</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          URL adreslerinde yalnızca belirli ASCII karakterleri güvenle taşınabilir. Boşluklar, Türkçe harfler, &quot;&amp;&quot;, &quot;?&quot;, &quot;=&quot; gibi özel karakterler web tarayıcıları ve sunucular tarafından doğru anlaşılabilmek için &quot;%20&quot;, &quot;%26&quot; gibi yüzde formatına çevrilir.
        </p>
      </div>
    </div>
  );
}
