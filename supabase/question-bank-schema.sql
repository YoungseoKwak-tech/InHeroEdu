-- Matches the schema actually running in Supabase (as of 2026-04-06)

CREATE TABLE IF NOT EXISTS source_materials (
  id         UUID      DEFAULT gen_random_uuid() PRIMARY KEY,
  subject    TEXT      NOT NULL,
  title      TEXT      NOT NULL,
  file_url   TEXT,
  raw_text   TEXT,
  status     TEXT      DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS questions (
  id                  UUID      DEFAULT gen_random_uuid() PRIMARY KEY,
  subject             TEXT      NOT NULL,
  topic               TEXT      NOT NULL,
  difficulty          TEXT      NOT NULL,
  type                TEXT      NOT NULL,
  question_text       TEXT      NOT NULL,
  option_a            TEXT,
  option_b            TEXT,
  option_c            TEXT,
  option_d            TEXT,
  option_e            TEXT,
  correct_answer      TEXT      NOT NULL,
  explanation         TEXT      NOT NULL,
  explanation_korean  TEXT,
  tags                TEXT[],
  created_at          TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS question_attempts (
  id               UUID      DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          TEXT,
  question_id      UUID      REFERENCES questions(id),
  selected_answer  TEXT,
  is_correct       BOOLEAN,
  time_spent       INTEGER,
  created_at       TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id           UUID      DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      TEXT,
  service_id   TEXT      NOT NULL,
  order_name   TEXT      NOT NULL,
  amount_krw   INTEGER   NOT NULL,
  status       TEXT      DEFAULT 'pending',
  created_at   TIMESTAMP DEFAULT NOW()
);
