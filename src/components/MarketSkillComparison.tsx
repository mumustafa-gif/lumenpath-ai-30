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
  const [selectedRegion, setSelectedRegion] = useState("dubai");

  const roles = [
    { value: "data-scientist", label: "Data Scientist" },
    { value: "ai-engineer", label: "AI/ML Engineer" },
    { value: "devops-engineer", label: "DevOps Engineer" },
    { value: "cloud-architect", label: "Cloud Architect" },
    { value: "cybersecurity", label: "Cybersecurity Specialist" }
  ];

  const regions = [
    { value: "dubai", label: "Dubai" },
    { value: "abudhabi", label: "Abu Dhabi" },
    { value: "sharjah", label: "Sharjah" },
    { value: "ajman", label: "Ajman" },
    { value: "ras-al-khaimah", label: "Ras Al Khaimah" },
    { value: "fujairah", label: "Fujairah" },
    { value: "umm-al-quwain", label: "Umm Al Quwain" }
  ];

  const userSkills = [
    { 
      skill: "Python", 
      userLevel: 75, 
      marketAvg: 85, 
      demand: "High", 
      trend: "+15%", 
      salaryImpact: "+32%",
      jobOpenings: 1850,
      companies: ["Careem", "Noon", "Emirates NBD"],
      difficulty: "Medium"
    },
    { 
      skill: "Machine Learning", 
      userLevel: 60, 
      marketAvg: 80, 
      demand: "Critical", 
      trend: "+25%", 
      salaryImpact: "+48%",
      jobOpenings: 2100,
      companies: ["ADNOC", "Mashreq", "Etisalat"],
      difficulty: "High"
    },
    { 
      skill: "Data Visualization", 
      userLevel: 70, 
      marketAvg: 75, 
      demand: "High", 
      trend: "+12%", 
      salaryImpact: "+18%",
      jobOpenings: 1650,
      companies: ["Dubai Electricity", "FAB", "Emaar"],
      difficulty: "Medium"
    },
    { 
      skill: "SQL", 
      userLevel: 80, 
      marketAvg: 85, 
      demand: "Essential", 
      trend: "+8%", 
      salaryImpact: "+22%",
      jobOpenings: 3100,
      companies: ["All Major Banks", "Government", "Telecom"],
      difficulty: "Low"
    },
    { 
      skill: "Deep Learning", 
      userLevel: 45, 
      marketAvg: 70, 
      demand: "Growing", 
      trend: "+30%", 
      salaryImpact: "+52%",
      jobOpenings: 980,
      companies: ["Google", "Microsoft", "Careem AI"],
      difficulty: "Very High"
    },
    { 
      skill: "Cloud Platforms", 
      userLevel: 55, 
      marketAvg: 75, 
      demand: "Critical", 
      trend: "+20%", 
      salaryImpact: "+42%",
      jobOpenings: 2850,
      companies: ["AWS", "Microsoft Azure", "Google Cloud"],
      difficulty: "High"
    }
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
          <h2 className="text-2xl font-bold bg-gradient-to-r from-ai-primary to-ai-accent bg-clip-text text-transparent">
            UAE Market Skill Analysis
          </h2>
          <p className="text-muted-foreground">Advanced comparison with UAE market standards, salary insights, and career opportunities</p>
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
            <SelectTrigger className="w-48">
              <SelectValue placeholder="UAE Emirates" />
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

      {/* Enhanced Detailed Skills Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart className="w-5 h-5 text-ai-primary" />
            Comprehensive Skills Analysis - {selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {userSkills.map((skill, index) => {
              const gap = skill.marketAvg - skill.userLevel;
              const gapStatus = gap <= 5 ? 'excellent' : gap <= 15 ? 'good' : gap <= 25 ? 'moderate' : 'critical';
              
              return (
                <div key={index} className={`p-6 border-2 rounded-xl transition-all duration-300 hover:shadow-lg ${
                  gapStatus === 'excellent' ? 'border-green-200 bg-green-50/30' :
                  gapStatus === 'good' ? 'border-blue-200 bg-blue-50/30' :
                  gapStatus === 'moderate' ? 'border-yellow-200 bg-yellow-50/30' :
                  'border-red-200 bg-red-50/30'
                }`}>
                  <div className="space-y-6">
                    {/* Header Section */}
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold">{skill.skill}</h3>
                          <Badge variant={skill.demand === "Critical" ? "destructive" : skill.demand === "High" ? "default" : "secondary"}>
                            {skill.demand}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {skill.difficulty}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            Market Growth: {skill.trend}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3 text-ai-accent" />
                            Salary Impact: {skill.salaryImpact}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${
                          gapStatus === 'excellent' ? 'text-green-600' :
                          gapStatus === 'good' ? 'text-blue-600' :
                          gapStatus === 'moderate' ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {gap > 0 ? `-${gap}%` : `+${Math.abs(gap)}%`}
                        </div>
                        <p className="text-xs text-muted-foreground">vs Market Avg</p>
                      </div>
                    </div>

                    {/* Market Intelligence */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white/50 rounded-lg border">
                      <div className="text-center">
                        <div className="text-lg font-bold text-ai-primary">{skill.jobOpenings}</div>
                        <div className="text-xs text-muted-foreground">Open Positions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-ai-success">{skill.salaryImpact}</div>
                        <div className="text-xs text-muted-foreground">Salary Boost</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-ai-accent">{skill.companies.length}+</div>
                        <div className="text-xs text-muted-foreground">Top Companies</div>
                      </div>
                    </div>

                    {/* Progress Comparison */}
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold">Your Current Level</span>
                            <span className="font-bold text-ai-primary">{skill.userLevel}%</span>
                          </div>
                          <Progress value={skill.userLevel} className="h-4 bg-gray-100" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-semibold">Market Average</span>
                            <span className="font-bold text-ai-secondary">{skill.marketAvg}%</span>
                          </div>
                          <Progress value={skill.marketAvg} className="h-4 bg-gray-100" />
                        </div>
                      </div>

                      {/* Gap Analysis */}
                      {gap > 0 && (
                        <div className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="w-4 h-4 text-red-600" />
                            <span className="font-semibold text-red-700">Development Recommendation</span>
                          </div>
                          <p className="text-sm text-red-700">
                            Bridge the {gap}% gap to reach market standards. This could increase your salary by {skill.salaryImpact} 
                            and open access to {skill.jobOpenings} positions in UAE.
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Top Hiring Companies */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-ai-secondary" />
                        Top Hiring Companies for {skill.skill}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.companies.map((company, idx) => (
                          <Badge key={idx} variant="outline" className="bg-ai-secondary/10 text-ai-secondary border-ai-secondary/30">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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