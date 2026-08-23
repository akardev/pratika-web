import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Çerez Politikası | Pratika',
  description: 'Pratika Çerez Politikası. Web sitemizde kullanılan çerezler ve bunların kullanım amaçları hakkında bilgilendirme.',
  alternates: {
    canonical: '/cerez-politikasi',
  },
};

export default function CerezPolitikasiPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          Çerez Politikası
        </h1>
        <p className="text-sm text-muted-foreground">
          Son güncellenme: 2026
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">1. Çerez (Cookie) Nedir?</h2>
          <p>
            Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcınız aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır. Çerezler web sitesinin düzgün çalışmasını sağlamak, güvenliği artırmak ve kullanıcı deneyimini iyileştirmek amacıyla kullanılır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">2. Çerez Türleri</h2>
          <div className="space-y-3 pt-1">
            <div className="p-4 rounded-lg bg-card border border-border/60">
              <h3 className="font-semibold text-foreground text-sm mb-1">Zorunlu (Teknik) Çerezler</h3>
              <p className="text-xs text-muted-foreground">
                Web sitesinin temel fonksiyonlarının çalışması ve güvenliğinin sağlanması için zorunlu olan çerezlerdir. Bu çerezler olmadan web sitesi düzgün çalışamaz.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border/60">
              <h3 className="font-semibold text-foreground text-sm mb-1">Performans ve Analitik Çerezler</h3>
              <p className="text-xs text-muted-foreground">
                Ziyaretçilerin web sitesini nasıl kullandığını anlamak ve site performansını ölçümlemek amacıyla kullanılan anonim istatistik çerezleridir.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border/60">
              <h3 className="font-semibold text-foreground text-sm mb-1">Reklam ve Pazarlama Çerezleri</h3>
              <p className="text-xs text-muted-foreground">
                Ziyaretçilerin ilgi alanlarına göre hedeflenmiş reklamlar göstermek amacıyla kullanılan çerezlerdir.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">3. Pratika&apos;da Çerez Kullanımı</h2>
          <p>
            Pratika şu anda üçüncü taraf reklam, pazarlama veya kullanıcı takip çerezleri kullanmamaktadır. Yalnızca web sitesinin hızlı ve güvenli şekilde sunulmasını sağlayan temel teknik mekanizmalar işletilmektedir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">4. Çerezlerin Yönetimi ve Silinmesi</h2>
          <p>
            Kullanıcılar tarayıcı ayarlarını değiştirerek çerezleri diledikleri zaman engelleyebilir veya silebilirler. Çerezlerin engellenmesi web sitelerinin bazı temel işlevlerini etkileyebilir.
          </p>
        </section>
      </div>
    </div>
  );
}
