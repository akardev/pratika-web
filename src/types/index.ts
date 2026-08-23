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
}
