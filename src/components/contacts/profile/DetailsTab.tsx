import { AlertCircle } from "lucide-react";
import type { CustomerResponseFormData } from "@/schema/customer.schema";

interface DetailsTabProps {
  customer: CustomerResponseFormData;
}

export function DetailsTab({ customer }: DetailsTabProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="p-4 bg-muted/20 rounded-2xl border border-border/50">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Assigned Agent
          </p>
          <p className="text-sm font-bold text-foreground">
            User ID: {customer.assignedUserId}
          </p>
        </div>
        <div className="p-4 bg-muted/20 rounded-2xl border border-border/50">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
            Customer Tier
          </p>
          <p className="text-sm font-bold text-foreground">Premium Client</p>
        </div>
      </div>

      <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-bold text-blue-900 dark:text-blue-300">
            Intelligent Insight
          </p>
          <p className="text-xs text-blue-800/70 dark:text-blue-300/60 mt-1 leading-relaxed">
            This customer has high engagement in the last 30 days. Consider
            offering a loyalty upgrade during the next interaction.
          </p>
        </div>
      </div>
    </div>
  );
}
