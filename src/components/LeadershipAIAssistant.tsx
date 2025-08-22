import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Bot, TrendingUp, BarChart3, LineChart, PieChart, Minimize2, Brain, Sparkles } from "lucide-react";
import { ChatInterface } from "./ChatInterface";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const COLORS = ['hsl(var(--ai-primary))', 'hsl(var(--ai-secondary))', 'hsl(var(--ai-success))', 'hsl(var(--ai-warning))', 'hsl(var(--destructive))', 'hsl(var(--muted))'];

export const LeadershipAIAssistant = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartType, setChartType] = useState<string>("bar");
  const [chartTitle, setChartTitle] = useState("");
  const [isGeneratingChart, setIsGeneratingChart] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [agentPhase, setAgentPhase] = useState("analyzing");

  const handleVisualizationRequest = (type: string, data: any[], title: string) => {
    setIsGeneratingChart(true);
    setGenerationProgress(0);
    setShowVisualization(true);
    setAgentPhase("analyzing");
    
    // Simulate AI agent processing with different phases
    const phases = [
      { phase: "analyzing", message: "Data Intelligence Agent analyzing patterns..." },
      { phase: "processing", message: "Chart Generation Agent processing requirements..." },
      { phase: "optimizing", message: "Visualization Agent optimizing display..." },
      { phase: "finalizing", message: "Quality Assurance Agent validating output..." }
    ];
    
    let currentPhaseIndex = 0;
    
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        const newProgress = prev + Math.random() * 12;
        
        // Update phase based on progress
        if (newProgress > 25 && currentPhaseIndex === 0) {
          currentPhaseIndex = 1;
          setAgentPhase(phases[1].phase);
        } else if (newProgress > 50 && currentPhaseIndex === 1) {
          currentPhaseIndex = 2;
          setAgentPhase(phases[2].phase);
        } else if (newProgress > 75 && currentPhaseIndex === 2) {
          currentPhaseIndex = 3;
          setAgentPhase(phases[3].phase);
        }
        
        if (newProgress >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return newProgress;
      });
    }, 150);
    
    // Complete the generation
    setTimeout(() => {
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setAgentPhase("complete");
      setTimeout(() => {
        setChartType(type);
        setChartData(data);
        setChartTitle(title);
        setIsGeneratingChart(false);
        setGenerationProgress(0);
      }, 800);
    }, 3000);
  };

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <RechartsLineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--ai-primary))" strokeWidth={3} dot={{ fill: 'hsl(var(--ai-primary))' }} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--ai-primary))" fill="hsl(var(--ai-primary))" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={350}>
            <RechartsPieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="value" fill="hsl(var(--ai-primary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  const getAgentMessage = () => {
    switch (agentPhase) {
      case "analyzing":
        return "Data Intelligence Agent analyzing administrative patterns...";
      case "processing":
        return "Chart Generation Agent processing visualization requirements...";
      case "optimizing":
        return "Display Optimization Agent enhancing chart aesthetics...";
      case "finalizing":
        return "Quality Assurance Agent validating admin insights...";
      case "complete":
        return "All agents have completed processing. Chart ready!";
      default:
        return "AI Agents initializing...";
    }
  };

  const adminSuggestions = [
    "Show enrollment trends",
    "Generate skills gap analysis",
    "Display revenue breakdown",
    "Create performance dashboard",
    "Analyze learner demographics", 
    "Show course completion rates",
    "Generate workforce insights",
    "Display market demand trends"
  ];

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          className="bg-ai-primary hover:bg-ai-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4"
          size="lg"
        >
          <Brain className="h-6 w-6 mr-2" />
          AI Admin Assistant
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed right-0 top-0 h-full w-96 bg-background/95 backdrop-blur-sm border-l shadow-xl z-[60] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-ai-primary text-white">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Brain className="h-5 w-5" />
              <Sparkles className="h-3 w-3 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <h3 className="font-semibold">AI Admin Assistant</h3>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
              className="h-8 w-8 text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-1 p-4">
          <ChatInterface 
            placeholder="Ask your AI assistant for administrative insights..."
            suggestions={adminSuggestions}
            onVisualizationRequest={handleVisualizationRequest}
          />
        </ScrollArea>
      </div>

      {/* Chart Visualization Modal */}
      <Dialog open={showVisualization} onOpenChange={setShowVisualization}>
        <DialogContent className="max-w-5xl max-h-[90vh] z-[9999] backdrop:blur-md p-0">
          <ScrollArea className="max-h-[90vh]">
            <div className="p-6">
              {isGeneratingChart ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-8">
                  <div className="relative">
                    <div className="w-24 h-24 border-4 border-ai-primary/20 rounded-full animate-spin">
                      <div className="absolute top-0 left-0 w-24 h-24 border-4 border-transparent border-t-ai-primary rounded-full animate-spin" 
                           style={{ animationDuration: '0.6s' }}></div>
                    </div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <Brain className="h-10 w-10 text-ai-primary animate-pulse" />
                      <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-ai-secondary animate-ping" />
                    </div>
                  </div>
                  
                  <div className="text-center space-y-6 max-w-md">
                    <h3 className="text-xl font-bold text-foreground">AI Agents Processing</h3>
                    <p className="text-sm text-muted-foreground">
                      {getAgentMessage()}
                    </p>
                    
                    <div className="w-80 bg-secondary rounded-full h-3 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-primary transition-all duration-500 ease-out"
                        style={{ width: `${generationProgress}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                      <div className={`flex items-center space-x-1 ${agentPhase === 'analyzing' ? 'text-ai-primary font-medium' : ''}`}>
                        <div className={`w-2 h-2 rounded-full ${agentPhase === 'analyzing' ? 'bg-ai-primary animate-pulse' : 'bg-muted'}`}></div>
                        <span>Analyze</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${agentPhase === 'processing' ? 'text-ai-primary font-medium' : ''}`}>
                        <div className={`w-2 h-2 rounded-full ${agentPhase === 'processing' ? 'bg-ai-primary animate-pulse' : 'bg-muted'}`}></div>
                        <span>Process</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${agentPhase === 'optimizing' ? 'text-ai-primary font-medium' : ''}`}>
                        <div className={`w-2 h-2 rounded-full ${agentPhase === 'optimizing' ? 'bg-ai-primary animate-pulse' : 'bg-muted'}`}></div>
                        <span>Optimize</span>
                      </div>
                      <div className={`flex items-center space-x-1 ${agentPhase === 'finalizing' ? 'text-ai-primary font-medium' : ''}`}>
                        <div className={`w-2 h-2 rounded-full ${agentPhase === 'finalizing' ? 'bg-ai-primary animate-pulse' : 'bg-muted'}`}></div>
                        <span>Finalize</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5 text-ai-primary" />
                      <span>{chartTitle}</span>
                      <Badge variant="secondary" className="ml-auto">AI Generated</Badge>
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        <Button
                          variant={chartType === "bar" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setChartType("bar")}
                          className="flex items-center space-x-1"
                        >
                          <BarChart3 className="h-4 w-4" />
                          <span>Bar</span>
                        </Button>
                        <Button
                          variant={chartType === "line" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setChartType("line")}
                          className="flex items-center space-x-1"
                        >
                          <LineChart className="h-4 w-4" />
                          <span>Line</span>
                        </Button>
                        <Button
                          variant={chartType === "area" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setChartType("area")}
                          className="flex items-center space-x-1"
                        >
                          <AreaChart className="h-4 w-4" />
                          <span>Area</span>
                        </Button>
                        <Button
                          variant={chartType === "pie" ? "default" : "outline"}
                          size="sm"
                          onClick={() => setChartType("pie")}
                          className="flex items-center space-x-1"
                        >
                          <PieChart className="h-4 w-4" />
                          <span>Pie</span>
                        </Button>
                      </div>
                      
                      <Badge variant="outline" className="text-xs">
                        {chartData.length} data points
                      </Badge>
                    </div>

                    <Card className="p-6 bg-gradient-to-br from-card to-muted/20">
                      {renderChart()}
                    </Card>

                    <div className="border-t pt-4">
                      <ChatInterface 
                        placeholder="Ask me to modify this chart or generate new insights..."
                        suggestions={[
                          "Change to area chart",
                          "Show data table",
                          "Export as image",
                          "Add trend analysis",
                          "Compare with last quarter",
                          "Generate summary report"
                        ]}
                        onVisualizationRequest={handleVisualizationRequest}
                      />
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