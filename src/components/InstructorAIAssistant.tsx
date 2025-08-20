import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Bot, TrendingUp, BarChart3, LineChart, PieChart, Minimize2, BookOpen, FileText, Lightbulb } from "lucide-react";
import { ChatInterface } from "./ChatInterface";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

export const InstructorAIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);
  const [isGeneratingChart, setIsGeneratingChart] = useState(false);
  const [generatingProgress, setGeneratingProgress] = useState(0);
  const [currentChart, setCurrentChart] = useState<any>(null);

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
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg bg-gradient-to-r from-ai-primary to-ai-secondary hover:from-ai-primary/90 hover:to-ai-secondary/90 z-50"
      >
        <Bot className="w-6 h-6 text-white" />
      </Button>
    );
  }

  return (
    <>
      <Card className={`fixed bottom-4 right-4 w-96 bg-card/95 backdrop-blur-sm border shadow-2xl z-50 transition-all duration-300 ${
        isMinimized ? 'h-16' : 'h-[600px]'
      }`}>
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-ai-primary to-ai-secondary">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-white">Course Content Assistant</h3>
              <p className="text-xs text-white/70">AI-Powered Content Creation</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-white/70 hover:text-white hover:bg-white/20"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 text-white/70 hover:text-white hover:bg-white/20"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <div className="flex flex-col h-[calc(600px-80px)]">
            <div className="p-3 border-b bg-muted/50">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Lightbulb className="w-4 h-4" />
                <span>Ask me to create lesson plans, assessments, or visualize course data!</span>
              </div>
            </div>

            <ChatInterface
              placeholder="Ask me to help create course content, lesson plans, assessments, or visualize course data..."
              suggestions={[
                "Create a lesson plan for machine learning basics",
                "Design an assessment for Python programming", 
                "Show me course engagement analytics",
                "Help me improve student interaction"
              ]}
              onVisualizationRequest={handleVisualizationRequest}
            />
          </div>
        )}
      </Card>

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