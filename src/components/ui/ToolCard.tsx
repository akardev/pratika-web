import { Tool } from '@/types';
import Link from 'next/link';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/arac/${tool.slug}`} className="group block h-full">
      <div className="h-full rounded-2xl border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/50 flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xl text-primary group-hover:scale-110 transition-transform">
            {tool.icon}
          </div>
          {tool.status === 'coming-soon' && (
            <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
              Yakında
            </span>
          )}
        </div>
        <h3 className="mb-2 font-semibold tracking-tight text-lg group-hover:text-primary transition-colors">
          {tool.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-auto">
          {tool.description}
        </p>
      </div>
    </Link>
  );
}
