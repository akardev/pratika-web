export type MenuThemeId = 'elegant' | 'modern' | 'classic' | 'minimal' | 'bold';

const VALID_THEMES: MenuThemeId[] = ['elegant', 'modern', 'classic', 'minimal', 'bold'];

export function sanitizeThemeId(theme?: string | null): MenuThemeId {
  if (theme && VALID_THEMES.includes(theme as MenuThemeId)) {
    return theme as MenuThemeId;
  }
  return 'elegant';
}

export interface BusinessSettings {
  menu_theme: MenuThemeId;
  show_menu_intro: boolean;
  welcome_message?: string | null;
  slogan?: string | null;
  working_hours?: string | null;
  descriptionText: string;
}

const META_PREFIX = '<!--PRATIKA_META:';
const META_SUFFIX = '-->';

export function parseBusinessSettings(business?: {
  description?: string | null;
  menu_theme?: string | null;
  show_menu_intro?: boolean | null;
  welcome_message?: string | null;
  slogan?: string | null;
  working_hours?: string | null;
} | null): BusinessSettings {
  if (!business) {
    return {
      menu_theme: 'elegant',
      show_menu_intro: true,
      welcome_message: null,
      slogan: null,
      working_hours: null,
      descriptionText: '',
    };
  }

  let meta: Record<string, unknown> = {};
  let cleanDesc = business.description || '';

  if (business.description && business.description.includes(META_PREFIX)) {
    const start = business.description.indexOf(META_PREFIX);
    const end = business.description.indexOf(META_SUFFIX, start);
    if (start !== -1 && end !== -1) {
      const jsonStr = business.description.slice(start + META_PREFIX.length, end);
      cleanDesc = (business.description.slice(0, start) + business.description.slice(end + META_SUFFIX.length)).trim();
      try {
        meta = JSON.parse(jsonStr);
      } catch {
        meta = {};
      }
    }
  }

  // Theme resolution: Direct column -> meta JSON -> 'elegant'
  const themeCandidate = (business.menu_theme || meta.menu_theme) as string | undefined;
  const menu_theme = sanitizeThemeId(themeCandidate);

  // Intro resolution: Default is TRUE (Açık). Only false if explicitly false.
  let show_menu_intro = true;
  if (typeof business.show_menu_intro === 'boolean') {
    show_menu_intro = business.show_menu_intro;
  } else if (typeof meta.show_menu_intro === 'boolean') {
    show_menu_intro = meta.show_menu_intro;
  }

  const welcome_message = (business.welcome_message || meta.welcome_message || null) as string | null;
  const slogan = (business.slogan || meta.slogan || null) as string | null;
  const working_hours = (business.working_hours || meta.working_hours || null) as string | null;

  return {
    menu_theme,
    show_menu_intro,
    welcome_message,
    slogan,
    working_hours,
    descriptionText: cleanDesc,
  };
}

export function encodeBusinessDescriptionWithSettings(
  plainDescription: string | null | undefined,
  settings: {
    menu_theme?: string | null;
    show_menu_intro?: boolean | null;
    welcome_message?: string | null;
    slogan?: string | null;
    working_hours?: string | null;
  }
): string {
  let baseDesc = (plainDescription || '').trim();
  if (baseDesc.includes(META_PREFIX)) {
    const start = baseDesc.indexOf(META_PREFIX);
    const end = baseDesc.indexOf(META_SUFFIX, start);
    if (start !== -1 && end !== -1) {
      baseDesc = (baseDesc.slice(0, start) + baseDesc.slice(end + META_SUFFIX.length)).trim();
    }
  }

  const metaJson = JSON.stringify({
    menu_theme: settings.menu_theme || 'elegant',
    show_menu_intro: settings.show_menu_intro !== false,
    welcome_message: settings.welcome_message || null,
    slogan: settings.slogan || null,
    working_hours: settings.working_hours || null,
  });

  return baseDesc ? `${baseDesc}\n${META_PREFIX}${metaJson}${META_SUFFIX}` : `${META_PREFIX}${metaJson}${META_SUFFIX}`;
}

export function getTranslationStatus(record?: {
  is_manual?: boolean | null;
  status?: string | null;
  base_hash?: string | null;
} | null): 'manual' | 'ai_pending' | 'ai_approved' | 'ai_rejected' {
  if (!record) return 'ai_approved';
  if (record.status === 'ai_pending' || record.base_hash?.startsWith('ai_pending')) {
    return 'ai_pending';
  }
  if (record.status === 'ai_rejected' || record.base_hash?.startsWith('ai_rejected')) {
    return 'ai_rejected';
  }
  if (record.status === 'ai_approved' || record.base_hash?.startsWith('ai_approved')) {
    return 'ai_approved';
  }
  if (record.is_manual) {
    return 'manual';
  }
  return 'ai_approved';
}

