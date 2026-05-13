-- ============================================================
-- Phase 1: Trajectory Identity layer
--   profiles_public  — handle, grad year, ambition tags
--   badges           — status signals (founding_cohort, verified_ap5, …)
-- Lightweight by design. Lounge/club layers reference this.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. profiles_public — one row per user. Created via /api/profile/init.
CREATE TABLE IF NOT EXISTS profiles_public (
  user_id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_handle   text NOT NULL,
  ambition_tags    text[] NOT NULL DEFAULT '{}',
  target_schools   text[] NOT NULL DEFAULT '{}',
  graduation_year  int CHECK (graduation_year IS NULL OR graduation_year BETWEEN 2024 AND 2040),
  bio              text,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

-- Case-insensitive unique handle.
CREATE UNIQUE INDEX IF NOT EXISTS profiles_public_handle_unique
  ON profiles_public(LOWER(display_handle));

CREATE INDEX IF NOT EXISTS profiles_public_grad_idx
  ON profiles_public(graduation_year);

ALTER TABLE profiles_public ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read public profiles"  ON profiles_public;
DROP POLICY IF EXISTS "Owners can update own profile"    ON profiles_public;
DROP POLICY IF EXISTS "Service role full access — profiles_public" ON profiles_public;

CREATE POLICY "Anyone can read public profiles"
  ON profiles_public FOR SELECT
  USING (true);

CREATE POLICY "Owners can update own profile"
  ON profiles_public FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Service role full access — profiles_public"
  ON profiles_public FOR ALL
  TO service_role USING (true);

COMMENT ON COLUMN profiles_public.display_handle IS
  'Public ambition handle, e.g. "CornellBio27". Case-insensitive unique. 3-24 chars, letters/digits/underscore, must start with a letter.';
COMMENT ON COLUMN profiles_public.ambition_tags IS
  'Multi-select preset tags (pre_med, engineering, cs, research, founder, debate, olympiad, humanities, social_impact, business, art). 1-3 expected at signup.';


-- 2. badges — earned status signals. Unique per (user, type).
CREATE TABLE IF NOT EXISTS badges (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  badge_type      text NOT NULL,
  badge_metadata  jsonb NOT NULL DEFAULT '{}'::jsonb,
  earned_at       timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, badge_type)
);

CREATE INDEX IF NOT EXISTS badges_user_idx
  ON badges(user_id, earned_at DESC);

ALTER TABLE badges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read badges" ON badges;
DROP POLICY IF EXISTS "Service role full access — badges" ON badges;

CREATE POLICY "Anyone can read badges"
  ON badges FOR SELECT
  USING (true);

CREATE POLICY "Service role full access — badges"
  ON badges FOR ALL
  TO service_role USING (true);

COMMENT ON TABLE badges IS
  'Status signals shown on author chips and trajectory profiles. Curated set in lib/trajectory.ts (BADGE_META).';
