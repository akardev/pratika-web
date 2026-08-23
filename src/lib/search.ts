/**
 * Türkçe arama terimlerini ve metinleri normalleştirir.
 * Şapkalı harfleri (â, î, û vb.) ve Türkçe karakter varyasyonlarını ele alır.
 */
export function normalizeSearchText(text: string): string {
  if (!text) return '';
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/û/g, 'u')
    .replace(/ô/g, 'o')
    .replace(/ê/g, 'e')
    .trim();
}

/**
 * Türkçe karakterleri düz ASCII karşılıklarına çevirir (klavye bağımsız arama için).
 */
export function foldTurkishAscii(text: string): string {
  if (!text) return '';
  return normalizeSearchText(text)
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/i/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u');
}

/**
 * Verilen hedef metinler dizisinde sorgu arar (case-insensitive ve Türkçe karakter toleranslı).
 */
export function matchesSearchQuery(
  targets: (string | undefined | null)[],
  query: string
): boolean {
  const trimmed = query.trim();
  if (!trimmed) return true;

  const trQuery = normalizeSearchText(trimmed);
  const foldedQuery = foldTurkishAscii(trimmed);

  return targets.some((target) => {
    if (!target) return false;
    const trTarget = normalizeSearchText(target);
    if (trTarget.includes(trQuery)) return true;

    const foldedTarget = foldTurkishAscii(target);
    if (foldedTarget.includes(foldedQuery)) return true;

    return false;
  });
}
