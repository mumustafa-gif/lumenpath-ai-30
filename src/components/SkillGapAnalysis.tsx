import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  Target, 
  BookOpen, 
  ExternalLink,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  Award,
  Lightbulb
} from "lucide-react";
import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart as RechartsPieChart, 
  Pie,
  Cell,
  Legend
} from 'recharts';

interface SkillGapAnalysisProps {
  learnerProfile?: {
    skills?: string[];
    experience?: string[];
    goal?: string;
  };
}

const SkillGapAnalysis = ({ learnerProfile }: SkillGapAnalysisProps) => {
  const [selectedDomain, setSelectedDomain] = useState("AI & Machine Learning");

  const marketDemands = [
    {
      domain: "AI & Machine Learning",
      growth: "+45%",
      color: "hsl(245, 82%, 67%)",
      marketValue: "$2.8B",
      jobOpenings: "3,200+",
      avgSalary: "AED 180,000",
      topCompanies: ["ADNOC", "Emirates NBD", "Careem", "Mashreq Bank"],
      inDemandSkills: [
        { 
          skill: "Python", 
          demand: 95, 
          learnerLevel: 75, 
          gap: 20, 
          salaryImpact: "+35%",
          jobCount: 1850,
          difficulty: "Medium",
          timeToMaster: "4-6 months",
          courses: ["Python for AI - Coursera", "Advanced Python - edX"] 
        },
        { 
          skill: "Machine Learning", 
          demand: 90, 
          learnerLevel: 45, 
          gap: 45, 
          salaryImpact: "+48%",
          jobCount: 2100,
          difficulty: "High",
          timeToMaster: "8-12 months",
          courses: ["ML Course - Stanford", "Applied ML - Udacity"] 
        },
        { 
          skill: "Deep Learning", 
          demand: 85, 
          learnerLevel: 20, 
          gap: 65, 
          salaryImpact: "+52%",
          jobCount: 1650,
          difficulty: "Very High",
          timeToMaster: "12-18 months",
          courses: ["Deep Learning Specialization - Coursera", "Neural Networks - Udemy"] 
        },
        { 
          skill: "TensorFlow", 
          demand: 80, 
          learnerLevel: 10, 
          gap: 70, 
          salaryImpact: "+42%",
          jobCount: 1250,
          difficulty: "High",
          timeToMaster: "6-9 months",
          courses: ["TensorFlow Developer - Google", "TensorFlow Mastery - Pluralsight"] 
        },
        { 
          skill: "Data Analysis", 
          demand: 88, 
          learnerLevel: 60, 
          gap: 28, 
          salaryImpact: "+28%",
          jobCount: 2800,
          difficulty: "Medium",
          timeToMaster: "3-5 months",
          courses: ["Data Analysis with Python - IBM", "Statistical Analysis - MIT"] 
        },
        { 
          skill: "Neural Networks", 
          demand: 82, 
          learnerLevel: 15, 
          gap: 67, 
          salaryImpact: "+45%",
          jobCount: 980,
          difficulty: "Very High",
          timeToMaster: "10-15 months",
          courses: ["Neural Networks Course - DeepLearning.AI", "CNNs Specialization - Coursera"] 
        }
      ]
    },
    {
      domain: "Data Science",
      growth: "+38%",
      color: "hsl(15, 85%, 65%)",
      marketValue: "$1.9B",
      jobOpenings: "2,800+",
      avgSalary: "AED 145,000",
      topCompanies: ["Dubai Electricity", "Etisalat", "FAB", "Noon"],
      inDemandSkills: [
        { 
          skill: "Python", 
          demand: 92, 
          learnerLevel: 75, 
          gap: 17, 
          salaryImpact: "+32%",
          jobCount: 2200,
          difficulty: "Medium",
          timeToMaster: "4-6 months",
          courses: ["Python for Data Science - IBM", "Python Programming - Michigan"] 
        },
        { 
          skill: "SQL", 
          demand: 88, 
          learnerLevel: 50, 
          gap: 38, 
          salaryImpact: "+22%",
          jobCount: 3100,
          difficulty: "Low",
          timeToMaster: "2-3 months",
          courses: ["SQL for Data Science - UC Davis", "Advanced SQL - Udacity"] 
        },
        { 
          skill: "Statistics", 
          demand: 85, 
          learnerLevel: 40, 
          gap: 45, 
          salaryImpact: "+38%",
          jobCount: 1850,
          difficulty: "High",
          timeToMaster: "6-8 months",
          courses: ["Statistics for Data Science - Stanford", "Applied Statistics - Duke"] 
        },
        { 
          skill: "R Programming", 
          demand: 75, 
          learnerLevel: 20, 
          gap: 55, 
          salaryImpact: "+25%",
          jobCount: 950,
          difficulty: "Medium",
          timeToMaster: "3-5 months",
          courses: ["R Programming - Johns Hopkins", "Data Science with R - Harvard"] 
        },
        { 
          skill: "Data Visualization", 
          demand: 80, 
          learnerLevel: 55, 
          gap: 25, 
          salaryImpact: "+18%",
          jobCount: 1650,
          difficulty: "Medium",
          timeToMaster: "2-4 months",
          courses: ["Data Visualization - Tableau", "Advanced Plotting - MIT"] 
        }
      ]
    },
    {
      domain: "Cloud Computing",
      growth: "+42%",
      color: "hsl(142, 76%, 36%)",
      marketValue: "$3.2B",
      jobOpenings: "4,100+",
      avgSalary: "AED 195,000",
      topCompanies: ["Amazon Web Services", "Microsoft", "Google Cloud", "Oracle"],
      inDemandSkills: [
        { 
          skill: "AWS", 
          demand: 90, 
          learnerLevel: 30, 
          gap: 60, 
          salaryImpact: "+45%",
          jobCount: 2850,
          difficulty: "High",
          timeToMaster: "6-9 months",
          courses: ["AWS Solutions Architect - Amazon", "Cloud Practitioner - AWS"] 
        },
        { 
          skill: "Azure", 
          demand: 85, 
          learnerLevel: 25, 
          gap: 60, 
          salaryImpact: "+42%",
          jobCount: 2100,
          difficulty: "High",
          timeToMaster: "6-8 months",
          courses: ["Azure Fundamentals - Microsoft", "Azure Developer - Pluralsight"] 
        },
        { 
          skill: "Docker", 
          demand: 78, 
          learnerLevel: 20, 
          gap: 58, 
          salaryImpact: "+28%",
          jobCount: 1850,
          difficulty: "Medium",
          timeToMaster: "3-4 months",
          courses: ["Docker Mastery - Udemy", "Containerization - Linux Foundation"] 
        },
        { 
          skill: "Kubernetes", 
          demand: 75, 
          learnerLevel: 10, 
          gap: 65, 
          salaryImpact: "+38%",
          jobCount: 1450,
          difficulty: "Very High",
          timeToMaster: "8-12 months",
          courses: ["Kubernetes for Developers - Linux Foundation", "K8s Administration - CNCF"] 
        },
        { 
          skill: "DevOps", 
          demand: 82, 
          learnerLevel: 35, 
          gap: 47, 
          salaryImpact: "+35%",
          jobCount: 2250,
          difficulty: "High",
          timeToMaster: "6-10 months",
          courses: ["DevOps Engineering - AWS", "CI/CD Pipeline - GitLab"] 
        }
      ]
    }
  ];

  const currentDomain = marketDemands.find(d => d.domain === selectedDomain);
  const strongSkills = currentDomain?.inDemandSkills.filter(s => s.gap <= 20) || [];
  const improvementSkills = currentDomain?.inDemandSkills.filter(s => s.gap > 20 && s.gap <= 50) || [];
  const criticalGaps = currentDomain?.inDemandSkills.filter(s => s.gap > 50) || [];

  // Prepare data for charts
  const radarData = currentDomain?.inDemandSkills.map(skill => ({
    skill: skill.skill,
    "Market Demand": skill.demand,
    "Your Level": skill.learnerLevel,
  })) || [];

  const barData = currentDomain?.inDemandSkills.map(skill => ({
    skill: skill.skill,
    gap: skill.gap,
    level: skill.learnerLevel,
    demand: skill.demand
  })) || [];

  const pieData = [
    { name: 'Strong Skills', value: strongSkills.length, color: 'hsl(142, 76%, 36%)' },
    { name: 'Need Improvement', value: improvementSkills.length, color: 'hsl(38, 92%, 50%)' },
    { name: 'Critical Gaps', value: criticalGaps.length, color: 'hsl(0, 84%, 60%)' }
  ];

  const COLORS = ['hsl(142, 76%, 36%)', 'hsl(38, 92%, 50%)', 'hsl(0, 84%, 60%)'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-black">
          Market-Aligned Skill Assessment
        </h2>
        <p className="text-black max-w-2xl mx-auto">
          Advanced analytics comparing your skillset with UAE market demands, powered by real-time industry data and salary insights
        </p>
      </div>

      {/* Domain Selection */}
      <div className="flex flex-wrap gap-3 justify-center">
        {marketDemands.map((domain) => (
          <Button
            key={domain.domain}
            variant={selectedDomain === domain.domain ? "default" : "outline"}
            onClick={() => setSelectedDomain(domain.domain)}
            className="relative flex items-center gap-2 px-6 py-3 transition-all duration-300 hover:scale-105"
            style={selectedDomain === domain.domain ? { background: "hsl(217, 91%, 60%)" } : {}}
          >
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: domain.color }}
            />
            {domain.domain}
            <Badge 
              variant="secondary" 
              className="text-xs bg-white/20 text-current border-white/30"
            >
              {domain.growth}
            </Badge>
          </Button>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="radar">Skill Radar</TabsTrigger>
          <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
          <TabsTrigger value="courses">Learning Path</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="relative overflow-hidden border-green-200 bg-gradient-to-br from-green-50 to-green-100/50">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/10 rounded-full -translate-y-10 translate-x-10" />
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-700">{strongSkills.length}</div>
                    <p className="text-sm text-green-600">Market-Ready Skills</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-yellow-200 bg-gradient-to-br from-yellow-50 to-yellow-100/50">
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-full -translate-y-10 translate-x-10" />
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-700">{improvementSkills.length}</div>
                    <p className="text-sm text-yellow-600">Need Enhancement</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-red-200 bg-gradient-to-br from-red-50 to-red-100/50">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full -translate-y-10 translate-x-10" />
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-700">{criticalGaps.length}</div>
                    <p className="text-sm text-red-600">Critical Gaps</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden border-ai-primary/20 bg-gradient-to-br from-ai-primary/5 to-ai-accent/5">
              <div className="absolute top-0 right-0 w-20 h-20 bg-ai-primary/10 rounded-full -translate-y-10 translate-x-10" />
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-ai-primary/20 rounded-lg">
                    <Award className="w-5 h-5 text-ai-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-ai-primary">
                      {currentDomain ? Math.round(strongSkills.length / currentDomain.inDemandSkills.length * 100) : 0}%
                    </div>
                    <p className="text-sm text-ai-primary">Market Readiness</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Skill Distribution and Market Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Skill Distribution Analysis
                </CardTitle>
                <CardDescription>Detailed breakdown of your skill readiness</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={120}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value, name) => [`${value} skills`, name]} />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
                
                {/* Detailed breakdown */}
                <div className="mt-4 space-y-3 border-t pt-4">
                  <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">Market-Ready Skills</span>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-700">
                      {strongSkills.length} skills (Gap ≤ 20%)
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span className="text-sm font-medium">Enhancement Needed</span>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
                      {improvementSkills.length} skills (Gap 21-50%)
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span className="text-sm font-medium">Critical Development</span>
                    </div>
                    <Badge variant="outline" className="bg-red-100 text-red-700">
                      {criticalGaps.length} skills (Gap &gt; 50%)
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-ai-primary" />
                  UAE Market Intelligence
                </CardTitle>
                <CardDescription>Real-time market insights for {selectedDomain}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Market Overview */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gradient-to-br from-ai-primary/10 to-ai-primary/5 rounded-lg border">
                    <div className="text-lg font-bold text-ai-primary">{currentDomain?.marketValue}</div>
                    <div className="text-xs text-muted-foreground">Market Size</div>
                  </div>
                  <div className="text-center p-3 bg-gradient-to-br from-ai-success/10 to-ai-success/5 rounded-lg border">
                    <div className="text-lg font-bold text-ai-success">{currentDomain?.jobOpenings}</div>
                    <div className="text-xs text-muted-foreground">Open Positions</div>
                  </div>
                </div>

                <div className="text-center p-3 bg-gradient-to-br from-ai-accent/10 to-ai-accent/5 rounded-lg border">
                  <div className="text-lg font-bold text-ai-accent">{currentDomain?.avgSalary}</div>
                  <div className="text-xs text-muted-foreground">Average Salary</div>
                </div>
                
                {/* Top Companies */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-ai-secondary" />
                    Top Hiring Companies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentDomain?.topCompanies.map((company, index) => (
                      <Badge key={index} variant="outline" className="text-xs bg-ai-secondary/10 text-ai-secondary border-ai-secondary/30">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* High-Impact Skills */}
                <div>
                  <h4 className="font-medium mb-3 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    High-Impact Skills
                  </h4>
                  <div className="space-y-2">
                    {currentDomain?.inDemandSkills
                      .sort((a, b) => parseFloat(b.salaryImpact.replace('%', '').replace('+', '')) - parseFloat(a.salaryImpact.replace('%', '').replace('+', '')))
                      .slice(0, 3)
                      .map((skill, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                          <span className="text-sm font-medium">{skill.skill}</span>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700">
                              {skill.salaryImpact} salary
                            </Badge>
                            <span className="text-xs text-muted-foreground">{skill.jobCount} jobs</span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="radar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                {selectedDomain} - Skill Radar Analysis
              </CardTitle>
              <CardDescription>
                Visual comparison of your skills vs market demand
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Market Demand"
                    dataKey="Market Demand"
                    stroke="hsl(245, 82%, 67%)"
                    fill="hsl(245, 82%, 67%)"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Your Level"
                    dataKey="Your Level"
                    stroke="hsl(15, 85%, 65%)"
                    fill="hsl(15, 85%, 65%)"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="gaps" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Skill Gap Breakdown</CardTitle>
              <CardDescription>Detailed analysis of each skill gap</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="gap" fill="hsl(0, 84%, 60%)" name="Skill Gap %" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {currentDomain?.inDemandSkills.map((skill, index) => (
              <Card key={index} className="transition-all duration-200 hover:shadow-md">
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-xl">{skill.skill}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {skill.difficulty} difficulty
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {skill.timeToMaster}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={skill.gap <= 20 ? "default" : skill.gap <= 50 ? "secondary" : "destructive"}
                            className="text-sm px-3 py-1"
                          >
                            {skill.gap}% gap
                          </Badge>
                          <div className="text-sm text-ai-success font-medium mt-1">
                            {skill.salaryImpact} salary boost
                          </div>
                        </div>
                      </div>

                      {/* Market Stats */}
                      <div className="grid grid-cols-3 gap-3 p-3 bg-muted/20 rounded-lg">
                        <div className="text-center">
                          <div className="text-lg font-bold text-ai-primary">{skill.jobCount}</div>
                          <div className="text-xs text-muted-foreground">Job Openings</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-ai-secondary">{skill.demand}%</div>
                          <div className="text-xs text-muted-foreground">Market Demand</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-ai-accent">{skill.salaryImpact}</div>
                          <div className="text-xs text-muted-foreground">Salary Impact</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                              <span>Market Demand</span>
                              <span className="text-red-600">{skill.demand}%</span>
                            </div>
                            <Progress value={skill.demand} className="h-3 bg-red-100" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                              <span>Your Current Level</span>
                              <span className="text-ai-primary">{skill.learnerLevel}%</span>
                            </div>
                            <Progress value={skill.learnerLevel} className="h-3" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm font-medium">
                            <span>Gap Analysis</span>
                            <span className="text-red-600">{skill.gap}%</span>
                          </div>
                          <Progress value={skill.gap} className="h-3 bg-red-100" />
                        </div>
                      </div>

                      {skill.gap > 20 && (
                        <div className="bg-gradient-to-br from-muted/30 to-muted/10 p-4 rounded-lg border">
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-4 h-4 text-ai-primary" />
                            <span className="font-medium text-sm">Recommended Learning Path</span>
                          </div>
                          <div className="space-y-2">
                            {skill.courses.map((course, idx) => (
                              <Button key={idx} size="sm" variant="outline" className="h-8 w-full justify-start">
                                <ExternalLink className="w-3 h-3 mr-2" />
                                {course}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="courses" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Personalized Learning Recommendations
              </CardTitle>
              <CardDescription>
                Curated courses from top platforms to bridge your skill gaps
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {criticalGaps.length > 0 && (
                <div>
                  <h3 className="font-semibold text-red-700 mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Priority Skills (Critical Gaps)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {criticalGaps.slice(0, 4).map((skill, index) => (
                      <Card key={index} className="border-red-200 bg-red-50/30">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">{skill.skill}</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {skill.gap}% gap to market standard
                          </p>
                          <div className="space-y-2">
                            {skill.courses.map((course, idx) => (
                              <Button key={idx} size="sm" variant="outline" className="w-full h-8 justify-start">
                                <ExternalLink className="w-3 h-3 mr-2" />
                                {course}
                              </Button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {improvementSkills.length > 0 && (
                <div>
                  <h3 className="font-semibold text-yellow-700 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Enhancement Opportunities
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {improvementSkills.map((skill, index) => (
                      <Card key={index} className="border-yellow-200 bg-yellow-50/30">
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">{skill.skill}</h4>
                          <p className="text-sm text-muted-foreground mb-3">
                            {skill.gap}% gap to market standard
                          </p>
                          <div className="space-y-2">
                            {skill.courses.slice(0, 1).map((course, idx) => (
                              <Button key={idx} size="sm" variant="outline" className="w-full h-8 justify-start">
                                <ExternalLink className="w-3 h-3 mr-2" />
                                {course}
                              </Button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillGapAnalysis;