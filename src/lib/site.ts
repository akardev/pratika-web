export const siteConfig = {
  name: 'Pratiksel',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pratiksel.com',
  description: 'Türkiye odaklı hızlı, sade ve güvenilir online hesaplama araçları ve bilgi merkezi platformu.',
  ogImage: '/brand/pratiksel-logo.png',
  locale: 'tr_TR',
  links: {
    github: 'https://github.com/pratiksel',
  },
};

export function absoluteUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath}`;
}
