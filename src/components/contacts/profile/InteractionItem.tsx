"use client";

import type { InteractionResponseFormData } from "@/schema/interaction.schema";
import { 
  Mail, 
  Users, 
  Phone, 
  MessageSquare, 
  Clock, 
  User 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function InteractionItem({
  interaction,
}: {
  interaction: InteractionResponseFormData;
}) {
  const getInteractionConfig = (type: string) => {
    switch (type.toUpperCase()) {
      case "EMAIL":
        return {
          icon: Mail,
          color: "bg-rose-500/10 text-rose-600 border-rose-500/20",
          label: "Email"
        };
      case "MEETING":
        return {
          icon: Users,
          color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
          label: "Meeting"
        };
      case "CALL":
        return {
          icon: Phone,
          color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
          label: "Call"
        };
      default:
        return {
          icon: MessageSquare,
          color: "bg-slate-500/10 text-slate-600 border-slate-500/20",
          label: type
        };
    }
  };

  const config = getInteractionConfig(interaction.interactionType);
  const Icon = config.icon;

  return (
    <div className="group relative flex gap-4 p-4 rounded-2xl border bg-card/50 backdrop-blur-sm transition-all hover:shadow-md hover:bg-card/80 border-border/50">
      {/* Icon Section */}
      <div className={cn(
        "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-colors",
        config.color
      )}>
        <Icon className="h-5 w-5" />
      </div>

      <div className="flex-1 space-y-2">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Badge variant="outline" className={cn("text-[10px] font-bold tracking-wider uppercase", config.color)}>
            {config.label}
          </Badge>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Clock className="h-3 w-3" />
            {new Date(interaction.interactionDate).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
        </div>

        {/* Content */}
        <div className="space-y-1">
          <p className="text-sm text-foreground leading-relaxed">
            {interaction.summary}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex items-center gap-1.5 rounded-full bg-muted/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            <User className="h-3 w-3" />
            Logged by {interaction.userName}
          </div>
        </div>
      </div>
    </div>
  );
}

