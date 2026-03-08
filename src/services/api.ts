import { supabase } from './supabase';

// Types (mirroring DB schema)
export interface Profile {
  id: string;
  email: string;
  full_name: string;
  target_exam: 'jee_main' | 'jee_advanced';
}

export interface DailyTask {
  id: string;
  subject: string;
  title: string;
  task_type: 'PYQ' | 'Revision' | 'Concept' | 'Mock Test';
  is_completed: boolean;
}

export interface ExecutionScore {
  score: number;
  breakdown: {
    plan_completion: number;
    accuracy: number;
    study_time: number;
  };
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  goal_type: string;
  goal_target: number;
  xp_reward: number;
  end_date: string;
}

export interface Participant {
  current_progress: number;
  is_completed: boolean;
}

export const api = {
  // User
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    if (error) throw error;
    return data as Profile;
  },

  // Dashboard Data
  getDailyTasks: async (userId: string) => {
    const { data, error } = await supabase
      .from('daily_tasks')
      .select('*')
      .eq('user_id', userId)
      .eq('is_completed', false)
      .limit(5);
    
    if (error) {
      console.error('Error fetching tasks:', error);
      return [];
    }
    return data as DailyTask[];
  },

  getExecutionScore: async (userId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('execution_scores')
      .select('*')
      .eq('user_id', userId)
      .eq('date', today)
      .single();
    
    if (error) return null;
    return data as ExecutionScore;
  },

  getConsistencyStats: async (userId: string) => {
    // Get last 7 days logs
    const { data, error } = await supabase
      .from('consistency_logs')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(7);
    
    if (error) return [];
    return data;
  },

  // Challenges
  getActiveChallenges: async () => {
    const today = new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from('weekly_challenges')
      .select('*')
      .gte('end_date', today);
    
    if (error) return [];
    return data as Challenge[];
  },

  getChallengeProgress: async (userId: string, challengeId: string) => {
    const { data, error } = await supabase
      .from('challenge_participants')
      .select('*')
      .eq('user_id', userId)
      .eq('challenge_id', challengeId)
      .single();
    
    if (error) return null;
    return data as Participant;
  },

  joinChallenge: async (userId: string, challengeId: string) => {
    const { data, error } = await supabase
      .from('challenge_participants')
      .insert({ user_id: userId, challenge_id: challengeId })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  // Actions
  toggleTask: async (taskId: string, isCompleted: boolean) => {
    const { error } = await supabase
      .from('daily_tasks')
      .update({ is_completed: isCompleted })
      .eq('id', taskId);
    
    if (error) throw error;
  },

  // Leads
  saveMentorshipLead: async (leadData: {
    name: string;
    mobile_number: string;
    class: string;
    jee_attempt_year: string;
  }) => {
    const { error } = await supabase
      .from('free_mentorship_leads')
      .insert(leadData);
    
    if (error) throw error;
  }
};
