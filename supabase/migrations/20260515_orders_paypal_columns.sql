-- ============================================================
-- Add the columns lib/orderStore.ts writes for the PayPal flow.
-- The live orders table only has the legacy Toss-era fields, so
-- attachStoredOrderProviderDetails / markStoredOrderPaid both fail
-- with "column ... does not exist" and the /api/payments/paypal
-- route returns 500. After this migration the modern code path
-- in orderStore.ts succeeds without falling back.
-- ============================================================

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS amount                    integer,
  ADD COLUMN IF NOT EXISTS currency                  text,
  ADD COLUMN IF NOT EXISTS provider                  text,
  ADD COLUMN IF NOT EXISTS kind                      text,
  ADD COLUMN IF NOT EXISTS customer_name             text,
  ADD COLUMN IF NOT EXISTS customer_email            text,
  ADD COLUMN IF NOT EXISTS provider_order_id         text,
  ADD COLUMN IF NOT EXISTS provider_subscription_id  text,
  ADD COLUMN IF NOT EXISTS raw_provider_response     jsonb,
  ADD COLUMN IF NOT EXISTS paid_at                   timestamptz;

-- Backfill amount from amount_krw for pre-existing rows so the
-- modern read path (inferStoredOrderAmount) sees a value.
UPDATE public.orders
SET amount = amount_krw
WHERE amount IS NULL AND amount_krw IS NOT NULL;

-- Lookup index for the PayPal capture / webhook path.
CREATE INDEX IF NOT EXISTS orders_provider_order_id_idx
  ON public.orders (provider_order_id)
  WHERE provider_order_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS orders_provider_subscription_id_idx
  ON public.orders (provider_subscription_id)
  WHERE provider_subscription_id IS NOT NULL;
