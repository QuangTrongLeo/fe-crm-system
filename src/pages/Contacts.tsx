import { useEffect, useState } from "react";
import { useCustomerStore } from "../store/useCustomerStore";
import { Plus, Users, Search, Filter, Download } from "lucide-react";

import { ContactsTable } from "../components/contacts/ContactsTable";
import { CustomerProfileModal } from "../components/contacts/CustomerProfileModal";
import { QuickNoteModal } from "../components/contacts/QuickNoteModal";
import { CreateCustomerModal } from "../components/contacts/CreateCustomerModal";
import { get_all_customer } from "@/services/api/customer.service";

export function Contacts() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [quickNoteUserId, setQuickNoteUserId] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const customers = useCustomerStore((state: any) => state.customers);
  const setCustomers = useCustomerStore((state: any) => state.setCustomers);

  const selectedUser = customers.find((c: any) => c.id === selectedUserId);

  const filteredCustomers = customers.filter((c: any) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      c.firstName.toLowerCase().includes(searchLower) ||
      c.lastName.toLowerCase().includes(searchLower) ||
      c.email.toLowerCase().includes(searchLower) ||
      c.company.toLowerCase().includes(searchLower)
    );
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const customersData = await get_all_customer();
        setCustomers(customersData);
      } catch (error) {
        console.error("Failed to fetch customers:", error);
      }
    };
    fetchCustomers();
  }, []);

  return (
    <div className="space-y-10 pb-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500/10 rounded-xl">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
              Relationship Management
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-800  leading-none">
            Customer{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 font-black">
              Database.
            </span>
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-4">
            Connected to{" "}
            <span className="text-blue-600">
              {customers.length.toLocaleString()} Active profiles
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group hidden md:block">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              type="text"
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3.5 bg-white border border-gray-200 text-xs font-bold uppercase tracking-widest rounded-2xl outline-none focus:border-blue-500/50 transition-all w-64 shadow-sm"
            />
          </div>
          <button className="p-3.5 bg-white border border-gray-200 text-slate-400 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-5 h-5" />
          </button>
          <button className="p-3.5 bg-white border border-gray-200 text-slate-400 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3.5 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-500 transition-all active:scale-[0.98] shadow-xl shadow-blue-600/20 flex items-center gap-3"
          >
            <Plus className="w-5 h-5" />
            Add Profile
          </button>
        </div>
      </div>

      {/* Main Table Content */}
      <div className="glass-card rounded-4xl overflow-hidden shadow-2xl transition-all duration-500 hover:shadow-blue-500/5 border-gray-100/50">
        <ContactsTable
          customers={filteredCustomers}
          onSelectUser={setSelectedUserId}
          onQuickNote={setQuickNoteUserId}
        />
      </div>

      {/* Modals */}
      {selectedUser && (
        <CustomerProfileModal
          customer={selectedUser}
          onClose={() => setSelectedUserId(null)}
        />
      )}

      {quickNoteUserId && (
        <QuickNoteModal
          customerId={quickNoteUserId}
          onClose={() => setQuickNoteUserId(null)}
        />
      )}

      {isCreateModalOpen && (
        <CreateCustomerModal onClose={() => setIsCreateModalOpen(false)} />
      )}
    </div>
  );
}
