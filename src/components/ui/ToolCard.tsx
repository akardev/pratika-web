import { Tool } from '@/types';
import Link from 'next/link';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/arac/${tool.slug}`} className="group block h-full">
      <div className="h-full rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-all hover:border-primary/40 hover:shadow flex flex-col justify-between">
        <div>
          <h3 className="mb-2 font-semibold tracking-tight text-lg text-foreground group-hover:text-primary transition-colors">
            {tool.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {tool.description}
          </p>
        </div>
        <div className="mt-4 flex items-center text-xs font-medium text-primary">
          <span>Araca Git</span>
          <span className="ml-1 group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </div>
      </div>
    </Link>
  );
}

