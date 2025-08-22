import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Trash2, 
  FileText, 
  Video, 
  CheckCircle,
  Sparkles,
  Upload,
  Eye
} from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: string;
  content?: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface CourseData {
  title: string;
  description: string;
  difficulty: string;
  duration: string;
  targetAudience: string;
  learningObjectives: string;
  prerequisites: string;
  modules: Module[];
  coverImage?: string;
}

export const ManualCourseCreator = ({ onBack }: { onBack: () => void }) => {
  const [currentStep, setCurrentStep] = useState("details");
  const [isCreating, setIsCreating] = useState(false);
  const [creationProgress, setCreationProgress] = useState(0);
  
  const [courseData, setCourseData] = useState<CourseData>({
    title: '',
    description: '',
    difficulty: 'beginner',
    duration: '4-8 hours',
    targetAudience: '',
    learningObjectives: '',
    prerequisites: 'Basic computer skills',
    modules: [
      {
        id: '1',
        title: 'Introduction Module',
        description: 'Course overview and objectives',
        lessons: [
          { id: '1', title: 'Welcome to the Course', duration: '5 min', type: 'video' }
        ]
      }
    ],
    coverImage: undefined
  });

  const addModule = () => {
    const newModule: Module = {
      id: Date.now().toString(),
      title: 'New Module',
      description: 'Module description',
      lessons: [
        { id: Date.now().toString(), title: 'New Lesson', duration: '10 min', type: 'video' }
      ]
    };
    setCourseData({
      ...courseData,
      modules: [...courseData.modules, newModule]
    });
  };

  const removeModule = (moduleId: string) => {
    setCourseData({
      ...courseData,
      modules: courseData.modules.filter(m => m.id !== moduleId)
    });
  };

  const updateModule = (moduleId: string, field: string, value: string) => {
    setCourseData({
      ...courseData,
      modules: courseData.modules.map(m => 
        m.id === moduleId ? { ...m, [field]: value } : m
      )
    });
  };

  const addLesson = (moduleId: string) => {
    const newLesson: Lesson = {
      id: Date.now().toString(),
      title: 'New Lesson',
      duration: '10 min',
      type: 'video'
    };
    
    setCourseData({
      ...courseData,
      modules: courseData.modules.map(m => 
        m.id === moduleId ? { 
          ...m, 
          lessons: [...m.lessons, newLesson] 
        } : m
      )
    });
  };

  const removeLesson = (moduleId: string, lessonId: string) => {
    setCourseData({
      ...courseData,
      modules: courseData.modules.map(m => 
        m.id === moduleId ? {
          ...m,
          lessons: m.lessons.filter(l => l.id !== lessonId)
        } : m
      )
    });
  };

  const updateLesson = (moduleId: string, lessonId: string, field: string, value: string) => {
    setCourseData({
      ...courseData,
      modules: courseData.modules.map(m => 
        m.id === moduleId ? {
          ...m,
          lessons: m.lessons.map(l => 
            l.id === lessonId ? { ...l, [field]: value } : l
          )
        } : m
      )
    });
  };

  const handleCreateCourse = async () => {
    setIsCreating(true);
    setCurrentStep("creating");
    setCreationProgress(0);
    
    const steps = [
      "Validating course structure...",
      "Creating course database entry...",
      "Setting up modules and lessons...", 
      "Configuring assessment system...",
      "Setting up student enrollment...",
      "Configuring analytics tracking...",
      "Generating course certificates...",
      "Publishing to marketplace..."
    ];
    
    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setCreationProgress((i + 1) / steps.length * 100);
    }
    
    // Create comprehensive course object with dummy data
    const newCourse = {
      id: Date.now(),
      ...courseData,
      status: "published",
      createdAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
      students: 0,
      rating: 0,
      reviews: 0,
      progress: 0,
      engagement: 0,
      completionRate: 0,
      coverImage: courseData.coverImage || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
      
      // Analytics data
      analytics: {
        courseViews: Math.floor(Math.random() * 200) + 50,
        enrollmentRate: Math.floor(Math.random() * 20) + 10,
        completionRate: Math.floor(Math.random() * 30) + 60,
        averageSessionTime: Math.floor(Math.random() * 25) + 35,
        studentSatisfactionScore: (Math.random() * 1.5 + 3.5).toFixed(1),
        engagementMetrics: {
          videoCompletionRate: Math.floor(Math.random() * 15) + 80,
          quizParticipationRate: Math.floor(Math.random() * 10) + 85,
          discussionParticipation: Math.floor(Math.random() * 20) + 50,
          assignmentSubmissionRate: Math.floor(Math.random() * 8) + 87
        }
      },
      
      // Course features
      features: {
        certificateEnabled: true,
        aiTutoringEnabled: true,
        personalizedLearningPath: true,
        collaborativeProjects: false,
        mentorSupport: true,
        communityAccess: true,
        offlineAccess: false,
        mobileApp: true
      }
    };
    
    // Store in localStorage for demo
    const existingCourses = JSON.parse(localStorage.getItem('instructorCourses') || '[]');
    existingCourses.push(newCourse);
    localStorage.setItem('instructorCourses', JSON.stringify(existingCourses));
    
    setCurrentStep("success");
    setIsCreating(false);
  };

  const uploadCoverImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setCourseData({...courseData, coverImage: e.target?.result as string});
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  if (currentStep === "creating") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 animate-spin text-ai-primary" />
            Creating Your Course
          </CardTitle>
          <CardDescription>
            Setting up your course infrastructure...
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Progress value={creationProgress} className="w-full" />
          <p className="text-sm text-muted-foreground text-center">
            {creationProgress < 100 ? `${Math.round(creationProgress)}% Complete` : "Finalizing..."}
          </p>
        </CardContent>
      </Card>
    );
  }

  if (currentStep === "success") {
    return (
      <Card className="border-green-200 bg-green-50/50">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700">
            <CheckCircle className="w-5 h-5 mr-2" />
            Course Created Successfully!
          </CardTitle>
          <CardDescription className="text-green-600">
            Your course "{courseData.title}" is now live and ready for students.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border border-green-200 rounded-lg bg-white">
              <div className="font-semibold text-2xl text-green-700">{courseData.modules.length}</div>
              <div className="text-sm text-green-600">Modules</div>
            </div>
            <div className="text-center p-4 border border-green-200 rounded-lg bg-white">
              <div className="font-semibold text-2xl text-green-700">
                {courseData.modules.reduce((acc, m) => acc + m.lessons.length, 0)}
              </div>
              <div className="text-sm text-green-600">Lessons</div>
            </div>
            <div className="text-center p-4 border border-green-200 rounded-lg bg-white">
              <div className="font-semibold text-2xl text-green-700">Live</div>
              <div className="text-sm text-green-600">Status</div>
            </div>
            <div className="text-center p-4 border border-green-200 rounded-lg bg-white">
              <div className="font-semibold text-2xl text-green-700">0</div>
              <div className="text-sm text-green-600">Enrollments</div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <Button onClick={onBack} variant="outline">
              Create Another Course
            </Button>
            <Button onClick={() => window.open('/instructor', '_blank')} className="bg-ai-primary hover:bg-ai-primary/90">
              Go to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-ai-primary" />
            Manual Course Creator
          </CardTitle>
          <CardDescription>
            Create your course from scratch with full customization
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Course Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Course Information</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Course Title *</label>
                <Input 
                  value={courseData.title}
                  onChange={(e) => setCourseData({...courseData, title: e.target.value})}
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Target Audience *</label>
                <Input 
                  value={courseData.targetAudience}
                  onChange={(e) => setCourseData({...courseData, targetAudience: e.target.value})}
                  placeholder="e.g., Software developers, Marketing professionals"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="text-sm font-medium">Course Description *</label>
                <Textarea 
                  value={courseData.description}
                  onChange={(e) => setCourseData({...courseData, description: e.target.value})}
                  placeholder="Describe what students will learn in this course"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Difficulty Level</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={courseData.difficulty}
                  onChange={(e) => setCourseData({...courseData, difficulty: e.target.value})}
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Estimated Duration</label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={courseData.duration}
                  onChange={(e) => setCourseData({...courseData, duration: e.target.value})}
                >
                  <option value="1-2 hours">1-2 hours</option>
                  <option value="2-4 hours">2-4 hours</option>
                  <option value="4-8 hours">4-8 hours</option>
                  <option value="8-16 hours">8-16 hours</option>
                  <option value="16+ hours">16+ hours</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Learning Objectives</label>
                <Textarea 
                  value={courseData.learningObjectives}
                  onChange={(e) => setCourseData({...courseData, learningObjectives: e.target.value})}
                  placeholder="What will students achieve after completing this course?"
                  rows={2}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Prerequisites</label>
                <Textarea 
                  value={courseData.prerequisites}
                  onChange={(e) => setCourseData({...courseData, prerequisites: e.target.value})}
                  placeholder="What should students know before taking this course?"
                  rows={2}
                />
              </div>
            </div>
            
            {/* Cover Image */}
            <div>
              <label className="text-sm font-medium">Cover Image</label>
              <div className="flex items-center space-x-4">
                <Button onClick={uploadCoverImage} variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                {courseData.coverImage && (
                  <div className="text-sm text-muted-foreground">Image uploaded successfully</div>
                )}
              </div>
            </div>
          </div>

          {/* Course Modules */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Course Modules</h3>
              <Button onClick={addModule} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Module
              </Button>
            </div>
            
            <ScrollArea className="h-[400px] border rounded-md p-4">
              <div className="space-y-4">
                {courseData.modules.map((module, moduleIndex) => (
                  <div key={module.id} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 space-y-2">
                        <Input 
                          value={module.title}
                          onChange={(e) => updateModule(module.id, 'title', e.target.value)}
                          placeholder="Module title"
                          className="font-medium"
                        />
                        <Input 
                          value={module.description}
                          onChange={(e) => updateModule(module.id, 'description', e.target.value)}
                          placeholder="Module description"
                        />
                      </div>
                      <Button 
                        onClick={() => removeModule(module.id)} 
                        variant="outline" 
                        size="sm"
                        className="ml-2 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Lessons */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Lessons</label>
                        <Button 
                          onClick={() => addLesson(module.id)} 
                          variant="outline" 
                          size="sm"
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add Lesson
                        </Button>
                      </div>
                      
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div key={lesson.id} className="flex gap-2 items-center bg-gray-50 p-2 rounded">
                          <Input 
                            value={lesson.title}
                            onChange={(e) => updateLesson(module.id, lesson.id, 'title', e.target.value)}
                            placeholder="Lesson title"
                            className="flex-1"
                          />
                          <Input 
                            value={lesson.duration}
                            onChange={(e) => updateLesson(module.id, lesson.id, 'duration', e.target.value)}
                            placeholder="Duration"
                            className="w-24"
                          />
                          <select 
                            value={lesson.type}
                            onChange={(e) => updateLesson(module.id, lesson.id, 'type', e.target.value)}
                            className="p-2 border rounded w-24"
                          >
                            <option value="video">Video</option>
                            <option value="quiz">Quiz</option>
                            <option value="reading">Reading</option>
                            <option value="exercise">Exercise</option>
                          </select>
                          <Button 
                            onClick={() => removeLesson(module.id, lesson.id)} 
                            variant="outline" 
                            size="sm"
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Actions */}
          <div className="flex justify-center space-x-4">
            <Button onClick={onBack} variant="outline">
              Back to Dashboard
            </Button>
            <Button 
              onClick={handleCreateCourse}
              disabled={!courseData.title || !courseData.description || isCreating}
              className="bg-ai-primary hover:bg-ai-primary/90"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Create Course
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};