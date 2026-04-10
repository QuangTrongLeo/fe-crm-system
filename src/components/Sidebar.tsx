import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import {
  Home,
  Users,
  Briefcase,
  CheckSquare,
  BarChart3,
  Settings,
  LogOut,
  User,
} from "lucide-react";
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, setUser } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Users, label: "Contacts", path: "/contacts" },
    { icon: Briefcase, label: "Deals", path: "/deals" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: BarChart3, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];
  useEffect(() => {
    if (!user) {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
    }
  }, [location.pathname]);

  return (
    <ShadcnSidebar className="border-r border-border bg-sidebar text-sidebar-foreground transition-colors duration-500">
      <SidebarHeader className="h-20 flex flex-row items-center px-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center mr-3 bg-linear-to-br from-primary to-indigo-600 shadow-lg shadow-primary/20 ring-1 ring-white/20">
          <span className="font-bold text-white text-xl">N</span>
        </div>
        <div className="flex flex-col group-data-[collapsible=icon]:hidden">
          <span className="font-bold text-xl tracking-tighter text-foreground">
            Nexa{" "}
            <span className="text-primary text-[10px] align-top leading-none ml-0.5 font-black uppercase tracking-widest">
              CRM
            </span>
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground group-data-[collapsible=icon]:hidden">
            Main Menu
          </SidebarGroupLabel>

          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.label}
                    className={cn(
                      "h-11 px-4 rounded-xl transition-all duration-300 group",
                      isActive
                        ? "bg-white dark:bg-primary/10 text-primary font-bold shadow-sm border border-border/50"
                        : "text-muted-foreground hover:bg-muted/80 hover:text-foreground",
                    )}
                  >
                    <Link to={item.path}>
                      <item.icon
                        className={cn(
                          "w-5 h-5 mr-3 transition-colors duration-300",
                          isActive
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-foreground",
                        )}
                      />
                      <span className="text-sm tracking-tight">
                        {item.label}
                      </span>
                      {isActive && (
                        <div className="absolute left-0 w-1 h-5 bg-primary rounded-r-full group-data-[collapsible=icon]:hidden" />
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border bg-sidebar transition-colors duration-500">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-accent data-[state=open]:text-foreground hover:bg-accent transition-all rounded-2xl p-2 h-auto"
                >
                  <div className="relative flex-none">
                    <img
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullName || "Guest")}&background=random&color=fff`}
                      alt="User"
                      className="w-10 h-10 rounded-xl border border-border shadow-lg"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-sidebar shadow-sm"></div>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0 ml-3 text-left group-data-[collapsible=icon]:hidden">
                    <span className="text-sm font-bold text-foreground truncate">
                      {user?.fullName || "Guest"}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider truncate">
                      {user?.role || "Visitor"}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-2xl bg-popover border-border text-popover-foreground shadow-2xl"
                side="top"
                align="end"
                sideOffset={12}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-xs text-muted-foreground">
                        Signed in as
                      </p>
                      <p className="text-sm font-medium text-foreground truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="focus:bg-accent focus:text-foreground rounded-lg cursor-pointer gap-2 py-2">
                  <User className="w-4 h-4" />
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="focus:bg-accent focus:text-foreground rounded-lg cursor-pointer gap-2 py-2">
                  <Settings className="w-4 h-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="focus:bg-destructive/10 focus:text-destructive text-destructive rounded-lg cursor-pointer gap-2 py-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </ShadcnSidebar>
  );
}
