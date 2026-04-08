import { X, Building2, Mail, Phone, type LucideIcon } from 'lucide-react'
import type { CustomerResponseFormData } from '@/schema/customer.schema'
import { cn } from '@/lib/utils'

interface ProfileSidebarProps {
  customer: CustomerResponseFormData
  onClose: () => void
  getInitials: (first: string, last: string) => string
}

function InfoItem({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: string }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all duration-300">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400">{label}</p>
        <p className="text-xs font-bold text-foreground truncate">{value}</p>
      </div>
    </div>
  )
}

export function ProfileSidebar({ customer, onClose, getInitials }: ProfileSidebarProps) {
  const isStatusActive = customer.status === 'ACTIVE'

  return (
    <div className="w-full md:w-80 border-b md:border-b-0 md:border-r bg-muted/5 flex flex-col shrink-0">
      <div className="h-24 bg-linear-to-br from-blue-500 to-indigo-600 relative shrink-0">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 md:hidden backdrop-blur-md rounded-full text-white transition-colors z-10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="px-6 pb-6 relative grow flex flex-col">
        <div className="flex justify-between items-end mb-6">
          <div className="w-20 h-20 rounded-2xl border-4 border-card -mt-10 bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center text-2xl font-black text-blue-600">
            {getInitials(customer.firstName, customer.lastName)}
          </div>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-black tracking-tight text-foreground">
            {customer.firstName} {customer.lastName}
          </h2>
          <div className="flex items-center gap-2">
            <span className={cn(
              "inline-flex items-center px-2 py-0.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-black border",
              isStatusActive 
                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" 
                : "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
            )}>
              {customer.status}
            </span>
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">ID: #{customer.id}</span>
          </div>
        </div>

        <div className="mt-8 space-y-5">
           <InfoItem icon={Building2} label="Company" value={customer.company} />
           <InfoItem icon={Mail} label="Email" value={customer.email} />
           <InfoItem icon={Phone} label="Phone" value={customer.phone} />
        </div>

        <div className="mt-auto pt-6 border-t border-border/50">
           <button className="w-full flex items-center justify-center gap-2 py-3 bg-white text-blue-600 border border-blue-600/20 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-blue-600/5 group active:scale-[0.98]">
              <Mail className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" /> 
              Send Message
           </button>
        </div>
      </div>
    </div>
  )
}
