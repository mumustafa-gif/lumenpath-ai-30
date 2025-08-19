import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Sparkles, 
  FileText, 
  HelpCircle, 
  Clock,
  Users,
  Target,
  CheckCircle,
  Plus
} from "lucide-react";

export const CourseGenerator = () => {
  const [courseTopic, setCourseTopic] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [duration, setDuration] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState<any>(null);

  const handleGenerateCourse = async () => {
    setIsGenerating(true);
    
    // Simulate AI course generation
    setTimeout(() => {
      const mockCourse = {
        title: `${courseTopic} Mastery Program`,
        description: `Comprehensive ${courseTopic.toLowerCase()} training designed for ${targetAudience.toLowerCase()} professionals`,
        modules: [
          {
            id: 1,
            title: `Introduction to ${courseTopic}`,
            duration: "45 min",
            topics: ["Overview", "Key Concepts", "Industry Applications"],
            quiz: "10 questions"
          },
          {
            id: 2,
            title: `Core Principles of ${courseTopic}`,
            duration: "60 min",
            topics: ["Fundamental Theory", "Best Practices", "Common Patterns"],
            quiz: "15 questions"
          },
          {
            id: 3,
            title: `Practical Applications`,
            duration: "90 min",
            topics: ["Hands-on Exercises", "Real-world Examples", "Case Studies"],
            quiz: "12 questions"
          },
          {
            id: 4,
            title: `Advanced Techniques`,
            duration: "75 min",
            topics: ["Advanced Concepts", "Optimization", "Troubleshooting"],
            quiz: "18 questions"
          },
          {
            id: 5,
            title: `Capstone Project`,
            duration: "120 min",
            topics: ["Project Planning", "Implementation", "Review & Feedback"],
            quiz: "Final Assessment"
          }
        ],
        tags: [courseTopic, targetAudience, difficulty, "AI-Generated"],
        estimatedCompletion: "6-8 hours"
      };
      
      setGeneratedCourse(mockCourse);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-ai-primary" />
            AI-Powered Course Generator
          </CardTitle>
          <CardDescription>
            Let AI help you create comprehensive course structures, learning objectives, and assessments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Course Topic</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Machine Learning, Cloud Computing, Data Science"
                  value={courseTopic}
                  onChange={(e) => setCourseTopic(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Select value={targetAudience} onValueChange={setTargetAudience}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginners">Beginners</SelectItem>
                    <SelectItem value="intermediate">Intermediate Professionals</SelectItem>
                    <SelectItem value="advanced">Advanced Practitioners</SelectItem>
                    <SelectItem value="executives">Executives & Managers</SelectItem>
                    <SelectItem value="technical">Technical Teams</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Preferred Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">2-4 hours</SelectItem>
                    <SelectItem value="medium">4-8 hours</SelectItem>
                    <SelectItem value="long">8-16 hours</SelectItem>
                    <SelectItem value="extensive">16+ hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="objectives">Additional Learning Objectives (Optional)</Label>
                <Textarea
                  id="objectives"
                  placeholder="Describe any specific learning goals, skills, or outcomes you want to include..."
                  className="min-h-[120px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label>AI Features to Include</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="adaptive" defaultChecked />
                    <label htmlFor="adaptive" className="text-sm">Adaptive learning paths</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="quizzes" defaultChecked />
                    <label htmlFor="quizzes" className="text-sm">Auto-generated quizzes</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="assessments" defaultChecked />
                    <label htmlFor="assessments" className="text-sm">Competency assessments</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="projects" defaultChecked />
                    <label htmlFor="projects" className="text-sm">Practical projects</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <Button 
            onClick={handleGenerateCourse}
            disabled={!courseTopic || !targetAudience || !difficulty || isGenerating}
            variant="hero"
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                Generating Course Structure...
              </>
            ) : (
              <>
                <Brain className="w-4 h-4 mr-2" />
                Generate Course with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      {generatedCourse && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-ai-success" />
                Generated Course Structure
              </span>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <FileText className="w-4 h-4 mr-1" />
                  Export
                </Button>
                <Button size="sm" variant="ai">
                  <Plus className="w-4 h-4 mr-1" />
                  Create Course
                </Button>
              </div>
            </CardTitle>
            <CardDescription>
              AI has generated a comprehensive course structure based on your requirements
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{generatedCourse.estimatedCompletion}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{targetAudience}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{difficulty} level</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Course Description</h4>
                <p className="text-muted-foreground">{generatedCourse.description}</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {generatedCourse.tags.map((tag: string, index: number) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold">Course Modules</h4>
                <div className="space-y-3">
                  {generatedCourse.modules.map((module: any) => (
                    <Card key={module.id} className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium">Module {module.id}: {module.title}</h5>
                        <Badge variant="outline">{module.duration}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">Topics: </span>
                          <span className="text-sm text-muted-foreground">
                            {module.topics.join(", ")}
                          </span>
                        </div>
                        <div>
                          <span className="text-sm font-medium">Assessment: </span>
                          <span className="text-sm text-muted-foreground">{module.quiz}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};