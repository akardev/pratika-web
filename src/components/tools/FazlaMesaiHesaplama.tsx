'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';
import { calculateGrossSalaryFromNet, calculateOvertimePay, OvertimeResult } from '@/lib/laborCalculations';
import SalaryTypeSelector from './SalaryTypeSelector';

export default function FazlaMesaiHesaplama() {
  const [salaryType, setSalaryType] = useState<'gross' | 'net'>('gross');
  const [salaryStr, setSalaryStr] = useState<string>('35.000');
  const [hoursStr, setHoursStr] = useState<string>('12');
  const [overtimeType, setOvertimeType] = useState<'weekday' | 'holiday'>('weekday');
  const [incomeTaxRate, setIncomeTaxRate] = useState<number>(0.15);

  const [result, setResult] = useState<OvertimeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const salary = parseTurkishNumber(salaryStr);
    const hours = parseTurkishNumber(hoursStr);

    if (isNaN(salary) || salary <= 0) {
      setError('Maaş tutarı 0\'dan büyük olmalıdır.');
      return;
    }

    if (isNaN(hours) || hours <= 0) {
      setError('Mesai saati 0\'dan büyük olmalıdır.');
      return;
    }

    const effectiveGrossSalary = salaryType === 'net' ? calculateGrossSalaryFromNet(salary).grossSalary : salary;
    const calcResult = calculateOvertimePay(effectiveGrossSalary, hours, overtimeType, incomeTaxRate);
    setResult(calcResult);
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-2xs mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <SalaryTypeSelector value={salaryType} onChange={setSalaryType} />
            <div>
              <label htmlFor="ovSal" className="block text-xs font-semibold mb-1.5 text-foreground">
                {salaryType === 'gross' ? 'Aylık Brüt Maaş Tutarı (TL)' : 'Aylık Net Maaş Tutarı (Ele Geçen TL)'} <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="ovSal"
                  placeholder="Örn: 35.000"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                  value={salaryStr}
                  onChange={(e) => setSalaryStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">
                  TL
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="ovHours" className="block text-xs font-semibold mb-1.5 text-foreground">
                Yapılan Fazla Mesai Süresi (Saat) <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="ovHours"
                  placeholder="Örn: 12"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 pr-14 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                  value={hoursStr}
                  onChange={(e) => setHoursStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">
                  Saat
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-foreground">
                Mesai Türü (Yasal Katsayı)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOvertimeType('weekday')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    overtimeType === 'weekday'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border hover:bg-muted/40'
                  }`}
                >
                  Haftalık Mesai (%50 Zamlı)
                </button>
                <button
                  type="button"
                  onClick={() => setOvertimeType('holiday')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    overtimeType === 'holiday'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border hover:bg-muted/40'
                  }`}
                >
                  Resmi / Genel Tatil (%100 Zamlı)
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="ovTax" className="block text-xs font-semibold mb-1.5 text-foreground">
                Gelir Vergisi Dilimi
              </label>
              <select
                id="ovTax"
                value={incomeTaxRate}
                onChange={(e) => setIncomeTaxRate(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-xs cursor-pointer"
              >
                <option value={0.15}>%15 (1. Dilim)</option>
                <option value={0.20}>%20 (2. Dilim)</option>
                <option value={0.27}>%27 (3. Dilim)</option>
                <option value={0.35}>%35 (4. Dilim)</option>
              </select>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-xs rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-11 mt-2 bg-primary text-primary-foreground text-sm font-bold rounded-xl shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
            >
              Fazla Mesaiyi Hesapla
            </button>
          </form>

          {/* Sonuç Alanı */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-between p-5 sm:p-6 bg-muted/20 rounded-2xl border border-border/80 shadow-2xs animate-in fade-in zoom-in-95 duration-150">
                <div>
                  <div className="flex items-center justify-between mb-3 border-b border-border/60 pb-2.5">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                      Hesaplama Sonucu
                    </span>
                    <span className="text-xs font-medium text-foreground bg-background px-2.5 py-0.5 rounded border border-border/60">
                      {result.overtimeHours} Saat Mesai
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center my-3 text-center">
                    <span className="text-xs text-muted-foreground mb-0.5">Net Mesai Hak Edişi</span>
                    <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight font-mono">
                      {formatCurrency(result.netOvertimePay)}
                    </span>
                    <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-0.5 rounded border border-border/60">
                      Brüt Mesai: {formatCurrency(result.grossOvertimePay)}
                    </span>
                  </div>

                  <div className="border-t border-border/60 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Normal Saat Ücreti (Maaş / 225):</span>
                      <span className="font-mono font-semibold text-foreground">{formatCurrency(result.hourlyWage)}</span>
                    </div>
                    <div className="flex justify-between items-center text-muted-foreground">
                      <span>Zamlı Mesai Saat Ücreti:</span>
                      <span className="font-mono font-semibold text-foreground">{formatCurrency(result.overtimeHourlyWage)}</span>
                    </div>
                    <div className="flex justify-between items-center text-destructive">
                      <span>SGK ve İşsizlik Kesintisi:</span>
                      <span className="font-mono font-semibold">-{formatCurrency(result.sgkEmployee + result.unemploymentEmployee)}</span>
                    </div>
                    <div className="flex justify-between items-center text-destructive">
                      <span>Gelir ve Damga Vergisi:</span>
                      <span className="font-mono font-semibold">-{formatCurrency(result.incomeTax + result.stampTax)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 text-center">
                  <Link
                    href="/arac/saat-ucreti-hesaplama"
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1 text-xs"
                  >
                    Yasal çıplak saatlik ücret detayınızı görün &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[240px] flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-6 text-center text-muted-foreground bg-muted/5">
                <svg className="w-8 h-8 text-muted-foreground/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs font-medium text-foreground">Maaş ve yapılan mesai saatini girin.</p>
                <p className="text-[11px] text-muted-foreground mt-1">4857 Sayılı İş Kanunu Madde 41 esas alınır.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="p-5 rounded-xl border border-border/60 bg-card text-xs text-muted-foreground leading-relaxed space-y-3">
          <h3 className="font-bold text-sm text-foreground">Fazla Mesai Yasal Esasları</h3>
          <p>
            4857 Sayılı İş Kanunu m. 41 uyarınca haftalık 45 saati aşan çalışmalar fazla çalışma sayılır. Her bir saat fazla çalışma için verilecek ücret, normal çalışma ücretinin saat başına düşen miktarının <strong>yüzde elli (%50)</strong> yükseltilmesi suretiyle ödenir.
          </p>
          <p>
            Yıllık fazla çalışma süresi toplamı yasal olarak <strong>270 saatten</strong> fazla olamaz.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-muted/20 border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <p>
            ⚖️ <strong>Yasal Bilgilendirme:</strong> Ulusal bayram ve genel tatil günlerinde çalışan işçilere, kanun uyarınca her gün için bir günlük ek yevmiye ödenir.
          </p>
          <span className="shrink-0 font-medium text-foreground/80">
            Kaynak: 4857 SK m. 41 &amp; m. 47
          </span>
        </div>
      </div>
    </div>
  );
}
