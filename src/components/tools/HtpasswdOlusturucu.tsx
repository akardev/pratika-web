'use client';

import { useState } from 'react';

export default function HtpasswdOlusturucu() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [output, setOutput] = useState('');

  const generateSha1Apache = async (pass: string) => {
    const enc = new TextEncoder();
    const digest = await crypto.subtle.digest('SHA-1', enc.encode(pass));
    const b64 = btoa(String.fromCharCode(...new Uint8Array(digest)));
    return `{SHA}${b64}`;
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    const hash = await generateSha1Apache(password);
    setOutput(`${username}:${hash}`);
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="u" className="block text-sm font-medium text-foreground mb-1">Kullanıcı Adı</label>
              <input
                id="u"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="p" className="block text-sm font-medium text-foreground mb-1">Parola</label>
              <input
                id="p"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                placeholder="Parola girin..."
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            .htpasswd Satırı Üret
          </button>
        </form>

        {output && (
          <div className="mt-8 pt-6 border-t border-border space-y-2">
            <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              .htpasswd Dosyanıza Ekleyin:
            </span>
            <div className="p-4 rounded-lg bg-muted/40 border border-border font-mono text-sm break-all select-all">
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
