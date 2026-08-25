-- supabase_schema_complete.sql
-- COMPLETE, IDEMPOTENT, PRODUCTION-READY SCHEMA FOR PRATIKA PRO QR MENU

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. BILLING PLANS AND ENTITLEMENTS
CREATE TABLE IF NOT EXISTS public.billing_plans (
  code text PRIMARY KEY,
  display_name text NOT NULL,
  description text,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.plan_entitlements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  plan_code text REFERENCES public.billing_plans(code) ON DELETE CASCADE NOT NULL,
  feature_key text NOT NULL,
  entitlement_type text NOT NULL CHECK (entitlement_type IN ('feature', 'quota')),
  is_enabled boolean NOT NULL DEFAULT false,
  limit_value integer,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(plan_code, feature_key),
  CHECK (limit_value IS NULL OR limit_value >= 0),
  CHECK ((entitlement_type = 'feature' AND limit_value IS NULL) OR (entitlement_type = 'quota' AND limit_value IS NOT NULL))
);

CREATE TABLE IF NOT EXISTS public.entitlement_grants (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  feature_key text NOT NULL,
  entitlement_type text NOT NULL CHECK (entitlement_type IN ('feature', 'quota')),
  grant_mode text NOT NULL DEFAULT 'add' CHECK (grant_mode IN ('add', 'override')),
  is_enabled boolean NOT NULL DEFAULT true,
  limit_value integer,
  source text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  starts_at timestamp with time zone,
  expires_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  CHECK (limit_value IS NULL OR limit_value >= 0),
  CHECK ((entitlement_type = 'feature' AND limit_value IS NULL) OR (entitlement_type = 'quota' AND limit_value IS NOT NULL)),
  CHECK (expires_at IS NULL OR starts_at IS NULL OR expires_at > starts_at)
);

-- Subscriptions. The legacy plan column remains for compatibility;
-- plan_code is the authoritative billing plan reference.
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan text NOT NULL DEFAULT 'FREE',
  plan_code text REFERENCES public.billing_plans(code) NOT NULL DEFAULT 'FREE',
  status text NOT NULL DEFAULT 'active',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- Businesses
CREATE TABLE IF NOT EXISTS public.businesses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  logo_url text,
  business_type text,
  phone text,
  address text,
  instagram text,
  default_lang text DEFAULT 'tr',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Menus
CREATE TABLE IF NOT EXISTS public.menus (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  position integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(business_id, slug),
  UNIQUE(id, business_id) -- Required for strict composite FK from categories
);

-- Categories
CREATE TABLE IF NOT EXISTS public.categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid NOT NULL,
  menu_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  position integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  FOREIGN KEY (menu_id, business_id) REFERENCES public.menus(id, business_id) ON DELETE CASCADE,
  UNIQUE(id, menu_id, business_id) -- Required for strict composite FK from products
);

-- Products
CREATE TABLE IF NOT EXISTS public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid NOT NULL,
  menu_id uuid NOT NULL,
  category_id uuid NOT NULL,
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  image_url text,
  position integer DEFAULT 0,
  is_active boolean DEFAULT true,
  tags jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  FOREIGN KEY (category_id, menu_id, business_id) REFERENCES public.categories(id, menu_id, business_id) ON DELETE CASCADE
);

-- Category Translations
CREATE TABLE IF NOT EXISTS public.category_translations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE NOT NULL,
  lang_code text NOT NULL,
  name text NOT NULL,
  description text,
  is_manual boolean DEFAULT false,
  base_hash text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(category_id, lang_code)
);

-- Product Translations
CREATE TABLE IF NOT EXISTS public.product_translations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  lang_code text NOT NULL,
  name text NOT NULL,
  description text,
  is_manual boolean DEFAULT false,
  base_hash text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(product_id, lang_code)
);

-- Seed the supported products and their feature/quota entitlements.
INSERT INTO public.billing_plans (code, display_name, description, is_active)
VALUES
  ('FREE', 'Pratika Free', 'Free tools without QR Menu SaaS access.', true),
  ('PRO', 'Pratika Pro', 'Pro tools plus one gifted QR Menu business.', true),
  ('QR', 'Pratika QR', 'QR Menu SaaS with two business entitlements.', true),
  ('QR_BUSINESS', 'Pratika QR Business', 'Future higher-volume QR Menu package.', false)
