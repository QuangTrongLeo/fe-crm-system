import { useState } from "react";
import { X } from "lucide-react";
import type { CustomerResponseFormData } from "@/schema/customer.schema";
import { Button } from "@/components/ui/button";

// Sub-components
import { DeleteAlter } from "./DeleteAlter";
import { UpdateForm } from "./UpdateForm";

interface ProfileSidebarProps {
  customer: CustomerResponseFormData;
  onClose: () => void;
  getInitials: (first: string, last: string) => string;
}

export function ProfileSidebar({
  customer,
  onClose,
  getInitials,
}: ProfileSidebarProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="w-full md:w-80 border-b md:border-b-0 md:border-r bg-muted/5 flex flex-col shrink-0 animate-in fade-in slide-in-from-left-4 duration-300">
      {/* Visual Header Decoration */}
      <div className="h-24 bg-linear-to-br from-blue-500 to-indigo-600 relative shrink-0">
        <Button
          onClick={onClose}
          variant="ghost"
          className="absolute top-4 right-4 p-2 h-auto bg-black/20 hover:bg-black/40 md:hidden backdrop-blur-md rounded-full text-white transition-all z-10"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      <div className="px-6 pb-6 relative grow flex flex-col pt-0">
        {/* Avatar Overlay */}
        <div className="flex justify-between items-end mb-6 relative z-10">
          <div className="w-20 h-20 rounded-2xl border-4 border-card -mt-10 bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center text-2xl font-black text-blue-600 ring-4 ring-blue-500/5">
            {getInitials(customer.firstName, customer.lastName)}
          </div>
        </div>

        {/* Dynamic Information Area (Read / Edit Mode) */}
        <UpdateForm
          customer={customer}
          isEditing={isEditing}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => setIsEditing(false)}
        />

        {/* Global Action Area (Only visible when not editing) */}
        {!isEditing && (
          <div className="mt-8 pt-6 border-t border-border/50">
            <DeleteAlter
              userId={customer.id.toString()}
              isEditing={isEditing}
              onEdit={() => setIsEditing(true)}
              onClose={onClose}
            />
          </div>
        )}
      </div>
    </div>
  );
}
