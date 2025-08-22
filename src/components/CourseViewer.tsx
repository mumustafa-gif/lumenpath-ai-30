import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  ArrowLeft,
  Play,
  FileText,
  Users,
  Clock,
  Star,
  TrendingUp,
  Award,
  BarChart3,
  MessageSquare,
  Download,
  Eye,
  CheckCircle
} from "lucide-react";

interface CourseViewerProps {
  course: any;
  onBack: () => void;
  onEdit?: () => void;
}

export const CourseViewer = ({ course, onBack, onEdit }: CourseViewerProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock additional data for demonstration
  const mockAnalytics = {
    totalViews: Math.floor(Math.random() * 1000) + 500,
    enrollments: Math.floor(Math.random() * 200) + 100,
    completionRate: Math.floor(Math.random() * 30) + 65,
    averageRating: (Math.random() * 1.5 + 3.5).toFixed(1),
    totalReviews: Math.floor(Math.random() * 50) + 25,
    revenueGenerated: Math.floor(Math.random() * 5000) + 2000,
    weeklyEnrollments: [12, 18, 15, 22, 28, 34, 29],
    topPerformingLessons: ["Introduction to Concepts", "Practical Applications", "Advanced Techniques"],
    studentFeedback: [
      { name: "Sarah Johnson", rating: 5, comment: "Excellent course! Very comprehensive and well-structured." },
      { name: "Mike Chen", rating: 4, comment: "Great content, would recommend to colleagues." },
      { name: "Emily Davis", rating: 5, comment: "Perfect for beginners, clear explanations." }
    ]
  };

  const mockStudents = [
    { id: 1, name: "Alice Wilson", progress: 85, lastActive: "2 hours ago", grade: "A" },
    { id: 2, name: "Bob Thompson", progress: 67, lastActive: "1 day ago", grade: "B+" },
    { id: 3, name: "Carol Martinez", progress: 92, lastActive: "30 min ago", grade: "A+" },
    { id: 4, name: "David Lee", progress: 45, lastActive: "3 days ago", grade: "C+" },
    { id: 5, name: "Eva Rodriguez", progress: 78, lastActive: "5 hours ago", grade: "B" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button onClick={onBack} variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <CardTitle className="text-2xl">{course.title}</CardTitle>
                <CardDescription className="mt-2">{course.description}</CardDescription>
              </div>
            </div>
            {onEdit && (
              <Button onClick={onEdit} className="bg-ai-primary hover:bg-ai-primary/90">
                <FileText className="w-4 h-4 mr-2" />
                Edit Course
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 border rounded-lg">
              <div className="font-semibold text-2xl text-blue-600">{mockAnalytics.enrollments}</div>
              <div className="text-sm text-muted-foreground">Students Enrolled</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="font-semibold text-2xl text-green-600">{mockAnalytics.completionRate}%</div>
              <div className="text-sm text-muted-foreground">Completion Rate</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="font-semibold text-2xl text-yellow-600">{mockAnalytics.averageRating}</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="font-semibold text-2xl text-purple-600">${mockAnalytics.revenueGenerated}</div>
              <div className="text-sm text-muted-foreground">Revenue</div>
            </div>
          </div>

          {/* Course Status */}
          <div className="flex items-center space-x-4 mb-6">
            <Badge variant="default" className="bg-green-600">
              {course.status || 'Published'}
            </Badge>
            <Badge variant="outline">
              {course.difficulty || 'Intermediate'}
            </Badge>
            <Badge variant="outline">
              {course.duration || '6-8 hours'}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Created: {new Date(course.createdAt || Date.now()).toLocaleDateString()}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Tabs */}
      <Card>
        <CardContent className="p-0">
          <div className="border-b">
            <div className="flex space-x-8 px-6">
              {[
                { id: "overview", label: "Overview", icon: Eye },
                { id: "content", label: "Content", icon: FileText },
                { id: "students", label: "Students", icon: Users },
                { id: "analytics", label: "Analytics", icon: BarChart3 },
                { id: "reviews", label: "Reviews", icon: MessageSquare }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-2 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? "border-ai-primary text-ai-primary"
                        : "border-transparent text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4 inline mr-2" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Course Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Target Audience:</span>
                        <p>{course.targetAudience || "Professionals and students"}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Prerequisites:</span>
                        <p>{course.prerequisites || "Basic understanding of the subject"}</p>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-muted-foreground">Learning Outcomes:</span>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          {course.learningOutcomes?.map((outcome: string, index: number) => (
                            <li key={index} className="text-sm">{outcome}</li>
                          )) || [
                            "Master fundamental concepts",
                            "Apply knowledge in real scenarios",
                            "Develop practical skills"
                          ].map((outcome, index) => (
                            <li key={index} className="text-sm">{outcome}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Quick Stats</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Total Modules:</span>
                        <span className="font-medium">{course.modules?.length || 4}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Lessons:</span>
                        <span className="font-medium">
                          {course.modules?.reduce((acc: number, module: any) => acc + (module.lessons?.length || 0), 0) || 16}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Estimated Duration:</span>
                        <span className="font-medium">{course.duration || course.estimatedCompletion || "6-8 hours"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Language:</span>
                        <span className="font-medium">English</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Certificate:</span>
                        <span className="font-medium text-green-600">✓ Included</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "content" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Course Content</h3>
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {course.modules?.map((module: any, moduleIndex: number) => (
                      <Card key={module.id || moduleIndex}>
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <span className="w-8 h-8 bg-ai-primary text-white rounded-full flex items-center justify-center text-sm mr-3">
                              {moduleIndex + 1}
                            </span>
                            {module.title}
                          </CardTitle>
                          <CardDescription>
                            {module.lessons?.length || 4} lessons • {module.duration || "60 min"}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {module.lessons?.map((lesson: any, lessonIndex: number) => (
                              <div key={lessonIndex} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <Play className="w-4 h-4 text-ai-primary" />
                                  <div>
                                    <div className="font-medium">{lesson.title}</div>
                                    <div className="text-sm text-muted-foreground">{lesson.type} • {lesson.duration}</div>
                                  </div>
                                </div>
                                <Badge variant="outline" className="text-xs">
                                  {lesson.type}
                                </Badge>
                              </div>
                            )) || Array.from({ length: 4 }, (_, i) => (
                              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                                <div className="flex items-center space-x-3">
                                  <Play className="w-4 h-4 text-ai-primary" />
                                  <div>
                                    <div className="font-medium">Lesson {i + 1}</div>
                                    <div className="text-sm text-muted-foreground">Video • 15 min</div>
                                  </div>
                                </div>
                                <Badge variant="outline" className="text-xs">video</Badge>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )) || Array.from({ length: 4 }, (_, i) => (
                      <Card key={i}>
                        <CardHeader>
                          <CardTitle className="flex items-center text-lg">
                            <span className="w-8 h-8 bg-ai-primary text-white rounded-full flex items-center justify-center text-sm mr-3">
                              {i + 1}
                            </span>
                            Module {i + 1}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {activeTab === "students" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Enrolled Students ({mockStudents.length})</h3>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export List
                  </Button>
                </div>
                <div className="space-y-3">
                  {mockStudents.map((student) => (
                    <Card key={student.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-ai-primary text-white rounded-full flex items-center justify-center font-medium">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">Last active: {student.lastActive}</div>
                            </div>
                          </div>
                          <div className="text-right space-y-2">
                            <div className="flex items-center space-x-4">
                              <div className="text-sm">
                                <span className="font-medium">{student.progress}%</span> complete
                              </div>
                              <Badge variant={student.grade.startsWith('A') ? 'default' : 'outline'}>
                                {student.grade}
                              </Badge>
                            </div>
                            <Progress value={student.progress} className="w-32" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Course Analytics</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Engagement Metrics
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Video Completion Rate</span>
                          <span>87%</span>
                        </div>
                        <Progress value={87} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Quiz Participation</span>
                          <span>92%</span>
                        </div>
                        <Progress value={92} />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span>Discussion Posts</span>
                          <span>64%</span>
                        </div>
                        <Progress value={64} />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Star className="w-5 h-5 mr-2" />
                        Performance Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Average Session Time</span>
                        <span className="font-medium">42 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Course Rating</span>
                        <span className="font-medium">{mockAnalytics.averageRating} ⭐</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Reviews</span>
                        <span className="font-medium">{mockAnalytics.totalReviews}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue Generated</span>
                        <span className="font-medium text-green-600">${mockAnalytics.revenueGenerated}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">Student Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{mockAnalytics.averageRating}</span>
                    <span className="text-muted-foreground">({mockAnalytics.totalReviews} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {mockAnalytics.studentFeedback.map((review, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="font-medium">{review.name}</div>
                            <div className="flex items-center mt-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">2 days ago</span>
                        </div>
                        <p className="text-sm">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};