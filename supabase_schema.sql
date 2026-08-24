-- Supabase SQL Schema for Pratika Pro (QR Menu)

-- 1. Create Tables
CREATE TABLE public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan text NOT NULL DEFAULT 'FREE', -- 'FREE' or 'PRO'
  status text NOT NULL DEFAULT 'active',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.businesses (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  logo_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.categories (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  position integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  category_id uuid REFERENCES public.categories(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL DEFAULT 0,
  image_url text,
  position integer DEFAULT 0,
  is_active boolean DEFAULT true,
  tags jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE public.tables (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id uuid REFERENCES public.businesses(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  qr_code_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies

-- Subscriptions: User can only read their own subscription
CREATE POLICY "Users can view own subscription" 
ON public.subscriptions FOR SELECT 
USING (auth.uid() = user_id);

-- Businesses: User can CRUD their own business
CREATE POLICY "Users can view own businesses" 
ON public.businesses FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own businesses" 
ON public.businesses FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own businesses" 
ON public.businesses FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own businesses" 
ON public.businesses FOR DELETE 
USING (auth.uid() = user_id);

-- Categories: User can CRUD categories for their businesses
CREATE POLICY "Users can view own categories" 
ON public.categories FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = categories.business_id AND businesses.user_id = auth.uid()));

CREATE POLICY "Users can insert own categories" 
ON public.categories FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = categories.business_id AND businesses.user_id = auth.uid()));

CREATE POLICY "Users can update own categories" 
ON public.categories FOR UPDATE 
USING (EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = categories.business_id AND businesses.user_id = auth.uid()));

CREATE POLICY "Users can delete own categories" 
ON public.categories FOR DELETE 
USING (EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = categories.business_id AND businesses.user_id = auth.uid()));

-- Products: User can CRUD products for their businesses
CREATE POLICY "Users can view own products" 
ON public.products FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = products.business_id AND businesses.user_id = auth.uid()));

CREATE POLICY "Users can insert own products" 
ON public.products FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = products.business_id AND businesses.user_id = auth.uid()));

CREATE POLICY "Users can update own products" 
ON public.products FOR UPDATE 
USING (EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = products.business_id AND businesses.user_id = auth.uid()));

CREATE POLICY "Users can delete own products" 
ON public.products FOR DELETE 
USING (EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = products.business_id AND businesses.user_id = auth.uid()));

-- Tables: User can CRUD tables for their businesses
CREATE POLICY "Users can view own tables" 
ON public.tables FOR SELECT 
USING (EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = tables.business_id AND businesses.user_id = auth.uid()));

CREATE POLICY "Users can insert own tables" 
ON public.tables FOR INSERT 
WITH CHECK (EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = tables.business_id AND businesses.user_id = auth.uid()));

CREATE POLICY "Users can update own tables" 
ON public.tables FOR UPDATE 
USING (EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = tables.business_id AND businesses.user_id = auth.uid()));

CREATE POLICY "Users can delete own tables" 
ON public.tables FOR DELETE 
USING (EXISTS (SELECT 1 FROM public.businesses WHERE businesses.id = tables.business_id AND businesses.user_id = auth.uid()));

-- Public Policies for Public Menu (Anyone can read if Business/Category/Product is active)
-- We need a separate set of policies to allow public reads for the menu page without auth.uid()

-- Public can read businesses
CREATE POLICY "Public can view businesses"
ON public.businesses FOR SELECT
USING (true);

-- Public can read active categories
CREATE POLICY "Public can view active categories"
ON public.categories FOR SELECT
USING (is_active = true);

-- Public can read active products
CREATE POLICY "Public can view active products"
ON public.products FOR SELECT
USING (is_active = true);
