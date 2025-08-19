import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Target
} from "lucide-react";
import { AdminHeader } from "@/components/AdminHeader";
import { ChatInterface } from "@/components/ChatInterface";

const AdminDashboard = () => {
  const [aiQuery, setAiQuery] = useState("");
  
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
    { name: "AI Fundamentals", enrolled: 234, completed: 182, avgScore: 87 },
    { name: "Data Science", enrolled: 189, completed: 156, avgScore: 91 },
    { name: "Cloud Computing", enrolled: 156, completed: 98, avgScore: 79 },
    { name: "DevOps", enrolled: 134, completed: 112, avgScore: 84 },
  ];

  const handleAiQuery = () => {
    // Mock AI response - in real app would call AI service
    console.log("AI Query:", aiQuery);
    setAiQuery("");
  };

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      
      <main className="p-6">
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

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="ai-chat">AI Assistant</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="alerts">Risk Management</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Course Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Course Performance</CardTitle>
                  <CardDescription>Enrollment and completion rates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courseAnalytics.map((course) => (
                    <div key={course.name} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{course.name}</span>
                        <Badge variant="secondary">{course.avgScore}% avg</Badge>
                      </div>
                      <Progress value={(course.completed / course.enrolled) * 100} />
                      <div className="text-sm text-muted-foreground">
                        {course.completed}/{course.enrolled} completed
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* At-Risk Learners */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2 text-ai-warning" />
                    At-Risk Learners
                  </CardTitle>
                  <CardDescription>Learners requiring immediate attention</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-chat">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-ai-primary" />
                  AI Assistant Chat
                </CardTitle>
                <CardDescription>
                  Ask your AI assistant anything about system analytics, learner performance, or course insights
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChatInterface 
                  placeholder="Ask about learner performance, course analytics, system insights..."
                  suggestions={[
                    "Show all learners with >50% dropout risk",
                    "Which instructors have lowest engagement?",
                    "Give me weekly quiz failure trends in DevOps",
                    "What are the top skill gaps in our organization?"
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Learning Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Mobile Learning</span>
                      <span className="font-bold">+23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Video Engagement</span>
                      <span className="font-bold">+18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quiz Completion</span>
                      <span className="font-bold">+12%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Skill Gaps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Cloud Computing</span>
                        <span className="text-ai-warning">Critical</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Data Science</span>
                        <span className="text-ai-info">Moderate</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>AI/ML</span>
                        <span className="text-ai-success">Good</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Certification Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Due This Month</span>
                      <Badge variant="secondary" className="bg-ai-warning text-white">47</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Overdue</span>
                      <Badge variant="destructive">12</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Completed</span>
                      <Badge variant="secondary" className="bg-ai-success text-white">234</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="alerts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-ai-warning" />
                  Risk Management & Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h4 className="font-semibold text-red-800">High Dropout Risk</h4>
                    <p className="text-sm text-red-600 mt-1">15 learners haven't accessed content in 5+ days</p>
                    <Button size="sm" variant="destructive" className="mt-2">
                      Take Action
                    </Button>
                  </div>
                  
                  <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50">
                    <h4 className="font-semibold text-yellow-800">Low Engagement</h4>
                    <p className="text-sm text-yellow-600 mt-1">Cloud Computing course has 40% engagement rate</p>
                    <Button size="sm" className="mt-2 bg-ai-warning text-white hover:bg-ai-warning/90">
                      Review Course
                    </Button>
                  </div>
                  
                  <div className="p-4 border border-blue-200 rounded-lg bg-blue-50">
                    <h4 className="font-semibold text-blue-800">Certification Expiry</h4>
                    <p className="text-sm text-blue-600 mt-1">47 certifications expire this month</p>
                    <Button size="sm" className="mt-2 bg-ai-info text-white hover:bg-ai-info/90">
                      Send Reminders
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;