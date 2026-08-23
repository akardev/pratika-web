'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatCurrency, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';
import {
  calculateWorkDuration,
  calculateSeverancePay,
  calculateGrossSalaryFromNet,
  SeveranceResult,
} from '@/lib/laborCalculations';
import { LABOR_CONSTANTS } from '@/data/laborConstants';
import DatePicker from '@/components/ui/DatePicker';

export default function KidemTazminatiHesaplama() {
  const [startDate, setStartDate] = useState<string>('2020-03-01');
  const [endDate, setEndDate] = useState<string>('2026-08-24');
  const [salaryType, setSalaryType] = useState<'gross' | 'net'>('gross');
  const [salaryStr, setSalaryStr] = useState<string>('45.000');
  const [benefitsStr, setBenefitsStr] = useState<string>('3.500');

  const [result, setResult] = useState<SeveranceResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Dinamik olarak hesaplanan brüt ücret bilgisi (Net seçildiğinde)
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

    if (isNaN(benefits) || benefits < 0) {
      setError('Lütfen geçerli bir yan haklar tutarı girin veya boş bırakın.');
      return;
    }

    // Eğer net girildiyse yasal hesaplama motoruyla kesin brüt bulunur
    const effectiveGross =
      salaryType === 'net' ? calculateGrossSalaryFromNet(salary).grossSalary : salary;

    const calcResult = calculateSeverancePay(effectiveGross, benefits, duration);
    setResult(calcResult);
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-2xs mb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            {/* Tarih Seçimleri (Türkçe DatePicker) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DatePicker
                id="startDate"
                label="İşe Giriş Tarihi"
                required
                value={startDate}
                onChange={setStartDate}
                placeholder="01.03.2020"
              />

              <DatePicker
                id="endDate"
                label="İşten Çıkış / Fesih Tarihi"
                required
                value={endDate}
                onChange={setEndDate}
                placeholder="24.08.2026"
              />
            </div>

            {/* Maaş Türü Seçimi (Brüt / Net) */}
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
              <label htmlFor="grossSalary" className="block text-xs font-semibold mb-1.5 text-foreground">
                {salaryType === 'gross' ? 'Son Aylık Brüt Maaş (TL)' : 'Son Aylık Net Maaş (Ele Geçen TL)'}{' '}
                <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="grossSalary"
                  placeholder={salaryType === 'gross' ? 'Örn: 45.000' : 'Örn: 30.000'}
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
              ) : (
                <p className="text-[11px] text-muted-foreground mt-1">
                  {salaryType === 'gross'
                    ? 'Bordronuzdaki çıplak brüt ücret tutarıdır.'
                    : 'Banka hesabınıza yatan net maaş tutarıdır. Yasal vergi/SGK istisnalarıyla otomatik brüte çevrilir.'}
                </p>
              )}
            </div>

            {/* Düzenli Yan Haklar */}
            <div>
              <label htmlFor="benefits" className="block text-xs font-semibold mb-1.5 text-foreground">
                Aylık Düzenli Yan Haklar Toplamı (Brüt TL)
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="decimal"
                  id="benefits"
                  placeholder="Örn: 3.500"
                  className="w-full rounded-lg border border-border bg-background px-3.5 py-2.5 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm font-mono"
                  value={benefitsStr}
                  onChange={(e) => setBenefitsStr(sanitizeNumericInput(e.target.value, { allowDecimal: true }))}
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground text-xs font-medium">
                  TL
                </div>
              </div>
              <p className="text-[11px] text-muted-foreground mt-1">
                Yol, yemek, ikramiye ve düzenli primlerin aylık brüt ortalamasıdır.
              </p>
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
              Kıdem Tazminatını Hesapla
            </button>
          </form>

          {/* Sonuç Kartı */}
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

                  {!result.isEligible ? (
                    <div className="py-4 text-center">
                      <div className="text-sm font-bold text-amber-600 dark:text-amber-400 mb-1">
                        Kıdem Tazminatı Hakkı Oluşmadı
                      </div>
                      <p className="text-xs text-muted-foreground">
                        1475 Sayılı Kanun m. 14 gereğince kıdem tazminatına hak kazanabilmek için aynı işverene bağlı en az 1 tam yıl (365 gün) çalışmış olmak şarttır.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col items-center justify-center my-3 text-center">
                        <span className="text-xs text-muted-foreground mb-0.5">Tahmini Net Kıdem Tazminatı</span>
                        <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight font-mono">
                          {formatCurrency(result.netSeverance)}
                        </span>
                        {result.isCeilingApplied && (
                          <span className="text-[11px] text-amber-700 font-medium mt-1 bg-amber-50 dark:bg-amber-950/30 px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                            Maaşınız yasal tavanı ({formatCurrency(LABOR_CONSTANTS.SEVERANCE_CEILING)}) aştığı için tavan tutar uygulandı.
                          </span>
                        )}
                      </div>

                      <div className="border-t border-border/60 pt-3 space-y-2 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Giydirilmiş Brüt Maaş:</span>
                          <span className="font-semibold text-foreground font-mono">{formatCurrency(result.grossBaseWage)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Hesaba Esas Tutar:</span>
                          <span className="font-semibold text-foreground font-mono">{formatCurrency(result.appliedBaseWage)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Toplam Brüt Kıdem:</span>
                          <span className="font-semibold text-foreground font-mono">{formatCurrency(result.grossSeverance)}</span>
                        </div>
                        <div className="flex justify-between items-center text-destructive">
                          <span>Damga Vergisi (%0,759):</span>
                          <span className="font-mono font-semibold">-{formatCurrency(result.stampTax)}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <Link
                    href="/arac/ihbar-tazminati-hesaplama"
                    className="text-primary hover:underline font-semibold inline-flex items-center gap-1 text-[11px]"
                  >
                    İhbar tazminatını da hesapla &rarr;
                  </Link>
                  <Link
                    href="/arac/kidem-ihbar-tazminati-hesaplama"
                    className="text-muted-foreground hover:text-foreground text-[11px]"
                  >
                    İkisini Birlikte Gör
                  </Link>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[240px] flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/80 p-6 text-center text-muted-foreground bg-muted/5">
                <svg className="w-8 h-8 text-muted-foreground/60 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className="text-xs font-medium text-foreground">İşe giriş, çıkış ve maaş bilgilerinizi girip hesaplayın.</p>
                <p className="text-[11px] text-muted-foreground mt-1">Brüt veya Net maaşınızı seçerek hesaplayabilirsiniz.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rehber ve Yasal Bilgilendirme Alanı */}
      <div className="space-y-6">
        <div className="p-5 rounded-xl border border-border/60 bg-card text-xs text-muted-foreground leading-relaxed space-y-3">
          <h3 className="font-bold text-sm text-foreground">Kıdem Tazminatı Nasıl Hesaplanır?</h3>
          <p>
            1475 Sayılı İş Kanunu m. 14 hükmü uyarınca, aynı işverene bağlı en az 1 tam yıl çalışan işçiye, çalıştığı her tam yıl için 30 günlük giydirilmiş brüt ücreti tutarında kıdem tazminatı ödenir. 1 yıldan artan artık süreler (ay ve gün) oranlanarak hesaba eklenir.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <span className="font-bold text-foreground block mb-1">Giydirilmiş Brüt Ücret:</span>
              <span>Çıplak brüt maaşa ek olarak yol, yemek, prim, yakacak ve ikramiye gibi düzenli sağlanan tüm para ve para ile ölçülebilir menfaatler dahil edilir.</span>
            </div>
            <div className="p-3 rounded-lg bg-muted/30 border border-border/50">
              <span className="font-bold text-foreground block mb-1">Kıdem Tazminatı Tavanı:</span>
              <span>Kıdem tazminatı tavanı 6 ayda bir Hazine ve Maliye Bakanlığı genelgeleriyle güncellenir. Tavanı aşan maaşlarda tavan tutarı esas alınır.</span>
            </div>
          </div>
        </div>

        {/* Yasal Uyarı ve Kaynak */}
        <div className="p-4 rounded-xl bg-muted/20 border border-border/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-muted-foreground">
          <p>
            ⚖️ <strong>Yasal Bilgilendirme:</strong> Bu hesaplama bilgilendirme amaçlıdır. Fesih türü, haklı fesih durumları ve iş sözleşmesi koşullarına göre hak ediş değişebilir.
          </p>
          <span className="shrink-0 font-medium text-foreground/80">
            Kaynak: 1475 SK m. 14 &amp; ÇSGB
          </span>
        </div>
      </div>
    </div>
  );
}
