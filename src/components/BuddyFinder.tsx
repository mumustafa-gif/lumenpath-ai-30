import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Brain, Users, UserPlus, X, BookOpen, MessageCircle, Video, Calendar } from "lucide-react";

interface PotentialBuddy {
  id: number;
  name: string;
  course: string;
  progress: number;
  status: "online" | "offline";
  lastActive: string;
  compatibility: number;
  sharedInterests: string[];
  studyStyle: string;
}

interface BuddyFinderProps {
  onClose: () => void;
  onAddBuddy: (buddy: PotentialBuddy) => void;
}

export const BuddyFinder = ({ onClose, onAddBuddy }: BuddyFinderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStep, setLoadingStep] = useState("Analyzing your profile...");
  const [potentialBuddies, setPotentialBuddies] = useState<PotentialBuddy[]>([]);
  const [addedBuddies, setAddedBuddies] = useState<Set<number>>(new Set());

  const loadingSteps = [
    "Analyzing your profile...",
    "Matching learning styles...",
    "Finding compatible schedules...",
    "Evaluating shared interests...",
    "Finalizing best matches..."
  ];

  useEffect(() => {
    const simulateAIMatching = async () => {
      for (let i = 0; i < loadingSteps.length; i++) {
        setLoadingStep(loadingSteps[i]);
        setLoadingProgress((i + 1) * 20);
        await new Promise(resolve => setTimeout(resolve, 1200));
      }

      // Simulate finding matches
      const matches: PotentialBuddy[] = [
        {
          id: 3,
          name: "Fatima Al-Zahra",
          course: "AI Fundamentals",
          progress: 65,
          status: "online",
          lastActive: "Active now",
          compatibility: 94,
          sharedInterests: ["Machine Learning", "Python", "Data Science"],
          studyStyle: "Visual Learner"
        },
        {
          id: 4,
          name: "Hassan Al-Maktoum",
          course: "Python for Data Science",
          progress: 48,
          status: "online",
          lastActive: "2 minutes ago",
          compatibility: 89,
          sharedInterests: ["Python", "Statistics", "AI Research"],
          studyStyle: "Collaborative"
        },
        {
          id: 5,
          name: "Mariam Al-Rashid",
          course: "Cloud Computing Basics",
          progress: 31,
          status: "offline",
          lastActive: "1 hour ago",
          compatibility: 87,
          sharedInterests: ["Cloud Computing", "AWS", "DevOps"],
          studyStyle: "Hands-on"
        },
        {
          id: 6,
          name: "Khalid Al-Mansouri",
          course: "AI Fundamentals",
          progress: 72,
          status: "online",
          lastActive: "Active now",
          compatibility: 85,
          sharedInterests: ["Neural Networks", "Deep Learning"],
          studyStyle: "Theory-focused"
        },
        {
          id: 7,
          name: "Aisha Al-Qasimi",
          course: "Python for Data Science",
          progress: 53,
          status: "offline",
          lastActive: "3 hours ago",
          compatibility: 82,
          sharedInterests: ["Data Analysis", "Visualization", "Statistics"],
          studyStyle: "Project-based"
        }
      ];

      setPotentialBuddies(matches);
      setIsLoading(false);
    };

    simulateAIMatching();
  }, []);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const handleAddBuddy = (buddy: PotentialBuddy) => {
    onAddBuddy(buddy);
    setAddedBuddies(prev => new Set(prev).add(buddy.id));
  };

  const getCompatibilityColor = (compatibility: number) => {
    if (compatibility >= 90) return "text-green-600";
    if (compatibility >= 80) return "text-blue-600";
    return "text-orange-600";
  };

  const getCompatibilityLabel = (compatibility: number) => {
    if (compatibility >= 90) return "Excellent Match";
    if (compatibility >= 80) return "Good Match";
    return "Potential Match";
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-ai-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-ai-primary animate-pulse" />
            </div>
            <CardTitle className="text-xl">AI Agent Finding Your Perfect Study Buddy</CardTitle>
            <CardDescription>Our AI is analyzing your learning profile to find the best matches</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>{loadingStep}</span>
                <span>{loadingProgress}%</span>
              </div>
              <Progress value={loadingProgress} className="h-2" />
            </div>
            
            <div className="bg-ai-primary/5 rounded-lg p-4 space-y-3">
              <div className="flex items-center text-sm text-ai-primary">
                <Brain className="w-4 h-4 mr-2" />
                <span className="font-medium">AI Analysis in Progress</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  Learning Style
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></div>
                  Course Progress
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></div>
                  Study Schedule
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
                  Shared Interests
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center">
                <Users className="w-6 h-6 mr-2 text-ai-primary" />
                Perfect Study Buddy Matches
              </CardTitle>
              <CardDescription>
                Our AI found {potentialBuddies.length} compatible study partners based on your profile
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {potentialBuddies.map((buddy) => (
              <Card key={buddy.id} className="hover:shadow-lg transition-shadow border-2 hover:border-ai-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarFallback className="bg-ai-primary text-white">
                            {getInitials(buddy.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div 
                          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            buddy.status === "online" ? "bg-green-500" : "bg-gray-400"
                          }`} 
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold">{buddy.name}</h3>
                        <p className="text-sm text-muted-foreground">{buddy.lastActive}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className={`text-2xl font-bold ${getCompatibilityColor(buddy.compatibility)}`}>
                        {buddy.compatibility}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {getCompatibilityLabel(buddy.compatibility)}
                      </div>
                    </div>
                  </CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <span>{buddy.course}</span>
                    <Badge variant={buddy.status === "online" ? "default" : "secondary"}>
                      {buddy.status}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Course Progress</span>
                      <span>{buddy.progress}%</span>
                    </div>
                    <Progress value={buddy.progress} />
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Study Style</div>
                    <Badge variant="outline" className="text-xs">
                      {buddy.studyStyle}
                    </Badge>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-2">Shared Interests</div>
                    <div className="flex flex-wrap gap-1">
                      {buddy.sharedInterests.map((interest, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      disabled={addedBuddies.has(buddy.id)}
                    >
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Preview
                    </Button>
                    <Button 
                      size="sm" 
                      variant={addedBuddies.has(buddy.id) ? "secondary" : "ai"}
                      className="flex-1"
                      onClick={() => handleAddBuddy(buddy)}
                      disabled={addedBuddies.has(buddy.id)}
                    >
                      {addedBuddies.has(buddy.id) ? (
                        <>Added!</>
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-1" />
                          Add Buddy
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 p-4 bg-ai-primary/5 rounded-lg">
            <div className="flex items-center text-sm text-ai-primary mb-2">
              <Brain className="w-4 h-4 mr-2" />
              <span className="font-medium">AI Matching Insights</span>
            </div>
            <p className="text-sm text-muted-foreground">
              These matches are based on learning style compatibility, course alignment, study schedule overlap, 
              and shared academic interests. Higher compatibility scores indicate better study partnership potential.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};