import { Category, Tool } from '@/types';

export const categories: Category[] = [
  {
    id: 'finans',
    slug: 'finans',
    title: 'Finans',
    description: 'Finansal hesaplama araçları.',
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
  }
];

