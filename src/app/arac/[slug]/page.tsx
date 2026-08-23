import { tools } from '@/data/tools';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import IndirimHesaplama from '@/components/tools/IndirimHesaplama';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = tools.find((t) => t.slug === resolvedParams.slug);
  
  if (!tool) {
    return {
      title: 'Araç Bulunamadı',
    };
  }

  if (tool.slug === 'indirim-hesaplama') {
    return {
      title: 'İndirim Hesaplama - Pratika',
      description: 'Ürün fiyatı ve indirim oranını girerek indirim tutarını ve indirimli fiyatı hızlıca hesaplayın.',
    };
  }

  return {
    title: tool.title,
    description: tool.description,
  };
}

export default async function ToolPage({ params }: Props) {
  const resolvedParams = await params;
  const tool = tools.find((t) => t.slug === resolvedParams.slug);

  if (!tool) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-4xl">
      <div className="mb-8">
        <Link 
          href="/"
          className="text-xs font-medium text-muted-foreground hover:text-foreground mb-4 inline-block transition-colors"
        >
          &larr; Tüm Araçlar
        </Link>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-2">
          {tool.title}
        </h1>
        <p className="text-base text-muted-foreground">
          {tool.description}
        </p>
      </div>

      <div>
        {tool.slug === 'indirim-hesaplama' && <IndirimHesaplama />}
      </div>
    </div>
  );
}

