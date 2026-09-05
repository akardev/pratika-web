'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function KrediKartiGecikmeFaiziHesaplama() {
  const [debtStr, setDebtStr] = useState('20000');
  const [minPaymentStr, setMinPaymentStr] = useState('8000');
  const [paidStr, setPaidStr] = useState('0');
  const [daysStr, setDaysStr] = useState('15');
  const [rateStr, setRateStr] = useState('4.25'); // Aylık TCMB akdi faiz referansı
  const [result, setResult] = useState<{
    contractInterest: number;
    delayInterest: number;
    taxTotal: number;
    totalInterestAndTax: number;
    totalNewDebt: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const debt = parseTurkishNumber(debtStr);
    const minPayment = parseTurkishNumber(minPaymentStr);
    const paid = parseTurkishNumber(paidStr) || 0;
    const days = parseInt(daysStr, 10);
    const monthlyRate = parseTurkishNumber(rateStr);

    if (isNaN(debt) || debt <= 0 || isNaN(days) || days <= 0 || isNaN(monthlyRate) || monthlyRate <= 0) {
      setError('Lütfen tüm alanları geçerli değerlerle doldurun.');
      return;
    }

    // Günlük akdi ve gecikme faizi oranları
    const dailyRate = (monthlyRate / 100) / 30;
    const delayMonthlyRate = monthlyRate + 0.30; // TCMB kuralı: gecikme faizi azami akdi faiz + %0.30
    const delayDailyRate = (delayMonthlyRate / 100) / 30;

    // Asgari tutarın ödenmeyen kısmı için gecikme faizi, kalan borç için akdi faiz
    const unpaidMin = Math.max(0, minPayment - paid);
    const unpaidRest = Math.max(0, debt - paid - unpaidMin);

    const delayInterest = unpaidMin * delayDailyRate * days;
    const contractInterest = (unpaidMin > 0 ? unpaidRest : (debt - paid)) * dailyRate * days;
    const rawInterest = delayInterest + contractInterest;

    // Fonlar: %15 KKDF, %5 BSMV
    const kkdf = rawInterest * 0.15;
    const bsmv = rawInterest * 0.05;
    const taxTotal = kkdf + bsmv;
    const totalInterestAndTax = rawInterest + taxTotal;
    const totalNewDebt = (debt - paid) + totalInterestAndTax;

    setResult({
      contractInterest: Math.round(contractInterest * 100) / 100,
      delayInterest: Math.round(delayInterest * 100) / 100,
      taxTotal: Math.round(taxTotal * 100) / 100,
      totalInterestAndTax: Math.round(totalInterestAndTax * 100) / 100,
      totalNewDebt: Math.round(totalNewDebt * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label htmlFor="debt" className="block text-sm font-medium text-foreground mb-1">Dönem Borcu (TL)</label>
              <input
                id="debt"
                type="text"
                value={debtStr}
                onChange={(e) => setDebtStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="min" className="block text-sm font-medium text-foreground mb-1">Asgari Ödeme Tutarı (TL)</label>
              <input
                id="min"
                type="text"
                value={minPaymentStr}
                onChange={(e) => setMinPaymentStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="paid" className="block text-sm font-medium text-foreground mb-1">Yapılan Ödeme (TL)</label>
              <input
                id="paid"
                type="text"
                value={paidStr}
                onChange={(e) => setPaidStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="days" className="block text-sm font-medium text-foreground mb-1">Geciken Gün Sayısı</label>
              <input
                id="days"
                type="number"
                min="1"
                max="365"
                value={daysStr}
                onChange={(e) => setDaysStr(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="rate" className="block text-sm font-medium text-foreground mb-1">Aylık Akdi Faiz Oranı (%)</label>
              <input
                id="rate"
                type="text"
                value={rateStr}
                onChange={(e) => setRateStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Gecikme Faizini Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Gecikme Maliyet Dökümü
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <span className="text-xs text-muted-foreground block mb-1">Toplam Ek Maliyet (Faiz + Vergi)</span>
                <span className="text-2xl font-bold text-destructive">{formatNumber(result.totalInterestAndTax)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Ödenecek Güncel Yeni Borç</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.totalNewDebt)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Yasal Vergiler (%15 KKDF + %5 BSMV)</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.taxTotal)} ₺</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
