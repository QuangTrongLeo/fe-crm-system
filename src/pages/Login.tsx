import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BarChart3,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { checkEmail, login as loginApi } from "../services/api/auth.service";
import loginBg from "../assets/login-bg.png";
import { Button } from "@/components/ui/button";
import { setCookie } from "@/lib/cookies";

export function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const checkEmailExist = async () => {
    const isExists = await checkEmail(email);
    if (isExists) {
      setEmail(email);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await loginApi({ email, password });

    login(response.user);
    setCookie("access_token", response.accessToken, 7);
    setCookie("refresh_token", response.refreshToken, 7);
    localStorage.setItem("user", JSON.stringify(response.user));

    setTimeout(() => {
      navigate("/");
    }, 1000);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-[#020617] font-sans selection:bg-blue-500/30 selection:text-white">
      {/* Cinematic Background */}
      <div className="fixed inset-0 z-0">
        <img
          src={loginBg}
          alt="background"
          className="w-full h-full object-cover opacity-60 scale-105 animate-pulse-slow"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#020617]/40 via-transparent to-[#020617] backdrop-blur-[2px]" />
      </div>

      {/* Floating Elements for Depth */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[15%] left-[10%] w-64 h-64 bg-blue-600/20 blur-[120px] animate-float" />
        <div className="absolute bottom-[20%] right-[15%] w-80 h-80 bg-indigo-600/15 blur-[100px] animate-float-delayed" />
      </div>

      <div className="w-full max-w-lg relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        {/* Header/Logo Section */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-indigo-600 rounded-4xl flex items-center justify-center shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] ring-1 ring-white/20 mb-6 group transition-transform hover:scale-110 duration-500">
            <BarChart3 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-white mb-2">
            Welcome to{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">
              Nexa CRM
            </span>
          </h1>
          <p className="text-slate-400/80 font-medium tracking-tight">
            The next generation of customer relationship intelligence.
          </p>
        </div>

        {/* Main Glass Card */}
        <div className="glass-card rounded-2xl p-10 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-3xl border-white/5">
          {/* Subtle shine effect */}
          <div className="absolute -top-full -left-full w-[300%] h-[300%] bg-linear-to-br from-white/3 via-transparent to-transparent pointer-events-none rotate-12" />

          <form onSubmit={handleLogin} className="space-y-7 relative z-10">
            <div className="space-y-2.5">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                Email Address
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 transition-colors group-focus-within/input:text-blue-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={checkEmailExist}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-4.5 bg-white/3 border border-gray-600 hover:border-white/20 outline-none focus:border-blue-500/50 focus:bg-white/6 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all font-semibold text-white placeholder:text-slate-600"
                  required
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                  Password
                </label>
                <a
                  href="#"
                  className="text-[10px] font-black text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 transition-colors group-focus-within/input:text-blue-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4.5 bg-white/3 border border-gray-600 hover:border-white/20 outline-none focus:border-blue-500/50 focus:bg-white/6 focus:ring-4 focus:ring-blue-500/10 rounded-2xl transition-all font-semibold text-white placeholder:text-slate-600"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-500 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] flex items-center justify-center transition-all disabled:opacity-70 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.4)] active:scale-[0.98] mt-4"
            >
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <div className="flex items-center gap-3">
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              )}
            </Button>

            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[9px] uppercase font-bold text-slate-600 tracking-[0.4em]">
                <span className="bg-[#0f172a] px-5 rounded-full border text-white border-white/5 py-0.5">
                  Alternative Access
                </span>
              </div>
            </div>

            <Button
              type="button"
              className="w-full bg-gray-400  hover:bg-white/8 border border-white/10 text-white py-4.5 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center transition-all active:scale-[0.98] group"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-4 h-4 mr-3 group-hover:scale-110 transition-transform"
              />
              Continue with Workspace
            </Button>
          </form>
        </div>

        {/* Footer Area */}
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-500 hover:text-blue-400 transition-colors ml-1 underline decoration-blue-500/30 underline-offset-4"
            >
              Create Account
            </Link>
          </p>

          <div className="flex items-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/50" />
              <span>SSL Encrypted</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
            <div className="flex items-center gap-2 text-[9px] font-bold text-slate-600 uppercase tracking-widest">
              <Zap className="w-3.5 h-3.5 text-amber-500/50" />
              <span>Instant Sync</span>
            </div>
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1.05); }
          50% { transform: scale(1.08); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
          animation-delay: 2s;
        }
      `,
        }}
      />
    </div>
  );
}
