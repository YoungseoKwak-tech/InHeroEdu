-- ============================================================
-- IB Curriculum Support — Phase 0 foundation
--
-- Adds curriculum metadata to courses, HL/SL + syllabus topic codes
-- to lessons, and IB paper target to overlays. AP-derived data keeps
-- its current behavior via the 'AP' default.
-- ============================================================

-- 1. courses — curriculum identifier + IB-specific metadata
ALTER TABLE courses
  ADD COLUMN IF NOT EXISTS curriculum text NOT NULL DEFAULT 'AP'
    CHECK (curriculum IN ('AP', 'IB', 'A_LEVEL', 'SAT', 'OTHER')),
  ADD COLUMN IF NOT EXISTS ib_group smallint
    CHECK (ib_group IS NULL OR ib_group BETWEEN 1 AND 6),
  ADD COLUMN IF NOT EXISTS ib_syllabus_first_teaching int;

CREATE INDEX IF NOT EXISTS courses_curriculum_idx
  ON courses(curriculum);

COMMENT ON COLUMN courses.curriculum IS
  'AP | IB | A_LEVEL | SAT | OTHER. Default AP keeps existing rows unchanged.';
COMMENT ON COLUMN courses.ib_group IS
  '1 Lang & Lit, 2 Lang Acquisition, 3 Individuals & Societies, 4 Sciences, 5 Math, 6 Arts';
COMMENT ON COLUMN courses.ib_syllabus_first_teaching IS
  'First teaching year of the IB syllabus this course tracks (e.g. 2025 for Bio).';


-- 2. lessons — HL/SL level + IB topic code
ALTER TABLE lessons
  ADD COLUMN IF NOT EXISTS ib_level text
    CHECK (ib_level IS NULL OR ib_level IN ('HL', 'SL', 'BOTH')),
  ADD COLUMN IF NOT EXISTS ib_topic_code text;

CREATE INDEX IF NOT EXISTS lessons_ib_level_idx
  ON lessons(course_id, ib_level)
  WHERE ib_level IS NOT NULL;

COMMENT ON COLUMN lessons.ib_level IS
  'HL | SL | BOTH. NULL for non-IB lessons. Drives the HL/SL toggle filter.';
COMMENT ON COLUMN lessons.ib_topic_code IS
  'IB syllabus topic code (e.g. "A.1.2" for Bio 2025 Theme A, sub-topic 1.2).';


-- 3. overlays — IB paper target for paper-style practice
ALTER TABLE overlays
  ADD COLUMN IF NOT EXISTS ib_paper text
    CHECK (ib_paper IS NULL OR ib_paper IN ('P1', 'P2', 'P3', 'IA'));

COMMENT ON COLUMN overlays.ib_paper IS
  'P1 | P2 | P3 | IA — tags an overlay/practice item to its IB exam paper.';
