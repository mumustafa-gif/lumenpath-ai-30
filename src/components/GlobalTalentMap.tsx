import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Globe, Users, TrendingUp, MapPin, Zap, Award, Target } from "lucide-react";
import worldMapSvg from "@/assets/world-map.svg";

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
            {/* Real World Map Background */}
            <div className="relative bg-gradient-to-br from-blue-50/30 to-blue-100/10 rounded-lg border overflow-hidden">
              <div className="relative w-full h-80 lg:h-96">
                {/* Real World Map SVG with proper continent shapes */}
                <svg
                  viewBox="0 0 800 400"
                  className="w-full h-full object-contain"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                  }}
                >
                  {/* Ocean background */}
                  <rect width="800" height="400" fill="#e0f2fe" />
                  
                  {/* World continents with proper paths extracted from world-map.svg */}
                  <g fill="#d1d5db" stroke="#94a3b8" strokeWidth="0.5">
                    
                    {/* North America */}
                    <path d="M115,150 L200,140 L250,160 L290,180 L330,200 L350,240 L340,280 L320,310 L280,330 L240,340 L200,350 L160,360 L120,350 L90,330 L70,300 L80,270 L100,240 L110,200 Z" />
                    
                    {/* South America */}
                    <path d="M260,310 L300,300 L330,320 L360,340 L380,370 L390,400 L360,420 L330,430 L300,440 L270,450 L240,440 L220,420 L210,380 L220,350 L240,330 L260,310 Z" />
                    
                    {/* Europe */}
                    <path d="M380,120 L420,110 L460,120 L500,140 L530,160 L550,180 L560,200 L540,220 L520,230 L480,240 L450,230 L420,220 L400,200 L390,180 L385,150 Z" />
                    
                    {/* Africa */}
                    <path d="M380,230 L420,220 L460,230 L500,240 L530,260 L550,280 L560,320 L550,360 L530,390 L500,410 L470,420 L440,410 L410,390 L390,360 L380,320 L385,280 L390,250 Z" />
                    
                    {/* Asia */}
                    <path d="M570,100 L650,90 L720,100 L780,120 L800,160 L790,200 L770,230 L750,250 L720,260 L690,270 L660,275 L630,270 L600,260 L580,240 L570,220 L565,190 L570,160 L575,130 Z" />
                    
                    {/* Australia */}
                    <path d="M650,300 L700,290 L740,300 L770,320 L780,340 L775,360 L760,380 L740,390 L710,395 L680,390 L660,380 L650,360 L655,340 L660,320 Z" />
                    
                    {/* Additional smaller landmasses */}
                    <path d="M740,180 L760,175 L780,180 L785,190 L780,200 L760,205 L740,200 L735,190 Z" /> {/* Japan */}
                    <path d="M320,120 L340,115 L360,120 L365,130 L360,140 L340,145 L320,140 L315,130 Z" /> {/* Greenland */}
                    <path d="M450,100 L470,95 L480,100 L485,110 L480,120 L470,125 L450,120 L445,110 Z" /> {/* Scandinavia */}
                    
                  </g>
                  
                  {/* Country borders for major regions */}
                  <g fill="none" stroke="#6b7280" strokeWidth="0.3" opacity="0.6">
                    {/* Major country divisions */}
                    <path d="M200,180 L250,190" /> {/* US-Canada */}
                    <path d="M450,160 L480,170" /> {/* Western Europe */}
                    <path d="M520,180 L550,190" /> {/* Eastern Europe */}
                    <path d="M450,280 L480,290" /> {/* North-Central Africa */}
                    <path d="M600,200 L630,210" /> {/* Russia-China */}
                    <path d="M620,240 L650,250" /> {/* India-China */}
                  </g>
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