ON CONFLICT (code) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description;

-- Backward-compatible subscription migration from the former plan column.
ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS plan_code text;

UPDATE public.subscriptions
SET plan_code = CASE
  WHEN upper(plan) = 'PRO' THEN 'PRO'
  WHEN upper(plan) = 'QR' THEN 'QR'
  WHEN upper(plan) = 'QR_BUSINESS' THEN 'QR_BUSINESS'
  ELSE 'FREE'
END
WHERE plan_code IS NULL;

ALTER TABLE public.subscriptions
  ALTER COLUMN plan_code SET DEFAULT 'FREE',
  ALTER COLUMN plan_code SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'subscriptions_plan_code_fkey'
      AND conrelid = 'public.subscriptions'::regclass
  ) THEN
    ALTER TABLE public.subscriptions
      ADD CONSTRAINT subscriptions_plan_code_fkey
      FOREIGN KEY (plan_code) REFERENCES public.billing_plans(code);
  END IF;
END $$;

INSERT INTO public.plan_entitlements (plan_code, feature_key, entitlement_type, is_enabled, limit_value)
VALUES
  ('FREE', 'tools.pro.access', 'feature', false, NULL),
  ('FREE', 'qr.business.create', 'feature', false, NULL),
  ('FREE', 'qr.business.limit', 'quota', false, 0),
  ('FREE', 'qr.translation', 'feature', false, NULL),
  ('FREE', 'qr.storage', 'feature', false, NULL),
  ('FREE', 'qr.live_preview', 'feature', false, NULL),
  ('FREE', 'qr.theme.customize', 'feature', false, NULL),
  ('FREE', 'qr.public_menu', 'feature', false, NULL),
  ('PRO', 'tools.pro.access', 'feature', true, NULL),
  ('PRO', 'qr.business.create', 'feature', true, NULL),
  ('PRO', 'qr.business.limit', 'quota', true, 1),
  ('PRO', 'qr.translation', 'feature', true, NULL),
  ('PRO', 'qr.storage', 'feature', true, NULL),
  ('PRO', 'qr.live_preview', 'feature', true, NULL),
  ('PRO', 'qr.theme.customize', 'feature', true, NULL),
  ('PRO', 'qr.public_menu', 'feature', true, NULL),
  ('QR', 'tools.pro.access', 'feature', false, NULL),
  ('QR', 'qr.business.create', 'feature', true, NULL),
  ('QR', 'qr.business.limit', 'quota', true, 2),
  ('QR', 'qr.translation', 'feature', true, NULL),
  ('QR', 'qr.storage', 'feature', true, NULL),
  ('QR', 'qr.live_preview', 'feature', true, NULL),
  ('QR', 'qr.theme.customize', 'feature', true, NULL),
  ('QR', 'qr.public_menu', 'feature', true, NULL),
  ('QR_BUSINESS', 'tools.pro.access', 'feature', false, NULL),
  ('QR_BUSINESS', 'qr.business.create', 'feature', true, NULL),
  ('QR_BUSINESS', 'qr.business.limit', 'quota', true, 10),
  ('QR_BUSINESS', 'qr.translation', 'feature', true, NULL),
  ('QR_BUSINESS', 'qr.storage', 'feature', true, NULL),
  ('QR_BUSINESS', 'qr.live_preview', 'feature', true, NULL),
  ('QR_BUSINESS', 'qr.theme.customize', 'feature', true, NULL),
  ('QR_BUSINESS', 'qr.public_menu', 'feature', true, NULL)
ON CONFLICT (plan_code, feature_key) DO UPDATE SET
  entitlement_type = EXCLUDED.entitlement_type,
  is_enabled = EXCLUDED.is_enabled,
  limit_value = EXCLUDED.limit_value;

