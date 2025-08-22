import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  Users, 
  Briefcase,
  GraduationCap,
  Zap,
  Brain,
  Target,
  BarChart3,
  Calendar,
  Award,
  Building,
  Lightbulb
} from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area, ComposedChart, Bar, PieChart, Pie, Cell } from 'recharts';

export const WorkforceTrends = () => {
  const futureSkillsPredictions = [
    { 
      skill: "Quantum Computing", 
      currentDemand: 12, 
      projected2025: 45, 
      projected2027: 78, 
      growth: "+550%",
      readiness: 23,
      urgency: "emerging"
    },
    { 
      skill: "Generative AI", 
      currentDemand: 67, 
      projected2025: 89, 
      projected2027: 95, 
      growth: "+42%",
      readiness: 34,
      urgency: "critical"
    },
    { 
      skill: "Edge Computing", 
      currentDemand: 34, 
      projected2025: 67, 
      projected2027: 84, 
      growth: "+147%",
      readiness: 28,
      urgency: "high"
    },
    { 
      skill: "Blockchain Integration", 
      currentDemand: 23, 
      projected2025: 56, 
      projected2027: 73, 
      growth: "+217%",
      readiness: 31,
      urgency: "moderate"
    },
    { 
      skill: "AR/VR Development", 
      currentDemand: 29, 
      projected2025: 61, 
      projected2027: 79, 
      growth: "+172%",
      readiness: 42,
      urgency: "high"
    },
    { 
      skill: "Sustainable Tech", 
      currentDemand: 18, 
      projected2025: 48, 
      projected2027: 71, 
      growth: "+294%",
      readiness: 19,
      urgency: "emerging"
    }
  ];

  const workforceEvolution = [
    { year: "2020", remote: 15, hybrid: 8, onsite: 77, automation: 23 },
    { year: "2021", remote: 42, hybrid: 18, onsite: 40, automation: 28 },
    { year: "2022", remote: 38, hybrid: 31, onsite: 31, automation: 34 },
    { year: "2023", remote: 35, hybrid: 41, onsite: 24, automation: 41 },
    { year: "2024", remote: 33, hybrid: 48, onsite: 19, automation: 48 },
    { year: "2025*", remote: 31, hybrid: 54, onsite: 15, automation: 56 }
  ];

  const uaeIndustryTransformation = [
    { industry: "Technology & Innovation", adaptation: 92, automation: 71, growth: "+28%", jobs: "185K", region: "Dubai Tech City" },
    { industry: "Oil & Gas", adaptation: 78, automation: 84, growth: "+15%", jobs: "320K", region: "Abu Dhabi" },
    { industry: "Finance & Banking", adaptation: 89, automation: 82, growth: "+18%", jobs: "145K", region: "DIFC & ADGM" },
    { industry: "Tourism & Hospitality", adaptation: 74, automation: 45, growth: "+22%", jobs: "280K", region: "Dubai & RAK" },
    { industry: "Healthcare & Life Sciences", adaptation: 81, automation: 38, growth: "+25%", jobs: "120K", region: "UAE Wide" },
    { industry: "Manufacturing", adaptation: 68, automation: 76, growth: "+12%", jobs: "95K", region: "Sharjah & Ajman" },
    { industry: "Education", adaptation: 65, automation: 28, growth: "+20%", jobs: "85K", region: "UAE Wide" },
    { industry: "Retail & E-commerce", adaptation: 79, automation: 62, growth: "+16%", jobs: "165K", region: "UAE Wide" }
  ];

  const generationalSkills = [
    { name: "Gen Z", digital: 95, collaboration: 78, leadership: 45, adaptability: 89 },
    { name: "Millennials", digital: 87, collaboration: 84, leadership: 72, adaptability: 81 },
    { name: "Gen X", digital: 71, collaboration: 79, leadership: 89, adaptability: 67 },
    { name: "Boomers", digital: 52, collaboration: 73, leadership: 92, adaptability: 58 }
  ];

  const salaryProjections = [
    { skill: "AI/ML Engineer", current: 145, projected2025: 178, projected2027: 215 },
    { skill: "Quantum Developer", current: 95, projected2025: 165, projected2027: 245 },
    { skill: "Data Scientist", current: 118, projected2025: 138, projected2027: 162 },
    { skill: "Cloud Architect", current: 132, projected2025: 155, projected2027: 185 },
    { skill: "DevOps Engineer", current: 128, projected2025: 148, projected2027: 172 }
  ];

  const COLORS = ['hsl(var(--ai-primary))', 'hsl(var(--ai-secondary))', 'hsl(var(--ai-accent))', 'hsl(var(--ai-success))'];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical": return "text-red-500 bg-red-50 border-red-200";
      case "high": return "text-orange-500 bg-orange-50 border-orange-200";
      case "moderate": return "text-yellow-500 bg-yellow-50 border-yellow-200";
      case "emerging": return "text-blue-500 bg-blue-50 border-blue-200";
      default: return "text-gray-500 bg-gray-50 border-gray-200";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-ai-primary mb-2">
            UAE Future Workforce Trends
          </h2>
          <p className="text-muted-foreground">
            Data-driven insights on emerging skills and workplace evolution across UAE emirates
          </p>
        </div>
        <div className="flex gap-2 mt-4 lg:mt-0">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Forecast Report
          </Button>
          <Button variant="outline" size="sm">
            <Target className="w-4 h-4 mr-2" />
            Strategic Planning
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Emerging Skills</CardTitle>
            <Lightbulb className="h-4 w-4 text-ai-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai-primary">24</div>
            <p className="text-xs text-muted-foreground">Identified for 2025-2027</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automation Rate</CardTitle>
            <Zap className="h-4 w-4 text-ai-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai-secondary">48%</div>
            <p className="text-xs text-muted-foreground">Jobs affected by 2024</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hybrid Work</CardTitle>
            <Globe className="h-4 w-4 text-ai-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai-accent">54%</div>
            <p className="text-xs text-muted-foreground">Projected by 2025</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Skill Half-Life</CardTitle>
            <Brain className="h-4 w-4 text-ai-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai-success">2.1</div>
            <p className="text-xs text-muted-foreground">Years average</p>
          </CardContent>
        </Card>
      </div>

      {/* Future Skills Predictions */}
      <Card className="border-0 shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-ai-primary" />
            Future Skills Demand Forecast
          </CardTitle>
          <CardDescription>
            Predictive analysis of skill requirements through 2027
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {futureSkillsPredictions.map((skill, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-lg">{skill.skill}</h3>
                    <Badge className={getUrgencyColor(skill.urgency)}>
                      <span className="capitalize">{skill.urgency}</span>
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 lg:mt-0">
                    <div className="text-center">
                      <div className="text-lg font-bold text-ai-primary">{skill.currentDemand}%</div>
                      <div className="text-xs text-muted-foreground">Current</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-ai-secondary">{skill.projected2025}%</div>
                      <div className="text-xs text-muted-foreground">2025</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-ai-accent">{skill.projected2027}%</div>
                      <div className="text-xs text-muted-foreground">2027</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-ai-success">{skill.growth}</div>
                      <div className="text-xs text-muted-foreground">Growth</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Workforce Readiness</span>
                    <span className="text-sm font-medium">{skill.readiness}%</span>
                  </div>
                  <Progress value={skill.readiness} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Workforce Evolution</CardTitle>
            <CardDescription>Work model and automation trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={workforceEvolution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="remote" stackId="1" stroke="hsl(var(--ai-primary))" fill="hsl(var(--ai-primary))" />
                <Area type="monotone" dataKey="hybrid" stackId="1" stroke="hsl(var(--ai-secondary))" fill="hsl(var(--ai-secondary))" />
                <Area type="monotone" dataKey="onsite" stackId="1" stroke="hsl(var(--ai-accent))" fill="hsl(var(--ai-accent))" />
                <Line type="monotone" dataKey="automation" stroke="hsl(var(--ai-success))" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle>Salary Growth Projections</CardTitle>
            <CardDescription>Compensation trends by skill category</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salaryProjections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}k`, 'Salary']} />
                <Line type="monotone" dataKey="current" stroke="hsl(var(--ai-primary))" strokeWidth={2} />
                <Line type="monotone" dataKey="projected2025" stroke="hsl(var(--ai-secondary))" strokeWidth={2} strokeDasharray="5 5" />
                <Line type="monotone" dataKey="projected2027" stroke="hsl(var(--ai-accent))" strokeWidth={2} strokeDasharray="10 5" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Industry Transformation */}
      <Card className="border-0 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2 text-ai-primary" />
              UAE Industry Digital Transformation
            </CardTitle>
            <CardDescription>
              Sector-wise adaptation and automation readiness across UAE emirates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uaeIndustryTransformation.map((industry, index) => (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">{industry.industry}</h3>
                  <Badge variant={industry.growth.startsWith('+') ? 'default' : 'destructive'}>
                    {industry.growth}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Adaptation</span>
                      <span className="text-sm font-medium">{industry.adaptation}%</span>
                    </div>
                    <Progress value={industry.adaptation} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-muted-foreground">Automation</span>
                      <span className="text-sm font-medium">{industry.automation}%</span>
                    </div>
                    <Progress value={industry.automation} className="h-2" />
                  </div>
                  
                  <div className="space-y-2 pt-2 border-t">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Job Market</span>
                      <span className="text-sm font-semibold">{industry.jobs}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Key Region</span>
                      <span className="text-sm font-medium text-ai-primary">{industry.region}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};