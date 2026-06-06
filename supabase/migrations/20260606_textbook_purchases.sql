CREATE TABLE IF NOT EXISTS public.textbook_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id TEXT NOT NULL,
  order_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, subject_id)
);

CREATE INDEX IF NOT EXISTS idx_textbook_purchases_user
  ON public.textbook_purchases(user_id);

CREATE INDEX IF NOT EXISTS idx_textbook_purchases_subject
  ON public.textbook_purchases(subject_id);

ALTER TABLE public.textbook_purchases ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "textbook purchases own select" ON public.textbook_purchases;
CREATE POLICY "textbook purchases own select"
  ON public.textbook_purchases
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "textbook purchases service" ON public.textbook_purchases;
CREATE POLICY "textbook purchases service"
  ON public.textbook_purchases
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
