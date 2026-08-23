import { LABOR_CONSTANTS } from '@/data/laborConstants';

export interface WorkDuration {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  formattedText: string;
}

/**
 * İki tarih arasındaki çalışma süresini gün, ay, yıl olarak tam hesaplar
 */
export function calculateWorkDuration(startDateStr: string, endDateStr: string): WorkDuration | null {
  if (!startDateStr || !endDateStr) return null;

  const start = new Date(startDateStr);
  const end = new Date(endDateStr);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) return null;
  if (end < start) return null;

  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  // +1 gün dahil (işe giriş ve çıkış günlerinin ikisi de çalışma günüdür)
  const totalDays = Math.round((end.getTime() - start.getTime()) / MS_PER_DAY) + 1;
  const totalWeeks = Math.floor(totalDays / 7);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate() + 1;

  if (days < 0) {
    months -= 1;
    // Bir önceki ayın gün sayısını bul
    const prevMonthDays = new Date(end.getFullYear(), end.getMonth(), 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const parts: string[] = [];
  if (years > 0) parts.push(`${years} Yıl`);
  if (months > 0) parts.push(`${months} Ay`);
  if (days > 0) parts.push(`${days} Gün`);

  const formattedText = parts.length > 0 ? parts.join(' ') : '1 Gün';

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    totalDays,
    totalWeeks,
    formattedText,
  };
}

export interface SeveranceResult {
  isEligible: boolean;
  duration: WorkDuration;
  grossBaseWage: number;
  appliedBaseWage: number;
  isCeilingApplied: boolean;
  grossSeverance: number;
  stampTax: number;
  netSeverance: number;
  yearlyAmount: number;
  monthlyAmount: number;
  dailyAmount: number;
}

/**
 * 1475 SK Madde 14 uyarınca Kıdem Tazminatı Hesabı
 */
export function calculateSeverancePay(
  grossSalary: number,
  additionalBenefits: number,
  duration: WorkDuration
): SeveranceResult {
  const isEligible = duration.years >= 1;

  // Giydirilmiş Brüt Ücret
  const grossBaseWage = Math.max(0, grossSalary) + Math.max(0, additionalBenefits);
  const ceiling = LABOR_CONSTANTS.SEVERANCE_CEILING;

  // Tavan Kontrolü
  const isCeilingApplied = grossBaseWage > ceiling;
  const appliedBaseWage = isCeilingApplied ? ceiling : grossBaseWage;

  if (!isEligible) {
    return {
      isEligible: false,
      duration,
      grossBaseWage,
      appliedBaseWage,
      isCeilingApplied,
      grossSeverance: 0,
      stampTax: 0,
      netSeverance: 0,
      yearlyAmount: 0,
      monthlyAmount: 0,
      dailyAmount: 0,
    };
  }

  // Yıl, ay ve gün bazlı kıdem payları
  const yearlyAmount = appliedBaseWage * duration.years;
  const monthlyAmount = (appliedBaseWage / 12) * duration.months;
  const dailyAmount = (appliedBaseWage / LABOR_CONSTANTS.COEFFICIENTS.YEARLY_DAYS) * duration.days;

  const grossSeverance = yearlyAmount + monthlyAmount + dailyAmount;
  // Kıdem tazminatından sadece binde 7,59 damga vergisi kesilir
  const stampTax = grossSeverance * LABOR_CONSTANTS.RATES.STAMP_TAX;
  const netSeverance = grossSeverance - stampTax;

  return {
    isEligible: true,
    duration,
    grossBaseWage,
    appliedBaseWage,
    isCeilingApplied,
    grossSeverance,
    stampTax,
    netSeverance,
    yearlyAmount,
    monthlyAmount,
    dailyAmount,
  };
}

export interface NoticeResult {
  duration: WorkDuration;
  noticeWeeks: number;
  noticeDays: number;
  noticePeriodLabel: string;
  dailyGrossWage: number;
  grossNotice: number;
  incomeTax: number;
  stampTax: number;
  totalDeductions: number;
  netNotice: number;
  incomeTaxRate: number;
}

/**
 * 4857 SK Madde 17 uyarınca İhbar Tazminatı ve Süresi Hesabı
 */
