import type { CustomerResponseFormData } from "@/schema/customer.schema";
import { MoreHorizontal, MessageSquarePlus } from "lucide-react";

interface ContactsTableProps {
  customers: CustomerResponseFormData[];
  onSelectUser: (id: number) => void;
  onQuickNote: (id: number) => void;
}

export function ContactsTable({
  customers,
  onSelectUser,
  onQuickNote,
}: ContactsTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b">
          <tr>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Contact</th>
            <th className="px-6 py-4 font-medium whitespace-nowrap">
              Last Interaction
            </th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {customers.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-12 text-center text-muted-foreground"
              >
                No contacts found.
              </td>
            </tr>
          ) : (
            customers.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-muted/30 transition-colors cursor-pointer group bg-background"
                onClick={() => onSelectUser(user.id)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {user.firstName} {user.lastName}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {user.company}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-foreground text-sm">{user.email}</div>
                  <div className="text-muted-foreground text-xs">
                    {user.phone}
                  </div>
                </td>
                <td className="px-6 py-4"></td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                    ${
                      user.status === "ACTIVE"
                        ? "bg-[#e6f6ee] text-[#1e884d]"
                        : user.status === "LEAD"
                          ? "bg-[#fff5e5] text-[#b37014]"
                          : user.status === "INACTIVE"
                            ? "bg-[#fcede8] text-[#c94126]"
                            : "bg-blue-50 text-blue-700"
                    }`}
                  >
                    {user.status === "ACTIVE"
                      ? "Active"
                      : user.status === "LEAD"
                        ? "Lead"
                        : user.status === "INACTIVE"
                          ? "Inactive"
                          : user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-muted-foreground">
                    <button
                      className="p-1.5 hover:bg-secondary rounded-md hover:text-primary transition-colors"
                      title="Add Quick Note"
                      onClick={(e) => {
                        e.stopPropagation();
                        onQuickNote(user.id);
                      }}
                    >
                      <MessageSquarePlus className="w-4 h-4" />
                    </button>
                    <button
                      className="p-1 hover:bg-secondary rounded-md transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
