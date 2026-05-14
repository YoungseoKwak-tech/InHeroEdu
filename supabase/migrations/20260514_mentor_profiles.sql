-- ============================================================
-- Phase 6 — step 1: Mentor visibility
--   mentor_profiles — admin-curated, rich data per verified mentor.
--   Existence of a row IS the verified-mentor signal.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS mentor_profiles (
  user_id          uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  university       text NOT NULL,                -- "Cornell University"
  university_role  text NOT NULL,                -- "Senior · ECE", "Med Student · BME"
  specialties      text[] NOT NULL DEFAULT '{}', -- ['AP Biology', 'Research', 'Pre-med']
  intro_blurb      text NOT NULL CHECK (length(intro_blurb) BETWEEN 10 AND 400),
  avatar_url       text,
  is_verified      boolean NOT NULL DEFAULT true,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS mentor_profiles_verified_idx
  ON mentor_profiles(created_at DESC) WHERE is_verified = true;

ALTER TABLE mentor_profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone reads mentor profiles" ON mentor_profiles;
DROP POLICY IF EXISTS "Service role full access — mentor_profiles" ON mentor_profiles;
CREATE POLICY "Anyone reads mentor profiles" ON mentor_profiles FOR SELECT USING (true);
CREATE POLICY "Service role full access — mentor_profiles" ON mentor_profiles FOR ALL TO service_role USING (true);
