import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Play, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Users, 
  Target,
  Video,
  FileText,
  Brain,
  Lightbulb,
  PenTool,
  Settings,
  Star,
  Award,
  TrendingUp,
  MessageSquare,
  Download,
  Share
} from "lucide-react";

interface CoursePreviewProps {
  course: any;
  onClose: () => void;
}

export const CoursePreview = ({ course, onClose }: CoursePreviewProps) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [enrollmentProgress, setEnrollmentProgress] = useState(45);

  const mockLearnerData = {
    name: "Alex Johnson",
    progress: 45,
    completedModules: 2,
    currentStreak: 7,
    points: 850,
    badges: ["Quick Learner", "Problem Solver", "Theory Master"],
    timeSpent: "12h 30m",
    averageScore: 87,
    studyBuddies: ["Sarah Chen", "Mike Rodriguez"]
  };

  const mockFullContent = {
    modules: course.modules.map((module: any, moduleIndex: number) => ({
      ...module,
      content: {
        lessons: module.lessons.map((lesson: any, lessonIndex: number) => ({
          ...lesson,
          content: generateLessonContent(lesson.title, lesson.type),
          completed: moduleIndex < 2 || (moduleIndex === 2 && lessonIndex < 2)
        })),
        quiz: {
          ...module.quiz,
          questions: generateQuizQuestions(module.title, module.quiz.questions)
        }
      }
    }))
  };

  function generateLessonContent(title: string, type: string) {
    const baseContent = {
      video: {
        description: `Comprehensive video lesson covering ${title}`,
        duration: "15:30",
        transcript: `Welcome to this lesson on ${title}. In this video, we'll explore the fundamental concepts, practical applications, and real-world examples. We'll start with the basic definitions and gradually build up to more complex scenarios...`,
        resources: ["Slide deck", "Code examples", "Additional reading"]
      },
      interactive: {
        description: `Interactive simulation for ${title}`,
        activities: ["Drag-and-drop exercise", "Virtual lab", "Interactive quiz"],
        estimatedTime: "20 minutes"
      },
      case_study: {
        description: `Real-world case study: ${title}`,
        company: "Fortune 500 Company",
        scenario: `Detailed analysis of how a major company implemented ${title} strategies...`,
        questions: ["What were the key challenges?", "How did they measure success?", "What would you do differently?"]
      },
      hands_on: {
        description: `Practical workshop for ${title}`,
        tools: ["Code editor", "Simulation environment", "Testing framework"],
        deliverables: ["Working prototype", "Test results", "Documentation"]
      }
    };

    return baseContent[type as keyof typeof baseContent] || baseContent.video;
  }

  function generateQuizQuestions(moduleTitle: string, count: number) {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      question: `Which concept best applies to ${moduleTitle} in scenario ${i + 1}?`,
      options: [
        "Primary theoretical framework",
        "Secondary supporting concept", 
        "Practical implementation approach",
        "Alternative methodology"
      ],
      correct: 0,
      explanation: `This question tests your understanding of core ${moduleTitle} principles.`
    }));
  }

  const toggleLessonComplete = (moduleIndex: number, lessonIndex: number) => {
    const lessonId = moduleIndex * 100 + lessonIndex;
    setCompletedLessons(prev => 
      prev.includes(lessonId) 
        ? prev.filter(id => id !== lessonId)
        : [...prev, lessonId]
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <BookOpen className="w-5 h-5 text-ai-primary" />
            <div>
              <h2 className="text-lg font-semibold">Course Preview</h2>
              <p className="text-sm text-muted-foreground">Learner Experience View</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-1" />
              Share Preview
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Learner Dashboard Sidebar */}
          <div className="w-80 border-r bg-muted/30 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-ai-primary to-ai-secondary flex items-center justify-center text-white font-semibold">
                  AJ
                </div>
                <div>
                  <p className="font-medium">{mockLearnerData.name}</p>
                  <p className="text-sm text-muted-foreground">Learner</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Course Progress</span>
                    <span>{mockLearnerData.progress}%</span>
                  </div>
                  <Progress value={mockLearnerData.progress} className="h-2" />
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-card rounded">
                    <p className="text-xs text-muted-foreground">Streak</p>
                    <p className="font-semibold text-ai-primary">{mockLearnerData.currentStreak}</p>
                  </div>
                  <div className="p-2 bg-card rounded">
                    <p className="text-xs text-muted-foreground">Points</p>
                    <p className="font-semibold text-ai-success">{mockLearnerData.points}</p>
                  </div>
                  <div className="p-2 bg-card rounded">
                    <p className="text-xs text-muted-foreground">Avg Score</p>
                    <p className="font-semibold text-ai-accent">{mockLearnerData.averageScore}%</p>
                  </div>
                </div>
              </div>
            </div>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Course Modules
                  </h4>
                  <div className="space-y-2">
                    {mockFullContent.modules.map((module: any, index: number) => (
                      <Card 
                        key={index} 
                        className={`p-3 cursor-pointer transition-colors ${
                          currentModule === index ? 'ring-2 ring-ai-primary' : ''
                        }`}
                        onClick={() => setCurrentModule(index)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h5 className="font-medium text-sm">Module {index + 1}</h5>
                            <p className="text-xs text-muted-foreground line-clamp-2">{module.title}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs">{module.duration}</Badge>
                              {index < mockLearnerData.completedModules && (
                                <CheckCircle className="w-4 h-4 text-ai-success" />
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Award className="w-4 h-4 mr-2" />
                    Achievements
                  </h4>
                  <div className="space-y-2">
                    {mockLearnerData.badges.map((badge, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-ai-primary/10 rounded">
                        <Star className="w-4 h-4 text-ai-primary" />
                        <span className="text-sm">{badge}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2 flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    Study Buddies
                  </h4>
                  <div className="space-y-2">
                    {mockLearnerData.studyBuddies.map((buddy, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-card rounded">
                        <div className="w-6 h-6 rounded-full bg-ai-secondary/20 flex items-center justify-center text-xs">
                          {buddy.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="text-sm">{buddy}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Module {currentModule + 1}: {mockFullContent.modules[currentModule]?.title}</h3>
                  <p className="text-sm text-muted-foreground">{mockFullContent.modules[currentModule]?.duration} • {mockFullContent.modules[currentModule]?.lessons.length} lessons</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Download className="w-4 h-4 mr-1" />
                    Resources
                  </Button>
                  <Button size="sm" variant="ai">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    Ask AI Tutor
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-hidden">
              <Tabs defaultValue="lessons" className="h-full flex flex-col">
                <TabsList className="mx-4 mt-4">
                  <TabsTrigger value="lessons">Lessons</TabsTrigger>
                  <TabsTrigger value="quiz">Assessment</TabsTrigger>
                  <TabsTrigger value="case-study">Case Study</TabsTrigger>
                  <TabsTrigger value="analytics">My Progress</TabsTrigger>
                </TabsList>

                <TabsContent value="lessons" className="flex-1 m-4 mt-4">
                  <ScrollArea className="h-full">
                    <div className="space-y-4">
                      {mockFullContent.modules[currentModule]?.content.lessons.map((lesson: any, index: number) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                lesson.completed ? 'bg-ai-success text-white' : 'bg-muted'
                              }`}>
                                {lesson.type === 'video' && <Video className="w-4 h-4" />}
                                {lesson.type === 'interactive' && <Lightbulb className="w-4 h-4" />}
                                {lesson.type === 'case_study' && <FileText className="w-4 h-4" />}
                                {lesson.type === 'hands_on' && <PenTool className="w-4 h-4" />}
                                {lesson.type === 'simulation' && <Settings className="w-4 h-4" />}
                              </div>
                              <div>
                                <h4 className="font-medium">{lesson.title}</h4>
                                <p className="text-sm text-muted-foreground">{lesson.content?.description}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Badge variant="outline" className="text-xs">{lesson.duration}</Badge>
                                  <Badge variant={lesson.completed ? "default" : "secondary"} className="text-xs">
                                    {lesson.completed ? "Completed" : "Not Started"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant={lesson.completed ? "outline" : "default"}
                                onClick={() => toggleLessonComplete(currentModule, index)}
                              >
                                {lesson.completed ? (
                                  <>
                                    <CheckCircle className="w-4 h-4 mr-1" />
                                    Review
                                  </>
                                ) : (
                                  <>
                                    <Play className="w-4 h-4 mr-1" />
                                    Start
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>
                          
                          {lesson.type === 'video' && lesson.content && (
                            <div className="mt-3 p-3 bg-muted/50 rounded">
                              <p className="text-sm mb-2">Video Content Preview:</p>
                              <p className="text-xs text-muted-foreground">{lesson.content.transcript?.substring(0, 200)}...</p>
                              <div className="flex items-center space-x-2 mt-2">
                                <Clock className="w-3 h-3" />
                                <span className="text-xs">{lesson.content.duration}</span>
                              </div>
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="quiz" className="flex-1 m-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Module Assessment</span>
                        <Badge variant="ai">{mockFullContent.modules[currentModule]?.content.quiz.questions.length} Questions</Badge>
                      </CardTitle>
                      <CardDescription>
                        Test your understanding of the module concepts
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="p-3 bg-muted/50 rounded">
                            <p className="text-sm font-medium">Questions</p>
                            <p className="text-lg text-ai-primary">{mockFullContent.modules[currentModule]?.quiz.questions}</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded">
                            <p className="text-sm font-medium">Time Limit</p>
                            <p className="text-lg text-ai-accent">45 min</p>
                          </div>
                          <div className="p-3 bg-muted/50 rounded">
                            <p className="text-sm font-medium">Passing Score</p>
                            <p className="text-lg text-ai-success">{mockFullContent.modules[currentModule]?.quiz.passingScore}%</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <h4 className="font-medium">Sample Question:</h4>
                          <Card className="p-4">
                            <p className="mb-3">{mockFullContent.modules[currentModule]?.content.quiz.questions[0]?.question}</p>
                            <div className="space-y-2">
                              {mockFullContent.modules[currentModule]?.content.quiz.questions[0]?.options.map((option: string, i: number) => (
                                <div key={i} className="flex items-center space-x-2 p-2 border rounded hover:bg-muted/50 cursor-pointer">
                                  <div className="w-4 h-4 border rounded-full" />
                                  <span className="text-sm">{String.fromCharCode(65 + i)}. {option}</span>
                                </div>
                              ))}
                            </div>
                          </Card>
                        </div>
                        
                        <Button className="w-full">
                          <Brain className="w-4 h-4 mr-2" />
                          Start Assessment
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="case-study" className="flex-1 m-4 mt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>{mockFullContent.modules[currentModule]?.caseStudy.title}</CardTitle>
                      <CardDescription>Real-world application of module concepts</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Scenario</h4>
                        <p className="text-sm text-muted-foreground">{mockFullContent.modules[currentModule]?.caseStudy.scenario}</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Deliverables</h4>
                        <ul className="space-y-1">
                          {mockFullContent.modules[currentModule]?.caseStudy.deliverables.map((deliverable: string, index: number) => (
                            <li key={index} className="flex items-center space-x-2 text-sm">
                              <Target className="w-4 h-4 text-ai-primary" />
                              <span>{deliverable}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <Button variant="ai" className="w-full">
                        <FileText className="w-4 h-4 mr-2" />
                        Start Case Study
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics" className="flex-1 m-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Learning Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Overall Progress</span>
                              <span>{mockLearnerData.progress}%</span>
                            </div>
                            <Progress value={mockLearnerData.progress} />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="text-center">
                              <p className="text-2xl font-bold text-ai-primary">{mockLearnerData.timeSpent}</p>
                              <p className="text-xs text-muted-foreground">Time Spent</p>
                            </div>
                            <div className="text-center">
                              <p className="text-2xl font-bold text-ai-success">{mockLearnerData.averageScore}%</p>
                              <p className="text-xs text-muted-foreground">Avg Score</p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Star className="w-4 h-4 mr-2" />
                          Achievements
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {mockLearnerData.badges.map((badge, index) => (
                            <div key={index} className="flex items-center space-x-2 p-2 bg-ai-primary/10 rounded">
                              <Award className="w-4 h-4 text-ai-primary" />
                              <span className="text-sm">{badge}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};