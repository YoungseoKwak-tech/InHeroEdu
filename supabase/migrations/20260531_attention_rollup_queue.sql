-- Sprint C: async attention rollup queue.
--
-- Raw attention_events remains the immutable source of truth. We do not
-- convert it into a partitioned table in-place because that is a production
-- maintenance operation with data-copy/lock risk. Instead, this migration adds
-- the queue/lease layer needed to move expensive rollups out of request time.

create index if not exists attention_events_user_session_time_idx
  on public.attention_events (user_id, session_id, occurred_at);

create index if not exists attention_events_occurred_brin_idx
  on public.attention_events using brin (occurred_at);

create table if not exists public.attention_rollup_queue (
  id bigserial primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  session_id uuid not null,
  lesson_id text,
  first_event_at timestamptz,
  last_event_at timestamptz,
  processed_through_at timestamptz,
  event_count integer not null default 0 check (event_count >= 0),
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'done', 'failed')),
  attempts integer not null default 0 check (attempts >= 0),
  next_run_at timestamptz not null default now(),
  locked_at timestamptz,
  locked_by text,
  last_error text,
  processed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists attention_rollup_queue_user_session_key
  on public.attention_rollup_queue (user_id, session_id);

create index if not exists attention_rollup_queue_ready_idx
  on public.attention_rollup_queue (status, next_run_at, id)
  where status in ('pending', 'failed');

create index if not exists attention_rollup_queue_stale_lease_idx
  on public.attention_rollup_queue (locked_at)
  where status = 'processing';

alter table public.attention_rollup_queue enable row level security;

drop policy if exists "students read own attention rollup jobs" on public.attention_rollup_queue;
create policy "students read own attention rollup jobs"
  on public.attention_rollup_queue for select
  using (auth.uid() = user_id);

drop policy if exists "service manages attention rollup jobs" on public.attention_rollup_queue;
create policy "service manages attention rollup jobs"
  on public.attention_rollup_queue for all to service_role
  using (true)
  with check (true);

