'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';
import {
  calculateWorkDuration,
  calculateSeverancePay,
  calculateNoticePay,
  calculateGrossSalaryFromNet,
  SeveranceResult,
  NoticeResult,
} from '@/lib/laborCalculations';
import DatePicker from '@/components/ui/DatePicker';

export default function KidemIhbarHesaplama() {
  const [startDate, setStartDate] = useState<string>('2021-06-01');
  const [endDate, setEndDate] = useState<string>('2026-08-24');
  const [salaryType, setSalaryType] = useState<'gross' | 'net'>('gross');
  const [salaryStr, setSalaryStr] = useState<string>('42.000');
  const [benefitsStr, setBenefitsStr] = useState<string>('2.500');
  const [incomeTaxRate, setIncomeTaxRate] = useState<number>(0.15);

  const [severanceResult, setSeveranceResult] = useState<SeveranceResult | null>(null);
  const [noticeResult, setNoticeResult] = useState<NoticeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Dinamik brüt hesaplaması
  const inputSalaryNum = parseTurkishNumber(salaryStr);
  const derivedGrossSalary =
    salaryType === 'net' && !isNaN(inputSalaryNum) && inputSalaryNum > 0
      ? calculateGrossSalaryFromNet(inputSalaryNum).grossSalary
      : inputSalaryNum;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSeveranceResult(null);
    setNoticeResult(null);

    if (!startDate || !endDate) {
      setError('Lütfen işe giriş ve işten çıkış tarihlerini girin.');
      return;
    }

    const duration = calculateWorkDuration(startDate, endDate);
    if (!duration) {
      setError('İşten çıkış tarihi işe giriş tarihinden önce olamaz.');
      return;
    }

    const salary = parseTurkishNumber(salaryStr);
    const benefits = benefitsStr.trim() ? parseTurkishNumber(benefitsStr) : 0;

    if (isNaN(salary) || salary <= 0) {
      setError(`Lütfen geçerli bir ${salaryType === 'gross' ? 'brüt' : 'net'} maaş tutarı girin.`);
      return;
    }

    const effectiveGross =
      salaryType === 'net' ? calculateGrossSalaryFromNet(salary).grossSalary : salary;

    const sev = calculateSeverancePay(effectiveGross, benefits, duration);
    const not = calculateNoticePay(effectiveGross, duration, incomeTaxRate);

    setSeveranceResult(sev);
    setNoticeResult(not);
  };

  const totalGross = (severanceResult?.grossSeverance || 0) + (noticeResult?.grossNotice || 0);
  const totalNet = (severanceResult?.netSeverance || 0) + (noticeResult?.netNotice || 0);
  const totalDeductions = totalGross - totalNet;

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-2xs mb-10">
        <form onSubmit={handleCalculate} noValidate className="space-y-5">
          {/* Üst Başlık & Maaş Türü Seçici */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border/60">
            <div>
              <h2 className="text-sm font-bold text-foreground">Hesaplama Bilgileri</h2>
              <p className="text-xs text-muted-foreground">Tarih ve ücret bilgilerinizi eksiksiz girin.</p>
            </div>

            {/* Brüt / Net Segmented Control */}
            <div className="inline-flex items-center p-1 rounded-xl bg-muted/60 border border-border/80 text-xs shrink-0 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setSalaryType('gross')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  salaryType === 'gross'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Brüt Maaş
              </button>
              <button
                type="button"
                onClick={() => setSalaryType('net')}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                  salaryType === 'net'
                    ? 'bg-card text-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Net Maaş (Ele Geçen)
              </button>
            </div>
          </div>

          {/* 4 Kolonlu Kusursuz Hizalı Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            <DatePicker
              id="combStart"
              label="İşe Giriş Tarihi"
              required
              value={startDate}
              onChange={setStartDate}
              placeholder="01.06.2021"
            />

            <DatePicker
              id="combEnd"
              label="İşten Çıkış / Fesih"
              required
              value={endDate}
              onChange={setEndDate}
              placeholder="24.08.2026"
            />

            <div>
              <label htmlFor="combSal" className="block text-xs font-semibold mb-1.5 text-foreground">
                {salaryType === 'gross' ? 'Aylık Brüt Maaş' : 'Aylık Net Maaş'}{' '}
                <span className="text-destructive">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="decimal"
                  id="combSal"
                  placeholder={salaryType === 'gross' ? 'Örn: 42.000' : 'Örn: 30.000'}
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono transition-colors"
                  value={salaryStr}
                  onChange={(e) => setSalaryStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3.5 pointer-events-none select-none text-muted-foreground text-xs font-medium">
                  TL
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="combBen" className="block text-xs font-semibold mb-1.5 text-foreground">
                Aylık Yan Haklar Toplamı
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="decimal"
                  id="combBen"
                  placeholder="Örn: 2.500"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono transition-colors"
                  value={benefitsStr}
                  onChange={(e) => setBenefitsStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3.5 pointer-events-none select-none text-muted-foreground text-xs font-medium">
                  TL
                </div>
              </div>
            </div>
          </div>

          {/* Net Maaş Dönüşüm Rozeti */}
          {salaryType === 'net' && !isNaN(derivedGrossSalary) && derivedGrossSalary > 0 && (
            <div className="p-2.5 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground flex items-center justify-between">
              <span>Girilen net maaşa göre hesaplanan yasal brüt taban:</span>
              <span className="font-bold text-foreground font-mono">
                {formatCurrency(derivedGrossSalary)}
              </span>
            </div>
          )}

          {/* İkinci Satır: Vergi Dilimi & Hesapla Butonu */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-end pt-2 border-t border-border/50">
            <div className="sm:col-span-7 lg:col-span-8">
              <label htmlFor="combTax" className="block text-xs font-semibold mb-1.5 text-foreground">
                İhbar Gelir Vergisi Dilimi
              </label>
              <select
                id="combTax"
                value={incomeTaxRate}
                onChange={(e) => setIncomeTaxRate(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm cursor-pointer"
              >
                <option value={0.15}>%15 (Yılın ilk ayları / 1. Dilim)</option>
                <option value={0.20}>%20 (2. Dilim)</option>
                <option value={0.27}>%27 (3. Dilim)</option>
                <option value={0.35}>%35 (4. Dilim)</option>
              </select>
            </div>

            <div className="sm:col-span-5 lg:col-span-4">
              <button
                type="submit"
                className="w-full h-10 sm:h-10.5 bg-primary text-primary-foreground text-xs sm:text-sm font-bold rounded-xl shadow-xs hover:bg-primary/90 transition-all cursor-pointer flex items-center justify-center"
              >
                Kıdem ve İhbarı Birlikte Hesapla
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-destructive/10 text-destructive text-xs rounded-lg border border-destructive/20">
              {error}
            </div>
          )}
        </form>

        {/* Sonuç Kartları */}
        {severanceResult && noticeResult && (
          <div className="mt-8 pt-6 border-t border-border/70 space-y-6 animate-in fade-in zoom-in-95 duration-150">
            {/* Toplam Özet Kartı */}
            <div className="p-5 sm:p-6 rounded-2xl bg-primary/5 border border-primary/20 text-center">
              <span className="text-xs font-semibold text-primary uppercase tracking-wider block mb-1">
                Genel Toplam Hak Ediş ({severanceResult.duration.formattedText})
              </span>
              <div className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight font-mono my-1">
                {formatCurrency(totalNet)}
              </div>
              <p className="text-xs text-muted-foreground">
                Toplam Brüt: <strong className="font-mono text-foreground">{formatCurrency(totalGross)}</strong> | Toplam Kesinti: <strong className="font-mono text-destructive">-{formatCurrency(totalDeductions)}</strong>
              </p>
            </div>

            {/* İkili Kolon Dökümü */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Kıdem Bölümü */}
              <div className="p-5 rounded-xl border border-border/80 bg-card shadow-2xs space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <h3 className="font-bold text-sm text-foreground">1. Kıdem Tazminatı</h3>
                  <span className="font-mono font-bold text-sm text-primary">{formatCurrency(severanceResult.netSeverance)}</span>
                </div>
                {!severanceResult.isEligible ? (
                  <p className="text-muted-foreground py-2">1 yılı doldurmadığı için kıdem hakkı oluşmamıştır.</p>
                ) : (
                  <>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Giydirilmiş Brüt:</span>
                      <span className="font-mono font-semibold text-foreground">{formatCurrency(severanceResult.grossBaseWage)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Toplam Brüt Kıdem:</span>
                      <span className="font-mono font-semibold text-foreground">{formatCurrency(severanceResult.grossSeverance)}</span>
                    </div>
                    <div className="flex justify-between text-destructive">
                      <span>Damga Vergisi (%0,759):</span>
                      <span className="font-mono font-semibold">-{formatCurrency(severanceResult.stampTax)}</span>
                    </div>
                  </>
                )}
              </div>

              {/* İhbar Bölümü */}
              <div className="p-5 rounded-xl border border-border/80 bg-card shadow-2xs space-y-2.5 text-xs">
                <div className="flex items-center justify-between border-b border-border/60 pb-2">
                  <h3 className="font-bold text-sm text-foreground">2. İhbar Tazminatı</h3>
                  <span className="font-mono font-bold text-sm text-primary">{formatCurrency(noticeResult.netNotice)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>İhbar Süresi:</span>
                  <span className="font-semibold text-foreground">{noticeResult.noticeWeeks} Hafta ({noticeResult.noticeDays} Gün)</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Toplam Brüt İhbar:</span>
                  <span className="font-mono font-semibold text-foreground">{formatCurrency(noticeResult.grossNotice)}</span>
                </div>
                <div className="flex justify-between text-destructive">
                  <span>Gelir + Damga Vergisi:</span>
                  <span className="font-mono font-semibold">-{formatCurrency(noticeResult.totalDeductions)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 rounded-xl bg-muted/20 border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-muted-foreground">
        <p>
          ⚖️ <strong>Yasal Bilgilendirme:</strong> Kıdem ve ihbar tazminatının şartları farklıdır. İstifa halinde kıdem bazı özel durumlarda alınabilirken ihbar tazminatı alınamaz.
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/arac/kidem-tazminati-hesaplama" className="text-primary hover:underline font-semibold">
            Yalnızca Kıdem
          </Link>
          <span className="text-border">•</span>
          <Link href="/arac/ihbar-tazminati-hesaplama" className="text-primary hover:underline font-semibold">
            Yalnızca İhbar
          </Link>
        </div>
      </div>
    </div>
  );
}
