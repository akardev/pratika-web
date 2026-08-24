'use client';

import { useState } from 'react';
import Link from 'next/link';
import DatePicker from '@/components/ui/DatePicker';

const MONTH_NAMES = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

export default function IstenAyrilmaBildirimSuresi() {
  const [noticeDateStr, setNoticeDateStr] = useState<string>('2026-03-01');
  const [tenureOption, setTenureOption] = useState<string>('1-3'); // Çalışma süresi aralığı

  const [result, setResult] = useState<{
    noticeWeeks: number;
    noticeDays: number;
    jobSearchHoursPerDay: number;
    totalJobSearchHours: number;
    effectiveEndDateFormatted: string;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!noticeDateStr) {
      setError('Lütfen istifa veya fesih bildirim tarihini seçiniz.');
      return;
    }

    const parts = noticeDateStr.split('-');
    if (parts.length !== 3) {
      setError('Geçerli bir tarih giriniz.');
      return;
    }

    let noticeWeeks = 2;
    if (tenureOption === '0-6') noticeWeeks = 2;
    else if (tenureOption === '6-18') noticeWeeks = 4;
    else if (tenureOption === '1-3') noticeWeeks = 6;
    else if (tenureOption === '3+') noticeWeeks = 8;

    const noticeDays = noticeWeeks * 7;
    const noticeDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
    
    const endDate = new Date(noticeDate);
    endDate.setDate(endDate.getDate() + noticeDays);

    const jobSearchHoursPerDay = 2; // Yasal günde en az 2 saat
    // Çalışma günleri üzerinden tahmini toplam iş arama saati (haftada 5-6 gün)
    const workDaysInNotice = noticeWeeks * 5;
    const totalJobSearchHours = workDaysInNotice * jobSearchHoursPerDay;

    const effectiveEndDateFormatted = `${endDate.getDate()} ${MONTH_NAMES[endDate.getMonth()]} ${endDate.getFullYear()}`;

    setResult({
      noticeWeeks,
      noticeDays,
      jobSearchHoursPerDay,
      totalJobSearchHours,
      effectiveEndDateFormatted,
    });
  };

  return (
    <div className="w-full">
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <form onSubmit={handleCalculate} noValidate className="space-y-4">
            <DatePicker
              id="noticeDate"
              label="Bildirim (İstifa/Fesih Tebliğ) Tarihi"
              required
              value={noticeDateStr}
              onChange={setNoticeDateStr}
              placeholder="01.03.2026"
            />

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                İşyerindeki Toplam Çalışma Süreniz (Kıdem)
              </label>
              <select
                className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                value={tenureOption}
                onChange={(e) => setTenureOption(e.target.value)}
              >
                <option value="0-6">6 aydan az çalışanlar (2 Hafta Bildirim)</option>
                <option value="6-18">6 ay - 1.5 yıl arası çalışanlar (4 Hafta Bildirim)</option>
                <option value="1-3">1.5 yıl - 3 yıl arası çalışanlar (6 Hafta Bildirim)</option>
                <option value="3+">3 yıldan fazla çalışanlar (8 Hafta Bildirim)</option>
              </select>
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
              Bildirim Süresi ve Ayrılış Tarihini Hesapla
            </button>
          </form>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  İşten Ayrılış ve Bildirim Detayları
                </h3>

                <div className="flex flex-col items-center justify-center mb-4 text-center">
                  <span className="text-xs text-muted-foreground mb-0.5">Yasal Son İş Günü</span>
                  <span className="font-extrabold text-2xl sm:text-3xl text-primary tracking-tight">
                    {result.effectiveEndDateFormatted}
                  </span>
                  <span className="text-xs font-semibold text-foreground mt-1.5 bg-background px-2.5 py-1 rounded-md border border-border/80">
                    {result.noticeWeeks} Hafta ({result.noticeDays} Gün) Bildirim Süresi
                  </span>
                </div>

                <div className="border-t border-border/60 pt-3 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Günlük İş Arama İzni (Madde 27):</span>
                    <span className="font-semibold text-foreground">Günde en az {result.jobSearchHoursPerDay} saat</span>
                  </div>
                  <div className="flex justify-between items-center py-0.5">
                    <span className="text-muted-foreground">Toplam Toplu İzin Hakkı:</span>
                    <span className="font-semibold text-primary">~{result.totalJobSearchHours} Saat Ücretli İzin</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/60 text-center">
                  <Link
                    href="/arac/ihbar-tazminati-hesaplama"
                    className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    Bildirim süresine uyulmazsa ödenecek ihbar tazminatını hesaplayın &rarr;
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[240px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Bildirim tarihi ve çalışma sürenizi seçerek yasal son çalışma gününüzü öğrenin.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">İşten Ayrılma ve Yeni İş Arama İzni Esasları</h2>
        <p className="mb-4 text-muted-foreground">
          4857 sayılı İş Kanunu md. 27 uyarınca bildirim süreleri içinde işveren, işçiye yeni bir iş bulması için gerekli olan iş arama iznini iş saatleri içinde ve ücret kesintisi yapmadan vermek zorundadır. Bu süre günde <strong>2 saatten</strong> az olamaz. İşçi isterse iş arama izin saatlerini birleştirerek toplu kullanabilir.
        </p>
      </div>
    </div>
  );
}
