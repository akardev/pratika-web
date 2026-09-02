'use client';

import { useState } from 'react';

export default function JwtTokenCozucu() {
  const [token, setToken] = useState<string>('');
  const [headerJson, setHeaderJson] = useState<string>('');
  const [payloadJson, setPayloadJson] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleDecode = (jwtStr: string) => {
    setToken(jwtStr);
    setError(null);

    const trimmed = jwtStr.trim();
    if (!trimmed) {
      setHeaderJson('');
      setPayloadJson('');
      return;
    }

    const parts = trimmed.split('.');
    if (parts.length < 2) {
      setError('Geçersiz JWT formatı. JWT en az iki nokta ile ayrılmış 3 parçadan oluşur.');
      return;
    }

    try {
      // Base64Url decode
      const decodeBase64Url = (str: string) => {
        let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) base64 += '=';
        return decodeURIComponent(
          atob(base64)
            .split('')
            .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
      };

      const header = JSON.parse(decodeBase64Url(parts[0]));
      const payload = JSON.parse(decodeBase64Url(parts[1]));

      setHeaderJson(JSON.stringify(header, null, 2));
      setPayloadJson(JSON.stringify(payload, null, 2));
    } catch {
      setError('Token çözülürken hata oluştu. Base64 veya JSON formatı bozuk.');
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <label htmlFor="jwt" className="block text-sm font-medium text-foreground mb-1.5">
            JSON Web Token (JWT) Yapıştırın
          </label>
          <textarea
            id="jwt"
            rows={4}
            value={token}
            onChange={(e) => handleDecode(e.target.value)}
            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            className="w-full p-3 rounded-lg border border-border bg-background text-xs font-mono break-all focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {error && <p className="text-xs text-destructive font-medium">{error}</p>}

        {(headerJson || payloadJson) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                HEADER (Algoritma & Token Tipi)
              </span>
              <pre className="p-3 rounded-lg border border-border bg-muted/30 text-xs font-mono overflow-x-auto text-rose-600 dark:text-rose-400">
                {headerJson}
              </pre>
            </div>
            <div>
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-1.5">
                PAYLOAD (Veri / Claims)
              </span>
              <pre className="p-3 rounded-lg border border-border bg-muted/30 text-xs font-mono overflow-x-auto text-purple-600 dark:text-purple-400">
                {payloadJson}
              </pre>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-4 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">🔒 %100 Güvenli İstemci Taraflı (Client-Side) Çözümleme:</p>
        <p>Token çözümleme işlemi tamamen tarayıcınızın belleğinde gerçekleşir. Girdiğiniz hiçbir veri veya token sunucuya gönderilmez.</p>
      </div>
    </div>
  );
}
