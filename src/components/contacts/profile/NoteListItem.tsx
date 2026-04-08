import { cn } from "@/lib/utils";
import type { NoteResponseFormData } from "@/schema/note.schema";
import { UserCircle2 } from "lucide-react";

export function NoteListItem({ note }: { note: NoteResponseFormData }) {
  return (
    <div className={cn(
      "p-5 rounded-2xl border transition-all flex flex-col gap-3",
      note.isImportant ? "bg-amber-500/5 border-amber-500/20" : "bg-muted/20 border-border/50 hover:bg-muted/30"
    )}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserCircle2 className="w-4 h-4 text-slate-400" />
          <span className="text-[10px] font-black uppercase tracking-widest text-foreground">
            {note.userName}
          </span>
        </div>
        <span className="text-[10px] font-bold text-slate-400">
          {new Date(note.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm text-foreground leading-relaxed">{note.content}</p>
    </div>
  )
}