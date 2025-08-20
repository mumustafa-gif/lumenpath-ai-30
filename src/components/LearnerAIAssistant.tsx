import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { X, Bot, TrendingUp, BarChart3, LineChart, PieChart, Minimize2 } from "lucide-react";
import { ChatInterface } from "./ChatInterface";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

export const LearnerAIAssistant = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showVisualization, setShowVisualization] = useState(false);
  const [chartData, setChartData] = useState<any[]>([]);
  const [chartType, setChartType] = useState<string>("bar");
  const [chartTitle, setChartTitle] = useState("");

  const handleVisualizationRequest = (type: string, data: any[], title: string) => {
    setChartType(type);
    setChartData(data);
    setChartTitle(title);
    setShowVisualization(true);
  };

  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {chartData.map((entry, index) => (
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
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  const learnerSuggestions = [
    "Show my progress chart",
    "What should I study next?",
    "How am I performing vs peers?",
    "Recommend study schedule",
    "Show my skill gaps",
    "Generate practice quiz"
  ];

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsExpanded(true)}
          className="bg-ai-primary hover:bg-ai-primary/90 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4"
          size="lg"
        >
          <Bot className="h-6 w-6 mr-2" />
          AI Tutor
        </Button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed right-0 top-0 h-full w-96 bg-background/95 backdrop-blur-sm border-l shadow-xl z-40 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b bg-ai-primary text-white">
          <div className="flex items-center space-x-2">
            <Bot className="h-5 w-5" />
            <h3 className="font-semibold">AI Learning Tutor</h3>
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
        
        <div className="flex-1 p-4 overflow-hidden">
          <ChatInterface 
            placeholder="Ask your AI tutor anything..."
            suggestions={learnerSuggestions}
            onVisualizationRequest={handleVisualizationRequest}
          />
        </div>
      </div>

      {/* Chart Visualization Modal */}
      <Dialog open={showVisualization} onOpenChange={setShowVisualization}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-ai-primary" />
              <span>{chartTitle}</span>
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
                  variant={chartType === "pie" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("pie")}
                  className="flex items-center space-x-1"
                >
                  <PieChart className="h-4 w-4" />
                  <span>Pie</span>
                </Button>
              </div>
              
              <Badge variant="secondary" className="text-xs">
                {chartData.length} data points
              </Badge>
            </div>

            <Card className="p-6">
              {renderChart()}
            </Card>

            <div className="border-t pt-4">
              <ChatInterface 
                placeholder="Ask me to modify this chart or analyze the data..."
                suggestions={[
                  "Change to line chart",
                  "Show data table",
                  "Export as image",
                  "Add trend analysis"
                ]}
                onVisualizationRequest={handleVisualizationRequest}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};