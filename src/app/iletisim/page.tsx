import type { Metadata } from 'next';
import ContactPageContent from '@/components/contact/ContactPageContent';

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Görüş, öneri, destek talepleriniz veya Pratiksel ürünleri hakkında bilgi almak için bizimle iletişime geçebilirsiniz.',
  alternates: { canonical: '/iletisim' },
};

export default function IletisimPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mb-9 max-w-3xl">
        <span className="mb-4 inline-flex items-center text-xs font-bold uppercase tracking-[0.18em] text-primary">Pratiksel İletişim</span>
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">İletişim</h1>
        <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">Görüş, öneri, destek talepleriniz veya Pratiksel ürünleri hakkında bilgi almak için bizimle iletişime geçebilirsiniz.</p>
      </div>
      <ContactPageContent />
    </div>
  );
}
