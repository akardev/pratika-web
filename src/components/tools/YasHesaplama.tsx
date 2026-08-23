'use client';

import { useState, useRef } from 'react';
import { formatNumber } from '@/lib/utils';

interface AgeResult {
  years: number;
  months: number;
  days: number;
  birthDateFormatted: string;
  isBirthdayToday: boolean;
  nextBirthdayFormatted: string;
  daysUntilNextBirthday: number;
  totalDaysLived: number;
}

const MONTH_NAMES = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

export default function YasHesaplama() {
  const [birthDateStr, setBirthDateStr] = useState<string>('');
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const datePickerRef = useRef<HTMLInputElement>(null);

  const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, '').slice(0, 8);
    let formatted = '';
    if (rawDigits.length > 0) {
      formatted = rawDigits.slice(0, 2);
      if (rawDigits.length >= 3) {
        formatted += '.' + rawDigits.slice(2, 4);
      }
      if (rawDigits.length >= 5) {
        formatted += '.' + rawDigits.slice(4, 8);
      }
    }
    setBirthDateStr(formatted);
  };

  const handleDatePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value; // "YYYY-MM-DD"
    if (val) {
      const parts = val.split('-');
      if (parts.length === 3) {
        setBirthDateStr(`${parts[2]}.${parts[1]}.${parts[0]}`);
        setError(null);
      }
    }
  };

  const openDatePicker = () => {
    if (datePickerRef.current) {
      if ('showPicker' in HTMLInputElement.prototype) {
        try {
          datePickerRef.current.showPicker();
        } catch {
          datePickerRef.current.focus();
        }
      } else {
        datePickerRef.current.focus();
      }
    }
  };

  const calculateAge = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!birthDateStr.trim()) {
      setError('Doğum tarihinizi girin.');
      return;
    }

    const parts = birthDateStr.split(/[./-]/);
    if (parts.length !== 3 || parts[2].length !== 4) {
      setError('Lütfen doğum tarihinizi GG.AA.YYYY formatında girin.');
      return;
    }

    const birthDay = parseInt(parts[0], 10);
    const birthMonth = parseInt(parts[1], 10);
    const birthYear = parseInt(parts[2], 10);

    if (isNaN(birthDay) || isNaN(birthMonth) || isNaN(birthYear) || birthYear < 1900) {
      setError('Geçerli bir tarih girin.');
      return;
    }

    if (birthMonth < 1 || birthMonth > 12) {
      setError('Geçerli bir tarih girin.');
      return;
    }

    const maxDaysInMonth = new Date(birthYear, birthMonth, 0).getDate();
    if (birthDay < 1 || birthDay > maxDaysInMonth) {
      setError('Geçerli bir tarih girin.');
      return;
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();

    // Gelecek Tarih Kontrolü
    if (
      birthYear > currentYear ||
      (birthYear === currentYear && birthMonth > currentMonth) ||
      (birthYear === currentYear && birthMonth === currentMonth && birthDay > currentDay)
    ) {
      setError('Doğum tarihi gelecekte olamaz.');
      return;
    }

    // Yaş Hesaplama (Yıl, Ay, Gün)
    let years = currentYear - birthYear;
    let months = currentMonth - birthMonth;
    let days = currentDay - birthDay;

    if (days < 0) {
      const prevMonth = currentMonth === 1 ? 12 : currentMonth - 1;
      const prevYear = currentMonth === 1 ? currentYear - 1 : currentYear;
      const daysInPrevMonth = new Date(prevYear, prevMonth, 0).getDate();
      days += daysInPrevMonth;
      months -= 1;
    }

    if (months < 0) {
      months += 12;
      years -= 1;
    }

    // Doğum Günü Kontrolü ve Bir Sonraki Doğum Günü
    const isBirthdayToday = currentMonth === birthMonth && currentDay === birthDay;

    let nextBirthdayYear = currentYear;
    if (
      currentMonth > birthMonth ||
      (currentMonth === birthMonth && currentDay >= birthDay)
    ) {
      nextBirthdayYear = currentYear + 1;
    }

    let targetDay = birthDay;
    if (birthMonth === 2 && birthDay === 29) {
      const isLeap = (nextBirthdayYear % 4 === 0 && nextBirthdayYear % 100 !== 0) || nextBirthdayYear % 400 === 0;
      if (!isLeap) {
        targetDay = 28;
      }
    }

    const todayMidnightUtc = Date.UTC(currentYear, currentMonth - 1, currentDay);
    const nextBirthdayUtc = Date.UTC(nextBirthdayYear, birthMonth - 1, targetDay);
    const birthDateUtc = Date.UTC(birthYear, birthMonth - 1, birthDay);

    const daysUntilNextBirthday = Math.max(0, Math.round((nextBirthdayUtc - todayMidnightUtc) / (1000 * 60 * 60 * 24)));
    const totalDaysLived = Math.max(0, Math.floor((todayMidnightUtc - birthDateUtc) / (1000 * 60 * 60 * 24)));

    const birthDateFormatted = `${birthDay} ${MONTH_NAMES[birthMonth - 1]} ${birthYear}`;
    const nextBirthdayFormatted = `${targetDay} ${MONTH_NAMES[birthMonth - 1]} ${nextBirthdayYear}`;

    setResult({
      years,
      months,
      days,
      birthDateFormatted,
      isBirthdayToday,
      nextBirthdayFormatted,
      daysUntilNextBirthday,
      totalDaysLived,
    });
  };

  return (
    <div className="w-full">
      {/* Hesaplama Kartı */}
      <div className="bg-card rounded-xl border border-border/60 p-6 sm:p-8 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Sol Kolon: Form */}
          <form onSubmit={calculateAge} noValidate className="space-y-6">
            <div>
              <label htmlFor="birthdate" className="block text-sm font-medium mb-2 text-foreground">
                Doğum Tarihiniz <span className="text-destructive">*</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="text"
                  inputMode="numeric"
                  id="birthdate"
                  placeholder="Örn: 28.08.1999"
                  maxLength={10}
                  autoComplete="off"
                  className="w-full rounded-lg border border-border bg-background px-4 py-3 pr-11 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all tracking-wider text-base"
                  value={birthDateStr}
                  onChange={handleDateInputChange}
                />
                <button
                  type="button"
                  onClick={openDatePicker}
                  className="absolute right-2.5 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label="Takvimden tarih seç"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.75}
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </button>
                <input
                  ref={datePickerRef}
                  type="date"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="sr-only"
                  onChange={handleDatePickerChange}
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
              className="w-full h-12 bg-primary text-primary-foreground text-base font-bold rounded-xl shadow-sm hover:bg-primary/90 hover:shadow active:scale-[0.98] transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Hesapla
            </button>
          </form>

          {/* Sağ Kolon: Sonuç Paneli */}
          <div className="flex flex-col justify-center">
            {result ? (
              <div className="h-full flex flex-col justify-center p-6 bg-muted/20 rounded-xl border border-border shadow-sm animate-in fade-in zoom-in-95 duration-200">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 text-center">
                  Hesaplama Sonucu
                </h3>

                <div className="flex flex-col items-center justify-center mb-3">
                  <span className="font-extrabold text-3xl sm:text-4xl text-primary tracking-tight">
                    {result.years} yaşındasınız
                  </span>
                  <span className="text-sm font-medium text-muted-foreground mt-1">
                    {result.years} yıl, {result.months} ay, {result.days} gün
                  </span>
                </div>

                <div className="border-t border-border/60 pt-4 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Doğum Tarihi:</span>
                    <span className="font-semibold text-foreground">{result.birthDateFormatted}</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Sonraki Doğum Günü:</span>
                    <span className="font-semibold text-foreground">
                      {result.isBirthdayToday ? (
                        <span className="text-primary font-bold">Bugün doğum gününüz!</span>
                      ) : (
                        <span>{result.nextBirthdayFormatted} ({result.daysUntilNextBirthday} gün kaldı)</span>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-muted-foreground">Toplam Yaşanan Gün:</span>
                    <span className="font-semibold text-foreground">{formatNumber(result.totalDaysLived)} gün</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="hidden lg:flex h-full min-h-[170px] flex-col items-center justify-center rounded-xl border border-dashed border-border/80 p-6 text-center text-muted-foreground">
                <p className="text-sm font-medium text-foreground">Doğum tarihinizi seçip &ldquo;Hesapla&rdquo; butonuna basın.</p>
                <p className="text-xs text-muted-foreground mt-1">Yaşınız, detaylı süre ve sonraki doğum gününüz burada görüntülenecektir.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO ve Bilgilendirme İçeriği */}
      <div className="prose prose-slate max-w-none">
        <h2 className="text-2xl font-bold mb-4 text-foreground">Yaş Nasıl Hesaplanır?</h2>
        <p className="mb-4 text-muted-foreground">
          Yaş hesaplaması, doğum tarihinizden bugünün tarihine kadar geçen tam takvim süresini hesaplayarak yapılır. 
          Yalnızca doğum yılını bugünün yılından çıkarmak her zaman doğru sonucu vermez; doğum gününüzün ve ayınızın geride kalıp kalmadığı da dikkate alınmalıdır.
        </p>

        <div className="bg-muted/30 p-5 rounded-xl border border-border/60 mb-8">
          <h3 className="text-base font-semibold mb-2 text-foreground">Örnek Yaş Hesaplaması:</h3>
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Doğum Tarihi:</strong> 28 Ağustos 1999 &mdash; <strong>Bugün:</strong> 23 Ağustos 2026
          </p>
          <p className="text-sm text-muted-foreground">
            23 Ağustos 2026 tarihinde, bu yılki doğum gününe (28 Ağustos) henüz 5 gün kaldığı için kişi <strong>26 yaşındadır</strong> (26 yıl, 11 ay, 26 gün).
          </p>
        </div>

        {/* FAQ Bölümü */}
        <h2 className="text-2xl font-bold mb-6 mt-12 text-foreground">Sıkça Sorulan Sorular (SSS)</h2>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-lg text-foreground">Yaş nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Yaş, doğum gününüzden bugüne kadar geçen tam yıl sayısını hesaplayarak bulunur. Eğer bu yılki doğum tarihiniz henüz gelmediyse yaşınız bir eksik sayılır.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-foreground">Doğum tarihime göre kaç yaşındayım?</h4>
            <p className="text-muted-foreground mt-2">
              Doğum tarihinizi yukarıdaki alana girip Hesapla butonuna basarak tam yaşınızı yıl, ay ve gün detaylarıyla anında öğrenebilirsiniz.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-foreground">Yaş hesaplama doğum gününü dikkate alır mı?</h4>
            <p className="text-muted-foreground mt-2">
              Evet. Pratika Yaş Hesaplama aracı, doğum ayı ve gününü güncel takvimle kıyaslayarak kesin ve hatasız yaşınızı hesaplar.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-foreground">Bir sonraki doğum günüme kaç gün kaldı?</h4>
            <p className="text-muted-foreground mt-2">
              Hesaplama aracımız, bu yılki veya gelecek yılki doğum gününüze kalan gün sayısını otomatik olarak hesaplayıp sonuç ekranında gösterir.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg text-foreground">29 Şubat doğumluların yaşı nasıl hesaplanır?</h4>
            <p className="text-muted-foreground mt-2">
              Artık yıllarda (29 Şubat) doğan kişilerin yaşı her yıl takvim günleri baz alınarak hesaplanır. Artık yıl olmayan yıllarda doğum günü yasal ve pratik olarak 28 Şubat kabul edilerek kalan gün süresi belirlenir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

