-- Sprint A telemetry hardening: privacy consent gate, event idempotency,
-- per-session ordering, and server/client timestamp separation.

create table if not exists public.privacy_consents (
  id uuid primary key default gen_random_uuid(),
  user_id text not null,
  consent_type text not null,
  consented boolean not null default false,
  consent_date timestamptz,
  ip_address text,
  version text not null default '1.0',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.privacy_consents
  add column if not exists updated_at timestamptz not null default now();

comment on table public.privacy_consents is
  'Per-user privacy consent records. attention_telemetry gates raw behavioral telemetry writes.';

delete from public.privacy_consents newer
using public.privacy_consents older
where newer.user_id = older.user_id
  and newer.consent_type = older.consent_type
  and newer.ctid < older.ctid;

create unique index if not exists privacy_consents_user_type_uidx
  on public.privacy_consents (user_id, consent_type);

alter table public.privacy_consents enable row level security;

drop policy if exists "privacy consents own select" on public.privacy_consents;
create policy "privacy consents own select"
  on public.privacy_consents for select
  using (auth.uid()::text = user_id);

drop policy if exists "privacy consents own write" on public.privacy_consents;
create policy "privacy consents own write"
  on public.privacy_consents for all
  using (auth.uid()::text = user_id)
  with check (auth.uid()::text = user_id);

drop policy if exists "privacy consents service" on public.privacy_consents;
create policy "privacy consents service"
  on public.privacy_consents for all
  to service_role
  using (true)
  with check (true);

alter table if exists public.attention_events
  add column if not exists event_id uuid not null default gen_random_uuid(),
  add column if not exists seq integer not null default 0,
  add column if not exists client_sent_at timestamptz,
  add column if not exists server_received_at timestamptz not null default now(),
  add column if not exists schema_version integer not null default 1;

create unique index if not exists attention_events_user_event_id_uidx
  on public.attention_events (user_id, event_id);

create index if not exists attention_events_user_session_seq_idx
  on public.attention_events (user_id, session_id, seq);

create index if not exists attention_events_server_received_idx
  on public.attention_events (server_received_at);
