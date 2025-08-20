import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Minimize2
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
  
  const stats = {
    totalLearners: 1247,
    activeCourses: 24,
    completionRate: 78,
    avgEngagement: 85
  };

  const riskLearners = [
    { id: 1, name: "Mike Chen", course: "AI Fundamentals", risk: "High", lastActive: "3 days ago" },
    { id: 2, name: "Sarah Johnson", course: "Data Science", risk: "Medium", lastActive: "1 day ago" },
    { id: 3, name: "Alex Rivera", course: "Cloud Computing", risk: "High", lastActive: "5 days ago" },
  ];

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
    { name: "AI Fundamentals", demand: 95, waitlist: 45 },
    { name: "Cloud Computing", demand: 92, waitlist: 38 },
    { name: "Data Science", demand: 89, waitlist: 29 },
    { name: "Cybersecurity", demand: 87, waitlist: 52 },
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
      <main className={`transition-all duration-300 ${isAssistantExpanded ? 'pr-[600px]' : 'pr-[400px]'} p-8 pt-20`}>
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground text-lg">
            Comprehensive analytics and insights for your learning platform
          </p>
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
                <CardDescription>High-demand courses with active waitlists</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {demandingCourses.map((course) => (
                  <div key={course.name} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-muted/20 to-muted/5 hover:from-muted/30 hover:to-muted/10 transition-all">
                    <div>
                      <div className="font-medium text-lg">{course.name}</div>
                      <div className="text-sm text-muted-foreground">Demand Score: {course.demand}%</div>
                    </div>
                    <Badge variant="secondary" className="bg-ai-warning/10 text-ai-warning border-ai-warning/20">
                      {course.waitlist} on waitlist
                    </Badge>
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

          {/* Risk Management & Alerts */}
          <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center text-xl font-semibold">
                <AlertTriangle className="w-6 h-6 mr-3 text-destructive" />
                Risk Management & Alerts
              </CardTitle>
              <CardDescription>Potential risks and immediate intervention requirements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-6 border border-destructive/20 rounded-lg bg-gradient-to-br from-destructive/5 to-destructive/10 hover:shadow-lg transition-all">
                  <h4 className="font-semibold text-destructive text-lg mb-2">High Dropout Risk</h4>
                  <p className="text-sm text-muted-foreground mb-4">15 learners inactive 5+ days</p>
                  <Button size="sm" variant="destructive" className="w-full">Take Action</Button>
                </div>
                
                <div className="p-6 border border-ai-warning/20 rounded-lg bg-gradient-to-br from-ai-warning/5 to-ai-warning/10 hover:shadow-lg transition-all">
                  <h4 className="font-semibold text-ai-warning text-lg mb-2">Low Engagement</h4>
                  <p className="text-sm text-muted-foreground mb-4">Cloud course: 40% engagement</p>
                  <Button size="sm" variant="outline" className="w-full border-ai-warning text-ai-warning">Review</Button>
                </div>
                
                <div className="p-6 border border-ai-info/20 rounded-lg bg-gradient-to-br from-ai-info/5 to-ai-info/10 hover:shadow-lg transition-all">
                  <h4 className="font-semibold text-ai-info text-lg mb-2">Cert Expiry</h4>
                  <p className="text-sm text-muted-foreground mb-4">47 expire this month</p>
                  <Button size="sm" variant="outline" className="w-full border-ai-info text-ai-info">Remind</Button>
                </div>

                <div className="p-6 border border-ai-accent/20 rounded-lg bg-gradient-to-br from-ai-accent/5 to-ai-accent/10 hover:shadow-lg transition-all">
                  <h4 className="font-semibold text-ai-accent text-lg mb-2">Skill Gap Alert</h4>
                  <p className="text-sm text-muted-foreground mb-4">Cloud skills critical shortage</p>
                  <Button size="sm" variant="outline" className="w-full border-ai-accent text-ai-accent">Address</Button>
                </div>
              </div>

              {/* At-Risk Learners */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-6">At-Risk Learners</h3>
                <div className="space-y-4">
                  {riskLearners.map((learner) => (
                    <div key={learner.id} className="flex items-center justify-between p-4 border rounded-lg bg-gradient-to-r from-muted/20 to-muted/5 hover:from-muted/30 hover:to-muted/10 transition-all">
                      <div>
                        <div className="font-medium text-lg">{learner.name}</div>
                        <div className="text-sm text-muted-foreground">{learner.course}</div>
                        <div className="text-xs text-muted-foreground">Last active: {learner.lastActive}</div>
                      </div>
                      <Badge variant={learner.risk === "High" ? "destructive" : "secondary"} className="text-sm px-3 py-1">
                        {learner.risk} Risk
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Enhanced AI Assistant Sidebar */}
      <div className={`fixed right-0 top-0 h-full bg-gradient-to-b from-card via-card/95 to-card/90 border-l border-border/50 shadow-elevated z-50 transition-all duration-300 ${
        isAssistantExpanded ? 'w-[600px]' : 'w-[400px]'
      }`}>
        <div className="p-6 border-b border-border/50 bg-gradient-to-r from-ai-primary/5 to-ai-secondary/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 bg-ai-primary/10 rounded-lg mr-3">
                <Brain className="w-6 h-6 text-ai-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">AI Assistant</h3>
                <p className="text-sm text-muted-foreground">
                  Analytics insights & visualization
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAssistantExpanded(!isAssistantExpanded)}
              className="hover:bg-ai-primary/10"
            >
              {isAssistantExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
        
        <div className="h-[calc(100vh-100px)] p-4">
          <ChatInterface 
            placeholder="Ask about analytics, trends, or request visualizations..."
            suggestions={[
              "Show learner performance trends as a chart",
              "Visualize skill gaps data",
              "Create a bar chart of course enrollments",
              "Show completion rates over time",
              "Compare course demand vs enrollment",
              "Display risk factors analysis"
            ]}
            onVisualizationRequest={handleVisualization}
          />
        </div>
      </div>

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
