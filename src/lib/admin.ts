import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseAdmin } from '@supabase/supabase-js';
import { calculateTrialInfo, type TrialInfo } from '@/lib/trial';
import { parseBusinessSettings } from '@/lib/business-settings';

/**
 * Creates a Supabase Admin client with service role key if available, or falls back to anon key.
 * This runs ONLY on the server.
 */
export function getAdminSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || '';

  if (serviceKey) {
    return createSupabaseAdmin(url, serviceKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return createSupabaseAdmin(url, anonKey);
}

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
 * Redirects non-admins to /admin/login or /admin/unauthorized.
 */
export async function requireAdmin(): Promise<{ user: { id: string; email: string; user_metadata?: Record<string, unknown> } }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/admin/login?redirect=/admin');
  }

  if (!checkIsAdmin(user)) {
    redirect('/admin/unauthorized');
  }

  return {
    user: {
      id: user.id,
      email: user.email || '',
      user_metadata: user.user_metadata,
    },
  };
}

export interface AdminUserBusinessSummary {
  id: string;
  name: string;
  slug: string;
  businessType: string;
  phone: string | null;
  city: string | null;
  logoUrl: string | null;
  theme: string;
  menuActive: boolean;
  productCount: number;
  categoryCount: number;
  translationCount: number;
  trial: TrialInfo;
  createdAt: string;
}

export interface AdminUserRecord {
  id: string; // auth.user id
  email: string;
  fullName: string;
  role: 'admin' | 'customer';
  status: 'active' | 'suspended';
  createdAt: string;
  lastSignInAt: string | null;
  businesses: AdminUserBusinessSummary[];
  primaryBusiness: AdminUserBusinessSummary | null;
}

export interface AdminDashboardStats {
  totalUsers: number;
  adminCount: number;
  usersWithBusiness: number;
  usersWithoutBusiness: number;
  activeBusinesses: number;
  totalBusinesses: number;
  activeTrials: number;
  expiredTrials: number;
  paidCustomers: number;
  activeMenus: number;
  totalProducts: number;
  totalCategories: number;
  pendingRequests: number;
  recentUsers: AdminUserRecord[];
}

/**
 * Fetches all users from Supabase (Auth + Profiles + Businesses) and builds full User <-> Business relation.
 */
