import { Category, Tool } from '@/types';

export const categories: Category[] = [
  {
    id: 'finans',
    slug: 'finans',
    title: 'Finans',
    description: 'KDV, yüzde, indirim ve kredi hesaplama araçları.',
    icon: '💰'
  },
  {
    id: 'maas-ve-calisma',
    slug: 'maas-ve-calisma',
    title: 'Maaş ve Çalışma',
    description: 'Brüt/net maaş, fazla mesai ve zam hesaplama.',
    icon: '💼'
  },
  {
    id: 'e-ticaret',
    slug: 'e-ticaret',
    title: 'E-Ticaret',
    description: 'Kâr, komisyon ve satış fiyatı hesaplama.',
    icon: '🛍️'
  },
  {
    id: 'donusturuculer',
    slug: 'donusturuculer',
    title: 'Dönüştürücüler',
    description: 'Uzunluk, ağırlık, sıcaklık ve hız dönüşümleri.',
    icon: '🔄'
  },
  {
    id: 'it',
    slug: 'it',
    title: 'IT Araçları',
    description: 'IP, subnet, base64 ve JSON araçları.',
    icon: '💻'
  },
  {
    id: 'gunluk-yasam',
    slug: 'gunluk-yasam',
    title: 'Günlük Yaşam',
    description: 'Yaş, tarih, yakıt maliyeti hesaplama.',
    icon: '📅'
  }
];

export const tools: Tool[] = [
  {
    id: 'kdv-hesaplama',
    slug: 'kdv-hesaplama',
    title: 'KDV Hesaplama',
    description: 'Tutar üzerinden KDV dahil ve hariç fiyatları saniyeler içinde hesaplayın.',
    categoryId: 'finans',
    icon: '📊',
    status: 'active'
  },
  {
    id: 'indirim-hesaplama',
    slug: 'indirim-hesaplama',
    title: 'İndirim Hesaplama',
    description: 'İndirimli ürünlerin gerçek fiyatını ve tasarruf miktarını bulun.',
    categoryId: 'finans',
    icon: '🏷️',
    status: 'active'
  },
  {
    id: 'maas-hesaplama',
    slug: 'maas-hesaplama',
    title: 'Maaş Hesaplama',
    description: 'Brütten nete veya netten brüte maaş hesaplaması yapın.',
    categoryId: 'maas-ve-calisma',
    icon: '💵',
    status: 'coming-soon'
  },
  {
    id: 'ip-hesaplama',
    slug: 'ip-hesaplama',
    title: 'IP ve Subnet Hesaplama',
    description: 'Ağ yapılandırması için CIDR ve Subnet hesaplamaları.',
    categoryId: 'it',
    icon: '🌐',
    status: 'active'
  },
  {
    id: 'kar-hesaplama',
    slug: 'kar-hesaplama',
    title: 'Kâr Marjı Hesaplama',
    description: 'Ürün maliyetiniz üzerinden kâr marjınızı ve satış fiyatını belirleyin.',
    categoryId: 'e-ticaret',
    icon: '📈',
    status: 'active'
  }
];
