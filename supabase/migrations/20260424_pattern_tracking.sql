-- ============================================================
-- Pattern Tracking System
-- ============================================================

-- 1. Extend lesson_progress with missing columns
ALTER TABLE lesson_progress
  ADD COLUMN IF NOT EXISTS gap_type text,
  ADD COLUMN IF NOT EXISTS time_spent_seconds integer;

-- 2. student_patterns
CREATE TABLE IF NOT EXISTS student_patterns (
  id               uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  pattern_type     text NOT NULL,
  -- CONCEPT_GAP / LANGUAGE_GAP / LOGIC_GAP / SPEED_SKIP / REPEAT_ERROR / CROSS_SUBJECT_GAP
  subject          text,
  unit_id          uuid REFERENCES units(id) ON DELETE SET NULL,
  lesson_id        uuid REFERENCES lessons(id) ON DELETE SET NULL,
  description      text,
  gap_type         text,
  occurrence_count integer DEFAULT 1,
  first_detected   timestamptz DEFAULT now(),
  last_detected    timestamptz DEFAULT now(),
  is_resolved      boolean DEFAULT false
);

CREATE INDEX IF NOT EXISTS student_patterns_user_idx
  ON student_patterns(user_id);
CREATE INDEX IF NOT EXISTS student_patterns_user_type_idx
  ON student_patterns(user_id, pattern_type);

ALTER TABLE student_patterns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own their patterns"
  ON student_patterns FOR ALL
  USING (auth.uid() = user_id);

-- 3. learning_logs
CREATE TABLE IF NOT EXISTS learning_logs (
  id         uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  log_type   text NOT NULL,
  -- LESSON_COMPLETE / GAP_DETECTED / PATTERN_RESOLVED / STREAK / CORRECT
  content    text,
  metadata   jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS learning_logs_user_idx
  ON learning_logs(user_id);
CREATE INDEX IF NOT EXISTS learning_logs_user_type_idx
  ON learning_logs(user_id, log_type);
CREATE INDEX IF NOT EXISTS learning_logs_created_idx
  ON learning_logs(user_id, created_at DESC);

ALTER TABLE learning_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own their logs"
  ON learning_logs FOR ALL
  USING (auth.uid() = user_id);

-- 4. student_stats
CREATE TABLE IF NOT EXISTS student_stats (
  user_id                  uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  lessons_completed        integer DEFAULT 0,
  current_streak           integer DEFAULT 0,
  longest_streak           integer DEFAULT 0,
  total_questions_answered integer DEFAULT 0,
  total_correct            integer DEFAULT 0,
  concept_gaps_detected    integer DEFAULT 0,
  concept_gaps_resolved    integer DEFAULT 0,
  last_active              timestamptz DEFAULT now()
);

ALTER TABLE student_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users own their stats"
  ON student_stats FOR ALL
  USING (auth.uid() = user_id);

-- Service role bypass for server-side upserts
CREATE POLICY "Service role full access — patterns"
  ON student_patterns FOR ALL
  TO service_role USING (true);

CREATE POLICY "Service role full access — logs"
  ON learning_logs FOR ALL
  TO service_role USING (true);

CREATE POLICY "Service role full access — stats"
  ON student_stats FOR ALL
  TO service_role USING (true);
