import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import GlobalTalentMap from "@/components/GlobalTalentMap";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  TrendingUp, 
  Users, 
  Brain,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Filter,
  Search,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Globe
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

export const DeepAnalytics = () => {
  const [timeRange, setTimeRange] = useState("12months");
  const [analysisType, setAnalysisType] = useState("comprehensive");
  const [dataGranularity, setDataGranularity] = useState("monthly");

  const learnerBehaviorAnalysis = [
    { month: "Jan", engagement: 78, completion: 72, satisfaction: 4.2, retention: 85 },
    { month: "Feb", engagement: 82, completion: 76, satisfaction: 4.3, retention: 87 },
    { month: "Mar", engagement: 85, completion: 79, satisfaction: 4.4, retention: 89 },
    { month: "Apr", engagement: 88, completion: 82, satisfaction: 4.5, retention: 91 },
    { month: "May", engagement: 91, completion: 85, satisfaction: 4.6, retention: 93 },
    { month: "Jun", engagement: 89, completion: 87, satisfaction: 4.7, retention: 94 }
  ];

  const skillCorrelationData = [
    { skill: "Python", demand: 89, supply: 45, salary: 125000, growth: 32 },
    { skill: "React", demand: 85, supply: 62, salary: 95000, growth: 28 },
    { skill: "AWS", demand: 92, supply: 38, salary: 135000, growth: 45 },
    { skill: "Machine Learning", demand: 95, supply: 23, salary: 145000, growth: 52 },
    { skill: "Docker", demand: 78, supply: 54, salary: 108000, growth: 25 },
    { skill: "Kubernetes", demand: 82, supply: 31, salary: 128000, growth: 38 }
  ];

  const demographicAnalysis = [
    { segment: "Gen Z (18-25)", percentage: 28, engagement: 92, completion: 78, preferredFormat: "Mobile-first" },
    { segment: "Millennials (26-35)", percentage: 45, engagement: 88, completion: 85, preferredFormat: "Interactive" },
    { segment: "Gen X (36-50)", percentage: 22, engagement: 82, completion: 91, preferredFormat: "Structured" },
    { segment: "Boomers (50+)", percentage: 5, engagement: 75, completion: 94, preferredFormat: "Traditional" }
  ];

  const marketIntelligence = [
    { 
      indicator: "Tech Talent Shortage Index",
      current: 78,
      trend: "+12%",
      severity: "High",
      impact: "Critical on hiring costs and project timelines"
    },
    {
      indicator: "Skill Obsolescence Rate", 
      current: 23,
      trend: "+8%",
      severity: "Medium",
      impact: "Moderate impact on workforce relevance"
    },
    {
      indicator: "Remote Work Adoption",
      current: 67,
      trend: "+35%", 
      severity: "Low",
      impact: "Positive impact on talent accessibility"
    },
    {
      indicator: "AI Integration Level",
      current: 34,
      trend: "+58%",
      severity: "High", 
      impact: "Transformative impact on job requirements"
    }
  ];

  const competencyMapping = [
    { subject: "Technical Skills", A: 85, B: 78, fullMark: 100 },
    { subject: "Soft Skills", A: 72, B: 89, fullMark: 100 },
    { subject: "Leadership", A: 68, B: 82, fullMark: 100 },
    { subject: "Innovation", A: 91, B: 73, fullMark: 100 },
    { subject: "Collaboration", A: 78, B: 94, fullMark: 100 },
    { subject: "Adaptability", A: 89, B: 76, fullMark: 100 }
  ];

  const predictiveInsights = [
    {
      insight: "AI Skills Demand Surge",
      probability: 94,
      timeframe: "Next 6 months",
      impact: "Critical",
      recommendation: "Accelerate AI/ML curriculum development and instructor training",
      confidence: "Very High"
    },
    {
      insight: "Remote Learning Preference Shift",
      probability: 78,
      timeframe: "Next 3 months", 
      impact: "Medium",
      recommendation: "Enhance virtual learning infrastructure and engagement tools",
      confidence: "High"
    },
    {
      insight: "Cybersecurity Skills Premium",
      probability: 87,
      timeframe: "Next 9 months",
      impact: "High", 
      recommendation: "Launch specialized cybersecurity certification programs",
      confidence: "High"
    },
    {
      insight: "Micro-learning Trend Adoption",
      probability: 71,
      timeframe: "Next 12 months",
      impact: "Medium",
      recommendation: "Develop bite-sized learning modules and mobile-first content",
      confidence: "Medium"
    }
  ];

  const advancedMetrics = [
    { name: "Learning Velocity Index", value: 87, change: "+15%", status: "improving" },
    { name: "Skill Transfer Efficiency", value: 78, change: "+8%", status: "improving" },
    { name: "Market Alignment Score", value: 92, change: "+5%", status: "stable" },
    { name: "Innovation Readiness", value: 73, change: "+22%", status: "improving" },
    { name: "Competitive Advantage Index", value: 85, change: "+12%", status: "improving" },
    { name: "Future Skills Preparedness", value: 69, change: "+28%", status: "improving" }
  ];

  const COLORS = ['hsl(var(--ai-primary))', 'hsl(var(--ai-secondary))', 'hsl(var(--ai-warning))', 'hsl(var(--ai-success))'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ai-primary mb-2 flex items-center gap-3">
            <div className="p-2 bg-ai-primary/10 rounded-xl">
              <Brain className="w-6 h-6 text-ai-primary" />
            </div>
            Deep Analytics & Intelligence
          </h2>
          <p className="text-muted-foreground">Advanced analytics, predictive insights, and market intelligence</p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="12months">12 Months</SelectItem>
              <SelectItem value="24months">24 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-ai-primary hover:bg-ai-primary/90">
            <Download className="w-4 h-4 mr-2" />
            Export Analysis
          </Button>
        </div>
      </div>

      {/* Advanced Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advancedMetrics.map((metric, index) => (
          <Card key={index} className="border-l-4 border-l-ai-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                {metric.name}
                <Badge variant={metric.status === 'improving' ? 'secondary' : 'outline'}>
                  {metric.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-ai-primary">{metric.value}</span>
                <span className={`text-sm font-medium ${
                  metric.change.startsWith('+') ? 'text-ai-success' : 'text-destructive'
                }`}>
                  {metric.change}
                </span>
              </div>
              <Progress value={metric.value} className="h-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="behavior" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="behavior">Learner Behavior</TabsTrigger>
          <TabsTrigger value="correlations">Skill Correlations</TabsTrigger>
          <TabsTrigger value="globalmap">Global Map</TabsTrigger>
          <TabsTrigger value="predictive">Predictive AI</TabsTrigger>
        </TabsList>

        <TabsContent value="behavior" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-ai-primary" />
                  Learner Engagement Trends
                </CardTitle>
                <CardDescription>Multi-dimensional learner behavior analysis over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={learnerBehaviorAnalysis}>
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
                    <Line type="monotone" dataKey="engagement" stroke="hsl(var(--ai-primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="completion" stroke="hsl(var(--ai-success))" strokeWidth={2} />
                    <Line type="monotone" dataKey="retention" stroke="hsl(var(--ai-warning))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competency Radar Analysis</CardTitle>
                <CardDescription>Current vs target competency levels</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={competencyMapping}>
                    <PolarGrid stroke="hsl(var(--border))" />
                    <PolarAngleAxis dataKey="subject" className="text-xs" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="Current" dataKey="A" stroke="hsl(var(--ai-primary))" fill="hsl(var(--ai-primary))" fillOpacity={0.3} />
                    <Radar name="Target" dataKey="B" stroke="hsl(var(--ai-secondary))" fill="hsl(var(--ai-secondary))" fillOpacity={0.3} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="correlations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-ai-primary" />
                Skill-Salary-Demand Correlation Matrix
              </CardTitle>
              <CardDescription>Advanced correlation analysis between skills, market demand, supply, and compensation</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart data={skillCorrelationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" dataKey="demand" name="Market Demand" unit="%" stroke="hsl(var(--muted-foreground))" />
                  <YAxis type="number" dataKey="salary" name="Average Salary" unit="$" stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-card p-3 border rounded-lg shadow-lg">
                            <p className="font-semibold text-ai-primary">{data.skill}</p>
                            <p className="text-sm">Demand: {data.demand}%</p>
                            <p className="text-sm">Supply: {data.supply}%</p>
                            <p className="text-sm">Salary: ${data.salary.toLocaleString()}</p>
                            <p className="text-sm">Growth: {data.growth}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter dataKey="demand" fill="hsl(var(--ai-primary))" />
                </ScatterChart>
              </ResponsiveContainer>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {skillCorrelationData.map((skill, index) => (
                  <div key={index} className="p-3 rounded-lg bg-muted/30 border">
                    <h4 className="font-medium text-ai-primary mb-2">{skill.skill}</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Demand:</span>
                        <span className="font-medium">{skill.demand}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Supply:</span>
                        <span className="font-medium">{skill.supply}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Gap:</span>
                        <span className="font-medium text-destructive">{skill.demand - skill.supply}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Growth:</span>
                        <span className="font-medium text-ai-success">+{skill.growth}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="globalmap" className="space-y-6">
          <GlobalTalentMap />
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-ai-primary" />
                Market Intelligence Dashboard
              </CardTitle>
              <CardDescription>Real-time market indicators and industry intelligence</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {marketIntelligence.map((indicator, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-gradient-to-r from-card to-ai-primary/5">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{indicator.indicator}</h4>
                          <Badge variant={
                            indicator.severity === 'High' ? 'destructive' : 
                            indicator.severity === 'Medium' ? 'secondary' : 'outline'
                          }>
                            {indicator.severity} Severity
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{indicator.impact}</p>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-ai-primary">{indicator.current}%</div>
                            <div className="text-xs text-muted-foreground">Current Level</div>
                          </div>
                          <div className="text-center">
                            <div className={`text-lg font-bold ${
                              indicator.trend.startsWith('+') ? 'text-ai-success' : 'text-destructive'
                            }`}>
                              {indicator.trend}
                            </div>
                            <div className="text-xs text-muted-foreground">Trend</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-ai-primary" />
                AI-Powered Predictive Insights
              </CardTitle>
              <CardDescription>Machine learning predictions and strategic recommendations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predictiveInsights.map((insight, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-gradient-to-r from-card to-ai-primary/5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-ai-primary">{insight.insight}</h4>
                          <Badge variant={insight.impact === 'Critical' ? 'destructive' : 'secondary'}>
                            {insight.impact} Impact
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm mb-3">
                          <div>
                            <span className="text-muted-foreground">Probability</span>
                            <div className="flex items-center gap-2">
                              <Progress value={insight.probability} className="flex-1 h-2" />
                              <span className="font-medium">{insight.probability}%</span>
                            </div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Timeframe</span>
                            <div className="font-medium text-ai-warning">{insight.timeframe}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Confidence</span>
                            <div className="flex items-center gap-1">
                              {insight.confidence === 'Very High' ? (
                                <CheckCircle className="w-4 h-4 text-ai-success" />
                              ) : insight.confidence === 'High' ? (
                                <CheckCircle className="w-4 h-4 text-ai-primary" />
                              ) : (
                                <AlertTriangle className="w-4 h-4 text-ai-warning" />
                              )}
                              <span className="font-medium">{insight.confidence}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-3 rounded-lg bg-ai-success/10 border border-ai-success/20">
                          <h5 className="font-medium text-ai-success mb-1">Recommended Action:</h5>
                          <p className="text-sm text-ai-success/80">{insight.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};