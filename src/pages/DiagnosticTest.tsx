import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Brain, ArrowRight, CheckCircle2, AlertTriangle, BarChart3, Loader2 } from "lucide-react";
import { supabase } from "@/services/supabase";
import { Link } from "react-router-dom";

// Types
interface DiagnosticData {
  name: string;
  class: string;
  jee_attempt_year: string;
  physics: { chapters: number; accuracy: number; marks: number };
  chemistry: { chapters: number; accuracy: number; marks: number };
  maths: { chapters: number; accuracy: number; marks: number };
  practice: { questions_per_day: number; mocks_per_month: number };
}

interface AnalysisResult {
  health_score: number;
  coverage_score: number;
  accuracy_score: number;
  practice_score: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

export default function DiagnosticTest() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  
  const [formData, setFormData] = useState<DiagnosticData>({
    name: "",
    class: "11",
    jee_attempt_year: "2026",
    physics: { chapters: 0, accuracy: 50, marks: 0 },
    chemistry: { chapters: 0, accuracy: 50, marks: 0 },
    maths: { chapters: 0, accuracy: 50, marks: 0 },
    practice: { questions_per_day: 30, mocks_per_month: 2 }
  });

  const handleAnalyze = async () => {
    setLoading(true);
    
    // 1. Calculate Scores (Rule-Based Logic)
    const totalChapters = formData.physics.chapters + formData.chemistry.chapters + formData.maths.chapters;
    const avgAccuracy = (formData.physics.accuracy + formData.chemistry.accuracy + formData.maths.accuracy) / 3;
    const practiceVolume = formData.practice.questions_per_day;

    // Simple normalization logic
    const coverageScore = Math.min(100, Math.round((totalChapters / 90) * 100)); // Approx 90 chapters in JEE
    const accuracyScore = Math.round(avgAccuracy);
    const practiceScore = Math.min(100, Math.round((practiceVolume / 100) * 100)); // Target 100 q/day

    // Weighted Health Score
    const healthScore = Math.round((coverageScore * 0.3) + (accuracyScore * 0.4) + (practiceScore * 0.3));

    // Identify Strengths & Weaknesses
    const strengths = [];
    const weaknesses = [];
    
    if (formData.physics.accuracy > 70) strengths.push("Physics Accuracy");
    else if (formData.physics.accuracy < 50) weaknesses.push("Physics Concepts");

    if (formData.chemistry.accuracy > 70) strengths.push("Chemistry Accuracy");
    else if (formData.chemistry.accuracy < 50) weaknesses.push("Chemistry Concepts");

    if (formData.maths.accuracy > 70) strengths.push("Maths Accuracy");
    else if (formData.maths.accuracy < 50) weaknesses.push("Maths Concepts");

    if (practiceVolume > 80) strengths.push("High Practice Volume");
    else if (practiceVolume < 40) weaknesses.push("Low Question Volume");

    // Generate Recommendations
    const recommendations = [];
    if (accuracyScore < 60) recommendations.push("Focus on concept clarity before solving hard problems.");
    if (practiceScore < 50) recommendations.push("Increase daily question target to at least 50.");
    if (coverageScore < 30) recommendations.push("Accelerate syllabus coverage. You are behind schedule.");
    if (formData.maths.accuracy < 50) recommendations.push("Dedicate 2 hours daily specifically to Maths practice.");

    const analysis: AnalysisResult = {
      health_score: healthScore,
      coverage_score: coverageScore,
      accuracy_score: accuracyScore,
      practice_score: practiceScore,
      strengths: strengths.length > 0 ? strengths : ["None identified yet"],
      weaknesses: weaknesses.length > 0 ? weaknesses : ["Balanced profile"],
      recommendations: recommendations.length > 0 ? recommendations : ["Maintain current pace."]
    };

    // 2. Save to Supabase
    try {
      const { error } = await supabase.from('diagnostic_tests').insert({
        name: formData.name,
        class: formData.class,
        jee_attempt_year: formData.jee_attempt_year,
        physics_accuracy: formData.physics.accuracy,
        chemistry_accuracy: formData.chemistry.accuracy,
        maths_accuracy: formData.maths.accuracy,
        coverage_score: coverageScore,
        practice_score: practiceScore,
        health_score: healthScore,
        report_summary: analysis
      });
      
      if (error) throw error;
      
      // Simulate AI delay for UX
      setTimeout(() => {
        setResult(analysis);
        setLoading(false);
      }, 1500);

    } catch (err) {
      console.error("Error saving diagnostic:", err);
      setLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-slate-300">Full Name</Label>
        <Input 
          value={formData.name} 
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          className="bg-slate-950 border-slate-800 text-white"
          placeholder="Enter your name"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Class</Label>
          <Select onValueChange={(v) => setFormData({...formData, class: v})} defaultValue={formData.class}>
            <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-800 text-white">
              <SelectItem value="11">Class 11</SelectItem>
              <SelectItem value="12">Class 12</SelectItem>
              <SelectItem value="Dropper">Dropper</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Target Year</Label>
          <Select onValueChange={(v) => setFormData({...formData, jee_attempt_year: v})} defaultValue={formData.jee_attempt_year}>
            <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-800 text-white">
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button onClick={() => setStep(2)} className="w-full mt-4" disabled={!formData.name}>
        Next Step <ArrowRight className="ml-2 w-4 h-4" />
      </Button>
    </div>
  );

  const renderSubjectInput = (subject: 'physics' | 'chemistry' | 'maths', label: string) => (
    <div className="space-y-4 p-4 rounded-lg bg-slate-950/50 border border-slate-800">
      <h3 className="font-bold text-white capitalize">{label}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs text-slate-400">Chapters Done</Label>
          <Input 
            type="number"
            value={formData[subject].chapters}
            onChange={(e) => setFormData({...formData, [subject]: { ...formData[subject], chapters: parseInt(e.target.value) || 0 }})}
            className="bg-slate-900 border-slate-700 text-white h-8"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs text-slate-400">Mock Marks</Label>
          <Input 
            type="number"
            value={formData[subject].marks}
            onChange={(e) => setFormData({...formData, [subject]: { ...formData[subject], marks: parseInt(e.target.value) || 0 }})}
            className="bg-slate-900 border-slate-700 text-white h-8"
          />
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-xs text-slate-400">Accuracy (%)</Label>
          <span className="text-xs text-indigo-400 font-mono">{formData[subject].accuracy}%</span>
        </div>
        <Slider 
          value={[formData[subject].accuracy]} 
          max={100} 
          step={5}
          onValueChange={(v) => setFormData({...formData, [subject]: { ...formData[subject], accuracy: v[0] }})}
          className="py-2"
        />
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      {renderSubjectInput('physics', 'Physics')}
      {renderSubjectInput('chemistry', 'Chemistry')}
      {renderSubjectInput('maths', 'Mathematics')}
      <div className="flex gap-4 mt-4">
        <Button variant="outline" onClick={() => setStep(1)} className="w-1/3">Back</Button>
        <Button onClick={() => setStep(3)} className="w-2/3">Next Step <ArrowRight className="ml-2 w-4 h-4" /></Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label className="text-slate-300">Questions Solved Per Day (Avg)</Label>
          <Input 
            type="number"
            value={formData.practice.questions_per_day}
            onChange={(e) => setFormData({...formData, practice: { ...formData.practice, questions_per_day: parseInt(e.target.value) || 0 }})}
            className="bg-slate-950 border-slate-800 text-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-300">Mock Tests Per Month</Label>
          <Select 
            onValueChange={(v) => setFormData({...formData, practice: { ...formData.practice, mocks_per_month: parseInt(v) }})}
            defaultValue={formData.practice.mocks_per_month.toString()}
          >
            <SelectTrigger className="bg-slate-950 border-slate-800 text-white">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 border-slate-800 text-white">
              <SelectItem value="0">0</SelectItem>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="2">2</SelectItem>
              <SelectItem value="4">4+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-4 mt-4">
        <Button variant="outline" onClick={() => setStep(2)} className="w-1/3">Back</Button>
        <Button onClick={handleAnalyze} className="w-2/3" variant="glow" disabled={loading}>
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Generate Diagnosis"}
        </Button>
      </div>
    </div>
  );

  const renderResult = () => {
    if (!result) return null;
    
    return (
      <div className="space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-900 border-4 border-indigo-500 mb-4 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{result.health_score}</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Health Score</div>
            </div>
          </div>
          <h3 className="text-xl font-bold text-white">Preparation Diagnosis</h3>
          <p className="text-slate-400 text-sm">Based on your inputs</p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center mb-6">
          <div className="p-2 bg-slate-950 rounded border border-slate-800">
            <div className="text-lg font-bold text-indigo-400">{result.coverage_score}%</div>
            <div className="text-[10px] text-slate-500">Coverage</div>
          </div>
          <div className="p-2 bg-slate-950 rounded border border-slate-800">
            <div className="text-lg font-bold text-emerald-400">{result.accuracy_score}%</div>
            <div className="text-[10px] text-slate-500">Accuracy</div>
          </div>
          <div className="p-2 bg-slate-950 rounded border border-slate-800">
            <div className="text-lg font-bold text-cyan-400">{result.practice_score}%</div>
            <div className="text-[10px] text-slate-500">Practice</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-lg">
            <h4 className="flex items-center gap-2 text-emerald-400 font-bold mb-2 text-sm">
              <CheckCircle2 className="w-4 h-4" /> Strengths
            </h4>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              {result.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>

          <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-lg">
            <h4 className="flex items-center gap-2 text-red-400 font-bold mb-2 text-sm">
              <AlertTriangle className="w-4 h-4" /> Weak Areas
            </h4>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              {result.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
            </ul>
          </div>

          <div className="p-4 bg-indigo-900/10 border border-indigo-500/20 rounded-lg">
            <h4 className="flex items-center gap-2 text-indigo-400 font-bold mb-2 text-sm">
              <Brain className="w-4 h-4" /> AI Recommendation
            </h4>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              {result.recommendations.map((r, i) => <li key={i}>{r}</li>)}
            </ul>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800">
          <Link to="/signup">
            <Button className="w-full h-12 text-lg" variant="glow">
              Start AI Mentorship to Improve
            </Button>
          </Link>
          <p className="text-center text-xs text-slate-500 mt-3">
            Get a personalized roadmap to fix these gaps.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-slate-900 border-slate-800 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Brain className="w-6 h-6 text-indigo-500" /> 
            {result ? "Analysis Complete" : "AI Diagnostic Test"}
          </CardTitle>
          <CardDescription>
            {result ? "Here is your preparation health report." : `Step ${step} of 3: ${step === 1 ? 'Basic Info' : step === 2 ? 'Subject Status' : 'Practice Habits'}`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!result && (
            <div className="mb-6">
              <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-indigo-500 transition-all duration-300" 
                  style={{ width: `${(step / 3) * 100}%` }} 
                />
              </div>
            </div>
          )}
          
          {result ? renderResult() : (
            <>
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
