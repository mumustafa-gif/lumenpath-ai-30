import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, GraduationCap, Users, Settings } from "lucide-react";
import heroImg from "@/assets/hero-bg.jpg";
import inceptionIcon from "/lovable-uploads/2c76c7ae-2959-41c8-bfbb-ea45ef1e7044.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!role) return;
    
    // Store user data in localStorage for prototype
    localStorage.setItem("user", JSON.stringify({ 
      email, 
      role,
      name: role === "leadership" ? "Khalid Al-Mansouri" : role === "faculty" ? "Dr. Aisha Al-Maktoum" : "Ahmad Al-Rashid"
    }));
    
    // Navigate based on role
    switch (role) {
      case "leadership":
        navigate("/leadership");
        break;
      case "faculty":
        navigate("/faculty");
        break;
      case "student":
        navigate("/student");
        break;
    }
  };

  const getRoleIcon = (roleType: string) => {
    switch (roleType) {
      case "leadership": return <Settings className="w-5 h-5" />;
      case "faculty": return <GraduationCap className="w-5 h-5" />;
      case "student": return <Users className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Hero Section */}
      <div 
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-ai-primary via-ai-accent to-ai-secondary relative overflow-hidden"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-ai-primary/80 via-ai-accent/70 to-ai-secondary/80" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="flex items-center mb-8">
            <img src={inceptionIcon} alt="Inception Icon" className="w-12 h-12 mr-4" />
            <div>
              <h1 className="text-4xl font-bold">INCEPTION</h1>
              <p className="text-xs text-white/80 -mt-1">A G42 COMPANY</p>
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-6">Intelligent Learning Management</h2>
          <p className="text-lg opacity-90 mb-8 leading-relaxed">
            Experience the future of corporate training with AI-powered adaptive learning, 
            intelligent tutoring, and personalized pathways that evolve with your progress.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Brain className="w-6 h-6 mr-3" />
              <span>AI-Powered Adaptive Learning Engine</span>
            </div>
            <div className="flex items-center">
              <GraduationCap className="w-6 h-6 mr-3" />
              <span>Intelligent Course Generation</span>
            </div>
            <div className="flex items-center">
              <Users className="w-6 h-6 mr-3" />
              <span>Smart Study Buddy Matching</span>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4 lg:hidden">
              <img src={inceptionIcon} alt="Inception Icon" className="w-10 h-10 mr-3" />
              <div>
                <h1 className="text-2xl font-bold">INCEPTION</h1>
                <p className="text-[10px] text-muted-foreground -mt-1 text-center">A G42 COMPANY</p>
              </div>
            </div>
            <CardTitle className="text-2xl">Welcome</CardTitle>
            <CardDescription>
              Sign in to your AI-powered learning platform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Select Your Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">
                    <div className="flex items-center">
                      {getRoleIcon("student")}
                      <span className="ml-2">Student - Access Training Content</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="faculty">
                    <div className="flex items-center">
                      {getRoleIcon("faculty")}
                      <span className="ml-2">Faculty - Create & Manage Courses</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="leadership">
                    <div className="flex items-center">
                      {getRoleIcon("leadership")}
                      <span className="ml-2">Leadership - System Management</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="hero" 
              className="w-full" 
              onClick={handleLogin}
              disabled={!email || !password || !role}
            >
              Sign In
            </Button>
            <div className="text-center">
              <Button variant="link" size="sm">
                Forgot your password?
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;