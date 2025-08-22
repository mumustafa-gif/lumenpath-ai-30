
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User, Lightbulb, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { useSpeech } from "@/hooks/useSpeech";
import { toast } from "sonner";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface ChatInterfaceProps {
  placeholder?: string;
  suggestions?: string[];
  onVisualizationRequest?: (type: string, data: any[], title: string) => void;
}

export const ChatInterface = ({ 
  placeholder = "Ask your AI assistant...", 
  suggestions = [],
  onVisualizationRequest
}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! I'm your AI assistant. I can help you with analytics, learner insights, course performance, and system management. What would you like to know?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [speakEnabled, setSpeakEnabled] = useState(false);
  const lastSpokenIdRef = useRef<string | null>(null);

  // Speech functionality
  const {
    isListening,
    isSpeaking,
    transcript,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  } = useSpeech({
    onTranscription: (text: string) => {
      setInputValue(text);
      toast.success("Speech recognized!");
    },
    onSpeechEnd: () => {
      toast.info("Speech recognition ended");
    },
    onError: (error: string) => {
      toast.error(`Speech error: ${error}`);
    },
  });

  // Auto-speak AI responses (only when enabled by user) with id guard to avoid repeats
  useEffect(() => {
    if (!speakEnabled) return;
    if (messages.length === 0 || isTyping) return;

    const lastMessage = messages[messages.length - 1];
    if (
      lastMessage.sender === "ai" &&
      lastMessage.content?.trim() &&
      lastMessage.id !== lastSpokenIdRef.current
    ) {
      lastSpokenIdRef.current = lastMessage.id;
      // Use browser TTS for reliability during prototyping; skip ElevenLabs until backend is connected
      speak(lastMessage.content, false);
    }
  }, [messages, isTyping, speakEnabled]); // intentionally omit `speak` to avoid identity changes retriggering

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Check for chart/visualization requests
    if (lowerQuery.includes("chart") || lowerQuery.includes("visualize") || lowerQuery.includes("graph")) {
      // Generate mock data based on query type
      let chartData = [];
      let chartTitle = "";
      let chartType = "bar";
      
      if (lowerQuery.includes("skill")) {
        chartData = [
          { name: "Cloud Computing", value: 75 },
          { name: "Data Science", value: 40 },
          { name: "AI/ML", value: 15 },
          { name: "Cybersecurity", value: 65 }
        ];
        chartTitle = "Skill Gaps Analysis";
      } else if (lowerQuery.includes("enrollment") || lowerQuery.includes("course")) {
        chartData = [
          { name: "AI Fundamentals", value: 234 },
          { name: "Data Science", value: 189 },
          { name: "Cloud Computing", value: 156 },
          { name: "DevOps", value: 134 }
        ];
        chartTitle = "Course Enrollments";
      } else if (lowerQuery.includes("completion") || lowerQuery.includes("progress")) {
        chartData = [
          { name: "Jan", value: 65 },
          { name: "Feb", value: 72 },
          { name: "Mar", value: 78 },
          { name: "Apr", value: 83 }
        ];
        chartTitle = "Course Completion Rates Over Time";
        chartType = "line";
      } else {
        chartData = [
          { name: "Total Learners", value: 1247 },
          { name: "Active Courses", value: 24 },
          { name: "Completion Rate", value: 78 },
          { name: "Avg Engagement", value: 85 }
        ];
        chartTitle = "Platform Overview Statistics";
      }
      
      // Trigger visualization immediately
      if (onVisualizationRequest) {
        onVisualizationRequest(chartType, chartData, chartTitle);
      }
      
      return `I'll create a ${chartType} chart showing ${chartTitle.toLowerCase()}. The visualization will open in a separate modal where you can switch between different chart types and export the data.`;
    }
    
    if (lowerQuery.includes("dropout") || lowerQuery.includes("risk")) {
      return "I've analyzed the current dropout risk data. Here are 3 learners with >50% dropout risk:\n\n• Mohammed Al-Hashmi (AI Fundamentals) - Last active 3 days ago\n• Nour Al-Sharif (Cloud Computing) - Last active 5 days ago\n• Amina Al-Zahra (Data Science) - Last active 4 days ago\n\nWould you like me to generate automatic intervention recommendations?";
    }
    
    if (lowerQuery.includes("engagement") || lowerQuery.includes("instructor")) {
      return "Based on engagement metrics, here are the instructors with engagement rates below 70%:\n\n• Prof. Khalid Al-Sabah (Cloud Computing) - 65% engagement\n• Dr. Fatima Al-Qasemi (Advanced ML) - 68% engagement\n\nThe main factors affecting engagement appear to be:\n- Video length (>45 min videos have 23% lower engagement)\n- Quiz difficulty (courses with >85% quiz failure rate)\n\nShould I prepare improvement recommendations?";
    }
    
    if (lowerQuery.includes("quiz") || lowerQuery.includes("failure")) {
      return "Weekly quiz failure trends for DevOps course:\n\n📊 Week 1: 15% failure rate\n📊 Week 2: 23% failure rate\n📊 Week 3: 18% failure rate\n📊 Week 4: 31% failure rate (concerning spike)\n\nMain failure points:\n• Docker containerization (45% fail rate)\n• Kubernetes deployment (38% fail rate)\n• CI/CD pipelines (29% fail rate)\n\nRecommendation: Add prerequisite modules for Docker basics.";
    }
    
    if (lowerQuery.includes("skill") || lowerQuery.includes("gap")) {
      return "Top skill gaps identified across the organization:\n\n🔴 Critical Gaps:\n• Cloud Architecture (78% of teams lack proficiency)\n• Advanced Python (65% skill gap)\n• Machine Learning Operations (72% gap)\n\n🟡 Moderate Gaps:\n• Data Visualization (45% gap)\n• API Development (38% gap)\n\n✅ Well-Covered Skills:\n• Basic Programming (92% proficiency)\n• Project Management (88% proficiency)\n\nShall I create targeted learning paths for critical gaps?";
    }
    
    return "I understand your query. Based on the current system data, I can provide detailed analytics and insights. Could you be more specific about what aspect you'd like me to analyze? I can help with:\n\n• Learner performance and progress tracking\n• Course effectiveness and engagement rates\n• Skill gap analysis and recommendations\n• Risk assessment and intervention strategies\n• Instructor performance metrics\n• Certification and compliance tracking\n\nFor data visualization, try asking: 'Show me a chart of...' or 'Visualize the...'";
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="space-y-4">
      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Lightbulb className="w-4 h-4 mr-1" />
            Quick suggestions:
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Chat Messages */}
      <div className="max-h-96 overflow-y-auto space-y-4 p-4 border rounded-lg bg-muted/20">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
            }`}
          >
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.sender === "ai" 
                ? "bg-ai-primary text-white" 
                : "bg-secondary text-secondary-foreground"
            }`}>
              {message.sender === "ai" ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
            </div>
            <Card className={`max-w-[80%] p-3 ${
              message.sender === "user" 
                ? "bg-primary text-primary-foreground" 
                : "bg-card"
            }`}>
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              <p className={`text-xs mt-2 opacity-70`}>
                {message.timestamp.toLocaleTimeString()}
              </p>
            </Card>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ai-primary text-white flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <Card className="p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-ai-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-ai-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                <div className="w-2 h-2 bg-ai-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Input with Speech Controls */}
      <div className="space-y-3">
        {/* Speech Status */}
        {(isListening || isSpeaking) && (
          <div className="flex items-center justify-center space-x-2 p-2 bg-muted/50 rounded-lg">
            {isListening && (
              <div className="flex items-center space-x-2 text-red-600">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Listening...</span>
              </div>
            )}
            {isSpeaking && (
              <div className="flex items-center space-x-2 text-blue-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Speaking...</span>
              </div>
            )}
          </div>
        )}
        
        {/* Input Row */}
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          
          {/* Speech to Text Button */}
          <Button
            variant={isListening ? "destructive" : "outline"}
            size="icon"
            onClick={isListening ? stopListening : startListening}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
          
          {/* Text to Speech Toggle Button */}
          <Button
            variant={isSpeaking ? "destructive" : speakEnabled ? "default" : "outline"}
            size="icon"
            onClick={
              isSpeaking 
                ? stopSpeaking 
                : () => setSpeakEnabled((v) => {
                    const next = !v;
                    if (next) {
                      // reset last spoken guard to speak the current last AI message immediately
                      lastSpokenIdRef.current = null;
                    }
                    return next;
                  })
            }
            title={isSpeaking ? "Stop speaking" : speakEnabled ? "Disable auto-speak" : "Enable auto-speak"}
          >
            {isSpeaking ? <VolumeX className="w-4 h-4" /> : (speakEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />)}
          </Button>
          
          {/* Send Button */}
          <Button 
            onClick={handleSendMessage} 
            disabled={!inputValue.trim() || isTyping}
            variant="ai"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
