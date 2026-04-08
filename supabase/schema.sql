-- ── Users extension (add columns to existing auth.users via profiles table) ─────
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  email text,
  grade int,                        -- 9 / 10 / 11 / 12
  created_at timestamptz default now()
);

-- ── Orders ──────────────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_id text unique not null,    -- Toss orderId (our generated UUID string)
  user_id uuid references auth.users(id) on delete set null,
  service_id text not null,         -- pricing item id e.g. "mega", "grade11"
  order_name text not null,
  amount int not null,              -- KRW
  status text not null default 'pending',   -- pending | paid | failed | cancelled
  payment_key text,                 -- Toss paymentKey (set after confirm)
  customer_name text,
  customer_email text,
  raw_toss_response jsonb,
  created_at timestamptz default now(),
  paid_at timestamptz
);

-- ── Purchases (active entitlements) ─────────────────────────────────────────────
create table if not exists public.purchases (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  order_id uuid references public.orders(id) on delete cascade,
  service_id text not null,
  valid_from timestamptz default now(),
  valid_until timestamptz,          -- null = lifetime
  created_at timestamptz default now()
);

-- ── RLS ─────────────────────────────────────────────────────────────────────────
alter table public.profiles  enable row level security;
alter table public.orders    enable row level security;
alter table public.purchases enable row level security;

-- Profiles: users can read/update their own
create policy "profiles_self" on public.profiles
  for all using (auth.uid() = id);

-- Orders: users can read their own; service role bypasses RLS for writes
create policy "orders_self_read" on public.orders
  for select using (auth.uid() = user_id);

-- Purchases: users can read their own
create policy "purchases_self_read" on public.purchases
  for select using (auth.uid() = user_id);
