'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function IseAlimMaliyetiHesaplama() {
  const [adSpendStr, setAdSpendStr] = useState<string>('8.000'); // İlan ve ajans masrafı
  const [interviewHoursStr, setInterviewHoursStr] = useState<string>('20'); // Toplam mülakat süresi (saat)
  const [interviewerHourlyWageStr, setInterviewerHourlyWageStr] = useState<string>('400'); // İK / Yönetici saatlik maliyeti
  const [equipmentCostStr, setEquipmentCostStr] = useState<string>('35.000'); // Bilgisayar / Ekipman / Lisans
  const [trainingCostStr, setTrainingCostStr] = useState<string>('12.000'); // Oryantasyon & Eğitim masrafı

  const [result, setResult] = useState<{
    adSpend: number;
    interviewCost: number;
    equipmentCost: number;
    trainingCost: number;
    totalCost: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const adSpend = parseTurkishNumber(adSpendStr) || 0;
    const interviewHours = parseTurkishNumber(interviewHoursStr) || 0;
    const interviewerWage = parseTurkishNumber(interviewerHourlyWageStr) || 0;
    const equipmentCost = parseTurkishNumber(equipmentCostStr) || 0;
    const trainingCost = parseTurkishNumber(trainingCostStr) || 0;

    const interviewCost = interviewHours * interviewerWage;
    const totalCost = adSpend + interviewCost + equipmentCost + trainingCost;

    if (totalCost <= 0) {
      setError('Lütfen en az bir maliyet kalemi giriniz.');
      return;
    }

    setResult({
      adSpend,
      interviewCost,
      equipmentCost,
      trainingCost,
      totalCost,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div>
              <label htmlFor="adSpend" className="block text-sm font-medium mb-1 text-foreground">
                İlan, Ajans ve Sponsorluk Gideri (TL)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="adSpend"
                  placeholder="Örn: 8.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={adSpendStr}
                  onChange={(e) => setAdSpendStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">TL</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="interviewHours" className="block text-sm font-medium mb-1 text-foreground">
                  Mülakat Süresi (Saat)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="interviewHours"
                  placeholder="Örn: 20"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={interviewHoursStr}
                  onChange={(e) => setInterviewHoursStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
              <div>
                <label htmlFor="interviewerWage" className="block text-sm font-medium mb-1 text-foreground">
                  İK / Yönetici Saat Ücreti (TL)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="interviewerWage"
                  placeholder="Örn: 400"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={interviewerHourlyWageStr}
                  onChange={(e) => setInterviewerHourlyWageStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="equipmentCost" className="block text-sm font-medium mb-1 text-foreground">
                  Donanım / Ekipman (TL)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="equipmentCost"
                  placeholder="Örn: 35.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={equipmentCostStr}
                  onChange={(e) => setEquipmentCostStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
              </div>
              <div>
                <label htmlFor="trainingCost" className="block text-sm font-medium mb-1 text-foreground">
                  Eğitim / Oryantasyon (TL)
                </label>
                <input
                  type="text"
                  inputMode="decimal"
                  id="trainingCost"
                  placeholder="Örn: 12.000"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={trainingCostStr}
                  onChange={(e) => setTrainingCostStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
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
              İşe Alım Maliyetini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Toplam İşe Alım Maliyeti
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Aday Başına Toplam Yatırım</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {formatCurrency(result.totalCost)}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">İlan ve Ajans:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.adSpend)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Mülakat ve İK Zamanı:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.interviewCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Ekipman ve Kurulum:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.equipmentCost)}</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Eğitim ve Uyum:</span>
                    <span className="font-semibold text-foreground">{formatCurrency(result.trainingCost)}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/isveren-maliyeti-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Aylık brüt işveren maaş maliyetini hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">İşe alım kalemlerini girerek çalışan başına maliyeti çıkarın.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">İşe Alım Maliyeti (Cost per Hire) Nedir?</h2>
        <p className="mb-4 text-muted-foreground">
          Bir pozisyonun doldurulması için harcanan ilan bedelleri, görüşme yapan yöneticilerin saatlik iş gücü kaybı, yeni başlayan kişiye tahsis edilen donanım ve oryantasyon sürecindeki toplam maliyetlerin bütünüdür.
        </p>
      </div>
    </div>
  );
}
