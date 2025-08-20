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
  AreaChart
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Cell, AreaChart as RechartsAreaChart, Area, Pie } from 'recharts';
import { AdminHeader } from "@/components/AdminHeader";
import { ChatInterface } from "@/components/ChatInterface";

const AdminDashboard = () => {
  const [showChartModal, setShowChartModal] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState("bar");
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("");
  
  // Mock data
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
    <div className="min-h-screen bg-background flex">
      <AdminHeader />
      
      {/* Main Dashboard Content */}
      <main className="flex-1 p-6 pr-80">
        {/* Stats Overview */}
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
              <p className="text-xs text-muted-foreground">+3 new this month</p>
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
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgEngagement}%</div>
              <p className="text-xs text-muted-foreground">+2% this week</p>
            </CardContent>
          </Card>
        </div>

        {/* Comprehensive Dashboard */}
        <div className="space-y-8">
          {/* Course Performance & Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Overall Course Performance</CardTitle>
                <CardDescription>Enrollment vs completion rates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courseAnalytics.map((course) => (
                  <div key={course.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{course.name}</span>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{course.avgScore}% avg</Badge>
                        <Badge variant="outline">Demand: {course.marketDemand}%</Badge>
                      </div>
                    </div>
                    <Progress value={(course.completed / course.enrolled) * 100} />
                    <div className="text-sm text-muted-foreground flex justify-between">
                      <span>{course.completed}/{course.enrolled} completed</span>
                      <span>Market demand vs enrollment gap: {Math.abs(course.marketDemand - (course.enrolled / 300 * 100)).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Most Demanding Courses</CardTitle>
                <CardDescription>High-demand courses with waitlists</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {demandingCourses.map((course) => (
                  <div key={course.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{course.name}</div>
                      <div className="text-sm text-muted-foreground">Demand Score: {course.demand}%</div>
                    </div>
                    <Badge variant="secondary">{course.waitlist} on waitlist</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Skill Gaps Analysis */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Gaps Analysis</CardTitle>
                <CardDescription>Critical skill shortages in organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillGapsData.map((skill) => (
                  <div key={skill.skill} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.skill}</span>
                      <span className={`text-sm ${skill.gap > 60 ? 'text-red-500' : skill.gap > 30 ? 'text-yellow-500' : 'text-green-500'}`}>
                        {skill.gap}% gap
                      </span>
                    </div>
                    <Progress value={100 - skill.gap} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Gaps vs Job Roles</CardTitle>
                <CardDescription>Impact on specific positions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillGapsData.map((skill) => (
                  <div key={skill.skill} className="p-3 border rounded-lg">
                    <div className="font-medium mb-2">{skill.skill}</div>
                    <div className="text-sm text-muted-foreground">
                      Affected roles: {skill.jobRoles.join(", ")}
                    </div>
                    <Badge variant={skill.gap > 60 ? "destructive" : skill.gap > 30 ? "secondary" : "default"} className="mt-2">
                      {skill.gap > 60 ? "Critical" : skill.gap > 30 ? "Moderate" : "Good"}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Learning Trends & Course Status */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Trends</CardTitle>
                <CardDescription>Monthly engagement patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Mobile Learning</span>
                    <span className="font-bold text-green-600">+23%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Video Engagement</span>
                    <span className="font-bold text-green-600">+18%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quiz Completion</span>
                    <span className="font-bold text-green-600">+12%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Interactive Labs</span>
                    <span className="font-bold text-green-600">+8%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Status Overview</CardTitle>
                <CardDescription>Current course states</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Active Courses</span>
                    <Badge variant="default">24</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>In Development</span>
                    <Badge variant="secondary">8</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Under Review</span>
                    <Badge variant="outline">3</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Archived</span>
                    <Badge variant="secondary">12</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Candidates per Course</CardTitle>
                <CardDescription>Enrollment distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courseAnalytics.map((course) => (
                    <div key={course.name} className="flex justify-between items-center">
                      <span className="text-sm">{course.name}</span>
                      <Badge variant="outline">{course.enrolled}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Risk Management & Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-500" />
                Risk Management & Alerts
              </CardTitle>
              <CardDescription>Potential risks and immediate alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <h4 className="font-semibold text-red-800">High Dropout Risk</h4>
                  <p className="text-sm text-red-600 mt-1">15 learners inactive 5+ days</p>
                  <Button size="sm" variant="destructive" className="mt-2">Take Action</Button>
                </div>
                
                <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                  <h4 className="font-semibold text-yellow-800">Low Engagement</h4>
                  <p className="text-sm text-yellow-600 mt-1">Cloud course: 40% engagement</p>
                  <Button size="sm" variant="outline" className="mt-2">Review</Button>
                </div>
                
                <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                  <h4 className="font-semibold text-blue-800">Cert Expiry</h4>
                  <p className="text-sm text-blue-600 mt-1">47 expire this month</p>
                  <Button size="sm" variant="outline" className="mt-2">Remind</Button>
                </div>

                <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                  <h4 className="font-semibold text-purple-800">Skill Gap Alert</h4>
                  <p className="text-sm text-purple-600 mt-1">Cloud skills critical shortage</p>
                  <Button size="sm" variant="outline" className="mt-2">Address</Button>
                </div>
              </div>

              {/* At-Risk Learners */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-4">At-Risk Learners</h3>
                <div className="space-y-3">
                  {riskLearners.map((learner) => (
                    <div key={learner.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{learner.name}</div>
                        <div className="text-sm text-muted-foreground">{learner.course}</div>
                        <div className="text-xs text-muted-foreground">Last active: {learner.lastActive}</div>
                      </div>
                      <Badge variant={learner.risk === "High" ? "destructive" : "secondary"}>
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

      {/* AI Assistant Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-background border-l border-border shadow-lg z-50">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold flex items-center">
            <Brain className="w-5 h-5 mr-2 text-primary" />
            AI Assistant
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Ask about analytics or request data visualization
          </p>
        </div>
        
        <div className="h-[calc(100vh-80px)]">
          <ChatInterface 
            placeholder="Ask about analytics or request charts..."
            suggestions={[
              "Show learner performance trends as a chart",
              "Visualize skill gaps data",
              "Create a bar chart of course enrollments",
              "Show completion rates over time"
            ]}
            onVisualizationRequest={handleVisualization}
          />
        </div>
      </div>

      {/* Chart Visualization Modal */}
      <Dialog open={showChartModal} onOpenChange={setShowChartModal}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{chartTitle}</span>
              <div className="flex items-center gap-2">
                <Select value={selectedChartType} onValueChange={setSelectedChartType}>
                  <SelectTrigger className="w-32">
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
                
                <Button size="sm" variant="outline" onClick={() => exportChart('pdf')}>
                  <FileText className="w-4 h-4 mr-2" />
                  PDF
                </Button>
                
                <Button size="sm" variant="outline" onClick={() => exportChart('image')}>
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Image
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-4">
            {renderChart()}
          </div>
          
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground mb-2">Want to modify this chart? Ask the AI assistant:</p>
            <Input placeholder="e.g., 'Show this data by month instead' or 'Add completion rates to this chart'" />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;