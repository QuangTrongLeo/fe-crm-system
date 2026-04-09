import { useEffect, useState, useMemo } from "react";
import { useCustomerStore } from "../store/useCustomerStore";
import { Plus, Users, Search, Filter, Download, X } from "lucide-react";

import { ContactsTable } from "../components/contacts/ContactsTable";
import { CustomerProfileModal } from "../components/contacts/CustomerProfileModal";
import { QuickNoteModal } from "../components/contacts/QuickNoteModal";
import { CreateCustomerModal } from "../components/contacts/CreateCustomerModal";
import { get_all_customer } from "@/services/api/customer.service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { CustomerStatus } from "@/lib/enum";

export function Contacts() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [quickNoteUserId, setQuickNoteUserId] = useState<number | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [companyFilter, setCompanyFilter] = useState<string>("ALL");

  const customers = useCustomerStore((state: any) => state.customers);
  const setCustomers = useCustomerStore((state: any) => state.setCustomers);

  const selectedUser = customers.find((c: any) => c.id === selectedUserId);

  // Dynamically extract unique companies from customer data
  const companies = useMemo(() => {
    const list = Array.from(new Set(customers.map((c: any) => c.company)))
      .filter(Boolean)
      .sort() as string[];
    return list;
  }, [customers]);

  const filteredCustomers = customers.filter((c: any) => {
    const searchLower = searchTerm.toLowerCase();

    // Status Filter
    const matchesStatus = statusFilter === "ALL" || c.status === statusFilter;

    // Company Filter
    const matchesCompany =
      companyFilter === "ALL" || c.company === companyFilter;

    // Search Filter
    const matchesSearch =
      c.firstName.toLowerCase().includes(searchLower) ||
      c.lastName.toLowerCase().includes(searchLower) ||
      c.email.toLowerCase().includes(searchLower) ||
      c.company.toLowerCase().includes(searchLower);

    return matchesStatus && matchesCompany && matchesSearch;
  });

  const activeFilterCount =
    (statusFilter !== "ALL" ? 1 : 0) + (companyFilter !== "ALL" ? 1 : 0);

  const resetFilters = () => {
    setStatusFilter("ALL");
    setCompanyFilter("ALL");
    setSearchTerm("");
  };

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
            {activeFilterCount > 0 && (
              <span className="ml-2 text-slate-300">
                • Filtering {filteredCustomers.length} results
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group hidden md:block">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
            <Input
              type="text"
              placeholder="Search profiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-11 pr-4 py-3.5 bg-white border border-gray-200 text-xs font-bold uppercase tracking-widest rounded-2xl outline-none focus:border-blue-500/50 transition-all w-64 shadow-sm"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className={`p-3.5 h-auto rounded-2xl transition-all shadow-sm relative ${activeFilterCount > 0 ? "border-blue-200 bg-blue-50/50 text-blue-600" : "text-slate-400"}`}
              >
                <Filter className="w-5 h-5" />
                {activeFilterCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                    {activeFilterCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl p-2 shadow-2xl border-none ring-1 ring-slate-200">
              <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-2 py-2">
                Filter Results
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="text-xs font-bold py-2.5 rounded-xl">
                  By Status
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="rounded-xl p-1">
                  <DropdownMenuRadioGroup
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <DropdownMenuRadioItem
                      value="ALL"
                      className="text-xs font-bold py-2 rounded-lg"
                    >
                      All Statuses
                    </DropdownMenuRadioItem>
                    {Object.values(CustomerStatus).map((status) => (
                      <DropdownMenuRadioItem
                        key={status}
                        value={status}
                        className="text-xs font-bold py-2 rounded-lg"
                      >
                        {status}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              <DropdownMenuSub>
                <DropdownMenuSubTrigger className="text-xs font-bold py-2.5 rounded-xl">
                  By Company
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent className="rounded-xl p-1 max-h-[300px] overflow-y-auto">
                  <DropdownMenuRadioGroup
                    value={companyFilter}
                    onValueChange={setCompanyFilter}
                  >
                    <DropdownMenuRadioItem
                      value="ALL"
                      className="text-xs font-bold py-2 rounded-lg"
                    >
                      All Companies
                    </DropdownMenuRadioItem>
                    {companies.map((company) => (
                      <DropdownMenuRadioItem
                        key={company}
                        value={company}
                        className="text-xs font-bold py-2 rounded-lg"
                      >
                        {company}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>

              {activeFilterCount > 0 && (
                <>
                  <DropdownMenuSeparator />
                  <Button
                    variant="ghost"
                    onClick={resetFilters}
                    className="w-full justify-start text-xs font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl mt-1 h-9 px-2"
                  >
                    <X className="w-3.5 h-3.5 mr-2" />
                    Reset Filters
                  </Button>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button className="p-3.5 bg-white border border-gray-200 text-slate-400 rounded-2xl hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-6 py-3.5 bg-blue-600 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-500 transition-all active:scale-[0.98] shadow-xl shadow-blue-600/20 flex items-center gap-3"
          >
            <Plus className="w-5 h-5" />
            Add Profile
          </Button>
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
        <CreateCustomerModal
          assignedUserId={customers.assignedUserId}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
}
