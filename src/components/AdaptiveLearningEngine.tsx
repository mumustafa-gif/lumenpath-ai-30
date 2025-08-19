import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Target,
  Zap,
  BookOpen,
  ArrowRight,
  Lightbulb,
  RotateCcw
} from "lucide-react";

interface LearnerPerformance {
  moduleId: string;
  moduleName: string;
  quizScore: number;
  timeSpent: number; // in minutes
  retryCount: number;
  engagementScore: number; // 0-1
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
}

interface AdaptiveRecommendation {
  type: 'reorder' | 'difficulty_adjust' | 'remedial' | 'accelerate' | 'review';
  moduleId: string;
  moduleName: string;
  reason: string;
  action: string;
  priority: 'low' | 'medium' | 'high';
  estimatedImpact: string;
}

interface AdaptiveLearningEngineProps {
  learnerData?: {
    currentModule: string;
    overallProgress: number;
    weakAreas: string[];
    strengths: string[];
  };
}

const AdaptiveLearningEngine = ({ learnerData }: AdaptiveLearningEngineProps) => {
  const [performance] = useState<LearnerPerformance[]>([
    {
      moduleId: "1",
      moduleName: "Python Basics",
      quizScore: 95,
      timeSpent: 45,
      retryCount: 0,
      engagementScore: 0.9,
      difficulty: 'easy',
      completed: true
    },
    {
      moduleId: "2", 
      moduleName: "Statistics Fundamentals",
      quizScore: 72,
      timeSpent: 120,
      retryCount: 2,
      engagementScore: 0.6,
      difficulty: 'medium',
      completed: true
    },
    {
      moduleId: "3",
      moduleName: "Linear Algebra",
      quizScore: 58,
      timeSpent: 180,
      retryCount: 3,
      engagementScore: 0.4,
      difficulty: 'hard',
      completed: false
    },
    {
      moduleId: "4",
      moduleName: "Machine Learning Intro",
      quizScore: 0,
      timeSpent: 15,
      retryCount: 0,
      engagementScore: 0.8,
      difficulty: 'medium',
      completed: false
    }
  ]);

  const [recommendations, setRecommendations] = useState<AdaptiveRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Simulate RL-based adaptive recommendations
  useEffect(() => {
    const generateRecommendations = () => {
      const newRecommendations: AdaptiveRecommendation[] = [];

      performance.forEach((perf) => {
        // Low quiz score with high retry count = needs remedial content
        if (perf.quizScore < 70 && perf.retryCount > 1) {
          newRecommendations.push({
            type: 'remedial',
            moduleId: perf.moduleId,
            moduleName: perf.moduleName,
            reason: `Quiz score ${perf.quizScore}% with ${perf.retryCount} retries indicates knowledge gaps`,
            action: 'Insert prerequisite content and practice exercises',
            priority: 'high',
            estimatedImpact: '+15-20% score improvement'
          });
        }

        // High score with low time = can accelerate
        if (perf.quizScore > 90 && perf.timeSpent < 60) {
          newRecommendations.push({
            type: 'accelerate',
            moduleId: perf.moduleId,
            moduleName: perf.moduleName,
            reason: `Excellent performance (${perf.quizScore}%) in minimal time`,
            action: 'Skip intermediate exercises, unlock advanced content early',
            priority: 'medium',
            estimatedImpact: '2-3 days time savings'
          });
        }

        // Low engagement with reasonable score = difficulty adjustment
        if (perf.engagementScore < 0.5 && perf.quizScore > 60) {
          newRecommendations.push({
            type: 'difficulty_adjust',
            moduleId: perf.moduleId,
            moduleName: perf.moduleName,
            reason: `Low engagement (${Math.round(perf.engagementScore * 100)}%) despite adequate performance`,
            action: 'Add interactive elements and gamification',
            priority: 'medium',
            estimatedImpact: '+30% engagement boost'
          });
        }

        // Module order optimization
        if (perf.moduleId === "4" && performance.find(p => p.moduleId === "3" && !p.completed)) {
          newRecommendations.push({
            type: 'reorder',
            moduleId: perf.moduleId,
            moduleName: perf.moduleName,
            reason: 'Prerequisites not fully mastered',
            action: 'Defer until Linear Algebra is completed with 75%+ score',
            priority: 'high',
            estimatedImpact: 'Better foundation for ML concepts'
          });
        }
      });

      setRecommendations(newRecommendations);
    };

    setIsAnalyzing(true);
    setTimeout(() => {
      generateRecommendations();
      setIsAnalyzing(false);
    }, 1500); // Simulate AI processing time
  }, [performance]);

  const getPerformanceIcon = (perf: LearnerPerformance) => {
    if (perf.quizScore >= 90) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (perf.quizScore >= 70) return <Target className="w-4 h-4 text-yellow-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'remedial': return <RotateCcw className="w-4 h-4 text-orange-500" />;
      case 'accelerate': return <Zap className="w-4 h-4 text-green-500" />;
      case 'difficulty_adjust': return <Target className="w-4 h-4 text-blue-500" />;
      case 'reorder': return <ArrowRight className="w-4 h-4 text-purple-500" />;
      default: return <Lightbulb className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'secondary';
    }
  };

  const applyRecommendation = (rec: AdaptiveRecommendation) => {
    // Simulate applying the recommendation
    console.log('Applying recommendation:', rec);
    setRecommendations(prev => prev.filter(r => r.moduleId !== rec.moduleId || r.type !== rec.type));
  };

  return (
    <div className="space-y-6">
      {/* RL Engine Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-ai-primary" />
            Adaptive Learning Engine
            {isAnalyzing && (
              <div className="ml-2 w-4 h-4 border-2 border-ai-primary border-t-transparent rounded-full animate-spin" />
            )}
          </CardTitle>
          <CardDescription>
            AI-powered recommendations based on your learning patterns and performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-ai-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-ai-primary">{recommendations.length}</div>
              <div className="text-sm text-muted-foreground">Active Recommendations</div>
            </div>
            <div className="text-center p-4 bg-green-500/5 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {performance.filter(p => p.quizScore >= 70).length}
              </div>
              <div className="text-sm text-muted-foreground">Modules Mastered</div>
            </div>
            <div className="text-center p-4 bg-orange-500/5 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {performance.filter(p => p.retryCount > 1).length}
              </div>
              <div className="text-sm text-muted-foreground">Areas Need Support</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Performance Analysis</CardTitle>
          <CardDescription>Your progress and engagement patterns across modules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {performance.map((perf) => (
              <div key={perf.moduleId} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getPerformanceIcon(perf)}
                    <h4 className="font-medium">{perf.moduleName}</h4>
                    <Badge variant={perf.completed ? "default" : "secondary"}>
                      {perf.completed ? "Completed" : "In Progress"}
                    </Badge>
                  </div>
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <span>Score: {perf.quizScore}%</span>
                    <span>Time: {perf.timeSpent}m</span>
                    {perf.retryCount > 0 && <span>Retries: {perf.retryCount}</span>}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Quiz Performance</div>
                    <Progress value={perf.quizScore} className="h-2" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground mb-1">Engagement</div>
                    <Progress value={perf.engagementScore * 100} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Recommendations</CardTitle>
          <CardDescription>
            Based on reinforcement learning analysis of your performance patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          {recommendations.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-medium mb-2">All Optimized!</h3>
              <p className="text-sm text-muted-foreground">
                Your learning path is currently optimized. Keep up the great work!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <Alert key={`${rec.moduleId}-${rec.type}-${index}`} className="border-l-4 border-l-ai-primary">
                  <div className="flex items-start space-x-3">
                    {getRecommendationIcon(rec.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{rec.moduleName}</h4>
                        <Badge variant={getPriorityColor(rec.priority)}>
                          {rec.priority} priority
                        </Badge>
                      </div>
                      <AlertDescription className="mb-3">
                        <strong>Issue:</strong> {rec.reason}
                        <br />
                        <strong>Recommendation:</strong> {rec.action}
                        <br />
                        <strong>Expected Impact:</strong> {rec.estimatedImpact}
                      </AlertDescription>
                      <div className="flex justify-between items-center">
                        <Badge variant="outline" className="text-xs">
                          {rec.type.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Button 
                          size="sm" 
                          onClick={() => applyRecommendation(rec)}
                          className="bg-gradient-to-r from-ai-primary to-ai-accent text-white"
                        >
                          Apply Recommendation
                        </Button>
                      </div>
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Learning Path Optimization */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2 text-ai-accent" />
            Optimized Learning Path
          </CardTitle>
          <CardDescription>
            Your personalized sequence based on performance and goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Statistics Review", status: "recommended", reason: "Strengthen foundation for ML" },
              { name: "Linear Algebra Deep Dive", status: "current", reason: "Current struggle area" },
              { name: "Python Data Libraries", status: "next", reason: "Skip basics, focus advanced" },
              { name: "Machine Learning Intro", status: "deferred", reason: "Wait for prerequisites" },
              { name: "Neural Networks", status: "future", reason: "Advanced track unlocked" }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    item.status === 'current' ? 'bg-ai-primary' :
                    item.status === 'recommended' ? 'bg-orange-500' :
                    item.status === 'next' ? 'bg-green-500' :
                    item.status === 'deferred' ? 'bg-red-500' :
                    'bg-gray-300'
                  }`} />
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <Badge 
                    variant="outline" 
                    className={
                      item.status === 'current' ? 'border-ai-primary text-ai-primary' :
                      item.status === 'recommended' ? 'border-orange-500 text-orange-500' :
                      'border-gray-300'
                    }
                  >
                    {item.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{item.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdaptiveLearningEngine;