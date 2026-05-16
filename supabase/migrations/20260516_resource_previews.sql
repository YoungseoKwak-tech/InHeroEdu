-- ============================================================
-- Per-resource preview pages.
--
-- After an upload (or admin approval) we render pages 1–3 of the PDF
-- into PNGs:
--   page 1 → full clarity → preview_page_1_url
--   page 2 → server-side blurred → preview_page_2_url
--   page 3 → server-side blurred → preview_page_3_url
--
-- The thumbnail on the Library feed comes from preview_page_1_url.
-- The reader still uses the canvas-rendered full PDF for paid users;
-- these URLs are the public preview surface for free users.
--
-- preview_generation_status tracks the lifecycle so the UI can show
-- "Generating preview…" while it runs and degrade to the emoji
-- placeholder if rendering fails.
-- ============================================================

ALTER TABLE public.lounge_resources
  ADD COLUMN IF NOT EXISTS preview_page_1_url text,
  ADD COLUMN IF NOT EXISTS preview_page_2_url text,
  ADD COLUMN IF NOT EXISTS preview_page_3_url text,
  ADD COLUMN IF NOT EXISTS total_pages integer,
  ADD COLUMN IF NOT EXISTS preview_generation_status text NOT NULL DEFAULT 'pending'
    CHECK (preview_generation_status IN ('pending', 'processing', 'complete', 'failed', 'skipped'));

-- Index so the cron / backfill can find pending rows quickly.
CREATE INDEX IF NOT EXISTS lounge_resources_preview_pending_idx
  ON public.lounge_resources (created_at DESC)
  WHERE preview_generation_status IN ('pending', 'failed');
