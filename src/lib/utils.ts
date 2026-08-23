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


