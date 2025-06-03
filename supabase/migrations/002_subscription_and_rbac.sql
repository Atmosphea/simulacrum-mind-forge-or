-- Create subscription plans table
create table public.subscription_plans (
  id uuid default gen_random_uuid() primary key,
  name text not null unique, -- 'explorer', 'voyager', 'architect'
  display_name text not null,
  price_monthly decimal(10,2),
  price_yearly decimal(10,2),
  features jsonb default '{}',
  limits jsonb default '{}', -- simulation_limit, persona_limit, etc.
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user subscriptions table
create table public.user_subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  plan_id uuid references public.subscription_plans on delete restrict not null,
  status text check (status in ('active', 'canceled', 'past_due', 'trialing')) default 'trialing',
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  trial_end timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id) -- One subscription per user
);

-- Create user roles table
create table public.user_roles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  role text check (role in ('admin', 'beta_tester', 'standard_user', 'enterprise_admin')) default 'standard_user',
  granted_by uuid references auth.users on delete set null,
  granted_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, role)
);

-- Create usage tracking table
create table public.usage_events (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  event_type text not null, -- 'simulation_started', 'persona_created', 'arena_analysis', etc.
  resource_id uuid, -- ID of the simulation, persona, etc.
  metadata jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create usage quotas table for real-time tracking
create table public.user_usage_quotas (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  quota_type text not null, -- 'simulations_monthly', 'personas_total', 'knowledge_assets', etc.
  used_count integer default 0,
  limit_count integer not null,
  reset_date timestamp with time zone, -- For monthly quotas
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, quota_type)
);

