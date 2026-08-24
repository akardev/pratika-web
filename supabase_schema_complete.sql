-- supabase_schema_complete.sql
-- COMPLETE, IDEMPOTENT, PRODUCTION-READY SCHEMA FOR PRATIKA PRO QR MENU

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLES

-- Subscriptions (Entitlement & Quota)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan text NOT NULL DEFAULT 'FREE', -- 'FREE' or 'PRO'
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

-- 3. QUOTA AND ENTITLEMENT LOGIC (DATABASE TRIGGERS)
CREATE OR REPLACE FUNCTION enforce_business_quota()
RETURNS TRIGGER AS $$
DECLARE
  business_count INTEGER;
  user_plan text;
BEGIN
  -- Get user plan (strictly checking for 'active' status)
  SELECT plan INTO user_plan 
  FROM public.subscriptions 
  WHERE user_id = NEW.user_id AND status = 'active' 
  LIMIT 1;
  
  -- Default to FREE if no active subscription found
  IF user_plan IS NULL THEN
    user_plan := 'FREE';
  END IF;

  -- Enforce FREE plan constraint
  IF user_plan = 'FREE' THEN
    RAISE EXCEPTION 'UPGRADE_REQUIRED: Ücretsiz hesaplar QR Menü oluşturamaz.';
  END IF;

  -- Enforce PRO plan quota (max 2 businesses/QR menus)
  IF user_plan = 'PRO' THEN
    SELECT count(*) INTO business_count FROM public.businesses WHERE user_id = NEW.user_id;
    IF business_count >= 2 THEN
      RAISE EXCEPTION 'QUOTA_EXCEEDED: Pro hesabınızla maksimum 2 adet QR Menü oluşturabilirsiniz.';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS check_business_quota ON public.businesses;
CREATE TRIGGER check_business_quota
BEFORE INSERT ON public.businesses
FOR EACH ROW EXECUTE FUNCTION enforce_business_quota();

-- 4. ENABLE RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_translations ENABLE ROW LEVEL SECURITY;

-- 5. DROP EXISTING POLICIES (Idempotency)
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
