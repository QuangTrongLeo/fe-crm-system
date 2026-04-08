import { CheckCircle2, Clock, Calendar, MoreHorizontal, Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

const tasks = [
  { title: 'Call Pepper Potts regarding contract review', type: 'Call', time: '10:00 AM', completed: false, priority: 'High' },
  { title: 'Follow up with Bruce on security systems', type: 'Email', time: '1:30 PM', completed: true, priority: 'Medium' },
  { title: 'Prepare Q3 performance presentation', type: 'To-do', time: '4:00 PM', completed: false, priority: 'High' },
]

export function DailyTasksList() {
  return (
    <div className="glass-card rounded-2xl flex flex-col transition-all duration-500 hover:shadow-2xl overflow-hidden border border-white/5">
      <div className="px-10 py-8 border-b border-border/40 flex items-center justify-between bg-muted/20">
        <div>
           <h2 className="text-2xl font-black text-foreground tracking-tight">Daily Agenda</h2>
           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-2">3 tasks remaining</p>
        </div>
        <button className="p-3.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-[0.98]">
           <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="p-8 space-y-6">
        {tasks.map((task, i) => (
          <div 
            key={i} 
            className={cn(
              "group relative flex items-start gap-5 p-5 rounded-2xl border transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-md",
              task.completed 
                ? 'bg-muted/30 border-transparent opacity-50 grayscale select-none' 
                : 'bg-background/40 border-border/50 hover:border-primary/40 hover:bg-background/60 hover:shadow-2xl hover:shadow-primary/5'
            )}
          >
            {/* Hover Glow */}
            {!task.completed && (
              <div className="absolute -left-10 -top-10 w-32 h-32 bg-primary/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            )}

            <button className={cn(
              "mt-1 shrink-0 transition-all duration-500 active:scale-125",
              task.completed ? 'text-emerald-500' : 'text-muted-foreground group-hover:text-primary'
            )}>
              {task.completed ? (
                <div className="w-7 h-7 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/20 shadow-inner">
                   <CheckCircle2 className="w-4 h-4" />
                </div>
              ) : (
                <div className="w-7 h-7 rounded-xl border-2 border-border/60 group-hover:border-primary transition-colors flex items-center justify-center bg-background/50 shadow-sm" />
              )}
            </button>
            
            <div className="flex-1 min-w-0 flex flex-col gap-3 relative z-10">
              <div className="flex items-center justify-between">
                 <span className={cn(
                   "text-[9px] font-black uppercase tracking-[0.2em] px-2 py-0.5 rounded-full border",
                   task.priority === 'High' ? 'text-rose-500 bg-rose-500/10 border-rose-500/20' : 'text-amber-500 bg-amber-500/10 border-amber-500/20'
                 )}>
                    {task.priority} Priority
                 </span>
                 <MoreHorizontal className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <span className={cn(
                "text-base font-bold tracking-tight leading-tight transition-all duration-500",
                task.completed ? 'line-through text-muted-foreground' : 'text-foreground group-hover:text-primary'
              )}>
                {task.title}
              </span>
              
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest mt-1">
                <span className="flex items-center gap-2 bg-muted/60 px-3 py-1.5 rounded-xl border border-border/50 text-muted-foreground">
                   <Clock className="w-3.5 h-3.5" /> {task.time}
                </span>
                <span className="flex items-center gap-2 bg-muted/60 px-3 py-1.5 rounded-xl border border-border/50 text-muted-foreground">
                   <Calendar className="w-3.5 h-3.5" /> {task.type}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto px-8 py-6 bg-muted/20 border-t border-border/40">
         <button className="w-full py-4 text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground hover:text-primary transition-all group">
            <span className="inline-block transition-transform group-hover:scale-105">View Expanded Schedule</span>
         </button>
      </div>
    </div>
  )
}
