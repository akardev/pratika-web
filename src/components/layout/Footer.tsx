import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="text-xl font-bold tracking-tight text-foreground">
              Pratika
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              İhtiyacınız olan hesaplamaları hızlı ve kolayca yapın.
            </p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/arac/indirim-hesaplama" className="hover:text-foreground transition-colors">
              İndirim Hesaplama
            </Link>
            <Link href="/hakkimizda" className="hover:text-foreground transition-colors">
              Hakkımızda
            </Link>
            <Link href="/iletisim" className="hover:text-foreground transition-colors">
              İletişim
            </Link>
            <Link href="/gizlilik" className="hover:text-foreground transition-colors">
              Gizlilik
            </Link>
            <Link href="/kullanim-kosullari" className="hover:text-foreground transition-colors">
              Kullanım Koşulları
            </Link>
          </nav>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/40 text-center text-xs text-muted-foreground">
          <p>
            © {currentYear} Pratika · <a href="#" className="hover:text-foreground transition-colors">Akardev</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

