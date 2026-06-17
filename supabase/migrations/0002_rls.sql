-- RLS policies for ArchStack Software

alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.services enable row level security;
alter table public.service_translations enable row level security;
alter table public.projects enable row level security;
alter table public.project_translations enable row level security;
alter table public.project_media enable row level security;
alter table public.blog_posts enable row level security;
alter table public.blog_post_translations enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_category_translations enable row level security;
alter table public.blog_post_categories enable row level security;
alter table public.blog_revisions enable row level security;
alter table public.leads enable row level security;
alter table public.lead_notes enable row level security;
alter table public.admin_activity enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
  );
$$;

-- Public read published content
create policy "public read published projects"
on public.projects for select
using (status = 'published');

create policy "public read project translations"
on public.project_translations for select
using (
  exists (
    select 1 from public.projects p
    where p.id = project_id and p.status = 'published'
  )
);

create policy "public read published blog posts"
on public.blog_posts for select
using (status = 'published');

create policy "public read blog post translations"
on public.blog_post_translations for select
using (
  exists (
    select 1 from public.blog_posts b
    where b.id = post_id and b.status = 'published'
  )
);

create policy "public read active services"
on public.services for select
using (is_active = true);

create policy "public read service translations"
on public.service_translations for select
using (
  exists (
    select 1 from public.services s
    where s.id = service_id and s.is_active = true
  )
);

create policy "public insert leads"
on public.leads for insert
to anon, authenticated
with check (true);

-- Admin full access
create policy "admins manage profiles"
on public.profiles for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage site settings"
on public.site_settings for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage services"
on public.services for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage service translations"
on public.service_translations for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage projects"
on public.projects for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage project translations"
on public.project_translations for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage project media"
on public.project_media for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage blog posts"
on public.blog_posts for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage blog post translations"
on public.blog_post_translations for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage blog categories"
on public.blog_categories for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage blog category translations"
on public.blog_category_translations for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage blog post categories"
on public.blog_post_categories for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage blog revisions"
on public.blog_revisions for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage leads"
on public.leads for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage lead notes"
on public.lead_notes for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "admins manage admin activity"
on public.admin_activity for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

-- Profile self read
create policy "users read own profile"
on public.profiles for select
to authenticated
using (auth.uid() = id);
