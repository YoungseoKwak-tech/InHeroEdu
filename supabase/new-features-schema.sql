-- ============================================================
-- InHero — New Features Schema
-- Run this in Supabase SQL Editor
-- If you previously ran extra-features-schema.sql, you may
-- need to run: DROP TABLE IF EXISTS community_messages CASCADE;
--              DROP TABLE IF EXISTS flashcards CASCADE;
--              before running this file.
-- ============================================================

-- ── 1. Community ───────────────────────────────────────────

DROP TABLE IF EXISTS community_messages CASCADE;

CREATE TABLE community_messages (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id      TEXT NOT NULL,
  user_id      TEXT,
  nickname     TEXT,
  country_flag TEXT,
  content      TEXT NOT NULL,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_community_messages_room_created
  ON community_messages (room_id, created_at DESC);

CREATE TABLE IF NOT EXISTS clubs (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name         TEXT NOT NULL,
  emoji        TEXT,
  description  TEXT,
  member_count INTEGER DEFAULT 0,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE community_messages;

-- RLS (permissive — student platform)
ALTER TABLE community_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "read all" ON community_messages FOR SELECT USING (true);
CREATE POLICY "insert all" ON community_messages FOR INSERT WITH CHECK (true);

-- ── 2. Points & Leaderboard ────────────────────────────────

CREATE TABLE IF NOT EXISTS user_points (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id          TEXT NOT NULL UNIQUE,
  nickname         TEXT,
  points           INTEGER DEFAULT 0,
  total_earned     INTEGER DEFAULT 0,
  streak_days      INTEGER DEFAULT 0,
  last_study_date  DATE,
  updated_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS point_history (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    TEXT NOT NULL,
  action     TEXT NOT NULL,
  points     INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── 3. Q&A ─────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS questions_qa (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id      TEXT,
  nickname     TEXT,
  subject      TEXT,
  title        TEXT NOT NULL,
  content      TEXT NOT NULL,
  view_count   INTEGER DEFAULT 0,
  answer_count INTEGER DEFAULT 0,
  created_at   TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS answers_qa (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  question_id UUID REFERENCES questions_qa(id) ON DELETE CASCADE,
  user_id     TEXT,
  nickname    TEXT,
  content     TEXT NOT NULL,
  is_ai       BOOLEAN DEFAULT false,
  is_expert   BOOLEAN DEFAULT false,
  is_accepted BOOLEAN DEFAULT false,
  likes       INTEGER DEFAULT 0,
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ── 4. Flashcards ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS flashcard_sets (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subject    TEXT NOT NULL,
  title      TEXT NOT NULL,
  card_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

DROP TABLE IF EXISTS flashcards CASCADE;

CREATE TABLE flashcards (
  id                UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  set_id            UUID REFERENCES flashcard_sets(id) ON DELETE CASCADE,
  front_text        TEXT NOT NULL,
  back_text_korean  TEXT NOT NULL,
  back_text_english TEXT,
  example           TEXT,
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS flashcard_progress (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    TEXT,
  card_id    UUID REFERENCES flashcards(id) ON DELETE CASCADE,
  status     TEXT DEFAULT 'unseen',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, card_id)
);

-- ── 5. Sample Data: AP Biology 세트 ───────────────────────

DO $$
DECLARE
  set_id UUID;
BEGIN
  INSERT INTO flashcard_sets (subject, title, card_count)
  VALUES ('AP Biology', 'AP Biology — 미토콘드리아 용어', 5)
  RETURNING id INTO set_id;

  INSERT INTO flashcards (set_id, front_text, back_text_korean, back_text_english, example) VALUES
    (set_id, 'Mitochondria', '세포의 발전소 — ATP를 생산하는 세포 소기관', 'The powerhouse of the cell that produces ATP via cellular respiration', '미토콘드리아는 이중막 구조를 가지며 자체 DNA를 보유한다.'),
    (set_id, 'ATP Synthase', 'ATP를 합성하는 효소 — 미토콘드리아 내막에 위치', 'Enzyme that synthesizes ATP using the proton gradient across the inner membrane', '양성자 구배(proton gradient)를 이용해 ADP + Pi → ATP 반응을 촉진한다.'),
    (set_id, 'Cellular Respiration', '포도당을 ATP로 변환하는 과정 — 3단계로 구성', 'Process converting glucose into ATP through glycolysis, Krebs cycle, and ETC', 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + ATP (최대 38 ATP)'),
    (set_id, 'Krebs Cycle', 'TCA 회로 — 미토콘드리아 기질에서 진행되는 탄소 산화 과정', 'Citric acid cycle occurring in mitochondrial matrix; produces NADH, FADH₂, CO₂', '아세틸-CoA 1분자당 3 NADH, 1 FADH₂, 1 GTP, 2 CO₂ 생성'),
    (set_id, 'Electron Transport Chain', '미토콘드리아 내막의 단백질 복합체 — ATP 대량 생산', 'Series of protein complexes in inner membrane that produce bulk of ATP', 'NADH → Complex I → Ubiquinone → Complex III → Cytochrome c → Complex IV → O₂');

  UPDATE flashcard_sets SET card_count = 5 WHERE id = set_id;
END $$;