export function calculateNoticePay(
  grossSalary: number,
  duration: WorkDuration,
  incomeTaxRate: number = 0.15
): NoticeResult {
  const totalDays = duration.totalDays;

  // İhbar süresini belirle
  const period =
    LABOR_CONSTANTS.NOTICE_PERIODS.find(
      (p) => totalDays >= p.minDays && totalDays <= p.maxDays
    ) || LABOR_CONSTANTS.NOTICE_PERIODS[LABOR_CONSTANTS.NOTICE_PERIODS.length - 1];

  const noticeWeeks = period.weeks;
  const noticeDays = period.days;
  const noticePeriodLabel = period.label;

  const dailyGrossWage = grossSalary / LABOR_CONSTANTS.COEFFICIENTS.MONTHLY_DAYS;
  const grossNotice = dailyGrossWage * noticeDays;

  // Kesintiler: Gelir Vergisi + Damga Vergisi (SGK kesilmez)
  const incomeTax = grossNotice * incomeTaxRate;
  const stampTax = grossNotice * LABOR_CONSTANTS.RATES.STAMP_TAX;
  const totalDeductions = incomeTax + stampTax;
  const netNotice = grossNotice - totalDeductions;

  return {
    duration,
    noticeWeeks,
    noticeDays,
    noticePeriodLabel,
    dailyGrossWage,
    grossNotice,
    incomeTax,
    stampTax,
    totalDeductions,
    netNotice,
    incomeTaxRate,
  };
}

export interface AnnualLeaveResult {
  workYears: number;
  age?: number;
  leaveDays: number;
  ruleExplanation: string;
  legalMinimum: number;
}

/**
 * 4857 SK Madde 53 uyarınca Yıllık İzin Hakkı Hesabı
 */
export function calculateAnnualLeave(workYears: number, age?: number): AnnualLeaveResult {
  let leaveDays = 0;
  let ruleExplanation = '';

  if (workYears < 1) {
    leaveDays = 0;
    ruleExplanation = '1 yılı doldurmayan çalışanların yasal yıllık izin hakkı henüz oluşmamıştır.';
  } else if (workYears >= 1 && workYears <= 5) {
    leaveDays = LABOR_CONSTANTS.ANNUAL_LEAVE.UP_TO_5_YEARS;
    ruleExplanation = '1 yıldan 5 yıla kadar (5 yıl dahil) olan çalışanlara en az 14 gün yıllık ücretli izin verilir.';
  } else if (workYears > 5 && workYears < 15) {
    leaveDays = LABOR_CONSTANTS.ANNUAL_LEAVE.FROM_5_TO_15_YEARS;
    ruleExplanation = '5 yıldan fazla 15 yıldan az olan çalışanlara en az 20 gün yıllık ücretli izin verilir.';
  } else {
    leaveDays = LABOR_CONSTANTS.ANNUAL_LEAVE.FROM_15_YEARS_AND_ABOVE;
    ruleExplanation = '15 yıl ve daha fazla olan çalışanlara en az 26 gün yıllık ücretli izin verilir.';
  }

  // 18 yaş ve altı veya 50 yaş ve üzeri özel koruma (Madde 53/5: En az 20 gün)
  if (workYears >= 1 && age !== undefined && (age <= 18 || age >= 50)) {
    if (leaveDays < LABOR_CONSTANTS.ANNUAL_LEAVE.SPECIAL_AGE_MIN_DAYS) {
      leaveDays = LABOR_CONSTANTS.ANNUAL_LEAVE.SPECIAL_AGE_MIN_DAYS;
      ruleExplanation += ' (4857 SK m. 53 uyarınca 18 yaş altı ve 50 yaş üzeri çalışanlar için yıllık izin 20 günden az olamaz.)';
    }
  }

  return {
    workYears,
    age,
    leaveDays,
    ruleExplanation,
    legalMinimum: leaveDays,
  };
}

export interface UnusedLeaveResult {
  unusedDays: number;
  dailyGrossWage: number;
  grossAmount: number;
  sgkEmployee: number;
  unemploymentEmployee: number;
  incomeTax: number;
  stampTax: number;
  totalDeductions: number;
  netAmount: number;
}

/**
 * 4857 SK Madde 59 uyarınca Kullanılmayan Yıllık İzin Ücreti Hesabı
 */
