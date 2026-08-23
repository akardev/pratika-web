export interface Holiday {
  name: string;
  day: number;
  month: number; // 1-12
  year?: number; // Optional if repeating every year, or specific year for moving religious holidays
}

// Türkiye Resmi Tatilleri (Sabit + Dini Bayramlar 2025-2027)
export const TURKEY_HOLIDAYS: Holiday[] = [
  // Sabit Resmi Tatiller (Her yıl aynı gün)
  { name: 'Yılbaşı', day: 1, month: 1 },
  { name: '23 Nisan Ulusal Egemenlik ve Çocuk Bayramı', day: 23, month: 4 },
  { name: '1 Mayıs Emek ve Dayanışma Günü', day: 1, month: 5 },
  { name: '19 Mayıs Atatürk\'ü Anma, Gençlik ve Spor Bayramı', day: 19, month: 5 },
  { name: '15 Temmuz Demokrasi ve Milli Birlik Günü', day: 15, month: 7 },
  { name: '30 Ağustos Zafer Bayramı', day: 30, month: 8 },
  { name: '29 Ekim Cumhuriyet Bayramı', day: 29, month: 10 },

  // Dini Bayramlar 2025
  { name: 'Ramazan Bayramı 1. Gün', day: 30, month: 3, year: 2025 },
  { name: 'Kurban Bayramı 1. Gün', day: 6, month: 6, year: 2025 },

  // Dini Bayramlar 2026
  { name: 'Ramazan Bayramı 1. Gün', day: 20, month: 3, year: 2026 },
  { name: 'Kurban Bayramı 1. Gün', day: 27, month: 5, year: 2026 },

  // Dini Bayramlar 2027
  { name: 'Ramazan Bayramı 1. Gün', day: 10, month: 3, year: 2027 },
  { name: 'Kurban Bayramı 1. Gün', day: 17, month: 5, year: 2027 },
];

export interface UpcomingHolidayResult {
  name: string;
  dateStr: string;
  daysRemaining: number;
  isToday: boolean;
}

export function getUpcomingHoliday(currentDate: Date = new Date()): UpcomingHolidayResult | null {
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDate();

  // Reset hours to start of day for accurate day difference
  const todayStart = new Date(currentYear, currentDate.getMonth(), currentDay).getTime();
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  let closestHoliday: UpcomingHolidayResult | null = null;
  let minDaysDiff = Infinity;

  // Check holidays in current year and next year
  const yearsToCheck = [currentYear, currentYear + 1];

  for (const year of yearsToCheck) {
    for (const h of TURKEY_HOLIDAYS) {
      if (h.year && h.year !== year) continue;

      const holidayDate = new Date(year, h.month - 1, h.day);
      const holidayTime = holidayDate.getTime();
      const daysDiff = Math.round((holidayTime - todayStart) / MS_PER_DAY);

      if (daysDiff >= 0 && daysDiff < minDaysDiff) {
        minDaysDiff = daysDiff;

        const dateFormatted = holidayDate.toLocaleDateString('tr-TR', {
          day: 'numeric',
          month: 'long',
          weekday: 'long',
        });

        closestHoliday = {
          name: h.name,
          dateStr: dateFormatted,
          daysRemaining: daysDiff,
          isToday: daysDiff === 0,
        };
      }
    }
  }

  return closestHoliday;
}
