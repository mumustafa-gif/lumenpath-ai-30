import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Target, Award, Briefcase, DollarSign, Users, MapPin } from "lucide-react";

export default function MarketSkillComparison() {
  const [selectedRole, setSelectedRole] = useState("data-scientist");
  const [selectedRegion, setSelectedRegion] = useState("uae");

  const roles = [
    { value: "data-scientist", label: "Data Scientist" },
    { value: "ai-engineer", label: "AI/ML Engineer" },
    { value: "devops-engineer", label: "DevOps Engineer" },
    { value: "cloud-architect", label: "Cloud Architect" },
    { value: "cybersecurity", label: "Cybersecurity Specialist" }
  ];

  const regions = [
    { value: "uae", label: "UAE" },
    { value: "saudi", label: "Saudi Arabia" },
    { value: "qatar", label: "Qatar" },
    { value: "kuwait", label: "Kuwait" },
    { value: "bahrain", label: "Bahrain" }
  ];

  const userSkills = [
    { skill: "Python", userLevel: 75, marketAvg: 85, demand: "High", trend: "+15%" },
    { skill: "Machine Learning", userLevel: 60, marketAvg: 80, demand: "Critical", trend: "+25%" },
    { skill: "Data Visualization", userLevel: 70, marketAvg: 75, demand: "High", trend: "+12%" },
    { skill: "SQL", userLevel: 80, marketAvg: 85, demand: "Essential", trend: "+8%" },
    { skill: "Deep Learning", userLevel: 45, marketAvg: 70, demand: "Growing", trend: "+30%" },
    { skill: "Cloud Platforms", userLevel: 55, marketAvg: 75, demand: "Critical", trend: "+20%" }
  ];

  const marketData = [
    { category: "Technical Skills", user: 68, market: 78, industry: 82 },
    { category: "Leadership", user: 60, market: 65, industry: 75 },
    { category: "Communication", user: 75, market: 70, industry: 80 },
    { category: "Problem Solving", user: 80, market: 75, industry: 85 },
    { category: "Innovation", user: 65, market: 72, industry: 78 },
    { category: "Collaboration", user: 70, market: 68, industry: 75 }
  ];

  const salaryBenchmark = {
    userEstimate: 95000,
    marketAverage: 120000,
    top10Percent: 180000,
    region: "UAE",
    currency: "AED"
  };

  const jobMarketTrends = [
    { month: "Jan", openings: 245, applications: 1250 },
    { month: "Feb", openings: 280, applications: 1400 },
    { month: "Mar", openings: 320, applications: 1580 },
    { month: "Apr", openings: 380, applications: 1720 },
    { month: "May", openings: 420, applications: 1850 },
    { month: "Jun", openings: 465, applications: 1920 }
  ];

  const recommendations = [
    {
      skill: "Deep Learning",
      currentLevel: 45,
      targetLevel: 70,
      priority: "High",
      timeToAcquire: "3-4 months",
      courses: ["Neural Networks Fundamentals", "TensorFlow Certification"]
    },
    {
      skill: "Cloud Platforms",
      currentLevel: 55,
      targetLevel: 75,
      priority: "Medium", 
      timeToAcquire: "2-3 months",
      courses: ["AWS Solutions Architect", "Azure Data Engineer"]
    },
    {
      skill: "MLOps",
      currentLevel: 30,
      targetLevel: 65,
      priority: "High",
      timeToAcquire: "4-5 months",
      courses: ["MLOps Engineering", "Docker & Kubernetes"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Market Skill Comparison</h2>
          <p className="text-muted-foreground">Compare your skills with market standards and industry benchmarks</p>
        </div>
        <div className="flex gap-4">
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.value} value={role.value}>
                  {role.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Region" />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem key={region.value} value={region.value}>
                  {region.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Position</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai-primary">75th</div>
            <p className="text-xs text-muted-foreground">Percentile</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Salary Gap</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai-warning">-21%</div>
            <p className="text-xs text-muted-foreground">Below market avg</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Job Demand</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai-success">High</div>
            <p className="text-xs text-muted-foreground">+25% growth</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Competition</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai-info">4.2:1</div>
            <p className="text-xs text-muted-foreground">Candidates per job</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills Comparison Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Skills Benchmark</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={marketData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="category" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="Your Level" dataKey="user" stroke="hsl(var(--ai-primary))" fill="hsl(var(--ai-primary))" fillOpacity={0.1} />
                <Radar name="Market Average" dataKey="market" stroke="hsl(var(--ai-secondary))" fill="hsl(var(--ai-secondary))" fillOpacity={0.1} />
                <Radar name="Industry Leaders" dataKey="industry" stroke="hsl(var(--ai-accent))" fill="hsl(var(--ai-accent))" fillOpacity={0.1} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Job Market Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Job Market Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={jobMarketTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="openings" stroke="hsl(var(--ai-success))" name="Job Openings" />
                <Line type="monotone" dataKey="applications" stroke="hsl(var(--ai-warning))" name="Applications" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Skills Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Skills Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {userSkills.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium">{skill.skill}</h4>
                    <Badge variant={skill.demand === "Critical" ? "destructive" : skill.demand === "High" ? "default" : "secondary"}>
                      {skill.demand}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-ai-success">
                      <TrendingUp className="w-3 h-3" />
                      {skill.trend}
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Your: {skill.userLevel}% | Market: {skill.marketAvg}%
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Progress value={skill.userLevel} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Your Level</p>
                    </div>
                    <div className="flex-1">
                      <Progress value={skill.marketAvg} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Market Average</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5 text-ai-primary" />
            Skill Development Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">{rec.skill}</h4>
                  <Badge variant={rec.priority === "High" ? "destructive" : "secondary"}>
                    {rec.priority}
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current:</span>
                    <span>{rec.currentLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Target:</span>
                    <span className="text-ai-success">{rec.targetLevel}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Timeline:</span>
                    <span>{rec.timeToAcquire}</span>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs text-muted-foreground mb-2">Recommended Courses:</p>
                    {rec.courses.map((course, idx) => (
                      <div key={idx} className="text-xs bg-muted px-2 py-1 rounded mb-1">
                        {course}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}