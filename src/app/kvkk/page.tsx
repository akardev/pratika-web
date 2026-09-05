import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni',
  description: 'Pratiksel 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamındaki aydınlatma metni.',
  alternates: {
    canonical: '/kvkk',
  },
};

export default function KvkkPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          KVKK Aydınlatma Metni
        </h1>
        <p className="text-sm text-muted-foreground">
          6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Bilgilendirme
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-6 text-sm text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">1. Veri Sorumlusu</h2>
          <p>
            Bu aydınlatma metni, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca, Pratiksel platformunun işletilmesine ve ziyaretçilerine ilişkin kişisel veri işleme faaliyetleri hakkında bilgi vermek amacıyla hazırlanmıştır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">2. İşlenen Kişisel Veriler</h2>
          <p>
            Pratiksel, kullanıcıların hesaplama araçlarına girdiği sayısal veya takvimsel verileri (örneğin fiyat, indirim oranı, doğum tarihi vb.) sunucularında kaydetmez ve işlemez; tüm hesaplama işlemleri kullanıcının kendi tarayıcısında (istemci tarafında) anlık olarak gerçekleşir. Siteyi ziyaret ettiğinizde yalnızca internet sitesi güvenliği ve teknik işleyiş için gerekli olan temel trafik ve sunucu log verileri otomatik yöntemlerle işlenebilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">3. Kişisel Verilerin İşlenme Amaçları</h2>
          <p>
            Toplanan sınırlı teknik veriler; web sitesinin güvenliğinin sağlanması, sistem performansının optimize edilmesi ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla işlenir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">4. Kişisel Verilerin Aktarılması</h2>
          <p>
            Kişisel verileriniz, mevzuatın zorunlu kıldığı durumlar veya yetkili kamu kurum ve kuruluşlarının talepleri haricinde üçüncü taraflarla paylaşılmaz veya ticari amaçla devredilmez.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">5. Veri Toplama Yöntemi ve Hukuki Sebebi</h2>
          <p>
            Teknik veriler, web sitesini ziyaretiniz sırasında elektronik ortamda otomatik yöntemlerle toplanmaktadır. Bu faaliyetler, KVKK&apos;nın 5. maddesinde belirtilen &ldquo;veri sorumlusunun hukuki yükümlülüğünü yerine getirebilmesi için zorunlu olması&rdquo; ve &ldquo;ilgili kişinin temel hak ve özgürlüklerine zarar vermemek kaydıyla, veri sorumlusunun meşru menfaatleri için veri işlenmesinin zorunlu olması&rdquo; hukuki sebeplerine dayanmaktadır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">6. Saklama Süresi</h2>
          <p>
            Teknik log kayıtları, ilgili mevzuatta öngörülen süreler boyunca saklanır ve sürenin sona ermesiyle birlikte güvenli şekilde imha edilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">7. İlgili Kişinin Hakları</h2>
          <p className="mb-2">
            KVKK&apos;nın 11. maddesi uyarınca, veri sahipleri veri sorumlusuna başvurarak aşağıdaki haklara sahiptir:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Kişisel verilerinin işlenip işlenmediğini öğrenme,</li>
            <li>Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,</li>
            <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
            <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,</li>
            <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,</li>
            <li>Kanun&apos;un 7. maddesinde öngörülen şartlar çerçevesinde kişisel verilerin silinmesini veya yok edilmesini isteme.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground mb-2">8. İletişim</h2>
          <p>
            KVKK kapsamındaki haklarınızı kullanmak veya haklarınızla ilgili detaylı bilgi almak için platformumuzun iletişim sayfası üzerinden başvuruda bulunabilirsiniz.
          </p>
        </section>
      </div>
    </div>
  );
}
