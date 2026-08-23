import { Category, Tool } from '@/types';

export const categories: Category[] = [
  {
    id: 'finans',
    slug: 'finans',
    title: 'Finans ve Hesaplama',
    description: 'Finansal ve matematiksel hesaplama araçları.',
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
    categoryId: 'finans',
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
  }
];




