import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Code, Users } from "lucide-react";

interface NavbarProps {
  onlineUsers?: number;
  roomId?: string;
}

export const Navbar = ({ onlineUsers, roomId }: NavbarProps) => {
  return (
    <nav className="h-14 bg-navbar-background/80 backdrop-blur-lg border-b border-navbar-border shadow-navbar px-4 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 group transition-all duration-200">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:shadow-glow transition-all duration-300">
            <Code className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-200">
            CodeBin
          </span>
        </Link>
        
        {roomId && (
          <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
            <span>Room:</span>
            <code className="px-2 py-1 bg-muted rounded text-xs font-mono border border-border/50">
              {roomId}
            </code>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        {onlineUsers !== undefined && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">Online:</span>
            <span className="font-medium text-primary">{onlineUsers}</span>
          </div>
        )}
        
        <ThemeToggle />
      </div>
    </nav>
  );
};