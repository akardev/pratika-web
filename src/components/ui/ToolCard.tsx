import { Tool } from '@/types';
import Link from 'next/link';
import { getCategoryById } from '@/data/tools';

interface ToolCardProps {
  tool: Tool;
  showCategory?: boolean;
  className?: string;
}

export default function ToolCard({
  tool,
  showCategory = true,
  className = '',
}: ToolCardProps) {
  const category = getCategoryById(tool.categoryId);

  return (
    <Link
      href={`/arac/${tool.slug}`}
      className={`group relative flex flex-col justify-between rounded-xl border border-border/70 bg-card p-5 transition-all duration-150 hover:border-foreground/30 hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
      aria-label={`${tool.title} - ${tool.description}`}
    >
      <div>
        {showCategory && category && (
          <div className="mb-2.5 flex items-center justify-between">
            <span className="inline-flex items-center text-[11px] font-medium text-muted-foreground px-2 py-0.5 rounded-md bg-muted/60 border border-border/40">
              {category.title}
            </span>
          </div>
        )}

        <h3 className="font-semibold text-sm sm:text-base text-foreground tracking-tight group-hover:text-primary transition-colors line-clamp-1">
          {tool.title}
        </h3>

        <p className="mt-1.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
        <span className="text-[11px] text-muted-foreground/70 group-hover:text-muted-foreground">
          {tool.toolType === 'pdf' ? 'PDF Aracı' : 'Ücretsiz Araç'}
        </span>
        <span className="inline-flex items-center gap-1 font-semibold text-primary group-hover:translate-x-0.5 transition-transform text-xs">
          Kullan
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


