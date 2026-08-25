-- ==============================================================================
-- PRATIKA QR — CANLI VERİTABANI ŞEMASINA UYUMLU RLS VE YETKİ MİGRATİON'I
-- ==============================================================================
-- Bu script SADECE veritabanınızda fiilen mevcut olan 7 tablo üzerinde çalışır:
-- 1. businesses
-- 2. menus
-- 3. categories
-- 4. products
-- 5. category_translations
-- 6. product_translations
-- 7. subscriptions
--
-- Hiçbir yeni tablo oluşturmaz, hiçbir tabloyu DROP/TRUNCATE etmez, veri silmez.
-- ==============================================================================

-- 0. İŞLETME TABLOSUNA YENİ ALANLARIN EKLENMESİ (NON-BREAKING)
ALTER TABLE public.businesses
ADD COLUMN IF NOT EXISTS welcome_message text,
ADD COLUMN IF NOT EXISTS slogan text,
ADD COLUMN IF NOT EXISTS working_hours text;

-- 1. ŞEMA VE TABLO SEVİYESİNDE LEAST-PRIVILEGE YETKİLENDİRMELERİ
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT USAGE ON SCHEMA extensions TO anon, authenticated, service_role;

-- 1.1 İŞLETME YÖNETİMİ TABLOLARI (Authenticated CRUD)
GRANT SELECT, INSERT, UPDATE, DELETE ON public.businesses TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.menus TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.categories TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.products TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.category_translations TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.product_translations TO authenticated;

-- 1.2 ABONELİK TABLOSU (Authenticated için SADECE SELECT / Read-Only)
-- Plan sahteciliği / yetkisiz plan değişikliği tamamen engellenir.
REVOKE ALL ON public.subscriptions FROM anon, authenticated, PUBLIC;
GRANT SELECT ON public.subscriptions TO authenticated;
GRANT ALL ON public.subscriptions TO service_role;

-- 1.3 ANONİM MÜŞTERİ / QR OKUYUCU YETKİLERİ (SADECE SELECT)
REVOKE INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public FROM anon;
GRANT SELECT ON public.businesses TO anon;
GRANT SELECT ON public.menus TO anon;
GRANT SELECT ON public.categories TO anon;
GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.category_translations TO anon;
GRANT SELECT ON public.product_translations TO anon;

-- Sequence yetkileri (Sadece USAGE ve SELECT):
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated, service_role;


-- 2. ESKİ / GEÇERSİZ KOTA TRİGGERLARININ TEMİZLENMESİ
-- Var olmayan tablolara (billing_plans vb.) referans veren eski trigger'ları kaldırır
DROP TRIGGER IF EXISTS check_business_quota ON public.businesses;
DROP TRIGGER IF EXISTS check_category_quota ON public.categories;
DROP TRIGGER IF EXISTS check_product_quota ON public.products;
DROP TRIGGER IF EXISTS check_translation_quota_category ON public.category_translations;
DROP TRIGGER IF EXISTS check_translation_quota_product ON public.product_translations;


-- 3. KESİN USER ISOLATION VE SCOPED RLS POLİTİKALARI

-- 3.1 SUBSCRIPTIONS TABLOSU (READ-ONLY)
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can insert own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can update own subscription" ON public.subscriptions;
DROP POLICY IF EXISTS "Users can delete own subscription" ON public.subscriptions;

CREATE POLICY "Users can view own subscription"
ON public.subscriptions FOR SELECT TO authenticated
USING (auth.uid() = user_id);


-- 3.2 BUSINESSES TABLOSU
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can insert own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can select own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can update own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can delete own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Public can view businesses by slug" ON public.businesses;
DROP POLICY IF EXISTS "Public can view active businesses" ON public.businesses;
DROP POLICY IF EXISTS "Users can view own businesses" ON public.businesses;
DROP POLICY IF EXISTS "Public can view businesses" ON public.businesses;

CREATE POLICY "Users can insert own businesses"
ON public.businesses FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can select own businesses"
ON public.businesses FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can update own businesses"
ON public.businesses FOR UPDATE TO authenticated
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own businesses"
ON public.businesses FOR DELETE TO authenticated
USING (auth.uid() = user_id);

-- Anonim müşteriler YALNIZCA aktif menüsü bulunan işletmeleri görüntüleyebilir
CREATE POLICY "Public can view active businesses"
ON public.businesses FOR SELECT TO anon
USING (
  EXISTS (
    SELECT 1 FROM public.menus m
    WHERE m.business_id = businesses.id AND m.is_active = true
  )
);


-- 3.3 MENUS TABLOSU
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can insert own menus" ON public.menus;
DROP POLICY IF EXISTS "Users can select own menus" ON public.menus;
DROP POLICY IF EXISTS "Users can update own menus" ON public.menus;
DROP POLICY IF EXISTS "Users can delete own menus" ON public.menus;
DROP POLICY IF EXISTS "Public can view menus" ON public.menus;
DROP POLICY IF EXISTS "Public can view active menus" ON public.menus;
DROP POLICY IF EXISTS "Users can view own menus" ON public.menus;

CREATE POLICY "Users can insert own menus"
ON public.menus FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = menus.business_id AND b.user_id = auth.uid()));

CREATE POLICY "Users can select own menus"
ON public.menus FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = menus.business_id AND b.user_id = auth.uid()));

CREATE POLICY "Users can update own menus"
ON public.menus FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = menus.business_id AND b.user_id = auth.uid()));

