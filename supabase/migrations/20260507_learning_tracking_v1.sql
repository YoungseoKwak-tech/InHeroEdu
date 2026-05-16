-- ============================================================
-- Learning Tracking V1
-- Canonical event/session tracking for lesson path + long-term memory
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Per-watch session summary
CREATE TABLE IF NOT EXISTS lesson_sessions (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  schema_version       smallint NOT NULL DEFAULT 1 CHECK (schema_version = 1),
  session_id           uuid NOT NULL,
  user_id              uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id            text NOT NULL,
  subject_id           text NOT NULL,
  unit_id              text,
  lesson_id            text NOT NULL,
  lesson_locale        text NOT NULL DEFAULT 'en' CHECK (lesson_locale IN ('en', 'ko')),
  started_at           timestamptz NOT NULL,
  ended_at             timestamptz,
  watch_seconds        integer NOT NULL DEFAULT 0 CHECK (watch_seconds >= 0),
  distinct_pause_count smallint NOT NULL DEFAULT 0 CHECK (distinct_pause_count >= 0),
  pause_points_sec     integer[] NOT NULL DEFAULT '{}' CHECK (cardinality(pause_points_sec) <= 8),
  replay_ranges        jsonb NOT NULL DEFAULT '[]'::jsonb,
  completed_sections   text[] NOT NULL DEFAULT '{}',
  wrong_count          integer NOT NULL DEFAULT 0,
  chat_count           integer NOT NULL DEFAULT 0,
  overlay_count        integer NOT NULL DEFAULT 0,
  dropoff_section      text,
  exit_reason          text,
  created_at           timestamptz NOT NULL DEFAULT now(),
  updated_at           timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, session_id)
);

CREATE INDEX IF NOT EXISTS lesson_sessions_user_started_idx
  ON lesson_sessions(user_id, started_at DESC);

CREATE INDEX IF NOT EXISTS lesson_sessions_user_lesson_idx
  ON lesson_sessions(user_id, lesson_id, started_at DESC);

CREATE INDEX IF NOT EXISTS lesson_sessions_open_idx
  ON lesson_sessions(user_id, started_at DESC)
  WHERE ended_at IS NULL;

ALTER TABLE lesson_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own lesson sessions"
  ON lesson_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access — lesson_sessions"
  ON lesson_sessions FOR ALL
  TO service_role USING (true);


-- 2. Canonical discrete events
-- session_id stays nullable during the dual-write migration window.
CREATE TABLE IF NOT EXISTS learning_events (
  id              bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  schema_version  smallint NOT NULL DEFAULT 1 CHECK (schema_version = 1),
  dedupe_key      text,
  user_id         uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id      uuid,
  course_id       text NOT NULL,
  subject_id      text NOT NULL,
  unit_id         text,
  lesson_id       text NOT NULL,
  lesson_locale   text NOT NULL DEFAULT 'en' CHECK (lesson_locale IN ('en', 'ko')),
  section_key     text,
  event_type      text NOT NULL CHECK (
    event_type IN (
      'session_started',
      'section_completed',
      'overlay_submitted',
      'question_answered',
      'chat_message_sent',
      'lesson_exited',
      'replay_signal',
      'skip_signal'
    )
  ),
  overlay_id      text,
  concept_name    text,
  gap_type        text,
  correct         boolean,
  score           numeric(5,2),
  value_num       double precision,
  value_text      text,
  payload         jsonb NOT NULL DEFAULT '{}'::jsonb,
  client_ts       timestamptz NOT NULL,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS learning_events_user_dedupe_idx
  ON learning_events(user_id, dedupe_key)
  WHERE dedupe_key IS NOT NULL;

CREATE INDEX IF NOT EXISTS learning_events_user_created_idx
  ON learning_events(user_id, created_at DESC);

CREATE INDEX IF NOT EXISTS learning_events_user_lesson_idx
  ON learning_events(user_id, lesson_id, created_at DESC);

CREATE INDEX IF NOT EXISTS learning_events_user_session_idx
  ON learning_events(user_id, session_id, created_at DESC);

CREATE INDEX IF NOT EXISTS learning_events_subject_concept_idx
  ON learning_events(user_id, subject_id, concept_name, created_at DESC);

CREATE INDEX IF NOT EXISTS learning_events_wrong_gap_idx
  ON learning_events(user_id, gap_type, created_at DESC)
  WHERE correct = false AND gap_type IS NOT NULL;

ALTER TABLE learning_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own learning events"
  ON learning_events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access — learning_events"
  ON learning_events FOR ALL
  TO service_role USING (true);


-- 3. Long-term concept mastery
CREATE TABLE IF NOT EXISTS student_concept_mastery (
  user_id                uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id             text NOT NULL,
  concept_name           text NOT NULL,
  attempt_count          integer NOT NULL DEFAULT 0,
  correct_count          integer NOT NULL DEFAULT 0,
  wrong_count            integer NOT NULL DEFAULT 0,
  avg_score              numeric(5,2),
  mastery_score          numeric(5,2) NOT NULL DEFAULT 0,
  confidence_signal      numeric(5,2) NOT NULL DEFAULT 0,
  recent_miss_rate       numeric(5,2) NOT NULL DEFAULT 0,
  current_correct_streak integer NOT NULL DEFAULT 0,
  last_gap_type          text,
  last_seen_lesson_id    text,
  first_seen_at          timestamptz NOT NULL DEFAULT now(),
  last_seen_at           timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, subject_id, concept_name)
);

CREATE INDEX IF NOT EXISTS student_concept_mastery_user_mastery_idx
  ON student_concept_mastery(user_id, subject_id, mastery_score ASC);

CREATE INDEX IF NOT EXISTS student_concept_mastery_user_recent_idx
  ON student_concept_mastery(user_id, subject_id, last_seen_at DESC);

ALTER TABLE student_concept_mastery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own concept mastery"
  ON student_concept_mastery FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access — student_concept_mastery"
  ON student_concept_mastery FOR ALL
  TO service_role USING (true);


-- 4. Read model for overall path state
CREATE TABLE IF NOT EXISTS student_path_state (
  user_id                  uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  subject_id               text NOT NULL,
  current_course_id        text,
  current_unit_id          text,
  current_lesson_id        text,
  last_completed_lesson_id text,
  last_session_id          uuid,
  completion_pct           numeric(5,2) NOT NULL DEFAULT 0 CHECK (completion_pct BETWEEN 0 AND 100),
  momentum_score           smallint NOT NULL DEFAULT 0 CHECK (momentum_score BETWEEN 0 AND 100),
  risk_score               smallint NOT NULL DEFAULT 0 CHECK (risk_score BETWEEN 0 AND 100),
  active_gap_types         text[] NOT NULL DEFAULT '{}',
  top_weak_concepts        text[] NOT NULL DEFAULT '{}',
  top_strong_concepts      text[] NOT NULL DEFAULT '{}',
  next_best_action         text,
  momentum_factors         jsonb NOT NULL DEFAULT '{}'::jsonb,
  risk_factors             jsonb NOT NULL DEFAULT '{}'::jsonb,
  last_active_at           timestamptz NOT NULL DEFAULT now(),
  updated_at               timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, subject_id)
);

CREATE INDEX IF NOT EXISTS student_path_state_risk_idx
  ON student_path_state(user_id, risk_score DESC);

CREATE INDEX IF NOT EXISTS student_path_state_active_idx
  ON student_path_state(user_id, last_active_at DESC);

ALTER TABLE student_path_state ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own path state"
  ON student_path_state FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Service role full access — student_path_state"
  ON student_path_state FOR ALL
  TO service_role USING (true);
