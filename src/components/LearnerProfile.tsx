import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Wrench,
  Edit,
  Save,
  MapPin,
  Calendar,
  Mail,
  Phone,
  Globe,
  Github,
  Linkedin,
  Plus,
  X
} from "lucide-react";

interface LearnerProfileProps {
  initialData?: {
    personalInfo?: PersonalInfo;
    education?: Education[];
    experience?: Experience[];
    skills?: string[];
  };
  onSave: (profileData: ProfileData) => void;
}

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  portfolio: string;
  github: string;
  linkedin: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  description: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  technologies: string[];
}

interface ProfileData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: string[];
}

const LearnerProfile = ({ initialData, onSave }: LearnerProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialData?.personalInfo || {
    firstName: "Ahmad",
    lastName: "Hassan",
    email: "ahmad.hassan@email.com",
    phone: "+971-50-123-4567",
    location: "Dubai, UAE",
    bio: "Passionate AI researcher and data scientist with expertise in machine learning, deep learning, and natural language processing. Experienced in developing innovative AI solutions for real-world problems with a focus on delivering measurable business impact.",
    portfolio: "https://ahmadhassan-portfolio.com",
    github: "github.com/ahmadhassanai",
    linkedin: "linkedin.com/in/ahmad-hassan-ai"
  });

  const [education, setEducation] = useState<Education[]>(initialData?.education || [
    {
      id: "1",
      institution: "American University of Sharjah",
      degree: "Master of Science",
      field: "Computer Science - AI Track",
      startDate: "2021-09-01",
      endDate: "2023-06-30",
      gpa: "3.8",
      description: "Specialized in machine learning, deep learning, and natural language processing. Completed thesis on 'Advanced Neural Networks for Arabic Language Processing' with distinction."
    },
    {
      id: "2",
      institution: "University of Sharjah",
      degree: "Bachelor of Science",
      field: "Computer Engineering",
      startDate: "2017-09-01",
      endDate: "2021-06-30",
      gpa: "3.6",
      description: "Graduated Magna Cum Laude with focus on software engineering and data structures. Active member of IEEE student chapter and AI research group."
    }
  ]);
  
  const [experience, setExperience] = useState<Experience[]>(initialData?.experience || [
    {
      id: "1",
      company: "Emirates AI Labs",
      position: "AI Research Engineer",
      startDate: "2023-07-01",
      endDate: "",
      current: true,
      description: "Led development of AI-powered customer service chatbots, improving response accuracy by 40%. Collaborated with cross-functional teams to implement machine learning models in production environments. Mentored 3 junior developers and contributed to 5 successful AI product launches.",
      technologies: ["Python", "TensorFlow", "PyTorch", "AWS", "Docker", "Kubernetes"]
    },
    {
      id: "2",
      company: "ADNOC Digital",
      position: "Data Science Intern",
      startDate: "2022-06-01",
      endDate: "2023-06-30",
      current: false,
      description: "Developed predictive analytics models for oil & gas operations, contributing to 15% efficiency improvement. Worked with big data technologies to process and analyze geological data. Presented findings to senior management and contributed to strategic decision-making.",
      technologies: ["Python", "Pandas", "Scikit-learn", "Apache Spark", "SQL", "Tableau"]
    },
    {
      id: "3",
      company: "AUS Innovation Hub",
      position: "Research Assistant",
      startDate: "2021-01-01",
      endDate: "2022-05-31",
      current: false,
      description: "Conducted research on computer vision applications for autonomous vehicles. Co-authored 2 research papers published in international conferences. Developed prototype applications using OpenCV and deep learning frameworks.",
      technologies: ["Python", "OpenCV", "TensorFlow", "MATLAB", "C++"]
    }
  ]);
  
  const [skills, setSkills] = useState<string[]>(initialData?.skills || [
    "Machine Learning", "Deep Learning", "Python", "TensorFlow", "PyTorch",
    "Natural Language Processing", "Computer Vision", "Data Analysis", "Statistical Modeling",
    "AWS", "Docker", "Kubernetes", "SQL", "MongoDB", "Apache Spark",
    "React", "Node.js", "JavaScript", "Git", "Linux", "Agile/Scrum",
    "Research & Development", "Technical Writing", "Project Management"
  ]);
  const [newSkill, setNewSkill] = useState("");

  const handleSave = () => {
    const profileData: ProfileData = {
      personalInfo,
      education,
      experience,
      skills
    };
    onSave(profileData);
    setIsEditing(false);
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      institution: "",
      degree: "",
      field: "",
      startDate: "",
      endDate: "",
      description: ""
    };
    setEducation([...education, newEdu]);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    setEducation(education.map(edu => 
      edu.id === id ? { ...edu, ...updates } : edu
    ));
  };

  const removeEducation = (id: string) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
      technologies: []
    };
    setExperience([...experience, newExp]);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    setExperience(experience.map(exp => 
      exp.id === id ? { ...exp, ...updates } : exp
    ));
  };

  const removeExperience = (id: string) => {
    setExperience(experience.filter(exp => exp.id !== id));
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="text-muted-foreground">Manage your personal information and background</p>
        </div>
        <Button
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          className={isEditing ? "bg-gradient-to-r from-primary to-accent text-white" : ""}
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>
          ) : (
            <>
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </>
          )}
        </Button>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
              <CardDescription>
                Update your basic information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <Input
                    id="location"
                    value={personalInfo.location}
                    onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                    disabled={!isEditing}
                    placeholder="City, State, Country"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={personalInfo.bio}
                  onChange={(e) => setPersonalInfo({...personalInfo, bio: e.target.value})}
                  disabled={!isEditing}
                  placeholder="Tell us about yourself, your interests, and your career goals..."
                  className="min-h-[100px]"
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="font-semibold">Social Links</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio</Label>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-muted-foreground" />
                      <Input
                        id="portfolio"
                        value={personalInfo.portfolio}
                        onChange={(e) => setPersonalInfo({...personalInfo, portfolio: e.target.value})}
                        disabled={!isEditing}
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="github">GitHub</Label>
                    <div className="flex items-center gap-2">
                      <Github className="w-4 h-4 text-muted-foreground" />
                      <Input
                        id="github"
                        value={personalInfo.github}
                        onChange={(e) => setPersonalInfo({...personalInfo, github: e.target.value})}
                        disabled={!isEditing}
                        placeholder="github.com/username"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <div className="flex items-center gap-2">
                      <Linkedin className="w-4 h-4 text-muted-foreground" />
                      <Input
                        id="linkedin"
                        value={personalInfo.linkedin}
                        onChange={(e) => setPersonalInfo({...personalInfo, linkedin: e.target.value})}
                        disabled={!isEditing}
                        placeholder="linkedin.com/in/username"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="education">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Education
                  </CardTitle>
                  <CardDescription>
                    Add your educational background and qualifications
                  </CardDescription>
                </div>
                {isEditing && (
                  <Button onClick={addEducation} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <GraduationCap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No education information added yet.</p>
                  {isEditing && (
                    <Button onClick={addEducation} variant="outline" className="mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Education
                    </Button>
                  )}
                </div>
              ) : (
                education.map((edu, index) => (
                  <div key={edu.id} className="space-y-4 p-4 border rounded-lg">
                    {isEditing && (
                      <div className="flex justify-end">
                        <Button
                          onClick={() => removeEducation(edu.id)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Institution</Label>
                        <Input
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                          disabled={!isEditing}
                          placeholder="University Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Degree</Label>
                        <Input
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                          disabled={!isEditing}
                          placeholder="Bachelor's, Master's, PhD, etc."
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Field of Study</Label>
                      <Input
                        value={edu.field}
                        onChange={(e) => updateEducation(edu.id, { field: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Computer Science, Engineering, etc."
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          value={edu.startDate}
                          onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          value={edu.endDate}
                          onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>GPA (Optional)</Label>
                        <Input
                          value={edu.gpa || ""}
                          onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                          disabled={!isEditing}
                          placeholder="3.8/4.0"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={edu.description}
                        onChange={(e) => updateEducation(edu.id, { description: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Relevant coursework, achievements, projects..."
                      />
                    </div>
                    {index < education.length - 1 && <Separator />}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="experience">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="w-5 h-5 text-primary" />
                    Work Experience
                  </CardTitle>
                  <CardDescription>
                    Add your professional experience and roles
                  </CardDescription>
                </div>
                {isEditing && (
                  <Button onClick={addExperience} variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {experience.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No work experience added yet.</p>
                  {isEditing && (
                    <Button onClick={addExperience} variant="outline" className="mt-4">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Your First Job
                    </Button>
                  )}
                </div>
              ) : (
                experience.map((exp, index) => (
                  <div key={exp.id} className="space-y-4 p-4 border rounded-lg">
                    {isEditing && (
                      <div className="flex justify-end">
                        <Button
                          onClick={() => removeExperience(exp.id)}
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input
                          value={exp.company}
                          onChange={(e) => updateExperience(exp.id, { company: e.target.value })}
                          disabled={!isEditing}
                          placeholder="Company Name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Position</Label>
                        <Input
                          value={exp.position}
                          onChange={(e) => updateExperience(exp.id, { position: e.target.value })}
                          disabled={!isEditing}
                          placeholder="Job Title"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Start Date</Label>
                        <Input
                          type="date"
                          value={exp.startDate}
                          onChange={(e) => updateExperience(exp.id, { startDate: e.target.value })}
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>End Date</Label>
                        <Input
                          type="date"
                          value={exp.endDate}
                          onChange={(e) => updateExperience(exp.id, { endDate: e.target.value })}
                          disabled={!isEditing}
                          placeholder={exp.current ? "Present" : ""}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={exp.description}
                        onChange={(e) => updateExperience(exp.id, { description: e.target.value })}
                        disabled={!isEditing}
                        placeholder="Describe your responsibilities, achievements, and impact..."
                        className="min-h-[100px]"
                      />
                    </div>
                    {index < experience.length - 1 && <Separator />}
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="w-5 h-5 text-primary" />
                Skills & Technologies
              </CardTitle>
              <CardDescription>
                Manage your technical skills and competencies
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a new skill..."
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} disabled={!newSkill.trim()}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2">
                {skills.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground w-full">
                    <Wrench className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No skills added yet.</p>
                  </div>
                ) : (
                  skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="flex items-center gap-1 py-1 px-3"
                    >
                      {skill}
                      {isEditing && (
                        <button
                          onClick={() => removeSkill(skill)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </Badge>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LearnerProfile;