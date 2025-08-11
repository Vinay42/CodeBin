import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Home, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const isRoomNotFound = location.pathname.startsWith("/room/");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <div className="text-center">
          <div className="w-16 h-16 bg-destructive/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          
          <h1 className="text-6xl font-bold mb-4 text-foreground">404</h1>
          
          {isRoomNotFound ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">Room Not Found</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                The room you're looking for doesn't exist or may have been deleted.
                Try creating a new room or check the room code.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
                The page you're looking for doesn't exist. 
                It might have been moved, deleted, or you entered the wrong URL.
              </p>
            </>
          )}
          
          <Button asChild size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
