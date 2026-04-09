import { X } from 'lucide-react'
import { useState } from 'react'
import type { CustomerResponseFormData } from '@/schema/customer.schema'
import { cn } from '@/lib/utils'

// Sub-components
import { ProfileSidebar } from './profile/ProfileSidebar'
import { DetailsTab } from './profile/DetailsTab'
import { InteractionsTab } from './profile/InteractionsTab'
import { NotesTab } from './profile/NotesTab'
import { Button } from '../ui/button'

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
             <div className="flex items-center justify-between mb-0">
                <div className="flex items-center gap-2">
                  {TABS.map((tab) => (
                    <Button
                      key={tab.id}
                      variant="ghost"
                      onClick={() => setActiveTab(tab.id)}
                      className={cn(
                        "px-4 pb-4 h-auto rounded-none bg-transparent hover:bg-transparent text-[11px] font-black uppercase tracking-[0.2em] relative transition-all duration-300",
                        activeTab === tab.id ? "text-blue-600" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      {tab.label}
                      {activeTab === tab.id && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 animate-in fade-in slide-in-from-bottom-1" />
                      )}
                    </Button>
                  ))}
                </div>
                <Button 
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="rounded-full hover:bg-muted text-muted-foreground transition-all -mt-4 shadow-none"
                >
                  <X className="w-5 h-5" />
                </Button>
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
                <Button variant="outline" className="h-auto px-5 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all active:scale-[0.98]">
                   Export History
                </Button>
             </div>
             <Button className="h-auto px-6 py-2.5 bg-foreground text-background text-[10px] font-black uppercase tracking-widest rounded-xl hover:opacity-90 transition-all active:scale-[0.98] shadow-lg">
                Save Changes
             </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
