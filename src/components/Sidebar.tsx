import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  CalendarDays, 
  Dumbbell, 
  BarChart2, 
  Trophy, 
  Settings, 
  LogOut,
  Rocket
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
  { icon: CalendarDays, label: "Planner", href: "/dashboard/planner" },
  { icon: Dumbbell, label: "Practice", href: "/dashboard/practice" },
  { icon: BarChart2, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Trophy, label: "Challenges", href: "/dashboard/challenges" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="hidden md:flex h-screen w-64 flex-col fixed left-0 top-0 border-r border-slate-800 bg-slate-950">
      <div className="flex h-16 items-center px-6 border-b border-slate-800">
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
            <Rocket className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">JEE<span className="text-indigo-500">OS</span></span>
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-indigo-500/10 text-indigo-400"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-5 w-5 flex-shrink-0",
                    isActive ? "text-indigo-400" : "text-slate-500 group-hover:text-white"
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="border-t border-slate-800 p-4">
        <Link to="/settings">
          <Button variant="ghost" className="w-full justify-start text-slate-400 hover:text-white mb-2">
            <Settings className="mr-3 h-5 w-5" />
            Settings
          </Button>
        </Link>
        <Link to="/">
          <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10">
            <LogOut className="mr-3 h-5 w-5" />
            Log out
          </Button>
        </Link>
      </div>
    </div>
  );
}
