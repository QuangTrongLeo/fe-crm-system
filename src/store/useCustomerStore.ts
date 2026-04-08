import type { CustomerResponseFormData } from "@/schema/customer.schema";
import { create } from "zustand";

interface CustomerStore {
  customers: CustomerResponseFormData[];
  selectCustomer: CustomerResponseFormData | null;
  setCustomers: (customers: CustomerResponseFormData[]) => void;
  setSelectCustomer: (customer: CustomerResponseFormData | null) => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: [],
  selectCustomer: null,
  setCustomers: (customers) => set({ customers }),
  setSelectCustomer: (customer) => set({ selectCustomer: customer }),
}));

