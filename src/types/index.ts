export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon?: string;
}

export interface Tool {
  id: string;
  slug: string;
  title: string;
  description: string;
  categoryId: string;
  icon?: string;
  status: 'active' | 'coming-soon' | 'maintenance';
  keywords?: string[];
}
export interface ArticleSection {
  heading?: string;
  paragraphs: string[];
  formula?: string;
  example?: {
    title: string;
    items: { label: string; value: string }[];
  };
  note?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  relatedToolSlug?: string;
  keywords?: string[];
  readTime?: string;
  publishedAt?: string;
  sections: ArticleSection[];
}
