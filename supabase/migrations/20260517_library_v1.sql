-- ============================================================
-- Library v1: lounge_resources + engagement (comments, upvotes, saves).
--
-- lounge_resources is the source of truth for the /library feed. The upload
-- route dual-writes: chat_messages stays the embed for the chat thread,
-- lounge_resources is the row that the feed queries. Linked via
-- chat_message_id (UNIQUE so backfill + dual-write are naturally idempotent).
--
-- Counts on lounge_resources (upvote_count, comment_count) are maintained
-- by triggers on the child tables. download_count is bumped by the
-- download endpoint (Round 2). Backfill seeds random 5–50 engagement counts
-- on existing rows so the feed reads as populated on day one — note that
-- is_seeded stays false because the resource itself is real, only the
-- counts are fabricated.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ──────────────────────────────────────────────────────────────
-- lounge_resources
-- ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.lounge_resources (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_message_id     uuid UNIQUE REFERENCES public.chat_messages(id) ON DELETE SET NULL,
  lounge_id           uuid NOT NULL REFERENCES public.lounges(id) ON DELETE CASCADE,
  author_id           uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  folder_type         text NOT NULL CHECK (folder_type IN (
    'notes', 'visual-guides', 'practice-frqs',
    'study-plans', 'essays-writing', 'this-week'
  )),
  title               text NOT NULL,
  description         text,
  attachment_url      text NOT NULL,
  attachment_meta     jsonb,
  file_name           text,
  file_size           integer,
  mime_type           text,
  is_inhero_official  boolean NOT NULL DEFAULT false,
  is_seeded           boolean NOT NULL DEFAULT false,
  review_status       text NOT NULL DEFAULT 'approved'
    CHECK (review_status IN ('pending', 'approved', 'rejected')),
  download_count      integer NOT NULL DEFAULT 0,
  upvote_count        integer NOT NULL DEFAULT 0,
  comment_count       integer NOT NULL DEFAULT 0,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS lounge_resources_feed_idx
  ON public.lounge_resources (created_at DESC, id DESC)
  WHERE review_status = 'approved';

CREATE INDEX IF NOT EXISTS lounge_resources_lounge_idx
  ON public.lounge_resources (lounge_id, created_at DESC)
  WHERE review_status = 'approved';

CREATE INDEX IF NOT EXISTS lounge_resources_folder_idx
  ON public.lounge_resources (folder_type, created_at DESC)
  WHERE review_status = 'approved';

CREATE INDEX IF NOT EXISTS lounge_resources_official_idx
  ON public.lounge_resources (is_inhero_official, created_at DESC)
  WHERE review_status = 'approved';

-- ──────────────────────────────────────────────────────────────
-- Trending score (STABLE — used at query time, not in indexes).
-- Reddit-style time-decayed engagement. NOW() makes it non-immutable
-- so an index on this expression would never match current values.
-- ──────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.trending_score(
  p_download_count int,
  p_upvote_count int,
  p_comment_count int,
  p_created_at timestamptz
) RETURNS double precision
LANGUAGE plpgsql
STABLE
AS $$
DECLARE
  age_hours double precision;
  engagement double precision;
BEGIN
  age_hours := EXTRACT(EPOCH FROM (now() - p_created_at)) / 3600.0;
  engagement := (p_download_count * 1.0) + (p_upvote_count * 3.0) + (p_comment_count * 2.0);
  RETURN engagement / power(age_hours + 2, 1.5);
END;
$$;

-- ──────────────────────────────────────────────────────────────
-- resource_comments (UI ships Round 2; schema goes in now)
-- ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.resource_comments (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  resource_id        uuid NOT NULL REFERENCES public.lounge_resources(id) ON DELETE CASCADE,
  author_id          uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  body               text NOT NULL CHECK (length(body) BETWEEN 1 AND 1000),
  parent_comment_id  uuid REFERENCES public.resource_comments(id) ON DELETE CASCADE,
  upvote_count       integer NOT NULL DEFAULT 0,
  is_seeded          boolean NOT NULL DEFAULT false,
  created_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS resource_comments_resource_idx
  ON public.resource_comments (resource_id, created_at DESC);

CREATE INDEX IF NOT EXISTS resource_comments_parent_idx
  ON public.resource_comments (parent_comment_id);

-- ──────────────────────────────────────────────────────────────
-- resource_comment_upvotes / resource_upvotes / resource_saves
-- ──────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.resource_comment_upvotes (
  comment_id uuid NOT NULL REFERENCES public.resource_comments(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (comment_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.resource_upvotes (
  resource_id uuid NOT NULL REFERENCES public.lounge_resources(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (resource_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.resource_saves (
  resource_id uuid NOT NULL REFERENCES public.lounge_resources(id) ON DELETE CASCADE,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at  timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (resource_id, user_id)
);

-- ──────────────────────────────────────────────────────────────
-- Count maintenance triggers
-- ──────────────────────────────────────────────────────────────

CREATE OR REPLACE FUNCTION public.bump_resource_comment_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.lounge_resources
    SET comment_count = comment_count + 1
    WHERE id = NEW.resource_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.lounge_resources
    SET comment_count = GREATEST(0, comment_count - 1)
    WHERE id = OLD.resource_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_bump_resource_comment_count_ins ON public.resource_comments;
CREATE TRIGGER trg_bump_resource_comment_count_ins
  AFTER INSERT ON public.resource_comments
  FOR EACH ROW EXECUTE FUNCTION public.bump_resource_comment_count();

DROP TRIGGER IF EXISTS trg_bump_resource_comment_count_del ON public.resource_comments;
CREATE TRIGGER trg_bump_resource_comment_count_del
  AFTER DELETE ON public.resource_comments
  FOR EACH ROW EXECUTE FUNCTION public.bump_resource_comment_count();

CREATE OR REPLACE FUNCTION public.bump_resource_upvote_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.lounge_resources
    SET upvote_count = upvote_count + 1
    WHERE id = NEW.resource_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.lounge_resources
    SET upvote_count = GREATEST(0, upvote_count - 1)
    WHERE id = OLD.resource_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_bump_resource_upvote_count_ins ON public.resource_upvotes;
CREATE TRIGGER trg_bump_resource_upvote_count_ins
  AFTER INSERT ON public.resource_upvotes
  FOR EACH ROW EXECUTE FUNCTION public.bump_resource_upvote_count();

DROP TRIGGER IF EXISTS trg_bump_resource_upvote_count_del ON public.resource_upvotes;
CREATE TRIGGER trg_bump_resource_upvote_count_del
  AFTER DELETE ON public.resource_upvotes
  FOR EACH ROW EXECUTE FUNCTION public.bump_resource_upvote_count();

-- ──────────────────────────────────────────────────────────────
-- RLS
-- ──────────────────────────────────────────────────────────────

ALTER TABLE public.lounge_resources ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "lounge_resources read approved" ON public.lounge_resources;
CREATE POLICY "lounge_resources read approved"
  ON public.lounge_resources
  FOR SELECT TO authenticated
  USING (review_status = 'approved');
DROP POLICY IF EXISTS "lounge_resources service role" ON public.lounge_resources;
CREATE POLICY "lounge_resources service role"
  ON public.lounge_resources
  FOR ALL TO service_role
  USING (true) WITH CHECK (true);

ALTER TABLE public.resource_comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "resource_comments read" ON public.resource_comments;
CREATE POLICY "resource_comments read"
  ON public.resource_comments
  FOR SELECT TO authenticated USING (true);
DROP POLICY IF EXISTS "resource_comments insert own" ON public.resource_comments;
CREATE POLICY "resource_comments insert own"
  ON public.resource_comments
  FOR INSERT TO authenticated
  WITH CHECK (author_id = auth.uid());
DROP POLICY IF EXISTS "resource_comments service role" ON public.resource_comments;
CREATE POLICY "resource_comments service role"
  ON public.resource_comments
  FOR ALL TO service_role USING (true) WITH CHECK (true);

ALTER TABLE public.resource_comment_upvotes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "resource_comment_upvotes own" ON public.resource_comment_upvotes;
CREATE POLICY "resource_comment_upvotes own"
  ON public.resource_comment_upvotes
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

ALTER TABLE public.resource_upvotes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "resource_upvotes own" ON public.resource_upvotes;
CREATE POLICY "resource_upvotes own"
  ON public.resource_upvotes
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

ALTER TABLE public.resource_saves ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "resource_saves own" ON public.resource_saves;
CREATE POLICY "resource_saves own"
  ON public.resource_saves
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ──────────────────────────────────────────────────────────────
-- Backfill from chat_messages with attachments, then seed engagement
-- counts so the feed isn't empty on day one.
-- ──────────────────────────────────────────────────────────────

INSERT INTO public.lounge_resources (
  chat_message_id, lounge_id, author_id, folder_type, title,
  attachment_url, attachment_meta, file_name, file_size, mime_type,
  is_inhero_official, created_at
)
SELECT
  m.id,
  m.context_id,
  m.author_id,
  COALESCE(m.attachment_meta->>'group', 'notes'),
  COALESCE(
    NULLIF(m.content, ''),
    m.attachment_meta->>'fileName',
    'Untitled'
  ),
  m.attachment_url,
  m.attachment_meta,
  m.attachment_meta->>'fileName',
  NULLIF(m.attachment_meta->>'size', '')::int,
  m.attachment_meta->>'mimeType',
  false,
  m.created_at
FROM public.chat_messages m
WHERE m.context_type = 'lounge'
  AND m.type IN ('image', 'file')
  AND m.attachment_url IS NOT NULL
  AND m.is_deleted = false
  AND m.attachment_meta ? 'group'
  AND m.attachment_meta->>'group' IN (
    'notes','visual-guides','practice-frqs',
    'study-plans','essays-writing','this-week'
  )
ON CONFLICT (chat_message_id) DO NOTHING;

-- Seed engagement counts on every existing row (5–50 range, deterministic
-- per id so re-runs are stable).
UPDATE public.lounge_resources
SET
  download_count = 5 + (abs(hashtext(id::text)) % 46),
  upvote_count   = 3 + (abs(hashtext(id::text || 'u')) % 28),
  comment_count  = 0 + (abs(hashtext(id::text || 'c')) % 12)
WHERE download_count = 0 AND upvote_count = 0 AND comment_count = 0;
