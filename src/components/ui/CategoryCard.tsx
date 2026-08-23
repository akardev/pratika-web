import { Category } from '@/types';
import Link from 'next/link';

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/kategori/${category.slug}`} className="group block h-full">
      <div className="h-full rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow">
        <h3 className="mb-2 font-semibold tracking-tight text-lg text-foreground group-hover:text-primary transition-colors">
          {category.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {category.description}
        </p>
      </div>
    </Link>
  );
}

