create table if not exists public.videos (
  id uuid primary key default gen_random_uuid(),

  slug text not null unique,
  title text not null,
  description text,

  category text not null default 'general',
  level text not null default 'beginner',

  thumbnail_url text,
  r2_key text not null,
  video_url text,

  duration_seconds integer,
  views integer not null default 0,

  featured boolean not null default false,
  published boolean not null default false,

  tags text[] not null default '{}',

  instructor_id uuid references public.profiles(id) on delete set null,

  published_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint videos_duration_nonnegative
    check (duration_seconds is null or duration_seconds >= 0),

  constraint videos_views_nonnegative
    check (views >= 0)
);

create index if not exists videos_published_idx
  on public.videos (published, published_at desc);

create index if not exists videos_category_idx
  on public.videos (category);

create index if not exists videos_level_idx
  on public.videos (level);

create index if not exists videos_featured_idx
  on public.videos (featured)
  where published = true;

alter table public.courses
  add column if not exists preview_video_id uuid
  references public.videos(id)
  on delete set null;

create index if not exists courses_preview_video_id_idx
  on public.courses (preview_video_id);

create or replace function public.set_videos_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists videos_set_updated_at on public.videos;

create trigger videos_set_updated_at
before update on public.videos
for each row
execute function public.set_videos_updated_at();
