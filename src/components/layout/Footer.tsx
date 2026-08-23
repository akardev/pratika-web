import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-8 sm:py-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 sm:gap-12 mb-8">
          {/* Sol: Pratika & Açıklama */}
          <div className="max-w-xs space-y-2">
            <Link href="/" className="text-lg font-bold tracking-tight text-foreground">
              Pratika
            </Link>
            <p className="text-xs text-muted-foreground leading-relaxed">
              İhtiyacınız olan hesaplamaları hızlı, sade ve güvenilir şekilde yapın.
            </p>
          </div>

          {/* Sağ: Link Grupları */}
          <div className="flex flex-wrap gap-8 sm:gap-12 text-xs">
            {/* ARAÇLAR */}
            <div>
              <h3 className="font-semibold text-foreground uppercase tracking-wider mb-2.5">
                Araçlar
              </h3>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>
                  <Link href="/" className="hover:text-foreground transition-colors">
                    Tüm Araçlar
                  </Link>
                </li>
              </ul>
            </div>

            {/* KURUMSAL */}
            <div>
              <h3 className="font-semibold text-foreground uppercase tracking-wider mb-2.5">
                Kurumsal
              </h3>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>
                  <Link href="/hakkimizda" className="hover:text-foreground transition-colors">
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link href="/iletisim" className="hover:text-foreground transition-colors">
                    İletişim
                  </Link>
                </li>
              </ul>
            </div>

            {/* YASAL */}
            <div>
              <h3 className="font-semibold text-foreground uppercase tracking-wider mb-2.5">
                Yasal
              </h3>
              <ul className="space-y-1.5 text-muted-foreground">
                <li>
                  <Link href="/gizlilik" className="hover:text-foreground transition-colors">
                    Gizlilik Politikası
                  </Link>
                </li>
                <li>
                  <Link href="/kvkk" className="hover:text-foreground transition-colors">
                    KVKK Aydınlatma
                  </Link>
                </li>
                <li>
                  <Link href="/cerez-politikasi" className="hover:text-foreground transition-colors">
                    Çerez Politikası
                  </Link>
                </li>
                <li>
                  <Link href="/kullanim-kosullari" className="hover:text-foreground transition-colors">
                    Kullanım Koşulları
                  </Link>
                </li>
                <li>
                  <Link href="/hesaplama-uyarisi" className="hover:text-foreground transition-colors">
                    Hesaplama Araçları Hakkında
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Alt Çubuk */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© {currentYear} Pratika. Tüm hakları saklıdır.</p>
          <p className="text-xs text-muted-foreground/80">
            <a href="#" className="hover:text-foreground transition-colors">akardev</a> tarafından geliştirilmiştir.
          </p>
        </div>
      </div>
    </footer>
  );
}



