
-- Enums / helper
create extension if not exists moddatetime;

-- staff_profiles
create table public.staff_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('admin','editor')) default 'editor',
  created_at timestamptz not null default now()
);

alter table public.staff_profiles enable row level security;

-- Security definer helpers (avoid RLS recursion)
create or replace function public.is_staff(_uid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.staff_profiles where id = _uid)
$$;

create or replace function public.is_admin(_uid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from public.staff_profiles where id = _uid and role = 'admin')
$$;

create policy "staff can read own profile"
  on public.staff_profiles for select
  to authenticated
  using (id = auth.uid() or public.is_admin(auth.uid()));

create policy "admins can insert profiles"
  on public.staff_profiles for insert
  to authenticated
  with check (public.is_admin(auth.uid()));

create policy "admins can update profiles"
  on public.staff_profiles for update
  to authenticated
  using (public.is_admin(auth.uid()))
  with check (public.is_admin(auth.uid()));

create policy "admins can delete profiles"
  on public.staff_profiles for delete
  to authenticated
  using (public.is_admin(auth.uid()));

-- news_posts
create table public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null,
  body text not null,
  category text not null check (category in ('School Events','Sport','Creative School','Community','Sacrament')),
  illustration text check (illustration in ('books','field','music','community','art')),
  date date not null,
  feature boolean not null default false,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id)
);

create index news_posts_date_idx on public.news_posts (date desc);
create index news_posts_published_idx on public.news_posts (published);

create trigger news_posts_set_updated_at
  before update on public.news_posts
  for each row execute procedure moddatetime(updated_at);

alter table public.news_posts enable row level security;

create policy "public reads published"
  on public.news_posts for select
  to anon, authenticated
  using (published = true or public.is_staff(auth.uid()));

create policy "staff insert news"
  on public.news_posts for insert
  to authenticated
  with check (public.is_staff(auth.uid()));

create policy "staff update news"
  on public.news_posts for update
  to authenticated
  using (public.is_staff(auth.uid()))
  with check (public.is_staff(auth.uid()));

create policy "staff delete news"
  on public.news_posts for delete
  to authenticated
  using (public.is_staff(auth.uid()));

-- Seed
insert into public.news_posts (slug, title, excerpt, body, category, illustration, date, feature) values
('junior-infants-2026-applications-open','Junior Infants 2026–27 — applications now open',
 'Application forms for next September''s Junior Infants intake are available from the school office and on the Admissions page.',
 'We''re delighted to welcome enquiries from families considering Holy Cross for their child. The closing date for applications is Friday, 30 January 2026. Visits to the school can be arranged by phoning the office on 056 444 1384.',
 'School Events','books','2025-10-28', true),
('active-flag-renewed','Active Flag renewed for another year',
 'Following a busy year of GAA, athletics and yoga, our Active Flag has been formally renewed by the Active School Flag committee.',
 'The school community is very proud of the Active Flag. A particular thanks to the parents who supported our walk-to-school week and to Ms. Brennan for organising the inter-school athletics blitz in May.',
 'Sport','field','2025-10-12', false),
('harvest-art-exhibition','Harvest art exhibition fills the corridor',
 'Children from every class contributed to a beautiful harvest-themed display now on view in the main corridor.',
 'From 5th and 6th class''s autumn landscapes to the Junior Infants'' painted apples, the harvest exhibition is a real highlight. Parents are welcome to drop in and see the work at collection time.',
 'Creative School','art','2025-10-04', false),
('grandparents-day-2025','A morning of memories on Grandparents'' Day',
 'Tea, scones, songs and a packed school hall — Grandparents'' Day was, as always, a community highlight.',
 'We were so pleased to welcome over a hundred grandparents and special friends to the school for our annual Grandparents'' Day. Thank you to all the families who baked, helped to set up and made the morning so special.',
 'Community','community','2025-09-28', false),
('first-confession-and-communion-dates','First Confession and First Holy Communion dates announced',
 'The 2nd-class sacramental dates for the year ahead have now been confirmed with the parish.',
 'First Confession will take place on Tuesday, 24 February 2026 at 7pm. First Holy Communion is scheduled for Saturday, 16 May 2026 at 11am in Holy Cross Church. More information will be sent home with the children in the coming weeks.',
 'Sacrament','community','2025-09-18', false),
('music-classes-tin-whistle','Tin whistle classes return for 3rd & 4th class',
 'Our weekly tin whistle programme is back, with a small concert planned for parents at Christmas.',
 'Mr. O''Reilly will once again lead the tin whistle programme on Thursday afternoons. Children are asked to bring their whistle to school each Thursday in their schoolbag.',
 'Creative School','music','2025-09-10', false),
('school-reopens-september','School reopens — a warm welcome back',
 'The school reopened on Wednesday, 27 August. Thank you to everyone for the smooth start to the year.',
 'It was lovely to see all the children back in the yard last week. A particularly warm welcome to our 14 new Junior Infants and to two new families who have joined us this term.',
 'School Events','books','2025-08-29', false);
