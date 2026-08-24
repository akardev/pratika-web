'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, sanitizeNumericInput } from '@/lib/utils';

export default function YdsNetHesaplama() {
  const [correctCountStr, setCorrectCountStr] = useState<string>('64');

  const [result, setResult] = useState<{
    correctCount: number;
    score: number;
    level: string;
    levelDescription: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const c = parseInt(correctCountStr, 10);
    if (isNaN(c) || c < 0 || c > 80) {
      setError('Lütfen 0 ile 80 arasında geçerli bir doğru sayısı giriniz.');
      return;
    }

    // YDS / YÖKDİL: 80 soru × 1.25 = 100 Puan. Yanlışlar doğruyu GÖTÜRMEZ!
    const score = c * 1.25;

    let level = 'F (Başarısız)';
    let levelDescription = 'Seviye Belgesi Verilmez';

    if (score >= 90) { level = 'A Seviyesi'; levelDescription = 'Çok İleri Düzey (90 - 100)'; }
    else if (score >= 80) { level = 'B Seviyesi'; levelDescription = 'İleri Düzey (80 - 89)'; }
    else if (score >= 70) { level = 'C Seviyesi'; levelDescription = 'Orta Düzey (70 - 79)'; }
    else if (score >= 60) { level = 'D Seviyesi'; levelDescription = 'Yeterli Düzey (60 - 69)'; }
    else if (score >= 50) { level = 'E Seviyesi'; levelDescription = 'Temel Düzey (50 - 59)'; }

    setResult({
      correctCount: c,
      score,
      level,
      levelDescription,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="correctCount" className="block text-sm font-medium mb-1 text-foreground">
                Doğru Cevap Sayısı (80 Soru Üzerinden) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  id="correctCount"
                  placeholder="Örn: 64"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-16 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={correctCountStr}
                  onChange={(e) => setCorrectCountStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">/ 80 Soru</div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                YDS ve YÖKDİL sınavlarında yanlış cevaplar doğruyu götürmez.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              YDS / YÖKDİL Puanını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Yabancı Dil Seviye Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">YDS / YÖKDİL Puanı</span>
                  <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight">
                    {formatNumber(result.score, 2)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    {result.level} ({result.levelDescription})
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Doğru Sayısı:</span>
                    <span className="font-semibold text-foreground">{result.correctCount} / 80</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Soru Başına Değer:</span>
                    <span className="font-semibold text-foreground">1.25 Puan</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kpss-net-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    KPSS net hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Doğru sayınızı girerek YDS / YÖKDİL puanınızı ve dil seviyenizi öğrenin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">YDS ve YÖKDİL Puanlama Sistemi</h2>
        <p className="mb-4 text-muted-foreground">
          ÖSYM tarafından uygulanan Yabancı Dil Bilgisi Seviye Tespit Sınavı (YDS) ve YÖKDİL sınavlarında toplam 80 çoktan seçmeli soru bulunur. Yanlış cevaplar doğru cevapları etkilemez; her doğru soru <strong>1.25 puan</strong> değerindedir.
        </p>
      </div>
    </div>
  );
}
