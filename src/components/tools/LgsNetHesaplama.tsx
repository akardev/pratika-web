'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, sanitizeNumericInput } from '@/lib/utils';

interface SubjectInput {
  correct: string;
  incorrect: string;
}

export default function LgsNetHesaplama() {
  const [turkce, setTurkce] = useState<SubjectInput>({ correct: '16', incorrect: '2' });
  const [matematik, setMatematik] = useState<SubjectInput>({ correct: '14', incorrect: '3' });
  const [fen, setFen] = useState<SubjectInput>({ correct: '17', incorrect: '2' });
  const [inkilap, setInkilap] = useState<SubjectInput>({ correct: '9', incorrect: '1' });
  const [din, setDin] = useState<SubjectInput>({ correct: '9', incorrect: '1' });
  const [ingilizce, setIngilizce] = useState<SubjectInput>({ correct: '8', incorrect: '1' });

  const [result, setResult] = useState<{
    sozelNet: number;
    sayisalNet: number;
    totalNet: number;
    breakdown: { label: string; net: number; c: number; i: number }[];
  } | null>(null);

  const calcNet3 = (cStr: string, iStr: string, max: number) => {
    const c = Math.min(max, Math.max(0, parseInt(cStr, 10) || 0));
    const i = Math.min(max - c, Math.max(0, parseInt(iStr, 10) || 0));
    const net = Math.max(0, c - i / 3); // LGS&apos;de 3 yanlış 1 doğruyu götürür
    return { c, i, net };
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const t = calcNet3(turkce.correct, turkce.incorrect, 20);
    const m = calcNet3(matematik.correct, matematik.incorrect, 20);
    const f = calcNet3(fen.correct, fen.incorrect, 20);
    const ink = calcNet3(inkilap.correct, inkilap.incorrect, 10);
    const d = calcNet3(din.correct, din.incorrect, 10);
    const ing = calcNet3(ingilizce.correct, ingilizce.incorrect, 10);

    const sozelNet = t.net + ink.net + d.net + ing.net;
    const sayisalNet = m.net + f.net;
    const totalNet = sozelNet + sayisalNet;

    const breakdown = [
      { label: 'Türkçe (20)', net: t.net, c: t.c, i: t.i },
      { label: 'Matematik (20)', net: m.net, c: m.c, i: m.i },
      { label: 'Fen Bilimleri (20)', net: f.net, c: f.c, i: f.i },
      { label: 'İnkılap Tarihi (10)', net: ink.net, c: ink.c, i: ink.i },
      { label: 'Din Kültürü (10)', net: d.net, c: d.c, i: d.i },
      { label: 'Yabancı Dil (10)', net: ing.net, c: ing.c, i: ing.i },
    ];

    setResult({
      sozelNet,
      sayisalNet,
      totalNet,
      breakdown,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <form onSubmit={handleCalculate} noValidate className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { title: 'Türkçe (20 Soru)', val: turkce, set: setTurkce },
              { title: 'Matematik (20 Soru)', val: matematik, set: setMatematik },
              { title: 'Fen Bilimleri (20 Soru)', val: fen, set: setFen },
              { title: 'İnkılap Tarihi (10 Soru)', val: inkilap, set: setInkilap },
              { title: 'Din Kültürü (10 Soru)', val: din, set: setDin },
              { title: 'Yabancı Dil (10 Soru)', val: ingilizce, set: setIngilizce },
            ].map((sub) => (
              <div key={sub.title} className="p-3 bg-muted/30 rounded-xl border border-border/60 space-y-1.5">
                <span className="text-xs font-bold text-foreground">{sub.title}</span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Doğru"
                    className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-foreground text-xs font-mono"
                    value={sub.val.correct}
                    onChange={(e) => sub.set({ ...sub.val, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Yanlış"
                    className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-foreground text-xs font-mono"
                    value={sub.val.incorrect}
                    onChange={(e) => sub.set({ ...sub.val, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            LGS Toplam Netini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
              LGS Sınav Sonucu (90 Soru)
            </h3>

            <div className="flex flex-col items-center justify-center mb-4 text-center">
              <span className="text-xs text-muted-foreground mb-0.5">Toplam Netiniz (3 Yanlış 1 Doğru)</span>
              <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight">
                {formatNumber(result.totalNet, 2)} Net
              </span>
              <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                Sözel: {formatNumber(result.sozelNet, 2)} Net · Sayısal: {formatNumber(result.sayisalNet, 2)} Net
              </span>
            </div>

            <div className="border-t border-border/60 pt-3 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-center">
              {result.breakdown.map((b) => (
                <div key={b.label} className="p-2 bg-background rounded-lg border border-border/60">
                  <span className="text-muted-foreground block text-[11px]">{b.label}</span>
                  <span className="font-bold text-foreground">{formatNumber(b.net, 2)} Net</span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 text-center">
              <Link
                href="/arac/yks-tyt-net-hesaplama"
                className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                YKS TYT net hesaplayıcısına gidin &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">MEB LGS Net Hesaplama Kuralı</h2>
        <p className="mb-4 text-muted-foreground">
          Liselere Geçiş Sistemi (LGS) sınavında <strong>3 yanlış 1 doğruyu</strong> götürür. Net hesabı: <code>Doğru Sayısı - (Yanlış Sayısı / 3)</code> olarak hesaplanır. Toplam 90 soru yer alır.
        </p>
      </div>
    </div>
  );
}
