'use client';

import { useState } from 'react';
import Link from 'next/link';
import DatePicker from '@/components/ui/DatePicker';
import { formatNumber, parseTurkishNumber, sanitizeNumericInput } from '@/lib/utils';

export default function EmeklilikYasiHesaplama() {
  const [gender, setGender] = useState<'kadin' | 'erkek'>('erkek');
  const [birthDateStr, setBirthDateStr] = useState<string>('1985-06-15');
  const [insuranceStartDateStr, setInsuranceStartDateStr] = useState<string>('2005-09-01');
  const [currentDaysStr, setCurrentDaysStr] = useState<string>('4500');

  const [result, setResult] = useState<{
    retirementAge: number;
    requiredDays: number;
    requiredYearsOfInsurance: number;
    currentDays: number;
    remainingDays: number;
    eytEligible: boolean;
    estimatedRetirementYear: number;
    categoryText: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!birthDateStr || !insuranceStartDateStr) {
      setError('Lütfen doğum tarihi ve ilk sigorta başlangıç tarihini giriniz.');
      return;
    }

    const currentDays = parseTurkishNumber(currentDaysStr) || 0;

    const birthParts = birthDateStr.split('-');
    const insParts = insuranceStartDateStr.split('-');

    if (birthParts.length !== 3 || insParts.length !== 3) {
      setError('Geçerli tarihler giriniz.');
      return;
    }

    const birthYear = parseInt(birthParts[0], 10);
    const insDate = new Date(parseInt(insParts[0], 10), parseInt(insParts[1], 10) - 1, parseInt(insParts[2], 10));
    const eytCutoff = new Date(1999, 8, 8); // 8 Eylül 1999
    const reformCutoff = new Date(2008, 4, 30); // 30 Nisan 2008

    let retirementAge = 60;
    let requiredDays = 7000;
    let requiredYearsOfInsurance = 25;
    let eytEligible = false;
    let categoryText = '';

    if (insDate <= eytCutoff) {
      // EYT Kapsamı (08.09.1999 ve öncesi)
      eytEligible = true;
      requiredDays = gender === 'kadin' ? 5000 : 5000; // 5000-5975 kademeli gün tablosu ortalama
      requiredYearsOfInsurance = gender === 'kadin' ? 20 : 25;
      retirementAge = 0; // EYT ile yaş şartı kaldırıldı
      categoryText = 'EYT Kapsamındasınız (Yaş şartı aranmaz, prim ve sigortalılık süresi yeterlidir).';
    } else if (insDate <= reformCutoff) {
      // 09.09.1999 - 30.04.2008 arası
      eytEligible = false;
      retirementAge = gender === 'kadin' ? 58 : 60;
      requiredDays = 7000;
      requiredYearsOfInsurance = 25;
      categoryText = '4447 Sayılı Kanun Kapsamında (7000 gün prim veya 25 yıl sigorta + 4500 gün kısmi emeklilik).';
    } else {
      // 01.05.2008 sonrası (5510 sayılı reform)
      eytEligible = false;
      retirementAge = gender === 'kadin' ? 58 : 60; // 7200 prim gününün tamamlandığı tarihe göre 65'e kadar kademeli artar
      requiredDays = 7200;
      requiredYearsOfInsurance = 0;
      categoryText = '5510 Sayılı Kanun Kapsamında (7200 prim günü esastır).';
    }

    const remainingDays = Math.max(0, requiredDays - currentDays);
    const estimatedRetirementYear = retirementAge > 0 ? birthYear + retirementAge : parseInt(insParts[0], 10) + requiredYearsOfInsurance;

    setResult({
      retirementAge,
      requiredDays,
      requiredYearsOfInsurance,
      currentDays,
      remainingDays,
      eytEligible,
      estimatedRetirementYear,
      categoryText,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Cinsiyet
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setGender('kadin')}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    gender === 'kadin'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Kadın
                </button>
                <button
                  type="button"
                  onClick={() => setGender('erkek')}
                  className={`py-2.5 px-3 text-xs font-semibold rounded-lg border transition-all ${
                    gender === 'erkek'
                      ? 'bg-primary text-primary-foreground border-primary shadow-xs'
                      : 'bg-background text-foreground border-border'
                  }`}
                >
                  Erkek
                </button>
              </div>
            </div>

            <DatePicker
              id="birthDate"
              label="Doğum Tarihiniz"
              required
              value={birthDateStr}
              onChange={setBirthDateStr}
              placeholder="15.06.1985"
            />

            <DatePicker
              id="insDate"
              label="İlk Sigorta Başlangıç Tarihi (4A/SSK)"
              required
              value={insuranceStartDateStr}
              onChange={setInsuranceStartDateStr}
              placeholder="01.09.2005"
              helperText="İlk kez SGK uzun vadeli prim yatırılan tarih"
            />

            <div>
              <label htmlFor="currentDays" className="block text-sm font-medium mb-2 text-foreground">
                Mevcut Ödenmiş Prim Gün Sayınız
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  id="currentDays"
                  placeholder="Örn: 4500"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-12 text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-base font-mono"
                  value={currentDaysStr}
                  onChange={(e) => setCurrentDaysStr(sanitizeNumericInput(e.target.value, { allowDecimal: false }))}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">
                  Gün
                </div>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-destructive/10 text-destructive text-sm rounded-lg border border-destructive/20">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Emeklilik Şartlarını Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Emeklilik Koşulları Özeti
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Emeklilik Yaş Şartı</span>
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {result.eytEligible ? 'Yaş Şartsız (EYT)' : `${result.retirementAge} Yaş`}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    Tahmini Yıl: ~{result.estimatedRetirementYear}
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Gereken Asgari Prim:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.requiredDays)} Gün</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Mevcut Priminiz:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.currentDays)} Gün</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Kalan Prim İhtiyacı:</span>
                    <span className="font-semibold text-primary">{formatNumber(result.remainingDays)} Gün</span>
                  </div>
                </div>

                <div className="mt-3 p-2.5 bg-amber-500/10 rounded-lg border border-amber-500/20 text-[11px] text-amber-900 dark:text-amber-300 leading-tight">
                  {result.categoryText}
                </div>

                <div className="mt-3 pt-2.5 border-t border-border/60 text-center">
                  <Link
                    href="/arac/kidem-tazminati-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Emeklilikte alacağınız kıdem tazminatını hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[260px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Doğum ve sigorta başlangıç tarihinizi girerek emeklilik şartlarınızı öğrenin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Türkiye&apos;de Emeklilik Yaşı ve Şartları</h2>
        <p className="mb-4 text-muted-foreground">
          Türkiye&apos;de SGK (4A/SSK) emeklilik şartları ilk sigorta başlangıç tarihine göre 3 temel döneme ayrılır:
        </p>
        <ul className="text-xs sm:text-sm text-muted-foreground space-y-2 mb-6">
          <li><strong>08.09.1999 Öncesi (EYT):</strong> Yaş şartı kaldırılmıştır. 5000-5975 prim günü ile kadınlarda 20 yıl, erkeklerde 25 yıl sigortalılık süresi aranır.</li>
          <li><strong>09.09.1999 - 30.04.2008:</strong> Kadınlarda 58 yaş, erkeklerde 60 yaş ve 7000 prim günü şartı aranır. (Veya 25 yıl sigorta + 4500 gün kısmi emeklilik).</li>
          <li><strong>01.05.2008 Sonrası:</strong> 7200 prim gününün tamamlandığı tarihe göre kadın ve erkek için 58 ile 65 yaş arasında kademeli yaş şartı uygulanır.</li>
        </ul>
        <p className="text-[11px] text-muted-foreground italic">
          * Bu araç genel 4A (SSK) mevzuatına göre bilgilendirme amacıyla tahmini hesaplama yapmaktadır. Fiili hizmet zammı, askerlik/doğum borçlanması ve malullük durumları SGK dökümüne göre farklılık gösterebilir.
        </p>
      </div>
    </div>
  );
}
