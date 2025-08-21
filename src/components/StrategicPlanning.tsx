import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  Calendar, 
  Users, 
  TrendingUp, 
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Award,
  Lightbulb,
  Zap,
  BarChart3
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useState } from "react";

export const StrategicPlanning = () => {
  const [planningHorizon, setPlanningHorizon] = useState("12months");
  const [focusArea, setFocusArea] = useState("all");

  const strategicInitiatives = [
    {
      id: 1,
      title: "AI Skills Development Program",
      description: "Comprehensive program to address AI/ML skill gap across UAE",
      priority: "Critical",
      status: "In Planning",
      timeline: "12 months",
      budget: 2500000,
      expectedROI: "340%",
      targetAudience: 1500,
      milestones: [
        { name: "Curriculum Development", status: "completed", date: "Q1 2024" },
        { name: "Instructor Training", status: "in-progress", date: "Q2 2024" },
        { name: "Pilot Launch", status: "pending", date: "Q3 2024" },
        { name: "Full Rollout", status: "pending", date: "Q4 2024" }
      ],
      kpis: {
        enrollment: { target: 1500, current: 0 },
        completion: { target: 85, current: 0 },
        placement: { target: 75, current: 0 }
      }
    },
    {
      id: 2,
      title: "Cloud Infrastructure Upskilling",
      description: "Enterprise-focused cloud architecture and DevOps training",
      priority: "High",
      status: "Active",
      timeline: "8 months",
      budget: 1800000,
      expectedROI: "280%",
      targetAudience: 800,
      milestones: [
        { name: "Partnership with AWS", status: "completed", date: "Q1 2024" },
        { name: "Content Creation", status: "completed", date: "Q1 2024" },
        { name: "Beta Testing", status: "in-progress", date: "Q2 2024" },
        { name: "Market Launch", status: "pending", date: "Q3 2024" }
      ],
      kpis: {
        enrollment: { target: 800, current: 245 },
        completion: { target: 78, current: 92 },
        placement: { target: 70, current: 85 }
      }
    },
    {
      id: 3,
      title: "Cybersecurity Certification Track",
      description: "Industry-standard cybersecurity certification programs",
      priority: "High",
      status: "Active",
      timeline: "10 months",
      budget: 2200000,
      expectedROI: "310%",
      targetAudience: 600,
      milestones: [
        { name: "Industry Partnerships", status: "completed", date: "Q4 2023" },
        { name: "Curriculum Design", status: "completed", date: "Q1 2024" },
        { name: "Lab Setup", status: "in-progress", date: "Q2 2024" },
        { name: "Certification Launch", status: "pending", date: "Q3 2024" }
      ],
      kpis: {
        enrollment: { target: 600, current: 178 },
        completion: { target: 80, current: 88 },
        placement: { target: 85, current: 91 }
      }
    }
  ];

  const resourceAllocation = [
    { department: "Technology", budget: 4200000, percentage: 42, projects: 8 },
    { department: "Business", budget: 2800000, percentage: 28, projects: 5 },
    { department: "Healthcare", budget: 1500000, percentage: 15, projects: 3 },
    { department: "Design", budget: 1000000, percentage: 10, projects: 2 },
    { department: "Other", budget: 500000, percentage: 5, projects: 1 }
  ];

  const riskAssessment = [
    {
      risk: "Instructor Shortage",
      probability: "High",
      impact: "Critical",
      mitigation: "Partner with universities and industry experts",
      status: "Active"
    },
    {
      risk: "Technology Evolution",
      probability: "Medium",
      impact: "High", 
      mitigation: "Continuous curriculum updates and industry partnerships",
      status: "Monitoring"
    },
    {
      risk: "Market Saturation",
      probability: "Low",
      impact: "Medium",
      mitigation: "Diversify into emerging skill areas",
      status: "Planned"
    },
    {
      risk: "Economic Downturn",
      probability: "Medium",
      impact: "High",
      mitigation: "Government partnerships and enterprise contracts",
      status: "Active"
    }
  ];

  const performanceMetrics = [
    { metric: "Overall Program ROI", current: 285, target: 300, unit: "%" },
    { metric: "Learner Satisfaction", current: 4.7, target: 4.8, unit: "/5" },
    { metric: "Industry Placement Rate", current: 82, target: 85, unit: "%" },
    { metric: "Skill Certification Rate", current: 78, target: 80, unit: "%" },
    { metric: "Program Completion Rate", current: 85, target: 88, unit: "%" },
    { metric: "Market Relevance Score", current: 92, target: 95, unit: "%" }
  ];

  const COLORS = ['hsl(var(--ai-primary))', 'hsl(var(--ai-secondary))', 'hsl(var(--ai-warning))', 'hsl(var(--ai-success))', 'hsl(var(--muted))'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ai-primary mb-2 flex items-center gap-3">
            <div className="p-2 bg-ai-primary/10 rounded-xl">
              <Target className="w-6 h-6 text-ai-primary" />
            </div>
            Strategic Planning Dashboard
          </h2>
          <p className="text-muted-foreground">Long-term strategic initiatives and resource planning</p>
        </div>
        <div className="flex items-center gap-3 mt-4 lg:mt-0">
          <Select value={planningHorizon} onValueChange={setPlanningHorizon}>
            <SelectTrigger className="w-40">
              <Calendar className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="12months">12 Months</SelectItem>
              <SelectItem value="24months">24 Months</SelectItem>
              <SelectItem value="36months">36 Months</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-ai-primary hover:bg-ai-primary/90">
            <Lightbulb className="w-4 h-4 mr-2" />
            Generate Strategy
          </Button>
        </div>
      </div>

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="border-l-4 border-l-ai-primary">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-bold text-ai-primary">
                  {metric.current}{metric.unit}
                </span>
                <Badge variant={metric.current >= metric.target ? "secondary" : "outline"}>
                  Target: {metric.target}{metric.unit}
                </Badge>
              </div>
              <Progress value={(metric.current / metric.target) * 100} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {metric.current >= metric.target ? "Target achieved" : `${(metric.target - metric.current).toFixed(1)} to target`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="initiatives" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="initiatives">Strategic Initiatives</TabsTrigger>
          <TabsTrigger value="resources">Resource Allocation</TabsTrigger>
          <TabsTrigger value="risks">Risk Management</TabsTrigger>
          <TabsTrigger value="timeline">Timeline View</TabsTrigger>
        </TabsList>

        <TabsContent value="initiatives" className="space-y-6">
          {strategicInitiatives.map((initiative) => (
            <Card key={initiative.id} className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3">
                      {initiative.title}
                      <Badge variant={initiative.priority === 'Critical' ? 'destructive' : 'secondary'}>
                        {initiative.priority}
                      </Badge>
                      <Badge variant="outline">{initiative.status}</Badge>
                    </CardTitle>
                    <CardDescription className="mt-2">{initiative.description}</CardDescription>
                  </div>
                  <div className="flex items-center gap-4 mt-3 lg:mt-0">
                    <div className="text-center">
                      <div className="text-lg font-bold text-ai-primary">${(initiative.budget/1000000).toFixed(1)}M</div>
                      <div className="text-xs text-muted-foreground">Budget</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-ai-success">{initiative.expectedROI}</div>
                      <div className="text-xs text-muted-foreground">Expected ROI</div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Milestones */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-ai-primary" />
                      Milestones
                    </h4>
                    <div className="space-y-2">
                      {initiative.milestones.map((milestone, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-muted/30">
                          {milestone.status === 'completed' ? (
                            <CheckCircle className="w-4 h-4 text-ai-success" />
                          ) : milestone.status === 'in-progress' ? (
                            <Clock className="w-4 h-4 text-ai-warning" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-muted-foreground" />
                          )}
                          <div className="flex-1">
                            <div className="text-sm font-medium">{milestone.name}</div>
                            <div className="text-xs text-muted-foreground">{milestone.date}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* KPIs */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-ai-primary" />
                      Key Performance Indicators
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(initiative.kpis).map(([key, value]) => (
                        <div key={key}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="capitalize">{key} Rate</span>
                            <span className="font-medium">{value.current}/{value.target}%</span>
                          </div>
                          <Progress value={(value.current / value.target) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={resourceAllocation}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="percentage"
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                    >
                      {resourceAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Distribution Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceAllocation.map((resource, index) => (
                    <div key={index} className="p-3 rounded-lg bg-muted/30">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{resource.department}</h4>
                        <Badge variant="outline">{resource.projects} Projects</Badge>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Budget: ${(resource.budget/1000000).toFixed(1)}M</span>
                        <span>{resource.percentage}% of total</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-ai-warning" />
                Risk Assessment Matrix
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {riskAssessment.map((risk, index) => (
                  <div key={index} className="p-4 rounded-lg border bg-gradient-to-r from-card to-ai-warning/5">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{risk.risk}</h4>
                          <Badge variant={risk.probability === 'High' ? 'destructive' : risk.probability === 'Medium' ? 'secondary' : 'outline'}>
                            {risk.probability} Probability
                          </Badge>
                          <Badge variant={risk.impact === 'Critical' ? 'destructive' : risk.impact === 'High' ? 'secondary' : 'outline'}>
                            {risk.impact} Impact
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{risk.mitigation}</p>
                        <Badge variant={risk.status === 'Active' ? 'secondary' : 'outline'} className="text-xs">
                          {risk.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Strategic Timeline Overview</CardTitle>
              <CardDescription>Project timelines and milestone tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {strategicInitiatives.map((initiative, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-3 h-3 bg-ai-primary rounded-full"></div>
                      <h4 className="font-semibold">{initiative.title}</h4>
                      <Badge variant="outline">{initiative.timeline}</Badge>
                    </div>
                    <div className="ml-7 pl-4 border-l-2 border-ai-primary/20">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        {initiative.milestones.map((milestone, idx) => (
                          <div key={idx} className={`p-2 rounded text-xs ${
                            milestone.status === 'completed' ? 'bg-ai-success/10 text-ai-success' :
                            milestone.status === 'in-progress' ? 'bg-ai-warning/10 text-ai-warning' :
                            'bg-muted/30 text-muted-foreground'
                          }`}>
                            <div className="font-medium">{milestone.name}</div>
                            <div>{milestone.date}</div>
                          </div>
                        ))}
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