'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatNumber, sanitizeNumericInput } from '@/lib/utils';

interface SchoolSubject {
  id: string;
  name: string;
  hours: number; // Haftalık ders saati
  score: string; // Dönem sonu ders notu
}

export default function TakdirTesekkurHesaplama() {
  const [gradeLevel, setGradeLevel] = useState<'ortaokul' | 'lise'>('lise');
  const [unexcusedAbsenceStr, setUnexcusedAbsenceStr] = useState<string>('3'); // Özürsüz devamsızlık (Liselerde 5 gün kuralı)

  const [subjects, setSubjects] = useState<SchoolSubject[]>([
    { id: '1', name: 'Türk Dili ve Edebiyatı', hours: 5, score: '88' },
    { id: '2', name: 'Matematik', hours: 6, score: '84' },
    { id: '3', name: 'Fizik', hours: 4, score: '78' },
    { id: '4', name: 'Kimya', hours: 4, score: '82' },
    { id: '5', name: 'Biyoloji', hours: 4, score: '90' },
    { id: '6', name: 'Tarih', hours: 2, score: '92' },
    { id: '7', name: 'İngilizce', hours: 4, score: '95' },
    { id: '8', name: 'Beden Eğitimi', hours: 2, score: '100' },
  ]);

  const [result, setResult] = useState<{
    weightedAverage: number;
    certificate: 'takdir' | 'tesekkur' | 'none';
    certificateTitle: string;
    hasFailedCourse: boolean;
    failedAbsenceRule: boolean;
  } | null>(null);

  const updateSubject = (id: string, field: keyof SchoolSubject, val: string | number) => {
    setSubjects(subjects.map((s) => (s.id === id ? { ...s, [field]: val } : s)));
  };

  const addSubject = () => {
    const newId = (subjects.length + 1).toString();
    setSubjects([...subjects, { id: newId, name: `Ders ${newId}`, hours: 2, score: '80' }]);
  };

  const removeSubject = (id: string) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter((s) => s.id !== id));
    }
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    let totalHours = 0;
    let weightedSum = 0;
    let hasFailedCourse = false;

    subjects.forEach((s) => {
      const h = Number(s.hours) || 0;
      const sc = Number(s.score) || 0;
      totalHours += h;
      weightedSum += h * sc;
      if (sc < 50) {
        hasFailedCourse = true; // Zayıfı olan öğrenci belge alamaz
      }
    });

    const weightedAverage = totalHours > 0 ? weightedSum / totalHours : 0;
    const unexcused = Number(unexcusedAbsenceStr) || 0;
    // MEB kuralı: Liselerde özürsüz devamsızlığı 5 günü geçenler takdir/teşekkür alamaz
    const failedAbsenceRule = gradeLevel === 'lise' && unexcused >= 5.5;

    let certificate: 'takdir' | 'tesekkur' | 'none' = 'none';
    let certificateTitle = 'Belge Alınamadı';

    if (!hasFailedCourse && !failedAbsenceRule) {
      if (weightedAverage >= 85.0) {
        certificate = 'takdir';
        certificateTitle = '🏆 TAKDİR BELGESİ';
      } else if (weightedAverage >= 70.0) {
        certificate = 'tesekkur';
        certificateTitle = '🎖️ TEŞEKKÜR BELGESİ';
      }
    } else if (hasFailedCourse) {
      certificateTitle = 'Başarısız (Zayıf) Ders Bulunduğu İçin Belge Verilmez';
    } else if (failedAbsenceRule) {
      certificateTitle = 'Özürsüz Devamsızlık 5 Günü Aştığı İçin Belge Verilmez';
    }

    setResult({
      weightedAverage,
      certificate,
      certificateTitle,
      hasFailedCourse,
      failedAbsenceRule,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <form onSubmit={handleCalculate} noValidate className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setGradeLevel('lise')}
                className={`py-1.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  gradeLevel === 'lise' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                }`}
              >
                Lise
              </button>
              <button
                type="button"
                onClick={() => setGradeLevel('ortaokul')}
                className={`py-1.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                  gradeLevel === 'ortaokul' ? 'bg-primary text-primary-foreground border-primary' : 'bg-background border-border'
                }`}
              >
                Ortaokul
              </button>
            </div>

            <button
              type="button"
              onClick={addSubject}
              className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors self-start"
            >
              + Ders Ekle
            </button>
          </div>

          <div>
            <label htmlFor="absence" className="block text-xs font-medium mb-1 text-foreground">
              Dönemlik Özürsüz Devamsızlık (Gün)
            </label>
            <input
              type="text"
              inputMode="decimal"
              id="absence"
              placeholder="Örn: 3"
              className="w-full sm:w-48 rounded-md border border-border bg-background px-3 py-1.5 text-foreground text-xs font-mono"
              value={unexcusedAbsenceStr}
              onChange={(e) => setUnexcusedAbsenceStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
            />
            {gradeLevel === 'lise' && (
              <p className="text-[11px] text-muted-foreground mt-0.5">Liselerde 5 günü aşanlar belge alamaz.</p>
            )}
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {subjects.map((s) => (
              <div key={s.id} className="grid grid-cols-12 gap-2 items-center p-2 bg-muted/30 rounded-lg border border-border/50">
                <div className="col-span-6">
                  <input
                    type="text"
                    placeholder="Ders Adı"
                    className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-foreground text-xs font-medium"
                    value={s.name}
                    onChange={(e) => updateSubject(s.id, 'name', e.target.value)}
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    min="1"
                    max="20"
                    placeholder="Haftalık Saat"
                    className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-foreground text-xs font-mono text-center"
                    value={s.hours}
                    onChange={(e) => updateSubject(s.id, 'hours', Number(e.target.value))}
                  />
                </div>
                <div className="col-span-2">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Not"
                    className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-foreground text-xs font-mono text-center"
                    value={s.score}
                    onChange={(e) => updateSubject(s.id, 'score', sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                  />
                </div>
                <div className="col-span-1 text-center">
                  <button
                    type="button"
                    onClick={() => removeSubject(s.id)}
                    className="text-muted-foreground hover:text-destructive text-sm font-bold"
                  >
                    &times;
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Takdir / Teşekkür Durumunu Hesapla
          </button>
        </form>

        {result && (
          <div className="mt-8 p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
              Dönem Sonu Belge Durumu
            </h3>

            <div className="flex flex-col items-center justify-center mb-4 text-center">
              <span className="text-xs text-muted-foreground mb-0.5">Ağırlıklı Not Ortalaması</span>
              <span className="font-extrabold text-4xl sm:text-5xl text-primary tracking-tight">
                {formatNumber(result.weightedAverage, 2)}
              </span>
              <span className={`text-xs font-semibold mt-2 px-3 py-1.5 rounded-md border ${
                result.certificate === 'takdir'
                  ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30'
                  : result.certificate === 'tesekkur'
                  ? 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30'
                  : 'bg-destructive/10 text-destructive border-destructive/20'
              }`}>
                {result.certificateTitle}
              </span>
            </div>

            <div className="mt-4 pt-3 border-t border-border/60 text-center">
              <Link
                href="/arac/not-ortalamasi-hesaplama"
                className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
              >
                Genel not ortalaması hesaplayıcısına gidin &rarr;
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">MEB Takdir ve Teşekkür Belgesi Şartları Nelerdir?</h2>
        <p className="mb-4 text-muted-foreground">
          Öğrencinin dönem ağırlıklı not ortalaması <strong>70.00 - 84.99</strong> arasında ise Teşekkür, <strong>85.00 ve üzeri</strong> ise Takdir Belgesi verilir. Hiçbir dersin 50&apos;nin altında olmaması ve liselerde özürsüz devamsızlığın 5 günü geçmemesi şartı aranır.
        </p>
      </div>
    </div>
  );
}
