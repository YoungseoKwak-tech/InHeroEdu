-- attention_features — session-level feature vectors derived from the
-- attention_signal_windows representation layer + attention_events for
-- event-domain irregularity / transition metrics.
--
-- One row per (user_id, session_id, feature_pipeline_version) so multiple
-- pipeline versions can coexist; ablation / reproducibility / before-after
-- comparison work straight out of the box.
--
-- Channels chosen are the four highest-information-content signals:
--   * latency        — cognitive friction (mean_latency_ms over bins)
--   * replay         — confusion proxy (replay_count over bins)
--   * visibility     — drift / disengagement (visibility_hidden_ms over bins)
--   * inactivity     — drift / disengagement (inactivity_ms over bins)
--
-- Per channel we compute:
--   mean, var, cv, hjorth_(activity|mobility|complexity),
--   psd_entropy, spectral_energy, zc, valid_bins
-- = 10 features × 4 channels = 40 columns.
--
-- Plus event-domain irregularity over raw attention_events ISIs:
--   isi_burstiness (Goh & Barabási B), fano_factor, isi_entropy, isi_mean_ms,
--   total_events.
--
-- Plus transition / sequential features:
--   p_seek_back_after_wrong, p_replay_then_correct,
--   mean_visibility_return_ms, confusion_loops.
--
-- Nulls are real: ill-defined Hjorth on constant signals, undefined Mobility
-- when var(x) = 0, etc. Downstream weighting / state inference must respect
-- nullability — that is the "representation validity" check, not a bug.

create table if not exists public.attention_features (
  id                         bigserial primary key,
  user_id                    uuid not null references auth.users(id) on delete cascade,
  session_id                 uuid not null,
  lesson_id                  text,
  bin_count                  int  not null,
  wall_clock_duration_ms     bigint not null,
  feature_pipeline_version   smallint not null default 1,

  -- ── Channel: latency ─────────────────────────────────────────────
  latency_mean               double precision,
  latency_var                double precision,
  latency_cv                 double precision,
  latency_hjorth_activity    double precision,
  latency_hjorth_mobility    double precision,
  latency_hjorth_complexity  double precision,
  latency_psd_entropy        double precision,
  latency_spectral_energy    double precision,
  latency_zc                 int,
  latency_valid_bins         int,

  -- ── Channel: replay ──────────────────────────────────────────────
  replay_mean                double precision,
  replay_var                 double precision,
  replay_cv                  double precision,
  replay_hjorth_activity     double precision,
  replay_hjorth_mobility     double precision,
  replay_hjorth_complexity   double precision,
  replay_psd_entropy         double precision,
  replay_spectral_energy     double precision,
  replay_zc                  int,
  replay_valid_bins          int,

  -- ── Channel: visibility (drift) ──────────────────────────────────
  visibility_mean            double precision,
  visibility_var             double precision,
  visibility_cv              double precision,
  visibility_hjorth_activity double precision,
  visibility_hjorth_mobility double precision,
  visibility_hjorth_complexity double precision,
  visibility_psd_entropy     double precision,
  visibility_spectral_energy double precision,
  visibility_zc              int,
  visibility_valid_bins      int,

  -- ── Channel: inactivity ──────────────────────────────────────────
  inactivity_mean            double precision,
  inactivity_var             double precision,
  inactivity_cv              double precision,
  inactivity_hjorth_activity double precision,
  inactivity_hjorth_mobility double precision,
  inactivity_hjorth_complexity double precision,
  inactivity_psd_entropy     double precision,
  inactivity_spectral_energy double precision,
  inactivity_zc              int,
  inactivity_valid_bins      int,

  -- ── Event-domain irregularity (point-process statistics) ────────
  total_events               int,
  isi_mean_ms                double precision,
  isi_burstiness             double precision, -- Goh & Barabási (2008) B
  isi_fano_factor            double precision, -- variance / mean over time windows
  isi_entropy                double precision, -- Shannon entropy of ISI bins

  -- ── Transition / sequential structure ───────────────────────────
  p_seek_back_after_wrong    double precision, -- P(video_seek back within 30s | overlay wrong)
  p_replay_then_correct      double precision, -- P(next overlay correct | replay occurred)
  mean_visibility_return_ms  double precision, -- mean of visibility_hidden → visibility_visible durations
  confusion_loops            int,              -- count of wrong → seek_back → wrong patterns

  -- ── Performance summary (single-number convenience) ─────────────
  session_accuracy           double precision, -- correct / attempted across the whole session

  computed_at                timestamptz not null default now()
);

-- Idempotent upsert key. Different pipeline versions ARE allowed to coexist
-- for the same session — that's the whole point of feature_pipeline_version.
create unique index if not exists attention_features_session_version_key
  on public.attention_features (user_id, session_id, feature_pipeline_version);

create index if not exists attention_features_user_time_idx
  on public.attention_features (user_id, computed_at);
create index if not exists attention_features_lesson_idx
  on public.attention_features (lesson_id, computed_at) where lesson_id is not null;

alter table public.attention_features enable row level security;

drop policy if exists "students read own features" on public.attention_features;
create policy "students read own features"
  on public.attention_features for select
  using (auth.uid() = user_id);
