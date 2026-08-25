import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { calculateTrialInfo, type TrialInfo } from '@/lib/trial';
import { parseBusinessSettings } from '@/lib/business-settings';

/**
 * Checks if a given Supabase Auth User object has administrator privileges.
 */
export function checkIsAdmin(user: { id: string; email?: string | null; user_metadata?: Record<string, unknown> | null; app_metadata?: Record<string, unknown> | null } | null): boolean {
  if (!user || !user.email) return false;

  const email = user.email.toLowerCase().trim();

  // 1. Check ADMIN_EMAILS environment variable (comma separated)
  const envAdminEmails = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (envAdminEmails.includes(email)) {
    return true;
  }

  // 2. Default platform administrators
  const defaultAdmins = [
    'admin@pratika.com',
    'destek@pratika.com',
    'admin@pratika.app',
    'akardev@gmail.com',
  ];

  if (defaultAdmins.includes(email)) {
    return true;
  }

  // 3. Check metadata roles
  if (
    user.user_metadata?.role === 'admin' ||
    user.app_metadata?.role === 'admin' ||
    user.user_metadata?.is_admin === true ||
    user.app_metadata?.is_admin === true
  ) {
    return true;
  }

  return false;
}

/**
 * Server-side guard that ensures the caller is an authenticated admin.
 * Redirects non-admins to /panel or /login.
 */
export async function requireAdmin(): Promise<{ user: { id: string; email: string; user_metadata?: Record<string, unknown> } }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login?redirect=/admin');
  }

  if (!checkIsAdmin(user)) {
    redirect('/panel?error=unauthorized_admin');
  }

  return {
    user: {
      id: user.id,
      email: user.email || '',
      user_metadata: user.user_metadata,
    },
  };
}

export interface AdminDashboardStats {
  totalCustomers: number;
  activeBusinesses: number;
  totalBusinesses: number;
  trialCustomers: number;
  paidCustomers: number;
  activeMenus: number;
  totalProducts: number;
  totalCategories: number;
  pendingRequests: number;
  recentBusinesses: AdminBusinessSummary[];
}

export interface AdminBusinessSummary {
  id: string;
  userId: string;
  name: string;
  slug: string;
  businessType: string;
  phone: string | null;
  address: string | null;
  city: string | null;
  instagram: string | null;
  logoUrl: string | null;
  theme: string;
  createdAt: string;
  menuActive: boolean;
  productCount: number;
  categoryCount: number;
  trial: TrialInfo;
  userEmail?: string;
}

/**
 * Aggregates platform statistics for the Admin Dashboard from real Supabase tables.
 */
export async function getAdminDashboardData(): Promise<AdminDashboardStats> {
  const supabase = await createClient();

  // 1. Fetch all businesses
  const { data: businesses } = await supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false });

  const allBusinesses = businesses || [];

  // 2. Fetch all menus
  const { data: menus } = await supabase.from('menus').select('id, business_id, is_active');
  const allMenus = menus || [];

  // 3. Fetch all products & categories
  const { data: products } = await supabase.from('products').select('id, business_id, is_active');
  const allProducts = products || [];

  const { data: categories } = await supabase.from('categories').select('id, business_id');
  const allCategories = categories || [];

  // 4. Fetch pending contact requests (if table exists)
  let pendingRequests = 0;
  try {
    const { count } = await supabase
      .from('contact_requests')
      .select('*', { count: 'exact', head: true })
      .in('status', ['new', 'in_review']);
    pendingRequests = count || 0;
  } catch {
    pendingRequests = 0;
  }

  // Calculate unique customer user IDs
  const distinctUserIds = new Set<string>();
  allBusinesses.forEach((b) => {
    if (b.user_id) distinctUserIds.add(b.user_id);
  });

  // Calculate trials vs expired
  let trialCount = 0;
  allBusinesses.forEach((b) => {
    const t = calculateTrialInfo(b.created_at);
    if (!t.isExpired) trialCount++;
  });

  const activeMenusCount = allMenus.filter((m) => m.is_active).length;

  const recentSummaries: AdminBusinessSummary[] = allBusinesses.slice(0, 10).map((b) => {
    const settings = parseBusinessSettings(b);
    const linkedMenu = allMenus.find((m) => m.business_id === b.id);
    const prodCount = allProducts.filter((p) => p.business_id === b.id).length;
    const catCount = allCategories.filter((c) => c.business_id === b.id).length;
    const trial = calculateTrialInfo(b.created_at);

    return {
      id: b.id,
      userId: b.user_id,
      name: b.name,
      slug: b.slug,
      businessType: b.business_type || 'Kafe',
      phone: b.phone || null,
      address: b.address || null,
      city: b.address || null,
      instagram: b.instagram || null,
      logoUrl: b.logo_url || null,
      theme: settings.menu_theme,
      createdAt: b.created_at,
      menuActive: linkedMenu ? linkedMenu.is_active : true,
      productCount: prodCount,
      categoryCount: catCount,
      trial,
    };
  });

  return {
    totalCustomers: distinctUserIds.size,
    activeBusinesses: allBusinesses.length,
    totalBusinesses: allBusinesses.length,
    trialCustomers: trialCount,
    paidCustomers: 0, // Real honest count (no payment gateway attached yet)
    activeMenus: activeMenusCount,
    totalProducts: allProducts.length,
    totalCategories: allCategories.length,
    pendingRequests,
    recentBusinesses: recentSummaries,
  };
}

