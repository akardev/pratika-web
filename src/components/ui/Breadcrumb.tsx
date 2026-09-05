import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center text-xs text-muted-foreground mb-6 overflow-x-auto whitespace-nowrap py-1 ${className}`}
    >
      <ol
        className="inline-flex items-center space-x-1.5 sm:space-x-2"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <li
          className="inline-flex items-center"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link
            href="/"
            className="hover:text-foreground transition-colors font-medium"
            itemProp="item"
          >
            <span itemProp="name">Pratiksel</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, index) => {
          const position = index + 2;
          const isLast = index === items.length - 1;

          return (
            <li
              key={index}
              className="inline-flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <span className="mx-1 text-muted-foreground/60 select-none">/</span>
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-foreground transition-colors font-medium"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span
                  className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-xs"
                  itemProp="name"
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={position.toString()} />
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
