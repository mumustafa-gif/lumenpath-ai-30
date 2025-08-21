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
  Award
} from "lucide-react";

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

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Skills Comparison</h2>
        <p className="text-muted-foreground">
          Compare your skills with market requirements for different career paths
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

      <Tabs defaultValue="detailed" className="space-y-6">
        <TabsList>
          <TabsTrigger value="detailed">Detailed Comparison</TabsTrigger>
          <TabsTrigger value="recommendations">Learning Path</TabsTrigger>
          <TabsTrigger value="benchmarks">Market Benchmarks</TabsTrigger>
        </TabsList>

        <TabsContent value="detailed" className="space-y-6">
          <div className="space-y-6">
            {currentJob?.requiredSkills.map((skill, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-lg">{skill.skill}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">
                          Importance: {skill.importance}%
                        </Badge>
                        {skill.yourLevel >= skill.marketAverage ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Your Level</span>
                          <span className="text-sm">{skill.yourLevel}%</span>
                        </div>
                        <Progress value={skill.yourLevel} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Market Average</span>
                          <span className="text-sm">{skill.marketAverage}%</span>
                        </div>
                        <Progress value={skill.marketAverage} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">Required Level</span>
                          <span className="text-sm">{skill.importance}%</span>
                        </div>
                        <Progress value={skill.importance} className="h-2" />
                      </div>
                    </div>
                    
                    {skill.yourLevel < skill.importance && (
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">Gap to Close:</span>
                          <Badge variant="destructive">
                            {skill.importance - skill.yourLevel}% behind
                          </Badge>
                        </div>
                        
                        {courseSuggestions[skill.skill as keyof typeof courseSuggestions] && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Recommended Courses:</p>
                            <div className="flex flex-wrap gap-2">
                              {courseSuggestions[skill.skill as keyof typeof courseSuggestions].map((course, idx) => (
                                <Button key={idx} size="sm" variant="outline" className="h-8">
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  {course.platform} - {course.course}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Priority Skills to Develop</CardTitle>
                <CardDescription>Focus on these high-impact skills first</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {criticalSkills
                  .sort((a, b) => b.importance - a.importance)
                  .slice(0, 3)
                  .map((skill, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{skill.skill}</h4>
                        <p className="text-sm text-muted-foreground">
                          {skill.importance - skill.yourLevel}% gap to close
                        </p>
                      </div>
                      <Button size="sm" variant="outline">
                        <BookOpen className="w-4 h-4 mr-1" />
                        Learn
                      </Button>
                    </div>
                  ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-700">Leverage Your Strengths</CardTitle>
                <CardDescription>You're already competitive in these areas</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {strongSkills.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-green-50/50">
                    <div>
                      <h4 className="font-medium">{skill.skill}</h4>
                      <p className="text-sm text-green-600">
                        {skill.yourLevel - skill.marketAverage}% above market average
                      </p>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>MENA Region Market Benchmarks</CardTitle>
              <CardDescription>How you compare to professionals in the region</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-4">Top Performing Skills</h4>
                  <div className="space-y-3">
                    {strongSkills.slice(0, 4).map((skill, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{skill.skill}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="default">Top 25%</Badge>
                          <span className="text-sm text-green-600">{skill.yourLevel}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-4">Industry Salary Impact</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Current Skill Level</span>
                      <span className="text-sm font-medium">$75,000 - $95,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Target Skill Level</span>
                      <span className="text-sm font-medium text-green-600">$95,000 - $130,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Potential Increase</span>
                      <span className="text-sm font-bold text-ai-primary">+$35,000</span>
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