/**
 * Fetches the full list of customers and their associated businesses.
 */
export async function getAdminCustomersList(params?: { search?: string; filter?: string }): Promise<AdminBusinessSummary[]> {
  const supabase = await createClient();

  const { data: businesses } = await supabase
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: menus } = await supabase.from('menus').select('id, business_id, is_active');
  const { data: products } = await supabase.from('products').select('id, business_id');
  const { data: categories } = await supabase.from('categories').select('id, business_id');

  const allBusinesses = businesses || [];
  const allMenus = menus || [];
  const allProducts = products || [];
  const allCategories = categories || [];

  let list: AdminBusinessSummary[] = allBusinesses.map((b) => {
    const settings = parseBusinessSettings(b);
    const linkedMenu = allMenus.find((m) => m.business_id === b.id);
    const prodCount = allProducts.filter((p) => p.business_id === b.id).length;
    const catCount = allCategories.filter((c) => c.business_id === b.id).length;
    const trial = calculateTrialInfo(b.created_at);

    return {
      id: b.id,
      userId: b.user_id,
      name: b.name,
      slug: b.slug,
      businessType: b.business_type || 'Kafe',
      phone: b.phone || null,
      address: b.address || null,
      city: b.address || null,
      instagram: b.instagram || null,
      logoUrl: b.logo_url || null,
      theme: settings.menu_theme,
      createdAt: b.created_at,
      menuActive: linkedMenu ? linkedMenu.is_active : true,
      productCount: prodCount,
      categoryCount: catCount,
      trial,
    };
  });

  // Apply search query
  if (params?.search) {
    const q = params.search.toLowerCase().trim();
    list = list.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.slug.toLowerCase().includes(q) ||
        (item.phone && item.phone.toLowerCase().includes(q)) ||
        (item.city && item.city.toLowerCase().includes(q)) ||
        item.userId.toLowerCase().includes(q)
    );
  }

  // Apply filter
  if (params?.filter) {
    if (params.filter === 'trial') {
      list = list.filter((i) => !i.trial.isExpired);
    } else if (params.filter === 'expired') {
      list = list.filter((i) => i.trial.isExpired);
    } else if (params.filter === 'active') {
      list = list.filter((i) => i.menuActive);
    }
  }

  return list;
}

/**
 * Fetches detailed customer data including all linked business details, menu items, and translation counts.
 */
export async function getAdminCustomerDetail(customerId: string) {
  const supabase = await createClient();

  // Find business(es) belonging to customer ID (user_id) or business ID
  const { data: businesses } = await supabase
    .from('businesses')
    .select('*')
    .or(`user_id.eq.${customerId},id.eq.${customerId}`);

  if (!businesses || businesses.length === 0) {
    return null;
  }

  const primaryBusiness = businesses[0];
  const settings = parseBusinessSettings(primaryBusiness);

  // Fetch menu
  const { data: menu } = await supabase
    .from('menus')
    .select('*')
    .eq('business_id', primaryBusiness.id)
    .maybeSingle();

  // Fetch categories
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .eq('business_id', primaryBusiness.id)
    .order('position', { ascending: true });

  // Fetch products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('business_id', primaryBusiness.id)
    .order('position', { ascending: true });

  const catIds = (categories || []).map((c) => c.id);
  const prodIds = (products || []).map((p) => p.id);

  // Fetch translations
  const { data: catTrans } = catIds.length > 0
    ? await supabase.from('category_translations').select('*').in('category_id', catIds)
    : { data: [] };

  const { data: prodTrans } = prodIds.length > 0
    ? await supabase.from('product_translations').select('*').in('product_id', prodIds)
    : { data: [] };

  const trial = calculateTrialInfo(primaryBusiness.created_at);

  return {
    customer: {
      userId: primaryBusiness.user_id,
      createdAt: primaryBusiness.created_at,
    },
    business: {
      ...primaryBusiness,
      settings,
      theme: settings.menu_theme,
      show_menu_intro: settings.show_menu_intro,
    },
    menu: menu || null,
    categories: categories || [],
    products: products || [],
    categoryTranslations: catTrans || [],
    productTranslations: prodTrans || [],
    trial,
  };
}

/**
 * Fetches all contact & support requests from `contact_requests`.
 */
export async function getAdminRequestsList() {
  const supabase = await createClient();
  try {
    const { data: requests, error } = await supabase
      .from('contact_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return [];
    return requests || [];
  } catch {
    return [];
  }
}
