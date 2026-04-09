import type { LucideIcon } from "lucide-react";

export function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 border shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-all duration-300">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400">
          {label}
        </p>
        <p className="text-xs font-bold text-foreground truncate">{value}</p>
      </div>
    </div>
  );
}
