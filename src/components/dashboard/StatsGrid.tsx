import { DollarSign, Users, Briefcase, Activity, TrendingUp, TrendingDown } from 'lucide-react'

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    isPositive: true,
    icon: DollarSign,
    color: 'from-blue-500 to-indigo-600',
    chart: [35, 45, 30, 55, 40, 60, 50]
  },
  {
    title: 'Active Contacts',
    value: '2,350',
    change: '+15.2%',
    isPositive: true,
    icon: Users,
    color: 'from-emerald-400 to-teal-600',
    chart: [20, 30, 25, 40, 35, 45, 50]
  },
  {
    title: 'Active Deals',
    value: '43',
    change: '-5.1%',
    isPositive: false,
    icon: Briefcase,
    color: 'from-orange-400 to-red-500',
    chart: [50, 40, 45, 30, 35, 25, 20]
  },
  {
    title: 'Conversion Rate',
    value: '12.4%',
    change: '+2.4%',
    isPositive: true,
    icon: Activity,
    color: 'from-purple-500 to-pink-600',
    chart: [10, 12, 11, 14, 13, 15, 16]
  },
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {stats.map((stat, i) => (
        <div key={i} className="group relative glass-card p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden cursor-default">
          {/* Subtle background glow */}
          <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-10 blur-[60px] transition-opacity duration-1000`} />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className={`p-3 rounded-2xl bg-linear-to-br ${stat.color} shadow-lg shadow-primary/20 ring-1 ring-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                <stat.icon className="w-5 h-5 text-white" />
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${stat.isPositive ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                {stat.isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">{stat.title}</span>
              <div className="flex items-baseline gap-2">
                <h3 className="text-3xl font-black text-foreground tracking-tighter">{stat.value}</h3>
              </div>
            </div>

            {/* Micro Sparkline Simulation */}
            <div className="mt-8 flex items-end gap-1.5 h-10 opacity-30 group-hover:opacity-100 transition-all duration-700">
               {stat.chart.map((point, idx) => (
                 <div 
                   key={idx} 
                   className={`flex-1 rounded-t-sm transition-all duration-700 ${stat.isPositive ? 'bg-emerald-500/30' : 'bg-rose-500/30'} group-hover:bg-primary`}
                   style={{ 
                     height: `${point}%`, 
                     transitionDelay: `${idx * 40}ms`,
                     backgroundColor: stat.isPositive ? undefined : 'var(--color-rose-500)'
                   }}
                 />
               ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
