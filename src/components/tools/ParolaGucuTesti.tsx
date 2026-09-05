'use client';

import { useState } from 'react';

export default function ParolaGucuTesti() {
  const [password, setPassword] = useState('');

  const calculateEntropy = (pwd: string) => {
    if (!pwd) return { entropy: 0, crackTime: '0 saniye', score: 0, feedback: [] };

    let pool = 0;
    if (/[a-z]/.test(pwd)) pool += 26;
    if (/[A-Z]/.test(pwd)) pool += 26;
    if (/[0-9]/.test(pwd)) pool += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) pool += 33;

    const entropy = Math.round(pwd.length * Math.log2(pool || 1));
    const combinations = Math.pow(pool || 1, pwd.length);
    // Varsayım: Saniyede 10 milyar deneme (modern GPU)
    const seconds = combinations / 1e10;

    let crackTime = 'Anında';
    if (seconds > 31536000000000) crackTime = 'Trilyonlarca Yıl';
    else if (seconds > 31536000000) crackTime = 'Milyonlarca Yıl';
    else if (seconds > 31536000) crackTime = `${Math.round(seconds / 31536000)} Yıl`;
    else if (seconds > 86400) crackTime = `${Math.round(seconds / 86400)} Gün`;
    else if (seconds > 3600) crackTime = `${Math.round(seconds / 3600)} Saat`;
    else if (seconds > 60) crackTime = `${Math.round(seconds / 60)} Dakika`;
    else if (seconds > 1) crackTime = `${Math.round(seconds)} Saniye`;

    const feedback = [];
    if (pwd.length < 8) feedback.push('Parola en az 8 karakter olmalıdır.');
    if (!/[A-Z]/.test(pwd)) feedback.push('Büyük harf ekleyin.');
    if (!/[0-9]/.test(pwd)) feedback.push('Rakam ekleyin.');
    if (!/[^a-zA-Z0-9]/.test(pwd)) feedback.push('Özel karakter (#, $, %, ! vb.) ekleyin.');

    let score = 1;
    if (entropy > 75) score = 4;
    else if (entropy > 50) score = 3;
    else if (entropy > 30) score = 2;

    return { entropy, crackTime, score, feedback };
  };

  const { entropy, crackTime, score, feedback } = calculateEntropy(password);

  const getScoreColor = () => {
    switch (score) {
      case 4: return 'bg-emerald-500 text-emerald-500';
      case 3: return 'bg-blue-500 text-blue-500';
      case 2: return 'bg-amber-500 text-amber-500';
      default: return 'bg-destructive text-destructive';
    }
  };

  const getScoreLabel = () => {
    switch (score) {
      case 4: return 'Çok Güçlü';
      case 3: return 'Güçlü';
      case 2: return 'Orta';
      default: return 'Zayıf';
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div>
          <label htmlFor="pwd" className="block text-sm font-medium text-foreground mb-1">
            Test Etmek İstediğiniz Parolayı Girin
          </label>
          <input
            id="pwd"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parolanızı buraya yazın..."
            className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm font-mono"
          />
          <span className="text-xs text-muted-foreground mt-1 block">
            Parolanız tamamen tarayıcınızda yerel olarak değerlendirilir, hiçbir yere iletilmez.
          </span>
        </div>

        {password && (
          <div className="pt-4 border-t border-border space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Güvenlik Seviyesi:</span>
              <span className={`text-sm font-bold ${getScoreColor().split(' ')[1]}`}>
                {getScoreLabel()} ({entropy} bit entropi)
              </span>
            </div>

            <div className="w-full bg-muted h-2.5 rounded-full overflow-hidden flex gap-1">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-full flex-1 transition-colors ${score >= step ? getScoreColor().split(' ')[0] : 'bg-transparent'}`}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Süper Bilgisayar Kırma Süresi</span>
                <span className="text-xl font-bold text-foreground">{crackTime}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Uzunluk</span>
                <span className="text-xl font-bold text-foreground">{password.length} Karakter</span>
              </div>
            </div>

            {feedback.length > 0 && (
              <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-700 dark:text-amber-300 space-y-1">
                <span className="font-semibold block mb-1">Geliştirme Tavsiyeleri:</span>
                {feedback.map((item, idx) => (
                  <div key={idx}>• {item}</div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
