'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function SahisSirketiMaliyetiHesaplama() {
  const [hasYoungEntrepreneurDiscount, setHasYoungEntrepreneurDiscount] = useState<boolean>(false);
  const [accountantFeeStr, setAccountantFeeStr] = useState<string>('2500');
  const [officeRentStr, setOfficeRentStr] = useState<string>('0'); // Sanal ofis veya işyeri
  const [hasEmployee] = useState<boolean>(false);

  const [result, setResult] = useState<{
    bagkurCost: number;
    accountantCost: number;
    stampTaxes: number;
    officeCost: number;
    totalMonthlyCost: number;
    annualTotalCost: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const accountant = parseTurkishNumber(accountantFeeStr) || 0;
    const rent = parseTurkishNumber(officeRentStr) || 0;

    // 2026 Standart Bağ-Kur primi: ~8.000 TL (%5 düzenli ödeme teşvikiyle)
    // Genç Girişimci (18-29 yaş) 1 yıl boyunca 0 TL
    const bagkurCost = hasYoungEntrepreneurDiscount ? 0 : 7900;

    // Aylık damga vergileri: KDV Beyannamesi (~400 TL) + Muhtasar Beyanname (~400 TL)
    const stampTaxes = hasEmployee ? 850 : 500;

    const totalMonthlyCost = bagkurCost + accountant + rent + stampTaxes;
    const annualTotalCost = totalMonthlyCost * 12;

    setResult({
      bagkurCost,
      accountantCost: accountant,
      stampTaxes,
      officeCost: rent,
      totalMonthlyCost,
      annualTotalCost,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="acc" className="block text-sm font-medium text-foreground mb-1">Muhasebeci Ücreti (Aylık TL)</label>
              <input
                id="acc"
                type="text"
                value={accountantFeeStr}
                onChange={(e) => setAccountantFeeStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="rent" className="block text-sm font-medium text-foreground mb-1">Sanal/Fiziki Ofis Kirası (TL)</label>
              <input
                id="rent"
                type="text"
                value={officeRentStr}
                onChange={(e) => setOfficeRentStr(sanitizeNumericInput(e.target.value))}
                placeholder="0"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="young" className="block text-sm font-medium text-foreground mb-1">Genç Girişimci Teşviki</label>
              <select
                id="young"
                value={hasYoungEntrepreneurDiscount ? 'yes' : 'no'}
                onChange={(e) => setHasYoungEntrepreneurDiscount(e.target.value === 'yes')}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value="no">Hayır (Normal Bağ-Kur öder)</option>
                <option value="yes">Evet (1 Yıl Bağ-Kur Primi Muafiyeti)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Aylık Gideri Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Şahıs Şirketi Zorunlu Sabit Giderleri</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Aylık Asgari Sabit Gider</span>
                <span className="text-2xl font-bold text-primary">{formatNumber(result.totalMonthlyCost)} ₺/ay</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Bağ-Kur Primi</span>
                <span className="text-xl font-bold text-foreground">
                  {result.bagkurCost === 0 ? '0 ₺ (Teşvikli Muaf)' : `${formatNumber(result.bagkurCost)} ₺`}
                </span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Yıllık Toplam Sabit Yük</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.annualTotalCost)} ₺/yıl</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-border/60 bg-muted/20 p-5 text-xs text-muted-foreground space-y-2">
        <p className="font-semibold text-foreground">Yeni Şirket Kuranlar İçin Önemli Not:</p>
        <p>Şahıs şirketi kurduğunuzda hiç fatura kesmeseniz bile her ay KDV beyannamesi damga vergisi, muhasebe ücreti ve 4/b Bağ-Kur priminizi ödemekle yükümlüsünüzdür. 29 yaş altı genç girişimciler ilk 1 yıl Bağ-Kur prim muafiyetinden faydalanabilir.</p>
      </div>
    </div>
  );
}
