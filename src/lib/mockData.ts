import { useState, useEffect } from "react";

// Types
export interface Task {
  id: string;
  subject: "Physics" | "Chemistry" | "Maths";
  title: string;
  completed: boolean;
  type: "PYQ" | "Revision" | "Concept";
}

export interface Metric {
  label: string;
  value: number;
  max: number;
  color: string;
}

export interface UserStats {
  streak: number;
  questionsSolved: number;
  accuracy: number;
  hoursStudied: number;
}

// Mock Data
export const INITIAL_TASKS: Task[] = [
  { id: "1", subject: "Physics", title: "Rotational Motion - 25 PYQs", completed: false, type: "PYQ" },
  { id: "2", subject: "Chemistry", title: "Thermodynamics - Revision", completed: true, type: "Revision" },
  { id: "3", subject: "Maths", title: "Calculus - Concept Practice", completed: false, type: "Concept" },
  { id: "4", subject: "Physics", title: "Electrostatics - 15 PYQs", completed: false, type: "PYQ" },
];

export const MOCK_STATS: UserStats = {
  streak: 12,
  questionsSolved: 450,
  accuracy: 72,
  hoursStudied: 45,
};

export const WEEKLY_ACTIVITY = [
  { day: "Mon", questions: 45, hours: 4 },
  { day: "Tue", questions: 52, hours: 5 },
  { day: "Wed", questions: 38, hours: 3.5 },
  { day: "Thu", questions: 65, hours: 6 },
  { day: "Fri", questions: 48, hours: 4.5 },
  { day: "Sat", questions: 80, hours: 8 },
  { day: "Sun", questions: 60, hours: 5 },
];

export const SUBJECT_PERFORMANCE = [
  { subject: "Physics", score: 65, fullMark: 100 },
  { subject: "Chemistry", score: 80, fullMark: 100 },
  { subject: "Maths", score: 45, fullMark: 100 },
];

// Hook
export function useDashboardData() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [stats, setStats] = useState<UserStats>(MOCK_STATS);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const executionScore = Math.round(
    (tasks.filter(t => t.completed).length / tasks.length) * 40 + 
    (stats.accuracy / 100) * 30 + 
    (Math.min(stats.hoursStudied, 60) / 60) * 30
  );

  return {
    tasks,
    stats,
    toggleTask,
    executionScore,
    weeklyActivity: WEEKLY_ACTIVITY,
    subjectPerformance: SUBJECT_PERFORMANCE
  };
}
