create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  source text not null default 'ai_feature',
  created_at timestamptz not null default now()
);

create unique index if not exists waitlist_signups_email_source_idx
  on public.waitlist_signups (lower(email), source);
