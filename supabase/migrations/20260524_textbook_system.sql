-- ============================================================
-- Textbook system — InHero-authored long-form study material.
--
-- Models a full textbook as: textbook → units → chapters, with
-- per-student progress tracking and enrollment. Chapter content
-- is split out of a single source PDF at ingest time (see
-- scripts/ingest-textbook.ts) into one PDF per chapter plus
-- structured metadata (learning objectives, section titles,
-- AI summary, key concepts) used to drive search and the
-- reader UI.
--
-- Depends on:
--   • 20260520_recommendation_ml.sql (pg_trgm extension,
--                                     immutable_text_array_join)
-- ============================================================

-- ------------------------------------------------------------
-- Textbook — top-level container (one per book, e.g. "AP Biology").
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.textbooks (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                     text UNIQUE NOT NULL,
  title                    text NOT NULL,
  subtitle                 text,
  course_slug              text NOT NULL,
  author_id                uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name              text NOT NULL,

  description              text,
  cover_url                text,
  total_pages              integer,
  total_chapters           integer,
  total_units              integer,

  is_premium               boolean NOT NULL DEFAULT false,
  is_published             boolean NOT NULL DEFAULT false,

  -- Source PDF (the original, pre-split upload).
  source_pdf_url           text,
  source_pdf_size_bytes    bigint,

  -- Ingest pipeline tracking.
  processing_status        text NOT NULL DEFAULT 'pending'
    CHECK (processing_status IN ('pending','processing','completed','failed')),
  processing_started_at    timestamptz,
  processing_completed_at  timestamptz,
  processing_error         text,

  created_at               timestamptz NOT NULL DEFAULT now(),
  updated_at               timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_textbooks_course
  ON public.textbooks (course_slug)
  WHERE is_published = true;

-- ------------------------------------------------------------
-- Unit — sits between textbook and chapter (AP CED grouping).
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.textbook_units (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  textbook_id     uuid NOT NULL REFERENCES public.textbooks(id) ON DELETE CASCADE,
  unit_number     integer NOT NULL,
  title           text NOT NULL,
  description     text,
  ordinal         integer NOT NULL,

  page_start      integer,
  page_end        integer,
  total_chapters  integer NOT NULL DEFAULT 0,

  created_at      timestamptz NOT NULL DEFAULT now(),
  UNIQUE (textbook_id, unit_number)
);

CREATE INDEX IF NOT EXISTS idx_units_textbook
  ON public.textbook_units (textbook_id, ordinal);

-- ------------------------------------------------------------
-- Chapter — the readable unit. One row per UU.CC.
--
-- chapter_number is the canonical "01.01" string used in URLs
-- and footers; (unit_number, chapter_index) is the same
-- information in integer form for sorting and joins.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.textbook_chapters (
  id                    uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  textbook_id           uuid NOT NULL REFERENCES public.textbooks(id) ON DELETE CASCADE,
  unit_id               uuid NOT NULL REFERENCES public.textbook_units(id) ON DELETE CASCADE,

  chapter_number        text NOT NULL,           -- 'UU.CC' e.g. '01.01'
  unit_number           integer NOT NULL,
  chapter_index         integer NOT NULL,

  title                 text NOT NULL,
  subtitle              text,

  -- Extracted from the PDF at ingest time.
  learning_objectives   jsonb,                   -- string[]
  section_titles        jsonb,                   -- string[]
  full_text             text,

  -- Claude-generated analysis (see scripts/ingest-textbook.ts).
  ai_summary            text,
  ai_key_concepts       text[],
  ai_topics             text[],
  ai_exam_tips          text[],
  ai_difficulty         text CHECK (ai_difficulty IN ('basic','intermediate','advanced')),
  ai_analyzed_at        timestamptz,

  -- Per-chapter PDF (split out of the source) in Supabase Storage.
  pdf_url               text,
  page_start            integer,
  page_end              integer,
  page_count            integer,

  estimated_read_time   integer,                 -- minutes

  search_vector         tsvector GENERATED ALWAYS AS (
    setweight(to_tsvector('english'::regconfig, coalesce(title, '')), 'A') ||
    setweight(to_tsvector('english'::regconfig, coalesce(subtitle, '')), 'A') ||
    setweight(to_tsvector('english'::regconfig, coalesce(ai_summary, '')), 'B') ||
    setweight(
      to_tsvector(
        'english'::regconfig,
        coalesce(public.immutable_text_array_join(ai_topics, ' '), '')
      ),
      'B'
    ) ||
    setweight(
      to_tsvector(
        'english'::regconfig,
        coalesce(public.immutable_text_array_join(ai_key_concepts, ' '), '')
      ),
      'C'
    ) ||
    setweight(to_tsvector('english'::regconfig, coalesce(full_text, '')), 'D')
  ) STORED,

  ordinal               integer NOT NULL,
  created_at            timestamptz NOT NULL DEFAULT now(),
  UNIQUE (textbook_id, chapter_number)
);

CREATE INDEX IF NOT EXISTS idx_chapters_textbook
  ON public.textbook_chapters (textbook_id, ordinal);

CREATE INDEX IF NOT EXISTS idx_chapters_unit
  ON public.textbook_chapters (unit_id, ordinal);

CREATE INDEX IF NOT EXISTS idx_chapters_search
  ON public.textbook_chapters
  USING gin (search_vector);

CREATE INDEX IF NOT EXISTS idx_chapters_title_trgm
  ON public.textbook_chapters
  USING gin (title gin_trgm_ops);

-- ------------------------------------------------------------
-- Student progress — per (user, chapter). Drives the TOC
-- status icons, "continue reading" CTA, and aggregate stats
-- on student_textbook_enrollment.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.student_chapter_progress (
  user_id             uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  chapter_id          uuid NOT NULL REFERENCES public.textbook_chapters(id) ON DELETE CASCADE,
  textbook_id         uuid NOT NULL REFERENCES public.textbooks(id) ON DELETE CASCADE,

  status              text NOT NULL DEFAULT 'not_started'
    CHECK (status IN ('not_started','in_progress','completed')),

  time_spent_seconds  integer NOT NULL DEFAULT 0,
  first_opened_at     timestamptz,
  last_opened_at      timestamptz,
  completed_at        timestamptz,

  personal_notes      text,
  bookmarked          boolean NOT NULL DEFAULT false,

  PRIMARY KEY (user_id, chapter_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user_textbook
  ON public.student_chapter_progress (user_id, textbook_id);

-- ------------------------------------------------------------
-- Enrollment — what a student is studying, plus cached
-- aggregates we don't want to recompute on every TOC render.
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.student_textbook_enrollment (
  user_id               uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  textbook_id           uuid NOT NULL REFERENCES public.textbooks(id) ON DELETE CASCADE,

  started_at            timestamptz NOT NULL DEFAULT now(),
  target_exam_date      date,

  chapters_completed    integer NOT NULL DEFAULT 0,
  chapters_in_progress  integer NOT NULL DEFAULT 0,
  last_chapter_id       uuid REFERENCES public.textbook_chapters(id) ON DELETE SET NULL,

  PRIMARY KEY (user_id, textbook_id)
);

-- ------------------------------------------------------------
-- match_textbook_chapters — full-text + trigram search across
-- chapters. Returns (id, score) so the API can do its own
-- secondary hydration (matches the shape of
-- match_resources_by_text in 20260522).
-- ------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.match_textbook_chapters(
  query_text       text,
  textbook_filter  uuid    DEFAULT NULL,
  unit_filter      integer DEFAULT NULL,
  match_count      integer DEFAULT 10
)
RETURNS TABLE (id uuid, score real)
LANGUAGE sql
STABLE
AS $$
  WITH ts_query AS (
    SELECT plainto_tsquery('english'::regconfig, query_text) AS q
  )
  SELECT
    tc.id,
    (
      GREATEST(
        ts_rank_cd(tc.search_vector, (SELECT q FROM ts_query))::real * 0.7,
        similarity(tc.title, query_text)::real * 0.5
      )
    )::real AS score
  FROM public.textbook_chapters tc, ts_query
  WHERE
    (textbook_filter IS NULL OR tc.textbook_id = textbook_filter)
    AND (unit_filter IS NULL OR tc.unit_number = unit_filter)
    AND (
      tc.search_vector @@ (SELECT q FROM ts_query)
      OR similarity(tc.title, query_text) > 0.2
    )
  ORDER BY score DESC
  LIMIT match_count;
$$;

REVOKE ALL ON FUNCTION public.match_textbook_chapters(text, uuid, integer, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.match_textbook_chapters(text, uuid, integer, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.match_textbook_chapters(text, uuid, integer, integer) TO service_role;

-- ------------------------------------------------------------
-- Row-level security
-- ------------------------------------------------------------

ALTER TABLE public.textbooks                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.textbook_units              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.textbook_chapters           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_chapter_progress    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_textbook_enrollment ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "textbooks read published" ON public.textbooks;
CREATE POLICY "textbooks read published"
  ON public.textbooks
  FOR SELECT TO authenticated
  USING (is_published = true);

DROP POLICY IF EXISTS "textbooks author writes" ON public.textbooks;
CREATE POLICY "textbooks author writes"
  ON public.textbooks
  FOR ALL TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

DROP POLICY IF EXISTS "textbooks service" ON public.textbooks;
CREATE POLICY "textbooks service"
  ON public.textbooks
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "units read" ON public.textbook_units;
CREATE POLICY "units read"
  ON public.textbook_units
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.textbooks t
      WHERE t.id = textbook_id AND t.is_published
    )
  );

DROP POLICY IF EXISTS "units service" ON public.textbook_units;
CREATE POLICY "units service"
  ON public.textbook_units
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "chapters read" ON public.textbook_chapters;
CREATE POLICY "chapters read"
  ON public.textbook_chapters
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.textbooks t
      WHERE t.id = textbook_id AND t.is_published
    )
  );

DROP POLICY IF EXISTS "chapters service" ON public.textbook_chapters;
CREATE POLICY "chapters service"
  ON public.textbook_chapters
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "progress own" ON public.student_chapter_progress;
CREATE POLICY "progress own"
  ON public.student_chapter_progress
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "progress service" ON public.student_chapter_progress;
CREATE POLICY "progress service"
  ON public.student_chapter_progress
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "enrollment own" ON public.student_textbook_enrollment;
CREATE POLICY "enrollment own"
  ON public.student_textbook_enrollment
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "enrollment service" ON public.student_textbook_enrollment;
CREATE POLICY "enrollment service"
  ON public.student_textbook_enrollment
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);
