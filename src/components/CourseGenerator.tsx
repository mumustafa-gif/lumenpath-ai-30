import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { AssessmentGenerator } from "./AssessmentGenerator";
import { CoursePreview } from "./CoursePreview";
import { 
  Brain, 
  Sparkles, 
  FileText, 
  Clock,
  Users,
  Target,
  CheckCircle,
  Send,
  Bot,
  User,
  Zap,
  Upload,
  Eye
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface CourseData {
  courseTopic?: string;
  targetAudience?: string;
  difficulty?: string;
  duration?: string;
  learningObjectives?: string;
  industryContext?: string;
}

export const CourseGenerator = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Course Creator Assistant. I'll help you create an amazing course by asking you a few questions. Let's start - what topic would you like to create a course about?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [courseData, setCourseData] = useState<CourseData>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState("chat");
  const [researchProgress, setResearchProgress] = useState(0);
  const [generationPhase, setGenerationPhase] = useState("");
  const [showAssessmentGenerator, setShowAssessmentGenerator] = useState(false);
  const [showCoursePreview, setShowCoursePreview] = useState(false);
  const [isGeneratingContent, setIsGeneratingContent] = useState(false);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [courseCreated, setCourseCreated] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isGeneratingCoverImage, setIsGeneratingCoverImage] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions = [
    "What topic would you like to create a course about?",
    "Who is your target audience? (e.g., beginners, intermediate professionals, advanced practitioners, executives)",
    "What difficulty level should this course be? (beginner, intermediate, advanced, expert)",
    "How long should the course be? (2-4 hours, 4-8 hours, 8-16 hours, 16+ hours)",
    "What industry context is most relevant? (e.g., Healthcare, Finance, Technology, Manufacturing)",
    "What are the main learning objectives you want to achieve?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addMessage = (text: string, isBot: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    addMessage(userMessage, false);
    setInputText("");
    setIsTyping(true);

    // Store the answer based on current question
    const newCourseData = { ...courseData };
    switch (currentQuestion) {
      case 0:
        newCourseData.courseTopic = userMessage;
        break;
      case 1:
        newCourseData.targetAudience = userMessage;
        break;
      case 2:
        newCourseData.difficulty = userMessage;
        break;
      case 3:
        newCourseData.duration = userMessage;
        break;
      case 4:
        newCourseData.industryContext = userMessage;
        break;
      case 5:
        newCourseData.learningObjectives = userMessage;
        break;
    }
    setCourseData(newCourseData);

    // Simulate AI typing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (currentQuestion < questions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      addMessage(questions[nextQuestion], true);
    } else {
      // All questions answered, start course generation
      addMessage("Perfect! I have all the information I need. Let me generate your course now...", true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      handleGenerateCourse(newCourseData);
    }
    
    setIsTyping(false);
  };

  const handleGenerateCourse = async (data: CourseData) => {
    setIsGenerating(true);
    setCurrentStep("generating");
    setResearchProgress(0);
    
    addMessage("🚀 Starting course generation process...", true);
    
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
      addMessage(`📊 ${phase.name}`, true);
      await new Promise(resolve => setTimeout(resolve, phase.duration));
      progress += 100 / phases.length;
      setResearchProgress(Math.min(progress, 100));
    }
    
    const mockCourse = {
      title: `${data.courseTopic} Mastery Program`,
      description: `Comprehensive ${data.courseTopic?.toLowerCase()} training designed for ${data.targetAudience?.toLowerCase()} professionals`,
      researchInsights: [
        "Latest industry trends indicate 40% growth in demand",
        "Top companies prioritize practical application over theory",
        "Microlearning modules show 60% better retention rates",
        "Interactive simulations increase engagement by 85%"
      ],
      modules: [
        {
          id: 1,
          title: `Foundations of ${data.courseTopic}`,
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
      tags: [data.courseTopic, data.targetAudience, data.difficulty, "AI-Generated", "Research-Based"],
      estimatedCompletion: "8-10 hours",
      prerequisites: ["Basic understanding of business concepts", "Familiarity with data interpretation"],
      learningOutcomes: [
        `Master fundamental concepts of ${data.courseTopic}`,
        "Apply best practices in real-world scenarios",
        "Analyze complex problems using systematic approaches",
        "Design and implement effective solutions"
      ]
    };
    
    setGeneratedCourse(mockCourse);
    addMessage("✅ Your course has been successfully generated! Check out the detailed course structure below.", true);
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

  const handleGenerateCoverImage = async () => {
    setIsGeneratingCoverImage(true);
    
    // Simulate AI image generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Set a mock generated image
    setCoverImage("https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80");
    setIsGeneratingCoverImage(false);
  };

  const handleUploadCoverImage = () => {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCoverImage(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleCreateCourse = async () => {
    setIsCreatingCourse(true);
    
    // Simulate course creation process
    const creationSteps = [
      "Setting up course structure...",
      "Creating course content...",
      "Generating assessments...",
      "Setting up learning paths...",
      "Configuring analytics...",
      "Publishing course..."
    ];
    
    let progress = 0;
    for (const step of creationSteps) {
      setGenerationPhase(step);
      await new Promise(resolve => setTimeout(resolve, 800));
      progress += 100 / creationSteps.length;
      setResearchProgress(Math.min(progress, 100));
    }
    
    // Create course entry in the system
    const newCourse = {
      id: Date.now(),
      title: generatedCourse.title,
      description: generatedCourse.description,
      coverImage: coverImage,
      modules: generatedCourse.modules,
      status: "active",
      createdAt: new Date().toISOString(),
      students: 0,
      totalLessons: generatedCourse.modules.reduce((acc: number, module: any) => acc + module.lessons.length, 0),
      estimatedDuration: generatedCourse.estimatedCompletion,
      difficulty: courseData.difficulty,
      targetAudience: courseData.targetAudience,
      prerequisites: generatedCourse.prerequisites,
      learningOutcomes: generatedCourse.learningOutcomes,
      tags: generatedCourse.tags
    };
    
    // Store in localStorage for demo purposes
    const existingCourses = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
    existingCourses.push(newCourse);
    localStorage.setItem('instructorCourses', JSON.stringify(existingCourses));
    
    setCourseCreated(true);
    setIsCreatingCourse(false);
    setCurrentStep("courseCreated");
  };

  return (
    <div className="space-y-6">
      {currentStep === "chat" && (
        <Card className="h-[700px] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="w-5 h-5 mr-2 text-ai-primary" />
              AI Course Creator Assistant
            </CardTitle>
            <CardDescription>
              Let's create your course together through conversation
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
            <ScrollArea className="flex-1 px-6 max-h-[480px]">
              <div className="space-y-4 py-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    <div
                      className={`flex max-w-[80%] ${
                        message.isBot ? 'flex-row' : 'flex-row-reverse'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.isBot
                            ? 'bg-ai-primary text-white mr-3'
                            : 'bg-muted text-foreground ml-3'
                        }`}
                      >
                        {message.isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>
                      <div
                        className={`px-4 py-2 rounded-lg ${
                          message.isBot
                            ? 'bg-muted text-foreground'
                            : 'bg-ai-primary text-white'
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span className="text-xs opacity-70">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-ai-primary text-white mr-3">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div className="bg-muted px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <div className="border-t p-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type your response..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-ai-primary hover:bg-ai-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === "generating" && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-ai-primary animate-pulse" />
              AI Course Generation in Progress
            </CardTitle>
            <CardDescription>
              Our AI agents are analyzing your requirements and creating your course
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto bg-ai-primary/10 rounded-full flex items-center justify-center">
                <Brain className="w-10 h-10 text-ai-primary animate-pulse" />
              </div>
              <p className="text-lg font-medium text-ai-primary">
                Creating: {courseData.courseTopic} Course
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">{generationPhase}</span>
                <span className="text-sm text-muted-foreground">{Math.round(researchProgress)}%</span>
              </div>
              <Progress value={researchProgress} className="h-3" />
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === "completed" && generatedCourse && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                Course Generated Successfully!
              </CardTitle>
              <CardDescription>
                Your AI-powered course is ready. Review the structure and generate full content.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <FileText className="w-6 h-6 mx-auto mb-2 text-ai-primary" />
                  <div className="font-semibold">{generatedCourse.modules.length}</div>
                  <div className="text-sm text-muted-foreground">Modules</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-ai-secondary" />
                  <div className="font-semibold">{generatedCourse.estimatedCompletion}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Target className="w-6 h-6 mx-auto mb-2 text-ai-accent" />
                  <div className="font-semibold">{generatedCourse.quizBank.totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">Questions</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Users className="w-6 h-6 mx-auto mb-2 text-ai-success" />
                  <div className="font-semibold">{courseData.targetAudience}</div>
                  <div className="text-sm text-muted-foreground">Audience</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Course Structure</h3>
                <div className="space-y-2">
                  {generatedCourse.modules.map((module: any, index: number) => (
                    <div key={module.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-ai-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{module.title}</div>
                          <div className="text-sm text-muted-foreground">{module.lessons.length} lessons • {module.duration}</div>
                        </div>
                      </div>
                      <Badge variant="outline">{module.quiz.questions} questions</Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={handleGenerateFullContent}
                  disabled={isGeneratingContent}
                  className="bg-ai-secondary hover:bg-ai-secondary/90"
                >
                  {isGeneratingContent ? <Sparkles className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
                  Generate Full Content
                </Button>
                <Button 
                  onClick={() => setShowCoursePreview(true)}
                  variant="outline"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Course
                </Button>
                <Button 
                  onClick={handleCreateCourse}
                  disabled={isCreatingCourse}
                  className="bg-ai-primary hover:bg-ai-primary/90"
                >
                  {isCreatingCourse ? <Sparkles className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                  Create Course
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showAssessmentGenerator && (
        <AssessmentGenerator 
          onClose={() => setShowAssessmentGenerator(false)}
        />
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