-- ============================================================
-- Soft-delete for lounge_resources.
--
-- Adds deleted_at + deleted_by. The DELETE /api/library/resource/[id]
-- endpoint sets these instead of removing the row, so accidental
-- deletes are recoverable. Feed + single-resource queries filter on
-- deleted_at IS NULL. A future cron will hard-delete rows where
-- deleted_at < now() - interval '30 days' — not part of this migration.
--
-- All existing partial indexes are recreated to include the
-- deleted_at IS NULL predicate so soft-deleted rows don't pollute
-- the feed/lounge/folder lookups.
-- ============================================================

ALTER TABLE public.lounge_resources
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz,
  ADD COLUMN IF NOT EXISTS deleted_by uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS lounge_resources_deleted_idx
  ON public.lounge_resources (deleted_at)
  WHERE deleted_at IS NOT NULL;

-- Recreate partial indexes from 20260517_library_v1.sql with the
-- soft-delete predicate included. The old indexes get dropped first
-- so they don't take up space.
DROP INDEX IF EXISTS public.lounge_resources_feed_idx;
CREATE INDEX lounge_resources_feed_idx
  ON public.lounge_resources (created_at DESC, id DESC)
  WHERE review_status = 'approved' AND deleted_at IS NULL;

DROP INDEX IF EXISTS public.lounge_resources_lounge_idx;
CREATE INDEX lounge_resources_lounge_idx
  ON public.lounge_resources (lounge_id, created_at DESC)
  WHERE review_status = 'approved' AND deleted_at IS NULL;

DROP INDEX IF EXISTS public.lounge_resources_folder_idx;
CREATE INDEX lounge_resources_folder_idx
  ON public.lounge_resources (folder_type, created_at DESC)
  WHERE review_status = 'approved' AND deleted_at IS NULL;

DROP INDEX IF EXISTS public.lounge_resources_official_idx;
CREATE INDEX lounge_resources_official_idx
  ON public.lounge_resources (is_inhero_official, created_at DESC)
  WHERE review_status = 'approved' AND deleted_at IS NULL;
