'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, sanitizeNumericInput } from '@/lib/utils';

interface SubjectInput {
  correct: string;
  incorrect: string;
}

export default function KpssNetHesaplama() {
  const [gy, setGy] = useState<SubjectInput>({ correct: '48', incorrect: '8' }); // Genel Yetenek 60
  const [gk, setGk] = useState<SubjectInput>({ correct: '44', incorrect: '10' }); // Genel Kültür 60

  const [result, setResult] = useState<{
    gyNet: number;
    gkNet: number;
    totalNet: number;
    totalCorrect: number;
    totalIncorrect: number;
    totalBlank: number;
  } | null>(null);

  const calcNet4 = (cStr: string, iStr: string, max: number) => {
    const c = Math.min(max, Math.max(0, parseInt(cStr, 10) || 0));
    const i = Math.min(max - c, Math.max(0, parseInt(iStr, 10) || 0));
    const net = Math.max(0, c - i / 4);
    const blank = max - (c + i);
    return { c, i, net, blank };
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const gyCalc = calcNet4(gy.correct, gy.incorrect, 60);
    const gkCalc = calcNet4(gk.correct, gk.incorrect, 60);

    const totalNet = gyCalc.net + gkCalc.net;
    const totalCorrect = gyCalc.c + gkCalc.c;
    const totalIncorrect = gyCalc.i + gkCalc.i;
    const totalBlank = gyCalc.blank + gkCalc.blank;

    setResult({
      gyNet: gyCalc.net,
      gkNet: gkCalc.net,
      totalNet,
      totalCorrect,
      totalIncorrect,
      totalBlank,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <form onSubmit={handleCalculate} noValidate className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/30 rounded-xl border border-border/60 space-y-2">
              <span className="text-sm font-bold text-foreground">Genel Yetenek (60 Soru)</span>
              <p className="text-[11px] text-muted-foreground">Türkçe (30) + Matematik-Geometri (30)</p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Doğru</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={gy.correct}
                    onChange={(e) => setGy({ ...gy, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Yanlış</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={gy.incorrect}
                    onChange={(e) => setGy({ ...gy, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-xl border border-border/60 space-y-2">
              <span className="text-sm font-bold text-foreground">Genel Kültür (60 Soru)</span>
              <p className="text-[11px] text-muted-foreground">Tarih (27) + Coğrafya (18) + Vatandaşlık & Güncel (15)</p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Doğru</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={gk.correct}
                    onChange={(e) => setGk({ ...gk, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Yanlış</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={gk.incorrect}
                    onChange={(e) => setGk({ ...gk, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            KPSS Lisans / Önlisans Netini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
              KPSS Net Sonucu (120 Soru)
            </h3>

            <div className="flex flex-col items-center justify-center mb-4 text-center">
              <span className="text-xs text-muted-foreground mb-0.5">Toplam KPSS Netiniz</span>
              <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight">
                {formatNumber(result.totalNet, 2)} Net
              </span>
              <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                {result.totalCorrect} Doğru · {result.totalIncorrect} Yanlış · {result.totalBlank} Boş
              </span>
            </div>

            <div className="border-t border-border/60 pt-3 grid grid-cols-2 gap-3 text-xs sm:text-sm text-center">
              <div className="p-2.5 bg-background rounded-lg border border-border/60">
                <span className="text-muted-foreground block text-[11px]">Genel Yetenek (60 Soru)</span>
                <span className="font-bold text-foreground text-base">{formatNumber(result.gyNet, 2)} Net</span>
              </div>
              <div className="p-2.5 bg-background rounded-lg border border-border/60">
                <span className="text-muted-foreground block text-[11px]">Genel Kültür (60 Soru)</span>
                <span className="font-bold text-foreground text-base">{formatNumber(result.gkNet, 2)} Net</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 text-center">
              <Link
                href="/arac/ales-net-hesaplama"
                className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                ALES net hesaplayıcısına geçin &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">KPSS Net Hesaplama Formülü</h2>
        <p className="mb-4 text-muted-foreground">
          ÖSYM KPSS Lisans, Önlisans ve Ortaöğretim sınavlarında 4 yanlış 1 doğruyu götürür. Netler test bazında ayrı ayrı hesaplanır: <code>Net = Doğru - (Yanlış / 4)</code>.
        </p>
      </div>
    </div>
  );
}
