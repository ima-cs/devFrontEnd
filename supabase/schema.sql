-- ServicePro — Schéma Supabase
-- À exécuter dans le SQL Editor de Supabase, dans l'ordre :
--   1) schema.sql  (ce fichier)
--   2) seed.sql    (données de démonstration)

create extension if not exists "pgcrypto";

-- ============================================================
-- TABLES
-- ============================================================

-- profiles : étend auth.users avec rôle et informations
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  city text,
  role text not null check (role in ('client', 'provider', 'admin')) default 'client',
  created_at timestamptz not null default now()
);

create index if not exists profiles_user_id_idx on public.profiles(user_id);
create index if not exists profiles_role_idx   on public.profiles(role);

-- categories : catégories de services
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  created_at timestamptz not null default now()
);

-- providers : profils professionnels
create table if not exists public.providers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  professional_name text not null,
  category_id uuid references public.categories(id) on delete set null,
  description text,
  experience_years int default 0,
  city text,
  phone text,
  avatar_url text,
  is_premium boolean default false,
  is_validated boolean default true,
  created_at timestamptz not null default now()
);

create index if not exists providers_user_id_idx  on public.providers(user_id);
create index if not exists providers_category_idx on public.providers(category_id);
create index if not exists providers_city_idx     on public.providers(city);
create index if not exists providers_premium_idx  on public.providers(is_premium);

-- service_requests : demandes de service
create table if not exists public.service_requests (
  id uuid primary key default gen_random_uuid(),
  client_id   uuid references public.profiles(id)  on delete cascade,
  provider_id uuid references public.providers(id) on delete cascade,
  service_type text,
  description  text not null,
  city         text,
  desired_date date,
  status text not null check (status in ('pending','accepted','rejected','completed')) default 'pending',
  created_at timestamptz not null default now()
);

create index if not exists requests_client_idx   on public.service_requests(client_id);
create index if not exists requests_provider_idx on public.service_requests(provider_id);
create index if not exists requests_status_idx   on public.service_requests(status);

-- reviews : avis clients
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  client_id   uuid references public.profiles(id)  on delete cascade,
  provider_id uuid references public.providers(id) on delete cascade,
  rating  int  not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create index if not exists reviews_provider_idx on public.reviews(provider_id);
create index if not exists reviews_client_idx   on public.reviews(client_id);

-- ads : bannières publicitaires
create table if not exists public.ads (
  id uuid primary key default gen_random_uuid(),
  title       text not null,
  description text,
  image_url   text,
  position    text default 'home',
  active      boolean default true,
  created_at  timestamptz not null default now()
);

-- ============================================================
-- RLS — Row Level Security
-- ============================================================

alter table public.profiles         enable row level security;
alter table public.categories       enable row level security;
alter table public.providers        enable row level security;
alter table public.service_requests enable row level security;
alter table public.reviews          enable row level security;
alter table public.ads              enable row level security;

-- profiles : lecture publique, écriture sur son propre profil
drop policy if exists profiles_select_all on public.profiles;
create policy profiles_select_all on public.profiles for select using (true);

drop policy if exists profiles_insert_self on public.profiles;
create policy profiles_insert_self on public.profiles
  for insert with check (auth.uid() = user_id);

drop policy if exists profiles_update_self on public.profiles;
create policy profiles_update_self on public.profiles
  for update using (auth.uid() = user_id);

-- categories : lecture publique, écriture admin
drop policy if exists categories_select_all on public.categories;
create policy categories_select_all on public.categories for select using (true);

drop policy if exists categories_admin_write on public.categories;
create policy categories_admin_write on public.categories
  for all using (
    exists (select 1 from public.profiles p where p.user_id = auth.uid() and p.role = 'admin')
  );

-- providers : lecture publique, écriture propriétaire ou admin
drop policy if exists providers_select_all on public.providers;
create policy providers_select_all on public.providers for select using (true);

drop policy if exists providers_insert_self on public.providers;
create policy providers_insert_self on public.providers
  for insert with check (auth.uid() = user_id);

drop policy if exists providers_update_self_or_admin on public.providers;
create policy providers_update_self_or_admin on public.providers
  for update using (
    auth.uid() = user_id
    or exists (select 1 from public.profiles p where p.user_id = auth.uid() and p.role = 'admin')
  );

drop policy if exists providers_delete_admin on public.providers;
create policy providers_delete_admin on public.providers
  for delete using (
    exists (select 1 from public.profiles p where p.user_id = auth.uid() and p.role = 'admin')
  );

-- service_requests : participants (client/provider concernés) ou admin
drop policy if exists requests_select_participant on public.service_requests;
create policy requests_select_participant on public.service_requests
  for select using (
    exists (select 1 from public.profiles  p  where p.id  = client_id   and p.user_id = auth.uid())
    or exists (select 1 from public.providers pr where pr.id = provider_id and pr.user_id = auth.uid())
    or exists (select 1 from public.profiles p  where p.user_id = auth.uid() and p.role = 'admin')
  );

drop policy if exists requests_insert_client on public.service_requests;
create policy requests_insert_client on public.service_requests
  for insert with check (
    exists (select 1 from public.profiles p where p.id = client_id and p.user_id = auth.uid())
  );

drop policy if exists requests_update_participant on public.service_requests;
create policy requests_update_participant on public.service_requests
  for update using (
    exists (select 1 from public.profiles  p  where p.id  = client_id   and p.user_id = auth.uid())
    or exists (select 1 from public.providers pr where pr.id = provider_id and pr.user_id = auth.uid())
  );

-- reviews : lecture publique, écriture client connecté
drop policy if exists reviews_select_all on public.reviews;
create policy reviews_select_all on public.reviews for select using (true);

drop policy if exists reviews_insert_client on public.reviews;
create policy reviews_insert_client on public.reviews
  for insert with check (
    exists (select 1 from public.profiles p where p.id = client_id and p.user_id = auth.uid())
  );

drop policy if exists reviews_update_self on public.reviews;
create policy reviews_update_self on public.reviews
  for update using (
    exists (select 1 from public.profiles p where p.id = client_id and p.user_id = auth.uid())
  );

drop policy if exists reviews_delete_self_or_admin on public.reviews;
create policy reviews_delete_self_or_admin on public.reviews
  for delete using (
    exists (select 1 from public.profiles p where p.id = client_id and p.user_id = auth.uid())
    or exists (select 1 from public.profiles p where p.user_id = auth.uid() and p.role = 'admin')
  );

-- ads : lecture publique des pubs actives, écriture admin
drop policy if exists ads_select_active on public.ads;
create policy ads_select_active on public.ads for select using (active = true);

drop policy if exists ads_admin_all on public.ads;
create policy ads_admin_all on public.ads
  for all using (
    exists (select 1 from public.profiles p where p.user_id = auth.uid() and p.role = 'admin')
  );

-- ============================================================
-- TRIGGER : crée automatiquement un profil au signup
-- (utilise les metadata de auth.users : full_name, phone, city, role)
-- ============================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (user_id, full_name, email, phone, city, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.email,
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'city',
    coalesce(new.raw_user_meta_data->>'role', 'client')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
