import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  BookOpen, 
  ExternalLink,
  AlertCircle,
  CheckCircle
} from "lucide-react";

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
      inDemandSkills: [
        { skill: "Python", demand: 95, learnerLevel: 75, gap: 20 },
        { skill: "Machine Learning", demand: 90, learnerLevel: 45, gap: 45 },
        { skill: "Deep Learning", demand: 85, learnerLevel: 20, gap: 65 },
        { skill: "TensorFlow", demand: 80, learnerLevel: 10, gap: 70 },
        { skill: "Data Analysis", demand: 88, learnerLevel: 60, gap: 28 },
        { skill: "Neural Networks", demand: 82, learnerLevel: 15, gap: 67 }
      ]
    },
    {
      domain: "Data Science",
      growth: "+38%",
      inDemandSkills: [
        { skill: "Python", demand: 92, learnerLevel: 75, gap: 17 },
        { skill: "SQL", demand: 88, learnerLevel: 50, gap: 38 },
        { skill: "Statistics", demand: 85, learnerLevel: 40, gap: 45 },
        { skill: "R Programming", demand: 75, learnerLevel: 20, gap: 55 },
        { skill: "Data Visualization", demand: 80, learnerLevel: 55, gap: 25 }
      ]
    },
    {
      domain: "Cloud Computing",
      growth: "+42%",
      inDemandSkills: [
        { skill: "AWS", demand: 90, learnerLevel: 30, gap: 60 },
        { skill: "Azure", demand: 85, learnerLevel: 25, gap: 60 },
        { skill: "Docker", demand: 78, learnerLevel: 20, gap: 58 },
        { skill: "Kubernetes", demand: 75, learnerLevel: 10, gap: 65 },
        { skill: "DevOps", demand: 82, learnerLevel: 35, gap: 47 }
      ]
    }
  ];

  const currentDomain = marketDemands.find(d => d.domain === selectedDomain);
  const strongSkills = currentDomain?.inDemandSkills.filter(s => s.gap <= 20) || [];
  const improvementSkills = currentDomain?.inDemandSkills.filter(s => s.gap > 20 && s.gap <= 50) || [];
  const criticalGaps = currentDomain?.inDemandSkills.filter(s => s.gap > 50) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Skill Gap Analysis</h2>
        <p className="text-muted-foreground">
          Compare your skills with current market demands in the MENA region
        </p>
      </div>

      {/* Domain Selection */}
      <div className="flex flex-wrap gap-2 justify-center">
        {marketDemands.map((domain) => (
          <Button
            key={domain.domain}
            variant={selectedDomain === domain.domain ? "default" : "outline"}
            onClick={() => setSelectedDomain(domain.domain)}
            className="flex items-center gap-2"
          >
            {domain.domain}
            <Badge variant="secondary" className="text-xs">
              {domain.growth}
            </Badge>
          </Button>
        ))}
      </div>

      {/* Analysis Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-200 bg-green-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-green-700">
              <CheckCircle className="w-5 h-5 mr-2" />
              Strong Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-700">{strongSkills.length}</div>
            <p className="text-sm text-green-600">Market-ready skills</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-200 bg-yellow-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-yellow-700">
              <TrendingUp className="w-5 h-5 mr-2" />
              Need Improvement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-700">{improvementSkills.length}</div>
            <p className="text-sm text-yellow-600">Skills to enhance</p>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center text-red-700">
              <AlertCircle className="w-5 h-5 mr-2" />
              Critical Gaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-700">{criticalGaps.length}</div>
            <p className="text-sm text-red-600">Skills to acquire</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            {selectedDomain} - Detailed Analysis
          </CardTitle>
          <CardDescription>
            Market demand vs your current skill level
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentDomain?.inDemandSkills.map((skill, index) => (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{skill.skill}</h4>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={skill.gap <= 20 ? "default" : skill.gap <= 50 ? "secondary" : "destructive"}
                  >
                    {skill.gap}% gap
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Market Demand</span>
                  <span>{skill.demand}%</span>
                </div>
                <Progress value={skill.demand} className="h-2" />
                
                <div className="flex justify-between text-sm">
                  <span>Your Level</span>
                  <span>{skill.learnerLevel}%</span>
                </div>
                <Progress value={skill.learnerLevel} className="h-2" />
              </div>

              {skill.gap > 20 && (
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm font-medium mb-2">Recommended Actions:</p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" variant="outline" className="h-8">
                      <BookOpen className="w-3 h-3 mr-1" />
                      Find Courses
                    </Button>
                    <Button size="sm" variant="outline" className="h-8">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Coursera
                    </Button>
                    <Button size="sm" variant="outline" className="h-8">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Udacity
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Market Insights - MENA Region</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Top Growing Skills</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>AI/ML Engineering</span>
                  <span className="text-green-600">+52%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cloud Architecture</span>
                  <span className="text-green-600">+48%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Data Engineering</span>
                  <span className="text-green-600">+45%</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-medium">Salary Impact</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Machine Learning</span>
                  <span className="text-blue-600">+35% salary</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>AWS Certification</span>
                  <span className="text-blue-600">+28% salary</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Deep Learning</span>
                  <span className="text-blue-600">+42% salary</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SkillGapAnalysis;