import { Sidebar } from "./Sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-background flex text-foreground font-sans selection:bg-primary/20 selection:text-primary w-full transition-colors duration-500">
        <Sidebar />

        <SidebarInset className="flex-1 flex flex-col min-w-0 min-h-screen relative overflow-x-hidden bg-transparent">
          <div className="absolute inset-0 bg-mesh opacity-60 dark:opacity-40 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[140px] rounded-full pointer-events-none -mr-40 -mt-40 animate-pulse duration-[8s] transition-colors"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none -ml-20 -mb-20 animate-pulse duration-[10s] transition-colors"></div>
          <main className="flex-1 px-6 lg:px-10 py-8 lg:py-10 animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out z-10">
            <div className="max-w-[1600px] mx-auto">{children}</div>
          </main>

          <footer className="py-8 px-10 border-t border-border/50 text-center text-xs text-muted-foreground font-medium tracking-wide">
            © 2024 Nexa CRM Engine • Modern Relationship Management
          </footer>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