-- 3. ENTITLEMENT RESOLUTION AND ATOMIC QUOTA ENFORCEMENT
CREATE OR REPLACE FUNCTION public.get_user_entitlement_boolean(
  p_user_id uuid,
  p_feature_key text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  active_plan_code text;
  base_value boolean := false;
  override_value boolean;
  add_value boolean := false;
BEGIN
  SELECT s.plan_code
  INTO active_plan_code
  FROM public.subscriptions s
  JOIN public.billing_plans bp ON bp.code = s.plan_code AND bp.is_active = true
  WHERE s.user_id = p_user_id AND s.status = 'active'
  LIMIT 1;

  IF active_plan_code IS NULL THEN
    active_plan_code := 'FREE';
  END IF;

  SELECT pe.is_enabled
  INTO base_value
  FROM public.plan_entitlements pe
  WHERE pe.plan_code = active_plan_code
    AND pe.feature_key = p_feature_key
    AND pe.entitlement_type = 'feature';

  SELECT eg.is_enabled
  INTO override_value
  FROM public.entitlement_grants eg
  WHERE eg.user_id = p_user_id
    AND eg.feature_key = p_feature_key
    AND eg.entitlement_type = 'feature'
    AND eg.grant_mode = 'override'
    AND eg.status = 'active'
    AND (eg.starts_at IS NULL OR eg.starts_at <= now())
    AND (eg.expires_at IS NULL OR eg.expires_at > now())
  ORDER BY eg.created_at DESC
  LIMIT 1;

  SELECT EXISTS (
    SELECT 1
    FROM public.entitlement_grants eg
    WHERE eg.user_id = p_user_id
      AND eg.feature_key = p_feature_key
      AND eg.entitlement_type = 'feature'
      AND eg.grant_mode = 'add'
      AND eg.is_enabled = true
      AND eg.status = 'active'
      AND (eg.starts_at IS NULL OR eg.starts_at <= now())
      AND (eg.expires_at IS NULL OR eg.expires_at > now())
  )
  INTO add_value;

  IF override_value IS NOT NULL THEN
    RETURN override_value;
  END IF;

  RETURN COALESCE(base_value, false) OR add_value;
END;
$$;

CREATE OR REPLACE FUNCTION public.get_user_entitlement_limit(
  p_user_id uuid,
  p_feature_key text
)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
DECLARE
  active_plan_code text;
  base_limit integer := 0;
  override_limit integer;
  additive_limit integer := 0;
BEGIN
  SELECT s.plan_code
  INTO active_plan_code
  FROM public.subscriptions s
  JOIN public.billing_plans bp ON bp.code = s.plan_code AND bp.is_active = true
  WHERE s.user_id = p_user_id AND s.status = 'active'
  LIMIT 1;

  IF active_plan_code IS NULL THEN
    active_plan_code := 'FREE';
  END IF;

  SELECT pe.limit_value
  INTO base_limit
  FROM public.plan_entitlements pe
  WHERE pe.plan_code = active_plan_code
    AND pe.feature_key = p_feature_key
    AND pe.entitlement_type = 'quota';

  SELECT MAX(eg.limit_value)
  INTO override_limit
  FROM public.entitlement_grants eg
  WHERE eg.user_id = p_user_id
    AND eg.feature_key = p_feature_key
    AND eg.entitlement_type = 'quota'
    AND eg.grant_mode = 'override'
    AND eg.status = 'active'
    AND (eg.starts_at IS NULL OR eg.starts_at <= now())
    AND (eg.expires_at IS NULL OR eg.expires_at > now());

  SELECT COALESCE(SUM(eg.limit_value), 0)
  INTO additive_limit
  FROM public.entitlement_grants eg
  WHERE eg.user_id = p_user_id
    AND eg.feature_key = p_feature_key
    AND eg.entitlement_type = 'quota'
    AND eg.grant_mode = 'add'
    AND eg.status = 'active'
    AND (eg.starts_at IS NULL OR eg.starts_at <= now())
    AND (eg.expires_at IS NULL OR eg.expires_at > now());

  RETURN COALESCE(override_limit, base_limit, 0) + additive_limit;
END;
$$;

CREATE OR REPLACE FUNCTION public.enforce_business_quota()
RETURNS TRIGGER AS $$
DECLARE
  business_count integer;
  business_limit integer;
BEGIN
  -- Serialize concurrent business inserts for the same user.
  PERFORM pg_advisory_xact_lock(hashtextextended(NEW.user_id::text, 0));

  IF NOT public.get_user_entitlement_boolean(NEW.user_id, 'qr.business.create') THEN
    RAISE EXCEPTION 'UPGRADE_REQUIRED: QR business entitlement is required.';
  END IF;

  business_limit := public.get_user_entitlement_limit(NEW.user_id, 'qr.business.limit');
  SELECT count(*) INTO business_count
  FROM public.businesses
  WHERE user_id = NEW.user_id;

  IF business_count >= business_limit THEN
    RAISE EXCEPTION 'QUOTA_EXCEEDED: QR business quota exceeded.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_temp;

REVOKE ALL ON FUNCTION public.get_user_entitlement_boolean(uuid, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_user_entitlement_limit(uuid, text) FROM PUBLIC;

DROP TRIGGER IF EXISTS check_business_quota ON public.businesses;
CREATE TRIGGER check_business_quota
BEFORE INSERT ON public.businesses
FOR EACH ROW EXECUTE FUNCTION public.enforce_business_quota();

-- 4. ENABLE RLS
ALTER TABLE public.billing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entitlement_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_translations ENABLE ROW LEVEL SECURITY;

-- 5. DROP EXISTING POLICIES (Idempotency)
-- Billing plans and entitlements
DROP POLICY IF EXISTS "Public can view active billing plans" ON public.billing_plans;
DROP POLICY IF EXISTS "Authenticated can view active plan entitlements" ON public.plan_entitlements;
DROP POLICY IF EXISTS "Users can view own entitlement grants" ON public.entitlement_grants;
-- Subscriptions
DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can delete own subscription" ON public.subscriptions;
-- Businesses
DROP POLICY IF EXISTS "Users can view own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can insert own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can update own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can delete own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Public can view businesses" ON public.businesses;
-- Menus
DROP POLICY IF EXISTS "Users can view own menus" ON public.menus;
DROP POLICY IF EXISTS "Users can insert own menus" ON public.menus;
DROP POLICY IF EXISTS "Users can update own menus" ON public.menus;
DROP POLICY IF EXISTS "Users can delete own menus" ON public.menus;
DROP POLICY IF EXISTS "Public can view active menus" ON public.menus;
-- Categories
DROP POLICY IF EXISTS "Users can view own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can insert own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can update own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can delete own categories" ON public.categories;
DROP POLICY IF EXISTS "Public can view active categories" ON public.categories;
-- Products
DROP POLICY IF EXISTS "Users can view own products" ON public.products;
DROP POLICY IF EXISTS "Users can insert own products" ON public.products;
DROP POLICY IF EXISTS "Users can update own products" ON public.products;
DROP POLICY IF EXISTS "Users can delete own products" ON public.products;
DROP POLICY IF EXISTS "Public can view active products" ON public.products;
-- Category Translations
DROP POLICY IF EXISTS "Users can view own category_translations" ON public.category_translations;
DROP POLICY IF EXISTS "Users can insert own category_translations" ON public.category_translations;
DROP POLICY IF EXISTS "Users can update own category_translations" ON public.category_translations;
DROP POLICY IF EXISTS "Users can delete own category_translations" ON public.category_translations;
DROP POLICY IF EXISTS "Public can view active category_translations" ON public.category_translations;
-- Product Translations
DROP POLICY IF EXISTS "Users can view own product_translations" ON public.product_translations;
DROP POLICY IF EXISTS "Users can insert own product_translations" ON public.product_translations;
DROP POLICY IF EXISTS "Users can update own product_translations" ON public.product_translations;
DROP POLICY IF EXISTS "Users can delete own product_translations" ON public.product_translations;
DROP POLICY IF EXISTS "Public can view active product_translations" ON public.product_translations;

-- 6. ADMIN POLICIES (Ownership based on auth.uid())

-- Billing plans and plan entitlements are read-only to clients.
CREATE POLICY "Public can view active billing plans"
ON public.billing_plans FOR SELECT
USING (is_active = true);

CREATE POLICY "Authenticated can view active plan entitlements"
ON public.plan_entitlements FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.billing_plans bp
    WHERE bp.code = plan_entitlements.plan_code
      AND bp.is_active = true
  )
);

