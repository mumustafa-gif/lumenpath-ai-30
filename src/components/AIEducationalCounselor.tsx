import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Send, User, Bot, BookOpen, Clock, Star, Award } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function AIEducationalCounselor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Educational Counselor. I create personalized study paths based on your interests, learning style, and goals. What subject or field are you most interested in learning about?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const recommendedCourses = [
    {
      title: "Machine Learning Fundamentals",
      duration: "8 weeks",
      difficulty: "Beginner",
      rating: 4.8,
      students: "12,450",
      relevance: "98%"
    },
    {
      title: "Advanced Python Programming",
      duration: "6 weeks", 
      difficulty: "Intermediate",
      rating: 4.9,
      students: "8,920",
      relevance: "95%"
    },
    {
      title: "Data Visualization & Analytics",
      duration: "5 weeks",
      difficulty: "Beginner",
      rating: 4.7,
      students: "15,300",
      relevance: "92%"
    }
  ];

  const studyPath = [
    { phase: "Foundation", courses: 3, duration: "4-6 weeks", status: "current" },
    { phase: "Intermediate", courses: 4, duration: "8-10 weeks", status: "upcoming" },
    { phase: "Advanced", courses: 3, duration: "6-8 weeks", status: "upcoming" },
    { phase: "Specialization", courses: 2, duration: "4-6 weeks", status: "upcoming" }
  ];

  const learningPreferences = [
    { type: "Visual Learning", compatibility: "85%", icon: "👁️" },
    { type: "Hands-on Practice", compatibility: "92%", icon: "🛠️" },
    { type: "Video Content", compatibility: "78%", icon: "📺" },
    { type: "Interactive Quizzes", compatibility: "88%", icon: "🧠" }
  ];

  const generateAIResponse = (userMessage: string) => {
    const responses = [
      `That's a fascinating field! Based on your interest in ${userMessage.toLowerCase()}, I can see you have great potential for learning. Let me analyze your learning preferences and create a customized study path...`,
      `Excellent choice! I've designed a comprehensive learning path for ${userMessage.toLowerCase()} that matches your learning style. The curriculum includes hands-on projects, interactive content, and real-world applications. Would you like me to break down the learning phases?`,
      `Perfect! Based on your interests, I recommend starting with foundational concepts in ${userMessage.toLowerCase()}. I've identified courses that match your visual learning preference and include practical exercises. The estimated completion time is 12-16 weeks.`,
      `Great question! I've analyzed hundreds of successful learning paths for students with similar interests. Here's your personalized study roadmap with recommended courses, timeline, and skill milestones.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(input),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInput('');
  };

  const quickQuestions = [
    "Create my learning roadmap",
    "What should I study first?",
    "How long will it take?",
    "Best courses for beginners"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-ai-secondary/10 rounded-full flex items-center justify-center">
          <GraduationCap className="w-6 h-6 text-ai-secondary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">AI Educational Counselor</h2>
          <p className="text-muted-foreground">Personalized study paths based on your interests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-ai-secondary" />
                Educational Counseling Session
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4 max-h-96">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <Avatar className="w-8 h-8">
                        {message.type === 'user' ? (
                          <>
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                          </>
                        ) : (
                          <AvatarFallback className="bg-ai-secondary/10">
                            <Bot className="w-4 h-4 text-ai-secondary" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-ai-secondary text-white'
                              : 'bg-muted'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Quick Questions */}
              <div className="p-4 border-t bg-muted/30">
                <div className="flex flex-wrap gap-2 mb-3">
                  {quickQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => setInput(question)}
                      className="text-xs"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask about your learning path..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <Button onClick={handleSend} size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Study Path & Recommendations */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-ai-accent" />
                Recommended Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedCourses.map((course, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{course.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {course.relevance}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {course.rating}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>{course.difficulty}</span>
                      <span>{course.students} students</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-ai-primary" />
                Learning Path
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {studyPath.map((phase, index) => (
                <div key={index} className={`p-3 border rounded-lg ${
                  phase.status === 'current' ? 'bg-ai-primary/5 border-ai-primary/20' : ''
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{phase.phase}</h4>
                    {phase.status === 'current' && (
                      <Badge variant="default" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>{phase.courses} courses</div>
                    <div>{phase.duration}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Learning Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {learningPreferences.map((pref, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{pref.icon}</span>
                    <span className="text-sm">{pref.type}</span>
                  </div>
                  <span className="text-xs text-ai-success">{pref.compatibility}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}