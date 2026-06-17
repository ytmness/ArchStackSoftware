-- ArchStack Software initial schema

create extension if not exists "pgcrypto";

create type public.user_role as enum ('admin', 'editor');
create type public.content_status as enum ('draft', 'published', 'archived');
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'won', 'lost');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role public.user_role not null default 'editor',
  locale_pref text not null default 'es',
  avatar_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.site_settings (
  id int primary key generated always as identity,
  default_locale text not null default 'es',
  brand_name text not null default 'ArchStack Software',
  contact_email text,
  contact_phone text,
  whatsapp text,
  social_links_json jsonb not null default '{}'::jsonb,
  seo_defaults_json jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

create table public.services (
  id uuid primary key default gen_random_uuid(),
  slug_key text not null unique,
  icon text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.service_translations (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references public.services(id) on delete cascade,
  locale text not null check (locale in ('es', 'en')),
  name text not null,
  short_description text,
  body_html text,
  seo_title text,
  seo_description text,
  unique (service_id, locale)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  status public.content_status not null default 'draft',
  featured boolean not null default false,
  cover_path text,
  hero_media_path text,
  stack_json jsonb not null default '[]'::jsonb,
  metrics_json jsonb not null default '{}'::jsonb,
  published_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_translations (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  locale text not null check (locale in ('es', 'en')),
  slug text not null,
  title text not null,
  excerpt text,
  challenge_html text,
  solution_html text,
  results_html text,
  seo_title text,
  seo_description text,
  unique (project_id, locale),
  unique (locale, slug)
);

create table public.project_media (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  kind text not null default 'image',
  storage_path text not null,
  alt_json jsonb not null default '{}'::jsonb,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  status public.content_status not null default 'draft',
  cover_path text,
  author_id uuid references public.profiles(id),
  published_at timestamptz,
  reading_time_minutes int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.blog_post_translations (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  locale text not null check (locale in ('es', 'en')),
  slug text not null,
  title text not null,
  excerpt text,
  content_json jsonb,
  content_html text,
  seo_title text,
  seo_description text,
  unique (post_id, locale),
  unique (locale, slug)
);

create table public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  color_token text,
  created_at timestamptz not null default now()
);

create table public.blog_category_translations (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.blog_categories(id) on delete cascade,
  locale text not null check (locale in ('es', 'en')),
  slug text not null,
  name text not null,
  description text,
  unique (category_id, locale),
  unique (locale, slug)
);

create table public.blog_post_categories (
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  category_id uuid not null references public.blog_categories(id) on delete cascade,
  primary key (post_id, category_id)
);

create table public.blog_revisions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.blog_posts(id) on delete cascade,
  locale text not null check (locale in ('es', 'en')),
  editor_id uuid references public.profiles(id),
  snapshot_json jsonb,
  snapshot_html text,
  note text,
  created_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  locale text not null check (locale in ('es', 'en')),
  name text not null,
  company text,
  email text not null,
  phone text,
  service_interest text,
  budget_range text,
  timeline text,
  message text,
  source text default 'website',
  status public.lead_status not null default 'new',
  assigned_to uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.lead_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads(id) on delete cascade,
  author_id uuid references public.profiles(id),
  note text not null,
  created_at timestamptz not null default now()
);

create table public.admin_activity (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references public.profiles(id),
  entity_type text not null,
  entity_id uuid,
  action text not null,
  meta_json jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index idx_projects_status on public.projects(status);
create index idx_blog_posts_status on public.blog_posts(status);
create index idx_leads_status on public.leads(status);
create index idx_project_translations_slug on public.project_translations(locale, slug);
create index idx_blog_post_translations_slug on public.blog_post_translations(locale, slug);

insert into public.site_settings (brand_name, contact_email)
values ('ArchStack Software', 'hello@archstack.software');
