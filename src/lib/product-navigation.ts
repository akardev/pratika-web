export type ProductStatus = 'available' | 'soon';

export type ProductNavigationItem = {
  name: string;
  description: string;
  status: ProductStatus;
  href?: string;
  icon?: string;
  badge?: string;
};

export const productNavigation: ProductNavigationItem[] = [
  {
    name: 'Pratika QR',
    description: 'Dijital Menü',
    status: 'available',
    href: '/qr-menu',
    icon: '/brand/pratika-qr-icon.svg',
    badge: 'Premium',
  },
  {
    name: 'Pratika Pro',
    description: 'Profesyonel İşletme Araçları',
    status: 'soon',
  },
];

export const upcomingProduct = {
  label: 'Yakında',
  description: 'Yeni Pratika ürünleri',
} as const;
