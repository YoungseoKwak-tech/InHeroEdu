create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text,
  grade text,
  school text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "users own profile" on profiles for all using (auth.uid() = id);
create policy "service role all" on profiles for all using (true) with check (true);