CREATE POLICY "Users can view own entitlement grants"
ON public.entitlement_grants FOR SELECT
USING (auth.uid() = user_id);

-- Subscriptions
-- ONLY SELECT is allowed for users. Server-side service roles bypass RLS to perform INSERT/UPDATE.
CREATE POLICY "Users can view own subscription" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

-- Businesses
CREATE POLICY "Users can view own businesses" ON public.businesses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own businesses" ON public.businesses FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own businesses" ON public.businesses FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own businesses" ON public.businesses FOR DELETE USING (auth.uid() = user_id);

-- Menus
CREATE POLICY "Users can view own menus" ON public.menus FOR SELECT USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = menus.business_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can insert own menus" ON public.menus FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = menus.business_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can update own menus" ON public.menus FOR UPDATE USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = menus.business_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can delete own menus" ON public.menus FOR DELETE USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = menus.business_id AND b.user_id = auth.uid()));

-- Categories
CREATE POLICY "Users can view own categories" ON public.categories FOR SELECT USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = categories.business_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can insert own categories" ON public.categories FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = categories.business_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can update own categories" ON public.categories FOR UPDATE USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = categories.business_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can delete own categories" ON public.categories FOR DELETE USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = categories.business_id AND b.user_id = auth.uid()));

-- Products
CREATE POLICY "Users can view own products" ON public.products FOR SELECT USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = products.business_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can insert own products" ON public.products FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = products.business_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can update own products" ON public.products FOR UPDATE USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = products.business_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can delete own products" ON public.products FOR DELETE USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = products.business_id AND b.user_id = auth.uid()));

