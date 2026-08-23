import { tools } from '@/data/tools';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import IndirimHesaplama from '@/components/tools/IndirimHesaplama';
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

  // Özel SEO title ve description'ları araçların özelliklerinden veya statik olarak alabiliriz
  // Şimdilik indirim hesaplama için özel metadata ayarlıyoruz:
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

  // İlgili araçları bul (Aynı kategorideki diğer araçlar)
  const relatedTools = tools
    .filter((t) => t.categoryId === tool.categoryId && t.id !== tool.id)
    .slice(0, 3); // En fazla 3 araç göster

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
      <div className="mb-8">
        <Link 
          href={`/kategori/${tool.categoryId}`}
          className="text-sm font-medium text-muted-foreground hover:text-primary mb-4 inline-block transition-colors"
        >
          &larr; Kategoriye Dön
        </Link>
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-primary/10 text-4xl shrink-0">
            {tool.icon}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <h1 className="text-3xl font-bold tracking-tight">
                {tool.title}
              </h1>
              {tool.status === 'coming-soon' && (
                <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
                  Yakında
                </span>
              )}
            </div>
            <p className="text-lg text-muted-foreground">
              {tool.slug === 'indirim-hesaplama' 
                ? 'Bir ürünün indirimli fiyatını ve indirim tutarını hızlıca hesaplayın.' 
                : tool.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        {tool.status === 'coming-soon' ? (
          <div className="rounded-2xl border bg-card p-6 sm:p-10 shadow-sm min-h-[400px] flex items-center justify-center">
            <div className="text-center max-w-md mx-auto">
              <div className="text-5xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold mb-2">Yapım Aşamasında</h3>
              <p className="text-muted-foreground">
                Bu araç şu anda geliştirilmektedir. Çok yakında kullanıma sunulacaktır.
              </p>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {tool.slug === 'indirim-hesaplama' && <IndirimHesaplama />}
            {tool.slug !== 'indirim-hesaplama' && (
              <div className="rounded-2xl border bg-card p-6 sm:p-10 shadow-sm min-h-[400px] flex items-center justify-center">
                <div className="text-center w-full max-w-md mx-auto">
                  <div className="p-8 border-2 border-dashed rounded-xl border-muted-foreground/20 text-muted-foreground">
                    <p>Araç hesaplama arayüzü buraya eklenecek.</p>
                    <div className="mt-6 flex flex-col gap-4">
                      <div className="h-10 bg-muted/50 rounded-md animate-pulse"></div>
                      <div className="h-10 bg-muted/50 rounded-md animate-pulse"></div>
                      <div className="h-10 bg-primary/20 rounded-md mt-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* İlgili Araçlar */}
      {relatedTools.length > 0 && (
        <div className="border-t pt-12 mt-12">
          <h2 className="text-2xl font-bold tracking-tight mb-6">İlgili Araçlar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedTools.map((rt) => (
              <ToolCard key={rt.id} tool={rt} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
