'use client';

import { useState } from 'react';
import Link from 'next/link';
import { parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function DevamsizlikHesaplama() {
  const [schoolType, setSchoolType] = useState<'lise' | 'universite'>('lise');

  // Lise
  const [unexcusedDaysStr, setUnexcusedDaysStr] = useState<string>('6.5'); // Özürsüz
  const [excusedDaysStr, setExcusedDaysStr] = useState<string>('12'); // Özürlü / İzinli-Raporlu

  // Üniversite
  const [totalCourseHoursStr, setTotalCourseHoursStr] = useState<string>('42'); // Dönemlik toplam ders saati (14 hafta x 3 saat)
  const [absentHoursStr, setAbsentHoursStr] = useState<string>('8'); // Devamsızlık saati
  const [allowedPercent, setAllowedPercent] = useState<number>(30); // %30 teorik / %20 uygulama

  const [result, setResult] = useState<{
    totalAbsent: number;
    remainingUnexcused?: number;
    remainingTotal?: number;
    isFailed: boolean;
    warningMessage: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (schoolType === 'lise') {
      const unexcused = parseTurkishNumber(unexcusedDaysStr) || 0;
      const excused = parseTurkishNumber(excusedDaysStr) || 0;
      const total = unexcused + excused;

      // MEB: Özürsüz 10 gün, Toplam 30 gün
      const remainingUnexcused = Math.max(0, 10 - unexcused);
      const remainingTotal = Math.max(0, 30 - total);
      const isFailed = unexcused > 10 || total > 30;

      let warningMessage = 'Devamsızlık sınırları içerisindesiniz.';
      if (unexcused > 10) {
        warningMessage = 'Özürsüz devamsızlık sınırını (10 gün) aştığınız için sınıf tekrarı durumu oluşur!';
      } else if (total > 30) {
        warningMessage = 'Toplam devamsızlık sınırını (30 gün) aştığınız için sınıf tekrarı durumu oluşur!';
      } else if (unexcused >= 8) {
        warningMessage = 'Dikkat! Özürsüz devamsızlık sınırına çok yaklaştınız.';
      }

      setResult({
        totalAbsent: total,
        remainingUnexcused,
        remainingTotal,
        isFailed,
        warningMessage,
      });
    } else {
      // Üniversite
      const totalHours = parseTurkishNumber(totalCourseHoursStr);
      const absentHours = parseTurkishNumber(absentHoursStr) || 0;

      if (isNaN(totalHours) || totalHours <= 0) {
        setError('Lütfen toplam dönemlik ders saatini giriniz.');
        return;
      }

      const maxAllowedHours = Math.floor(totalHours * (allowedPercent / 100));
      const remainingHours = Math.max(0, maxAllowedHours - absentHours);
      const isFailed = absentHours > maxAllowedHours;

      let warningMessage = `Bu derste devamsızlık hakkınız: ${maxAllowedHours} saat.`;
      if (isFailed) {
        warningMessage = `Devamsızlık sınırını (${maxAllowedHours} saat) aştığınız için dersten devamsızlıktan kaldınız (NA / FF)!`;
      } else if (remainingHours <= 2) {
        warningMessage = `Dikkat! Kalan devamsızlık hakkınız sadece ${remainingHours} saat.`;
      }

      setResult({
        totalAbsent: absentHours,
        remainingTotal: remainingHours,
        isFailed,
        warningMessage,
      });
    }
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Kurum / Eğitim Kademesi
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSchoolType('lise')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    schoolType === 'lise'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Lise / MEB
                </button>
                <button
                  type="button"
                  onClick={() => setSchoolType('universite')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    schoolType === 'universite'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Üniversite (Ders Saati)
                </button>
              </div>
            </div>

            {schoolType === 'lise' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="unexcused" className="block text-sm font-medium mb-1 text-foreground">
                    Özürsüz Devamsızlık (Gün) <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    id="unexcused"
                    placeholder="Örn: 6.5"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={unexcusedDaysStr}
                    onChange={(e) => setUnexcusedDaysStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">Yasal sınır 10 gündür.</p>
                </div>

                <div>
                  <label htmlFor="excused" className="block text-sm font-medium mb-1 text-foreground">
                    Özürlü / Raporlu (Gün)
                  </label>
                  <input
                    type="text"
                    inputMode="decimal"
                    id="excused"
                    placeholder="Örn: 12"
                    className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                    value={excusedDaysStr}
                    onChange={(e) => setExcusedDaysStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                  <p className="text-[11px] text-muted-foreground mt-1">Toplam sınır 30 gündür.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="totalHours" className="block text-sm font-medium mb-1 text-foreground">
                      Dönemlik Toplam Ders Saati <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      id="totalHours"
                      placeholder="Örn: 42"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                      value={totalCourseHoursStr}
                      onChange={(e) => setTotalCourseHoursStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                    />
                  </div>

                  <div>
                    <label htmlFor="absentHours" className="block text-sm font-medium mb-1 text-foreground">
                      Yapılan Devamsızlık (Saat) <span className="text-destructive">*</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      id="absentHours"
                      placeholder="Örn: 8"
                      className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                      value={absentHoursStr}
                      onChange={(e) => setAbsentHoursStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-medium text-foreground">Ders Türü ve Devamsızlık Hakkı</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setAllowedPercent(30)}
                      className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                        allowedPercent === 30 ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                      }`}
                    >
                      %30 (Teorik Dersler)
                    </button>
                    <button
                      type="button"
                      onClick={() => setAllowedPercent(20)}
                      className={`py-1.5 px-2 text-xs font-semibold rounded-lg border transition-all ${
                        allowedPercent === 20 ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                      }`}
                    >
                      %20 (Uygulama / Lab)
                    </button>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 mt-2 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Devamsızlık Durumunu Kontrol Et
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Devamsızlık Durumu
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Kalan Hak</span>
                  <span className={`font-extrabold text-4xl sm:text-5xl tracking-tight ${
                    result.isFailed ? 'text-destructive' : 'text-primary'
                  }`}>
                    {schoolType === 'lise' ? `${result.remainingUnexcused} Gün` : `${result.remainingTotal} Saat`}
                  </span>
                  <span className={`text-xs font-semibold mt-1.5 px-2.5 py-1 rounded-md border ${
                    result.isFailed 
                      ? 'bg-destructive/10 text-destructive border-destructive/20' 
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
                  }`}>
                    {result.isFailed ? 'DEVAMSIZLIKTAN KALDI' : 'DEVAM HAKKI VAR'}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="p-2.5 rounded-lg bg-background border border-border/60 text-xs">
                    {result.warningMessage}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/not-ortalamasi-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Not ortalaması hesaplayıcısına gidin &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Devamsızlık gün veya saatlerinizi girerek kalan haklarınızı kontrol edin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">MEB ve Üniversite Devamsızlık Sınırları</h2>
        <p className="mb-4 text-muted-foreground">
          MEB Ortaöğretim Kurumları Yönetmeliği gereğince liselerde özürsüz devamsızlık hakkı <strong>10 gün</strong>, özürlü ve özürsüz toplam devamsızlık hakkı ise <strong>30 gündür</strong>. Üniversitelerde ise teorik derslerin en az %70&apos;ine, uygulamalı derslerin en az %80&apos;ine devam zorunludur.
        </p>
      </div>
    </div>
  );
}