export async function getAllAdminUsers(): Promise<AdminUserRecord[]> {
  const adminDb = getAdminSupabaseClient();

  // 1. Fetch businesses using admin DB client to bypass per-user RLS
  const { data: businesses } = await adminDb
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false });
  const allBusinesses = businesses || [];

  // 2. Fetch menus, products, categories
  const { data: menus } = await adminDb.from('menus').select('id, business_id, is_active');
  const { data: products } = await adminDb.from('products').select('id, business_id');
  const { data: categories } = await adminDb.from('categories').select('id, business_id');

  const allMenus = menus || [];
  const allProducts = products || [];
  const allCategories = categories || [];

  // 3. Fetch profiles if table exists
  let profiles: Array<{ id: string; email?: string; full_name?: string; role?: string; status?: string; created_at?: string; last_sign_in_at?: string }> = [];
  try {
    const { data: profData } = await adminDb.from('profiles').select('*');
    if (profData) {
      profiles = profData;
    }
  } catch {
    profiles = [];
  }

  // 4. Try fetching Supabase Auth users via Admin client if service key exists
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const authUsersMap = new Map<string, { id: string; email?: string; user_metadata?: Record<string, unknown>; created_at: string; last_sign_in_at?: string | null }>();

  if (serviceKey) {
    try {
      const { data: authList } = await adminDb.auth.admin.listUsers();
      if (authList?.users) {
        for (const u of authList.users) {
          authUsersMap.set(u.id, {
            id: u.id,
            email: u.email,
            user_metadata: u.user_metadata,
            created_at: u.created_at,
            last_sign_in_at: u.last_sign_in_at,
          });
        }
      }
    } catch (e) {
      console.warn('Auth admin listUsers fallback:', e);
    }
  }

  // Unified Map of Users by userId
  const userMap = new Map<string, AdminUserRecord>();

  // Helper to add or merge a user
  const registerUser = (id: string, email: string, fullName: string, roleInput?: string, createdAt?: string, lastSignIn?: string | null) => {
    if (!id) return;
    const existing = userMap.get(id);

    const emailNorm = email || existing?.email || '';
    const isAdminRole = checkIsAdmin({ id, email: emailNorm, user_metadata: { role: roleInput } });
    const finalRole: 'admin' | 'customer' = isAdminRole ? 'admin' : (roleInput === 'admin' ? 'admin' : 'customer');

    if (existing) {
      if (email && !existing.email) existing.email = email;
      if (fullName && !existing.fullName) existing.fullName = fullName;
      if (roleInput) existing.role = finalRole;
      if (lastSignIn) existing.lastSignInAt = lastSignIn;
      return;
    }

    userMap.set(id, {
      id,
      email: emailNorm,
      fullName: fullName || emailNorm.split('@')[0] || 'Kullanıcı',
      role: finalRole,
      status: 'active',
      createdAt: createdAt || new Date().toISOString(),
      lastSignInAt: lastSignIn || null,
      businesses: [],
      primaryBusiness: null,
    });
  };

  // Populate from Auth users map
  authUsersMap.forEach((u) => {
    registerUser(
      u.id,
      u.email || '',
      (u.user_metadata?.full_name as string) || '',
      (u.user_metadata?.role as string) || undefined,
      u.created_at,
      u.last_sign_in_at
    );
  });

  // Populate from profiles table
  profiles.forEach((p) => {
    registerUser(
      p.id,
      p.email || '',
      p.full_name || '',
      p.role,
      p.created_at,
      p.last_sign_in_at
    );
  });

  // Populate from businesses table (guarantees business owners exist even before triggers)
  allBusinesses.forEach((b) => {
    if (b.user_id) {
      registerUser(
        b.user_id,
        '', // Email will be inferred or resolved
        b.name || '',
        'customer',
        b.created_at
      );
    }
  });

  // Associate businesses with users
  allBusinesses.forEach((b) => {
    const userId = b.user_id;
    if (!userId) return;

    const user = userMap.get(userId);
    if (!user) return;

    const settings = parseBusinessSettings(b);
    const linkedMenu = allMenus.find((m) => m.business_id === b.id);
    const prodCount = allProducts.filter((p) => p.business_id === b.id).length;
    const catCount = allCategories.filter((c) => c.business_id === b.id).length;
    const trial = calculateTrialInfo(b.created_at);

    const bSummary: AdminUserBusinessSummary = {
      id: b.id,
      name: b.name,
      slug: b.slug,
      businessType: b.business_type || 'Kafe',
      phone: b.phone || null,
      city: b.address || null,
      logoUrl: b.logo_url || null,
      theme: settings.menu_theme,
      menuActive: linkedMenu ? linkedMenu.is_active : true,
      productCount: prodCount,
      categoryCount: catCount,
      translationCount: 0,
      trial,
      createdAt: b.created_at,
    };

    user.businesses.push(bSummary);
    if (!user.primaryBusiness) {
      user.primaryBusiness = bSummary;
    }
  });

  // Convert map to sorted array (newest first)
  const userList = Array.from(userMap.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return userList;
}

/**
 * Aggregates platform statistics for the Admin Dashboard from real Supabase tables.
 */
