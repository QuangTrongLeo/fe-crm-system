import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart3, Mail, Lock, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Role } from '../constant/role'
import { login as loginApi } from '../services/auth.service'

export function Login() {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState('minh.admin@company.com')
  const [password, setPassword] = useState('123456')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await loginApi({ username: email, password })
      localStorage.setItem('access_token', response.accessToken)
      if (response.refreshToken) {
        localStorage.setItem('refresh_token', response.refreshToken)
      }
      
      let role: Role = Role.ADMIN
      let username = 'admin'
      let name = 'Admin User'
      
      try {
        const payload = JSON.parse(atob(response.accessToken.split('.')[1]))
        if (payload.role) role = payload.role
        if (payload.sub) username = payload.sub
        if (payload.name) name = payload.name
      } catch (e) {
        // Fallback if not a standard JWT or missing fields
        if (email === 'minh.admin@company.com') {
          username = 'admin_minh'
          name = 'Nguyễn Quang Minh'
          role = Role.ADMIN
        } else {
          username = 'guest'
          name = 'Guest User'
          role = Role.SALES
        }
      }

      login({
        username,
        name,
        email,
        role
      })
      navigate('/')
    } catch (error) {
      console.error('Login failed:', error)
      alert('Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background font-sans">
      {/* Left side - Dynamic brand presentation */}
      <div className="hidden md:flex flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">
        {/* Abstract background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-white/10 blur-[100px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] rounded-full bg-black/10 blur-[80px]" />
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center shadow-sm">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-2xl tracking-tight text-white drop-shadow-sm">NexusCRM</span>
        </div>

        <div className="relative z-10 my-auto">
          <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 leading-tight max-w-lg text-white">
            Manage your deals efficiently.
          </h1>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-md">
            The world's easiest-to-use CRM software designed to supercharge your sales pipeline and close deals faster.
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span className="font-medium text-white/90">Advanced Analytics Dashboard</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span className="font-medium text-white/90">Automated Follow-ups</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-300" />
              <span className="font-medium text-white/90">Real-time collaboration</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-sm text-primary-foreground/60 border-t border-white/10 pt-6 mt-12">
          <span>© 2026 NexusCRM</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 lg:p-24 relative">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex md:hidden items-center gap-3 mb-10">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
              <BarChart3 className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-foreground">NexusCRM</span>
          </div>

          <div className="mb-10 min-w-0">
            <h2 className="text-3xl font-bold text-foreground mb-2 tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground">Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-foreground tracking-wide block">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com" 
                  className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-transparent outline-none focus:border-primary/20 focus:bg-background focus:ring-2 focus:ring-primary/20 rounded-xl transition-all font-medium text-foreground"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 relative">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground tracking-wide block">Password</label>
                <a href="#" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground">
                  <Lock className="w-5 h-5" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-3 bg-secondary/50 border border-transparent outline-none focus:border-primary/20 focus:bg-background focus:ring-2 focus:ring-primary/20 rounded-xl transition-all font-medium text-foreground"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-all disabled:opacity-70 shadow-lg shadow-primary/25 mt-8"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign in <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>

            <button 
              type="button"
              className="w-full bg-transparent hover:bg-secondary border border-border text-foreground py-3 px-4 rounded-xl font-semibold flex items-center justify-center transition-all mt-4"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5 mr-3" />
              Sign in with Google
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Don't have an account?{' '}
            <a href="#" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
