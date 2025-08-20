import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Brain, 
  Target, 
  Code, 
  Zap, 
  Building, 
  Search,
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react";
import CourseRecommendations from "./CourseRecommendations";
import CustomCourseCreator from "./CustomCourseCreator";

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onStartCourse?: (courseId: string) => void;
}

export interface OnboardingData {
  role: string;
  goal: string;
  experience: string[];
  interest: string;
  background: string;
  preferredPace: string;
}

const OnboardingFlow = ({ onComplete, onStartCourse }: OnboardingFlowProps) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Partial<OnboardingData>>({
    experience: []
  });
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showCustomCreator, setShowCustomCreator] = useState(false);
  const [completedData, setCompletedData] = useState<OnboardingData | null>(null);

  const totalSteps = 5;
  const progress = (step / totalSteps) * 100;

  const roles = [
    { id: "data-scientist", label: "Data Scientist", icon: Brain, description: "Build ML models and analyze data" },
    { id: "ai-researcher", label: "AI Researcher", icon: Search, description: "Research cutting-edge AI technologies" },
    { id: "devops-engineer", label: "DevOps Engineer", icon: Building, description: "Deploy and manage AI systems" },
    { id: "software-engineer", label: "Software Engineer", icon: Code, description: "Develop AI-powered applications" },
    { id: "product-manager", label: "Product Manager", icon: Target, description: "Lead AI product development" }
  ];

  const skills = [
    "Python", "JavaScript", "R", "SQL", "Java", "C++",
    "Machine Learning", "Deep Learning", "Data Analysis", "Statistics",
    "Cloud Computing", "Docker", "Kubernetes", "Git",
    "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn"
  ];

  const interests = [
    { id: "building", label: "Building", description: "Creating and developing AI solutions", icon: Code },
    { id: "deploying", label: "Deploying", description: "Implementing AI in production", icon: Zap },
    { id: "researching", label: "Researching", description: "Exploring AI theory and innovation", icon: Search }
  ];

  const handleSkillToggle = (skill: string) => {
    const currentSkills = data.experience || [];
    const newSkills = currentSkills.includes(skill) 
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    
    setData({ ...data, experience: newSkills });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      const completeData = data as OnboardingData;
      setCompletedData(completeData);
      setShowRecommendations(true);
      onComplete(completeData);
    }
  };

  const handleStartCourse = (courseId: string) => {
    if (onStartCourse) {
      onStartCourse(courseId);
    }
  };

  const handleCreateCustomCourse = () => {
    setShowCustomCreator(true);
    setShowRecommendations(false);
  };

  const handleBackToRecommendations = () => {
    setShowCustomCreator(false);
    setShowRecommendations(true);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1: return data.role;
      case 2: return data.goal;
      case 3: return data.experience && data.experience.length > 0;
      case 4: return data.interest;
      case 5: return data.background && data.preferredPace;
      default: return false;
    }
  };

  if (showCustomCreator && completedData) {
    return (
      <div className="min-h-screen bg-background p-6">
        <CustomCourseCreator 
          onboardingData={completedData}
          onBack={handleBackToRecommendations}
          onStartCourse={handleStartCourse}
        />
      </div>
    );
  }

  if (showRecommendations && completedData) {
    return (
      <div className="min-h-screen bg-background p-6">
        <CourseRecommendations 
          onboardingData={completedData}
          onStartCourse={handleStartCourse}
          onCreateCustomCourse={handleCreateCustomCourse}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 flex items-center justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-ai-primary to-ai-accent rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">AI-Powered Learning Path</CardTitle>
          <CardDescription>
            Let's personalize your learning journey based on your goals and experience
          </CardDescription>
          <div className="mt-4">
            <Progress value={progress} />
            <p className="text-sm text-muted-foreground mt-2">Step {step} of {totalSteps}</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">What's your career goal or current role?</h3>
              <div className="grid grid-cols-1 gap-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <div 
                      key={role.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        data.role === role.id ? 'border-ai-primary bg-ai-primary/5' : 'border-border'
                      }`}
                      onClick={() => setData({ ...data, role: role.id })}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-ai-primary" />
                        <div>
                          <h4 className="font-medium">{role.label}</h4>
                          <p className="text-sm text-muted-foreground">{role.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Tell us more about your specific goals</h3>
              <div className="space-y-2">
                <Label htmlFor="goal">What do you want to achieve? (e.g., "Build recommendation systems", "Lead AI teams")</Label>
                <Textarea
                  id="goal"
                  placeholder="Describe your learning objectives and career aspirations..."
                  value={data.goal || ""}
                  onChange={(e) => setData({ ...data, goal: e.target.value })}
                  className="min-h-[120px]"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Which tools or topics are you already comfortable with?</h3>
              <p className="text-sm text-muted-foreground">Select all that apply. This helps us skip basics you already know.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-center space-x-2">
                    <Checkbox
                      id={skill}
                      checked={data.experience?.includes(skill) || false}
                      onCheckedChange={() => handleSkillToggle(skill)}
                    />
                    <Label 
                      htmlFor={skill} 
                      className="text-sm cursor-pointer"
                    >
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium">Selected: {data.experience?.length || 0} skills</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {data.experience?.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Are you more interested in building, deploying, or researching?</h3>
              <RadioGroup 
                value={data.interest || ""} 
                onValueChange={(value) => setData({ ...data, interest: value })}
              >
                {interests.map((interest) => {
                  const Icon = interest.icon;
                  return (
                    <div key={interest.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value={interest.id} id={interest.id} />
                      <Icon className="w-5 h-5 text-ai-primary" />
                      <div>
                        <Label htmlFor={interest.id} className="font-medium cursor-pointer">
                          {interest.label}
                        </Label>
                        <p className="text-sm text-muted-foreground">{interest.description}</p>
                      </div>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tell us about your background</h3>
                <div className="space-y-2">
                  <Label htmlFor="background">What's your current experience level and background?</Label>
                  <Textarea
                    id="background"
                    placeholder="e.g., 'I'm a software engineer with 3 years experience, new to AI but familiar with Python...'"
                    value={data.background || ""}
                    onChange={(e) => setData({ ...data, background: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Preferred learning pace</h3>
                <RadioGroup 
                  value={data.preferredPace || ""} 
                  onValueChange={(value) => setData({ ...data, preferredPace: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intensive" id="intensive" />
                    <Label htmlFor="intensive">Intensive (2-3 hours/day)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="moderate" id="moderate" />
                    <Label htmlFor="moderate">Moderate (1 hour/day)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="casual" id="casual" />
                    <Label htmlFor="casual">Casual (3-4 hours/week)</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-ai-primary to-ai-accent text-white"
            >
              {step === totalSteps ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Generate My Path
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingFlow;