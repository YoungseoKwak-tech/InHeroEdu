-- Add chapter_json column to lesson_scripts for caching generated textbook content
ALTER TABLE lesson_scripts ADD COLUMN IF NOT EXISTS chapter_json JSONB;
