-- ============================================================
-- Email marketing consent (정보통신망법 §50 광고성 정보 수신 동의)
--   A SEPARATE, explicit opt-in for EMAIL marketing — distinct from the
--   general terms and from the existing Kakao `marketing_consent`. Default
--   false; captured via its own unchecked checkbox at signup, with a
--   timestamp recorded so consent can be proven later.
-- ============================================================

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS email_marketing_consent    boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS email_marketing_consent_at timestamptz;

-- Fast lookup of email-consented users for a broadcast.
CREATE INDEX IF NOT EXISTS profiles_email_marketing_optin_idx
  ON profiles (email_marketing_consent)
  WHERE email_marketing_consent = true;
