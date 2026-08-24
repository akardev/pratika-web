'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KesirHesaplama() {
  const [num1Str, setNum1Str] = useState<string>('3');
  const [den1Str, setDen1Str] = useState<string>('4');
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+');
  const [num2Str, setNum2Str] = useState<string>('2');
  const [den2Str, setDen2Str] = useState<string>('5');

  const [result, setResult] = useState<{
    simplifiedNum: number;
    simplifiedDen: number;
    mixedFraction?: string;
    decimalValue: number;
    rawNum: number;
    rawDen: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const gcd = (a: number, b: number): number => {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x || 1;
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const n1 = parseInt(num1Str, 10);
    const d1 = parseInt(den1Str, 10);
    const n2 = parseInt(num2Str, 10);
    const d2 = parseInt(den2Str, 10);

    if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2)) {
      setError('Lütfen pay ve payda kısımlarına geçerli tam sayılar giriniz.');
      return;
    }
    if (d1 === 0 || d2 === 0) {
      setError('Payda 0 olamaz (tanımsız işlem).');
      return;
    }
    if (op === '/' && n2 === 0) {
      setError('0 kesrine bölme yapılamaz (tanımsız).');
      return;
    }

    let rawNum = 0;
    let rawDen = 1;

    if (op === '+') {
      rawNum = n1 * d2 + n2 * d1;
      rawDen = d1 * d2;
    } else if (op === '-') {
      rawNum = n1 * d2 - n2 * d1;
      rawDen = d1 * d2;
    } else if (op === '*') {
      rawNum = n1 * n2;
      rawDen = d1 * d2;
    } else if (op === '/') {
      rawNum = n1 * d2;
      rawDen = d1 * n2;
    }

    if (rawDen < 0) {
      rawNum = -rawNum;
      rawDen = -rawDen;
    }

    const commonDivisor = gcd(rawNum, rawDen);
    const simplifiedNum = rawNum / commonDivisor;
    const simplifiedDen = rawDen / commonDivisor;
    const decimalValue = simplifiedNum / simplifiedDen;

    let mixedFraction: string | undefined = undefined;
    if (Math.abs(simplifiedNum) >= simplifiedDen && simplifiedDen !== 1) {
      const whole = Math.trunc(simplifiedNum / simplifiedDen);
      const rem = Math.abs(simplifiedNum % simplifiedDen);
      if (rem > 0) {
        mixedFraction = `${whole} tam ${rem}/${simplifiedDen}`;
      }
    }

    setResult({
      simplifiedNum,
      simplifiedDen,
      mixedFraction,
      decimalValue,
      rawNum,
      rawDen,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <form onSubmit={handleCalculate} noValidate className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Kesir 1 */}
            <div className="flex flex-col items-center gap-1.5 w-24">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Pay"
                className="w-full text-center rounded-md border border-border bg-background px-2 py-1.5 text-foreground font-mono text-sm font-bold"
                value={num1Str}
                onChange={(e) => setNum1Str(sanitizeNumericInput(e.target.value, { allowDecimal: false, allowNegative: true }))}
              />
              <div className="w-full h-0.5 bg-foreground/60 rounded"></div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Payda"
                className="w-full text-center rounded-md border border-border bg-background px-2 py-1.5 text-foreground font-mono text-sm font-bold"
                value={den1Str}
                onChange={(e) => setDen1Str(sanitizeNumericInput(e.target.value, { allowDecimal: false, allowNegative: true }))}
              />
            </div>

            {/* İşlem */}
            <div className="flex gap-1">
              {(['+', '-', '*', '/'] as const).map((o) => (
                <button
                  key={o}
                  type="button"
                  onClick={() => setOp(o)}
                  className={`w-9 h-9 rounded-lg border font-bold text-base transition-all ${
                    op === o
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  {o === '*' ? '×' : o === '/' ? '÷' : o}
                </button>
              ))}
            </div>

            {/* Kesir 2 */}
            <div className="flex flex-col items-center gap-1.5 w-24">
              <input
                type="text"
                inputMode="numeric"
                placeholder="Pay"
                className="w-full text-center rounded-md border border-border bg-background px-2 py-1.5 text-foreground font-mono text-sm font-bold"
                value={num2Str}
                onChange={(e) => setNum2Str(sanitizeNumericInput(e.target.value, { allowDecimal: false, allowNegative: true }))}
              />
              <div className="w-full h-0.5 bg-foreground/60 rounded"></div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Payda"
                className="w-full text-center rounded-md border border-border bg-background px-2 py-1.5 text-foreground font-mono text-sm font-bold"
                value={den2Str}
                onChange={(e) => setDen2Str(sanitizeNumericInput(e.target.value, { allowDecimal: false, allowNegative: true }))}
              />
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20 text-center">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Kesir İşlemini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
              Kesir Sonucu
            </h3>

            <div className="flex flex-col items-center justify-center mb-4 text-center">
              <div className="flex items-center gap-3">
                <span className="font-extrabold text-4xl text-primary font-mono">
                  {result.simplifiedDen === 1 ? (
                    result.simplifiedNum
                  ) : (
                    <span className="inline-flex flex-col items-center">
                      <span>{result.simplifiedNum}</span>
                      <span className="w-full h-0.5 bg-primary rounded my-0.5"></span>
                      <span>{result.simplifiedDen}</span>
                    </span>
                  )}
                </span>
              </div>
              <span className="text-xs font-semibold text-foreground mt-3 bg-background px-3 py-1.5 rounded-md border border-border/80">
                Ondalık Karşılığı: {formatNumber(result.decimalValue, 4)} {result.mixedFraction && ` · (${result.mixedFraction})`}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 text-center">
              <Link
                href="/arac/ondalik-kesir-donusturucu"
                className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                Ondalık sayıyı kesre dönüştürücüye gidin &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kesirlerde 4 İşlem Nasıl Yapılır?</h2>
        <p className="mb-4 text-muted-foreground">
          Toplama ve çıkarmada paydalar eşitlenir. Çarpmada paylar kendi arasında, paydalar kendi arasında çarpılır. Bölmede ise ikinci kesir ters çevrilerek birinci kesir ile çarpılır ve sonuç en sade haline getirilir.
        </p>
      </div>
    </div>
  );
}
