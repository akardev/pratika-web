import SearchBar from '@/components/ui/SearchBar';
import Link from 'next/link';
import { tools } from '@/data/tools';

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-4">
            Pratika
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            İhtiyacınız olan hesaplamaları hızlı ve kolayca yapın.
          </p>
          
          <SearchBar />
        </div>
      </section>

      {/* Available Tools Section */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
            Mevcut Araçlar
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={`/arac/${tool.slug}`}
                className="group block p-6 rounded-xl border border-border/60 bg-card hover:border-primary/40 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {tool.description}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-primary shrink-0 ml-4 group-hover:translate-x-0.5 transition-transform">
                    Araca Git &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

