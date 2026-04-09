"use client";

import { cn } from "@/lib/utils";
import type { NoteResponseFormData } from "@/schema/note.schema";
import { Star, User, Calendar, Quote } from "lucide-react";

export function NoteItem({ note }: { note: NoteResponseFormData }) {
  return (
    <div
      className={cn(
        "group relative p-5 rounded-2xl border transition-all duration-300 flex flex-col gap-4 hover:shadow-lg",
        note.important
          ? "bg-amber-500/5 border-amber-500/20 shadow-amber-500/5 hover:bg-amber-500/10"
          : "bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80",
      )}
    >
      {/* Importance Pin */}
      {note.important && (
        <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white shadow-lg shadow-amber-500/20 animate-in zoom-in duration-300">
          <Star className="h-3 w-3 fill-current" />
        </div>
      )}

      {/* Header Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted/80 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <User className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">
              {note.userName}
            </span>
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              {new Date(note.createdAt).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Note Content */}
      <div className="relative">
        <Quote className="absolute -left-2 -top-2 h-8 w-8 text-primary/5 -z-10" />
        <p className="text-sm text-foreground/90 leading-relaxed pl-2 border-l-2 border-primary/10 group-hover:border-primary/30 transition-colors">
          {note.content}
        </p>
      </div>

      {/* Actions/Status Label */}
      {note.important && (
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 uppercase tracking-tight">
          <span className="h-1 w-1 rounded-full bg-amber-500 animate-pulse" />
          Priority Note
        </div>
      )}
    </div>
  );
}

