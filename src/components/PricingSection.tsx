import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, X, Zap, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useRazorpay } from "@/hooks/useRazorpay";

export function PricingSection() {
  const { handlePayment } = useRazorpay();

  return (
    <section id="pricing" className="py-24 bg-slate-900/30 border-t border-slate-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Choose Your Preparation System
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Select the plan that fits your execution style.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          
          {/* Plan 1: AI Mentorship */}
          <Card className="bg-slate-900 border-slate-800 flex flex-col hover:border-indigo-500/30 transition-all">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl text-white">AI Mentorship</CardTitle>
                  <CardDescription className="mt-2">Your AI-powered execution system for JEE preparation.</CardDescription>
                </div>
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  <Zap className="w-6 h-6 text-indigo-400" />
                </div>
              </div>
              <div className="mt-6">
                <span className="text-4xl font-bold text-white">₹1499</span>
                <span className="text-slate-500 ml-2">/ year</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4 mt-2">
                {[
                  "AI Study Planner",
                  "Daily Execution Score",
                  "Consistency Tracker",
                  "PYQ Practice Engine",
                  "Pressure Mode (Speed Training)",
                  "Weekly Challenges",
                  "Performance Analytics Dashboard",
                  "Progress Reports"
                ].map((feat, i) => (
                  <li key={i} className="flex items-start text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={() => handlePayment("AI Mentorship", 1499, () => alert("Payment Successful!"))}
              >
                Start AI Mentorship
              </Button>
            </CardFooter>
          </Card>

          {/* Plan 2: Elite 1:1 Mentorship */}
          <Card className="bg-slate-900 border-amber-500/30 flex flex-col relative overflow-hidden shadow-[0_0_40px_rgba(245,158,11,0.1)]">
            <div className="absolute top-0 right-0 bg-amber-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
              LIMITED SEATS
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl text-white flex items-center gap-2">
                    Elite 1:1 Mentorship <Crown className="w-5 h-5 text-amber-500" />
                  </CardTitle>
                  <CardDescription className="mt-2">For students who want personal guidance, strategy sessions, and faster improvement.</CardDescription>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center p-2 rounded bg-slate-950/50 border border-slate-800">
                  <span className="text-slate-300 text-sm">3 Months</span>
                  <span className="font-bold text-white">₹4999</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-slate-950/50 border border-slate-800">
                  <span className="text-slate-300 text-sm">6 Months</span>
                  <span className="font-bold text-white">₹7999</span>
                </div>
                <div className="flex justify-between items-center p-2 rounded bg-amber-500/10 border border-amber-500/20">
                  <span className="text-amber-200 text-sm font-medium">1 Year (Best Value)</span>
                  <span className="font-bold text-amber-400">₹13999</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-4 mt-2">
                <li className="flex items-start text-white font-medium">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 mr-3 shrink-0 mt-0.5" />
                  <span>Everything in AI Mentorship</span>
                </li>
                {[
                  "Personal Mentor Guidance",
                  "Strategy & Study Planning Sessions",
                  "Progress Review Calls",
                  "Personalized Improvement Roadmap"
                ].map((feat, i) => (
                  <li key={i} className="flex items-start text-slate-300">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 mr-3 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link to="/book-mentorship" className="w-full">
                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white border-none shadow-lg shadow-amber-900/20">
                  Apply for 1:1 Mentorship
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        {/* Feature Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Compare Plans</h3>
          <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-900">
                  <th className="p-4 font-medium text-slate-300">Feature</th>
                  <th className="p-4 font-medium text-white text-center w-1/4">AI Mentorship</th>
                  <th className="p-4 font-medium text-amber-400 text-center w-1/4">1:1 Mentorship</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {[
                  { name: "AI Study Planner", ai: true, elite: true },
                  { name: "Practice Engine", ai: true, elite: true },
                  { name: "Daily Execution Score", ai: true, elite: true },
                  { name: "Consistency Tracker", ai: true, elite: true },
                  { name: "Weekly Challenges", ai: true, elite: true },
                  { name: "Personal Mentor", ai: false, elite: true },
                  { name: "Strategy Calls", ai: false, elite: true },
                  { name: "Custom Roadmap", ai: false, elite: true },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                    <td className="p-4 text-slate-300">{row.name}</td>
                    <td className="p-4 text-center">
                      {row.ai ? (
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 mx-auto" />
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.elite ? (
                        <CheckCircle2 className="w-5 h-5 text-amber-500 mx-auto" />
                      ) : (
                        <span className="text-slate-600">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
