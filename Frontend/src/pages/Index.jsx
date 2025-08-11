import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/components/layout/Navbar";
import { Code, Plus, ArrowRight, Github, Zap, Users, Play } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [roomCode, setRoomCode] = useState("");

  const createNewRoom = () => {
    const newRoomId = uuidv4().slice(0, 8);
    navigate(`/room/${newRoomId}`);
    toast({
      title: "Room created!",
      description: `Room ID: ${newRoomId}`,
    });
  };

  const joinRoom = () => {
    if (!roomCode.trim()) {
      toast({
        title: "Enter room code",
        description: "Please enter a valid room code to join.",
        variant: "destructive",
      });
      return;
    }
    navigate(`/room/${roomCode.trim()}`);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex justify-center mb-4 lg:mb-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
              <Code className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              CodeBin
            </span>
          </h1>
          
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground mb-8 lg:mb-12 max-w-2xl mx-auto px-4">
            Real-time collaborative code editing and execution. Share code instantly, 
            collaborate seamlessly, and run your code with just one click.
          </p>
          
          {/* Action Cards - Mobile First */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-12 lg:mb-16">
            {/* Create New Room */}
            <Card className="border-2 border-dashed border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Create New Room</CardTitle>
                <CardDescription className="text-sm sm:text-base px-2">
                  Start a new collaborative coding session with a unique room ID
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  onClick={createNewRoom}
                  className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 h-11 sm:h-12 text-sm sm:text-base"
                  size="lg"
                >
                  Create Room
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Join Existing Room */}
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <Code className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Join Existing Room</CardTitle>
                <CardDescription className="text-sm sm:text-base px-2">
                  Enter a room code to join an ongoing coding session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-0">
                <Input
                  placeholder="Enter room code..."
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="text-center font-mono h-11 sm:h-12 text-sm sm:text-base"
                />
                <Button 
                  onClick={joinRoom}
                  variant="outline"
                  className="w-full h-11 sm:h-12 text-sm sm:text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  size="lg"
                >
                  Join Room
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Features - Below action cards */}
          <div className="bg-background-alt/50 rounded-2xl p-6 lg:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center p-4 lg:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Real-time Collaboration</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Edit code together with live cursors and instant synchronization
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 lg:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                  <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Code Execution</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Run your code instantly and see results in the integrated terminal
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center p-4 lg:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3 lg:mb-4">
                  <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2 text-sm sm:text-base">Lightning Fast</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Minimal interface with maximum performance for distraction-free coding
                </p>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-background-alt/30 mt-12 lg:mt-16 py-6 lg:py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
            <span>Built with ❤️ for developers</span>
            <div className="flex items-center gap-2">
              <Github className="w-3 h-3 sm:w-4 sm:h-4" />
              <a 
                href="https://github.com" 
                className="hover:text-primary transition-colors underline-offset-2 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
            </div>
            <span className="hidden sm:inline">•</span>
            <span>Created by CodeBin Team</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;