export async function getAdminDashboardData(): Promise<AdminDashboardStats> {
  const adminDb = getAdminSupabaseClient();
  const allUsers = await getAllAdminUsers();

  // 1. Fetch businesses & menus
  const { data: businesses } = await adminDb.from('businesses').select('*');
  const allBusinesses = businesses || [];

  const { data: menus } = await adminDb.from('menus').select('id, business_id, is_active');
  const allMenus = menus || [];

  const { data: products } = await adminDb.from('products').select('id');
  const allProducts = products || [];

  const { data: categories } = await adminDb.from('categories').select('id');
  const allCategories = categories || [];

  // 2. Fetch pending contact requests
  let pendingRequests = 0;
  try {
    const { count } = await adminDb
      .from('contact_requests')
      .select('*', { count: 'exact', head: true })
      .in('status', ['new', 'in_review']);
    pendingRequests = count || 0;
  } catch {
    pendingRequests = 0;
  }

  // Count trials
  let activeTrials = 0;
  let expiredTrials = 0;

  allBusinesses.forEach((b) => {
    const trial = calculateTrialInfo(b.created_at);
    if (trial.isExpired) {
      expiredTrials++;
    } else {
      activeTrials++;
    }
  });

  const adminCount = allUsers.filter((u) => u.role === 'admin').length;
  const usersWithBusiness = allUsers.filter((u) => u.businesses.length > 0).length;
  const usersWithoutBusiness = allUsers.filter((u) => u.businesses.length === 0).length;
  const activeMenusCount = allMenus.filter((m) => m.is_active).length;

  return {
    totalUsers: allUsers.length,
    adminCount,
    usersWithBusiness,
    usersWithoutBusiness,
    activeBusinesses: allBusinesses.length,
    totalBusinesses: allBusinesses.length,
    activeTrials,
    expiredTrials,
    paidCustomers: 0,
    activeMenus: activeMenusCount,
    totalProducts: allProducts.length,
    totalCategories: allCategories.length,
    pendingRequests,
    recentUsers: allUsers.slice(0, 10),
  };
}

/**
 * Fetches filtered and searched users list for /admin/customers.
 */
export async function getAdminCustomersList(params?: { search?: string; filter?: string }): Promise<AdminUserRecord[]> {
  let list = await getAllAdminUsers();

  // Search filter
  if (params?.search) {
    const q = params.search.toLowerCase().trim();
    list = list.filter(
      (u) =>
        u.fullName.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        u.businesses.some((b) => b.name.toLowerCase().includes(q) || b.slug.toLowerCase().includes(q))
    );
  }

  // Tab filter
  if (params?.filter) {
    if (params.filter === 'admin') {
      list = list.filter((u) => u.role === 'admin');
    } else if (params.filter === 'customer') {
      list = list.filter((u) => u.role === 'customer');
    } else if (params.filter === 'with_business') {
      list = list.filter((u) => u.businesses.length > 0);
    } else if (params.filter === 'no_business') {
      list = list.filter((u) => u.businesses.length === 0);
    } else if (params.filter === 'active') {
      list = list.filter((u) => u.status === 'active');
    }
  }

  return list;
}

export interface AdminBusinessListItem {
  id: string;
  userId: string;
  name: string;
  slug: string;
  businessType: string;
  phone: string | null;
  city: string | null;
  logoUrl: string | null;
  theme: string;
  menuActive: boolean;
  productCount: number;
  categoryCount: number;
  trial: TrialInfo;
  createdAt: string;
}

/**
 * Fetches businesses list for /admin/businesses and /admin/subscriptions.
 */
