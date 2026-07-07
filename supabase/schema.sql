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