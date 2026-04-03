import { Plus, MoreHorizontal } from 'lucide-react';

export function Deals() {
  const columns = [
    { name: 'Lead / Discovery', count: 3, total: '$12,500', 
      deals: [
        { name: 'Acme Corp Upgrade', company: 'Acme Corp', value: '$4,500', probability: '20%' },
        { name: 'New Website Project', company: 'Globex Inc', value: '$8,000', probability: '30%' },
      ]
    },
    { name: 'Meeting Scheduled', count: 2, total: '$21,000', 
      deals: [
        { name: 'Enterprise License', company: 'Wayne Enterprises', value: '$15,000', probability: '50%' },
        { name: 'Consulting Retainer', company: 'Stark Industries', value: '$6,000', probability: '40%' },
      ]
    },
    { name: 'Proposal Sent', count: 1, total: '$50,000', 
      deals: [
        { name: 'Global Rollout', company: 'Umbrella Corp', value: '$50,000', probability: '70%' },
      ]
    },
    { name: 'Closed Won', count: 4, total: '$85,000', 
      deals: [
        { name: 'Q1 Partnership', company: 'Daily Planet', value: '$35,000', probability: '100%' },
        { name: 'SaaS Subscription', company: 'LexCorp', value: '$50,000', probability: '100%' },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Deals Pipeline</h1>
          <p className="text-muted-foreground mt-1">Track and manage your sales opportunities.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 flex items-center gap-2 shadow-sm">
          <Plus className="w-5 h-5" /> Add Deal
        </button>
      </div>

      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-6 h-full min-w-max">
          {columns.map((col, idx) => (
            <div key={idx} className="w-[320px] flex flex-col bg-slate-100 rounded-xl p-3 h-full">
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                  {col.name} <span className="bg-slate-200 text-slate-500 text-xs px-2 py-0.5 rounded-full">{col.count}</span>
                </h3>
                <span className="text-sm font-medium text-slate-500">{col.total}</span>
              </div>
              
              <div className="flex flex-col gap-3 overflow-y-auto">
                {col.deals.map((deal, didx) => (
                  <div key={didx} className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 cursor-grab hover:border-primary/50 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="font-semibold text-slate-800 line-clamp-1 pr-4">{deal.name}</h4>
                       <button className="text-slate-400 opacity-0 group-hover:opacity-100 hover:text-slate-600"><MoreHorizontal className="w-4 h-4" /></button>
                    </div>
                    <p className="text-sm text-slate-500 mb-3">{deal.company}</p>
                    <div className="flex items-center justify-between text-sm font-medium">
                       <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded text-xs">{deal.value}</span>
                       <span className="text-slate-400 text-xs">{deal.probability}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="mt-3 flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-slate-500 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition-colors">
                 <Plus className="w-4 h-4" /> Add Deal
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
