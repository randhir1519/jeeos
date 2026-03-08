import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target, Crown, Medal, Flame } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function Challenges() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Weekly Challenges & Leaderboard</h1>
        <p className="text-slate-400">Compete with other aspirants and earn badges.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Challenges Column */}
        <div className="lg:col-span-2 space-y-6">
           <h2 className="text-xl font-bold text-white flex items-center gap-2">
             <Target className="w-5 h-5 text-indigo-500" /> Active Challenges
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900 border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Trophy className="w-24 h-24 text-yellow-500" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" /> Question Master
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">300 Questions</div>
                <p className="text-slate-400 text-sm mb-4">Solve 300 questions this week across all subjects.</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Progress</span>
                    <span className="text-white">225 / 300</span>
                  </div>
                  <Progress value={75} className="h-2 bg-slate-800" />
                </div>
                <div className="mt-4 flex gap-2">
                  <Badge variant="warning" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">500 XP</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Star className="w-24 h-24 text-emerald-500" />
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-emerald-500" /> Consistency King
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-2">6 Day Streak</div>
                <p className="text-slate-400 text-sm mb-4">Study for at least 4 hours daily for 6 days.</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Progress</span>
                    <span className="text-white">6 / 6</span>
                  </div>
                  <Progress value={100} className="h-2 bg-slate-800" />
                </div>
                <div className="mt-4 flex gap-2">
                  <Badge variant="success" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">Completed</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar: Leaderboard & Badges */}
        <div className="space-y-8">
          {/* Leaderboard */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-yellow-500" /> Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Rahul K.", xp: "2450 XP", rank: 1, color: "text-yellow-500" },
                { name: "Sneha M.", xp: "2100 XP", rank: 2, color: "text-slate-300" },
                { name: "Amit S.", xp: "1950 XP", rank: 3, color: "text-orange-400" },
                { name: "You", xp: "1200 XP", rank: 14, color: "text-indigo-400" },
              ].map((user, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-950/50 border border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className={`font-bold w-6 text-center ${user.color}`}>#{user.rank}</div>
                    <div className="text-white font-medium">{user.name}</div>
                  </div>
                  <div className="text-sm font-mono text-slate-400">{user.xp}</div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Badges */}
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Medal className="w-5 h-5 text-indigo-500" /> Your Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center mb-2 border border-yellow-500/50">
                    <Flame className="w-6 h-6 text-yellow-500" />
                  </div>
                  <span className="text-xs text-slate-300">7 Day Streak</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-2 border border-emerald-500/50">
                    <Target className="w-6 h-6 text-emerald-500" />
                  </div>
                  <span className="text-xs text-slate-300">Accuracy 90%</span>
                </div>
                <div className="flex flex-col items-center text-center opacity-40 grayscale">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-2 border border-slate-700">
                    <Crown className="w-6 h-6 text-slate-500" />
                  </div>
                  <span className="text-xs text-slate-500">Top 10 Rank</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
