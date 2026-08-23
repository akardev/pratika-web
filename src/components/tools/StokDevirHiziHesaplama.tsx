'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

interface InventoryResult {
  cogs: number;
  averageInventory: number;
  turnoverRatio: number;
  daysOnHand: number;
}

export default function StokDevirHiziHesaplama() {
  const [cogsStr, setCogsStr] = useState<string>('');
  const [inventoryStr, setInventoryStr] = useState<string>('');

  const [result, setResult] = useState<InventoryResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!cogsStr.trim()) {
      setError('Satılan malın maliyeti (SMM) 0\'dan büyük olmalıdır.');
      return;
    }

    const cogs = parseTurkishNumber(cogsStr);
    if (isNaN(cogs) || cogs <= 0) {
      setError('Satılan malın maliyeti (SMM) 0\'dan büyük olmalıdır.');
      return;
    }

    if (!inventoryStr.trim()) {
      setError('Ortalama stok tutarı 0\'dan büyük olmalıdır.');
      return;
    }

    const avgInv = parseTurkishNumber(inventoryStr);
    if (isNaN(avgInv) || avgInv <= 0) {
      setError('Ortalama stok tutarı 0\'dan büyük olmalıdır.');
      return;
    }

    const turnoverRatio = cogs / avgInv;
    const daysOnHand = 365 / turnoverRatio;

    setResult({
      cogs,
      averageInventory: avgInv,
      turnoverRatio,
      daysOnHand,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="cogs" className="block text-sm font-medium mb-2 text-foreground">
                Yıllık Satılan Malın Maliyeti (SMM) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="cogs"
                  placeholder="Örn: 1.200.000"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                  value={cogsStr}
                  onChange={(e) => setCogsStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="inventory" className="block text-sm font-medium mb-2 text-foreground">
                Dönem İçi Ortalama Stok Tutarı <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="inventory"
                  placeholder="Örn: 200.000"
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-base font-mono"
                  value={inventoryStr}
                  onChange={(e) => setInventoryStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  TL
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
              Stok Devir Hızını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Yıllık Stok Devir Hızı</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatNumber(result.turnoverRatio)} Kat
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Stokta Kalma Süresi: <strong>{formatNumber(result.daysOnHand)} Gün</strong>
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Satılan Malın Maliyeti (SMM):</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.cogs)}</span>
                  </div>

                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Ortalama Stok Tutarı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.averageInventory)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1 border-t border-border/40 pt-2">
                    <span className="font-medium text-foreground">Stok Yenilenme Süresi:</span>
                    <span className="font-bold text-foreground text-sm sm:text-base">Her {Math.round(result.daysOnHand)} günde bir</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/maliyet-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Birim maliyetlerinizi hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">SMM ve ortalama stok tutarını girin.</p>
                <p className="text-xs text-muted-foreground mt-1">Yıllık devir hızı ve stokta kalma gün süresi burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Stok Devir Hızı Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Stok devir hızı, bir işletmenin elindeki stokları bir yıl içinde kaç kez satıp yenilediğini gösteren verimlilik rasyosudur.
        </p>

        <div className="p-5 rounded-xl border border-border/80 bg-muted/30 font-mono text-xs sm:text-sm text-foreground mb-8 space-y-1.5">
          <p className="font-sans font-semibold text-muted-foreground text-xs uppercase tracking-wider mb-1">
            Stok Devir Formülleri:
          </p>
          <p className="font-semibold">Stok Devir Hızı = Satılan Malın Maliyeti / Ortalama Stok</p>
          <p className="font-semibold">Stokta Kalma Süresi (Gün) = 365 / Stok Devir Hızı</p>
        </div>

        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Yüksek stok devir hızı ne anlama gelir?</h4>
            <p className="text-muted-foreground mt-2">
              Yüksek devir hızı ürünlerin depoda beklemeden hızla satıldığını ve sermayenin verimli kullanıldığını gösterir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
