import type { Metadata } from 'next';
import HistoryDiscoveryPage from '@/components/history/HistoryDiscoveryPage';
import { formatHistoryDayLabel } from '@/data/todayInHistory';
import { siteConfig } from '@/lib/site';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  const dayLabel = formatHistoryDayLabel(month, day);

  const pageTitle = `Tarihte Bugün (${dayLabel})`;
  const description = `${dayLabel} gününde tarihte yaşanan önemli siyasi, bilimsel, kültürel olaylar, doğumlar ve vefatlar.`;

  return {
    title: pageTitle,
    description,
    alternates: {
      canonical: `${siteConfig.url}/tarihte-bugun`,
    },
    openGraph: {
      title: `${pageTitle} | Pratiksel`,
      description,
      url: `${siteConfig.url}/tarihte-bugun`,
      type: 'website',
    },
  };
}

export default function TarihteBugunPage() {
  const today = new Date();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  return <HistoryDiscoveryPage mode="day" month={month} day={day} />;
}
