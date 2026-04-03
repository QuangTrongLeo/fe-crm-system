import { ArrowUpRight, ArrowDownRight, DollarSign, Users, Briefcase, Activity } from 'lucide-react'

const stats = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    isPositive: true,
    icon: DollarSign,
  },
  {
    title: 'Active Contacts',
    value: '2,350',
    change: '+15.2%',
    isPositive: true,
    icon: Users,
  },
  {
    title: 'Active Deals',
    value: '43',
    change: '-5.1%',
    isPositive: false,
    icon: Briefcase,
  },
  {
    title: 'Conversion Rate',
    value: '12.4%',
    change: '+2.4%',
    isPositive: true,
    icon: Activity,
  },
]

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, i) => (
        <div key={i} className="p-6 bg-card border rounded-xl shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">{stat.title}</span>
            <div className="p-2 bg-primary/10 rounded-lg">
              <stat.icon className="w-4 h-4 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-2xl font-bold">{stat.value}</span>
            <span className={`flex items-center text-xs font-medium ${stat.isPositive ? 'text-emerald-600' : 'text-red-600'}`}>
              {stat.isPositive ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {stat.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
