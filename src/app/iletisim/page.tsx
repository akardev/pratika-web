import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pratika | İletişim',
  description: 'Pratika ile iletişime geçin. Görüş, öneri, araç talebi veya hata bildirimlerinizi bizimle paylaşın.',
};

export default function IletisimPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          İletişim
        </h1>
        <p className="text-lg text-muted-foreground">
          Görüş, öneri, yeni araç talepleri veya karşılaştığınız hataları bildirmek için bize ulaşabilirsiniz.
        </p>
      </div>

      <div className="prose prose-slate max-w-none space-y-8 text-foreground/90">
        <section className="p-6 rounded-xl border border-border/60 bg-card">
          <h2 className="text-xl font-semibold text-foreground mb-3">Geri Bildirim ve Destek</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Pratika üzerindeki hesaplama araçlarını kullanıcılarımızın ihtiyaçlarına göre sürekli geliştiriyoruz. Platformla ilgili herhangi bir sorunuz, eklenmesini istediğiniz bir hesaplama aracı veya düzeltilmesini önerdiğiniz bir hata varsa bizimle paylaşabilirsiniz.
          </p>
          <div className="p-4 rounded-lg bg-muted/40 border border-border/40 text-sm text-muted-foreground">
            İletişim kanallarımız ve geri bildirim formumuz çok yakında bu sayfa üzerinden kullanıma sunulacaktır.
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Hangi Konularda Ulaşabilirsiniz?</h2>
          <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
            <li>Hesaplama araçlarında fark ettiğiniz olası hata veya uyuşmazlıklar</li>
            <li>Yeni hesaplama ve dönüştürücü aracı önerileri</li>
            <li>Kullanıcı deneyimi ve arayüz geliştirme tavsiyeleri</li>
            <li>Telif hakkı, yasal bildirimler veya genel sorular</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
