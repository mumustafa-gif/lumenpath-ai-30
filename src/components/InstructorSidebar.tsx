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
} from "lucide-react";

const mainNavItems = [
  { title: "Dashboard", url: "/instructor", icon: Home },
  { title: "My Courses", url: "/instructor/courses", icon: BookOpen },
  { title: "Create Course", url: "/instructor/create", icon: Plus },
  { title: "Students", url: "/instructor/students", icon: Users },
];

const toolsItems = [
  { title: "AI Course Creator", url: "/instructor/ai-creator", icon: Brain },
  { title: "Content Library", url: "/instructor/library", icon: Video },
  { title: "Assessment Builder", url: "/instructor/assessments", icon: Target },
  { title: "Analytics", url: "/instructor/analytics", icon: BarChart3 },
  { title: "AI Assistant", url: "/instructor/assistant", icon: MessageSquare },
];

const accountItems = [
  { title: "Profile", url: "/instructor/profile", icon: User },
  { title: "Reports", url: "/instructor/reports", icon: FileText },
  { title: "Settings", url: "/instructor/settings", icon: Settings },
];

export function InstructorSidebar() {
  const { collapsed } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50";

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible>
      <SidebarContent className="flex flex-col h-full">
        {/* Profile Section */}
        <div className={`p-4 border-b ${collapsed ? 'px-2' : ''}`}>
          <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-secondary/10 text-secondary">DR</AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Dr. Sarah Ahmed</span>
                <span className="text-xs text-muted-foreground">AI Instructor</span>
              </div>
            )}
          </div>
          {!collapsed && (
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
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Main
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mainNavItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Teaching Tools
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {toolsItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Account
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {accountItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url} className={getNavCls}>
                        <item.icon className="h-4 w-4" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>

        {/* Quick Stats */}
        {!collapsed && (
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
        <div className="p-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            className={`w-full ${collapsed ? 'px-2' : 'justify-start'} text-muted-foreground hover:text-foreground`}
            onClick={() => console.log('Logout')}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}