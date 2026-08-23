'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import SearchModal from '@/components/ui/SearchModal';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const pathname = usePathname();

  // Mobil menü açıkken sayfa kaydırmasını engelle
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Global Ctrl+K / Cmd+K kısayolu ile arama modalını aç
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen(true);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { href: '/araclar', label: 'Araçlar' },
    { href: '/bilgi', label: 'Bilgi Merkezi' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-sm transition-all">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex h-14 sm:h-15 items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center">
              <Logo variant="wordmark" />
            </div>

            {/* Desktop Navigasyon */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-foreground bg-muted font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Sağ Alan: İnteraktif Arama Butonu ve Mobil Menü Butonu */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSearchModalOpen(true)}
                className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground bg-muted/60 hover:bg-muted hover:text-foreground border border-border/60 rounded-lg transition-colors cursor-pointer"
                aria-label="Arama modalını aç (⌘K)"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>Ne arıyorsun?</span>
                <kbd className="text-[10px] font-mono px-1 py-0.5 bg-card border border-border/80 rounded text-muted-foreground">
                  ⌘K
                </kbd>
              </button>

              {/* Mobil Hamburger Butonu */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobil Menü Overlay / Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-14 bg-background border-b border-border shadow-lg p-5 z-50 animate-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/araclar"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-lg text-sm font-medium ${
                  pathname === '/araclar' || pathname.startsWith('/arac/')
                    ? 'bg-muted text-foreground font-semibold'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <span>Araçlar Kataloğu</span>
                <span className="text-xs text-primary font-semibold">Tüm Araçlar &rarr;</span>
              </Link>

              <Link
                href="/bilgi"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between p-3 rounded-lg text-sm font-medium ${
                  pathname === '/bilgi' || pathname.startsWith('/bilgi/')
                    ? 'bg-muted text-foreground font-semibold'
                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                }`}
              >
                <span>Bilgi Merkezi</span>
                <span className="text-xs text-primary font-semibold">Rehberler &rarr;</span>
              </Link>

              <div className="pt-3 mt-2 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchModalOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-lg bg-foreground text-background text-xs font-semibold shadow-xs cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Hızlı Araç Bul</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Global Arama Modalı (Command Palette) */}
      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />
    </>
  );
}



