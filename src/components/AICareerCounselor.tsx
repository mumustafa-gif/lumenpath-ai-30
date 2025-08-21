import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Brain, Send, User, Bot, Sparkles, Target, TrendingUp, MapPin } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

export function AICareerCounselor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hello! I'm your AI Career Counselor. I analyze your skills, personality, and career goals to recommend the perfect career path. Let's start by understanding your current situation. What's your current profession or area of study?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');

  const careerPaths = [
    { title: "AI/ML Engineer", match: "95%", growth: "+23% by 2030", salary: "$120k-180k" },
    { title: "Data Scientist", match: "88%", growth: "+22% by 2030", salary: "$100k-160k" },
    { title: "DevOps Engineer", match: "82%", growth: "+20% by 2030", salary: "$95k-150k" },
    { title: "Cloud Architect", match: "78%", growth: "+15% by 2030", salary: "$130k-200k" }
  ];

  const skills = [
    { name: "Python", level: 85, demand: "High" },
    { name: "Machine Learning", level: 70, demand: "Critical" },
    { name: "Data Analysis", level: 80, demand: "High" },
    { name: "Communication", level: 75, demand: "Essential" }
  ];

  const generateAIResponse = (userMessage: string) => {
    const responses = [
      `Based on your ${userMessage.toLowerCase()}, I can see great potential for growth in AI and data science fields. Your analytical background aligns perfectly with emerging tech roles. Let me analyze your skill profile...`,
      `That's excellent background! Given your experience in ${userMessage.toLowerCase()}, I recommend focusing on AI/ML Engineering. The market demand is incredibly high, with 95% job growth expected. Would you like me to create a personalized learning roadmap?`,
      `I've analyzed thousands of career transitions, and your profile shows strong compatibility with data science roles. Your combination of technical and analytical skills is highly valued. The average salary range would be $100k-160k. What specific aspects of AI interest you most?`,
      `Perfect! Based on your interests and current skill set, here are my top 3 career recommendations with detailed growth projections and learning paths. Each path is tailored to your personality assessment and market trends.`
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
    "What are the highest paying tech careers?",
    "How do I transition to AI/ML?",
    "What skills are most in-demand?",
    "Create my career roadmap"
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-ai-primary/10 rounded-full flex items-center justify-center">
          <Brain className="w-6 h-6 text-ai-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">AI Career Counselor</h2>
          <p className="text-muted-foreground">Career path recommendations based on skills & personality</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-ai-primary" />
                Career Counseling Session
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0">
              <ScrollArea className="flex-1 p-4">
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
                          <AvatarFallback className="bg-ai-primary/10">
                            <Bot className="w-4 h-4 text-ai-primary" />
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <div className={`max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
                        <div
                          className={`p-3 rounded-lg ${
                            message.type === 'user'
                              ? 'bg-ai-primary text-white'
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
                    placeholder="Ask about your career path..."
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

        {/* Career Recommendations */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-ai-secondary" />
                Top Career Matches
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {careerPaths.map((path, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-sm">{path.title}</h4>
                    <span className="text-xs bg-ai-success/10 text-ai-success px-2 py-1 rounded">
                      {path.match}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {path.growth}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {path.salary}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-ai-accent" />
                Skill Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-ai-primary h-2 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Market Demand: {skill.demand}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}