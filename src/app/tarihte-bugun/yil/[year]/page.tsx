import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HistoryDiscoveryPage from '@/components/history/HistoryDiscoveryPage';
import { getEventsByYear, getAllAvailableYears } from '@/data/todayInHistory';
import { siteConfig } from '@/lib/site';

interface HistoryYearPageProps {
  params: Promise<{ year: string }>;
}

export const revalidate = 86400;

export async function generateStaticParams() {
  const years = getAllAvailableYears();
  return years.map((y) => ({
    year: y.year.toString(),
  }));
}

export async function generateMetadata({ params }: HistoryYearPageProps): Promise<Metadata> {
  const { year: yearStr } = await params;
  const yearNum = parseInt(yearStr, 10);

  if (isNaN(yearNum) || yearNum < 1000 || yearNum > 2100) {
    return {
      title: 'Yıl Keşfi',
      robots: { index: false, follow: false },
    };
  }

  const events = getEventsByYear(yearNum);
  const hasContent = events.length > 0;

  const pageTitle = `${yearNum} Yılında Neler Oldu?`;
  const description = `${yearNum} yılında dünyada ve Türkiye'de gerçekleşen önemli siyasi, bilimsel, kültürel olayları ve dönüm noktalarını keşfedin.`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: `${siteConfig.url}/tarihte-bugun/yil/${yearNum}`,
    },
    robots: hasContent ? undefined : { index: false, follow: true },
    openGraph: {
      title: `${pageTitle} | Pratika`,
      description,
      url: `${siteConfig.url}/tarihte-bugun/yil/${yearNum}`,
      type: 'website',
    },
  };
}

export default async function TarihteBugunYearPage({ params }: HistoryYearPageProps) {
  const { year: yearStr } = await params;
  const yearNum = parseInt(yearStr, 10);

  if (isNaN(yearNum) || yearNum < 1000 || yearNum > 2100) {
    notFound();
  }

  return <HistoryDiscoveryPage mode="year" year={yearNum} />;
}
