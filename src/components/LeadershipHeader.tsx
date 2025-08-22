import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Bell, Settings, User, LogOut, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import inceptionIcon from "/lovable-uploads/2c76c7ae-2959-41c8-bfbb-ea45ef1e7044.png";

export const LeadershipHeader = () => {
  const navigate = useNavigate();
  const [notifications] = useState(3);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <img src={inceptionIcon} alt="Inception Icon" className="w-8 h-8" />
          <div>
            <h1 className="text-xl font-bold">INCEPTION</h1>
            <p className="text-[10px] text-muted-foreground -mt-1">A G42 COMPANY</p>
            <p className="text-sm text-muted-foreground">Leadership Dashboard</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Shield className="w-3 h-3" />
            <span>Leadership</span>
          </Badge>
          
          <Button variant="outline" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            {notifications > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-ai-warning">
                {notifications}
              </Badge>
            )}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};