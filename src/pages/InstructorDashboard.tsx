import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { InstructorHeader } from "@/components/InstructorHeader";
import { CourseGenerator } from "@/components/CourseGenerator";
import { InstructorAIAssistant } from "@/components/InstructorAIAssistant";

const InstructorDashboard = () => {
  const [courses] = useState([
    { 
      id: 1, 
      title: "AI Fundamentals", 
      students: 234, 
      progress: 78, 
      engagement: 92,
      status: "active"
    },
    { 
      id: 2, 
      title: "Machine Learning Basics", 
      students: 189, 
      progress: 65, 
      engagement: 88,
      status: "active"
    },
    { 
      id: 3, 
      title: "Neural Networks Deep Dive", 
      students: 156, 
      progress: 45, 
      engagement: 95,
      status: "draft"
    },
  ]);

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
    <div className="min-h-screen bg-background">
      <InstructorHeader />
      
      <main className="p-6">
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

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="create">AI Course Creator</TabsTrigger>
            <TabsTrigger value="videos">Video Library</TabsTrigger>
            <TabsTrigger value="analytics">Student Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">My Courses</h2>
              <Button variant="ai">
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
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <FileText className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="create">
            <CourseGenerator />
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Video Library & AI Tagging</h2>
              <Button variant="ai">
                <Video className="w-4 h-4 mr-2" />
                Upload Video
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-ai-primary" />
                  Recent Uploads & AI Analysis
                </CardTitle>
                <CardDescription>
                  AI automatically transcribes and tags your videos for better searchability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUploads.map((upload) => (
                    <div key={upload.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-ai-primary/10 rounded-lg flex items-center justify-center">
                          <Video className="w-6 h-6 text-ai-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium">{upload.name}</h4>
                          <p className="text-sm text-muted-foreground">{upload.size}</p>
                          <div className="flex space-x-1 mt-2">
                            {upload.tags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={upload.status === "Complete" ? "default" : "secondary"}
                          className={upload.status === "Processing" ? "bg-ai-warning text-white" : ""}
                        >
                          {upload.status}
                        </Badge>
                        <div className="mt-2">
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4 mr-1" />
                            Preview
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
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
          </TabsContent>
        </Tabs>
      </main>
      
      <InstructorAIAssistant />
    </div>
  );
};

export default InstructorDashboard;