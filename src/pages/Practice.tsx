import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Timer, BookOpen, Layers } from "lucide-react";

export default function Practice() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Practice Engine</h1>
        <p className="text-slate-400">Select a mode to start solving questions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pressure Mode */}
        <Card className="bg-gradient-to-br from-red-900/20 to-slate-900 border-red-500/30 relative overflow-hidden group hover:border-red-500/50 transition-all">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Timer className="w-32 h-32 text-red-500" />
          </div>
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-red-500/20 flex items-center justify-center mb-4 text-red-500">
              <Zap className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl">Pressure Mode</CardTitle>
            <CardDescription>Speed training simulation.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Questions</span>
                <span className="text-white font-mono">50</span>
              </div>
              <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Time Limit</span>
                <span className="text-white font-mono">60 Mins</span>
              </div>
              <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Subject</span>
                <span className="text-white font-mono">Mixed</span>
              </div>
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-900/20">
              Start Session
            </Button>
          </CardContent>
        </Card>

        {/* Chapter Wise */}
        <Card className="bg-slate-900 border-slate-800 hover:border-indigo-500/50 transition-all group">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-indigo-500/20 flex items-center justify-center mb-4 text-indigo-500">
              <BookOpen className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl">Chapter Wise</CardTitle>
            <CardDescription>Target specific weak areas.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Selection</span>
                <span className="text-white">Manual</span>
              </div>
              <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Difficulty</span>
                <span className="text-white">Adaptive</span>
              </div>
              <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Mode</span>
                <span className="text-white">Untimed</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">Select Chapter</Button>
          </CardContent>
        </Card>

        {/* PYQ Mode */}
        <Card className="bg-slate-900 border-slate-800 hover:border-emerald-500/50 transition-all group">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-500">
              <Layers className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl">PYQ Archive</CardTitle>
            <CardDescription>Previous Year Questions (2019-2024).</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Years</span>
                <span className="text-white">2019 - 2024</span>
              </div>
              <div className="flex justify-between text-sm border-b border-slate-800 pb-2">
                <span className="text-slate-400">Shift</span>
                <span className="text-white">All Shifts</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">Browse Archive</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
