import { create } from 'zustand'

export type Note = {
  id: string
  content: string
  createdAt: string
  author: string
  isImportant?: boolean
}

export type InteractionType = 'CALL' | 'EMAIL' | 'MEETING' | 'OTHER'

export type Interaction = {
  id: string
  type: InteractionType
  summary: string
  createdAt: string
  author: string
}

export type Customer = {
  id: number
  firstName: string
  lastName: string
  company: string
  email: string
  phone: string
  status: 'ACTIVE' | 'INACTIVE' | 'LEAD' | string
  assignedUserId: number // 1-6
  
  // UI Display Helpers (since real DB might not have these yet)
  location: string
  avatar: string
  lastContact: string
  lifetimeValue: string
  notes: Note[]
  interactions: Interaction[]
}

type CustomerStore = {
  customers: Customer[]
  setCustomers: (customers: Customer[]) => void
  addNote: (customerId: number, noteContent: string, author?: string, isImportant?: boolean) => void
  addInteraction: (customerId: number, type: InteractionType, summary: string, author?: string) => void
  addCustomer: (data: Partial<Customer>) => void
}

const initialCustomersData: Customer[] = [
  {
    id: 1,
    firstName: 'Quốc',
    lastName: 'Trần',
    company: 'VNG Corporation',
    email: 'quoctran@vng.com.vn',
    phone: '0905111222',
    status: 'ACTIVE',
    assignedUserId: 1,
    location: 'Ho Chi Minh City, VN',
    avatar: 'https://ui-avatars.com/api/?name=Quoc+Tran&background=random',
    lastContact: '1 hour ago',
    lifetimeValue: '$12,500',
    notes: [
      { id: '1', content: 'Discussed integration timelines for new product.', createdAt: '2026-04-02', author: 'Nguyễn Quang Minh' },
      { id: '2', content: 'Khách hàng VIP, cần hỗ trợ nhanh.', createdAt: new Date().toISOString().split('T')[0], author: 'Nguyễn Quang Minh', isImportant: true }
    ],
    interactions: [
      { id: '1', type: 'CALL', summary: 'Tư vấn giải pháp chuyển đổi số.', createdAt: new Date().toISOString().split('T')[0], author: 'Nguyễn Quang Minh' }
    ]
  },
  {
    id: 2,
    firstName: 'Bruce',
    lastName: 'Wayne',
    company: 'Wayne Enterprises',
    email: 'bruce@wayne.com',
    phone: '+1 (555) 012-4045',
    status: 'ACTIVE',
    assignedUserId: 2,
    location: 'Gotham City, NJ',
    avatar: 'https://ui-avatars.com/api/?name=Bruce+Wayne&background=random',
    lastContact: '1 day ago',
    lifetimeValue: '$3,500,000',
    notes: [],
    interactions: []
  },
  {
    id: 3,
    firstName: 'Natasha',
    lastName: 'Romanoff',
    company: 'S.H.I.E.L.D.',
    email: 'natasha@shield.gov',
    phone: '+1 (555) 018-9999',
    status: 'INACTIVE',
    assignedUserId: 1,
    location: 'Washington, DC',
    avatar: 'https://ui-avatars.com/api/?name=Natasha+Romanoff&background=random',
    lastContact: '1 month ago',
    lifetimeValue: '$150,000',
    notes: [],
    interactions: []
  },
  {
    id: 4,
    firstName: 'Diana',
    lastName: 'Prince',
    company: 'Themyscira Antiques',
    email: 'diana@themyscira.com',
    phone: '+1 (555) 017-8877',
    status: 'ACTIVE',
    assignedUserId: 3,
    location: 'Paris, FR',
    avatar: 'https://ui-avatars.com/api/?name=Diana+Prince&background=random',
    lastContact: '3 hours ago',
    lifetimeValue: '$450,000',
    notes: [],
    interactions: []
  },
  {
    id: 5,
    firstName: 'Clark',
    lastName: 'Kent',
    company: 'Daily Planet',
    email: 'clark@dailyplanet.com',
    phone: '+1 (555) 011-2233',
    status: 'LEAD',
    assignedUserId: 1,
    location: 'Metropolis, NY',
    avatar: 'https://ui-avatars.com/api/?name=Clark+Kent&background=random',
    lastContact: 'Just now',
    lifetimeValue: '$0',
    notes: [
      { id: '3', content: 'Potential lead. Reach out next week regarding press subscription package.', createdAt: '2026-04-03', author: 'Nguyễn Quang Minh' }
    ],
    interactions: []
  }
]

export const useCustomerStore = create<CustomerStore>((set) => ({
  customers: initialCustomersData,
  setCustomers: (customers) => set({ customers }),
  addNote: (customerId, noteContent, author = 'Nguyễn Quang Minh', isImportant = false) => 
    set((state) => ({
      customers: state.customers.map((c) => {
        if (c.id === customerId) {
          const newNote: Note = {
            id: Math.random().toString(36).substr(2, 9),
            content: noteContent,
            createdAt: new Date().toISOString().split('T')[0],
            author, // Assuming the active user created this
            isImportant
          }
          return { ...c, notes: [newNote, ...c.notes] }
        }
        return c
      })
    })),
  addInteraction: (customerId, type, summary, author = 'Nguyễn Quang Minh') => 
    set((state) => ({
      customers: state.customers.map((c) => {
        if (c.id === customerId) {
          const newInteraction: Interaction = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            summary,
            createdAt: new Date().toISOString().split('T')[0],
            author,
          }
          return { ...c, interactions: [newInteraction, ...c.interactions] }
        }
        return c
      })
    })),
  addCustomer: (data) =>
    set((state) => {
      const newId = Math.max(...state.customers.map(c => c.id), 0) + 1;
      const newCustomer: Customer = {
        id: newId,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        company: data.company || '',
        email: data.email || '',
        phone: data.phone || '',
        status: data.status || 'LEAD',
        assignedUserId: 1,
        location: 'Unknown Location',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent((data.firstName || '') + ' ' + (data.lastName || ''))}&background=random`,
        lastContact: 'Just now',
        lifetimeValue: '$0',
        notes: [],
        interactions: [],
        ...data,
      }
      return { customers: [newCustomer, ...state.customers] }
    })
}))
