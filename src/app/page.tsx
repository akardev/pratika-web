import SearchBar from '@/components/ui/SearchBar';
import CategoryCard from '@/components/ui/CategoryCard';
import ToolCard from '@/components/ui/ToolCard';
import { categories, tools } from '@/data/tools';

export default function Home() {
  const popularTools = tools.slice(0, 4); // Show top 4 tools as popular

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="bg-muted/30 py-20 px-4 sm:px-6 lg:px-8 border-b">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6">
            Aradığın sonucu saniyeler içinde bul.
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Pratika, finans, eğitim, teknoloji ve günlük hayatta ihtiyaç duyduğunuz tüm hesaplama ve dönüşüm araçlarını tek bir yerde sunar.
          </p>
          
          <SearchBar />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Kategoriler</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Tools Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/10 border-t">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Popüler Araçlar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {popularTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
