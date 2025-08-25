import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Eye,
  TrendingUp,
  Target,
  Activity,
  User,
  LogOut,
  Brain,
  Sparkles,
  Calendar,
  HelpCircle,
} from "lucide-react";

const menuItems = [
  { title: "Dashboard", tabValue: "overview", icon: BarChart3 },
  { title: "Skills Observatory", tabValue: "skills-observatory", icon: Eye },
  { title: "Workforce Trends", tabValue: "workforce-trends", icon: TrendingUp },
  { title: "Deep Analytics", tabValue: "deep-analytics", icon: Target },
];

interface LeadershipSidebarProps {
  activeTab: string;
  onTabChange: (tabValue: string) => void;
}

export function LeadershipSidebar({ activeTab, onTabChange }: LeadershipSidebarProps) {
  const { state } = useSidebar();
  
  const isActive = (tabValue: string) => activeTab === tabValue;
  const getNavCls = (tabValue: string) =>
    isActive(tabValue) 
      ? "bg-ai-primary text-white font-medium border-r-2 border-ai-primary shadow-lg" 
      : "hover:bg-ai-primary/10 text-muted-foreground hover:text-ai-primary";

  return (
    <Sidebar className={state === "collapsed" ? "w-16" : "w-64"} collapsible="icon">
      <SidebarContent className="flex flex-col h-full bg-gradient-to-b from-card via-card to-ai-primary/5">
        {/* Profile Section */}
        <div className={`p-4 border-b border-ai-primary/20 ${state === "collapsed" ? 'px-2' : ''}`}>
          <div className={`flex items-center ${state === "collapsed" ? 'justify-center' : 'gap-3'}`}>
            <Avatar className="h-8 w-8 border-2 border-ai-primary/20">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-ai-primary/10 text-ai-primary font-semibold">AD</AvatarFallback>
            </Avatar>
            {state !== "collapsed" && (
              <div className="flex flex-col">
                <span className="text-sm font-bold text-ai-primary">Leadership Control</span>
                <span className="text-xs text-muted-foreground">System Leadership</span>
              </div>
            )}
          </div>
          {state !== "collapsed" && (
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs bg-ai-success/10 text-ai-success border-ai-success/20">
                <Activity className="w-3 h-3 mr-1" />
                Online
              </Badge>
              <Badge variant="outline" className="text-xs border-ai-primary/20 text-ai-primary">
                <Brain className="w-3 h-3 mr-1" />
                AI Ready
              </Badge>
            </div>
          )}
        </div>

        {/* Navigation Groups */}
        <div className="flex-1 overflow-auto">
          <SidebarGroup>
            <SidebarGroupLabel className={`${state === "collapsed" ? "sr-only" : ""} text-ai-primary font-medium`}>
              Main Dashboard
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={() => onTabChange(item.tabValue)}
                        className={`w-full flex items-center gap-3 px-3 py-3 text-left rounded-lg transition-all duration-200 ${getNavCls(item.tabValue)}`}
                      >
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span className="text-sm">{item.title}</span>}
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
          <div className="p-4 border-t border-ai-primary/20 bg-gradient-to-r from-ai-primary/5 to-transparent">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Total Users</span>
                <span className="font-semibold text-ai-primary">1,247</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Active Sessions</span>
                <span className="font-semibold text-ai-primary">892</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">System Health</span>
                <span className="font-semibold text-ai-success">98.5%</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <Sparkles className="w-3 h-3 text-ai-warning" />
                <span className="text-xs text-ai-warning font-medium">AI Insights Active</span>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="p-4 border-t border-ai-primary/20 space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className={`w-full ${state === "collapsed" ? 'px-2' : 'justify-start'} text-muted-foreground hover:text-ai-primary hover:bg-ai-primary/10`}
            onClick={() => window.open('/help/system-flow', '_blank')}
          >
            <HelpCircle className="h-4 w-4" />
            {state !== "collapsed" && <span className="ml-2">System Flow</span>}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`w-full ${state === "collapsed" ? 'px-2' : 'justify-start'} text-muted-foreground hover:text-destructive hover:bg-destructive/10`}
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
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