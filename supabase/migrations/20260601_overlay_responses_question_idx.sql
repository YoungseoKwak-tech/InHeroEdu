-- Restore schema parity with the overlay response logger.
-- Do not change RLS here; this migration only fixes the runtime insert drift.
ALTER TABLE public.overlay_responses
  ADD COLUMN IF NOT EXISTS question_idx integer;
