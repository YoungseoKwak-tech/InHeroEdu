-- ============================================================
-- Phase 7 step 4:
--   1) Extend chat_messages.context_type to include 'dm'
--   2) New table dm_threads (deterministic-ordered participant pair)
-- chat_reactions table was already created in 20260514_chat_messages.sql.
-- ============================================================

-- 1. Allow 'dm' as a context_type
ALTER TABLE chat_messages
  DROP CONSTRAINT IF EXISTS chat_messages_context_type_check;
ALTER TABLE chat_messages
  ADD CONSTRAINT chat_messages_context_type_check
  CHECK (context_type IN ('lounge','club','dm'));


-- 2. DM threads: one row per ordered pair of participants
CREATE TABLE IF NOT EXISTS dm_threads (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_a          uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_b          uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_message_at timestamptz NOT NULL DEFAULT now(),
  created_at      timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT dm_threads_ordered_check CHECK (user_a < user_b),
  CONSTRAINT dm_threads_unique_pair   UNIQUE (user_a, user_b)
);

CREATE INDEX IF NOT EXISTS dm_threads_user_a_idx ON dm_threads(user_a, last_message_at DESC);
CREATE INDEX IF NOT EXISTS dm_threads_user_b_idx ON dm_threads(user_b, last_message_at DESC);

ALTER TABLE dm_threads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Participants read DM threads" ON dm_threads;
DROP POLICY IF EXISTS "Service role full access dm_threads" ON dm_threads;
CREATE POLICY "Participants read DM threads" ON dm_threads FOR SELECT
  USING (auth.uid() = user_a OR auth.uid() = user_b);
CREATE POLICY "Service role full access dm_threads" ON dm_threads FOR ALL TO service_role USING (true);
