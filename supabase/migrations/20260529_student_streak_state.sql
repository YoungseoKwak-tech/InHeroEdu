-- Per-student streak state used by the in-lesson TAP_QUICK pill and the
-- navbar-level always-visible 🔥 N · Tier indicator. One row per user.
-- Server is the source of truth; the lesson player still keeps a local
-- useState mirror for instant UI feedback, then patches the server.

create table if not exists public.student_streak_state (
  user_id          uuid primary key references auth.users(id) on delete cascade,
  current_streak   int  not null default 0 check (current_streak >= 0),
  highest_streak   int  not null default 0 check (highest_streak >= 0),
  current_tier     text not null default 'passive_learner',
  last_correct_at  timestamptz,
  updated_at       timestamptz not null default now()
);

create index if not exists student_streak_state_tier_idx
  on public.student_streak_state (current_tier);

alter table public.student_streak_state enable row level security;

-- Students see only their own streak.
drop policy if exists "students read own streak" on public.student_streak_state;
create policy "students read own streak"
  on public.student_streak_state for select
  using (auth.uid() = user_id);

-- Students upsert only their own streak. Service role (used by /api/streak)
-- bypasses RLS, so the policy is mainly a defensive net for any client-side
-- attempt to write directly via the anon key.
drop policy if exists "students upsert own streak" on public.student_streak_state;
create policy "students upsert own streak"
  on public.student_streak_state for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
