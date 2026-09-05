'use client';

import { useState } from 'react';

export default function Sha512HashUretici() {
  const [text, setText] = useState('');
  const [hash, setHash] = useState('');

  const handleHash = async (val: string) => {
    setText(val);
    if (!val) {
      setHash('');
      return;
    }
    const enc = new TextEncoder();
    const digest = await crypto.subtle.digest('SHA-512', enc.encode(val));
    const hex = Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('');
    setHash(hex);
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <label htmlFor="input" className="block text-sm font-medium text-foreground mb-1">
            Özeti (Hash) Alınacak Metin
          </label>
          <textarea
            id="input"
            rows={4}
            value={text}
            onChange={(e) => handleHash(e.target.value)}
            placeholder="Metninizi buraya yazın veya yapıştırın..."
            className="w-full p-3 rounded-lg border border-border bg-background text-sm font-mono"
          />
        </div>

        {hash && (
          <div className="pt-4 border-t border-border space-y-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              SHA-512 Çıktısı (128 Hex Karakter):
            </span>
            <div className="p-4 rounded-lg bg-muted/40 border border-border font-mono text-xs break-all select-all text-primary font-bold">
              {hash}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
