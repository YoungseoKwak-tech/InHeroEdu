-- ============================================================
-- Overlay Responses Table
-- Logs every student interaction with a DB-driven overlay.
-- Feeds into the cognitive fingerprint / pattern detector.
-- ============================================================

CREATE TABLE IF NOT EXISTS overlay_responses (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lesson_id       text NOT NULL,
  overlay_id      uuid,          -- nullable; no FK so row survives overlay deletion
  overlay_type    text NOT NULL, -- spark | gap_crunch | teach_back | question_sprint | analyzer
  response        text,          -- student's free-text answer (teach_back, gap_crunch, spark)
  score           integer,       -- 1-5 star score (teach_back AI eval)
  correct         boolean,       -- pass/fail (gap_crunch, question_sprint)
  gap_type        text,          -- e.g. CONCEPT_GAP, LOGIC_GAP
  question_idx    integer,       -- which question in a sprint (0-based)
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS overlay_responses_student_idx
  ON overlay_responses(student_id);
CREATE INDEX IF NOT EXISTS overlay_responses_lesson_idx
  ON overlay_responses(lesson_id);

-- RLS
ALTER TABLE overlay_responses ENABLE ROW LEVEL SECURITY;

-- Students can only read/write their own rows
CREATE POLICY overlay_responses_select ON overlay_responses
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY overlay_responses_insert ON overlay_responses
  FOR INSERT WITH CHECK (auth.uid() = student_id);

-- Service role bypasses RLS (used by logOverlayResponse server fn)
