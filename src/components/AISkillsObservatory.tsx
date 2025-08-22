import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Eye, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  Brain, 
  Globe, 
  MapPin, 
  Target,
  BarChart3,
  Activity,
  Zap,
  Search,
  Lightbulb
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const AISkillsObservatory = () => {
  const [selectedRegion, setSelectedRegion] = useState("uae");
  const [comparisonRegion, setComparisonRegion] = useState("none");
  const [selectedSkillCategory, setSelectedSkillCategory] = useState("all");

  const skillSupplyDemand = [
    { skill: "AI/ML Engineering", supply: 23, demand: 87, gap: 64, trend: "Critical", growth: "+45%", category: "technology", salary: 145000 },
    { skill: "Cloud Architecture", supply: 34, demand: 89, gap: 55, trend: "High", growth: "+38%", category: "technology", salary: 135000 },
    { skill: "Data Science", supply: 42, demand: 78, gap: 36, trend: "Medium", growth: "+28%", category: "technology", salary: 125000 },
    { skill: "Cybersecurity", supply: 31, demand: 85, gap: 54, trend: "High", growth: "+42%", category: "technology", salary: 128000 },
    { skill: "DevOps Engineering", supply: 48, demand: 72, gap: 24, trend: "Low", growth: "+22%", category: "technology", salary: 118000 },
    { skill: "Full-Stack Development", supply: 65, demand: 71, gap: 6, trend: "Balanced", growth: "+15%", category: "technology", salary: 95000 },
    { skill: "Digital Marketing", supply: 58, demand: 73, gap: 15, trend: "Low", growth: "+18%", category: "business", salary: 75000 },
    { skill: "UX/UI Design", supply: 45, demand: 76, gap: 31, trend: "Medium", growth: "+32%", category: "design", salary: 88000 },
  ];

  const uaeRegionsComparison = {
    dubai: { aiTalent: 85, demandGrowth: "+42%", avgSalary: 125000 },
    abudhabi: { aiTalent: 78, demandGrowth: "+38%", avgSalary: 118000 },
    sharjah: { aiTalent: 72, demandGrowth: "+35%", avgSalary: 98000 },
    ajman: { aiTalent: 68, demandGrowth: "+32%", avgSalary: 88000 },
    ras_al_khaimah: { aiTalent: 65, demandGrowth: "+28%", avgSalary: 85000 },
    fujairah: { aiTalent: 62, demandGrowth: "+25%", avgSalary: 78000 },
    umm_al_quwain: { aiTalent: 58, demandGrowth: "+22%", avgSalary: 72000 },
  };

  const filteredSkills = selectedSkillCategory === "all" 
    ? skillSupplyDemand 
    : skillSupplyDemand.filter(skill => skill.category === selectedSkillCategory);

  const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))'];

  return (
    <div className="space-y-8 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 rounded-3xl">
      {/* Futuristic Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 blur-3xl opacity-30"></div>
        <div className="relative bg-card/50 backdrop-blur-xl rounded-2xl p-6 border border-primary/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-2 flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                AI Skills Observatory
              </h2>
              <p className="text-muted-foreground flex items-center gap-2">
                <Activity className="w-4 h-4 text-accent" />
                Real-time insights into skill supply, demand, and market trends across UAE
              </p>
            </div>
            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <Select value={selectedSkillCategory} onValueChange={setSelectedSkillCategory}>
                <SelectTrigger className="w-40 bg-card/50 backdrop-blur-sm border-primary/20">
                  <Search className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technology">Technology & IT</SelectItem>
                  <SelectItem value="business">Business & Management</SelectItem>
                  <SelectItem value="design">Design & Creative</SelectItem>
                  <SelectItem value="healthcare">Healthcare & Medical</SelectItem>
                  <SelectItem value="finance">Finance & Banking</SelectItem>
                  <SelectItem value="marketing">Marketing & Sales</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="education">Education & Training</SelectItem>
                  <SelectItem value="retail">Retail & E-commerce</SelectItem>
                  <SelectItem value="hospitality">Hospitality & Tourism</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                </SelectContent>
              </Select>
              <Select value={comparisonRegion} onValueChange={setComparisonRegion}>
                <SelectTrigger className="w-40 bg-card/50 backdrop-blur-sm border-secondary/20">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Compare with..." />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <SelectItem value="none">No Comparison</SelectItem>
                  <SelectItem value="dubai">Dubai</SelectItem>
                  <SelectItem value="abudhabi">Abu Dhabi</SelectItem>
                  <SelectItem value="sharjah">Sharjah</SelectItem>
                  <SelectItem value="ajman">Ajman</SelectItem>
                  <SelectItem value="ras_al_khaimah">Ras Al Khaimah</SelectItem>
                  <SelectItem value="fujairah">Fujairah</SelectItem>
                  <SelectItem value="umm_al_quwain">Umm Al Quwain</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 bg-gradient-to-br from-destructive/10 via-card to-destructive/5 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Skills Gap</CardTitle>
            <div className="p-2 bg-destructive/20 rounded-full">
              <AlertTriangle className="h-4 w-4 text-destructive animate-pulse" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">64%</div>
            <p className="text-xs text-muted-foreground">AI/ML Engineering highest gap</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-gradient-to-br from-primary/10 via-card to-primary/5 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Talent Pool</CardTitle>
            <div className="p-2 bg-primary/20 rounded-full">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">34,500</div>
            <p className="text-xs text-muted-foreground">Active professionals in UAE</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-gradient-to-br from-emerald-500/10 via-card to-emerald-500/5 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <div className="p-2 bg-emerald-500/20 rounded-full">
              <TrendingUp className="h-4 w-4 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-500">+32%</div>
            <p className="text-xs text-muted-foreground">Average skill demand growth</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 bg-gradient-to-br from-secondary/10 via-card to-secondary/5 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Value</CardTitle>
            <div className="p-2 bg-secondary/20 rounded-full">
              <Target className="h-4 w-4 text-secondary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">$2.3B</div>
            <p className="text-xs text-muted-foreground">Total market opportunity</p>
          </CardContent>
        </Card>
      </div>

      {/* Skills Analysis */}
      <Card className="border-0 bg-gradient-to-br from-card/50 via-card to-primary/5 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            UAE Skills Supply vs Demand Matrix
          </CardTitle>
          <CardDescription>
            Real-time market gaps and opportunities in {selectedSkillCategory === "all" ? "all categories" : selectedSkillCategory}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={filteredSkills}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis 
                dataKey="skill" 
                angle={-45} 
                textAnchor="end" 
                height={100}
                fontSize={11}
                stroke="hsl(var(--muted-foreground))"
              />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Bar dataKey="supply" fill="hsl(var(--secondary))" name="Current Supply %" radius={[2, 2, 0, 0]} />
              <Bar dataKey="demand" fill="hsl(var(--primary))" name="Market Demand %" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
            {filteredSkills.slice(0, 6).map((skill, index) => (
              <div key={index} className="p-3 rounded-lg bg-muted/30 backdrop-blur-sm border border-primary/10">
                <h4 className="font-medium text-sm mb-1">{skill.skill}</h4>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Gap: {skill.gap}%</span>
                  <Badge variant={skill.trend === "Critical" ? "destructive" : skill.trend === "High" ? "secondary" : "outline"} className="h-5 text-xs">
                    {skill.trend}
                  </Badge>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-emerald-600">{skill.growth}</span>
                  <span>${(skill.salary / 1000).toFixed(0)}k</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* UAE Regional Comparison & Interactive Map */}
      {comparisonRegion !== "none" && uaeRegionsComparison[comparisonRegion] && (
        <Card className="border-0 bg-gradient-to-br from-card/50 via-card to-ai-accent/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-ai-accent animate-pulse" />
              UAE Regional Intelligence: Comparative Analysis - {comparisonRegion.charAt(0).toUpperCase() + comparisonRegion.slice(1).replace('_', ' ')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-ai-primary/10 to-transparent border border-ai-primary/20">
                <div className="text-3xl font-bold text-ai-primary mb-2">78%</div>
                <div className="text-sm font-medium mb-1">UAE AI Talent Index</div>
                <Badge variant="outline" className="text-xs border-ai-primary/30">Regional Leader</Badge>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-ai-secondary/10 to-transparent border border-ai-secondary/20">
                <div className="text-3xl font-bold text-ai-secondary mb-2">{uaeRegionsComparison[comparisonRegion].aiTalent}%</div>
                <div className="text-sm font-medium mb-1">{comparisonRegion.charAt(0).toUpperCase() + comparisonRegion.slice(1).replace('_', ' ')} AI Talent</div>
                <Badge variant="outline" className="text-xs border-ai-secondary/30">Global Benchmark</Badge>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-ai-success/10 to-transparent border border-ai-success/20">
                <div className="text-3xl font-bold text-ai-success mb-2">{uaeRegionsComparison[comparisonRegion].demandGrowth}</div>
                <div className="text-sm font-medium mb-1">Demand Growth Rate</div>
                <Badge variant="outline" className="text-xs border-ai-success/30">6M Trend</Badge>
              </div>
            </div>
            
            {/* Futuristic World Map Visualization */}
            <div className="relative h-80 bg-gradient-to-br from-ai-primary/5 via-background to-ai-secondary/5 rounded-2xl border border-ai-primary/20 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_70%)]"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <Globe className="w-20 h-20 text-ai-primary mx-auto animate-spin" style={{ animationDuration: '20s' }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-ai-primary/20 to-ai-secondary/20 rounded-full blur-xl"></div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-ai-primary">Interactive UAE Regional Map</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Real-time visualization of skill gaps, talent distribution, and market opportunities across UAE emirates
                    </p>
                    <div className="flex justify-center gap-2 mt-4">
                      <Badge variant="outline" className="bg-ai-primary/10 text-ai-primary border-ai-primary/30">
                        🟢 High Demand
                      </Badge>
                      <Badge variant="outline" className="bg-ai-warning/10 text-ai-warning border-ai-warning/30">
                        🟡 Medium Gap
                      </Badge>
                      <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30">
                        🔴 Critical Shortage
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Data Points */}
              <div className="absolute top-4 left-4 p-2 bg-card/80 backdrop-blur-sm rounded-lg border border-ai-primary/20">
                <div className="text-xs text-muted-foreground">UAE Position</div>
                <div className="text-sm font-bold text-ai-primary">#4 Global Ranking</div>
              </div>
              <div className="absolute top-4 right-4 p-2 bg-card/80 backdrop-blur-sm rounded-lg border border-ai-success/20">
                <div className="text-xs text-muted-foreground">Growth Rate</div>
                <div className="text-sm font-bold text-ai-success">+32% YoY</div>
              </div>
              <div className="absolute bottom-4 left-4 p-2 bg-card/80 backdrop-blur-sm rounded-lg border border-ai-warning/20">
                <div className="text-xs text-muted-foreground">Talent Pool</div>
                <div className="text-sm font-bold text-ai-warning">34.5K Active</div>
              </div>
              <div className="absolute bottom-4 right-4 p-2 bg-card/80 backdrop-blur-sm rounded-lg border border-ai-secondary/20">
                <div className="text-xs text-muted-foreground">Market Value</div>
                <div className="text-sm font-bold text-ai-secondary">$2.3B Opportunity</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};