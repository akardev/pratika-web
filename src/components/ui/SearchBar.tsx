'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { tools, categories } from '@/data/tools';
import { matchesSearchQuery } from '@/lib/search';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  placeholder = 'KDV, faiz, kâr marjı, maliyet...',
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredTools = useMemo(() => {
    if (!query.trim()) return [];
    return tools.filter((tool) => {
      if (tool.status !== 'active') return false;
      const category = categories.find((c) => c.id === tool.categoryId);
      const searchTargets = [
        tool.title,
        tool.description,
        tool.slug,
        category?.title,
        category?.slug,
        ...(tool.keywords || []),
      ];
      return matchesSearchQuery(searchTargets, query);
    });
  }, [query]);

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredTools.length > 0) {
      router.push(`/arac/${filteredTools[0].slug}`);
      setIsOpen(false);
    } else if (query.trim()) {
      router.push(`/araclar?q=${encodeURIComponent(query.trim())}`);
      setIsOpen(false);
    }
  };

  const getCategoryTitle = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.title || 'Genel';
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-2xl mx-auto ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center w-full h-12 sm:h-14 rounded-full border border-border/80 bg-card shadow-xs hover:border-primary/40 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 transition-all overflow-hidden">
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
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />

          <button
            type="submit"
            className="h-10 px-5 mr-1.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors hidden sm:block shrink-0"
          >
            Bul
          </button>
        </div>
      </form>

      {/* Arama Sonuçları Açılır Menüsü */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-card rounded-xl border border-border shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150 max-h-[380px] overflow-y-auto">
          {filteredTools.length > 0 ? (
            <div className="space-y-1">
              <div className="px-3 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Eşleşen Araçlar ({filteredTools.length})
              </div>
              {filteredTools.slice(0, 6).map((tool) => (
                <Link
                  key={tool.id}
                  href={`/arac/${tool.slug}`}
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="pr-3">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">
                        {tool.title}
                      </span>
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                        {getCategoryTitle(tool.categoryId)}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                      {tool.description}
                    </div>
                  </div>
                  <span className="text-xs font-medium text-primary shrink-0 group-hover:translate-x-0.5 transition-transform">
                    Git &rarr;
                  </span>
                </Link>
              ))}

              {filteredTools.length > 6 && (
                <div className="pt-1 border-t border-border/60 text-center">
                  <Link
                    href={`/araclar?q=${encodeURIComponent(query.trim())}`}
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-semibold text-primary hover:underline p-2 block"
                  >
                    Tüm {filteredTools.length} sonucu gör &rarr;
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              &ldquo;{query}&rdquo; ile eşleşen bir araç bulunamadı.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
