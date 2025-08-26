import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Play, 
  FileText, 
  CheckCircle, 
  Clock, 
  Users, 
  BookOpen,
  Brain,
  Target,
  Trophy,
  Video,
  Download,
  Share2,
  Star,
  ChevronRight,
  Lightbulb,
  PenTool,
  MessageSquare,
  Plus,
  Sparkles
} from "lucide-react";
import { AssessmentGenerator } from "./AssessmentGenerator";

interface ModuleContent {
  id: string;
  title: string;
  type: 'lesson' | 'quiz' | 'assignment' | 'project';
  duration: string;
  content: {
    overview: string;
    objectives: string[];
    materials: string[];
    activities: string[];
    assessments: {
      type: string;
      questions: {
        question: string;
        options?: string[];
        correct?: number;
        explanation?: string;
        points?: number;
      }[];
    }[];
  };
  completed?: boolean;
}

interface FullCourseViewProps {
  course: any;
  onClose: () => void;
}

export const FullCourseView = ({ course, onClose }: FullCourseViewProps) => {
  const [selectedModule, setSelectedModule] = useState<ModuleContent | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [showAssessmentGenerator, setShowAssessmentGenerator] = useState(false);
  const [selectedModuleForAssessment, setSelectedModuleForAssessment] = useState<string | null>(null);
  const [courseAssessments, setCourseAssessments] = useState<any>({});
  const [editingAssessment, setEditingAssessment] = useState<any>(null);
  const [isSavingCourse, setIsSavingCourse] = useState(false);

  // Generate detailed module content
  const generateModuleContent = (moduleTitle: string, index: number): ModuleContent => {
    const types: ('lesson' | 'quiz' | 'assignment' | 'project')[] = ['lesson', 'quiz', 'assignment', 'project'];
    const type = types[index % types.length];
    
    return {
      id: `module-${index}`,
      title: moduleTitle,
      type,
      duration: `${Math.floor(Math.random() * 90) + 30} minutes`,
      content: {
        overview: `This ${type} covers comprehensive understanding of ${moduleTitle}. Students will explore key concepts, practical applications, and real-world scenarios relevant to the UAE market and local business environment.`,
        objectives: [
          `Understand the fundamental principles of ${moduleTitle}`,
          `Apply theoretical knowledge to practical scenarios`,
          `Analyze case studies from UAE and regional markets`,
          `Develop critical thinking skills in this domain`,
          `Create actionable solutions for real-world problems`
        ],
        materials: [
          `Interactive presentation slides (${Math.floor(Math.random() * 20) + 15} slides)`,
          `Video lectures with UAE industry experts`,
          `Downloadable resources and templates`,
          `Case study materials from local companies`,
          `Additional reading materials and research papers`
        ],
        activities: [
          `Interactive simulations and virtual labs`,
          `Group discussions and peer collaboration`,
          `Hands-on exercises and practical workshops`,
          `Problem-solving scenarios based on UAE context`,
          `Project-based learning with real deliverables`
        ],
        assessments: [
          {
            type: "Multiple Choice Quiz",
            questions: [
              {
                question: `Which approach best demonstrates understanding of ${moduleTitle} in the context of UAE business environment?`,
                options: [
                  "Focus solely on international best practices",
                  "Adapt global strategies to local market conditions and cultural considerations",
                  "Ignore local regulations and cultural factors",
                  "Apply one-size-fits-all solutions"
                ],
                correct: 1,
                explanation: "Success in the UAE market requires adapting international strategies to local conditions, cultural considerations, and regulatory requirements."
              },
              {
                question: `What is the most important factor when implementing ${moduleTitle} strategies in Dubai's business ecosystem?`,
                options: [
                  "Cost reduction only",
                  "Speed of implementation",
                  "Cultural sensitivity and stakeholder engagement",
                  "Technology adoption without consideration"
                ],
                correct: 2,
                explanation: "Dubai's diverse business environment requires cultural sensitivity and effective stakeholder engagement for successful strategy implementation."
              }
            ]
          },
          {
            type: "Short Answer Questions",
            questions: [
              {
                question: `Analyze how ${moduleTitle} principles can be applied to enhance business operations in the UAE. Provide specific examples from at least two emirates.`,
                points: 15,
                explanation: "This question assesses practical application skills and understanding of regional business dynamics across different emirates."
              },
              {
                question: `Design a implementation plan for ${moduleTitle} that considers the unique aspects of the UAE market, including cultural, economic, and technological factors.`,
                points: 20,
                explanation: "This evaluates strategic thinking and ability to create contextually appropriate solutions for the UAE market."
              }
            ]
          }
        ]
      },
      completed: Math.random() > 0.7
    };
  };

  const moduleContents = course.modules?.map((module: string, index: number) => 
    generateModuleContent(module, index)
  ) || [];

  const completedModules = moduleContents.filter(m => m.completed).length;
  const progressPercentage = (completedModules / moduleContents.length) * 100;

  const handleModuleClick = (module: ModuleContent) => {
    setSelectedModule(module);
    setActiveTab("content");
  };

  const handleAddAssessment = (moduleId: string) => {
    setSelectedModuleForAssessment(moduleId);
    setShowAssessmentGenerator(true);
  };

  const handleAssessmentGenerated = (assessment: any) => {
    if (selectedModuleForAssessment) {
      setCourseAssessments(prev => ({
        ...prev,
        [selectedModuleForAssessment]: assessment
      }));
    }
    setShowAssessmentGenerator(false);
    setSelectedModuleForAssessment(null);
  };

  const handleEditAssessment = (moduleId: string) => {
    setEditingAssessment(courseAssessments[moduleId]);
    setSelectedModuleForAssessment(moduleId);
    setShowAssessmentGenerator(true);
  };

  const handleSaveCourse = async () => {
    setIsSavingCourse(true);
    
    // Simulate saving process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const savedCourse = {
      ...course,
      id: Date.now(),
      savedAt: new Date().toISOString(),
      // Enhanced dummy data
      enrolledStudents: Math.floor(Math.random() * 500) + 50,
      rating: (4.2 + Math.random() * 0.8).toFixed(1),
      reviews: Math.floor(Math.random() * 200) + 25,
      completionRate: Math.floor(Math.random() * 40) + 60,
      lastUpdated: new Date().toISOString(),
      category: course.tags?.[0] || 'Professional Development',
      language: 'English',
      certificate: true,
      level: course.difficulty || 'Intermediate',
      modules: moduleContents,
      assessments: courseAssessments,
      status: 'saved',
      progress: 0,
      enrollments: 0
    };
    
    // Save to localStorage
    const existingCourses = JSON.parse(localStorage.getItem('myCourses') || '[]');
    existingCourses.push(savedCourse);
    localStorage.setItem('myCourses', JSON.stringify(existingCourses));
    
    setIsSavingCourse(false);
    
    // Show success message and close
    alert('Course saved successfully! You can find it in "My Courses".');
    onClose();
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'lesson': return <BookOpen className="w-4 h-4" />;
      case 'quiz': return <Brain className="w-4 h-4" />;
      case 'assignment': return <PenTool className="w-4 h-4" />;
      case 'project': return <Target className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'bg-blue-500/10 text-blue-600';
      case 'quiz': return 'bg-purple-500/10 text-purple-600';
      case 'assignment': return 'bg-green-500/10 text-green-600';
      case 'project': return 'bg-orange-500/10 text-orange-600';
      default: return 'bg-gray-500/10 text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onClose}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{course.title}</h1>
              <p className="text-muted-foreground">{course.description}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button 
              onClick={handleSaveCourse}
              disabled={isSavingCourse}
              className="bg-ai-primary hover:bg-ai-primary/90"
              size="sm"
            >
              {isSavingCourse ? (
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <CheckCircle className="w-4 h-4 mr-2" />
              )}
              {isSavingCourse ? 'Saving...' : 'Save Course'}
            </Button>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Main Content */}
          <div className="flex-1 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="grid w-full grid-cols-4 mx-6 mt-4">
                <TabsTrigger value="overview">Course Overview</TabsTrigger>
                <TabsTrigger value="modules">Course Modules</TabsTrigger>
                <TabsTrigger value="content">Module Content</TabsTrigger>
                <TabsTrigger value="assessments">All Assessments</TabsTrigger>
              </TabsList>

              <ScrollArea className="flex-1">
                <div className="p-6">
                  <TabsContent value="overview" className="space-y-6">
                    {/* Course Stats */}
                    <div className="grid grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-ai-primary">{moduleContents.length}</div>
                          <div className="text-sm text-muted-foreground">Total Modules</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-ai-success">{course.duration}</div>
                          <div className="text-sm text-muted-foreground">Duration</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-ai-warning">{course.difficulty}</div>
                          <div className="text-sm text-muted-foreground">Difficulty</div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl font-bold text-ai-info">{Math.round(progressPercentage)}%</div>
                          <div className="text-sm text-muted-foreground">Progress</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Progress */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Trophy className="w-5 h-5 mr-2 text-ai-primary" />
                          Course Progress
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Modules Completed</span>
                            <span>{completedModules} of {moduleContents.length}</span>
                          </div>
                          <Progress value={progressPercentage} className="h-2" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Course Description */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Course Description</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">
                          {course.description} This comprehensive course is designed specifically for the UAE market, 
                          incorporating local business practices, cultural considerations, and industry-specific case studies 
                          from across the seven emirates. Students will gain practical skills that are immediately applicable 
                          in the UAE's dynamic business environment.
                        </p>
                      </CardContent>
                    </Card>

                    {/* Learning Objectives */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Target className="w-5 h-5 mr-2 text-ai-primary" />
                          Learning Objectives
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {course.objectives?.map((objective: string, index: number) => (
                            <li key={index} className="flex items-start space-x-2">
                              <CheckCircle className="w-4 h-4 text-ai-success mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{objective}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="modules" className="space-y-4">
                    <div className="grid gap-4">
                      {moduleContents.map((module, index) => (
                        <Card 
                          key={module.id} 
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => handleModuleClick(module)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-4">
                                <div className={`p-2 rounded-lg ${getTypeColor(module.type)}`}>
                                  {getModuleIcon(module.type)}
                                </div>
                                <div>
                                  <h3 className="font-semibold">{module.title}</h3>
                                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                    <span className="flex items-center">
                                      <Clock className="w-3 h-3 mr-1" />
                                      {module.duration}
                                    </span>
                                    <Badge variant="outline" className="text-xs">
                                      {module.type.charAt(0).toUpperCase() + module.type.slice(1)}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleAddAssessment(module.id);
                                  }}
                                  className="text-xs"
                                >
                                  {courseAssessments[module.id] ? 'Edit Assessment' : 'Add Assessment'}
                                </Button>
                                {module.completed && (
                                  <CheckCircle className="w-5 h-5 text-ai-success" />
                                )}
                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="content" className="space-y-6">
                    {selectedModule ? (
                      <div className="space-y-6">
                        {/* Module Header */}
                        <Card>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${getTypeColor(selectedModule.type)}`}>
                                  {getModuleIcon(selectedModule.type)}
                                </div>
                                <div>
                                  <CardTitle>{selectedModule.title}</CardTitle>
                                  <CardDescription>
                                    {selectedModule.type.charAt(0).toUpperCase() + selectedModule.type.slice(1)} • {selectedModule.duration}
                                  </CardDescription>
                                </div>
                              </div>
                              <Button variant="ai">
                                <Play className="w-4 h-4 mr-2" />
                                Start Module
                              </Button>
                            </div>
                          </CardHeader>
                        </Card>

                        {/* Module Overview */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Lightbulb className="w-5 h-5 mr-2 text-ai-primary" />
                              Overview
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-muted-foreground leading-relaxed">
                              {selectedModule.content.overview}
                            </p>
                          </CardContent>
                        </Card>

                        {/* Learning Objectives */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Target className="w-5 h-5 mr-2 text-ai-primary" />
                              Learning Objectives
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {selectedModule.content.objectives.map((objective, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <CheckCircle className="w-4 h-4 text-ai-success mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{objective}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        {/* Materials */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <BookOpen className="w-5 h-5 mr-2 text-ai-primary" />
                              Course Materials
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {selectedModule.content.materials.map((material, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <FileText className="w-4 h-4 text-ai-info mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{material}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        {/* Activities */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Users className="w-5 h-5 mr-2 text-ai-primary" />
                              Learning Activities
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {selectedModule.content.activities.map((activity, index) => (
                                <li key={index} className="flex items-start space-x-2">
                                  <Play className="w-4 h-4 text-ai-warning mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        {/* Assessments */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              <Brain className="w-5 h-5 mr-2 text-ai-primary" />
                              Module Assessments
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {/* Module's Built-in Assessments */}
                              <div>
                                <h5 className="font-medium text-sm mb-2">Built-in Assessments</h5>
                                <ul className="space-y-2">
                                  {selectedModule.content.assessments.map((assessment, i) => (
                                    <li key={i} className="space-y-2">
                                      <div className="flex items-center justify-between">
                                        <h6 className="font-medium text-sm">{assessment.type}</h6>
                                        <Badge variant="outline">{assessment.questions.length} Questions</Badge>
                                      </div>
                                      <div className="space-y-1">
                                        {assessment.questions.slice(0, 2).map((q, qi) => (
                                          <div key={qi} className="p-2 bg-muted/50 rounded text-xs">
                                            <p className="font-medium">{q.question}</p>
                                            {q.options && (
                                              <div className="mt-1 space-y-0.5">
                                                {q.options.map((option, oi) => (
                                                  <div key={oi} className={`text-xs ${oi === q.correct ? 'text-ai-success font-medium' : 'text-muted-foreground'}`}>
                                                    {String.fromCharCode(65 + oi)}. {option}
                                                  </div>
                                                ))}
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              {/* AI-Generated Assessment */}
                              {courseAssessments[selectedModule.id] && (
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <h5 className="font-medium text-sm">AI-Generated Assessment</h5>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleEditAssessment(selectedModule.id)}
                                      className="text-xs"
                                    >
                                      Edit Assessment
                                    </Button>
                                  </div>
                                  <Card className="bg-ai-primary/5 border-ai-primary/20">
                                    <CardContent className="p-3">
                                      <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                          <h6 className="font-medium text-sm">{courseAssessments[selectedModule.id].title}</h6>
                                          <div className="flex space-x-1">
                                            <Badge variant="outline" className="text-xs">
                                              {courseAssessments[selectedModule.id].mcqs?.length || 0} MCQs
                                            </Badge>
                                            <Badge variant="outline" className="text-xs">
                                              {courseAssessments[selectedModule.id].shortQuestions?.length || 0} Short Q
                                            </Badge>
                                          </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                          {courseAssessments[selectedModule.id].description}
                                        </p>
                                        <div className="text-xs text-ai-primary">
                                          Total Points: {courseAssessments[selectedModule.id].metadata?.totalPoints || 0}
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              )}

                              {/* Add Assessment Button */}
                              {!courseAssessments[selectedModule.id] && (
                                <Button
                                  onClick={() => handleAddAssessment(selectedModule.id)}
                                  variant="outline"
                                  size="sm"
                                  className="w-full"
                                >
                                  <Plus className="w-4 h-4 mr-2" />
                                  Generate AI Assessment for this Module
                                </Button>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <Card>
                        <CardContent className="p-12 text-center">
                          <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-semibold mb-2">Select a Module</h3>
                          <p className="text-muted-foreground">
                            Choose a module from the "Course Modules" tab to view its detailed content and assessments.
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>

                  <TabsContent value="assessments" className="space-y-4">
                    <div className="space-y-4">
                      {moduleContents.map((module, moduleIndex) => (
                        <Card key={module.id}>
                          <CardHeader>
                            <CardTitle className="flex items-center">
                              {getModuleIcon(module.type)}
                              <span className="ml-2">{module.title}</span>
                              <Badge variant="outline" className="ml-auto">
                                {module.content.assessments.reduce((total, assessment) => 
                                  total + assessment.questions.length, 0
                                )} Questions
                              </Badge>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {module.content.assessments.map((assessment, assessmentIndex) => (
                              <div key={assessmentIndex} className="mb-4 last:mb-0">
                                <h4 className="font-semibold text-sm mb-2">{assessment.type}</h4>
                                <div className="grid gap-2">
                                  {assessment.questions.map((question, questionIndex) => (
                                    <div key={questionIndex} className="text-xs p-2 bg-muted/30 rounded">
                                      <span className="font-medium">Q{questionIndex + 1}:</span> {question.question}
                                      {question.points && (
                                        <Badge variant="outline" className="ml-2 text-xs">
                                          {question.points}pts
                                        </Badge>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </div>
              </ScrollArea>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="w-80 border-l bg-muted/30">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Course Navigation</h3>
            </div>
            <ScrollArea className="h-full">
              <div className="p-4 space-y-2">
                {moduleContents.map((module, index) => (
                  <button
                    key={module.id}
                    onClick={() => handleModuleClick(module)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedModule?.id === module.id
                        ? 'bg-ai-primary/10 border border-ai-primary/20'
                        : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`p-1 rounded ${getTypeColor(module.type)}`}>
                        {getModuleIcon(module.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{module.title}</div>
                        <div className="text-xs text-muted-foreground">{module.duration}</div>
                      </div>
                      {module.completed && (
                        <CheckCircle className="w-4 h-4 text-ai-success flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
      
      {/* Assessment Generator Modal */}
      {showAssessmentGenerator && (
        <AssessmentGenerator
          onClose={() => {
            setShowAssessmentGenerator(false);
            setSelectedModuleForAssessment(null);
            setEditingAssessment(null);
          }}
          onAssessmentGenerated={handleAssessmentGenerated}
          existingAssessment={editingAssessment}
          moduleTitle={selectedModuleForAssessment ? 
            moduleContents.find(m => m.id === selectedModuleForAssessment)?.title : ''
          }
        />
      )}
    </div>
  );
};