'use client';

import { useState } from 'react';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function FreelanceSaatlikUcretHesaplayici() {
  const [targetNetStr, setTargetNetStr] = useState<string>('60000'); // Aylık net hedef
  const [fixedExpensesStr, setFixedExpensesStr] = useState<string>('15000'); // Yazılım, ofis, bağkur
  const [taxBufferPercent, setTaxBufferPercent] = useState<number>(25); // %25 vergi payı
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25); // Haftada 25 saat faturalanabilir
  const [vacationWeeksPerYear, setVacationWeeksPerYear] = useState<number>(4); // Yılda 4 hafta izin
  const [error, setError] = useState<string | null>(null);

  const [result, setResult] = useState<{
    hourlyRateTRY: number;
    dailyRateTRY: number;
    monthlyGrossTarget: number;
    annualBillableHours: number;
  } | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const netTarget = parseTurkishNumber(targetNetStr);
    const expenses = parseTurkishNumber(fixedExpensesStr) || 0;

    if (isNaN(netTarget) || netTarget <= 0) {
      setError('Lütfen hedeflediğiniz aylık net geliri girin.');
      return;
    }

    // Yıllık net hedef + giderler
    const annualNet = (netTarget + expenses) * 12;
    // Vergi payı eklenmiş brüt gelir hedefi
    const annualGross = annualNet / (1 - taxBufferPercent / 100);

    // Yıllık faturalandırılabilir saat = (52 - Tatil Haftası) * Haftalık Saat
    const workWeeks = Math.max(1, 52 - vacationWeeksPerYear);
    const annualHours = workWeeks * billableHoursPerWeek;

    const hourlyRate = annualGross / annualHours;
    const dailyRate = hourlyRate * (billableHoursPerWeek / 5);

    setResult({
      hourlyRateTRY: Math.round(hourlyRate),
      dailyRateTRY: Math.round(dailyRate),
      monthlyGrossTarget: Math.round(annualGross / 12),
      annualBillableHours: annualHours,
    });
  };

  return (
    <div className="w-full space-y-6">
      <div className="rounded-xl border border-border/80 bg-card p-6 sm:p-8 shadow-sm">
        <form onSubmit={handleCalculate} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label htmlFor="tnet" className="block text-sm font-medium text-foreground mb-1">Aylık Net Hedef Kazanç (TL)</label>
              <input
                id="tnet"
                type="text"
                value={targetNetStr}
                onChange={(e) => setTargetNetStr(sanitizeNumericInput(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
            <div>
              <label htmlFor="exp" className="block text-sm font-medium text-foreground mb-1">Aylık İş Giderleri (TL)</label>
              <input
                id="exp"
                type="text"
                value={fixedExpensesStr}
                onChange={(e) => setFixedExpensesStr(sanitizeNumericInput(e.target.value))}
                placeholder="Örn: 5.000"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
              <span className="text-[11px] text-muted-foreground block mt-1">Bağkur, yazılım lisansları, ofis vb.</span>
            </div>
            <div>
              <label htmlFor="taxp" className="block text-sm font-medium text-foreground mb-1">Tahmini Vergi Payı (%)</label>
              <select
                id="taxp"
                value={taxBufferPercent}
                onChange={(e) => setTaxBufferPercent(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              >
                <option value={20}>%20 (Düşük Dilim)</option>
                <option value={25}>%25 (Standart Şahıs Şirketi)</option>
                <option value={35}>%35 (Yüksek Gelir Dilimi)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="hpw" className="block text-sm font-medium text-foreground mb-1">Haftalık Faturalanabilir Çalışma Saati</label>
              <input
                id="hpw"
                type="number"
                value={billableHoursPerWeek}
                onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
                min="5" max="60"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
              <span className="text-[11px] text-muted-foreground block mt-1">Görüşme ve teklif hazırlama dışındaki fiili üretim süresi</span>
            </div>
            <div>
              <label htmlFor="vac" className="block text-sm font-medium text-foreground mb-1">Yıllık Planlanan İzin (Hafta)</label>
              <input
                id="vac"
                type="number"
                value={vacationWeeksPerYear}
                onChange={(e) => setVacationWeeksPerYear(Number(e.target.value))}
                min="0" max="20"
                className="w-full h-11 px-3 rounded-lg border border-border bg-background text-sm"
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full sm:w-auto px-6 h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
          >
            Saatlik Asgari Teklif Fiyatını Bul
          </button>
        </form>

        {result && (
          <div className="mt-8 pt-6 border-t border-border space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Önerilen Fiyatlandırma Teklifi</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                <span className="text-xs text-muted-foreground block mb-1">Asgari Saatlik Ücret</span>
                <span className="text-3xl font-bold text-primary">{formatNumber(result.hourlyRateTRY)} ₺/saat</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Günlük Adam/Gün Ücreti</span>
                <span className="text-2xl font-bold text-foreground">{formatNumber(result.dailyRateTRY)} ₺/gün</span>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-border">
                <span className="text-xs text-muted-foreground block mb-1">Aylık Gereken Fatura Hasılatı</span>
                <span className="text-2xl font-bold text-foreground">{formatNumber(result.monthlyGrossTarget)} ₺/ay</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