create or replace function public.enqueue_attention_rollup(
  p_user_id uuid,
  p_session_id uuid,
  p_lesson_id text,
  p_event_count integer,
  p_first_event_at timestamptz,
  p_last_event_at timestamptz
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.attention_rollup_queue (
    user_id,
    session_id,
    lesson_id,
    first_event_at,
    last_event_at,
    event_count,
    status,
    next_run_at,
    updated_at
  )
  values (
    p_user_id,
    p_session_id,
    p_lesson_id,
    p_first_event_at,
    p_last_event_at,
    greatest(coalesce(p_event_count, 0), 0),
    'pending',
    now() + interval '30 seconds',
    now()
  )
  on conflict (user_id, session_id)
  do update set
    lesson_id = coalesce(excluded.lesson_id, attention_rollup_queue.lesson_id),
    first_event_at = case
      when attention_rollup_queue.first_event_at is null then excluded.first_event_at
      when excluded.first_event_at is null then attention_rollup_queue.first_event_at
      else least(attention_rollup_queue.first_event_at, excluded.first_event_at)
    end,
    last_event_at = case
      when attention_rollup_queue.last_event_at is null then excluded.last_event_at
      when excluded.last_event_at is null then attention_rollup_queue.last_event_at
      else greatest(attention_rollup_queue.last_event_at, excluded.last_event_at)
    end,
    event_count = attention_rollup_queue.event_count + excluded.event_count,
    status = case
      when attention_rollup_queue.status = 'processing' then 'processing'
      else 'pending'
    end,
    next_run_at = case
      when attention_rollup_queue.status = 'processing' then attention_rollup_queue.next_run_at
      else least(attention_rollup_queue.next_run_at, now() + interval '30 seconds')
    end,
    last_error = null,
    updated_at = now();
end;
$$;

create or replace function public.claim_attention_rollup_jobs(
  p_limit integer default 25,
  p_lease_seconds integer default 300,
  p_worker_id text default null
)
returns table (
  id bigint,
  user_id uuid,
  session_id uuid,
  lesson_id text,
  last_event_at timestamptz,
  event_count integer,
  attempts integer
)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
  with candidates as (
    select q.id
    from public.attention_rollup_queue q
    where (
      q.status in ('pending', 'failed')
      and q.next_run_at <= now()
    ) or (
      q.status = 'processing'
      and q.locked_at < now() - make_interval(secs => greatest(p_lease_seconds, 60))
    )
    order by q.next_run_at asc, q.id asc
    limit greatest(1, least(coalesce(p_limit, 25), 100))
    for update skip locked
  ),
  claimed as (
    update public.attention_rollup_queue q
    set
      status = 'processing',
      locked_at = now(),
      locked_by = coalesce(nullif(p_worker_id, ''), 'attention-rollup-worker'),
      attempts = q.attempts + 1,
      updated_at = now()
    from candidates
    where q.id = candidates.id
    returning q.id, q.user_id, q.session_id, q.lesson_id, q.last_event_at, q.event_count, q.attempts
  )
  select claimed.id, claimed.user_id, claimed.session_id, claimed.lesson_id, claimed.last_event_at, claimed.event_count, claimed.attempts
  from claimed;
end;
$$;

create or replace function public.finish_attention_rollup_job(
  p_id bigint,
  p_status text,
  p_error text default null,
  p_processed_through_at timestamptz default null,
  p_processed_event_count integer default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_status = 'done' then
    update public.attention_rollup_queue q
    set
      status = case
        when p_processed_event_count is not null
          and q.event_count > p_processed_event_count
        then 'pending'
        when p_processed_through_at is not null
          and q.last_event_at is not null
          and q.last_event_at > p_processed_through_at
        then 'pending'
        else 'done'
      end,
      processed_through_at = case
        when p_processed_through_at is null then q.processed_through_at
        when q.processed_through_at is null then p_processed_through_at
        else greatest(q.processed_through_at, p_processed_through_at)
      end,
      processed_at = now(),
      locked_at = null,
      locked_by = null,
      last_error = null,
      next_run_at = case
        when p_processed_event_count is not null
          and q.event_count > p_processed_event_count
        then now() + interval '15 seconds'
        when p_processed_through_at is not null
          and q.last_event_at is not null
          and q.last_event_at > p_processed_through_at
        then now() + interval '15 seconds'
        else q.next_run_at
      end,
      updated_at = now()
    where q.id = p_id;
  elsif p_status = 'failed' then
    update public.attention_rollup_queue q
    set
      status = 'failed',
      locked_at = null,
      locked_by = null,
      last_error = left(coalesce(p_error, 'unknown error'), 2000),
      next_run_at = now() + make_interval(
        secs => least(3600, greatest(60, (power(2, least(q.attempts, 6))::integer * 30)))
      ),
      updated_at = now()
    where q.id = p_id;
  else
    raise exception 'invalid attention rollup status: %', p_status;
  end if;
end;
$$;

create or replace function public.cleanup_attention_rollup_queue(
  p_older_than interval default interval '30 days'
)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  v_deleted integer;
begin
  delete from public.attention_rollup_queue
  where status = 'done'
    and processed_at < now() - p_older_than;

  get diagnostics v_deleted = row_count;
  return v_deleted;
end;
$$;

revoke all on function public.enqueue_attention_rollup(uuid, uuid, text, integer, timestamptz, timestamptz)
  from public, anon, authenticated;
grant execute on function public.enqueue_attention_rollup(uuid, uuid, text, integer, timestamptz, timestamptz)
  to service_role;

revoke all on function public.claim_attention_rollup_jobs(integer, integer, text)
  from public, anon, authenticated;
grant execute on function public.claim_attention_rollup_jobs(integer, integer, text)
  to service_role;

revoke all on function public.finish_attention_rollup_job(bigint, text, text, timestamptz, integer)
  from public, anon, authenticated;
grant execute on function public.finish_attention_rollup_job(bigint, text, text, timestamptz, integer)
  to service_role;

revoke all on function public.cleanup_attention_rollup_queue(interval)
  from public, anon, authenticated;
grant execute on function public.cleanup_attention_rollup_queue(interval)
  to service_role;
