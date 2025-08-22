import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Brain, 
  Plus, 
  Video, 
  FileText, 
  Users, 
  TrendingUp, 
  Play,
  Eye,
  BarChart3,
  Sparkles
} from "lucide-react";
import { FacultySidebar } from "@/components/FacultySidebar";
import { CourseGenerator } from "@/components/CourseGenerator";
import { CurriculumCreator } from "@/components/CurriculumCreator";
import { FacultyAIAssistant } from "@/components/FacultyAIAssistant";
import { ManualCourseCreator } from "@/components/ManualCourseCreator";
import { CourseViewer } from "@/components/CourseViewer";

const FacultyDashboard = () => {
  const [activeTab, setActiveTab] = useState("courses");
  const [viewingCourse, setViewingCourse] = useState<any>(null);
  const [editingCourse, setEditingCourse] = useState<any>(null);
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      title: "AI Fundamentals", 
      description: "Comprehensive introduction to artificial intelligence concepts and applications",
      students: 234, 
      progress: 78, 
      engagement: 92,
      status: "active",
      difficulty: "beginner",
      duration: "6-8 hours",
      targetAudience: "Professionals new to AI",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      modules: [
        { 
          id: 1, 
          title: "Introduction to AI", 
          lessons: [
            { title: "What is Artificial Intelligence?", duration: "15 min", type: "video" },
            { title: "History of AI", duration: "12 min", type: "reading" },
            { title: "AI Applications Today", duration: "18 min", type: "video" }
          ] 
        },
        { 
          id: 2, 
          title: "Machine Learning Basics", 
          lessons: [
            { title: "Introduction to ML", duration: "20 min", type: "video" },
            { title: "Types of Learning", duration: "15 min", type: "interactive" },
            { title: "First ML Project", duration: "30 min", type: "exercise" }
          ] 
        }
      ]
    },
    { 
      id: 2, 
      title: "Machine Learning Basics", 
      description: "Learn the fundamentals of machine learning algorithms and implementation",
      students: 189, 
      progress: 65, 
      engagement: 88,
      status: "active",
      difficulty: "intermediate",
      duration: "8-12 hours",
      targetAudience: "Data analysts and developers",
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      modules: [
        { 
          id: 1, 
          title: "ML Foundations", 
          lessons: [
            { title: "Statistical Learning Theory", duration: "25 min", type: "video" },
            { title: "Data Preprocessing", duration: "30 min", type: "exercise" }
          ] 
        }
      ]
    },
    { 
      id: 3, 
      title: "Neural Networks Deep Dive", 
      description: "Advanced exploration of neural network architectures and deep learning",
      students: 156, 
      progress: 45, 
      engagement: 95,
      status: "draft",
      difficulty: "advanced", 
      duration: "12-16 hours",
      targetAudience: "ML engineers and researchers",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      modules: [
        { 
          id: 1, 
          title: "Deep Learning Fundamentals", 
          lessons: [
            { title: "Neural Network Architecture", duration: "35 min", type: "video" },
            { title: "Backpropagation Algorithm", duration: "45 min", type: "video" },
            { title: "Building Your First Network", duration: "60 min", type: "exercise" }
          ] 
        }
      ]
    },
  ]);

  // Load courses from localStorage on component mount
  useState(() => {
    const storedCourses = localStorage.getItem('instructorCourses');
    if (storedCourses) {
      const parsedCourses = JSON.parse(storedCourses);
      setCourses(prev => [...prev, ...parsedCourses]);
    }
  });

  const [recentUploads] = useState([
    { id: 1, name: "Introduction to Neural Networks.mp4", size: "245 MB", status: "Processing", tags: ["AI", "Neural Networks", "Beginner"] },
    { id: 2, name: "Gradient Descent Explained.mp4", size: "189 MB", status: "Tagged", tags: ["Optimization", "Math", "Intermediate"] },
    { id: 3, name: "Backpropagation Algorithm.mp4", size: "302 MB", status: "Complete", tags: ["Deep Learning", "Advanced", "Math"] },
  ]);

  const [analytics] = useState({
    totalStudents: 579,
    avgCompletion: 76,
    avgEngagement: 91.7,
    topPerformingCourse: "AI Fundamentals"
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
          <FacultySidebar 
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        <div className="flex-1 flex flex-col">
          <header className="h-16 flex items-center border-b px-6">
            <SidebarTrigger />
            <h1 className="ml-4 text-xl font-semibold">Faculty Dashboard</h1>
          </header>
          <main className="flex-1 p-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Across all courses</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.avgCompletion}%</div>
              <p className="text-xs text-muted-foreground">+8% improvement</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.avgEngagement}%</div>
              <p className="text-xs text-muted-foreground">Above average</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Course</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{analytics.topPerformingCourse}</div>
              <p className="text-xs text-muted-foreground">Highest engagement</p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {activeTab === "courses" && (
            <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <Button 
                variant="ai"
                onClick={() => setActiveTab("manual-create")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Course
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {course.title}
                      <Badge variant={course.status === "active" ? "default" : "secondary"}>
                        {course.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{course.students} students enrolled</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Average Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Engagement Rate</span>
                        <span>{course.engagement}%</span>
                      </div>
                      <Progress value={course.engagement} className="bg-ai-accent/20" />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setViewingCourse(course)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => setEditingCourse(course)}
                      >
                        <FileText className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            </div>
          )}

          {activeTab === "create" && (
            <CourseGenerator />
          )}

          {activeTab === "curriculum" && (
            <CurriculumCreator />
          )}

          {activeTab === "manual-create" && (
            <ManualCourseCreator onBack={() => setActiveTab("courses")} />
          )}

          {viewingCourse && (
            <CourseViewer 
              course={viewingCourse} 
              onBack={() => setViewingCourse(null)}
              onEdit={() => {
                setEditingCourse(viewingCourse);
                setViewingCourse(null);
              }}
            />
          )}

          {editingCourse && (
            <ManualCourseCreator 
              onBack={() => setEditingCourse(null)}
            />
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
            <h2 className="text-2xl font-bold">Student Analytics</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Performance Comparison</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{course.title}</span>
                        <span className="text-sm text-muted-foreground">{course.students} students</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Engagement</span>
                          <span>{course.engagement}%</span>
                        </div>
                        <Progress value={course.engagement} className="h-2" />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Student Engagement Insights</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Peak Learning Hours</span>
                      <span className="font-bold">2-4 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Video Watch Time</span>
                      <span className="font-bold">89%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Quiz First Attempt Success</span>
                      <span className="font-bold">76%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discussion Participation</span>
                      <span className="font-bold">34%</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium mb-2">Recommended Actions</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Add more interactive elements to boost participation</li>
                      <li>• Consider shorter video segments for mobile learners</li>
                      <li>• Schedule live Q&A during peak hours</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
            </div>
          )}
        </div>
          </main>
          
          <FacultyAIAssistant />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default FacultyDashboard;