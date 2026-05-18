-- =========================================================
-- Firoda After School (FAS) — full schema, RLS, and seed data
-- =========================================================

-- 1. Extend staff_profiles role check
alter table public.staff_profiles drop constraint if exists staff_profiles_role_check;
alter table public.staff_profiles add constraint staff_profiles_role_check
  check (role in ('admin', 'editor', 'fas_owner'));

-- 2. Security definer helper
create or replace function public.is_fas_owner(_uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists(
    select 1 from public.staff_profiles
    where id = _uid and role = 'fas_owner'
  )
$$;

-- 3. Generic updated_at trigger (idempotent)
create or replace function public.fas_touch_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- =========================================================
-- TABLES
-- =========================================================

create table public.fas_children (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  date_of_birth date not null,
  school_year_group text not null check (school_year_group in (
    'junior_infants','senior_infants','first','second','third','fourth','fifth','sixth'
  )),
  allergies_and_medical text,
  active boolean not null default true,
  enrolled_at date not null default current_date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index fas_children_active_idx on public.fas_children (active);
create index fas_children_last_name_idx on public.fas_children (last_name);
create trigger fas_children_touch before update on public.fas_children
  for each row execute function public.fas_touch_updated_at();

create table public.fas_guardians (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.fas_children(id) on delete cascade,
  full_name text not null,
  relationship text not null,
  phone_primary text not null,
  phone_secondary text,
  email text,
  is_billing_contact boolean not null default false,
  is_emergency_contact boolean not null default true,
  created_at timestamptz not null default now()
);
create index fas_guardians_child_idx on public.fas_guardians (child_id);

create table public.fas_collectors (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.fas_children(id) on delete cascade,
  full_name text not null,
  relationship text not null,
  phone text,
  notes text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index fas_collectors_child_idx on public.fas_collectors (child_id);

create table public.fas_staff (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  role_title text not null,
  active boolean not null default true,
  garda_vetting_renewal_date date,
  created_at timestamptz not null default now()
);

create table public.fas_attendance_days (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.fas_children(id),
  attendance_date date not null,
  arrived_at timestamptz,
  collected_at timestamptz,
  collected_by_id uuid references public.fas_collectors(id),
  collected_by_name text,
  notes text,
  created_at timestamptz not null default now(),
  unique(child_id, attendance_date)
);
create index fas_attendance_date_idx on public.fas_attendance_days (attendance_date);
create index fas_attendance_child_idx on public.fas_attendance_days (child_id);

create table public.fas_staff_shifts (
  id uuid primary key default gen_random_uuid(),
  staff_id uuid not null references public.fas_staff(id),
  shift_date date not null,
  start_at timestamptz not null,
  end_at timestamptz,
  created_at timestamptz not null default now()
);
create index fas_shifts_date_idx on public.fas_staff_shifts (shift_date);

create table public.fas_billing_arrangements (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.fas_children(id) on delete cascade,
  billing_type text not null check (billing_type in ('weekly_flat','daily_rate','per_session')),
  amount_cents int not null check (amount_cents >= 0),
  notes text,
  active boolean not null default true,
  effective_from date not null default current_date,
  created_at timestamptz not null default now()
);
create index fas_billing_child_idx on public.fas_billing_arrangements (child_id);

create table public.fas_invoices (
  id uuid primary key default gen_random_uuid(),
  invoice_number text not null unique,
  child_id uuid not null references public.fas_children(id),
  billing_contact_name text not null,
  billing_contact_email text,
  period_start date not null,
  period_end date not null,
  attendance_days int not null default 0,
  amount_cents int not null,
  status text not null check (status in ('draft','sent','paid','overdue','cancelled')) default 'draft',
  issued_at timestamptz,
  paid_at timestamptz,
  paid_method text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index fas_invoices_status_idx on public.fas_invoices (status);
create index fas_invoices_child_idx on public.fas_invoices (child_id);
create trigger fas_invoices_touch before update on public.fas_invoices
  for each row execute function public.fas_touch_updated_at();

create table public.fas_ratio_breach_events (
  id uuid primary key default gen_random_uuid(),
  occurred_on date not null,
  occurred_at timestamptz not null default now(),
  children_present int not null,
  staff_present int not null,
  ratio_limit int not null default 12,
  duration_minutes int,
  notes text,
  created_at timestamptz not null default now()
);
create index fas_breach_date_idx on public.fas_ratio_breach_events (occurred_on);

create table public.fas_settings (
  id int primary key default 1 check (id = 1),
  service_name text not null default 'Firoda After School',
  opening_time time not null default '14:00',
  closing_time time not null default '18:00',
  max_ratio int not null default 12,
  tusla_registration text,
  bank_details text,
  invoice_prefix text not null default 'FAS',
  invoice_notes text default 'Payment due within 14 days. Bank transfer preferred.',
  updated_at timestamptz not null default now()
);
create trigger fas_settings_touch before update on public.fas_settings
  for each row execute function public.fas_touch_updated_at();

-- =========================================================
-- RLS — enable + policies (fas_owner only)
-- =========================================================

do $$
declare t text;
begin
  for t in select unnest(array[
    'fas_children','fas_guardians','fas_collectors','fas_staff',
    'fas_attendance_days','fas_staff_shifts','fas_billing_arrangements',
    'fas_invoices','fas_ratio_breach_events','fas_settings'
  ]) loop
    execute format('alter table public.%I enable row level security;', t);
    execute format('create policy "fas_owner select %1$s" on public.%1$I for select to authenticated using (public.is_fas_owner(auth.uid()));', t);
    execute format('create policy "fas_owner insert %1$s" on public.%1$I for insert to authenticated with check (public.is_fas_owner(auth.uid()));', t);
    execute format('create policy "fas_owner update %1$s" on public.%1$I for update to authenticated using (public.is_fas_owner(auth.uid())) with check (public.is_fas_owner(auth.uid()));', t);
    execute format('create policy "fas_owner delete %1$s" on public.%1$I for delete to authenticated using (public.is_fas_owner(auth.uid()));', t);
  end loop;
end $$;

-- =========================================================
-- SEED DATA (fictional — delete via UI before going live)
-- =========================================================

insert into public.fas_settings (id) values (1) on conflict (id) do nothing;

-- Staff
with s as (
  insert into public.fas_staff (first_name, last_name, role_title, garda_vetting_renewal_date) values
    ('Marie','Kennedy','Owner/Manager', current_date + interval '180 days'),
    ('Aisling','Brennan','Assistant',    current_date + interval '45 days'),
    ('Ciara','Doyle','Relief',           current_date + interval '300 days')
  returning id, first_name
)
select 1;

-- Children + relations
with c as (
  insert into public.fas_children (first_name, last_name, date_of_birth, school_year_group, allergies_and_medical) values
    ('Aoife',   'McGrath',  current_date - interval '7 years',  'first',          null),
    ('Daithí',  'Walsh',    current_date - interval '5 years',  'junior_infants', 'Mild peanut allergy — EpiPen in bag.'),
    ('Saoirse', 'O''Connor',current_date - interval '6 years',  'senior_infants', null),
    ('Liam',    'Byrne',    current_date - interval '8 years',  'second',         null),
    ('Niamh',   'Murphy',   current_date - interval '9 years',  'third',          'Asthma — inhaler in side pocket.'),
    ('Cillian', 'Phelan',   current_date - interval '10 years', 'fourth',         null),
    ('Éabha',   'Ryan',     current_date - interval '11 years', 'fifth',          null),
    ('Tadhg',   'Foley',    current_date - interval '5 years',  'junior_infants', null)
  returning id, first_name, last_name
)
insert into public.fas_guardians (child_id, full_name, relationship, phone_primary, email, is_billing_contact, is_emergency_contact)
select c.id, c.first_name || '''s parent (' || c.last_name || ')', 'Mother', '087 100 ' || lpad((row_number() over ())::text, 4, '0'),
       lower(c.last_name) || '@example.com', true, true
from c;

-- A second guardian per child
insert into public.fas_guardians (child_id, full_name, relationship, phone_primary, is_billing_contact, is_emergency_contact)
select id, first_name || '''s dad (' || last_name || ')', 'Father', '087 200 ' || lpad((row_number() over ())::text, 4, '0'), false, true
from public.fas_children;

-- Collectors: copy guardians as collectors + one extra each
insert into public.fas_collectors (child_id, full_name, relationship)
select child_id, full_name, relationship from public.fas_guardians;

insert into public.fas_collectors (child_id, full_name, relationship, notes)
select id, 'Granny ' || last_name, 'Grandparent', 'Collects on Fridays' from public.fas_children;

-- Billing
insert into public.fas_billing_arrangements (child_id, billing_type, amount_cents, notes)
select id,
       case when (row_number() over () % 2) = 0 then 'weekly_flat' else 'daily_rate' end,
       case when (row_number() over () % 2) = 0 then 7500 else 1800 end,
       'Initial arrangement'
from public.fas_children;

-- Attendance: last 10 weekdays for ~6 of 8 children
insert into public.fas_attendance_days (child_id, attendance_date, arrived_at, collected_at, collected_by_name)
select c.id,
       d::date,
       (d::date + time '14:10')::timestamptz,
       (d::date + time '17:25')::timestamptz,
       'Parent collected'
from public.fas_children c
cross join generate_series(current_date - interval '14 days', current_date - interval '1 day', interval '1 day') as d
where extract(isodow from d) < 6
  and substr(c.id::text, 1, 1) < 'd';  -- ~roughly subset

-- Today: some present, some not yet arrived (no collection)
insert into public.fas_attendance_days (child_id, attendance_date, arrived_at)
select id, current_date, (current_date + time '14:15')::timestamptz
from public.fas_children
where substr(id::text, 1, 1) < '8'
limit 4;

-- Today: one staff currently on shift
insert into public.fas_staff_shifts (staff_id, shift_date, start_at)
select id, current_date, (current_date + time '14:00')::timestamptz
from public.fas_staff
where role_title = 'Owner/Manager'
limit 1;

-- Sample invoices
insert into public.fas_invoices (invoice_number, child_id, billing_contact_name, billing_contact_email, period_start, period_end, attendance_days, amount_cents, status, issued_at)
select 'FAS-' || to_char(now(),'YYYY') || '-' || lpad(row_number() over ()::text, 3, '0'),
       c.id,
       g.full_name,
       g.email,
       current_date - interval '14 days',
       current_date - interval '8 days',
       5,
       case when (row_number() over () % 4) = 0 then 7500 else 9000 end,
       case ((row_number() over ()) % 4)
         when 0 then 'draft'
         when 1 then 'sent'
         when 2 then 'paid'
         else 'overdue'
       end,
       now() - interval '7 days'
from public.fas_children c
join public.fas_guardians g on g.child_id = c.id and g.is_billing_contact = true
limit 6;
