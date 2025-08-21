import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
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
} from "lucide-react";

const mainNavItems = [
  { title: "Dashboard", url: "/learner", icon: Home },
  { title: "My Courses", url: "/learner/courses", icon: BookOpen },
  { title: "Adaptive Learning", url: "/learner/adaptive", icon: Brain },
  { title: "Study Buddies", url: "/learner/buddies", icon: Users },
];

const analysisItems = [
  { title: "Skill Analysis", url: "/learner/skill-gap", icon: Target },
  { title: "Mock Interviews", url: "/learner/interviews", icon: MessageSquare },
  { title: "Job Matching", url: "/learner/jobs", icon: Briefcase },
  { title: "Skills Comparison", url: "/learner/comparison", icon: GitCompare },
  { title: "Progress Analytics", url: "/learner/analytics", icon: BarChart3 },
];

const profileItems = [
  { title: "Profile", url: "/learner/profile", icon: User },
  { title: "Achievements", url: "/learner/achievements", icon: Trophy },
  { title: "Settings", url: "/learner/settings", icon: Settings },
];

export function LearnerSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50";

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
                <span className="text-xs text-muted-foreground">AI Learner</span>
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
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </NavLink>
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
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </NavLink>
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
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Logout Button */}
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            className={`w-full ${state === "collapsed" ? 'px-2' : 'justify-start'} text-muted-foreground hover:text-foreground`}
            onClick={() => console.log('Logout')}
          >
            <LogOut className="h-4 w-4" />
            {state !== "collapsed" && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}