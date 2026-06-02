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
  payment_status text not null default 'not_required',
  payment_amount integer,
  payment_currency text default 'INR',
  payment_plan text,
  razorpay_payment_id text,
  razorpay_order_id text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.booking_requests
add column if not exists payment_status text not null default 'not_required',
add column if not exists payment_amount integer,
add column if not exists payment_currency text default 'INR',
add column if not exists payment_plan text,
add column if not exists razorpay_payment_id text,
add column if not exists razorpay_order_id text;

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

create index if not exists booking_requests_created_at_idx
on public.booking_requests (created_at desc);

create index if not exists booking_requests_service_slug_idx
on public.booking_requests (service_slug);

create index if not exists booking_requests_payment_status_idx
on public.booking_requests (payment_status);

create or replace view public.crm_client_requests as
select
  id,
  service_slug,
  service_title,
  name,
  phone,
  email,
  event_date,
  location,
  functions,
  notes,
  payment_status,
  payment_amount,
  payment_currency,
  payment_plan,
  razorpay_payment_id,
  razorpay_order_id,
  status,
  created_at
from public.booking_requests
order by created_at desc;
