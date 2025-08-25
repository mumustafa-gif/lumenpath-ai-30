import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Users, GraduationCap, BarChart3, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function SystemFlowPage() {
  const navigate = useNavigate();

  const handleExportPDF = async () => {
    const element = document.getElementById('system-flow-content');
    if (element) {
      const canvas = await html2canvas(element);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('system-flow-guide.pdf');
    }
  };

  const navigateToPersona = (persona: string, tab?: string) => {
    const route = `/${persona}${tab ? `?tab=${tab}` : ''}`;
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate(-1)}>
                ← Back
              </Button>
              <h1 className="text-2xl font-bold">System Flow Guide</h1>
            </div>
            <Button onClick={handleExportPDF} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8" id="system-flow-content">
        {/* Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              System Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              A comprehensive learning ecosystem for UAE market alignment across Student, Faculty, and Leadership personas with UAE-specific segmentation by emirate.
            </p>
            
            {/* System Lifecycle Diagram */}
            <div className="bg-muted/30 p-6 rounded-lg mb-6">
              <h3 className="font-semibold mb-4">System Lifecycle & Feedback Loop</h3>
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">Leadership</Badge>
                  <ArrowRight className="w-4 h-4" />
                  <span>Skills Observatory & Workforce Trends (UAE)</span>
                </div>
                <div className="flex items-center gap-2 mb-2 ml-4">
                  <ArrowRight className="w-4 h-4" />
                  <span>Strategic Priorities</span>
                </div>
                <div className="flex items-center gap-2 mb-2 ml-8">
                  <Badge variant="outline">Faculty</Badge>
                  <ArrowRight className="w-4 h-4" />
                  <span>AI Curriculum/Course Creation</span>
                </div>
                <div className="flex items-center gap-2 mb-2 ml-12">
                  <ArrowRight className="w-4 h-4" />
                  <span>Courses Live to Students</span>
                </div>
                <div className="flex items-center gap-2 mb-2 ml-16">
                  <Badge variant="outline">Student</Badge>
                  <ArrowRight className="w-4 h-4" />
                  <span>Adaptive Learning, Skill Analysis, Mock Interviews, Job Matching</span>
                </div>
                <div className="flex items-center gap-2 mb-2 ml-12">
                  <ArrowRight className="w-4 h-4" />
                  <span>Outcomes & Engagement Telemetry</span>
                </div>
                <div className="flex items-center gap-2 mb-2 ml-8">
                  <ArrowRight className="w-4 h-4" />
                  <span>Analytics feed back to Faculty & Leadership</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-blue-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Student
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Personalized learning journey with UAE market alignment
                  </p>
                  <Button 
                    size="sm" 
                    onClick={() => navigateToPersona('student')}
                    className="w-full"
                  >
                    Go to Student Dashboard
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-green-600" />
                    Faculty
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    AI-powered course creation and student analytics
                  </p>
                  <Button 
                    size="sm" 
                    onClick={() => navigateToPersona('faculty')}
                    className="w-full"
                  >
                    Go to Faculty Dashboard
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-purple-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-purple-600" />
                    Leadership
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Strategic planning with workforce trends and analytics
                  </p>
                  <Button 
                    size="sm" 
                    onClick={() => navigateToPersona('leadership')}
                    className="w-full"
                  >
                    Go to Leadership Dashboard
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Student Flows */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-6 h-6 text-blue-600" />
              Student Persona Flows
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">1. Onboarding & Personalization</h3>
              <p className="text-sm text-muted-foreground mb-3">
                AI Career Path → OnboardingFlow → CourseRecommendations → CoursePreview
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('student', 'dashboard')}
                >
                  Start Journey
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Skill Analysis & Market Alignment</h3>
              <p className="text-sm text-muted-foreground mb-3">
                UAE-specific skill gaps, salary impact, and market demand analysis
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('student', 'skill-analysis')}
                >
                  Skill Analysis
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('student', 'market-comparison')}
                >
                  Market Comparison
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Interview Preparation & Assessment</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Mock interviews with AI avatar and comprehensive skill assessments
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('student', 'mock-interviews')}
                >
                  Mock Interviews
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('student', 'mock-assessments')}
                >
                  Assessments
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">4. Career Tools & Social Learning</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Job matching, resume building, and study buddy connections
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('student', 'job-matching')}
                >
                  Job Matching
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('student', 'resume-builder')}
                >
                  Resume Builder
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('student', 'study-buddies')}
                >
                  Study Buddies
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Faculty Flows */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-green-600" />
              Faculty Persona Flows
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">1. Course Management</h3>
              <p className="text-sm text-muted-foreground mb-3">
                View, edit, and create courses with student progress tracking
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('faculty', 'my-courses')}
                >
                  My Courses
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. AI-Powered Content Creation</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Generate courses and curricula aligned with UAE market demands
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('faculty', 'ai-course-creator')}
                >
                  AI Course Creator
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('faculty', 'ai-curriculum-creator')}
                >
                  AI Curriculum Creator
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">3. Student Analytics</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Track student engagement, progress, and course effectiveness
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('faculty', 'student-analytics')}
                >
                  Student Analytics
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Leadership Flows */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-purple-600" />
              Leadership Persona Flows
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">1. Skills Observatory & Market Intelligence</h3>
              <p className="text-sm text-muted-foreground mb-3">
                UAE emirate-specific skill demand, supply, and emerging trends
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('leadership', 'skills-observatory')}
                >
                  Skills Observatory
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('leadership', 'workforce-trends')}
                >
                  Workforce Trends
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">2. Analytics & Reporting</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Custom analytics, forecasting, and strategic planning insights
              </p>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('leadership', 'deep-analytics')}
                >
                  Deep Analytics
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => navigateToPersona('leadership', 'strategic-planning')}
                >
                  Strategic Planning
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* UAE Context */}
        <Card>
          <CardHeader>
            <CardTitle>UAE Regional Context</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              All system components are designed with UAE-first approach, featuring:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'].map(emirate => (
                <Badge key={emirate} variant="outline" className="justify-center p-2">
                  {emirate}
                </Badge>
              ))}
            </div>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Emirate-specific job market data and salary insights</li>
              <li>• Regional skill demand and supply analytics</li>
              <li>• Localized course recommendations and career paths</li>
              <li>• UAE labor market alignment across all personas</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}