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
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChatInterface } from "@/components/ChatInterface";

interface CoursePreviewProps {
  course: any;
  onClose: () => void;
}

export const CoursePreview = ({ course, onClose }: CoursePreviewProps) => {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [enrollmentProgress, setEnrollmentProgress] = useState(45);
  const [expandedLessons, setExpandedLessons] = useState<number[]>([]);
  const [aiTutorOpen, setAiTutorOpen] = useState(false);

  const mockLearnerData = {
    name: "Ahmad Al-Rashid",
    progress: 45,
    completedModules: 2,
    currentStreak: 7,
    points: 850,
    badges: ["Quick Learner", "Problem Solver", "Theory Master"],
    timeSpent: "12h 30m",
    averageScore: 87,
    studyBuddies: ["Fatima Al-Zahra", "Omar Al-Hashmi"]
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
      },
      moduleContent: generateModuleContent(module.title)
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

  function generateModuleContent(moduleTitle: string) {
    return {
      overview: `This module provides a comprehensive introduction to ${moduleTitle}. You'll learn fundamental concepts, practical applications, and industry best practices. The content is designed to build your expertise progressively through theoretical understanding and hands-on practice.`,
      keyTopics: [
        `Core principles of ${moduleTitle}`,
        "Industry standards and best practices", 
        "Real-world implementation strategies",
        "Common challenges and solutions",
        "Future trends and developments"
      ],
      learningOutcomes: [
        `Understand the fundamental concepts of ${moduleTitle}`,
        "Apply theoretical knowledge to practical scenarios",
        "Analyze complex problems and develop solutions",
        "Evaluate different approaches and methodologies"
      ]
    };
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

  const toggleLessonExpansion = (lessonIndex: number) => {
    setExpandedLessons(prev => 
      prev.includes(lessonIndex) 
        ? prev.filter(id => id !== lessonIndex)
        : [...prev, lessonIndex]
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
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
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
                {/* Removed AI Tutor button for instructor view */}
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
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      {/* Module Overview */}
                      <Card className="p-4 bg-gradient-to-r from-ai-primary/5 to-ai-secondary/5 border-ai-primary/20">
                        <h4 className="font-semibold mb-2 flex items-center">
                          <BookOpen className="w-4 h-4 mr-2 text-ai-primary" />
                          Module Overview
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {mockFullContent.modules[currentModule]?.moduleContent?.overview}
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-sm mb-2">Key Topics:</h5>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {mockFullContent.modules[currentModule]?.moduleContent?.keyTopics?.map((topic: string, i: number) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <span className="w-1 h-1 bg-ai-primary rounded-full mt-1.5 flex-shrink-0" />
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="font-medium text-sm mb-2">Learning Outcomes:</h5>
                            <ul className="text-xs text-muted-foreground space-y-1">
                              {mockFullContent.modules[currentModule]?.moduleContent?.learningOutcomes?.map((outcome: string, i: number) => (
                                <li key={i} className="flex items-start space-x-2">
                                  <Target className="w-3 h-3 text-ai-success mt-0.5 flex-shrink-0" />
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </Card>

                      {/* Lessons */}
                      {mockFullContent.modules[currentModule]?.content.lessons.map((lesson: any, index: number) => (
                        <Card key={index} className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start space-x-3 flex-1">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                lesson.completed ? 'bg-ai-success text-white' : 'bg-muted'
                              }`}>
                                {lesson.type === 'video' && <Video className="w-4 h-4" />}
                                {lesson.type === 'interactive' && <Lightbulb className="w-4 h-4" />}
                                {lesson.type === 'case_study' && <FileText className="w-4 h-4" />}
                                {lesson.type === 'hands_on' && <PenTool className="w-4 h-4" />}
                                {lesson.type === 'simulation' && <Settings className="w-4 h-4" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between">
                                  <h4 className="font-medium cursor-pointer hover:text-ai-primary" onClick={() => toggleLessonExpansion(index)}>
                                    {lesson.title}
                                  </h4>
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => toggleLessonExpansion(index)}
                                    className="p-1 h-auto"
                                  >
                                    {expandedLessons.includes(index) ? 
                                      <ChevronUp className="w-4 h-4" /> : 
                                      <ChevronDown className="w-4 h-4" />
                                    }
                                  </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">{lesson.content?.description}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                  <Badge variant="outline" className="text-xs">{lesson.duration}</Badge>
                                  <Badge variant={lesson.completed ? "default" : "secondary"} className="text-xs">
                                    {lesson.completed ? "Completed" : "Not Started"}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2 ml-2">
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
                          
                          {/* Expanded Lesson Details */}
                          {expandedLessons.includes(index) && (
                            <div className="mt-4 space-y-3 border-t pt-3">
                              {lesson.type === 'video' && lesson.content && (
                                <div className="p-3 bg-muted/30 rounded">
                                  <h5 className="font-medium text-sm mb-2">Video Content:</h5>
                                  <p className="text-xs text-muted-foreground mb-2">{lesson.content.transcript?.substring(0, 300)}...</p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                      <Clock className="w-3 h-3" />
                                      <span className="text-xs">{lesson.content.duration}</span>
                                    </div>
                                    {lesson.content.resources && (
                                      <div className="text-xs text-muted-foreground">
                                        Resources: {lesson.content.resources.join(', ')}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {lesson.type === 'interactive' && lesson.content && (
                                <div className="p-3 bg-muted/30 rounded">
                                  <h5 className="font-medium text-sm mb-2">Interactive Activities:</h5>
                                  <ul className="text-xs text-muted-foreground space-y-1">
                                    {lesson.content.activities?.map((activity: string, i: number) => (
                                      <li key={i} className="flex items-center space-x-2">
                                        <Lightbulb className="w-3 h-3 text-ai-primary" />
                                        <span>{activity}</span>
                                      </li>
                                    ))}
                                  </ul>
                                  <p className="text-xs text-muted-foreground mt-2">
                                    Estimated time: {lesson.content.estimatedTime}
                                  </p>
                                </div>
                              )}

                              {lesson.type === 'case_study' && lesson.content && (
                                <div className="p-3 bg-muted/30 rounded">
                                  <h5 className="font-medium text-sm mb-2">Case Study: {lesson.content.company}</h5>
                                  <p className="text-xs text-muted-foreground mb-2">{lesson.content.scenario}</p>
                                  <div>
                                    <p className="text-xs font-medium mb-1">Discussion Questions:</p>
                                    <ul className="text-xs text-muted-foreground space-y-1">
                                      {lesson.content.questions?.map((question: string, i: number) => (
                                        <li key={i}>• {question}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              )}

                              {lesson.type === 'hands_on' && lesson.content && (
                                <div className="p-3 bg-muted/30 rounded">
                                  <h5 className="font-medium text-sm mb-2">Hands-on Workshop:</h5>
                                  <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div>
                                      <p className="font-medium mb-1">Tools:</p>
                                      <ul className="text-muted-foreground space-y-1">
                                        {lesson.content.tools?.map((tool: string, i: number) => (
                                          <li key={i}>• {tool}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div>
                                      <p className="font-medium mb-1">Deliverables:</p>
                                      <ul className="text-muted-foreground space-y-1">
                                        {lesson.content.deliverables?.map((deliverable: string, i: number) => (
                                          <li key={i}>• {deliverable}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="quiz" className="flex-1 m-4 mt-4">
                  <ScrollArea className="h-[500px]">
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
                  </ScrollArea>
                 </TabsContent>

                <TabsContent value="case-study" className="flex-1 m-4 mt-4">
                  <ScrollArea className="h-[500px]">
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
                  </ScrollArea>
                 </TabsContent>

                 <TabsContent value="analytics" className="flex-1 m-4 mt-4">
                  <ScrollArea className="h-[500px]">
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
                  </ScrollArea>
                 </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};