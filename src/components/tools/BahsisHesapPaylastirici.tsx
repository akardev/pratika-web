'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function BahsisHesapPaylastirici() {
  const [billStr, setBillStr] = useState('1200');
  const [tipPercent, setTipPercent] = useState(10);
  const [peopleCount, setPeopleCount] = useState(4);

  const bill = parseTurkishNumber(billStr) || 0;
  const tipAmount = bill * (tipPercent / 100);
  const totalAmount = bill + tipAmount;
  const perPersonAmount = peopleCount > 0 ? totalAmount / peopleCount : 0;
  const perPersonTip = peopleCount > 0 ? tipAmount / peopleCount : 0;

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="bill" className="block text-sm font-medium text-foreground mb-1">Adisyon Hesabı (TL)</label>
            <input
              id="bill"
              type="text"
              value={billStr}
              onChange={(e) => setBillStr(sanitizeNumericInput(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
          <div>
            <label htmlFor="tip" className="block text-sm font-medium text-foreground mb-1">Bahşiş Oranı (%)</label>
            <select
              id="tip"
              value={tipPercent}
              onChange={(e) => setTipPercent(Number(e.target.value))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            >
              <option value={0}>%0 (Bahşişsiz)</option>
              <option value={5}>%5</option>
              <option value={10}>%10 (Standart)</option>
              <option value={15}>%15 (Çok Memnun)</option>
              <option value={20}>%20 (Harika Hizmet)</option>
            </select>
          </div>
          <div>
            <label htmlFor="peo" className="block text-sm font-medium text-foreground mb-1">Kişi Sayısı</label>
            <input
              id="peo"
              type="number"
              min="1"
              max="50"
              value={peopleCount}
              onChange={(e) => setPeopleCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
              className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
            />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Hesap Paylaşımı</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <span className="text-xs text-muted-foreground block mb-1">Kişi Başı Ödenecek Tutar</span>
              <span className="text-2xl font-bold text-primary">{formatNumber(perPersonAmount)} ₺</span>
              <span className="text-xs text-muted-foreground block mt-1">Bahşiş Payı: {formatNumber(perPersonTip)} ₺</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Toplam Bahşiş</span>
              <span className="text-xl font-bold text-foreground">{formatNumber(tipAmount)} ₺</span>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <span className="text-xs text-muted-foreground block mb-1">Bahşişli Genel Toplam</span>
              <span className="text-xl font-bold text-foreground">{formatNumber(totalAmount)} ₺</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
