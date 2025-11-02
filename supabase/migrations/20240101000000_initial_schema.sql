-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create scans table
create table public.scans (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  url text not null,
  violations jsonb default '[]'::jsonb,
  violations_count integer default 0,
  status text default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index on user_id for faster queries
create index scans_user_id_idx on public.scans(user_id);

-- Create index on created_at for sorting
create index scans_created_at_idx on public.scans(created_at desc);

-- Enable Row Level Security
alter table public.scans enable row level security;

-- RLS Policy: Users can only view their own scans
create policy "Users can view their own scans"
  on public.scans
  for select
  using (auth.uid() = user_id);

-- RLS Policy: Users can insert their own scans
create policy "Users can insert their own scans"
  on public.scans
  for insert
  with check (auth.uid() = user_id);

-- RLS Policy: Users can update their own scans
create policy "Users can update their own scans"
  on public.scans
  for update
  using (auth.uid() = user_id);

-- RLS Policy: Users can delete their own scans
create policy "Users can delete their own scans"
  on public.scans
  for delete
  using (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Trigger to call the function on update
create trigger set_updated_at
  before update on public.scans
  for each row
  execute function public.handle_updated_at();
