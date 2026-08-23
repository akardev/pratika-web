import Link from 'next/link';
import Logo from '@/components/ui/Logo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo variant="wordmark" />
          </div>
          
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/araclar" className="text-muted-foreground transition-colors hover:text-foreground">
              Araçlar
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

