import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AssessmentGenerator } from "./AssessmentGenerator";
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
  UserCheck
} from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

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
  const [showAssessmentGenerator, setShowAssessmentGenerator] = useState(false);
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
    }
  ]);
  const [activeView, setActiveView] = useState<'create' | 'my-assessments'>('create');

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsGenerating(true);

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: "Great! I'll help you create a detailed assessment for that topic. Let me open the AI Assessment Generator to gather more specific requirements and create your assessment.",
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMessage]);
    setIsGenerating(false);

    // Auto-open assessment generator after response
    setTimeout(() => {
      setShowAssessmentGenerator(true);
    }, 1000);
  };

  const handleAssessmentGenerated = (assessment: any) => {
    const newAssessment: SavedAssessment = {
      id: Date.now().toString(),
      title: assessment.title,
      description: assessment.description,
      difficulty: assessment.metadata.difficulty,
      mcqCount: assessment.mcqs.length,
      shortCount: assessment.shortQuestions.length,
      totalPoints: assessment.metadata.totalPoints,
      estimatedTime: assessment.metadata.estimatedTime,
      createdAt: new Date(),
      assignedStudents: 0,
      completedAttempts: 0,
      avgScore: 0
    };

    setSavedAssessments(prev => [newAssessment, ...prev]);
    
    const successMessage: Message = {
      id: Date.now().toString(),
      text: `✅ Assessment "${assessment.title}" has been successfully created and saved to your My Assessments! You can now assign it to students and track their progress.`,
      sender: 'bot',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, successMessage]);
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
                    onClick={() => assignToStudents(assessment.id)}
                  >
                    <UserCheck className="w-3 h-3 mr-1" />
                    Assign
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
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
            
            <ScrollArea className="flex-1 p-4">
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
                onClick={() => setShowAssessmentGenerator(true)}
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

      {showAssessmentGenerator && (
        <AssessmentGenerator
          onClose={() => setShowAssessmentGenerator(false)}
          onAssessmentGenerated={handleAssessmentGenerated}
        />
      )}
    </div>
  );
};