export async function getAdminBusinessesList(params?: { search?: string; filter?: string }): Promise<AdminBusinessListItem[]> {
  const adminDb = getAdminSupabaseClient();

  const { data: businesses } = await adminDb
    .from('businesses')
    .select('*')
    .order('created_at', { ascending: false });

  const { data: menus } = await adminDb.from('menus').select('id, business_id, is_active');
  const { data: products } = await adminDb.from('products').select('id, business_id');
  const { data: categories } = await adminDb.from('categories').select('id, business_id');

  const allBusinesses = businesses || [];
  const allMenus = menus || [];
  const allProducts = products || [];
  const allCategories = categories || [];

  let list: AdminBusinessListItem[] = allBusinesses.map((b) => {
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
      city: b.address || null,
      logoUrl: b.logo_url || null,
      theme: settings.menu_theme,
      menuActive: linkedMenu ? linkedMenu.is_active : true,
      productCount: prodCount,
      categoryCount: catCount,
      trial,
      createdAt: b.created_at,
    };
  });

  if (params?.search) {
    const q = params.search.toLowerCase().trim();
    list = list.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.slug.toLowerCase().includes(q) ||
        (b.phone && b.phone.toLowerCase().includes(q)) ||
        (b.city && b.city.toLowerCase().includes(q))
    );
  }

  if (params?.filter) {
    if (params.filter === 'active') {
      list = list.filter((b) => b.menuActive);
    } else if (params.filter === 'trial') {
      list = list.filter((b) => !b.trial.isExpired);
    } else if (params.filter === 'expired') {
      list = list.filter((b) => b.trial.isExpired);
    }
  }

  return list;
}

/**
 * Fetches single customer details by userId or businessId.
 */
export async function getAdminCustomerDetail(targetId: string) {
  const adminDb = getAdminSupabaseClient();
  const allUsers = await getAllAdminUsers();

  // Find user by userId or by owning business ID
  let user = allUsers.find((u) => u.id === targetId);
  if (!user) {
    user = allUsers.find((u) => u.businesses.some((b) => b.id === targetId));
  }

  if (!user) {
    // If not found in user map, try single query from businesses
    const { data: bList } = await adminDb.from('businesses').select('*').eq('id', targetId);
    if (bList && bList.length > 0) {
      const b = bList[0];
      user = allUsers.find((u) => u.id === b.user_id);
    }
  }

  if (!user) {
    return null;
  }

  // If user has business, fetch deep details of primary business
  const primaryBusinessSummary = user.primaryBusiness;
  if (!primaryBusinessSummary) {
    return {
      user,
      business: null,
      menu: null,
      categories: [],
      products: [],
      categoryTranslations: [],
      productTranslations: [],
      trial: null,
    };
  }

  const { data: fullBusiness } = await adminDb
    .from('businesses')
    .select('*')
    .eq('id', primaryBusinessSummary.id)
    .single();

  const settings = parseBusinessSettings(fullBusiness || {});

  const { data: menu } = await adminDb
    .from('menus')
    .select('*')
    .eq('business_id', primaryBusinessSummary.id)
    .maybeSingle();

  const { data: categories } = await adminDb
    .from('categories')
    .select('*')
    .eq('business_id', primaryBusinessSummary.id)
    .order('position', { ascending: true });

  const { data: products } = await adminDb
    .from('products')
    .select('*')
    .eq('business_id', primaryBusinessSummary.id)
    .order('position', { ascending: true });

  const catIds = (categories || []).map((c: { id: string }) => c.id);
  const prodIds = (products || []).map((p: { id: string }) => p.id);

  const { data: catTrans } = catIds.length > 0
    ? await adminDb.from('category_translations').select('*').in('category_id', catIds)
    : { data: [] };

  const { data: prodTrans } = prodIds.length > 0
    ? await adminDb.from('product_translations').select('*').in('product_id', prodIds)
    : { data: [] };

  const trial = calculateTrialInfo(fullBusiness?.created_at || user.createdAt);

  return {
    user,
    business: {
      ...fullBusiness,
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

/**
 * Records an entry into `admin_audit_logs`.
 */
export async function logAdminAction(params: {
  actorId?: string;
  actorEmail: string;
  action: string;
  targetType: string;
  targetId?: string;
  details?: Record<string, unknown>;
}) {
  try {
    const supabase = await createClient();
    await supabase.from('admin_audit_logs').insert({
      actor_id: params.actorId || null,
      actor_email: params.actorEmail,
      action: params.action,
      target_type: params.targetType,
      target_id: params.targetId || null,
      details: params.details || {},
      created_at: new Date().toISOString(),
    });
  } catch (e) {
    console.warn('Audit log write error (graceful):', e);
  }
}
