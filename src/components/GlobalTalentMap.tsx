import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Users, TrendingUp, MapPin, Zap, Award, Target } from "lucide-react";

const GlobalTalentMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // Global talent data with dummy information
  const globalTalentData = [
    { 
      region: "North America", 
      country: "United States",
      coordinates: { x: 240, y: 180 },
      professionals: 125000, 
      skillGap: 28, 
      topSkills: ["AI/ML", "Cloud Computing", "Cybersecurity"], 
      avgSalary: 95000, 
      growth: "+22%",
      demandLevel: "Critical",
      color: "hsl(var(--ai-error))"
    },
    { 
      region: "North America", 
      country: "Canada",
      coordinates: { x: 220, y: 140 },
      professionals: 45000, 
      skillGap: 32, 
      topSkills: ["Data Science", "DevOps", "Full-Stack Development"], 
      avgSalary: 78000, 
      growth: "+18%",
      demandLevel: "High",
      color: "hsl(var(--ai-warning))"
    },
    { 
      region: "Europe", 
      country: "United Kingdom",
      coordinates: { x: 480, y: 160 },
      professionals: 89000, 
      skillGap: 35, 
      topSkills: ["Fintech", "AI Ethics", "Quantum Computing"], 
      avgSalary: 72000, 
      growth: "+15%",
      demandLevel: "High",
      color: "hsl(var(--ai-warning))"
    },
    { 
      region: "Europe", 
      country: "Germany",
      coordinates: { x: 510, y: 170 },
      professionals: 78000, 
      skillGap: 29, 
      topSkills: ["Industry 4.0", "IoT", "Robotics"], 
      avgSalary: 68000, 
      growth: "+20%",
      demandLevel: "Critical",
      color: "hsl(var(--ai-error))"
    },
    { 
      region: "Middle East", 
      country: "UAE",
      coordinates: { x: 560, y: 240 },
      professionals: 34500, 
      skillGap: 42, 
      topSkills: ["Smart Cities", "Blockchain", "Green Tech"], 
      avgSalary: 85000, 
      growth: "+35%",
      demandLevel: "Critical",
      color: "hsl(var(--ai-error))"
    },
    { 
      region: "Asia Pacific", 
      country: "Singapore",
      coordinates: { x: 680, y: 280 },
      professionals: 67000, 
      skillGap: 25, 
      topSkills: ["Fintech", "Maritime Tech", "Supply Chain"], 
      avgSalary: 76000, 
      growth: "+28%",
      demandLevel: "Medium",
      color: "hsl(var(--ai-primary))"
    },
    { 
      region: "Asia Pacific", 
      country: "India",
      coordinates: { x: 620, y: 260 },
      professionals: 156000, 
      skillGap: 18, 
      topSkills: ["Software Development", "Data Analytics", "Mobile Apps"], 
      avgSalary: 32000, 
      growth: "+40%",
      demandLevel: "Medium",
      color: "hsl(var(--ai-primary))"
    },
    { 
      region: "Asia Pacific", 
      country: "Japan",
      coordinates: { x: 740, y: 220 },
      professionals: 98000, 
      skillGap: 31, 
      topSkills: ["Robotics", "Gaming Tech", "Manufacturing AI"], 
      avgSalary: 65000, 
      growth: "+12%",
      demandLevel: "High",
      color: "hsl(var(--ai-warning))"
    },
    { 
      region: "Asia Pacific", 
      country: "Australia",
      coordinates: { x: 720, y: 360 },
      professionals: 52000, 
      skillGap: 27, 
      topSkills: ["Mining Tech", "Renewable Energy", "AgriTech"], 
      avgSalary: 71000, 
      growth: "+17%",
      demandLevel: "Medium",
      color: "hsl(var(--ai-primary))"
    },
    { 
      region: "South America", 
      country: "Brazil",
      coordinates: { x: 310, y: 320 },
      professionals: 43000, 
      skillGap: 38, 
      topSkills: ["E-commerce", "Digital Banking", "Entertainment Tech"], 
      avgSalary: 28000, 
      growth: "+25%",
      demandLevel: "High",
      color: "hsl(var(--ai-warning))"
    },
    { 
      region: "Africa", 
      country: "South Africa",
      coordinates: { x: 520, y: 340 },
      professionals: 29000, 
      skillGap: 45, 
      topSkills: ["Mobile Development", "Digital Payments", "EdTech"], 
      avgSalary: 22000, 
      growth: "+30%",
      demandLevel: "High",
      color: "hsl(var(--ai-warning))"
    },
  ];

  const getDemandColor = (level: string) => {
    switch (level) {
      case "Critical": return "hsl(var(--ai-error))";
      case "High": return "hsl(var(--ai-warning))";
      case "Medium": return "hsl(var(--ai-primary))";
      default: return "hsl(var(--ai-success))";
    }
  };

  const getDemandBadgeVariant = (level: string) => {
    switch (level) {
      case "Critical": return "destructive";
      case "High": return "secondary";
      case "Medium": return "default";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-ai-primary" />
            Global Talent & Skills Distribution
          </CardTitle>
          <CardDescription>
            Interactive world map showing talent density, skill gaps, and demand levels across different regions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* World Map SVG Background */}
            <div className="relative bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg border-2 border-dashed border-muted-foreground/20 overflow-hidden">
              <svg
                viewBox="0 0 800 400"
                className="w-full h-80 lg:h-96"
                style={{ background: 'linear-gradient(135deg, hsl(var(--muted)) 0%, hsl(var(--muted))/0.5 100%)' }}
              >
                {/* Simplified World Map Paths */}
                <g fill="hsl(var(--muted-foreground))" fillOpacity="0.1" stroke="hsl(var(--muted-foreground))" strokeWidth="0.5">
                  {/* North America */}
                  <path d="M 50 50 L 300 50 L 320 120 L 280 180 L 200 200 L 100 190 L 80 140 Z" />
                  {/* Europe */}
                  <path d="M 400 50 L 580 60 L 590 120 L 560 160 L 480 150 L 420 120 Z" />
                  {/* Asia */}
                  <path d="M 580 50 L 780 70 L 770 200 L 720 280 L 600 250 L 590 120 Z" />
                  {/* Africa */}
                  <path d="M 420 160 L 580 170 L 590 280 L 560 380 L 480 390 L 430 320 L 420 200 Z" />
                  {/* South America */}
                  <path d="M 200 200 L 350 220 L 370 350 L 320 390 L 280 380 L 250 300 Z" />
                  {/* Australia */}
                  <path d="M 650 320 L 750 330 L 760 380 L 720 390 L 660 380 Z" />
                </g>
                
                {/* Talent Data Points */}
                {globalTalentData.map((location, index) => (
                  <g key={index}>
                    {/* Connection lines for regional grouping */}
                    <circle
                      cx={location.coordinates.x}
                      cy={location.coordinates.y}
                      r={Math.sqrt(location.professionals / 1000) + 5}
                      fill={getDemandColor(location.demandLevel)}
                      fillOpacity={hoveredRegion === location.country ? 0.8 : 0.6}
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer transition-all duration-300 hover:r-8"
                      onMouseEnter={() => setHoveredRegion(location.country)}
                      onMouseLeave={() => setHoveredRegion(null)}
                      onClick={() => setSelectedRegion(selectedRegion === location.country ? null : location.country)}
                      style={{
                        filter: hoveredRegion === location.country ? 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))' : 'none',
                        transform: hoveredRegion === location.country ? 'scale(1.1)' : 'scale(1)',
                        transformOrigin: `${location.coordinates.x}px ${location.coordinates.y}px`
                      }}
                    />
                    
                    {/* Country Labels */}
                    <text
                      x={location.coordinates.x}
                      y={location.coordinates.y - Math.sqrt(location.professionals / 1000) - 12}
                      textAnchor="middle"
                      className="text-xs font-medium fill-foreground"
                      style={{ userSelect: 'none' }}
                    >
                      {location.country}
                    </text>
                    
                    {/* Professional count */}
                    <text
                      x={location.coordinates.x}
                      y={location.coordinates.y + 4}
                      textAnchor="middle"
                      className="text-xs font-bold fill-white"
                      style={{ userSelect: 'none' }}
                    >
                      {(location.professionals / 1000).toFixed(0)}k
                    </text>
                  </g>
                ))}
              </svg>
              
              {/* Legend */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border shadow-lg">
                <h4 className="text-sm font-semibold mb-2">Demand Levels</h4>
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'hsl(var(--ai-error))'}}></div>
                    <span>Critical</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'hsl(var(--ai-warning))'}}></div>
                    <span>High</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{backgroundColor: 'hsl(var(--ai-primary))'}}></div>
                    <span>Medium</span>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Circle size = Talent pool
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Selected Region Details */}
      {selectedRegion && (
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-ai-primary" />
              {globalTalentData.find(r => r.country === selectedRegion)?.country} Talent Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(() => {
              const region = globalTalentData.find(r => r.country === selectedRegion);
              if (!region) return null;
              
              return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-ai-primary" />
                      <span className="text-sm font-medium">Professionals</span>
                    </div>
                    <p className="text-2xl font-bold">{region.professionals.toLocaleString()}</p>
                    <Badge variant={getDemandBadgeVariant(region.demandLevel)}>
                      {region.demandLevel} Demand
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-amber-500" />
                      <span className="text-sm font-medium">Skill Gap</span>
                    </div>
                    <p className="text-2xl font-bold text-amber-600">{region.skillGap}%</p>
                    <p className="text-xs text-muted-foreground">Market vs Supply</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-ai-success" />
                      <span className="text-sm font-medium">Growth Rate</span>
                    </div>
                    <p className="text-2xl font-bold text-ai-success">{region.growth}</p>
                    <p className="text-xs text-muted-foreground">Year over year</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-ai-accent" />
                      <span className="text-sm font-medium">Avg Salary</span>
                    </div>
                    <p className="text-2xl font-bold">${(region.avgSalary / 1000).toFixed(0)}k</p>
                    <p className="text-xs text-muted-foreground">USD per year</p>
                  </div>
                  
                  <div className="md:col-span-2 lg:col-span-4 mt-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-ai-secondary" />
                      Top In-Demand Skills
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {region.topSkills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="border-ai-primary/20 text-ai-primary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Regional Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Global Talent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{globalTalentData.reduce((sum, region) => sum + region.professionals, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across {globalTalentData.length} key markets</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg Skill Gap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {Math.round(globalTalentData.reduce((sum, region) => sum + region.skillGap, 0) / globalTalentData.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Critical shortage areas</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Critical Demand Regions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai-error">
              {globalTalentData.filter(region => region.demandLevel === "Critical").length}
            </div>
            <p className="text-xs text-muted-foreground">Need immediate attention</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-card bg-gradient-to-br from-card to-card/90">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fastest Growing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-ai-success">
              {globalTalentData.find(region => 
                Math.max(...globalTalentData.map(r => parseInt(r.growth.replace('%', '').replace('+', ''))))
                === parseInt(region.growth.replace('%', '').replace('+', ''))
              )?.country}
            </div>
            <p className="text-xs text-muted-foreground">
              {globalTalentData.find(region => 
                Math.max(...globalTalentData.map(r => parseInt(r.growth.replace('%', '').replace('+', ''))))
                === parseInt(region.growth.replace('%', '').replace('+', ''))
              )?.growth} growth rate
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GlobalTalentMap;