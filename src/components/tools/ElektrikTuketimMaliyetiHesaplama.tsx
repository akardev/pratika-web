'use client';

import { useState } from 'react';
import { formatCurrency, formatNumber, parseTurkishNumber } from '@/lib/utils';

export default function ElektrikTuketimMaliyetiHesaplama() {
  const [wattStr, setWattStr] = useState<string>('2000');
  const [hoursStr, setHoursStr] = useState<string>('4');
  const [kwhPriceStr, setKwhPriceStr] = useState<string>('2.60');

  const [result, setResult] = useState<{
    dailyKwh: number;
    monthlyKwh: number;
    dailyCost: number;
    monthlyCost: number;
    yearlyCost: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!wattStr.trim() || !hoursStr.trim() || !kwhPriceStr.trim()) {
      setError('Lütfen tüm alanları doldurun.');
      return;
    }

    const watt = parseTurkishNumber(wattStr);
    const hours = parseTurkishNumber(hoursStr);
    const kwhPrice = parseTurkishNumber(kwhPriceStr);

    if (isNaN(watt) || watt <= 0) {
      setError('Cihaz gücü 0\'dan büyük olmalıdır.');
      return;
    }

    if (isNaN(hours) || hours <= 0 || hours > 24) {
      setError('Günlük kullanım süresi 0 ile 24 saat arasında olmalıdır.');
      return;
    }

    if (isNaN(kwhPrice) || kwhPrice <= 0) {
      setError('kWh birim fiyatı 0\'dan büyük olmalıdır.');
      return;
    }

    const dailyKwh = (watt * hours) / 1000;
    const monthlyKwh = dailyKwh * 30;
    const dailyCost = dailyKwh * kwhPrice;
    const monthlyCost = monthlyKwh * kwhPrice;
    const yearlyCost = monthlyCost * 12;

    setResult({
      dailyKwh,
      monthlyKwh,
      dailyCost,
      monthlyCost,
      yearlyCost,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="watt" className="block text-sm font-medium mb-2 text-foreground">
                Cihaz Gücü (Watt) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="watt"
                  placeholder="Örn: 2000 (Klima/Isıtıcı)"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-14 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                  value={wattStr}
                  onChange={(e) => setWattStr(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  Watt
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="hrs" className="block text-sm font-medium mb-2 text-foreground">
                  Günlük Kullanım (Saat) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="hrs"
                    placeholder="Örn: 4"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-14 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                    value={hoursStr}
                    onChange={(e) => setHoursStr(e.target.value)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                    Saat
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="kwh" className="block text-sm font-medium mb-2 text-foreground">
                  1 kWh Elektrik Fiyatı (TL) <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="decimal"
                    id="kwh"
                    placeholder="Örn: 2,60"
                    className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base"
                    value={kwhPriceStr}
                    onChange={(e) => setKwhPriceStr(e.target.value)}
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
              Elektrik Maliyetini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Aylık Fatura Yansıması</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.monthlyCost)}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Aylık Tüketim: <strong>{formatNumber(result.monthlyKwh)} kWh</strong>
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-1.5 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Günlük Tüketim & Maliyet:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.dailyKwh)} kWh ({formatCurrency(result.dailyCost)})</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Yıllık Tahmini Masraf:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.yearlyCost)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Watt ve saat bilgisini girip faturayı hesaplayın.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
