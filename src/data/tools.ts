import { Category, Tool } from '@/types';

export const categories: Category[] = [
  {
    id: 'finans',
    slug: 'finans',
    title: 'Finans',
    description: 'Finansal, ticari ve matematiksel hesaplama araçları.',
  },
  {
    id: 'zaman',
    slug: 'zaman',
    title: 'Zaman ve Tarih',
    description: 'Tarih, yaş ve zaman hesaplama araçları.',
  }
];

export const tools: Tool[] = [
  {
    id: 'indirim-hesaplama',
    slug: 'indirim-hesaplama',
    title: 'İndirim Hesaplama',
    description: 'Bir ürünün indirimli fiyatını ve indirim tutarını hızlıca hesaplayın.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['indirim', 'fiyat', 'iskonto', 'tasarruf']
  },
  {
    id: 'yuzde-hesaplama',
    slug: 'yuzde-hesaplama',
    title: 'Yüzde Hesaplama',
    description: 'Yüzde hesaplama, yüzde artış ve azalış hesaplama işlemlerini hızlı ve kolayca yapın.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['yüzde', 'oran', 'yüzde artış', 'yüzde azalış', 'yüzdesi']
  },
  {
    id: 'yas-hesaplama',
    slug: 'yas-hesaplama',
    title: 'Yaş Hesaplama',
    description: 'Doğum tarihinizi girerek yaşınızı yıl, ay ve gün olarak hesaplayın.',
    categoryId: 'zaman',
    status: 'active',
    keywords: ['yaş', 'yaş hesaplama', 'kaç yaşındayım', 'doğum günü', 'yaşım']
  },
  {
    id: 'kdv-hesaplama',
    slug: 'kdv-hesaplama',
    title: 'KDV Hesaplama',
    description: 'KDV dahil ve KDV hariç fiyatları, KDV tutarını kolayca hesaplayın.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['kdv', 'kdv hesaplama', 'kdv dahil', 'kdv hariç', 'vergi', 'katma değer vergisi', 'kdv tutarı']
  },
  {
    id: 'kar-marji-hesaplama',
    slug: 'kar-marji-hesaplama',
    title: 'Kar Marjı Hesaplama',
    description: 'Maliyet ve satış fiyatına göre kâr marjını hesaplayın veya hedef kâr marjınıza göre satış fiyatını bulun.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['kâr marjı', 'kar marjı', 'kâr marjı hesaplama', 'kar marjı hesaplama', 'kâr oranı hesaplama', 'satış fiyatı hesaplama', 'hedef kâr marjı', 'maliyet ve satış', 'kâr hesaplama']
  },
  {
    id: 'zam-hesaplama',
    slug: 'zam-hesaplama',
    title: 'Zam Hesaplama',
    description: 'Bir fiyata uygulanacak zam tutarını ve zamlı yeni fiyatı hesaplayın veya zam öncesi fiyatı bulun.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['zam', 'zam hesaplama', 'zamlı fiyat', 'zam oranı', 'zam tutarı', 'zam öncesi fiyat', 'fiyat artışı', 'artış hesaplama']
  },
  {
    id: 'kar-zarar-hesaplama',
    slug: 'kar-zarar-hesaplama',
    title: 'Kâr / Zarar Hesaplama',
    description: 'Maliyet ve satış fiyatına göre kârınızı veya zararınızı ve kâr/zarar oranınızı hesaplayın.',
    categoryId: 'finans',
    status: 'active',
    keywords: ['kar zarar', 'kâr zarar', 'kar zarar hesaplama', 'kâr zarar hesaplama', 'kar hesaplama', 'zarar hesaplama', 'kâr hesaplama', 'satış karı', 'maliyet karı', 'kazanç hesaplama']
  }
];



export function getActiveCategories(): Category[] {
  const activeCategoryIds = new Set(tools.filter(t => t.status === 'active').map(t => t.categoryId));
  return categories.filter(c => activeCategoryIds.has(c.id));
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getFeaturedTools(limit = 4): Tool[] {
  return tools.filter(t => t.status === 'active').slice(0, limit);
}






