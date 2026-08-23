'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';
import {
  calculateWorkDuration,
  calculateNoticePay,
  calculateGrossSalaryFromNet,
  NoticeResult,
} from '@/lib/laborCalculations';
import DatePicker from '@/components/ui/DatePicker';

export default function IhbarTazminatiHesaplama() {
  const [startDate, setStartDate] = useState<string>('2023-01-15');
  const [endDate, setEndDate] = useState<string>('2026-08-24');
  const [salaryType, setSalaryType] = useState<'gross' | 'net'>('gross');
  const [salaryStr, setSalaryStr] = useState<string>('38.000');
  const [incomeTaxRate, setIncomeTaxRate] = useState<number>(0.15);

  const [result, setResult] = useState<NoticeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Dinamik brüt ücret hesaplaması
  const inputSalaryNum = parseTurkishNumber(salaryStr);
  const derivedGrossSalary =
    salaryType === 'net' && !isNaN(inputSalaryNum) && inputSalaryNum > 0
      ? calculateGrossSalaryFromNet(inputSalaryNum).grossSalary
      : inputSalaryNum;

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!startDate || !endDate) {
      setError('Lütfen işe giriş ve çıkış tarihlerini girin.');
      return;
    }

    const duration = calculateWorkDuration(startDate, endDate);
    if (!duration) {
      setError('İşten çıkış tarihi işe giriş tarihinden önce olamaz.');
      return;
    }

    const salary = parseTurkishNumber(salaryStr);
    if (isNaN(salary) || salary <= 0) {
      setError(`Lütfen geçerli bir ${salaryType === 'gross' ? 'brüt' : 'net'} maaş girin.`);
      return;
    }

    const effectiveGross =
      salaryType === 'net' ? calculateGrossSalaryFromNet(salary).grossSalary : salary;

    const calcResult = calculateNoticePay(effectiveGross, duration, incomeTaxRate);
    setResult(calcResult);
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-2xs mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            {/* Türkçe DatePicker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DatePicker
                id="noticeStartDate"
                label="İşe Giriş Tarihi"
                required
                value={startDate}
                onChange={setStartDate}
                placeholder="15.01.2023"
              />

              <DatePicker
                id="noticeEndDate"
                label="İşten Çıkış / Fesih Tarihi"
                required
                value={endDate}
                onChange={setEndDate}
                placeholder="24.08.2026"
              />
            </div>

            {/* Maaş Türü Seçimi */}
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-foreground">
                Maaş Türü
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSalaryType('gross')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    salaryType === 'gross'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border hover:bg-muted/40'
                  }`}
                >
                  Brüt Maaş
                </button>
                <button
                  type="button"
                  onClick={() => setSalaryType('net')}
                  className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                    salaryType === 'net'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border hover:bg-muted/40'
                  }`}
                >
                  Net Maaş (Ele Geçen)
                </button>
              </div>
            </div>

            {/* Maaş Input */}
            <div>
              <label htmlFor="noticeSalary" className="block text-xs font-semibold mb-1.5 text-foreground">
                {salaryType === 'gross' ? 'Son Aylık Brüt Maaş (TL)' : 'Son Aylık Net Maaş (Ele Geçen TL)'}{' '}
                <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="noticeSalary"
                  placeholder={salaryType === 'gross' ? 'Örn: 38.000' : 'Örn: 27.000'}
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                  value={salaryStr}
                  onChange={(e) => setSalaryStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">
                  TL
                </div>
              </div>

              {salaryType === 'net' && !isNaN(derivedGrossSalary) && derivedGrossSalary > 0 ? (
                <div className="mt-1.5 p-2 rounded-lg bg-primary/5 border border-primary/20 text-[11px] text-muted-foreground flex items-center justify-between">
                  <span>Hesaplanan Yasal Brüt Ücret:</span>
                  <span className="font-bold text-foreground font-mono">
                    {formatCurrency(derivedGrossSalary)}
                  </span>
                </div>
              ) : null}
            </div>

            {/* Gelir Vergisi Dilimi */}
            <div>
              <label htmlFor="taxRateSelect" className="block text-xs font-semibold mb-1.5 text-foreground">
                Kümülatif Gelir Vergisi Dilimi
              </label>
              <select
                id="taxRateSelect"
                value={incomeTaxRate}
                onChange={(e) => setIncomeTaxRate(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm cursor-pointer"
              >
                <option value={0.15}>%15 (Yılın ilk ayları / 1. Dilim)</option>
                <option value={0.20}>%20 (2. Dilim)</option>
                <option value={0.27}>%27 (3. Dilim)</option>
                <option value={0.35}>%35 (4. Dilim)</option>
              </select>
              <p className="text-[11px] text-muted-foreground mt-1">İhbar tazminatından gelir vergisi ve damga vergisi kesilir.</p>
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
              İhbar Tazminatını Hesapla
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
                      {result.duration.formattedText}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center my-3 text-center">
                    <span className="text-xs text-muted-foreground mb-0.5">Tahmini Net İhbar Tazminatı</span>
                    <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight font-mono">
                      {formatCurrency(result.netNotice)}
                    </span>
                    <span className="text-xs font-semibold text-foreground mt-1 bg-background px-2.5 py-0.5 rounded border border-border/60">
                      {result.noticeWeeks} Hafta ({result.noticeDays} Günlük Ücret)
                    </span>
                  </div>

                  <div className="border-t border-border/60 pt-3 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">İhbar Süresi Kademesi:</span>
                      <span className="font-medium text-foreground text-right">{result.noticePeriodLabel}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Brüt İhbar Tazminatı:</span>
                      <span className="font-semibold text-foreground font-mono">{formatCurrency(result.grossNotice)}</span>
                    </div>
                    <div className="flex justify-between items-center text-destructive">
                      <span>Gelir Vergisi (%{result.incomeTaxRate * 100}):</span>
                      <span className="font-mono font-semibold">-{formatCurrency(result.incomeTax)}</span>
                    </div>
                    <div className="flex justify-between items-center text-destructive">
                      <span>Damga Vergisi (%0,759):</span>
                      <span className="font-mono font-semibold">-{formatCurrency(result.stampTax)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <Link
                    href="/arac/kidem-tazminati-hesaplama"
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1 text-[11px]"
                  >
                    Kıdem tazminatını da hesapla &rarr;
                  </Link>
                  <Link
                    href="/arac/ihbar-suresi-hesaplama"
                    className="text-muted-foreground hover:text-foreground text-[11px]"
                  >
                    Yalnızca Süreyi Hesapla
                  </Link>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[240px] flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-6 text-center text-muted-foreground bg-muted/5">
                <svg className="w-8 h-8 text-muted-foreground/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-xs font-medium text-foreground">Tarih ve maaş bilgilerinizi girerek yasal ihbar tutarını öğrenin.</p>
                <p className="text-[11px] text-muted-foreground mt-1">Brüt veya Net maaş seçimi yapılabilir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Yasal Tablo ve Açıklama */}
      <div className="space-y-6">
        <div className="p-5 rounded-xl border border-border/60 bg-card text-xs text-muted-foreground leading-relaxed space-y-3">
          <h3 className="font-bold text-sm text-foreground">İhbar Süreleri ve Yasal Kademeler</h3>
          <p>
            4857 Sayılı İş Kanunu m. 17 gereğince iş sözleşmelerinin feshinden önce diğer tarafa bildirimde bulunulması gerekir. Bildirim süresine uymayan taraf, karşı tarafa ihbar tazminatı ödemekle yükümlüdür.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1">
            <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
              <span className="font-bold text-foreground block">6 aydan az:</span>
              <span>2 Hafta (14 gün)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
              <span className="font-bold text-foreground block">6 ay - 1,5 yıl:</span>
              <span>4 Hafta (28 gün)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
              <span className="font-bold text-foreground block">1,5 yıl - 3 yıl:</span>
              <span>6 Hafta (42 gün)</span>
            </div>
            <div className="p-2.5 rounded-lg bg-muted/30 border border-border/50">
              <span className="font-bold text-foreground block">3 yıldan fazla:</span>
              <span>8 Hafta (56 gün)</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-muted/20 border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <p>
            ⚖️ <strong>Yasal Bilgilendirme:</strong> İstifa eden çalışan kural olarak ihbar tazminatı talep edemez; işverenin bildirim süresi tanımadan işten çıkarması durumunda hak doğar.
          </p>
          <span className="shrink-0 font-medium text-foreground/80">
            Kaynak: 4857 SK m. 17
          </span>
        </div>
      </div>
    </div>
  );
}
