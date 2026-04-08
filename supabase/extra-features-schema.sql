-- ── Community Messages ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS community_messages (
  id         UUID      DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id    TEXT      NOT NULL,
  user_id    TEXT      NOT NULL,
  username   TEXT      NOT NULL,
  content    TEXT      NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_community_room ON community_messages(room_id, created_at DESC);

-- ── Q&A ──────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS qa_questions (
  id           UUID      DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      TEXT      NOT NULL,
  username     TEXT      NOT NULL,
  subject      TEXT,
  title        TEXT      NOT NULL,
  content      TEXT      NOT NULL,
  is_answered  BOOLEAN   DEFAULT false,
  view_count   INTEGER   DEFAULT 0,
  created_at   TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_qa_subject ON qa_questions(subject);

CREATE TABLE IF NOT EXISTS qa_answers (
  id           UUID      DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id  UUID      REFERENCES qa_questions(id) ON DELETE CASCADE,
  user_id      TEXT      NOT NULL,
  username     TEXT      NOT NULL,
  content      TEXT      NOT NULL,
  is_ta        BOOLEAN   DEFAULT false,
  created_at   TIMESTAMP DEFAULT NOW()
);

-- ── Flashcards ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS flashcard_decks (
  id         UUID      DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    TEXT      NOT NULL,
  title      TEXT      NOT NULL,
  subject    TEXT,
  is_public  BOOLEAN   DEFAULT false,
  card_count INTEGER   DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS flashcards (
  id         UUID      DEFAULT gen_random_uuid() PRIMARY KEY,
  deck_id    UUID      REFERENCES flashcard_decks(id) ON DELETE CASCADE,
  front      TEXT      NOT NULL,
  back       TEXT      NOT NULL,
  position   INTEGER   DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_flashcards_deck ON flashcards(deck_id, position);
