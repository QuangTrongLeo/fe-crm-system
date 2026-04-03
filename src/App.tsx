import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Dashboard } from './pages/Dashboard'
import { Login } from './pages/Login'
import { Contacts } from './pages/Contacts'

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px] border-2 border-dashed rounded-xl border-border bg-card/50">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-foreground mb-2">{title}</h2>
        <p className="text-sm text-muted-foreground">This section is currently under construction.</p>
      </div>
    </div>
  )
}

function ProtectedLayout() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes (with Sidebar/Header Layout) */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/deals" element={<PlaceholderPage title="Deals Pipeline" />} />
          <Route path="/tasks" element={<PlaceholderPage title="Task Management" />} />
          <Route path="/reports" element={<PlaceholderPage title="Analytics & Reports" />} />
          <Route path="/settings" element={<PlaceholderPage title="System Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
