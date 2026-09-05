'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function HalkaArzLotHesaplama() {
  const [totalLotStr, setTotalLotStr] = useState('50000000'); // Dağıtılacak toplam lot
  const [individualPercentStr, setIndividualPercentStr] = useState('70'); // % Bireysele ayrılan
  const [priceStr, setPriceStr] = useState('32.50'); // Halka arz hisse fiyatı
  const [participantsStr, setParticipantsStr] = useState('2500000'); // Tahmini katılımcı sayısı

  const [result, setResult] = useState<{
    individualLots: number;
    lotPerPerson: number;
    requiredFunds: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const totalLot = parseTurkishNumber(totalLotStr);
    const individualPercent = parseTurkishNumber(individualPercentStr) || 100;
    const price = parseTurkishNumber(priceStr);
    const participants = parseTurkishNumber(participantsStr);

    if (isNaN(totalLot) || isNaN(price) || isNaN(participants) || participants <= 0) return;

    const individualLots = totalLot * (individualPercent / 100);
    const lotPerPerson = Math.floor(individualLots / participants);
    const requiredFunds = lotPerPerson * price;

    setResult({
      individualLots: Math.round(individualLots),
      lotPerPerson,
      requiredFunds: Math.round(requiredFunds * 100) / 100,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label htmlFor="tlot" className="block text-sm font-medium text-foreground mb-1">Toplam Halka Arz Lot Sayısı</label>
              <input
                id="tlot"
                type="text"
                value={totalLotStr}
                onChange={(e) => setTotalLotStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="indp" className="block text-sm font-medium text-foreground mb-1">Bireysele Ayrılan Pay (%)</label>
              <input
                id="indp"
                type="text"
                value={individualPercentStr}
                onChange={(e) => setIndividualPercentStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="pr" className="block text-sm font-medium text-foreground mb-1">Hisse Dağıtım Fiyatı (TL)</label>
              <input
                id="pr"
                type="text"
                value={priceStr}
                onChange={(e) => setPriceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="part" className="block text-sm font-medium text-foreground mb-1">Tahmini Katılımcı Sayısı</label>
              <input
                id="part"
                type="text"
                value={participantsStr}
                onChange={(e) => setParticipantsStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Kişi Başı Lot Dağıtımını Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tahmini Dağıtım Sonucu</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Kişi Başı Muhtemel Lot</span>
                <span className="text-2xl font-bold text-primary">{result.lotPerPerson} Lot</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Gereken Bütçe / Teminat</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.requiredFunds)} ₺</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Bireysele Ayrılan Toplam Lot</span>
                <span className="text-xl font-bold text-foreground">{formatNumber(result.individualLots)} Lot</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
