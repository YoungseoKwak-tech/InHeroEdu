-- ============================================================
-- NICEPAY subscription billing support.
-- Billing keys are encrypted by the application before storage.
-- Access still flows through public.orders so existing course gates
-- keep working after a successful recurring charge.
-- ============================================================

CREATE TABLE IF NOT EXISTS public.nicepay_billing_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id text NOT NULL,
  subject_id text,
  provider text NOT NULL DEFAULT 'nicepay',
  status text NOT NULL DEFAULT 'active',
  billing_key_ciphertext text NOT NULL,
  billing_key_iv text NOT NULL,
  billing_key_tag text NOT NULL,
  customer_email text,
  next_billing_at timestamptz,
  last_billed_at timestamptz,
  last_order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  fail_count integer NOT NULL DEFAULT 0,
  last_error text,
  raw_provider_response jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_nicepay_billing_keys_due
  ON public.nicepay_billing_keys (next_billing_at)
  WHERE status = 'active';

CREATE INDEX IF NOT EXISTS idx_nicepay_billing_keys_user
  ON public.nicepay_billing_keys (user_id);

CREATE TABLE IF NOT EXISTS public.nicepay_billing_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  billing_key_id uuid NOT NULL REFERENCES public.nicepay_billing_keys(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  order_id uuid REFERENCES public.orders(id) ON DELETE SET NULL,
  scheduled_for timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'pending',
  amount integer NOT NULL,
  currency text NOT NULL DEFAULT 'KRW',
  provider_tid text,
  raw_provider_response jsonb,
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz
);

CREATE INDEX IF NOT EXISTS idx_nicepay_billing_runs_key
  ON public.nicepay_billing_runs (billing_key_id, created_at DESC);

ALTER TABLE public.nicepay_billing_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nicepay_billing_runs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "nicepay billing keys service" ON public.nicepay_billing_keys
  FOR ALL TO service_role USING (true) WITH CHECK (true);

CREATE POLICY "nicepay billing runs service" ON public.nicepay_billing_runs
  FOR ALL TO service_role USING (true) WITH CHECK (true);
