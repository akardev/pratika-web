'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function VerasetIntikalVergisiHesaplama() {
  const [inheritanceShareStr, setInheritanceShareStr] = useState('4000000');
  const [transferType, setTransferType] = useState<'inheritance' | 'gift'>('inheritance');

  const [result, setResult] = useState<{
    exemption: number;
    taxBase: number;
    taxDue: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const share = parseTurkishNumber(inheritanceShareStr);
    if (isNaN(share) || share <= 0) return;

    // 2026 Yasal İstisnalar (Veraset: Mirasçı çocuk/eş başı yaklaşık 2.500.000 TL, İvazsız İntikal: yaklaşık 55.000 TL)
    const exemption = transferType === 'inheritance' ? 2500000 : 550000;
    const taxBase = Math.max(0, share - exemption);

    // Kademeli veraset dilimleri: İlk 1.700.000 %1, Sonraki 3.800.000 %3, Sonraki 8.200.000 %5...
    let taxDue = 0;
    if (taxBase > 0) {
      if (taxBase <= 1700000) taxDue = taxBase * 0.01;
      else if (taxBase <= 5500000) taxDue = 1700000 * 0.01 + (taxBase - 1700000) * 0.03;
      else taxDue = 1700000 * 0.01 + 3800000 * 0.03 + (taxBase - 5500000) * 0.05;
    }

    setResult({
      exemption,
      taxBase: Math.round(taxBase),
      taxDue: Math.round(taxDue),
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="tt" className="block text-sm font-medium text-foreground mb-1">İntikal Türü</label>
              <select
                id="tt"
                value={transferType}
                onChange={(e) => setTransferType(e.target.value as 'child' | 'spouse_alone' | 'other' | 'unrequited')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="inheritance">Veraset (Miras Yoluyla İntikal)</option>
                <option value="gift">İvazsız (Hibe / Bağış / Çekiliş)</option>
              </select>
            </div>
            <div>
              <label htmlFor="is" className="block text-sm font-medium text-foreground mb-1">Mirasçıya Düşen Pay Tutarı (TL)</label>
              <input
                id="is"
                type="text"
                value={inheritanceShareStr}
                onChange={(e) => setInheritanceShareStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            İntikal Vergisini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Veraset ve İntikal Vergisi Dökümü</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Ödenecek Toplam Vergi</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.taxDue)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Düşülen Yasal İstisna</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.exemption)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Vergiye Tabi Matrah</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.taxBase)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
