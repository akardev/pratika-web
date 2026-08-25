import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import PanelLayout from '@/components/panel/PanelLayout';
import PanelOnboarding from '@/components/panel/PanelOnboarding';

export default async function PanelPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/panel');
  }

  // 1. Fetch user's business
  const { data: business, error: businessError } = await supabase
    .from('businesses')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (businessError) {
    console.error('Error fetching business:', businessError);
  }

  // If user has no business, show Onboarding
  if (!business) {
    return (
      <div className="min-h-screen bg-slate-50 py-10">
        <PanelOnboarding />
      </div>
    );
  }

  // 2. Fetch or create menu
  let { data: menu } = await supabase
    .from('menus')
    .select('*')
    .eq('business_id', business.id)
    .order('position', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!menu) {
    const { data: newMenu } = await supabase
      .from('menus')
      .insert({
        business_id: business.id,
        name: 'Ana Menü',
        slug: 'ana-menu',
        is_active: true,
        position: 0,
      })
      .select()
      .single();

    menu = newMenu;
  }

  const menuId = menu?.id || '';
  const isMenuActive = menu ? menu.is_active : true;

  // 3. Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('business_id', business.id)
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });

  // 4. Fetch products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('business_id', business.id)
    .order('position', { ascending: true })
    .order('created_at', { ascending: true });

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

  return (
    <PanelLayout
      userEmail={user.email || ''}
      business={mergedBusiness}
      menuId={menuId}
      isMenuActive={isMenuActive}
      categories={categories || []}
      products={products || []}
    />
  );
}
