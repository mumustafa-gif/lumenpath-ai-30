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
  BookOpen,
  Plus,
  Users,
  BarChart3,
  Brain,
  Video,
  MessageSquare,
  Settings,
  User,
  Trophy,
  FileText,
  Target,
  LogOut,
  GraduationCap,
  HelpCircle,
} from "lucide-react";

const mainNavItems = [
  { title: "My Courses", tabValue: "courses", icon: BookOpen },
  { title: "AI Course Creator", tabValue: "create", icon: Plus },
  { title: "AI Curriculum Creator", tabValue: "curriculum", icon: GraduationCap },
  { title: "AI Assessment Creator", tabValue: "assessments", icon: FileText },
  { title: "Student Analytics", tabValue: "analytics", icon: BarChart3 },
];

interface FacultySidebarProps {
  activeTab: string;
  onTabChange: (tabValue: string) => void;
}

export function FacultySidebar({ activeTab, onTabChange }: FacultySidebarProps) {
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
              <AvatarFallback className="bg-secondary/10 text-secondary">DR</AvatarFallback>
            </Avatar>
            {state !== "collapsed" && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Dr. Sarah Ahmed</span>
                <span className="text-xs text-muted-foreground">AI Faculty</span>
              </div>
            )}
          </div>
          {state !== "collapsed" && (
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs bg-secondary/10 text-secondary border-secondary/20">
                Expert
              </Badge>
              <Badge variant="outline" className="text-xs">
                579 Students
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
                {mainNavItems.map((item) => (
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

        {/* Quick Stats */}
        {state !== "collapsed" && (
          <div className="p-4 border-t bg-muted/20">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Active Courses</span>
                <span className="font-semibold">3</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Avg Completion</span>
                <span className="font-semibold text-green-600">76%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Engagement</span>
                <span className="font-semibold text-blue-600">91.7%</span>
              </div>
            </div>
          </div>
        )}

        {/* Logout Button */}
        <div className="p-4 border-t space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className={`w-full ${state === "collapsed" ? 'px-2' : 'justify-start'} text-muted-foreground hover:text-foreground`}
            onClick={() => window.open('/help/system-flow', '_blank')}
          >
            <HelpCircle className="h-4 w-4" />
            {state !== "collapsed" && <span className="ml-2">System Flow</span>}
          </Button>
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