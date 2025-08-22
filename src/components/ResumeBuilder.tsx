import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Download, 
  MessageSquare, 
  FileText, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  GraduationCap,
  Briefcase,
  Award,
  Send,
  Bot,
  Loader2,
  X,
  ChevronRight,
  Sparkles
} from "lucide-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface ResumeData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    bio: string;
    portfolio: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    gpa?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    technologies: string[];
  }>;
  skills: string[];
  achievements: string[];
  languages: Array<{ name: string; level: string }>;
}

interface ChatMessage {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const dummyResumeData: ResumeData = {
  personalInfo: {
    firstName: "Ahmad",
    lastName: "Hassan",
    email: "ahmad.hassan@email.com",
    phone: "+971-50-123-4567",
    location: "Dubai, UAE",
    bio: "Passionate AI researcher and data scientist with expertise in machine learning, deep learning, and natural language processing. Experienced in developing innovative AI solutions for real-world problems.",
    portfolio: "https://ahmadhassan-portfolio.com"
  },
  education: [
    {
      institution: "American University of Sharjah",
      degree: "Master of Science",
      field: "Computer Science - AI Track",
      startDate: "2021",
      endDate: "2023",
      gpa: "3.8/4.0"
    },
    {
      institution: "University of Sharjah",
      degree: "Bachelor of Science",
      field: "Computer Engineering",
      startDate: "2017",
      endDate: "2021",
      gpa: "3.6/4.0"
    }
  ],
  experience: [
    {
      company: "Emirates AI Labs",
      position: "AI Research Engineer",
      startDate: "2023",
      endDate: "",
      current: true,
      description: "Led development of AI-powered customer service chatbots, improving response accuracy by 40%. Collaborated with cross-functional teams to implement machine learning models in production environments.",
      technologies: ["Python", "TensorFlow", "PyTorch", "AWS", "Docker"]
    },
    {
      company: "ADNOC Digital",
      position: "Data Science Intern",
      startDate: "2022",
      endDate: "2023",
      current: false,
      description: "Developed predictive analytics models for oil & gas operations, contributing to 15% efficiency improvement. Worked with big data technologies to process and analyze geological data.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Apache Spark", "SQL"]
    }
  ],
  skills: [
    "Machine Learning", "Deep Learning", "Python", "TensorFlow", "PyTorch",
    "Natural Language Processing", "Computer Vision", "Data Analysis",
    "AWS", "Docker", "Kubernetes", "SQL", "MongoDB", "React", "Node.js"
  ],
  achievements: [
    "Winner - UAE AI Challenge 2023",
    "Best Student Project - AUS Computer Science 2023",
    "Published 3 research papers in AI conferences",
    "Google Developer Expert - Machine Learning",
    "AWS Certified Machine Learning Specialist"
  ],
  languages: [
    { name: "Arabic", level: "Native" },
    { name: "English", level: "Fluent" },
    { name: "French", level: "Intermediate" }
  ]
};

