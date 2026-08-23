'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { tools } from '@/data/tools';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const filteredTools = useMemo(() => {
    const trimmed = query.trim().toLocaleLowerCase('tr-TR');
    if (!trimmed) return [];
    return tools.filter(
      (tool) =>
        tool.title.toLocaleLowerCase('tr-TR').includes(trimmed) ||
        tool.description.toLocaleLowerCase('tr-TR').includes(trimmed) ||
        tool.slug.toLocaleLowerCase('tr-TR').includes(trimmed) ||
        tool.keywords?.some((k) => k.toLocaleLowerCase('tr-TR').includes(trimmed))
    );
  }, [query]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredTools.length > 0) {
      router.push(`/arac/${filteredTools[0].slug}`);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center w-full h-12 sm:h-14 rounded-full border border-border/80 bg-card shadow-xs hover:shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent overflow-hidden">
          <div className="grid place-items-center h-full w-11 sm:w-14 text-muted-foreground shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <input
            className="peer h-full w-full outline-none text-sm sm:text-base bg-transparent pr-4 text-foreground placeholder:text-muted-foreground"
            type="text"
            id="search"
            autoComplete="off"
            placeholder="Hangi aracı arıyorsunuz?"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />
          
          <button 
            type="submit" 
            className="h-10 px-5 mr-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors hidden sm:block shrink-0"
          >
            Bul
          </button>
        </div>
      </form>

      {/* Arama Sonuçları Açılır Menüsü */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-card rounded-xl border border-border shadow-lg p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
          {filteredTools.length > 0 ? (
            <div className="space-y-1">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/arac/${tool.slug}`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div>
                    <div className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                      {tool.title}
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {tool.description}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-primary ml-3 shrink-0">
                    Git &rarr;
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Aradığınız kriterlere uygun araç bulunamadı.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

