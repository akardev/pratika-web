'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, sanitizeNumericInput } from '@/lib/utils';

interface SubjectInput {
  correct: string;
  incorrect: string;
}

export default function YksTytNetHesaplama() {
  const [turkce, setTurkce] = useState<SubjectInput>({ correct: '32', incorrect: '5' });
  const [sosyal, setSosyal] = useState<SubjectInput>({ correct: '14', incorrect: '3' });
  const [matematik, setMatematik] = useState<SubjectInput>({ correct: '28', incorrect: '4' });
  const [fen, setFen] = useState<SubjectInput>({ correct: '12', incorrect: '2' });

  const [result, setResult] = useState<{
    turkceNet: number;
    sosyalNet: number;
    matNet: number;
    fenNet: number;
    totalNet: number;
    totalCorrect: number;
    totalIncorrect: number;
    totalBlank: number;
  } | null>(null);

  const calcSubjectNet = (cStr: string, iStr: string, maxQuestions: number) => {
    const c = Math.min(maxQuestions, Math.max(0, parseInt(cStr, 10) || 0));
    const i = Math.min(maxQuestions - c, Math.max(0, parseInt(iStr, 10) || 0));
    const net = Math.max(0, c - (i / 4));
    const blank = maxQuestions - (c + i);
    return { c, i, net, blank };
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const t = calcSubjectNet(turkce.correct, turkce.incorrect, 40);
    const s = calcSubjectNet(sosyal.correct, sosyal.incorrect, 20);
    const m = calcSubjectNet(matematik.correct, matematik.incorrect, 40);
    const f = calcSubjectNet(fen.correct, fen.incorrect, 20);

    const totalNet = t.net + s.net + m.net + f.net;
    const totalCorrect = t.c + s.c + m.c + f.c;
    const totalIncorrect = t.i + s.i + m.i + f.i;
    const totalBlank = t.blank + s.blank + m.blank + f.blank;

    setResult({
      turkceNet: t.net,
      sosyalNet: s.net,
      matNet: m.net,
      fenNet: f.net,
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Türkçe (40 Soru) */}
            <div className="p-3.5 bg-muted/30 rounded-xl border border-border/60 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-foreground">Türkçe (40 Soru)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Doğru</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={turkce.correct}
                    onChange={(e) => setTurkce({ ...turkce, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Yanlış</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={turkce.incorrect}
                    onChange={(e) => setTurkce({ ...turkce, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
              </div>
            </div>

            {/* Sosyal Bilimler (20 Soru) */}
            <div className="p-3.5 bg-muted/30 rounded-xl border border-border/60 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-foreground">Sosyal Bilimler (20 Soru)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Doğru</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={sosyal.correct}
                    onChange={(e) => setSosyal({ ...sosyal, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Yanlış</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={sosyal.incorrect}
                    onChange={(e) => setSosyal({ ...sosyal, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
              </div>
            </div>

            {/* Temel Matematik (40 Soru) */}
            <div className="p-3.5 bg-muted/30 rounded-xl border border-border/60 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-foreground">Temel Matematik (40 Soru)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Doğru</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={matematik.correct}
                    onChange={(e) => setMatematik({ ...matematik, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Yanlış</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={matematik.incorrect}
                    onChange={(e) => setMatematik({ ...matematik, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
              </div>
            </div>

            {/* Fen Bilimleri (20 Soru) */}
            <div className="p-3.5 bg-muted/30 rounded-xl border border-border/60 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-foreground">Fen Bilimleri (20 Soru)</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Doğru</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={fen.correct}
                    onChange={(e) => setFen({ ...fen, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-muted-foreground mb-0.5">Yanlış</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="w-full rounded-md border border-border bg-background px-3 py-2 text-foreground text-sm font-mono"
                    value={fen.incorrect}
                    onChange={(e) => setFen({ ...fen, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            TYT Toplam Netini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
              TYT Sınav Sonucu Özeti (120 Soru)
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

            <div className="border-t border-border/60 pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm text-center">
              <div className="p-2 bg-background rounded-lg border border-border/60">
                <span className="text-muted-foreground block text-[11px]">Türkçe</span>
                <span className="font-bold text-foreground">{formatNumber(result.turkceNet, 2)} Net</span>
              </div>
              <div className="p-2 bg-background rounded-lg border border-border/60">
                <span className="text-muted-foreground block text-[11px]">Sosyal</span>
                <span className="font-bold text-foreground">{formatNumber(result.sosyalNet, 2)} Net</span>
              </div>
              <div className="p-2 bg-background rounded-lg border border-border/60">
                <span className="text-muted-foreground block text-[11px]">Matematik</span>
                <span className="font-bold text-foreground">{formatNumber(result.matNet, 2)} Net</span>
              </div>
              <div className="p-2 bg-background rounded-lg border border-border/60">
                <span className="text-muted-foreground block text-[11px]">Fen</span>
                <span className="font-bold text-foreground">{formatNumber(result.fenNet, 2)} Net</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 text-center">
              <Link
                href="/arac/yks-ayt-net-hesaplama"
                className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                AYT net hesaplama aracına geçin &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">ÖSYM TYT Net Hesaplama Kuralı</h2>
        <p className="mb-4 text-muted-foreground">
          ÖSYM Temel Yeterlilik Testi (TYT) sınavında 4 yanlış 1 doğruyu götürür. Net formülü: <strong>Doğru Sayısı - (Yanlış Sayısı / 4)</strong>. Toplam 120 soru üzerinden değerlendirme yapılır.
        </p>
      </div>
    </div>
  );
}
