import { useState } from 'react';
import { Save, User, Bell, Shield, Database, Palette, Moon, Sun, Check } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';
import type { ThemeColor } from '../store/useThemeStore';

export function Settings() {
  const [activeTab, setActiveTab] = useState('appearance');
  const { primaryColor, setPrimaryColor, isDarkMode, toggleDarkMode } = useThemeStore();

  const themes: { id: ThemeColor; name: string; class: string }[] = [
    { id: 'blue', name: 'Blue Sky', class: 'bg-[#2563eb]' },
    { id: 'indigo', name: 'Indigo Night', class: 'bg-[#4f46e5]' },
    { id: 'purple', name: 'Royal Purple', class: 'bg-[#9333ea]' },
    { id: 'rose', name: 'Rose Petal', class: 'bg-[#e11d48]' },
    { id: 'emerald', name: 'Emerald Forest', class: 'bg-[#10b981]' },
    { id: 'amber', name: 'Amber Sunset', class: 'bg-[#f59e0b]' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-xl">
                <Palette className="w-5 h-5 text-primary" />
            </div>
            <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">System Preferences</span>
        </div>
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-slate-800">Settings</h1>
        <p className="text-slate-500 font-medium mt-2">Personalize your Nexa CRM experience and security protocols.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Settings Sidebar */}
        <div className="w-full lg:w-72 space-y-1.5">
          {[
            { id: 'profile', label: 'Profile', icon: User },
            { id: 'appearance', label: 'Appearance', icon: Palette },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'integrations', label: 'Integrations', icon: Database },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-sm font-bold tracking-tight transition-all active:scale-[0.98] ${
                activeTab === item.id
                  ? 'bg-primary text-white shadow-xl shadow-primary/20'
                  : 'text-slate-600 hover:bg-white hover:shadow-md dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                {item.label}
              </div>
              {activeTab === item.id && <Save className="w-3.5 h-3.5 opacity-50" />}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-8">
          {activeTab === 'appearance' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
              {/* Theme Color Selection */}
              <div className="glass-card rounded-4xl p-8 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-3xl border-gray-100/50">
                <div className="relative z-10">
                   <h3 className="text-lg font-black tracking-tight mb-2">Accent Color</h3>
                   <p className="text-slate-400 text-sm mb-8">Select the primary brand color for your dashboard.</p>
                   
                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      {themes.map((theme) => (
                        <button
                          key={theme.id}
                          onClick={() => setPrimaryColor(theme.id)}
                          className={`group relative flex flex-col items-center gap-3 p-4 rounded-3xl border-2 transition-all active:scale-95 ${
                            primaryColor === theme.id
                              ? 'border-primary bg-primary/5'
                              : 'border-transparent bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-2xl ${theme.class} shadow-lg transition-transform group-hover:scale-110 flex items-center justify-center`}>
                            {primaryColor === theme.id && <Check className="w-6 h-6 text-white" />}
                          </div>
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{theme.name}</span>
                        </button>
                      ))}
                   </div>
                </div>
              </div>

              {/* Interface Style */}
              <div className="glass-card rounded-4xl p-8 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-3xl border-gray-100/50">
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                   <div>
                      <h3 className="text-lg font-black tracking-tight mb-2">Interface Mode</h3>
                      <p className="text-slate-400 text-sm">Switch between light and dark visual aesthetics.</p>
                   </div>
                   
                   <button
                    onClick={toggleDarkMode}
                    className="flex items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl relative w-48 transition-all"
                   >
                     <div className={`absolute inset-y-1.5 w-[calc(50%-6px)] bg-white dark:bg-slate-900 rounded-xl shadow-lg transition-transform duration-300 transform ${isDarkMode ? 'translate-x-[calc(100%+6px)]' : 'translate-x-1.5'}`} />
                     <div className="flex-1 flex items-center justify-center gap-2 z-10 py-2.5 text-xs font-black uppercase tracking-widest text-slate-600 transition-colors">
                        <Sun className={`w-4 h-4 ${!isDarkMode ? 'text-amber-500' : 'text-slate-400'}`} />
                        <span>Light</span>
                     </div>
                     <div className="flex-1 flex items-center justify-center gap-2 z-10 py-2.5 text-xs font-black uppercase tracking-widest text-slate-400 dark:text-white transition-colors">
                        <Moon className={`w-4 h-4 ${isDarkMode ? 'text-blue-500' : 'text-slate-400'}`} />
                        <span>Dark</span>
                     </div>
                   </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="glass-card rounded-4xl p-8 lg:p-10 shadow-2xl animate-in fade-in slide-in-from-right-4 duration-500">
               <h3 className="text-lg font-black tracking-tight mb-8">Personal Information</h3>
               <div className="space-y-6 max-w-xl">
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Display Name</label>
                  <input type="text" defaultValue="Nguyễn Quang Minh" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-700" />
                </div>
                <div className="space-y-2.5">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                  <input type="email" defaultValue="admin@nexacrm.ai" className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all font-bold text-slate-700" />
                </div>
                <button className="px-8 py-4 bg-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-primary/90 mt-4 shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center gap-3">
                  <Save className="w-4 h-4" /> Save Preferences
                </button>
              </div>
            </div>
          )}

          {activeTab !== 'profile' && activeTab !== 'appearance' && (
            <div className="glass-card rounded-4xl p-20 text-center shadow-2xl animate-in fade-in duration-500">
              <div className="w-20 h-20 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Save className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-black tracking-tight mb-2">Module Under Sync</h3>
              <p className="text-slate-400 text-sm max-w-xs mx-auto">Configuration options for {activeTab} will appear in the next system update.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

