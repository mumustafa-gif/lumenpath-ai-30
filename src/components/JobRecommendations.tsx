import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  TrendingUp,
  ExternalLink,
  BookOpen,
  Target,
  Building,
  Users,
  Star,
  Filter,
  CheckCircle,
  ChevronRight,
  Lightbulb
} from "lucide-react";

const JobRecommendations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("match");

  const careerPaths = [
    {
      id: 1,
      title: "AI/ML Engineer",
      category: "AI",
      experience: "3-5 years",
      matchPercentage: 85,
      growth: "High Demand",
      region: "UAE - Dubai",
      requiredSkills: ["Python", "Machine Learning", "TensorFlow", "Deep Learning", "Data Analysis", "Statistics"],
      yourSkills: ["Python", "Machine Learning", "Data Analysis"],
      missingSkills: ["TensorFlow", "Deep Learning", "Statistics"],
      description: "Design and implement AI systems, develop machine learning models, and create intelligent solutions for complex business problems.",
      careerProgression: ["Junior ML Engineer", "ML Engineer", "Senior ML Engineer", "AI Architect"],
      industries: ["Technology", "Healthcare", "Finance", "E-commerce"],
      skillImportance: {
        "Python": 95,
        "Machine Learning": 90,
        "TensorFlow": 80,
        "Deep Learning": 85,
        "Data Analysis": 88,
        "Statistics": 75
      }
    },
    {
      id: 2,
      title: "Data Scientist",
      category: "Data Science",
      experience: "2-4 years",
      matchPercentage: 78,
      growth: "Very High Demand",
      region: "UAE - Abu Dhabi",
      requiredSkills: ["Python", "SQL", "Statistics", "Machine Learning", "Data Visualization", "R"],
      yourSkills: ["Python", "Statistics", "Data Visualization"],
      missingSkills: ["SQL", "Machine Learning", "R"],
      description: "Extract insights from complex datasets, build predictive models, and drive data-driven decision making across organizations.",
      careerProgression: ["Data Analyst", "Data Scientist", "Senior Data Scientist", "Chief Data Officer"],
      industries: ["Technology", "Banking", "Retail", "Healthcare"],
      skillImportance: {
        "Python": 92,
        "SQL": 88,
        "Statistics": 95,
        "Machine Learning": 85,
        "Data Visualization": 80,
        "R": 75
      }
    },
    {
      id: 3,
      title: "Cloud Solutions Architect",
      category: "Cloud",
      experience: "5-7 years",
      matchPercentage: 65,
      growth: "Rapidly Growing",
      region: "UAE - Dubai",
      requiredSkills: ["AWS", "Azure", "Docker", "Kubernetes", "DevOps", "System Design"],
      yourSkills: ["System Design"],
      missingSkills: ["AWS", "Azure", "Docker", "Kubernetes", "DevOps"],
      description: "Design scalable cloud infrastructure, lead digital transformation initiatives, and optimize cloud operations for enterprise clients.",
      careerProgression: ["Cloud Engineer", "Solutions Architect", "Senior Architect", "Cloud Practice Lead"],
      industries: ["Technology", "Government", "Oil & Gas", "Banking"],
      skillImportance: {
        "AWS": 90,
        "Azure": 85,
        "Docker": 78,
        "Kubernetes": 75,
        "DevOps": 82,
        "System Design": 88
      }
    },
    {
      id: 4,
      title: "Product Manager - Tech",
      category: "Product",
      experience: "4-6 years",
      matchPercentage: 72,
      growth: "High Demand",
      region: "UAE - Sharjah",
      requiredSkills: ["Product Strategy", "Data Analysis", "User Research", "Agile", "Communication", "Business Analysis"],
      yourSkills: ["Data Analysis", "Communication", "Business Analysis"],
      missingSkills: ["Product Strategy", "User Research", "Agile"],
      description: "Drive product vision and strategy, coordinate cross-functional teams, and deliver innovative solutions that meet market needs.",
      careerProgression: ["Associate PM", "Product Manager", "Senior PM", "VP of Product"],
      industries: ["Technology", "E-commerce", "Fintech", "Startups"],
      skillImportance: {
        "Product Strategy": 95,
        "Data Analysis": 85,
        "User Research": 80,
        "Agile": 75,
        "Communication": 90,
        "Business Analysis": 70
      }
    },
    {
      id: 5,
      title: "Full Stack Developer",
      category: "Software",
      experience: "2-4 years",
      matchPercentage: 82,
      growth: "Steady Demand",
      region: "UAE - Dubai",
      requiredSkills: ["JavaScript", "React", "Node.js", "Python", "SQL", "API Design"],
      yourSkills: ["JavaScript", "Python", "SQL"],
      missingSkills: ["React", "Node.js", "API Design"],
      description: "Develop end-to-end web applications, create responsive user interfaces, and build robust backend systems for diverse clients.",
      careerProgression: ["Junior Developer", "Full Stack Developer", "Senior Developer", "Tech Lead"],
      industries: ["Technology", "Startups", "E-commerce", "Digital Agencies"],
      skillImportance: {
        "JavaScript": 95,
        "React": 85,
        "Node.js": 80,
        "Python": 75,
        "SQL": 70,
        "API Design": 78
      }
    }
  ];

  const categories = ["All", "AI", "Data Science", "Cloud", "Product", "Software"];
  const sortOptions = [
    { value: "match", label: "Best Match" },
    { value: "growth", label: "Market Growth" },
    { value: "experience", label: "Experience Level" }
  ];

  const filteredPaths = careerPaths
    .filter(path => selectedCategory === "All" || path.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "match") return b.matchPercentage - a.matchPercentage;
      if (sortBy === "growth") return a.growth.localeCompare(b.growth);
      return 0;
    });

  const learningResources = {
    "TensorFlow": [
      { platform: "Coursera", course: "Deep Learning Specialization", provider: "DeepLearning.AI", duration: "4 months" },
      { platform: "Google", course: "TensorFlow Developer Certificate", provider: "Google", duration: "3 months" }
    ],
    "AWS": [
      { platform: "AWS", course: "AWS Solutions Architect", provider: "Amazon", duration: "3 months" },
      { platform: "Udacity", course: "AWS Cloud Architect Nanodegree", provider: "Udacity", duration: "4 months" }
    ],
    "React": [
      { platform: "Coursera", course: "React Specialization", provider: "Meta", duration: "2 months" },
      { platform: "Udemy", course: "Complete React Developer", provider: "Udemy", duration: "6 weeks" }
    ],
    "Product Strategy": [
      { platform: "Coursera", course: "Product Management", provider: "University of Virginia", duration: "6 weeks" },
      { platform: "edX", course: "Product Strategy", provider: "Boston University", duration: "8 weeks" }
    ],
    "SQL": [
      { platform: "Coursera", course: "SQL for Data Science", provider: "UC Davis", duration: "4 weeks" },
      { platform: "edX", course: "Introduction to SQL", provider: "IBM", duration: "5 weeks" }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-foreground">
          Future Career Opportunities
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover career paths aligned with your skills, market trends, and growth potential across UAE emirates
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" />
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="border rounded px-3 py-1 text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Career Path Cards */}
      <div className="space-y-6">
        {filteredPaths.map((path) => (
          <Card key={path.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-ai-primary/30">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-xl">{path.title}</CardTitle>
                    <Badge 
                      variant="secondary" 
                      className="bg-gradient-to-r from-green-100 to-green-200 text-green-700 border-green-300"
                    >
                      {path.matchPercentage}% match
                    </Badge>
                    <Badge variant="outline" className="text-ai-primary border-ai-primary/30">
                      {path.growth}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-4 text-base">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {path.region} Region
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {path.experience} experience
                    </span>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed">{path.description}</p>
              
              {/* Skill Match Analysis */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Career Readiness</span>
                  <span className="font-bold text-ai-primary">{path.matchPercentage}%</span>
                </div>
                <Progress value={path.matchPercentage} className="h-3" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-green-700 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Your Strengths ({path.yourSkills.length} skills)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {path.yourSkills.map((skill, index) => (
                        <Badge key={index} className="bg-green-100 text-green-800 hover:bg-green-100 border-green-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-red-700 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Skills to Develop ({path.missingSkills.length} skills)
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {path.missingSkills.map((skill, index) => (
                        <Badge key={index} variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100 border-red-300">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Career Progression */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-ai-primary" />
                  Career Progression Path
                </h4>
                <div className="flex items-center gap-2 overflow-x-auto pb-2">
                  {path.careerProgression.map((role, index) => (
                    <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                      <Badge variant="outline" className="px-3 py-1">
                        {role}
                      </Badge>
                      {index < path.careerProgression.length - 1 && (
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Industries */}
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Building className="w-4 h-4 text-ai-primary" />
                  Target Industries
                </h4>
                <div className="flex flex-wrap gap-2">
                  {path.industries.map((industry, index) => (
                    <Badge key={index} variant="secondary" className="bg-ai-primary/10 text-ai-primary">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button variant="outline" className="w-full">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Job Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Learning Resources */}
      <Card className="border-ai-primary/20 bg-gradient-to-br from-ai-primary/5 to-ai-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-ai-primary" />
            Recommended Learning Resources
          </CardTitle>
          <CardDescription>
            Curated courses from top platforms to accelerate your career transition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(learningResources).slice(0, 6).map(([skill, courses]) => (
              <Card key={skill} className="border-dashed border-ai-primary/30 hover:border-ai-primary/50 transition-colors">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className="bg-ai-primary/20 text-ai-primary hover:bg-ai-primary/20">
                      {skill}
                    </Badge>
                    <Lightbulb className="w-4 h-4 text-ai-accent" />
                  </div>
                  
                  <div className="space-y-3">
                    {courses.map((course, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-xs">
                            {course.platform}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{course.duration}</span>
                        </div>
                        <h5 className="font-medium text-sm">{course.course}</h5>
                        <p className="text-xs text-muted-foreground">{course.provider}</p>
                        <Button size="sm" variant="outline" className="w-full h-8">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          View Course
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobRecommendations;