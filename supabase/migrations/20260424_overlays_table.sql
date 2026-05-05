-- ============================================================
-- Overlays Table
-- Rich AI-generated overlay data per lesson
-- ============================================================

CREATE TABLE IF NOT EXISTS overlays (
  id                 uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id          text NOT NULL,
  type               text NOT NULL,
  -- spark | gap_crunch | teach_back | question_sprint | analyzer
  data               jsonb NOT NULL DEFAULT '{}'::jsonb,
  script_section_ref text,
  position           integer NOT NULL DEFAULT 0,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS overlays_lesson_idx
  ON overlays(lesson_id);
CREATE INDEX IF NOT EXISTS overlays_lesson_position_idx
  ON overlays(lesson_id, position);

-- No RLS — admin-only table accessed via service role
