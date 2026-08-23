import { categories, tools } from '@/data/tools';
import ToolCard from '@/components/ui/ToolCard';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const category = categories.find((c) => c.slug === resolvedParams.slug);
  
  if (!category) {
    return {
      title: 'Kategori Bulunamadı',
    };
  }

  return {
    title: `${category.title} Araçları`,
    description: category.description,
  };
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const category = categories.find((c) => c.slug === resolvedParams.slug);

  if (!category) {
    notFound();
  }

  const categoryTools = tools.filter((t) => t.categoryId === category.id);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <span className="text-4xl">{category.icon}</span>
          {category.title}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          {category.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
