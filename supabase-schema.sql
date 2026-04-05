create extension if not exists pgcrypto;

create table if not exists public.products (
  id text primary key,
  name text not null,
  description text default '',
  price numeric not null default 0,
  car_brand text not null,
  car_model text not null,
  car_year text default '',
  category text not null,
  image_url text default '',
  images text[] not null default '{}',
  stock integer not null default 0,
  is_active boolean not null default true,
  is_deleted boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_products_active_deleted
  on public.products (is_active, is_deleted);

create index if not exists idx_products_updated_at
  on public.products (updated_at desc);

create table if not exists public.logs (
  id text primary key,
  type text not null,
  action text not null,
  data jsonb not null default '{}'::jsonb,
  ip text,
  user_agent text,
  created_at timestamptz not null default now()
);

create index if not exists idx_logs_type_created_at
  on public.logs (type, created_at desc);
