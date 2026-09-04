'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import SearchModal from '@/components/ui/SearchModal';

const navLinks = [
  { href: '/araclar', label: 'Araçlar' },
  { href: '/kategoriler', label: 'Kategoriler' },
  { href: '/tarihte-bugun', label: 'Tarihte Bugün' },
  { href: '/bilgi', label: 'Bilgi Merkezi' },
  { href: '/iletisim', label: 'İletişim' },
] as const;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setSearchModalOpen(true);
      }
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const isActive = (href: string) => {
    if (href === '/araclar') {
      return pathname === href || pathname.startsWith('/araclar/') || pathname.startsWith('/arac/');
    }
    if (href === '/kategoriler') {
      return pathname === href || pathname.startsWith('/kategori');
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenus = () => { setMobileMenuOpen(false); };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-4 sm:h-15">
            <Logo variant="wordmark" />

            <div className="hidden items-center md:flex">
              <nav aria-label="Ana navigasyon" className="flex items-center space-x-1 text-sm lg:space-x-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-sm ${
                      isActive(link.href)
                        ? 'bg-muted text-foreground'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="hidden min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:inline-flex"
                aria-label="Arama modalını aç (⌘K)"
              >
                <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Ne arıyorsun?</span>
                <kbd className="rounded border border-border/80 bg-card px-1 py-0.5 font-mono text-[10px] text-muted-foreground">⌘K</kbd>
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="min-h-10 min-w-10 cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden"
                aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" className="fixed inset-x-0 top-14 z-50 max-h-[calc(100svh-3.5rem)] overflow-y-auto border-b border-border bg-background p-4 shadow-lg sm:top-15 md:hidden">
            <nav aria-label="Mobil navigasyon" className="flex flex-col gap-2">
              <Link
                href="/araclar"
                onClick={closeMenus}
                className={`flex min-h-11 items-center justify-between rounded-lg p-3 text-sm font-medium ${
                  isActive('/araclar') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                Araçlar Kataloğu
                <span className="text-xs font-medium text-primary">Tüm Araçlar →</span>
              </Link>
              <Link
                href="/kategoriler"
                onClick={closeMenus}
                className={`flex min-h-11 items-center justify-between rounded-lg p-3 text-sm font-medium ${
                  isActive('/kategoriler') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                Kategoriler
                <span className="text-xs font-medium text-primary">Tüm Kategoriler →</span>
              </Link>
              <Link
                href="/tarihte-bugun"
                onClick={closeMenus}
                className={`flex min-h-11 items-center justify-between rounded-lg p-3 text-sm font-medium ${
                  isActive('/tarihte-bugun') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                Tarihte Bugün
                <span className="text-xs font-medium text-primary">Tarih Arşivi →</span>
              </Link>
              <Link
                href="/bilgi"
                onClick={closeMenus}
                className={`flex min-h-11 items-center justify-between rounded-lg p-3 text-sm font-medium ${
                  isActive('/bilgi') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                Bilgi Merkezi
                <span className="text-xs font-medium text-primary">Rehberler →</span>
              </Link>
              <Link
                href="/iletisim"
                onClick={closeMenus}
                className={`flex min-h-11 items-center justify-between rounded-lg p-3 text-sm font-medium ${
                  isActive('/iletisim') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                İletişim
                <span className="text-xs font-medium text-primary">Bize ulaşın →</span>
              </Link>
              <button
                type="button"
                onClick={() => { closeMenus(); setSearchModalOpen(true); }}
                className="mt-2 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-foreground p-2.5 text-xs font-semibold text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 11-14 0z" />
                </svg>
                Hızlı Araç Bul
              </button>
            </nav>
          </div>
        )}
      </header>
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
    </>
  );
}
