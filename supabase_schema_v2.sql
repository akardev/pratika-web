-- Supabase SQL Schema V2 for Pratika Pro (QR Menu SaaS)
-- Idempotent script: Safe to run multiple times.

-- 1. Updates to existing tables
ALTER TABLE public.businesses 
  ADD COLUMN IF NOT EXISTS business_type text,
  ADD COLUMN IF NOT EXISTS phone text,
  ADD COLUMN IF NOT EXISTS address text,
  ADD COLUMN IF NOT EXISTS instagram text,
  ADD COLUMN IF NOT EXISTS default_lang text DEFAULT 'tr';

-- 2. New Table: menus
CREATE TABLE IF NOT EXISTS public.menus (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  is_active boolean DEFAULT true,
  position integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(business_id, slug) -- Slug is unique per business
);

-- Note: Add menu_id to categories and products.
ALTER TABLE public.categories
  ADD COLUMN IF NOT EXISTS menu_id uuid REFERENCES public.menus(id) ON DELETE CASCADE;

ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS menu_id uuid REFERENCES public.menus(id) ON DELETE CASCADE;

-- DATA INTEGRITY: Composite Foreign Key for Category/Product -> Menu mismatch prevention
-- This guarantees that a product can ONLY belong to a category that is in the EXACT SAME MENU.
ALTER TABLE public.categories DROP CONSTRAINT IF EXISTS categories_id_menu_id_key;
ALTER TABLE public.categories ADD CONSTRAINT categories_id_menu_id_key UNIQUE (id, menu_id);

ALTER TABLE public.products DROP CONSTRAINT IF EXISTS products_category_id_menu_id_fkey;
ALTER TABLE public.products ADD CONSTRAINT products_category_id_menu_id_fkey 
  FOREIGN KEY (category_id, menu_id) REFERENCES public.categories (id, menu_id) ON DELETE CASCADE;


-- 3. Translations Tables
CREATE TABLE IF NOT EXISTS public.category_translations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE NOT NULL,
  lang_code text NOT NULL, -- 'en', 'de', 'ru'
  name text NOT NULL,
  description text,
  is_manual boolean DEFAULT false,
  base_hash text, -- Hash of the TR text at the time of translation
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(category_id, lang_code)
);

CREATE TABLE IF NOT EXISTS public.product_translations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  lang_code text NOT NULL, -- 'en', 'de', 'ru'
  name text NOT NULL,
  description text,
  is_manual boolean DEFAULT false,
  base_hash text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(product_id, lang_code)
);

-- 4. Enable RLS on all tables
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_translations ENABLE ROW LEVEL SECURITY;


-- 5. Drop existing policies to make script idempotent
DROP POLICY IF EXISTS "Users can view own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can insert own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can update own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can delete own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Public can view businesses" ON public.businesses;

DROP POLICY IF EXISTS "Users can view own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can insert own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can update own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can delete own categories" ON public.categories;
DROP POLICY IF EXISTS "Public can view active categories" ON public.categories;

DROP POLICY IF EXISTS "Users can view own products" ON public.products;
DROP POLICY IF EXISTS "Users can insert own products" ON public.products;
DROP POLICY IF EXISTS "Users can update own products" ON public.products;
DROP POLICY IF EXISTS "Users can delete own products" ON public.products;
DROP POLICY IF EXISTS "Public can view active products" ON public.products;

DROP POLICY IF EXISTS "Users can view own menus" ON public.menus;
DROP POLICY IF EXISTS "Users can insert own menus" ON public.menus;
DROP POLICY IF EXISTS "Users can update own menus" ON public.menus;
DROP POLICY IF EXISTS "Users can delete own menus" ON public.menus;
DROP POLICY IF EXISTS "Public can view active menus" ON public.menus;

DROP POLICY IF EXISTS "Users can view own category_translations" ON public.category_translations;
DROP POLICY IF EXISTS "Users can insert own category_translations" ON public.category_translations;
DROP POLICY IF EXISTS "Users can update own category_translations" ON public.category_translations;
DROP POLICY IF EXISTS "Users can delete own category_translations" ON public.category_translations;
DROP POLICY IF EXISTS "Public can view active category_translations" ON public.category_translations;
DROP POLICY IF EXISTS "Public can view category_translations" ON public.category_translations;

DROP POLICY IF EXISTS "Users can view own product_translations" ON public.product_translations;
DROP POLICY IF EXISTS "Users can insert own product_translations" ON public.product_translations;
DROP POLICY IF EXISTS "Users can update own product_translations" ON public.product_translations;
DROP POLICY IF EXISTS "Users can delete own product_translations" ON public.product_translations;
DROP POLICY IF EXISTS "Public can view active product_translations" ON public.product_translations;
DROP POLICY IF EXISTS "Public can view product_translations" ON public.product_translations;


-- 6. RLS Policies for Admin (Business Owners)
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


-- 7. Public Policies (For Public QR Menu)
-- CRITICAL FIX: "businesses" table has NO public policy anymore.
-- A secure VIEW is created to expose ONLY non-sensitive business data for public menus.

DROP VIEW IF EXISTS public.public_businesses;
CREATE VIEW public.public_businesses AS
SELECT id, name, slug, description, logo_url, default_lang, created_at
FROM public.businesses;

-- Grant select to anon on the view
GRANT SELECT ON public.public_businesses TO anon;
GRANT SELECT ON public.public_businesses TO authenticated;

-- Public can view active menus
CREATE POLICY "Public can view active menus" ON public.menus FOR SELECT USING (is_active = true);

-- Public can view categories only if they are active AND belong to an active menu
CREATE POLICY "Public can view active categories" ON public.categories FOR SELECT USING (
  is_active = true AND 
  EXISTS (SELECT 1 FROM public.menus m WHERE m.id = categories.menu_id AND m.is_active = true)
);

-- Public can view products only if they are active, and belong to an active category & menu
CREATE POLICY "Public can view active products" ON public.products FOR SELECT USING (
  is_active = true AND 
  EXISTS (
    SELECT 1 FROM public.categories c 
    JOIN public.menus m ON c.menu_id = m.id 
    WHERE c.id = products.category_id AND c.is_active = true AND m.is_active = true
  )
);

-- Public can view category translations if the base category is active & accessible
CREATE POLICY "Public can view active category_translations" ON public.category_translations FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.categories c 
    JOIN public.menus m ON c.menu_id = m.id 
    WHERE c.id = category_translations.category_id AND c.is_active = true AND m.is_active = true
  )
);

-- Public can view product translations if the base product is active & accessible
CREATE POLICY "Public can view active product_translations" ON public.product_translations FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.products p
    JOIN public.categories c ON p.category_id = c.id
    JOIN public.menus m ON p.menu_id = m.id 
    WHERE p.id = product_translations.product_id AND p.is_active = true AND c.is_active = true AND m.is_active = true
  )
);


-- 8. Storage Buckets & Policies
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing storage policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Users can update media" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete media" ON storage.objects;
DROP POLICY IF EXISTS "Business owner can upload media" ON storage.objects;
DROP POLICY IF EXISTS "Business owner can update media" ON storage.objects;
DROP POLICY IF EXISTS "Business owner can delete media" ON storage.objects;

-- Allow public to read media (since images will be used in public menus)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'media' );

-- Ensure file uploads go into `media/BUSINESS_ID/...` and the user actually owns that BUSINESS_ID
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
