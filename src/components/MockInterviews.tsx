import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Play, 
  Mic, 
  Video, 
  Clock, 
  Target, 
  Trophy,
  TrendingUp,
  BookOpen,
  ChevronRight,
  Star,
  BarChart3,
  CheckCircle,
  Lightbulb
} from "lucide-react";
import MockHeyGenAvatar from "./MockHeyGenAvatar";

const MockInterviews = () => {
  const [activeInterview, setActiveInterview] = useState<string | null>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [interviewCompleted, setInterviewCompleted] = useState(false);
  const [interviewScore, setInterviewScore] = useState(0);
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [currentUserResponse, setCurrentUserResponse] = useState<string>('');
  const [avatarReady, setAvatarReady] = useState(false);
  const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);

  const interviewTypes = [
    {
      id: "technical",
      title: "Technical Interview",
      description: "Coding challenges and technical problem solving",
      duration: "45-60 mins",
      difficulty: "Advanced",
      topics: ["Data Structures", "Algorithms", "System Design", "Coding"],
      companies: ["Google", "Microsoft", "Amazon", "Meta"]
    },
    {
      id: "behavioral",
      title: "Behavioral Interview",
      description: "Communication skills and cultural fit assessment",
      duration: "30-45 mins",
      difficulty: "Intermediate",
      topics: ["Leadership", "Teamwork", "Problem Solving", "Communication"],
      companies: ["All Companies"]
    },
    {
      id: "case-study",
      title: "Case Study Interview",
      description: "Business problem analysis and strategic thinking",
      duration: "60-90 mins",
      difficulty: "Advanced",
      topics: ["Business Analysis", "Strategy", "Problem Solving", "Presentation"],
      companies: ["McKinsey", "BCG", "Bain", "Deloitte"]
    }
  ];

  const pastInterviews = [
    {
      id: 1,
      type: "Technical Interview",
      company: "Google",
      date: "2024-01-15",
      score: 85,
      feedback: "Strong algorithmic thinking, needs improvement in system design",
      duration: "52 mins"
    },
    {
      id: 2,
      type: "Behavioral Interview",
      company: "Microsoft",
      date: "2024-01-10",
      score: 92,
      feedback: "Excellent communication and leadership examples",
      duration: "38 mins"
    },
    {
      id: 3,
      type: "Case Study Interview",
      company: "McKinsey",
      date: "2024-01-05",
      score: 78,
      feedback: "Good analytical approach, could improve presentation skills",
      duration: "75 mins"
    }
  ];

  const skillMetrics = [
    { skill: "Technical Knowledge", score: 85, improvement: "+5%" },
    { skill: "Communication", score: 92, improvement: "+8%" },
    { skill: "Problem Solving", score: 78, improvement: "+12%" },
    { skill: "Confidence", score: 80, improvement: "+7%" }
  ];

  const mockQuestions = {
    technical: [
      "Explain the difference between supervised and unsupervised learning.",
      "How would you optimize a slow database query?",
      "Describe the time complexity of different sorting algorithms.",
      "What is the difference between React hooks and class components?",
      "How would you design a scalable system for 1 million users?",
      "Explain the concept of overfitting in machine learning.",
      "What are the benefits and drawbacks of microservices architecture?",
      "How would you implement a recommendation system?"
    ],
    behavioral: [
      "Tell me about a challenging project you worked on recently.",
      "Describe a time when you had to work with a difficult team member.",
      "How do you handle tight deadlines and pressure?",
      "Give an example of when you had to learn a new technology quickly.",
      "Describe a situation where you had to make a difficult decision.",
      "Tell me about a time you received constructive criticism.",
      "How do you stay updated with the latest technologies?",
      "Describe your approach to problem-solving."
    ],
    "case-study": [
      "A client's revenue has dropped 20% over the last quarter. How would you investigate?",
      "Design a strategy to increase user engagement for a social media app.",
      "How would you prioritize features for a new product launch?",
      "A competitor just launched a similar product. What's your response strategy?",
      "How would you approach market entry in a new geographical region?",
      "Design a cost reduction strategy without affecting product quality.",
      "How would you handle a PR crisis for your company?",
      "Develop a go-to-market strategy for an AI-powered product."
    ]
  };

  const startInterview = (interviewId: string) => {
    setActiveInterview(interviewId);
    setInterviewStarted(true);
    setCurrentQuestion(0);
    setTimeElapsed(0);
    setInterviewCompleted(false);
    setInterviewScore(0);
    setUserResponses([]);
    setCurrentUserResponse('');
    setAvatarReady(false);
    setIsWaitingForResponse(false);
    
    // Start timer
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    
    // Auto-complete after 45 minutes for demo
    setTimeout(() => {
      completeInterview();
      clearInterval(timer);
    }, 2700000); // 45 minutes
  };

  const handleAvatarSpeak = (text: string) => {
    console.log('Avatar spoke:', text);
    setIsWaitingForResponse(true);
  };

  const handleUserResponse = (response: string) => {
    if (!response.trim() || !isWaitingForResponse) return;
    
    setCurrentUserResponse(response);
    setUserResponses(prev => [...prev, response]);
    setIsWaitingForResponse(false);
    
    // Auto-advance to next question after user responds
    setTimeout(() => {
      if (currentQuestion < (mockQuestions[activeInterview as keyof typeof mockQuestions]?.length || 0) - 1) {
        setCurrentQuestion(prev => prev + 1);
        setCurrentUserResponse('');
      } else {
        completeInterview();
      }
    }, 2000);
  };

  const handleSessionReady = () => {
    setAvatarReady(true);
  };

  const completeInterview = () => {
    setInterviewCompleted(true);
    setInterviewScore(Math.floor(Math.random() * 30) + 70); // Random score between 70-100
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Interview completion screen with AI feedback
  if (interviewCompleted && activeInterview) {
    const interview = interviewTypes.find(i => i.id === activeInterview);
    const feedback = {
      strengths: [
        "Clear and articulate communication",
        "Strong technical knowledge demonstrated",
        "Good problem-solving approach",
        "Confident delivery of responses"
      ],
      improvements: [
        "Could provide more specific examples",
        "Consider structuring answers using STAR method",
        "Practice explaining complex concepts more simply",
        "Work on maintaining eye contact"
      ],
      recommendations: [
        "Practice more system design questions",
        "Review behavioral interview frameworks",
        "Work on presentation skills",
        "Study industry-specific case studies"
      ]
    };

    return (
      <div className="space-y-6">
        <Card className="border-ai-primary/20 bg-gradient-to-r from-ai-primary/5 to-ai-accent/5">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Interview Completed!</CardTitle>
            <CardDescription>
              Your AI-powered {interview?.title} session has been analyzed
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Score Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-ai-primary">{interviewScore}%</div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold">{formatTime(timeElapsed)}</div>
              <p className="text-sm text-muted-foreground">Duration</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold">{currentQuestion + 1}</div>
              <p className="text-sm text-muted-foreground">Questions Answered</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-green-600">B+</div>
              <p className="text-sm text-muted-foreground">Performance Grade</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-green-200 bg-green-50/30">
            <CardHeader>
              <CardTitle className="text-green-700 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {feedback.strengths.map((strength, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm">{strength}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50/30">
            <CardHeader>
              <CardTitle className="text-yellow-700 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {feedback.improvements.map((improvement, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                  <span className="text-sm">{improvement}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* AI Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-ai-primary" />
              AI-Powered Recommendations
            </CardTitle>
            <CardDescription>
              Personalized suggestions to improve your interview performance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {feedback.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-6 h-6 bg-ai-primary/20 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-ai-primary">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm">{recommendation}</p>
                </div>
                <Button size="sm" variant="outline">
                  <BookOpen className="w-3 h-3 mr-1" />
                  Learn More
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button onClick={() => {
            setInterviewCompleted(false);
            setInterviewStarted(false);
            setActiveInterview(null);
          }}>
            Return to Dashboard
          </Button>
          <Button variant="outline" onClick={() => startInterview(activeInterview)}>
            Practice Again
          </Button>
        </div>
      </div>
    );
  }

  // Active interview screen
  if (interviewStarted && activeInterview) {
    const interview = interviewTypes.find(i => i.id === activeInterview);
    const questions = mockQuestions[activeInterview as keyof typeof mockQuestions] || [];
    const currentQ = questions[currentQuestion] || "Loading next question...";

    return (
      <div className="space-y-6">
        <Card className="border-ai-primary/20 bg-gradient-to-r from-ai-primary/5 to-ai-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{interview?.title} - In Progress</span>
              <Badge variant="secondary" className="animate-pulse">Live Session</Badge>
            </CardTitle>
            <CardDescription>
              AI-powered interview simulation with real-time feedback
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* HeyGen AI Avatar Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* User Video */}
              <Card className="relative overflow-hidden">
                <CardContent className="p-0 aspect-video bg-gradient-to-br from-gray-900 to-gray-800">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white space-y-2">
                      <div className="w-20 h-20 mx-auto bg-gray-700 rounded-full flex items-center justify-center">
                        <Video className="w-10 h-10" />
                      </div>
                      <p className="text-sm">You</p>
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                    <Button size="sm" variant="destructive">
                      <Mic className="w-4 h-4 mr-2" />
                      Mute
                    </Button>
                    <Button size="sm" variant="secondary">
                      <Video className="w-4 h-4 mr-2" />
                      Camera
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* AI Avatar */}
              <MockHeyGenAvatar
                onAvatarSpeak={handleAvatarSpeak}
                onUserResponse={handleUserResponse}
                onSessionReady={handleSessionReady}
                currentQuestion={avatarReady ? currentQ : undefined}
                isInterviewActive={interviewStarted}
                className="w-full"
              />
            </div>

            {/* Current Question Display */}
            <Card className="border-ai-primary/20 bg-ai-primary/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-lg font-medium">Question {currentQuestion + 1}:</span>
                </div>
                <p className="text-lg">{currentQ}</p>
                {currentUserResponse && (
                  <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                    <p className="text-sm text-green-800">
                      <strong>Your Response:</strong> {currentUserResponse}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Live Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Time Elapsed</span>
                  </div>
                  <div className="text-2xl font-bold">{formatTime(timeElapsed)}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Questions</span>
                  </div>
                  <div className="text-2xl font-bold">{currentQuestion + 1}/{questions.length}</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Live Score</span>
                  </div>
                  <div className="text-2xl font-bold text-ai-primary">{Math.floor(Math.random() * 15) + 75}%</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Confidence</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{Math.floor(Math.random() * 20) + 70}%</div>
                </CardContent>
              </Card>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-4">
              <Button 
                variant="outline"
                onClick={() => setCurrentQuestion(prev => Math.min(prev + 1, questions.length - 1))}
                disabled={currentQuestion >= questions.length - 1}
              >
                Next Question
              </Button>
              <Button variant="outline" onClick={() => setInterviewStarted(false)}>
                Pause Interview
              </Button>
              <Button 
                onClick={completeInterview}
                className="bg-gradient-to-r from-ai-primary to-ai-accent"
              >
                Complete Interview
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Mock Interviews</h2>
        <p className="text-muted-foreground">
          Practice with AI-powered interview simulations
        </p>
      </div>

      <Tabs defaultValue="practice" className="space-y-6">
        <TabsList>
          <TabsTrigger value="practice">Practice Interviews</TabsTrigger>
          <TabsTrigger value="history">Interview History</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="practice" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviewTypes.map((interview) => (
              <Card key={interview.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {interview.title}
                    <Badge 
                      variant={interview.difficulty === "Advanced" ? "destructive" : "secondary"}
                    >
                      {interview.difficulty}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{interview.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center text-sm">
                      <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                      Duration: {interview.duration}
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Topics Covered:</h4>
                      <div className="flex flex-wrap gap-1">
                        {interview.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Companies:</h4>
                      <p className="text-xs text-muted-foreground">
                        {interview.companies.join(", ")}
                      </p>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full" 
                    onClick={() => startInterview(interview.id)}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Interview
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="space-y-4">
            {pastInterviews.map((interview) => (
              <Card key={interview.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{interview.type}</h3>
                        <Badge variant="outline">{interview.company}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(interview.date).toLocaleDateString()} • {interview.duration}
                      </p>
                      <p className="text-sm">{interview.feedback}</p>
                    </div>
                    
                    <div className="text-right space-y-2">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-bold">{interview.score}%</span>
                      </div>
                      <Button size="sm" variant="outline">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Progress</CardTitle>
                <CardDescription>Your improvement across key interview skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillMetrics.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{skill.skill}</span>
                      <div className="flex items-center gap-2">
                        <span>{skill.score}%</span>
                        <Badge variant="secondary" className="text-xs">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {skill.improvement}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={skill.score} />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interview Statistics</CardTitle>
                <CardDescription>Your overall interview performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ai-primary">12</div>
                    <p className="text-sm text-muted-foreground">Interviews Completed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ai-accent">85%</div>
                    <p className="text-sm text-muted-foreground">Average Score</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">8h 45m</div>
                    <p className="text-sm text-muted-foreground">Practice Time</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">92%</div>
                    <p className="text-sm text-muted-foreground">Best Score</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MockInterviews;