const ResumeBuilder = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(dummyResumeData);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI Resume Assistant. I can help you improve your resume by suggesting better descriptions, adding missing sections, or reformatting content. What would you like to work on?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsGenerating(true);

    // Simulate AI processing
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse.content,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      
      // Apply changes if any
      if (aiResponse.updates) {
        setResumeData(prev => ({ ...prev, ...aiResponse.updates }));
      }
      
      setIsGenerating(false);
    }, 2000);
  };

  const generateAIResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('improve') || input.includes('better')) {
      return {
        content: "I've enhanced your experience descriptions to be more impactful and quantified your achievements. Your resume now better showcases your AI expertise and measurable contributions.",
        updates: {
          experience: resumeData.experience.map(exp => ({
            ...exp,
            description: exp.description + " Demonstrated strong problem-solving skills and delivered measurable business impact."
          }))
        }
      };
    }
    
    if (input.includes('skills') || input.includes('add')) {
      return {
        content: "I've added some trending AI skills that align with your background. These additions will make your resume more competitive in the current job market.",
        updates: {
          skills: [...resumeData.skills, "Large Language Models", "MLOps", "Edge AI", "Federated Learning"]
        }
      };
    }
    
    if (input.includes('summary') || input.includes('bio')) {
      return {
        content: "I've optimized your professional summary to better highlight your AI expertise and career achievements. The new version is more compelling and ATS-friendly.",
        updates: {
          personalInfo: {
            ...resumeData.personalInfo,
            bio: "Results-driven AI Research Engineer with 2+ years of experience developing cutting-edge machine learning solutions. Proven track record of improving operational efficiency by 40% through innovative AI implementations. Expert in deep learning, NLP, and computer vision with strong background in deploying scalable AI systems."
          }
        }
      };
    }
    
    return {
      content: "I understand you'd like to enhance your resume. I can help with improving descriptions, adding skills, optimizing your summary, or formatting improvements. Could you be more specific about what you'd like me to focus on?",
      updates: null
    };
  };

  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;
    
    setIsDownloading(true);
    
    try {
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Resume Preview - Left Side */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">Resume Builder</h1>
              <p className="text-muted-foreground">Create and customize your professional resume with AI assistance</p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowChat(true)}
                variant="outline"
                className="flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                AI Assistant
              </Button>
              <Button
                onClick={downloadAsPDF}
                disabled={isDownloading}
                className="flex items-center gap-2"
              >
                {isDownloading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                Download PDF
              </Button>
            </div>
          </div>

          {/* Resume Preview */}
          <Card className="shadow-lg">
            <CardContent className="p-0">
              <div ref={resumeRef} className="bg-white text-foreground p-8 space-y-6">
                {/* Header */}
                <div className="text-center pb-6 border-b">
                  <h1 className="text-3xl font-bold text-primary">
                    {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
                  </h1>
                  <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {resumeData.personalInfo.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {resumeData.personalInfo.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {resumeData.personalInfo.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {resumeData.personalInfo.portfolio}
                    </div>
                  </div>
                </div>

                {/* Professional Summary */}
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Professional Summary
                  </h2>
                  <p className="text-sm leading-relaxed">{resumeData.personalInfo.bio}</p>
                </div>

                {/* Experience */}
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                    <Briefcase className="w-5 h-5" />
                    Professional Experience
                  </h2>
                  <div className="space-y-4">
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="border-l-2 border-muted pl-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{exp.position}</h3>
                            <p className="text-primary font-medium">{exp.company}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                          </p>
                        </div>
                        <p className="text-sm mb-2 leading-relaxed">{exp.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {exp.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5" />
                    Education
                  </h2>
                  <div className="space-y-3">
                    {resumeData.education.map((edu, index) => (
                      <div key={index} className="border-l-2 border-muted pl-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{edu.degree} in {edu.field}</h3>
                            <p className="text-primary">{edu.institution}</p>
                            {edu.gpa && <p className="text-sm text-muted-foreground">GPA: {edu.gpa}</p>}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {edu.startDate} - {edu.endDate}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-3">Technical Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-3 flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Key Achievements
                  </h2>
                  <ul className="space-y-1">
                    {resumeData.achievements.map((achievement, index) => (
                      <li key={index} className="text-sm flex items-start gap-2">
                        <ChevronRight className="w-3 h-3 mt-1 text-primary flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Languages */}
                <div>
                  <h2 className="text-xl font-semibold text-primary mb-3">Languages</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {resumeData.languages.map((lang, index) => (
                      <div key={index} className="text-sm">
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-muted-foreground ml-2">({lang.level})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* AI Chat Assistant - Right Side */}
      {showChat && (
        <div className="w-96 border-l bg-card flex flex-col h-screen">
          <div className="p-4 border-b flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">AI Resume Assistant</h3>
                <p className="text-xs text-muted-foreground">Powered by AI</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChat(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'ai' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <Bot className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {message.content}
                </div>
                {message.type === 'user' && (
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>AH</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isGenerating && (
              <div className="flex gap-3 justify-start">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">AI is analyzing your resume...</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask AI to improve your resume..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isGenerating}
              />
              <Button
                onClick={handleSendMessage}
                disabled={isGenerating || !inputMessage.trim()}
                size="sm"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {['Improve descriptions', 'Add skills', 'Better summary', 'Format resume'].map((suggestion) => (
                <Button
                  key={suggestion}
                  variant="ghost"
                  size="sm"
                  className="text-xs h-6 px-2"
                  onClick={() => setInputMessage(suggestion)}
                  disabled={isGenerating}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeBuilder;