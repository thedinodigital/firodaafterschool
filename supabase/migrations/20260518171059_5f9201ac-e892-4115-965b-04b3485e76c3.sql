
-- Replace combined public-read policy with two narrower policies
drop policy if exists "public reads published" on public.news_posts;

create policy "anyone reads published news"
  on public.news_posts for select
  to anon, authenticated
  using (published = true);

create policy "staff read all news"
  on public.news_posts for select
  to authenticated
  using (public.is_staff(auth.uid()));

-- Lock down SECURITY DEFINER helpers — only authenticated users may execute
revoke execute on function public.is_staff(uuid) from public, anon;
revoke execute on function public.is_admin(uuid) from public, anon;
grant execute on function public.is_staff(uuid) to authenticated;
grant execute on function public.is_admin(uuid) to authenticated;

-- Move moddatetime extension out of public schema
create schema if not exists extensions;
alter extension moddatetime set schema extensions;
