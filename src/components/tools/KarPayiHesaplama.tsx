'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber } from '@/lib/utils';

interface DividendResult {
  shares: number;
  perShareDividend: number;
  sharePrice?: number;
  totalDividend: number;
  dividendYield?: number;
}

export default function KarPayiHesaplama() {
  const [sharesStr, setSharesStr] = useState<string>('');
  const [perShareStr, setPerShareStr] = useState<string>('');
  const [sharePriceStr, setSharePriceStr] = useState<string>('');

  const [result, setResult] = useState<DividendResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!sharesStr.trim()) {
      setError('Hisse adedi 0\'dan büyük olmalıdır.');
      return;
    }

    if (sharesStr.includes(',') || sharesStr.includes('.')) {
      setError('Hisse adedi tam sayı olmalıdır.');
      return;
    }

    const shares = parseTurkishNumber(sharesStr);
    if (isNaN(shares) || !Number.isInteger(shares) || shares <= 0) {
      setError('Hisse adedi 0\'dan büyük olmalıdır.');
      return;
    }

    if (!perShareStr.trim()) {
      setError('Hisse başı net kâr payı tutarı 0\'dan büyük olmalıdır.');
      return;
    }

    const perShare = parseTurkishNumber(perShareStr);
    if (isNaN(perShare) || perShare <= 0) {
      setError('Hisse başı net kâr payı tutarı 0\'dan büyük olmalıdır.');
      return;
    }

    let sharePrice: number | undefined;
    let dividendYield: number | undefined;

    if (sharePriceStr.trim()) {
      sharePrice = parseTurkishNumber(sharePriceStr);
      if (isNaN(sharePrice) || sharePrice <= 0) {
        setError('Hisse fiyatı 0\'dan büyük olmalıdır.');
        return;
      }
      dividendYield = (perShare / sharePrice) * 100;
    }

    const totalDividend = shares * perShare;

    setResult({
      shares,
      perShareDividend: perShare,
      sharePrice,
      totalDividend,
      dividendYield,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="shares" className="block text-sm font-medium mb-2 text-foreground">
                Hisse / Lot Adedi <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  id="shares"
                  placeholder="Örn: 1.000"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-14 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                  value={sharesStr}
                  onChange={(e) => setSharesStr(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  Adet
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="perShare" className="block text-sm font-medium mb-2 text-foreground">
                  Hisse Başı Net Temettü (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="perShare"
                    placeholder="Örn: 2,50"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                    value={perShareStr}
                    onChange={(e) => setPerShareStr(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    TL
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="sharePrice" className="block text-sm font-medium mb-2 text-foreground">
                  Hisse Fiyatı (Opsiyonel)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="sharePrice"
                    placeholder="Örn: 45,00"
                    autoComplete="off"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base"
                    value={sharePriceStr}
                    onChange={(e) => setSharePriceStr(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    TL
                  </div>
                </div>
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
              Kâr Payını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Toplam Net Kâr Payı</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.totalDividend)}
                  </span>
                  {result.dividendYield !== undefined && (
                    <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                      Temettü Verimi: <strong>%{formatNumber(result.dividendYield)}</strong>
                    </span>
                  )}
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hisse Adedi:</span>
                    <span className="font-semibold text-foreground">{result.shares} Adet</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Hisse Başı Temettü:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.perShareDividend)}</span>
                  </div>

                  {result.sharePrice !== undefined && (
                    <div className="flex justify-between items-center py-0.5">
                      <span className="text-muted-foreground">Hisse Fiyatı:</span>
                      <span className="font-semibold text-foreground">{formatCurrency(result.sharePrice)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Toplam Temettü Geliri:</span>
                    <span className="font-bold text-foreground text-sm sm:text-base">{formatCurrency(result.totalDividend)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/roi-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Toplam yatırım getirinizi (ROI) hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Hisse adedi ve hisse başı temettü tutarını girin.</p>
                <p className="text-xs text-muted-foreground mt-1">Toplam temettü kazancınız ve temettü veriminiz burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Temettü (Kâr Payı) Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Şirketlerin yıllık net kârlarından ortaklarına hisseleri oranında dağıttıkları nakit paya temettü (kâr payı) denir.
        </p>

        <div className="p-5 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground mb-8 space-y-1.5">
          <p className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">
            Temettü Formülleri:
          </p>
          <p className="font-semibold">Toplam Temettü = Hisse Adedi &times; Hisse Başı Net Temettü</p>
          <p className="font-semibold">Temettü Verimi (%) = (Hisse Başı Temettü / Hisse Fiyatı) &times; 100</p>
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Temettü nedir?</h4>
            <p className="text-muted-foreground mt-2">
              Bir şirketin elde ettiği dönem kârından hissedarlarına payları oranında yaptığı nakit veya bedelsiz hisse dağıtımıdır.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Brüt temettü ile net temettü arasındaki fark nedir?</h4>
            <p className="text-muted-foreground mt-2">
              Brüt temettüden yasal stopaj vergisi kesildikten sonra yatırımcının hesabına yatan tutar net temettüdür.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-lg text-foreground">Temettü verimi nasıl yorumlanır?</h4>
            <p className="text-muted-foreground mt-2">
              Temettü verimi, hisseye yatırılan her 100 TL karşılığında yıllık kaç TL nakit temettü geliri elde edildiğini gösterir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
