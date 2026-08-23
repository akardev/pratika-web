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

