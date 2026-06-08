-- ============================================================
-- 자료요청 & 피드백 (parent_feedback)
--   Parents submit a resource request or platform feedback; submissions are
--   read back publicly (reflected on /parents/feedback) and triaged by status.
-- ============================================================

CREATE TABLE IF NOT EXISTS parent_feedback (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  kind        text NOT NULL DEFAULT 'request'
              CHECK (kind IN ('request','feedback','bug')),
  nickname    text,
  body        text NOT NULL CHECK (length(body) BETWEEN 2 AND 2000),
  status      text NOT NULL DEFAULT 'open'
              CHECK (status IN ('open','reviewing','done','declined')),
  upvotes     integer NOT NULL DEFAULT 0,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS parent_feedback_recent_idx
  ON parent_feedback (created_at DESC);

ALTER TABLE parent_feedback ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access parent_feedback" ON parent_feedback;
CREATE POLICY "Service role full access parent_feedback"
  ON parent_feedback FOR ALL TO service_role USING (true);
