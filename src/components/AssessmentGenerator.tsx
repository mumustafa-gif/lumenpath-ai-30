import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Brain, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  CheckCircle,
  HelpCircle,
  Clock,
  Target,
  MessageSquare,
  BookOpen
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface GeneratedAssessment {
  title: string;
  description: string;
  mcqs: {
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }[];
  shortQuestions: {
    question: string;
    points: number;
    sampleAnswer: string;
  }[];
  metadata: {
    difficulty: string;
    estimatedTime: string;
    totalPoints: number;
  };
}

interface AssessmentGeneratorProps {
  onClose: () => void;
  onAssessmentGenerated?: (assessment: GeneratedAssessment) => void;
  existingAssessment?: GeneratedAssessment | null;
  moduleTitle?: string;
}

export const AssessmentGenerator = ({ 
  onClose, 
  onAssessmentGenerated,
  existingAssessment,
  moduleTitle 
}: AssessmentGeneratorProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: `Hello! I'm your AI Assessment Generator. ${moduleTitle ? `I'll help you create detailed assessments for "${moduleTitle}".` : "I'll help you create detailed assessments with MCQs and short questions."} Let's start with some questions about your assessment needs.`,
      sender: 'bot',
      timestamp: new Date()
    },
    {
      id: '2',
      text: moduleTitle ? 
        `For the module "${moduleTitle}", what difficulty level should this assessment be? (Beginner, Intermediate, Advanced)` :
        "What topic or subject should this assessment cover?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<any>(
    moduleTitle ? { topic: moduleTitle } : {}
  );
  const [generatedAssessment, setGeneratedAssessment] = useState<GeneratedAssessment | null>(
    existingAssessment || null
  );

  const conversationFlow = moduleTitle ? [
    `For the module "${moduleTitle}", what difficulty level should this assessment be? (Beginner, Intermediate, Advanced)`,
    "How many multiple choice questions would you like? (5-50)",
    "How many short answer questions do you need? (2-20)",
    "What specific learning objectives should this assessment test?",
    "Any particular areas or subtopics you want to emphasize?",
    "What's the target audience for this assessment? (Students, professionals, etc.)",
    "How much time should learners have to complete this assessment?"
  ] : [
    "What topic or subject should this assessment cover?",
    "What difficulty level should this assessment be? (Beginner, Intermediate, Advanced)",
    "How many multiple choice questions would you like? (5-50)",
    "How many short answer questions do you need? (2-20)",
    "What specific learning objectives should this assessment test?",
    "Any particular areas or subtopics you want to emphasize?",
    "What's the target audience for this assessment? (Students, professionals, etc.)",
    "How much time should learners have to complete this assessment?"
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Store assessment data
    const keys = ['topic', 'difficulty', 'mcqCount', 'shortCount', 'objectives', 'emphasis', 'audience', 'timeLimit'];
    setAssessmentData(prev => ({ ...prev, [keys[currentStep]]: inputText }));
    
    setInputText("");
    setIsGenerating(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (currentStep < conversationFlow.length - 1) {
      const nextStep = currentStep + 1;
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: conversationFlow[nextStep],
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setCurrentStep(nextStep);
    } else {
      // Generate final assessment
      const completionMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Perfect! I have all the information I need. Let me generate your detailed assessment now...",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, completionMessage]);
      
      // Generate assessment
      await generateAssessment();
    }

    setIsGenerating(false);
  };

  const generateAssessment = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockAssessment: GeneratedAssessment = {
      title: `${assessmentData.topic} Assessment`,
      description: `Comprehensive assessment covering ${assessmentData.topic} for ${assessmentData.audience}`,
      mcqs: Array.from({ length: parseInt(assessmentData.mcqCount) || 10 }, (_, i) => ({
        question: `Which of the following best describes the core concept of ${assessmentData.topic} in question ${i + 1}?`,
        options: [
          `Primary definition related to ${assessmentData.topic}`,
          `Secondary concept that supports the main idea`,
          `Alternative approach to understanding ${assessmentData.topic}`,
          `Common misconception about ${assessmentData.topic}`
        ],
        correct: 0,
        explanation: `The correct answer focuses on the fundamental principle of ${assessmentData.topic} as outlined in the learning objectives.`
      })),
      shortQuestions: Array.from({ length: parseInt(assessmentData.shortCount) || 5 }, (_, i) => ({
        question: `Explain how ${assessmentData.topic} applies to real-world scenarios in question ${i + 1}. Provide specific examples.`,
        points: 10,
        sampleAnswer: `This question tests practical application of ${assessmentData.topic} concepts. A good answer should include specific examples, demonstrate understanding of core principles, and show ability to apply theory to practice.`
      })),
      metadata: {
        difficulty: assessmentData.difficulty || 'Intermediate',
        estimatedTime: assessmentData.timeLimit || '45 minutes',
        totalPoints: (parseInt(assessmentData.mcqCount) || 10) * 2 + (parseInt(assessmentData.shortCount) || 5) * 10
      }
    };

    setGeneratedAssessment(mockAssessment);

    const finalMessage: Message = {
      id: (Date.now() + 2).toString(),
      text: "🎉 Your detailed assessment has been generated! You can review it below and make any adjustments needed.",
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, finalMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Component for Use Assessment Button with Module Selection
  const UseAssessmentButton = ({ assessment, moduleTitle, onAssessmentUsed }: {
    assessment: GeneratedAssessment;
    moduleTitle?: string;
    onAssessmentUsed: () => void;
  }) => {
    const [showModuleSelector, setShowModuleSelector] = useState(false);
    const [selectedModule, setSelectedModule] = useState("");

    // Mock course modules - in real app, this would come from context or props
    const availableModules = [
      { id: '1', title: 'Introduction to AI', course: 'AI Fundamentals' },
      { id: '2', title: 'Machine Learning Basics', course: 'AI Fundamentals' },
      { id: '3', title: 'Neural Networks', course: 'Deep Learning Course' },
      { id: '4', title: 'Data Preprocessing', course: 'ML Basics' },
      { id: '5', title: 'Model Evaluation', course: 'ML Basics' }
    ];

    const handleUseAssessment = () => {
      if (moduleTitle) {
        // Direct assignment when called from module
        onAssessmentUsed();
      } else {
        setShowModuleSelector(true);
      }
    };

    const handleModuleSelection = () => {
      if (selectedModule) {
        // Save assessment to selected module
        const moduleData = availableModules.find(m => m.id === selectedModule);
        console.log(`Assessment "${assessment.title}" assigned to module "${moduleData?.title}"`);
        setShowModuleSelector(false);
        onAssessmentUsed();
      }
    };

    if (showModuleSelector) {
      return (
        <div className="space-y-3 w-full">
          <div className="text-sm font-medium">Select Module:</div>
          <Select value={selectedModule} onValueChange={setSelectedModule}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a module" />
            </SelectTrigger>
            <SelectContent>
              {availableModules.map((module) => (
                <SelectItem key={module.id} value={module.id}>
                  <div className="flex flex-col">
                    <span>{module.title}</span>
                    <span className="text-xs text-muted-foreground">{module.course}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              className="flex-1 bg-ai-primary hover:bg-ai-primary/90"
              onClick={handleModuleSelection}
              disabled={!selectedModule}
            >
              <CheckCircle className="w-3 h-3 mr-1" />
              Add to Module
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setShowModuleSelector(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      );
    }

    return (
      <Button 
        size="sm" 
        className="flex-1 bg-ai-primary hover:bg-ai-primary/90"
        onClick={handleUseAssessment}
      >
        <CheckCircle className="w-3 h-3 mr-1" />
        Use Assessment
      </Button>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-ai-primary" />
            <h2 className="text-lg font-semibold">AI Assessment Generator</h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </div>

        <div className="flex-1 flex">
          {/* Chat Interface */}
          <div className="flex-1 flex flex-col">
            <ScrollArea className="flex-1 p-4 max-h-[60vh]">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.sender === 'bot' 
                        ? 'bg-ai-primary/10 text-ai-primary' 
                        : 'bg-ai-secondary/10 text-ai-secondary'
                    }`}>
                      {message.sender === 'bot' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'bot'
                        ? 'bg-muted'
                        : 'bg-ai-primary text-primary-foreground'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                {isGenerating && (
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-ai-primary/10 text-ai-primary flex items-center justify-center">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="bg-muted p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        <p className="text-sm">AI is thinking...</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {!generatedAssessment && (
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your response..."
                    disabled={isGenerating}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!inputText.trim() || isGenerating}
                    size="sm"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

            {/* Generated Assessment Preview */}
          {generatedAssessment && (
            <div className="w-96 border-l bg-muted/30 flex flex-col h-full">
              <div className="p-4 border-b">
                <h3 className="font-semibold flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2 text-ai-success" />
                  Generated Assessment
                </h3>
              </div>
              <ScrollArea className="flex-1 p-4 max-h-[60vh]">
                <div className="space-y-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{generatedAssessment.title}</CardTitle>
                      <CardDescription className="text-xs">
                        {generatedAssessment.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center space-x-1">
                          <Target className="w-3 h-3" />
                          <span>{generatedAssessment.metadata.difficulty}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{generatedAssessment.metadata.estimatedTime}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {generatedAssessment.mcqs.length} MCQs
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {generatedAssessment.shortQuestions.length} Short Q
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Sample MCQ</h4>
                    <Card className="p-3">
                      <p className="text-xs mb-2">{generatedAssessment.mcqs[0]?.question}</p>
                      <div className="space-y-1">
                        {generatedAssessment.mcqs[0]?.options.map((option, i) => (
                          <div key={i} className={`text-xs p-1 rounded ${i === generatedAssessment.mcqs[0].correct ? 'bg-ai-success/20' : 'bg-muted/50'}`}>
                            {String.fromCharCode(65 + i)}. {option}
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Sample Short Question</h4>
                    <Card className="p-3">
                      <p className="text-xs mb-1">{generatedAssessment.shortQuestions[0]?.question}</p>
                      <Badge variant="outline" className="text-xs">
                        {generatedAssessment.shortQuestions[0]?.points} points
                      </Badge>
                    </Card>
                  </div>

                  <div className="flex space-x-2 pt-4">
                    <UseAssessmentButton 
                      assessment={generatedAssessment}
                      moduleTitle={moduleTitle}
                      onAssessmentUsed={() => {
                        if (onAssessmentGenerated && generatedAssessment) {
                          onAssessmentGenerated(generatedAssessment);
                          onClose();
                        }
                      }}
                    />
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={async () => {
                        setGeneratedAssessment(null);
                        setCurrentStep(0);
                        setAssessmentData(moduleTitle ? { topic: moduleTitle } : {});
                        setMessages([
                          {
                            id: '1',
                            text: `Hello! I'm your AI Assessment Generator. ${moduleTitle ? `I'll help you create detailed assessments for "${moduleTitle}".` : "I'll help you create detailed assessments with MCQs and short questions."} Let's start with some questions about your assessment needs.`,
                            sender: 'bot',
                            timestamp: new Date()
                          },
                          {
                            id: '2',
                            text: moduleTitle ? 
                              `For the module "${moduleTitle}", what difficulty level should this assessment be? (Beginner, Intermediate, Advanced)` :
                              "What topic or subject should this assessment cover?",
                            sender: 'bot',
                            timestamp: new Date()
                          }
                        ]);
                      }}
                    >
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};