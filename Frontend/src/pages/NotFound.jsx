import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    // Log 404 error for monitoring/analytics
    console.log(`404 - Page not found: ${location.pathname}`);
  }, [location]);

  const isRoom = location.pathname.startsWith('/room/');

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full text-center space-y-6">
          {/* Error Icon */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </div>
          
          {/* Error Message */}
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">404</h1>
            <h2 className="text-xl font-semibold text-foreground">
              {isRoom ? "Room Not Found" : "Page Not Found"}
            </h2>
            <p className="text-muted-foreground">
              {isRoom 
                ? "The room you're looking for doesn't exist or has expired." 
                : "The page you're looking for doesn't exist."}
            </p>
          </div>
          
          {/* Action Button */}
          <div className="pt-4">
            <Button asChild className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
              <Link to="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotFound;