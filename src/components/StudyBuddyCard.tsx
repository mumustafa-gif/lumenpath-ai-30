import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Video, Calendar, Users } from "lucide-react";

interface StudyBuddy {
  id: number;
  name: string;
  course: string;
  progress: number;
  status: "online" | "offline";
  lastActive: string;
}

interface StudyBuddyCardProps {
  buddy: StudyBuddy;
}

export const StudyBuddyCard = ({ buddy }: StudyBuddyCardProps) => {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Avatar>
                <AvatarFallback className="bg-ai-primary text-white">
                  {getInitials(buddy.name)}
                </AvatarFallback>
              </Avatar>
              <div 
                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                  buddy.status === "online" ? "bg-green-500" : "bg-gray-400"
                }`} 
              />
            </div>
            <div>
              <h3 className="font-semibold">{buddy.name}</h3>
              <p className="text-sm text-muted-foreground">{buddy.lastActive}</p>
            </div>
          </div>
          <Badge variant={buddy.status === "online" ? "default" : "secondary"}>
            {buddy.status}
          </Badge>
        </CardTitle>
        <CardDescription>{buddy.course}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Course Progress</span>
            <span>{buddy.progress}%</span>
          </div>
          <Progress value={buddy.progress} />
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Button size="sm" variant="outline" className="flex-1">
            <MessageCircle className="w-4 h-4 mr-1" />
            Chat
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Video className="w-4 h-4 mr-1" />
            Call
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            <Calendar className="w-4 h-4 mr-1" />
            Study
          </Button>
        </div>
        
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="flex items-center text-sm">
            <Users className="w-4 h-4 mr-2 text-ai-primary" />
            <span>Next group study session: Tomorrow 3 PM</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};