import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import HistoryDiscoveryPage from '@/components/history/HistoryDiscoveryPage';
import {
  parseDaySlug,
  formatDaySlug,
  formatHistoryDayLabel,
  getEventsByDay,
  getAllAvailableDates,
} from '@/data/todayInHistory';
import { siteConfig } from '@/lib/site';

interface HistoryDatePageProps {
  params: Promise<{ date: string }>;
}

export const revalidate = 86400;

export async function generateStaticParams() {
  const dates = getAllAvailableDates();
  return dates.map((d) => ({
    date: d.slug,
  }));
}

export async function generateMetadata({ params }: HistoryDatePageProps): Promise<Metadata> {
  const { date: dateSlug } = await params;
  const parsed = parseDaySlug(dateSlug);

  if (!parsed) {
    return {
      title: 'Tarihte Bugün | Pratika',
      robots: { index: false, follow: false },
    };
  }

  const { month, day } = parsed;
  const canonicalSlug = formatDaySlug(month, day);
  const dayLabel = formatHistoryDayLabel(month, day);
  const events = getEventsByDay(month, day);
  const hasContent = events.length > 0;

  const title = `Tarihte ${dayLabel} | Tarihte Bugün | Pratika`;
  const description = `${dayLabel} tarihinde tarihte yaşanan önemli olayları, bilimsel ve kültürel gelişmeleri, doğumları ve vefatları keşfedin.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}/tarihte-bugun/${canonicalSlug}`,
    },
    robots: hasContent ? undefined : { index: false, follow: true },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/tarihte-bugun/${canonicalSlug}`,
      type: 'website',
    },
  };
}

export default async function TarihteBugunDatePage({ params }: HistoryDatePageProps) {
  const { date: dateSlug } = await params;
  const parsed = parseDaySlug(dateSlug);

  if (!parsed) {
    notFound();
  }

  return (
    <HistoryDiscoveryPage
      mode="day"
      month={parsed.month}
      day={parsed.day}
    />
  );
}
