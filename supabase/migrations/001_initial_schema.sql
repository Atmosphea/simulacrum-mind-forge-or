-- Enable RLS (Row Level Security)
alter table auth.users enable row level security;

-- Create profiles table
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  company text,
  role text,
  plan_type text check (plan_type in ('explorer', 'voyager', 'architect')) default 'explorer',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create personas table
create table public.personas (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  description text,
  traits jsonb default '{}',
  is_custom boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create simulations table
create table public.simulations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null,
  description text,
  persona_id uuid references public.personas on delete set null,
  scenario_data jsonb default '{}',
  results jsonb,
  status text check (status in ('draft', 'running', 'completed', 'failed')) default 'draft',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create knowledge_assets table
create table public.knowledge_assets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  name text not null,
  type text not null, -- 'text', 'image', 'video', 'audio', 'document'
  content text,
  file_url text,
  metadata jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.personas enable row level security;
alter table public.simulations enable row level security;
alter table public.knowledge_assets enable row level security;

-- Create policies
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

create policy "Users can view own personas." on public.personas
  for select using (auth.uid() = user_id);

create policy "Users can insert own personas." on public.personas
  for insert with check (auth.uid() = user_id);

create policy "Users can update own personas." on public.personas
  for update using (auth.uid() = user_id);

create policy "Users can delete own personas." on public.personas
  for delete using (auth.uid() = user_id);

create policy "Users can view own simulations." on public.simulations
  for select using (auth.uid() = user_id);

create policy "Users can insert own simulations." on public.simulations
  for insert with check (auth.uid() = user_id);

create policy "Users can update own simulations." on public.simulations
  for update using (auth.uid() = user_id);

create policy "Users can delete own simulations." on public.simulations
  for delete using (auth.uid() = user_id);

create policy "Users can view own knowledge assets." on public.knowledge_assets
  for select using (auth.uid() = user_id);

create policy "Users can insert own knowledge assets." on public.knowledge_assets
  for insert with check (auth.uid() = user_id);

create policy "Users can update own knowledge assets." on public.knowledge_assets
  for update using (auth.uid() = user_id);

create policy "Users can delete own knowledge assets." on public.knowledge_assets
  for delete using (auth.uid() = user_id);

-- Create function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Create trigger for new user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Create updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create updated_at triggers
create trigger handle_updated_at before update on public.profiles
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.personas
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.simulations
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.knowledge_assets
  for each row execute procedure public.handle_updated_at();
