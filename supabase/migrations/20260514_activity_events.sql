-- ============================================================
-- Phase 5: Activity Stream (live social gravity)
--   activity_events — typed events for the live feed.
--   Kinds: profile_claimed, lounge_post, lounge_comment, lounge_reaction,
--          club_founded, club_joined, club_role_assigned, club_note_added,
--          badge_earned.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS activity_events (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  kind          text NOT NULL,
  actor_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  subject_type  text,        -- 'lounge_post' | 'club' | 'badge' | 'profile' | 'club_note'
  subject_id    text,        -- string PK or slug
  payload       jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS activity_events_feed_idx
  ON activity_events(created_at DESC);

CREATE INDEX IF NOT EXISTS activity_events_actor_idx
  ON activity_events(actor_user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS activity_events_kind_idx
  ON activity_events(kind, created_at DESC);

ALTER TABLE activity_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone reads activity events" ON activity_events;
DROP POLICY IF EXISTS "Service role full access — activity_events" ON activity_events;
CREATE POLICY "Anyone reads activity events" ON activity_events FOR SELECT USING (true);
CREATE POLICY "Service role full access — activity_events" ON activity_events FOR ALL TO service_role USING (true);
