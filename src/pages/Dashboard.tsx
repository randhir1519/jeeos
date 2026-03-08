import { useDashboardData } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  Target, 
  Clock, 
  Zap, 
  CheckCircle2, 
  ArrowUpRight,
  Flame,
  Brain
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

export default function Dashboard() {
  const { tasks, stats, executionScore, weeklyActivity, subjectPerformance } = useDashboardData();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400">Welcome back, Aspirant. Let's crush today's goals.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg border border-slate-800">
            <Flame className="w-5 h-5 text-orange-500 fill-orange-500" />
            <span className="font-bold text-white">{stats.streak} Day Streak</span>
          </div>
          <Button variant="glow">Start Practice</Button>
        </div>
      </div>

      {/* Execution Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" /> Daily Execution Score
            </CardTitle>
            <CardDescription>Your performance metric based on tasks, accuracy, and focus.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-8">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    className="text-slate-800"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="transparent"
                    strokeDasharray={351.86}
                    strokeDashoffset={351.86 - (351.86 * executionScore) / 100}
                    className="text-indigo-500 transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white">{executionScore}</span>
                  <span className="text-xs text-slate-400">/ 100</span>
                </div>
              </div>
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="text-sm text-slate-400">Plan Completion</div>
                  <div className="text-xl font-bold text-white">80%</div>
                  <Progress value={80} className="h-2" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-slate-400">Accuracy</div>
                  <div className="text-xl font-bold text-white">{stats.accuracy}%</div>
                  <Progress value={stats.accuracy} className="h-2 bg-slate-800" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-slate-400">Focus Hours</div>
                  <div className="text-xl font-bold text-white">6.5h</div>
                  <Progress value={65} className="h-2 bg-slate-800" />
                </div>
                <div className="space-y-1">
                  <div className="text-sm text-slate-400">Questions</div>
                  <div className="text-xl font-bold text-white">120</div>
                  <Progress value={90} className="h-2 bg-slate-800" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle>Today's Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tasks.slice(0, 3).map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/50 border border-slate-800">
                  <div className={`mt-1 w-2 h-2 rounded-full ${task.completed ? 'bg-emerald-500' : 'bg-indigo-500'}`} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-white">{task.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{task.subject} • {task.type}</div>
                  </div>
                  {task.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  ) : (
                    <div className="w-5 h-5 rounded-full border-2 border-slate-700" />
                  )}
                </div>
              ))}
              <Button variant="outline" className="w-full text-xs h-8">View Full Plan</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                  cursor={{ fill: '#1e293b', opacity: 0.4 }}
                />
                <Bar dataKey="questions" fill="#6366f1" radius={[4, 4, 0, 0]} name="Questions Solved" />
                <Bar dataKey="hours" fill="#10b981" radius={[4, 4, 0, 0]} name="Study Hours" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle>Subject Strength</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={subjectPerformance}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Performance"
                  dataKey="score"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border-indigo-500/20 hover:border-indigo-500/50 transition-colors cursor-pointer group">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white">Pressure Mode</div>
              <div className="text-sm text-slate-400">Start 1hr Speed Test</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-900/20 to-slate-900 border-emerald-500/20 hover:border-emerald-500/50 transition-colors cursor-pointer group">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white">AI Planner</div>
              <div className="text-sm text-slate-400">Generate Tomorrow's Plan</div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-cyan-900/20 to-slate-900 border-cyan-500/20 hover:border-cyan-500/50 transition-colors cursor-pointer group">
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 group-hover:bg-cyan-500 group-hover:text-white transition-colors">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <div className="font-bold text-white">Mock Test</div>
              <div className="text-sm text-slate-400">Take Full Syllabus Test</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
