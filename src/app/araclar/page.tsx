import { Metadata } from 'next';
import ToolsCatalog from '@/components/tools/ToolsCatalog';

export const metadata: Metadata = {
  title: 'Araçlar | Pratika',
  description: "Pratika'daki tüm hesaplama ve online araçları keşfedin.",
};

export default function AraclarPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
          Araçlar
        </h1>
        <p className="text-base text-muted-foreground">
          İhtiyacınız olan hesaplama ve dönüşüm aracını bulun.
        </p>
      </div>

      <ToolsCatalog />
    </div>
  );
}
