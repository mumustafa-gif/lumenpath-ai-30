import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Bot, TrendingUp, BarChart3, LineChart, PieChart, Minimize2, BookOpen, FileText, Lightbulb, Sparkles, GraduationCap, Users, Target, Zap, ChevronUp, ChevronDown } from "lucide-react";
import { ChatInterface } from "./ChatInterface";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

export const InstructorAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);
  const [isGeneratingChart, setIsGeneratingChart] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [currentChart, setCurrentChart] = useState<any>(null);
  const [activeQuickAction, setActiveQuickAction] = useState<string | null>(null);
  const [isQuickActionsMinimized, setIsQuickActionsMinimized] = useState(false);
  const [isFeaturesMinimized, setIsFeaturesMinimized] = useState(false);
  
  // Draggable state
  const [position, setPosition] = useState({ x: 24, y: 24 }); // bottom-6 right-6 = 24px
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef<HTMLDivElement>(null);

  // Sample course data for visualization
  const courseData = [
    { name: 'Week 1', engagement: 95, completion: 88, students: 234 },
    { name: 'Week 2', engagement: 92, completion: 85, students: 228 },
    { name: 'Week 3', engagement: 88, completion: 82, students: 220 },
    { name: 'Week 4', engagement: 90, completion: 79, students: 215 },
    { name: 'Week 5', engagement: 93, completion: 86, students: 212 },
  ];

  const studentPerformanceData = [
    { category: 'Excellent', count: 45, color: '#4ade80' },
    { category: 'Good', count: 78, color: '#60a5fa' },
    { category: 'Fair', count: 32, color: '#fbbf24' },
    { category: 'Needs Help', count: 15, color: '#f87171' },
  ];

  const COLORS = ['#4ade80', '#60a5fa', '#fbbf24', '#f87171'];

  // Drag handlers
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!dragRef.current) return;
    
    setIsDragging(true);
    const rect = dragRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    const newX = window.innerWidth - (e.clientX - dragOffset.x + (isOpen ? 420 : 64));
    const newY = window.innerHeight - (e.clientY - dragOffset.y + (isOpen && !isMinimized ? 680 : isOpen ? 80 : 64));
    
    setPosition({
      x: Math.max(0, Math.min(newX, window.innerWidth - (isOpen ? 420 : 64))),
      y: Math.max(0, Math.min(newY, window.innerHeight - (isOpen && !isMinimized ? 680 : isOpen ? 80 : 64)))
    });
  }, [isDragging, dragOffset, isOpen, isMinimized]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleQuickAction = async (actionType: string) => {
    setActiveQuickAction(actionType);
    
    // Simulate processing with dummy data based on action type
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let dummyResponse = "";
    
    switch (actionType) {
      case "lesson":
        dummyResponse = `📚 **AI-Generated Lesson Plan: Introduction to Machine Learning**

**Course:** AI Fundamentals
**Duration:** 90 minutes
**Level:** Beginner

### Learning Objectives:
- Understand what machine learning is and its applications
- Differentiate between supervised, unsupervised, and reinforcement learning
- Identify real-world ML use cases

### Lesson Structure:

**1. Introduction (15 min)**
- Hook: Show examples of ML in daily life (Netflix recommendations, spam filters)
- Learning objectives overview
- Pre-assessment quiz

**2. Core Concepts (45 min)**
- What is Machine Learning? (definition, comparison with traditional programming)
- Types of ML:
  • Supervised Learning (examples: email classification, price prediction)
  • Unsupervised Learning (examples: customer segmentation, anomaly detection)
  • Reinforcement Learning (examples: game AI, robotics)

**3. Interactive Activity (20 min)**
- Group exercise: Classify given scenarios into ML types
- Discussion: Share findings and reasoning

**4. Wrap-up (10 min)**
- Key takeaways summary
- Preview of next lesson: "Data in Machine Learning"
- Q&A session

### Assessment:
- Exit ticket: 3 quick questions about ML types
- Assignment: Find 3 ML applications in your field of interest

### Resources:
- Interactive ML visualization tools
- Recommended readings from MIT OpenCourseWare
- Video: "Machine Learning Explained" (Andrew Ng)

*Generated by AI Course Assistant - Review and customize as needed*`;
        break;

      case "assessment":
        dummyResponse = `📝 **AI-Generated Assessment: Python Programming Fundamentals**

**Assessment Type:** Mixed Format Quiz
**Duration:** 45 minutes
**Total Points:** 100

### Section 1: Multiple Choice (40 points)

**Question 1 (10 points)**
Which of the following is the correct way to define a function in Python?
a) function myFunc():
b) def myFunc():
c) create myFunc():
d) func myFunc():

**Question 2 (10 points)**
What will be the output of: print(type([1, 2, 3]))?
a) <class 'tuple'>
b) <class 'list'>
c) <class 'array'>
d) <class 'dict'>

**Question 3 (10 points)**
Which operator is used for floor division in Python?
a) /
b) //
c) %
d) **

**Question 4 (10 points)**
What is the correct way to handle exceptions in Python?
a) try-catch
b) try-except
c) catch-finally
d) handle-error

### Section 2: Code Completion (30 points)

**Question 5 (15 points)**
Complete the following code to create a function that returns the factorial of a number:

\`\`\`python
def factorial(n):
    if n == 0 or n == 1:
        return ____
    else:
        return ____
\`\`\`

**Question 6 (15 points)**
Write a Python list comprehension that creates a list of squares for even numbers from 0 to 10:

\`\`\`python
squares = [____ for ____ in range(11) if ____]
\`\`\`

### Section 3: Short Answer (30 points)

**Question 7 (15 points)**
Explain the difference between a list and a tuple in Python. Provide one example of when you would use each.

**Question 8 (15 points)**
What is the purpose of the \`__init__\` method in Python classes? Write a simple example.

### Answer Key:
1. b) def myFunc():
2. b) <class 'list'>
3. b) //
4. b) try-except
5. return 1; return n * factorial(n-1)
6. x**2 for x in range(11) if x % 2 == 0

### Rubric:
- **Excellent (90-100):** All concepts mastered, clean code
- **Good (80-89):** Most concepts understood, minor errors
- **Satisfactory (70-79):** Basic understanding, some gaps
- **Needs Improvement (<70):** Significant gaps, requires review

*Generated by AI Course Assistant - Customize difficulty and topics as needed*`;
        break;

      case "analytics":
        // Trigger visualization instead of text response
        setActiveQuickAction(null);
        await handleVisualizationRequest("bar", courseData, "Course Analytics Dashboard");
        return;

      case "engagement":
        dummyResponse = `🎯 **Student Engagement Enhancement Plan**

**Current Engagement Analysis:**
- Average video completion: 73%
- Forum participation: 34%
- Assignment submission rate: 87%
- Live session attendance: 62%

### Immediate Actions (Next 2 weeks):

**1. Gamification Elements**
- Add progress badges for course milestones
- Create leaderboards for quiz scores (optional participation)
- Implement point system for forum contributions

**2. Interactive Content Upgrades**
- Convert 3 longest lectures to interactive segments
- Add polls and quizzes every 10 minutes in videos
- Create breakout room activities for live sessions

**3. Peer Learning Opportunities**
- Form study groups of 4-5 students
- Implement peer review for assignments
- Create discussion prompts for each module

### Medium-term Strategies (1-2 months):

**4. Personalized Learning Paths**
- Offer advanced tracks for quick learners
- Provide remedial content for struggling students
- Create project-based learning options

**5. Real-world Connections**
- Invite industry guest speakers
- Assign projects based on current events
- Create case studies from student industries

### Engagement Boosters:

**Virtual Office Hours**
- Weekly open Q&A sessions
- One-on-one consultation slots
- Peer mentoring program

**Content Variety**
- Mix of videos, readings, podcasts, and interactive simulations
- Short-form content for mobile learning
- Collaborative documents and wikis

**Recognition Systems**
- Highlight student work in course announcements
- Create "Student Spotlight" features
- Offer certificates for exceptional participation

### Success Metrics:
- Target: Increase video completion to 85%
- Target: Boost forum participation to 50%
- Target: Maintain 90%+ assignment submission
- Target: Increase live session attendance to 75%

**Next Steps:**
1. Survey students about preferred engagement methods
2. Implement top 3 highest-impact changes
3. Monitor metrics weekly
4. Adjust strategies based on feedback

*AI-generated recommendations based on learning science research*`;
        break;

      default:
        dummyResponse = "I'm ready to help! Please try one of the quick action buttons or ask me a specific question about course creation.";
    }
    
    // Simulate adding this to chat (this would integrate with the ChatInterface)
    console.log("AI Response for", actionType, ":", dummyResponse);
    setActiveQuickAction(null);
  };

  const handleVisualizationRequest = async (type: string, data: any[], title: string) => {
    setShowVisualization(true);
    setIsGeneratingChart(true);
    setGeneratingProgress(0);

    // Simulate AI processing with realistic progress
    const progressSteps = [
      { progress: 15, message: "Understanding your request..." },
      { progress: 35, message: "Analyzing course data..." },
      { progress: 55, message: "Processing student metrics..." },
      { progress: 75, message: "Generating visualization..." },
      { progress: 90, message: "Finalizing chart..." },
      { progress: 100, message: "Complete!" }
    ];

    for (const step of progressSteps) {
      await new Promise(resolve => setTimeout(resolve, 600));
      setGeneratingProgress(step.progress);
    }

    // Use instructor-specific course data
    setCurrentChart({ type, data: courseData, title });
    setIsGeneratingChart(false);
  };

  const renderChart = () => {
    if (!currentChart) return null;

    switch (currentChart.type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="engagement" stroke="#4ade80" strokeWidth={2} />
              <Line type="monotone" dataKey="completion" stroke="#60a5fa" strokeWidth={2} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={studentPerformanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {studentPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={courseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="engagement" fill="#4ade80" />
              <Bar dataKey="completion" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  if (!isOpen) {
    return (
      <div 
        ref={dragRef}
        className="fixed z-50 cursor-move"
        style={{ 
          right: `${position.x}px`, 
          bottom: `${position.y}px`,
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
        onMouseDown={handleMouseDown}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="group relative w-16 h-16 rounded-full shadow-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-emerald-500 hover:scale-110 transition-all duration-300 border-0 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 via-blue-400/20 to-emerald-400/20 animate-pulse"></div>
          <div className="relative flex items-center justify-center">
            <GraduationCap className="w-7 h-7 text-white drop-shadow-sm" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-yellow-900" />
            </div>
          </div>
          <div className="absolute inset-0 ring-4 ring-white/20 rounded-full group-hover:ring-white/40 transition-all duration-300"></div>
        </Button>
        
        {/* Floating tooltip */}
        <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg shadow-lg whitespace-nowrap">
            AI Course Assistant
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div 
        ref={dragRef}
        className={`fixed z-50 transition-all duration-500 ease-out ${
          isMinimized ? 'h-20' : 'h-[680px]'
        }`}
        style={{ 
          right: `${position.x}px`, 
          bottom: `${position.y}px`,
          width: '420px',
          cursor: isDragging ? 'grabbing' : 'grab'
        }}
      >
        <Card className="h-full bg-gradient-to-br from-slate-50/95 via-white/95 to-blue-50/95 dark:from-slate-900/95 dark:via-slate-800/95 dark:to-blue-900/95 backdrop-blur-xl border-0 shadow-2xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden">
          {/* Header */}
          <div 
            className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700 p-6 border-b border-white/10 cursor-move"
            onMouseDown={handleMouseDown}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center ring-2 ring-white/30">
                    <GraduationCap className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                    <Sparkles className="w-3 h-3 text-yellow-900" />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">AI Course Assistant</h3>
                  <p className="text-white/80 text-sm font-medium">Smart Content Creation</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-9 h-9 p-0 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-9 h-9 p-0 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {!isMinimized && (
            <div className="flex flex-col h-[calc(680px-100px)] overflow-hidden">
              {/* Quick Actions */}
              {!isQuickActionsMinimized && (
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100">Quick Actions</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-6 h-6 p-0 text-gray-500 hover:text-gray-700"
                      onClick={() => setIsQuickActionsMinimized(true)}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline" 
                      className={`h-12 justify-start space-x-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-200 dark:border-emerald-800 hover:shadow-md transition-all duration-200 ${
                        activeQuickAction === "lesson" ? "ring-2 ring-emerald-500 bg-emerald-100 dark:bg-emerald-900/50" : ""
                      }`}
                      onClick={() => handleQuickAction("lesson")}
                      disabled={activeQuickAction === "lesson"}
                    >
                      <FileText className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm font-medium">
                        {activeQuickAction === "lesson" ? "Generating..." : "Lesson Plans"}
                      </span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`h-12 justify-start space-x-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800 hover:shadow-md transition-all duration-200 ${
                        activeQuickAction === "assessment" ? "ring-2 ring-blue-500 bg-blue-100 dark:bg-blue-900/50" : ""
                      }`}
                      onClick={() => handleQuickAction("assessment")}
                      disabled={activeQuickAction === "assessment"}
                    >
                      <Target className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">
                        {activeQuickAction === "assessment" ? "Creating..." : "Assessments"}
                      </span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`h-12 justify-start space-x-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800 hover:shadow-md transition-all duration-200 ${
                        activeQuickAction === "analytics" ? "ring-2 ring-purple-500 bg-purple-100 dark:bg-purple-900/50" : ""
                      }`}
                      onClick={() => handleQuickAction("analytics")}
                      disabled={activeQuickAction === "analytics"}
                    >
                      <BarChart3 className="w-4 h-4 text-purple-600" />
                      <span className="text-sm font-medium">
                        {activeQuickAction === "analytics" ? "Analyzing..." : "Analytics"}
                      </span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`h-12 justify-start space-x-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-orange-200 dark:border-orange-800 hover:shadow-md transition-all duration-200 ${
                        activeQuickAction === "engagement" ? "ring-2 ring-orange-500 bg-orange-100 dark:bg-orange-900/50" : ""
                      }`}
                      onClick={() => handleQuickAction("engagement")}
                      disabled={activeQuickAction === "engagement"}
                    >
                      <Users className="w-4 h-4 text-orange-600" />
                      <span className="text-sm font-medium">
                        {activeQuickAction === "engagement" ? "Planning..." : "Engagement"}
                      </span>
                    </Button>
                  </div>
                </div>
              )}

              {/* Quick Actions - Minimized */}
              {isQuickActionsMinimized && (
                <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Quick Actions</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-6 h-6 p-0 text-gray-500 hover:text-gray-700"
                      onClick={() => setIsQuickActionsMinimized(false)}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* AI Features */}
              {!isFeaturesMinimized && (
                <div className="p-6 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">AI-Powered Features</h4>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-6 h-6 p-0 text-gray-500 hover:text-gray-700"
                      onClick={() => setIsFeaturesMinimized(true)}
                    >
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-sm transition-all duration-200">
                      <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Smart Content Generation</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Create engaging course materials</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-sm transition-all duration-200">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Performance Analytics</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Visualize student progress data</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 hover:shadow-sm transition-all duration-200">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <Lightbulb className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Smart Recommendations</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Get personalized teaching tips</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Features - Minimized */}
              {isFeaturesMinimized && (
                <div className="px-6 py-3 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">AI Features</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-6 h-6 p-0 text-gray-500 hover:text-gray-700"
                      onClick={() => setIsFeaturesMinimized(false)}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Chat Interface */}
              <div className="flex-1 flex flex-col min-h-0">
                <ScrollArea className="flex-1 px-6">
                  <div className="py-6">
                    <ChatInterface
                      placeholder="Ask me anything about course creation, student analytics, or teaching strategies..."
                      suggestions={[
                        "Create engaging lesson plan",
                        "Design interactive assessment", 
                        "Show student analytics",
                        "Improve course engagement"
                      ]}
                      onVisualizationRequest={handleVisualizationRequest}
                    />
                  </div>
                </ScrollArea>
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Chart Visualization Modal */}
      <Dialog open={showVisualization} onOpenChange={setShowVisualization}>
        <DialogContent className="max-w-4xl max-h-[90vh] z-[9999] backdrop:blur-md p-0">
          <ScrollArea className="max-h-[90vh]">
            <div className="p-6">
              {isGeneratingChart ? (
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-ai-primary/20 rounded-full animate-spin">
                  <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-ai-primary rounded-full animate-spin"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <BarChart3 className="w-8 h-8 text-ai-primary animate-pulse" />
                </div>
              </div>
              
              <div className="text-center space-y-3">
                <h3 className="text-xl font-semibold text-foreground">AI Agent Processing</h3>
                <p className="text-muted-foreground">Our AI is analyzing your course data and generating insights...</p>
                
                <div className="w-80 bg-muted rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-ai-primary to-ai-secondary transition-all duration-500 ease-out"
                    style={{ width: `${generatingProgress}%` }}
                  ></div>
                </div>
                
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <div className="animate-pulse">🤖</div>
                  <span>{generatingProgress}% Complete</span>
                </div>
                
                <div className="flex justify-center space-x-6 mt-6">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-ai-primary rounded-full animate-pulse"></div>
                    <span>Analyzing Data</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-ai-secondary rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    <span>Processing Metrics</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-ai-accent rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                    <span>Generating Chart</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-ai-primary" />
                  <span>Course Analytics Visualization</span>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-ai-primary">234</div>
                    <div className="text-sm text-muted-foreground">Total Students</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-ai-secondary">84%</div>
                    <div className="text-sm text-muted-foreground">Avg Completion</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-2xl font-bold text-ai-accent">91%</div>
                    <div className="text-sm text-muted-foreground">Engagement Rate</div>
                  </Card>
                </div>

                <Card className="p-4">
                  <h3 className="font-medium mb-4 flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>Course Progress Overview</span>
                  </h3>
                  {renderChart()}
                </Card>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Engagement</span>
                    </Badge>
                    <Badge variant="secondary" className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Completion</span>
                    </Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowVisualization(false)}
                  >
                    Close Visualization
                  </Button>
                </div>
              </div>
            </>
          )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
};