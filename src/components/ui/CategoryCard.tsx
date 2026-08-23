import { Category } from '@/types';
import Link from 'next/link';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/kategori/${category.slug}`} className="group block h-full">
      <div className="h-full rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 relative overflow-hidden">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-2xl text-primary group-hover:scale-110 transition-transform">
          {category.icon}
        </div>
        <h3 className="mb-2 font-semibold tracking-tight text-lg group-hover:text-primary transition-colors">
          {category.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
