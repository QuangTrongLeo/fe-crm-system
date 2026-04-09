import { StatsGrid } from "../components/dashboard/StatsGrid";
import { RecentDealsTable } from "../components/dashboard/RecentDealsTable";
import { DailyTasksList } from "../components/dashboard/DailyTasksList";
import { FileDown, Plus, Sparkles, Filter } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Button } from "@/components/ui/button";

export function Dashboard() {
  const { user } = useAuthStore();
  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good Morning"
      : currentHour < 18
        ? "Good Afternoon"
        : "Good Evening";

  return (
    <div className="space-y-12 pb-12">
      {/* Welcome Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 relative">
        <div className="animate-in slide-in-from-left duration-1000">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1 px-3 bg-primary/10 rounded-full flex items-center gap-2 border border-primary/20">
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                System Active
              </span>
            </div>
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
              • {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tight text-foreground leading-tight">
            {greeting},{" "}
            <span className="text-gradient">
              {(user?.fullName || "User").split(" ")[0]}.
            </span>
          </h1>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.2em] text-xs mt-6 max-w-lg flex items-center gap-2">
            Workspace efficiency is at{" "}
            <span className="text-emerald-500 font-bold">94%</span>
          </p>
        </div>

        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right duration-1000">
          <Button className="flex items-center gap-2.5 px-6 py-4 bg-background/50 glass-card text-foreground/80 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-accent transition-all active:scale-[0.98]">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button className="flex items-center gap-2.5 px-6 py-4 bg-background/50 glass-card text-foreground/80 text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-accent transition-all active:scale-[0.98]">
            <FileDown className="w-4 h-4" />
            Export
          </Button>
          <Button className="flex items-center gap-2.5 px-7 py-4 bg-primary text-primary-foreground text-[10px] font-black uppercase tracking-widest rounded-2xl hover:bg-primary/90 transition-all active:scale-[0.98] shadow-2xl shadow-primary/30">
            <Plus className="w-4 h-4" />
            New Deal
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <section className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
        <StatsGrid />
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
        <div className="lg:col-span-2">
          <RecentDealsTable />
        </div>
        <div>
          <DailyTasksList />
        </div>
      </div>
    </div>
  );
}
