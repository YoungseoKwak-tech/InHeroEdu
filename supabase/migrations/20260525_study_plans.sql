-- ============================================================
-- Personalized study plans — one row per user, overwritten on
-- re-onboard. Stores exam selections (slug + date), the generated
-- weekly schedule, and the matched recommendations (materials,
-- lounges, clubs) so the /my-plan page can render without
-- re-running the matcher every load.
--
-- exam_selections shape:
--   [{ slug, name, exam_date, textbook_id?, total_chapters? }]
-- weekly_schedule shape:
--   { mon: DayBlock[], tue: DayBlock[], ..., sun: DayBlock[] }
-- ============================================================

CREATE TABLE IF NOT EXISTS public.user_study_plans (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  grade                  text,
  exam_selections        jsonb NOT NULL DEFAULT '[]'::jsonb,
  weekly_schedule        jsonb NOT NULL DEFAULT '{}'::jsonb,

  recommended_materials  jsonb NOT NULL DEFAULT '[]'::jsonb,
  recommended_lounges    jsonb NOT NULL DEFAULT '[]'::jsonb,
  recommended_clubs      jsonb NOT NULL DEFAULT '[]'::jsonb,

  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now(),

  UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_study_plans_user
  ON public.user_study_plans (user_id);

ALTER TABLE public.user_study_plans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "plans own" ON public.user_study_plans;
CREATE POLICY "plans own"
  ON public.user_study_plans
  FOR ALL TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS "plans service" ON public.user_study_plans;
CREATE POLICY "plans service"
  ON public.user_study_plans
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);
