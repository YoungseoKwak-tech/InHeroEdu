-- ============================================================
-- Phase 6 — step 4: Tiered verification
--   verifications — user-submitted proof for one of N claim kinds.
--                   Admin reviews; on approval, a matching badge is awarded.
--   Tiers (visible via badges): Visitor / Member / Verified Student / Mentor.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS verifications (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  kind              text NOT NULL CHECK (kind IN (
                       'school','ap_score','olympiad','research','founder','mentor_endorsement'
                    )),
  status            text NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','approved','rejected')),
  claim_text        text NOT NULL CHECK (length(claim_text) BETWEEN 10 AND 800),
  evidence_url      text,
  school_name       text,           -- only used when kind = 'school'
  submitted_at      timestamptz NOT NULL DEFAULT now(),
  reviewed_at       timestamptz,
  reviewer_user_id  uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  decline_reason    text
);

CREATE INDEX IF NOT EXISTS verifications_user_idx
  ON verifications(user_id, submitted_at DESC);

CREATE INDEX IF NOT EXISTS verifications_pending_idx
  ON verifications(submitted_at DESC) WHERE status = 'pending';

ALTER TABLE verifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Owners read own verifications" ON verifications;
DROP POLICY IF EXISTS "Service role full access — verifications" ON verifications;
CREATE POLICY "Owners read own verifications"
  ON verifications FOR SELECT
  USING (auth.uid() = user_id);
CREATE POLICY "Service role full access — verifications"
  ON verifications FOR ALL TO service_role USING (true);
