-- 20260601_public_preview_and_anon.sql
--
-- Conversion-funnel infrastructure (Phase 1, additive only).
--
--   1. lessons.public_preview — boolean flag. Lessons marked true are
--      reachable via /preview/[slug] without authentication. Used by the
--      zero-signup preview funnel: cold TikTok traffic should be able to
--      experience the product before being asked to register.
--
--   2. attention_events anonymous attribution — allow rows with NULL
--      user_id but a non-NULL anon_session_id (a cookie UUID set on first
--      visit). This keeps the raw telemetry stream complete across the
--      signup boundary, so funnel queries can join pre/post-signup
--      sessions on a single anon_session_id.
--
--   3. lesson_progress anonymous attribution — same shape, same reason.
--
--   4. merge_anon_into_user(p_anon, p_user) — one-shot reattribution run
--      from a post-signup hook so a fresh account inherits the activity
--      that earned the signup.
--
-- Idempotent: every change uses IF NOT EXISTS / DROP POLICY IF EXISTS.

-- ── 1. Public preview flag on lessons ─────────────────────────────────────
alter table public.lessons
  add column if not exists public_preview boolean not null default false;

create index if not exists lessons_public_preview_idx
  on public.lessons (public_preview) where public_preview = true;

-- Flag Lesson 1.1 (Why Water Makes Life Possible) as the first preview.
update public.lessons set public_preview = true where id = 'ap-biology-u1-l1';

-- ── 2. attention_events: accept anonymous inserts ─────────────────────────
alter table public.attention_events
  alter column user_id drop not null;

alter table public.attention_events
  add column if not exists anon_session_id uuid;

create index if not exists attention_events_anon_session_idx
  on public.attention_events (anon_session_id, occurred_at)
  where anon_session_id is not null;

-- Anonymous rows must have an anon_session_id; signed-in rows must have a
-- user_id. Exactly one of the two must be populated.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'attention_events_owner_chk'
  ) then
    alter table public.attention_events
      add constraint attention_events_owner_chk
      check (
        (user_id is not null and anon_session_id is null)
        or (user_id is null and anon_session_id is not null)
      );
  end if;
end $$;

-- ── 3. lesson_progress: accept anonymous inserts ──────────────────────────
alter table public.lesson_progress
  alter column user_id drop not null;

alter table public.lesson_progress
  add column if not exists anon_session_id uuid;

create index if not exists lesson_progress_anon_session_idx
  on public.lesson_progress (anon_session_id, created_at)
  where anon_session_id is not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'lesson_progress_owner_chk'
  ) then
    alter table public.lesson_progress
      add constraint lesson_progress_owner_chk
      check (
        (user_id is not null and anon_session_id is null)
        or (user_id is null and anon_session_id is not null)
      );
  end if;
end $$;

-- ── 4. Anonymous → user reattribution function ────────────────────────────
-- Called from the post-signup flow. Rewrites all rows tagged with the
-- caller's anon_session_id to belong to the new user_id, then clears the
-- anon_session_id (so future inserts use the user_id branch).
--
-- security definer: the function runs with the migration owner's rights,
-- bypassing RLS so a freshly-signed-up user can reclaim their pre-signup
-- session without needing a service-role token round-trip.
create or replace function public.merge_anon_into_user(p_anon uuid, p_user uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_anon is null or p_user is null then
    return;
  end if;

  update public.attention_events
    set user_id = p_user, anon_session_id = null
    where anon_session_id = p_anon;

  update public.lesson_progress
    set user_id = p_user, anon_session_id = null
    where anon_session_id = p_anon;
end
$$;

revoke all on function public.merge_anon_into_user(uuid, uuid) from public;
grant execute on function public.merge_anon_into_user(uuid, uuid) to authenticated;
