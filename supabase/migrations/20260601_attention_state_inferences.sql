-- Sprint D: session-level attention state inference.
--
-- These rows are derived from attention_features. They are intentionally
-- explainable: observations + emission scores are stored alongside the final
-- smoothed state so students/admins can audit why a state was assigned.

create table if not exists public.attention_state_inferences (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid not null,
  lesson_id text,
  feature_id bigint references public.attention_features(id) on delete set null,
  feature_pipeline_version smallint not null default 1,
  model_version smallint not null default 1,

  raw_state text not null check (
    raw_state in ('focused_flow', 'productive_struggle', 'passive_drift', 'overloaded', 'quick_scan')
  ),
  smoothed_state text not null check (
    smoothed_state in ('focused_flow', 'productive_struggle', 'passive_drift', 'overloaded', 'quick_scan')
  ),
  confidence double precision not null check (confidence >= 0 and confidence <= 1),
  posterior jsonb not null default '{}'::jsonb,
  emission_scores jsonb not null default '{}'::jsonb,
  observations jsonb not null default '{}'::jsonb,
  transition_prior jsonb not null default '{}'::jsonb,
  inferred_at timestamptz not null default now()
);

create unique index if not exists attention_state_inferences_user_session_model_key
  on public.attention_state_inferences (user_id, session_id, model_version);

create index if not exists attention_state_inferences_user_time_idx
  on public.attention_state_inferences (user_id, inferred_at desc);

create index if not exists attention_state_inferences_lesson_idx
  on public.attention_state_inferences (lesson_id, inferred_at desc)
  where lesson_id is not null;

create index if not exists attention_state_inferences_state_idx
  on public.attention_state_inferences (smoothed_state, inferred_at desc);

alter table public.attention_state_inferences enable row level security;

drop policy if exists "students read own attention states" on public.attention_state_inferences;
create policy "students read own attention states"
  on public.attention_state_inferences for select
  using (auth.uid() = user_id);

drop policy if exists "service manages attention states" on public.attention_state_inferences;
create policy "service manages attention states"
  on public.attention_state_inferences for all to service_role
  using (true)
  with check (true);
