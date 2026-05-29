-- attention_signal_windows — derived multi-channel time-series from
-- attention_events. Each row is one 5-second bin of one (user, session).
-- Raw events stay in attention_events as the immutable source of truth;
-- this table is a *representation* layer that makes the Cornell RMG
-- feature pipeline (Hjorth Activity/Mobility/Complexity, PSD entropy,
-- spectral energy, ZC, etc.) honestly applicable — those operators are
-- defined for uniformly-sampled signals, which the raw irregular event
-- stream is not.
--
-- Resampling decisions:
-- * Bin width: 5 seconds (fixed for v1; will revisit when multi-scale
--   windowing is added).
-- * Alignment: bins are anchored to the SESSION's first event, not to
--   wall-clock. Bin 0 is always "first 5s of the session" so cross-
--   session features are positionally comparable.
-- * Missing-value policy:
--     - count-type channels   → 0 in empty bins
--     - latency-type channels → NULL (treat as NaN downstream)
--     - duration-type channels (visibility / inactivity) → fractional
--       duration that falls inside the bin, never carried forward
-- * Content context (Stage 1.5): lesson_section is derived from the
--   sequence of clip_locked events within the session. Difficulty /
--   concept-density columns are reserved for a future join.

create table if not exists public.attention_signal_windows (
  id            bigserial primary key,
  user_id       uuid not null references auth.users(id) on delete cascade,
  session_id    uuid not null,
  lesson_id     text,

  -- Bin position
  bin_index     int  not null check (bin_index >= 0),
  bin_start     timestamptz not null,
  bin_end       timestamptz not null,

  -- ── Channel: interaction density (count-type, default 0) ────────────
  click_count        int not null default 0,
  overlay_event_count int not null default 0,
  events_total       int not null default 0,

  -- ── Channel: cognitive friction (count / latency hybrid) ────────────
  -- mean_latency_ms is NULL when no overlay was answered in the bin —
  -- this is the "NaN" branch of the missing-value policy.
  mean_latency_ms    double precision,
  latency_variance_ms2 double precision,
  replay_count       int not null default 0,
  seek_back_count    int not null default 0,

  -- ── Channel: drift / disengagement (duration-type, default 0) ───────
  visibility_hidden_ms int not null default 0,
  inactivity_ms        int not null default 0,
  tab_switch_count     int not null default 0,

  -- ── Channel: performance ────────────────────────────────────────────
  overlay_attempted int not null default 0,
  overlay_correct   int not null default 0,
  overlay_skipped   int not null default 0,
  overlay_hint_used int not null default 0,
  accuracy_in_bin   double precision, -- NULL when overlay_attempted = 0

  -- ── Stage 1.5 content context (derived from event sequence) ─────────
  lesson_section    text,                -- e.g. "HERO EXPLAIN 1"
  active_overlay_kind text,              -- "predict" | "trap" | "connect"

  -- Bookkeeping
  computed_at       timestamptz not null default now(),
  resampler_version smallint not null default 1
);

-- Idempotent upsert key: re-running the resampler overwrites a bin
-- rather than inserting a duplicate.
create unique index if not exists attention_signal_windows_session_bin_key
  on public.attention_signal_windows (user_id, session_id, bin_index);

-- Read paths: per-session ordered scan (visualization), per-user
-- across-session aggregations (Stage-3 state inference).
create index if not exists attention_signal_windows_session_idx
  on public.attention_signal_windows (session_id, bin_index);
create index if not exists attention_signal_windows_user_time_idx
  on public.attention_signal_windows (user_id, bin_start);
create index if not exists attention_signal_windows_lesson_idx
  on public.attention_signal_windows (lesson_id, bin_start)
  where lesson_id is not null;

-- RLS: students read only their own windows. Writes are admin-client only.
alter table public.attention_signal_windows enable row level security;

drop policy if exists "students read own windows" on public.attention_signal_windows;
create policy "students read own windows"
  on public.attention_signal_windows for select
  using (auth.uid() = user_id);
