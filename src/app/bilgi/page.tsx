import { Metadata } from 'next';
import Link from 'next/link';
import KnowledgeList from '@/components/knowledge/KnowledgeList';

export const metadata: Metadata = {
  title: 'Bilgi Merkezi',
  description: 'Hesaplamalar, finans ve günlük konular hakkında anlaşılır, formüllü ve pratik rehber içerikleri.',
  alternates: {
    canonical: '/bilgi',
  },
};

export default function BilgiMerkeziPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-5xl">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border/60 mb-3">
          <span>Pratika Rehberleri</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3">
          Bilgi Merkezi
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Hesaplamalar, finans, iş ve günlük konular hakkında anlaşılır, formüllü ve pratik rehberler.
        </p>
        <Link
          href="/tarihte-bugun"
          className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
        >
          Tarihte Bugün’ü keşfet <span aria-hidden="true">→</span>
        </Link>
      </div>

      <KnowledgeList />
    </div>
  );
}
