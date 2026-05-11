-- ============================================================
-- Textbook complimentary access — DB-backed allowlist
--
-- Env COMP_TEXTBOOK_EMAILS + ADMIN_EMAILS stay as the fallback floor,
-- but the admin UI manages this table for everyday adds/removes.
-- ============================================================

CREATE TABLE IF NOT EXISTS textbook_comp_emails (
  email      text PRIMARY KEY,
  note       text,
  added_by   uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS textbook_comp_emails_created_idx
  ON textbook_comp_emails(created_at DESC);

ALTER TABLE textbook_comp_emails ENABLE ROW LEVEL SECURITY;

-- Only the service role reads/writes this table — admin API routes use
-- the admin client, so we don't expose this directly to authenticated
-- users via PostgREST.
CREATE POLICY "Service role full access — textbook_comp_emails"
  ON textbook_comp_emails FOR ALL
  TO service_role USING (true);

COMMENT ON TABLE textbook_comp_emails IS
  'Email allowlist for complimentary textbook access. Managed via /admin/comp-emails.';
COMMENT ON COLUMN textbook_comp_emails.email IS
  'Lowercased email. Use lib/textbookAccess.hasComplimentaryTextbookAccess to check.';
