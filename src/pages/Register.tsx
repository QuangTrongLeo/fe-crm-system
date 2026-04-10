import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BarChart3,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Zap,
  User,
  Fingerprint,
} from "lucide-react";
import { register as registerApi } from "../services/api/auth.service";
import loginBg from "../assets/login-bg.png"; // Reusing login background
import { Button } from "@/components/ui/button";

export function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await registerApi(formData);
      // Success is usually handled by the component or toast
      // For now, redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      // Errors are handled by AxiosInstance (e.g. via toast)
    } finally {
      setIsLoading(false);
    }
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
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] ring-1 ring-white/20 mb-5 group transition-transform hover:scale-110 duration-500">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-black tracking-tighter text-white mb-2">
            Create{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 via-indigo-400 to-purple-400">
              Account
            </span>
          </h1>
          <p className="text-slate-400/80 text-sm font-medium tracking-tight">
            Join the next generation of customer relationship intelligence.
          </p>
        </div>

        {/* Main Glass Card */}
        <div className="glass-card rounded-2xl p-8 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-3xl border-white/5">
          {/* Subtle shine effect */}
          <div className="absolute -top-full -left-full w-[300%] h-[300%] bg-linear-to-br from-white/3 via-transparent to-transparent pointer-events-none rotate-12" />

          <form onSubmit={handleRegister} className="space-y-5 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                  Full Name
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 transition-colors group-focus-within/input:text-blue-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3.5 bg-white/3 border border-gray-600/50 hover:border-white/20 outline-none focus:border-blue-500/50 focus:bg-white/6 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all font-semibold text-white placeholder:text-slate-600 text-sm"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                  Username
                </label>
                <div className="relative group/input">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 transition-colors group-focus-within/input:text-blue-400">
                    <Fingerprint className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="johndoe"
                    className="w-full pl-11 pr-4 py-3.5 bg-white/3 border border-gray-600/50 hover:border-white/20 outline-none focus:border-blue-500/50 focus:bg-white/6 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all font-semibold text-white placeholder:text-slate-600 text-sm"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                Email Address
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 transition-colors group-focus-within/input:text-blue-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/3 border border-gray-600/50 hover:border-white/20 outline-none focus:border-blue-500/50 focus:bg-white/6 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all font-semibold text-white placeholder:text-slate-600 text-sm"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">
                Password
              </label>
              <div className="relative group/input">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-500 transition-colors group-focus-within/input:text-blue-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3.5 bg-white/3 border border-gray-600/50 hover:border-white/20 outline-none focus:border-blue-500/50 focus:bg-white/6 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all font-semibold text-white placeholder:text-slate-600 text-sm"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full relative group overflow-hidden bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center transition-all disabled:opacity-70 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.4)] active:scale-[0.98] mt-4"
            >
              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <div className="flex items-center gap-3">
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              )}
            </Button>

            <div className="relative py-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[8px] uppercase font-bold text-slate-600 tracking-[0.4em]">
                <span className="bg-[#0f172a] px-4 rounded-full border text-white border-white/5 py-0.5">
                  Registration Policy
                </span>
              </div>
            </div>

            <p className="text-[10px] text-center text-slate-500 leading-relaxed px-4">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors underline decoration-blue-500/20 underline-offset-2">Terms of Service</a> and{" "}
              <a href="#" className="text-blue-500 hover:text-blue-400 transition-colors underline decoration-blue-500/20 underline-offset-2">Privacy Policy</a>.
            </p>
          </form>
        </div>

        {/* Footer Area */}
        <div className="mt-8 flex flex-col items-center gap-4 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:text-blue-400 transition-colors ml-1 underline decoration-blue-500/30 underline-offset-4"
            >
              Sign In
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
              <span>Secure Setup</span>
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
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
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
