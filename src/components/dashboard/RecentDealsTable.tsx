import { MoreHorizontal } from 'lucide-react'

const recentDeals = [
  { company: 'Stark Industries', contact: 'Tony Stark', amount: '$15,000', status: 'Won', date: '2 mins ago' },
  { company: 'Wayne Enterprises', contact: 'Bruce Wayne', amount: '$34,200', status: 'In Progress', date: '1 hour ago' },
  { company: 'Oscorp', contact: 'Norman Osborn', amount: '$9,500', status: 'Lost', date: '3 hours ago' },
  { company: 'Daily Bugle', contact: 'J. Jonah Jameson', amount: '$4,100', status: 'In Progress', date: '5 hours ago' },
  { company: 'Queen Consolidated', contact: 'Oliver Queen', amount: '$22,000', status: 'Won', date: 'Yesterday' },
]

export function RecentDealsTable() {
  return (
    <div className="lg:col-span-2 bg-card border rounded-xl shadow-sm flex flex-col">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="font-semibold">Recent Deals</h2>
        <button className="p-1 hover:bg-secondary rounded-md text-muted-foreground transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>
      <div className="p-0 overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
            <tr>
              <th className="px-6 py-4 font-medium">Company/Contact</th>
              <th className="px-6 py-4 font-medium">Amount</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Last updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentDeals.map((deal, i) => (
              <tr key={i} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium text-foreground">{deal.company}</div>
                  <div className="text-muted-foreground text-xs mt-0.5">{deal.contact}</div>
                </td>
                <td className="px-6 py-4 font-medium">{deal.amount}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                    ${deal.status === 'Won' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 
                      deal.status === 'Lost' ? 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400' : 
                      'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400'}`}
                  >
                    {deal.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{deal.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
