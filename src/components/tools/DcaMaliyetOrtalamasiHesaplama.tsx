'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

interface OrderItem {
  id: number;
  amount: string; // miktar / adet
  price: string;  // birim fiyat
}

export default function DcaMaliyetOrtalamasiHesaplama() {
  const [orders, setOrders] = useState<OrderItem[]>([
    { id: 1, amount: '10', price: '120' },
    { id: 2, amount: '15', price: '105' },
    { id: 3, amount: '20', price: '95' },
  ]);
  const [currentMarketPriceStr, setCurrentMarketPriceStr] = useState<string>('115');
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    totalUnits: number;
    totalInvested: number;
    averageCost: number;
    currentValue: number;
    netProfitLoss: number;
    profitPercent: number;
  } | null>(null);

  const addRow = () => {
    setOrders([...orders, { id: Date.now(), amount: '', price: '' }]);
  };

  const removeRow = (id: number) => {
    if (orders.length <= 1) return;
    setOrders(orders.filter(o => o.id !== id));
  };

  const updateRow = (id: number, field: 'amount' | 'price', val: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, [field]: sanitizeNumericInput(val) } : o));
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    let totalUnits = 0;
    let totalInvested = 0;

    for (const o of orders) {
      const a = parseTurkishNumber(o.amount);
      const p = parseTurkishNumber(o.price);
      if (isNaN(a) || isNaN(p) || a <= 0 || p <= 0) {
        setError('Lütfen tüm kademeli alımlardaki adet ve fiyatları geçerli pozitif sayılar olarak girin.');
        return;
      }
      totalUnits += a;
      totalInvested += (a * p);
    }

    const averageCost = totalInvested / totalUnits;
    const curPrice = parseTurkishNumber(currentMarketPriceStr) || averageCost;
    const currentValue = totalUnits * curPrice;
    const netProfitLoss = currentValue - totalInvested;
    const profitPercent = (netProfitLoss / totalInvested) * 100;

    setResult({
      totalUnits: Math.round(totalUnits * 1000) / 1000,
      totalInvested: Math.round(totalInvested * 100) / 100,
      averageCost: Math.round(averageCost * 100) / 100,
      currentValue: Math.round(currentValue * 100) / 100,
      netProfitLoss: Math.round(netProfitLoss * 100) / 100,
      profitPercent: Math.round(profitPercent * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-semibold text-foreground">Kademeli Alımlar (Parçalı Emirler)</h4>
              <button
                type="button"
                onClick={addRow}
                className="text-xs px-3 py-1.5 bg-muted hover:bg-muted/80 text-foreground font-medium rounded-md border border-border"
              >
                + Alım Ekle
              </button>
            </div>

            {orders.map((o) => (
              <div key={o.id} className="grid grid-cols-12 gap-3 items-center">
                <div className="col-span-5">
                  <input
                    type="text"
                    value={o.amount}
                    onChange={(e) => updateRow(o.id, 'amount', e.target.value)}
                    placeholder="Adet / Miktar"
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm"
                  />
                </div>
                <div className="col-span-5">
                  <input
                    type="text"
                    value={o.price}
                    onChange={(e) => updateRow(o.id, 'price', e.target.value)}
                    placeholder="Birim Fiyat (TL)"
                    className="w-full h-10 px-3 rounded-lg border border-border bg-background text-sm"
                  />
                </div>
                <div className="col-span-2 text-right">
                  {orders.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRow(o.id)}
                      className="text-destructive hover:text-destructive/80 text-xs px-2 py-1"
                    >
                      Sil
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <label htmlFor="cur" className="block text-sm font-medium text-foreground mb-1">
              Güncel Piyasa Fiyatı (TL - İsteğe Bağlı)
            </label>
            <input
              id="cur"
              type="text"
              value={currentMarketPriceStr}
              onChange={(e) => setCurrentMarketPriceStr(sanitizeNumericInput(e.target.value))}
              className="w-full sm:w-1/2 h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Ortalama Maliyeti Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Maliyet & Kâr/Zarar Durumu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Ağırlıklı Ortalama Maliyet</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.averageCost)} ₺</span>
                <span className="text-xs text-muted-foreground block mt-1">Toplam {result.totalUnits} Adet</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Yatırılan Tutar</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.totalInvested)} ₺</span>
                <span className="text-xs text-muted-foreground block mt-1">Portföy Değeri: {formatNumber(result.currentValue)} ₺</span>
              </div>
              <div className={`p-4 rounded-lg border ${result.netProfitLoss >= 0 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400' : 'bg-destructive/10 border-destructive/30 text-destructive'}`}>
                <span className="text-xs block mb-1">Net Kâr / Zarar</span>
                <span className="text-xl font-bold">
                  {result.netProfitLoss >= 0 ? `+${formatNumber(result.netProfitLoss)}` : formatNumber(result.netProfitLoss)} ₺
                </span>
                <span className="text-xs block mt-1">({result.profitPercent >= 0 ? `+${result.profitPercent}` : result.profitPercent}%)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Dolar Maliyet Ortalaması (DCA) Stratejisi:</p>
        <p>Piyasanın dip noktasını tahmin etmeye çalışmak yerine düzenli aralıklarla kademeli alım yaparak oynaklığı azaltma ve ortalama maliyeti dengeleme yöntemidir.</p>
      </div>
    </div>
  );
}
