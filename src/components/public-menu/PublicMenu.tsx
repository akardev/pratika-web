'use client';

import type { BusinessData, CategoryData, ProductData } from '@/components/panel/PanelDashboardOverview';
import ThemeRenderer from '@/lib/themes/ThemeRenderer';
import type { MenuThemeId, PublicLocale } from '@/lib/themes/types';

export type { PublicLocale };

export const publicLocales: { id: PublicLocale; label: string }[] = [
  { id: 'tr', label: 'Türkçe' },
  { id: 'en', label: 'English' },
  { id: 'de', label: 'Deutsch' },
  { id: 'ru', label: 'Русский' },
];

export function formatPrice(price: number, locale: PublicLocale): string {
  const formatted = new Intl.NumberFormat(locale === 'tr' ? 'tr-TR' : locale, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  }).format(price);
  return `₺${formatted}`;
}

export default function PublicMenu({
  business,
  isMenuActive = true,
  categories,
  products,
  categoryTranslations = [],
  productTranslations = [],
  forcedTheme,
  forceShowIntro,
}: {
  business: BusinessData;
  isMenuActive?: boolean;
  categories: CategoryData[];
  products: ProductData[];
  categoryTranslations?: { category_id: string; lang_code: string; name: string; description?: string | null }[];
  productTranslations?: { product_id: string; lang_code: string; name: string; description?: string | null }[];
  forcedTheme?: MenuThemeId;
  forceShowIntro?: boolean;
}) {
  return (
    <ThemeRenderer
      business={business}
      isMenuActive={isMenuActive}
      categories={categories}
      products={products}
      categoryTranslations={categoryTranslations}
      productTranslations={productTranslations}
      forcedTheme={forcedTheme}
      forceShowIntro={forceShowIntro}
    />
  );
}
