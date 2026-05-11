-- ============================================================
-- Faculty intro video — extend faculty_assets + add a video bucket
-- ============================================================

ALTER TABLE faculty_assets
  ADD COLUMN IF NOT EXISTS intro_video_url text,
  ADD COLUMN IF NOT EXISTS intro_video_uploaded_at timestamptz;

COMMENT ON COLUMN faculty_assets.intro_video_url IS
  'Public URL of the instructor intro video. Rendered as the first slot in the Classroom card.';

-- Separate bucket because videos need a higher size limit than the
-- 10 MB illustration bucket.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'faculty-videos',
  'faculty-videos',
  true,
  524288000,  -- 500 MB
  ARRAY['video/mp4', 'video/webm', 'video/quicktime']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;
