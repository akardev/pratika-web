import SearchBar from '@/components/ui/SearchBar';
import Link from 'next/link';
import { tools } from '@/data/tools';

export default function Home() {
  const activeTools = tools.filter((t) => t.status === 'active');

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            Pratika
          </h1>
          <p className="text-base text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto">
            İhtiyacınız olan hesaplamaları hızlı ve kolayca yapın.
          </p>
          
          <SearchBar />
        </div>
      </section>

      {/* Available Tools Section */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Mevcut Araçlar
            </h2>
            <Link
              href="/araclar"
              className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              Tüm Araçlar &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {activeTools.map((tool) => (
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




