import type { Metadata } from 'next';
import HistoryDiscoveryPage from '@/components/history/HistoryDiscoveryPage';
import { siteConfig } from '@/lib/site';

export const revalidate = 86400;

export const metadata: Metadata = {
  title: 'Yıl Keşfi — Tarihte Bu Yılda Neler Oldu?',
  description: 'Tarihteki önemli yılları, siyasi dönüm noktalarını, bilimsel buluşları ve kültürel olayları keşfedin.',
  alternates: {
    canonical: `${siteConfig.url}/tarihte-bugun/yil/1960`,
  },
  openGraph: {
    title: 'Yıl Keşfi | Pratika Tarih Keşif Merkezi',
    description: 'Tarihteki önemli yılları keşfedin.',
    url: `${siteConfig.url}/tarihte-bugun/yil/1960`,
    type: 'website',
  },
};

export default function TarihteBugunYilIndexPage() {
  return <HistoryDiscoveryPage mode="year" year={1960} />;
}
