-- ============================================================
-- Faculty illustration storage
--
-- - faculty_assets: small lookup table, one row per hard-coded faculty
--   id from lib/faculty.ts. Stores the current illustration URL.
-- - storage.buckets: a public 'faculty-assets' bucket for the PNGs/SVGs.
-- ============================================================

CREATE TABLE IF NOT EXISTS faculty_assets (
  faculty_id   text PRIMARY KEY,
  image_url    text,
  uploaded_by  uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  updated_at   timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE faculty_assets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read faculty_assets"
  ON faculty_assets FOR SELECT
  USING (true);

CREATE POLICY "Service role full access — faculty_assets"
  ON faculty_assets FOR ALL
  TO service_role USING (true);

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'faculty-assets',
  'faculty-assets',
  true,
  10485760,  -- 10 MB per file is plenty for an illustration
  ARRAY['image/png', 'image/jpeg', 'image/webp', 'image/gif', 'image/svg+xml']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

COMMENT ON TABLE faculty_assets IS
  'Per-faculty illustration URL, keyed by lib/faculty.ts.FACULTY.id.';
