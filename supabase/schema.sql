create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  service_slug text not null,
  service_title text not null,
  name text not null,
  phone text not null,
  email text not null,
  event_date date,
  location text,
  functions text[] not null default '{}',
  notes text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.booking_requests enable row level security;

update public.booking_requests
set email = 'missing-email@local.invalid'
where email is null;

drop policy if exists "No public read access for booking requests" on public.booking_requests;
create policy "No public read access for booking requests"
on public.booking_requests
for select
using (false);

alter table public.booking_requests
alter column email set not null;