export function calculateUnusedLeavePay(
  grossSalary: number,
  unusedDays: number,
  incomeTaxRate: number = 0.15
): UnusedLeaveResult {
  const dailyGrossWage = grossSalary / LABOR_CONSTANTS.COEFFICIENTS.MONTHLY_DAYS;
  const grossAmount = dailyGrossWage * unusedDays;

  // Normal ücret gibi vergilendirilir (SGK + İşsizlik + GV + DV)
  const sgkEmployee = grossAmount * LABOR_CONSTANTS.RATES.SGK_EMPLOYEE;
  const unemploymentEmployee = grossAmount * LABOR_CONSTANTS.RATES.UNEMPLOYMENT_EMPLOYEE;
  const incomeTaxBase = grossAmount - (sgkEmployee + unemploymentEmployee);
  const incomeTax = incomeTaxBase * incomeTaxRate;
  const stampTax = grossAmount * LABOR_CONSTANTS.RATES.STAMP_TAX;

  const totalDeductions = sgkEmployee + unemploymentEmployee + incomeTax + stampTax;
  const netAmount = grossAmount - totalDeductions;

  return {
    unusedDays,
    dailyGrossWage,
    grossAmount,
    sgkEmployee,
    unemploymentEmployee,
    incomeTax,
    stampTax,
    totalDeductions,
    netAmount,
  };
}

export interface OvertimeResult {
  grossSalary: number;
  hourlyWage: number;
  overtimeHours: number;
  overtimeType: 'weekday' | 'holiday';
  multiplier: number;
  overtimeHourlyWage: number;
  grossOvertimePay: number;
  sgkEmployee: number;
  unemploymentEmployee: number;
  incomeTax: number;
  stampTax: number;
  netOvertimePay: number;
  totalPayGross: number;
  totalPayNet: number;
}

/**
 * 4857 SK Madde 41 uyarınca Fazla Mesai Hesabı
 */
export function calculateOvertimePay(
  grossSalary: number,
  overtimeHours: number,
  overtimeType: 'weekday' | 'holiday' = 'weekday',
  incomeTaxRate: number = 0.15
): OvertimeResult {
  const hourlyWage = grossSalary / LABOR_CONSTANTS.COEFFICIENTS.MONTHLY_WORKING_HOURS;
  const multiplier =
    overtimeType === 'holiday'
      ? LABOR_CONSTANTS.COEFFICIENTS.OVERTIME_HOLIDAY_MULTIPLIER
      : LABOR_CONSTANTS.COEFFICIENTS.OVERTIME_NORMAL_MULTIPLIER;

  const overtimeHourlyWage = hourlyWage * multiplier;
  const grossOvertimePay = overtimeHourlyWage * overtimeHours;

  const sgkEmployee = grossOvertimePay * LABOR_CONSTANTS.RATES.SGK_EMPLOYEE;
  const unemploymentEmployee = grossOvertimePay * LABOR_CONSTANTS.RATES.UNEMPLOYMENT_EMPLOYEE;
  const incomeTaxBase = grossOvertimePay - (sgkEmployee + unemploymentEmployee);
  const incomeTax = incomeTaxBase * incomeTaxRate;
  const stampTax = grossOvertimePay * LABOR_CONSTANTS.RATES.STAMP_TAX;

  const netOvertimePay = grossOvertimePay - (sgkEmployee + unemploymentEmployee + incomeTax + stampTax);

  return {
    grossSalary,
    hourlyWage,
    overtimeHours,
    overtimeType,
    multiplier,
    overtimeHourlyWage,
    grossOvertimePay,
    sgkEmployee,
    unemploymentEmployee,
    incomeTax,
    stampTax,
    netOvertimePay,
    totalPayGross: grossSalary + grossOvertimePay,
    totalPayNet: grossSalary * 0.7149 + netOvertimePay, // Yaklaşık
  };
}

export interface SalaryBreakdown {
  grossSalary: number;
  sgkEmployee: number; // %14
  unemploymentEmployee: number; // %1
  incomeTaxBase: number;
  incomeTax: number;
  minWageTaxExemption: number;
  effectiveIncomeTax: number;
  stampTax: number;
  minWageStampTaxExemption: number;
  effectiveStampTax: number;
  totalDeductions: number;
  netSalary: number;
  sgkEmployer: number;
  unemploymentEmployer: number;
  totalEmployerCost: number;
}

/**
 * Brütten Nete Maaş Hesabı (Asgari Ücret Vergi İstisnası Dahil)
 */
