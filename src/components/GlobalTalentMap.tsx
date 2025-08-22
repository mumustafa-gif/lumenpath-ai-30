import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Users, TrendingUp, MapPin, Zap, Award, Target } from "lucide-react";
import worldMapSvg from "@/assets/world-map.svg";

const GlobalTalentMap = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  // UAE regional talent data
  const globalTalentData = [
    { 
      region: "UAE", 
      country: "Dubai",
      coordinates: { x: 650, y: 200 },
      professionals: 12500, 
      skillGap: 32, 
      topSkills: ["AI/ML", "Cloud Computing", "Fintech"], 
      avgSalary: 115000, 
      growth: "+18%",
      demandLevel: "Critical",
      color: "hsl(var(--ai-error))"
    },
    { 
      region: "UAE", 
      country: "Abu Dhabi",
      coordinates: { x: 580, y: 220 },
      professionals: 8900, 
      skillGap: 38, 
      topSkills: ["Cybersecurity", "Data Science", "Gov Tech"], 
      avgSalary: 108000, 
      growth: "+15%",
      demandLevel: "High",
      color: "hsl(var(--ai-warning))"
    },
    { 
      region: "UAE", 
      country: "Sharjah",
      coordinates: { x: 670, y: 190 },
      professionals: 5200, 
      skillGap: 42, 
      topSkills: ["Full-Stack Development", "Digital Marketing", "Manufacturing"], 
      avgSalary: 95000, 
      growth: "+12%",
      demandLevel: "High",
      color: "hsl(var(--ai-warning))"
    },
    { 
      region: "UAE", 
      country: "Ajman",
      coordinates: { x: 680, y: 185 },
      professionals: 3100, 
      skillGap: 45, 
      topSkills: ["Web Development", "Data Analysis", "Digital Design"], 
      avgSalary: 88000, 
      growth: "+10%",
      demandLevel: "Medium",
      color: "hsl(var(--ai-primary))"
    },
    { 
      region: "UAE", 
      country: "Ras Al Khaimah",
      coordinates: { x: 690, y: 180 },
      professionals: 2800, 
      skillGap: 48, 
      topSkills: ["Mobile Development", "E-commerce", "Tourism Tech"], 
      avgSalary: 82000, 
      growth: "+8%",
      demandLevel: "Medium",
      color: "hsl(var(--ai-primary))"
    },
    { 
      region: "UAE", 
      country: "Fujairah",
      coordinates: { x: 720, y: 200 },
      professionals: 1900, 
      skillGap: 52, 
      topSkills: ["Digital Marketing", "Basic Programming", "Logistics Tech"], 
      avgSalary: 75000, 
      growth: "+6%",
      demandLevel: "Medium",
      color: "hsl(var(--ai-primary))"
    },
    { 
      region: "UAE", 
      country: "Umm Al Quwain",
      coordinates: { x: 675, y: 175 },
      professionals: 1200, 
      skillGap: 55, 
      topSkills: ["Computer Literacy", "Digital Tools", "Basic Analytics"], 
      avgSalary: 68000, 
      growth: "+4%",
      demandLevel: "Medium",
      color: "hsl(var(--ai-primary))"
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
              UAE Talent & Skills Distribution
            </CardTitle>
            <CardDescription>
              Interactive map showing talent density, skill gaps, and demand levels across UAE emirates
            </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Real World Map Background */}
            <div className="relative bg-gradient-to-br from-blue-50/30 to-blue-100/10 rounded-lg border overflow-hidden">
              <div className="relative w-full h-80 lg:h-96">
                {/* UAE Map SVG */}
                <svg
                  viewBox="0 0 800 400"
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                >
                  {/* Ocean/Background */}
                  <rect width="800" height="400" fill="#f0f9ff" />
                  
                  {/* UAE landmass with proper shape */}
                  <g fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1">
                    {/* Main UAE outline - simplified but recognizable */}
                    <path d="M550,180 L750,170 L780,190 L770,210 L760,230 L740,240 L720,245 L700,250 L680,245 L660,240 L640,235 L620,230 L600,225 L580,220 L560,215 L550,200 Z" />
                    
                    {/* Dubai region */}
                    <path d="M640,195 L660,193 L670,200 L665,210 L650,208 L645,202 Z" />
                    
                    {/* Abu Dhabi region */}
                    <path d="M570,215 L600,212 L610,220 L600,230 L580,228 L575,222 Z" />
                    
                    {/* Sharjah region */}
                    <path d="M665,185 L685,183 L690,190 L685,195 L670,193 Z" />
                    
                    {/* Northern Emirates */}
                    <path d="M690,175 L720,173 L730,180 L725,185 L695,187 Z" />
                    
                    {/* Eastern Emirates */}
                    <path d="M720,195 L740,193 L750,200 L745,210 L730,208 L725,202 Z" />
                  </g>
                  
                  {/* Water/Persian Gulf */}
                  <path d="M500,150 Q600,140 700,150 Q750,160 800,170 L800,180 Q750,170 700,175 Q600,180 500,175 Z" 
                        fill="#bfdbfe" opacity="0.6" />
                  
                  {/* Labels for regions */}
                  <text x="520" y="140" className="text-xs font-medium fill-current" textAnchor="middle">Persian Gulf</text>
                  <text x="550" y="280" className="text-xs font-medium fill-current" textAnchor="middle">Saudi Arabia</text>
                  <text x="780" y="280" className="text-xs font-medium fill-current" textAnchor="middle">Oman</text>
                </svg>
                
                {/* Overlay SVG for data points */}
                <svg
                  viewBox="0 0 800 400"
                  className="absolute inset-0 w-full h-full"
                >
                  {/* Talent Data Points */}
                  {globalTalentData.map((location, index) => (
                    <g key={index}>
                      {/* Data Point Circles */}
                      <circle
                        cx={location.coordinates.x}
                        cy={location.coordinates.y}
                        r={Math.sqrt(location.professionals / 1000) + 6}
                        fill={getDemandColor(location.demandLevel)}
                        fillOpacity={hoveredRegion === location.country ? 0.9 : 0.8}
                        stroke="white"
                        strokeWidth="3"
                        className="cursor-pointer transition-all duration-300 drop-shadow-lg"
                        onMouseEnter={() => setHoveredRegion(location.country)}
                        onMouseLeave={() => setHoveredRegion(null)}
                        onClick={() => setSelectedRegion(selectedRegion === location.country ? null : location.country)}
                        style={{
                          filter: hoveredRegion === location.country ? 'drop-shadow(0 0 12px rgba(59, 130, 246, 0.8))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
                          transform: hoveredRegion === location.country ? 'scale(1.2)' : 'scale(1)',
                          transformOrigin: `${location.coordinates.x}px ${location.coordinates.y}px`
                        }}
                      />
                      
                      {/* Pulsing Effect for Critical Demand */}
                      {location.demandLevel === "Critical" && (
                        <circle
                          cx={location.coordinates.x}
                          cy={location.coordinates.y}
                          r={Math.sqrt(location.professionals / 1000) + 10}
                          fill="none"
                          stroke={getDemandColor(location.demandLevel)}
                          strokeWidth="2"
                          strokeOpacity="0.4"
                          className="animate-ping"
                        />
                      )}
                      
                      {/* Country Labels */}
                      <text
                        x={location.coordinates.x}
                        y={location.coordinates.y - Math.sqrt(location.professionals / 1000) - 15}
                        textAnchor="middle"
                        className="text-xs font-semibold fill-gray-800 drop-shadow-sm"
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
              </div>
              
              {/* Enhanced Legend */}
              <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-md p-4 rounded-lg border shadow-xl">
                <h4 className="text-sm font-semibold mb-3 text-gray-800">Talent Demand Levels</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full animate-pulse" style={{backgroundColor: 'hsl(var(--ai-error))'}}></div>
                    <span className="font-medium">Critical</span>
                    <span className="text-xs text-gray-600">({globalTalentData.filter(r => r.demandLevel === "Critical").length})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{backgroundColor: 'hsl(var(--ai-warning))'}}></div>
                    <span className="font-medium">High</span>
                    <span className="text-xs text-gray-600">({globalTalentData.filter(r => r.demandLevel === "High").length})</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{backgroundColor: 'hsl(var(--ai-primary))'}}></div>
                    <span className="font-medium">Medium</span>
                    <span className="text-xs text-gray-600">({globalTalentData.filter(r => r.demandLevel === "Medium").length})</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="text-xs text-gray-600">
                    <div>• Circle size = Talent pool</div>
                    <div>• Pulsing = Critical demand</div>
                  </div>
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
              {globalTalentData.find(r => r.country === selectedRegion)?.country} Emirates Insights
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
            <CardTitle className="text-sm font-medium">Total UAE Talent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{globalTalentData.reduce((sum, region) => sum + region.professionals, 0).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Across {globalTalentData.length} emirates</p>
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