import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
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
  Award
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
    }
  ]);
  const [activeView, setActiveView] = useState<'create' | 'my-assessments'>('create');

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
        break;
    }
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

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    let botResponseText = "";
    
    if (currentStep === 'complete') {
      // Create the assessment
      const finalAssessmentData = assessmentData as AssessmentData;
      const totalPoints = (finalAssessmentData.mcqCount * 2) + (finalAssessmentData.shortCount * 5) + (finalAssessmentData.essayCount * 10);
      
      const newAssessment: SavedAssessment = {
        id: Date.now().toString(),
        title: `${finalAssessmentData.topic} ${finalAssessmentData.type}`,
        description: finalAssessmentData.description,
        difficulty: finalAssessmentData.difficulty,
        mcqCount: finalAssessmentData.mcqCount,
        shortCount: finalAssessmentData.shortCount,
        totalPoints,
        estimatedTime: finalAssessmentData.timeLimit,
        createdAt: new Date(),
        assignedStudents: 0,
        completedAttempts: 0,
        avgScore: 0
      };

      setSavedAssessments(prev => [newAssessment, ...prev]);
      
      botResponseText = `🎉 **Assessment Created Successfully!**\n\n✅ **${newAssessment.title}**\n📝 ${newAssessment.description}\n🎯 Difficulty: ${newAssessment.difficulty}\n📊 Questions: ${newAssessment.mcqCount} MCQ + ${finalAssessmentData.shortCount} Short Answer + ${finalAssessmentData.essayCount} Essays\n⏱️ Time Limit: ${newAssessment.estimatedTime}\n🏆 Total Points: ${newAssessment.totalPoints}\n\nYour assessment has been saved to **My Assessments**! You can now assign it to students and track their progress. Would you like to create another assessment?`;
      
      // Reset for next assessment
      setTimeout(() => {
        setCurrentStep('topic');
        setAssessmentData({});
      }, 2000);
    } else {
      // Process current step and move to next
      processUserResponse(currentInput, currentStep);
      botResponseText = getStepPrompt(currentStep === 'topic' ? 'description' : 
                                    currentStep === 'description' ? 'type' :
                                    currentStep === 'type' ? 'difficulty' :
                                    currentStep === 'difficulty' ? 'questions' :
                                    currentStep === 'questions' ? 'timeLimit' :
                                    currentStep === 'timeLimit' ? 'instructions' : 'complete');
    }

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponseText,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsGenerating(false);
  };

  const handleAssignStudents = (assessment: SavedAssessment) => {
    setSelectedAssessment(assessment);
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

  const assignToStudents = (assessmentId: string) => {
    // Mock assignment functionality
    setSavedAssessments(prev => 
      prev.map(assessment => 
        assessment.id === assessmentId 
          ? { ...assessment, assignedStudents: assessment.assignedStudents + 15 }
          : assessment
      )
    );
  };

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

      {/* Student Selection Modal */}
      <Dialog open={showStudentSelection} onOpenChange={setShowStudentSelection}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Assessment to Students</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Select students to assign "{selectedAssessment?.title}"
            </p>
            <ScrollArea className="h-64">
              <div className="space-y-2">
                {students.filter(s => s.enrolled).map((student) => (
                  <div key={student.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted">
                    <Checkbox
                      checked={selectedStudents.includes(student.id)}
                      onCheckedChange={(checked) => handleStudentSelection(student.id, checked as boolean)}
                    />
                    <div className="text-2xl">{student.avatar}</div>
                    <div className="flex-1">
                      <p className="font-medium">{student.name}</p>
                      <p className="text-xs text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex justify-between">
              <Button variant="outline" onClick={() => setShowStudentSelection(false)}>
                Cancel
              </Button>
              <Button 
                onClick={confirmAssignment}
                disabled={selectedStudents.length === 0}
                variant="ai"
              >
                Assign to {selectedStudents.length} students
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Insights Modal */}
      <Dialog open={showInsights} onOpenChange={setShowInsights}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Assessment Insights: {selectedAssessment?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Overview Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-ai-primary">{selectedAssessment?.assignedStudents}</div>
                  <div className="text-sm text-muted-foreground">Assigned</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-ai-success">{selectedAssessment?.completedAttempts}</div>
                  <div className="text-sm text-muted-foreground">Completed</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-ai-warning">{selectedAssessment?.avgScore}%</div>
                  <div className="text-sm text-muted-foreground">Avg Score</div>
                </CardContent>
              </Card>
            </div>

            {/* Student Performance */}
            {selectedAssessment && assessmentInsights[selectedAssessment.id] && (
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Student Performance
                </h3>
                <ScrollArea className="h-48">
                  <div className="space-y-2">
                    {assessmentInsights[selectedAssessment.id].map((insight, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{insight.studentName}</p>
                          <p className="text-xs text-muted-foreground">
                            Completed {insight.completedAt.toLocaleDateString()} • {insight.timeSpent} • {insight.attempts} attempt(s)
                          </p>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${
                            insight.score >= 90 ? 'text-ai-success' :
                            insight.score >= 70 ? 'text-ai-warning' : 'text-ai-error'
                          }`}>
                            {insight.score}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};