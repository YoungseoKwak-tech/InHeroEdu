-- Add video_url column to lesson_scripts
ALTER TABLE lesson_scripts
  ADD COLUMN IF NOT EXISTS video_url text;

-- Storage bucket for lesson videos (run once; ignore error if already exists)
-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('lesson-videos', 'lesson-videos', true)
-- ON CONFLICT (id) DO NOTHING;
