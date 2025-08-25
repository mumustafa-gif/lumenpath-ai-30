
import { useState } from "react";
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
  BookOpen,
  Brain,
  Users,
  Target,
  MessageSquare,
  BarChart3,
  Briefcase,
  GitCompare,
  Settings,
  Home,
  Trophy,
  User,
  LogOut,
  FileText,
  HelpCircle,
} from "lucide-react";

const mainNavItems = [
  { title: "Dashboard", tabValue: "dashboard", icon: Home },
  { title: "Adaptive Learning", tabValue: "adaptive-engine", icon: Brain },
  { title: "Study Buddies", tabValue: "study-buddies", icon: Users },
];

const analysisItems = [
  { title: "Skill Analysis", tabValue: "skill-analysis", icon: Target },
  { title: "Market Skill Comparison", tabValue: "market-skill-comparison", icon: GitCompare },
  { title: "Mock Interviews", tabValue: "mock-interviews", icon: MessageSquare },
  { title: "Job Matching", tabValue: "job-recommendations", icon: Briefcase },
  { title: "Mock Assessments", tabValue: "mock-assessments", icon: BarChart3 },
];

const counselorItems = [
  { title: "AI Career Counselor", tabValue: "ai-career-counselor", icon: Briefcase },
  { title: "AI Educational Counselor", tabValue: "ai-educational-counselor", icon: BookOpen },
];

const profileItems = [
  { title: "Profile", tabValue: "profile", icon: User },
  { title: "Resume Builder", tabValue: "resume-builder", icon: FileText },
];

interface StudentSidebarProps {
  activeTab: string;
  onTabChange: (tabValue: string) => void;
  onShowOnboarding: () => void;
}

export function StudentSidebar({ activeTab, onTabChange, onShowOnboarding }: StudentSidebarProps) {
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
              <AvatarFallback className="bg-primary/10 text-primary">AH</AvatarFallback>
            </Avatar>
            {state !== "collapsed" && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Ahmad Hassan</span>
                <span className="text-xs text-muted-foreground">AI Student</span>
              </div>
            )}
          </div>
          {state !== "collapsed" && (
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                Level 3
              </Badge>
              <Badge variant="outline" className="text-xs bg-primary/5 text-primary border-primary/20">
                78% Complete
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

          <SidebarGroup>
            <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
              Analysis & Growth
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {analysisItems.map((item) => (
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

          <SidebarGroup>
            <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
              AI Counselors
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {counselorItems.map((item) => (
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

          <SidebarGroup>
            <SidebarGroupLabel className={state === "collapsed" ? "sr-only" : ""}>
              Account
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {profileItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <button
                        onClick={() => {
                  onTabChange(item.tabValue);
                        }}
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