export function calculateNetSalaryFromGross(
  grossSalary: number,
  cumulativeTaxBase: number = 0,
  isEmployerDiscounted: boolean = true
): SalaryBreakdown {
  const sgkEmployee = grossSalary * LABOR_CONSTANTS.RATES.SGK_EMPLOYEE;
  const unemploymentEmployee = grossSalary * LABOR_CONSTANTS.RATES.UNEMPLOYMENT_EMPLOYEE;
  const incomeTaxBase = grossSalary - (sgkEmployee + unemploymentEmployee);

  // Gelir Vergisi Dilimi Hesabı
  let incomeTax = 0;
  const newCumulative = cumulativeTaxBase + incomeTaxBase;

  // Basit aylık dilim yaklaşımı (1. dilim %15, 2. dilim %20 vb.)
  if (newCumulative <= 158000) {
    incomeTax = incomeTaxBase * 0.15;
  } else if (newCumulative <= 330000) {
    incomeTax = incomeTaxBase * 0.20;
  } else if (newCumulative <= 800000) {
    incomeTax = incomeTaxBase * 0.27;
  } else {
    incomeTax = incomeTaxBase * 0.35;
  }

  // 7349 sayılı Kanun ile Asgari Ücret Gelir ve Damga Vergisi İstisnası
  const minWageGross = LABOR_CONSTANTS.MINIMUM_WAGE_GROSS;
  const minWageTaxBase = minWageGross * (1 - (LABOR_CONSTANTS.RATES.SGK_EMPLOYEE + LABOR_CONSTANTS.RATES.UNEMPLOYMENT_EMPLOYEE));
  const minWageTaxExemption = Math.min(incomeTax, minWageTaxBase * 0.15);

  const effectiveIncomeTax = Math.max(0, incomeTax - minWageTaxExemption);

  // Damga Vergisi ve İstisnası
  const rawStampTax = grossSalary * LABOR_CONSTANTS.RATES.STAMP_TAX;
  const minWageStampTaxExemption = Math.min(rawStampTax, minWageGross * LABOR_CONSTANTS.RATES.STAMP_TAX);
  const effectiveStampTax = Math.max(0, rawStampTax - minWageStampTaxExemption);

  const totalDeductions = sgkEmployee + unemploymentEmployee + effectiveIncomeTax + effectiveStampTax;
  const netSalary = grossSalary - totalDeductions;

  // İşveren Maliyeti
  const employerRate = isEmployerDiscounted
    ? LABOR_CONSTANTS.RATES.SGK_EMPLOYER_DISCOUNTED
    : LABOR_CONSTANTS.RATES.SGK_EMPLOYER_STANDARD;
  const sgkEmployer = grossSalary * employerRate;
  const unemploymentEmployer = grossSalary * LABOR_CONSTANTS.RATES.UNEMPLOYMENT_EMPLOYER;
  const totalEmployerCost = grossSalary + sgkEmployer + unemploymentEmployer;

  return {
    grossSalary,
    sgkEmployee,
    unemploymentEmployee,
    incomeTaxBase,
    incomeTax,
    minWageTaxExemption,
    effectiveIncomeTax,
    stampTax: rawStampTax,
    minWageStampTaxExemption,
    effectiveStampTax,
    totalDeductions,
    netSalary,
    sgkEmployer,
    unemploymentEmployer,
    totalEmployerCost,
  };
}

/**
 * Netten Brüte Maaş Hesabı (İteratif hassas yakınsama motoru)
 */
export function calculateGrossSalaryFromNet(
  targetNet: number,
  cumulativeTaxBase: number = 0
): SalaryBreakdown {
  if (targetNet <= 0) {
    return calculateNetSalaryFromGross(0, cumulativeTaxBase);
  }

  // Asgari ücret kontrolü
  if (Math.abs(targetNet - LABOR_CONSTANTS.MINIMUM_WAGE_NET) < 1) {
    return calculateNetSalaryFromGross(LABOR_CONSTANTS.MINIMUM_WAGE_GROSS, cumulativeTaxBase);
  }

  // İkili arama (Binary search) ile kesin brüt tutarı bul
  let low = targetNet;
  let high = targetNet * 2.5;
  let estimatedGross = (low + high) / 2;

  for (let i = 0; i < 50; i++) {
    estimatedGross = (low + high) / 2;
    const current = calculateNetSalaryFromGross(estimatedGross, cumulativeTaxBase);

    if (Math.abs(current.netSalary - targetNet) < 0.01) {
      break;
    }

    if (current.netSalary < targetNet) {
      low = estimatedGross;
    } else {
      high = estimatedGross;
    }
  }

  return calculateNetSalaryFromGross(estimatedGross, cumulativeTaxBase);
}
