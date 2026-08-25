export type MenuThemeId = 'elegant' | 'modern' | 'classic' | 'minimal' | 'bold';

export type PublicLocale = 'tr' | 'en' | 'de' | 'ru';

export interface ThemeDefinition {
  id: MenuThemeId;
  name: string;
  tagline: string;
  description: string;
  category: 'luxury' | 'modern' | 'traditional' | 'clean' | 'energetic';
  badge: string;
  accentColor: string;
  previewThumbnail: string; // CSS style or preview image token
  isFree: boolean;
  planRequired?: 'FREE' | 'PRO' | 'ENTERPRISE';
  features: string[];
}

export interface ThemeCopy {
  menuKicker: string;
  menuTitle: string;
  searchPlaceholder: string;
  noSearchResults: string;
  noProducts: string;
  menuUpdatingTitle: string;
  menuUpdatingDesc: string;
  featured: string;
  close: string;
  details: string;
  noDesc: string;
  createdWith: string;
  createYourMenu: string;
  createCta: string;
  allergensLabel: string;
  viewMenuBtn: string;
  welcomeEyebrow: string;
  welcomeSub: string;
  infoTitle: string;
  callBtn: string;
  instagramBtn: string;
  hoursLabel: string;
  addressLabel: string;
  exploreCategories: string;
  backToWelcome: string;
}
