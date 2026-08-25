-- supabase_ai_translation_migration.sql
-- PRATIKA QR MENU: AI AUTOMATIC TRANSLATION & APPROVAL WORKFLOW
-- Idempotent script: Safe to execute on existing database.

-- 1. Extend category_translations table
ALTER TABLE public.category_translations
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'approved',
  ADD COLUMN IF NOT EXISTS ai_model text;

-- 2. Extend product_translations table
ALTER TABLE public.product_translations
  ADD COLUMN IF NOT EXISTS status text DEFAULT 'approved',
  ADD COLUMN IF NOT EXISTS ai_model text;

-- 3. Ensure default values for existing rows
UPDATE public.category_translations
SET status = 'approved'
WHERE status IS NULL;

UPDATE public.product_translations
SET status = 'approved'
WHERE status IS NULL;

-- 4. Create indexes for fast status-based public menu lookups
CREATE INDEX IF NOT EXISTS idx_category_trans_status ON public.category_translations(category_id, lang_code, status);
CREATE INDEX IF NOT EXISTS idx_product_trans_status ON public.product_translations(product_id, lang_code, status);

COMMENT ON COLUMN public.category_translations.status IS 'Translation status: manual, approved, ai_pending, ai_approved, ai_rejected';
COMMENT ON COLUMN public.product_translations.status IS 'Translation status: manual, approved, ai_pending, ai_approved, ai_rejected';
