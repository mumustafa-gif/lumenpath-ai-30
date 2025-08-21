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

  const globalComparison = {
    singapore: { aiTalent: 78, demandGrowth: "+35%", avgSalary: 98000 },
    london: { aiTalent: 85, demandGrowth: "+28%", avgSalary: 105000 },
    toronto: { aiTalent: 72, demandGrowth: "+32%", avgSalary: 88000 },
    berlin: { aiTalent: 69, demandGrowth: "+30%", avgSalary: 82000 },
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
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                  <SelectItem value="design">Design & Creative</SelectItem>
                </SelectContent>
              </Select>
              <Select value={comparisonRegion} onValueChange={setComparisonRegion}>
                <SelectTrigger className="w-40 bg-card/50 backdrop-blur-sm border-secondary/20">
                  <Globe className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Compare with..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Comparison</SelectItem>
                  <SelectItem value="singapore">Singapore</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="toronto">Toronto</SelectItem>
                  <SelectItem value="berlin">Berlin</SelectItem>
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

      {/* Global Comparison */}
      {comparisonRegion !== "none" && globalComparison[comparisonRegion] && (
        <Card className="border-0 bg-gradient-to-br from-card/50 via-card to-accent/5 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-accent" />
              Global Comparison: UAE vs {comparisonRegion.charAt(0).toUpperCase() + comparisonRegion.slice(1)}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-transparent">
                <div className="text-3xl font-bold text-primary mb-2">78%</div>
                <div className="text-sm font-medium mb-1">UAE AI Talent</div>
                <Badge variant="outline" className="text-xs">UAE Position</Badge>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-secondary/10 to-transparent">
                <div className="text-3xl font-bold text-secondary mb-2">{globalComparison[comparisonRegion].aiTalent}%</div>
                <div className="text-sm font-medium mb-1">{comparisonRegion.charAt(0).toUpperCase() + comparisonRegion.slice(1)} AI Talent</div>
                <Badge variant="outline" className="text-xs">Comparison</Badge>
              </div>
              <div className="text-center p-6 rounded-xl bg-gradient-to-br from-accent/10 to-transparent">
                <div className="text-3xl font-bold text-accent mb-2">{globalComparison[comparisonRegion].demandGrowth}</div>
                <div className="text-sm font-medium mb-1">Demand Growth</div>
                <Badge variant="outline" className="text-xs">6 Month Trend</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};