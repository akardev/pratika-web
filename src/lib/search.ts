/**
 * Türkçe arama terimlerini ve metinleri normalleştirir.
 * Şapkalı harfleri (â, î, û vb.) ve Türkçe karakter varyasyonlarını ele alır.
 */
export function normalizeSearchText(text: string): string {
  if (!text) return '';
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/[''"`’‘]/g, ' ')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/û/g, 'u')
    .replace(/ô/g, 'o')
    .replace(/ê/g, 'e')
    .replace(/İ/g, 'i')
    .replace(/I/g, 'ı')
    .replace(/\s+/g, ' ')
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
 * Yaygın arama eşanlamlıları ve kısaltma sözlüğü
 * NOT: "pdf", "donustur" gibi spesifik veya aşırı genel kelimeler tüm kataloğu kirletmemelidir.
 */
const SYNONYM_MAP: Record<string, string[]> = {
  vergi: ['kdv', 'stopaj', 'matrah'],
  kdv: ['vergi', 'oran', 'matrah'],
  foto: ['gorsel', 'resim', 'fotograf', 'image', 'photo'],
  fotograf: ['gorsel', 'resim', 'foto', 'image', 'photo'],
  resim: ['gorsel', 'foto', 'fotograf', 'image'],
  gorsel: ['resim', 'foto', 'fotograf', 'image'],
  yazi: ['metin', 'kelime', 'karakter'],
  metin: ['yazi', 'kelime', 'karakter'],
  kod: ['json', 'base64', 'uuid', 'url', 'developer'],
  yazilim: ['developer', 'kod', 'json', 'base64', 'url'],
  sifre: ['guvenlik', 'password', 'parola'],
  parola: ['sifre', 'guvenlik', 'password'],
  para: ['finans', 'kredi', 'faiz', 'yatirim', 'dolar', 'tl'],
  faiz: ['kredi', 'mevduat', 'vade', 'repo'],
  kredi: ['taksit', 'faiz', 'banka', 'borc'],
  maas: ['ucret', 'mesai', 'saatlik', 'gunluk', 'bordro', 'netten brute', 'brutten nete'],
  tazminat: ['kidem', 'ihbar', 'isden cikis', 'fesih'],
  kidem: ['tazminat', 'ihbar', 'hizmet suresi', 'calisma suresi'],
  ihbar: ['tazminat', 'bildirim', 'onel', 'sure', 'hafta'],
  izin: ['yillik izin', 'izin ucreti', 'ucretli izin', 'tatil'],
  mesai: ['fazla calisma', 'ek mesai', 'saat ucreti', 'overtime'],
  zaman: ['tarih', 'gun', 'fark', 'is gunu', 'yas', 'calisma suresi'],
  olcu: ['donusum', 'birim', 'uzunluk', 'agirlik', 'alan', 'sicaklik'],
  cevir: ['donustur', 'donusturucu', 'yap'],
  cevirme: ['donustur', 'donusturucu', 'yap'],
  donustur: ['cevir', 'yap'],
  boyutlandir: ['boyutlandirma', 'boyutlandirici', 'kirpma', 'olcek', 'resizer', 'resize', 'boyut'],
  boyut: ['boyutlandir', 'olcu', 'piksel', 'resolution'],
  kirp: ['kirpma', 'crop', 'kesme', 'boyutlandir'],
  thumbnail: ['kapak', 'kucuk resim', 'youtube'],
  reels: ['story', 'hikaye', 'instagram', 'tiktok', 'video'],
  story: ['reels', 'hikaye', 'durum', 'instagram'],
};


/**
 * Bir hedefin sorgu kelimeleriyle eşleşip eşleşmediğini ve alaka puanını hesaplar.
 */
export function getSearchRelevanceScore(
  item: {
    title: string;
    description: string;
    slug: string;
    categoryId?: string;
    keywords?: string[];
  },
  query: string
): number {
  const trimmed = query.trim();
  if (!trimmed) return 1;

  const trQuery = normalizeSearchText(trimmed);
  const foldedQuery = foldTurkishAscii(trimmed);
  const tokens = trimmed.split(/\s+/).filter(Boolean);

  const titleTr = normalizeSearchText(item.title);
  const titleFolded = foldTurkishAscii(item.title);
  const slugTr = normalizeSearchText(item.slug);
  const slugFolded = foldTurkishAscii(item.slug);
  const descTr = normalizeSearchText(item.description);
  const descFolded = foldTurkishAscii(item.description);
  const catTr = item.categoryId ? normalizeSearchText(item.categoryId) : '';
  const catFolded = item.categoryId ? foldTurkishAscii(item.categoryId) : '';

  const keywordsTr = (item.keywords || []).map(normalizeSearchText);
  const keywordsFolded = (item.keywords || []).map(foldTurkishAscii);

  let score = 0;

  // 1. Tam başlık veya slug eşleşmesi
  if (titleTr === trQuery || titleFolded === foldedQuery) {
    score += 1500;
  } else if (titleTr.startsWith(trQuery) || titleFolded.startsWith(foldedQuery)) {
    score += 900;
  } else if (titleTr.includes(trQuery) || titleFolded.includes(foldedQuery)) {
    score += 600;
  }

  // 2. Slug eşleşmesi
  if (slugTr === trQuery || slugFolded === foldedQuery) {
    score += 1000;
  } else if (slugTr.startsWith(trQuery) || slugFolded.startsWith(foldedQuery)) {
    score += 500;
  } else if (slugTr.includes(trQuery) || slugFolded.includes(foldedQuery)) {
    score += 350;
  }

  // 3. Kategori eşleşmesi (örn: "pdf" arandığında categoryId === 'pdf' olan tüm araçlar yüksek öncelik alır)
  if (catTr === trQuery || catFolded === foldedQuery) {
    score += 400;
  } else if (catTr.includes(trQuery) || catFolded.includes(foldedQuery)) {
    score += 250;
  }

  // 4. Anahtar kelimeler eşleşmesi
  const keywordMatch =
    keywordsTr.some((k) => k.includes(trQuery)) ||
    keywordsFolded.some((k) => k.includes(foldedQuery));
  if (keywordMatch) {
    score += 300;
  }

  // 5. Token bazlı başlık eşleşmeleri
  const allTokensInTitle = tokens.every(
    (t) =>
      titleTr.includes(normalizeSearchText(t)) ||
      titleFolded.includes(foldTurkishAscii(t))
  );
  if (allTokensInTitle) {
    score += 250;
  }

  // 6. Açıklama eşleşmesi
  if (descTr.includes(trQuery) || descFolded.includes(foldedQuery)) {
    score += 80;
  }

  // 7. Eşanlamlı kelimeler
  for (const token of tokens) {
    const foldedToken = foldTurkishAscii(token);
    const trToken = normalizeSearchText(token);
    const synonyms = SYNONYM_MAP[foldedToken] || SYNONYM_MAP[trToken];
    if (synonyms) {
      for (const syn of synonyms) {
        const trSyn = normalizeSearchText(syn);
        const foldedSyn = foldTurkishAscii(syn);
        if (titleTr.includes(trSyn) || titleFolded.includes(foldedSyn)) {
          score += 120;
        } else if (keywordsTr.some((k) => k.includes(trSyn))) {
          score += 80;
        } else if (descTr.includes(trSyn) || descFolded.includes(foldedSyn)) {
          score += 30;
        }
      }
    }
  }

  return score;
}

/**
 * Verilen hedef metinler dizisinde sorgu arar (case-insensitive, token tabanlı ve eşanlamlı toleranslı).
 */
export function matchesSearchQuery(
  targets: (string | undefined | null)[],
  query: string
): boolean {
  const trimmed = query.trim();
  if (!trimmed) return true;

  const validTargets = targets.filter((t): t is string => Boolean(t && t.trim()));
  if (validTargets.length === 0) return false;

  const normalizedTargets = validTargets.map(normalizeSearchText);
  const foldedTargets = validTargets.map(foldTurkishAscii);

  // Kelime parçalarına ayır (örn: "pdf jpg" -> "pdf" ve "jpg")
  const tokens = trimmed.split(/\s+/).filter(Boolean);

  // Tüm kelime parçaları hedeflerde bulunuyor mu kontrol et
  return tokens.every((token) => {
    const trToken = normalizeSearchText(token);
    const foldedToken = foldTurkishAscii(token);

    // 1. Doğrudan veya ASCII fold ile kontrol
    const directMatch =
      normalizedTargets.some((target) => target.includes(trToken)) ||
      foldedTargets.some((target) => target.includes(foldedToken));

    if (directMatch) return true;

    // 2. Eşanlamlı kelime kontrolü
    const synonyms = SYNONYM_MAP[foldedToken] || SYNONYM_MAP[trToken];
    if (synonyms && synonyms.length > 0) {
      return synonyms.some((syn) => {
        const trSyn = normalizeSearchText(syn);
        const foldedSyn = foldTurkishAscii(syn);
        return (
          normalizedTargets.some((target) => target.includes(trSyn)) ||
          foldedTargets.some((target) => target.includes(foldedSyn))
        );
      });
    }

    return false;
  });
}


