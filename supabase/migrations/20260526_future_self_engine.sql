-- ============================================================
-- Future Self Engine — Cozy Evolution v0
--
-- Three tables, all per-user, all RLS-gated to the owner:
--
--   study_sessions      — time tracking. Reader page (or any
--                         "studying surface") opens a session on
--                         load, heartbeats every 30s, finalizes
--                         on unload / idle. Drives streak +
--                         brain stats + resonance updates.
--
--   future_self_paths   — the silhouette's resonance per career
--                         path (researcher, founder, doctor,
--                         artist). One row per (user, slug);
--                         resonance ∈ [0, 1] updated by the
--                         chapter completion ritual and other
--                         activity hooks.
--
--   recent_events       — append-only feed of meaningful moments
--                         ("resonance increase", "chapter
--                         complete", "streak milestone") rendered
--                         on /future as scrollable history.
--
-- No FKs across these three — they're independent telemetry
-- streams that converge on /future + /brain.
-- ============================================================

-- ------------------------------------------------------------
-- 1. Study sessions
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.study_sessions (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  started_at        timestamptz NOT NULL DEFAULT now(),
  ended_at          timestamptz,
  duration_seconds  integer,
  activity_type     text,
    -- 'reading' | 'lounge' | 'ai_tutor' | 'note_review' | other
  resource_id       uuid,
  resource_type     text,
    -- 'textbook_chapter' | 'lounge_resource' | 'lounge' | ...
  subject_slug      text,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_study_sessions_user_date
  ON public.study_sessions (user_id, started_at DESC);

CREATE INDEX IF NOT EXISTS idx_study_sessions_open
  ON public.study_sessions (user_id, started_at DESC)
  WHERE ended_at IS NULL;

ALTER TABLE public.study_sessions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "sessions own" ON public.study_sessions;
CREATE POLICY "sessions own"
  ON public.study_sessions
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "sessions service" ON public.study_sessions;
CREATE POLICY "sessions service"
  ON public.study_sessions
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- ------------------------------------------------------------
-- 2. Future-self paths
--
-- Each user has rows for the four canonical paths. Rows are
-- lazily created the first time the user hits /future or
-- triggers a resonance event — the API does upsert-on-read so
-- we don't need to seed every signup.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.future_self_paths (
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  path_slug    text NOT NULL,        -- 'researcher' | 'founder' | 'doctor' | 'artist'
  resonance    real NOT NULL DEFAULT 0.0,  -- [0, 1]
  updated_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, path_slug),
  CHECK (resonance >= 0.0 AND resonance <= 1.0)
);

CREATE INDEX IF NOT EXISTS idx_future_paths_user
  ON public.future_self_paths (user_id);

ALTER TABLE public.future_self_paths ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "paths own" ON public.future_self_paths;
CREATE POLICY "paths own"
  ON public.future_self_paths
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "paths service" ON public.future_self_paths;
CREATE POLICY "paths service"
  ON public.future_self_paths
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

-- ------------------------------------------------------------
-- 3. Recent events — append-only narrative feed
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.recent_events (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type    text NOT NULL,
    -- 'resonance_increase' | 'chapter_complete' | 'streak_milestone'
    -- | 'session_logged' | ...
  payload       jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_recent_events_user_time
  ON public.recent_events (user_id, occurred_at DESC);

ALTER TABLE public.recent_events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "events own read" ON public.recent_events;
CREATE POLICY "events own read"
  ON public.recent_events
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "events service" ON public.recent_events;
CREATE POLICY "events service"
  ON public.recent_events
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);
