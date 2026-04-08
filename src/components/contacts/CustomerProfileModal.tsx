import { X } from 'lucide-react'
import { useState } from 'react'
import type { CustomerResponseFormData } from '@/schema/customer.schema'
import { cn } from '@/lib/utils'

// Sub-components
import { ProfileSidebar } from './profile/ProfileSidebar'
import { DetailsTab } from './profile/DetailsTab'
import { InteractionsTab } from './profile/InteractionsTab'
import { NotesTab } from './profile/NotesTab'

interface CustomerProfileModalProps {
  customer: CustomerResponseFormData
  onClose: () => void
}

type TabType = 'details' | 'interactions' | 'notes'

const TABS: { id: TabType; label: string }[] = [
  { id: 'details', label: 'details' },
  { id: 'interactions', label: 'interactions' },
  { id: 'notes', label: 'notes' },
]

export function CustomerProfileModal({ customer, onClose }: CustomerProfileModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details')
  
  const getInitials = (first: string, last: string) => {
    return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="relative w-full max-w-4xl bg-card rounded-2xl shadow-2xl border overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Section: Information Sidebar */}
        <ProfileSidebar 
          customer={customer} 
          onClose={onClose} 
          getInitials={getInitials} 
        />

        {/* Right Section: Content Area */}
        <div className="flex-1 bg-background flex flex-col p-0 overflow-hidden">
          
          {/* Header & Internal Navigation */}
          <div className="px-8 pt-8 border-b border-border/40 shrink-0">
             <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  {TABS.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "pb-4 text-[10px] font-black uppercase tracking-[0.2em] relative transition-colors",
                        activeTab === tab.id ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-in fade-in slide-in-from-bottom-1" />
                      )}
                    </button>
                  ))}
                </div>
                <button 
                  onClick={onClose}
                  className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors -mt-4 outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
             </div>
          </div>

          {/* Tab Content Body */}
          <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
             {activeTab === 'details' && <DetailsTab customer={customer} />}
             {activeTab === 'interactions' && <InteractionsTab customerId={customer.id} />}
             {activeTab === 'notes' && <NotesTab customerId={customer.id} />}
          </div>

          {/* Footer Actions */}
          <div className="px-8 py-6 border-t border-border/40 bg-muted/5 flex items-center justify-between shrink-0">
             <div className="flex items-center gap-4">
                <button className="px-5 py-2.5 border border-border text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-background transition-all active:scale-[0.98]">
                   Export History
                </button>
             </div>
             <button className="px-6 py-2.5 bg-foreground text-background text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all active:scale-[0.98]">
                Save Changes
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}
