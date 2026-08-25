-- Pratika entitlement migration
-- Safe to run after the existing Pratika QR Menu schema.
-- Does not alter Business -> Menu -> Category -> Product relationships.

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

ALTER TABLE public.subscriptions
  ADD COLUMN IF NOT EXISTS plan_code text;

INSERT INTO public.billing_plans (code, display_name, description, is_active)
VALUES
  ('FREE', 'Pratika Free', 'Free tools without QR Menu SaaS access.', true),
  ('PRO', 'Pratika Pro', 'Pro tools plus one gifted QR Menu business.', true),
  ('QR', 'Pratika QR', 'QR Menu SaaS with two business entitlements.', true),
  ('QR_BUSINESS', 'Pratika QR Business', 'Future higher-volume QR Menu package.', false)
ON CONFLICT (code) DO UPDATE SET
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description;

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

  SELECT pe.is_enabled INTO base_value
  FROM public.plan_entitlements pe
  WHERE pe.plan_code = active_plan_code
    AND pe.feature_key = p_feature_key
    AND pe.entitlement_type = 'feature';

  SELECT eg.is_enabled INTO override_value
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
    SELECT 1 FROM public.entitlement_grants eg
    WHERE eg.user_id = p_user_id
      AND eg.feature_key = p_feature_key
      AND eg.entitlement_type = 'feature'
      AND eg.grant_mode = 'add'
      AND eg.is_enabled = true
      AND eg.status = 'active'
      AND (eg.starts_at IS NULL OR eg.starts_at <= now())
      AND (eg.expires_at IS NULL OR eg.expires_at > now())
  ) INTO add_value;

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
  SELECT s.plan_code INTO active_plan_code
  FROM public.subscriptions s
  JOIN public.billing_plans bp ON bp.code = s.plan_code AND bp.is_active = true
  WHERE s.user_id = p_user_id AND s.status = 'active'
  LIMIT 1;

  IF active_plan_code IS NULL THEN
    active_plan_code := 'FREE';
  END IF;

  SELECT pe.limit_value INTO base_limit
  FROM public.plan_entitlements pe
  WHERE pe.plan_code = active_plan_code
    AND pe.feature_key = p_feature_key
    AND pe.entitlement_type = 'quota';

  SELECT MAX(eg.limit_value) INTO override_limit
  FROM public.entitlement_grants eg
  WHERE eg.user_id = p_user_id
    AND eg.feature_key = p_feature_key
    AND eg.entitlement_type = 'quota'
    AND eg.grant_mode = 'override'
    AND eg.status = 'active'
    AND (eg.starts_at IS NULL OR eg.starts_at <= now())
    AND (eg.expires_at IS NULL OR eg.expires_at > now());

  SELECT COALESCE(SUM(eg.limit_value), 0) INTO additive_limit
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

ALTER TABLE public.billing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plan_entitlements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.entitlement_grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view active billing plans" ON public.billing_plans;
DROP POLICY IF EXISTS "Authenticated can view active plan entitlements" ON public.plan_entitlements;
DROP POLICY IF EXISTS "Users can view own entitlement grants" ON public.entitlement_grants;

CREATE POLICY "Public can view active billing plans"
ON public.billing_plans FOR SELECT
USING (is_active = true);

CREATE POLICY "Authenticated can view active plan entitlements"
ON public.plan_entitlements FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.billing_plans bp
    WHERE bp.code = plan_entitlements.plan_code AND bp.is_active = true
  )
);

CREATE POLICY "Users can view own entitlement grants"
ON public.entitlement_grants FOR SELECT
USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_plan_entitlements_plan_code ON public.plan_entitlements(plan_code);
CREATE INDEX IF NOT EXISTS idx_plan_entitlements_feature_key ON public.plan_entitlements(feature_key);
CREATE INDEX IF NOT EXISTS idx_entitlement_grants_user_feature ON public.entitlement_grants(user_id, feature_key);
CREATE INDEX IF NOT EXISTS idx_entitlement_grants_active_window ON public.entitlement_grants(status, starts_at, expires_at);

DROP TRIGGER IF EXISTS check_business_quota ON public.businesses;
CREATE TRIGGER check_business_quota
BEFORE INSERT ON public.businesses
FOR EACH ROW EXECUTE FUNCTION public.enforce_business_quota();
