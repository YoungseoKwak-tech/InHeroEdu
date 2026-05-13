-- ============================================================
-- Phase 4: User-created clubs + roles + meeting notes
--   - clubs: add created_by + is_user_created
--   - club_members.role: extend to (founder, cofounder, secretary, member, curator)
--   - club_meeting_notes: per-club logged meetings
-- ============================================================

-- 1. Extend clubs with creator metadata
ALTER TABLE clubs
  ADD COLUMN IF NOT EXISTS created_by      uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS is_user_created boolean NOT NULL DEFAULT false;

CREATE INDEX IF NOT EXISTS clubs_created_by_idx ON clubs(created_by);


-- 2. Extend club_members.role to support founder + cofounder + secretary
ALTER TABLE club_members
  DROP CONSTRAINT IF EXISTS club_members_role_check;

ALTER TABLE club_members
  ADD CONSTRAINT club_members_role_check
  CHECK (role IN ('founder', 'cofounder', 'secretary', 'member', 'curator'));


-- 3. club_meeting_notes — one row per logged meeting
CREATE TABLE IF NOT EXISTS club_meeting_notes (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id      uuid NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  author_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title        text NOT NULL CHECK (length(title) BETWEEN 3 AND 140),
  body         text NOT NULL CHECK (length(body) BETWEEN 1 AND 16000),
  meeting_at   timestamptz,
  is_deleted   boolean NOT NULL DEFAULT false,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS club_notes_club_idx
  ON club_meeting_notes(club_id, created_at DESC)
  WHERE is_deleted = false;

ALTER TABLE club_meeting_notes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone reads visible meeting notes" ON club_meeting_notes;
DROP POLICY IF EXISTS "Service role full access — club_meeting_notes" ON club_meeting_notes;
CREATE POLICY "Anyone reads visible meeting notes"
  ON club_meeting_notes FOR SELECT USING (is_deleted = false);
CREATE POLICY "Service role full access — club_meeting_notes"
  ON club_meeting_notes FOR ALL TO service_role USING (true);


-- 4. Mark previously-seeded inaugural clubs as admin-curated (is_user_created = false)
UPDATE clubs
SET is_user_created = false
WHERE is_user_created IS DISTINCT FROM true;
