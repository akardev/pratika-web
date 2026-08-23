'use client';

import { useState } from 'react';

export default function JsonFormatlayici() {
  const [input, setInput] = useState('');
  const [indent, setIndent] = useState<number>(2);
  const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message?: string }>({
    type: 'idle',
  });
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    if (!input.trim()) {
      setStatus({ type: 'idle' });
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indent);
      setInput(formatted);
      setStatus({ type: 'success', message: 'Geçerli JSON: Başarıyla biçimlendirildi.' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sözdizimi hatası';
      setStatus({ type: 'error', message: `Geçersiz JSON: ${msg}` });
    }
  };

  const handleMinify = () => {
    if (!input.trim()) {
      setStatus({ type: 'idle' });
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setInput(minified);
      setStatus({ type: 'success', message: 'Geçerli JSON: Başarıyla sıkıştırıldı (minify edildi).' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sözdizimi hatası';
      setStatus({ type: 'error', message: `Geçersiz JSON: ${msg}` });
    }
  };

  const handleValidate = () => {
    if (!input.trim()) {
      setStatus({ type: 'idle' });
      return;
    }

    try {
      JSON.parse(input);
      setStatus({ type: 'success', message: 'JSON Sözdizimi Geçerli (Valid JSON).' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Sözdizimi hatası';
      setStatus({ type: 'error', message: `Geçersiz JSON: ${msg}` });
    }
  };

  const handleCopy = () => {
    if (!input) return;
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full space-y-8">
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 shadow-xs">
        {/* Kontrol Butonları */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleFormat}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-xs sm:text-sm hover:bg-primary/90 transition-all shadow-xs"
            >
              Formatla (Güzelleştir)
            </button>
            <button
              type="button"
              onClick={handleMinify}
              className="px-4 py-2 rounded-xl bg-card border border-border/80 text-foreground font-semibold text-xs sm:text-sm hover:bg-muted/40 transition-all"
            >
              Sıkıştır (Minify)
            </button>
            <button
              type="button"
              onClick={handleValidate}
              className="px-4 py-2 rounded-xl bg-card border border-border/80 text-foreground font-semibold text-xs sm:text-sm hover:bg-muted/40 transition-all"
            >
              Doğrula (Validate)
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <span>Girinti:</span>
              <select
                value={indent}
                onChange={(e) => setIndent(parseInt(e.target.value))}
                className="bg-muted/40 border border-border/70 rounded-lg px-2 py-1 text-foreground text-xs outline-none"
              >
                <option value={2}>2 Boşluk</option>
                <option value={4}>4 Boşluk</option>
              </select>
            </div>

            {input && (
              <button
                type="button"
                onClick={handleCopy}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-muted text-foreground hover:bg-muted/80 transition-colors"
              >
                {copied ? 'Kopyalandı!' : 'Kopyala'}
              </button>
            )}
          </div>
        </div>

        {/* Editör / Textarea */}
        <textarea
          rows={12}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setStatus({ type: 'idle' });
          }}
          placeholder='JSON verinizi buraya yapıştırın... (Örn: {"ad": "Pratika", "aracSayisi": 50, "aktif": true})'
          className="w-full rounded-xl border border-border bg-background p-4 text-foreground font-mono text-xs sm:text-sm leading-relaxed resize-y focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          spellCheck={false}
        />

        {/* Durum Bildirimi */}
        {status.type !== 'idle' && (
          <div
            className={`mt-4 p-3.5 rounded-xl text-xs sm:text-sm font-medium border flex items-center gap-2 ${
              status.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-900'
                : 'bg-destructive/10 text-destructive border-destructive/20'
            }`}
          >
            <span>{status.type === 'success' ? '✓' : '⚠'}</span>
            <span>{status.message}</span>
          </div>
        )}
      </div>

      {/* Bilgilendirme ve SSS */}
      <div className="bg-card rounded-2xl border border-border/60 p-6 sm:p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-foreground mb-2">Gizlilik Garantisi</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Girdiğiniz hiçbir JSON verisi Pratika sunucularına gönderilmez veya kaydedilmez. Tüm formatlama, minify ve doğrulama işlemleri doğrudan tarayıcınızın JavaScript motoru tarafından cihazınızda gerçekleştirilir.
          </p>
        </div>

        <div className="border-t border-border/60 pt-6">
          <h2 className="text-lg font-bold text-foreground mb-4">Sıkça Sorulan Sorular</h2>
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-foreground mb-1">JSON Beautify (Güzelleştirme) ne işe yarar?</h3>
              <p className="text-muted-foreground">
                Tek satır halinde sıkıştırılmış veya okunması zor JSON dizgelerine hiyerarşik girintiler ve satır sonları ekleyerek insan gözü için okunabilir hale getirir.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-1">JSON Minify (Sıkıştırma) nerede kullanılır?</h3>
              <p className="text-muted-foreground">
                Gereksiz boşlukları ve satır sonlarını temizleyerek JSON dosyasının veri boyutunu küçültür. API isteklerinde ve bant genişliği optimizasyonunda tercih edilir.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
