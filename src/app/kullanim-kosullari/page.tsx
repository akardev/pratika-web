import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullanım Koşulları | Pratika',
  description: 'Pratika Kullanım Koşulları. Platformumuzun sunduğu hesaplama araçlarının kullanım şartları ve yasal sorumluluk sınırları.',
  alternates: {
    canonical: '/kullanim-kosullari',
  },
};

export default function KullanimKosullariPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          Kullanım Koşulları
        </h1>
        <p className="text-sm text-muted-foreground">
          Son güncellenme: 2026
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">1. Hizmetin Kapsamı</h2>
          <p>
            Pratika, kullanıcılara günlük, finansal ve matematiksel hesaplamaları kolaylaştırmak amacıyla çeşitli çevrim içi hesaplama araçları sunan bir web platformudur. Sitemizi ziyaret ederek bu kullanım koşullarını kabul etmiş sayılırsınız.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">2. Araçların Kullanımı</h2>
          <p>
            Platformda yer alan tüm araçlar yalnızca kişisel ve bilgi edinme amaçlı kullanıma yöneliktir. Araçların tersine mühendislikle kopyalanması, kötü niyetli otomatik sorgularla sistemin aşırı yüklenmesi veya yasa dışı amaçlarla kullanılması yasaktır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">3. Kullanıcının Sorumlulukları</h2>
          <p>
            Hesaplama araçlarına girilen verilerin doğruluğu tamamen kullanıcının sorumluluğundadır. Yanlış veya eksik girilen verilerden kaynaklanan hatalı sonuçlardan Pratika sorumlu tutulamaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">4. Hesaplama Sonuçlarının Niteliği</h2>
          <p>
            Pratika üzerindeki tüm hesaplama sonuçları yalnızca genel bilgilendirme ve tahmin amaçlıdır. Bu sonuçlar hiçbir şekilde resmi mali, vergisel, hukuki, yatırım veya muhasebe danışmanlığı niteliği taşımaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">5. İçeriklerin Doğruluğu ve Güncelliği</h2>
          <p>
            Hesaplama formülleri ve açıklamaları genel kabul görmüş matematiksel ve sektörel kurallara göre titizlikle hazırlanmaktadır. Ancak mevzuat değişiklikleri, piyasa koşulları veya teknik nedenlerle oluşabilecek eksikliklerden dolayı platform herhangi bir garanti vermez.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">6. Hizmette Yapılabilecek Değişiklikler</h2>
          <p>
            Pratika, önceden bildirimde bulunmaksızın sunduğu araçları güncelleme, değiştirme, geçici olarak durdurma veya yayından kaldırma hakkını saklı tutar.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">7. Fikri Mülkiyet</h2>
          <p>
            Pratika web sitesinde yer alan tasarım, logo, arayüz bileşenleri, metinler ve yazılım kodları fikri mülkiyet mevzuatına tabidir ve izinsiz çoğaltılamaz veya ticari amaçla kullanılamaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">8. Sorumluluk Sınırları</h2>
          <p>
            Pratika, hesaplama araçlarının kullanımından veya kullanılamamasından doğabilecek doğrudan veya dolaylı maddi ya da manevi zararlardan ötürü hiçbir koşulda sorumlu tutulamaz. Resmi ve ticari işlemlerinizde ilgili yetkili kurumlardan ve uzmanlardan onay almanız tavsiye edilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">9. Kullanım Koşullarındaki Değişiklikler</h2>
          <p>
            Pratika, bu kullanım koşullarını dilediği zaman güncelleme hakkına sahiptir. Güncellenen koşullar sitede yayınlandığı andan itibaren geçerlilik kazanır.
          </p>
        </section>
      </div>
    </div>
  );
}
