import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  BookOpen, 
  Users, 
  Trophy, 
  Clock, 
  Play,
  MessageCircle,
  Target,
  TrendingUp,
  Award,
  Calendar,
  CheckCircle,
  Settings,
  X
} from "lucide-react";
import { LearnerHeader } from "@/components/LearnerHeader";
import { ChatInterface } from "@/components/ChatInterface";
import { StudyBuddyCard } from "@/components/StudyBuddyCard";
import OnboardingFlow, { OnboardingData } from "@/components/OnboardingFlow";
import AdaptiveLearningEngine from "@/components/AdaptiveLearningEngine";
import CourseRecommendations from "@/components/CourseRecommendations";
import LearnerProfile from "@/components/LearnerProfile";
import { CoursePreview } from "@/components/CoursePreview";

const LearnerDashboard = () => {
  const [showOnboarding, setShowOnboarding] = useState(false); // Set to true for new users
  const [learnerProfile, setLearnerProfile] = useState<OnboardingData | null>(null);
  const [showCourseRecommendations, setShowCourseRecommendations] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeCourse, setActiveCourse] = useState<any>(null);
  
  const [currentCourses] = useState([
    {
      id: 1,
      title: "AI Fundamentals",
      progress: 68,
      nextLesson: "Neural Network Basics",
      timeRemaining: "2h 15m",
      difficulty: "Beginner",
      instructor: "Dr. Sarah Chen",
      modules: [
        {
          title: "Introduction to AI",
          duration: "45 mins",
          lessons: [
            { title: "What is Artificial Intelligence?", duration: "15 mins", type: "video" },
            { title: "History of AI", duration: "20 mins", type: "interactive" },
            { title: "AI Applications Today", duration: "10 mins", type: "case_study" }
          ],
          quiz: { questions: 5, passingScore: 80 },
          caseStudy: {
            title: "AI in Healthcare",
            scenario: "Explore how AI is revolutionizing medical diagnosis and treatment",
            deliverables: ["Analysis Report", "Implementation Plan", "ROI Calculation"]
          }
        },
        {
          title: "Machine Learning Fundamentals",
          duration: "60 mins",
          lessons: [
            { title: "Types of Machine Learning", duration: "20 mins", type: "video" },
            { title: "Supervised Learning", duration: "25 mins", type: "hands_on" },
            { title: "Unsupervised Learning", duration: "15 mins", type: "simulation" }
          ],
          quiz: { questions: 8, passingScore: 75 },
          caseStudy: {
            title: "Customer Segmentation",
            scenario: "Use ML algorithms to segment customers for targeted marketing",
            deliverables: ["Segmentation Model", "Marketing Strategy", "Performance Metrics"]
          }
        }
      ]
    },
    {
      id: 2,
      title: "Python for Data Science",
      progress: 45,
      nextLesson: "Pandas DataFrames",
      timeRemaining: "4h 30m",
      difficulty: "Intermediate",
      instructor: "Prof. Mike Johnson",
      modules: [
        {
          title: "Python Basics Review",
          duration: "30 mins",
          lessons: [
            { title: "Variables and Data Types", duration: "10 mins", type: "video" },
            { title: "Control Structures", duration: "20 mins", type: "hands_on" }
          ],
          quiz: { questions: 6, passingScore: 80 }
        },
        {
          title: "Data Manipulation with Pandas",
          duration: "90 mins",
          lessons: [
            { title: "DataFrames Introduction", duration: "30 mins", type: "video" },
            { title: "Data Cleaning", duration: "45 mins", type: "hands_on" },
            { title: "Advanced Operations", duration: "15 mins", type: "interactive" }
          ],
          quiz: { questions: 10, passingScore: 85 }
        }
      ]
    },
    {
      id: 3,
      title: "Cloud Computing Basics",
      progress: 23,
      nextLesson: "AWS Introduction",
      timeRemaining: "6h 45m",
      difficulty: "Beginner",
      instructor: "Dr. Lisa Wang"
    }
  ]);

  const [studyBuddies] = useState([
    {
      id: 1,
      name: "Emma Rodriguez",
      course: "AI Fundamentals",
      progress: 72,
      status: "online" as const,
      lastActive: "Active now"
    },
    {
      id: 2,
      name: "David Kim",
      course: "Python for Data Science",
      progress: 51,
      status: "offline" as const,
      lastActive: "2 hours ago"
    }
  ]);

  const [achievements] = useState([
    { id: 1, title: "First Course Completed", icon: "🎓", date: "2 days ago" },
    { id: 2, title: "Quiz Master", icon: "🧠", date: "1 week ago" },
    { id: 3, title: "Study Streak - 7 days", icon: "🔥", date: "3 days ago" },
  ]);

  const [learningPath] = useState({
    currentGoal: learnerProfile?.goal || "AI Researcher",
    skillsAcquired: learnerProfile?.experience || ["Python Basics", "Statistics", "Linear Algebra"],
    nextMilestones: ["Machine Learning", "Deep Learning", "Neural Networks"],
    overallProgress: 34
  });

  const handleOnboardingComplete = (data: OnboardingData) => {
    setLearnerProfile(data);
    setShowOnboarding(false);
    setShowCourseRecommendations(true);
    // Here you would typically save to backend/Supabase
    console.log('Onboarding completed:', data);
  };

  const handleStartCourse = (courseId: string | number) => {
    console.log("Starting course:", courseId);
    setShowCourseRecommendations(false);
    
    // Find the course by ID and set it as active
    const course = currentCourses.find(c => c.id.toString() === courseId.toString());
    if (course) {
      setActiveCourse(course);
    }
  };

  const handleProfileSave = (profileData: any) => {
    console.log('Profile saved:', profileData);
    // Here you would typically save to backend/Supabase
  };

  // Show onboarding flow for new users
  if (showOnboarding) {
    return (
      <OnboardingFlow 
        onComplete={handleOnboardingComplete}
        onStartCourse={handleStartCourse}
      />
    );
  }

  // Show course recommendations after onboarding
  if (showCourseRecommendations && learnerProfile) {
    return (
      <div className="min-h-screen bg-background">
        <LearnerHeader />
        <main className="p-6">
          <CourseRecommendations 
            onboardingData={learnerProfile}
            onStartCourse={handleStartCourse}
            onCreateCustomCourse={() => {
              // Custom course creation is handled within CourseRecommendations
            }}
          />
        </main>
      </div>
    );
  }

  // Show learner profile
  if (showProfile) {
    return (
      <div className="min-h-screen bg-background">
        <LearnerHeader />
        <main className="p-6">
          <LearnerProfile onSave={handleProfileSave} />
        </main>
      </div>
    );
  }

  // Show course preview when a course is started
  if (activeCourse) {
    return (
      <CoursePreview 
        course={activeCourse}
        onClose={() => setActiveCourse(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <LearnerHeader />
      
      <main className="p-6">
        {/* Welcome Banner */}
        <Card className="mb-8 bg-gradient-to-r from-ai-primary/10 to-ai-accent/10 border-ai-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">Welcome back, Alex! 🚀</h1>
                <p className="text-muted-foreground">
                  Your AI learning journey continues. You're {learningPath.overallProgress}% closer to becoming an {learningPath.currentGoal}.
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-ai-primary">{learningPath.overallProgress}%</div>
                <div className="text-sm text-muted-foreground">Goal Progress</div>
              </div>
            </div>
            <Progress value={learningPath.overallProgress} className="mt-4" />
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentCourses.length}</div>
              <p className="text-xs text-muted-foreground">In progress</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Study Buddies</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studyBuddies.length}</div>
              <p className="text-xs text-muted-foreground">Active partnerships</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{achievements.length}</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-muted-foreground">Days in a row</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Action: Retake Onboarding */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Your Learning Journey</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowOnboarding(true)}
          >
            <Settings className="w-4 h-4 mr-2" />
            AI Career Path
          </Button>
        </div>

        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList>
            <TabsTrigger value="courses">My Courses</TabsTrigger>
            <TabsTrigger value="ai-tutor">AI Tutor</TabsTrigger>
            <TabsTrigger value="adaptive-engine">Adaptive Learning</TabsTrigger>
            <TabsTrigger value="study-buddies">Study Buddies</TabsTrigger>
            <TabsTrigger value="progress">Progress & Analytics</TabsTrigger>
            <TabsTrigger value="profile">My Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {course.title}
                      <Badge variant="secondary">{course.difficulty}</Badge>
                    </CardTitle>
                    <CardDescription>by {course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
                        {course.timeRemaining} remaining
                      </div>
                      <div className="flex items-center text-sm">
                        <BookOpen className="w-4 h-4 mr-2 text-muted-foreground" />
                        Next: {course.nextLesson}
                      </div>
                    </div>
                    
                    <Button 
                      variant="ai" 
                      className="w-full"
                      onClick={() => handleStartCourse(course.id)}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Continue Learning
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-dashed border-2 flex items-center justify-center min-h-[300px]">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-ai-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <BookOpen className="w-6 h-6 text-ai-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Discover New Courses</h3>
                    <p className="text-sm text-muted-foreground">Explore AI-recommended courses based on your goals</p>
                  </div>
                  <Button 
                    variant="outline"
                    onClick={() => setShowCourseRecommendations(true)}
                  >
                    Browse Catalog
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="ai-tutor">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold flex items-center">
                  <Brain className="w-6 h-6 mr-2 text-ai-primary" />
                  AI Learning Assistant
                </h2>
                <p className="text-muted-foreground">Get instant help with any topic, concept explanation, or learning guidance</p>
              </div>
              <Button 
                variant="ai"
                className="flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                Open AI Assistant
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <MessageCircle className="w-5 h-5 mr-2 text-ai-primary" />
                    Concept Explanations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Get detailed explanations of complex AI and ML concepts in simple terms</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Neural Networks</Badge>
                    <Badge variant="secondary" className="text-xs">Algorithms</Badge>
                    <Badge variant="secondary" className="text-xs">Statistics</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Target className="w-5 h-5 mr-2 text-ai-accent" />
                    Study Planning
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Create personalized study plans and learning roadmaps</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Schedule</Badge>
                    <Badge variant="secondary" className="text-xs">Goals</Badge>
                    <Badge variant="secondary" className="text-xs">Progress</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <BookOpen className="w-5 h-5 mr-2 text-ai-secondary" />
                    Assignment Help
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Get guidance on projects, coding exercises, and case studies</p>
                  <div className="mt-3 flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Debugging</Badge>
                    <Badge variant="secondary" className="text-xs">Code Review</Badge>
                    <Badge variant="secondary" className="text-xs">Best Practices</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="adaptive-engine">
            <AdaptiveLearningEngine 
              learnerData={{
                currentModule: "Linear Algebra",
                overallProgress: learningPath.overallProgress,
                weakAreas: ["Mathematics", "Statistics"],
                strengths: learnerProfile?.experience || ["Python", "Programming"]
              }}
            />
          </TabsContent>

          <TabsContent value="study-buddies" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Study Buddies</h2>
              <Button variant="ai">
                <Users className="w-4 h-4 mr-2" />
                Find New Buddy
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {studyBuddies.map((buddy) => (
                <StudyBuddyCard key={buddy.id} buddy={buddy} />
              ))}
              
              <Card className="border-dashed border-2 flex items-center justify-center min-h-[200px]">
                <div className="text-center space-y-4">
                  <div className="w-12 h-12 bg-ai-secondary/10 rounded-full flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6 text-ai-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Find Study Partners</h3>
                    <p className="text-sm text-muted-foreground">AI will match you with compatible learners</p>
                  </div>
                  <Button variant="outline">Get Matched</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-ai-primary" />
                    Learning Path Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Goal: {learningPath.currentGoal}</span>
                      <span>{learningPath.overallProgress}%</span>
                    </div>
                    <Progress value={learningPath.overallProgress} />
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Skills Acquired</h4>
                    <div className="flex flex-wrap gap-2">
                      {learningPath.skillsAcquired.map((skill, index) => (
                        <Badge key={index} variant="default" className="flex items-center">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Next Milestones</h4>
                    <div className="space-y-2">
                      {learningPath.nextMilestones.map((milestone, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span>{milestone}</span>
                          <Badge variant="secondary">Upcoming</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2 text-ai-accent" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="font-medium">{achievement.title}</h4>
                          <p className="text-sm text-muted-foreground">{achievement.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <LearnerProfile onSave={handleProfileSave} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LearnerDashboard;