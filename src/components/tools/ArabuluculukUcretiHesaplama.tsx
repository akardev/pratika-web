'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function ArabuluculukUcretiHesaplama() {
  const [agreementStr, setAgreementStr] = useState('150000'); // Anlaşma bedeli

  const [result, setResult] = useState<{
    fee: number;
    perPartyFee: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseTurkishNumber(agreementStr);
    if (isNaN(amount) || amount <= 0) return;

    // Arabuluculuk Asgari Ücret Tarifesi: İlk 100.000 TL için %6, Sonraki 160.000 TL için %5
    let fee = 0;
    if (amount <= 100000) {
      fee = amount * 0.06;
    } else {
      fee = (100000 * 0.06) + ((amount - 100000) * 0.05);
    }

    // İki tarafça eşit paylaşılır
    const perPartyFee = fee / 2;

    setResult({
      fee: Math.round(fee * 100) / 100,
      perPartyFee: Math.round(perPartyFee * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="max-w-md">
            <label htmlFor="agr" className="block text-sm font-medium text-foreground mb-1">
              Arabuluculukta Anlaşılan Tutar (TL)
            </label>
            <input
              id="agr"
              type="text"
              value={agreementStr}
              onChange={(e) => setAgreementStr(sanitizeNumericInput(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Arabulucu Ücretini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Arabuluculuk Ücret Paylaşımı</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Arabulucuya Ödenecek Toplam Ücret</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.fee)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Taraf Başına Düşen Pay (Yarı Yarıya)</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.perPartyFee)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
