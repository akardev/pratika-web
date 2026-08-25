'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/components/ui/Logo';
import SearchModal from '@/components/ui/SearchModal';
import { productNavigation, upcomingProduct } from '@/lib/product-navigation';

const LoginModal = dynamic(() => import('@/components/auth/LoginModal'), { ssr: false });

const navLinks = [
  { href: '/araclar', label: 'Araçlar' },
  { href: '/bilgi', label: 'Bilgi Merkezi' },
] as const;

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const loginTriggerRef = useRef<HTMLButtonElement>(null);
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
        setProductsOpen(false);
        setMobileMenuOpen(false);
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (productsRef.current && !productsRef.current.contains(event.target as Node)) setProductsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  const isActive = (href: string) => href === '/araclar'
    ? pathname === href || pathname.startsWith('/arac/')
    : pathname === href || pathname.startsWith(`${href}/`);
  const closeMenus = () => { setMobileMenuOpen(false); setProductsOpen(false); };

  const renderProduct = (product: (typeof productNavigation)[number], mobile = false) => {
    const content = (
      <>
        <span className="flex min-w-0 items-start gap-3">
          {product.icon ? <Image src={product.icon} alt="" width={mobile ? 20 : 22} height={mobile ? 20 : 22} className="mt-0.5 shrink-0" /> : <span className="mt-0.5 grid h-[22px] w-[22px] shrink-0 place-items-center rounded-md bg-muted text-xs text-muted-foreground">•</span>}
          <span className="min-w-0">
            <span className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
              {product.name}
              {product.badge && <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary">{product.badge}</span>}
            </span>
            <span className="mt-0.5 block text-xs text-muted-foreground">{product.description}</span>
          </span>
        </span>
        {product.status === 'available' ? <span aria-hidden="true" className="shrink-0 text-sm text-primary">→</span> : <span className="shrink-0 rounded-full bg-muted px-2 py-1 text-[10px] font-semibold text-muted-foreground">Yakında</span>}
      </>
    );

    if (product.status === 'available' && product.href) {
      return <Link key={product.name} role="menuitem" href={product.href} onClick={closeMenus} className={`flex items-center justify-between gap-3 rounded-lg ${mobile ? 'p-3' : 'px-3 py-3'} transition-colors hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`}>{content}</Link>;
    }
    return <div key={product.name} role="menuitem" className={`flex items-center justify-between gap-3 rounded-lg ${mobile ? 'p-3' : 'px-3 py-3'}`}>{content}</div>;
  };

  const openLogin = () => {
    closeMenus();
    setLoginOpen(true);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between gap-4 sm:h-15">
            <Logo variant="wordmark" />

            <div className="hidden items-center md:flex">
            <nav aria-label="Ana navigasyon" className="flex items-center space-x-1 text-sm lg:space-x-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-sm ${isActive(link.href) ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>
                  {link.label}
                </Link>
              ))}

              <div ref={productsRef} className="relative" onMouseEnter={() => setProductsOpen(true)} onMouseLeave={() => setProductsOpen(false)}>
                <button type="button" onClick={() => setProductsOpen((open) => !open)} aria-expanded={productsOpen} aria-controls="products-menu" aria-haspopup="menu" className={`inline-flex items-center gap-1 rounded-lg px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:text-sm ${pathname.startsWith('/qr-menu') || productsOpen ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted/60'}`}>
                  Ürünler
                  <svg aria-hidden="true" className={`h-3.5 w-3.5 transition-transform ${productsOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.51a.75.75 0 0 1-1.08 0l-4.25-4.51a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" /></svg>
                </button>
                {productsOpen && <div id="products-menu" role="menu" className="absolute right-0 top-full z-50 w-[min(20rem,calc(100vw-2rem))] pt-3"><div className="rounded-xl border border-border bg-card p-2 shadow-lg"><div className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Ücretli ürünler</div><div className="grid gap-1">{productNavigation.map((product) => renderProduct(product))}</div><div className="mt-1 border-t border-border/70 px-3 pb-1 pt-3"><span className="block text-xs font-semibold text-foreground">{upcomingProduct.label}</span><span className="mt-0.5 block text-xs text-muted-foreground">{upcomingProduct.description}</span></div></div></div>}
              </div>

            </nav>

            <div className="ml-3 border-l border-border/70 pl-3">
              <button type="button" ref={loginTriggerRef} onClick={() => setLoginOpen(true)} aria-haspopup="dialog" aria-expanded={loginOpen} className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-muted/20 px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:px-3 sm:text-sm">
                <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15.75 6.75a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a7.5 7.5 0 0115 0" /></svg>
                Giriş
              </button>
            </div>
            </div>

            <div className="flex items-center gap-2">
              <button type="button" onClick={() => setSearchModalOpen(true)} className="hidden min-h-10 cursor-pointer items-center gap-2 rounded-lg border border-border/60 bg-muted/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:inline-flex" aria-label="Arama modalını aç (⌘K)"><svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg><span>Ne arıyorsun?</span><kbd className="rounded border border-border/80 bg-card px-1 py-0.5 font-mono text-[10px] text-muted-foreground">⌘K</kbd></button>
              <button type="button" onClick={() => setMobileMenuOpen((open) => !open)} className="min-h-10 min-w-10 cursor-pointer rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:hidden" aria-label={mobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'} aria-expanded={mobileMenuOpen} aria-controls="mobile-menu"><svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">{mobileMenuOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}</svg></button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && <div id="mobile-menu" className="fixed inset-x-0 top-14 z-50 max-h-[calc(100svh-3.5rem)] overflow-y-auto border-b border-border bg-background p-4 shadow-lg sm:top-15 md:hidden"><nav aria-label="Mobil navigasyon" className="flex flex-col gap-2"><Link href="/araclar" onClick={closeMenus} className={`flex min-h-11 items-center justify-between rounded-lg p-3 text-sm font-medium ${isActive('/araclar') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>Araçlar Kataloğu<span className="text-xs font-medium text-primary">Tüm Araçlar →</span></Link><Link href="/bilgi" onClick={closeMenus} className={`flex min-h-11 items-center justify-between rounded-lg p-3 text-sm font-medium ${isActive('/bilgi') ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'}`}>Bilgi Merkezi<span className="text-xs font-medium text-primary">Rehberler →</span></Link><div className="mt-2 border-t border-border/70 pt-4"><p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Ürünler</p><div className="grid gap-1">{productNavigation.map((product) => renderProduct(product, true))}</div></div><div className="mt-2 border-t border-border/70 pt-3"><button type="button" onClick={openLogin} className="flex min-h-11 w-full items-center justify-between rounded-lg p-3 text-left text-sm font-medium text-foreground hover:bg-muted/50">Giriş / Hesap<span className="text-xs font-medium text-primary">Aç →</span></button><Link href="/iletisim" onClick={closeMenus} className="flex min-h-11 items-center justify-between rounded-lg p-3 text-sm font-medium text-muted-foreground hover:bg-muted/50 hover:text-foreground">İletişim<span className="text-xs font-medium text-primary">Bize ulaşın →</span></Link><button type="button" onClick={() => { closeMenus(); setSearchModalOpen(true); }} className="mt-2 flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-foreground p-2.5 text-xs font-semibold text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 11-14 0z" /></svg>Hızlı Araç Bul</button></div></nav></div>}
      </header>
      <SearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />
      <LoginModal isOpen={loginOpen} onClose={() => { setLoginOpen(false); loginTriggerRef.current?.focus(); }} />
    </>
  );
}
