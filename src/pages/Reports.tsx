import { BarChart3, TrendingUp, PieChart as PieChartIcon, Activity } from 'lucide-react';

export function Reports() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-800">
          Analytics & Reports
        </h1>

        <p className="text-muted-foreground mt-1">
          Key metrics and performance indicators.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex items-start gap-4">
          <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Total Revenue
            </p>
            <h3 className="text-2xl font-bold mt-1">$45,231.89</h3>
            <span className="text-xs text-emerald-600 font-medium">
              +20.1% from last month
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex items-start gap-4">
          <div className="p-3 rounded-lg bg-emerald-50 text-emerald-600">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Active Deals
            </p>
            <h3 className="text-2xl font-bold mt-1">34</h3>
            <span className="text-xs text-emerald-600 font-medium">
              +15 since last week
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex items-start gap-4">
          <div className="p-3 rounded-lg bg-amber-50 text-amber-600">
            <PieChartIcon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Conversion Rate
            </p>
            <h3 className="text-2xl font-bold mt-1">24.5%</h3>
            <span className="text-xs text-muted-foreground font-medium">
              Steady
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-border shadow-sm flex items-start gap-4">
          <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-medium">
              Avg Deal Size
            </p>
            <h3 className="text-2xl font-bold mt-1">$4,210</h3>
            <span className="text-xs text-red-600 font-medium">
              -2% from last month
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-xl shadow-sm p-6 h-[400px] flex items-center justify-center">
        <p className="text-muted-foreground">
          Chart visualizer placeholder (e.g. Recharts integration)
        </p>
      </div>
    </div>
  );
}
