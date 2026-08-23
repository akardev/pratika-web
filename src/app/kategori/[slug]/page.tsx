import { categories, tools } from '@/data/tools';
import ToolCard from '@/components/ui/ToolCard';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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
      title: 'Kategori Bulunamadı | Pratika',
    };
  }

  return {
    title: `${category.title} Hesaplama Araçları | Pratika`,
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
      <Breadcrumb
        items={[
          { label: 'Araçlar', href: '/araclar' },
          { label: category.title },
        ]}
      />

      <div className="mb-10 border-b border-border/60 pb-6">
        <h1 className="text-3xl font-bold tracking-tight mb-2 text-foreground">
          {category.title} Araçları
        </h1>
        <p className="text-base text-muted-foreground max-w-2xl">
          {category.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categoryTools.length > 0 ? (
          categoryTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)
        ) : (
          <p className="text-muted-foreground col-span-full py-10">
            Bu kategoride henüz araç bulunmuyor. Çok yakında eklenecektir.
          </p>
        )}
      </div>
    </div>
  );
}
