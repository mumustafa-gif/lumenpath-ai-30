import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Users, 
  Target, 
  Sparkles, 
  Brain, 
  FileText, 
  CheckCircle,
  Loader2,
  Download,
  Send,
  Bot,
  User,
  Share2
} from "lucide-react";
import { Play, Calendar } from "lucide-react";

interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  learningObjectives: string[];
  content: string[];
  assessments: string[];
}

interface GenerationProgress {
  stage: string;
  progress: number;
  status: string;
}

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface CurriculumData {
  title?: string;
  description?: string;
  duration?: string;
  level?: string;
  field?: string;
  prerequisites?: string;
  objectives?: string;
  targetAudience?: string;
}

export const CurriculumCreator = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI Curriculum Creator. I'll help you design a comprehensive curriculum by asking you some questions. Let's start - what would you like to call your curriculum?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [curriculumData, setCurriculumData] = useState<CurriculumData>({});
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<GenerationProgress[]>([]);
  const [generatedCurriculum, setGeneratedCurriculum] = useState<CurriculumModule[]>([]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const questions = [
    "What would you like to call your curriculum?",
    "What field of study is this curriculum for? (e.g., Computer Science, Data Science, Business Analytics)",
    "What academic level should this be? (undergraduate, graduate, master's, PhD, certificate)",
    "How long should the program duration be? (1 semester, 2 semesters, 1 year, 2 years, etc.)",
    "Please provide a brief description of the program's purpose and scope.",
    "What are the main learning objectives and outcomes you want to achieve?",
    "What prerequisites or background knowledge should students have?",
    "Who is the target audience for this curriculum?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const aiStages = [
    { stage: "Analyzing Educational Requirements", duration: 2000 },
    { stage: "Researching Industry Standards", duration: 3000 },
    { stage: "Generating Learning Objectives", duration: 2500 },
    { stage: "Creating Module Structure", duration: 3500 },
    { stage: "Developing Assessment Framework", duration: 2000 },
    { stage: "Optimizing Learning Pathways", duration: 1500 },
    { stage: "Finalizing Curriculum", duration: 1000 }
  ];

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
    const newCurriculumData = { ...curriculumData };
    switch (currentQuestion) {
      case 0:
        newCurriculumData.title = userMessage;
        break;
      case 1:
        newCurriculumData.field = userMessage;
        break;
      case 2:
        newCurriculumData.level = userMessage;
        break;
      case 3:
        newCurriculumData.duration = userMessage;
        break;
      case 4:
        newCurriculumData.description = userMessage;
        break;
      case 5:
        newCurriculumData.objectives = userMessage;
        break;
      case 6:
        newCurriculumData.prerequisites = userMessage;
        break;
      case 7:
        newCurriculumData.targetAudience = userMessage;
        break;
    }
    setCurriculumData(newCurriculumData);

    // Simulate AI typing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (currentQuestion < questions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
      addMessage(questions[nextQuestion], true);
    } else {
      // All questions answered, start curriculum generation
      addMessage("Excellent! I have all the information needed. Let me generate your comprehensive curriculum now...", true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      handleGenerate(newCurriculumData);
    }
    
    setIsTyping(false);
  };

  const handleGenerate = async (data?: CurriculumData) => {
    setIsGenerating(true);
    setGenerationProgress([]);
    setActiveTab("generate");
    
    if (data) {
      addMessage("🚀 Starting curriculum generation process...", true);
    }

    for (let i = 0; i < aiStages.length; i++) {
      const stage = aiStages[i];
      
      // Add new stage
      setGenerationProgress(prev => [
        ...prev,
        { stage: stage.stage, progress: 0, status: "processing" }
      ]);
      
      if (data) {
        addMessage(`📊 ${stage.stage}`, true);
      }

      // Simulate progress for current stage
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => 
          prev.map((item, index) => 
            index === i 
              ? { ...item, progress: Math.min(item.progress + 10, 100) }
              : item
          )
        );
      }, stage.duration / 10);

      // Wait for stage completion
      await new Promise(resolve => setTimeout(resolve, stage.duration));
      
      clearInterval(progressInterval);
      
      // Mark stage as complete
      setGenerationProgress(prev =>
        prev.map((item, index) =>
          index === i
            ? { ...item, progress: 100, status: "complete" }
            : item
        )
      );
    }

    // Generate dummy curriculum
    const dummyCurriculum: CurriculumModule[] = [
      {
        id: "1",
        title: "Foundation and Prerequisites",
        description: "Essential concepts and preparatory knowledge",
        duration: "2-3 weeks",
        difficulty: "Beginner",
        learningObjectives: [
          "Understand fundamental concepts",
          "Master prerequisite skills",
          "Establish learning foundation"
        ],
        content: [
          "Introduction to Core Concepts",
          "Mathematical Foundations",
          "Basic Programming Principles",
          "Industry Overview"
        ],
        assessments: [
          "Diagnostic Assessment",
          "Foundation Quiz",
          "Practical Exercise"
        ]
      },
      {
        id: "2", 
        title: "Core Theory and Principles",
        description: "In-depth exploration of theoretical foundations",
        duration: "4-5 weeks",
        difficulty: "Intermediate",
        learningObjectives: [
          "Master theoretical frameworks",
          "Apply core principles",
          "Analyze complex scenarios"
        ],
        content: [
          "Advanced Theoretical Models",
          "Practical Applications",
          "Case Study Analysis",
          "Research Methodologies"
        ],
        assessments: [
          "Midterm Examination",
          "Research Project",
          "Peer Review Assignment"
        ]
      },
      {
        id: "3",
        title: "Practical Application",
        description: "Hands-on implementation and real-world projects",
        duration: "3-4 weeks", 
        difficulty: "Advanced",
        learningObjectives: [
          "Implement practical solutions",
          "Develop project management skills",
          "Create portfolio projects"
        ],
        content: [
          "Project Planning and Design",
          "Implementation Techniques",
          "Testing and Validation",
          "Documentation Standards"
        ],
        assessments: [
          "Capstone Project",
          "Portfolio Presentation",
          "Industry Simulation"
        ]
      },
      {
        id: "4",
        title: "Advanced Topics and Specialization",
        description: "Cutting-edge developments and specialized knowledge",
        duration: "3-4 weeks",
        difficulty: "Expert",
        learningObjectives: [
          "Explore advanced topics",
          "Develop specialization",
          "Lead innovation projects"
        ],
        content: [
          "Emerging Technologies",
          "Research and Development",
          "Innovation Methodologies",
          "Leadership in Technology"
        ],
        assessments: [
          "Research Thesis",
          "Innovation Challenge",
          "Final Examination"
        ]
      }
    ];

    setGeneratedCurriculum(dummyCurriculum);
    
    if (data) {
      addMessage("✅ Your curriculum has been successfully generated! Check out the comprehensive structure below.", true);
    }
    
    setIsGenerating(false);
    setActiveTab("result");
  };

  const resetForm = () => {
    setCurriculumData({});
    setMessages([
      {
        id: '1',
        text: "Hello! I'm your AI Curriculum Creator. I'll help you design a comprehensive curriculum by asking you some questions. Let's start - what would you like to call your curriculum?",
        isBot: true,
        timestamp: new Date()
      }
    ]);
    setCurrentQuestion(0);
    setInputText("");
    setIsTyping(false);
    setGeneratedCurriculum([]);
    setGenerationProgress([]);
    setActiveTab("create");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-700 border-green-200";
      case "intermediate": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "advanced": return "bg-orange-100 text-orange-700 border-orange-200";
      case "expert": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ai-primary mb-2 flex items-center gap-3">
            <div className="p-2 bg-ai-primary/10 rounded-xl">
              <GraduationCap className="w-6 h-6 text-ai-primary" />
            </div>
            AI Curriculum Creator
          </h2>
          <p className="text-muted-foreground">Create comprehensive university curricula and course content with AI assistance</p>
        </div>
        {generatedCurriculum.length > 0 && (
          <div className="flex gap-2 mt-4 lg:mt-0">
            <Button variant="outline" onClick={resetForm}>
              <FileText className="w-4 h-4 mr-2" />
              New Curriculum
            </Button>
            <Button className="bg-ai-primary hover:bg-ai-primary/90">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Curriculum</TabsTrigger>
          <TabsTrigger value="generate" disabled={!isGenerating && generationProgress.length === 0}>
            AI Generation
          </TabsTrigger>
          <TabsTrigger value="result" disabled={generatedCurriculum.length === 0}>
            Generated Curriculum
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card className="h-[700px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-ai-primary" />
                AI Curriculum Creator Assistant
              </CardTitle>
              <CardDescription>
                Let's create your comprehensive curriculum through conversation
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
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-ai-primary animate-pulse" />
                AI Curriculum Generation in Progress
              </CardTitle>
              <CardDescription>
                Our AI agents are analyzing your requirements and creating a comprehensive curriculum
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-ai-primary/10 rounded-full flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-ai-primary animate-spin" />
                </div>
              <p className="text-lg font-medium text-ai-primary">
                Creating your curriculum: {curriculumData.title}
              </p>
              </div>

              <div className="space-y-4">
                {generationProgress.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.status === "complete" ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Loader2 className="w-5 h-5 text-ai-primary animate-spin" />
                        )}
                        <span className="font-medium">{item.stage}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </div>

              {isGenerating && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    This may take a few moments as our AI creates a comprehensive curriculum...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="result" className="space-y-6">
          {generatedCurriculum.length > 0 && (
            <>
              {/* Curriculum Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-ai-primary" />
                    {curriculumData.title}
                  </CardTitle>
                  <CardDescription>{curriculumData.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <Clock className="w-6 h-6 mx-auto mb-2 text-ai-primary" />
                      <div className="font-semibold">{curriculumData.duration}</div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Target className="w-6 h-6 mx-auto mb-2 text-ai-secondary" />
                      <div className="font-semibold">{curriculumData.level}</div>
                      <div className="text-sm text-muted-foreground">Level</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <BookOpen className="w-6 h-6 mx-auto mb-2 text-ai-accent" />
                      <div className="font-semibold">{generatedCurriculum.length}</div>
                      <div className="text-sm text-muted-foreground">Modules</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Users className="w-6 h-6 mx-auto mb-2 text-ai-success" />
                      <div className="font-semibold">{curriculumData.targetAudience?.split(',')[0] || 'Students'}</div>
                      <div className="text-sm text-muted-foreground">Target</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Curriculum Modules */}
              <div className="space-y-6">
                {generatedCurriculum.map((module, index) => (
                  <Card key={module.id} className="border-l-4 border-l-ai-primary">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-ai-primary text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          {module.title}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getDifficultyColor(module.difficulty)}>
                            {module.difficulty}
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {module.duration}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4 text-ai-primary" />
                            Learning Objectives
                          </h4>
                          <ul className="space-y-2">
                            {module.learningObjectives.map((objective, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-ai-secondary" />
                            Content Topics
                          </h4>
                          <ul className="space-y-2">
                            {module.content.map((topic, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <Play className="w-4 h-4 text-ai-secondary mt-0.5 flex-shrink-0" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-ai-accent" />
                            Assessments
                          </h4>
                          <ul className="space-y-2">
                            {module.assessments.map((assessment, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <Calendar className="w-4 h-4 text-ai-accent mt-0.5 flex-shrink-0" />
                                {assessment}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={resetForm}>
                  Create New Curriculum
                </Button>
                <Button className="bg-ai-secondary hover:bg-ai-secondary/90">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Curriculum
                </Button>
                <Button className="bg-ai-primary hover:bg-ai-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Export to PDF
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};