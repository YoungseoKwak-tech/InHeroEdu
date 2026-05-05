-- Seed AP Biology Unit 2 — Cell Structure and Function
-- Adds the canonical lessons row so future clip uploads against
-- lesson_id = 'ap-biology-u2-l1' can resolve their lesson metadata.
--
-- The route /courses/ap-biology/cell-structure is currently aliased
-- in lib/lessons/index.ts → ap-biology-u1-l1 so the existing u1-l1
-- clips render. Once real Unit 2 clips are uploaded against u2-l1,
-- update SLUG_TO_DB_ID to point cell-structure → ap-biology-u2-l1.

INSERT INTO public.lessons (
  id,
  course_id,
  unit_number,
  unit_title,
  unit_slug,
  lesson_number,
  title,
  topics,
  exam_tip
)
VALUES (
  'ap-biology-u2-l1',
  'ap-biology',
  2,
  'Cell Structure and Function',
  'cell-structure-and-function',
  1,
  'Cell Structure and Function',
  ARRAY[
    'Prokaryotes vs eukaryotes',
    'Membrane-bound organelles',
    'Membrane transport'
  ]::text[],
  'Don''t confuse "no nucleus" with "no DNA" — prokaryotes still have genetic material, just no membrane-bound organelles.'
)
ON CONFLICT (id) DO NOTHING;
