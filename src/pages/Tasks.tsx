import { CheckCircle2, Circle, Clock, MoreHorizontal, Plus } from 'lucide-react';

export function Tasks() {
  const dummyTasks = [
    { id: 1, title: 'Call John Doe regarding contract renewal', date: 'Today, 2:00 PM', status: 'pending', priority: 'high' },
    { id: 2, title: 'Prepare Q3 performance review slides', date: 'Today, 5:00 PM', status: 'completed', priority: 'medium' },
    { id: 3, title: 'Follow up with Acme Corp on pending invoice', date: 'Tomorrow, 10:00 AM', status: 'pending', priority: 'high' },
    { id: 4, title: 'Send welcome email to new leads from webinar', date: 'Tomorrow, 1:00 PM', status: 'pending', priority: 'low' },
    { id: 5, title: 'Update CRM records for recent sales', date: 'Friday, 11:00 AM', status: 'pending', priority: 'medium' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Tasks</h1>
          <p className="text-muted-foreground mt-1">Manage your daily priorities and to-dos.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 flex items-center gap-2 shadow-sm">
          <Plus className="w-5 h-5" /> New Task
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="divide-y">
          {dummyTasks.map((task) => (
            <div key={task.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group cursor-pointer">
              <div className="flex items-center gap-4">
                <button className="text-slate-400 hover:text-emerald-500 transition-colors">
                  {task.status === 'completed' ? <CheckCircle2 className="w-6 h-6 text-emerald-500" /> : <Circle className="w-6 h-6" />}
                </button>
                <div>
                  <h4 className={`font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : 'text-slate-800'}`}>{task.title}</h4>
                  <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" /> {task.date}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 lg:opacity-100 transition-opacity">
                 <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                   task.priority === 'high' ? 'bg-red-100 text-red-700' : 
                   task.priority === 'medium' ? 'bg-amber-100 text-amber-700' : 
                   'bg-slate-100 text-slate-700'
                 }`}>
                   {task.priority} Priority
                 </span>
                 <button className="p-1 hover:bg-slate-200 rounded text-slate-500"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
