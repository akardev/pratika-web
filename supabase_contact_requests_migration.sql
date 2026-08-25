-- Supabase Migration: Contact Requests & Inquiries Table
CREATE TABLE IF NOT EXISTS public.contact_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL DEFAULT 'general-support',
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new', -- 'new', 'in_review', 'completed', 'rejected'
  admin_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;

-- Allow anyone (public/anon & authenticated) to insert contact requests
DROP POLICY IF EXISTS "Allow public insert on contact_requests" ON public.contact_requests;
CREATE POLICY "Allow public insert on contact_requests" ON public.contact_requests
FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Allow authenticated users (and admins) to read & update contact requests
DROP POLICY IF EXISTS "Allow authenticated select on contact_requests" ON public.contact_requests;
CREATE POLICY "Allow authenticated select on contact_requests" ON public.contact_requests
FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Allow authenticated update on contact_requests" ON public.contact_requests;
CREATE POLICY "Allow authenticated update on contact_requests" ON public.contact_requests
FOR UPDATE TO authenticated USING (true);
