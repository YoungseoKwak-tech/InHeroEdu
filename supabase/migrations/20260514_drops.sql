-- ============================================================
-- Phase 6 — step 2: Curated weekly drops
--   drops — operator-curated content units that make the home feel alive.
--   Examples: "THIS WEEK'S DROP · 2026 AP Bio Unit 4 Condensed".
-- Only one drop is marked is_featured = true at a time (enforced in app
-- layer; partial unique index optional below).
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS drops (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text UNIQUE NOT NULL,
  kicker        text NOT NULL,            -- "THIS WEEK'S DROP", "FINALS SURVIVAL PACK"
  title         text NOT NULL CHECK (length(title) BETWEEN 3 AND 180),
  subject_tag   text,                     -- "AP BIO", "SAT", "RESEARCH"
  summary       text NOT NULL CHECK (length(summary) BETWEEN 10 AND 400),
  body          text,                     -- long-form markdown content
  link_url      text,                     -- optional external link
  link_label    text,                     -- "Read on Notion →"
  curated_by    uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  accent        text NOT NULL DEFAULT '#F4C95D',
  glyph         text NOT NULL DEFAULT '◆',
  is_featured   boolean NOT NULL DEFAULT false,
  is_published  boolean NOT NULL DEFAULT true,
  published_at  timestamptz NOT NULL DEFAULT now(),
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS drops_published_idx
  ON drops(published_at DESC) WHERE is_published = true;

CREATE INDEX IF NOT EXISTS drops_featured_idx
  ON drops(is_featured) WHERE is_featured = true;

CREATE INDEX IF NOT EXISTS drops_curated_by_idx
  ON drops(curated_by);

ALTER TABLE drops ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone reads published drops" ON drops;
DROP POLICY IF EXISTS "Service role full access — drops" ON drops;
CREATE POLICY "Anyone reads published drops" ON drops FOR SELECT USING (is_published = true);
CREATE POLICY "Service role full access — drops" ON drops FOR ALL TO service_role USING (true);
