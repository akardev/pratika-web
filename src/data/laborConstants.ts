/**
 * T.C. Çalışma ve Sosyal Güvenlik Mevzuatı Sabitleri ve Parametreleri
 * Kaynaklar:
 * - 4857 Sayılı İş Kanunu
 * - 1475 Sayılı İş Kanunu m. 14 (Kıdem Tazminatı)
 * - T.C. Hazine ve Maliye Bakanlığı Genelgeleri
 * - T.C. Çalışma ve Sosyal Güvenlik Bakanlığı
 */

export const LABOR_CONSTANTS = {
  // Kıdem Tazminatı Tavanı (TL) - 2026/2025 Yürürlükteki Tavan
  SEVERANCE_CEILING: 46645.45,

  // Brüt Asgari Ücret (TL)
  MINIMUM_WAGE_GROSS: 26005.50,
  // Net Asgari Ücret (TL)
  MINIMUM_WAGE_NET: 22104.68,

  // Vergi ve SGK Kesinti Oranları
  RATES: {
    // SGK İşçi Payı: %14
    SGK_EMPLOYEE: 0.14,
    // İşsizlik Sigortası İşçi Payı: %1
    UNEMPLOYMENT_EMPLOYEE: 0.01,
    // SGK İşveren Payı (5 puanlık hazine teşviki ile %15.5, normal %20.5)
    SGK_EMPLOYER_DISCOUNTED: 0.155,
    SGK_EMPLOYER_STANDARD: 0.205,
    // İşsizlik Sigortası İşveren Payı: %2
    UNEMPLOYMENT_EMPLOYER: 0.02,
    // Damga Vergisi Oranı: Binde 7,59 (%0.759)
    STAMP_TAX: 0.00759,
  },

  // Gelir Vergisi Dilimleri (2026 Kümülatif Matrah Dilimleri)
  INCOME_TAX_BRACKETS: [
    { limit: 158000, rate: 0.15 },
    { limit: 330000, rate: 0.20 },
    { limit: 800000, rate: 0.27 },
    { limit: 3000000, rate: 0.35 },
    { limit: Infinity, rate: 0.40 },
  ],

  // 4857 Sayılı İş Kanunu Madde 17 - İhbar Süreleri
  NOTICE_PERIODS: [
    { minDays: 0, maxDays: 180, weeks: 2, days: 14, label: '6 aydan az kıdem: 2 hafta (14 gün)' },
    { minDays: 181, maxDays: 540, weeks: 4, days: 28, label: '6 ay - 1,5 yıl arası kıdem: 4 hafta (28 gün)' },
    { minDays: 541, maxDays: 1080, weeks: 6, days: 42, label: '1,5 yıl - 3 yıl arası kıdem: 6 hafta (42 gün)' },
    { minDays: 1081, maxDays: Infinity, weeks: 8, days: 56, label: '3 yıldan fazla kıdem: 8 hafta (56 gün)' },
  ],

  // 4857 Sayılı İş Kanunu Madde 53 - Yıllık Ücretli İzin Asgari Süreleri
  ANNUAL_LEAVE: {
    UP_TO_5_YEARS: 14, // 1 yıldan 5 yıla kadar (5 yıl dahil)
    FROM_5_TO_15_YEARS: 20, // 5 yıldan fazla 15 yıldan az
    FROM_15_YEARS_AND_ABOVE: 26, // 15 yıl ve daha fazla
    SPECIAL_AGE_MIN_DAYS: 20, // 18 ve daha küçük yaştaki işçiler ile 50 ve daha yukarı yaştaki işçiler için en az 20 gün
  },

  // Zaman Katsayıları
  COEFFICIENTS: {
    // 4857 SK uyarınca aylık ortalama yasal çalışma saati (45 saat / hafta * 5 hafta)
    MONTHLY_WORKING_HOURS: 225,
    // Aylık gün katsayısı
    MONTHLY_DAYS: 30,
    // Yıllık gün katsayısı (Kıdem tazminatı hesaplamasında)
    YEARLY_DAYS: 365,
    // Fazla mesai zam katsayısı (Normal: %50 zamlı -> 1.5)
    OVERTIME_NORMAL_MULTIPLIER: 1.5,
    // Genel ve Resmi tatil mesai zam katsayısı (%100 zamlı -> 2.0)
    OVERTIME_HOLIDAY_MULTIPLIER: 2.0,
  },
};
