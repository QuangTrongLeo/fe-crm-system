import { 
  BarChart3, 
  Users, 
  Settings, 
  Home, 
  Briefcase, 
  CheckSquare, 
  Bell, 
  Search,
  Menu,
  User,
  MoreVertical
} from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'

export function Sidebar({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (val: boolean) => void }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Contacts', path: '/contacts' },
    { icon: Briefcase, label: 'Deals', path: '/deals' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#0B192C] text-slate-300 flex flex-col transition-transform duration-300 shadow-xl
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-20 flex items-center px-6">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3 bg-blue-600">
            <span className="font-bold text-white text-lg">N</span>
          </div>
          <span className="font-bold text-xl tracking-tight text-white">Nexa CRM</span>
        </div>

        <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-3 py-2.5 rounded-lg transition-colors group
                  ${isActive 
                    ? 'bg-blue-600/20 text-white font-medium border-l-2 border-blue-500' 
                    : 'text-slate-400 hover:bg-[#1a2b47] hover:text-white'
                  }
                `}
              >
                <item.icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-blue-500' : 'text-slate-400 group-hover:text-white'}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 mt-auto border-t border-white/5 relative">
          {/* Overlay to close menu on click outside */}
          {isMenuOpen && (
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsMenuOpen(false)}
            />
          )}
          
          <div className="relative z-50">
            {isMenuOpen && (
              <div className="absolute bottom-full left-0 right-0 mb-3 bg-[#11223A] rounded-xl border border-white/10 shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-2">
                <div className="p-2 space-y-1">
                  <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors">
                    <User className="w-4 h-4" />
                    My Profile
                  </button>
                  <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-blue-600/20 rounded-lg transition-colors">
                    <Settings className="w-4 h-4" />
                    Account Settings
                  </button>
                  <div className="h-px bg-white/10 my-2"></div>
                  <button 
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center gap-3 w-full p-2 -mx-2 hover:bg-[#1a2b47] rounded-xl transition-colors text-left group"
            >
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'Guest')}&background=random`} 
                alt="User" 
                className="w-10 h-10 rounded-full border border-white/10"
              />
              <div className="flex flex-col flex-1 min-w-0">
                <span className="text-sm font-medium text-white truncate">{user?.name || 'Guest'}</span>
                <span className="text-xs text-slate-400 truncate">{user?.role || 'Visitor'}</span>
              </div>
              <MoreVertical className="w-5 h-5 text-slate-500 group-hover:text-slate-300 transition-colors" />
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

export function Header({ setIsSidebarOpen }: { setIsSidebarOpen: (val: boolean) => void }) {
  const { user } = useAuthStore()

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
      <div className="flex items-center gap-4 flex-1 max-w-3xl">
        <button 
          className="lg:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-lg"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="relative w-full hidden md:block">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search Customers, Notes, Tasks..." 
            className="w-full h-11 pl-10 pr-4 rounded-lg bg-white border border-gray-200 focus:border-blue-500 outline-none text-sm transition-all focus:ring-2 focus:ring-blue-500/20 shadow-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-5 ml-4">
        <div className="flex items-center text-slate-500 cursor-pointer hover:text-slate-800 transition-colors">
          <div className="relative">
             <Bell className="w-5 h-5" />
             <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white">4</span>
          </div>
        </div>
        
        <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
        
        <div className="flex items-center gap-3 cursor-pointer">
           <img 
              src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=random" 
              alt="User" 
              className="w-8 h-8 rounded-full border border-gray-200"
            />
            <span className="text-sm font-medium text-slate-700 hidden md:block">{user?.name || 'Sarah Johnson'}</span>
        </div>
      </div>
    </header>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex text-slate-800 font-sans">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <Header setIsSidebarOpen={setIsSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
