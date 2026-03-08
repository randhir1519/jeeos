-- Create table for free mentorship leads
create table public.free_mentorship_leads (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  mobile_number text not null,
  class text not null check (class in ('11', '12', 'Dropper')),
  jee_attempt_year text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.free_mentorship_leads enable row level security;

-- Policy: Allow public to insert leads (since it's a public form)
create policy "Anyone can insert leads" on public.free_mentorship_leads
  for insert with check (true);

-- Policy: Only authenticated admins/service role can view leads (for now, just restrict public read)
-- No select policy for public means it's private by default.
