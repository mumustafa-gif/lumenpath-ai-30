import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  Eye, 
  Edit, 
  Search,
  Filter,
  Calendar,
  TrendingUp,
  Award,
  Play
} from "lucide-react";
import { FullCourseView } from "./FullCourseView";

interface SavedCourse {
  id: number;
  title: string;
  description: string;
  modules: any[];
  assessments: any;
  savedAt: string;
  status: string;
  progress: number;
  enrollments: number;
  difficulty: string;
  duration: string;
  coverImage?: string;
}

export const MyCoursesViewer = ({ onClose }: { onClose: () => void }) => {
  const [courses, setCourses] = useState<SavedCourse[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<SavedCourse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<SavedCourse | null>(null);
  const [showFullView, setShowFullView] = useState(false);

  useEffect(() => {
    // Load courses from localStorage
    const savedCourses = JSON.parse(localStorage.getItem('myCourses') || '[]');
    setCourses(savedCourses);
    setFilteredCourses(savedCourses);
  }, []);

  useEffect(() => {
    // Filter courses based on search and filter
    let filtered = courses;

    if (searchTerm) {
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilter !== "all") {
      filtered = filtered.filter(course => {
        switch (selectedFilter) {
          case "recent":
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
            return new Date(course.savedAt) > oneWeekAgo;
          case "beginner":
          case "intermediate":
          case "advanced":
            return course.difficulty?.toLowerCase() === selectedFilter;
          default:
            return true;
        }
      });
    }

    setFilteredCourses(filtered);
  }, [searchTerm, selectedFilter, courses]);

  const handleViewCourse = (course: SavedCourse) => {
    setSelectedCourse(course);
    setShowFullView(true);
  };

  const handleEditCourse = (course: SavedCourse) => {
    // Implementation for editing course
    console.log("Edit course:", course);
    // You could navigate to course editor or open edit modal
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (showFullView && selectedCourse) {
    return (
      <FullCourseView
        course={selectedCourse}
        onClose={() => {
          setShowFullView(false);
          setSelectedCourse(null);
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h1 className="text-2xl font-bold">My Courses</h1>
            <p className="text-muted-foreground">
              {courses.length} saved course{courses.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button variant="ghost" onClick={onClose}>
            ✕
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="p-6 border-b">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("all")}
              >
                All
              </Button>
              <Button
                variant={selectedFilter === "recent" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("recent")}
              >
                Recent
              </Button>
              <Button
                variant={selectedFilter === "beginner" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("beginner")}
              >
                Beginner
              </Button>
              <Button
                variant={selectedFilter === "intermediate" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("intermediate")}
              >
                Intermediate
              </Button>
              <Button
                variant={selectedFilter === "advanced" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("advanced")}
              >
                Advanced
              </Button>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <ScrollArea className="flex-1 p-6">
          {filteredCourses.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No courses found</h3>
              <p className="text-muted-foreground">
                {courses.length === 0 
                  ? "You haven't saved any courses yet." 
                  : "Try adjusting your search or filters."}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-ai-primary/20 to-ai-secondary/20 rounded-t-lg relative overflow-hidden">
                    {course.coverImage ? (
                      <img 
                        src={course.coverImage} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-ai-primary" />
                      </div>
                    )}
                    <div className="absolute top-2 right-2">
                      <Badge variant="secondary" className="text-xs">
                        {course.difficulty || 'Intermediate'}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Course Stats */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <BookOpen className="w-3 h-3 text-muted-foreground" />
                        <span>{course.modules?.length || 0} modules</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3 text-muted-foreground" />
                        <span>{course.duration || '4-8 hours'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3 text-muted-foreground" />
                        <span>{course.enrollments} students</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span>{formatDate(course.savedAt)}</span>
                      </div>
                    </div>

                    {/* Assessment Count */}
                    {course.assessments && Object.keys(course.assessments).length > 0 && (
                      <div className="flex items-center space-x-1 text-sm">
                        <Award className="w-3 h-3 text-ai-success" />
                        <span>{Object.keys(course.assessments).length} assessments added</span>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      <Button
                        onClick={() => handleViewCourse(course)}
                        size="sm"
                        className="flex-1 bg-ai-primary hover:bg-ai-primary/90"
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        View
                      </Button>
                      <Button
                        onClick={() => handleEditCourse(course)}
                        variant="outline"
                        size="sm"
                        className="flex-1"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>
    </div>
  );
};