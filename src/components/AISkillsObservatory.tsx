import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  Target, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  BarChart3,
  Activity
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, BarChart, Bar } from 'recharts';

export const AISkillsObservatory = () => {
  const skillSupplyDemand = [
    { 
      skill: "AI/ML Engineering", 
      demand: 94, 
      supply: 32, 
      gap: 62, 
      trend: "critical", 
      growth: "+45%",
      avgSalary: 145000,
      jobPostings: 2847,
      timeToFill: 89
    },
    { 
      skill: "Cloud Architecture", 
      demand: 89, 
      supply: 58, 
      gap: 31, 
      trend: "high", 
      growth: "+32%",
      avgSalary: 132000,
      jobPostings: 1923,
      timeToFill: 67
    },
    { 
      skill: "DevOps/SRE", 
      demand: 87, 
      supply: 61, 
      gap: 26, 
      trend: "high", 
      growth: "+28%",
      avgSalary: 128000,
      jobPostings: 1654,
      timeToFill: 52
    },
    { 
      skill: "Cybersecurity", 
      demand: 91, 
      supply: 45, 
      gap: 46, 
      trend: "critical", 
      growth: "+38%",
      avgSalary: 138000,
      jobPostings: 2156,
      timeToFill: 76
    },
    { 
      skill: "Data Science", 
      demand: 83, 
      supply: 67, 
      gap: 16, 
      trend: "moderate", 
      growth: "+22%",
      avgSalary: 118000,
      jobPostings: 1432,
      timeToFill: 45
    },
    { 
      skill: "Full-Stack Dev", 
      demand: 78, 
      supply: 74, 
      gap: 4, 
      trend: "balanced", 
      growth: "+15%",
      avgSalary: 95000,
      jobPostings: 3214,
      timeToFill: 38
    }
  ];

  const demandTrends = [
    { month: "Jan", aiml: 78, cloud: 82, cybersec: 85, devops: 79 },
    { month: "Feb", aiml: 82, cloud: 84, cybersec: 87, devops: 81 },
    { month: "Mar", aiml: 85, cloud: 86, cybersec: 89, devops: 83 },
    { month: "Apr", aiml: 88, cloud: 87, cybersec: 90, devops: 85 },
    { month: "May", aiml: 91, cloud: 88, cybersec: 91, devops: 86 },
    { month: "Jun", aiml: 94, cloud: 89, cybersec: 91, devops: 87 }
  ];

  const radarData = [
    { skill: 'AI/ML', demand: 94, supply: 32 },
    { skill: 'Cloud', demand: 89, supply: 58 },
    { skill: 'DevOps', demand: 87, supply: 61 },
    { skill: 'Security', demand: 91, supply: 45 },
    { skill: 'Data Science', demand: 83, supply: 67 },
    { skill: 'Full Stack', demand: 78, supply: 74 }
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "critical": return "text-red-500 bg-red-50 border-red-200";
      case "high": return "text-orange-500 bg-orange-50 border-orange-200";
      case "moderate": return "text-yellow-500 bg-yellow-50 border-yellow-200";
      case "balanced": return "text-green-500 bg-green-50 border-green-200";
      default: return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "critical": return <AlertTriangle className="w-4 h-4" />;
      case "high": return <TrendingUp className="w-4 h-4" />;
      case "moderate": return <Activity className="w-4 h-4" />;
      case "balanced": return <CheckCircle className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent bg-clip-text text-transparent mb-2">
            AI Skills Observatory
          </h2>
          <p className="text-muted-foreground">
            Real-time insights into skill supply and demand dynamics
          </p>
        </div>
        <div className="flex gap-2 mt-4 lg:mt-0">
          <Button variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4 mr-2" />
            Set Alerts
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Skills</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">4</div>
            <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Gap</CardTitle>
            <Target className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">31%</div>
            <p className="text-xs text-muted-foreground">Across all tracked skills</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growing Demand</CardTitle>
            <TrendingUp className="h-4 w-4 text-ai-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai-success">+29%</div>
            <p className="text-xs text-muted-foreground">YoY growth average</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Fill Time</CardTitle>
            <Clock className="h-4 w-4 text-ai-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai-accent">61</div>
            <p className="text-xs text-muted-foreground">Days to fill positions</p>
          </CardContent>
        </Card>
      </div>

      {/* Skills Matrix */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-ai-primary" />
            Skills Supply vs Demand Matrix
          </CardTitle>
          <CardDescription>
            Comprehensive analysis of skill gaps across key technology domains
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {skillSupplyDemand.map((skill, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-lg">{skill.skill}</h3>
                    <Badge className={getTrendColor(skill.trend)}>
                      {getTrendIcon(skill.trend)}
                      <span className="ml-1 capitalize">{skill.trend}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 lg:mt-0">
                    <div className="text-center">
                      <div className="text-lg font-bold text-ai-primary">{skill.demand}%</div>
                      <div className="text-xs text-muted-foreground">Demand</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-ai-secondary">{skill.supply}%</div>
                      <div className="text-xs text-muted-foreground">Supply</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-red-500">{skill.gap}%</div>
                      <div className="text-xs text-muted-foreground">Gap</div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Growth Rate</span>
                    <span className="font-semibold text-ai-success">{skill.growth}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Avg Salary</span>
                    <span className="font-semibold">${(skill.avgSalary / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Job Postings</span>
                    <span className="font-semibold">{skill.jobPostings.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Time to Fill</span>
                    <span className="font-semibold">{skill.timeToFill} days</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Supply-Demand Balance</span>
                    <span className="text-sm font-medium">{skill.gap}% gap</span>
                  </div>
                  <div className="relative">
                    <Progress value={skill.supply} className="h-2" />
                    <div 
                      className="absolute top-0 right-0 h-2 bg-red-500/20 rounded-r"
                      style={{ width: `${skill.gap}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Visualization Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Demand Trends (6 Months)</CardTitle>
            <CardDescription>Evolution of skill demand over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={demandTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="aiml" stackId="1" stroke="hsl(var(--ai-primary))" fill="hsl(var(--ai-primary))" />
                <Area type="monotone" dataKey="cloud" stackId="1" stroke="hsl(var(--ai-secondary))" fill="hsl(var(--ai-secondary))" />
                <Area type="monotone" dataKey="cybersec" stackId="1" stroke="hsl(var(--ai-accent))" fill="hsl(var(--ai-accent))" />
                <Area type="monotone" dataKey="devops" stackId="1" stroke="hsl(var(--ai-success))" fill="hsl(var(--ai-success))" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Supply vs Demand Radar</CardTitle>
            <CardDescription>Comprehensive skill landscape overview</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="skill" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar name="Demand" dataKey="demand" stroke="hsl(var(--ai-primary))" fill="hsl(var(--ai-primary))" fillOpacity={0.3} />
                <Radar name="Supply" dataKey="supply" stroke="hsl(var(--ai-secondary))" fill="hsl(var(--ai-secondary))" fillOpacity={0.3} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};