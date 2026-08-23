export const siteConfig = {
  name: 'Pratika',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pratika.com',
  description: 'Türkiye odaklı hızlı, sade ve güvenilir online hesaplama araçları ve bilgi merkezi platformu.',
  ogImage: '/brand/pratika-logo.png',
  locale: 'tr_TR',
  links: {
    github: 'https://github.com/akardev/pratika-web',
  },
};

export function absoluteUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath}`;
}
