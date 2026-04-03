import { CheckCircle2, Clock } from 'lucide-react'

const tasks = [
  { title: 'Call Pepper Potts regarding contract review', type: 'Call', time: '10:00 AM', completed: false },
  { title: 'Follow up with Bruce on security systems', type: 'Email', time: '1:30 PM', completed: true },
  { title: 'Prepare Q3 performance presentation', type: 'To-do', time: '4:00 PM', completed: false },
]

export function DailyTasksList() {
  return (
    <div className="bg-card border rounded-xl shadow-sm flex flex-col">
      <div className="p-6 border-b flex items-center justify-between">
        <h2 className="font-semibold">Daily Tasks</h2>
        <button className="text-sm text-primary hover:underline font-medium">View All</button>
      </div>
      <div className="p-4 space-y-4">
        {tasks.map((task, i) => (
          <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${task.completed ? 'bg-muted/50 border-transparent' : 'bg-background hover:border-primary/30 transition-colors'}`}>
            <button className={`mt-0.5 shrink-0 ${task.completed ? 'text-primary' : 'text-muted-foreground hover:text-primary transition-colors'}`}>
              {task.completed ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-current" />}
            </button>
            <div className="flex-1 min-w-0 flex flex-col gap-1">
              <span className={`text-sm font-medium ${task.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                {task.title}
              </span>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {task.time}</span>
                <span>•</span>
                <span>{task.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
