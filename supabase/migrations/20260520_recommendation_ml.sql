-- ============================================================
-- Recommendation ML foundation without external embeddings.
--
-- Content recommendations use Postgres-native full-text search
-- plus trigram similarity. Collaborative filtering uses the same
-- implicit interaction matrix and precomputed user similarity table.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- ------------------------------------------------------------
-- IMMUTABLE wrapper for array_to_string on text[].
--
-- Postgres marks array_to_string(anyarray, text) as STABLE because
-- it can in principle invoke element-type output functions that
-- depend on search_path. For a plain text[] the result is in fact
-- immutable (the body is just a separator-joined concat), so we
-- wrap it in a tiny IMMUTABLE SQL function so it's usable inside a
-- GENERATED ALWAYS AS (...) STORED column.
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.immutable_text_array_join(p text[], sep text)
RETURNS text
LANGUAGE sql
IMMUTABLE
PARALLEL SAFE
AS $$
  SELECT array_to_string(p, sep);
$$;

-- ------------------------------------------------------------
-- Resource search metadata
-- ------------------------------------------------------------

ALTER TABLE public.lounge_resources
  ADD COLUMN IF NOT EXISTS course_slug text,
  ADD COLUMN IF NOT EXISTS unit_number integer,
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS search_vector tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english'::regconfig, coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english'::regconfig, coalesce(description, '')), 'B') ||
    setweight(to_tsvector('simple'::regconfig, replace(coalesce(course_slug, ''), '-', ' ')), 'A') ||
    setweight(
      to_tsvector(
        'simple'::regconfig,
        CASE
          WHEN unit_number IS NULL THEN ''
          ELSE 'unit ' || unit_number::text
        END
      ),
      'A'
    ) ||
    setweight(to_tsvector('simple'::regconfig, coalesce(public.immutable_text_array_join(tags, ' '), '')), 'C') ||
    setweight(to_tsvector('simple'::regconfig, coalesce(folder_type, '')), 'C') ||
    setweight(to_tsvector('simple'::regconfig, coalesce(file_name, '')), 'D')
  ) STORED;

CREATE INDEX IF NOT EXISTS idx_resources_search_vector
  ON public.lounge_resources
  USING gin (search_vector)
  WHERE review_status = 'approved' AND deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_resources_title_trgm
  ON public.lounge_resources
  USING gin (title gin_trgm_ops)
  WHERE review_status = 'approved' AND deleted_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_resources_description_trgm
  ON public.lounge_resources
  USING gin (description gin_trgm_ops)
  WHERE review_status = 'approved' AND deleted_at IS NULL AND description IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_resources_course_unit
  ON public.lounge_resources (course_slug, unit_number, created_at DESC)
  WHERE review_status = 'approved' AND deleted_at IS NULL;

-- ------------------------------------------------------------
-- View counts: implicit signal visible to the viewer's own account.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.user_resource_views (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id             uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id         uuid NOT NULL REFERENCES public.lounge_resources(id) ON DELETE CASCADE,
  view_count          integer NOT NULL DEFAULT 1,
  total_dwell_seconds integer NOT NULL DEFAULT 0,
  last_viewed_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, resource_id)
);

CREATE INDEX IF NOT EXISTS idx_views_user
  ON public.user_resource_views (user_id, last_viewed_at DESC);

CREATE INDEX IF NOT EXISTS idx_views_resource
  ON public.user_resource_views (resource_id, last_viewed_at DESC);

-- ------------------------------------------------------------
-- Denormalized implicit rating matrix for collaborative filtering.
-- score is capped between 0 and 1 by upsert_interaction_score().
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.user_resource_interactions (
  user_id             uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  resource_id         uuid NOT NULL REFERENCES public.lounge_resources(id) ON DELETE CASCADE,
  score               real NOT NULL CHECK (score >= 0 AND score <= 1),
  last_interaction_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, resource_id)
);

CREATE INDEX IF NOT EXISTS idx_interactions_user
  ON public.user_resource_interactions (user_id, score DESC);

CREATE INDEX IF NOT EXISTS idx_interactions_resource
  ON public.user_resource_interactions (resource_id, score DESC);

CREATE INDEX IF NOT EXISTS idx_interactions_recent
  ON public.user_resource_interactions (last_interaction_at DESC);

-- ------------------------------------------------------------
-- Precomputed user-user similarities, refreshed by cron.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.user_similarity (
  user_a      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_b      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  similarity  real NOT NULL CHECK (similarity >= 0 AND similarity <= 1),
  computed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_a, user_b),
  CHECK (user_a <> user_b)
);

CREATE INDEX IF NOT EXISTS idx_similarity_a
  ON public.user_similarity (user_a, similarity DESC);

