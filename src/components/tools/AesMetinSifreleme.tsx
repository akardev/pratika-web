'use client';

import { useState } from 'react';

export default function AesMetinSifreleme() {
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const getCryptoKey = async (pass: string, salt: Uint8Array) => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(pass), 'PBKDF2', false, ['deriveKey']);
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: salt as unknown as BufferSource, iterations: 100000, hash: 'SHA-256' },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  };

  const handleProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setOutput('');

    if (!text || !password) {
      setError('Lütfen metin ve parola alanlarını doldurun.');
      return;
    }

    try {
      const enc = new TextEncoder();
      if (mode === 'encrypt') {
        const salt = crypto.getRandomValues(new Uint8Array(16));
        const iv = crypto.getRandomValues(new Uint8Array(12));
        const key = await getCryptoKey(password, salt);
        const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(text));

        const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
        combined.set(salt, 0);
        combined.set(iv, salt.length);
        combined.set(new Uint8Array(encrypted), salt.length + iv.length);

        const b64 = btoa(String.fromCharCode(...combined));
        setOutput(b64);
      } else {
        const raw = atob(text.trim());
        const bytes = new Uint8Array(raw.length);
        for (let i = 0; i < raw.length; i++) bytes[i] = raw.charCodeAt(i);

        if (bytes.length < 28) {
          throw new Error('Geçersiz şifrelenmiş metin.');
        }

        const salt = bytes.slice(0, 16);
        const iv = bytes.slice(16, 28);
        const data = bytes.slice(28);

        const key = await getCryptoKey(password, salt);
        const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, data);
        setOutput(new TextDecoder().decode(decrypted));
      }
    } catch {
      setError(mode === 'encrypt' ? 'Şifreleme sırasında bir hata oluştu.' : 'Parola hatalı veya şifreli metin bozuk.');
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <form onSubmit={handleProcess} className="space-y-4">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => { setMode('encrypt'); setOutput(''); }}
              className={`flex-1 h-11 rounded-lg font-medium text-sm transition-colors ${mode === 'encrypt' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              Şifrele (AES-256)
            </button>
            <button
              type="button"
              onClick={() => { setMode('decrypt'); setOutput(''); }}
              className={`flex-1 h-11 rounded-lg font-medium text-sm transition-colors ${mode === 'decrypt' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              Şifre Çöz
            </button>
          </div>

          <div>
            <label htmlFor="txt" className="block text-sm font-medium text-foreground mb-1">
              {mode === 'encrypt' ? 'Şifrelenecek Düz Metin' : 'Şifresi Çözülecek Metin (Base64)'}
            </label>
            <textarea
              id="txt"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono"
            />
          </div>

          <div>
            <label htmlFor="pass" className="block text-sm font-medium text-foreground mb-1">Gizli Parola</label>
            <input
              id="pass"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              placeholder="Şifreleme anahtarı"
            />
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            {mode === 'encrypt' ? 'Metni Güvenle Şifrele' : 'Şifreyi Çöz'}
          </button>
        </form>

        {output && (
          <div className="mt-8 pt-6 border-t border-border space-y-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Sonuç:</span>
            <div className="p-4 rounded-lg bg-muted/40 border border-border font-mono text-sm break-all select-all">
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
