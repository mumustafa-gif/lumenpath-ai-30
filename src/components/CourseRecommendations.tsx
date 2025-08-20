import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Clock, 
  Star, 
  Users, 
  BookOpen, 
  Target,
  Sparkles,
  Play,
  Eye,
  Plus
} from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface Course {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  rating: number;
  students: number;
  tags: string[];
  modules: Array<{
    title: string;
    duration: string;
    type: string;
  }>;
  outcomes: string[];
  matchScore: number;
}

interface CourseRecommendationsProps {
  onboardingData: OnboardingData;
  onStartCourse: (courseId: string) => void;
  onCreateCustomCourse: () => void;
}

const CourseRecommendations = ({ onboardingData, onStartCourse, onCreateCustomCourse }: CourseRecommendationsProps) => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  // Mock course data based on onboarding responses
  const getRecommendedCourses = (): Course[] => {
    const baseCourses: Course[] = [
      {
        id: "ml-fundamentals",
        title: "Machine Learning Fundamentals",
        description: "Master the core concepts of machine learning with hands-on projects and real-world applications.",
        difficulty: "Beginner",
        duration: "8 weeks",
        rating: 4.8,
        students: 12500,
        tags: ["Machine Learning", "Python", "Data Science"],
        modules: [
          { title: "Introduction to ML", duration: "2 hours", type: "video" },
          { title: "Supervised Learning", duration: "3 hours", type: "video" },
          { title: "Unsupervised Learning", duration: "2.5 hours", type: "video" },
          { title: "Model Evaluation", duration: "2 hours", type: "practical" },
          { title: "Final Project", duration: "5 hours", type: "project" }
        ],
        outcomes: [
          "Understand core ML algorithms",
          "Build and evaluate ML models",
          "Apply ML to real-world problems",
          "Use Python for data science"
        ],
        matchScore: 95
      },
      {
        id: "ai-deployment",
        title: "AI Model Deployment & MLOps",
        description: "Learn to deploy AI models in production environments with modern DevOps practices.",
        difficulty: "Intermediate",
        duration: "6 weeks",
        rating: 4.7,
        students: 8200,
        tags: ["MLOps", "Docker", "Kubernetes", "Cloud"],
        modules: [
          { title: "Model Containerization", duration: "2 hours", type: "video" },
          { title: "CI/CD for ML", duration: "3 hours", type: "practical" },
          { title: "Model Monitoring", duration: "2 hours", type: "video" },
          { title: "Scaling ML Systems", duration: "2.5 hours", type: "video" },
          { title: "Production Deployment", duration: "4 hours", type: "project" }
        ],
        outcomes: [
          "Deploy models in production",
          "Implement MLOps pipelines",
          "Monitor model performance",
          "Scale AI systems effectively"
        ],
        matchScore: 88
      },
      {
        id: "ai-research",
        title: "Advanced AI Research Methods",
        description: "Dive deep into cutting-edge AI research methodologies and latest developments.",
        difficulty: "Advanced",
        duration: "10 weeks",
        rating: 4.9,
        students: 3500,
        tags: ["Research", "Deep Learning", "NLP", "Computer Vision"],
        modules: [
          { title: "Research Methodology", duration: "3 hours", type: "video" },
          { title: "Literature Review", duration: "2 hours", type: "reading" },
          { title: "Experimental Design", duration: "3 hours", type: "practical" },
          { title: "Paper Writing", duration: "2 hours", type: "writing" },
          { title: "Research Project", duration: "8 hours", type: "project" }
        ],
        outcomes: [
          "Conduct AI research effectively",
          "Design rigorous experiments",
          "Write research papers",
          "Contribute to AI knowledge"
        ],
        matchScore: 92
      }
    ];

    // Filter and sort based on onboarding data
    return baseCourses
      .filter(course => {
        if (onboardingData.role === "ai-researcher") return course.tags.includes("Research");
        if (onboardingData.role === "devops-engineer") return course.tags.includes("MLOps") || course.tags.includes("Cloud");
        if (onboardingData.role === "data-scientist") return course.tags.includes("Machine Learning") || course.tags.includes("Data Science");
        return true;
      })
      .sort((a, b) => b.matchScore - a.matchScore);
  };

  const recommendedCourses = getRecommendedCourses();

  const CourseCard = ({ course }: { course: Course }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <CardTitle className="text-xl group-hover:text-primary transition-colors">
              {course.title}
            </CardTitle>
            <CardDescription className="text-sm">
              {course.description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-gradient-to-r from-primary/10 to-accent/10">
            {course.matchScore}% Match
          </Badge>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{course.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{course.students.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <Badge variant="outline">{course.difficulty}</Badge>
        </div>

        <div className="flex flex-wrap gap-1 mt-2">
          {course.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            size="sm" 
            onClick={() => setSelectedCourse(course)}
            variant="outline"
            className="flex-1"
          >
            <Eye className="w-4 h-4 mr-2" />
            View Outline
          </Button>
          <Button 
            size="sm" 
            onClick={() => onStartCourse(course.id)}
            className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Start Learning
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const CourseOutline = ({ course }: { course: Course }) => (
    <Card className="border-2 border-primary/20">
      <CardHeader>
        <CardTitle className="text-2xl">{course.title}</CardTitle>
        <CardDescription>{course.description}</CardDescription>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{course.rating}</div>
            <div className="text-sm text-muted-foreground">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{course.students.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{course.duration}</div>
            <div className="text-sm text-muted-foreground">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{course.difficulty}</div>
            <div className="text-sm text-muted-foreground">Level</div>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="modules">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="modules">Course Modules</TabsTrigger>
            <TabsTrigger value="outcomes">Learning Outcomes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="modules" className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">Course Structure</h3>
            {course.modules.map((module, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">{index + 1}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{module.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {module.type.charAt(0).toUpperCase() + module.type.slice(1)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {module.duration}
                </div>
              </div>
            ))}
          </TabsContent>
          
          <TabsContent value="outcomes" className="space-y-4">
            <h3 className="text-lg font-semibold mb-4">What You'll Learn</h3>
            <div className="grid gap-3">
              {course.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-primary mt-0.5" />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-4 mt-6">
          <Button 
            onClick={() => setSelectedCourse(null)}
            variant="outline"
            className="flex-1"
          >
            Back to Courses
          </Button>
          <Button 
            onClick={() => onStartCourse(course.id)}
            className="flex-1 bg-gradient-to-r from-primary to-accent text-white"
          >
            <Play className="w-4 h-4 mr-2" />
            Start This Course
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (selectedCourse) {
    return <CourseOutline course={selectedCourse} />;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Recommended Learning Paths</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Based on your goals as a <strong>{onboardingData.role?.replace('-', ' ')}</strong> and your interest in <strong>{onboardingData.interest}</strong>, 
          here are personalized course recommendations tailored to your experience level.
        </p>
      </div>

      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Create Custom Course with AI
              </h3>
              <p className="text-muted-foreground">
                Let our AI create a personalized learning path specifically designed for your goals, experience, and interests.
              </p>
            </div>
            <Button 
              onClick={onCreateCustomCourse}
              className="bg-gradient-to-r from-primary to-accent text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Custom Course
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Recommended Courses</h2>
        <div className="grid gap-6">
          {recommendedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseRecommendations;