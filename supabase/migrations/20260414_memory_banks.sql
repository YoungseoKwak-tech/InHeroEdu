-- Spark Bank: 무엇이 이 학생을 켜는가
create table if not exists spark_bank (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  trigger_type text,
  intensity numeric(4,2) default 0,
  last_fired_at timestamptz,
  fired_count integer default 0,
  subject text,
  raw_signal text,
  updated_at timestamptz default now()
);
alter table spark_bank enable row level security;
create policy "users own spark" on spark_bank for all using (auth.uid() = user_id);

-- Pattern Bank: 어떻게 이 학생이 생각하는가
create table if not exists pattern_bank (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  hero_code_core text,
  hero_code_state integer default 1,
  hero_code_status text default 'provisional',
  processing_style text,
  total_hours numeric(6,2) default 0,
  confirmed_at timestamptz,
  updated_at timestamptz default now()
);
alter table pattern_bank enable row level security;
create policy "users own pattern" on pattern_bank for all using (auth.uid() = user_id);

-- Moment Bank: 언제 이 학생이 성장했는가 (append only)
create table if not exists moment_bank (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  moment_text text not null,
  subject text,
  moment_type text, -- 'essay_seed' | 'growth' | 'spark_fired'
  session_id text,
  created_at timestamptz default now()
);
alter table moment_bank enable row level security;
create policy "users own moments" on moment_bank for all using (auth.uid() = user_id);

-- Evolution Log: Hero Code 변화 기록 (에세이 소재 핵심)
create table if not exists evolution_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  prev_code text,
  new_code text,
  delta_note text,
  grade_year text,
  created_at timestamptz default now()
);
alter table evolution_log enable row level security;
create policy "users own evolution" on evolution_log for all using (auth.uid() = user_id);
