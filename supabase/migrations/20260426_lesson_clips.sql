CREATE TABLE IF NOT EXISTS public.lesson_clips (
  id            uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  lesson_id     text NOT NULL,
  section_title text NOT NULL,
  section_index integer NOT NULL,
  clip_url      text,
  created_at    timestamptz DEFAULT now()
);

ALTER TABLE public.lesson_clips DISABLE ROW LEVEL SECURITY;

-- Conflict resolution key: one clip per (lesson, section title)
CREATE UNIQUE INDEX IF NOT EXISTS lesson_clips_lesson_title_idx
  ON public.lesson_clips (lesson_id, section_title);
