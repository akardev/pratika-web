'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

interface LoanResult {
  principal: number;
  monthlyRate: number;
  months: number;
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

const MONTH_PRESETS = [12, 24, 36, 48, 60, 120];

export default function KrediTaksitHesaplama() {
  const [principalStr, setPrincipalStr] = useState<string>('');
  const [rateStr, setRateStr] = useState<string>('3.50');
  const [monthsStr, setMonthsStr] = useState<string>('12');

  const [result, setResult] = useState<LoanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!principalStr.trim()) {
      setError('Kredi tutarı 0\'dan büyük olmalıdır.');
      return;
    }

    const principal = parseTurkishNumber(principalStr);
    if (isNaN(principal) || principal <= 0) {
      setError('Kredi tutarı 0\'dan büyük olmalıdır.');
      return;
    }

    if (!rateStr.trim()) {
      setError('Aylık faiz oranı boş olamaz.');
      return;
    }

    const rate = parseTurkishNumber(rateStr);
    if (isNaN(rate) || rate < 0) {
      setError('Geçerli bir aylık faiz oranı girin.');
      return;
    }

    if (!monthsStr.trim()) {
      setError('Vade süresi 0\'dan büyük olmalıdır.');
      return;
    }

    const months = parseTurkishNumber(monthsStr);
    if (isNaN(months) || !Number.isInteger(months) || months <= 0) {
      setError('Vade süresi pozitif bir tam sayı olmalıdır.');
      return;
    }

    let monthlyPayment: number;
    let totalPayment: number;
    let totalInterest: number;

    if (rate === 0) {
      monthlyPayment = principal / months;
      totalPayment = principal;
      totalInterest = 0;
    } else {
      const r = rate / 100;
      const factor = Math.pow(1 + r, months);
      monthlyPayment = principal * ((r * factor) / (factor - 1));
      totalPayment = monthlyPayment * months;
      totalInterest = totalPayment - principal;
    }

    setResult({
      principal,
      monthlyRate: rate,
      months,
      monthlyPayment,
      totalPayment,
      totalInterest,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="principal" className="block text-sm font-medium mb-2 text-foreground">
                Kredi Tutarı (TL) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="principal"
                  placeholder="Örn: 100.000"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                  value={principalStr}
                  onChange={(e) => setPrincipalStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="rate" className="block text-sm font-medium mb-2 text-foreground">
                  Aylık Faiz Oranı (%) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="rate"
                    placeholder="Örn: 3,50"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                    value={rateStr}
                    onChange={(e) => setRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    %
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="months" className="block text-sm font-medium mb-2 text-foreground">
                  Vade (Ay) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    id="months"
                    placeholder="12"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                    value={monthsStr}
                    onChange={(e) => setMonthsStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    Ay
                  </div>
                </div>
              </div>
            </div>

            {/* Hızlı Vade Seçimi */}
            <div>
              <span className="block text-xs font-medium text-muted-foreground mb-1.5">Popüler Vadeler:</span>
              <div className="grid grid-cols-6 gap-1.5">
                {MONTH_PRESETS.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMonthsStr(m.toString())}
                    className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                      monthsStr === m.toString()
                        ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                        : 'bg-background text-foreground border-border hover:bg-muted/40'
                    }`}
                  >
                    {m} Ay
                  </button>
                ))}
              </div>
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
              Kredi Taksitini Hesapla
            </button>
          </form>

          {/* Sağ Kolon: Sonuç */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Aylık Taksit Tutarı</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.monthlyPayment)}
                  </span>
                  <span className="text-xs text-muted-foreground mt-1">
                    {result.months} Ay Vade &bull; %{formatNumber(result.monthlyRate)} Aylık Faiz
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Kredi Anaparası:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.principal)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Faiz Tutarı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.totalInterest)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Toplam Geri Ödeme:</span>
                    <span className="font-bold text-foreground text-sm sm:text-base">{formatCurrency(result.totalPayment)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/faiz-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Basit ve bileşik mevduat faizi hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Kredi tutarı, faiz ve vadeyi girip hesaplayın.</p>
                <p className="text-xs text-muted-foreground mt-1">Aylık taksit ve toplam geri ödeme tutarınız burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO ve Bilgilendirme */}
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Kredi Taksiti Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Banka kredilerinde taksit tutarları eşit taksitli (annuite) geri ödeme formülü kullanılarak hesaplanır. 
          Her ay ödenen taksitin içinde anapara geri ödemesi ve o ayın kalan borcu üzerinden hesaplanan faiz tutarı yer alır.
        </p>

        <div className="p-5 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground mb-8 space-y-1.5">
          <p className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">
            Annuite Kredi Formülü:
          </p>
          <p className="font-semibold">Taksit = Kredi Tutarı &times; [ r(1+r)^n / ((1+r)^n - 1) ]</p>
          <p className="text-xs font-sans text-muted-foreground">r: Aylık Faiz Oranı, n: Vade (Ay Sayısı)</p>
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Kredi taksiti nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Kredi tutarı, aylık akdi faiz oranı ve ay cinsinden vade sayısı annuite katsayısı formülüne uygulanarak sabit aylık taksit tutarı elde edilir.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Toplam geri ödeme tutarı nedir?</h4>
            <p className="text-muted-foreground mt-2">
              Her ay ödenen sabit taksit tutarının vade ay sayısıyla çarpılmasıyla bulunur. Toplam geri ödemeden anapara çıkarıldığında bankaya ödenen toplam faiz bulunur.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Aylık faiz oranı ile yıllık faiz oranı farkı nedir?</h4>
            <p className="text-muted-foreground mt-2">
              Türkiye&apos;de tüketici kredilerinde faizler genellikle aylık oran üzerinden (örneğin %3,50) belirtilir. Yıllık nominal maliyet bu oranın 12 ile çarpılmasıyla yaklaşık olarak bulunur.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Vade uzadıkça aylık taksit ve toplam faiz nasıl değişir?</h4>
            <p className="text-muted-foreground mt-2">
              Vade uzadıkça her ay ödenen taksit tutarı düşer ancak borç daha uzun sürede kapandığı için bankaya ödenen toplam faiz miktarı artar.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">KKDF ve BSMV vergileri taksite dahil midir?</h4>
            <p className="text-muted-foreground mt-2">
              İhtiyaç kredilerinde faiz tutarı üzerinden yasal KKDF ve BSMV kesintileri uygulanır; konut kredileri ise genellikle KKDF ve BSMV&apos;den muaftır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
