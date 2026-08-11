create extension if not exists pgcrypto;

create table profiles (
id uuid primary key references auth.users(id),
full_name text,
country text,
currency text,
created_at timestamp default now()
);

create table enrollments (
id uuid primary key default gen_random_uuid(),
user_id uuid references auth.users(id),
course_slug text not null,
status text default 'pending',
paid_amount numeric,
currency text,
created_at timestamp default now()
);

create table payments (
id uuid primary key default gen_random_uuid(),
user_id uuid references auth.users(id),
provider text,
reference text,
amount numeric,
currency text,
status text,
created_at timestamp default now()
);

create table patterns (
id uuid primary key default gen_random_uuid(),

title text not null,
slug text unique not null,

excerpt text,
content text,

category text not null,
level text not null,

hero_image text,
thumbnail text,

access text default 'free',

file_format text default 'PDF',
download_url text,

video_url text,

featured boolean default false,
published boolean default false,

position integer default 0,

related_course_slug text,

seo_title text,
seo_description text,

created_at timestamp default now(),
updated_at timestamp default now()
);

create index patterns_slug_idx on patterns(slug);
create index patterns_published_idx on patterns(published);
create index patterns_featured_idx on patterns(featured);
create index patterns_position_idx on patterns(position);

create or replace function update_patterns_updated_at()
returns trigger as $$
begin
new.updated_at = now();
return new;
end;
$$ language plpgsql;

create trigger patterns_updated_at
before update on patterns
for each row
execute function update_patterns_updated_at();