-- ------------------------------------------------------------
-- RPC helpers
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.upsert_interaction_score(
  p_user_id uuid,
  p_resource_id uuid,
  p_increment real
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_increment real;
BEGIN
  v_increment := LEAST(1.0::real, GREATEST(0.0::real, COALESCE(p_increment, 0.0::real)));

  INSERT INTO public.user_resource_interactions (
    user_id,
    resource_id,
    score,
    last_interaction_at
  )
  VALUES (
    p_user_id,
    p_resource_id,
    v_increment,
    now()
  )
  ON CONFLICT (user_id, resource_id)
  DO UPDATE SET
    score = LEAST(
      1.0::real,
      GREATEST(
        0.0::real,
        public.user_resource_interactions.score + EXCLUDED.score
      )
    ),
    last_interaction_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.match_resources_by_text(
  query_text text,
  course_slugs text[] DEFAULT '{}',
  exclude_ids uuid[] DEFAULT '{}',
  match_count integer DEFAULT 30
)
RETURNS TABLE (
  id uuid,
  title text,
  course_slug text,
  unit_number integer,
  score real
)
LANGUAGE sql
STABLE
AS $$
  WITH q AS (
    SELECT
      trim(coalesce(query_text, '')) AS raw,
      websearch_to_tsquery('english', trim(coalesce(query_text, ''))) AS tsq,
      lower(trim(coalesce(query_text, ''))) AS normalized
  ),
  scored AS (
    SELECT
      lr.id,
      lr.title,
      lr.course_slug,
      lr.unit_number,
      (
        ts_rank_cd(lr.search_vector, q.tsq) * 0.7 +
        GREATEST(
          similarity(lower(coalesce(lr.title, '')), q.normalized),
          similarity(lower(coalesce(lr.description, '')), q.normalized),
          similarity(lower(replace(coalesce(lr.course_slug, ''), '-', ' ')), q.normalized)
        ) * 0.25 +
        CASE
          WHEN lr.unit_number IS NOT NULL
            AND q.normalized LIKE '%unit ' || lr.unit_number::text || '%'
          THEN 0.15
          ELSE 0
        END +
        LEAST(coalesce(lr.save_count, 0), 50) * 0.002
      )::real AS score
    FROM public.lounge_resources lr
    CROSS JOIN q
    WHERE q.raw <> ''
      AND lr.review_status = 'approved'
      AND lr.deleted_at IS NULL
      AND lr.id <> ALL(exclude_ids)
      AND (
        coalesce(array_length(course_slugs, 1), 0) = 0
        OR lr.course_slug = ANY(course_slugs)
      )
      AND (
        lr.search_vector @@ q.tsq
        OR similarity(lower(coalesce(lr.title, '')), q.normalized) > 0.12
        OR similarity(lower(coalesce(lr.description, '')), q.normalized) > 0.08
        OR similarity(lower(replace(coalesce(lr.course_slug, ''), '-', ' ')), q.normalized) > 0.2
      )
  )
  SELECT
    scored.id,
    scored.title,
    scored.course_slug,
    scored.unit_number,
    scored.score
  FROM scored
  WHERE scored.score > 0
  ORDER BY scored.score DESC, scored.title ASC
  LIMIT match_count;
$$;

-- ------------------------------------------------------------
-- Resource-to-resource similarity. Given a source resource id,
-- score every other approved resource by a weighted blend of:
--   • title-driven tsvector overlap (50%)
--   • course_slug match (30%)
--   • unit_number match (20%)
-- Until course_slug / unit_number are backfilled, only the title
-- component contributes — see scripts/backfill-resource-metadata.ts.
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.match_resources_by_resource(
  p_source_id uuid,
  p_exclude_ids uuid[] DEFAULT '{}',
  p_match_count integer DEFAULT 30
)
RETURNS TABLE (id uuid, score real)
LANGUAGE sql
STABLE
AS $$
  WITH source AS (
    SELECT title, course_slug, unit_number, search_vector
    FROM public.lounge_resources
    WHERE id = p_source_id
  )
  SELECT
    lr.id,
    (
      0.5 * ts_rank(lr.search_vector, plainto_tsquery('english'::regconfig, (SELECT title FROM source)))::real +
      0.3 * CASE WHEN lr.course_slug = (SELECT course_slug FROM source) AND lr.course_slug IS NOT NULL THEN 1.0 ELSE 0 END +
      0.2 * CASE WHEN lr.unit_number = (SELECT unit_number FROM source) AND lr.unit_number IS NOT NULL THEN 1.0 ELSE 0 END
    )::real AS score
  FROM public.lounge_resources lr
  WHERE lr.id <> p_source_id
    AND lr.id <> ALL(p_exclude_ids)
    AND lr.review_status = 'approved'
    AND lr.deleted_at IS NULL
  ORDER BY score DESC
  LIMIT p_match_count;
$$;

REVOKE ALL ON FUNCTION public.upsert_interaction_score(uuid, uuid, real) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.match_resources_by_text(text, text[], uuid[], integer) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.match_resources_by_resource(uuid, uuid[], integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.upsert_interaction_score(uuid, uuid, real) TO service_role;
GRANT EXECUTE ON FUNCTION public.match_resources_by_text(text, text[], uuid[], integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.match_resources_by_resource(uuid, uuid[], integer) TO service_role;

-- ------------------------------------------------------------
-- RLS
-- ------------------------------------------------------------

ALTER TABLE public.user_resource_views ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "views own" ON public.user_resource_views;
CREATE POLICY "views own"
  ON public.user_resource_views
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "views service" ON public.user_resource_views;
CREATE POLICY "views service"
  ON public.user_resource_views
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

ALTER TABLE public.user_resource_interactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "interactions service" ON public.user_resource_interactions;
CREATE POLICY "interactions service"
  ON public.user_resource_interactions
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

ALTER TABLE public.user_similarity ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "similarity service" ON public.user_similarity;
CREATE POLICY "similarity service"
  ON public.user_similarity
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);
