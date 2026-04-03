import { useState } from 'react';
import { Save, User, Bell, Shield, Database } from 'lucide-react';

export function Settings() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-800">Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your account settings and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <User className="w-4 h-4" /> Profile
          </button>
          <button onClick={() => setActiveTab('notifications')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'notifications' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <Bell className="w-4 h-4" /> Notifications
          </button>
          <button onClick={() => setActiveTab('security')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <Shield className="w-4 h-4" /> Security
          </button>
          <button onClick={() => setActiveTab('integrations')} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${activeTab === 'integrations' ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>
            <Database className="w-4 h-4" /> Integrations
          </button>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-6 capitalize">{activeTab} Settings</h2>
          {activeTab === 'profile' && (
            <div className="space-y-4 max-w-xl">
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Name</label>
                <input type="text" defaultValue="Admin User" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                <input type="email" defaultValue="admin@company.com" className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium flex items-center gap-2 hover:bg-primary/90 mt-4 shadow-sm">
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          )}
          {activeTab !== 'profile' && (
            <div className="py-12 text-center text-muted-foreground">
              <p>Configuration options for {activeTab} will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
