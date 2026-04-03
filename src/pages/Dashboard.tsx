import { StatsGrid } from '../components/dashboard/StatsGrid'
import { RecentDealsTable } from '../components/dashboard/RecentDealsTable'
import { DailyTasksList } from '../components/dashboard/DailyTasksList'

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Welcome back, Jane. Here's what's happening with your deals today.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg hover:bg-secondary/80 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
            Add New Deal
          </button>
        </div>
      </div>

      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentDealsTable />
        <DailyTasksList />
      </div>
    </div>
  )
}
