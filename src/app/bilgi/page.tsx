import { Metadata } from 'next';
import KnowledgeList from '@/components/knowledge/KnowledgeList';

export const metadata: Metadata = {
  title: 'Bilgi Merkezi | Pratika',
  description: 'Hesaplamalar, finans ve günlük konular hakkında anlaşılır ve pratik bilgiler.',
};

export default function BilgiMerkeziPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
          Bilgi Merkezi
        </h1>
        <p className="text-base text-muted-foreground">
          Hesaplamalar, finans ve günlük konular hakkında anlaşılır ve pratik bilgiler.
        </p>
      </div>

      <KnowledgeList />
    </div>
  );
}
