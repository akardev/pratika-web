import { Category } from '@/types';
import Link from 'next/link';
import { getToolsByCategoryId, getCategorySampleTools } from '@/data/tools';

interface CategoryCardProps {
  category: Category;
  className?: string;
  onClick?: () => void;
  customHref?: string;
}

export default function CategoryCard({
  category,
  className = '',
  onClick,
  customHref,
}: CategoryCardProps) {
  const tools = getToolsByCategoryId(category.id);
  const sampleTools = getCategorySampleTools(category.id, 4);
  const href = customHref || `/kategori/${category.slug}`;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`group relative flex flex-col justify-between rounded-xl border border-border/70 bg-card p-5 transition-all duration-150 hover:border-foreground/30 hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
      aria-label={`${category.title} kategorisindeki ${tools.length} aracı görüntüle`}
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
            {category.title}
          </h3>
          <span className="text-[11px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md border border-border/40 shrink-0">
            {tools.length} araç
          </span>
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-3">
          {category.description}
        </p>

        {sampleTools.length > 0 && (
          <div className="text-[11px] text-muted-foreground/80 line-clamp-1 border-t border-border/40 pt-2.5">
            {sampleTools.join(' · ')}
          </div>
        )}
      </div>

      <div className="mt-4 pt-2.5 border-t border-border/40 flex items-center justify-between text-xs font-semibold text-primary">
        <span className="text-muted-foreground font-normal text-[11px]">Kategoriye Git</span>
        <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
          Keşfet
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}


