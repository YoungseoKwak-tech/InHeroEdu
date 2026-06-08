-- Credits + referrals (account-persistent).
-- Safe to run multiple times (idempotent).

-- Per-user credit balance, referral code, and unlocked-content set on profiles.
alter table profiles add column if not exists credits integer not null default 200;
alter table profiles add column if not exists referral_code text;
alter table profiles add column if not exists referred_by text;
alter table profiles add column if not exists credit_unlocks jsonb not null default '[]'::jsonb;

-- Referral code is unique (when set).
create unique index if not exists profiles_referral_code_key
  on profiles (referral_code) where referral_code is not null;

-- Receipt of who joined through whom (one row per referred signup).
create table if not exists referrals (
  id uuid primary key default gen_random_uuid(),
  referrer_user_id uuid not null references profiles(id) on delete cascade,
  referred_user_id uuid references profiles(id) on delete set null,
  referred_name text,
  reward integer not null default 20,
  created_at timestamptz not null default now()
);
create index if not exists referrals_referrer_idx on referrals (referrer_user_id);

-- A user can only be referred once.
create unique index if not exists referrals_referred_once
  on referrals (referred_user_id) where referred_user_id is not null;