CREATE POLICY "Users can delete own menus"
ON public.menus FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = menus.business_id AND b.user_id = auth.uid()));

CREATE POLICY "Public can view active menus"
ON public.menus FOR SELECT TO anon
USING (is_active = true);


-- 3.4 CATEGORIES TABLOSU
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can insert own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can select own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can update own categories" ON public.categories;
DROP POLICY IF EXISTS "Users can delete own categories" ON public.categories;
DROP POLICY IF EXISTS "Public can view categories" ON public.categories;
DROP POLICY IF EXISTS "Public can view active categories" ON public.categories;
DROP POLICY IF EXISTS "Users can view own categories" ON public.categories;

CREATE POLICY "Users can insert own categories"
ON public.categories FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = categories.business_id AND b.user_id = auth.uid()));

CREATE POLICY "Users can select own categories"
ON public.categories FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = categories.business_id AND b.user_id = auth.uid()));

CREATE POLICY "Users can update own categories"
ON public.categories FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = categories.business_id AND b.user_id = auth.uid()));

CREATE POLICY "Users can delete own categories"
ON public.categories FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = categories.business_id AND b.user_id = auth.uid()));

-- Anonim müşteriler sadece aktif menüye bağlı aktif kategorileri okuyabilir
CREATE POLICY "Public can view active categories"
ON public.categories FOR SELECT TO anon
USING (
  is_active = true
  AND (
    menu_id IS NULL
    OR EXISTS (
      SELECT 1 FROM public.menus m
      WHERE m.id = categories.menu_id AND m.business_id = categories.business_id AND m.is_active = true
    )
  )
);


-- 3.5 PRODUCTS TABLOSU
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can insert own products" ON public.products;
DROP POLICY IF EXISTS "Users can select own products" ON public.products;
DROP POLICY IF EXISTS "Users can update own products" ON public.products;
DROP POLICY IF EXISTS "Users can delete own products" ON public.products;
DROP POLICY IF EXISTS "Public can view products" ON public.products;
DROP POLICY IF EXISTS "Public can view active products" ON public.products;
DROP POLICY IF EXISTS "Users can view own products" ON public.products;

CREATE POLICY "Users can insert own products"
ON public.products FOR INSERT TO authenticated
WITH CHECK (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = products.business_id AND b.user_id = auth.uid()));

CREATE POLICY "Users can select own products"
ON public.products FOR SELECT TO authenticated
USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = products.business_id AND b.user_id = auth.uid()));

CREATE POLICY "Users can update own products"
ON public.products FOR UPDATE TO authenticated
USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = products.business_id AND b.user_id = auth.uid()));

CREATE POLICY "Users can delete own products"
ON public.products FOR DELETE TO authenticated
USING (EXISTS (SELECT 1 FROM public.businesses b WHERE b.id = products.business_id AND b.user_id = auth.uid()));

-- Anonim müşteriler sadece aktif kategoriye bağlı aktif ürünleri okuyabilir
CREATE POLICY "Public can view active products"
ON public.products FOR SELECT TO anon
USING (
  is_active = true
  AND EXISTS (
    SELECT 1 FROM public.categories c
    WHERE c.id = products.category_id AND c.business_id = products.business_id AND c.is_active = true
  )
);


-- 3.6 TRANSLATIONS TABLOLARI
ALTER TABLE public.category_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_translations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage category translations" ON public.category_translations;
DROP POLICY IF EXISTS "Public can view category translations" ON public.category_translations;
DROP POLICY IF EXISTS "Public can view active category_translations" ON public.category_translations;
DROP POLICY IF EXISTS "Users can view own category_translations" ON public.category_translations;
DROP POLICY IF EXISTS "Users can insert own category_translations" ON public.category_translations;
DROP POLICY IF EXISTS "Users can update own category_translations" ON public.category_translations;
DROP POLICY IF EXISTS "Users can delete own category_translations" ON public.category_translations;

CREATE POLICY "Users can manage category translations"
ON public.category_translations FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.categories c
    JOIN public.businesses b ON b.id = c.business_id
    WHERE c.id = category_translations.category_id AND b.user_id = auth.uid()
  )
);

CREATE POLICY "Public can view active category_translations"
ON public.category_translations FOR SELECT TO anon
USING (
  EXISTS (
    SELECT 1 FROM public.categories c
    WHERE c.id = category_translations.category_id AND c.is_active = true
  )
);

DROP POLICY IF EXISTS "Users can manage product translations" ON public.product_translations;
DROP POLICY IF EXISTS "Public can view product translations" ON public.product_translations;
DROP POLICY IF EXISTS "Public can view active product_translations" ON public.product_translations;
DROP POLICY IF EXISTS "Users can view own product_translations" ON public.product_translations;
DROP POLICY IF EXISTS "Users can insert own product_translations" ON public.product_translations;
DROP POLICY IF EXISTS "Users can update own product_translations" ON public.product_translations;
DROP POLICY IF EXISTS "Users can delete own product_translations" ON public.product_translations;

CREATE POLICY "Users can manage product translations"
ON public.product_translations FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.products p
    JOIN public.businesses b ON b.id = p.business_id
    WHERE p.id = product_translations.product_id AND b.user_id = auth.uid()
  )
);

CREATE POLICY "Public can view active product_translations"
ON public.product_translations FOR SELECT TO anon
USING (
  EXISTS (
    SELECT 1 FROM public.products p
    JOIN public.categories c ON c.id = p.category_id
    WHERE p.id = product_translations.product_id AND p.is_active = true AND c.is_active = true
  )
);
