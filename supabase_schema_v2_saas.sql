-- ==============================================================================
-- PRATIKA QR V2 SAAS MIGRATION SCRIPT
-- Idempotent, backward-compatible schema extension for full SaaS capabilities
-- ==============================================================================

-- 1. BUSINESSES TABLE EXTENSIONS
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS currency text DEFAULT 'TRY',
  ADD COLUMN IF NOT EXISTS menu_layout text DEFAULT 'all_products',
  ADD COLUMN IF NOT EXISTS working_hours_structured jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS social_links jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS table_count integer DEFAULT 10,
  ADD COLUMN IF NOT EXISTS menu_updating_message text DEFAULT 'Menümüz şu anda güncellenmektedir. Lütfen kısa bir süre sonra tekrar deneyiniz.',
  ADD COLUMN IF NOT EXISTS menu_theme text DEFAULT 'elegant',
  ADD COLUMN IF NOT EXISTS show_menu_intro boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS welcome_message text,
  ADD COLUMN IF NOT EXISTS slogan text,
  ADD COLUMN IF NOT EXISTS working_hours text;

-- 2. PRODUCTS TABLE EXTENSIONS
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS variants jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS allergens jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS tags jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS position integer DEFAULT 0;

-- 3. CATEGORIES TABLE EXTENSIONS
ALTER TABLE public.categories
  ADD COLUMN IF NOT EXISTS position integer DEFAULT 0;

-- 4. MENUS TABLE EXTENSIONS
ALTER TABLE public.menus
  ADD COLUMN IF NOT EXISTS menu_theme text DEFAULT 'elegant',
  ADD COLUMN IF NOT EXISTS show_menu_intro boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS menu_layout text DEFAULT 'all_products';

-- 5. MENU SETUP REQUESTS ("Menümüzü Biz Ekleyelim" onboarding / concierge service)
CREATE TABLE IF NOT EXISTS public.menu_setup_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  business_id uuid REFERENCES public.businesses(id) ON DELETE SET NULL,
  contact_name text NOT NULL,
  phone text NOT NULL,
  email text,
  notes text,
  file_urls jsonb DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS for menu_setup_requests
ALTER TABLE public.menu_setup_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert own menu setup requests" ON public.menu_setup_requests;
CREATE POLICY "Users can insert own menu setup requests"
  ON public.menu_setup_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can view own menu setup requests" ON public.menu_setup_requests;
CREATE POLICY "Users can view own menu setup requests"
  ON public.menu_setup_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- 6. SET SENSIBLE DEFAULTS ON EXISTING ROWS
UPDATE public.businesses SET currency = 'TRY' WHERE currency IS NULL;
UPDATE public.businesses SET menu_layout = 'all_products' WHERE menu_layout IS NULL;
UPDATE public.businesses SET menu_theme = 'elegant' WHERE menu_theme IS NULL;
UPDATE public.businesses SET show_menu_intro = true WHERE show_menu_intro IS NULL;
UPDATE public.businesses SET table_count = 10 WHERE table_count IS NULL;
UPDATE public.businesses SET social_links = '{}'::jsonb WHERE social_links IS NULL;
UPDATE public.businesses SET working_hours_structured = '{}'::jsonb WHERE working_hours_structured IS NULL;

UPDATE public.products SET variants = '[]'::jsonb WHERE variants IS NULL;
UPDATE public.products SET allergens = '[]'::jsonb WHERE allergens IS NULL;
UPDATE public.products SET tags = '[]'::jsonb WHERE tags IS NULL;
UPDATE public.products SET position = 0 WHERE position IS NULL;

UPDATE public.categories SET position = 0 WHERE position IS NULL;
