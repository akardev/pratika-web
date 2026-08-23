import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sayfa Bulunamadı | Pratika',
  description: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20 flex-1 flex flex-col items-center justify-center text-center max-w-lg">
      <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center text-foreground font-mono font-bold text-2xl mb-6 shadow-xs border border-border">
        404
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
        Sayfa Bulunamadı
      </h1>
      <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
        Aradığınız sayfa yayından kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
        <Link
          href="/"
          className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xs"
        >
          Ana Sayfaya Dön
        </Link>
        <Link
          href="/araclar"
          className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 transition-all"
        >
          Tüm Araçlar
        </Link>
        <Link
          href="/bilgi"
          className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold rounded-lg border border-border bg-card text-foreground hover:bg-muted/40 transition-all"
        >
          Bilgi Merkezi
        </Link>
      </div>
    </div>
  );
}
