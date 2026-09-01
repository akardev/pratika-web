import { categories, tools } from '@/data/tools';
import ToolCard from '@/components/ui/ToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';


type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = categories.find((c) => c.slug === resolvedParams.slug);
  
  if (!category) {
    return {
      title: 'Kategori Bulunamadı',
    };
  }

  return {
    title: `${category.title} Hesaplama Araçları`,
    description: category.description,
    alternates: {
      canonical: `/kategori/${category.slug}`,
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const category = categories.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter((t) => t.categoryId === category.id && t.status === 'active');
  const otherCategories = categories.filter((c) => c.id !== category.id).slice(0, 3);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl">
      <Breadcrumb
        items={[
          { label: 'Araçlar', href: '/araclar' },
          { label: category.title },
        ]}
      />

      <div className="mt-4 mb-8 border-b border-border/70 pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-muted text-muted-foreground border border-border/60 mb-2">
            <span>Kategori Kataloğu</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-2">
            {category.title} Araçları
          </h1>
          <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {category.description}
          </p>
        </div>

        <div className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg bg-card border border-border text-foreground">
          {categoryTools.length} Araç
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categoryTools.length > 0 ? (
          categoryTools.map((tool) => <ToolCard key={tool.id} tool={tool} showCategory={false} />)
        ) : (
          <div className="col-span-full p-10 text-center rounded-xl border border-dashed border-border bg-card">
            <p className="text-sm text-muted-foreground">
              Bu kategoride henüz araç bulunmuyor. Çok yakında eklenecektir.
            </p>
          </div>
        )}
      </div>

      {/* Diğer Kategoriler */}
      {otherCategories.length > 0 && (
        <div className="mt-14 pt-10 border-t border-border/60">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
              Diğer Kategoriler
            </h2>
            <Link
              href="/araclar"
              className="text-xs font-semibold text-primary hover:underline"
            >
              Tüm Kategoriler &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {otherCategories.map((c) => (
              <Link
                key={c.id}
                href={`/kategori/${c.slug}`}
                className="group block p-4 rounded-xl border border-border/70 bg-card hover:border-foreground/30 hover:shadow-xs transition-all"
              >
                <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                  {c.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-1">
                  {c.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

