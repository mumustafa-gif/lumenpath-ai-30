import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarProvider } from "@/components/ui/sidebar";
import { 
  Brain, 
  Users, 
  GraduationCap, 
  TrendingUp, 
  AlertTriangle, 
  BarChart3,
  Clock,
  Target,
  Download,
  PieChart,
  LineChart,
  AreaChart,
  Shield,
  Activity,
  Calendar,
  Zap,
  X,
  Sparkles,
  Eye,
  Globe,
  Building,
  Lightbulb,
  UserCheck,
  Briefcase,
  Award,
  DollarSign,
  MapPin,
  Filter
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart as RechartsLineChart, Line, PieChart as RechartsPieChart, Cell, AreaChart as RechartsAreaChart, Area, Pie } from 'recharts';
import { LeadershipAIAssistant } from "@/components/LeadershipAIAssistant";
import { AISkillsObservatory } from "@/components/AISkillsObservatory";
import { WorkforceTrends } from "@/components/WorkforceTrends";
import { LeadershipSidebar } from "@/components/LeadershipSidebar";
import { ForecastReport } from "@/components/ForecastReport";
import { StrategicPlanning } from "@/components/StrategicPlanning";
import { DeepAnalytics } from "@/components/DeepAnalytics";


const LeadershipDashboard = () => {
  const [searchParams] = useSearchParams();
  const [showChartModal, setShowChartModal] = useState(false);
  const [selectedChartType, setSelectedChartType] = useState("bar");
  const [chartData, setChartData] = useState([]);
  const [chartTitle, setChartTitle] = useState("");
  const [isGeneratingChart, setIsGeneratingChart] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    // Check for tab parameter in URL
    const tabParam = searchParams.get('tab');
    const validTabs = ['overview', 'skills-observatory', 'workforce-trends', 'deep-analytics', 'strategic-planning'];
    return validTabs.includes(tabParam || '') ? tabParam : "overview";
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  
  const stats = {
    totalLearners: 1247,
    activeCourses: 24,
    completionRate: 78,
    avgEngagement: 85
  };

  const courseAnalytics = [
    { name: "AI Fundamentals", enrolled: 234, completed: 182, avgScore: 87, marketDemand: 95, revenue: 145600, satisfaction: 4.8, timeToComplete: 45, dropoutRate: 8 },
    { name: "Data Science", enrolled: 189, completed: 156, avgScore: 91, marketDemand: 89, revenue: 98750, satisfaction: 4.7, timeToComplete: 52, dropoutRate: 12 },
    { name: "Cloud Computing", enrolled: 156, completed: 98, avgScore: 79, marketDemand: 92, revenue: 87300, satisfaction: 4.3, timeToComplete: 38, dropoutRate: 24 },
    { name: "DevOps", enrolled: 134, completed: 112, avgScore: 84, marketDemand: 87, revenue: 76200, satisfaction: 4.5, timeToComplete: 41, dropoutRate: 16 },
    { name: "Cybersecurity", enrolled: 98, completed: 78, avgScore: 89, marketDemand: 94, revenue: 68400, satisfaction: 4.9, timeToComplete: 48, dropoutRate: 9 },
  ];

  const talentDemographics = {
    ageGroups: [
      { group: "22-28 years", count: 485, percentage: 38.9, growth: "+15%" },
      { group: "29-35 years", count: 392, percentage: 31.4, growth: "+12%" },
      { group: "36-42 years", count: 248, percentage: 19.9, growth: "+8%" },
      { group: "43+ years", count: 122, percentage: 9.8, growth: "+5%" },
    ],
    genderDistribution: [
      { gender: "Male", percentage: 58.4, growth: "+8%", value: 58.4 },
      { gender: "Female", percentage: 36.6, growth: "+18%", value: 36.6 },
      { gender: "Other", percentage: 5.0, growth: "+25%", value: 5.0 },
    ],
    talentTypes: [
      { type: "Software Engineers", count: 523, percentage: 41.9, trend: "High Demand", majorSkills: ["React", "Node.js", "Python"] },
      { type: "Data Scientists", count: 312, percentage: 25.0, trend: "Growing", majorSkills: ["Python", "SQL", "Machine Learning"] },
      { type: "DevOps Engineers", count: 198, percentage: 15.9, trend: "Critical Need", majorSkills: ["AWS", "Docker", "Kubernetes"] },
      { type: "Cybersecurity Specialists", count: 145, percentage: 11.6, trend: "Emerging", majorSkills: ["Network Security", "Penetration Testing", "SIEM"] },
      { type: "AI/ML Engineers", count: 69, percentage: 5.5, trend: "Future Focus", majorSkills: ["TensorFlow", "PyTorch", "Deep Learning"] },
    ],
    systemEngagement: {
      dailyActiveUsers: 892,
      weeklyActiveUsers: 1156,
      monthlyActiveUsers: 1247,
      avgSessionDuration: "47 mins",
      completionRate: 78,
      skillAssessmentsTaken: 2834,
      avgCourseRating: 4.6,
      totalLearningHours: 15680,
    },
    upskillSuccess: {
      totalUpskilled: 634,
      careerAdvancement: 423,
      salaryIncrease: 298,
      newRoleTransitions: 187,
      certificationEarned: 756,
      skillsBridged: 1289,
      avgSalaryBoost: "23%",
      jobPlacementRate: 87,
    }
  };

  const regionWiseData = [
    { region: "Dubai", demand: 94, professionals: 12500, skillGap: 32, topSkills: ["Cloud Computing", "AI/ML", "DevOps"], avgSalary: 115000, growth: "+18%" },
    { region: "Abu Dhabi", demand: 89, professionals: 8900, skillGap: 38, topSkills: ["Cybersecurity", "Data Science", "Cloud Computing"], avgSalary: 108000, growth: "+15%" },
    { region: "Sharjah", demand: 86, professionals: 5200, skillGap: 42, topSkills: ["Full-Stack Development", "Digital Marketing", "Cloud Computing"], avgSalary: 95000, growth: "+12%" },
    { region: "Ajman", demand: 82, professionals: 3100, skillGap: 45, topSkills: ["Web Development", "Data Analysis", "Digital Design"], avgSalary: 88000, growth: "+10%" },
    { region: "Ras Al Khaimah", demand: 79, professionals: 2800, skillGap: 48, topSkills: ["Mobile Development", "E-commerce", "Content Creation"], avgSalary: 82000, growth: "+8%" },
    { region: "Fujairah", demand: 75, professionals: 1900, skillGap: 52, topSkills: ["Digital Marketing", "Basic Programming", "Office Automation"], avgSalary: 75000, growth: "+6%" },
    { region: "Umm Al Quwain", demand: 71, professionals: 1200, skillGap: 55, topSkills: ["Computer Literacy", "Digital Tools", "Basic Analytics"], avgSalary: 68000, growth: "+4%" },
  ];

  const coursePerformanceData = [
    { name: "AI Fundamentals", enrolled: 234, completed: 182, satisfaction: 4.8, revenue: 145600, growth: "+25%" },
    { name: "Data Science Bootcamp", enrolled: 189, completed: 156, satisfaction: 4.7, revenue: 98750, growth: "+22%" },
    { name: "Cloud Computing AWS", enrolled: 156, completed: 98, satisfaction: 4.3, revenue: 87300, growth: "+18%" },
    { name: "DevOps Engineering", enrolled: 134, completed: 112, satisfaction: 4.5, revenue: 76200, growth: "+15%" },
    { name: "Cybersecurity Essentials", enrolled: 98, completed: 78, satisfaction: 4.9, revenue: 68400, growth: "+30%" },
    { name: "Full-Stack Development", enrolled: 145, completed: 125, satisfaction: 4.6, revenue: 92500, growth: "+20%" },
  ];

  const skillGapsData = [
    { skill: "AI/Machine Learning", currentSupply: 23, marketDemand: 87, gap: 64, urgency: "Critical" },
    { skill: "Cloud Architecture", currentSupply: 34, marketDemand: 89, gap: 55, urgency: "High" },
    { skill: "Cybersecurity", currentSupply: 41, marketDemand: 92, gap: 51, urgency: "High" },
    { skill: "Data Engineering", currentSupply: 38, marketDemand: 85, gap: 47, urgency: "Medium" },
    { skill: "DevOps", currentSupply: 45, marketDemand: 88, gap: 43, urgency: "Medium" },
    { skill: "Mobile Development", currentSupply: 52, marketDemand: 78, gap: 26, urgency: "Low" },
    { skill: "Blockchain", currentSupply: 18, marketDemand: 73, gap: 55, urgency: "High" },
    { skill: "IoT Development", currentSupply: 29, marketDemand: 68, gap: 39, urgency: "Medium" },
    { skill: "AR/VR Development", currentSupply: 15, marketDemand: 56, gap: 41, urgency: "Medium" },
    { skill: "Quantum Computing", currentSupply: 8, marketDemand: 42, gap: 34, urgency: "Emerging" },
  ];

  const jobRolesDemand = [
    { role: "AI Engineer", demand: 95, supply: 25, gap: 70, avgSalary: 135000, openings: 450 },
    { role: "Cloud Architect", demand: 92, supply: 31, gap: 61, avgSalary: 128000, openings: 380 },
    { role: "Data Scientist", demand: 89, supply: 42, gap: 47, avgSalary: 115000, openings: 320 },
    { role: "DevOps Engineer", demand: 86, supply: 48, gap: 38, avgSalary: 108000, openings: 290 },
    { role: "Cybersecurity Analyst", demand: 94, supply: 38, gap: 56, avgSalary: 118000, openings: 340 },
    { role: "Full-Stack Developer", demand: 78, supply: 65, gap: 13, avgSalary: 95000, openings: 180 },
  ];

  const handleVisualization = (type: string, data: any[], title: string) => {
    setIsGeneratingChart(true);
    setGenerationProgress(0);
    setShowChartModal(true);
    
    const progressInterval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
    
    setTimeout(() => {
      clearInterval(progressInterval);
      setGenerationProgress(100);
      setTimeout(() => {
        setSelectedChartType(type);
        setChartData(data);
        setChartTitle(title);
        setIsGeneratingChart(false);
        setGenerationProgress(0);
      }, 500);
    }, 2500);
  };

  const COLORS = ['hsl(var(--ai-primary))', 'hsl(var(--ai-success))', 'hsl(var(--ai-warning))', 'hsl(var(--ai-error))', 'hsl(var(--ai-secondary))', '#8B5CF6', '#EC4899', '#10B981'];

  const renderChart = () => {
    switch (selectedChartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsLineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsPieChart>
              <Tooltip />
              <Pie data={chartData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </RechartsPieChart>
          </ResponsiveContainer>
        );
      case "area":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RechartsAreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" />
            </RechartsAreaChart>
          </ResponsiveContainer>
        );
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  const aiSuggestions = [
    "Show me course enrollment trends",
    "Visualize skill gaps analysis", 
    "Display learner engagement metrics",
    "Generate completion rate charts"
  ];

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-ai-primary">Dashboard Overview</h2>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="technology">Technology & IT</SelectItem>
            <SelectItem value="business">Business & Management</SelectItem>
            <SelectItem value="design">Design & Creative</SelectItem>
            <SelectItem value="healthcare">Healthcare & Medical</SelectItem>
            <SelectItem value="education">Education & Training</SelectItem>
            <SelectItem value="finance">Finance & Banking</SelectItem>
            <SelectItem value="marketing">Marketing & Sales</SelectItem>
            <SelectItem value="engineering">Engineering & Manufacturing</SelectItem>
            <SelectItem value="hospitality">Hospitality & Tourism</SelectItem>
            <SelectItem value="construction">Construction & Real Estate</SelectItem>
            <SelectItem value="retail">Retail & E-commerce</SelectItem>
            <SelectItem value="logistics">Logistics & Supply Chain</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Learners</CardTitle>
            <div className="p-2 bg-gradient-to-br from-ai-primary/10 to-ai-primary/5 rounded-lg">
              <Users className="h-4 w-4 text-ai-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.totalLearners}</div>
            <p className="text-xs text-ai-increase flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <div className="p-2 bg-gradient-to-br from-ai-secondary/10 to-ai-secondary/5 rounded-lg">
              <GraduationCap className="h-4 w-4 text-ai-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.activeCourses}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all faculty</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <div className="p-2 bg-gradient-to-br from-ai-accent/10 to-ai-accent/5 rounded-lg">
              <Target className="h-4 w-4 text-ai-accent" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.completionRate}%</div>
            <p className="text-xs text-ai-increase flex items-center mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +5% improvement
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90 hover:shadow-lg transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
            <div className="p-2 bg-gradient-to-br from-ai-success/10 to-ai-success/5 rounded-lg">
              <Activity className="h-4 w-4 text-ai-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stats.avgEngagement}%</div>
            <p className="text-xs text-ai-increase mt-1">Excellent performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Talent Demographics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-ai-primary" />
              Age Demographics
            </CardTitle>
          </CardHeader>
          <CardContent>
                <div className="space-y-4">
                  {talentDemographics.ageGroups.map((group, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{group.group}</p>
                        <p className="text-sm text-muted-foreground">{group.count} learners</p>
                      </div>
                      <div className="text-right">
                        <p className="text-ai-primary font-bold">{group.percentage}%</p>
                        <p className="text-xs text-ai-increase">{group.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-ai-secondary" />
              Gender Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
                <div className="space-y-4">
                  {talentDemographics.genderDistribution.map((gender, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div>
                        <p className="font-medium">{gender.gender}</p>
                        <p className="text-sm text-muted-foreground">Distribution</p>
                      </div>
                      <div className="text-right">
                        <p className="text-ai-secondary font-bold">{gender.percentage}%</p>
                        <p className="text-xs text-ai-increase">{gender.growth}</p>
                      </div>
                    </div>
                  ))}
                </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-ai-accent" />
              System Engagement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Daily Active</span>
              <span className="font-semibold">{talentDemographics.systemEngagement.dailyActiveUsers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Avg Session</span>
              <span className="font-semibold">{talentDemographics.systemEngagement.avgSessionDuration}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Course Rating</span>
              <span className="font-semibold">⭐ {talentDemographics.systemEngagement.avgCourseRating}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Learning Hours</span>
              <span className="font-semibold">{talentDemographics.systemEngagement.totalLearningHours.toLocaleString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Course Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-ai-primary" />
              Course Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={coursePerformanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="enrolled" fill="hsl(var(--ai-primary))" name="Enrolled" />
                <Bar dataKey="completed" fill="hsl(var(--ai-success))" name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-ai-secondary" />
              Most Demanding Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {coursePerformanceData.slice(0, 5).map((course, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div>
                    <p className="font-medium">{course.name}</p>
                    <p className="text-sm text-muted-foreground">{course.enrolled} enrolled</p>
                  </div>
                  <div className="text-right">
                    <p className="text-ai-increase font-medium">{course.growth}</p>
                    <p className="text-sm">⭐ {course.satisfaction}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skill Gaps Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Skill Gaps Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsAreaChart data={skillGapsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="marketDemand" stackId="1" stroke="hsl(var(--ai-error))" fill="hsl(var(--ai-error))" name="Market Demand" />
                <Area type="monotone" dataKey="currentSupply" stackId="2" stroke="hsl(var(--ai-success))" fill="hsl(var(--ai-success))" name="Current Supply" />
              </RechartsAreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-ai-accent" />
              Job Roles vs Skill Gaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {jobRolesDemand.map((role, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{role.role}</span>
                    <span className="text-sm text-muted-foreground">{role.openings} openings</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Gap: {role.gap}%</span>
                        <span>${(role.avgSalary / 1000).toFixed(0)}k avg</span>
                      </div>
                      <Progress value={role.gap} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* UAE Regional Skills Demand */}
      <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-ai-primary" />
            UAE Regional Skills Demand & Supply
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={regionWiseData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="demand" fill="hsl(var(--ai-primary))" name="Demand %" />
              <Bar dataKey="skillGap" fill="hsl(var(--ai-error))" name="Skill Gap %" />
            </BarChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {regionWiseData.slice(0, 6).map((region, index) => (
              <div key={index} className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold">{region.region}</h4>
                <p className="text-sm text-muted-foreground">{region.professionals.toLocaleString()} professionals</p>
                <p className="text-sm">Top Skills: {region.topSkills.slice(0, 2).join(', ')}</p>
                <p className="text-sm text-ai-increase">Growth: {region.growth}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upskilling Success Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Award className="w-4 h-4 text-ai-primary" />
              Total Upskilled
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{talentDemographics.upskillSuccess.totalUpskilled}</div>
            <p className="text-xs text-muted-foreground">Learners successfully upskilled</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-ai-secondary" />
              Career Advancement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{talentDemographics.upskillSuccess.careerAdvancement}</div>
            <p className="text-xs text-muted-foreground">Got promoted or advanced</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-ai-accent" />
              Salary Increase
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai-increase">{talentDemographics.upskillSuccess.avgSalaryBoost}</div>
            <p className="text-xs text-muted-foreground">Average salary boost</p>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="w-4 h-4 text-ai-success" />
              Job Placement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai-increase">{talentDemographics.upskillSuccess.jobPlacementRate}%</div>
            <p className="text-xs text-muted-foreground">Successfully placed in jobs</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-gradient-to-br from-background via-background/95 to-ai-primary/5">
        <LeadershipSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Header Section */}
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-ai-primary/10">
            <div className="p-4 lg:p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-ai-primary via-ai-secondary to-ai-accent bg-clip-text text-transparent mb-1">
                    Leadership Intelligence Hub
                  </h1>
                  <p className="text-muted-foreground text-sm lg:text-base">
                    Advanced analytics, insights, and strategic intelligence for UAE talent ecosystem
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-3 lg:mt-0">
                  <Button
                    onClick={() => setShowAIAssistant(true)}
                    className="bg-gradient-to-r from-ai-primary to-ai-secondary hover:from-ai-primary/90 hover:to-ai-secondary/90 text-white shadow-lg"
                  >
                    <Brain className="w-4 h-4 mr-2" />
                    AI Assistant
                  </Button>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-ai-success/10 text-ai-success border-ai-success/20 shadow-sm">
                      <Activity className="w-3 h-3 mr-1" />
                      Live System
                    </Badge>
                    <Badge variant="outline" className="border-ai-primary/20 text-ai-primary shadow-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      Real-time Analytics
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-auto p-4 lg:p-6">
            {activeTab === "overview" && renderOverview()}
            {activeTab === "skills-observatory" && <AISkillsObservatory />}
            {activeTab === "workforce-trends" && <WorkforceTrends />}
            {activeTab === "forecast-report" && <ForecastReport />}
            {activeTab === "strategic-planning" && <StrategicPlanning />}
            {activeTab === "deep-analytics" && <DeepAnalytics />}
          </div>
        </main>

        {/* Chart Modal */}
        <Dialog open={showChartModal} onOpenChange={setShowChartModal}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                {chartTitle}
                <div className="flex gap-2">
                  <Select value={selectedChartType} onValueChange={setSelectedChartType}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bar">Bar Chart</SelectItem>
                      <SelectItem value="line">Line Chart</SelectItem>
                      <SelectItem value="pie">Pie Chart</SelectItem>
                      <SelectItem value="area">Area Chart</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </DialogTitle>
            </DialogHeader>
            
            {isGeneratingChart ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-ai-primary/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
                  <Sparkles className="w-8 h-8 text-ai-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI Generating Visualization</h3>
                <p className="text-muted-foreground mb-4">Analyzing data patterns and creating insights...</p>
                <div className="w-full max-w-xs">
                  <Progress value={generationProgress} className="mb-2" />
                  <p className="text-center text-sm text-muted-foreground">{Math.round(generationProgress)}% Complete</p>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                {renderChart()}
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Leadership AI Assistant */}
        {showAIAssistant && <LeadershipAIAssistant />}
      </div>
    </SidebarProvider>
  );
};

export default LeadershipDashboard;