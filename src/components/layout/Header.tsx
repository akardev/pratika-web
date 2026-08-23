import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight text-primary">
                Pratika
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/kategori/finans" className="transition-colors hover:text-primary">Finans</Link>
            <Link href="/kategori/maas-ve-calisma" className="transition-colors hover:text-primary">Maaş & Çalışma</Link>
            <Link href="/kategori/donusturuculer" className="transition-colors hover:text-primary">Dönüştürücüler</Link>
            <Link href="/kategori/it" className="transition-colors hover:text-primary">IT</Link>
          </nav>

          <div className="flex items-center">
            {/* Future auth/user menu space */}
          </div>
        </div>
      </div>
    </header>
  );
}
