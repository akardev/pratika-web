export type MenuThemeId = 'elegant' | 'modern' | 'classic' | 'minimal' | 'bold';

export type PlanTier = 'starter' | 'pro' | 'enterprise';

export interface PlanLimits {
  id: PlanTier;
  name: string;
  badge?: string;
  monthlyPrice: number;
  annualPrice: number;
  maxBusinesses: number;
  maxLanguages: number; // 2 for starter (TR + 1), 4 for pro (TR, EN, DE, RU)
  allowedThemes: MenuThemeId[];
  maxCategories: number; // 10 for starter, Infinity for pro
  maxProducts: number; // 100 for starter, Infinity for pro
  features: string[];
}

export const PLAN_CONFIGS: Record<PlanTier, PlanLimits> = {
  starter: {
    id: 'starter',
    name: 'Başlangıç',
    monthlyPrice: 299,
    annualPrice: 249,
    maxBusinesses: 1,
    maxLanguages: 2,
    allowedThemes: ['elegant', 'modern', 'classic'],
    maxCategories: 10,
    maxProducts: 100,
    features: [
      '1 İşletme',
      '2 Dil Desteği (Türkçe + 1 Yabancı Dil)',
      '3 Profesyonel Tema (Elegant, Modern, Classic)',
      '10 Kategori Limiti',
      '100 Ürün Limiti',
      'Sabit QR Kod ve Anlık Güncelleme',
      'Giriş (Karşılama) Ekranı',
      'AI Destekli Çeviri ve Onay Sistemi',
      'Standart Destek',
    ],
  },
  pro: {
    id: 'pro',
    name: 'Profesyonel',
    badge: 'En Çok Tercih Edilen',
    monthlyPrice: 599,
    annualPrice: 499,
    maxBusinesses: 2,
    maxLanguages: 4,
    allowedThemes: ['elegant', 'modern', 'classic', 'minimal', 'bold'],
    maxCategories: Infinity,
    maxProducts: Infinity,
    features: [
      '2 İşletme',
      '4 Dil Desteği (TR, EN, DE, RU)',
      '5 Profesyonel Tema (Tüm Temalar)',
      'Sınırsız Kategori',
      'Sınırsız Ürün',
      'Sabit QR Kod ve Anlık Güncelleme',
      'Giriş (Karşılama) Ekranı',
      'AI Destekli Çeviri ve Onay Sistemi',
      'Öncelikli Destek',
    ],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Kurumsal / Zincir',
    badge: 'Size Özel',
    monthlyPrice: 0,
    annualPrice: 0,
    maxBusinesses: Infinity,
    maxLanguages: 4,
    allowedThemes: ['elegant', 'modern', 'classic', 'minimal', 'bold'],
    maxCategories: Infinity,
    maxProducts: Infinity,
    features: [
      'Çoklu İşletme ve Şube Yönetimi',
      'Merkezi Menü ve Fiyat Yönetimi',
      'Şube Bazlı Menü ve Fiyat Özelleştirme',
      'Sınırsız Ürün ve Kategori',
      'Tüm Dil ve Tema Seçenekleri',
      'AI Destekli Çeviri ve Onay Sistemi',
      'Toplu Menü ve Veri Aktarım Desteği',
      'Özel Kurulum ve Onboarding',
      '7/24 Öncelikli Kurumsal Destek',
    ],
  },
};

/**
 * Resolves current plan tier for a business.
 * Currently all trial businesses enjoy 'pro' features during the 15-day trial period.
 */
export function getBusinessPlanTier(): PlanTier {
  return 'pro';
}

/**
 * Checks if a proposed action is within limits.
 */
export function validatePlanFeature(
  tier: PlanTier,
  feature: 'add_category' | 'add_product' | 'select_theme' | 'add_language' | 'add_business',
  params: {
    currentCount?: number;
    themeId?: MenuThemeId;
    languageCount?: number;
  }
): { allowed: boolean; reason?: string } {
  const plan = PLAN_CONFIGS[tier];

  if (feature === 'add_category') {
    if ((params.currentCount || 0) >= plan.maxCategories) {
      return {
        allowed: false,
        reason: `${plan.name} paketinde en fazla ${plan.maxCategories} kategori oluşturabilirsiniz. Sınırsız kategori için Profesyonel pakete geçin.`,
      };
    }
  }

  if (feature === 'add_product') {
    if ((params.currentCount || 0) >= plan.maxProducts) {
      return {
        allowed: false,
        reason: `${plan.name} paketinde en fazla ${plan.maxProducts} ürün ekleyebilirsiniz. Sınırsız ürün için Profesyonel pakete geçin.`,
      };
    }
  }

  if (feature === 'select_theme' && params.themeId) {
    if (!plan.allowedThemes.includes(params.themeId)) {
      return {
        allowed: false,
        reason: `"${params.themeId}" teması ${plan.name} paketinde bulunmamaktadır. Bu temayı kullanmak için Profesyonel pakete geçin.`,
      };
    }
  }

  if (feature === 'add_language') {
    if ((params.languageCount || 0) > plan.maxLanguages) {
      return {
        allowed: false,
        reason: `${plan.name} paketinde en fazla ${plan.maxLanguages} dil kullanabilirsiniz. 4 dil desteği için Profesyonel pakete geçin.`,
      };
    }
  }

  return { allowed: true };
}
