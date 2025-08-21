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
  X,
  Sparkles
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Cell, AreaChart as RechartsAreaChart, Area, Pie } from 'recharts';
import { ChatInterface } from "@/components/ChatInterface";

const AdminDashboard = () => {
  const [showChartModal, setShowChartModal] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState("bar");
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("");
  const [isGeneratingChart, setIsGeneratingChart] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 p-4 lg:p-8">
      {/* Header Section */}
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
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <Button
              onClick={() => setShowAIAssistant(true)}
              className="bg-ai-primary hover:bg-ai-primary/90 text-white"
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
            >
              Logout
            </Button>
            <div className="flex items-center gap-2">
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
      </div>

      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalLearners}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCourses}</div>
            <p className="text-xs text-muted-foreground">Across all instructors</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">+5% improvement</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgEngagement}%</div>
            <p className="text-xs text-muted-foreground">Excellent performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Talent Demographics */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent bg-clip-text text-transparent mb-6">
          Talent Demographics & Insights
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                  <span className="text-sm font-semibold text-ai-primary">{talentDemographics.upskillSuccess.totalUpskilled}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Career Growth</span>
                  <span className="text-sm font-semibold text-ai-secondary">{talentDemographics.upskillSuccess.careerAdvancement}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Salary Increase</span>
                  <span className="text-sm font-semibold text-ai-success">{talentDemographics.upskillSuccess.salaryIncrease}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Certifications</span>
                  <span className="text-sm font-semibold text-ai-accent">{talentDemographics.upskillSuccess.certificationEarned}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Course Analytics */}
      <div className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent bg-clip-text text-transparent">
            Course Performance Analytics
          </h2>
          <div className="flex gap-2 mt-4 lg:mt-0">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => handleVisualization("bar", courseAnalytics.map(c => ({name: c.name, value: c.enrolled})), "Course Enrollment")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Chart View
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="min-w-full">
            <div className="grid gap-4">
              {courseAnalytics.map((course, index) => (
                <Card key={index} className="transition-all duration-200 hover:shadow-lg">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-2">
                        <h3 className="font-semibold text-lg mb-1">{course.name}</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={course.marketDemand > 90 ? "default" : "secondary"} className="text-xs">
                            {course.marketDemand}% Market Demand
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            ⭐ {course.satisfaction}/5.0
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-ai-primary">{course.enrolled}</div>
                        <div className="text-xs text-muted-foreground">Enrolled</div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-ai-success">{course.completed}</div>
                        <div className="text-xs text-muted-foreground">Completed</div>
                        <div className="text-xs text-ai-success">
                          {Math.round((course.completed / course.enrolled) * 100)}% Rate
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-ai-secondary">{course.avgScore}</div>
                        <div className="text-xs text-muted-foreground">Avg Score</div>
                        <div className="text-xs text-ai-secondary">
                          {course.dropoutRate}% Dropout
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-bold text-ai-accent">${(course.revenue / 1000).toFixed(0)}k</div>
                        <div className="text-xs text-muted-foreground">Revenue</div>
                        <div className="text-xs text-ai-accent">
                          {course.timeToComplete}h Duration
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Regional Analysis */}
      <div className="mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent bg-clip-text text-transparent">
            Regional Talent Analysis
          </h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => handleVisualization("line", regionWiseData.map(r => ({name: r.region.split(',')[0], value: r.demand})), "Regional Demand Trends")}
          >
            <LineChart className="w-4 h-4 mr-2" />
            Trend Analysis
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regionWiseData.map((region, index) => (
            <Card key={index} className="transition-all duration-200 hover:shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center justify-between">
                  {region.region.split(',')[0]}
                  <Badge variant={region.demand > 90 ? "default" : region.demand > 80 ? "secondary" : "outline"}>
                    {region.demand}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Professionals</span>
                  <span className="font-semibold">{(region.professionals / 1000).toFixed(1)}k</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Skill Gap</span>
                  <span className="font-semibold text-ai-warning">{region.skillGap}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg Salary</span>
                  <span className="font-semibold text-ai-success">${(region.avgSalary / 1000).toFixed(0)}k</span>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Top Skills:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {region.topSkills.slice(0, 2).map((skill, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
        <div className="fixed inset-y-0 right-0 w-96 bg-background border-l shadow-lg z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="font-semibold">AI Assistant</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowAIAssistant(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <div className="h-full">
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