import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hesaplama Araçları Bildirimi',
  description: 'Pratika hesaplama araçlarının kullanım amacı, doğruluk standartları ve yasal bilgilendirme notları.',
  alternates: {
    canonical: '/hesaplama-uyarisi',
  },
};

export default function HesaplamaUyarisiPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          Hesaplama Araçları Hakkında
        </h1>
        <p className="text-lg text-muted-foreground">
          Pratika üzerindeki araçların kullanım amacı ve hesaplama sonuçlarının niteliğine ilişkin bilgilendirme.
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-foreground/90">
        <section className="p-6 rounded-xl border border-border/60 bg-card">
          <h2 className="text-xl font-semibold text-foreground mb-3">Bilgilendirme ve Pratik Kullanım</h2>
          <p className="text-muted-foreground leading-relaxed">
            Pratika üzerindeki tüm hesaplama araçları; günlük yaşamda, alışverişte ve iş süreçlerinde pratik, hızlı ve anlaşılır fikir vermesi amacıyla geliştirilmiştir. Sunulan sonuçlar bilgilendirme niteliğindedir.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Değişen Oranlar ve Mevzuat</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Finans, vergi, çalışma hayatı, SGK ve mevzuat gibi alanlardaki resmi katsayılar, oranlar ve yasal düzenlemeler zaman içerisinde ilgili kamu kurumları tarafından güncellenebilir.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Pratika olarak araçlarımızı güncel tutmak için azami özeni gösteriyor olsak da, bağlayıcı resmi başvurular, yasal sözleşmeler veya vergi beyanlarında daima yürürlükteki mevzuat ve resmi kurum duyuruları esas alınmalıdır.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Uzman Görüşünün Önemi</h2>
          <p className="text-muted-foreground leading-relaxed">
            Önemli ticari, mali veya hukuki kararlar almadan önce ilgili alanında yetkili mali müşavir, avukat veya uzman profesyonellerden birebir danışmanlık almanız tavsiye edilir.
          </p>
        </section>
      </div>
    </div>
  );
}