-- Category Translations
CREATE POLICY "Users can view own category_translations" ON public.category_translations FOR SELECT USING (EXISTS (SELECT 1 FROM public.categories c JOIN public.businesses b ON c.business_id = b.id WHERE c.id = category_translations.category_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can insert own category_translations" ON public.category_translations FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.categories c JOIN public.businesses b ON c.business_id = b.id WHERE c.id = category_translations.category_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can update own category_translations" ON public.category_translations FOR UPDATE USING (EXISTS (SELECT 1 FROM public.categories c JOIN public.businesses b ON c.business_id = b.id WHERE c.id = category_translations.category_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can delete own category_translations" ON public.category_translations FOR DELETE USING (EXISTS (SELECT 1 FROM public.categories c JOIN public.businesses b ON c.business_id = b.id WHERE c.id = category_translations.category_id AND b.user_id = auth.uid()));

-- Product Translations
CREATE POLICY "Users can view own product_translations" ON public.product_translations FOR SELECT USING (EXISTS (SELECT 1 FROM public.products p JOIN public.businesses b ON p.business_id = b.id WHERE p.id = product_translations.product_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can insert own product_translations" ON public.product_translations FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.products p JOIN public.businesses b ON p.business_id = b.id WHERE p.id = product_translations.product_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can update own product_translations" ON public.product_translations FOR UPDATE USING (EXISTS (SELECT 1 FROM public.products p JOIN public.businesses b ON p.business_id = b.id WHERE p.id = product_translations.product_id AND b.user_id = auth.uid()));
CREATE POLICY "Users can delete own product_translations" ON public.product_translations FOR DELETE USING (EXISTS (SELECT 1 FROM public.products p JOIN public.businesses b ON p.business_id = b.id WHERE p.id = product_translations.product_id AND b.user_id = auth.uid()));


-- 7. PUBLIC POLICIES (Secure access for anonymous QR menu scans)
-- NO direct public read policy on businesses.
-- View for safe public business data
DROP VIEW IF EXISTS public.public_businesses;
CREATE VIEW public.public_businesses AS
SELECT id, name, slug, description, logo_url, business_type, phone, address, instagram, default_lang, created_at, updated_at
FROM public.businesses
WHERE EXISTS (
  SELECT 1 
  FROM public.menus 
  WHERE menus.business_id = businesses.id 
  AND menus.is_active = true
);
GRANT SELECT ON public.public_businesses TO anon;
GRANT SELECT ON public.public_businesses TO authenticated;

-- Active Public Menus
CREATE POLICY "Public can view active menus" ON public.menus FOR SELECT USING (is_active = true);

-- Active Public Categories (Must belong to active menu)
CREATE POLICY "Public can view active categories" ON public.categories FOR SELECT USING (
  is_active = true AND 
  EXISTS (SELECT 1 FROM public.menus m WHERE m.id = categories.menu_id AND m.is_active = true)
);

-- Active Public Products (Must belong to active category and active menu)
CREATE POLICY "Public can view active products" ON public.products FOR SELECT USING (
  is_active = true AND 
  EXISTS (
    SELECT 1 FROM public.categories c 
    JOIN public.menus m ON c.menu_id = m.id 
    WHERE c.id = products.category_id AND c.is_active = true AND m.is_active = true
  )
);

-- Active Public Category Translations
CREATE POLICY "Public can view active category_translations" ON public.category_translations FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.categories c 
    JOIN public.menus m ON c.menu_id = m.id 
    WHERE c.id = category_translations.category_id AND c.is_active = true AND m.is_active = true
  )
);

-- Active Public Product Translations
CREATE POLICY "Public can view active product_translations" ON public.product_translations FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.products p
    JOIN public.categories c ON p.category_id = c.id
    JOIN public.menus m ON p.menu_id = m.id 
    WHERE p.id = product_translations.product_id AND p.is_active = true AND c.is_active = true AND m.is_active = true
  )
);

-- 8. STORAGE POLICIES
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Users can update media" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete media" ON storage.objects;
DROP POLICY IF EXISTS "Business owner can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Business owner can update media" ON storage.objects;
DROP POLICY IF EXISTS "Business owner can delete media" ON storage.objects;

-- Read Access
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'media' );

-- Write Access (Auth user owns business_id = folder name)
CREATE POLICY "Business owner can upload media" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'media' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] IN (
    SELECT id::text FROM public.businesses WHERE user_id = auth.uid()
  )
);
CREATE POLICY "Business owner can update media" ON storage.objects FOR UPDATE USING (
  bucket_id = 'media' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] IN (
    SELECT id::text FROM public.businesses WHERE user_id = auth.uid()
  )
);
CREATE POLICY "Business owner can delete media" ON storage.objects FOR DELETE USING (
  bucket_id = 'media' 
  AND auth.role() = 'authenticated'
  AND (storage.foldername(name))[1] IN (
    SELECT id::text FROM public.businesses WHERE user_id = auth.uid()
  )
);


