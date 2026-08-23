'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber } from '@/lib/utils';

export default function OranOrantiHesaplama() {
  const [type, setType] = useState<'direct' | 'inverse'>('direct');
  const [aStr, setAStr] = useState<string>('10');
  const [bStr, setBStr] = useState<string>('50');
  const [cStr, setCStr] = useState<string>('30');

  const [xResult, setXResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setXResult(null);

    if (!aStr.trim() || !bStr.trim() || !cStr.trim()) {
      setError('Lütfen A, B ve C alanlarını doldurun.');
      return;
    }

    const a = parseTurkishNumber(aStr);
    const b = parseTurkishNumber(bStr);
    const c = parseTurkishNumber(cStr);

    if (isNaN(a) || isNaN(b) || isNaN(c)) {
      setError('Lütfen geçerli sayılar girin.');
      return;
    }

    if (type === 'direct') {
      if (a === 0) {
        setError('Doğru orantıda A değeri 0 olamaz (0\'a bölünemez).');
        return;
      }
      setXResult((b * c) / a);
    } else {
      if (c === 0) {
        setError('Ters orantıda C değeri 0 olamaz (0\'a bölünemez).');
        return;
      }
      setXResult((a * b) / c);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-2 p-1 bg-muted/40 rounded-xl border border-border/60 mb-6 max-w-md">
          <button
            type="button"
            onClick={() => {
              setType('direct');
              setXResult(null);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              type === 'direct'
                ? 'bg-card text-foreground shadow-xs border border-border/80'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Doğru Orantı (A &rarr; B ise C &rarr; X)
          </button>
          <button
            type="button"
            onClick={() => {
              setType('inverse');
              setXResult(null);
            }}
            className={`py-2 text-xs font-semibold rounded-lg transition-all ${
              type === 'inverse'
                ? 'bg-card text-foreground shadow-xs border border-border/80'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Ters Orantı (A &times; B = C &times; X)
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="a" className="block text-sm font-medium mb-1.5 text-foreground">
                  A Değeri <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="a"
                  placeholder="Örn: 10"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  value={aStr}
                  onChange={(e) => setAStr(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="b" className="block text-sm font-medium mb-1.5 text-foreground">
                  B Değeri <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="b"
                  placeholder="Örn: 50"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  value={bStr}
                  onChange={(e) => setBStr(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="c" className="block text-sm font-medium mb-1.5 text-foreground">
                C Değeri <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                inputMode="decimal"
                id="c"
                placeholder="Örn: 30"
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                value={cStr}
                onChange={(e) => setCStr(e.target.value)}
              />
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
              Bilinmeyen X Değerini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {xResult !== null ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Orantı Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Bilinmeyen X Değeri</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatNumber(xResult)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    {type === 'direct' ? `${aStr} : ${bStr} = ${cStr} : ${formatNumber(xResult)}` : `${aStr} × ${bStr} = ${cStr} × ${formatNumber(xResult)}`}
                  </span>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">A, B ve C değerlerini girip &ldquo;Hesapla&rdquo; butonuna basın.</p>
                <p className="text-xs text-muted-foreground mt-1">Bilinmeyen X değeri burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Doğru ve Ters Orantı Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Doğru orantıda bir çokluk artarken diğeri de aynı oranda artar (İçler-dışlar çarpımı: $X = (B \times C) / A$). 
          Ters orantıda ise biri artarken diğeri azalır ($X = (A \times B) / C$).
        </p>
      </div>
    </div>
  );
}
