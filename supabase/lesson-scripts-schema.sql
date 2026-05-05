-- lesson_scripts table
-- Stores admin-generated scripts and overlay data per lesson.
-- lesson_id matches the id field in lib/data/lessons.ts

create table if not exists lesson_scripts (
  lesson_id           text primary key,
  script              text,
  overlays            jsonb default '[]'::jsonb,
  materials_url       text,
  materials_text      text,
  script_generated_at timestamptz,
  updated_at          timestamptz default now()
);

alter table lesson_scripts enable row level security;

-- Admins have full access; no student-facing reads
create policy "Service role full access on lesson_scripts"
  on lesson_scripts for all
  using (true)
  with check (true);

-- Index for fast lesson lookups
create index if not exists lesson_scripts_lesson_id_idx on lesson_scripts (lesson_id);
