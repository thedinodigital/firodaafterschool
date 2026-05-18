-- Enum for year groups
create type public.year_group as enum (
  'junior_infants','senior_infants','first','second','third','fourth','fifth','sixth'
);

-- enrolment_snapshots
create table public.enrolment_snapshots (
  id uuid primary key default gen_random_uuid(),
  academic_year text not null,
  year_group public.year_group not null,
  count int not null check (count >= 0),
  notes text,
  is_current boolean not null default false,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id),
  unique(academic_year, year_group)
);
create index enrolment_snapshots_current_idx on public.enrolment_snapshots (is_current) where is_current = true;

alter table public.enrolment_snapshots enable row level security;

create policy "admins select enrolment" on public.enrolment_snapshots
  for select to authenticated using (public.is_admin(auth.uid()));
create policy "admins insert enrolment" on public.enrolment_snapshots
  for insert to authenticated with check (public.is_admin(auth.uid()));
create policy "admins update enrolment" on public.enrolment_snapshots
  for update to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "admins delete enrolment" on public.enrolment_snapshots
  for delete to authenticated using (public.is_admin(auth.uid()));

-- projection_scenarios
create table public.projection_scenarios (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  is_baseline boolean not null default false,
  ji_intake jsonb not null default '{}'::jsonb,
  adjustments jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

alter table public.projection_scenarios enable row level security;

create policy "admins select scenarios" on public.projection_scenarios
  for select to authenticated using (public.is_admin(auth.uid()));
create policy "admins insert scenarios" on public.projection_scenarios
  for insert to authenticated with check (public.is_admin(auth.uid()));
create policy "admins update scenarios" on public.projection_scenarios
  for update to authenticated using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));
create policy "admins delete scenarios" on public.projection_scenarios
  for delete to authenticated using (public.is_admin(auth.uid()));

-- staffing_thresholds (read-only reference)
create table public.staffing_thresholds (
  id serial primary key,
  config_label text not null unique,
  total_teachers int not null,
  appointment_min int not null,
  retention_min int not null,
  school_type text not null default 'ordinary'
);
comment on table public.staffing_thresholds is 'Source: DoE Circular 0011/2025, Appendix A. Update when the Department issues a new schedule.';

alter table public.staffing_thresholds enable row level security;
create policy "staff read thresholds" on public.staffing_thresholds
  for select to authenticated using (public.is_staff(auth.uid()));

insert into public.staffing_thresholds (config_label, total_teachers, appointment_min, retention_min) values
  ('P+1', 2, 14, 11),
  ('P+2', 3, 48, 45),
  ('P+3', 4, 78, 75),
  ('P+4', 5, 107, 104),
  ('P+5', 6, 136, 133),
  ('P+6', 7, 164, 161),
  ('P+7', 8, 169, 166),
  ('P+8', 9, 192, 189);

-- Seed enrolment snapshots
insert into public.enrolment_snapshots (academic_year, year_group, count, is_current) values
  ('2025-26','junior_infants',11,true),
  ('2025-26','senior_infants',9,true),
  ('2025-26','first',12,true),
  ('2025-26','second',10,true),
  ('2025-26','third',8,true),
  ('2025-26','fourth',11,true),
  ('2025-26','fifth',10,true),
  ('2025-26','sixth',9,true);

-- Seed scenarios
insert into public.projection_scenarios (name, description, is_baseline, ji_intake) values
  ('Realistic','Steady-state — ten Junior Infants per year, no mid-stream transfers.', true,
    '{"2026-27":10,"2027-28":10,"2028-29":10,"2029-30":10,"2030-31":10}'::jsonb),
  ('Optimistic','Slightly larger JI cohorts based on local birth numbers and visits enquiries.', false,
    '{"2026-27":14,"2027-28":14,"2028-29":13,"2029-30":13,"2030-31":13}'::jsonb),
  ('Pessimistic','Cautious case — JI cohorts smaller than 6th class leavers.', false,
    '{"2026-27":7,"2027-28":7,"2028-29":6,"2029-30":6,"2030-31":6}'::jsonb);
