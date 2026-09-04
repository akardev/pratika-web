import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/80 bg-card mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Sol: Pratika & Açıklama */}
          <div className="md:col-span-1 space-y-3">
            <Logo variant="wordmark" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              Hesaplama, dönüştürme ve günlük dijital işlemler için hızlı, sade ve güvenilir araçlar platformu.
            </p>
          </div>

          {/* Sağ: Link Grupları */}
          <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 text-xs">
            {/* ARAÇLAR */}
            <div>
              <h3 className="font-semibold text-foreground tracking-tight mb-3">
                Araçlar & Rehberler
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <Link href="/araclar" className="hover:text-foreground transition-colors">
                    Tüm Araçlar Kataloğu
                  </Link>
                </li>
                <li>
                  <Link href="/kategoriler" className="hover:text-foreground transition-colors">
                    Tüm Kategoriler
                  </Link>
                </li>
                <li>
                  <Link href="/tarihte-bugun" className="hover:text-foreground transition-colors">
                    Tarihte Bugün
                  </Link>
                </li>
                <li>
                  <Link href="/bilgi" className="hover:text-foreground transition-colors">
                    Bilgi Merkezi
                  </Link>
                </li>
                <li>
                  <Link href="/arac/kdv-hesaplama" className="hover:text-foreground transition-colors">
                    KDV Hesaplama
                  </Link>
                </li>
                <li>
                  <Link href="/arac/pdf-jpg-donusturucu" className="hover:text-foreground transition-colors">
                    PDF → JPG Dönüştürücü
                  </Link>
                </li>
                <li>
                  <Link href="/arac/qr-kod-olusturucu" className="hover:text-foreground transition-colors">
                    QR Kod Oluşturucu
                  </Link>
                </li>
              </ul>
            </div>

            {/* KURUMSAL */}
            <div>
              <h3 className="font-semibold text-foreground tracking-tight mb-3">
                Kurumsal
              </h3>
              <ul className="space-y-2 text-muted-foreground">
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
              <h3 className="font-semibold text-foreground tracking-tight mb-3">
                Yasal & Şartlar
              </h3>
              <ul className="space-y-2 text-muted-foreground">
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
                    Hesaplama Araçları Bildirimi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Alt Çubuk */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground text-center sm:text-left">
          <p>
            © {currentYear} Pratika ·{' '}
            <a
              href="https://akardev.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors underline-offset-4 hover:underline"
            >
              AkarDev Digital Solutions
            </a>
          </p>
          <p className="text-xs text-muted-foreground/80">
            Kullanıcı odaklı dijital araç ekosistemi.
          </p>
        </div>
      </div>
    </footer>
  );
}
