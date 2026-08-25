-- supabase_theme_migration.sql
-- PRATIKA QR MENU: THEME SYSTEM & INTRO SCREEN MIGRATION
-- Idempotent script: Safe to execute on existing database.

-- 1. Businesses Table Extension
ALTER TABLE public.businesses
  ADD COLUMN IF NOT EXISTS menu_theme text DEFAULT 'elegant',
  ADD COLUMN IF NOT EXISTS show_menu_intro boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS welcome_message text,
  ADD COLUMN IF NOT EXISTS slogan text,
  ADD COLUMN IF NOT EXISTS working_hours text;

-- 2. Menus Table Extension
ALTER TABLE public.menus
  ADD COLUMN IF NOT EXISTS menu_theme text DEFAULT 'elegant',
  ADD COLUMN IF NOT EXISTS show_menu_intro boolean DEFAULT true;

-- 3. Set defaults for any existing records
UPDATE public.businesses
SET menu_theme = 'elegant'
WHERE menu_theme IS NULL;

UPDATE public.businesses
SET show_menu_intro = true
WHERE show_menu_intro IS NULL;

UPDATE public.menus
SET menu_theme = 'elegant'
WHERE menu_theme IS NULL;

UPDATE public.menus
SET show_menu_intro = true
WHERE show_menu_intro IS NULL;

-- 4. Verify columns
COMMENT ON COLUMN public.businesses.menu_theme IS 'Selected QR menu theme: elegant, modern, classic, minimal, bold';
COMMENT ON COLUMN public.businesses.show_menu_intro IS 'Whether QR scan opens welcome/intro screen first before menu content';