-- 9. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_plan_entitlements_plan_code ON public.plan_entitlements(plan_code);
CREATE INDEX IF NOT EXISTS idx_plan_entitlements_feature_key ON public.plan_entitlements(feature_key);
CREATE INDEX IF NOT EXISTS idx_entitlement_grants_user_feature ON public.entitlement_grants(user_id, feature_key);
CREATE INDEX IF NOT EXISTS idx_entitlement_grants_active_window ON public.entitlement_grants(status, starts_at, expires_at);
CREATE INDEX IF NOT EXISTS idx_businesses_user_id ON public.businesses(user_id);
CREATE INDEX IF NOT EXISTS idx_businesses_slug ON public.businesses(slug);
CREATE INDEX IF NOT EXISTS idx_menus_business_id ON public.menus(business_id);
CREATE INDEX IF NOT EXISTS idx_menus_slug ON public.menus(slug);
CREATE INDEX IF NOT EXISTS idx_categories_business_id ON public.categories(business_id);
CREATE INDEX IF NOT EXISTS idx_categories_menu_id ON public.categories(menu_id);
CREATE INDEX IF NOT EXISTS idx_products_business_id ON public.products(business_id);
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_menu_id ON public.products(menu_id);
CREATE INDEX IF NOT EXISTS idx_cat_translations_cat_id ON public.category_translations(category_id);
CREATE INDEX IF NOT EXISTS idx_prod_translations_prod_id ON public.product_translations(product_id);
