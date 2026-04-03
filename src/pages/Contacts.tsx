import { useState } from 'react'
import { useCustomerStore } from '../store/useCustomerStore'

import { ContactsTable } from '../components/contacts/ContactsTable'
import { CustomerProfileModal } from '../components/contacts/CustomerProfileModal'
import { QuickNoteModal } from '../components/contacts/QuickNoteModal'

export function Contacts() {
  const customers = useCustomerStore((state) => state.customers)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const [quickNoteUserId, setQuickNoteUserId] = useState<number | null>(null)

  const selectedUser = customers.find((c) => c.id === selectedUserId)

  // In a real app, filtering could be connected to the global Layout search
  const filteredCustomers = customers

  return (
    <div className="space-y-6 relative max-w-7xl mx-auto w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            Customers <span className="text-slate-400 font-medium text-xl ml-1">({customers.length.toLocaleString()})</span>
          </h1>
        </div>
        <button className="px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-2">
          Add New Customer
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden relative z-0">
        <ContactsTable 
          customers={filteredCustomers} 
          onSelectUser={setSelectedUserId}
          onQuickNote={setQuickNoteUserId}
        />
      </div>

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
    </div>
  )
}
