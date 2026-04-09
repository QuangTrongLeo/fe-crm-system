import { FileText, Star, Plus, Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { get_notes_by_customer, create_new_note } from '@/services/api/note.service'
import { useNoteStore } from '@/store/useNoteStore'
import { useAuthStore } from '@/store/useAuthStore'
import { toast } from 'sonner'
import type { NoteResponseFormData } from '@/schema/note.schema'
import { cn } from '@/lib/utils'
import { NoteItem } from './NoteLItem'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface NotesTabProps {
  customerId: number
}

export function NotesTab({ customerId }: NotesTabProps) {
  const { user } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  
  // Local form state
  const [noteContent, setNoteContent] = useState('')
  const [isImportant, setIsImportant] = useState(false)
  
  // Store notes
  const notes = useNoteStore((state) => state.notes)
  const setNotes = useNoteStore((state) => state.setNotes)

  const fetchNotes = async () => {
    setIsLoading(true)
    try {
      const res = await get_notes_by_customer(customerId)
      setNotes(res || [])
    } catch (error) {
      console.error('Failed to fetch notes:', error)
      toast.error('Failed to load notes')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (customerId) fetchNotes()
  }, [customerId])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!noteContent.trim() || !user) {
      if (!user) toast.error('You must be logged in to add notes')
      return
    }

    setIsCreating(true)
    try {
      const req = {
        customerId: customerId,
        userId: user.id,
        content: noteContent,
        isImportant: isImportant,
      };
      console.log(req);
      await create_new_note(req)
      setNoteContent('')
      setIsImportant(false)
      toast.success('Note added successfully')
      fetchNotes()
    } catch (error) {
      toast.error('Failed to add note')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Create Note Form */}
      <form onSubmit={handleCreate} className="glass-card p-6 rounded-2xl border-primary/10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-foreground">Add Context Note</span>
          </div>
          <Button 
            type="button"
            onClick={() => setIsImportant(!isImportant)}
            disabled={isCreating}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all",
              isImportant ? "bg-amber-500 text-white" : "bg-muted text-slate-400 hover:text-slate-600"
            )}
          >
            <Star className={cn("w-3 h-3", isImportant && "fill-current")} />
            Important
          </Button>
        </div>
        <div className="relative">
          <Textarea 
            placeholder="Type your note here..."
            value={noteContent}
            onChange={(e) => setNoteContent(e.target.value)}
            disabled={isCreating}
            className="w-full bg-background border rounded-xl px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none"
          />
          <Button 
            type="submit" 
            disabled={isCreating || !noteContent.trim()}
            className="absolute bottom-3 right-3 p-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
          >
            {isCreating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
          </Button>
        </div>
      </form>

      {/* Notes List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center p-12">
            <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center p-12 text-slate-400 italic text-sm">
            No notes added for this customer.
          </div>
        ) : (
          notes.map((note: NoteResponseFormData) => (
            <NoteItem key={note.id} note={note} />
          ))
        )}
      </div>
    </div>
  )
}
