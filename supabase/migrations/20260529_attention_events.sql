-- attention_events — raw behavioral telemetry stream.
--
-- One row per student-observable event. Aggregates (pause_duration,
-- replay_count, scroll_velocity, etc.) and Stage-2 features (Hjorth params,
-- PSD entropy, ZC) are computed downstream from this raw time-series — same
-- pattern as the RMG paper's pipeline, just with student-interaction signals
-- as input instead of RF.
--
-- Privacy: covered by the existing ConsentModal opt-in for behavioral
-- pattern data. RLS confines reads to the student themselves; the analytic
-- pipeline reads via the service role.

create table if not exists public.attention_events (
  id          bigserial primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  -- session_id groups events for one continuous lesson visit. A new visit
  -- (refresh, return next day) generates a new session_id client-side so
  -- the analytic layer can reconstruct one coherent time-series per visit.
  session_id  uuid not null,
  lesson_id   text,
  -- event_type vocabulary (lowercase, underscore):
  --   lesson_start          — first event of a session
  --   lesson_complete       — final playlist item finished
  --   video_play / video_pause
  --   video_seek            — payload: { from_sec, to_sec, direction: 'back' | 'forward' }
  --   video_ended           — natural end of a clip
  --   clip_locked           — clip finished, "✓ SECTION locked" toast fired
  --   visibility_hidden     — student left the tab/window
  --   visibility_visible    — student returned
  --   inactivity_start      — no input for ≥ idle threshold (default 30s)
  --   inactivity_end        — input resumed after inactivity_start
  --   overlay_shown         — TAP/Spark/etc. fired
  --   overlay_answered      — payload: { correct, latency_ms, kind }
  --   overlay_hint_used
  --   overlay_skipped
  event_type  text not null,
  occurred_at timestamptz not null default now(),
  payload     jsonb not null default '{}'::jsonb
);

-- Hot path for stage-2 windowed feature extraction: pull all events for a
-- (user, session) ordered in time. Also covers per-user time-range scans.
create index if not exists attention_events_user_session_time_idx
  on public.attention_events (user_id, session_id, occurred_at);

create index if not exists attention_events_lesson_time_idx
  on public.attention_events (lesson_id, occurred_at)
  where lesson_id is not null;

-- Privacy: students see only their own events. Server-side analytics use the
-- admin client and bypass RLS.
alter table public.attention_events enable row level security;

drop policy if exists "students read own attention events" on public.attention_events;
create policy "students read own attention events"
  on public.attention_events for select
  using (auth.uid() = user_id);

-- No student-side insert / update / delete policy on purpose. All writes go
-- through /api/attention/events (admin client), so we centralize event-shape
-- validation server-side.
