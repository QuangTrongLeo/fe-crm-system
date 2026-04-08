import { useState, useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import { Bell, Search, PanelLeft, Sun, Moon } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  const { user } = useAuthStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`
      h-20 flex items-center justify-between px-6 lg:px-10 shrink-0 sticky top-0 z-4 transition-all duration-500
      ${scrolled ? "glass-card mx-4 mt-4 rounded-2xl h-18" : "bg-transparent"}
    `}
    >
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        <SidebarTrigger className="p-2.5 -ml-2 text-foreground/70 hover:bg-background/80 glass-card rounded-xl transition-all h-auto w-auto">
          <PanelLeft className="w-5 h-5" />
        </SidebarTrigger>

        <div className="relative w-full hidden md:block group max-w-md">
          <Search className="w-4.5 h-4.5 absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search everything..."
            className="w-full h-12 pl-12 pr-4 rounded-2xl bg-background/40 border border-border/50 focus:border-primary outline-none text-sm transition-all focus:ring-4 focus:ring-primary/10 shadow-sm backdrop-blur-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 rounded-md bg-muted border border-border text-[10px] text-muted-foreground font-sans">
              ⌘
            </kbd>
            <kbd className="px-1.5 py-0.5 rounded-md bg-muted border border-border text-[10px] text-muted-foreground font-sans">
              K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 lg:gap-6 ml-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-3 text-muted-foreground hover:text-foreground hover:bg-background/80 glass-card rounded-xl transition-all group relative overflow-hidden"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <div className="relative w-5 h-5">
            <Sun
              className={`w-5 h-5 absolute transition-all duration-500 ${isDarkMode ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
            />
            <Moon
              className={`w-5 h-5 absolute transition-all duration-500 ${isDarkMode ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`}
            />
          </div>
        </button>

        <button className="p-3 text-muted-foreground hover:text-foreground hover:bg-background/80 glass-card rounded-xl transition-all relative group">
          <Bell className="w-5 h-5 transition-transform group-hover:rotate-12" />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background shadow-sm"></span>
        </button>

        <div className="w-px h-6 bg-border/60 hidden md:block"></div>

        <div className="flex items-center gap-3.5 group cursor-pointer p-1.5 pr-3 rounded-2xl hover:bg-background/80 transition-all active:scale-[0.98]">
          <div className="relative">
            <img
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "User")}&background=random`}
              alt="User"
              className="w-10 h-10 rounded-xl border border-background shadow-sm transition-transform group-hover:scale-105"
            />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-background shadow-sm hidden lg:block"></div>
          </div>
          <div className="hidden lg:flex flex-col text-left">
            <span className="text-sm font-bold text-foreground leading-tight group-hover:text-primary transition-colors uppercase tracking-tight">
              {user?.fullName || "User"}
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              {user?.role || "Member"}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
