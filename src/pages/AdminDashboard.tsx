import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
import { AdminSidebar } from "@/components/AdminSidebar";
import { ChatInterface } from "@/components/ChatInterface";

const AdminDashboard = () => {
  const [showChartModal, setShowChartModal] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState("bar");
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("");
  const [isAssistantExpanded, setIsAssistantExpanded] = useState(false);
  const [isAssistantMinimized, setIsAssistantMinimized] = useState(false);
  const [isGeneratingChart, setIsGeneratingChart] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  
  const stats = {
    totalLearners: 1247,
    activeCourses: 24,
    completionRate: 78,
    avgEngagement: 85
  };


  const courseAnalytics = [
    { name: "AI Fundamentals", enrolled: 234, completed: 182, avgScore: 87, marketDemand: 95, revenue: 145600, satisfaction: 4.8, timeToComplete: 45, dropoutRate: 8 },
    { name: "Data Science", enrolled: 189, completed: 156, avgScore: 91, marketDemand: 89, revenue: 98750, satisfaction: 4.7, timeToComplete: 52, dropoutRate: 12 },
    { name: "Cloud Computing", enrolled: 156, completed: 98, avgScore: 79, marketDemand: 92, revenue: 87300, satisfaction: 4.3, timeToComplete: 38, dropoutRate: 24 },
    { name: "DevOps", enrolled: 134, completed: 112, avgScore: 84, marketDemand: 87, revenue: 76200, satisfaction: 4.5, timeToComplete: 41, dropoutRate: 16 },
    { name: "Cybersecurity", enrolled: 98, completed: 78, avgScore: 89, marketDemand: 94, revenue: 68400, satisfaction: 4.9, timeToComplete: 48, dropoutRate: 9 },
  ];

  const skillGapsData = [
    { skill: "Cloud Computing", gap: 75, jobRoles: ["DevOps Engineer", "Cloud Architect", "SRE"], avgSalary: 120000, openPositions: 1250, urgency: "Critical", trainingTime: 6 },
    { skill: "Data Science", gap: 40, jobRoles: ["Data Scientist", "ML Engineer", "Analyst"], avgSalary: 115000, openPositions: 890, urgency: "High", trainingTime: 8 },
    { skill: "AI/ML", gap: 15, jobRoles: ["ML Engineer", "AI Researcher", "Data Scientist"], avgSalary: 135000, openPositions: 450, urgency: "Medium", trainingTime: 10 },
    { skill: "Cybersecurity", gap: 65, jobRoles: ["Security Analyst", "Pentester", "CISO"], avgSalary: 105000, openPositions: 980, urgency: "Critical", trainingTime: 5 },
    { skill: "Full-Stack Development", gap: 30, jobRoles: ["Full-Stack Developer", "Software Engineer", "Tech Lead"], avgSalary: 95000, openPositions: 2100, urgency: "Medium", trainingTime: 4 },
  ];

  const demandingCourses = [
    { name: "AI Fundamentals", demand: 95, trending: "High", growthRate: 45, industryAdoption: 87, futureProjection: 98 },
    { name: "Cloud Computing", demand: 92, trending: "High", growthRate: 38, industryAdoption: 91, futureProjection: 95 },
    { name: "Data Science", demand: 89, trending: "Medium", growthRate: 25, industryAdoption: 84, futureProjection: 92 },
    { name: "Cybersecurity", demand: 87, trending: "Medium", growthRate: 32, industryAdoption: 78, futureProjection: 88 },
    { name: "DevOps", demand: 85, trending: "High", growthRate: 42, industryAdoption: 89, futureProjection: 94 },
  ];

  const regionWiseData = [
    { region: "Dubai, UAE", demand: 94, professionals: 12500, skillGap: 32, topSkills: ["Cloud", "AI/ML", "DevOps"], avgSalary: 115000 },
    { region: "Abu Dhabi, UAE", demand: 89, professionals: 8900, skillGap: 38, topSkills: ["Cybersecurity", "Data Science", "Cloud"], avgSalary: 108000 },
    { region: "Riyadh, Saudi Arabia", demand: 91, professionals: 15200, skillGap: 35, topSkills: ["AI/ML", "Cloud", "DevOps"], avgSalary: 98000 },
    { region: "Doha, Qatar", demand: 87, professionals: 6800, skillGap: 41, topSkills: ["Cloud", "Cybersecurity", "Data Science"], avgSalary: 112000 },
    { region: "Kuwait City, Kuwait", demand: 83, professionals: 5400, skillGap: 45, topSkills: ["Data Science", "Cloud", "Full-Stack"], avgSalary: 92000 },
    { region: "Manama, Bahrain", demand: 85, professionals: 3200, skillGap: 42, topSkills: ["DevOps", "Cloud", "AI/ML"], avgSalary: 88000 },
    { region: "Muscat, Oman", demand: 79, professionals: 2800, skillGap: 48, topSkills: ["Cloud", "Data Science", "Cybersecurity"], avgSalary: 82000 },
    { region: "Amman, Jordan", demand: 76, professionals: 4100, skillGap: 52, topSkills: ["Full-Stack", "Data Science", "Cloud"], avgSalary: 65000 },
  ];

  const talentDemographics = {
    ageGroups: [
      { group: "22-28 years", count: 485, percentage: 38.9, growth: "+15%" },
      { group: "29-35 years", count: 392, percentage: 31.4, growth: "+12%" },
      { group: "36-42 years", count: 248, percentage: 19.9, growth: "+8%" },
      { group: "43+ years", count: 122, percentage: 9.8, growth: "+5%" },
    ],
    talentTypes: [
      { type: "Software Engineers", count: 523, percentage: 41.9, trend: "High Demand" },
      { type: "Data Scientists", count: 312, percentage: 25.0, trend: "Growing" },
      { type: "DevOps Engineers", count: 198, percentage: 15.9, trend: "Critical Need" },
      { type: "Cybersecurity Specialists", count: 145, percentage: 11.6, trend: "Emerging" },
      { type: "AI/ML Engineers", count: 69, percentage: 5.5, trend: "Future Focus" },
    ],
    majorSkills: [
      { skill: "Cloud Computing", proficiency: 78, learners: 892, marketDemand: 95 },
      { skill: "JavaScript/React", proficiency: 85, learners: 756, marketDemand: 88 },
      { skill: "Python", proficiency: 82, learners: 698, marketDemand: 92 },
      { skill: "Data Analysis", proficiency: 71, learners: 534, marketDemand: 89 },
      { skill: "Machine Learning", proficiency: 65, learners: 423, marketDemand: 94 },
      { skill: "DevOps Tools", proficiency: 69, learners: 398, marketDemand: 87 },
    ],
    systemEngagement: {
      dailyActiveUsers: 892,
      weeklyActiveUsers: 1156,
      monthlyActiveUsers: 1247,
      avgSessionDuration: "47 mins",
      completionRate: 78,
      skillAssessmentsTaken: 2834,
    },
    upskillSuccess: {
      totalUpskilled: 634,
      careerAdvancement: 423,
      salaryIncrease: 298,
      newRoleTransitions: 187,
      certificationEarned: 756,
      skillsBridged: 1289,
    }
  };

  const learningTrends = [
    { period: "Jan", mobile: 65, video: 78, quiz: 45 },
    { period: "Feb", mobile: 70, video: 82, quiz: 52 },
    { period: "Mar", mobile: 75, video: 85, quiz: 58 },
    { period: "Apr", mobile: 80, video: 88, quiz: 62 },
  ];

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  const handleVisualization = (type: string, data: any[], title: string) => {
    setIsGeneratingChart(true);
    setGenerationProgress(0);
    setShowChartModal(true);
    
    // Simulate AI processing with progress
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
    // Complete the generation
    setTimeout(() => {
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setTimeout(() => {
        setSelectedChartType(type);
        setChartData(data);
        setChartTitle(title);
        setIsGeneratingChart(false);
        setGenerationProgress(0);
      }, 500);
    }, 2500);
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
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background via-muted/20 to-accent/5">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center border-b px-6">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-semibold">Admin Dashboard</h1>
          </header>
          
          {/* Main Dashboard Content */}
          <main className={`flex-1 transition-all duration-300 ${isAssistantMinimized ? 'pr-4' : isAssistantExpanded ? 'pr-[650px]' : 'pr-[450px]'} p-4 lg:p-8`}>
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

            {/* Talent Demographics Overview */}
            <div className="mb-10">
              <div className="mb-6">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent bg-clip-text text-transparent mb-2">
                  Talent Demographics & Insights
                </h2>
                <p className="text-muted-foreground">
                  Comprehensive analysis of learner profiles and upskilling outcomes
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
                {/* Age Distribution */}
                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Users className="w-4 h-4 mr-2 text-ai-primary" />
                      Age Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {talentDemographics.ageGroups.map((group) => (
                        <div key={group.group} className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">{group.group}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{group.percentage}%</span>
                            <Badge variant="outline" className="text-xs bg-ai-success/10 text-ai-success border-ai-success/20">
                              {group.growth}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Talent Types */}
                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <GraduationCap className="w-4 h-4 mr-2 text-ai-secondary" />
                      Talent Types
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {talentDemographics.talentTypes.slice(0, 4).map((type) => (
                        <div key={type.type} className="flex justify-between items-center">
                          <span className="text-xs text-muted-foreground">{type.type.split(' ')[0]}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{type.count}</span>
                            <Badge variant="outline" className="text-xs bg-ai-accent/10 text-ai-accent border-ai-accent/20">
                              {type.trend.split(' ')[0]}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* System Engagement */}
                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Activity className="w-4 h-4 mr-2 text-ai-accent" />
                      Engagement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Daily Active</span>
                        <span className="text-sm font-semibold text-ai-primary">{talentDemographics.systemEngagement.dailyActiveUsers}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Session Time</span>
                        <span className="text-sm font-semibold text-ai-secondary">{talentDemographics.systemEngagement.avgSessionDuration}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Completion</span>
                        <span className="text-sm font-semibold text-ai-success">{talentDemographics.systemEngagement.completionRate}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Assessments</span>
                        <span className="text-sm font-semibold text-ai-accent">{talentDemographics.systemEngagement.skillAssessmentsTaken}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Upskilling Success */}
                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2 text-ai-success" />
                      Upskilling Success
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Total Upskilled</span>
                        <span className="text-sm font-semibold text-ai-success">{talentDemographics.upskillSuccess.totalUpskilled}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Career Growth</span>
                        <span className="text-sm font-semibold text-ai-primary">{talentDemographics.upskillSuccess.careerAdvancement}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Salary Boost</span>
                        <span className="text-sm font-semibold text-ai-secondary">{talentDemographics.upskillSuccess.salaryIncrease}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">New Roles</span>
                        <span className="text-sm font-semibold text-ai-warning">{talentDemographics.upskillSuccess.newRoleTransitions}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Top Skills */}
                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-sm font-medium flex items-center">
                      <Target className="w-4 h-4 mr-2 text-ai-warning" />
                      Major Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {talentDemographics.majorSkills.slice(0, 4).map((skill) => (
                        <div key={skill.skill} className="space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">{skill.skill.split(' ')[0]}</span>
                            <span className="text-xs font-semibold">{skill.proficiency}%</span>
                          </div>
                          <Progress value={skill.proficiency} className="h-1" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
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
              {/* Course Performance & Analytics - Using Different Visualizations */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl font-semibold flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2 text-ai-primary" />
                      Course Performance Analytics
                    </CardTitle>
                    <CardDescription>Interactive bar chart visualization of enrollment vs completion</CardDescription>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" onClick={() => handleVisualization('bar', courseAnalytics.map(c => ({ name: c.name, value: Math.round((c.completed / c.enrolled) * 100) })), 'Course Completion Rates')}>
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Bar Chart
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleVisualization('line', courseAnalytics.map(c => ({ name: c.name, value: c.avgScore })), 'Average Course Scores Trend')}>
                        <LineChart className="w-4 h-4 mr-1" />
                        Score Trends
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={courseAnalytics.map(c => ({ 
                          name: c.name.split(' ')[0], 
                          completion: Math.round((c.completed / c.enrolled) * 100),
                          demand: c.marketDemand,
                          score: c.avgScore
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="completion" fill="hsl(var(--primary))" name="Completion %" />
                          <Bar dataKey="demand" fill="hsl(var(--secondary))" name="Market Demand %" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    
                    {courseAnalytics.slice(0, 3).map((course) => (
                      <div key={course.name} className="p-4 rounded-lg bg-gradient-to-r from-muted/20 to-muted/5 border border-border/30">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold">{course.name}</span>
                          <Badge variant="secondary" className="bg-ai-success/10 text-ai-success border-ai-success/20">
                            ${course.revenue.toLocaleString()}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-sm">
                          <div className="text-center">
                            <div className="text-muted-foreground">Completion</div>
                            <div className="font-bold text-ai-primary">{Math.round((course.completed / course.enrolled) * 100)}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-muted-foreground">Score</div>
                            <div className="font-bold text-ai-secondary">{course.avgScore}%</div>
                          </div>
                          <div className="text-center">
                            <div className="text-muted-foreground">Rating</div>
                            <div className="font-bold text-ai-accent">{course.satisfaction}★</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl font-semibold flex items-center">
                      <PieChart className="w-5 h-5 mr-2 text-ai-secondary" />
                      Course Demand Distribution
                    </CardTitle>
                    <CardDescription>Pie chart showing market demand across courses</CardDescription>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" onClick={() => handleVisualization('pie', demandingCourses.map(c => ({ name: c.name, value: c.demand })), 'Market Demand Distribution')}>
                        <PieChart className="w-4 h-4 mr-1" />
                        Pie Chart
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleVisualization('area', demandingCourses.map(c => ({ name: c.name, value: c.growthRate })), 'Growth Rate Analysis')}>
                        <AreaChart className="w-4 h-4 mr-1" />
                        Growth Area
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Pie 
                            data={demandingCourses.map(c => ({ name: c.name, value: c.demand }))}
                            cx="50%" 
                            cy="50%" 
                            outerRadius={100} 
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${value}%`}
                          >
                            {demandingCourses.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      {demandingCourses.slice(0, 3).map((course, index) => (
                        <div key={course.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <span className="font-medium">{course.name}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-ai-primary">{course.demand}%</div>
                            <div className="text-xs text-muted-foreground">+{course.growthRate}% growth</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Skill Gaps Analysis - Using Line Charts and Area Charts */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl font-semibold flex items-center">
                      <LineChart className="w-5 h-5 mr-2 text-ai-warning" />
                      Skill Gaps Trend Analysis
                    </CardTitle>
                    <CardDescription>Line chart showing skill coverage vs market demand over time</CardDescription>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" onClick={() => handleVisualization('line', skillGapsData.map(s => ({ name: s.skill, value: 100 - s.gap })), 'Skill Coverage Analysis')}>
                        <LineChart className="w-4 h-4 mr-1" />
                        Coverage Line
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleVisualization('bar', skillGapsData.map(s => ({ name: s.skill, value: s.openPositions })), 'Open Positions by Skill')}>
                        <BarChart3 className="w-4 h-4 mr-1" />
                        Position Gaps
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={skillGapsData.map(s => ({ 
                          name: s.skill.split(' ')[0],
                          coverage: 100 - s.gap,
                          demand: Math.min(s.openPositions / 10, 100),
                          salary: s.avgSalary / 1000
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                          />
                          <Line type="monotone" dataKey="coverage" stroke="hsl(var(--primary))" strokeWidth={2} name="Coverage %" />
                          <Line type="monotone" dataKey="demand" stroke="hsl(var(--secondary))" strokeWidth={2} name="Demand Score" />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      {skillGapsData.slice(0, 4).map((skill) => (
                        <div key={skill.skill} className="p-3 rounded-lg bg-gradient-to-r from-muted/20 to-muted/5 border border-border/30">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-medium text-sm">{skill.skill}</span>
                            <Badge variant={skill.urgency === "Critical" ? "destructive" : skill.urgency === "High" ? "secondary" : "outline"} className="text-xs">
                              {skill.urgency}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-muted-foreground">Coverage</span>
                              <span className="font-semibold">{100 - skill.gap}%</span>
                            </div>
                            <Progress value={100 - skill.gap} className="h-1" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
                  <CardHeader className="pb-6">
                    <CardTitle className="text-xl font-semibold flex items-center">
                      <AreaChart className="w-5 h-5 mr-2 text-ai-accent" />
                      Salary vs Skill Gap Impact
                    </CardTitle>
                    <CardDescription>Area chart visualization of market salary impact by skill gaps</CardDescription>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" onClick={() => handleVisualization('area', skillGapsData.map(s => ({ name: s.skill, value: s.avgSalary })), 'Average Salary by Skill')}>
                        <AreaChart className="w-4 h-4 mr-1" />
                        Salary Areas
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleVisualization('pie', skillGapsData.map(s => ({ name: s.skill, value: s.gap })), 'Skill Gap Distribution')}>
                        <PieChart className="w-4 h-4 mr-1" />
                        Gap Distribution
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsAreaChart data={skillGapsData.map(s => ({ 
                          name: s.skill.split(' ')[0],
                          salary: s.avgSalary / 1000,
                          positions: s.openPositions / 100,
                          gap: s.gap
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: 'hsl(var(--card))', 
                              border: '1px solid hsl(var(--border))',
                              borderRadius: '8px'
                            }}
                            formatter={(value, name) => {
                              const numValue = typeof value === 'number' ? value : parseFloat(value as string);
                              if (name === 'salary') return [`$${(numValue * 1000).toLocaleString()}`, 'Avg Salary'];
                              if (name === 'positions') return [`${(numValue * 100).toLocaleString()}`, 'Open Positions'];
                              return [`${numValue}%`, 'Skill Gap'];
                            }}
                          />
                          <Area type="monotone" dataKey="salary" stackId="1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                          <Area type="monotone" dataKey="gap" stackId="2" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.4} />
                        </RechartsAreaChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="space-y-3 mt-6">
                      {skillGapsData.slice(0, 3).map((skill) => (
                        <div key={skill.skill} className="flex justify-between items-center p-3 rounded-lg bg-muted/20">
                          <div>
                            <div className="font-medium">{skill.skill}</div>
                            <div className="text-xs text-muted-foreground">
                              {skill.openPositions.toLocaleString()} positions • {skill.trainingTime} months training
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-ai-success">${skill.avgSalary.toLocaleString()}</div>
                            <div className={`text-xs font-medium ${
                              skill.gap > 60 ? 'text-destructive' : 
                              skill.gap > 30 ? 'text-ai-warning' : 
                              'text-ai-success'
                            }`}>{skill.gap}% gap</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* MENA & UAE Regional Skills Analysis - Using Mixed Chart Visualizations */}
              <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-semibold flex items-center">
                    <div className="p-2 bg-ai-primary/10 rounded-lg mr-3">
                      <Target className="w-5 h-5 text-ai-primary" />
                    </div>
                    MENA & UAE Regional Skills Analysis
                  </CardTitle>
                  <CardDescription>Skills demand & supply distribution across Middle East and UAE regions</CardDescription>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" onClick={() => handleVisualization('bar', regionWiseData.map(r => ({ name: r.region.split(',')[0], value: r.demand })), 'Regional Market Demand')}>
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Demand by Region
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleVisualization('pie', regionWiseData.map(r => ({ name: r.region.split(',')[0], value: r.professionals })), 'Professional Distribution')}>
                      <PieChart className="w-4 h-4 mr-1" />
                      Talent Distribution
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleVisualization('area', regionWiseData.map(r => ({ name: r.region.split(',')[0], value: r.avgSalary })), 'Regional Salary Trends')}>
                      <AreaChart className="w-4 h-4 mr-1" />
                      Salary Landscape
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Regional Demand Chart */}
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center">
                        <BarChart3 className="w-4 h-4 mr-2 text-ai-primary" />
                        Market Demand by Region
                      </h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={regionWiseData.map(r => ({ 
                            name: r.region.split(',')[0], 
                            demand: r.demand,
                            professionals: r.professionals / 1000
                          }))}>
                            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                            <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
                            <YAxis />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))', 
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px'
                              }}
                            />
                            <Bar dataKey="demand" fill="hsl(var(--primary))" name="Market Demand %" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Skill Gap Distribution */}
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center">
                        <PieChart className="w-4 h-4 mr-2 text-ai-secondary" />
                        Skill Gap Distribution
                      </h4>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'hsl(var(--card))', 
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px'
                              }}
                            />
                            <Pie 
                              data={regionWiseData.map(r => ({ name: r.region.split(',')[0], value: r.skillGap }))}
                              cx="50%" 
                              cy="50%" 
                              outerRadius={80} 
                              dataKey="value"
                              label={({ name, value }) => `${name}: ${value}%`}
                            >
                              {regionWiseData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {regionWiseData.map((region, index) => (
                      <div key={region.region} className="p-5 border rounded-xl bg-gradient-to-br from-muted/20 to-muted/5 hover:from-muted/30 hover:to-muted/10 transition-all">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            />
                            <div>
                              <h4 className="font-semibold text-lg">{region.region}</h4>
                              <p className="text-sm text-muted-foreground">{region.professionals.toLocaleString()} skilled professionals</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant={region.skillGap > 40 ? "destructive" : region.skillGap > 25 ? "secondary" : "default"}
                                   className={region.skillGap > 40 ? "" : region.skillGap > 25 ? "bg-ai-warning/10 text-ai-warning border-ai-warning/20" : "bg-ai-success/10 text-ai-success border-ai-success/20"}>
                              {region.skillGap}% gap
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Market Demand</div>
                            <Progress value={region.demand} className="h-2" />
                            <div className="text-xs mt-1 font-medium">{region.demand}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Skill Coverage</div>
                            <Progress value={100 - region.skillGap} className="h-2" />
                            <div className="text-xs mt-1 font-medium">{100 - region.skillGap}%</div>
                          </div>
                          <div>
                            <div className="text-xs text-muted-foreground mb-1">Talent Pool</div>
                            <div className="text-lg font-bold text-ai-primary">{(region.professionals / 1000).toFixed(1)}K</div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <div className="text-xs text-muted-foreground">Top Skills:</div>
                          {region.topSkills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs border-ai-accent/20 text-ai-accent">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="text-sm border-t border-border/30 pt-3 flex justify-between">
                          <span className="text-muted-foreground">Average Salary: </span>
                          <span className="font-bold text-ai-success">${region.avgSalary.toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

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
        </div>
        
        {/* AI Assistant Interface */}
        <ChatInterface
          isExpanded={isAssistantExpanded}
          isMinimized={isAssistantMinimized}
          onExpandToggle={() => setIsAssistantExpanded(!isAssistantExpanded)}
          onMinimize={() => setIsAssistantMinimized(!isAssistantMinimized)}
        />
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
