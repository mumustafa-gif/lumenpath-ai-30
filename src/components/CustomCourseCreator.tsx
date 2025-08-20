import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { 
  Sparkles, 
  Clock, 
  Target,
  BookOpen,
  ArrowLeft,
  Wand2,
  CheckCircle,
  Play
} from "lucide-react";
import { OnboardingData } from "./OnboardingFlow";

interface CustomCourseCreatorProps {
  onboardingData: OnboardingData;
  onBack: () => void;
  onStartCourse: (courseId: string) => void;
}

interface GeneratedCourse {
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  modules: Array<{
    title: string;
    description: string;
    duration: string;
    type: string;
    topics: string[];
  }>;
  learningOutcomes: string[];
  prerequisites: string[];
  estimatedTime: string;
}

const CustomCourseCreator = ({ onboardingData, onBack, onStartCourse }: CustomCourseCreatorProps) => {
  const [specificGoals, setSpecificGoals] = useState("");
  const [focusAreas, setFocusAreas] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<GeneratedCourse | null>(null);
  const [generationProgress, setGenerationProgress] = useState(0);

  const handleGenerateCourse = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);
    
    // Simulate AI course generation with progress updates
    const progressSteps = [
      { step: 20, message: "Analyzing your background and goals..." },
      { step: 40, message: "Researching latest industry trends..." },
      { step: 60, message: "Designing personalized curriculum..." },
      { step: 80, message: "Creating learning modules..." },
      { step: 100, message: "Finalizing your custom course..." }
    ];

    for (const { step, message } of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setGenerationProgress(step);
    }

    // Generate mock course based on onboarding data
    const course: GeneratedCourse = {
      title: `Advanced ${onboardingData.role?.replace('-', ' ')} Mastery Path`,
      description: `A personalized learning journey designed specifically for your ${onboardingData.interest} focus and ${onboardingData.preferredPace} learning pace.`,
      duration: onboardingData.preferredPace === "intensive" ? "4-6 weeks" : onboardingData.preferredPace === "moderate" ? "6-8 weeks" : "8-12 weeks",
      difficulty: onboardingData.experience && onboardingData.experience.length > 5 ? "Advanced" : "Intermediate",
      modules: [
        {
          title: "Foundation & Prerequisites Review",
          description: "Quick review of essential concepts, skipping areas you've already mastered",
          duration: "1 week",
          type: "review",
          topics: onboardingData.experience?.filter(skill => 
            !["Python", "JavaScript", "Git"].includes(skill)
          ).slice(0, 3) || ["Core Concepts", "Best Practices"]
        },
        {
          title: `${onboardingData.interest?.charAt(0).toUpperCase() + onboardingData.interest?.slice(1)} Focus Track`,
          description: `Deep dive into ${onboardingData.interest} methodologies and advanced techniques`,
          duration: "2-3 weeks",
          type: "core",
          topics: [
            `Advanced ${onboardingData.interest} Patterns`,
            "Industry Best Practices",
            "Optimization Techniques"
          ]
        },
        {
          title: "Hands-on Project Workshop",
          description: "Apply your skills in a real-world capstone project",
          duration: "1-2 weeks",
          type: "project",
          topics: ["Project Planning", "Implementation", "Code Review", "Deployment"]
        },
        {
          title: "Career Advancement & Next Steps",
          description: "Prepare for advanced roles and continuous learning",
          duration: "1 week",
          type: "career",
          topics: ["Portfolio Development", "Interview Preparation", "Networking", "Continuous Learning"]
        }
      ],
      learningOutcomes: [
        `Master advanced ${onboardingData.interest} techniques`,
        `Build a comprehensive portfolio project`,
        `Understand industry best practices and standards`,
        `Develop skills for senior ${onboardingData.role?.replace('-', ' ')} roles`,
        "Create a personalized learning roadmap for continued growth"
      ],
      prerequisites: onboardingData.experience?.slice(0, 3) || ["Basic programming knowledge"],
      estimatedTime: onboardingData.preferredPace === "intensive" ? "15-20 hours/week" : 
                    onboardingData.preferredPace === "moderate" ? "8-10 hours/week" : "4-6 hours/week"
    };

    setGeneratedCourse(course);
    setIsGenerating(false);
  };

  if (generatedCourse) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Recommendations
          </Button>
        </div>

        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">{generatedCourse.title}</CardTitle>
            <CardDescription className="text-lg">
              {generatedCourse.description}
            </CardDescription>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{generatedCourse.duration}</div>
                <div className="text-sm text-muted-foreground">Duration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{generatedCourse.difficulty}</div>
                <div className="text-sm text-muted-foreground">Level</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{generatedCourse.modules.length}</div>
                <div className="text-sm text-muted-foreground">Modules</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{generatedCourse.estimatedTime}</div>
                <div className="text-sm text-muted-foreground">Time/Week</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Course Modules
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatedCourse.modules.map((module, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{module.title}</h4>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{module.duration}</span>
                        <Badge variant="secondary" className="text-xs">{module.type}</Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {module.topics.map((topic, topicIndex) => (
                          <Badge key={topicIndex} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  {index < generatedCourse.modules.length - 1 && <Separator />}
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Learning Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {generatedCourse.learningOutcomes.map((outcome, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
                      <span className="text-sm">{outcome}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Prerequisites Met</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {generatedCourse.prerequisites.map((prereq, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {prereq}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Ready to Start Your Custom Learning Journey?</h3>
                <p className="text-muted-foreground">
                  This course has been specially designed based on your goals, experience, and learning preferences.
                </p>
              </div>
              <Button 
                onClick={() => onStartCourse("custom-course-" + Date.now())}
                size="lg"
                className="bg-gradient-to-r from-primary to-accent text-white"
              >
                <Play className="w-5 h-5 mr-2" />
                Start Custom Course
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Recommendations
        </Button>
      </div>

      <Card>
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
              <Wand2 className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl">Create Your Custom Course</CardTitle>
          <CardDescription>
            Tell us more about your specific goals and we'll create a personalized learning path using AI
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {isGenerating ? (
            <div className="space-y-4 text-center py-8">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-primary animate-spin" />
              </div>
              <h3 className="text-lg font-semibold">Generating Your Custom Course...</h3>
              <Progress value={generationProgress} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Our AI is analyzing your profile and creating a personalized learning experience
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="specific-goals">Specific Learning Goals</Label>
                  <Textarea
                    id="specific-goals"
                    placeholder="e.g., 'I want to learn how to deploy ML models at scale and implement CI/CD pipelines for AI systems'"
                    value={specificGoals}
                    onChange={(e) => setSpecificGoals(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="focus-areas">Areas of Focus</Label>
                  <Textarea
                    id="focus-areas"
                    placeholder="e.g., 'Kubernetes for ML, model monitoring, A/B testing for AI features'"
                    value={focusAreas}
                    onChange={(e) => setFocusAreas(e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time-commitment">Available Time & Deadline</Label>
                  <Input
                    id="time-commitment"
                    placeholder="e.g., 'Need to complete in 2 months, can dedicate 10 hours/week'"
                    value={timeCommitment}
                    onChange={(e) => setTimeCommitment(e.target.value)}
                  />
                </div>
              </div>

              <Card className="bg-muted/30">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2">Based on your onboarding responses:</h4>
                  <div className="space-y-2 text-sm">
                    <div><strong>Role:</strong> {onboardingData.role?.replace('-', ' ')}</div>
                    <div><strong>Interest:</strong> {onboardingData.interest}</div>
                    <div><strong>Experience:</strong> {onboardingData.experience?.join(', ')}</div>
                    <div><strong>Pace:</strong> {onboardingData.preferredPace}</div>
                  </div>
                </CardContent>
              </Card>

              <Button 
                onClick={handleGenerateCourse}
                disabled={!specificGoals.trim()}
                className="w-full bg-gradient-to-r from-primary to-accent text-white"
                size="lg"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate My Custom Course
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomCourseCreator;