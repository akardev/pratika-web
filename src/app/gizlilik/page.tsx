import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'Pratika Gizlilik Politikası. Kullanıcı verilerinin korunması ve gizlilik standartlarımız hakkında bilgi edinin.',
  alternates: {
    canonical: '/gizlilik',
  },
};

export default function GizlilikPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          Gizlilik Politikası
        </h1>
        <p className="text-sm text-muted-foreground">
          Son güncellenme: 2026
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">1. Genel Yaklaşımımız</h2>
          <p>
            Pratika olarak kullanıcılarımızın gizliliğine ve kişisel verilerinin korunmasına büyük önem veriyoruz. Bu Gizlilik Politikası, platformumuzu ziyaret ettiğinizde ve hesaplama araçlarımızı kullandığınızda verilerinizin nasıl ele alındığını açıklamaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">2. Hesaplama Verileri ve Güvenlik</h2>
          <p>
            Pratika üzerindeki araçlara (örneğin İndirim, Yüzde veya Yaş Hesaplama) girdiğiniz veriler, hesaplamaların tamamı tarayıcınız üzerinde (istemci tarafında) gerçekleştirildiği için sunucularımıza kaydedilmez ve saklanmaz. Girdiğiniz tutar, oran veya doğum tarihi gibi bilgiler yalnızca hesaplama sonucunu üretmek için anlık olarak kullanılır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">3. Toplanan Bilgiler</h2>
          <p>
            Platformumuzda üyelik, bülten aboneliği veya kullanıcı hesabı zorunluluğu bulunmamaktadır. Web sitesinin temel teknik çalışması için standart sunucu erişim logları dışında kişisel veri toplanmamaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">4. Üçüncü Taraf Bağlantıları</h2>
          <p>
            Sitemiz üzerinden üçüncü taraf web sitelerine veya kaynaklara bağlantılar verilebilir. Bu sitelerin gizlilik uygulamalarından Pratika sorumlu değildir. İlgili sitelerin kendi gizlilik politikalarını incelemenizi tavsiye ederiz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">5. Değişiklikler</h2>
          <p>
            Pratika, gizlilik politikasını platforma yeni özellikler veya araçlar eklendikçe güncelleme hakkını saklı tutar. Güncellenmiş politika bu sayfa üzerinden yayınlandığı tarihte yürürlüğe girer.
          </p>
        </section>
      </div>
    </div>
  );
}
