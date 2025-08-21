import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle,
  BookOpen,
  ExternalLink,
  BarChart3,
  Users,
  Star,
  Award,
  Lightbulb,
  ChevronRight
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
  Legend,
  LineChart,
  Line
} from 'recharts';

const SkillsComparison = () => {
  const [selectedJob, setSelectedJob] = useState("AI Engineer");

  const jobProfiles = [
    {
      title: "AI Engineer",
      averageSalary: "$95,000 - $130,000",
      demandLevel: "Very High",
      growth: "+45%",
      requiredSkills: [
        { skill: "Python", importance: 95, yourLevel: 75, marketAverage: 80 },
        { skill: "Machine Learning", importance: 90, yourLevel: 45, marketAverage: 70 },
        { skill: "Deep Learning", importance: 85, yourLevel: 20, marketAverage: 60 },
        { skill: "TensorFlow", importance: 80, yourLevel: 10, marketAverage: 55 },
        { skill: "Data Analysis", importance: 88, yourLevel: 60, marketAverage: 75 },
        { skill: "Statistics", importance: 75, yourLevel: 40, marketAverage: 65 },
        { skill: "Neural Networks", importance: 82, yourLevel: 15, marketAverage: 50 },
        { skill: "Computer Vision", importance: 70, yourLevel: 5, marketAverage: 45 }
      ]
    },
    {
      title: "Data Scientist",
      averageSalary: "$75,000 - $105,000",
      demandLevel: "High",
      growth: "+38%",
      requiredSkills: [
        { skill: "Python", importance: 92, yourLevel: 75, marketAverage: 85 },
        { skill: "SQL", importance: 88, yourLevel: 50, marketAverage: 80 },
        { skill: "Statistics", importance: 95, yourLevel: 40, marketAverage: 75 },
        { skill: "R Programming", importance: 75, yourLevel: 20, marketAverage: 60 },
        { skill: "Data Visualization", importance: 80, yourLevel: 55, marketAverage: 70 },
        { skill: "Machine Learning", importance: 85, yourLevel: 45, marketAverage: 65 },
        { skill: "Excel", importance: 70, yourLevel: 80, marketAverage: 85 },
        { skill: "Business Intelligence", importance: 65, yourLevel: 30, marketAverage: 55 }
      ]
    },
    {
      title: "Cloud Architect",
      averageSalary: "$110,000 - $150,000",
      demandLevel: "Very High",
      growth: "+42%",
      requiredSkills: [
        { skill: "AWS", importance: 90, yourLevel: 30, marketAverage: 75 },
        { skill: "Azure", importance: 85, yourLevel: 25, marketAverage: 70 },
        { skill: "Docker", importance: 78, yourLevel: 20, marketAverage: 65 },
        { skill: "Kubernetes", importance: 75, yourLevel: 10, marketAverage: 60 },
        { skill: "DevOps", importance: 82, yourLevel: 35, marketAverage: 70 },
        { skill: "System Design", importance: 88, yourLevel: 60, marketAverage: 75 },
        { skill: "Security", importance: 80, yourLevel: 40, marketAverage: 65 },
        { skill: "Networking", importance: 70, yourLevel: 45, marketAverage: 70 }
      ]
    }
  ];

  const currentJob = jobProfiles.find(job => job.title === selectedJob);
  
  const strongSkills = currentJob?.requiredSkills.filter(s => s.yourLevel >= s.marketAverage) || [];
  const improvingSkills = currentJob?.requiredSkills.filter(s => s.yourLevel < s.marketAverage && s.yourLevel > 30) || [];
  const criticalSkills = currentJob?.requiredSkills.filter(s => s.yourLevel <= 30) || [];

  const overallReadiness = currentJob ? 
    Math.round(currentJob.requiredSkills.reduce((acc, skill) => acc + (skill.yourLevel / skill.importance * 100), 0) / currentJob.requiredSkills.length) : 0;

  const courseSuggestions = {
    "Machine Learning": [
      { platform: "Coursera", course: "Machine Learning Course", provider: "Stanford University" },
      { platform: "edX", course: "Introduction to Machine Learning", provider: "MIT" }
    ],
    "Deep Learning": [
      { platform: "Coursera", course: "Deep Learning Specialization", provider: "DeepLearning.AI" },
      { platform: "Udacity", course: "Deep Learning Nanodegree", provider: "Udacity" }
    ],
    "AWS": [
      { platform: "AWS", course: "AWS Solutions Architect", provider: "Amazon" },
      { platform: "Udacity", course: "AWS Cloud Architect", provider: "Udacity" }
    ],
    "SQL": [
      { platform: "Coursera", course: "SQL for Data Science", provider: "UC Davis" },
      { platform: "edX", course: "Introduction to SQL", provider: "IBM" }
    ]
  };

  // Prepare chart data
  const radarData = currentJob?.requiredSkills.map(skill => ({
    skill: skill.skill,
    "Market Requirement": skill.importance,
    "Your Level": skill.yourLevel,
    "Market Average": skill.marketAverage,
  })) || [];

  const barData = currentJob?.requiredSkills.map(skill => ({
    skill: skill.skill,
    gap: skill.importance - skill.yourLevel,
    yourLevel: skill.yourLevel,
    marketAvg: skill.marketAverage,
    required: skill.importance
  })) || [];

  const trendData = currentJob?.requiredSkills.map((skill, index) => ({
    skill: skill.skill,
    currentLevel: skill.yourLevel,
    targetLevel: skill.importance,
    month: index + 1
  })) || [];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-ai-primary/10 to-ai-accent/10 rounded-full border border-ai-primary/20">
          <BarChart3 className="w-5 h-5 text-ai-primary" />
          <span className="font-semibold text-ai-primary">Professional Skills Benchmark</span>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-ai-primary to-ai-accent bg-clip-text text-transparent">
          Market Skills Comparison
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Advanced comparison of your skillset against market requirements and industry benchmarks across different career paths
        </p>
      </div>

      {/* Job Selection */}
      <div className="flex flex-wrap gap-2 justify-center">
        {jobProfiles.map((job) => (
          <Button
            key={job.title}
            variant={selectedJob === job.title ? "default" : "outline"}
            onClick={() => setSelectedJob(job.title)}
            className="flex items-center gap-2"
          >
            {job.title}
            <Badge variant="secondary" className="text-xs">
              {job.growth}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-ai-primary">{overallReadiness}%</div>
            <p className="text-sm text-muted-foreground">Job Readiness</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{strongSkills.length}</div>
            <p className="text-sm text-muted-foreground">Strong Skills</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{improvingSkills.length}</div>
            <p className="text-sm text-muted-foreground">Improving Skills</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-600">{criticalSkills.length}</div>
            <p className="text-sm text-muted-foreground">Critical Gaps</p>
          </CardContent>
        </Card>
      </div>

      {/* Job Profile Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>{currentJob?.title} - Market Overview</span>
            <Badge variant="secondary">{currentJob?.demandLevel} Demand</Badge>
          </CardTitle>
          <CardDescription>
            Average Salary: {currentJob?.averageSalary} • Growth: {currentJob?.growth}
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="radar">Skill Radar</TabsTrigger>
          <TabsTrigger value="detailed">Gap Analysis</TabsTrigger>
          <TabsTrigger value="benchmarks">Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Skill Distribution Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Skills Gap Overview
                </CardTitle>
                <CardDescription>Visual representation of skill gaps vs requirements</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="skill" 
                      angle={-45} 
                      textAnchor="end" 
                      height={100}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="yourLevel" fill="hsl(245, 82%, 67%)" name="Your Level" />
                    <Bar dataKey="required" fill="hsl(15, 85%, 65%)" name="Required Level" />
                    <Bar dataKey="marketAvg" fill="hsl(142, 76%, 36%)" name="Market Average" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Growth Trajectory
                </CardTitle>
                <CardDescription>Your potential skill development path</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="currentLevel" 
                      stroke="hsl(245, 82%, 67%)" 
                      strokeWidth={3} 
                      name="Current Level"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="targetLevel" 
                      stroke="hsl(15, 85%, 65%)" 
                      strokeWidth={3} 
                      strokeDasharray="5 5" 
                      name="Target Level"
                    />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="radar" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                {currentJob?.title} - Comprehensive Skill Radar
              </CardTitle>
              <CardDescription>
                360-degree view of your skills vs market requirements and industry averages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={500}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Market Requirement"
                    dataKey="Market Requirement"
                    stroke="hsl(15, 85%, 65%)"
                    fill="hsl(15, 85%, 65%)"
                    fillOpacity={0.1}
                    strokeWidth={3}
                  />
                  <Radar
                    name="Market Average"
                    dataKey="Market Average"
                    stroke="hsl(142, 76%, 36%)"
                    fill="hsl(142, 76%, 36%)"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Your Level"
                    dataKey="Your Level"
                    stroke="hsl(245, 82%, 67%)"
                    fill="hsl(245, 82%, 67%)"
                    fillOpacity={0.2}
                    strokeWidth={3}
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="space-y-6">
          <div className="space-y-6">
            {currentJob?.requiredSkills.map((skill, index) => {
              const gapPercentage = skill.importance - skill.yourLevel;
              const performanceLevel = skill.yourLevel >= skill.importance ? 'excellent' : 
                                     skill.yourLevel >= skill.marketAverage ? 'good' : 'needs-improvement';
              
              return (
                <Card key={index} className={`transition-all duration-300 hover:shadow-lg ${
                  performanceLevel === 'excellent' ? 'border-l-4 border-l-green-500' :
                  performanceLevel === 'good' ? 'border-l-4 border-l-yellow-500' :
                  'border-l-4 border-l-red-500'
                }`}>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-xl">{skill.skill}</h3>
                          {performanceLevel === 'excellent' ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : performanceLevel === 'good' ? (
                            <TrendingUp className="w-6 h-6 text-yellow-500" />
                          ) : (
                            <AlertCircle className="w-6 h-6 text-red-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-sm px-3 py-1">
                            Priority: {skill.importance}%
                          </Badge>
                          {gapPercentage > 0 && (
                            <Badge variant="destructive" className="text-sm px-3 py-1">
                              {gapPercentage}% gap
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-sm">Your Current Level</span>
                              <span className="font-bold text-ai-primary">{skill.yourLevel}%</span>
                            </div>
                            <Progress value={skill.yourLevel} className="h-3" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-sm">Market Average</span>
                              <span className="font-bold text-yellow-600">{skill.marketAverage}%</span>
                            </div>
                            <Progress value={skill.marketAverage} className="h-3" />
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="font-semibold text-sm">Required Level</span>
                              <span className="font-bold text-red-600">{skill.importance}%</span>
                            </div>
                            <Progress value={skill.importance} className="h-3" />
                          </div>
                        </div>

                        <div className="lg:col-span-2">
                          {gapPercentage > 0 ? (
                            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg border border-red-200">
                              <div className="flex items-center gap-2 mb-4">
                                <AlertCircle className="w-5 h-5 text-red-600" />
                                <span className="font-semibold text-red-700">Skill Development Required</span>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">Gap to Close:</span>
                                  <Badge variant="destructive" className="text-sm">
                                    {gapPercentage}% improvement needed
                                  </Badge>
                                </div>
                                
                                <div className="space-y-3">
                                  <div className="flex items-center gap-2">
                                    <Lightbulb className="w-4 h-4 text-orange-600" />
                                    <span className="font-medium text-sm">Recommended Learning Path:</span>
                                  </div>
                                  
                                  {courseSuggestions[skill.skill as keyof typeof courseSuggestions] ? (
                                    <div className="grid grid-cols-1 gap-2">
                                      {courseSuggestions[skill.skill as keyof typeof courseSuggestions].map((course, idx) => (
                                        <Button key={idx} size="sm" variant="outline" className="justify-start h-10">
                                          <ExternalLink className="w-3 h-3 mr-2" />
                                          <div className="text-left">
                                            <div className="font-medium">{course.course}</div>
                                            <div className="text-xs text-muted-foreground">{course.platform}</div>
                                          </div>
                                        </Button>
                                      ))}
                                    </div>
                                  ) : (
                                    <div className="text-sm text-muted-foreground">
                                      Seek online courses, certifications, or hands-on projects to develop this skill.
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
                              <div className="flex items-center gap-2 mb-3">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="font-semibold text-green-700">Skill Mastered</span>
                              </div>
                              <p className="text-sm text-green-600 mb-4">
                                You've exceeded the market requirement for this skill. Consider mentoring others or exploring advanced applications.
                              </p>
                              <div className="flex items-center gap-2">
                                <Award className="w-4 h-4 text-green-600" />
                                <span className="text-sm font-medium text-green-700">
                                  {skill.yourLevel - skill.importance}% above requirement
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>


        <TabsContent value="benchmarks" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Your Competitive Advantages
                </CardTitle>
                <CardDescription>Skills where you outperform the market</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {strongSkills.length > 0 ? (
                  <div className="space-y-3">
                    {strongSkills.slice(0, 4).map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-green-200">
                        <div>
                          <h4 className="font-semibold">{skill.skill}</h4>
                          <p className="text-sm text-green-600">
                            {skill.yourLevel - skill.marketAverage}% above market average
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                            Top {Math.max(5, 30 - skill.yourLevel + skill.marketAverage)}%
                          </Badge>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <AlertCircle className="w-12 h-12 mx-auto mb-3 text-yellow-500" />
                    <p>Focus on developing skills to reach market-competitive levels</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
              <CardHeader>
                <CardTitle className="text-red-700 flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Priority Development Areas
                </CardTitle>
                <CardDescription>Critical skills requiring immediate attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {criticalSkills
                    .sort((a, b) => b.importance - a.importance)
                    .slice(0, 4)
                    .map((skill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/60 rounded-lg border border-red-200">
                        <div>
                          <h4 className="font-semibold">{skill.skill}</h4>
                          <p className="text-sm text-red-600">
                            {skill.importance - skill.yourLevel}% gap to market standard
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100">
                            High Priority
                          </Badge>
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-ai-primary/20 bg-gradient-to-br from-ai-primary/5 to-ai-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-ai-primary" />
                MENA Region Market Intelligence
              </CardTitle>
              <CardDescription>
                Comprehensive market analysis and career progression insights
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    Market Performance
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Your Market Position</span>
                      <Badge variant="outline" className="text-ai-primary border-ai-primary/30">
                        {Math.round((strongSkills.length / (currentJob?.requiredSkills.length || 1)) * 100)}th percentile
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Skills Competitiveness</span>
                      <span className="text-sm font-semibold text-ai-primary">
                        {strongSkills.length}/{currentJob?.requiredSkills.length || 0} skills
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Market Readiness</span>
                      <span className="text-sm font-semibold text-green-600">
                        {overallReadiness}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    Career Impact
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Current Level Range</span>
                      <span className="text-sm font-medium">Mid-Level</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Target Level Range</span>
                      <span className="text-sm font-medium text-green-600">Senior Level</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Advancement Timeline</span>
                      <span className="text-sm font-bold text-ai-primary">6-12 months</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-500" />
                    Regional Insights
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Job Market Growth</span>
                      <span className="text-sm font-medium text-green-600">+{currentJob?.growth || "30%"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Demand Level</span>
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        {currentJob?.demandLevel || "High"}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Competition Level</span>
                      <span className="text-sm font-medium text-yellow-600">Moderate</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillsComparison;