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
    status: 'active'
  },
  {
    id: 'yuzde-hesaplama',
    slug: 'yuzde-hesaplama',
    title: 'Yüzde Hesaplama',
    description: 'Yüzde hesaplama, yüzde artış ve azalış hesaplama işlemlerini hızlı ve kolayca yapın.',
    categoryId: 'finans',
    status: 'active'
  }
];


