'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KrediKartiAsgariOdemeHesaplama() {
  const [balanceStr, setBalanceStr] = useState('35000');
  const [limitStr, setLimitStr] = useState('50000');
  const [result, setResult] = useState<{
    minRate: number;
    minPayment: number;
    remainingBalance: number;
    limitCategory: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const balance = parseTurkishNumber(balanceStr);
    const limit = parseTurkishNumber(limitStr);

    if (isNaN(balance) || balance <= 0) {
      setError('Lütfen geçerli bir dönem borcu tutarı girin.');
      return;
    }

    if (isNaN(limit) || limit <= 0) {
      setError('Lütfen geçerli bir kart limiti girin.');
      return;
    }

    // BDDK kuralı: 25.000 TL ve altı limitlerde %20, 25.000 TL üstü limitlerde %40
    const minRate = limit <= 25000 ? 0.20 : 0.40;
    const minPayment = balance * minRate;
    const remainingBalance = balance - minPayment;
    const limitCategory = limit <= 25000 ? '25.000 TL ve Altı (%20 Asgari Oran)' : '25.000 TL Üzeri (%40 Asgari Oran)';

    setResult({
      minRate: minRate * 100,
      minPayment: Math.round(minPayment * 100) / 100,
      remainingBalance: Math.round(remainingBalance * 100) / 100,
      limitCategory,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="limit" className="block text-sm font-medium text-foreground mb-1">
                Kredi Kartı Toplam Limiti (TL)
              </label>
              <input
                id="limit"
                type="text"
                value={limitStr}
                onChange={(e) => setLimitStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                placeholder="Örn: 50.000"
              />
              <span className="text-xs text-muted-foreground mt-1 block">
                BDDK: 25.000 TL altı %20, üzeri %40 asgari oran uygular.
              </span>
            </div>
            <div>
              <label htmlFor="balance" className="block text-sm font-medium text-foreground mb-1">
                Dönem Ekstre Borcu (TL)
              </label>
              <input
                id="balance"
                type="text"
                value={balanceStr}
                onChange={(e) => setBalanceStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
                placeholder="Örn: 35.000"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Asgari Tutarı Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Asgari Ödeme Sonuçları
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Ödenmesi Gereken Asgari Tutar</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.minPayment)} ₺</span>
                <span className="text-xs text-muted-foreground block mt-1">Oran: %{result.minRate}</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Asgari Ödendiğinde Kalan Borç</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.remainingBalance)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Mevzuat Dilimi</span>
                <span className="text-sm font-semibold text-foreground block">{result.limitCategory}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
