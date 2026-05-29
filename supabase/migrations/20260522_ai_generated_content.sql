-- ============================================================
-- AI-generated archive: marks resources born from Claude, tracks
-- every generation request, and rebuilds the search_vector to
-- include the generated full text so AI content is discoverable
-- via the same match_resources_by_text path that surfaces human
-- uploads.
--
-- Depends on:
--   • 20260517_library_v1.sql        (lounge_resources base table)
--   • 20260520_recommendation_ml.sql (pg_trgm extension,
--                                     immutable_text_array_join helper,
--                                     existing search_vector + index)
-- ============================================================

-- ------------------------------------------------------------
-- Resource-level AI metadata
-- ------------------------------------------------------------

ALTER TABLE public.lounge_resources
  ADD COLUMN IF NOT EXISTS is_ai_generated       boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS ai_generation_prompt  text,
  ADD COLUMN IF NOT EXISTS ai_model              text,
  ADD COLUMN IF NOT EXISTS ai_generated_at       timestamptz,
  ADD COLUMN IF NOT EXISTS ai_quality_score      real,
  ADD COLUMN IF NOT EXISTS ai_thumbs_up_count    integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS ai_thumbs_down_count  integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS full_text             text;

-- Quickly find well-rated AI content — partial index keeps the
-- common case (human uploads) out of this leaf.
CREATE INDEX IF NOT EXISTS idx_resources_ai_generated
  ON public.lounge_resources (is_ai_generated, ai_quality_score DESC)
  WHERE is_ai_generated = true;

-- ------------------------------------------------------------
-- Generation request log (analytics + dedup + cost tracking)
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.ai_generation_requests (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  query_text            text NOT NULL,
  query_course          text,
  query_unit            integer,
  query_type            text,
  matched_resource_id   uuid REFERENCES public.lounge_resources(id) ON DELETE SET NULL,
  generated_resource_id uuid REFERENCES public.lounge_resources(id) ON DELETE SET NULL,
  status                text NOT NULL CHECK (
                          status IN ('pending','generating','completed','failed','matched_existing')
                        ),
  cost_usd              real,
  duration_ms           integer,
  error_message         text,
  created_at            timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_ai_requests_user
  ON public.ai_generation_requests (user_id, created_at DESC);

-- GIN on the query text so we can do "find every other student who
-- asked about cell membrane" — fast text search over the request log.
CREATE INDEX IF NOT EXISTS idx_ai_requests_query
  ON public.ai_generation_requests
  USING gin (to_tsvector('english'::regconfig, query_text));

ALTER TABLE public.ai_generation_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ai_requests own" ON public.ai_generation_requests;
CREATE POLICY "ai_requests own"
  ON public.ai_generation_requests
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "ai_requests service" ON public.ai_generation_requests;
CREATE POLICY "ai_requests service"
  ON public.ai_generation_requests
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

-- ------------------------------------------------------------
-- Rebuild search_vector to include full_text (so generated content
-- is reachable via the same match path as uploads).
--
-- We DROP + recreate because GENERATED column expressions are
-- immutable post-creation. The DROP cascades the old GIN index;
-- we recreate it below.
-- ------------------------------------------------------------

ALTER TABLE public.lounge_resources DROP COLUMN IF EXISTS search_vector;

ALTER TABLE public.lounge_resources
  ADD COLUMN IF NOT EXISTS search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english'::regconfig, coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english'::regconfig, coalesce(description, '')), 'B') ||
    setweight(
      to_tsvector(
        'english'::regconfig,
        coalesce(public.immutable_text_array_join(tags, ' '), '')
      ),
      'C'
    ) ||
    setweight(to_tsvector('english'::regconfig, coalesce(course_slug, '')), 'D') ||
    setweight(to_tsvector('english'::regconfig, coalesce(full_text, '')), 'D')
  ) STORED;

CREATE INDEX IF NOT EXISTS idx_resources_search
  ON public.lounge_resources
  USING gin (search_vector);

-- ------------------------------------------------------------
-- match_resources_by_text — replaces the 20260520 body to use
-- the new search_vector shape and slightly de-weight low-quality
-- AI content (thumbs-down > thumbs-up).
--
-- The return shape changes from (id, title, course_slug, unit_number,
-- score) to (id, score), so CREATE OR REPLACE can't be used here —
-- Postgres refuses to change OUT-parameter signatures in place. We
-- DROP first, then CREATE, then re-issue the REVOKE/GRANT pair (DROP
-- discards prior grants).
-- ------------------------------------------------------------

DROP FUNCTION IF EXISTS public.match_resources_by_text(text, text[], uuid[], integer);

CREATE OR REPLACE FUNCTION public.match_resources_by_text(
  query_text    text,
  query_courses text[] DEFAULT '{}',
  exclude_ids   uuid[] DEFAULT '{}',
  match_count   integer DEFAULT 30
)
RETURNS TABLE (id uuid, score real)
LANGUAGE sql
STABLE
AS $$
  WITH ts_query AS (
    SELECT plainto_tsquery('english'::regconfig, query_text) AS q
  )
  SELECT
    lr.id,
    (
      GREATEST(
        ts_rank_cd(lr.search_vector, (SELECT q FROM ts_query))::real * 0.7,
        similarity(lr.title, query_text)::real * 0.5
      )
      + CASE
          WHEN array_length(query_courses, 1) IS NOT NULL
            AND lr.course_slug = ANY(query_courses)
          THEN 0.3 ELSE 0
        END
      -- Slight penalty for low-quality AI content
      - CASE
          WHEN lr.is_ai_generated = true
            AND lr.ai_thumbs_down_count > lr.ai_thumbs_up_count
          THEN 0.1 ELSE 0
        END
    )::real AS score
  FROM public.lounge_resources lr, ts_query
  WHERE lr.id <> ALL(exclude_ids)
    AND lr.deleted_at IS NULL
    AND lr.review_status = 'approved'
    AND (
      array_length(query_courses, 1) IS NULL
      OR lr.course_slug = ANY(query_courses)
    )
    AND (
      lr.search_vector @@ (SELECT q FROM ts_query)
      OR similarity(lr.title, query_text) > 0.2
    )
  ORDER BY score DESC
  LIMIT match_count;
$$;

REVOKE ALL ON FUNCTION public.match_resources_by_text(text, text[], uuid[], integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.match_resources_by_text(text, text[], uuid[], integer) TO service_role;

-- ------------------------------------------------------------
-- Atomic thumbs counter — keeps API logic in the DB so we don't
-- need a read-modify-write race window. The column name is
-- whitelisted inside the function body, so even if the caller
-- passed a malicious string, nothing happens.
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.increment_ai_feedback(
  p_resource_id uuid,
  p_column      text
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  IF p_column = 'ai_thumbs_up_count' THEN
    UPDATE public.lounge_resources
    SET ai_thumbs_up_count = COALESCE(ai_thumbs_up_count, 0) + 1
    WHERE id = p_resource_id;
  ELSIF p_column = 'ai_thumbs_down_count' THEN
    UPDATE public.lounge_resources
    SET ai_thumbs_down_count = COALESCE(ai_thumbs_down_count, 0) + 1
    WHERE id = p_resource_id;
  END IF;
END;
$$;

REVOKE ALL ON FUNCTION public.increment_ai_feedback(uuid, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_ai_feedback(uuid, text) TO service_role;
