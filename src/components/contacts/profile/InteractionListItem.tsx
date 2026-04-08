import type { InteractionResponseFormData } from "@/schema/interaction.schema";
import { Clock } from "lucide-react";

export function InteractionListItem({ interaction }: { interaction: InteractionResponseFormData }) {
  return (
    <div className="p-4 bg-muted/20 border border-border/50 rounded-2xl flex gap-4 transition-all hover:bg-muted/30">
      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border flex items-center justify-center text-primary shrink-0">
        <Clock className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-primary">
            {interaction.interactionType}
          </span>
          <span className="text-[10px] font-bold text-slate-400">
            {new Date(interaction.interactionDate).toLocaleDateString()}
          </span>
        </div>
        <p className="text-sm text-foreground leading-relaxed">{interaction.summary}</p>
        <p className="text-[10px] text-slate-400 mt-2">Logged by {interaction.userName}</p>
      </div>
    </div>
  )
}