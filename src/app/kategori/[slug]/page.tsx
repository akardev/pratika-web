import { permanentRedirect, notFound } from 'next/navigation';
import { categories } from '@/data/tools';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function LegacyCategoryRedirectPage({ params }: Props) {
  const resolvedParams = await params;
  const category = categories.find(
    (c) => c.slug === resolvedParams.slug || c.id === resolvedParams.slug
  );

  if (!category) {
    notFound();
  }

  permanentRedirect(`/araclar/${category.slug}`);
}
