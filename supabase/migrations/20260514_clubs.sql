-- ============================================================
-- Phase 3: Flagship Clubs (admin-curated aspirational rooms)
--   clubs          — curated by admin only. Slug, mission, hero blurb, glyph, accent.
--   club_members   — anyone with a trajectory profile can join. Composite PK.
-- No applications. No workspaces. No user-created clubs. Just rooms.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. clubs (admin-curated, read-only for everyone else)
CREATE TABLE IF NOT EXISTS clubs (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text UNIQUE NOT NULL,
  name          text NOT NULL,
  mission       text NOT NULL,
  hero_blurb    text,
  glyph         text NOT NULL DEFAULT '✦',
  accent        text NOT NULL DEFAULT '#5eead4',
  sort_order    int NOT NULL DEFAULT 100,
  is_active     boolean NOT NULL DEFAULT true,
  created_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS clubs_sort_idx ON clubs(sort_order ASC) WHERE is_active = true;

ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone reads clubs" ON clubs;
DROP POLICY IF EXISTS "Service role full access — clubs" ON clubs;
CREATE POLICY "Anyone reads clubs" ON clubs FOR SELECT USING (true);
CREATE POLICY "Service role full access — clubs" ON clubs FOR ALL TO service_role USING (true);


-- 2. club_members (join state)
CREATE TABLE IF NOT EXISTS club_members (
  club_id      uuid NOT NULL REFERENCES clubs(id) ON DELETE CASCADE,
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role         text NOT NULL DEFAULT 'member' CHECK (role IN ('member','curator')),
  is_featured  boolean NOT NULL DEFAULT false,
  joined_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (club_id, user_id)
);

CREATE INDEX IF NOT EXISTS club_members_club_idx ON club_members(club_id, joined_at DESC);
CREATE INDEX IF NOT EXISTS club_members_user_idx ON club_members(user_id);

ALTER TABLE club_members ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone reads club members" ON club_members;
DROP POLICY IF EXISTS "Service role full access — club_members" ON club_members;
CREATE POLICY "Anyone reads club members" ON club_members FOR SELECT USING (true);
CREATE POLICY "Service role full access — club_members" ON club_members FOR ALL TO service_role USING (true);


-- 3. Seed inaugural admin-curated clubs
INSERT INTO clubs (slug, name, mission, hero_blurb, glyph, accent, sort_order) VALUES
  (
    'founders-lab',
    'The Founders Lab',
    'For students already building — startups, side projects, real products with real users.',
    'You''re shipping before you''re old enough to drive. Find the others.',
    '◆',
    '#F4C95D',
    10
  ),
  (
    'olympiad-stack',
    'The Olympiad Stack',
    'Serious training for national + international olympiads — Math, Physics, Bio, Chem, CS, Linguistics.',
    'Past medals are a filter, not a trophy case. The work is what counts.',
    '✦',
    '#5eead4',
    20
  ),
  (
    'research-society',
    'Research Society',
    'High-school students doing real research — wet lab, theory, computational, humanities.',
    'Papers in progress, mentors found, cohorts that read each other''s drafts.',
    '◊',
    '#A99CFF',
    30
  ),
  (
    'civic-builders',
    'Civic Builders',
    'Building public-good tools, policy proposals, civic tech — and getting them adopted.',
    'Politics is downstream of infrastructure. Build the infrastructure.',
    '⬢',
    '#5DCAA5',
    40
  ),
  (
    'the-stack',
    'The Stack',
    'Engineering-track ambition — systems, ML, distributed, low-level. For students who already read changelogs.',
    'Closer to a guild than a club. Half the room ships open-source weekly.',
    '⌬',
    '#FF8B7E',
    50
  )
ON CONFLICT (slug) DO NOTHING;
