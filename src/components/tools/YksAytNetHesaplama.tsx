'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, sanitizeNumericInput } from '@/lib/utils';

interface SubjectInput {
  correct: string;
  incorrect: string;
}

export default function YksAytNetHesaplama() {
  const [field, setField] = useState<'sayisal' | 'esitagirlik' | 'sozel'>('sayisal');

  // Sayısal
  const [matematik, setMatematik] = useState<SubjectInput>({ correct: '25', incorrect: '4' });
  const [fizik, setFizik] = useState<SubjectInput>({ correct: '10', incorrect: '2' });
  const [kimya, setKimya] = useState<SubjectInput>({ correct: '9', incorrect: '2' });
  const [biyoloji, setBiyoloji] = useState<SubjectInput>({ correct: '10', incorrect: '1' });

  // Eşit Ağırlık / Sözel
  const [edebiyat, setEdebiyat] = useState<SubjectInput>({ correct: '18', incorrect: '3' });
  const [tarih1, setTarih1] = useState<SubjectInput>({ correct: '8', incorrect: '1' });
  const [cografya1, setCografya1] = useState<SubjectInput>({ correct: '5', incorrect: '1' });

  const [result, setResult] = useState<{
    totalNet: number;
    breakdown: { label: string; net: number }[];
  } | null>(null);

  const calcNet = (cStr: string, iStr: string, max: number) => {
    const c = Math.min(max, Math.max(0, parseInt(cStr, 10) || 0));
    const i = Math.min(max - c, Math.max(0, parseInt(iStr, 10) || 0));
    return Math.max(0, c - i / 4);
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const breakdown: { label: string; net: number }[] = [];

    if (field === 'sayisal') {
      const matNet = calcNet(matematik.correct, matematik.incorrect, 40);
      const fizNet = calcNet(fizik.correct, fizik.incorrect, 14);
      const kimNet = calcNet(kimya.correct, kimya.incorrect, 13);
      const biyNet = calcNet(biyoloji.correct, biyoloji.incorrect, 13);
      breakdown.push({ label: 'Matematik (40)', net: matNet });
      breakdown.push({ label: 'Fizik (14)', net: fizNet });
      breakdown.push({ label: 'Kimya (13)', net: kimNet });
      breakdown.push({ label: 'Biyoloji (13)', net: biyNet });
    } else if (field === 'esitagirlik') {
      const matNet = calcNet(matematik.correct, matematik.incorrect, 40);
      const edbNet = calcNet(edebiyat.correct, edebiyat.incorrect, 24);
      const tarNet = calcNet(tarih1.correct, tarih1.incorrect, 10);
      const cogNet = calcNet(cografya1.correct, cografya1.incorrect, 6);
      breakdown.push({ label: 'Matematik (40)', net: matNet });
      breakdown.push({ label: 'Edebiyat (24)', net: edbNet });
      breakdown.push({ label: 'Tarih-1 (10)', net: tarNet });
      breakdown.push({ label: 'Coğrafya-1 (6)', net: cogNet });
    } else {
      const edbNet = calcNet(edebiyat.correct, edebiyat.incorrect, 24);
      const tarNet = calcNet(tarih1.correct, tarih1.incorrect, 10);
      const cogNet = calcNet(cografya1.correct, cografya1.incorrect, 6);
      breakdown.push({ label: 'Edebiyat (24)', net: edbNet });
      breakdown.push({ label: 'Tarih-1 (10)', net: tarNet });
      breakdown.push({ label: 'Coğrafya-1 (6)', net: cogNet });
    }

    const totalNet = breakdown.reduce((acc, curr) => acc + curr.net, 0);

    setResult({
      totalNet,
      breakdown,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <form onSubmit={handleCalculate} noValidate className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
              AYT Alanınız
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setField('sayisal')}
                className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                  field === 'sayisal'
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-background text-foreground border-border'
                }`}
              >
                Sayısal (MF)
              </button>
              <button
                type="button"
                onClick={() => setField('esitagirlik')}
                className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                  field === 'esitagirlik'
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-background text-foreground border-border'
                }`}
              >
                Eşit Ağırlık (TM)
              </button>
              <button
                type="button"
                onClick={() => setField('sozel')}
                className={`py-2 px-2 text-xs font-semibold rounded-lg border transition-all ${
                  field === 'sozel'
                    ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                    : 'bg-background text-foreground border-border'
                }`}
              >
                Sözel (TS)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {field === 'sayisal' && (
              <>
                <div className="p-3 bg-muted/30 rounded-xl border border-border/60 space-y-2">
                  <span className="text-xs font-bold text-foreground">AYT Matematik (40 Soru)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Doğru"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={matematik.correct}
                      onChange={(e) => setMatematik({ ...matematik, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Yanlış"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={matematik.incorrect}
                      onChange={(e) => setMatematik({ ...matematik, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                  </div>
                </div>

                <div className="p-3 bg-muted/30 rounded-xl border border-border/60 space-y-2">
                  <span className="text-xs font-bold text-foreground">Fizik (14 Soru)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Doğru"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={fizik.correct}
                      onChange={(e) => setFizik({ ...fizik, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Yanlış"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={fizik.incorrect}
                      onChange={(e) => setFizik({ ...fizik, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                  </div>
                </div>

                <div className="p-3 bg-muted/30 rounded-xl border border-border/60 space-y-2">
                  <span className="text-xs font-bold text-foreground">Kimya (13 Soru)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Doğru"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={kimya.correct}
                      onChange={(e) => setKimya({ ...kimya, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Yanlış"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={kimya.incorrect}
                      onChange={(e) => setKimya({ ...kimya, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                  </div>
                </div>

                <div className="p-3 bg-muted/30 rounded-xl border border-border/60 space-y-2">
                  <span className="text-xs font-bold text-foreground">Biyoloji (13 Soru)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Doğru"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={biyoloji.correct}
                      onChange={(e) => setBiyoloji({ ...biyoloji, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Yanlış"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={biyoloji.incorrect}
                      onChange={(e) => setBiyoloji({ ...biyoloji, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                  </div>
                </div>
              </>
            )}

            {field === 'esitagirlik' && (
              <>
                <div className="p-3 bg-muted/30 rounded-xl border border-border/60 space-y-2">
                  <span className="text-xs font-bold text-foreground">AYT Matematik (40 Soru)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Doğru"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={matematik.correct}
                      onChange={(e) => setMatematik({ ...matematik, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Yanlış"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={matematik.incorrect}
                      onChange={(e) => setMatematik({ ...matematik, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                  </div>
                </div>

                <div className="p-3 bg-muted/30 rounded-xl border border-border/60 space-y-2">
                  <span className="text-xs font-bold text-foreground">Türk Dili ve Edebiyatı (24 Soru)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Doğru"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={edebiyat.correct}
                      onChange={(e) => setEdebiyat({ ...edebiyat, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Yanlış"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={edebiyat.incorrect}
                      onChange={(e) => setEdebiyat({ ...edebiyat, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                  </div>
                </div>

                <div className="p-3 bg-muted/30 rounded-xl border border-border/60 space-y-2">
                  <span className="text-xs font-bold text-foreground">Tarih-1 (10 Soru)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Doğru"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={tarih1.correct}
                      onChange={(e) => setTarih1({ ...tarih1, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Yanlış"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={tarih1.incorrect}
                      onChange={(e) => setTarih1({ ...tarih1, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                  </div>
                </div>

                <div className="p-3 bg-muted/30 rounded-xl border border-border/60 space-y-2">
                  <span className="text-xs font-bold text-foreground">Coğrafya-1 (6 Soru)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Doğru"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={cografya1.correct}
                      onChange={(e) => setCografya1({ ...cografya1, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Yanlış"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={cografya1.incorrect}
                      onChange={(e) => setCografya1({ ...cografya1, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                  </div>
                </div>
              </>
            )}

            {field === 'sozel' && (
              <>
                <div className="p-3 bg-muted/30 rounded-xl border border-border/60 space-y-2">
                  <span className="text-xs font-bold text-foreground">Edebiyat (24 Soru)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Doğru"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={edebiyat.correct}
                      onChange={(e) => setEdebiyat({ ...edebiyat, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Yanlış"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={edebiyat.incorrect}
                      onChange={(e) => setEdebiyat({ ...edebiyat, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                  </div>
                </div>

                <div className="p-3 bg-muted/30 rounded-xl border border-border/60 space-y-2">
                  <span className="text-xs font-bold text-foreground">Tarih-1 (10 Soru)</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Doğru"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={tarih1.correct}
                      onChange={(e) => setTarih1({ ...tarih1, correct: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                    <input
                      type="text"
                      inputMode="numeric"
                      placeholder="Yanlış"
                      className="w-full rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
                      value={tarih1.incorrect}
                      onChange={(e) => setTarih1({ ...tarih1, incorrect: sanitizeNumericInput(e.target.value, { allowDecimal: false }) })}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            AYT Netini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
              AYT Sınav Sonucu Özeti (80 Soru)
            </h3>

            <div className="flex flex-col items-center justify-center mb-4 text-center">
              <span className="text-xs text-muted-foreground mb-0.5">Toplam AYT Netiniz</span>
              <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight">
                {formatNumber(result.totalNet, 2)} Net
              </span>
            </div>

            <div className="border-t border-border/60 pt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm text-center">
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
                TYT net hesaplayıcısına dönün &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">ÖSYM AYT Net Hesaplama Kuralı</h2>
        <p className="mb-4 text-muted-foreground">
          AYT (Alan Yeterlilik Testi) sınavında 4 yanlış 1 doğruyu götürür. Adaylar kendi puan türlerine (Sayısal, Eşit Ağırlık, Sözel) karşılık gelen testleri çözerler.
        </p>
      </div>
    </div>
  );
}
