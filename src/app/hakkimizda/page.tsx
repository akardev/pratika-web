import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'Pratiksel hakkında bilgi edinin. Günlük ve profesyonel hayatı kolaylaştıran hızlı, sade ve güvenilir online hesaplama platformu.',
  alternates: {
    canonical: '/hakkimizda',
  },
};

export default function HakkimizdaPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          Hakkımızda
        </h1>
        <p className="text-lg text-muted-foreground">
          Pratiksel, günlük ve profesyonel hayatta ihtiyaç duyulan hesaplamaları hızlı, sade ve güvenilir şekilde yapabilmeniz için geliştirilmiştir.
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-foreground/90">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Neden Pratiksel?</h2>
          <p className="text-muted-foreground leading-relaxed">
            İnternette basit bir hesaplama yapmak istediğinizde; karmaşık arayüzler, yanıltıcı reklamlar ve gereksiz form kalabalığıyla karşılaşmak kullanıcı deneyimini zorlaştırır. Pratiksel, doğrudan sonuca odaklanan modern bir yaklaşımla bu süreci kolaylaştırmayı amaçlar.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Temel İlkelerimiz</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <h3 className="text-base font-semibold text-foreground mb-1">Hızlı ve Sade</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Gereksiz adımlar ve reklam kalabalığı olmadan, ihtiyacınız olan sonuca saniyeler içinde ulaşın.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <h3 className="text-base font-semibold text-foreground mb-1">Doğru ve Şeffaf</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Her hesaplamanın formülünü ve mantığını açıkça göstererek şeffaf bir deneyim sunuyoruz.
              </p>
            </div>
            <div className="p-5 rounded-xl border border-border/60 bg-card">
              <h3 className="text-base font-semibold text-foreground mb-1">Mobil Uyumlu</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Telefon, tablet veya bilgisayarınızda kusursuz çalışan esnek ve hafif bir arayüz.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Sürekli Gelişim</h2>
          <p className="text-muted-foreground leading-relaxed">
            Pratiksel; finans, matematik, zaman, iş ve günlük yaşam alanlarında yeni araçlarla sürekli genişleyen bağımsız bir hesaplama platformudur. Kullanıcılarımızın geri bildirimleri doğrultusunda araçlarımızı geliştirmeye ve yeni pratik çözümler sunmaya devam ediyoruz.
          </p>
        </section>
      </div>
    </div>
  );
}
