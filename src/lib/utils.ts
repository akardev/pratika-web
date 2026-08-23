export function formatCurrency(value: number): string {
  const formattedNumber = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  
  return `${formattedNumber} TL`;
}
