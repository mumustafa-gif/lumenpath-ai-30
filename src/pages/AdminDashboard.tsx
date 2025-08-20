import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Brain, 
  Users, 
  GraduationCap, 
  TrendingUp, 
  AlertTriangle, 
  MessageSquare, 
  Send,
  BarChart3,
  UserCheck,
  Clock,
  Target,
  Download,
  Image as ImageIcon,
  FileText,
  PieChart,
  LineChart,
  AreaChart,
  Maximize2,
  Minimize2,
  Shield,
  Activity,
  Calendar,
  Zap,
  X
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Cell, AreaChart as RechartsAreaChart, Area, Pie } from 'recharts';
import { AdminHeader } from "@/components/AdminHeader";
import { ChatInterface } from "@/components/ChatInterface";

const AdminDashboard = () => {
  const [showChartModal, setShowChartModal] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState("bar");
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("");
  const [isAssistantExpanded, setIsAssistantExpanded] = useState(false);
  const [isAssistantMinimized, setIsAssistantMinimized] = useState(false);
  
  const stats = {
    totalLearners: 1247,
    activeCourses: 24,
    completionRate: 78,
    avgEngagement: 85
  };


  const courseAnalytics = [
    { name: "AI Fundamentals", enrolled: 234, completed: 182, avgScore: 87, marketDemand: 95 },
    { name: "Data Science", enrolled: 189, completed: 156, avgScore: 91, marketDemand: 89 },
    { name: "Cloud Computing", enrolled: 156, completed: 98, avgScore: 79, marketDemand: 92 },
    { name: "DevOps", enrolled: 134, completed: 112, avgScore: 84, marketDemand: 87 },
  ];

  const skillGapsData = [
    { skill: "Cloud Computing", gap: 75, jobRoles: ["DevOps Engineer", "Cloud Architect", "SRE"] },
    { skill: "Data Science", gap: 40, jobRoles: ["Data Scientist", "ML Engineer", "Analyst"] },
    { skill: "AI/ML", gap: 15, jobRoles: ["ML Engineer", "AI Researcher", "Data Scientist"] },
    { skill: "Cybersecurity", gap: 65, jobRoles: ["Security Analyst", "Pentester", "CISO"] },
  ];

  const demandingCourses = [
    { name: "AI Fundamentals", demand: 95, trending: "High" },
    { name: "Cloud Computing", demand: 92, trending: "High" },
    { name: "Data Science", demand: 89, trending: "Medium" },
    { name: "Cybersecurity", demand: 87, trending: "Medium" },
  ];

  const learningTrends = [
    { period: "Jan", mobile: 65, video: 78, quiz: 45 },
    { period: "Feb", mobile: 70, video: 82, quiz: 52 },
    { period: "Mar", mobile: 75, video: 85, quiz: 58 },
    { period: "Apr", mobile: 80, video: 88, quiz: 62 },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  const handleVisualization = (type: string, data: any[], title: string) => {
    setSelectedChartType(type);
    setChartData(data);
    setChartTitle(title);
    setShowChartModal(true);
  };

  const exportChart = (format: string) => {
    // Mock export functionality
    console.log(`Exporting chart as ${format}`);
  };

  const renderChart = () => {
    switch (selectedChartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
              <Tooltip />
              <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsAreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" />
            </RechartsAreaChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5">
      <AdminHeader />
      
      {/* Main Dashboard Content */}
      <main className={`transition-all duration-300 ${isAssistantMinimized ? 'pr-4' : isAssistantExpanded ? 'pr-[650px]' : 'pr-[450px]'} p-4 lg:p-8 pt-20`}>
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground text-base lg:text-lg">
                Comprehensive analytics and insights for your learning platform
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 lg:mt-0">
              <Badge variant="secondary" className="bg-ai-success/10 text-ai-success border-ai-success/20">
                <Activity className="w-3 h-3 mr-1" />
                System Online
              </Badge>
              <Badge variant="outline" className="border-ai-primary/20 text-ai-primary">
                <Calendar className="w-3 h-3 mr-1" />
                Last Updated: Now
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="relative overflow-hidden border-0 shadow-ai bg-gradient-to-br from-card to-card/80 hover:shadow-elevated transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-ai-primary/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Learners</CardTitle>
              <div className="p-2 bg-ai-primary/10 rounded-lg">
                <Users className="h-5 w-5 text-ai-primary" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-foreground">{stats.totalLearners.toLocaleString()}</div>
              <p className="text-xs text-ai-success flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden border-0 shadow-ai bg-gradient-to-br from-card to-card/80 hover:shadow-elevated transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-ai-secondary/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Courses</CardTitle>
              <div className="p-2 bg-ai-secondary/10 rounded-lg">
                <GraduationCap className="h-5 w-5 text-ai-secondary" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-foreground">{stats.activeCourses}</div>
              <p className="text-xs text-ai-success flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +3 new this month
              </p>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden border-0 shadow-ai bg-gradient-to-br from-card to-card/80 hover:shadow-elevated transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-ai-accent/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
              <div className="p-2 bg-ai-accent/10 rounded-lg">
                <Target className="h-5 w-5 text-ai-accent" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-foreground">{stats.completionRate}%</div>
              <p className="text-xs text-ai-success flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +5% improvement
              </p>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden border-0 shadow-ai bg-gradient-to-br from-card to-card/80 hover:shadow-elevated transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-ai-warning/5 to-transparent" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Engagement</CardTitle>
              <div className="p-2 bg-ai-warning/10 rounded-lg">
                <TrendingUp className="h-5 w-5 text-ai-warning" />
              </div>
            </CardHeader>
            <CardContent className="relative">
              <div className="text-3xl font-bold text-foreground">{stats.avgEngagement}%</div>
              <p className="text-xs text-ai-success flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2% this week
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Comprehensive Dashboard */}
        <div className="space-y-10">
          {/* Course Performance & Analytics */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold">Overall Course Performance</CardTitle>
                <CardDescription>Enrollment vs completion rates with market demand analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {courseAnalytics.map((course) => (
                  <div key={course.name} className="space-y-3 p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-lg">{course.name}</span>
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="bg-ai-primary/10 text-ai-primary border-ai-primary/20">
                          {course.avgScore}% avg
                        </Badge>
                        <Badge variant="outline" className="border-ai-secondary/20 text-ai-secondary">
                          Demand: {course.marketDemand}%
                        </Badge>
                      </div>
                    </div>
                    <Progress value={(course.completed / course.enrolled) * 100} className="h-3" />
                    <div className="text-sm text-muted-foreground flex justify-between">
                      <span className="font-medium">{course.completed}/{course.enrolled} completed</span>
                      <span>Gap: {Math.abs(course.marketDemand - (course.enrolled / 300 * 100)).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold">Most Demanding Courses</CardTitle>
                <CardDescription>High-demand courses driving market growth</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {demandingCourses.map((course) => (
                  <div key={course.name} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-muted/20 to-muted/5 hover:from-muted/30 hover:to-muted/10 transition-all">
                    <div className="flex-1">
                      <div className="font-medium text-lg">{course.name}</div>
                      <div className="text-sm text-muted-foreground">Market Demand: {course.demand}%</div>
                      <Progress value={course.demand} className="h-2 mt-2" />
                    </div>
                    <div className="ml-4 flex flex-col items-end gap-2">
                      <Badge variant={course.trending === "High" ? "default" : "secondary"} 
                             className={course.trending === "High" ? "bg-ai-primary text-primary-foreground" : "bg-ai-secondary/10 text-ai-secondary border-ai-secondary/20"}>
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {course.trending} Trend
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Skill Gaps Analysis */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold">Skill Gaps Analysis</CardTitle>
                <CardDescription>Critical skill shortages across the organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {skillGapsData.map((skill) => (
                  <div key={skill.skill} className="space-y-3 p-4 rounded-lg bg-muted/30">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-lg">{skill.skill}</span>
                      <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        skill.gap > 60 ? 'bg-destructive/10 text-destructive' : 
                        skill.gap > 30 ? 'bg-ai-warning/10 text-ai-warning' : 
                        'bg-ai-success/10 text-ai-success'
                      }`}>
                        {skill.gap}% gap
                      </span>
                    </div>
                    <Progress value={100 - skill.gap} className="h-3" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold">Skill Gaps vs Job Roles</CardTitle>
                <CardDescription>Impact analysis on specific positions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillGapsData.map((skill) => (
                  <div key={skill.skill} className="p-4 border rounded-lg bg-gradient-to-r from-muted/20 to-muted/5">
                    <div className="font-medium text-lg mb-3">{skill.skill}</div>
                    <div className="text-sm text-muted-foreground mb-3">
                      <strong>Affected roles:</strong> {skill.jobRoles.join(", ")}
                    </div>
                    <Badge variant={skill.gap > 60 ? "destructive" : skill.gap > 30 ? "secondary" : "default"}>
                      {skill.gap > 60 ? "Critical Priority" : skill.gap > 30 ? "Moderate Risk" : "Well Covered"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Learning Trends & Course Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold">Learning Trends</CardTitle>
                <CardDescription>Monthly engagement growth patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-ai-success/5">
                    <span className="font-medium">Mobile Learning</span>
                    <span className="font-bold text-ai-success text-lg">+23%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-ai-success/5">
                    <span className="font-medium">Video Engagement</span>
                    <span className="font-bold text-ai-success text-lg">+18%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-ai-success/5">
                    <span className="font-medium">Quiz Completion</span>
                    <span className="font-bold text-ai-success text-lg">+12%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-ai-success/5">
                    <span className="font-medium">Interactive Labs</span>
                    <span className="font-bold text-ai-success text-lg">+8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold">Course Status Overview</CardTitle>
                <CardDescription>Current course lifecycle states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
                    <span className="font-medium">Active Courses</span>
                    <Badge variant="default" className="bg-ai-primary text-primary-foreground">24</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
                    <span className="font-medium">In Development</span>
                    <Badge variant="secondary" className="bg-ai-warning/10 text-ai-warning">8</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
                    <span className="font-medium">Under Review</span>
                    <Badge variant="outline">3</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
                    <span className="font-medium">Archived</span>
                    <Badge variant="secondary">12</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold">Enrollment Distribution</CardTitle>
                <CardDescription>Candidates per active course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseAnalytics.map((course) => (
                    <div key={course.name} className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
                      <span className="text-sm font-medium">{course.name}</span>
                      <Badge variant="outline" className="font-semibold">{course.enrolled}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Risk Management & Alerts */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <Card className="xl:col-span-2 border-0 shadow-card bg-gradient-to-br from-card to-card/90">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Shield className="w-6 h-6 mr-3 text-ai-primary" />
                  Risk Management Center
                </CardTitle>
                <CardDescription>Proactive monitoring and intervention system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-destructive/20 rounded-xl bg-gradient-to-br from-destructive/5 to-destructive/10 hover:shadow-lg transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-destructive/10 rounded-lg">
                        <AlertTriangle className="w-6 h-6 text-destructive" />
                      </div>
                      <Badge variant="destructive" className="text-xs">Critical</Badge>
                    </div>
                    <h4 className="font-semibold text-destructive text-lg mb-2">Engagement Drop</h4>
                    <p className="text-sm text-muted-foreground mb-4">15 learners showing decreased activity patterns</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="destructive" className="flex-1">Intervene</Button>
                      <Button size="sm" variant="outline" className="border-destructive/20 text-destructive hover:bg-destructive/10">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6 border border-ai-warning/20 rounded-xl bg-gradient-to-br from-ai-warning/5 to-ai-warning/10 hover:shadow-lg transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-ai-warning/10 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-ai-warning" />
                      </div>
                      <Badge variant="secondary" className="bg-ai-warning/10 text-ai-warning border-ai-warning/20 text-xs">Medium</Badge>
                    </div>
                    <h4 className="font-semibold text-ai-warning text-lg mb-2">Performance Variance</h4>
                    <p className="text-sm text-muted-foreground mb-4">Cloud Computing course showing 60% completion</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-ai-warning text-ai-warning flex-1">Optimize</Button>
                      <Button size="sm" variant="outline" className="border-ai-warning/20 text-ai-warning hover:bg-ai-warning/10">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="p-6 border border-ai-info/20 rounded-xl bg-gradient-to-br from-ai-info/5 to-ai-info/10 hover:shadow-lg transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-ai-info/10 rounded-lg">
                        <Calendar className="w-6 h-6 text-ai-info" />
                      </div>
                      <Badge variant="outline" className="border-ai-info/20 text-ai-info text-xs">Scheduled</Badge>
                    </div>
                    <h4 className="font-semibold text-ai-info text-lg mb-2">Certification Renewal</h4>
                    <p className="text-sm text-muted-foreground mb-4">47 certifications expire within 30 days</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-ai-info text-ai-info flex-1">Notify</Button>
                      <Button size="sm" variant="outline" className="border-ai-info/20 text-ai-info hover:bg-ai-info/10">
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="p-6 border border-ai-accent/20 rounded-xl bg-gradient-to-br from-ai-accent/5 to-ai-accent/10 hover:shadow-lg transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-ai-accent/10 rounded-lg">
                        <Zap className="w-6 h-6 text-ai-accent" />
                      </div>
                      <Badge variant="outline" className="border-ai-accent/20 text-ai-accent text-xs">Action Required</Badge>
                    </div>
                    <h4 className="font-semibold text-ai-accent text-lg mb-2">Skills Gap Critical</h4>
                    <p className="text-sm text-muted-foreground mb-4">Cloud Computing expertise shortage detected</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="border-ai-accent text-ai-accent flex-1">Plan</Button>
                      <Button size="sm" variant="outline" className="border-ai-accent/20 text-ai-accent hover:bg-ai-accent/10">
                        <Target className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center text-xl font-semibold">
                  <Activity className="w-6 h-6 mr-3 text-ai-secondary" />
                  System Health
                </CardTitle>
                <CardDescription>Real-time platform monitoring</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-ai-success/5 border border-ai-success/20">
                  <div>
                    <div className="font-medium text-ai-success">Platform Status</div>
                    <div className="text-sm text-muted-foreground">All systems operational</div>
                  </div>
                  <div className="w-3 h-3 bg-ai-success rounded-full animate-pulse"></div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Server Response</span>
                    <span className="font-medium text-ai-success">98.7%</span>
                  </div>
                  <Progress value={98.7} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>User Satisfaction</span>
                    <span className="font-medium text-ai-primary">94.2%</span>
                  </div>
                  <Progress value={94.2} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Content Delivery</span>
                    <span className="font-medium text-ai-accent">99.1%</span>
                  </div>
                  <Progress value={99.1} className="h-2" />
                </div>

                <div className="pt-4 border-t border-border/50">
                  <Button variant="outline" className="w-full" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Full Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Enhanced AI Assistant Sidebar */}
      {!isAssistantMinimized ? (
        <div className={`fixed right-0 top-0 h-full bg-gradient-to-b from-card via-card/98 to-card/95 border-l border-border/30 shadow-2xl backdrop-blur-sm z-50 transition-all duration-300 ${
          isAssistantExpanded ? 'w-[650px]' : 'w-[450px]'
        }`}>
          <div className="p-4 lg:p-6 border-b border-border/30 bg-gradient-to-r from-ai-primary/8 to-ai-secondary/8 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-2.5 bg-gradient-to-br from-ai-primary/10 to-ai-primary/5 rounded-xl mr-3 border border-ai-primary/20">
                  <Brain className="w-5 h-5 lg:w-6 lg:h-6 text-ai-primary" />
                </div>
                <div>
                  <h3 className="text-base lg:text-lg font-semibold text-foreground flex items-center">
                    AI Assistant
                    <Badge variant="secondary" className="ml-2 text-xs bg-ai-success/10 text-ai-success border-ai-success/20">
                      Online
                    </Badge>
                  </h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">
                    Advanced analytics & insights
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAssistantExpanded(!isAssistantExpanded)}
                  className="hover:bg-ai-primary/10 rounded-lg transition-all"
                >
                  {isAssistantExpanded ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAssistantMinimized(true)}
                  className="hover:bg-destructive/10 hover:text-destructive rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-120px)]">
            <div className="p-3 lg:p-4 h-full">
              <ChatInterface 
                placeholder="Ask about analytics, trends, or request visualizations..."
                suggestions={[
                  "Show learner performance trends as a chart",
                  "Visualize skill gaps data", 
                  "Create enrollment analytics dashboard",
                  "Show completion rates over time",
                  "Compare course demand vs enrollment",
                  "Display risk factors analysis",
                  "Generate market insights report",
                  "Analyze learning behavior patterns"
                ]}
                onVisualizationRequest={handleVisualization}
              />
            </div>
          </ScrollArea>
        </div>
      ) : (
        /* Minimized AI Assistant Button */
        <div className="fixed right-4 bottom-4 z-50">
          <Button
            onClick={() => setIsAssistantMinimized(false)}
            className="bg-gradient-to-r from-ai-primary to-ai-secondary hover:from-ai-primary/90 hover:to-ai-secondary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-3 h-auto min-w-[140px]"
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-full">
                <Brain className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">AI Assistant</span>
            </div>
          </Button>
        </div>
      )}

      {/* Chart Visualization Modal */}
      <Dialog open={showChartModal} onOpenChange={setShowChartModal}>
        <DialogContent className="max-w-6xl max-h-[90vh] bg-gradient-to-br from-card to-card/90">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-xl">
              <span className="flex items-center">
                <BarChart3 className="w-6 h-6 mr-3 text-ai-primary" />
                {chartTitle}
              </span>
              <div className="flex items-center gap-3">
                <Select value={selectedChartType} onValueChange={setSelectedChartType}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">
                      <div className="flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        Bar Chart
                      </div>
                    </SelectItem>
                    <SelectItem value="line">
                      <div className="flex items-center">
                        <LineChart className="w-4 h-4 mr-2" />
                        Line Chart
                      </div>
                    </SelectItem>
                    <SelectItem value="pie">
                      <div className="flex items-center">
                        <PieChart className="w-4 h-4 mr-2" />
                        Pie Chart
                      </div>
                    </SelectItem>
                    <SelectItem value="area">
                      <div className="flex items-center">
                        <AreaChart className="w-4 h-4 mr-2" />
                        Area Chart
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
                
                <Button size="sm" variant="outline" onClick={() => exportChart('pdf')} className="border-ai-primary/20 text-ai-primary hover:bg-ai-primary/10">
                  <FileText className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                
                <Button size="sm" variant="outline" onClick={() => exportChart('image')} className="border-ai-secondary/20 text-ai-secondary hover:bg-ai-secondary/10">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-6 p-4 bg-muted/20 rounded-lg">
            {renderChart()}
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-muted/30 to-muted/10 rounded-lg">
            <p className="text-sm text-muted-foreground mb-3">Want to modify this chart? Ask the AI assistant:</p>
            <Input 
              placeholder="e.g., 'Show this data by month instead' or 'Add completion rates to this chart'" 
              className="bg-background/50"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
