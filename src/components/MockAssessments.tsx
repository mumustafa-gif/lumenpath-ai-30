import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  BookOpen, 
  Code, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Star,
  Award,
  Target,
  TrendingUp,
  AlertCircle,
  ArrowRight,
  Play,
  FileText,
  User,
  Languages
} from "lucide-react";

const MockAssessments = () => {
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  const assessmentTypes = [
    {
      id: "english",
      title: "English Assessment",
      description: "Evaluate your English proficiency including grammar, vocabulary, and comprehension",
      icon: Languages,
      duration: "30 minutes",
      questions: 25,
      difficulty: "Intermediate",
      category: "Language",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: "personal",
      title: "Personal Assessment",
      description: "Discover your personality traits, work style, and behavioral preferences",
      icon: User,
      duration: "20 minutes",
      questions: 40,
      difficulty: "All Levels",
      category: "Personality",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: "technical",
      title: "Technical Assessment",
      description: "Test your programming skills, problem-solving abilities, and technical knowledge",
      icon: Code,
      duration: "45 minutes",
      questions: 30,
      difficulty: "Advanced",
      category: "Technical",
      color: "from-green-500 to-emerald-500"
    }
  ];

  const sampleQuestions = {
    english: [
      {
        question: "Choose the correct form: 'She _____ to the meeting yesterday.'",
        options: ["go", "goes", "went", "going"],
        correct: 2,
        type: "multiple"
      },
      {
        question: "What is the synonym of 'abundant'?",
        options: ["scarce", "plentiful", "limited", "rare"],
        correct: 1,
        type: "multiple"
      },
      {
        question: "Read the passage and answer: 'The company's new policy aims to improve work-life balance.' What is the main purpose?",
        options: ["Increase productivity", "Improve work-life balance", "Reduce costs", "Hire more employees"],
        correct: 1,
        type: "reading"
      }
    ],
    personal: [
      {
        question: "How do you typically handle stressful situations?",
        options: [
          "I stay calm and analyze the problem step by step",
          "I seek help from colleagues or supervisors",
          "I take a break to clear my mind before tackling it",
          "I work harder and faster to overcome the stress"
        ],
        type: "personality"
      },
      {
        question: "In team meetings, you usually:",
        options: [
          "Lead the discussion and present ideas",
          "Listen carefully and contribute when asked",
          "Ask questions to clarify points",
          "Take notes and follow up after the meeting"
        ],
        type: "personality"
      },
      {
        question: "Your ideal work environment is:",
        options: [
          "Collaborative and team-oriented",
          "Quiet and independent",
          "Dynamic and fast-paced",
          "Structured and organized"
        ],
        type: "personality"
      }
    ],
    technical: [
      {
        question: "What is the time complexity of binary search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(n²)"],
        correct: 1,
        type: "multiple"
      },
      {
        question: "In React, which hook is used for side effects?",
        options: ["useState", "useEffect", "useContext", "useReducer"],
        correct: 1,
        type: "multiple"
      },
      {
        question: "What does REST stand for in web development?",
        options: [
          "Reliable State Transfer",
          "Representational State Transfer", 
          "Remote State Technology",
          "Responsive State Template"
        ],
        correct: 1,
        type: "multiple"
      }
    ]
  };

  const assessmentResults = {
    english: {
      score: 85,
      level: "Upper Intermediate",
      strengths: ["Grammar", "Vocabulary", "Reading Comprehension"],
      improvements: ["Writing Skills", "Advanced Grammar"],
      recommendations: [
        "Practice advanced grammar exercises",
        "Read more complex articles and literature",
        "Take business English course"
      ]
    },
    personal: {
      score: 92,
      type: "Analytical Thinker",
      traits: ["Detail-oriented", "Problem Solver", "Team Player", "Adaptable"],
      workStyle: "Collaborative with independent thinking",
      recommendations: [
        "Consider leadership roles",
        "Develop presentation skills",
        "Explore project management opportunities"
      ]
    },
    technical: {
      score: 78,
      level: "Intermediate",
      strengths: ["Data Structures", "Web Development", "Problem Solving"],
      improvements: ["System Design", "Database Optimization"],
      recommendations: [
        "Study system design patterns",
        "Practice coding challenges",
        "Learn advanced database concepts"
      ]
    }
  };

  const startAssessment = (assessmentType) => {
    setSelectedAssessment(assessmentType);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setTimeLeft(assessmentType.duration === "45 minutes" ? 2700 : assessmentType.duration === "30 minutes" ? 1800 : 1200);
  };

  const handleAnswer = (questionIndex, answerIndex) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerIndex
    });
  };

  const nextQuestion = () => {
    if (currentQuestion < sampleQuestions[selectedAssessment.id].length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const result = assessmentResults[selectedAssessment.id];
    return (
      <div className="space-y-6">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Award className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-foreground">Assessment Complete!</h2>
          <p className="text-muted-foreground">
            Your {selectedAssessment.title.toLowerCase()} results are ready
          </p>
        </div>

        <Card className="border-primary/20 bg-primary/5">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {selectedAssessment.id === 'personal' ? result.type : `Score: ${result.score}%`}
            </CardTitle>
            {selectedAssessment.id !== 'personal' && (
              <CardDescription className="text-lg font-semibold">
                Level: {result.level}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {selectedAssessment.id !== 'personal' && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Overall Performance</span>
                  <span className="font-semibold">{result.score}%</span>
                </div>
                <Progress value={result.score} className="h-3" />
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-green-700 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {selectedAssessment.id === 'personal' ? 'Key Traits' : 'Strengths'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {(selectedAssessment.id === 'personal' ? result.traits : result.strengths).map((item, index) => (
                    <Badge key={index} className="bg-green-100 text-green-800 border-green-300">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              {selectedAssessment.id !== 'personal' && (
                <div className="space-y-3">
                  <h4 className="font-semibold text-orange-700 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Areas for Improvement
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.improvements.map((item, index) => (
                      <Badge key={index} className="bg-orange-100 text-orange-700 border-orange-300">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {selectedAssessment.id === 'personal' && (
              <div className="space-y-3">
                <h4 className="font-semibold text-primary flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Work Style
                </h4>
                <p className="text-muted-foreground bg-background p-3 rounded-lg border">
                  {result.workStyle}
                </p>
              </div>
            )}

            <div className="space-y-3">
              <h4 className="font-semibold text-primary flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Recommendations
              </h4>
              <ul className="space-y-2">
                {result.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3 pt-4">
              <Button onClick={() => setSelectedAssessment(null)} variant="outline" className="flex-1">
                Back to Assessments
              </Button>
              <Button className="flex-1">
                <FileText className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (selectedAssessment) {
    const questions = sampleQuestions[selectedAssessment.id];
    const question = questions[currentQuestion];
    
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{selectedAssessment.title}</h2>
            <p className="text-muted-foreground">
              Question {currentQuestion + 1} of {questions.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Time Remaining</div>
            <div className="text-lg font-bold text-primary">{formatTime(timeLeft)}</div>
          </div>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
          </div>
          <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
        </div>

        {/* Question Card */}
        <Card className="border-primary/20">
          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge variant="outline" className="mb-4">
                  {question.type === 'multiple' ? 'Multiple Choice' : 
                   question.type === 'reading' ? 'Reading Comprehension' : 'Personality'}
                </Badge>
                <h3 className="text-xl font-semibold leading-relaxed">
                  {question.question}
                </h3>
              </div>

              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={answers[currentQuestion] === index ? "default" : "outline"}
                    className="w-full text-left justify-start p-4 h-auto"
                    onClick={() => handleAnswer(currentQuestion, index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span className="text-wrap">{option}</span>
                    </div>
                  </Button>
                ))}
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedAssessment(null)}
                >
                  Exit Assessment
                </Button>
                <Button 
                  onClick={nextQuestion}
                  disabled={answers[currentQuestion] === undefined}
                  className="min-w-32"
                >
                  {currentQuestion === questions.length - 1 ? 'Finish' : 'Next Question'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
          <Brain className="w-8 h-8 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">Mock Assessments</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Evaluate your skills and personality traits with our comprehensive assessment suite
        </p>
      </div>

      {/* Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assessmentTypes.map((assessment) => {
          const IconComponent = assessment.icon;
          return (
            <Card key={assessment.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary/30">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${assessment.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl">{assessment.title}</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  {assessment.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span>{assessment.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span>{assessment.questions} questions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-muted-foreground" />
                    <span>{assessment.difficulty}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span>{assessment.category}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Button 
                    onClick={() => startAssessment(assessment)}
                    className="w-full"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Previous Results */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="w-5 h-5 text-primary" />
            Previous Assessment Results
          </CardTitle>
          <CardDescription>
            Track your progress and improvement over time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessmentTypes.map((assessment) => {
              const result = assessmentResults[assessment.id];
              return (
                <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${assessment.color} flex items-center justify-center`}>
                      <assessment.icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold">{assessment.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Last taken: 2 days ago
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary/10 text-primary">
                      {assessment.id === 'personal' ? result.type : `${result.score}%`}
                    </Badge>
                    <Button size="sm" variant="outline">
                      View Report
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MockAssessments;