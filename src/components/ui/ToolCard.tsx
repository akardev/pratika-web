import { Tool } from '@/types';
import Link from 'next/link';
import { getCategoryById } from '@/data/tools';

interface ToolCardProps {
  tool: Tool;
  showCategory?: boolean;
}

export default function ToolCard({ tool, showCategory = true }: ToolCardProps) {
  const category = getCategoryById(tool.categoryId);

  return (
    <Link href={`/arac/${tool.slug}`} className="group block h-full">
      <div className="h-full rounded-xl border border-border/60 bg-card p-5 sm:p-6 shadow-xs transition-all hover:border-primary/40 hover:shadow-sm flex flex-col justify-between">
        <div>
          {showCategory && category && (
            <div className="mb-2">
              <span className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-md bg-muted/60 text-muted-foreground border border-border/40">
                {category.title}
              </span>
            </div>
          )}
          <h3 className="font-semibold tracking-tight text-base sm:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {tool.title}
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>
        <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-end text-xs font-semibold text-primary">
          <span>Araca Git</span>
          <span className="ml-1 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </div>
      </div>
    </Link>
  );
}

