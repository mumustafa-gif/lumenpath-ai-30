import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Home,
  Users,
  GraduationCap,
  BarChart3,
  TrendingUp,
  Shield,
  Settings,
  Brain,
  Target,
  AlertTriangle,
  MessageSquare,
  FileText,
  Database,
  Activity,
  Globe,
  User,
  LogOut,
} from "lucide-react";

const menuItems = [
  { title: "Overview", tabValue: "overview", icon: BarChart3 },
  { title: "Analytics", tabValue: "analytics", icon: TrendingUp },
  { title: "Reports", tabValue: "reports", icon: FileText },
];

const insightsItems = [
  { title: "Talent Demographics", url: "/admin/demographics", icon: Users },
  { title: "Skill Gap Analysis", url: "/admin/skill-gaps", icon: Target },
  { title: "Market Trends", url: "/admin/trends", icon: TrendingUp },
  { title: "Regional Analysis", url: "/admin/regional", icon: Globe },
  { title: "Performance Metrics", url: "/admin/performance", icon: Activity },
];

const systemItems = [
  { title: "AI Assistant", url: "/admin/assistant", icon: Brain },
  { title: "Reports", url: "/admin/reports", icon: FileText },
  { title: "Security", url: "/admin/security", icon: Shield },
  { title: "System Health", url: "/admin/health", icon: Activity },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

const accountItems = [
  { title: "Profile", url: "/admin/profile", icon: User },
  { title: "Audit Logs", url: "/admin/logs", icon: FileText },
];

interface AdminSidebarProps {
  activeTab: string;
  onTabChange: (tabValue: string) => void;
}

export function AdminSidebar({ activeTab, onTabChange }: AdminSidebarProps) {
  const { state } = useSidebar();
  
  const isActive = (tabValue: string) => activeTab === tabValue;
  const getNavCls = (tabValue: string) =>
    isActive(tabValue) ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50";

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="flex flex-col h-full">
        {/* Profile Section */}
        <div className={`p-4 border-b ${state === "collapsed" ? 'px-2' : ''}`}>
          <div className={`flex items-center ${state === "collapsed" ? 'justify-center' : 'gap-3'}`}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-accent/10 text-accent">AD</AvatarFallback>
            </Avatar>
            {state !== "collapsed" && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Admin Panel</span>
                <span className="text-xs text-muted-foreground">System Administrator</span>
              </div>
            )}
          </div>
          {state !== "collapsed" && (
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                <Activity className="w-3 h-3 mr-1" />
                Online
              </Badge>
              <Badge variant="outline" className="text-xs">
                1,247 Users
              </Badge>
            </div>
          )}
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-auto">
          <SidebarGroup>
            <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
              Main
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={() => onTabChange(item.tabValue)}
                        className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md transition-colors ${getNavCls(item.tabValue)}`}
                      >
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

        </div>

        {/* System Status */}
        {state !== "collapsed" && (
          <div className="p-4 border-t bg-muted/20">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Total Learners</span>
                <span className="font-semibold">1,247</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Active Courses</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">System Health</span>
                <span className="font-semibold text-green-600">98.5%</span>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            className={`w-full ${state === "collapsed" ? 'px-2' : 'justify-start'} text-muted-foreground hover:text-foreground`}
            onClick={() => {
              // Clear any stored user data
              localStorage.clear();
              sessionStorage.clear();
              // Redirect to login page
              window.location.href = '/';
            }}
          >
            <LogOut className="h-4 w-4" />
            {state !== "collapsed" && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}