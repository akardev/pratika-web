'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, sanitizeNumericInput } from '@/lib/utils';

interface SubjectInput {
  correct: string;
  incorrect: string;
}

export default function AlesNetHesaplama() {
  const [sayisal, setSayisal] = useState<SubjectInput>({ correct: '42', incorrect: '4' }); // Sayısal 50
  const [sozel, setSozel] = useState<SubjectInput>({ correct: '38', incorrect: '6' }); // Sözel 50

  const [result, setResult] = useState<{
    sayNet: number;
    sozNet: number;
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

    const sayCalc = calcNet4(sayisal.correct, sayisal.incorrect, 50);
    const sozCalc = calcNet4(sozel.correct, sozel.incorrect, 50);

    const totalNet = sayCalc.net + sozCalc.net;
    const totalCorrect = sayCalc.c + sozCalc.c;
    const totalIncorrect = sayCalc.i + sozCalc.i;
    const totalBlank = sayCalc.blank + sozCalc.blank;

    setResult({
      sayNet: sayCalc.net,
      sozNet: sozCalc.net,
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
              <span className="text-sm font-bold text-foreground">Sayısal Testi (50 Soru)</span>
              <p className="text-[11px] text-muted-foreground">Matematik ve Mantıksal Akıl Yürütme</p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Doğru</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={sayisal.correct}
                    onChange={(e) => setSayisal({ ...sayisal, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Yanlış</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={sayisal.incorrect}
                    onChange={(e) => setSayisal({ ...sayisal, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-xl border border-border/60 space-y-2">
              <span className="text-sm font-bold text-foreground">Sözel Testi (50 Soru)</span>
              <p className="text-[11px] text-muted-foreground">Türkçe, Paragraf ve Mantıksal Akıl Yürütme</p>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Doğru</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={sozel.correct}
                    onChange={(e) => setSozel({ ...sozel, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Yanlış</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={sozel.incorrect}
                    onChange={(e) => setSozel({ ...sozel, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            ALES Netini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
              ALES Net Sonucu (100 Soru)
            </h3>

            <div className="flex flex-col items-center justify-center mb-4 text-center">
              <span className="text-xs text-muted-foreground mb-0.5">Toplam Netiniz</span>
              <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight">
                {formatNumber(result.totalNet, 2)} Net
              </span>
              <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                {result.totalCorrect} Doğru · {result.totalIncorrect} Yanlış · {result.totalBlank} Boş
              </span>
            </div>

            <div className="border-t border-border/60 pt-3 grid grid-cols-2 gap-3 text-xs sm:text-sm text-center">
              <div className="p-2.5 bg-background rounded-lg border border-border/60">
                <span className="text-muted-foreground block text-[11px]">Sayısal Neti</span>
                <span className="font-bold text-foreground text-base">{formatNumber(result.sayNet, 2)} Net</span>
              </div>
              <div className="p-2.5 bg-background rounded-lg border border-border/60">
                <span className="text-muted-foreground block text-[11px]">Sözel Neti</span>
                <span className="font-bold text-foreground text-base">{formatNumber(result.sozNet, 2)} Net</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 text-center">
              <Link
                href="/arac/yds-net-hesaplama"
                className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                YDS / YÖKDİL puan hesaplayıcısına geçin &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">ÖSYM ALES Net Sistemi</h2>
        <p className="mb-4 text-muted-foreground">
          Akademik Personel ve Lisansüstü Eğitimi Giriş Sınavı (ALES) 50 Sayısal ve 50 Sözel olmak üzere toplam 100 sorudan oluşur. 4 yanlış cevap 1 doğru cevabı götürür.
        </p>
      </div>
    </div>
  );
}
