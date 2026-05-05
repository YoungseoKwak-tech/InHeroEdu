-- lessons table
-- Seeded from lib/data/ap-lesson-breakdown.json via /api/admin/seed-lessons
-- lesson_id format: {courseId}-u{unitNumber}-l{lessonNumber}
-- e.g. ap-biology-u1-l1

create table if not exists lessons (
  id             text primary key,   -- ap-biology-u1-l1
  course_id      text not null,
  unit_number    int  not null,
  unit_title     text not null,
  unit_slug      text,               -- matches slug in courses.ts units array
  lesson_number  int  not null,
  title          text not null,
  topics         jsonb default '[]'::jsonb,
  exam_tip       text,
  created_at     timestamptz default now()
);

alter table lessons enable row level security;

-- Service role full access (admin seeding + generate-script reads)
create policy "Service role full access on lessons"
  on lessons for all
  using (true)
  with check (true);

create index if not exists lessons_course_id_idx on lessons (course_id);
create index if not exists lessons_unit_idx      on lessons (course_id, unit_number);
