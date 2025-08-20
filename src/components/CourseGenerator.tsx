import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { AssessmentGenerator } from "./AssessmentGenerator";
import { CoursePreview } from "./CoursePreview";
import { 
  Brain, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  Clock,
  Users,
  Target,
  CheckCircle,
  Plus,
  Search,
  Globe,
  Video,
  Upload,
  Edit3,
  Settings,
  BookOpen,
  Lightbulb,
  PenTool,
  Camera,
  Headphones,
  Eye,
  Zap
} from "lucide-react";

export const CourseGenerator = () => {
  const [courseTopic, setCourseTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [learningObjectives, setLearningObjectives] = useState("");
  const [industryContext, setIndustryContext] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState("input");
  const [researchProgress, setResearchProgress] = useState(0);
  const [generationPhase, setGenerationPhase] = useState("");
  const [showAssessmentGenerator, setShowAssessmentGenerator] = useState(false);
  const [showCoursePreview, setShowCoursePreview] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);

  const handleGenerateCourse = async () => {
    setIsGenerating(true);
    setCurrentStep("generating");
    setResearchProgress(0);
    
    // Simulate advanced AI course generation with multiple phases
    const phases = [
      { name: "Analyzing requirements...", duration: 800 },
      { name: "Conducting web research...", duration: 1200 },
      { name: "Generating course structure...", duration: 1000 },
      { name: "Creating lesson outlines...", duration: 1200 },
      { name: "Developing quiz questions...", duration: 800 },
      { name: "Designing case studies...", duration: 1000 },
      { name: "Finalizing course design...", duration: 600 }
    ];
    
    let progress = 0;
    for (const phase of phases) {
      setGenerationPhase(phase.name);
      await new Promise(resolve => setTimeout(resolve, phase.duration));
      progress += 100 / phases.length;
      setResearchProgress(Math.min(progress, 100));
    }
    
    const mockCourse = {
      title: `${courseTopic} Mastery Program`,
      description: `Comprehensive ${courseTopic.toLowerCase()} training designed for ${targetAudience.toLowerCase()} professionals`,
      researchInsights: [
        "Latest industry trends indicate 40% growth in demand",
        "Top companies prioritize practical application over theory",
        "Microlearning modules show 60% better retention rates",
        "Interactive simulations increase engagement by 85%"
      ],
      modules: [
        {
          id: 1,
          title: `Foundations of ${courseTopic}`,
          duration: "45 min",
          lessons: [
            { title: "Historical Context & Evolution", duration: "10 min", type: "video" },
            { title: "Core Concepts & Terminology", duration: "15 min", type: "interactive" },
            { title: "Industry Applications Overview", duration: "12 min", type: "case_study" },
            { title: "Current Market Landscape", duration: "8 min", type: "research" }
          ],
          quiz: {
            questions: 12,
            types: ["multiple_choice", "scenario_based", "drag_drop"],
            passingScore: 80
          },
          caseStudy: {
            title: "Netflix's Data-Driven Content Strategy",
            scenario: "Analyze how Netflix uses data analytics to make content decisions",
            deliverables: ["Market analysis report", "Recommendation system design"]
          }
        },
        {
          id: 2,
          title: `Core Principles & Methodologies`,
          duration: "75 min",
          lessons: [
            { title: "Fundamental Theories", duration: "20 min", type: "video" },
            { title: "Best Practices Framework", duration: "25 min", type: "interactive" },
            { title: "Common Pitfalls & Solutions", duration: "18 min", type: "case_study" },
            { title: "Hands-on Workshop", duration: "12 min", type: "simulation" }
          ],
          quiz: {
            questions: 15,
            types: ["multiple_choice", "scenario_based", "code_review"],
            passingScore: 85
          },
          caseStudy: {
            title: "Tesla's Innovation Methodology",
            scenario: "Examine Tesla's approach to rapid innovation and iteration",
            deliverables: ["Process flow diagram", "Innovation strategy presentation"]
          }
        },
        {
          id: 3,
          title: `Advanced Applications & Tools`,
          duration: "90 min",
          lessons: [
            { title: "Advanced Techniques", duration: "25 min", type: "video" },
            { title: "Tool Mastery Workshop", duration: "30 min", type: "hands_on" },
            { title: "Integration Strategies", duration: "20 min", type: "case_study" },
            { title: "Performance Optimization", duration: "15 min", type: "simulation" }
          ],
          quiz: {
            questions: 18,
            types: ["practical_exercise", "scenario_based", "peer_review"],
            passingScore: 85
          },
          caseStudy: {
            title: "Amazon's Supply Chain Optimization",
            scenario: "Design an optimized supply chain using advanced analytics",
            deliverables: ["System architecture", "Performance metrics dashboard"]
          }
        },
        {
          id: 4,
          title: `Capstone Project & Portfolio`,
          duration: "120 min",
          lessons: [
            { title: "Project Planning & Scope", duration: "20 min", type: "workshop" },
            { title: "Implementation Phase", duration: "60 min", type: "hands_on" },
            { title: "Testing & Validation", duration: "25 min", type: "simulation" },
            { title: "Presentation & Portfolio", duration: "15 min", type: "presentation" }
          ],
          quiz: {
            questions: 1,
            types: ["capstone_project"],
            passingScore: 90
          },
          caseStudy: {
            title: "Personal Industry Challenge",
            scenario: "Apply learned concepts to solve a real problem in your industry",
            deliverables: ["Complete solution design", "Implementation roadmap", "ROI analysis"]
          }
        }
      ],
      quizBank: {
        totalQuestions: 150,
        categories: ["Conceptual", "Application", "Analysis", "Synthesis"],
        adaptiveScoring: true,
        aiGenerated: true
      },
      tags: [courseTopic, targetAudience, difficulty, "AI-Generated", "Research-Based"],
      estimatedCompletion: "8-10 hours",
      prerequisites: ["Basic understanding of business concepts", "Familiarity with data interpretation"],
      learningOutcomes: [
        `Master fundamental concepts of ${courseTopic}`,
        "Apply best practices in real-world scenarios",
        "Analyze complex problems using systematic approaches",
        "Design and implement effective solutions"
      ]
    };
    
    setGeneratedCourse(mockCourse);
    setCurrentStep("completed");
    setIsGenerating(false);
  };

  const handleGenerateFullContent = async () => {
    setIsGeneratingContent(true);
    
    // Simulate AI content generation
    const phases = [
      "Generating lesson content...",
      "Creating video scripts...", 
      "Developing interactive elements...",
      "Building assessments...",
      "Finalizing course materials..."
    ];
    
    for (const phase of phases) {
      setGenerationPhase(phase);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    // Add full content to existing course
    const enrichedCourse = {
      ...generatedCourse,
      fullContent: true,
      modules: generatedCourse.modules.map((module: any) => ({
        ...module,
        content: {
          textContent: `This is comprehensive AI-generated content for ${module.title}. The content includes detailed explanations, practical examples, interactive exercises, and real-world applications. Each lesson is designed to build upon previous knowledge while providing hands-on experience with the concepts.`,
          videoScript: `Welcome to ${module.title}. In this module, we'll explore advanced concepts and practical applications. We'll start with the fundamentals and gradually progress to more complex scenarios...`,
          resources: ["Downloadable guides", "Code samples", "Interactive simulations", "Additional reading materials"],
          interactiveElements: ["Virtual labs", "Simulations", "Quizzes", "Discussion forums"]
        }
      }))
    };
    
    setGeneratedCourse(enrichedCourse);
    setIsGeneratingContent(false);
  };

  return (
    <div className="space-y-6">
      {currentStep === "input" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-ai-primary" />
              Advanced AI Course Generator
            </CardTitle>
            <CardDescription>
              AI-powered course creation with deep research, adaptive content, and comprehensive assessments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">Course Topic</Label>
                  <Input
                    id="topic"
                    placeholder="e.g., Machine Learning, Cloud Computing, Data Science"
                    value={courseTopic}
                    onChange={(e) => setCourseTopic(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="audience">Target Audience</Label>
                  <Select value={targetAudience} onValueChange={setTargetAudience}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select target audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginners">Beginners</SelectItem>
                      <SelectItem value="intermediate">Intermediate Professionals</SelectItem>
                      <SelectItem value="advanced">Advanced Practitioners</SelectItem>
                      <SelectItem value="executives">Executives & Managers</SelectItem>
                      <SelectItem value="technical">Technical Teams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="duration">Preferred Duration</Label>
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">2-4 hours</SelectItem>
                      <SelectItem value="medium">4-8 hours</SelectItem>
                      <SelectItem value="long">8-16 hours</SelectItem>
                      <SelectItem value="extensive">16+ hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry Context</Label>
                  <Input
                    id="industry"
                    placeholder="e.g., Healthcare, Finance, Technology, Manufacturing"
                    value={industryContext}
                    onChange={(e) => setIndustryContext(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="objectives">Learning Objectives</Label>
                  <Textarea
                    id="objectives"
                    placeholder="Describe specific learning goals, skills, or outcomes..."
                    className="min-h-[120px]"
                    value={learningObjectives}
                    onChange={(e) => setLearningObjectives(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Advanced AI Features</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="research" defaultChecked />
                      <label htmlFor="research" className="text-sm">Deep web research & trends analysis</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="adaptive" defaultChecked />
                      <label htmlFor="adaptive" className="text-sm">Adaptive learning paths</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="simulations" defaultChecked />
                      <label htmlFor="simulations" className="text-sm">Interactive simulations</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="case_studies" defaultChecked />
                      <label htmlFor="case_studies" className="text-sm">Real-world case studies</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="assessment_ai" defaultChecked />
                      <label htmlFor="assessment_ai" className="text-sm">AI-powered assessments</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button 
              onClick={handleGenerateCourse}
              disabled={!courseTopic || !targetAudience || !difficulty || isGenerating}
              variant="hero"
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                  Generating Advanced Course...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Generate Course with Deep AI Research
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {currentStep === "generating" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-ai-primary animate-pulse" />
              AI Course Generation in Progress
            </CardTitle>
            <CardDescription>
              Our AI is conducting deep research and creating your comprehensive course
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{generationPhase}</span>
                <span className="text-sm text-muted-foreground">{Math.round(researchProgress)}%</span>
              </div>
              <Progress value={researchProgress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2 p-3 bg-ai-primary/5 rounded-lg">
                <Globe className="w-5 h-5 text-ai-primary" />
                <div>
                  <p className="text-sm font-medium">Web Research</p>
                  <p className="text-xs text-muted-foreground">Latest trends & insights</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-ai-secondary/5 rounded-lg">
                <BookOpen className="w-5 h-5 text-ai-secondary" />
                <div>
                  <p className="text-sm font-medium">Content Structure</p>
                  <p className="text-xs text-muted-foreground">Learning pathway design</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 p-3 bg-ai-accent/5 rounded-lg">
                <Lightbulb className="w-5 h-5 text-ai-accent" />
                <div>
                  <p className="text-sm font-medium">Assessment Creation</p>
                  <p className="text-xs text-muted-foreground">Quizzes & simulations</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {currentStep === "completed" && generatedCourse && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-ai-success" />
                  Advanced Course Generated Successfully
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" onClick={() => setCurrentStep("input")}>
                    <Settings className="w-4 h-4 mr-1" />
                    Modify
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setShowCoursePreview(true)}>
                    <Eye className="w-4 h-4 mr-1" />
                    Preview Course
                  </Button>
                  <Button size="sm" variant="ai">
                    <Plus className="w-4 h-4 mr-1" />
                    Create Course
                  </Button>
                </div>
              </CardTitle>
              <CardDescription>
                AI has generated a comprehensive, research-backed course with interactive elements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="research">Research Insights</TabsTrigger>
                  <TabsTrigger value="modules">Detailed Modules</TabsTrigger>
                  <TabsTrigger value="assessments">Assessments</TabsTrigger>
                  <TabsTrigger value="content">Content Creation</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{generatedCourse.estimatedCompletion}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{targetAudience}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Target className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{difficulty} level</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{generatedCourse.modules.length} modules</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Course Description</h4>
                      <p className="text-muted-foreground">{generatedCourse.description}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Learning Outcomes</h4>
                      <ul className="space-y-1">
                        {generatedCourse.learningOutcomes.map((outcome: string, index: number) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-ai-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Prerequisites</h4>
                      <div className="flex flex-wrap gap-2">
                        {generatedCourse.prerequisites.map((prereq: string, index: number) => (
                          <Badge key={index} variant="outline">{prereq}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="research" className="space-y-4">
                  <div className="space-y-4">
                    <h4 className="font-semibold flex items-center">
                      <Globe className="w-4 h-4 mr-2 text-ai-primary" />
                      AI Research Insights
                    </h4>
                    <div className="grid gap-3">
                      {generatedCourse.researchInsights.map((insight: string, index: number) => (
                        <div key={index} className="p-3 bg-ai-primary/5 border-l-4 border-ai-primary rounded-r-lg">
                          <p className="text-sm">{insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="modules" className="space-y-4">
                  <h4 className="font-semibold">Detailed Course Modules</h4>
                  <div className="space-y-4">
                    {generatedCourse.modules.map((module: any) => (
                      <Card key={module.id} className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-medium">Module {module.id}: {module.title}</h5>
                          <Badge variant="outline">{module.duration}</Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h6 className="font-medium text-sm mb-2">Lessons</h6>
                            <div className="space-y-2">
                              {module.lessons.map((lesson: any, lessonIndex: number) => (
                                <div key={lessonIndex} className="flex items-center justify-between p-2 bg-muted/30 rounded">
                                  <div className="flex items-center space-x-2">
                                    {lesson.type === "video" && <Video className="w-4 h-4 text-ai-info" />}
                                    {lesson.type === "interactive" && <Lightbulb className="w-4 h-4 text-ai-warning" />}
                                    {lesson.type === "case_study" && <FileText className="w-4 h-4 text-ai-secondary" />}
                                    {lesson.type === "hands_on" && <PenTool className="w-4 h-4 text-ai-success" />}
                                    {lesson.type === "simulation" && <Settings className="w-4 h-4 text-ai-accent" />}
                                    <span className="text-sm">{lesson.title}</span>
                                  </div>
                                  <Badge variant="secondary" className="text-xs">{lesson.duration}</Badge>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h6 className="font-medium text-sm mb-2">Case Study</h6>
                            <div className="p-3 bg-ai-secondary/10 rounded-lg">
                              <h6 className="font-medium text-sm">{module.caseStudy.title}</h6>
                              <p className="text-xs text-muted-foreground mt-1">{module.caseStudy.scenario}</p>
                              <div className="mt-2">
                                <span className="text-xs font-medium">Deliverables: </span>
                                <span className="text-xs">{module.caseStudy.deliverables.join(", ")}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="assessments" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">AI-Generated Assessment System</h4>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ai" onClick={() => setShowAssessmentGenerator(true)}>
                          <Brain className="w-4 h-4 mr-1" />
                          Generate with AI
                        </Button>
                        <Badge variant="ai">
                          {generatedCourse.quizBank.totalQuestions} Total Questions
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {generatedCourse.modules.map((module: any) => (
                        <Card key={module.id} className="p-4">
                          <h5 className="font-medium mb-3">Module {module.id} Assessment</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Questions:</span>
                              <span className="font-medium">{module.quiz.questions}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Passing Score:</span>
                              <span className="font-medium">{module.quiz.passingScore}%</span>
                            </div>
                            <div className="space-y-1">
                              <span className="text-sm font-medium">Question Types:</span>
                              <div className="flex flex-wrap gap-1">
                                {module.quiz.types.map((type: string, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {type.replace("_", " ")}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="content" className="space-y-4">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-4">Content Creation Options</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center space-x-3 mb-3">
                            <Brain className="w-6 h-6 text-ai-primary" />
                            <h5 className="font-medium">AI Content Generation</h5>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Generate comprehensive text content, scripts, and materials using AI
                          </p>
                          <Button 
                            size="sm" 
                            variant="ai" 
                            className="w-full"
                            onClick={handleGenerateFullContent}
                            disabled={isGeneratingContent}
                          >
                            {isGeneratingContent ? (
                              <>
                                <Sparkles className="w-4 h-4 mr-1 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-4 h-4 mr-1" />
                                Generate Full Content
                              </>
                            )}
                          </Button>
                        </Card>
                        
                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center space-x-3 mb-3">
                            <Upload className="w-6 h-6 text-ai-secondary" />
                            <h5 className="font-medium">File Upload</h5>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Upload documents, PDFs, or existing materials to integrate into course
                          </p>
                          <Button size="sm" variant="outline" className="w-full">
                            <Upload className="w-4 h-4 mr-1" />
                            Upload Files
                          </Button>
                        </Card>
                        
                        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                          <div className="flex items-center space-x-3 mb-3">
                            <Edit3 className="w-6 h-6 text-ai-accent" />
                            <h5 className="font-medium">Manual Creation</h5>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            Create content manually using our rich text editor and course builder
                          </p>
                          <Button size="sm" variant="outline" className="w-full">
                            <Edit3 className="w-4 h-4 mr-1" />
                            Start Creating
                          </Button>
                        </Card>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-4">Video Content Integration</h4>
                      <Card className="p-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <Video className="w-6 h-6 text-ai-info" />
                          <div>
                            <h5 className="font-medium">AI-Powered Video Processing</h5>
                            <p className="text-sm text-muted-foreground">Upload videos for automatic transcription and assessment generation</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <h6 className="font-medium text-sm">Video Features:</h6>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                              <li className="flex items-center space-x-2">
                                <Headphones className="w-3 h-3" />
                                <span>Automatic transcription</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <Brain className="w-3 h-3" />
                                <span>AI-generated quiz questions</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <Target className="w-3 h-3" />
                                <span>Key concept identification</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <Clock className="w-3 h-3" />
                                <span>Chapter segmentation</span>
                              </li>
                            </ul>
                          </div>
                          
                          <div className="flex flex-col justify-center">
                            <Button variant="ai" className="w-full">
                              <Camera className="w-4 h-4 mr-2" />
                              Upload Video Content
                            </Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          {generatedCourse?.fullContent && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-ai-success" />
                  Complete Course Content Generated
                </CardTitle>
                <CardDescription>
                  Your course now includes full AI-generated content ready for learners
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-ai-primary/10 rounded">
                    <FileText className="w-6 h-6 mx-auto mb-2 text-ai-primary" />
                    <p className="font-semibold">Text Content</p>
                    <p className="text-xs text-muted-foreground">Complete lesson materials</p>
                  </div>
                  <div className="text-center p-3 bg-ai-secondary/10 rounded">
                    <Video className="w-6 h-6 mx-auto mb-2 text-ai-secondary" />
                    <p className="font-semibold">Video Scripts</p>
                    <p className="text-xs text-muted-foreground">Narration & presentations</p>
                  </div>
                  <div className="text-center p-3 bg-ai-accent/10 rounded">
                    <Brain className="w-6 h-6 mx-auto mb-2 text-ai-accent" />
                    <p className="font-semibold">Assessments</p>
                    <p className="text-xs text-muted-foreground">Quizzes & evaluations</p>
                  </div>
                  <div className="text-center p-3 bg-ai-info/10 rounded">
                    <Lightbulb className="w-6 h-6 mx-auto mb-2 text-ai-info" />
                    <p className="font-semibold">Interactive Elements</p>
                    <p className="text-xs text-muted-foreground">Simulations & labs</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" onClick={() => setShowCoursePreview(true)}>
                    <Eye className="w-4 h-4 mr-1" />
                    Preview Full Course
                  </Button>
                  <Button variant="ai">
                    <Plus className="w-4 h-4 mr-1" />
                    Publish Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {showAssessmentGenerator && (
        <AssessmentGenerator onClose={() => setShowAssessmentGenerator(false)} />
      )}

      {showCoursePreview && generatedCourse && (
        <CoursePreview 
          course={generatedCourse} 
          onClose={() => setShowCoursePreview(false)} 
        />
      )}
    </div>
  );
};