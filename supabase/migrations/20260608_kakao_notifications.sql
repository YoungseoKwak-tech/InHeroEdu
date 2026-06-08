-- ============================================================
-- Kakao 알림톡/친구톡 notifications (Solapi)
--   profiles  — add phone + marketing consent + welcome-sent guard so we
--               can (a) send a one-time signup 알림톡 and (b) know who is
--               eligible for a 친구톡 marketing broadcast.
--   kakao_broadcasts — admin-sent marketing blast log (audit + dedupe + stats).
-- ============================================================

-- 1) Profile columns ----------------------------------------------------------
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS phone               text,
  -- E.164-ish digits only (01012345678 / +821012345678) — validated app-side.
  ADD COLUMN IF NOT EXISTS marketing_consent   boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS marketing_consent_at timestamptz,
  -- Set the first time the welcome 알림톡 is sent so we never double-send on
  -- subsequent profile upserts (the profile route runs on every login).
  ADD COLUMN IF NOT EXISTS welcome_sent_at     timestamptz;

-- Fast lookup of consented, contactable parents for a broadcast.
CREATE INDEX IF NOT EXISTS profiles_marketing_optin_idx
  ON profiles (marketing_consent)
  WHERE marketing_consent = true AND phone IS NOT NULL;

-- 2) Broadcast log ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS kakao_broadcasts (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_user_id  uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  channel         text NOT NULL DEFAULT 'friendtalk'
                  CHECK (channel IN ('friendtalk','alimtalk','sms')),
  template_id     text,            -- Solapi/Kakao template id (alimtalk) — null for friendtalk
  title           text NOT NULL,   -- internal label for the admin log
  body            text NOT NULL,   -- the message text actually sent
  link_url        text,            -- optional button/landing link
  audience_count  integer NOT NULL DEFAULT 0,  -- recipients targeted
  sent_count      integer NOT NULL DEFAULT 0,  -- accepted by provider
  failed_count    integer NOT NULL DEFAULT 0,
  status          text NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','sent','partial','failed','dry_run')),
  provider_ref    text,            -- Solapi groupId for reconciliation
  error_text      text,
  created_at      timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS kakao_broadcasts_recent_idx
  ON kakao_broadcasts (created_at DESC);

ALTER TABLE kakao_broadcasts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access — kakao_broadcasts" ON kakao_broadcasts;
CREATE POLICY "Service role full access — kakao_broadcasts"
  ON kakao_broadcasts FOR ALL TO service_role USING (true);
