-- ============================================================
-- Phase 2: Lounges
--   lounges               — subject rooms (slug, name, description)
--   lounge_posts          — feed entries (one author, soft-delete)
--   lounge_post_comments  — 1-level replies (no threading in MVP)
--   lounge_reactions      — three kinds: up · fire · check
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. lounges
CREATE TABLE IF NOT EXISTS lounges (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug              text UNIQUE NOT NULL,
  name              text NOT NULL,
  subject_category  text,
  description       text,
  is_active         boolean NOT NULL DEFAULT true,
  created_at        timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE lounges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone reads lounges" ON lounges;
DROP POLICY IF EXISTS "Service role full access — lounges" ON lounges;
CREATE POLICY "Anyone reads lounges" ON lounges FOR SELECT USING (true);
CREATE POLICY "Service role full access — lounges" ON lounges FOR ALL TO service_role USING (true);


-- 2. lounge_posts
CREATE TABLE IF NOT EXISTS lounge_posts (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lounge_id   uuid NOT NULL REFERENCES lounges(id) ON DELETE CASCADE,
  author_id   uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title       text NOT NULL CHECK (length(title) BETWEEN 4 AND 140),
  body        text CHECK (body IS NULL OR length(body) <= 4000),
  post_type   text NOT NULL DEFAULT 'discussion'
              CHECK (post_type IN ('discussion','question','resource_share')),
  is_deleted  boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS lounge_posts_feed_idx
  ON lounge_posts(lounge_id, created_at DESC)
  WHERE is_deleted = false;

CREATE INDEX IF NOT EXISTS lounge_posts_author_idx
  ON lounge_posts(author_id, created_at DESC);

ALTER TABLE lounge_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone reads visible posts" ON lounge_posts;
DROP POLICY IF EXISTS "Service role full access — lounge_posts" ON lounge_posts;
CREATE POLICY "Anyone reads visible posts" ON lounge_posts FOR SELECT USING (is_deleted = false);
CREATE POLICY "Service role full access — lounge_posts" ON lounge_posts FOR ALL TO service_role USING (true);


-- 3. lounge_post_comments
CREATE TABLE IF NOT EXISTS lounge_post_comments (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id     uuid NOT NULL REFERENCES lounge_posts(id) ON DELETE CASCADE,
  author_id   uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body        text NOT NULL CHECK (length(body) BETWEEN 1 AND 2000),
  is_deleted  boolean NOT NULL DEFAULT false,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS lounge_post_comments_post_idx
  ON lounge_post_comments(post_id, created_at ASC)
  WHERE is_deleted = false;

ALTER TABLE lounge_post_comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone reads visible comments" ON lounge_post_comments;
DROP POLICY IF EXISTS "Service role full access — lounge_post_comments" ON lounge_post_comments;
CREATE POLICY "Anyone reads visible comments" ON lounge_post_comments FOR SELECT USING (is_deleted = false);
CREATE POLICY "Service role full access — lounge_post_comments" ON lounge_post_comments FOR ALL TO service_role USING (true);


-- 4. lounge_reactions
CREATE TABLE IF NOT EXISTS lounge_reactions (
  post_id     uuid NOT NULL REFERENCES lounge_posts(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind        text NOT NULL CHECK (kind IN ('up','fire','check')),
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (post_id, user_id, kind)
);

CREATE INDEX IF NOT EXISTS lounge_reactions_post_idx
  ON lounge_reactions(post_id, kind);

ALTER TABLE lounge_reactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone reads reactions" ON lounge_reactions;
DROP POLICY IF EXISTS "Service role full access — lounge_reactions" ON lounge_reactions;
CREATE POLICY "Anyone reads reactions" ON lounge_reactions FOR SELECT USING (true);
CREATE POLICY "Service role full access — lounge_reactions" ON lounge_reactions FOR ALL TO service_role USING (true);


-- 5. Seed the inaugural lounge
INSERT INTO lounges (slug, name, subject_category, description) VALUES
  (
    'ap-bio',
    'AP Biology Lounge',
    'AP',
    'The cohort''s common room for AP Bio. Drop the question you couldn''t Google, share the trap you almost fell for, and find the rare answer that actually explains the mechanism.'
  )
ON CONFLICT (slug) DO NOTHING;
