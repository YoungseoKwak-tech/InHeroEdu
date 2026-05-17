-- ============================================================
-- My Space + AI brief: per-user curation, reactions, study profile,
-- and cached AI briefs.
--
-- This is Phase A schema. The /library feed stays untouched as a
-- discovery surface; the tables here back a separate /my-space
-- experience (Saved / Liked / For You) and the AI brief generator.
--
-- Notes on shape choices:
--   • user_saved_resources is a fresh table (not an extension of the
--     unused resource_saves from 20260517_library_v1.sql) because the
--     new model carries a collection_id that resource_saves doesn't.
--     The old table is now dead schema; can be dropped later.
--   • save_count on lounge_resources is maintained by trigger so the
--     recommendation logic and library cards can read it cheaply.
--   • user_briefs caches one row per user per day; the generator
--     route reads the latest non-expired row before calling Claude.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ──────────────────────────────────────────────────────────────
-- user_collections — Pinterest-style boards. The implicit
-- "All Saved" view is rendered client-side (any save with
-- collection_id IS NULL); we don't materialize it as a row.
-- ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_collections (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name               text NOT NULL CHECK (length(name) BETWEEN 1 AND 80),
  description        text CHECK (description IS NULL OR length(description) <= 280),
  cover_resource_id  uuid REFERENCES public.lounge_resources(id) ON DELETE SET NULL,
  is_private         boolean NOT NULL DEFAULT true,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS user_collections_user_idx
  ON public.user_collections (user_id, updated_at DESC);

-- ──────────────────────────────────────────────────────────────
-- user_saved_resources — the bookmark table. UNIQUE(user, resource)
-- means a single resource lives in at most one collection per user.
-- ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_saved_resources (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id    uuid NOT NULL REFERENCES public.lounge_resources(id) ON DELETE CASCADE,
  collection_id  uuid REFERENCES public.user_collections(id) ON DELETE SET NULL,
  saved_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, resource_id)
);

CREATE INDEX IF NOT EXISTS user_saved_resources_user_idx
  ON public.user_saved_resources (user_id, saved_at DESC);

CREATE INDEX IF NOT EXISTS user_saved_resources_collection_idx
  ON public.user_saved_resources (collection_id, saved_at DESC)
  WHERE collection_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS user_saved_resources_resource_idx
  ON public.user_saved_resources (resource_id);

-- ──────────────────────────────────────────────────────────────
-- user_resource_reactions — emoji reactions to resources.
-- One row per (user, resource, reaction_type) — a user can stack
-- multiple reactions on a single resource if they want.
-- ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_resource_reactions (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id    uuid NOT NULL REFERENCES public.lounge_resources(id) ON DELETE CASCADE,
  reaction_type  text NOT NULL CHECK (reaction_type IN ('heart','fire','lightbulb','pin')),
  created_at     timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, resource_id, reaction_type)
);

CREATE INDEX IF NOT EXISTS user_resource_reactions_user_idx
  ON public.user_resource_reactions (user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS user_resource_reactions_resource_idx
  ON public.user_resource_reactions (resource_id);

-- ──────────────────────────────────────────────────────────────
-- save_count on lounge_resources — feeds recommendation ranking
-- and "Saved by N students" labels. Maintained by trigger so reads
-- stay cheap.
-- ──────────────────────────────────────────────────────────────

ALTER TABLE public.lounge_resources
  ADD COLUMN IF NOT EXISTS save_count integer NOT NULL DEFAULT 0;

CREATE OR REPLACE FUNCTION public.bump_resource_save_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.lounge_resources
    SET save_count = save_count + 1
    WHERE id = NEW.resource_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.lounge_resources
    SET save_count = GREATEST(0, save_count - 1)
    WHERE id = OLD.resource_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_bump_resource_save_count_ins ON public.user_saved_resources;
CREATE TRIGGER trg_bump_resource_save_count_ins
  AFTER INSERT ON public.user_saved_resources
  FOR EACH ROW EXECUTE FUNCTION public.bump_resource_save_count();

DROP TRIGGER IF EXISTS trg_bump_resource_save_count_del ON public.user_saved_resources;
CREATE TRIGGER trg_bump_resource_save_count_del
  AFTER DELETE ON public.user_saved_resources
  FOR EACH ROW EXECUTE FUNCTION public.bump_resource_save_count();

-- Keep user_collections.updated_at fresh whenever the user
-- re-curates (rename, change cover, move saves).
CREATE OR REPLACE FUNCTION public.touch_user_collection_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_touch_user_collection_updated_at ON public.user_collections;
CREATE TRIGGER trg_touch_user_collection_updated_at
  BEFORE UPDATE ON public.user_collections
  FOR EACH ROW EXECUTE FUNCTION public.touch_user_collection_updated_at();

-- ──────────────────────────────────────────────────────────────
-- user_study_profile — input to the AI brief generator.
-- One row per user. Free-form fields stay in a jsonb blob so we
-- can iterate on the StudyProfileSetup form without migrations.
-- ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_study_profile (
  user_id      uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  grade        text,
  subjects     text[] NOT NULL DEFAULT '{}',
  goals        text,
  details      jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now()
);

DROP TRIGGER IF EXISTS trg_touch_user_study_profile_updated_at ON public.user_study_profile;
CREATE TRIGGER trg_touch_user_study_profile_updated_at
  BEFORE UPDATE ON public.user_study_profile
  FOR EACH ROW EXECUTE FUNCTION public.touch_user_collection_updated_at();

-- ──────────────────────────────────────────────────────────────
-- user_briefs — cached AI brief output. The generator route reads
-- the latest non-expired row before calling Claude.
-- ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.user_briefs (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content      jsonb NOT NULL,
  model        text,
  prompt_hash  text,
  generated_at timestamptz NOT NULL DEFAULT now(),
  expires_at   timestamptz NOT NULL DEFAULT (now() + interval '24 hours'),
  force_count  integer NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS user_briefs_user_recent_idx
  ON public.user_briefs (user_id, generated_at DESC);

-- ──────────────────────────────────────────────────────────────
-- RLS
-- ──────────────────────────────────────────────────────────────

ALTER TABLE public.user_collections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_collections own" ON public.user_collections;
CREATE POLICY "user_collections own"
  ON public.user_collections
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "user_collections service" ON public.user_collections;
CREATE POLICY "user_collections service"
  ON public.user_collections
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

ALTER TABLE public.user_saved_resources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_saved_resources own" ON public.user_saved_resources;
CREATE POLICY "user_saved_resources own"
  ON public.user_saved_resources
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "user_saved_resources service" ON public.user_saved_resources;
CREATE POLICY "user_saved_resources service"
  ON public.user_saved_resources
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

ALTER TABLE public.user_resource_reactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_resource_reactions own" ON public.user_resource_reactions;
CREATE POLICY "user_resource_reactions own"
  ON public.user_resource_reactions
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "user_resource_reactions service" ON public.user_resource_reactions;
CREATE POLICY "user_resource_reactions service"
  ON public.user_resource_reactions
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

ALTER TABLE public.user_study_profile ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_study_profile own" ON public.user_study_profile;
CREATE POLICY "user_study_profile own"
  ON public.user_study_profile
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "user_study_profile service" ON public.user_study_profile;
CREATE POLICY "user_study_profile service"
  ON public.user_study_profile
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

ALTER TABLE public.user_briefs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "user_briefs read own" ON public.user_briefs;
CREATE POLICY "user_briefs read own"
  ON public.user_briefs
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());
DROP POLICY IF EXISTS "user_briefs service" ON public.user_briefs;
CREATE POLICY "user_briefs service"
  ON public.user_briefs
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);
