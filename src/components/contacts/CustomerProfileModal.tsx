import { useState } from 'react'
import { X, Mail, Phone, MapPin, Building2, Send, FileText, AlertCircle, MessageCircle } from 'lucide-react'
import { type Customer, useCustomerStore, type InteractionType } from '../../store/useCustomerStore'

interface CustomerProfileModalProps {
  customer: Customer
  onClose: () => void
}

export function CustomerProfileModal({ customer, onClose }: CustomerProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'notes' | 'interactions'>('notes')
  const [newNote, setNewNote] = useState('')
  const [isImportant, setIsImportant] = useState(false)
  
  const [newInteractionType, setNewInteractionType] = useState<InteractionType>('CALL')
  const [newInteractionSummary, setNewInteractionSummary] = useState('')

  const addNote = useCustomerStore((state) => state.addNote)
  const addInteraction = useCustomerStore((state) => state.addInteraction)

  const handleAddInteraction = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newInteractionSummary.trim()) return

    addInteraction(customer.id, newInteractionType, newInteractionSummary.trim(), 'Nguyễn Quang Minh')
    setNewInteractionSummary('')
  }

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) return

    addNote(customer.id, newNote.trim(), 'Nguyễn Quang Minh', isImportant)
    setNewNote('')
    setIsImportant(false)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-3xl bg-card rounded-2xl shadow-xl border overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Column: Profile Card */}
        <div className="w-full md:w-2/5 border-b md:border-b-0 md:border-r bg-muted/10 flex flex-col shrink-0 overflow-y-auto">
          <div className="h-28 bg-primary/10 relative shrink-0">
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-background/50 hover:bg-background/80 md:hidden backdrop-blur-md rounded-full text-foreground transition-colors z-10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="px-6 pb-6 relative grow flex flex-col">
            <div className="flex justify-between items-end mb-4">
              <img 
                src={customer.avatar} 
                alt={`${customer.firstName} ${customer.lastName}`}
                className="w-20 h-20 rounded-full border-4 border-card -mt-10 bg-background shadow-sm"
              />
              <button className="flex items-center gap-2 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors shadow-sm">
                <Mail className="w-4 h-4" /> Message
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-foreground flex flex-wrap items-center gap-2">
                {customer.firstName} {customer.lastName}
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-bold border
                  ${customer.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' : 
                    customer.status === 'INACTIVE' ? 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-500/10 dark:text-zinc-400 dark:border-zinc-500/20' : 
                    'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20'}`}
                >
                  {customer.status}
                </span>
              </h2>
              <p className="text-muted-foreground font-medium text-sm flex items-center mt-1">
                <Building2 className="w-3.5 h-3.5 mr-1" /> {customer.company}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 my-6">
              <div className="p-3 bg-background rounded-xl border shadow-sm">
                <span className="text-xs text-muted-foreground font-medium block mb-0.5">Value</span>
                <span className="font-semibold text-foreground">{customer.lifetimeValue}</span>
              </div>
              <div className="p-3 bg-background rounded-xl border shadow-sm">
                <span className="text-xs text-muted-foreground font-medium block mb-0.5">Last Contact</span>
                <span className="font-semibold text-foreground text-sm">{customer.lastContact}</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t mt-auto">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <a href={`mailto:${customer.email}`} className="text-foreground hover:text-primary transition-colors flex items-center gap-2 group truncate font-medium">
                    {customer.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <a href={`tel:${customer.phone}`} className="text-foreground hover:text-primary transition-colors flex items-center gap-2 group font-medium">
                    {customer.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-foreground font-medium truncate">{customer.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Section */}
        <div className="w-full md:w-3/5 bg-background flex flex-col flex-1 overflow-hidden h-full min-h-[400px]">
          <div className="flex items-center justify-between border-b bg-card sticky top-0 z-10 shrink-0 px-4 pt-2">
            <div className="flex gap-6">
              <button 
                onClick={() => setActiveTab('notes')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'notes' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                <FileText className="w-4 h-4" /> Notes
                <span className="ml-1 bg-secondary text-secondary-foreground py-0.5 px-2 rounded-full text-[10px]">{customer.notes.length}</span>
              </button>
              <button 
                onClick={() => setActiveTab('interactions')}
                className={`py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'interactions' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                <MessageCircle className="w-4 h-4" /> Interactions
                <span className="ml-1 bg-secondary text-secondary-foreground py-0.5 px-2 rounded-full text-[10px]">{customer.interactions.length}</span>
              </button>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-secondary hidden md:block rounded-full text-muted-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {activeTab === 'notes' ? (
            <>
              {/* Notes List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/5 relative">
                {customer.notes.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground pb-8">
                    <FileText className="w-10 h-10 mb-3 opacity-20" />
                    <p className="text-sm">No notes have been added yet.</p>
                  </div>
                ) : (
                  customer.notes.map((note) => (
                    <div key={note.id} className={`p-4 bg-card border rounded-xl shadow-sm text-sm ${note.isImportant ? 'border-amber-400 bg-amber-50/10 dark:bg-amber-500/5' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <p className={`whitespace-pre-wrap ${note.isImportant ? 'text-amber-700 dark:text-amber-400 font-medium' : 'text-foreground'}`}>
                          {note.content}
                        </p>
                        {note.isImportant && (
                          <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 ml-3" />
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t text-xs text-muted-foreground">
                        <span className="font-medium">Added by {note.author}</span>
                        <span>{note.createdAt}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Note Form */}
              <div className="p-4 border-t bg-card shrink-0">
                <form onSubmit={handleAddNote} className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Add a new note..."
                      className="flex-1 h-10 px-4 rounded-xl bg-secondary border-none focus:ring-2 focus:ring-primary/20 focus:bg-background outline-none text-sm transition-all text-foreground"
                    />
                    <button 
                      type="submit"
                      disabled={!newNote.trim()}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shadow-sm shrink-0"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer w-max ml-1">
                    <input 
                      type="checkbox" 
                      checked={isImportant}
                      onChange={(e) => setIsImportant(e.target.checked)}
                      className="rounded border-gray-300 text-amber-500 focus:ring-amber-500 h-4 w-4"
                    />
                    Mark as important
                  </label>
                </form>
              </div>
            </>
          ) : (
            <>
              {/* Interactions List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/5 relative">
                {customer.interactions.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-muted-foreground pb-8">
                    <MessageCircle className="w-10 h-10 mb-3 opacity-20" />
                    <p className="text-sm">No interactions logged yet.</p>
                  </div>
                ) : (
                  customer.interactions.map((interaction) => (
                    <div key={interaction.id} className="p-4 bg-card border rounded-xl shadow-sm text-sm">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                           <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider py-0.5 px-2 rounded-full mb-1 border border-primary/20">
                             {interaction.type}
                           </span>
                           <p className="whitespace-pre-wrap text-foreground font-medium">{interaction.summary}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3 pt-3 border-t text-xs text-muted-foreground">
                        <span className="font-medium">Logged by {interaction.author}</span>
                        <span>{interaction.createdAt}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Add Interaction Form */}
              <div className="p-4 border-t bg-card shrink-0">
                <form onSubmit={handleAddInteraction} className="flex gap-3">
                  <select
                     value={newInteractionType}
                     onChange={(e) => setNewInteractionType(e.target.value as InteractionType)}
                     className="h-10 px-3 rounded-xl bg-secondary border-none outline-none text-sm font-medium text-foreground cursor-pointer"
                  >
                    <option value="CALL">Call</option>
                    <option value="EMAIL">Email</option>
                    <option value="MEETING">Meeting</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <input
                    type="text"
                    value={newInteractionSummary}
                    onChange={(e) => setNewInteractionSummary(e.target.value)}
                    placeholder="Interaction summary..."
                    className="flex-1 h-10 px-4 rounded-xl bg-secondary border-none focus:ring-2 focus:ring-primary/20 focus:bg-background outline-none text-sm transition-all text-foreground"
                  />
                  <button 
                    type="submit"
                    disabled={!newInteractionSummary.trim()}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-xl flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors shadow-sm shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  )
}
