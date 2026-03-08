import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, Calendar } from "lucide-react";
import { useDashboardData } from "@/lib/mockData";

export default function Planner() {
  const { tasks, toggleTask } = useDashboardData();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">AI Study Planner</h1>
          <p className="text-slate-400">Your generated schedule for today.</p>
        </div>
        <Button variant="outline"><Calendar className="mr-2 h-4 w-4" /> Regenerate Plan</Button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <Card key={task.id} className={`transition-all ${task.completed ? 'opacity-60 bg-slate-900/30' : 'bg-slate-900 border-slate-800'}`}>
            <CardContent className="p-6 flex items-center gap-4">
              <button onClick={() => toggleTask(task.id)} className="focus:outline-none">
                {task.completed ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                ) : (
                  <Circle className="w-6 h-6 text-slate-500 hover:text-indigo-500" />
                )}
              </button>
              <div className="flex-1">
                <div className={`text-lg font-medium ${task.completed ? 'text-slate-500 line-through' : 'text-white'}`}>
                  {task.title}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">{task.subject}</Badge>
                  <Badge variant="outline" className="text-xs border-slate-700">{task.type}</Badge>
                  <div className="flex items-center text-xs text-slate-500 ml-2">
                    <Clock className="w-3 h-3 mr-1" /> 45 mins
                  </div>
                </div>
              </div>
              {task.completed && (
                <Badge variant="success" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                  Completed
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
