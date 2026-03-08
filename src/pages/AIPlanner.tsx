import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Brain, CheckCircle2, BookOpen, Target, Calendar, Lock } from "lucide-react";
import { supabase } from "@/services/supabase";
import { GoogleGenAI } from "@google/genai";

export default function AIPlanner() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [plan, setPlan] = useState<any>(null);

  // Form State
  const [formData, setFormData] = useState({
    targetYear: "JEE 2026",
    currentClass: "11",
    studyHours: "6",
    completedChapters: "",
    backlogChapters: "",
    strongSubjects: "",
    weakSubjects: ""
  });

  // Check Access
  useEffect(() => {
    const checkAccess = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      // TASK 1: Admin Test Access
      if (user.email === 'admin@example.com') {
        setHasAccess(true);
        setLoading(false);
        return;
      }
      
      // Check subscription
      const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .eq('payment_status', 'paid')
        .gt('end_date', new Date().toISOString())
        .single();

      if (data) {
        setHasAccess(true);
      } else {
        // Strict check enabled (removed demo access)
        setHasAccess(false); 
      }
      setLoading(false);
    };

    checkAccess();
  }, [user, navigate]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      // Use process.env.GEMINI_API_KEY as per instructions
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        You are an expert JEE Mentor. Create a study plan for a student with these details:
        Target: ${formData.targetYear}
        Class: ${formData.currentClass}
        Study Hours: ${formData.studyHours}
        Completed: ${formData.completedChapters}
        Backlog: ${formData.backlogChapters}
        Strong: ${formData.strongSubjects}
        Weak: ${formData.weakSubjects}
  
        Generate a JSON response with:
        1. monthly_roadmap (string summary)
        2. weekly_targets (list of strings)
        3. daily_plan (array of objects with fields: time, subject, focus)
        4. mock_test_frequency (string)
        5. question_targets (string)
        6. revision_strategy (string)
        
        Example daily_plan format:
        [
          { "time": "6:00 AM - 8:00 AM", "subject": "Physics", "focus": "Rotational Motion Theory" },
          { "time": "8:30 AM - 11:30 AM", "subject": "Maths", "focus": "Calculus Problems" }
        ]

        Ensure the plan balances the three subjects and addresses weak areas.
      `;
  
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
  
      const planData = JSON.parse(response.text || "{}");
      setPlan(planData);
      
      // Optional: Save to DB
      // await supabase.from('student_roadmaps').upsert({ user_id: user?.id, roadmap_data: planData });

    } catch (err) {
      console.error(err);
      alert("Failed to generate plan. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-indigo-500" /></div>;

  // TASK 2: Fix Desktop Display Bug (Handle Not Logged In / No Access states)
  if (!user) {
    return (
      <Card className="bg-slate-900 border-slate-800 max-w-md mx-auto mt-10">
        <CardContent className="pt-6 text-center">
          <p className="text-slate-400 mb-4">Please log in to access the AI Planner.</p>
          <Button onClick={() => navigate('/login')}>Log In</Button>
        </CardContent>
      </Card>
    );
  }

  if (!hasAccess) {
    return (
      <Card className="bg-slate-900 border-slate-800 max-w-md mx-auto mt-10">
        <CardContent className="pt-6 text-center">
          <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-indigo-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Premium Feature</h3>
          <p className="text-slate-400 mb-6">Upgrade to AI Planner to unlock this feature.</p>
          <Button onClick={() => navigate('/#pricing')} variant="glow">Get Access</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white flex items-center gap-2">
          <Brain className="text-indigo-500" /> AI Adaptive Planner
        </h1>
        <p className="text-slate-400">Your personalized roadmap to JEE success.</p>
      </header>

      {!plan ? (
        <Card className="bg-slate-900 border-slate-800 max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-white">Configure Your Plan</CardTitle>
            <CardDescription>Tell us about your current status so the AI can optimize your schedule.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Target Year</Label>
                <Select onValueChange={(v) => setFormData({...formData, targetYear: v})} defaultValue={formData.targetYear}>
                  <SelectTrigger className="bg-slate-950 border-slate-800 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-white">
                    <SelectItem value="JEE 2025">JEE 2025</SelectItem>
                    <SelectItem value="JEE 2026">JEE 2026</SelectItem>
                    <SelectItem value="JEE 2027">JEE 2027</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Class</Label>
                <Select onValueChange={(v) => setFormData({...formData, currentClass: v})} defaultValue={formData.currentClass}>
                  <SelectTrigger className="bg-slate-950 border-slate-800 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 text-white">
                    <SelectItem value="11">Class 11</SelectItem>
                    <SelectItem value="12">Class 12</SelectItem>
                    <SelectItem value="Dropper">Dropper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Daily Study Hours</Label>
              <Input 
                type="number" 
                value={formData.studyHours}
                onChange={(e) => setFormData({...formData, studyHours: e.target.value})}
                className="bg-slate-950 border-slate-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Completed Chapters (comma separated)</Label>
              <Input 
                value={formData.completedChapters}
                onChange={(e) => setFormData({...formData, completedChapters: e.target.value})}
                className="bg-slate-950 border-slate-800 text-white"
                placeholder="e.g. Kinematics, Mole Concept..."
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Backlog / Weak Areas</Label>
              <Input 
                value={formData.backlogChapters}
                onChange={(e) => setFormData({...formData, backlogChapters: e.target.value})}
                className="bg-slate-950 border-slate-800 text-white"
                placeholder="e.g. Rotation, Ionic Equilibrium..."
              />
            </div>

            <Button onClick={handleGenerate} className="w-full mt-4" variant="glow" disabled={generating}>
              {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Generate AI Plan"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Plan Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Plan */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="text-indigo-500" /> Today's Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr>
                        <th className="p-4 border-b border-slate-800 text-slate-400 font-medium w-1/4">Time</th>
                        <th className="p-4 border-b border-slate-800 text-slate-400 font-medium w-1/4">Subject</th>
                        <th className="p-4 border-b border-slate-800 text-slate-400 font-medium">Focus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(plan.daily_plan) ? (
                        plan.daily_plan.map((task: any, index: number) => (
                          <tr key={index} className="group hover:bg-slate-800/50 transition-colors">
                            <td className="p-4 border-b border-slate-800 text-slate-300 font-mono text-sm whitespace-nowrap">
                              {task.time}
                            </td>
                            <td className="p-4 border-b border-slate-800 text-white font-medium">
                              <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                                task.subject.toLowerCase().includes('physics') ? 'bg-purple-500/10 text-purple-400' :
                                task.subject.toLowerCase().includes('chem') ? 'bg-emerald-500/10 text-emerald-400' :
                                task.subject.toLowerCase().includes('math') ? 'bg-blue-500/10 text-blue-400' :
                                'bg-slate-700 text-slate-300'
                              }`}>
                                {task.subject}
                              </span>
                            </td>
                            <td className="p-4 border-b border-slate-800 text-slate-300">
                              {task.focus}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="p-4 text-center text-slate-500">
                            No plan generated. Please try again.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button variant="outline">Update Progress</Button>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Targets */}
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Target className="text-emerald-500" /> Weekly Targets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {plan.weekly_targets?.map((target: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      {target}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white text-lg">Strategy Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase">Monthly Roadmap</h4>
                  <p className="text-white text-sm mt-1">{plan.monthly_roadmap}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase">Mock Frequency</h4>
                  <p className="text-white text-sm mt-1">{plan.mock_test_frequency}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-400 uppercase">Question Targets</h4>
                  <p className="text-white text-sm mt-1">{plan.question_targets}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-indigo-900/10 border-indigo-500/20">
              <CardHeader>
                <CardTitle className="text-indigo-400 text-lg flex items-center gap-2">
                  <BookOpen className="w-5 h-5" /> Revision Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 text-sm">{plan.revision_strategy}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
