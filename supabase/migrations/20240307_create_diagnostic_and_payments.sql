-- 1. Diagnostic Tests Table
create table public.diagnostic_tests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null, -- Optional link to user if logged in
  name text not null,
  class text not null,
  jee_attempt_year text not null,
  
  -- Raw Inputs
  physics_chapters int default 0,
  physics_accuracy int default 0,
  physics_marks int default 0,
  chemistry_chapters int default 0,
  chemistry_accuracy int default 0,
  chemistry_marks int default 0,
  maths_chapters int default 0,
  maths_accuracy int default 0,
  maths_marks int default 0,
  questions_per_day int default 0,
  mocks_per_month int default 0,

  -- Calculated Scores
  coverage_score int default 0,
  practice_score int default 0,
  accuracy_score int default 0,
  consistency_score int default 0,
  health_score int default 0,

  -- AI Report
  report_summary jsonb, -- Stores strengths, weaknesses, recommendations
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Subscriptions Table
create table public.subscriptions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  plan_name text not null,
  amount numeric(10, 2) not null,
  payment_status text not null check (payment_status in ('pending', 'paid', 'failed')),
  payment_id text, -- Razorpay Payment ID
  order_id text,   -- Razorpay Order ID
  start_date timestamp with time zone default timezone('utc'::text, now()) not null,
  end_date timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Mentorship Call Requests Table
create table public.mentorship_call_requests (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete set null,
  name text not null,
  mobile text not null,
  class text not null,
  jee_attempt_year text not null,
  preferred_time text,
  status text default 'pending' check (status in ('pending', 'contacted', 'scheduled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies

-- Diagnostic Tests
alter table public.diagnostic_tests enable row level security;
create policy "Anyone can insert diagnostic tests" on public.diagnostic_tests for insert with check (true);
create policy "Users can view own diagnostic tests" on public.diagnostic_tests for select using (auth.uid() = user_id);

-- Subscriptions
alter table public.subscriptions enable row level security;
create policy "Users can view own subscriptions" on public.subscriptions for select using (auth.uid() = user_id);
create policy "Service role can manage subscriptions" on public.subscriptions for all using (true); -- Simplified for demo

-- Mentorship Call Requests
alter table public.mentorship_call_requests enable row level security;
create policy "Anyone can insert call requests" on public.mentorship_call_requests for insert with check (true);
create policy "Users can view own requests" on public.mentorship_call_requests for select using (auth.uid() = user_id);
