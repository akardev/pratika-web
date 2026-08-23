export function formatCurrency(value: number): string {
  const formattedNumber = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  
  return `${formattedNumber} TL`;
}

export function formatNumber(value: number, maxDecimals = 2): string {
  return new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  }).format(value);
}

export function parseTurkishNumber(input: string): number {
  if (!input) return NaN;
  const trimmed = input.trim();
  if (!trimmed) return NaN;

  if (trimmed.includes('.') && trimmed.includes(',')) {
    if (trimmed.lastIndexOf(',') > trimmed.lastIndexOf('.')) {
      return parseFloat(trimmed.replace(/\./g, '').replace(',', '.'));
    } else {
      return parseFloat(trimmed.replace(/,/g, ''));
    }
  }

  if (trimmed.includes(',')) {
    return parseFloat(trimmed.replace(',', '.'));
  }

  if (trimmed.includes('.')) {
    const parts = trimmed.split('.');
    if (parts.length > 1 && parts[parts.length - 1].length === 3) {
      return parseFloat(trimmed.replace(/\./g, ''));
    }
    return parseFloat(trimmed);
  }

  return parseFloat(trimmed);
}

/**
 * Sayısal input girdilerini filtreler; harf, geçersiz sembol ve karakterleri engeller.
 * Ondalık (nokta/virgül) ve eksi işaretini yapılandırmaya göre korur.
 */
export function sanitizeNumericInput(
  raw: string,
  options?: { allowDecimal?: boolean; allowNegative?: boolean }
): string {
  if (!raw) return '';
  const { allowDecimal = true, allowNegative = false } = options || {};
  let val = raw;

  // 1. Negatif işaretini sadece en başta koru
  const isNegative = allowNegative && val.startsWith('-');
  val = val.replace(/-/g, '');

  if (!allowDecimal) {
    // Sadece rakamlar
    val = val.replace(/\D/g, '');
  } else {
    // Yalnızca rakam, nokta ve virgül
    val = val.replace(/[^0-9.,]/g, '');

    // Birden fazla nokta/virgül olmasını engelle (ilk karşılaşılanı koru, sonrakileri sil)
    let seenDecimal = false;
    let result = '';
    for (let i = 0; i < val.length; i++) {
      const char = val[i];
      if (char === '.' || char === ',') {
        if (!seenDecimal) {
          seenDecimal = true;
          result += char;
        }
      } else {
        result += char;
      }
    }
    val = result;
  }

  if (isNegative && val) {
    val = '-' + val;
  }

  return val;
}



