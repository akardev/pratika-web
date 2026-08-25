import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PublicMenu from '@/components/public-menu/PublicMenu';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: business } = await supabase
    .from('businesses')
    .select('name, description')
    .eq('slug', slug)
    .maybeSingle();

  if (!business) {
    return {
      title: 'Menü Bulunamadı | Pratika QR',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${business.name} | QR Menü`,
    description: business.description || `${business.name} dijital QR menüsü.`,
    robots: { index: true, follow: true },
  };
}

export default async function PublicMenuPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  // 1. Fetch business
  const { data: business, error: businessError } = await supabase
    .from('businesses')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (businessError || !business) {
    notFound();
  }

  // 2. Fetch menu status & settings
  const { data: menu } = await supabase
    .from('menus')
    .select('*')
    .eq('business_id', business.id)
    .order('position', { ascending: true })
    .limit(1)
    .maybeSingle();

  const isMenuActive = menu ? menu.is_active : true;
  const { parseBusinessSettings } = await import('@/lib/business-settings');
  const settings = parseBusinessSettings(business);

  const mergedBusiness = {
    ...business,
    description: settings.descriptionText,
    menu_theme: settings.menu_theme,
    show_menu_intro: settings.show_menu_intro,
    welcome_message: settings.welcome_message,
    slogan: settings.slogan,
    working_hours: settings.working_hours,
  };

  // 3. Fetch active categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('business_id', business.id)
    .eq('is_active', true)
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });

  // 4. Fetch active products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('business_id', business.id)
    .eq('is_active', true)
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });

  // 5. Fetch translations for active categories & products only
  const categoryIds = (categories || []).map((c) => c.id);
  const productIds = (products || []).map((p) => p.id);

  const { data: categoryTranslations } = categoryIds.length > 0
    ? await supabase
        .from('category_translations')
        .select('*')
        .in('category_id', categoryIds)
    : { data: [] };

  const { data: productTranslations } = productIds.length > 0
    ? await supabase
        .from('product_translations')
        .select('*')
        .in('product_id', productIds)
    : { data: [] };

  const { getTranslationStatus } = await import('@/lib/business-settings');

  // Filter out any unapproved/pending AI translations from public view
  const approvedCategoryTranslations = (categoryTranslations || []).filter(
    (t: { status?: string | null; base_hash?: string | null; is_manual?: boolean | null }) => {
      const status = getTranslationStatus(t);
      return status === 'manual' || status === 'ai_approved';
    }
  );

  const approvedProductTranslations = (productTranslations || []).filter(
    (t: { status?: string | null; base_hash?: string | null; is_manual?: boolean | null }) => {
      const status = getTranslationStatus(t);
      return status === 'manual' || status === 'ai_approved';
    }
  );

  return (
    <PublicMenu
      business={mergedBusiness}
      isMenuActive={isMenuActive}
      categories={categories || []}
      products={products || []}
      categoryTranslations={approvedCategoryTranslations}
      productTranslations={approvedProductTranslations}
    />
  );
}
