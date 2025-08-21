import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  Calendar, 
  Target, 
  AlertTriangle, 
  Zap,
  Download,
  BarChart3,
  LineChart,
  Brain,
  Clock
} from "lucide-react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useState } from "react";

export const ForecastReport = () => {
  const [forecastPeriod, setForecastPeriod] = useState("6months");
  const [selectedMetric, setSelectedMetric] = useState("skills");

  const skillDemandForecast = [
    { month: "Jan 2024", aiMl: 23, cloud: 34, cyber: 31, dataScience: 42, devOps: 48 },
    { month: "Feb 2024", aiMl: 28, cloud: 38, cyber: 35, dataScience: 45, devOps: 51 },
    { month: "Mar 2024", aiMl: 35, cloud: 43, cyber: 40, dataScience: 49, devOps: 54 },
    { month: "Apr 2024", aiMl: 42, cloud: 48, cyber: 45, dataScience: 52, devOps: 58 },
    { month: "May 2024", aiMl: 51, cloud: 54, cyber: 51, dataScience: 56, devOps: 62 },
    { month: "Jun 2024", aiMl: 59, cloud: 61, cyber: 57, dataScience: 60, devOps: 66 },
  ];

  const marketPredictions = [
    { 
      category: "AI/ML Engineering", 
      currentDemand: 23, 
      predictedDemand: 78, 
      growth: "+239%",
      confidence: 94,
      timeframe: "12 months",
      impact: "Critical",
      salary: { current: 125000, predicted: 165000 }
    },
    { 
      category: "Cloud Architecture", 
      currentDemand: 34, 
      predictedDemand: 71, 
      growth: "+109%",
      confidence: 89,
      timeframe: "12 months",
      impact: "High",
      salary: { current: 115000, predicted: 145000 }
    },
    { 
      category: "Cybersecurity", 
      currentDemand: 31, 
      predictedDemand: 68, 
      growth: "+119%",
      confidence: 91,
      timeframe: "12 months",
      impact: "High",
      salary: { current: 108000, predicted: 138000 }
    },
    { 
      category: "Data Engineering", 
      currentDemand: 42, 
      predictedDemand: 62, 
      growth: "+48%",
      confidence: 85,
      timeframe: "12 months",
      impact: "Medium",
      salary: { current: 98000, predicted: 118000 }
    }
  ];

  const industryTrends = [
    { industry: "Technology", growth: "+45%", demand: 92, riskLevel: "Low" },
    { industry: "Healthcare", growth: "+38%", demand: 78, riskLevel: "Medium" },
    { industry: "Finance", growth: "+52%", demand: 89, riskLevel: "Low" },
    { industry: "Education", growth: "+28%", demand: 65, riskLevel: "High" },
    { industry: "Government", growth: "+31%", demand: 72, riskLevel: "Medium" }
  ];

  const keyInsights = [
    {
      title: "AI Skills Shortage Critical",
      description: "AI/ML skills demand will increase by 239% in next 12 months, creating severe talent shortage",
      severity: "critical",
      timeframe: "Immediate",
      impact: "High"
    },
    {
      title: "Cloud Migration Acceleration",
      description: "Enterprise cloud adoption driving 109% increase in cloud architecture roles",
      severity: "high", 
      timeframe: "6 months",
      impact: "Medium"
    },
    {
      title: "Cybersecurity Investment Surge",
      description: "Rising cyber threats leading to 119% growth in security professional demand",
      severity: "high",
      timeframe: "3 months", 
      impact: "High"
    },
    {
      title: "Remote Work Skills Gap",
      description: "Digital collaboration and remote management skills becoming essential",
      severity: "medium",
      timeframe: "9 months",
      impact: "Medium"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ai-primary mb-2 flex items-center gap-3">
            <div className="p-2 bg-ai-primary/10 rounded-xl">
              <Brain className="w-6 h-6 text-ai-primary" />
            </div>
            AI-Powered Forecast Report
          </h2>
          <p className="text-muted-foreground">Predictive analytics for skill demand and market trends</p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="12months">12 Months</SelectItem>
              <SelectItem value="24months">24 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-ai-primary hover:bg-ai-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {keyInsights.map((insight, index) => (
          <Card key={index} className={`border-l-4 ${
            insight.severity === 'critical' ? 'border-l-destructive bg-destructive/5' :
            insight.severity === 'high' ? 'border-l-ai-warning bg-ai-warning/5' :
            'border-l-ai-primary bg-ai-primary/5'
          }`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{insight.title}</CardTitle>
                <Badge variant={insight.severity === 'critical' ? 'destructive' : 'secondary'} className="text-xs">
                  {insight.severity.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
              <div className="flex justify-between text-xs">
                <span className="text-ai-primary">{insight.timeframe}</span>
                <span className="font-medium">{insight.impact} Impact</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Demand Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="w-5 h-5 text-ai-primary" />
            Skills Demand Forecast Trends
          </CardTitle>
          <CardDescription>Projected demand growth for critical skills over next 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={skillDemandForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px'
                }} 
              />
              <Area type="monotone" dataKey="aiMl" stackId="1" stroke="hsl(var(--ai-primary))" fill="hsl(var(--ai-primary))" fillOpacity={0.8} />
              <Area type="monotone" dataKey="cloud" stackId="1" stroke="hsl(var(--ai-secondary))" fill="hsl(var(--ai-secondary))" fillOpacity={0.8} />
              <Area type="monotone" dataKey="cyber" stackId="1" stroke="hsl(var(--ai-warning))" fill="hsl(var(--ai-warning))" fillOpacity={0.8} />
              <Area type="monotone" dataKey="dataScience" stackId="1" stroke="hsl(var(--ai-success))" fill="hsl(var(--ai-success))" fillOpacity={0.8} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Market Predictions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-ai-primary" />
            Market Demand Predictions
          </CardTitle>
          <CardDescription>AI-driven predictions for skill category demand and salary projections</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {marketPredictions.map((prediction, index) => (
              <div key={index} className="p-4 rounded-lg border bg-gradient-to-r from-card to-ai-primary/5">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-ai-primary">{prediction.category}</h4>
                      <Badge variant={prediction.impact === 'Critical' ? 'destructive' : 'secondary'}>
                        {prediction.impact}
                      </Badge>
                      <Badge variant="outline" className="text-ai-success">
                        {prediction.growth}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current Demand</span>
                        <div className="font-medium">{prediction.currentDemand}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Predicted Demand</span>
                        <div className="font-medium text-ai-primary">{prediction.predictedDemand}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Salary Growth</span>
                        <div className="font-medium text-ai-success">
                          ${prediction.salary.current/1000}k → ${prediction.salary.predicted/1000}k
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Confidence</span>
                        <div className="flex items-center gap-2">
                          <Progress value={prediction.confidence} className="w-16 h-2" />
                          <span className="font-medium">{prediction.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Industry Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-ai-primary" />
            Industry Growth Trends
          </CardTitle>
          <CardDescription>Sector-wise skill demand growth and risk assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {industryTrends.map((trend, index) => (
              <div key={index} className="p-4 rounded-lg border bg-gradient-to-br from-card to-ai-primary/5">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{trend.industry}</h4>
                  <Badge variant={trend.riskLevel === 'Low' ? 'secondary' : trend.riskLevel === 'Medium' ? 'outline' : 'destructive'}>
                    {trend.riskLevel} Risk
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Growth Rate</span>
                    <span className="font-medium text-ai-success">{trend.growth}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Demand Score</span>
                    <span className="font-medium text-ai-primary">{trend.demand}%</span>
                  </div>
                  <Progress value={trend.demand} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};