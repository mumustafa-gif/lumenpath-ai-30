import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { 
  Brain, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  CheckCircle,
  Plus,
  Eye,
  Users,
  Target,
  Clock,
  FileCheck,
  UserCheck,
  BarChart3,
  TrendingUp,
  Award,
  Edit,
  Save,
  Loader2,
  Wand2,
  BookOpen,
  HelpCircle,
  PenTool,
  FileText
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

interface AssessmentData {
  topic: string;
  description: string;
  type: string;
  difficulty: string;
  mcqCount: number;
  shortCount: number;
  essayCount: number;
  timeLimit: string;
  instructions: string;
}

type ConversationStep = 'topic' | 'description' | 'type' | 'difficulty' | 'questions' | 'timeLimit' | 'instructions' | 'complete';

interface SavedAssessment {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  mcqCount: number;
  shortCount: number;
  totalPoints: number;
  estimatedTime: string;
  createdAt: Date;
  assignedStudents: number;
  completedAttempts: number;
  avgScore: number;
}

interface Student {
  id: string;
  name: string;
  email: string;
  avatar: string;
  enrolled: boolean;
}

interface AssessmentInsight {
  studentName: string;
  score: number;
  completedAt: Date;
  timeSpent: string;
  attempts: number;
}

interface GeneratedQuestion {
  id: string;
  type: 'mcq' | 'short' | 'essay';
  question: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
  explanation?: string;
}

interface GeneratedAssessment {
  id: string;
  title: string;
  description: string;
  instructions: string;
  timeLimit: string;
  difficulty: string;
  questions: GeneratedQuestion[];
  totalPoints: number;
}

export const AIAssessmentCreator = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Welcome to AI Assessment Creator! I'll help you create comprehensive assessments for your students. What topic would you like to create an assessment for?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showStudentSelection, setShowStudentSelection] = useState(false);
  const [showInsights, setShowInsights] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState<SavedAssessment | null>(null);
  const [aiStage, setAiStage] = useState<string>("");
  const [generatedAssessment, setGeneratedAssessment] = useState<GeneratedAssessment | null>(null);
  const [showAssessmentView, setShowAssessmentView] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  // Conversational flow state
  const [currentStep, setCurrentStep] = useState<ConversationStep>('topic');
  const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData>>({});
  
  const [students] = useState<Student[]>([
    { id: '1', name: 'Alex Johnson', email: 'alex.j@university.edu', avatar: '👨‍🎓', enrolled: true },
    { id: '2', name: 'Sarah Chen', email: 'sarah.chen@university.edu', avatar: '👩‍🎓', enrolled: true },
    { id: '3', name: 'Michael Rodriguez', email: 'm.rodriguez@university.edu', avatar: '👨‍🎓', enrolled: true },
    { id: '4', name: 'Emma Wilson', email: 'emma.w@university.edu', avatar: '👩‍🎓', enrolled: true },
    { id: '5', name: 'David Kim', email: 'david.kim@university.edu', avatar: '👨‍🎓', enrolled: true },
    { id: '6', name: 'Lisa Thompson', email: 'lisa.t@university.edu', avatar: '👩‍🎓', enrolled: false },
    { id: '7', name: 'James Brown', email: 'james.brown@university.edu', avatar: '👨‍🎓', enrolled: true },
    { id: '8', name: 'Maria Garcia', email: 'maria.g@university.edu', avatar: '👩‍🎓', enrolled: true }
  ]);

  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const [assessmentInsights] = useState<Record<string, AssessmentInsight[]>>({
    '1': [
      { studentName: 'Alex Johnson', score: 85, completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), timeSpent: '42 min', attempts: 1 },
      { studentName: 'Sarah Chen', score: 92, completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), timeSpent: '38 min', attempts: 1 },
      { studentName: 'Michael Rodriguez', score: 78, completedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), timeSpent: '51 min', attempts: 2 },
      { studentName: 'Emma Wilson', score: 88, completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), timeSpent: '45 min', attempts: 1 }
    ],
    '2': [
      { studentName: 'David Kim', score: 95, completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), timeSpent: '58 min', attempts: 1 },
      { studentName: 'Lisa Thompson', score: 82, completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), timeSpent: '62 min', attempts: 1 },
      { studentName: 'James Brown', score: 79, completedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), timeSpent: '65 min', attempts: 2 }
    ]
  });

  const [savedAssessments, setSavedAssessments] = useState<SavedAssessment[]>([
    {
      id: '1',
      title: 'Machine Learning Fundamentals Quiz',
      description: 'Comprehensive assessment covering basic ML concepts and algorithms',
      difficulty: 'Intermediate',
      mcqCount: 15,
      shortCount: 5,
      totalPoints: 80,
      estimatedTime: '45 minutes',
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      assignedStudents: 34,
      completedAttempts: 28,
      avgScore: 78.5
    },
    {
      id: '2',
      title: 'Neural Networks Deep Assessment',
      description: 'Advanced evaluation of neural network concepts and practical applications',
      difficulty: 'Advanced',
      mcqCount: 20,
      shortCount: 8,
      totalPoints: 120,
      estimatedTime: '60 minutes',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      assignedStudents: 22,
      completedAttempts: 18,
      avgScore: 82.3
    },
    {
      id: '3',
      title: 'Data Science Basics Evaluation',
      description: 'Assessment covering statistical analysis and data visualization',
      difficulty: 'Beginner',
      mcqCount: 12,
      shortCount: 4,
      totalPoints: 60,
      estimatedTime: '30 minutes',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      assignedStudents: 48,
      completedAttempts: 41,
      avgScore: 85.7
    },
    {
      id: '4',
      title: 'Python Programming Assessment',
      description: 'Practical coding assessment focusing on Python fundamentals',
      difficulty: 'Intermediate',
      mcqCount: 18,
      shortCount: 6,
      totalPoints: 100,
      estimatedTime: '50 minutes',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      assignedStudents: 29,
      completedAttempts: 24,
      avgScore: 76.8
    },
    {
      id: '5',
      title: 'Database Design Quiz',
      description: 'Assessment on relational database concepts and SQL queries',
      difficulty: 'Advanced',
      mcqCount: 16,
      shortCount: 7,
      totalPoints: 90,
      estimatedTime: '55 minutes',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      assignedStudents: 31,
      completedAttempts: 26,
      avgScore: 81.2
    },
    {
      id: '6',
      title: 'Artificial Intelligence Ethics',
      description: 'Assessment on ethical considerations in AI development and deployment',
      difficulty: 'Advanced',
      mcqCount: 25,
      shortCount: 10,
      totalPoints: 150,
      estimatedTime: '75 minutes',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      assignedStudents: 35,
      completedAttempts: 32,
      avgScore: 87.2
    },
    {
      id: '7',
      title: 'Web Development Full Stack',
      description: 'Complete assessment covering frontend and backend web technologies',
      difficulty: 'Intermediate',
      mcqCount: 20,
      shortCount: 8,
      totalPoints: 120,
      estimatedTime: '60 minutes',
      createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      assignedStudents: 42,
      completedAttempts: 38,
      avgScore: 79.8
    },
    {
      id: '8',
      title: 'Cybersecurity Fundamentals',
      description: 'Basic cybersecurity principles and threat assessment',
      difficulty: 'Beginner',
      mcqCount: 15,
      shortCount: 5,
      totalPoints: 75,
      estimatedTime: '40 minutes',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      assignedStudents: 38,
      completedAttempts: 35,
      avgScore: 82.5
    }
  ]);
  const [activeView, setActiveView] = useState<'create' | 'my-assessments'>('create');
  const [showAILoader, setShowAILoader] = useState(false);
  const [showGeneratedAssessment, setShowGeneratedAssessment] = useState(false);

  const getStepPrompt = (step: ConversationStep): string => {
    switch (step) {
      case 'topic':
        return "Great! What topic would you like to create an assessment for? (e.g., Machine Learning, Data Structures, Mathematics, etc.)";
      case 'description':
        return "Perfect! Now, please provide a brief description of what this assessment should cover. What specific concepts or skills should it evaluate?";
      case 'type':
        return "Excellent! What type of assessment would you like to create?\n\n📝 **Quiz** - Quick knowledge check\n📋 **Exam** - Comprehensive evaluation\n🔬 **Lab Assessment** - Practical skills test\n📊 **Project Review** - Creative/applied work\n\nJust tell me which type you prefer!";
      case 'difficulty':
        return "Great choice! What difficulty level should this assessment be?\n\n🟢 **Beginner** - Basic concepts and definitions\n🟡 **Intermediate** - Applied knowledge and analysis\n🔴 **Advanced** - Complex problem-solving and synthesis\n\nWhich level fits your students?";
      case 'questions':
        return "Perfect! Now let's determine the question structure. Please tell me:\n\n• How many **multiple choice** questions?\n• How many **short answer** questions?\n• How many **essay/long answer** questions?\n\nFor example: '10 MCQ, 5 short answer, 2 essays' or just let me know your preferences!";
      case 'timeLimit':
        return "Excellent! How much time should students have to complete this assessment? (e.g., 30 minutes, 1 hour, 2 hours)";
      case 'instructions':
        return "Almost done! Any special instructions or guidelines for students? (e.g., 'Open book allowed', 'Calculator permitted', 'No collaboration', etc.) Or just say 'standard' for default instructions.";
      default:
        return "I'm ready to create your assessment! Let me generate it now...";
    }
  };

  const processUserResponse = (response: string, step: ConversationStep) => {
    const lowerResponse = response.toLowerCase();
    
    switch (step) {
      case 'topic':
        setAssessmentData(prev => ({ ...prev, topic: response }));
        setCurrentStep('description');
        break;
      case 'description':
        setAssessmentData(prev => ({ ...prev, description: response }));
        setCurrentStep('type');
        break;
      case 'type':
        let type = 'Quiz';
        if (lowerResponse.includes('exam')) type = 'Exam';
        else if (lowerResponse.includes('lab')) type = 'Lab Assessment';
        else if (lowerResponse.includes('project')) type = 'Project Review';
        setAssessmentData(prev => ({ ...prev, type }));
        setCurrentStep('difficulty');
        break;
      case 'difficulty':
        let difficulty = 'Intermediate';
        if (lowerResponse.includes('beginner') || lowerResponse.includes('basic')) difficulty = 'Beginner';
        else if (lowerResponse.includes('advanced') || lowerResponse.includes('hard')) difficulty = 'Advanced';
        setAssessmentData(prev => ({ ...prev, difficulty }));
        setCurrentStep('questions');
        break;
      case 'questions':
        // Parse question counts from response
        const mcqMatch = response.match(/(\d+).*mcq|(\d+).*multiple/i);
        const shortMatch = response.match(/(\d+).*short/i);
        const essayMatch = response.match(/(\d+).*essay|(\d+).*long/i);
        
        const mcqCount = mcqMatch ? parseInt(mcqMatch[1] || mcqMatch[2]) : 10;
        const shortCount = shortMatch ? parseInt(shortMatch[1]) : 5;
        const essayCount = essayMatch ? parseInt(essayMatch[1]) : 0;
        
        setAssessmentData(prev => ({ 
          ...prev, 
          mcqCount,
          shortCount,
          essayCount
        }));
        setCurrentStep('timeLimit');
        break;
      case 'timeLimit':
        const timeMatch = response.match(/(\d+)/);
        const timeLimit = timeMatch ? `${timeMatch[1]} minutes` : '45 minutes';
        setAssessmentData(prev => ({ ...prev, timeLimit }));
        setCurrentStep('instructions');
        break;
      case 'instructions':
        const instructions = lowerResponse === 'standard' ? 'Follow standard academic integrity guidelines' : response;
        setAssessmentData(prev => ({ ...prev, instructions }));
        setCurrentStep('complete');
        
        // Immediately trigger AI generation after setting complete step
        setTimeout(() => {
          triggerAIGeneration();
        }, 100);
        break;
    }
  };

  const triggerAIGeneration = async () => {
    // Trigger AI loader modal
    setShowAILoader(true);
    
    // Show AI generation stages
    const stages = [
      "🤖 Analyzing your assessment requirements...",
      "📚 Researching topic and generating content framework...", 
      "🎯 Creating targeted questions based on difficulty level...",
      "✅ Generating multiple choice questions...",
      "📝 Crafting short answer questions...",
      "💡 Adding explanations and feedback...",
      "🔍 Reviewing and optimizing assessment structure...",
      "🎉 Finalizing your assessment!"
    ];

    for (let i = 0; i < stages.length; i++) {
      setAiStage(stages[i]);
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Generate the actual assessment with complete dummy data
    const finalAssessmentData: AssessmentData = {
      topic: assessmentData.topic || 'Machine Learning',
      description: assessmentData.description || 'Comprehensive assessment covering fundamental ML concepts and practical applications',
      type: assessmentData.type || 'Quiz',
      difficulty: assessmentData.difficulty || 'Intermediate',
      mcqCount: assessmentData.mcqCount || 10,
      shortCount: assessmentData.shortCount || 5,
      essayCount: assessmentData.essayCount || 2,
      timeLimit: assessmentData.timeLimit || '60 minutes',
      instructions: assessmentData.instructions || 'Follow standard academic integrity guidelines. Use your own knowledge and reasoning.'
    };
    
    const generatedQuestions = generateAssessmentQuestions(finalAssessmentData);
    
    const assessment: GeneratedAssessment = {
      id: Date.now().toString(),
      title: `${finalAssessmentData.topic} ${finalAssessmentData.type}`,
      description: finalAssessmentData.description,
      instructions: finalAssessmentData.instructions,
      timeLimit: finalAssessmentData.timeLimit,
      difficulty: finalAssessmentData.difficulty,
      questions: generatedQuestions,
      totalPoints: generatedQuestions.reduce((sum, q) => sum + q.points, 0)
    };

    setGeneratedAssessment(assessment);
    setShowAILoader(false);
    setShowGeneratedAssessment(true);
    setAiStage("");
  };

  const resetConversation = () => {
    setMessages([
      {
        id: '1',
        text: "Welcome to AI Assessment Creator! I'll help you create comprehensive assessments for your students. What topic would you like to create an assessment for?",
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
    setCurrentStep('topic');
    setAssessmentData({});
    setInputText("");
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputText;
    setInputText("");
    setIsGenerating(true);

    let botResponseText = "";
    
    // Process current step and move to next
    processUserResponse(currentInput, currentStep);
    
    // Get next step response (unless we just completed)
    if (currentStep !== 'complete') {
      botResponseText = getStepPrompt(currentStep === 'topic' ? 'description' : 
                                    currentStep === 'description' ? 'type' :
                                    currentStep === 'type' ? 'difficulty' :
                                    currentStep === 'difficulty' ? 'questions' :
                                    currentStep === 'questions' ? 'timeLimit' :
                                    currentStep === 'timeLimit' ? 'instructions' : 'complete');

      // Simulate AI thinking time
      await new Promise(resolve => setTimeout(resolve, 1200));

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    }
    
    setIsGenerating(false);
  };

  const generateAssessmentQuestions = (data: AssessmentData): GeneratedQuestion[] => {
    const questions: GeneratedQuestion[] = [];
    let questionId = 1;

    // Generate comprehensive MCQ questions with realistic content
    const mcqTopics = [
      "fundamental concepts and definitions",
      "practical applications and use cases", 
      "theoretical frameworks and models",
      "best practices and methodologies",
      "problem-solving approaches",
      "implementation strategies",
      "performance optimization techniques",
      "security considerations",
      "future trends and developments",
      "industry standards and protocols"
    ];

    for (let i = 0; i < (data.mcqCount || 10); i++) {
      const topicIndex = i % mcqTopics.length;
      questions.push({
        id: questionId.toString(),
        type: 'mcq',
        question: `Which of the following best describes ${mcqTopics[topicIndex]} in ${data.topic || 'the given subject'}?`,
        options: [
          `A comprehensive approach that emphasizes ${data.topic || 'core'} principles and systematic implementation`,
          `A methodology focusing on ${data.topic || 'practical'} applications with measurable outcomes`,
          `An advanced technique that combines ${data.topic || 'theoretical'} knowledge with hands-on experience`,
          `A standard framework used in ${data.topic || 'modern'} industry practices and protocols`
        ],
        correctAnswer: 'A',
        points: 2,
        explanation: `This question evaluates understanding of ${mcqTopics[topicIndex]} in ${data.topic || 'the subject area'}, testing both conceptual knowledge and practical application.`
      });
      questionId++;
    }

    // Generate comprehensive short answer questions
    const shortAnswerPrompts = [
      "Explain the key principles and provide a practical example",
      "Compare and contrast different approaches, highlighting advantages",
      "Describe the implementation process with specific steps",
      "Analyze potential challenges and propose solutions",
      "Evaluate the effectiveness and suggest improvements"
    ];

    for (let i = 0; i < (data.shortCount || 5); i++) {
      const promptIndex = i % shortAnswerPrompts.length;
      questions.push({
        id: questionId.toString(),
        type: 'short',
        question: `${shortAnswerPrompts[promptIndex]} related to ${data.topic || 'the subject area'}. Support your answer with relevant examples and justify your reasoning.`,
        points: 5,
        explanation: `This question assesses comprehension, analysis, and application skills in ${data.topic || 'the subject'}, requiring students to demonstrate both theoretical knowledge and practical understanding.`
      });
      questionId++;
    }

    // Generate comprehensive essay questions
    const essayTopics = [
      "impact on modern practices and future implications",
      "evolution, current state, and predicted developments", 
      "advantages, limitations, and optimization strategies",
      "role in solving complex real-world problems",
      "ethical considerations and responsible implementation"
    ];

    for (let i = 0; i < (data.essayCount || 3); i++) {
      const topicIndex = i % essayTopics.length;
      questions.push({
        id: questionId.toString(),
        type: 'essay',
        question: `Critically analyze the ${essayTopics[topicIndex]} of ${data.topic || 'the subject area'}. In your response, discuss relevant theories, provide concrete examples, evaluate different perspectives, and present a well-reasoned conclusion about its significance in the field.`,
        points: 10,
        explanation: `This essay question requires advanced analytical thinking, comprehensive understanding of ${data.topic || 'the subject'}, and the ability to synthesize information from multiple sources to form coherent arguments.`
      });
      questionId++;
    }

    return questions;
  };

  const saveAssessment = () => {
    if (!generatedAssessment) return;

    const newSavedAssessment: SavedAssessment = {
      id: generatedAssessment.id,
      title: generatedAssessment.title,
      description: generatedAssessment.description,
      difficulty: generatedAssessment.difficulty,
      mcqCount: generatedAssessment.questions.filter(q => q.type === 'mcq').length,
      shortCount: generatedAssessment.questions.filter(q => q.type === 'short').length,
      totalPoints: generatedAssessment.totalPoints,
      estimatedTime: generatedAssessment.timeLimit,
      createdAt: new Date(),
      assignedStudents: 0,
      completedAttempts: 0,
      avgScore: 0
    };

    setSavedAssessments(prev => [newSavedAssessment, ...prev]);
    
    // Reset and go back to chat
    setGeneratedAssessment(null);
    setShowAssessmentView(false);
    setIsEditMode(false);
    resetConversation();
  };

  const handleAssignStudents = (assessment: SavedAssessment) => {
    setSelectedAssessment(assessment);
    setSelectedStudents([]);
    setShowStudentSelection(true);
  };

  const handleViewInsights = (assessment: SavedAssessment) => {
    setSelectedAssessment(assessment);
    setShowInsights(true);
  };

  const handleStudentSelection = (studentId: string, checked: boolean) => {
    if (checked) {
      setSelectedStudents(prev => [...prev, studentId]);
    } else {
      setSelectedStudents(prev => prev.filter(id => id !== studentId));
    }
  };

  const confirmAssignment = () => {
    if (selectedAssessment && selectedStudents.length > 0) {
      setSavedAssessments(prev => 
        prev.map(assessment => 
          assessment.id === selectedAssessment.id 
            ? { ...assessment, assignedStudents: assessment.assignedStudents + selectedStudents.length }
            : assessment
        )
      );
      setShowStudentSelection(false);
      setSelectedStudents([]);
      setSelectedAssessment(null);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Show generated assessment view
  if (showAssessmentView && generatedAssessment) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={() => {
                setShowAssessmentView(false);
                setGeneratedAssessment(null);
                setIsEditMode(false);
              }}
              className="text-ai-primary"
            >
              ← Back to Creator
            </Button>
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <FileText className="w-6 h-6 mr-2 text-ai-primary" />
                Generated Assessment
              </h2>
              <p className="text-muted-foreground">Review and edit your AI-generated assessment</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              <Edit className="w-4 h-4 mr-2" />
              {isEditMode ? 'View Mode' : 'Edit Mode'}
            </Button>
            <Button
              variant="ai"
              onClick={saveAssessment}
            >
              <Save className="w-4 h-4 mr-2" />
              Save to My Assessments
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                {isEditMode ? (
                  <Input
                    value={generatedAssessment.title}
                    onChange={(e) => setGeneratedAssessment(prev => prev ? {...prev, title: e.target.value} : null)}
                    className="text-2xl font-bold"
                  />
                ) : (
                  <CardTitle className="text-2xl">{generatedAssessment.title}</CardTitle>
                )}
                {isEditMode ? (
                  <Textarea
                    value={generatedAssessment.description}
                    onChange={(e) => setGeneratedAssessment(prev => prev ? {...prev, description: e.target.value} : null)}
                    className="mt-2"
                  />
                ) : (
                  <CardDescription className="mt-2">{generatedAssessment.description}</CardDescription>
                )}
              </div>
              <Badge variant="outline" className="text-lg px-4 py-2">
                {generatedAssessment.difficulty}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-ai-primary" />
                <span className="font-medium">{generatedAssessment.timeLimit}</span>
              </div>
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-ai-primary" />
                <span className="font-medium">{generatedAssessment.questions.length} Questions</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-ai-primary" />
                <span className="font-medium">{generatedAssessment.totalPoints} Points</span>
              </div>
              <div className="flex items-center space-x-2">
                <Target className="w-5 h-5 text-ai-primary" />
                <span className="font-medium">{generatedAssessment.difficulty} Level</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Instructions</h3>
              {isEditMode ? (
                <Textarea
                  value={generatedAssessment.instructions}
                  onChange={(e) => setGeneratedAssessment(prev => prev ? {...prev, instructions: e.target.value} : null)}
                  rows={3}
                />
              ) : (
                <p className="text-muted-foreground bg-muted p-3 rounded-lg">{generatedAssessment.instructions}</p>
              )}
            </div>

            <ScrollArea className="h-[600px]">
              <div className="space-y-6">
                {generatedAssessment.questions.map((question, index) => (
                  <Card key={question.id} className="border-l-4 border-l-ai-primary">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg flex items-center">
                          <span className="bg-ai-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                            {index + 1}
                          </span>
                          {question.type === 'mcq' && <HelpCircle className="w-5 h-5 mr-2" />}
                          {question.type === 'short' && <PenTool className="w-5 h-5 mr-2" />}
                          {question.type === 'essay' && <BookOpen className="w-5 h-5 mr-2" />}
                          {question.type.toUpperCase()} Question
                        </CardTitle>
                        <Badge variant="secondary">{question.points} pts</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {isEditMode ? (
                          <Textarea
                            value={question.question}
                            onChange={(e) => {
                              const updatedQuestions = generatedAssessment.questions.map(q =>
                                q.id === question.id ? {...q, question: e.target.value} : q
                              );
                              setGeneratedAssessment(prev => prev ? {...prev, questions: updatedQuestions} : null);
                            }}
                            rows={2}
                          />
                        ) : (
                          <p className="text-lg">{question.question}</p>
                        )}
                        
                        {question.type === 'mcq' && question.options && (
                          <div className="space-y-2">
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-2">
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm ${
                                  String.fromCharCode(65 + optionIndex) === question.correctAnswer 
                                    ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                                    : 'bg-muted text-muted-foreground'
                                }`}>
                                  {String.fromCharCode(65 + optionIndex)}
                                </div>
                                {isEditMode ? (
                                  <Input
                                    value={option}
                                    onChange={(e) => {
                                      const updatedQuestions = generatedAssessment.questions.map(q =>
                                        q.id === question.id ? {
                                          ...q, 
                                          options: q.options?.map((opt, i) => i === optionIndex ? e.target.value : opt)
                                        } : q
                                      );
                                      setGeneratedAssessment(prev => prev ? {...prev, questions: updatedQuestions} : null);
                                    }}
                                    className="flex-1"
                                  />
                                ) : (
                                  <span>{option}</span>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {question.explanation && (
                          <div className="bg-blue-50 border-l-4 border-blue-200 p-3 rounded">
                            <p className="text-sm text-blue-800">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (activeView === 'my-assessments') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              onClick={() => setActiveView('create')}
              className="text-ai-primary"
            >
              ← Back to Creator
            </Button>
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <FileCheck className="w-6 h-6 mr-2 text-ai-primary" />
                My Assessments
              </h2>
              <p className="text-muted-foreground">Manage and track your created assessments</p>
            </div>
          </div>
          <Button
            variant="ai"
            onClick={() => setActiveView('create')}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Assessment
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedAssessments.map((assessment) => (
            <Card key={assessment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{assessment.title}</span>
                  <Badge variant="outline" className="ml-2">
                    {assessment.difficulty}
                  </Badge>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {assessment.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Target className="w-3 h-3" />
                    <span>{assessment.totalPoints} pts</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{assessment.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{assessment.assignedStudents} assigned</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>{assessment.completedAttempts} completed</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span>Completion Rate</span>
                    <span>{assessment.assignedStudents > 0 ? Math.round((assessment.completedAttempts / assessment.assignedStudents) * 100) : 0}%</span>
                  </div>
                  {assessment.assignedStudents > 0 && (
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-ai-primary h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${(assessment.completedAttempts / assessment.assignedStudents) * 100}%` }}
                      />
                    </div>
                  )}
                </div>

                {assessment.completedAttempts > 0 && (
                  <div className="pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Average Score</span>
                      <span className="font-semibold text-ai-primary">{assessment.avgScore}%</span>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleAssignStudents(assessment)}
                  >
                    <UserCheck className="w-3 h-3 mr-1" />
                    Assign
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => handleViewInsights(assessment)}
                  >
                    <Eye className="w-3 h-3 mr-1" />
                    Insights
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Student Assignment Dialog */}
        <Dialog open={showStudentSelection} onOpenChange={setShowStudentSelection}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-ai-primary" />
                Assign Assessment to Students
              </DialogTitle>
            </DialogHeader>
            {selectedAssessment && (
              <div className="mb-4 p-3 bg-muted rounded-lg">
                <p className="font-medium">{selectedAssessment.title}</p>
                <p className="text-sm text-muted-foreground">{selectedAssessment.description}</p>
              </div>
            )}
            <ScrollArea className="max-h-96">
              <div className="space-y-4">
                {students.filter(student => student.enrolled).map((student) => (
                  <div key={student.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={(checked) => handleStudentSelection(student.id, !!checked)}
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{student.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    <Badge variant="secondary">Enrolled</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex justify-between items-center mt-4">
              <p className="text-sm text-muted-foreground">
                {selectedStudents.length} of {students.filter(s => s.enrolled).length} students selected
              </p>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={() => setShowStudentSelection(false)}>
                  Cancel
                </Button>
                <Button onClick={confirmAssignment} disabled={selectedStudents.length === 0}>
                  <UserCheck className="w-4 h-4 mr-2" />
                  Assign to {selectedStudents.length} Student{selectedStudents.length !== 1 ? 's' : ''}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Assessment Insights Dialog */}
        <Dialog open={showInsights} onOpenChange={setShowInsights}>
          <DialogContent className="max-w-4xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-ai-primary" />
                Assessment Insights & Analytics
              </DialogTitle>
            </DialogHeader>
            {selectedAssessment && (
              <ScrollArea className="max-h-[60vh]">
                <div className="space-y-6">
                  {/* Assessment Overview */}
                  <div className="p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">{selectedAssessment.title}</h3>
                    <p className="text-muted-foreground">{selectedAssessment.description}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <Badge variant="outline">{selectedAssessment.difficulty}</Badge>
                      <span className="text-sm text-muted-foreground">
                        Created {selectedAssessment.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Users className="w-5 h-5 text-blue-500" />
                          <div>
                            <p className="text-2xl font-bold">{selectedAssessment.assignedStudents}</p>
                            <p className="text-sm text-muted-foreground">Students Assigned</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="text-2xl font-bold">{selectedAssessment.completedAttempts}</p>
                            <p className="text-sm text-muted-foreground">Completed</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-5 h-5 text-purple-500" />
                          <div>
                            <p className="text-2xl font-bold">{selectedAssessment.avgScore.toFixed(1)}%</p>
                            <p className="text-sm text-muted-foreground">Average Score</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-2">
                          <Award className="w-5 h-5 text-yellow-500" />
                          <div>
                            <p className="text-2xl font-bold">
                              {selectedAssessment.assignedStudents > 0 
                                ? Math.round((selectedAssessment.completedAttempts / selectedAssessment.assignedStudents) * 100)
                                : 0}%
                            </p>
                            <p className="text-sm text-muted-foreground">Completion Rate</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Student Performance Details */}
                  {assessmentInsights[selectedAssessment.id] && (
                    <Card>
                      <CardHeader>
                        <CardTitle>Individual Student Performance</CardTitle>
                        <CardDescription>
                          Detailed breakdown of student scores and completion times
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {assessmentInsights[selectedAssessment.id].map((insight, index) => (
                            <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="font-medium">{insight.studentName.charAt(0)}</span>
                                </div>
                                <div>
                                  <p className="font-medium">{insight.studentName}</p>
                                  <p className="text-sm text-muted-foreground">
                                    Completed on {insight.completedAt.toLocaleDateString()} • 
                                    Time spent: {insight.timeSpent}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center space-x-2">
                                  <Badge 
                                    variant={insight.score >= 80 ? "default" : insight.score >= 60 ? "secondary" : "destructive"}
                                    className="text-lg px-3 py-1"
                                  >
                                    {insight.score}%
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {insight.attempts} attempt{insight.attempts !== 1 ? 's' : ''}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Performance Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <p className="text-sm font-medium text-green-800">Excellent (80-100%)</p>
                          <p className="text-2xl font-bold text-green-600">
                            {assessmentInsights[selectedAssessment.id]?.filter(i => i.score >= 80).length || 0}
                          </p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <p className="text-sm font-medium text-yellow-800">Good (60-79%)</p>
                          <p className="text-2xl font-bold text-yellow-600">
                            {assessmentInsights[selectedAssessment.id]?.filter(i => i.score >= 60 && i.score < 80).length || 0}
                          </p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                          <p className="text-sm font-medium text-red-808">Needs Improvement (0-59%)</p>
                          <p className="text-2xl font-bold text-red-600">
                            {assessmentInsights[selectedAssessment.id]?.filter(i => i.score < 60).length || 0}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            )}
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <Brain className="w-6 h-6 mr-2 text-ai-primary" />
            AI Assessment Creator
          </h2>
          <p className="text-muted-foreground">Create intelligent assessments with AI assistance</p>
        </div>
        <Button
          variant="outline"
          onClick={() => setActiveView('my-assessments')}
        >
          <FileCheck className="w-4 h-4 mr-2" />
          My Assessments ({savedAssessments.length})
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-ai-primary" />
                AI Assessment Assistant
              </CardTitle>
              <CardDescription>
                Chat with AI to create customized assessments for your students
              </CardDescription>
            </CardHeader>
            
            <ScrollArea className="flex-1 p-4 max-h-[400px]">
              <div className="space-y-4 pr-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start space-x-3 ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
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
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isGenerating && (
                  <div className="flex items-center space-x-3 text-muted-foreground">
                    <div className="w-8 h-8 rounded-full bg-ai-primary/10 flex items-center justify-center">
                      <Bot className="w-4 h-4 text-ai-primary animate-pulse" />
                    </div>
                    <div className="bg-muted px-4 py-2 rounded-lg max-w-md">
                      <div className="flex items-center space-x-2 mb-2">
                        <Loader2 className="w-4 h-4 text-ai-primary animate-spin" />
                        <span className="text-sm font-medium">AI Assessment Generator</span>
                      </div>
                      {aiStage && (
                        <div className="text-sm text-muted-foreground">
                          {aiStage}
                        </div>
                      )}
                      {!aiStage && (
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-ai-primary rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-ai-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-ai-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          <span className="text-sm ml-2">AI is thinking...</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <Input
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Describe the assessment you want to create..."
                  disabled={isGenerating}
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isGenerating}
                  size="sm"
                  variant="ai"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={triggerAIGeneration}
              >
                <Wand2 className="w-4 h-4 mr-2" />
                Test AI Generation
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={resetConversation}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create New Assessment
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => setActiveView('my-assessments')}
              >
                <Eye className="w-4 h-4 mr-2" />
                View My Assessments
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Assessment Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Total Assessments</span>
                  <span className="font-semibold">{savedAssessments.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Students Assigned</span>
                  <span className="font-semibold">{savedAssessments.reduce((acc, curr) => acc + curr.assignedStudents, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Completed Attempts</span>
                  <span className="font-semibold">{savedAssessments.reduce((acc, curr) => acc + curr.completedAttempts, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Avg Success Rate</span>
                  <span className="font-semibold text-ai-success">
                    {savedAssessments.length > 0 
                      ? Math.round(savedAssessments.reduce((acc, curr) => acc + curr.avgScore, 0) / savedAssessments.length)
                      : 0}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Generation Loader Modal */}
      <Dialog open={showAILoader} onOpenChange={() => {}}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center text-center">
              <Brain className="w-6 h-6 mr-2 text-ai-primary animate-pulse" />
              AI Assessment Generator
            </DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-ai-primary/20 to-ai-secondary/20 rounded-full flex items-center justify-center">
                <Wand2 className="w-10 h-10 text-ai-primary animate-spin" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-ai-accent rounded-full animate-bounce" />
              <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-ai-success rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Generating Your Assessment</h3>
              <p className="text-muted-foreground">
                Our AI is working hard to create a comprehensive assessment tailored to your requirements
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <Loader2 className="w-5 h-5 animate-spin text-ai-primary" />
                <span className="text-sm">{aiStage || "Initializing AI agents..."}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs text-muted-foreground">Powered by Advanced AI</div>
              <div className="flex justify-center space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-2 h-2 bg-ai-primary rounded-full animate-bounce"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Generated Assessment Modal */}
      <Dialog open={showGeneratedAssessment} onOpenChange={setShowGeneratedAssessment}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div className="flex items-center">
                <FileText className="w-6 h-6 mr-2 text-ai-primary" />
                Generated Assessment
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditMode(!isEditMode)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditMode ? 'Preview' : 'Edit'}
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    if (generatedAssessment) {
                      const newAssessment: SavedAssessment = {
                        id: generatedAssessment.id,
                        title: generatedAssessment.title,
                        description: generatedAssessment.description,
                        difficulty: generatedAssessment.difficulty,
                        mcqCount: generatedAssessment.questions.filter(q => q.type === 'mcq').length,
                        shortCount: generatedAssessment.questions.filter(q => q.type === 'short').length,
                        totalPoints: generatedAssessment.totalPoints,
                        estimatedTime: generatedAssessment.timeLimit,
                        createdAt: new Date(),
                        assignedStudents: 0,
                        completedAttempts: 0,
                        avgScore: 0
                      };
                      setSavedAssessments(prev => [newAssessment, ...prev]);
                      setShowGeneratedAssessment(false);
                      setActiveView('my-assessments');
                    }
                  }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save to My Assessments
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          
          {generatedAssessment && (
            <ScrollArea className="max-h-[75vh]">
              <div className="space-y-6 p-1">
                {/* Assessment Header */}
                <Card>
                  <CardHeader>
                    <div className="space-y-4">
                      {isEditMode ? (
                        <Input
                          value={generatedAssessment.title}
                          onChange={(e) => setGeneratedAssessment(prev => 
                            prev ? { ...prev, title: e.target.value } : null
                          )}
                          className="text-2xl font-bold"
                          placeholder="Assessment Title"
                        />
                      ) : (
                        <CardTitle className="text-2xl">{generatedAssessment.title}</CardTitle>
                      )}
                      
                      {isEditMode ? (
                        <Textarea
                          value={generatedAssessment.description}
                          onChange={(e) => setGeneratedAssessment(prev => 
                            prev ? { ...prev, description: e.target.value } : null
                          )}
                          placeholder="Assessment Description"
                          rows={2}
                        />
                      ) : (
                        <CardDescription className="text-base">{generatedAssessment.description}</CardDescription>
                      )}

                      <div className="flex flex-wrap gap-4">
                        <Badge variant="outline" className="px-3 py-1">
                          <Target className="w-3 h-3 mr-1" />
                          {generatedAssessment.difficulty}
                        </Badge>
                        <Badge variant="outline" className="px-3 py-1">
                          <Clock className="w-3 h-3 mr-1" />
                          {generatedAssessment.timeLimit}
                        </Badge>
                        <Badge variant="outline" className="px-3 py-1">
                          <Award className="w-3 h-3 mr-1" />
                          {generatedAssessment.totalPoints} Points
                        </Badge>
                        <Badge variant="outline" className="px-3 py-1">
                          <HelpCircle className="w-3 h-3 mr-1" />
                          {generatedAssessment.questions.length} Questions
                        </Badge>
                      </div>

                      {isEditMode ? (
                        <Textarea
                          value={generatedAssessment.instructions}
                          onChange={(e) => setGeneratedAssessment(prev => 
                            prev ? { ...prev, instructions: e.target.value } : null
                          )}
                          placeholder="Instructions for students"
                          rows={2}
                        />
                      ) : (
                        <div className="bg-blue-50 border-l-4 border-blue-200 p-4 rounded">
                          <h4 className="font-medium text-blue-900 mb-2">Instructions:</h4>
                          <p className="text-blue-800">{generatedAssessment.instructions}</p>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                </Card>

                {/* Questions */}
                <div className="space-y-4">
                  {generatedAssessment.questions.map((question, index) => (
                    <Card key={question.id} className="border-l-4 border-l-ai-primary">
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">
                              Question {index + 1}
                            </Badge>
                            <Badge variant="secondary">
                              {question.type.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">
                              {question.points} pts
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {isEditMode ? (
                          <Textarea
                            value={question.question}
                            onChange={(e) => {
                              const updatedQuestions = generatedAssessment.questions.map(q =>
                                q.id === question.id ? { ...q, question: e.target.value } : q
                              );
                              setGeneratedAssessment(prev => prev ? {...prev, questions: updatedQuestions} : null);
                            }}
                            rows={2}
                            className="text-lg"
                          />
                        ) : (
                          <p className="text-lg font-medium">{question.question}</p>
                        )}
                        
                        {question.type === 'mcq' && question.options && (
                          <div className="space-y-3">
                            {question.options.map((option, optionIndex) => (
                              <div key={optionIndex} className="flex items-center space-x-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                  String.fromCharCode(65 + optionIndex) === question.correctAnswer 
                                    ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                                    : 'bg-muted text-muted-foreground border'
                                }`}>
                                  {String.fromCharCode(65 + optionIndex)}
                                </div>
                                {isEditMode ? (
                                  <Input
                                    value={option}
                                    onChange={(e) => {
                                      const updatedQuestions = generatedAssessment.questions.map(q =>
                                        q.id === question.id ? {
                                          ...q, 
                                          options: q.options?.map((opt, i) => i === optionIndex ? e.target.value : opt)
                                        } : q
                                      );
                                      setGeneratedAssessment(prev => prev ? {...prev, questions: updatedQuestions} : null);
                                    }}
                                    className="flex-1"
                                  />
                                ) : (
                                  <span className="flex-1">{option}</span>
                                )}
                                {String.fromCharCode(65 + optionIndex) === question.correctAnswer && (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {question.type === 'short' && (
                          <div className="border-2 border-dashed border-muted rounded-lg p-4">
                            <p className="text-muted-foreground text-center">
                              Short answer response area (students will type their answer here)
                            </p>
                          </div>
                        )}

                        {question.type === 'essay' && (
                          <div className="border-2 border-dashed border-muted rounded-lg p-6">
                            <p className="text-muted-foreground text-center">
                              Essay response area (students will write their detailed answer here)
                            </p>
                          </div>
                        )}
                        
                        {question.explanation && (
                          <div className="bg-blue-50 border-l-4 border-blue-200 p-3 rounded">
                            <p className="text-sm text-blue-800">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Assessment Summary */}
                <Card className="bg-gradient-to-r from-ai-primary/10 to-ai-secondary/10">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BookOpen className="w-5 h-5 mr-2 text-ai-primary" />
                      Assessment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-ai-primary">
                          {generatedAssessment.questions.filter(q => q.type === 'mcq').length}
                        </div>
                        <div className="text-sm text-muted-foreground">MCQ Questions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-ai-primary">
                          {generatedAssessment.questions.filter(q => q.type === 'short').length}
                        </div>
                        <div className="text-sm text-muted-foreground">Short Answer</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-ai-primary">
                          {generatedAssessment.questions.filter(q => q.type === 'essay').length}
                        </div>
                        <div className="text-sm text-muted-foreground">Essay Questions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-ai-primary">
                          {generatedAssessment.totalPoints}
                        </div>
                        <div className="text-sm text-muted-foreground">Total Points</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};