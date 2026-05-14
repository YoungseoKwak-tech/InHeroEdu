-- ============================================================
-- Phase 7: Chat layer for lounges + clubs
--   Polymorphic over both via (context_type, context_id). One unified
--   chat_messages table, plus reactions / saves / read state.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS chat_messages (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  context_type    text NOT NULL CHECK (context_type IN ('lounge','club')),
  context_id      uuid NOT NULL,
  author_id       uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  type            text NOT NULL DEFAULT 'text'
                  CHECK (type IN ('text','image','file','drop','system')),
  content         text,
  reply_to_id     uuid REFERENCES chat_messages(id) ON DELETE SET NULL,
  attachment_url  text,
  attachment_meta jsonb,
  drop_id         uuid REFERENCES drops(id) ON DELETE SET NULL,
  is_pinned       boolean NOT NULL DEFAULT false,
  is_deleted      boolean NOT NULL DEFAULT false,
  edited_at       timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS chat_messages_feed_idx
  ON chat_messages(context_type, context_id, created_at DESC)
  WHERE is_deleted = false;

CREATE INDEX IF NOT EXISTS chat_messages_pinned_idx
  ON chat_messages(context_type, context_id)
  WHERE is_pinned = true AND is_deleted = false;

CREATE INDEX IF NOT EXISTS chat_messages_attachment_idx
  ON chat_messages(context_type, context_id, created_at DESC)
  WHERE attachment_url IS NOT NULL AND is_deleted = false;

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone reads visible chat" ON chat_messages;
DROP POLICY IF EXISTS "Service role full access — chat_messages" ON chat_messages;
CREATE POLICY "Anyone reads visible chat" ON chat_messages FOR SELECT USING (is_deleted = false);
CREATE POLICY "Service role full access — chat_messages" ON chat_messages FOR ALL TO service_role USING (true);


CREATE TABLE IF NOT EXISTS chat_reactions (
  message_id uuid NOT NULL REFERENCES chat_messages(id) ON DELETE CASCADE,
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  emoji      text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (message_id, user_id, emoji)
);

ALTER TABLE chat_reactions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone reads chat reactions" ON chat_reactions;
DROP POLICY IF EXISTS "Service role full access — chat_reactions" ON chat_reactions;
CREATE POLICY "Anyone reads chat reactions" ON chat_reactions FOR SELECT USING (true);
CREATE POLICY "Service role full access — chat_reactions" ON chat_reactions FOR ALL TO service_role USING (true);


CREATE TABLE IF NOT EXISTS chat_saves (
  user_id    uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  message_id uuid NOT NULL REFERENCES chat_messages(id) ON DELETE CASCADE,
  saved_at   timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, message_id)
);

ALTER TABLE chat_saves ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Owners read own saves" ON chat_saves;
DROP POLICY IF EXISTS "Service role full access — chat_saves" ON chat_saves;
CREATE POLICY "Owners read own saves" ON chat_saves FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role full access — chat_saves" ON chat_saves FOR ALL TO service_role USING (true);


CREATE TABLE IF NOT EXISTS chat_reads (
  context_type text NOT NULL CHECK (context_type IN ('lounge','club')),
  context_id   uuid NOT NULL,
  user_id      uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_read_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (context_type, context_id, user_id)
);

ALTER TABLE chat_reads ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Owners read own reads" ON chat_reads;
DROP POLICY IF EXISTS "Service role full access — chat_reads" ON chat_reads;
CREATE POLICY "Owners read own reads" ON chat_reads FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role full access — chat_reads" ON chat_reads FOR ALL TO service_role USING (true);
