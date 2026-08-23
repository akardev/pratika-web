import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold tracking-tight text-primary">
                Pratika
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Günlük hayatınızı kolaylaştıran modern araçlar ve hesaplama platformu. Aradığınız sonucu saniyeler içinde bulun.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-foreground transition-colors">Tüm Araçlar</Link></li>
              <li><Link href="/kategori/finans" className="hover:text-foreground transition-colors">Finans Araçları</Link></li>
              <li><Link href="/kategori/it" className="hover:text-foreground transition-colors">IT Araçları</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Kurumsal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/hakkimizda" className="hover:text-foreground transition-colors">Hakkımızda</Link></li>
              <li><Link href="/iletisim" className="hover:text-foreground transition-colors">İletişim</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Yasal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/gizlilik" className="hover:text-foreground transition-colors">Gizlilik Politikası</Link></li>
              <li><Link href="/kullanim-kosullari" className="hover:text-foreground transition-colors">Kullanım Koşulları</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© {currentYear} Pratika. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
