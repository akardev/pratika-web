import { permanentRedirect, notFound } from 'next/navigation';
import { categories } from '@/data/tools';

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function LegacyCategoryRedirectPage({ params }: Props) {
  const resolvedParams = await params;
  const category = categories.find(
    (c) => c.slug === resolvedParams.category || c.id === resolvedParams.category
  );

  if (!category) {
    notFound();
  }

  permanentRedirect(`/kategoriler/${category.slug}`);
}
