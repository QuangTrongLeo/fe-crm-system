import { MoreHorizontal, ArrowUpRight, Building2, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const recentDeals = [
  { company: 'Stark Industries', contact: 'Tony Stark', amount: '$15,000', status: 'Won', date: '2 mins ago', color: 'blue' },
  { company: 'Wayne Enterprises', contact: 'Bruce Wayne', amount: '$34,200', status: 'In Progress', date: '1 hour ago', color: 'indigo' },
  { company: 'Oscorp', contact: 'Norman Osborn', amount: '$9,500', status: 'Lost', date: '3 hours ago', color: 'amber' },
  { company: 'Daily Bugle', contact: 'J. Jonah Jameson', amount: '$4,100', status: 'In Progress', date: '5 hours ago', color: 'sky' },
  { company: 'Queen Consolidated', contact: 'Oliver Queen', amount: '$22,000', status: 'Won', date: 'Yesterday', color: 'emerald' },
]

export function RecentDealsTable() {
  return (
    <div className="glass-card rounded-2xl flex flex-col overflow-hidden transition-all duration-500 hover:shadow-2xl border border-white/5">
      <div className="px-10 py-8 flex items-center justify-between border-b border-border/40">
        <div>
           <h2 className="text-2xl font-black text-foreground tracking-tight">Recent High-Value Deals</h2>
           <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mt-2">Latest pipeline movements</p>
        </div>
        <div className="flex items-center gap-3">
           <button className="px-5 py-2.5 text-[10px] font-black uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 rounded-xl hover:bg-primary/20 transition-all active:scale-[0.98]">
              View Full Pipeline
           </button>
           <button className="p-3 hover:bg-accent rounded-xl text-muted-foreground transition-all">
             <MoreHorizontal className="w-5 h-5" />
           </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/40 bg-muted/30">
              <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Partner / Lead</th>
              <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Revenue Impact</th>
              <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Lifecycle Stage</th>
              <th className="px-10 py-6 text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Activity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {recentDeals.map((deal, i) => (
              <tr key={i} className="group hover:bg-primary/5 transition-all duration-500 cursor-pointer">
                <td className="px-10 py-6">
                  <div className="flex items-center gap-5">
                     <div className={cn(
                       "w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg",
                       deal.color === 'blue' ? "bg-blue-500/10 border-blue-500/20 text-blue-500" :
                       deal.color === 'indigo' ? "bg-indigo-500/10 border-indigo-500/20 text-indigo-500" :
                       deal.color === 'amber' ? "bg-amber-500/10 border-amber-500/20 text-amber-500" :
                       deal.color === 'sky' ? "bg-sky-500/10 border-sky-500/20 text-sky-500" :
                       "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                     )}>
                        <Building2 className="w-6 h-6" />
                     </div>
                     <div>
                        <div className="text-sm font-bold text-foreground group-hover:text-primary transition-colors uppercase tracking-tight">{deal.company}</div>
                        <div className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground mt-1.5">
                           <User className="w-3.5 h-3.5 opacity-60" />
                           {deal.contact}
                        </div>
                     </div>
                  </div>
                </td>
                <td className="px-10 py-6">
                   <div className="flex items-center gap-2">
                     <span className="text-sm font-black text-foreground tracking-tighter">{deal.amount}</span>
                     <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500 opacity-0 group-hover:opacity-100 transition-all translate-y-1 group-hover:translate-y-0" />
                   </div>
                </td>
                <td className="px-10 py-6">
                  <span className={cn(
                    "px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 border transition-colors",
                    deal.status === 'Won' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 
                    deal.status === 'Lost' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' : 
                    'bg-primary/10 text-primary border-primary/20'
                  )}>
                    <div className={cn(
                      "w-2 h-2 rounded-full animate-pulse",
                      deal.status === 'Won' ? 'bg-emerald-500' : deal.status === 'Lost' ? 'bg-rose-500' : 'bg-primary'
                    )} />
                    {deal.status}
                  </span>
                </td>
                <td className="px-10 py-6">
                   <span className="text-xs font-medium text-muted-foreground">{deal.date}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-10 py-8 bg-muted/10 border-t border-border/40 flex items-center justify-between">
         <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Showing 5 of 124 results</span>
         <div className="flex gap-3">
            <button className="px-5 py-2.5 rounded-xl border border-border bg-background text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-accent transition-all active:scale-[0.98]">Previous</button>
            <button className="px-5 py-2.5 rounded-xl border border-border bg-background text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:bg-accent transition-all active:scale-[0.98]">Next</button>
         </div>
      </div>
    </div>
  )
}
