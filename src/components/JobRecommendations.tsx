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
  Filter
} from "lucide-react";

const JobRecommendations = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("match");

  const jobRecommendations = [
    {
      id: 1,
      title: "AI/ML Engineer",
      company: "Microsoft MENA",
      location: "Dubai, UAE",
      salary: "$95,000 - $130,000",
      type: "Full-time",
      matchPercentage: 85,
      requiredSkills: ["Python", "Machine Learning", "TensorFlow", "Deep Learning", "Data Analysis"],
      yourSkills: ["Python", "Machine Learning", "Data Analysis"],
      missingSkills: ["TensorFlow", "Deep Learning"],
      description: "Join our AI team to develop cutting-edge machine learning solutions for enterprise clients across the MENA region.",
      companySize: "10,000+",
      experience: "3-5 years",
      rating: 4.8,
      category: "AI"
    },
    {
      id: 2,
      title: "Data Scientist",
      company: "Careem",
      location: "Riyadh, Saudi Arabia",
      salary: "$75,000 - $105,000",
      type: "Full-time",
      matchPercentage: 78,
      requiredSkills: ["Python", "SQL", "Statistics", "Machine Learning", "Data Visualization"],
      yourSkills: ["Python", "Statistics", "Data Visualization"],
      missingSkills: ["SQL", "Machine Learning"],
      description: "Analyze data to drive business decisions and improve user experience for millions of customers.",
      companySize: "1,000-5,000",
      experience: "2-4 years",
      rating: 4.6,
      category: "Data Science"
    },
    {
      id: 3,
      title: "Cloud Solutions Architect",
      company: "AWS",
      location: "Abu Dhabi, UAE",
      salary: "$110,000 - $150,000",
      type: "Full-time",
      matchPercentage: 65,
      requiredSkills: ["AWS", "Docker", "Kubernetes", "DevOps", "System Design"],
      yourSkills: ["System Design"],
      missingSkills: ["AWS", "Docker", "Kubernetes", "DevOps"],
      description: "Design and implement cloud architecture solutions for enterprise customers in the region.",
      companySize: "50,000+",
      experience: "5-7 years",
      rating: 4.9,
      category: "Cloud"
    },
    {
      id: 4,
      title: "Product Manager - AI",
      company: "Noon",
      location: "Dubai, UAE",
      salary: "$85,000 - $120,000",
      type: "Full-time",
      matchPercentage: 72,
      requiredSkills: ["Product Management", "AI Knowledge", "Data Analysis", "Strategy", "Communication"],
      yourSkills: ["Data Analysis", "Communication", "AI Knowledge"],
      missingSkills: ["Product Management", "Strategy"],
      description: "Lead AI product initiatives to enhance customer experience on our e-commerce platform.",
      companySize: "5,000-10,000",
      experience: "4-6 years",
      rating: 4.5,
      category: "Product"
    },
    {
      id: 5,
      title: "Software Engineer",
      company: "Talabat",
      location: "Kuwait City, Kuwait",
      salary: "$60,000 - $85,000",
      type: "Full-time",
      matchPercentage: 82,
      requiredSkills: ["Python", "JavaScript", "React", "Node.js", "Database Design"],
      yourSkills: ["Python", "JavaScript", "Database Design"],
      missingSkills: ["React", "Node.js"],
      description: "Develop and maintain web applications serving millions of food delivery customers.",
      companySize: "1,000-5,000",
      experience: "2-4 years",
      rating: 4.4,
      category: "Software"
    }
  ];

  const categories = ["All", "AI", "Data Science", "Cloud", "Product", "Software"];
  const sortOptions = [
    { value: "match", label: "Best Match" },
    { value: "salary", label: "Highest Salary" },
    { value: "rating", label: "Company Rating" }
  ];

  const filteredJobs = jobRecommendations
    .filter(job => selectedCategory === "All" || job.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "match") return b.matchPercentage - a.matchPercentage;
      if (sortBy === "salary") return b.id - a.id; // Simplified
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const courseSuggestions = [
    {
      platform: "Coursera",
      course: "Deep Learning Specialization",
      provider: "DeepLearning.AI",
      rating: 4.9,
      duration: "4 months",
      skills: ["Deep Learning", "Neural Networks", "TensorFlow"]
    },
    {
      platform: "Udacity",
      course: "AWS Cloud Architect Nanodegree",
      provider: "Udacity",
      rating: 4.7,
      duration: "3 months",
      skills: ["AWS", "Cloud Architecture", "DevOps"]
    },
    {
      platform: "edX",
      course: "Introduction to Product Management",
      provider: "University of Virginia",
      rating: 4.6,
      duration: "6 weeks",
      skills: ["Product Management", "Strategy", "Leadership"]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Job Recommendations</h2>
        <p className="text-muted-foreground">
          AI-powered job matching based on your skills and career goals
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

      {/* Job Cards */}
      <div className="space-y-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-2">
                    {job.title}
                    <Badge variant="secondary">{job.matchPercentage}% match</Badge>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {job.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {job.rating}
                    </span>
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-green-600">{job.salary}</div>
                  <div className="text-sm text-muted-foreground">{job.type}</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <p className="text-sm">{job.description}</p>
              
              {/* Match Analysis */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">Skill Match</span>
                    <span>{job.matchPercentage}%</span>
                  </div>
                  <Progress value={job.matchPercentage} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2 text-green-700">Your Matching Skills</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.yourSkills.map((skill, index) => (
                        <Badge key={index} variant="default" className="text-xs bg-green-100 text-green-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 text-red-700">Skills to Develop</h4>
                    <div className="flex flex-wrap gap-1">
                      {job.missingSkills.map((skill, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Company Info */}
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {job.companySize} employees
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {job.experience} experience
                </span>
              </div>
              
              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Apply Now
                </Button>
                <Button variant="outline">
                  <BookOpen className="w-4 h-4 mr-2" />
                  Upskill for Role
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Course Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Recommended Courses to Bridge Skill Gaps
          </CardTitle>
          <CardDescription>
            Third-party courses to help you qualify for more opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {courseSuggestions.map((course, index) => (
              <Card key={index} className="border-dashed">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{course.platform}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs">{course.rating}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm">{course.course}</h4>
                    <p className="text-xs text-muted-foreground">{course.provider}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {course.skills.map((skill, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    View Course
                  </Button>
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