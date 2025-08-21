import { useState } from "react";
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
  BarChart3
} from "lucide-react";

const MockInterviews = () => {
  const [activeInterview, setActiveInterview] = useState<string | null>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);

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

  const startInterview = (interviewId: string) => {
    setActiveInterview(interviewId);
    setInterviewStarted(true);
  };

  if (interviewStarted && activeInterview) {
    const interview = interviewTypes.find(i => i.id === activeInterview);
    return (
      <div className="space-y-6">
        <Card className="border-ai-primary/20 bg-gradient-to-r from-ai-primary/5 to-ai-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{interview?.title} - In Progress</span>
              <Badge variant="secondary">Live Session</Badge>
            </CardTitle>
            <CardDescription>
              AI-powered interview simulation with real-time feedback
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-center bg-black/90 rounded-lg aspect-video">
              <div className="text-center text-white space-y-4">
                <Video className="w-16 h-16 mx-auto" />
                <p>Interview Session Active</p>
                <div className="flex items-center justify-center gap-4">
                  <Button size="sm" variant="destructive">
                    <Mic className="w-4 h-4 mr-2" />
                    Mute
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Video className="w-4 h-4 mr-2" />
                    Camera
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Time Elapsed</span>
                  </div>
                  <div className="text-2xl font-bold">15:30</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Questions</span>
                  </div>
                  <div className="text-2xl font-bold">3/8</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Current Score</span>
                  </div>
                  <div className="text-2xl font-bold">82%</div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center gap-4">
              <Button variant="outline" onClick={() => setInterviewStarted(false)}>
                Pause Interview
              </Button>
              <Button variant="destructive" onClick={() => {
                setInterviewStarted(false);
                setActiveInterview(null);
              }}>
                End Interview
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