import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, Target, BarChart3, Clock, Trophy, ArrowRight, Brain, Flame, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { PricingSection } from "@/components/PricingSection";
import { MentorshipLeadForm } from "@/components/MentorshipLeadForm";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-indigo-500/30">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm border-indigo-500/30 bg-indigo-500/10 text-indigo-300">
                <Zap className="w-3 h-3 mr-2 fill-indigo-300" /> New: AI Pressure Mode Available
              </Badge>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl mb-6 leading-tight">
                Stop Consuming Content. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  Start Executing.
                </span>
              </h1>
              <p className="mt-4 text-xl text-slate-400 max-w-2xl mx-auto mb-10">
                A system that plans your study, tracks your consistency, and trains your speed for JEE. 
                Don't just study hard, study like a machine.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/diagnostic">
                  <Button size="lg" variant="glow" className="w-full sm:w-auto text-lg px-8 h-14">
                    Start Free Diagnostic Test <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 h-14 border-slate-700 hover:bg-slate-800">
                  See How It Works
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Animated Dashboard Preview */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-20 relative rounded-xl border border-slate-800 bg-slate-900/50 shadow-2xl backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50" />
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop" 
              alt="Dashboard Preview" 
              className="w-full h-auto opacity-40 mix-blend-overlay"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-center p-8 bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl max-w-2xl">
                  <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
                    <div className="text-left">
                      <p className="text-sm text-slate-400">Daily Execution Score</p>
                      <h3 className="text-4xl font-bold text-white">78<span className="text-xl text-slate-500">/100</span></h3>
                    </div>
                    <div className="flex gap-2">
                       <Badge variant="success" className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Top 10%</Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-indigo-400 font-bold text-xl">80%</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Plan</div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-cyan-400 font-bold text-xl">70%</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Accuracy</div>
                    </div>
                    <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-emerald-400 font-bold text-xl">85%</div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Focus</div>
                    </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-slate-950 border-t border-slate-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Why Most Students Fail to Improve
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              It's not lack of talent. It's lack of system.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, title: "Inconsistent Study", desc: "Studying 12 hours one day and 2 hours the next kills momentum." },
              { icon: Target, title: "No Daily Plan", desc: "Waking up without knowing exactly what to solve leads to wasted time." },
              { icon: BarChart3, title: "Low Question Volume", desc: "Watching lectures feels like work, but only solving questions improves rank." },
              { icon: Brain, title: "No Tracking", desc: "If you don't measure your accuracy and speed, you can't improve it." },
            ].map((item, i) => (
              <Card key={i} className="bg-slate-900/50 border-slate-800 hover:border-slate-700 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-red-400" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="features" className="py-24 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-indigo-500/10 text-indigo-400 border-indigo-500/20">The Solution</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              JEE Preparation Operating System
            </h2>
            <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
              A complete ecosystem designed to force consistency and track every metric that matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="col-span-1 md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-900 border-slate-800 overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Brain className="w-64 h-64 text-indigo-500" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Brain className="w-6 h-6 text-indigo-400" /> AI Study Planner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 text-lg mb-6">
                  Stop guessing what to study. Our AI analyzes your weak areas and generates a precise daily schedule of lectures and questions.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {["Physics: 25 PYQs", "Chem: Revision", "Math: Concepts"].map((task, i) => (
                    <div key={i} className="flex items-center gap-3 bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                      <div className="w-2 h-2 rounded-full bg-indigo-500" />
                      <span className="text-sm font-mono text-slate-300">{task}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Flame className="w-6 h-6 text-orange-500" /> Consistency Tracker
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 mb-6">
                  Gamify your preparation. Maintain your streak and visualize your daily effort with heatmaps.
                </p>
                <div className="flex gap-1 flex-wrap justify-center">
                  {Array.from({ length: 28 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-3 h-3 rounded-sm ${Math.random() > 0.3 ? 'bg-emerald-500' : 'bg-slate-800'}`} 
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Clock className="w-6 h-6 text-red-500" /> Pressure Mode
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-400 mb-6">
                  Train for speed. Solve 50 questions in 60 minutes under intense timer pressure.
                </p>
                <div className="text-center p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="text-3xl font-mono font-bold text-red-400">59:21</div>
                  <div className="text-xs text-red-300/70 uppercase mt-1">Time Remaining</div>
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-1 md:col-span-2 bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-500" /> Weekly Challenges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Solve 300 Questions", progress: 75, color: "bg-indigo-500" },
                    { title: "Maintain 6 Day Streak", progress: 100, color: "bg-emerald-500" },
                    { title: "Complete 2 Mock Tests", progress: 50, color: "bg-cyan-500" },
                  ].map((challenge, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">{challenge.title}</span>
                        <span className="text-slate-400">{challenge.progress}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${challenge.color}`} style={{ width: `${challenge.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              How It Works
            </h2>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
              {[
                { step: 1, title: "Diagnostic", desc: "Take a test to find weak spots." },
                { step: 2, title: "AI Plan", desc: "Get your daily schedule." },
                { step: 3, title: "Execute", desc: "Solve daily question sets." },
                { step: 4, title: "Track", desc: "Maintain streak & score." },
                { step: 5, title: "Improve", desc: "Watch your rank go up." },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-12 h-12 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center text-xl font-bold text-white mb-4 group-hover:bg-indigo-600 transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingSection />

      {/* Free Mentorship Session Lead Capture */}
      <MentorshipLeadForm />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Rocket className="h-6 w-6 text-indigo-500" />
            <span className="text-xl font-bold text-white">JEE<span className="text-indigo-500">OS</span></span>
          </div>
          <div className="text-slate-500 text-sm">
            © 2024 JEEOS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
