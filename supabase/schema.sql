-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES (Extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  target_exam text check (target_exam in ('jee_main', 'jee_advanced')),
  target_year int,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. QUESTIONS BANK
create table public.questions (
  id uuid default uuid_generate_v4() primary key,
  subject text not null check (subject in ('Physics', 'Chemistry', 'Maths')),
  chapter text not null,
  topic text,
  difficulty text check (difficulty in ('Easy', 'Medium', 'Hard')),
  exam_type text check (exam_type in ('JEE Main', 'JEE Advanced')),
  year int,
  question_text text not null,
  options jsonb not null, -- Array of strings or objects
  correct_option text not null,
  solution_text text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. STUDY PLANS
create table public.study_plans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date default current_date not null,
  status text default 'active' check (status in ('active', 'completed', 'missed')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, date)
);

-- 4. DAILY TASKS
create table public.daily_tasks (
  id uuid default uuid_generate_v4() primary key,
  plan_id uuid references public.study_plans(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null, -- Denormalized for easier querying
  subject text not null,
  title text not null,
  task_type text check (task_type in ('PYQ', 'Revision', 'Concept', 'Mock Test')),
  is_completed boolean default false,
  metadata jsonb, -- Store extra details like question_count, duration
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. PRACTICE SESSIONS
create table public.practice_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  mode text check (mode in ('Chapter', 'PYQ', 'Mixed', 'Pressure')),
  start_time timestamp with time zone default timezone('utc'::text, now()) not null,
  end_time timestamp with time zone,
  total_questions int default 0,
  score int default 0,
  accuracy numeric(5,2) default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. STUDENT ANSWERS
create table public.student_answers (
  id uuid default uuid_generate_v4() primary key,
  session_id uuid references public.practice_sessions(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  question_id uuid references public.questions(id) on delete cascade not null,
  selected_option text,
  is_correct boolean not null,
  time_taken_seconds int,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. EXECUTION SCORES (Daily Performance)
create table public.execution_scores (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date default current_date not null,
  score int not null check (score >= 0 and score <= 100),
  breakdown jsonb not null, -- { plan_completion: 80, accuracy: 70, study_time: 85 }
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, date)
);

-- 8. CONSISTENCY LOGS
create table public.consistency_logs (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  date date default current_date not null,
  study_minutes int default 0,
  tasks_completed int default 0,
  questions_solved int default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, date)
);

-- 9. BADGES
create table public.badges (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text not null,
  icon_key text not null, -- Lucide icon name or URL
  category text check (category in ('Streak', 'Volume', 'Speed', 'Mastery')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. USER BADGES
create table public.user_badges (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  badge_id uuid references public.badges(id) on delete cascade not null,
  awarded_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, badge_id)
);

-- 11. WEEKLY CHALLENGES
create table public.weekly_challenges (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text not null,
  goal_type text check (goal_type in ('questions_solved', 'study_hours', 'streak_days', 'mock_score')),
  goal_target int not null,
  xp_reward int default 100,
  start_date date not null,
  end_date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 12. CHALLENGE PARTICIPANTS
create table public.challenge_participants (
  id uuid default uuid_generate_v4() primary key,
  challenge_id uuid references public.weekly_challenges(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  current_progress int default 0,
  is_completed boolean default false,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(challenge_id, user_id)
);

-- RLS POLICIES

-- Enable RLS
alter table profiles enable row level security;
alter table study_plans enable row level security;
alter table daily_tasks enable row level security;
alter table practice_sessions enable row level security;
alter table student_answers enable row level security;
alter table execution_scores enable row level security;
alter table consistency_logs enable row level security;
alter table user_badges enable row level security;
alter table challenge_participants enable row level security;
-- Public read tables
alter table questions enable row level security;
alter table badges enable row level security;
alter table weekly_challenges enable row level security;

-- Profiles
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

-- Questions (Public Read)
create policy "Questions are viewable by everyone" on questions for select using (true);

-- Study Plans
create policy "Users can view own plans" on study_plans for select using (auth.uid() = user_id);
create policy "Users can insert own plans" on study_plans for insert with check (auth.uid() = user_id);
create policy "Users can update own plans" on study_plans for update using (auth.uid() = user_id);

-- Daily Tasks
create policy "Users can view own tasks" on daily_tasks for select using (auth.uid() = user_id);
create policy "Users can insert own tasks" on daily_tasks for insert with check (auth.uid() = user_id);
create policy "Users can update own tasks" on daily_tasks for update using (auth.uid() = user_id);

-- Practice Sessions
create policy "Users can view own sessions" on practice_sessions for select using (auth.uid() = user_id);
create policy "Users can insert own sessions" on practice_sessions for insert with check (auth.uid() = user_id);
create policy "Users can update own sessions" on practice_sessions for update using (auth.uid() = user_id);

-- Student Answers
create policy "Users can view own answers" on student_answers for select using (auth.uid() = user_id);
create policy "Users can insert own answers" on student_answers for insert with check (auth.uid() = user_id);

-- Execution Scores
create policy "Users can view own scores" on execution_scores for select using (auth.uid() = user_id);
create policy "Users can insert own scores" on execution_scores for insert with check (auth.uid() = user_id);

-- Consistency Logs
create policy "Users can view own logs" on consistency_logs for select using (auth.uid() = user_id);
create policy "Users can insert own logs" on consistency_logs for insert with check (auth.uid() = user_id);
create policy "Users can update own logs" on consistency_logs for update using (auth.uid() = user_id);

-- Badges (Public Read)
create policy "Badges are viewable by everyone" on badges for select using (true);

-- User Badges
create policy "Users can view own badges" on user_badges for select using (auth.uid() = user_id);

-- Weekly Challenges (Public Read)
create policy "Challenges are viewable by everyone" on weekly_challenges for select using (true);

-- Challenge Participants
create policy "Users can view own participation" on challenge_participants for select using (auth.uid() = user_id);
create policy "Users can insert own participation" on challenge_participants for insert with check (auth.uid() = user_id);
create policy "Users can update own participation" on challenge_participants for update using (auth.uid() = user_id);

-- INDEXES FOR PERFORMANCE
create index idx_questions_subject on questions(subject);
create index idx_questions_chapter on questions(chapter);
create index idx_daily_tasks_user_date on daily_tasks(user_id);
create index idx_practice_sessions_user on practice_sessions(user_id);
create index idx_student_answers_session on student_answers(session_id);
create index idx_execution_scores_user_date on execution_scores(user_id, date);
create index idx_consistency_logs_user_date on consistency_logs(user_id, date);

-- TRIGGER FOR NEW USER PROFILE
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