-- Create projects table for collaboration
create table public.projects (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  owner_id uuid references auth.users on delete cascade not null,
  settings jsonb default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create project members table for collaboration
create table public.project_members (
  id uuid default gen_random_uuid() primary key,
  project_id uuid references public.projects on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  role text check (role in ('owner', 'admin', 'editor', 'viewer')) default 'viewer',
  invited_by uuid references auth.users on delete set null,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(project_id, user_id)
);

-- Enable RLS on new tables
alter table public.subscription_plans enable row level security;
alter table public.user_subscriptions enable row level security;
alter table public.user_roles enable row level security;
alter table public.usage_events enable row level security;
alter table public.user_usage_quotas enable row level security;
alter table public.projects enable row level security;
alter table public.project_members enable row level security;

-- RLS Policies for subscription_plans (public read)
create policy "Subscription plans are viewable by everyone." on public.subscription_plans
  for select using (is_active = true);

-- RLS Policies for user_subscriptions
create policy "Users can view own subscription." on public.user_subscriptions
  for select using (auth.uid() = user_id);

create policy "Users can update own subscription." on public.user_subscriptions
  for update using (auth.uid() = user_id);

-- RLS Policies for user_roles
create policy "Users can view own roles." on public.user_roles
  for select using (auth.uid() = user_id);

-- RLS Policies for usage_events
create policy "Users can view own usage events." on public.usage_events
  for select using (auth.uid() = user_id);

create policy "Users can insert own usage events." on public.usage_events
  for insert with check (auth.uid() = user_id);

-- RLS Policies for user_usage_quotas
create policy "Users can view own usage quotas." on public.user_usage_quotas
  for select using (auth.uid() = user_id);

create policy "Users can update own usage quotas." on public.user_usage_quotas
  for update using (auth.uid() = user_id);

-- RLS Policies for projects
create policy "Users can view projects they're members of." on public.projects
  for select using (
    auth.uid() = owner_id or 
    auth.uid() in (
      select user_id from public.project_members 
      where project_id = projects.id
    )
  );

create policy "Users can insert own projects." on public.projects
  for insert with check (auth.uid() = owner_id);

create policy "Project owners can update their projects." on public.projects
  for update using (auth.uid() = owner_id);

create policy "Project owners can delete their projects." on public.projects
  for delete using (auth.uid() = owner_id);

-- RLS Policies for project_members
create policy "Users can view project members for projects they're in." on public.project_members
  for select using (
    auth.uid() = user_id or
    auth.uid() in (
      select user_id from public.project_members pm2 
      where pm2.project_id = project_members.project_id
    )
  );

-- Insert default subscription plans
insert into public.subscription_plans (name, display_name, price_monthly, price_yearly, features, limits) values
('explorer', 'Explorer', 39.00, 374.40, 
 '{"simulation_chamber": "basic", "personas": "1_custom_plus_premade", "knowledge_assets": 5, "browser_extension": "roadmap"}',
 '{"simulations_monthly": 50, "personas_custom": 1, "knowledge_assets": 5, "arenas_monthly": 0}'
),
('voyager', 'Voyager', 59.00, 566.40,
 '{"simulation_chamber": "advanced", "personas": "3_custom_plus_premade", "knowledge_assets": 10, "collaboration": "up_to_5_users", "arenas": 3}',
 '{"simulations_monthly": 200, "personas_custom": 3, "knowledge_assets": 10, "arenas_monthly": 3, "team_members": 5}'
),
('architect', 'Architect', null, null,
 '{"simulation_chamber": "enterprise", "personas": "unlimited_custom", "knowledge_assets": "unlimited", "collaboration": "unlimited", "arenas": "unlimited", "api_access": true, "dedicated_support": true}',
 '{"simulations_monthly": -1, "personas_custom": -1, "knowledge_assets": -1, "arenas_monthly": -1, "team_members": -1}'
);

-- Function to get user subscription with plan details
create or replace function public.get_user_subscription(user_uuid uuid)
returns table (
  subscription_id uuid,
  plan_name text,
  plan_display_name text,
  status text,
  features jsonb,
  limits jsonb,
  current_period_end timestamp with time zone
) as $$
begin
  return query
  select 
    us.id,
    sp.name,
    sp.display_name,
    us.status,
    sp.features,
    sp.limits,
    us.current_period_end
  from public.user_subscriptions us
  join public.subscription_plans sp on us.plan_id = sp.id
  where us.user_id = user_uuid;
end;
$$ language plpgsql security definer;

-- Function to check if user has permission for a feature
create or replace function public.user_has_feature(user_uuid uuid, feature_name text)
returns boolean as $$
declare
  user_features jsonb;
begin
  select features into user_features
  from public.get_user_subscription(user_uuid);
  
  if user_features is null then
    return false;
  end if;
  
  return user_features ? feature_name;
end;
$$ language plpgsql security definer;

-- Function to track usage events
create or replace function public.track_usage_event(
  user_uuid uuid,
  event_type_param text,
  resource_id_param uuid default null,
  metadata_param jsonb default '{}'
)
returns uuid as $$
declare
  event_id uuid;
begin
  insert into public.usage_events (user_id, event_type, resource_id, metadata)
  values (user_uuid, event_type_param, resource_id_param, metadata_param)
  returning id into event_id;
  
  return event_id;
end;
$$ language plpgsql security definer;

-- Function to check usage quota
create or replace function public.check_usage_quota(
  user_uuid uuid,
  quota_type_param text
)
returns table (
  can_use boolean,
  used_count integer,
  limit_count integer,
  remaining integer
) as $$
declare
  quota_record record;
begin
  select * into quota_record
  from public.user_usage_quotas
  where user_id = user_uuid and quota_type = quota_type_param;
  
  if quota_record is null then
    -- No quota record exists, check plan limits and create one
    declare
      plan_limit integer;
    begin
      select (limits->>quota_type_param)::integer into plan_limit
      from public.get_user_subscription(user_uuid);
      
      if plan_limit is null or plan_limit = -1 then
        -- Unlimited or no limit
        return query select true, 0, -1, -1;
        return;
      end if;
      
      -- Create quota record
      insert into public.user_usage_quotas (user_id, quota_type, used_count, limit_count)
      values (user_uuid, quota_type_param, 0, plan_limit);
      
      return query select true, 0, plan_limit, plan_limit;
      return;
    end;
  end if;
  
  -- Check existing quota
  if quota_record.limit_count = -1 then
    -- Unlimited
    return query select true, quota_record.used_count, -1, -1;
  else
    return query select 
      quota_record.used_count < quota_record.limit_count,
      quota_record.used_count,
      quota_record.limit_count,
      quota_record.limit_count - quota_record.used_count;
  end if;
end;
$$ language plpgsql security definer;

-- Add updated_at triggers
create trigger handle_updated_at before update on public.user_subscriptions
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.user_usage_quotas
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.projects
  for each row execute procedure public.handle_updated_at();
