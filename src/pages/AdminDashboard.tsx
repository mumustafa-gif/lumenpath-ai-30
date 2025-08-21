import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Users, 
  GraduationCap, 
  TrendingUp, 
  AlertTriangle, 
  BarChart3,
  Clock,
  Target,
  Download,
  PieChart,
  LineChart,
  AreaChart,
  Shield,
  Activity,
  Calendar,
  Zap,
  X,
  Sparkles,
  Eye,
  Globe,
  Building,
  Lightbulb
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Cell, AreaChart as RechartsAreaChart, Area, Pie } from 'recharts';
import { ChatInterface } from "@/components/ChatInterface";
import { AISkillsObservatory } from "@/components/AISkillsObservatory";
import { WorkforceTrends } from "@/components/WorkforceTrends";

const AdminDashboard = () => {
  const [showChartModal, setShowChartModal] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState("bar");
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("");
  const [isGeneratingChart, setIsGeneratingChart] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
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

  const handleVisualization = (type: string, data: any[], title: string) => {
    setIsGeneratingChart(true);
    setGenerationProgress(0);
    setShowChartModal(true);
    
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
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

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

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

  const aiSuggestions = [
    "Show me course enrollment trends",
    "Visualize skill gaps analysis", 
    "Display learner engagement metrics",
    "Generate completion rate charts"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5">
      {/* Header Section */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b">
        <div className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent bg-clip-text text-transparent mb-1">
                Admin Command Center
              </h1>
              <p className="text-muted-foreground text-sm lg:text-base">
                Advanced analytics and insights for strategic decision making
              </p>
            </div>
            <div className="flex items-center gap-3 mt-3 lg:mt-0">
              <Button
                onClick={() => setShowAIAssistant(true)}
                className="bg-gradient-to-r from-ai-primary to-ai-secondary hover:from-ai-primary/90 hover:to-ai-secondary/90 text-white shadow-lg"
              >
                <Brain className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
              <Button
                onClick={() => {
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.href = '/';
                }}
                variant="outline"
                className="border-destructive/20 text-destructive hover:bg-destructive/10"
              >
                Logout
              </Button>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="bg-ai-success/10 text-ai-success border-ai-success/20 shadow-sm">
                  <Activity className="w-3 h-3 mr-1" />
                  Live
                </Badge>
                <Badge variant="outline" className="border-ai-primary/20 text-ai-primary shadow-sm">
                  <Calendar className="w-3 h-3 mr-1" />
                  Real-time
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="px-4 lg:px-6 py-2 bg-muted/5">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 bg-background/50 backdrop-blur-sm border">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="skills-observatory" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="hidden sm:inline">Skills Observatory</span>
            </TabsTrigger>
            <TabsTrigger value="workforce-trends" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Workforce Trends</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Deep Analytics</span>
            </TabsTrigger>
          </TabsList>

          {/* Main Content */}
          <div className="p-4 lg:p-6">
            <TabsContent value="overview" className="space-y-8 mt-0">
              {/* Key Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90 hover:shadow-lg transition-all duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
                    <div className="p-2 bg-gradient-to-br from-ai-primary/10 to-ai-primary/5 rounded-lg">
                      <Users className="h-4 w-4 text-ai-primary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold bg-gradient-to-r from-ai-primary to-ai-secondary bg-clip-text text-transparent">{stats.totalLearners}</div>
                    <p className="text-xs text-ai-success flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12% from last month
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90 hover:shadow-lg transition-all duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
                    <div className="p-2 bg-gradient-to-br from-ai-secondary/10 to-ai-secondary/5 rounded-lg">
                      <GraduationCap className="h-4 w-4 text-ai-secondary" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold bg-gradient-to-r from-ai-secondary to-ai-accent bg-clip-text text-transparent">{stats.activeCourses}</div>
                    <p className="text-xs text-muted-foreground mt-1">Across all instructors</p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90 hover:shadow-lg transition-all duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
                    <div className="p-2 bg-gradient-to-br from-ai-accent/10 to-ai-accent/5 rounded-lg">
                      <Target className="h-4 w-4 text-ai-accent" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold bg-gradient-to-r from-ai-accent to-ai-success bg-clip-text text-transparent">{stats.completionRate}%</div>
                    <p className="text-xs text-ai-success flex items-center mt-1">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +5% improvement
                    </p>
                  </CardContent>
                </Card>
                
                <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90 hover:shadow-lg transition-all duration-200">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
                    <div className="p-2 bg-gradient-to-br from-ai-success/10 to-ai-success/5 rounded-lg">
                      <Activity className="h-4 w-4 text-ai-success" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold bg-gradient-to-r from-ai-success to-ai-primary bg-clip-text text-transparent">{stats.avgEngagement}%</div>
                    <p className="text-xs text-ai-success mt-1">Excellent performance</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="skills-observatory" className="mt-0">
              <AISkillsObservatory />
            </TabsContent>

            <TabsContent value="workforce-trends" className="mt-0">
              <WorkforceTrends />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-8 mt-0">
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">Deep Analytics Coming Soon</h3>
                <p className="text-muted-foreground">Advanced course and regional analysis features</p>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      {/* Chart Modal */}
      <Dialog open={showChartModal} onOpenChange={setShowChartModal}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {chartTitle}
              <div className="flex gap-2">
                <Select value={selectedChartType} onValueChange={setSelectedChartType}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Bar Chart</SelectItem>
                    <SelectItem value="line">Line Chart</SelectItem>
                    <SelectItem value="pie">Pie Chart</SelectItem>
                    <SelectItem value="area">Area Chart</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {isGeneratingChart ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 bg-ai-primary/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
                <Sparkles className="w-8 h-8 text-ai-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Generating Visualization</h3>
              <p className="text-muted-foreground mb-4">Analyzing data patterns and creating insights...</p>
              <div className="w-full max-w-xs">
                <Progress value={generationProgress} className="mb-2" />
                <p className="text-center text-sm text-muted-foreground">{Math.round(generationProgress)}% Complete</p>
              </div>
            </div>
          ) : (
            <div className="mt-4">
              {renderChart()}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* AI Assistant */}
      {showAIAssistant && (
        <div className="fixed inset-y-0 right-0 w-96 bg-background/95 backdrop-blur-xl border-l shadow-2xl z-50 animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-ai-primary/5 to-ai-secondary/5">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-ai-primary/10 to-ai-primary/5 rounded-lg">
                <Brain className="w-4 h-4 text-ai-primary" />
              </div>
              <h3 className="font-semibold bg-gradient-to-r from-ai-primary to-ai-secondary bg-clip-text text-transparent">
                AI Assistant
              </h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowAIAssistant(false)}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="h-[calc(100vh-64px)]">
            <ChatInterface 
              suggestions={aiSuggestions}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;