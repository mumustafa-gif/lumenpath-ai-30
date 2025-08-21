import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  GraduationCap, 
  BookOpen, 
  Clock, 
  Users, 
  Target, 
  Sparkles, 
  Brain, 
  FileText, 
  Play,
  CheckCircle,
  Loader2,
  Download,
  Share2,
  Calendar
} from "lucide-react";

interface CurriculumModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
  learningObjectives: string[];
  content: string[];
  assessments: string[];
}

interface GenerationProgress {
  stage: string;
  progress: number;
  status: string;
}

export const CurriculumCreator = () => {
  const [activeTab, setActiveTab] = useState("create");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState<GenerationProgress[]>([]);
  const [generatedCurriculum, setGeneratedCurriculum] = useState<CurriculumModule[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    level: "",
    field: "",
    prerequisites: "",
    objectives: "",
    targetAudience: ""
  });

  const aiStages = [
    { stage: "Analyzing Educational Requirements", duration: 2000 },
    { stage: "Researching Industry Standards", duration: 3000 },
    { stage: "Generating Learning Objectives", duration: 2500 },
    { stage: "Creating Module Structure", duration: 3500 },
    { stage: "Developing Assessment Framework", duration: 2000 },
    { stage: "Optimizing Learning Pathways", duration: 1500 },
    { stage: "Finalizing Curriculum", duration: 1000 }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenerationProgress([]);
    setActiveTab("generate");

    for (let i = 0; i < aiStages.length; i++) {
      const stage = aiStages[i];
      
      // Add new stage
      setGenerationProgress(prev => [
        ...prev,
        { stage: stage.stage, progress: 0, status: "processing" }
      ]);

      // Simulate progress for current stage
      const progressInterval = setInterval(() => {
        setGenerationProgress(prev => 
          prev.map((item, index) => 
            index === i 
              ? { ...item, progress: Math.min(item.progress + 10, 100) }
              : item
          )
        );
      }, stage.duration / 10);

      // Wait for stage completion
      await new Promise(resolve => setTimeout(resolve, stage.duration));
      
      clearInterval(progressInterval);
      
      // Mark stage as complete
      setGenerationProgress(prev =>
        prev.map((item, index) =>
          index === i
            ? { ...item, progress: 100, status: "complete" }
            : item
        )
      );
    }

    // Generate dummy curriculum
    const dummyCurriculum: CurriculumModule[] = [
      {
        id: "1",
        title: "Foundation and Prerequisites",
        description: "Essential concepts and preparatory knowledge",
        duration: "2-3 weeks",
        difficulty: "Beginner",
        learningObjectives: [
          "Understand fundamental concepts",
          "Master prerequisite skills",
          "Establish learning foundation"
        ],
        content: [
          "Introduction to Core Concepts",
          "Mathematical Foundations",
          "Basic Programming Principles",
          "Industry Overview"
        ],
        assessments: [
          "Diagnostic Assessment",
          "Foundation Quiz",
          "Practical Exercise"
        ]
      },
      {
        id: "2", 
        title: "Core Theory and Principles",
        description: "In-depth exploration of theoretical foundations",
        duration: "4-5 weeks",
        difficulty: "Intermediate",
        learningObjectives: [
          "Master theoretical frameworks",
          "Apply core principles",
          "Analyze complex scenarios"
        ],
        content: [
          "Advanced Theoretical Models",
          "Practical Applications",
          "Case Study Analysis",
          "Research Methodologies"
        ],
        assessments: [
          "Midterm Examination",
          "Research Project",
          "Peer Review Assignment"
        ]
      },
      {
        id: "3",
        title: "Practical Application",
        description: "Hands-on implementation and real-world projects",
        duration: "3-4 weeks", 
        difficulty: "Advanced",
        learningObjectives: [
          "Implement practical solutions",
          "Develop project management skills",
          "Create portfolio projects"
        ],
        content: [
          "Project Planning and Design",
          "Implementation Techniques",
          "Testing and Validation",
          "Documentation Standards"
        ],
        assessments: [
          "Capstone Project",
          "Portfolio Presentation",
          "Industry Simulation"
        ]
      },
      {
        id: "4",
        title: "Advanced Topics and Specialization",
        description: "Cutting-edge developments and specialized knowledge",
        duration: "3-4 weeks",
        difficulty: "Expert",
        learningObjectives: [
          "Explore advanced topics",
          "Develop specialization",
          "Lead innovation projects"
        ],
        content: [
          "Emerging Technologies",
          "Research and Development",
          "Innovation Methodologies",
          "Leadership in Technology"
        ],
        assessments: [
          "Research Thesis",
          "Innovation Challenge",
          "Final Examination"
        ]
      }
    ];

    setGeneratedCurriculum(dummyCurriculum);
    setIsGenerating(false);
    setActiveTab("result");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      duration: "",
      level: "",
      field: "",
      prerequisites: "",
      objectives: "",
      targetAudience: ""
    });
    setGeneratedCurriculum([]);
    setGenerationProgress([]);
    setActiveTab("create");
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "beginner": return "bg-green-100 text-green-700 border-green-200";
      case "intermediate": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "advanced": return "bg-orange-100 text-orange-700 border-orange-200";
      case "expert": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ai-primary mb-2 flex items-center gap-3">
            <div className="p-2 bg-ai-primary/10 rounded-xl">
              <GraduationCap className="w-6 h-6 text-ai-primary" />
            </div>
            AI Curriculum Creator
          </h2>
          <p className="text-muted-foreground">Create comprehensive university curricula and course content with AI assistance</p>
        </div>
        {generatedCurriculum.length > 0 && (
          <div className="flex gap-2 mt-4 lg:mt-0">
            <Button variant="outline" onClick={resetForm}>
              <FileText className="w-4 h-4 mr-2" />
              New Curriculum
            </Button>
            <Button className="bg-ai-primary hover:bg-ai-primary/90">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="create">Create Curriculum</TabsTrigger>
          <TabsTrigger value="generate" disabled={!isGenerating && generationProgress.length === 0}>
            AI Generation
          </TabsTrigger>
          <TabsTrigger value="result" disabled={generatedCurriculum.length === 0}>
            Generated Curriculum
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-ai-primary" />
                Curriculum Specifications
              </CardTitle>
              <CardDescription>
                Provide details about your curriculum requirements for AI-powered generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">Curriculum Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Advanced Machine Learning Engineering"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="field">Field of Study</Label>
                    <Select value={formData.field} onValueChange={(value) => setFormData({...formData, field: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select field" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="computer-science">Computer Science</SelectItem>
                        <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                        <SelectItem value="data-science">Data Science</SelectItem>
                        <SelectItem value="software-engineering">Software Engineering</SelectItem>
                        <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                        <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                        <SelectItem value="business-analytics">Business Analytics</SelectItem>
                        <SelectItem value="information-systems">Information Systems</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="level">Academic Level</Label>
                    <Select value={formData.level} onValueChange={(value) => setFormData({...formData, level: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="undergraduate">Undergraduate</SelectItem>
                        <SelectItem value="graduate">Graduate</SelectItem>
                        <SelectItem value="masters">Master's Program</SelectItem>
                        <SelectItem value="phd">PhD Program</SelectItem>
                        <SelectItem value="certificate">Certificate Program</SelectItem>
                        <SelectItem value="diploma">Diploma</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="duration">Program Duration</Label>
                    <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-semester">1 Semester</SelectItem>
                        <SelectItem value="2-semester">2 Semesters</SelectItem>
                        <SelectItem value="1-year">1 Year</SelectItem>
                        <SelectItem value="2-year">2 Years</SelectItem>
                        <SelectItem value="3-year">3 Years</SelectItem>
                        <SelectItem value="4-year">4 Years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="description">Program Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the program's purpose and scope..."
                      className="h-24"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="objectives">Learning Objectives</Label>
                    <Textarea
                      id="objectives"
                      placeholder="List key learning objectives and outcomes..."
                      className="h-24"
                      value={formData.objectives}
                      onChange={(e) => setFormData({...formData, objectives: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="prerequisites">Prerequisites</Label>
                    <Textarea
                      id="prerequisites"
                      placeholder="Required background knowledge or qualifications..."
                      className="h-20"
                      value={formData.prerequisites}
                      onChange={(e) => setFormData({...formData, prerequisites: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="targetAudience">Target Audience</Label>
                    <Input
                      id="targetAudience"
                      placeholder="e.g., Working professionals, Recent graduates"
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button 
                  onClick={handleGenerate}
                  disabled={!formData.title || !formData.field || !formData.level}
                  className="bg-ai-primary hover:bg-ai-primary/90 px-8 py-3"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Curriculum with AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="generate" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-ai-primary animate-pulse" />
                AI Curriculum Generation in Progress
              </CardTitle>
              <CardDescription>
                Our AI agents are analyzing your requirements and creating a comprehensive curriculum
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-ai-primary/10 rounded-full flex items-center justify-center">
                  <Loader2 className="w-10 h-10 text-ai-primary animate-spin" />
                </div>
                <p className="text-lg font-medium text-ai-primary">
                  Creating your curriculum: {formData.title}
                </p>
              </div>

              <div className="space-y-4">
                {generationProgress.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.status === "complete" ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Loader2 className="w-5 h-5 text-ai-primary animate-spin" />
                        )}
                        <span className="font-medium">{item.stage}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                  </div>
                ))}
              </div>

              {isGenerating && (
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    This may take a few moments as our AI creates a comprehensive curriculum...
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="result" className="space-y-6">
          {generatedCurriculum.length > 0 && (
            <>
              {/* Curriculum Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-ai-primary" />
                    {formData.title}
                  </CardTitle>
                  <CardDescription>{formData.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <Clock className="w-6 h-6 mx-auto mb-2 text-ai-primary" />
                      <div className="font-semibold">{formData.duration}</div>
                      <div className="text-sm text-muted-foreground">Duration</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Target className="w-6 h-6 mx-auto mb-2 text-ai-secondary" />
                      <div className="font-semibold">{formData.level}</div>
                      <div className="text-sm text-muted-foreground">Level</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <BookOpen className="w-6 h-6 mx-auto mb-2 text-ai-accent" />
                      <div className="font-semibold">{generatedCurriculum.length}</div>
                      <div className="text-sm text-muted-foreground">Modules</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <Users className="w-6 h-6 mx-auto mb-2 text-ai-success" />
                      <div className="font-semibold">{formData.targetAudience.split(',')[0] || 'Students'}</div>
                      <div className="text-sm text-muted-foreground">Target</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Curriculum Modules */}
              <div className="space-y-6">
                {generatedCurriculum.map((module, index) => (
                  <Card key={module.id} className="border-l-4 border-l-ai-primary">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-ai-primary text-white rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          {module.title}
                        </CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline" className={getDifficultyColor(module.difficulty)}>
                            {module.difficulty}
                          </Badge>
                          <Badge variant="outline">
                            <Clock className="w-3 h-3 mr-1" />
                            {module.duration}
                          </Badge>
                        </div>
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4 text-ai-primary" />
                            Learning Objectives
                          </h4>
                          <ul className="space-y-2">
                            {module.learningObjectives.map((objective, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                {objective}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <BookOpen className="w-4 h-4 text-ai-secondary" />
                            Content Topics
                          </h4>
                          <ul className="space-y-2">
                            {module.content.map((topic, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <Play className="w-4 h-4 text-ai-secondary mt-0.5 flex-shrink-0" />
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-ai-accent" />
                            Assessments
                          </h4>
                          <ul className="space-y-2">
                            {module.assessments.map((assessment, idx) => (
                              <li key={idx} className="text-sm flex items-start gap-2">
                                <Calendar className="w-4 h-4 text-ai-accent mt-0.5 flex-shrink-0" />
                                {assessment}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={resetForm}>
                  Create New Curriculum
                </Button>
                <Button className="bg-ai-secondary hover:bg-ai-secondary/90">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share Curriculum
                </Button>
                <Button className="bg-ai-primary hover:bg-ai-primary/90">
                  <Download className="w-4 h-4 mr-2" />
                  Export to PDF
                </Button>
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};