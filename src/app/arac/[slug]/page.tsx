import { tools } from '@/data/tools';
import { getArticlesByToolSlug } from '@/data/articles';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import IndirimHesaplama from '@/components/tools/IndirimHesaplama';
import YuzdeHesaplama from '@/components/tools/YuzdeHesaplama';
import YasHesaplama from '@/components/tools/YasHesaplama';
import KdvHesaplama from '@/components/tools/KdvHesaplama';
import KarMarjiHesaplama from '@/components/tools/KarMarjiHesaplama';
import ZamHesaplama from '@/components/tools/ZamHesaplama';
import ToolCard from '@/components/ui/ToolCard';

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

  if (tool.slug === 'yuzde-hesaplama') {
    return {
      title: 'Yüzde Hesaplama - Pratika',
      description: 'Yüzde hesaplama, yüzde artış ve azalış hesaplama işlemlerini hızlı ve kolayca yapın.',
    };
  }

  if (tool.slug === 'yas-hesaplama') {
    return {
      title: 'Yaş Hesaplama - Pratika',
      description: 'Doğum tarihinizi girerek yaşınızı yıl, ay ve gün olarak hesaplayın. Bir sonraki doğum gününüze kaç gün kaldığını kolayca öğrenin.',
    };
  }

  if (tool.slug === 'kdv-hesaplama') {
    return {
      title: 'KDV Hesaplama - Pratika',
      description: 'KDV dahil ve KDV hariç fiyatları kolayca hesaplayın. %1, %10, %20 ve özel oranlarla KDV tutarını anında öğrenin.',
    };
  }

  if (tool.slug === 'kar-marji-hesaplama') {
    return {
      title: 'Kar Marjı Hesaplama - Pratika',
      description: 'Maliyet ve satış fiyatına göre kâr marjını hesaplayın veya hedef kâr marjınıza göre satış fiyatını bulun.',
    };
  }

  if (tool.slug === 'zam-hesaplama') {
    return {
      title: 'Zam Hesaplama | Pratika',
      description: 'Zam oranına göre yeni fiyatı ve zam tutarını hesaplayın. Zamlı fiyattan zam öncesi fiyatı da kolayca bulun.',
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

  const relatedTools = tools.filter((t) => t.id !== tool.id);
  const relatedArticles = getArticlesByToolSlug(tool.slug);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 max-w-4xl">
      <div className="mb-8">
        <Link 
          href="/araclar"
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

      <div className="mb-14">
        {tool.slug === 'indirim-hesaplama' && <IndirimHesaplama />}
        {tool.slug === 'yuzde-hesaplama' && <YuzdeHesaplama />}
        {tool.slug === 'yas-hesaplama' && <YasHesaplama />}
        {tool.slug === 'kdv-hesaplama' && <KdvHesaplama />}
        {tool.slug === 'kar-marji-hesaplama' && <KarMarjiHesaplama />}
        {tool.slug === 'zam-hesaplama' && <ZamHesaplama />}
      </div>

      {/* İlgili Bilgiler (Bilgi Merkezi İçerikleri) */}
      {relatedArticles.length > 0 && (
        <div className="border-t border-border/60 pt-10 mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold tracking-tight text-foreground">
              İlgili Bilgiler
            </h2>
            <Link
              href="/bilgi"
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Bilgi Merkezi &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((ra) => (
              <Link
                key={ra.id}
                href={`/bilgi/${ra.slug}`}
                className="group block p-5 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-xs transition-all"
              >
                <span className="text-xs font-semibold text-primary mb-1 block">
                  {ra.category}
                </span>
                <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors mb-1">
                  {ra.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {ra.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* İlgili Araçlar */}
      {relatedTools.length > 0 && (
        <div className="border-t border-border/60 pt-10 mt-10">
          <h2 className="text-lg font-bold tracking-tight text-foreground mb-4">
            İlgili Araçlar
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedTools.map((rt) => (
              <ToolCard key={rt.id} tool={rt} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}







